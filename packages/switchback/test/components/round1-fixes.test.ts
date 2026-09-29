import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (id: string) => renderComponent(id, { embedFonts: false }).html ?? "";

describe("round-1 workbook fixes", () => {
  it("assumption-audit asks for an observation, then an action", () => {
    const h = html("assumption-audit");
    expect(h).toContain("What you&#39;d see if it&#39;s false");
    expect(h).toContain("Cheapest way to check");
    expect(h).not.toContain("What would prove it false");
  });
  it("the cover offers your pen before the letter", () => {
    const h = html("cover");
    expect(h).toContain("your pen, or write");
    expect(h).not.toContain("no pen: write");
  });
  it("check-in leaves a resumption cue", () => {
    expect(html("check-in")).toContain("Next time, start from");
  });
});
