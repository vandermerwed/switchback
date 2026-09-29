import type { Render } from "../../src/engine/types";

export const css = `
.sb-c-aid { border: 0.6pt solid var(--sb-box); border-radius: 2mm; padding: 5mm; }
.sb-c-aid h3 { font: 600 10pt var(--sb-sans); margin: 4mm 0 1mm; }
.sb-c-marks { font: 400 9.5pt var(--sb-sans), var(--sb-symbol); margin: 0; }
`;

export const render: Render = (_data, { h, roles, pens }) =>
  `<div class="sb-c-aid">${h.heading("Session reference")}${h.legendTable(roles, pens)}<h3>Marks</h3><p class="sb-c-marks">○ commit · ✕ rejected (keep it) · → leads to · ▭ decision · ? revisit · ! important</p><h3>Confidence</h3><p class="sb-c-marks">● + high · ◐ ~ medium · ○ ! unsure</p></div>`;
