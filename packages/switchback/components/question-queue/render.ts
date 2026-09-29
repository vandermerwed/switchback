import type { Render } from "../../src/engine/types";

interface Data {
  questions?: string[];
}

export const css = `
.sb-c-qslots { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 1fr); gap: 3mm; }
.sb-c-qslot { min-height: 0; display: flex; flex-direction: column; border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; padding: 2mm 3mm; }
.sb-c-qhead { display: flex; gap: 2mm; align-items: baseline; font-size: 9pt; color: var(--sb-muted); }
`;

export const render: Render<Data> = (data, { h }) => {
  const questions = data.questions ?? [];
  const slots = Array.from(
    { length: 8 },
    (_, i) =>
      `<div class="sb-c-qslot"><div class="sb-c-qhead">${h.letter("Q")}<span class="sb-num">${i + 1}.</span><span>${h.esc(
        questions[i] ?? "",
      )}</span></div>${h.lines({ count: 3, fill: true })}</div>`,
  ).join("");
  return `<div class="sb-c-qslots sb-fill">${slots}</div>`;
};
