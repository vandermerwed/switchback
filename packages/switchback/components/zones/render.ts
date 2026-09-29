import { error, warning } from "../../src/engine/diagnostics";
import type { Checks, Render } from "../../src/engine/types";

interface Data {
  zones?: string[];
  columns?: number;
  layout?: Array<{ col: number; row: number; colSpan?: number; rowSpan?: number }>;
}

const DEFAULT_ZONES = ["Now", "Next", "Later"];

/** A layout is used only when it gives exactly one cell per zone; otherwise render ignores it. */
const usableLayout = (data: Data, labels: string[]) =>
  !!data.layout?.length && data.layout.length === labels.length;

export const css = `.sb-c-zones-grid { display: grid; grid-auto-rows: 1fr; gap: 4mm; }
.sb-c-zones-canvas { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2.5mm; } .sb-c-zones-canvas .sb-label { position: static; display: block; margin-bottom: 1mm; }`;

export const render: Render<Data> = (data, { h }) => {
  const labels = data.zones?.length ? data.zones : DEFAULT_ZONES;
  if (usableLayout(data, labels)) {
    // Clamp each cell's row span so it never runs past row 4 (the grid's row count must never
    // exceed 4), then clamp the computed row count itself as a final safety net.
    const layout = data.layout!.map((c) => ({
      ...c,
      rowSpan: Math.max(1, Math.min(c.rowSpan ?? 1, 4 - c.row + 1)),
    }));
    const rows = Math.min(4, Math.max(...layout.map((c) => c.row + (c.rowSpan ?? 1) - 1)));
    const cells = labels
      .map((l, i) => {
        const c = layout[i]!;
        const place = `grid-column:${c.col} / span ${c.colSpan ?? 1};grid-row:${c.row} / span ${c.rowSpan ?? 1}`;
        return `<div class="sb-zone" style="${place}"><span class="sb-label">${h.esc(l)}</span></div>`;
      })
      .join("");
    return `<div class="sb-c-zones-canvas sb-fill" style="grid-template-rows:repeat(${rows},minmax(38mm,1fr))">${cells}</div>`;
  }
  // No usable layout (none given, or a length mismatch against `labels`). Above 5 zones the
  // column stack (40mm minimum per zone, stacked in one column) overflows the page, so fall
  // back to the columns grid instead, unless the spec already asked for a specific column count.
  const columns =
    data.columns !== undefined
      ? data.columns >= 2
        ? data.columns
        : labels.length > 5
          ? 2
          : undefined
      : labels.length > 5
        ? 3
        : undefined;
  if (columns) {
    return `<div class="sb-c-zones-grid sb-fill" style="grid-template-columns:repeat(${columns},1fr)">${labels
      .map((l) => h.box({ label: l }))
      .join("")}</div>`;
  }
  return h.zones({ labels, direction: "column", fill: true, minHeight: 40 });
};

export const checks: Checks<Data> = (data) => {
  const out = [];
  const labels = data.zones?.length ? data.zones : DEFAULT_ZONES;
  // Mirrors render: an unusable layout (wrong length) is ignored, so the column fallback applies.
  if (data.columns === 1 && labels.length > 5 && !usableLayout(data, labels))
    out.push(
      warning(
        "W_ZONES_COLUMNS",
        `one column fits at most 5 zones; ${labels.length} zones are printed in 2 columns instead`,
        "use 2–4 columns, fewer zones, or a layout",
      ),
    );
  (data.layout ?? []).forEach((c, i) => {
    if (c.col + (c.colSpan ?? 1) - 1 > 10)
      out.push(
        error(
          "E_ZONES_LAYOUT",
          `layout cell ${i + 1} starts at column ${c.col} and spans ${c.colSpan ?? 1}, past column 10`,
          "keep col + colSpan − 1 at or below 10",
        ),
      );
  });
  return out;
};
