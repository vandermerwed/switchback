import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("scoresheet", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("scoresheet", () => {
  it("rates before and after by default", () => {
    expect(html("default")).toContain("At the start");
  });

  it("draws a numbered track per row in the running variant", () => {
    const out = html("running");
    expect(out).toContain('class="sb-c-track"');
    expect(out.match(/class="sb-c-cell"/g)?.length).toBe(2 * 8);
    expect(out).not.toContain("At the start");
  });
});
