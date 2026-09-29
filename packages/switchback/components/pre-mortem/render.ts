import type { Render } from "../../src/engine/types";

export const render: Render = (_data, { h, variant }) => {
  if (variant === "iterate") {
    return h.stack(
      h.note(
        "Imagine it is done and it failed. Rate your surprise, give the likeliest reason, and change the plan. Stop when a failure would genuinely surprise you.",
      ),
      h.table({
        head: [
          "Round",
          "How surprised would I be if it failed? (0–10)",
          "The likeliest reason it failed",
          "What I'll change",
        ],
        rows: [
          ["1", "", "", ""],
          ["2", "", "", ""],
          ["3", "", "", ""],
        ],
        fill: true,
      }),
      h.heading("Early warning sign I could watch for"),
      h.lines({ count: 1 }),
    );
  }
  return h.stack(
    h.note("Why did it fail? What did we miss? Don't be kind."),
    h.lines({ count: 10, fill: true }),
    h.heading("The most plausible failure: the one worth preventing"),
    h.box({ height: 46 }),
    h.heading("Early warning sign I could watch for"),
    h.lines({ count: 1 }),
  );
};
