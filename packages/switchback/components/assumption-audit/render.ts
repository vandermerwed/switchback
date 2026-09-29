import type { Render } from "../../src/engine/types";

interface Data {
  assumptions?: string[];
}

export const css = `.sb-c-audit th:nth-child(1) { width: 30%; } .sb-c-audit th:nth-child(2) { width: 10%; } .sb-c-audit th:nth-child(3) { width: 37%; }`;

export const render: Render<Data> = (data, { h }) => {
  const items = data.assumptions?.length ? data.assumptions : ["", "", "", "", ""];
  return h.table({
    head: ["Assumption", "Conf.", "What you'd see if it's false", "Cheapest way to check"],
    rows: items.map((a) => [a, "", "", ""]),
    fill: true,
    className: "sb-c-audit",
  });
};
