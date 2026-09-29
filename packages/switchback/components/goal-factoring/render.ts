import type { Render } from "../../src/engine/types";

interface Data {
  action?: string;
}

export const css = `.sb-c-gf th:nth-child(2) { width: 30mm; }`;

export const render: Render<Data> = (data, { h, variant }) => {
  if (variant === "aversion") {
    return h.stack(
      data.action
        ? h.callout(`What I avoid: ${data.action}`, "▭")
        : h.stack(h.heading("What I avoid"), h.lines({ count: 1 })),
      h.note(
        "Split it into its parts: sensations, situations, people, times. Give each a verdict before you think about fixes. Some aversions are right, and 'not worth fixing' is a valid verdict.",
      ),
      h.table({
        head: [
          "Part of it",
          "Verdict: fine · not worth fixing · fix",
          "Fix: change the situation, or try it small",
        ],
        rows: Array.from({ length: 7 }, () => ["", "", ""]),
        fill: true,
        className: "sb-c-gf",
      }),
      h.heading("The one fix I will pilot"),
      h.ifThen({ count: 1 }),
    );
  }
  return h.stack(
    data.action
      ? h.callout(`The action: ${data.action}`, "▭")
      : h.stack(h.heading("The action"), h.lines({ count: 1 })),
    h.check(["I am equally willing to find that I should keep doing this, or stop."]),
    h.table({
      head: [
        "Every goal it serves",
        "Button test: would getting only this, with none of the cost, be enough?",
        "Another way to get it",
      ],
      rows: Array.from({ length: 6 }, () => ["", "", ""]),
      fill: true,
      className: "sb-c-gf",
    }),
    h.heading("Reality check: the replacement I will actually try"),
    h.ifThen({ count: 1 }),
  );
};
