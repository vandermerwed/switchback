import { orderByPriority } from "../engine/pens";
import type { Mark, Orientation, Paper, PenMapping, Role, ShellOptions } from "../engine/types";
import { fontFaceCss } from "./fonts";
import { esc, helpers } from "./helpers";
import { TOKENS_CSS } from "./tokens";

export const PAPER_MM: Record<Paper, [number, number]> = {
  A4: [210, 297],
  Letter: [215.9, 279.4],
};

export interface PageParts {
  id: string;
  component: string;
  title: string;
  prompt: string;
  notes: string;
  body: string;
  shell: ShellOptions;
  legend: string;
  attribution?: string;
  tag?: string;
  orientation?: Orientation;
}

export function renderPage(p: PageParts): string {
  const marks = ["tl", "tr", "bl", "br"].map((c) => `<i class="sb-reg sb-${c}"></i>`).join("");
  const header = p.shell.header
    ? `<header class="sb-ph"><span class="sb-pid">${esc(p.id)}</span><span class="sb-ptitle">${esc(p.title)}</span><span class="sb-ptag">${esc(p.tag ?? p.component)}</span></header>`
    : "";
  const prompt = p.shell.prompt && p.prompt ? `<p class="sb-prompt">${esc(p.prompt)}</p>` : "";
  const notes = p.notes ? `<p class="sb-note">${esc(p.notes)}</p>` : "";
  const attrib = p.attribution ? `<p class="sb-attrib">${esc(p.attribution)}</p>` : "";
  const foot =
    p.shell.legend && p.legend
      ? `<footer class="sb-pfoot">${attrib}${p.legend}</footer>`
      : `<footer class="sb-pfoot">${attrib}<div class="sb-legend"><span class="sb-legend-id">${esc(p.id)}</span></div></footer>`;
  // A page with an attribution gets a two-line footer credit (the licence line plus the upstream
  // credit line). `.sb-pfoot` is absolutely positioned and outside the flex flow, so `.sb-pbody`
  // doesn't know to leave it room: the `sb-has-attrib` class (tokens.ts) gives the page extra
  // bottom padding, scoped so pages without an attribution keep their existing padding.
  // A landscape page (sb-landscape) prints on the named landscape page and swaps its box (tokens.ts).
  const pageClass = [
    "sb-page",
    p.attribution ? "sb-has-attrib" : "",
    p.orientation === "landscape" ? "sb-landscape" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<section class="${pageClass}" id="${esc(p.id)}" data-component="${esc(p.component)}">${marks}${header}${prompt}${notes}<div class="sb-pbody">${p.body}</div>${foot}</section>`;
}

export function legendStrip(
  roles: Role[],
  pens: PenMapping,
  pageId: string,
  marks: Mark[] = [],
  mode: "roles" | "proof" = "roles",
): string {
  const label = (r: Role) => (mode === "proof" ? (r.proof_label ?? "") : r.short);
  const parts = orderByPriority(roles)
    .filter((r) => mode === "roles" || r.proof_label)
    .map((r) => {
      const a = pens[r.id];
      return "pen" in a
        ? `<span>${esc(r.code)} ${esc(label(r))} = ${esc(a.pen)}</span>`
        : `<span>${helpers.letter(r.code)} ${esc(label(r))}</span>`;
    });
  const markParts =
    mode === "proof"
      ? marks.filter((m) => m.proof_label).map((m) => `<span>${esc(m.glyph)} ${esc(m.proof_label!)}</span>`)
      : [];
  return `<div class="sb-legend">${[...parts, ...markParts].join("")}<span class="sb-legend-id">${esc(pageId)}</span></div>`;
}

export function renderDocument(o: {
  title: string;
  paper: Paper;
  pages: string[];
  componentCss: string[];
  embedFonts?: boolean;
}): string {
  const [w, h] = PAPER_MM[o.paper];
  const size = o.paper === "Letter" ? "letter" : o.paper;
  const fonts = o.embedFonts === false ? "" : fontFaceCss();
  const css = [...new Set(o.componentCss)].join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<style>
${fonts}
:root{--sb-w:${w}mm;--sb-h:${h}mm}
@page{size:${size};margin:0}
@page sb-portrait{size:${size};margin:0}
@page sb-landscape{size:${size} landscape;margin:0}
${TOKENS_CSS}
${css}
</style>
</head>
<body>
${o.pages.join("\n")}
</body>
</html>
`;
}
