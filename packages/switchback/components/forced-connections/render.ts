import type { Render } from "../../src/engine/types";

interface Data {
  words?: string[];
  subject?: string;
}

const WORDS = ["a lighthouse", "a sourdough starter", "a bus timetable", "a wound", "a choir"];

export const css = `.sb-c-word { font: 600 10pt var(--sb-sans); margin-top: 2mm; }`;

export const render: Render<Data> = (data, { h }) => {
  const words = data.words?.length ? data.words : WORDS;
  return h.stack(
    ...words.map((w) => `<div class="sb-c-word">${h.esc(w)}</div>${h.lines({ count: 2 })}`),
    h.heading("The accidental idea that might actually work"),
    h.box({ fill: true }),
  );
};
