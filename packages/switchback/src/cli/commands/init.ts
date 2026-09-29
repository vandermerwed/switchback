import * as p from "@clack/prompts";
import { MINIMUM_KIT, resolveKit, STATIONERY_TOKENS } from "../../engine/kit";
import { assignPens, describeAssignment, orderByPriority } from "../../engine/pens";
import { defaultProfile, type Profile, profilePath, writeProfile } from "../../engine/profile";
import type { KitInput, Paper, RoleId } from "../../engine/types";
import { loadRegistries } from "../../registry/registries";
import { parseCommand, readProfileOrReport } from "../args";
import type { Io } from "../io";
import { kitFromAnswers, setRole } from "../profile-edit";

const USAGE = "usage: switchback init [--defaults] [--force]";
const COLOURS = ["black", "blue", "red", "green", "orange", "purple", "pink", "yellow", "brown", "grey"];
const LABELS: Record<string, string> = {
  highlighter: "A highlighter",
  pencil: "A pencil",
  scissors: "Scissors",
  tape: "Tape",
  glue: "Glue",
  index_cards: "Index cards",
  sticky_notes: "Sticky notes",
  coins: "Coins or counters",
  timer: "A timer",
  wall_space: "Wall space",
  camera: "A phone camera",
};

class Cancelled extends Error {}
function answer<T>(value: T | typeof p.CANCEL_SYMBOL): T {
  if (p.isCancel(value)) throw new Cancelled();
  return value;
}

async function wizard(existing: Profile | null): Promise<Profile> {
  const prev: KitInput = existing?.kit ?? {};
  const { roles } = loadRegistries();
  p.intro("switchback · set up your desk");
  const paper = answer(
    await p.select({
      message: "Paper size?",
      initialValue: prev.paper ?? "A4",
      options: [
        { value: "A4" as Paper, label: "A4" },
        { value: "Letter" as Paper, label: "US Letter" },
      ],
    }),
  );
  const printer = answer(
    await p.select({
      message: "Printer?",
      initialValue: prev.printer ?? "mono",
      options: [
        { value: "mono" as const, label: "Black and white" },
        { value: "colour" as const, label: "Colour" },
      ],
    }),
  );
  const pens = answer(
    await p.multiselect({
      message: "Which pens do you have?",
      required: false,
      initialValues: (prev.pens ?? [{ colour: "black" }])
        .map((x) => x.colour)
        .filter((c) => COLOURS.includes(c)),
      options: COLOURS.map((c) => ({ value: c, label: c })),
    }),
  );
  const other = answer(
    await p.text({
      message: "Any other pen colours? (comma-separated; leave blank for none)",
      placeholder: "teal, dark red",
      defaultValue: "",
    }),
  );
  const tokens = STATIONERY_TOKENS.filter((t) => t !== "printer" && t !== "pen");
  const stationery = answer(
    await p.multiselect({
      message: "What else is on the desk?",
      required: false,
      initialValues: tokens.filter(
        (t) =>
          ((prev as Record<string, unknown>)[t] ?? (MINIMUM_KIT as unknown as Record<string, unknown>)[t]) ===
          true,
      ),
      options: tokens.map((t) => ({ value: t, label: LABELS[t] ?? t })),
    }),
  );
  const sitting = answer(
    await p.text({
      message: "How long is a usual sitting?",
      defaultValue: existing?.defaults.sitting ?? "40 min",
      placeholder: existing?.defaults.sitting ?? "40 min",
    }),
  );

  let kit = kitFromAnswers({ paper, printer, pens, other, stationery }, prev);
  for (;;) {
    const { mapping } = assignPens(resolveKit({ profile: kit }).kit, roles);
    p.note(
      orderByPriority(roles)
        .map((r) => `${r.code} ${r.name.padEnd(7)} ${describeAssignment(mapping[r.id])}`)
        .join("\n"),
      "Your colour roles",
    );
    const coloured = (kit.pens ?? []).filter((x) => x.colour.toLowerCase() !== "black");
    if (!coloured.length) break;
    if (!answer(await p.confirm({ message: "Change any role?", initialValue: false }))) break;
    const role = answer(
      await p.select({
        message: "Which role?",
        options: orderByPriority(roles)
          .filter((r) => r.priority !== null)
          .map((r) => ({
            value: r.id as Exclude<RoleId, "reason">,
            label: `${r.code} ${r.name}: ${r.meaning}`,
          })),
      }),
    );
    const colour = answer(
      await p.select({
        message: "Which pen?",
        options: coloured.map((x) => ({ value: x.colour, label: x.colour })),
      }),
    );
    kit = setRole(kit, role, colour);
  }
  return {
    version: 1,
    kit,
    defaults: { style: existing?.defaults.style ?? "sitting", sitting: sitting || "40 min" },
  };
}

export async function initCommand(
  argv: string[],
  io: Io,
  env: NodeJS.ProcessEnv,
  deps = { isTTY: Boolean(process.stdin.isTTY) },
): Promise<number> {
  const { values } = parseCommand(argv, { defaults: { type: "boolean" }, force: { type: "boolean" } }, USAGE);
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const path = profilePath(env);
  const read = values.force ? { ok: true as const, profile: null } : readProfileOrReport(env, io, false);
  if (!read.ok) return 1;

  if (values.defaults) {
    if (read.profile && !values.force) {
      io.err(`a profile already exists at ${path}; use --force to replace it`);
      return 1;
    }
    writeProfile(defaultProfile(), path);
    io.out(`wrote ${path} (minimum kit: a black pen and a highlighter)`);
    return 0;
  }
  if (!deps.isTTY) {
    io.err(
      "init needs an interactive terminal. Use `switchback init --defaults`, then `switchback profile --set …`.",
    );
    return 2;
  }
  try {
    const profile = await wizard(read.profile);
    if (!answer(await p.confirm({ message: `Save to ${path}?`, initialValue: true }))) throw new Cancelled();
    writeProfile(profile, path);
    p.outro(`Saved. Edit any time with \`switchback profile --set key=value\`.`);
    return 0;
  } catch (e) {
    if (e instanceof Cancelled) {
      p.cancel("Nothing saved.");
      return 1;
    }
    throw e;
  }
}
