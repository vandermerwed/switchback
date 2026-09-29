import { orderByPriority } from "../engine/pens";
import type { Helpers } from "../engine/types";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const esc = (value: unknown): string =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);

const fillClass = (on?: boolean) => (on ? " sb-fill" : "");

export const helpers: Helpers = {
  esc,
  stack: (...parts) => parts.join(""),
  note: (text) => `<p class="sb-note">${esc(text)}</p>`,
  heading: (text) => `<h2 class="sb-h">${esc(text)}</h2>`,
  lines: ({ count = 8, fill = false } = {}) =>
    `<div class="sb-lines${fillClass(fill)}">${'<div class="sb-rule"></div>'.repeat(Math.max(1, count))}</div>`,
  box: ({ label, height, fill = false } = {}) =>
    `<div class="sb-box${fillClass(fill)}"${height ? ` style="height:${height}mm"` : ""}>${
      label ? `<span class="sb-label">${esc(label)}</span>` : ""
    }</div>`,
  cols: (parts, { fill = false } = {}) =>
    `<div class="sb-cols${fillClass(fill)}">${parts.map((p) => `<div class="sb-col">${p}</div>`).join("")}</div>`,
  cutGrid: ({ cells, columns, minHeight }) =>
    `<div class="sb-cut" style="grid-template-columns:repeat(${columns},1fr)"><span class="sb-scissors" aria-hidden="true">✂︎</span>${cells
      .map((c) => `<div class="sb-cut-cell" style="min-height:${minHeight}mm">${c}</div>`)
      .join("")}</div>`,
  zones: ({ labels, direction = "row", minHeight = 40, fill = false }) =>
    `<div class="sb-zones sb-zones-${direction}${fillClass(fill)}">${labels
      .map(
        (l) =>
          `<div class="sb-zone" style="min-height:${minHeight}mm">${l ? `<span class="sb-label">${esc(l)}</span>` : ""}</div>`,
      )
      .join("")}</div>`,
  table: ({ head, rows, fill = false, className }) => {
    const table = `<table class="sb-table${className ? ` ${className}` : ""}"><tr>${head
      .map((x) => `<th>${esc(x)}</th>`)
      .join(
        "",
      )}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`;
    return fill ? `<div class="sb-table-wrap sb-fill">${table}</div>` : table;
  },
  check: (items) =>
    `<ul class="sb-check">${items.map((i) => `<li><span class="sb-cbox"></span><span>${esc(i)}</span></li>`).join("")}</ul>`,
  ifThen: ({ count = 2, first } = {}) =>
    `<div class="sb-ifthen">${Array.from(
      { length: Math.max(1, count) },
      (_, i) =>
        `<div class="sb-ifthen-row"><span class="sb-ifthen-w">When</span><span class="sb-ifthen-blank">${
          i === 0 && first ? esc(first) : ""
        }</span><span class="sb-ifthen-w">, I will</span><span class="sb-ifthen-blank"></span></div>`,
    ).join("")}</div>`,
  callout: (text, glyph = "i") =>
    `<div class="sb-callout"><span class="sb-glyph">${esc(glyph)}</span><span>${esc(text)}</span></div>`,
  letter: (code) => `<span class="sb-letter">${esc(code)}</span>`,
  legendTable: (roles, pens) => {
    const rows = orderByPriority(roles)
      .map((r) => {
        const a = pens[r.id];
        const pen = "pen" in a ? esc(a.pen) : `your pen, or write ${helpers.letter(a.letter)}`;
        return `<tr><td class="sb-swatch"><span></span></td><td class="sb-code">${esc(r.code)}</td><td class="sb-role">${esc(
          r.name,
        )}</td><td class="sb-meaning">${esc(r.meaning)}</td><td class="sb-pen">${pen}</td></tr>`;
      })
      .join("");
    return `<table class="sb-legend-table"><tr><th>Your colour</th><th>Code</th><th>Role</th><th>Meaning</th><th>Pen</th></tr>${rows}</table>`;
  },
  svg: (inner, { viewBox, className }) =>
    `<svg class="sb-svg${className ? ` ${className}` : ""}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
};
