import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { error } from "../../engine/diagnostics";
import { resolveKit } from "../../engine/kit";
import { assignPens, describeAssignment, orderByPriority } from "../../engine/pens";
import { defaultProfile, migrate, type Profile, profilePath, writeProfile } from "../../engine/profile";
import { ajv } from "../../registry/ajv";
import { loadRegistries } from "../../registry/registries";
import { profileSchema } from "../../registry/schemas";
import { parseCommand, readProfileOrReport, report } from "../args";
import type { Io } from "../io";
import { applySet } from "../profile-edit";

const USAGE = "usage: switchback profile [--json] [--path] [--set key=value ...] [--import file|-]";
const validateProfile = ajv.compile(profileSchema);

export interface ProfileDeps {
  readStdin: () => string;
}

export async function profileCommand(
  argv: string[],
  io: Io,
  env: NodeJS.ProcessEnv,
  deps: ProfileDeps = { readStdin: () => readFileSync(0, "utf8") },
): Promise<number> {
  const { values } = parseCommand(
    argv,
    {
      json: { type: "boolean" },
      path: { type: "boolean" },
      set: { type: "string", multiple: true },
      import: { type: "string" },
    },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const path = profilePath(env);
  if (values.path) {
    io.out(path);
    return 0;
  }
  if (values.import !== undefined) {
    const src = values.import as string;
    let profile: Profile;
    try {
      const text = (src === "-" ? deps.readStdin() : readFileSync(src, "utf8")).replace(/^﻿/, "");
      const raw: unknown = JSON.parse(text);
      // The whole file is checked before migrate() or any write: migrate() tolerates old and
      // partial profiles on disk, but an import must be exactly the current shape.
      if (!validateProfile(raw)) {
        const details = (validateProfile.errors ?? [])
          .map((e) => `${e.instancePath || "/"} ${e.message ?? "is invalid"}`)
          .join("; ");
        throw new Error(`it doesn't match the profile shape: ${details}`);
      }
      profile = migrate(raw);
    } catch (e) {
      report(
        [
          error(
            "E_PROFILE_IMPORT",
            `could not import the profile: ${(e as Error).message}`,
            "fix the file; see `switchback profile --json` for the shape",
          ),
        ],
        io,
        values.json === true,
      );
      return 1;
    }
    if (existsSync(path)) copyFileSync(path, `${path}.bak`);
    writeProfile(profile, path);
  }
  const read = readProfileOrReport(env, io, values.json === true);
  if (!read.ok) return 1;
  let profile = read.profile;

  const sets = (values.set as string[] | undefined) ?? [];
  if (sets.length) {
    profile ??= defaultProfile();
    for (const pair of sets) {
      const eq = pair.indexOf("=");
      if (eq < 1) {
        io.err(`--set needs key=value, got "${pair}"\n\n${USAGE}`);
        return 2;
      }
      profile = applySet(profile, pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
    }
    writeProfile(profile, path);
  }

  const { roles } = loadRegistries();
  const kit = resolveKit({ profile: profile?.kit }).kit;
  const { mapping, unassigned } = assignPens(kit, roles);
  if (values.json) {
    io.out(JSON.stringify({ path, profile, kit, pens: mapping, unassigned }, null, 2));
    return 0;
  }
  io.out(
    profile
      ? `profile: ${path}`
      : "no profile yet: showing the minimum kit. Run `switchback init` to set up your desk.",
  );
  io.out(`paper ${kit.paper} · printer ${kit.printer} · pens ${kit.pens.map((p) => p.colour).join(", ")}`);
  const stationery = Object.entries(kit)
    .filter(([k, v]) => v === true && k !== "pens")
    .map(([k]) => k);
  io.out(`on the desk: ${stationery.join(", ") || "nothing extra"}`);
  io.out("colour roles:");
  for (const r of orderByPriority(roles))
    io.out(`  ${r.code} ${r.name.padEnd(7)} ${describeAssignment(mapping[r.id])}`);
  if (unassigned.length)
    io.out(`pens without a role: ${unassigned.join(", ")} (set one with --set role.<role>=<colour>)`);
  return 0;
}
