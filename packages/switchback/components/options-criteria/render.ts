import type { Render } from "../../src/engine/types";

interface Data {
  options?: string[];
  criteria?: string[];
  scale?: string;
}

export const css = `.sb-c-opts td:first-child { font-weight: 600; } .sb-c-opts th:nth-child(2), .sb-c-opts th:last-child { width: 16mm; }`;

export const render: Render<Data> = (data, { h }) => {
  const options = data.options?.length ? data.options : ["Option A", "Option B", "Option C"];
  const criteria = data.criteria?.length ? data.criteria : ["Criterion 1", "Criterion 2", "Criterion 3"];
  return h.stack(
    h.note(
      `Score your gut first, before any criteria. Then score each criterion (${data.scale ?? "0–3"}) and total them. The gap between gut and total is the point.`,
    ),
    h.table({
      head: ["Option", "Gut (first)", ...criteria, "Total"],
      rows: options.map((o) => [o, "", ...criteria.map(() => ""), ""]),
      fill: true,
      className: "sb-c-opts",
    }),
  );
};
