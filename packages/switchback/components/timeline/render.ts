import type { Render } from "../../src/engine/types";

interface Data {
  horizon?: string;
  marks?: string[];
}

export const css = `
.sb-c-timeline { display: flex; gap: 2mm; margin-bottom: 2mm; }
.sb-c-slot { flex: 1 1 0; min-height: 48mm; border-top: 0.9pt solid var(--sb-ink); padding-top: 1.5mm; font: 400 7.5pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.4pt; color: var(--sb-faint); overflow-wrap: anywhere; }
`;

export const render: Render<Data> = (data, { h }) => {
  const marks = data.marks ?? [];
  const slots = Array.from(
    { length: 6 },
    (_, i) => `<div class="sb-c-slot">${h.esc(marks[i] ?? "")}</div>`,
  ).join("");
  return h.stack(
    data.horizon ? h.note(`Horizon: ${data.horizon}`) : "",
    `<div class="sb-c-timeline">${slots}</div>`,
    h.heading("What must be true first?"),
    h.lines({ count: 8, fill: true }),
  );
};
