// DOI verification against Crossref for the research notes (research spec §9.1).
// Pure logic lives here; scripts/check-dois.ts is the command-line wrapper.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DOI_PATTERN = /10\.\d{4,9}\/[^\s|"'`<>]+/i;

/** Extracts and canonicalises a DOI: lower case, no resolver prefix, no trailing punctuation. */
export function normalizeDoi(text: string): string | null {
  const match = text.match(DOI_PATTERN);
  if (!match) return null;
  return match[0].replace(/[.,;:)\]]+$/, "").toLowerCase();
}

/** One place a DOI is cited: the DOI, the citation text to match against, and where it was found. */
export interface DoiRef {
  doi: string;
  cite: string;
  where: string;
  /** The whole line or table row, tried when `cite` alone does not name the author and year. */
  context?: string;
}

const YEAR_CELL = /^(1[89]|20)\d\d\b/;

/** Each DOI in a piece of text, with the text between it and the previous DOI (or the start). */
function doisWithPrefix(text: string): Array<{ doi: string; prefix: string }> {
  const found: Array<{ doi: string; prefix: string }> = [];
  let from = 0;
  for (const m of text.matchAll(new RegExp(DOI_PATTERN.source, "gi"))) {
    const doi = normalizeDoi(m[0]);
    if (doi) found.push({ doi, prefix: text.slice(from, m.index).trim() });
    from = (m.index ?? 0) + m[0].length;
  }
  return found;
}

/**
 * Finds every DOI in a research note. In a table row, the citation is the row's first cell, the
 * text before the DOI in its own cell, and any cell that starts with a year. In prose, it is the
 * text between the DOI and the previous DOI on the line (or the line start).
 */
export function extractFromMarkdown(text: string, file: string): DoiRef[] {
  const refs: DoiRef[] = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (!DOI_PATTERN.test(line)) return;
    const where = `${file}:${i + 1}`;
    if (line.trimStart().startsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const years = cells.slice(1).filter((c) => YEAR_CELL.test(c));
      cells.forEach((cell, k) => {
        for (const { doi, prefix } of doisWithPrefix(cell)) {
          const cite = [k === 0 ? "" : cells[0], prefix, ...years].filter(Boolean).join(" ");
          refs.push({ doi, cite, where, context: line });
        }
      });
    } else {
      for (const { doi, prefix } of doisWithPrefix(line))
        refs.push({ doi, cite: prefix, where, context: line });
    }
  });
  return refs;
}

/** Finds every object in a JSON document that carries a `doi`, paired with its `cite`. */
export function extractFromJson(value: unknown, file: string): DoiRef[] {
  const refs: DoiRef[] = [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>;
      const doi = typeof obj.doi === "string" ? normalizeDoi(obj.doi) : null;
      if (doi) refs.push({ doi, cite: typeof obj.cite === "string" ? obj.cite : "", where: file });
      Object.values(obj).forEach(walk);
    }
  };
  walk(value);
  return refs;
}

/**
 * Every DOI cited in the places spec §9.1 scans, relative to the package root: the family
 * notes (research/*.md, not the sourcing batches), research/grounding.json, each
 * component.json, the presets and registry/styles.json.
 */
export function collectRefs(root: string): DoiRef[] {
  const refs: DoiRef[] = [];
  const list = (dir: string) =>
    existsSync(join(root, dir)) ? readdirSync(join(root, dir), { withFileTypes: true }) : [];
  const json = (rel: string) => {
    if (existsSync(join(root, rel)))
      refs.push(...extractFromJson(JSON.parse(readFileSync(join(root, rel), "utf8")), rel));
  };
  for (const f of list("research")) {
    if (f.isFile() && f.name.endsWith(".md"))
      refs.push(
        ...extractFromMarkdown(readFileSync(join(root, "research", f.name), "utf8"), `research/${f.name}`),
      );
  }
  json("research/grounding.json");
  for (const d of list("components")) if (d.isDirectory()) json(`components/${d.name}/component.json`);
  for (const f of list("presets")) if (f.isFile() && f.name.endsWith(".json")) json(`presets/${f.name}`);
  json("registry/styles.json");
  return refs;
}

/** What Crossref says about a DOI, reduced to what the match check needs. */
export interface DoiMeta {
  title: string | null;
  /** Family name of the first personal author, or null for group or organisational authors. */
  first_author: string | null;
  /** Every year Crossref records (issued, print, online), so online-first citations still match. */
  years: number[];
}

export type MatchResult = { ok: true } | { ok: false; reason: string };

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/æ/gi, "ae")
    .replace(/ø/gi, "o")
    .replace(/ß/g, "ss")
    .toLowerCase();

export const USER_AGENT = "switchback-doi-check/0.1 (+https://github.com/vandermerwed/switchback)";
const BACKOFF_MS = [1000, 2000, 4000, 8000];

export type Lookup = { status: "ok"; meta: DoiMeta } | { status: "not_found" } | { status: "unreachable" };

export interface LookupDeps {
  fetch: (url: string, init?: { headers?: Record<string, string> }) => Promise<Response>;
  sleep: (ms: number) => Promise<void>;
}

interface CrossrefWork {
  title?: string[];
  author?: Array<{ family?: string; name?: string }>;
  [date: string]: unknown;
}

function toMeta(work: CrossrefWork): DoiMeta {
  const years = new Set<number>();
  for (const key of ["issued", "published-print", "published-online"]) {
    const year = (work[key] as { "date-parts"?: number[][] } | undefined)?.["date-parts"]?.[0]?.[0];
    if (typeof year === "number") years.add(year);
  }
  return {
    title: work.title?.[0] ?? null,
    first_author: work.author?.[0]?.family ?? null,
    years: [...years].sort(),
  };
}

/** Looks a DOI up on Crossref (no email is ever sent), retrying 429, 5xx and network errors with backoff. */
export async function lookupDoi(doi: string, deps: LookupDeps): Promise<Lookup> {
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
  for (let attempt = 0; ; attempt++) {
    let status: number;
    let res: Response | undefined;
    try {
      res = await deps.fetch(url, { headers: { "User-Agent": USER_AGENT } });
      status = res.status;
    } catch {
      status = 0;
    }
    if (res && status === 200)
      return { status: "ok", meta: toMeta(((await res.json()) as { message: CrossrefWork }).message) };
    if (status === 404) return { status: "not_found" };
    const retryable = status === 0 || status === 429 || status >= 500;
    if (!retryable || attempt >= BACKOFF_MS.length) return { status: "unreachable" };
    await deps.sleep(BACKOFF_MS[attempt] ?? 8000);
  }
}

/** One cached Crossref answer (spec §9.1), plus every recorded year so online-first citations match. */
export interface CacheEntry extends DoiMeta {
  doi: string;
  year: number | null;
  status: "ok" | "not_found";
  checked_at: string;
}

export type DoiStatus = "ok" | "E_DOI_MISMATCH" | "E_DOI_NOT_FOUND" | "unreachable";

export interface DoiResult {
  doi: string;
  status: DoiStatus;
  title: string | null;
  refs: number;
  mismatches: Array<{ cite: string; where: string; reason: string }>;
}

export interface CheckOptions {
  cache: Record<string, CacheEntry>;
  lookup: (doi: string) => Promise<Lookup>;
  now: Date;
  sleep: (ms: number) => Promise<void>;
  maxAgeDays?: number;
  concurrency?: number;
  spacingMs?: number;
}

/** Checks every cited DOI once, reusing fresh cache entries; returns per-DOI results and the updated cache. */
export async function checkRefs(refs: DoiRef[], opts: CheckOptions) {
  const { now, maxAgeDays = 90, concurrency = 2, spacingMs = 250 } = opts;
  const cache = { ...opts.cache };
  const byDoi = new Map<string, DoiRef[]>();
  for (const r of refs) byDoi.set(r.doi, [...(byDoi.get(r.doi) ?? []), r]);

  const fresh = (e?: CacheEntry) => !!e && now.getTime() - Date.parse(e.checked_at) < maxAgeDays * 86_400_000;
  const toFetch = [...byDoi.keys()].filter((d) => !fresh(cache[d]));
  const unreachable = new Set<string>();

  // One shared throttle: each request starts at least spacingMs after the previous one started,
  // and `concurrency` workers bound how many are in flight.
  let gate: Promise<void> = Promise.resolve();
  const slot = () => (gate = gate.then(() => opts.sleep(spacingMs)));
  let next = 0;
  const worker = async () => {
    while (next < toFetch.length) {
      const doi = toFetch[next++];
      if (doi === undefined) break;
      await slot();
      const found = await opts.lookup(doi);
      if (found.status === "unreachable") {
        unreachable.add(doi);
        continue;
      }
      const meta = found.status === "ok" ? found.meta : { title: null, first_author: null, years: [] };
      cache[doi] = {
        doi,
        ...meta,
        year: meta.years[0] ?? null,
        status: found.status,
        checked_at: now.toISOString(),
      };
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));

  const results: DoiResult[] = [...byDoi.entries()].map(([doi, cites]) => {
    const entry = cache[doi];
    if (unreachable.has(doi) || !entry)
      return { doi, status: "unreachable", title: null, refs: cites.length, mismatches: [] };
    if (entry.status === "not_found")
      return { doi, status: "E_DOI_NOT_FOUND", title: null, refs: cites.length, mismatches: [] };
    const mismatches = cites.flatMap((c) => {
      const tight = matchCitation(c.cite, entry);
      const m = !tight.ok && c.context ? matchCitation(c.context, entry) : tight;
      return m.ok ? [] : [{ cite: c.cite, where: c.where, reason: m.reason }];
    });
    return {
      doi,
      status: mismatches.length ? "E_DOI_MISMATCH" : "ok",
      title: entry.title,
      refs: cites.length,
      mismatches,
    };
  });
  return { results, cache };
}

/** Spec §9.1 exit codes: 0 all good, 1 any not-found or mismatch, 2 only unreachable failures. */
export function exitCode(results: Array<{ status: DoiStatus }>): 0 | 1 | 2 {
  if (results.some((r) => r.status === "E_DOI_MISMATCH" || r.status === "E_DOI_NOT_FOUND")) return 1;
  if (results.some((r) => r.status === "unreachable")) return 2;
  return 0;
}

/**
 * A citation matches when it names the first author's surname and one of Crossref's years.
 * The year is compared only when both sides have one (prose often names an author without a
 * year, and some records, such as theses, carry no date); at least one check must apply.
 */
export function matchCitation(cite: string, meta: DoiMeta): MatchResult {
  const text = fold(cite);
  if (meta.first_author && !text.includes(fold(meta.first_author))) {
    return { ok: false, reason: `first author "${meta.first_author}" is not in the citation` };
  }
  const citedYears = (cite.match(/\b(1[89]\d\d|20\d\d)\b/g) ?? []).map(Number);
  const canCompareYears = citedYears.length > 0 && meta.years.length > 0;
  if (!meta.first_author && !canCompareYears) {
    return { ok: false, reason: "no personal author on the record and no year in the citation to compare" };
  }
  if (canCompareYears && !citedYears.some((y) => meta.years.includes(y))) {
    return {
      ok: false,
      reason: `cited year ${citedYears.join("/") || "(none)"} is not among Crossref's ${meta.years.join("/")}`,
    };
  }
  return { ok: true };
}
