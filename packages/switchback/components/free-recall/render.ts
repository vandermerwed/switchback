import type { Render } from "../../src/engine/types";

interface Data {
  topic?: string;
  prompts?: string[];
}

export const css = `.sb-c-cue { margin: 3mm 0 0; font: 600 10pt var(--sb-sans); }
.sb-c-recall th:nth-child(2) { width: 34mm; }
.sb-c-recall th:nth-child(3) { width: 16mm; }`;

const DEFAULT_PROMPTS = [
  "The main idea, in your own words",
  "A key term and what it means",
  "An example",
  "How it connects to something you already knew",
  "The part you found hardest",
];

export const render: Render<Data> = (data, { h, variant }) => {
  const about = data.topic ? ` about ${data.topic}` : "";
  const check = h.stack(h.heading("What I missed: next round starts here"), h.lines({ count: 3 }));
  if (variant === "cued") {
    const prompts = (data.prompts?.length ? data.prompts : DEFAULT_PROMPTS).slice(0, 6);
    const promptLines = prompts.length > 4 ? 1 : 2;
    return h.stack(
      prompts
        .map((p, i) => `<p class="sb-c-cue">${i + 1}. ${h.esc(p)}</p>${h.lines({ count: promptLines })}`)
        .join(""),
      check,
    );
  }
  if (variant === "with-confidence") {
    return h.stack(
      h.table({
        head: ["What I remember", "How sure (○ ◐ ●)", "Right?"],
        rows: Array.from({ length: 12 }, () => ["", "", ""]),
        fill: true,
        className: "sb-c-recall",
      }),
      check,
    );
  }
  return h.stack(
    h.note(
      `With the book closed, write everything you remember${about}. Then open the source and check it in a second colour: tick what's right, correct what's wrong, add what's missing.`,
    ),
    h.lines({ count: 14, fill: true }),
    check,
  );
};
