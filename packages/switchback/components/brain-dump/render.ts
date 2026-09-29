import type { Render } from "../../src/engine/types";

interface Data {
  seed?: string;
  minutes?: number;
}

export const render: Render<Data> = (data, { h }) =>
  h.stack(
    h.note(
      `Empty the tank. No structure, no judgement. ${data.minutes ?? 10} minutes. Then, beside each item, write its next step, or 'none'.`,
    ),
    h.cols([h.lines({ count: 14, fill: true }), h.lines({ count: 14, fill: true })], { fill: true }),
  );
