import { resolveKit } from "../../engine/kit";
import { chooseVariant } from "../../engine/resolve";
import type { ComponentMeta } from "../../engine/types";
import { loadCatalogue } from "../../registry/catalogue";
import { parseCommand, readProfileOrReport, UsageError } from "../args";
import type { Io } from "../io";

const USAGE =
  "usage: switchback list [--kind page|piece|preset] [--tag T] [--phase diverge|converge|either] [--fits-kit] [--all] [--json]";
const KINDS = ["page", "piece", "preset"];
const PHASES = ["diverge", "converge", "either"];

interface Row {
  id: string;
  kind: string;
  phase: string;
  tags: string[];
  name: string;
  intent: string;
}

export async function listCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number> {
  const { values } = parseCommand(
    argv,
    {
      kind: { type: "string" },
      tag: { type: "string" },
      phase: { type: "string" },
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
  const profile = readProfileOrReport(env, io, values.json === true);
  if (!profile.ok) return 1;
  const kit = resolveKit({ profile: profile.profile?.kit }).kit;
  const cat = loadCatalogue();
  const fits = (meta: ComponentMeta) => chooseVariant(meta, kit).ok;

  const rows: Array<Row & { meta: ComponentMeta }> = [];
  for (const c of cat.components.values()) {
    if (c.meta.listed === false && !values.all) continue;
    rows.push({
      id: c.meta.id,
      kind: c.meta.kind,
      phase: c.meta.phase,
      tags: c.meta.tags,
      name: c.meta.name,
      intent: c.meta.intent,
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
        meta: base.meta,
      });
  }
  const selected = rows
    .filter((r) => !values.kind || r.kind === values.kind)
    .filter((r) => !values.tag || r.tags.includes(values.tag as string))
    .filter((r) => !values.phase || r.phase === values.phase)
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
      `${r.id.padEnd(w.id)}  ${r.kind.padEnd(w.kind)}  ${r.phase.padEnd(w.phase)}  ${tagsText(r).padEnd(w.tags)}  ${r.name}`,
    );
  io.out(`\n${selected.length} item${selected.length === 1 ? "" : "s"}`);
  return 0;
}
