import { resolveKit } from "../../engine/kit";
import { chooseVariant } from "../../engine/resolve";
import type { Basis, ComponentMeta } from "../../engine/types";
import { basisOf } from "../../registry/basis";
import { type Catalogue, loadCatalogue } from "../../registry/catalogue";
import { membersOf } from "../../registry/collections";
import { parseCommand, readProfileOrReport, UsageError } from "../args";
import type { Io } from "../io";

const USAGE =
  "usage: switchback list [--kind page|piece|preset] [--tag T] [--phase diverge|converge|either] [--basis research|practice] [--collection ID] [--fits-kit] [--all] [--json]";
const KINDS = ["page", "piece", "preset"];
const PHASES = ["diverge", "converge", "either"];
const BASES = ["research", "practice"];

interface Row {
  id: string;
  kind: string;
  phase: string;
  tags: string[];
  name: string;
  intent: string;
  basis: Basis;
}

export type ListRow = Row & { meta: ComponentMeta };

/** One row per listed component and preset, with the basis each one rests on. */
export function listRows(cat: Catalogue, opts: { all?: boolean }): ListRow[] {
  const rows: ListRow[] = [];
  for (const c of cat.components.values()) {
    if (c.meta.listed === false && !opts.all) continue;
    rows.push({
      id: c.meta.id,
      kind: c.meta.kind,
      phase: c.meta.phase,
      tags: c.meta.tags,
      name: c.meta.name,
      intent: c.meta.intent,
      basis: basisOf(c.meta),
      meta: c.meta,
    });
  }
  for (const p of cat.presets.values()) {
    const base = cat.components.get(p.extends);
    if (base)
      rows.push({
        id: p.id,
        kind: "preset",
        phase: base.meta.phase,
        tags: p.tags,
        name: p.name,
        intent: `${base.meta.name} preset`,
        basis: basisOf(base.meta, p),
        meta: base.meta,
      });
  }
  return rows;
}

export async function listCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number> {
  const { values } = parseCommand(
    argv,
    {
      kind: { type: "string" },
      tag: { type: "string" },
      phase: { type: "string" },
      basis: { type: "string" },
      collection: { type: "string" },
      "fits-kit": { type: "boolean" },
      all: { type: "boolean" },
      json: { type: "boolean" },
    },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  if (values.kind !== undefined && !KINDS.includes(values.kind as string))
    throw new UsageError(`--kind must be one of ${KINDS.join(", ")}`);
  if (values.phase !== undefined && !PHASES.includes(values.phase as string))
    throw new UsageError(`--phase must be one of ${PHASES.join(", ")}`);
  if (values.basis !== undefined && !BASES.includes(values.basis as string))
    throw new UsageError(`--basis must be one of ${BASES.join(", ")}`);
  const cat = loadCatalogue();
  if (values.collection !== undefined && !cat.collections.has(values.collection as string))
    throw new UsageError(
      `unknown collection "${values.collection}"; see \`switchback collections\` for the shelves`,
    );
  const onShelf = values.collection ? new Set(membersOf(cat, values.collection as string)) : null;
  const profile = readProfileOrReport(env, io, values.json === true);
  if (!profile.ok) return 1;
  const kit = resolveKit({ profile: profile.profile?.kit }).kit;
  const fits = (meta: ComponentMeta) => chooseVariant(meta, kit).ok;

  const selected = listRows(cat, { all: values.all === true })
    .filter((r) => !values.kind || r.kind === values.kind)
    .filter((r) => !values.tag || r.tags.includes(values.tag as string))
    .filter((r) => !values.phase || r.phase === values.phase)
    .filter((r) => !values.basis || r.basis === values.basis)
    .filter((r) => !onShelf || onShelf.has(r.id))
    .filter((r) => !values["fits-kit"] || fits(r.meta))
    .map(({ meta: _meta, ...row }) => row);

  if (values.json) {
    io.out(JSON.stringify(selected, null, 2));
    return 0;
  }
  const width = (key: keyof Row) => Math.max(...selected.map((r) => String(r[key]).length), key.length);
  const tagsText = (r: Row) => r.tags.join(", ");
  const w = {
    id: width("id"),
    kind: width("kind"),
    phase: width("phase"),
    tags: Math.max(...selected.map((r) => tagsText(r).length), 4),
  };
  for (const r of selected)
    io.out(
      `${r.id.padEnd(w.id)}  ${r.kind.padEnd(w.kind)}  ${r.phase.padEnd(w.phase)}  ${tagsText(r).padEnd(w.tags)}  ${r.name}${r.basis === "practice" ? "  (practical)" : ""}`,
    );
  io.out(`\n${selected.length} item${selected.length === 1 ? "" : "s"}`);
  return 0;
}
