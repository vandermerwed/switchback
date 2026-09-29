import type { Render } from "../../src/engine/types";

interface Data {
  wish?: string;
}

export const css = `.sb-c-mc-h { font: 600 13pt var(--sb-serif); margin: 4mm 0 1mm; } .sb-c-mc-q { font-size: 9pt; color: var(--sb-muted); margin: 0 0 2mm; }`;

const block = (h: Parameters<Render>[1]["h"], title: string, question: string, body: string) =>
  `<h2 class="sb-c-mc-h">${h.esc(title)}</h2><p class="sb-c-mc-q">${h.esc(question)}</p>${body}`;

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    block(
      h,
      "Wish",
      "What do you want that is challenging but possible?",
      data.wish ? h.callout(data.wish, "★") : h.box({ height: 22 }),
    ),
    block(
      h,
      "Outcome",
      "The best thing about getting it. Picture it for a minute, then write it.",
      h.box({ height: 34 }),
    ),
    block(
      h,
      "Obstacle",
      "What in you gets in the way? A habit, a feeling, a belief. Not the world.",
      h.box({ height: 40 }),
    ),
    block(
      h,
      "Plan",
      "When the obstacle shows up, what will you do?",
      h.ifThen({ count: 2, first: "that obstacle shows up" }),
    ),
    h.note(
      "If the obstacle feels bigger than the wish, change or drop the wish. That is a result, not a failure.",
    ),
  );
