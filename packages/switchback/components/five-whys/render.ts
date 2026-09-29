import type { Render } from "../../src/engine/types";

interface Data {
  problem?: string;
}

export const css = `
.sb-c-rung { border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; padding: 2.5mm 3mm; margin-bottom: 3mm; }
.sb-c-rung-label { font: 400 7pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.6pt; color: var(--sb-faint); }
.sb-c-rung-problem { font: italic 400 11pt var(--sb-serif); margin-top: 1mm; }
`;

export const render: Render<Data> = (data, { h }) => {
  const rungs = Array.from(
    { length: 5 },
    (_, i) =>
      `<div class="sb-c-rung"><span class="sb-c-rung-label">Why? (${i + 1})</span>${h.lines({ count: 2 })}</div>`,
  ).join("");
  return h.stack(
    `<div class="sb-c-rung"><span class="sb-c-rung-label">Stated problem</span><div class="sb-c-rung-problem">${h.esc(data.problem ?? "The problem")}</div></div>`,
    rungs,
    h.callout("The bottom rung is a hypothesis, not a fact. What would test it this week?", "?"),
  );
};
