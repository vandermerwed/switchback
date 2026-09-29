import type { Render } from "../../src/engine/types";

interface Data {
  steps?: string[];
  fade_from?: number;
}

export const css = `.sb-c-step { margin: 3mm 0 1mm; font: 400 10.5pt var(--sb-serif); } .sb-c-step b { font: 700 9pt var(--sb-mono); margin-right: 2mm; }
.sb-c-why { margin: 1mm 0; font: 600 9pt var(--sb-sans); }`;

const DEFAULT_STEPS = ["Step 1 of the material", "Step 2", "Step 3", "Step 4"];

export const render: Render<Data> = (data, { h, variant }) => {
  const steps = data.steps?.length ? data.steps : DEFAULT_STEPS;
  const explainCount = steps.length > 4 ? 1 : 2;
  const step = (text: string, i: number) => `<p class="sb-c-step"><b>${i + 1}</b>${h.esc(text)}</p>`;
  if (variant === "why") {
    return h.stack(
      steps
        .map((s, i) => step(s, i) + h.heading("Why is this true?") + h.lines({ count: explainCount }))
        .join(""),
    );
  }
  if (variant === "faded") {
    const from = Math.min(data.fade_from ?? Math.ceil(steps.length / 2) + 1, steps.length + 1) - 1;
    return h.stack(
      steps
        .map((s, i) =>
          i < from
            ? step(s, i) + h.heading("Why does this follow?") + h.lines({ count: 1 })
            : `<div class="sb-box" style="height:18.5mm;min-height:18.5mm"><span class="sb-label">${h.esc(
                `${i + 1}. Complete this step`,
              )}</span></div><p class="sb-c-why">Why does this follow?</p>${h.lines({ count: 1 })}`,
        )
        .join(""),
    );
  }
  return h.stack(
    h.note("Read a step, then write why it follows from the step before. Don't restate it; justify it."),
    steps
      .map((s, i) => step(s, i) + h.heading("Why does this follow?") + h.lines({ count: explainCount }))
      .join(""),
  );
};
