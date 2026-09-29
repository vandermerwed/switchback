import type { Render } from "../../src/engine/types";

interface Data {
  question?: string;
  resolve_by?: string;
  tasks?: string[];
}

export const css = `
.sb-c-est { white-space: nowrap; }
.sb-c-half { display: inline-block; width: 5mm; height: 5mm; margin-right: 1.2mm; vertical-align: middle; border: 0.7pt solid var(--sb-line); border-radius: 50%; }
.sb-c-dur td { height: 16mm; vertical-align: middle; }
.sb-c-dur th:nth-child(2) { width: 58mm; } .sb-c-dur th:nth-child(3), .sb-c-dur th:nth-child(4) { width: 20mm; }
`;

export const render: Render<Data> = (data, { h, variant }) => {
  if (variant === "duration") {
    const tasks = data.tasks?.length ? data.tasks : ["Task 1", "Task 2", "Task 3"];
    const circles = `<span class="sb-c-est">${'<span class="sb-c-half"></span>'.repeat(8)}</span>`;
    return h.stack(
      `<table class="sb-table sb-c-dur"><tr><th>Task</th><th>Estimate (one circle = 30 min)</th><th>Start</th><th>Actual</th></tr>${tasks
        .map((t) => `<tr><td>${h.esc(t)}</td><td>${circles}</td><td></td><td></td></tr>`)
        .join("")}</table>`,
      h.heading("End of day: over or under, and by how much?"),
      h.lines({ count: 3 }),
      h.heading("Was the miss about the task, or about interruptions?"),
      h.lines({ count: 2 }),
    );
  }
  return h.stack(
    h.callout(`Forecast: ${data.question ?? "the question"}`, "?"),
    h.heading("How often does this kind of thing happen? (the base rate, and where it comes from)"),
    h.lines({ count: 2 }),
    h.heading("My probability"),
    h.box({ label: "%", height: 22 }),
    h.heading(`Resolves by: ${data.resolve_by ?? "________"}`),
    h.heading("What would change my mind before then"),
    h.lines({ count: 3 }),
    h.heading("At the return: what happened, and the score"),
    h.box({ fill: true }),
  );
};
