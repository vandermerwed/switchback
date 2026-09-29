import { readFileSync } from "node:fs";
import { type ParseArgsConfig, parseArgs } from "node:util";
import { error, formatDiagnostic } from "../engine/diagnostics";
import { type Profile, ProfileError, profilePath, readProfile } from "../engine/profile";
import type { Diagnostic } from "../engine/types";
import type { Io } from "./io";

export class UsageError extends Error {}

export type Command = (argv: string[], io: Io, env: NodeJS.ProcessEnv) => Promise<number>;

export function parseCommand(
  argv: string[],
  options: NonNullable<ParseArgsConfig["options"]>,
  usage: string,
) {
  try {
    const parsed = parseArgs({
      args: argv,
      options: { ...options, help: { type: "boolean", short: "h" } },
      allowPositionals: true,
      strict: true,
    });
    return { values: parsed.values as Record<string, unknown>, positionals: parsed.positionals };
  } catch (e) {
    throw new UsageError(`${(e as Error).message}\n\n${usage}`);
  }
}

export function report(
  diagnostics: Diagnostic[],
  io: Io,
  json: boolean,
  extra: Record<string, unknown> = {},
): void {
  if (json)
    io.out(
      JSON.stringify({ ok: !diagnostics.some((d) => d.level === "error"), ...extra, diagnostics }, null, 2),
    );
  else for (const d of diagnostics) io.err(formatDiagnostic(d));
}

export function readProfileOrReport(
  env: NodeJS.ProcessEnv,
  io: Io,
  json: boolean,
): { ok: true; profile: Profile | null } | { ok: false } {
  try {
    return { ok: true, profile: readProfile(profilePath(env)) };
  } catch (e) {
    if (!(e instanceof ProfileError)) throw e;
    report([error("E_PROFILE_INVALID", e.message, e.fix)], io, json);
    return { ok: false };
  }
}

/** Reads a JSON file, tolerating a UTF-8 BOM and CRLF line endings. */
export function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
}

/**
 * Reads and parses a spec file, reporting agent-readable diagnostics (E_SPEC_READ,
 * E_SPEC_JSON) through `report()` instead of a plain stderr line. A missing or
 * unreadable file, and invalid JSON, are both spec problems (exit 1), not usage
 * errors (exit 2) — the positional argument itself was given.
 */
export function readSpecOrReport(
  path: string,
  io: Io,
  json: boolean,
): { ok: true; raw: unknown } | { ok: false } {
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (e) {
    report(
      [
        error(
          "E_SPEC_READ",
          `could not read ${path}: ${(e as Error).message}`,
          "check the path and try again",
        ),
      ],
      io,
      json,
    );
    return { ok: false };
  }
  let raw: unknown;
  try {
    raw = JSON.parse(text.replace(/^\uFEFF/, ""));
  } catch (e) {
    report(
      [
        error(
          "E_SPEC_JSON",
          `${path} is not valid JSON: ${(e as Error).message}`,
          "fix the JSON syntax, or start from an example: `switchback show <id> --json`",
        ),
      ],
      io,
      json,
    );
    return { ok: false };
  }
  return { ok: true, raw };
}
