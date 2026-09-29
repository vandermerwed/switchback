import { STATIONERY_TOKENS } from "../engine/kit";
import type { Profile } from "../engine/profile";
import type { KitInput, Paper, RoleId } from "../engine/types";
import { UsageError } from "./args";

const ROLES = ["ask", "stop", "keep", "crux", "maybe", "sense", "draft"] as const;
const BOOLEAN_TOKENS = STATIONERY_TOKENS.filter((t) => t !== "printer" && t !== "pen");
const TRUE = new Set(["true", "yes", "y", "1", "on"]);
const FALSE = new Set(["false", "no", "n", "0", "off"]);

export function setRole(kit: KitInput, role: Exclude<RoleId, "reason">, colour: string): KitInput {
  const pens = (kit.pens ?? []).map((p) => (p.role === role ? { colour: p.colour } : { ...p }));
  const existing = pens.find((p) => p.colour.toLowerCase() === colour.toLowerCase());
  if (existing) existing.role = role;
  else pens.push({ colour, role });
  return { ...kit, pens };
}

export function applySet(profile: Profile, key: string, value: string): Profile {
  const kit: KitInput = { ...profile.kit };
  const next: Profile = { ...profile, kit, defaults: { ...profile.defaults } };
  const role = /^role\.(.+)$/.exec(key)?.[1];
  if (role !== undefined) {
    if (!(ROLES as readonly string[]).includes(role))
      throw new UsageError(`unknown role "${role}"; use one of ${ROLES.join(", ")}`);
    next.kit = setRole(kit, role as (typeof ROLES)[number], value);
  } else if (key === "pens") {
    const previous = new Map((kit.pens ?? []).map((p) => [p.colour.toLowerCase(), p.role]));
    kit.pens = value
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((colour) => {
        const r = previous.get(colour.toLowerCase());
        return r ? { colour, role: r } : { colour };
      });
  } else if (key === "paper") {
    if (!["A4", "Letter"].includes(value)) throw new UsageError("paper must be A4 or Letter");
    kit.paper = value as Paper;
  } else if (key === "printer") {
    if (value !== "mono" && value !== "colour") throw new UsageError("printer must be mono or colour");
    kit.printer = value;
  } else if ((BOOLEAN_TOKENS as readonly string[]).includes(key)) {
    const v = value.toLowerCase();
    if (!TRUE.has(v) && !FALSE.has(v)) throw new UsageError(`${key} must be true or false`);
    (kit as Record<string, unknown>)[key] = TRUE.has(v);
  } else if (key === "defaults.style") {
    next.defaults.style = value;
  } else if (key === "defaults.sitting") {
    next.defaults.sitting = value;
  } else {
    throw new UsageError(
      `unknown setting "${key}"; use paper, printer, pens, role.<role>, a stationery item, defaults.style, or defaults.sitting`,
    );
  }
  return next;
}

export function kitFromAnswers(
  answers: { paper: Paper; printer: "mono" | "colour"; pens: string[]; other: string; stationery: string[] },
  previous: KitInput = {},
): KitInput {
  const roles = new Map((previous.pens ?? []).map((p) => [p.colour.toLowerCase(), p.role]));
  const rawColours = [...answers.pens, ...answers.other.split(",")].map((c) => c.trim()).filter(Boolean);
  const seen = new Set<string>();
  const colours: string[] = [];
  for (const c of rawColours) {
    const key = c.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    colours.push(c);
  }
  const kit: KitInput = {
    paper: answers.paper,
    printer: answers.printer,
    pens: colours.map((colour) => {
      const role = roles.get(colour.toLowerCase());
      return role ? { colour, role } : { colour };
    }),
  };
  for (const token of BOOLEAN_TOKENS)
    (kit as Record<string, unknown>)[token] = answers.stationery.includes(token);
  return kit;
}
