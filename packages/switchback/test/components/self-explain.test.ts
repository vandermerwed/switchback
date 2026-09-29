import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("self-explain", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("self-explain", () => {
  it("asks why each step follows from the one before", () => {
    const out = html("default");
    expect(out.match(/Why does this follow\?/g)?.length).toBe(4);
  });

  it("blanks the steps from fade_from onwards in faded, and asks you to complete them", () => {
    const out = html("faded");
    expect(out).toContain("Subtract 5 from both sides");
    expect(out).not.toContain("Divide both sides by 3");
    expect(out).not.toContain("x = 4");
    expect(out.match(/Complete this step/g)?.length).toBe(2);
  });

  it("asks why each fact is true in the why variant", () => {
    expect(html("why").match(/Why is this true\?/g)?.length).toBe(3);
  });
});
