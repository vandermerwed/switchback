import type { Render } from "../../src/engine/types";

interface Data {
  center?: string;
  hint?: string;
}

const SATELLITES: Array<[number, number]> = [
  [12, 10],
  [70, 8],
  [8, 68],
  [72, 70],
  [40, 86],
  [12, 40],
  [74, 40],
];

export const css = `
.sb-c-map { position: relative; border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; }
.sb-c-node { position: absolute; width: 26mm; height: 26mm; border: 0.6pt solid var(--sb-line); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2mm; font-size: 8.5pt; color: var(--sb-faint); }
.sb-c-node-center { left: 50%; top: 45%; transform: translate(-50%, -50%); width: 34mm; height: 34mm; border: 0.9pt solid var(--sb-ink); color: var(--sb-ink); font-size: 10pt; font-weight: 600; overflow-wrap: anywhere; }
`;

export const render: Render<Data> = (data, { h }) =>
  `<div class="sb-c-map sb-fill"><div class="sb-c-node sb-c-node-center">${h.esc(data.center ?? "the problem")}</div>${SATELLITES.map(
    ([x, y]) => `<div class="sb-c-node" style="left:${x}%;top:${y}%">?</div>`,
  ).join("")}</div>`;
