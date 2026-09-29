import { warning } from "../../src/engine/diagnostics";
import type { Checks, Render } from "../../src/engine/types";

interface Data {
  source?: string;
  items?: string[];
  columns?: string[];
}

export const css = `.sb-c-cardlist { margin: 0 0 3mm; padding-left: 5mm; font-size: 10pt; } .sb-c-cardlist li { margin-bottom: 1mm; }`;

export const render: Render<Data> = (data, { h, variant }) => {
  const items = data.items ?? [];
  const named = Boolean(data.columns?.length);
  const zones = h.zones({
    labels: named ? data.columns! : ["", "", ""],
    direction: "row",
    fill: true,
    minHeight: 50,
  });
  const heading = h.heading(named ? "Sort into these piles" : "Make your own piles");
  const list = items.length
    ? `<ol class="sb-c-cardlist">${items.map((t) => `<li>${h.esc(t)}</li>`).join("")}</ol>`
    : "";
  const from = data.source ? ` from ${data.source}` : ""; // h.note escapes its text, so don't escape here
  if (variant === "index-cards")
    return h.stack(
      h.note(`Write each candidate${from} on its own index card, then sort the cards on the table.`),
      list,
      heading,
      zones,
    );
  if (variant === "write-in")
    return h.stack(
      h.note(`No cutting: write each candidate${from} straight into the pile it belongs to.`),
      list,
      heading,
      zones,
    );
  const cells = (items.length ? items : Array.from({ length: 9 }, () => "")).map((t) => h.esc(t));
  return h.stack(
    data.source ? h.note(`Candidates: ${data.source}.`) : "",
    h.cutGrid({ cells, columns: 3, minHeight: 18 }),
    heading,
    zones,
  );
};

export const checks: Checks<Data> = (data, { variant }) => {
  const columns = data.columns?.length ? data.columns.length : 3;
  if (variant !== "index-cards" || columns < 3) return [];
  return [
    warning(
      "W_NARROW",
      `index cards are about 76 mm wide; ${columns} columns on portrait paper leave about ${Math.floor(180 / columns)} mm each`,
      "use the write-in variant, 2 columns, or wait for landscape pages",
    ),
  ];
};
