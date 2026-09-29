import type { Render } from "../../src/engine/types";

interface Data {
  x_axis?: string[];
  y_axis?: string[];
  quadrants?: string[];
}

export const css = `
.sb-c-matrix { display: grid; grid-template-columns: 6mm 1fr 1fr; grid-template-rows: 1fr 1fr 7mm; }
.sb-c-quad { border: 0.5pt solid var(--sb-line); padding: 2mm; font: 400 7.5pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.4pt; color: var(--sb-faint); }
.sb-c-yaxis { grid-row: 1 / 3; writing-mode: vertical-rl; transform: rotate(180deg); display: flex; justify-content: space-between; font: 400 7.5pt var(--sb-mono), var(--sb-symbol); color: var(--sb-muted); }
.sb-c-xaxis { grid-column: 2 / 4; display: flex; justify-content: space-between; align-items: center; font: 400 7.5pt var(--sb-mono), var(--sb-symbol); color: var(--sb-muted); }
`;

export const render: Render<Data> = (data, { h }) => {
  const [xLow, xHigh] = data.x_axis ?? ["low", "high"];
  const [yLow, yHigh] = data.y_axis ?? ["low", "high"];
  const q = data.quadrants ?? [];
  const cell = (i: number) => `<div class="sb-c-quad">${h.esc(q[i] ?? "")}</div>`;
  return `<div class="sb-c-matrix sb-fill"><div class="sb-c-yaxis"><span>${h.esc(yLow)}</span><span>${h.esc(yHigh)} ↑</span></div>${cell(0)}${cell(1)}${cell(2)}${cell(3)}<div class="sb-c-xaxis"><span>${h.esc(xLow)}</span><span>${h.esc(xHigh)} →</span></div></div>`;
};
