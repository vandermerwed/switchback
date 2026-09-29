import type { Render } from "../../src/engine/types";

export const render: Render = (_data, { h }) =>
  h.stack(
    h.box({ fill: true, label: "design without it" }),
    h.heading("Now bring the constraint back. What survives?"),
    h.box({ height: 62 }),
  );
