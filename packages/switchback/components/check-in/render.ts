import type { Render } from "../../src/engine/types";

interface Data {
  rows?: string[];
  scale?: number;
}

export const css = `
.sb-c-ci td { height: 14mm; vertical-align: middle; }
.sb-c-ci-dots { white-space: nowrap; }
.sb-c-ci-dot { display: inline-block; width: 5mm; height: 5mm; margin-right: 1.5mm; vertical-align: middle; border: 0.7pt solid var(--sb-line); border-radius: 50%; }
`;

const DEFAULT_ROWS = ["energy", "progress on what matters", "stress"];

export const render: Render<Data> = (data, { h, variant }) => {
  const rows = data.rows?.length ? data.rows : DEFAULT_ROWS;
  const dots = `<span class="sb-c-ci-dots">${'<span class="sb-c-ci-dot"></span>'.repeat(data.scale ?? 5)}</span>`;
  const table = `<table class="sb-table sb-c-ci"><tr><th>Row</th><th>Today</th><th>vs last time (↑ ↓ =)</th></tr>${rows
    .map((r) => `<tr><td>${h.esc(r)}</td><td>${dots}</td><td></td></tr>`)
    .join("")}</table>`;
  const gratitude =
    variant === "gratitude"
      ? h.stack(
          h.heading("One thing I'm grateful for, and why"),
          h.lines({ count: rows.length >= 5 ? 1 : 2 }),
        )
      : "";
  return h.stack(
    h.note("Same page every time. Rate the rows first, before you think about them."),
    table,
    h.heading("Since last time"),
    h.lines({ count: 3 }),
    gratitude,
    h.heading("Free-write (a few minutes; a win, a lesson, or whatever is loudest)"),
    h.lines({ count: 5, fill: true }),
    h.heading("Next time, start from"),
    h.lines({ count: 1 }),
  );
};
