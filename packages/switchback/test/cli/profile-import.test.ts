import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { profileCommand } from "../../src/cli/commands/profile";
import { captureIo } from "../../src/cli/io";

const fresh = () => mkdtempSync(join(tmpdir(), "sb-import-"));
const good = {
  version: 1,
  kit: { paper: "Letter", pens: [{ colour: "blue" }, { colour: "red", role: "stop" }], scissors: true },
  defaults: { style: "sitting", sitting: "30 min" },
};

describe("profile --import", () => {
  it("imports a file and round-trips it", async () => {
    const dir = fresh();
    writeFileSync(join(dir, "p.json"), JSON.stringify(good));
    const io = captureIo();
    expect(
      await profileCommand(["--import", join(dir, "p.json"), "--json"], io, { SWITCHBACK_CONFIG_DIR: dir }),
    ).toBe(0);
    expect(JSON.parse(readFileSync(join(dir, "profile.json"), "utf8"))).toEqual(good);
    expect(JSON.parse(io.stdout.join("\n")).pens.stop).toEqual({ pen: "red" });
  });
  it("imports from stdin", async () => {
    const dir = fresh();
    const io = captureIo();
    expect(
      await profileCommand(
        ["--import", "-"],
        io,
        { SWITCHBACK_CONFIG_DIR: dir },
        { readStdin: () => JSON.stringify(good) },
      ),
    ).toBe(0);
    expect(existsSync(join(dir, "profile.json"))).toBe(true);
  });
  it("backs up the profile it overwrites", async () => {
    const dir = fresh();
    const old = { ...good, kit: { paper: "A4" } };
    writeFileSync(join(dir, "profile.json"), JSON.stringify(old));
    const io = captureIo();
    expect(
      await profileCommand(
        ["--import", "-"],
        io,
        { SWITCHBACK_CONFIG_DIR: dir },
        { readStdin: () => JSON.stringify(good) },
      ),
    ).toBe(0);
    expect(JSON.parse(readFileSync(join(dir, "profile.json.bak"), "utf8"))).toEqual(old);
    expect(JSON.parse(readFileSync(join(dir, "profile.json"), "utf8"))).toEqual(good);
  });
  const refused: Array<[string, string]> = [
    ["invalid JSON", "{not json"],
    ["an array", "[]"],
    ["an invalid kit", JSON.stringify({ version: 1, kit: { paper: "A5" } })],
    ["a newer version", JSON.stringify({ version: 2, kit: {} })],
    ["an unknown top-level key", JSON.stringify({ ...good, colours: ["red"] })],
    ["an unknown defaults key", JSON.stringify({ ...good, defaults: { style: "sitting", pace: "slow" } })],
    ["a non-string sitting", JSON.stringify({ ...good, defaults: { sitting: 42 } })],
    ["a missing kit", JSON.stringify({ version: 1, defaults: good.defaults })],
    ["a missing version", JSON.stringify({ kit: good.kit })],
  ];
  it.each(refused)("refuses %s and leaves the existing profile untouched", async (_name, text) => {
    const dir = fresh();
    writeFileSync(join(dir, "profile.json"), JSON.stringify(good));
    const io = captureIo();
    expect(
      await profileCommand(["--import", "-"], io, { SWITCHBACK_CONFIG_DIR: dir }, { readStdin: () => text }),
    ).toBe(1);
    const err = io.stderr.join("\n");
    expect(err).toContain("E_PROFILE_IMPORT");
    expect(err).toContain("fix the file; see `switchback profile --json` for the shape");
    expect(err).not.toContain("init --force");
    expect(JSON.parse(readFileSync(join(dir, "profile.json"), "utf8"))).toEqual(good);
    expect(existsSync(join(dir, "profile.json.bak"))).toBe(false);
  });
  it.each(refused)("writes nothing for %s when there is no profile yet", async (_name, text) => {
    const dir = fresh();
    const io = captureIo();
    expect(
      await profileCommand(["--import", "-"], io, { SWITCHBACK_CONFIG_DIR: dir }, { readStdin: () => text }),
    ).toBe(1);
    expect(existsSync(join(dir, "profile.json"))).toBe(false);
    expect(existsSync(join(dir, "profile.json.bak"))).toBe(false);
  });
});
