import type { Render } from "../../src/engine/types";

interface Data {
  bug?: string;
}

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    data.bug
      ? h.callout(`Recurring problem: ${data.bug}`, "↻")
      : h.stack(h.heading("The recurring problem"), h.lines({ count: 1 })),
    h.heading("One real, recent time it happened, step by step"),
    h.lines({ count: 6 }),
    h.heading("The exact moment it went differently from how I wanted"),
    h.lines({ count: 2 }),
    h.heading("At that moment, did a better option even occur to me?"),
    h.check([
      "No: it's a cue problem. Plan the cue with commit's if-then.",
      "Yes, but I didn't want it: it's a motivation problem. Take it to goal-factoring.",
    ]),
    h.heading("The fix, imagined across a whole week: where would it fail?"),
    h.lines({ count: 3, fill: true }),
  );
