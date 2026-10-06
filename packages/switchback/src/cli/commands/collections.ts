import { type Catalogue, loadCatalogue } from "../../registry/catalogue";
import { membersOf } from "../../registry/collections";
import { parseCommand } from "../args";
import type { Io } from "../io";

const USAGE = "usage: switchback collections [--json]";

export interface CollectionRow {
  id: string;
  name: string;
  description: string;
  count: number;
  own: string[];
  includes: string[];
}

/** One row per collection: what it is for and how many templates it holds. */
export function collectionRows(cat: Catalogue): CollectionRow[] {
  return [...cat.collections.values()].map((c) => ({
    id: c.meta.id,
    name: c.meta.name,
    description: c.meta.description,
    count: membersOf(cat, c.meta.id).length,
    own: c.presets.map((p) => p.id),
    includes: c.meta.includes,
  }));
}

export async function collectionsCommand(argv: string[], io: Io, _env: NodeJS.ProcessEnv): Promise<number> {
  const { values } = parseCommand(argv, { json: { type: "boolean" } }, USAGE);
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const rows = collectionRows(loadCatalogue());
  if (values.json) {
    io.out(JSON.stringify(rows, null, 2));
    return 0;
  }
  const idWidth = Math.max(...rows.map((r) => r.id.length), 2);
  const countWidth = Math.max(...rows.map((r) => String(r.count).length), 1);
  for (const r of rows)
    io.out(`${r.id.padEnd(idWidth)}  ${String(r.count).padStart(countWidth)}  ${r.name}: ${r.description}`);
  io.out(`\n${rows.length} collection${rows.length === 1 ? "" : "s"}`);
  return 0;
}
