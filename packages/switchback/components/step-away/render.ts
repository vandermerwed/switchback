import type { Render } from "../../src/engine/types";

interface Data {
  suggestion?: string;
}

export const css = `.sb-c-away-times { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin: 4mm 0 6mm; }`;

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    h.note("Don't reread the pages before this one. Put them face down and leave the desk."),
    data.suggestion ? h.callout(data.suggestion, "→") : "",
    `<div class="sb-c-away-times">${h.box({ label: "Break started", height: 20 })}${h.box({ label: "Back at", height: 20 })}</div>`,
    h.heading("What I did"),
    h.lines({ count: 2 }),
    h.heading("Anything that surfaced while I was away"),
    h.lines({ count: 5, fill: true }),
  );
