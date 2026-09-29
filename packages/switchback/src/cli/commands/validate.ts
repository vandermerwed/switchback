import { buildDocument } from "../../engine/build";
import { hasErrors } from "../../engine/diagnostics";
import { catalogueParts } from "../../registry/catalogue";
import { validateRegistry } from "../../registry/validate";
import { parseCommand, readProfileOrReport, readSpecOrReport, report, UsageError } from "../args";
import type { Io } from "../io";

const USAGE = "usage: switchback validate [spec.json] [--strict] [--json]";

export async function validateCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number> {
  const { values, positionals } = parseCommand(
    argv,
    { strict: { type: "boolean" }, json: { type: "boolean" } },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const json = values.json === true;
  const specPath = positionals[0];

  if (!specPath) {
    const parts = catalogueParts();
    const diagnostics = validateRegistry(parts, { strict: values.strict === true });
    if (json) report(diagnostics, io, true);
    else if (diagnostics.length) report(diagnostics, io, false);
    else
      io.out(
        `ok: ${parts.components.length} components, ${parts.presets.length} preset${parts.presets.length === 1 ? "" : "s"}${values.strict ? " (strict)" : ""}`,
      );
    return hasErrors(diagnostics) ? 1 : 0;
  }

  if (values.strict)
    throw new UsageError(
      "--strict applies to the registry; run `switchback validate --strict` without a spec",
    );

  const specResult = readSpecOrReport(specPath, io, json);
  if (!specResult.ok) return 1;
  const raw = specResult.raw;
  const profile = readProfileOrReport(env, io, json);
  if (!profile.ok) return 1;
  const { diagnostics } = buildDocument(raw, { profileKit: profile.profile?.kit, embedFonts: false });
  if (json) report(diagnostics, io, true);
  else if (diagnostics.length) report(diagnostics, io, false);
  else io.out(`ok: ${specPath}`);
  return hasErrors(diagnostics) ? 1 : 0;
}
