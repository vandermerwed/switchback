import { describe, expect, it } from "vitest";
import { TOKENS_CSS } from "../../src/shell/tokens";
import { borderStyleViolations, colourViolations } from "../support/lint";

describe("Field Manual print tokens", () => {
  it("contain no colour", () => {
    expect(colourViolations(TOKENS_CSS)).toEqual([]);
  });

  it("reserve dashed for cutting and dotted for folding", () => {
    expect(borderStyleViolations(TOKENS_CSS)).toEqual([]);
  });

  it("use a 10mm writing pitch", () => {
    expect(TOKENS_CSS).toContain("--sb-pitch: 10mm");
  });

  it("put each page on its named print page and swap the box for landscape", () => {
    expect(TOKENS_CSS).toMatch(/\.sb-page \{[^}]*page: sb-portrait/);
    expect(TOKENS_CSS).toContain(
      ".sb-page.sb-landscape { page: sb-landscape; width: var(--sb-h); height: var(--sb-w); }",
    );
  });

  it("let long words wrap inside table cells and cut cells", () => {
    expect(TOKENS_CSS).toMatch(/\.sb-table td[^}]*overflow-wrap: anywhere/);
    expect(TOKENS_CSS).toMatch(/\.sb-cut-cell \{[^}]*overflow-wrap: anywhere/);
  });
});
