import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { captureIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";

describe("switchback legend", () => {
  it("prints roles with meanings, proof actions and the pen mapping", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-legend-"));
    writeFileSync(
      join(dir, "profile.json"),
      JSON.stringify({
        version: 1,
        kit: { pens: [{ colour: "blue" }, { colour: "red" }] },
        defaults: { style: "sitting", sitting: "40 min" },
      }),
    );
    const io = captureIo();
    expect(await run(["legend", "--json"], io, { SWITCHBACK_CONFIG_DIR: dir })).toBe(0);
    const out = JSON.parse(io.stdout.join("\n"));
    const ask = out.roles.find((r: { id: string }) => r.id === "ask");
    expect(ask).toMatchObject({
      code: "Q",
      proof_action: "answer",
      proof_label: "ask",
      assignment: { pen: "blue" },
    });
    expect(out.marks.map((m: { glyph: string }) => m.glyph)).toContain("✕");
    expect(out.marks.find((m: { glyph: string }) => m.glyph === "✕")).toMatchObject({
      proof_action: "cut",
      proof_label: "cut",
    });
    expect(out.confidence.length).toBeGreaterThan(0);
    expect(out.kit_source).toEqual(["minimum", "profile"]);
  });
  it("prints a readable table without --json", async () => {
    const io = captureIo();
    expect(
      await run(["legend"], io, { SWITCHBACK_CONFIG_DIR: mkdtempSync(join(tmpdir(), "sb-legend-")) }),
    ).toBe(0);
    const text = io.stdout.join("\n");
    expect(text).toContain("Q Ask");
    expect(text).toContain("challenge");
    expect(text).toContain("✕");
    for (const label of ["proof: ask ", "proof: re-centre ", "proof: edit ", "(proof: cut)", "(proof: lock)"])
      expect(text).toContain(label);
    expect(text).not.toContain("re centre");
    expect(text).not.toContain("apply edit");
  });
});
