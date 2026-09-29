import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import {
  defaultProfile,
  ProfileError,
  profilePath,
  readProfile,
  writeProfile,
} from "../../src/engine/profile";

let dir: string;
let path: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "switchback-profile-"));
  path = profilePath({ SWITCHBACK_CONFIG_DIR: dir });
});

describe("profile", () => {
  it("resolves inside SWITCHBACK_CONFIG_DIR", () => {
    expect(path).toBe(join(dir, "profile.json"));
  });

  it("returns null when there is no profile yet", () => {
    expect(readProfile(path)).toBeNull();
  });

  it("round-trips a profile", () => {
    const profile = { ...defaultProfile(), kit: { scissors: true, pens: [{ colour: "red" }] } };
    writeProfile(profile, path);
    expect(readProfile(path)).toEqual(profile);
  });

  it("upgrades an unversioned profile and keeps a backup", () => {
    writeFileSync(path, JSON.stringify({ kit: { tape: true } }));
    const profile = readProfile(path);
    expect(profile?.version).toBe(1);
    expect(profile?.kit).toEqual({ tape: true });
    expect(existsSync(`${path}.bak`)).toBe(true);
    expect(JSON.parse(readFileSync(path, "utf8")).version).toBe(1);
  });

  it("reads a file with a UTF-8 BOM", () => {
    writeFileSync(path, `﻿${JSON.stringify(defaultProfile())}`);
    expect(readProfile(path)?.version).toBe(1);
  });

  it("explains a corrupt profile with a fix", () => {
    writeFileSync(path, "{ not json");
    try {
      readProfile(path);
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(ProfileError);
      expect((error as ProfileError).fix).toContain("switchback init --force");
    }
  });

  it("refuses a profile from a newer CLI", () => {
    writeFileSync(path, JSON.stringify({ version: 9, kit: {} }));
    expect(() => readProfile(path)).toThrow(/newer/);
  });

  describe("a malformed kit", () => {
    const cases: Array<[string, unknown]> = [
      ["pens as a string", { pens: "blue" }],
      ["a pen with a non-string colour", { pens: [{ colour: 5 }] }],
      ["a null pen", { pens: [null] }],
      ["an unsupported paper", { paper: "B5" }],
      ["a non-boolean stationery flag", { scissors: "yes" }],
      ["an unknown top-level key", { role: "boss" }],
    ];
    it.each(cases)("rejects %s", (_label, kit) => {
      writeFileSync(path, JSON.stringify({ version: 1, kit }));
      try {
        readProfile(path);
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ProfileError);
        expect((error as ProfileError).message).toContain("kit is invalid");
        expect((error as ProfileError).fix).toContain("switchback init --force");
        expect((error as ProfileError).fix).toContain("switchback profile --set");
      }
    });
  });
});
