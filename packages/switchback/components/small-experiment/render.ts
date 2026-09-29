import type { Render } from "../../src/engine/types";

interface Data {
  aversion?: string;
}

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    h.note(
      "This is a small test of a prediction, not a treatment. If the fear is severe, or part of a diagnosed condition, do this with someone qualified.",
    ),
    data.aversion
      ? h.callout(`What I avoid: ${data.aversion}`, "▭")
      : h.stack(h.heading("What I avoid"), h.lines({ count: 2 })),
    h.heading("What I predict will happen, and how sure I am (%)"),
    h.lines({ count: 3 }),
    h.heading("The smallest safe version I will actually do, and when"),
    h.box({ height: 26 }),
    h.check(["I accept either outcome: it goes fine, or it doesn't. Both tell me something."]),
    h.heading("At the return: what actually happened, against my prediction"),
    h.box({ fill: true }),
    h.heading("Next time"),
    h.check(["bigger", "the same again", "stop"]),
  );
