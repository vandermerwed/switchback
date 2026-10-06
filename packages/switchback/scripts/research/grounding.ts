// Merge research/grounding.json into the item files (research spec §9.2).
// Pure logic lives here; scripts/apply-grounding.ts is the command-line wrapper.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ajv } from "../../src/registry/ajv";
import { groundingSchema } from "../../src/registry/schemas";

export type Json = Record<string, unknown>;

export interface GroundingEntry {
  displayed_grade?: string | null;
  claims: unknown[];
  helps: string;
  backfires: string;
}

export interface GroundingFile {
  generated?: string;
  components?: Record<string, GroundingEntry>;
  variants?: Record<string, GroundingEntry>;
  presets?: Record<string, GroundingEntry>;
  styles?: Record<string, GroundingEntry>;
  protocols?: Record<string, GroundingEntry>;
  collection?: Record<string, GroundingEntry>;
}

export interface ItemFiles {
  components: Record<string, Json>;
  presets: Record<string, Json>;
  styles: { styles: Json[] };
  protocols: { protocols: Json[] };
  collection: Json;
}

/** Styles graded by the research sub-project that sub-project 3 has not added to registry/styles.json yet.
 *  Empty now that Series, Incubation, Ritual and Proof are all in the registry. */
export const PENDING_STYLES: readonly string[] = [];

const SECTIONS = new Set([
  "generated",
  "components",
  "variants",
  "presets",
  "styles",
  "protocols",
  "collection",
]);
const validateGrounding = ajv.compile(groundingSchema);

const omit = (o: Json, key: string): Json => Object.fromEntries(Object.entries(o).filter(([k]) => k !== key));

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, canonical((value as Json)[k])]),
    );
  return value;
}

/** Semantic JSON equality: object key order is ignored, array order is not. */
export function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
}

/** Applies grounding.json to the item files. Pure: returns new files and never mutates its input. */
export function applyGrounding(
  g: GroundingFile,
  input: ItemFiles,
): { files: ItemFiles; errors: string[]; warnings: string[] } {
  const files = structuredClone(input);
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const key of Object.keys(g))
    if (!SECTIONS.has(key)) errors.push(`grounding.json: unknown top-level key "${key}"`);

  // The block an item file stores: the entry without its derived displayed grade (spec §6.3), schema-checked.
  const place = (label: string, entry: GroundingEntry): Json | undefined => {
    const grounding = omit(structuredClone(entry) as unknown as Json, "displayed_grade");
    if (validateGrounding(grounding)) return grounding;
    for (const e of validateGrounding.errors ?? []) {
      const extra = e.keyword === "additionalProperties" ? ` (${e.params.additionalProperty})` : "";
      errors.push(`${label}: grounding${e.instancePath} ${e.message ?? "is invalid"}${extra}`);
    }
    return undefined;
  };

  // Components and presets: every entry must name a file; a file with no entry is left as is.
  const applyToMap = (
    kind: "component" | "preset",
    map: Record<string, Json>,
    entries: Record<string, GroundingEntry>,
  ) => {
    for (const [id, entry] of Object.entries(entries)) {
      const file = Object.hasOwn(map, id) ? map[id] : undefined;
      if (!file) {
        errors.push(`grounding.json ${kind}s: unknown ${kind} "${id}"`);
        continue;
      }
      const grounding = place(`${kind} ${id}`, entry);
      if (grounding) file.grounding = grounding;
    }
    for (const id of Object.keys(map))
      if (!Object.hasOwn(entries, id))
        warnings.push(`${kind} ${id} has no entry in grounding.json; its grounding is left as is`);
  };
  applyToMap("component", files.components, g.components ?? {});
  applyToMap("preset", files.presets, g.presets ?? {});

  // Variants mirror grounding.json exactly: listed ones get it, unlisted ones lose it.
  const variantEntries = g.variants ?? {};
  const realVariantKeys = new Set<string>();
  for (const [id, file] of Object.entries(files.components)) {
    if (!Array.isArray(file.variants)) continue;
    for (const v of file.variants as Json[]) realVariantKeys.add(`${id}/${String(v.id)}`);
    file.variants = (file.variants as Json[]).map((v) => {
      const key = `${id}/${String(v.id)}`;
      const entry = Object.hasOwn(variantEntries, key) ? variantEntries[key] : undefined;
      if (!entry) return omit(v, "grounding");
      const grounding = place(`variant ${key}`, entry);
      return grounding ? { ...v, grounding } : v;
    });
  }
  // Exact match on "${componentId}/${variantId}": a key with an extra segment (e.g. "commit/policy/typo")
  // would otherwise pass this check yet never match the lookup above, so it would apply silently to nothing.
  for (const key of Object.keys(variantEntries))
    if (!realVariantKeys.has(key)) errors.push(`grounding.json variants: unknown variant "${key}"`);

  // Styles: an unlisted style keeps its grounding (warning). Protocols mirror grounding.json exactly.
  const styleEntries = g.styles ?? {};
  files.styles.styles = files.styles.styles.map((s) => {
    const id = String(s.id);
    const entry = Object.hasOwn(styleEntries, id) ? styleEntries[id] : undefined;
    if (!entry) {
      warnings.push(`style ${id} has no entry in grounding.json; its grounding is left as is`);
      return s;
    }
    const grounding = place(`style ${id}`, entry);
    return grounding ? { ...s, grounding } : s;
  });
  for (const id of Object.keys(styleEntries))
    if (!files.styles.styles.some((s) => s.id === id)) {
      if ((PENDING_STYLES as readonly string[]).includes(id))
        warnings.push(
          `style ${id} is graded but not in registry/styles.json yet (pending sub-project 3); its grounding stays in research/grounding.json`,
        );
      else errors.push(`grounding.json styles: unknown style "${id}"`);
    }

  const protocolEntries = g.protocols ?? {};
  files.protocols.protocols = files.protocols.protocols.map((p) => {
    const key = String(p.id);
    const entry = Object.hasOwn(protocolEntries, key) ? protocolEntries[key] : undefined;
    if (!entry) return omit(p, "grounding");
    const grounding = place(`protocol ${key}`, entry);
    return grounding ? { ...p, grounding } : p;
  });
  for (const id of Object.keys(protocolEntries))
    if (!files.protocols.protocols.some((p) => p.id === id))
      errors.push(`grounding.json protocols: unknown protocol "${id}"`);

  // The collection-level claims (claims.md §10 ruling 1; the research files' `collection` section)
  // live in registry/catalogue.json.
  for (const [key, entry] of Object.entries(g.collection ?? {})) {
    if (key !== "collection") {
      errors.push(`grounding.json collection: unknown key "${key}" (the only key is "collection")`);
      continue;
    }
    const grounding = place("the collection", entry);
    if (grounding) files.collection = { ...files.collection, grounding };
  }

  return { files, errors, warnings };
}

/** The item files whose content differs, as repo-relative paths (from packages/switchback) with their new content. */
export function changedFiles(before: ItemFiles, after: ItemFiles): Array<{ path: string; value: Json }> {
  const out: Array<{ path: string; value: Json }> = [];
  for (const [id, value] of Object.entries(after.components))
    if (!sameJson(before.components[id], value)) out.push({ path: `components/${id}/component.json`, value });
  for (const [id, value] of Object.entries(after.presets))
    if (!sameJson(before.presets[id], value)) out.push({ path: `presets/${id}.json`, value });
  if (!sameJson(before.styles, after.styles)) out.push({ path: "registry/styles.json", value: after.styles });
  if (!sameJson(before.protocols, after.protocols))
    out.push({ path: "registry/protocols.json", value: after.protocols });
  if (!sameJson(before.collection, after.collection))
    out.push({ path: "registry/catalogue.json", value: after.collection });
  return out;
}

const readJson = (root: string, rel: string) => JSON.parse(readFileSync(join(root, rel), "utf8"));

/** Reads every item file apply-grounding writes to. Presets are keyed by file name, which equals their id. */
export function loadItemFiles(root: string): ItemFiles {
  const components: Record<string, Json> = {};
  for (const id of readdirSync(join(root, "components")).sort())
    if (existsSync(join(root, "components", id, "component.json")))
      components[id] = readJson(root, `components/${id}/component.json`);
  const presets: Record<string, Json> = {};
  for (const f of readdirSync(join(root, "presets"))
    .filter((f) => f.endsWith(".json"))
    .sort())
    presets[f.slice(0, -".json".length)] = readJson(root, `presets/${f}`);
  return {
    components,
    presets,
    styles: readJson(root, "registry/styles.json"),
    protocols: readJson(root, "registry/protocols.json"),
    collection: readJson(root, "registry/catalogue.json"),
  };
}

export function readGroundingFile(root: string): GroundingFile {
  return readJson(root, "research/grounding.json");
}
