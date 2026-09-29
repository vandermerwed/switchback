import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { profileCommand } from "../../src/cli/commands/profile";
import { captureIo } from "../../src/cli/io";
import { applySet } from "../../src/cli/profile-edit";
import { defaultProfile } from "../../src/engine/profile";

const fresh = () => ({ SWITCHBACK_CONFIG_DIR: mkdtempSync(join(tmpdir(), "switchback-prof-")) });
const json = (io: ReturnType<typeof captureIo>) => JSON.parse(io.stdout.join("\n"));

describe("applySet", () => {
  it("keeps roles when the pen list changes and moves a role between pens", () => {
    let p = applySet(defaultProfile(), "pens", "blue, red");
    p = applySet(p, "role.stop", "pink");
    expect(p.kit.pens).toEqual([{ colour: "blue" }, { colour: "red" }, { colour: "pink", role: "stop" }]);
    p = applySet(p, "pens", "blue,pink");
    expect(p.kit.pens).toEqual([{ colour: "blue" }, { colour: "pink", role: "stop" }]);
  });

  it("parses booleans and rejects unknown keys", () => {
    expect(applySet(defaultProfile(), "scissors", "yes").kit.scissors).toBe(true);
    expect(() => applySet(defaultProfile(), "laser", "true")).toThrow(/unknown setting/);
    expect(() => applySet(defaultProfile(), "role.vibes", "red")).toThrow(/unknown role/);
  });
});

describe("switchback profile", () => {
  it("shows the minimum kit mapping when there is no profile yet", async () => {
    const io = captureIo();
    expect(await profileCommand(["--json"], io, fresh())).toBe(0);
    expect(json(io).profile).toBeNull();
    expect(json(io).pens.ask).toEqual({ letter: "Q" });
  });

  it("saves --set edits and reports the new mapping", async () => {
    const env = fresh();
    const io = captureIo();
    expect(
      await profileCommand(["--set", "pens=blue,red", "--set", "scissors=true", "--json"], io, env),
    ).toBe(0);
    expect(json(io).pens.stop).toEqual({ pen: "red" });
    expect(json(io).profile.kit.scissors).toBe(true);
  });

  it("prints the path", async () => {
    const env = fresh();
    const io = captureIo();
    await profileCommand(["--path"], io, env);
    expect(io.stdout).toEqual([join(env.SWITCHBACK_CONFIG_DIR, "profile.json")]);
  });

  it("reports a corrupt profile with a fix", async () => {
    const env = fresh();
    mkdirSync(env.SWITCHBACK_CONFIG_DIR, { recursive: true });
    writeFileSync(join(env.SWITCHBACK_CONFIG_DIR, "profile.json"), "nope");
    const io = captureIo();
    expect(await profileCommand([], io, env)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_PROFILE_INVALID");
  });
});
