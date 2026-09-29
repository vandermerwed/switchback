import type { ProofBlock, Render } from "../../src/engine/types";

interface Data {
  source?: string;
  blocks?: ProofBlock[];
}

export const css = `
.sb-c-proof { display: flex; flex-direction: column; gap: 2.4mm; }
.sb-c-pb { display: grid; grid-template-columns: 10mm 1fr 56mm; column-gap: 3mm; align-items: start; }
.sb-c-pn { font: 400 7.5pt var(--sb-mono); color: var(--sb-muted); padding-top: 0.8mm; }
.sb-c-pt { font-size: 10pt; line-height: 1.5; }
.sb-c-ph .sb-c-pt { font: 600 11pt/1.3 var(--sb-sans); padding-top: 1mm; }
.sb-c-pcode .sb-c-pt { font: 400 8.5pt/1.45 var(--sb-mono); white-space: pre-wrap; }
.sb-c-pli .sb-c-pt { padding-left: 4mm; text-indent: -3mm; }
.sb-c-pm { align-self: stretch; border-left: 0.5pt solid var(--sb-rule); min-height: 8mm; }
.sb-c-psrc { font: 400 7.5pt var(--sb-mono); color: var(--sb-faint); margin-bottom: 2mm; }
`;

/** Bold and italic, only where the delimiters hug the text: "2 * 3 * 4" stays literal. */
const emphasis = (s: string) =>
  s.replace(/\*\*(?=\S)(.+?\S)\*\*/g, "<strong>$1</strong>").replace(/\*(?=\S)([^*]*?\S)\*/g, "<em>$1</em>");

/**
 * Escape, then apply the pilot inline markup: **bold**, *italic*, `code`. Nothing else is
 * interpreted. Code spans are cut out first and kept literal, so `src/**\/*.ts` prints as written.
 */
export function inline(text: string, esc: (v: unknown) => string): string {
  return esc(text)
    .split(/(`[^`]+`)/g)
    .map((part, i) => (i % 2 ? `<code>${part.slice(1, -1)}</code>` : emphasis(part)))
    .join("");
}

const KIND_CLASS = { p: "sb-c-pp", h: "sb-c-ph", li: "sb-c-pli", code: "sb-c-pcode" } as const;

export const render: Render<Data> = (data, { h }) => {
  const rows = (data.blocks ?? [])
    .map((b) => {
      const label = b.kind === "h" || b.n === undefined ? "" : b.cont ? `(¶${b.n})` : `¶${b.n}`;
      const text =
        b.kind === "code" ? h.esc(b.text) : `${b.kind === "li" ? "• " : ""}${inline(b.text, h.esc)}`;
      return `<div class="sb-c-pb ${KIND_CLASS[b.kind]}"><span class="sb-c-pn">${label}</span><div class="sb-c-pt">${text}</div><div class="sb-c-pm"></div></div>`;
    })
    .join("");
  const source = data.source ? `<div class="sb-c-psrc">${h.esc(data.source)}</div>` : "";
  return `${source}<div class="sb-c-proof">${rows}</div>`;
};
