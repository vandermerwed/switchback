import type { Render } from "../../src/engine/types";

interface Data {
  question?: string;
  timebox?: string;
  howto?: string[];
  stationery_note?: string;
}

const HOWTO = [
  "Put your phone in another room, so it can't interrupt.",
  "Work in ink, in the colour language.",
  "When the timebox ends, stop, and write one line on where to pick up.",
  "Cross out, don't erase.",
  "Photograph every page and send it back.",
];

export const css = `
.sb-c-kicker { font: 400 8pt var(--sb-mono); letter-spacing: 1.6pt; text-transform: uppercase; color: var(--sb-faint); margin: 4mm 0 3mm; }
.sb-c-title { font: 600 24pt/1.1 var(--sb-serif); margin: 0 0 5mm; }
.sb-c-question { font: italic 400 15pt/1.3 var(--sb-serif); border-top: 0.5pt solid var(--sb-ink); border-bottom: 0.5pt solid var(--sb-ink); padding: 3mm 0; margin: 0 0 4mm; }
.sb-c-meta { font: 400 8pt var(--sb-mono); color: var(--sb-muted); margin-bottom: 7mm; }
.sb-c-howto ol { margin: 1mm 0 0; padding-left: 5mm; font-size: 10pt; }
.sb-c-howto li { margin-bottom: 1.2mm; }
.sb-c-cover-note { margin-top: 3mm; }
`;

export const render: Render<Data> = (data, { h, spec, paper, roles, pens }) => {
  const question = data.question ?? spec.subtitle;
  const meta = [data.timebox ?? spec.timebox, paper].filter(Boolean).join(" · ");
  const howto = data.howto?.length ? data.howto : HOWTO;
  return h.stack(
    `<div class="sb-c-kicker">Workbook · Round ${spec.round} · ${h.esc(spec.style)}</div>`,
    `<h1 class="sb-c-title">${h.esc(spec.title)}</h1>`,
    question ? `<div class="sb-c-question">${h.esc(question)}</div>` : "",
    `<div class="sb-c-meta">${h.esc(meta)}</div>`,
    h.heading("Colour language: choose yours"),
    h.note(
      "This prints black and white; the colour is your own ink. Colour each box with the pen you will use, then keep this page beside you as your key. No pen for a role? Write its letter in a circle.",
    ),
    h.legendTable(roles, pens),
    data.stationery_note ? `<div class="sb-c-cover-note">${h.note(data.stationery_note)}</div>` : "",
    `<div class="sb-c-howto">${h.heading("How to use this")}<ol>${howto.map((s) => `<li>${h.esc(s)}</li>`).join("")}</ol></div>`,
  );
};
