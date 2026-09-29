import type { Kit, KitInput } from "./types";

export const MINIMUM_KIT: Kit = {
  paper: "A4",
  printer: "mono",
  pens: [{ colour: "black" }],
  highlighter: true,
  pencil: false,
  scissors: false,
  tape: false,
  glue: false,
  index_cards: false,
  sticky_notes: false,
  coins: false,
  timer: false,
  wall_space: false,
  camera: true,
};

export const STATIONERY_TOKENS = [
  "printer",
  "pen",
  "highlighter",
  "pencil",
  "scissors",
  "tape",
  "glue",
  "index_cards",
  "sticky_notes",
  "coins",
  "timer",
  "wall_space",
  "camera",
] as const;

export type KitSource = "minimum" | "profile" | "spec";

export function resolveKit(layers: { profile?: KitInput; spec?: KitInput }): {
  kit: Kit;
  source: KitSource[];
} {
  const source: KitSource[] = ["minimum"];
  let kit: Kit = { ...MINIMUM_KIT, pens: [...MINIMUM_KIT.pens] };
  for (const name of ["profile", "spec"] as const) {
    const layer = layers[name];
    if (!layer) continue;
    kit = { ...kit, ...layer, pens: layer.pens ? layer.pens.map((p) => ({ ...p })) : kit.pens };
    source.push(name);
  }
  if (!kit.pens.some((p) => p.colour.toLowerCase() === "black")) {
    kit.pens = [{ colour: "black" }, ...kit.pens];
  }
  return { kit, source };
}

export function hasToken(kit: Kit, token: string): boolean {
  if (token === "printer" || token === "pen") return true;
  return (kit as unknown as Record<string, unknown>)[token] === true;
}

export function isKnownToken(token: string): boolean {
  return (STATIONERY_TOKENS as readonly string[]).includes(token);
}

export function missingRequirements(requires: string[], kit: Kit): string[] {
  return requires.filter(
    (req) =>
      !req
        .split("|")
        .map((option) => option.trim())
        .some((option) => hasToken(kit, option)),
  );
}

export function satisfies(requires: string[], kit: Kit): boolean {
  return missingRequirements(requires, kit).length === 0;
}
