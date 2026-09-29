import { resolveKit } from "../../engine/kit";
import { assignPens, describeAssignment, orderByPriority } from "../../engine/pens";
import { loadRegistries } from "../../registry/registries";
import { parseCommand, readProfileOrReport } from "../args";
import type { Io } from "../io";

const USAGE = "usage: switchback legend [--json]";

export async function legendCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number> {
  const { values } = parseCommand(argv, { json: { type: "boolean" } }, USAGE);
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const json = values.json === true;
  const read = readProfileOrReport(env, io, json);
  if (!read.ok) return 1;
  const { roles, marks, confidence } = loadRegistries();
  const { kit, source } = resolveKit({ profile: read.profile?.kit });
  const { mapping } = assignPens(kit, roles);
  if (json) {
    io.out(
      JSON.stringify(
        {
          roles: orderByPriority(roles).map((r) => ({ ...r, assignment: mapping[r.id] })),
          marks,
          confidence,
          kit_source: source,
        },
        null,
        2,
      ),
    );
    return 0;
  }
  io.out("colour roles (priority order):");
  for (const r of orderByPriority(roles))
    io.out(
      `  ${r.code} ${r.name.padEnd(7)} ${r.meaning.padEnd(44)} proof: ${(r.proof_label ?? "none").padEnd(10)} ${describeAssignment(mapping[r.id])}`,
    );
  io.out("marks:");
  for (const m of marks)
    io.out(`  ${m.glyph}  ${m.meaning}${m.proof_label ? ` (proof: ${m.proof_label})` : ""}`);
  io.out("confidence:");
  for (const c of confidence) io.out(`  ${c.mark}  ${c.level}: ${c.meaning}`);
  return 0;
}
