import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { initCommand } from "../../src/cli/commands/init";
import { captureIo } from "../../src/cli/io";
import { kitFromAnswers } from "../../src/cli/profile-edit";

describe("switchback init", () => {
  it("writes the minimum profile with --defaults, refuses to overwrite, and overwrites with --force", async () => {
    const env = { SWITCHBACK_CONFIG_DIR: mkdtempSync(join(tmpdir(), "switchback-init-")) };
    expect(await initCommand(["--defaults"], captureIo(), env, { isTTY: false })).toBe(0);
    expect(existsSync(join(env.SWITCHBACK_CONFIG_DIR, "profile.json"))).toBe(true);
    const io = captureIo();
    expect(await initCommand(["--defaults"], io, env, { isTTY: false })).toBe(1);
    expect(io.stderr.join("\n")).toContain("--force");
    expect(await initCommand(["--defaults", "--force"], captureIo(), env, { isTTY: false })).toBe(0);
  });

  it("needs a terminal for the interactive wizard", async () => {
    const env = { SWITCHBACK_CONFIG_DIR: mkdtempSync(join(tmpdir(), "switchback-init-")) };
    const io = captureIo();
    expect(await initCommand([], io, env, { isTTY: false })).toBe(2);
    expect(io.stderr.join("\n")).toContain("--defaults");
  });
});

describe("kitFromAnswers", () => {
  it("merges typed colours, keeps previous roles, and sets every stationery flag", () => {
    const kit = kitFromAnswers(
      {
        paper: "A4",
        printer: "mono",
        pens: ["black", "red"],
        other: " teal, red ",
        stationery: ["scissors", "camera"],
      },
      { pens: [{ colour: "teal", role: "keep" }] },
    );
    expect(kit.pens).toEqual([{ colour: "black" }, { colour: "red" }, { colour: "teal", role: "keep" }]);
    expect(kit.scissors).toBe(true);
    expect(kit.tape).toBe(false);
    expect(kit.camera).toBe(true);
  });
});
