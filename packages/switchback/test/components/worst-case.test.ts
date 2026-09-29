import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

describe("worst-case", () => {
  const r = renderComponent("worst-case", { embedFonts: false });
  const out = r.html ?? "";

  it("renders without errors", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("rates the weight before and after writing the day, week and month out", () => {
    const before = out.indexOf("How heavy does it feel right now?");
    const after = out.indexOf("How heavy does it feel now?");
    for (const w of ["The next day", "The next week", "The next month"]) {
      expect(out.indexOf(w)).toBeGreaterThan(before);
      expect(out.indexOf(w)).toBeLessThan(after);
    }
  });

  it("warns against rumination and against making a real risk acceptable", () => {
    expect(out).toContain("If writing it makes it worse, stop");
    expect(out).toContain("not to make a real risk acceptable");
  });
});
