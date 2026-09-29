import type { Render } from "../../src/engine/types";

interface Data {
  skill?: string;
  practice?: string;
}

export const css = `.sb-c-pa td:first-child { width: 42mm; font-weight: 600; } .sb-c-pa td { height: 30mm; }`;

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    h.table({
      head: [
        "",
        `The real skill${data.skill ? `: ${data.skill}` : ""}`,
        `How I practise now${data.practice ? `: ${data.practice}` : ""}`,
      ],
      rows: [
        ["The trigger: what starts it", "", ""],
        ["The action: what I do", "", ""],
      ],
      className: "sb-c-pa",
    }),
    h.heading("Where the triggers differ, does my practice vary them?"),
    h.lines({ count: 2 }),
    h.heading("Where the actions differ, does my practice vary them?"),
    h.lines({ count: 2 }),
    h.heading("Keep or revise? What I'll change for the next round"),
    h.lines({ count: 4, fill: true }),
  );
