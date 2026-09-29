import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import envPaths from "env-paths";
import { ajv } from "../registry/ajv";
import { kitSchema } from "../registry/schemas";
import type { KitInput } from "./types";

export const PROFILE_VERSION = 1;

const validateKit = ajv.compile(kitSchema);

export interface Profile {
  version: 1;
  kit: KitInput;
  defaults: { style: string; sitting: string };
}

export class ProfileError extends Error {
  constructor(
    message: string,
    readonly fix: string,
  ) {
    super(message);
    this.name = "ProfileError";
  }
}

export function profilePath(env: NodeJS.ProcessEnv = process.env): string {
  const dir = env.SWITCHBACK_CONFIG_DIR ?? envPaths("switchback", { suffix: "" }).config;
  return join(dir, "profile.json");
}

export function defaultProfile(): Profile {
  return { version: 1, kit: {}, defaults: { style: "sitting", sitting: "40 min" } };
}

export function migrate(raw: unknown): Profile {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new ProfileError(
      "the profile is not a JSON object",
      "Run `switchback init --force` to recreate it.",
    );
  }
  const obj = raw as { version?: unknown; kit?: KitInput; defaults?: Partial<Profile["defaults"]> };
  const version = obj.version ?? 0;
  if (version !== 0 && version !== 1) {
    throw new ProfileError(
      `the profile is version ${String(version)}, which is newer than this CLI understands`,
      "Upgrade with `npm i -g @vandermerwed/switchback@latest`.",
    );
  }
  const kit = obj.kit ?? {};
  if (!validateKit(kit)) {
    const details = (validateKit.errors ?? [])
      .map((e) => `${e.instancePath || "/"} ${e.message ?? "is invalid"}`)
      .join("; ");
    throw new ProfileError(
      `the profile's kit is invalid: ${details}`,
      "Run `switchback init --force`, or correct it with `switchback profile --set …`.",
    );
  }
  return {
    version: 1,
    kit,
    defaults: { ...defaultProfile().defaults, ...(obj.defaults ?? {}) },
  };
}

export function readProfile(path: string = profilePath()): Profile | null {
  if (!existsSync(path)) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, "utf8").replace(/^﻿/, ""));
  } catch {
    throw new ProfileError(
      `the profile at ${path} is not valid JSON`,
      "Run `switchback init --force` to recreate it.",
    );
  }
  const profile = migrate(raw);
  if ((raw as { version?: unknown }).version !== PROFILE_VERSION) {
    copyFileSync(path, `${path}.bak`);
    writeProfile(profile, path);
  }
  return profile;
}

export function writeProfile(profile: Profile, path: string = profilePath()): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(profile, null, 2)}\n`, "utf8");
}
