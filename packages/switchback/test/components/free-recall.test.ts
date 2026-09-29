import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("free-recall", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("free-recall", () => {
  it("asks for recall with the book closed and a second-colour check against the source", () => {
    const out = html("default");
    expect(out).toContain("book closed");
    expect(out).toContain("second colour");
    expect(out).toContain("What I missed: next round starts here");
  });

  it("adds a confidence column in with-confidence", () => {
    expect(html("with-confidence")).toContain("How sure (○ ◐ ●)");
  });

  it("prints each cued prompt in order", () => {
    const out = html("cued");
    expect(out.indexOf("The three stages of the model")).toBeLessThan(
      out.indexOf("Where the model breaks down"),
    );
  });
});
