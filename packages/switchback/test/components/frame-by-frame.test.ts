import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

describe("frame-by-frame", () => {
  const r = renderComponent("frame-by-frame", { embedFonts: false });
  const out = r.html ?? "";

  it("renders without errors", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("asks for one real recent instance before the divergence moment", () => {
    expect(out.indexOf("One real, recent time")).toBeLessThan(out.indexOf("The exact moment"));
  });

  it("routes forgetting to an if-then cue and motivation to goal-factoring", () => {
    expect(out).toContain("if-then");
    expect(out).toContain("goal-factoring");
  });
});
