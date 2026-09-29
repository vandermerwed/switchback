import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { captureIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";

describe("switchback proof", () => {
  it("writes a spec next to the document and reports it as JSON", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-proof-"));
    const doc = join(dir, "draft.md");
    writeFileSync(doc, "# Draft\n\nOne.\n\nTwo.\n");
    const io = captureIo();
    expect(await run(["proof", doc, "--json"], io, { SWITCHBACK_CONFIG_DIR: dir })).toBe(0);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.ok).toBe(true);
    expect(out.specs).toEqual([join(dir, "draft.proof.json")]);
    const spec = JSON.parse(readFileSync(out.specs[0], "utf8"));
    expect(spec).toMatchObject({ switchback: 1, style: "proof", title: "Draft" });
  });
  it.each([
    ["out", "out"],
    ["out.JSON", "out"],
    ["out.txt", "out.txt"],
  ])("writes a distinct file for every part with -o %s", async (o, stem) => {
    const dir = mkdtempSync(join(tmpdir(), "sb-proof-"));
    const doc = join(dir, "long.md");
    writeFileSync(doc, Array.from({ length: 3 }, () => "word ".repeat(400)).join("\n\n"));
    const io = captureIo();
    expect(
      await run(["proof", doc, "-o", join(dir, o), "--max-pages", "1", "--json"], io, {
        SWITCHBACK_CONFIG_DIR: dir,
      }),
    ).toBe(0);
    const out = JSON.parse(io.stdout.join("\n"));
    expect(out.specs).toEqual([1, 2, 3].map((n) => join(dir, `${stem}-part${n}.json`)));
    expect(new Set(out.specs).size).toBe(3);
    for (const [i, p] of (out.specs as string[]).entries()) {
      expect(existsSync(p)).toBe(true);
      expect(JSON.parse(readFileSync(p, "utf8")).title).toContain(`part ${i + 1} of 3`);
    }
  });
  it("adds .json to a single proof's -o path when it has none", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-proof-"));
    const doc = join(dir, "short.md");
    writeFileSync(doc, "One.\n");
    const io = captureIo();
    expect(
      await run(["proof", doc, "-o", join(dir, "out"), "--json"], io, { SWITCHBACK_CONFIG_DIR: dir }),
    ).toBe(0);
    expect(JSON.parse(io.stdout.join("\n")).specs).toEqual([join(dir, "out.json")]);
    expect(existsSync(join(dir, "out.json"))).toBe(true);
  });
  it("creates the -o folder when it does not exist yet, like build does", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-proof-"));
    const doc = join(dir, "draft.md");
    writeFileSync(doc, "# Draft\n\nOne.\n");
    const out = join(dir, "switchback", "2026-09-27-draft", "W1.json");
    const io = captureIo();
    expect(await run(["proof", doc, "-o", out, "--json"], io, { SWITCHBACK_CONFIG_DIR: dir })).toBe(0);
    expect(JSON.parse(io.stdout.join("\n")).specs).toEqual([out]);
    expect(existsSync(out)).toBe(true);
  });
  it("fails clearly on a missing file and on an empty document", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-proof-"));
    const io = captureIo();
    expect(await run(["proof", join(dir, "nope.md")], io, { SWITCHBACK_CONFIG_DIR: dir })).toBe(1);
    expect(io.stderr.join("\n")).toContain("E_PROOF_READ");
    writeFileSync(join(dir, "empty.md"), "  \n\n");
    const io2 = captureIo();
    expect(await run(["proof", join(dir, "empty.md")], io2, { SWITCHBACK_CONFIG_DIR: dir })).toBe(1);
    expect(io2.stderr.join("\n")).toContain("E_PROOF_EMPTY");
    expect(existsSync(join(dir, "empty.proof.json"))).toBe(false);
  });
});
