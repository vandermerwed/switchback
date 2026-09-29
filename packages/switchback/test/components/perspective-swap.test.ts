import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("perspective-swap", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("perspective-swap", () => {
  it("ends every variant by asking what you would ask the real person", () => {
    expect(html("default")).toContain("What would you ask them?");
    expect(html("tent")).toContain("What would you ask them?");
  });

  it("prints fold-up standing figures with a column to write in for each, in the tent variant", () => {
    const out = html("tent");
    expect(out).toContain('class="sb-cut"');
    expect(out).toContain('class="sb-fold-line"');
    expect(out.match(/class="sb-c-said"/g)).toHaveLength(3);
  });
});
