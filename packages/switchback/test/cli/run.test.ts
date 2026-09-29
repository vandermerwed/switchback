import { describe, expect, it } from "vitest";
import pkg from "../../package.json";
import { captureIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";

describe("run", () => {
  it("prints the version", async () => {
    const io = captureIo();
    expect(await run(["--version"], io)).toBe(0);
    expect(io.stdout).toEqual([pkg.version]);
  });

  it("prints usage and exits 2 with no command", async () => {
    const io = captureIo();
    expect(await run([], io)).toBe(2);
    expect(io.stdout.join("\n")).toContain("switchback <command>");
  });

  it("rejects unknown commands with a usage error", async () => {
    const io = captureIo();
    expect(await run(["frobnicate"], io)).toBe(2);
    expect(io.stderr.join("\n")).toContain("unknown command: frobnicate");
  });

  it("accepts and ignores the global --no-color flag", async () => {
    const io = captureIo();
    expect(await run(["--no-color", "--version"], io)).toBe(0);
    expect(io.stdout).toEqual([pkg.version]);
  });

  it("turns unknown flags into a usage error", async () => {
    const io = captureIo();
    expect(await run(["build", "x.json", "--frobnicate"], io)).toBe(2);
    expect(io.stderr.join("\n")).toContain("frobnicate");
  });
});
