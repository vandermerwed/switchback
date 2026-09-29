import type { Render } from "../../src/engine/types";

interface Data {
  rows?: string[];
  scale?: number;
  steps?: number;
  three_state?: boolean;
}

export const css = `
.sb-c-score td { height: 22mm; vertical-align: middle; }
.sb-c-dots { white-space: nowrap; }
.sb-c-dot { display: inline-block; width: 6mm; height: 6mm; margin-right: 2mm; vertical-align: middle; border: 0.7pt solid var(--sb-line); border-radius: 50%; }
.sb-c-track { display: flex; align-items: center; margin-bottom: 5mm; }
.sb-c-track-label { width: 36mm; padding-right: 2mm; font-size: 9.5pt; overflow-wrap: anywhere; }
.sb-c-cells { display: flex; flex: 1 1 auto; border-right: 0.6pt solid var(--sb-line); }
.sb-c-cell { flex: 1 1 0; height: 15mm; border: 0.6pt solid var(--sb-line); border-right: 0; display: flex; align-items: center; justify-content: center; font: 400 7.5pt var(--sb-mono); color: var(--sb-faint); }
`;

const DEFAULT_ROWS = ["how sure am I", "how much do I want this", "how much energy is left"];

export const render: Render<Data> = (data, { h, variant }) => {
  const rows = data.rows?.length ? data.rows : DEFAULT_ROWS;
  if (variant === "running") {
    const steps = data.steps ?? 10;
    const track = (label: string) =>
      `<div class="sb-c-track"><div class="sb-c-track-label">${h.esc(label)}</div><div class="sb-c-cells">${Array.from(
        { length: steps },
        (_, i) => `<div class="sb-c-cell">${i + 1}</div>`,
      ).join("")}</div></div>`;
    return h.stack(
      h.note(
        data.three_state
          ? "Mark each cell: ✓ done · / partial · – missed. Partial still counts; the shape matters more than the count."
          : "Mark the next cell whenever the thing moves. The shape matters more than the count.",
      ),
      rows.map(track).join(""),
    );
  }
  if (variant === "domains") {
    const domains = data.rows?.length
      ? data.rows
      : ["Health", "Work", "Relationships", "Money", "Home", "Mind"];
    const dots = `<span class="sb-c-dots">${'<span class="sb-c-dot"></span>'.repeat(data.scale ?? 7)}</span>`;
    const body = domains
      .map((d) => `<tr><td>${h.esc(d)}</td><td>${dots}</td><td></td><td></td></tr>`)
      .join("");
    return h.stack(
      h.note(
        "Rate each domain today, then write one line on why. Copy last time's rating across from the previous page.",
      ),
      `<table class="sb-table sb-c-score"><tr><th>Domain</th><th>Today</th><th>One line on why</th><th>Last time</th></tr>${body}</table>`,
      h.heading("The domain that moved most since last time, and what moved it"),
      h.lines({ count: 3 }),
    );
  }
  const dots = `<span class="sb-c-dots">${'<span class="sb-c-dot"></span>'.repeat(data.scale ?? 5)}</span>`;
  const body = rows
    .map((r) => `<tr><td>${h.esc(r)}</td><td>${dots}</td><td></td><td>${dots}</td></tr>`)
    .join("");
  return h.stack(
    `<table class="sb-table sb-c-score"><tr><th>Rate</th><th>At the start</th><th>Why</th><th>At the end</th></tr>${body}</table>`,
    h.note("The change between start and end matters more than the number."),
  );
};
