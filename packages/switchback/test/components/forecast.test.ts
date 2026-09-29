import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("forecast", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("forecast", () => {
  it("asks for the base rate before the probability, and leaves the score for the return", () => {
    const out = html("default");
    expect(out.indexOf("How often does this kind of thing happen?")).toBeLessThan(
      out.indexOf("My probability"),
    );
    expect(out).toContain("At the return");
    expect(out).toContain("30 June");
  });

  it("gives each task a row of 30-minute estimate circles and a place for the actual time", () => {
    const out = html("duration");
    expect(out.match(/class="sb-c-est"/g)?.length).toBe(3);
    expect(out).toContain("Actual");
    expect(out).toContain("over or under, and by how much?");
  });
});
