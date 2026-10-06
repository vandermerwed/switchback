import { describe, expect, it } from "vitest";
import { buildDocument, renderComponent } from "../../src/engine/build";

describe("zones layout", () => {
  it("places each zone on the grid it is given", () => {
    const r = renderComponent("zones", { example: "grid", embedFonts: false });
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(r.html).toContain("grid-column:1 / span 2;grid-row:1 / span 2");
    expect(r.html?.match(/class="sb-zone"/g)).toHaveLength(9);
  });

  it("falls back to ordinary zones rendering, dropping no zone, when layout and zones lengths mismatch", () => {
    const { html, diagnostics } = buildDocument(
      {
        switchback: 1,
        pages: [
          {
            id: "W1-P1",
            component: "zones",
            data: {
              zones: ["Alpha", "Beta", "Gamma"],
              layout: [
                { col: 1, row: 1 },
                { col: 2, row: 1 },
              ],
            },
          },
        ],
      },
      { skipStyleChecks: true, embedFonts: false },
    );
    expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(html).toContain("Alpha");
    expect(html).toContain("Beta");
    expect(html).toContain("Gamma");
    // `.sb-c-zones-canvas` is only ever applied as a class on the rendered grid wrapper;
    // the component's own CSS rule (`.sb-c-zones-canvas { ... }`) is always emitted for any
    // page using the zones component, so check for the class attribute, not the bare string.
    expect(html).not.toMatch(/class="sb-c-zones-canvas/);
  });

  it("warns W_ZONES_COLUMNS for columns: 1 when the layout is unusable, as render ignores it", () => {
    const zones = ["A", "B", "C", "D", "E", "F"];
    const codes = (layout: Array<{ col: number; row: number }>) =>
      buildDocument(
        { switchback: 1, pages: [{ id: "W1-P1", component: "zones", data: { zones, columns: 1, layout } }] },
        { skipStyleChecks: true, embedFonts: false },
      ).diagnostics.map((d) => d.code);
    // two cells for six zones: render falls back to the 2-column grid, so the check must say so
    expect(
      codes([
        { col: 1, row: 1 },
        { col: 2, row: 1 },
      ]),
    ).toContain("W_ZONES_COLUMNS");
    // one cell per zone: render uses the layout, so there is no column fallback to warn about
    expect(codes(zones.map((_, i) => ({ col: i + 1, row: 1 })))).not.toContain("W_ZONES_COLUMNS");
  });

  it("falls back to the 3-column grid, not the column stack, when a layout mismatches above 5 zones", () => {
    const zones = [
      "Key Partners",
      "Key Activities",
      "Key Resources",
      "Value Propositions",
      "Customer Relationships",
      "Channels",
      "Customer Segments",
      "Cost Structure",
    ];
    const layout = [
      { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
      { col: 3, row: 1, colSpan: 2 },
      { col: 3, row: 2, colSpan: 2 },
      { col: 5, row: 1, colSpan: 2, rowSpan: 2 },
      { col: 7, row: 1, colSpan: 2 },
      { col: 7, row: 2, colSpan: 2 },
      { col: 9, row: 1, colSpan: 2, rowSpan: 2 },
      { col: 1, row: 3, colSpan: 5 },
      { col: 6, row: 3, colSpan: 5 },
    ];
    const { html, diagnostics } = buildDocument(
      { switchback: 1, pages: [{ id: "W1-P1", component: "zones", data: { zones, layout } }] },
      { skipStyleChecks: true, embedFonts: false },
    );
    expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(html).toMatch(/class="sb-c-zones-grid/);
    expect(html).not.toMatch(/class="sb-c-zones-canvas/);
    for (const z of zones) expect(html).toContain(z);
  });
});

describe("zones orientation", () => {
  const sidecarOrientation = (data: Record<string, unknown>) =>
    buildDocument(
      { switchback: 1, pages: [{ id: "W1-P1", component: "zones", data }] },
      { skipStyleChecks: true, embedFonts: false },
    ).sidecar?.pages[0]?.orientation;

  it("goes landscape at three or more columns", () => {
    expect(sidecarOrientation({ zones: ["A", "B", "C"], columns: 3 })).toBe("landscape");
    expect(sidecarOrientation({ zones: ["A", "B"], columns: 2 })).toBe("portrait");
  });

  it("goes landscape when more than five zones fall back to three columns", () => {
    expect(sidecarOrientation({ zones: ["1", "2", "3", "4", "5", "6"] })).toBe("landscape");
  });

  it("goes landscape for a canvas of at most three rows, and stays portrait for four", () => {
    expect(
      renderComponent("zones", { example: "grid", embedFonts: false }).sidecar?.pages[0]?.orientation,
    ).toBe("landscape");
    const fourRows = {
      zones: ["A", "B", "C", "D"],
      layout: [
        { col: 1, row: 1, colSpan: 10 },
        { col: 1, row: 2, colSpan: 10 },
        { col: 1, row: 3, colSpan: 10 },
        { col: 1, row: 4, colSpan: 10 },
      ],
    };
    expect(sidecarOrientation(fourRows)).toBe("portrait");
  });

  it("prints the business model canvas preset on a landscape page", () => {
    expect(
      renderComponent("business-model-canvas", { embedFonts: false }).sidecar?.pages[0]?.orientation,
    ).toBe("landscape");
  });
});
