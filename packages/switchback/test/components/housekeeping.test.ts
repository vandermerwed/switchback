import { describe, expect, it } from "vitest";
import { buildDocument, renderComponent } from "../../src/engine/build";

const count = (hay: string, needle: string) => hay.split(needle).length - 1;
const page = (component: string, variant: string | undefined, data: Record<string, unknown> = {}) =>
  buildDocument(
    { switchback: 1, pages: [{ id: "W1-P1", component, ...(variant ? { variant } : {}), data }] },
    { embedFonts: false, skipStyleChecks: true },
  );

describe("housekeeping", () => {
  it.each([
    ["self-explain", "why", "explain why it is true"],
    ["self-explain", "faded", "explain why each"],
    ["free-recall", "cued", "with the book closed"],
    ["free-recall", "with-confidence", "With the book closed"],
    ["forecast", "duration", "per 30 minutes"],
  ])("%s %s says its instruction once", (id, variant, phrase) => {
    const html = page(id, variant).html ?? "";
    expect(count(html.toLowerCase(), phrase.toLowerCase())).toBe(1);
  });

  it("the tokens tally readback asks for the photo", () => {
    const r = renderComponent("tokens", { example: "tally", embedFonts: false });
    expect(r.sidecar?.pages[0]?.readback).toContain("photograph the page");
    expect(r.sidecar?.pages[0]?.readback).not.toContain("instead of photographing anything");
  });

  it("zones: one column with more than five zones falls back to two, with a warning", () => {
    const r = page("zones", undefined, { zones: ["a", "b", "c", "d", "e", "f"], columns: 1 });
    expect(r.diagnostics.map((d) => d.code)).toContain("W_ZONES_COLUMNS");
    expect(r.html).toContain("grid-template-columns:repeat(2,1fr)");
  });

  it("zones: a layout cell that runs past column 10 is an error", () => {
    const r = page("zones", undefined, {
      zones: ["a", "b"],
      layout: [
        { col: 8, row: 1, colSpan: 4 },
        { col: 1, row: 1 },
      ],
    });
    expect(r.html).toBeNull();
    expect(r.diagnostics[0]).toMatchObject({ code: "E_ZONES_LAYOUT", page: "W1-P1" });
  });

  it("attribution pages use a class, not an inline style", () => {
    const html = renderComponent("business-model-canvas", { embedFonts: false }).html ?? "";
    expect(html).toContain('class="sb-page sb-has-attrib"');
    expect(html).not.toContain('style="padding-bottom:20mm"');
    expect(html).toContain(".sb-page.sb-has-attrib");
  });
});
