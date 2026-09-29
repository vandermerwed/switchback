import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { captureIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";
import { packageRoot } from "../../src/shell/fonts";

// heic-decode pulls in a multi-megabyte wasm bundle. It must load only inside media's HEIC
// decode path, never for every command. The factory runs when (and only when) it's imported.
const loads = vi.hoisted(() => ({ count: 0 }));
vi.mock("heic-decode", async (importOriginal) => {
  loads.count++;
  return importOriginal();
});

const fx = (f: string) => join(packageRoot(), "test/fixtures/photos", f);

describe("heic-decode is loaded lazily", () => {
  it("is not loaded by `switchback --version`, or by media without a HEIC", async () => {
    expect(await run(["--version"], captureIo())).toBe(0);
    expect(loads.count).toBe(0);
    const out = mkdtempSync(join(tmpdir(), "sb-lazy-"));
    expect(
      await run(["media", fx("plain.png"), "-o", out], captureIo(), { SWITCHBACK_CONFIG_DIR: out }),
    ).toBe(0);
    expect(loads.count).toBe(0);
  });

  it("is loaded once a HEIC needs decoding", async () => {
    const out = mkdtempSync(join(tmpdir(), "sb-lazy-"));
    const io = captureIo();
    expect(
      await run(["media", fx("pattern.heic"), "-o", out, "--json"], io, { SWITCHBACK_CONFIG_DIR: out }),
    ).toBe(0);
    expect(loads.count).toBe(1);
    expect(JSON.parse(io.stdout.join("\n")).media[0]).toMatchObject({ format: "heic", width: 64 });
  });
});
