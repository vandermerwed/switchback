import type { Render } from "../../src/engine/types";

export const css = `
.sb-c-ideas { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(5, 1fr); gap: 4mm; }
.sb-c-idea { position: relative; border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; padding: 7mm 3mm 3mm; }
.sb-c-idea .sb-num { position: absolute; top: 2mm; left: 3mm; }
`;

export const render: Render = (_data, { h }) =>
  h.stack(
    h.note("1–9 should be bad on purpose. 10 is whatever surprised you."),
    `<div class="sb-c-ideas sb-fill">${Array.from({ length: 10 }, (_, i) => `<div class="sb-c-idea"><span class="sb-num">${i + 1}</span></div>`).join("")}</div>`,
  );
