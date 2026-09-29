import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

describe("mental-contrast", () => {
  const r = renderComponent("mental-contrast", { embedFonts: false });
  const out = r.html ?? "";

  it("renders without errors", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("orders wish, outcome, obstacle, then an if-then plan", () => {
    const order = ["Wish", "Outcome", "Obstacle", "Plan"].map((w) => out.indexOf(`>${w}`));
    expect(order.every((x) => x > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(out).toContain('class="sb-ifthen"');
  });

  it("says that dropping the wish is a legitimate result", () => {
    expect(out).toContain("change or drop the wish");
  });
});
