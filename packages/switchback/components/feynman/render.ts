import type { Render } from "../../src/engine/types";

export const render: Render = (_data, { h }) =>
  h.stack(
    h.box({ fill: true }),
    h.heading("Where I got stuck, or reached for jargon"),
    h.box({ height: 52 }),
    h.note("Whatever you had to skip is the thing to ask about."),
  );
