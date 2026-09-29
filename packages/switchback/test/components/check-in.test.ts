import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("check-in", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("check-in", () => {
  it("rates fixed rows, asks what changed since last time, then leaves room to write", () => {
    const out = html("default");
    expect(out).toContain("Since last time");
    expect(out).toContain("Free-write");
    expect(out.indexOf("Since last time")).toBeLessThan(out.indexOf("Free-write"));
  });

  it("adds a gratitude row only in the gratitude variant, with no claim about how often", () => {
    expect(html("default")).not.toContain("grateful");
    const g = html("gratitude");
    expect(g).toContain("grateful for, and why");
    expect(g.toLowerCase()).not.toMatch(/daily|weekly beats/);
  });
});
