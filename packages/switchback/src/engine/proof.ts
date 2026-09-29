import type { Paper, ProofBlock, Spec } from "./types";

/**
 * Character budget per proof page, in blockCost units. It's conservative: the text column is
 * about 60 characters wide at 10pt. Tuned only against `SWITCHBACK_E2E=1 pnpm vitest run test/e2e`,
 * which builds the fixtures in test/fixtures/proof and fails on overflow: lower a paper's budget
 * in 10% steps if it ever does. A4 is physically taller than Letter, so its budget must stay
 * ≥ Letter's. As of this writing, neither paper has needed a reduction from these starting values.
 */
export const PROOF_BUDGET: Record<Paper, number> = { A4: 2100, Letter: 1900 };
const LINE = 60;
const GAP = 60;
/**
 * Characters of 8.5pt mono per visual line in the proof text column. Measured with real fonts:
 * about 59.9 on A4 and 63.3 on Letter. Kept below both, so a wrapped code line is never undercounted.
 */
const CODE_LINE = 56;
/** The proof schema's `maxLength` for a block's text. No block may exceed it, split or not. */
export const MAX_BLOCK_TEXT = 4000;

export function blockCost(b: ProofBlock): number {
  if (b.kind === "code")
    return (
      b.text.split("\n").reduce((n, line) => n + Math.max(1, Math.ceil(line.length / CODE_LINE)), 0) * LINE +
      GAP
    );
  const lines = Math.max(1, Math.ceil(b.text.length / (b.kind === "h" ? 50 : LINE)));
  return lines * LINE + GAP;
}

/** True when `text` is too costly for `max`, or too long for the schema, as a block of `kind`. */
const tooBig = (kind: ProofBlock["kind"], text: string, max: number) =>
  text.length > MAX_BLOCK_TEXT || blockCost({ kind, text } as ProofBlock) > max;

/**
 * Cuts one line or word with no break in it into pieces at character boundaries, each as long as
 * fits `max` and the schema's length limit. Concatenating the pieces gives back `text` exactly.
 */
function hardSplit(text: string, max: number, kind: ProofBlock["kind"]): string[] {
  let lo = 1;
  let hi = Math.min(text.length, MAX_BLOCK_TEXT);
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (tooBig(kind, "x".repeat(mid), max)) hi = mid - 1;
    else lo = mid;
  }
  const pieces: string[] = [];
  for (let i = 0; i < text.length; i += lo) pieces.push(text.slice(i, i + lo));
  return pieces;
}

export function parseDocument(text: string): ProofBlock[] {
  const src = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const out: ProofBlock[] = [];
  let n = 0;
  const lines = src.split("\n");
  let para: string[] = [];
  const flush = () => {
    const t = para
      .map((l) => l.trim())
      .join(" ")
      .trim();
    if (t) out.push({ kind: "p", n: ++n, text: t });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (/^```/.test(line.trim())) {
      flush();
      const body: string[] = [];
      for (i++; i < lines.length && !/^```/.test(lines[i]!.trim()); i++) body.push(lines[i]!);
      out.push({ kind: "code", n: ++n, text: body.join("\n") });
      continue;
    }
    const heading = /^#{1,6}\s+(.*)$/.exec(line.trim());
    const item = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      out.push({ kind: "h", text: heading[1]!.trim() });
    } else if (item) {
      flush();
      out.push({ kind: "li", n: ++n, text: item[1]!.trim() });
    } else if (line.trim() === "") flush();
    else para.push(line);
  }
  flush();
  return out;
}

/**
 * Falls back to splitting `text` at word boundaries, for a unit (a sentence, or a text with no
 * `.`/`!`/`?` at all) that is itself larger than `max` on its own — so no piece can exceed a page,
 * even when there's no sentence punctuation to split on.
 */
function splitWords(text: string, max: number, kind: ProofBlock["kind"]): string[] {
  const words = text.match(/\S+\s*/g) ?? [text];
  const chunks: string[] = [];
  let cur = "";
  for (const w of words) {
    if (tooBig(kind, w.trim(), max)) {
      // A single word longer than a chunk: cut it at character boundaries.
      if (cur) chunks.push(cur);
      cur = "";
      const pieces = hardSplit(w.trim(), max, kind);
      chunks.push(...pieces.slice(0, -1));
      cur = pieces.at(-1)! + w.slice(w.trim().length);
      continue;
    }
    const next = cur + w;
    if (cur && tooBig(kind, next.trim(), max)) {
      chunks.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) chunks.push(cur);
  return chunks;
}

function splitBlock(b: ProofBlock, max: number): ProofBlock[] {
  const units =
    b.kind === "code" ? b.text.split("\n") : (b.text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [b.text]);
  const joiner = b.kind === "code" ? "\n" : "";
  const chunks: string[] = [];
  let cur = "";
  for (const u of units) {
    if (tooBig(b.kind, b.kind === "code" ? u : u.trim(), max)) {
      if (cur) {
        chunks.push(cur);
        cur = "";
      }
      // A code line keeps its exact characters (indentation included), so it's cut at character
      // boundaries; prose falls back to word boundaries first.
      chunks.push(...(b.kind === "code" ? hardSplit(u, max, b.kind) : splitWords(u, max, b.kind)));
      continue;
    }
    const next = cur ? cur + joiner + u : u;
    if (cur && tooBig(b.kind, b.kind === "code" ? next : next.trim(), max)) {
      chunks.push(cur);
      cur = u;
    } else cur = next;
  }
  if (cur) chunks.push(cur);
  return chunks.map((text, i) => ({
    kind: b.kind,
    n: b.n,
    text: b.kind === "code" ? text : text.trim(),
    ...(i > 0 ? { cont: true } : {}),
  }));
}

export function packPages(blocks: ProofBlock[], paper: Paper): ProofBlock[][] {
  const budget = PROOF_BUDGET[paper];
  const pieces = blocks.flatMap((b) =>
    tooBig(b.kind, b.text, budget) ? splitBlock(b, Math.floor(budget * 0.5)) : [b],
  );
  const pages: ProofBlock[][] = [];
  let page: ProofBlock[] = [];
  let used = 0;
  for (const p of pieces) {
    const cost = blockCost(p);
    if (page.length && used + cost > budget) {
      // Carry every trailing heading (## A then ### B) to the next page, but never empty a page to
      // do it: a page that holds nothing but headings keeps them.
      const keep = page.findLastIndex((b) => b.kind !== "h") + 1;
      const carry = keep > 0 ? page.splice(keep) : [];
      pages.push(page);
      page = carry;
      used = carry.reduce((s, b) => s + blockCost(b), 0);
    }
    page.push(p);
    used += cost;
  }
  if (page.length) pages.push(page);
  return pages;
}

/** The proof schema's `maxLength` for `source`. */
const MAX_SOURCE = 120;

/**
 * `name` plus `suffix`, in at most 120 characters: a long name is cut in the middle of its stem,
 * keeping its extension and the whole suffix ("…draft.md · part 2 of 3").
 */
export function sourceLine(name: string, suffix = ""): string {
  const room = MAX_SOURCE - suffix.length;
  if (name.length <= room) return name + suffix;
  const ext = /\.[^.\s]{1,10}$/.exec(name)?.[0] ?? "";
  return `${name.slice(0, room - ext.length - 1)}…${ext}${suffix}`;
}

export function proofSpecs(
  blocks: ProofBlock[],
  opts: { title: string; paper: Paper; maxPages: number; source?: string },
): Spec[] {
  const pages = packPages(blocks, opts.paper);
  const parts: ProofBlock[][][] = [];
  for (let i = 0; i < pages.length; i += opts.maxPages) parts.push(pages.slice(i, i + opts.maxPages));
  // Page ids restart in every part, so a split proof names its part on every page's source line;
  // without that, the parts are indistinguishable once printed. From stdin, the title stands in.
  const name = opts.source ?? (parts.length > 1 ? opts.title : undefined);
  return parts.map((part, pi) => {
    const source =
      name === undefined
        ? undefined
        : sourceLine(name, parts.length > 1 ? ` · part ${pi + 1} of ${parts.length}` : "");
    return {
      switchback: 1,
      style: "proof",
      title: parts.length > 1 ? `${opts.title} (part ${pi + 1} of ${parts.length})` : opts.title,
      paper: opts.paper,
      round: 1,
      pages: part.map((b, i) => ({
        id: `W1-P${i + 1}`,
        component: "proof",
        data: { ...(source ? { source } : {}), blocks: b },
      })),
    };
  });
}
