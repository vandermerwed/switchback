import { resolveKit } from "../../engine/kit";
import { chooseVariant, RENAMED, type ResolvedComponent, resolveComponent } from "../../engine/resolve";
import type { ComponentMeta, JsonSchema, Kit, PresetMeta } from "../../engine/types";
import { basisOf, groundingOf, originOf, variantsOf } from "../../registry/basis";
import { type Catalogue, loadCatalogue } from "../../registry/catalogue";
import { parseCommand, readProfileOrReport } from "../args";
import type { Io } from "../io";

const USAGE = "usage: switchback show <component-or-preset-id> [--json]";

/** What a template rests on: its research claims, or, for a practical template, its origin alone. */
export function basisLines(meta: ComponentMeta, preset?: PresetMeta | null): string[] {
  if (basisOf(meta, preset) === "practice")
    return [`basis:   practical template · ${originOf(meta, preset) ?? ""}`];
  const g = groundingOf(meta, preset);
  const lines = ["basis:   research-backed", "grounding:"];
  if (!g?.claims.length) lines.push("  (not yet researched)");
  for (const c of g?.claims ?? [])
    lines.push(`  - ${c.claim} [${c.grade}] ${c.sources.map((s) => s.cite).join("; ")}`);
  if (g?.helps) lines.push(`  helps: ${g.helps}`);
  if (g?.backfires) lines.push(`  backfires: ${g.backfires}`);
  return lines;
}

/** Each variant, and whether the kit can print it. */
function fittedVariants(meta: ComponentMeta, preset: PresetMeta | null, kit: Kit) {
  return variantsOf(meta, preset).map((v) => {
    const choice = chooseVariant(meta, kit, v.id);
    return { ...v, fits: choice.ok, missing: choice.ok ? [] : choice.missing };
  });
}

/**
 * What `show --json` prints for a template. `grounding` is the claims that apply to it: a research
 * preset's own before its base's, and none at all for a practical template, not even a variant's.
 */
export function showJson(cat: Catalogue, resolved: ResolvedComponent, kit: Kit) {
  const { base, preset } = resolved;
  const meta = base.meta;
  const basis = basisOf(meta, preset);
  const component =
    basis === "practice" ? { ...meta, grounding: undefined, variants: variantsOf(meta, preset) } : meta;
  return {
    component,
    preset,
    basis,
    origin: originOf(meta, preset) ?? null,
    grounding: groundingOf(meta, preset) ?? null,
    variants: fittedVariants(meta, preset, kit),
    presets: [...cat.presets.values()].filter((p) => p.extends === meta.id).map((p) => p.id),
    examples: Object.keys(base.examples),
  };
}

function describeType(schema: Record<string, unknown>): string {
  if (Array.isArray(schema.enum)) return schema.enum.join(" | ");
  const type = Array.isArray(schema.type) ? schema.type.join(" | ") : String(schema.type ?? "any");
  if (type === "array") {
    const items = (schema.items ?? {}) as Record<string, unknown>;
    const inner = items.type === "object" ? "object" : String(items.type ?? "any");
    const min = typeof schema.minItems === "number" ? schema.minItems : 0;
    const range = typeof schema.maxItems === "number" ? ` (${min}–${schema.maxItems})` : "";
    return `${inner}[]${range}`;
  }
  if (type === "integer" || type === "number") {
    return typeof schema.minimum === "number" ? `${type} ${schema.minimum}–${schema.maximum}` : type;
  }
  if (type === "string" && typeof schema.maxLength === "number") return `string (≤${schema.maxLength})`;
  return type;
}

export function describeData(schema: JsonSchema): string[] {
  const props = (schema.properties ?? {}) as Record<string, Record<string, unknown>>;
  const keys = Object.keys(props);
  if (!keys.length) return ["  (no data)"];
  const width = Math.max(...keys.map((k) => k.length));
  return keys.map((k) => `  ${k.padEnd(width)}  ${describeType(props[k]!)}`);
}

export async function showCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number> {
  const { values, positionals } = parseCommand(argv, { json: { type: "boolean" } }, USAGE);
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const id = positionals[0];
  if (!id) {
    io.err(USAGE);
    return 2;
  }
  const cat = loadCatalogue();
  const resolved = resolveComponent(cat, id);
  if (!resolved) {
    const renamed = RENAMED[id];
    if (renamed) {
      io.err(
        `component "${id}" was merged into "${renamed.component}"; use "component": "${renamed.component}", "variant": "${renamed.variant}"${renamed.note ? ` — ${renamed.note}` : ""}. Try \`switchback show ${renamed.component}\`.`,
      );
      return 1;
    }
    io.err(`unknown component or preset: ${id}. Try \`switchback list\`.`);
    return 1;
  }
  const profile = readProfileOrReport(env, io, values.json === true);
  if (!profile.ok) return 1;
  const kit = resolveKit({ profile: profile.profile?.kit }).kit;
  if (values.json) {
    io.out(JSON.stringify(showJson(cat, resolved, kit), null, 2));
    return 0;
  }
  const { base, preset } = resolved;
  const meta = base.meta;
  const variants = fittedVariants(meta, preset, kit);
  const presets = [...cat.presets.values()].filter((p) => p.extends === meta.id).map((p) => p.id);
  const lines = [
    `${preset ? `${preset.name} (${preset.id}, a preset of ${meta.id})` : `${meta.name} (${meta.id})`} · ${meta.kind} · ${meta.phase}`,
    meta.intent,
    `when:    ${meta.when}`,
    `tags:    ${(preset?.tags ?? meta.tags).join(", ")}`,
    `desk:    ${meta.physical.requires.join(", ")} · hands: ${meta.physical.body.join(", ")} · ${meta.physical.timebox}`,
    "variants:",
    ...variants.flatMap((v) => {
      const line = `  ${v.fits ? "✓" : "✗"} ${v.id}${v.label ? `  ${v.label}` : ""}${v.requires.length ? `  [${v.requires.join(", ")}]` : ""}${v.fits ? "" : `  (missing ${v.missing.join(", ")})`}`;
      const overrides = [
        v.prompt ? `      prompt:    ${v.prompt}` : null,
        v.readback ? `      readback:  ${v.readback}` : null,
      ].filter((s): s is string => s !== null);
      return [line, ...overrides];
    }),
    "data:",
    ...describeData(meta.data),
  ];
  if (preset)
    lines.push(
      `preset data: ${JSON.stringify(preset.data)}`,
      `attribution: ${preset.attribution} · licence: ${preset.licence}`,
    );
  if (meta.prompt) lines.push(`prompt:  ${meta.prompt}`);
  if (meta.readback) lines.push(`read-back: ${meta.readback}`);
  lines.push(...basisLines(meta, preset));
  if (presets.length) lines.push(`presets: ${presets.join(", ")}`);
  for (const line of lines) io.out(line);
  return 0;
}
