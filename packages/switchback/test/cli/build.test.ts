import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { buildCommand } from "../../src/cli/commands/build";
import { captureIo } from "../../src/cli/io";

let dir: string;
let env: NodeJS.ProcessEnv;
const spec = { switchback: 1, title: "T", pages: [{ id: "W1-P1", component: "pre-mortem" }] };
const noPdf = { findBrowser: () => null, toPdf: async () => {}, open: () => {} };

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "switchback-build-"));
  env = { SWITCHBACK_CONFIG_DIR: join(dir, "config") };
});
const write = (name: string, body: string) => {
  const p = join(dir, name);
  writeFileSync(p, body);
  return p;
};

describe("switchback build", () => {
  it("writes the HTML and the sidecar next to the spec", async () => {
    const io = captureIo();
    const specPath = write("spec.json", JSON.stringify(spec));
    expect(await buildCommand([specPath], io, env, noPdf)).toBe(0);
    expect(existsSync(join(dir, "spec.html"))).toBe(true);
    expect(JSON.parse(readFileSync(join(dir, "spec.switchback.json"), "utf8")).pages[0].component).toBe(
      "pre-mortem",
    );
    expect(io.stdout.join("\n")).toContain("1 page, A4");
  });

  it("reads specs saved with a BOM and CRLF line endings", async () => {
    const specPath = write("windows.json", `\uFEFF${JSON.stringify(spec, null, 2).replace(/\n/g, "\r\n")}`);
    expect(await buildCommand([specPath], captureIo(), env, noPdf)).toBe(0);
  });

  it("creates missing output directories, even with spaces in the path", async () => {
    const out = join(dir, "my prints", "round 1", "sync.html");
    expect(
      await buildCommand([write("spec.json", JSON.stringify(spec)), "-o", out], captureIo(), env, noPdf),
    ).toBe(0);
    expect(existsSync(out)).toBe(true);
    expect(existsSync(join(dir, "my prints", "round 1", "sync.switchback.json"))).toBe(true);
  });

  it("exits 1 with machine-readable diagnostics for a legacy spec", async () => {
    const io = captureIo();
    const code = await buildCommand(
      [write("old.json", JSON.stringify({ kind: "workbook", pages: [] })), "--json"],
      io,
      env,
      noPdf,
    );
    expect(code).toBe(1);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(false);
    expect(out.diagnostics.map((d: { code: string }) => d.code)).toContain("E_LEGACY_KEY");
  });

  it("explains a corrupt profile instead of crashing", async () => {
    mkdirSync(env.SWITCHBACK_CONFIG_DIR!, { recursive: true });
    writeFileSync(join(env.SWITCHBACK_CONFIG_DIR!, "profile.json"), "{ nope");
    const io = captureIo();
    expect(await buildCommand([write("spec.json", JSON.stringify(spec))], io, env, noPdf)).toBe(1);
    expect(io.stderr.join("\n")).toMatch(/E_PROFILE_INVALID[\s\S]*switchback init --force/);
  });

  it("exits 3 but keeps the HTML when no browser is available for --pdf", async () => {
    const io = captureIo();
    expect(await buildCommand([write("spec.json", JSON.stringify(spec)), "--pdf"], io, env, noPdf)).toBe(3);
    expect(existsSync(join(dir, "spec.html"))).toBe(true);
    expect(io.stderr.join("\n")).toContain("W_NO_BROWSER");
  });

  it("names the landscape pages and how to print them when there is no browser for --pdf", async () => {
    const mixed = {
      switchback: 1,
      title: "T",
      pages: [
        { id: "W1-P1", component: "pre-mortem" },
        { id: "W1-P2", component: "options-criteria" },
      ],
    };
    const io = captureIo();
    expect(await buildCommand([write("mixed.json", JSON.stringify(mixed)), "--pdf"], io, env, noPdf)).toBe(3);
    const err = io.stderr.join("\n");
    expect(err).toContain("W1-P2 prints landscape");
    expect(err).toContain("choose Landscape in the print dialog");
    expect(err).not.toContain("W1-P1 prints landscape");
  });

  it("leaves the manual print fix plain when every page is portrait", async () => {
    const io = captureIo();
    await buildCommand([write("spec.json", JSON.stringify(spec)), "--pdf"], io, env, noPdf);
    expect(io.stderr.join("\n")).not.toContain("landscape");
  });

  it("exits 3, keeps the HTML, and leaves no stale PDF when the PDF launch fails", async () => {
    const specPath = write("spec.json", JSON.stringify(spec));
    const pdfPath = join(dir, "spec.pdf");
    writeFileSync(pdfPath, "stale");
    const deps = {
      findBrowser: () => "/fake/chrome",
      toPdf: async () => {
        throw new Error("boom");
      },
      open: () => {},
    };
    const io = captureIo();
    expect(await buildCommand([specPath, "--pdf"], io, env, deps)).toBe(3);
    expect(existsSync(join(dir, "spec.html"))).toBe(true);
    expect(existsSync(pdfPath)).toBe(false);
    expect(io.stderr.join("\n")).toContain("W_PDF_FAILED");
    expect(io.stderr.join("\n")).toContain("boom");
  });

  it("writes a PDF when a browser is found", async () => {
    const calls: string[] = [];
    const deps = {
      findBrowser: () => "/fake/chrome",
      toPdf: async (_html: string, out: string) => void calls.push(out),
      open: () => {},
    };
    expect(
      await buildCommand([write("spec.json", JSON.stringify(spec)), "--pdf"], captureIo(), env, deps),
    ).toBe(0);
    expect(calls).toEqual([join(dir, "spec.pdf")]);
  });

  it("exits 2 for usage errors", async () => {
    await expect(buildCommand([], captureIo(), env, noPdf)).resolves.toBe(2);
    await expect(buildCommand(["x.json", "--frobnicate"], captureIo(), env, noPdf)).rejects.toThrow(
      /frobnicate/,
    );
  });

  it("refuses -o when it resolves to the same path as the input spec", async () => {
    const specPath = write("spec.json", JSON.stringify(spec));
    const io = captureIo();
    expect(await buildCommand([specPath, "-o", specPath], io, env, noPdf)).toBe(2);
    expect(io.stderr.join("\n")).toContain("overwrite the input spec");
  });

  it("reports a missing spec file as E_SPEC_READ (exit 1), not a usage error", async () => {
    const io = captureIo();
    expect(await buildCommand([join(dir, "missing.json")], io, env, noPdf)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_SPEC_READ");
  });

  it("reports a missing spec file as E_SPEC_READ in --json mode", async () => {
    const io = captureIo();
    expect(await buildCommand([join(dir, "missing.json"), "--json"], io, env, noPdf)).toBe(1);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(false);
    expect(out.diagnostics.map((d: { code: string }) => d.code)).toContain("E_SPEC_READ");
  });

  it("reports invalid JSON as E_SPEC_JSON (exit 1), with the parser message", async () => {
    const io = captureIo();
    expect(await buildCommand([write("broken.json", "{ nope")], io, env, noPdf)).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_SPEC_JSON");
  });

  it("reports invalid JSON as E_SPEC_JSON in --json mode", async () => {
    const io = captureIo();
    expect(await buildCommand([write("broken.json", "{ nope"), "--json"], io, env, noPdf)).toBe(1);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(false);
    expect(out.diagnostics.map((d: { code: string }) => d.code)).toContain("E_SPEC_JSON");
  });
});
