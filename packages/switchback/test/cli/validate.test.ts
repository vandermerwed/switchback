import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateCommand } from "../../src/cli/commands/validate";
import { captureIo } from "../../src/cli/io";

const dir = mkdtempSync(join(tmpdir(), "switchback-validate-"));
const env = { SWITCHBACK_CONFIG_DIR: join(dir, "config") };

describe("switchback validate", () => {
  it("validates the registry when run without a spec", async () => {
    const io = captureIo();
    expect(await validateCommand([], io, env)).toBe(0);
    expect(io.stdout.join("\n")).toMatch(/^ok: 37 components, 15 presets, 9 collections/);
  });

  it("passes the registry in --strict mode now that every item is graded", async () => {
    const io = captureIo();
    expect(await validateCommand(["--strict"], io, env)).toBe(0);
    expect(io.stdout.join("\n")).toMatch(/^ok: 37 components, 15 presets, 9 collections \(strict\)/);
  });

  it("validates a spec without writing anything", async () => {
    const good = join(dir, "good.json");
    writeFileSync(good, JSON.stringify({ switchback: 1, pages: [{ id: "W1-P1", component: "pre-mortem" }] }));
    expect(await validateCommand([good], captureIo(), env)).toBe(0);
    const over = join(dir, "over.json");
    writeFileSync(
      over,
      JSON.stringify({
        switchback: 1,
        pages: Array.from({ length: 11 }, (_, i) => ({ id: `W1-P${i + 1}`, component: "pre-mortem" })),
      }),
    );
    const io = captureIo();
    expect(await validateCommand([over], io, env)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_BUDGET");
  });

  it("refuses --strict with a spec argument as a usage error", async () => {
    const good = join(dir, "good2.json");
    writeFileSync(good, JSON.stringify({ switchback: 1, pages: [{ id: "W1-P1", component: "pre-mortem" }] }));
    await expect(validateCommand([good, "--strict"], captureIo(), env)).rejects.toThrow(
      /--strict applies to the registry/,
    );
  });

  it("reports a missing spec file as E_SPEC_READ (exit 1), not a usage error", async () => {
    const io = captureIo();
    expect(await validateCommand([join(dir, "missing.json")], io, env)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_SPEC_READ");
  });

  it("reports a missing spec file as E_SPEC_READ in --json mode", async () => {
    const io = captureIo();
    expect(await validateCommand([join(dir, "missing.json"), "--json"], io, env)).toBe(1);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(false);
    expect(out.diagnostics.map((d: { code: string }) => d.code)).toContain("E_SPEC_READ");
  });

  it("reports invalid JSON as E_SPEC_JSON (exit 1), with the parser message", async () => {
    const broken = join(dir, "broken.json");
    writeFileSync(broken, "{ nope");
    const io = captureIo();
    expect(await validateCommand([broken], io, env)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_SPEC_JSON");
  });

  it("reports invalid JSON as E_SPEC_JSON in --json mode", async () => {
    const broken = join(dir, "broken2.json");
    writeFileSync(broken, "{ nope");
    const io = captureIo();
    expect(await validateCommand([broken, "--json"], io, env)).toBe(1);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(false);
    expect(out.diagnostics.map((d: { code: string }) => d.code)).toContain("E_SPEC_JSON");
  });
});
