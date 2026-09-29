import type { Render } from "../../src/engine/types";

interface Data {
  labels?: string[];
  count?: number;
  milestone?: string;
}

export const css = `.sb-c-tally { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; } .sb-c-tally .sb-box { min-height: 40mm; }
.sb-c-countdown { display: flex; flex-wrap: wrap; gap: 3mm; margin: 2mm 0 4mm; }
.sb-c-count { width: 14mm; height: 14mm; border: 0.7pt solid var(--sb-line); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font: 600 11pt var(--sb-mono); }`;

export const render: Render<Data> = (data, { h, variant }) => {
  const labels = data.labels ?? [];
  const count = data.count ?? 12;
  const boxes = `<div class="sb-c-tally">${(labels.length ? labels : ["", "", ""]).map((l) => h.box({ label: l })).join("")}</div>`;
  if (variant === "coins")
    return h.stack(
      h.note(
        "Use coins as tokens. Label a sticky note, or a box below, for each thing you are spending them on.",
      ),
      boxes,
    );
  if (variant === "tally")
    return h.stack(
      h.note(`No tokens: spend ${count} pen tallies across the boxes. Cross one out to move it.`),
      boxes,
    );
  if (variant === "countdown") {
    const n = data.count ?? 6;
    return h.stack(
      h.note("One mark per session left in this arc. Cross one off at each return."),
      `<div class="sb-c-countdown">${Array.from({ length: n }, (_, i) => `<span class="sb-c-count">${n - i}</span>`).join("")}</div>`,
      h.heading("The nearer milestone: what the next two sessions should reach"),
      data.milestone ? h.callout(data.milestone, "→") : h.box({ height: 24 }),
      h.note("Early in a long arc the end can feel far. Aim at the next milestone, not the last mark."),
    );
  }
  return h.cutGrid({
    cells: Array.from({ length: count }, (_, i) => h.esc(labels[i] ?? "")),
    columns: 4,
    minHeight: 26,
  });
};
