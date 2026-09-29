import type { Render } from "../../src/engine/types";

interface Data {
  fear?: string;
}

export const css = `
.sb-c-weight { display: flex; gap: 2.2mm; margin: 1mm 0 3mm; }
.sb-c-weight span { width: 11mm; height: 11mm; border: 0.7pt solid var(--sb-line); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font: 400 8pt var(--sb-mono); color: var(--sb-faint); }
`;

export const render: Render<Data> = (data, { h }) => {
  const scale = `<div class="sb-c-weight">${Array.from({ length: 11 }, (_, i) => `<span>${i}</span>`).join("")}</div>`;
  return h.stack(
    h.note(
      "This is to make a dread thinkable, not to make a real risk acceptable. If writing it makes it worse, stop.",
    ),
    data.fear
      ? h.callout(`The outcome I dread: ${data.fear}`, "!")
      : h.stack(h.heading("The outcome I dread"), h.lines({ count: 1 })),
    h.heading("How heavy does it feel right now? (circle 0–10)"),
    scale,
    h.heading("If it happened, concretely"),
    h.cols(
      [
        h.box({ label: "The next day", fill: true }),
        h.box({ label: "The next week", fill: true }),
        h.box({ label: "The next month", fill: true }),
      ],
      { fill: true },
    ),
    h.heading("What I would do, and who would help"),
    h.lines({ count: 3 }),
    h.heading("How heavy does it feel now? (circle 0–10)"),
    scale,
  );
};
