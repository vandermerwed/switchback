import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

describe("small-experiment", () => {
  const r = renderComponent("small-experiment", { embedFonts: false });
  const out = r.html ?? "";

  it("renders without errors", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("asks for the prediction before the experiment and the comparison after it", () => {
    expect(out.indexOf("What I predict will happen")).toBeLessThan(out.indexOf("The smallest safe version"));
    expect(out.indexOf("The smallest safe version")).toBeLessThan(out.indexOf("At the return"));
  });

  it("has the person accept either outcome, and says it is not a treatment", () => {
    expect(out).toContain("I accept either outcome");
    expect(out).toContain("not a treatment");
  });
});
