import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

describe("practice-audit", () => {
  const r = renderComponent("practice-audit", { embedFonts: false });
  const out = r.html ?? "";

  it("renders without errors", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("compares trigger and action between the real skill and the practice", () => {
    for (const s of ["The real skill", "How I practise now", "The trigger", "The action"])
      expect(out).toContain(s);
    expect(out).toContain("Presenting to a skeptical client");
  });

  it("ends with keep or revise for the next round", () => {
    expect(out).toContain("Keep or revise");
  });
});
