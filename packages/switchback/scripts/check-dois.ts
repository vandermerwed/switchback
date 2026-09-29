// Verify every DOI cited in the research notes and the catalogue against Crossref (research spec §9.1).
//
//   pnpm check-dois                          scan research notes, grounding, components, presets, styles
//   pnpm check-dois --doi <doi> [--cite ""]  check one DOI (used by agents before writing it)
//   add --json for machine-readable output
//
// Exit codes: 0 all resolve and match; 1 any not-found or mismatch; 2 only unreachable.
// The cache (research/.doi-cache.json) is committed; entries older than 90 days are re-checked.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  type CacheEntry,
  checkRefs,
  collectRefs,
  type DoiRef,
  exitCode,
  lookupDoi,
  normalizeDoi,
} from "./research/dois";

const root = resolve(import.meta.dirname, "..");
const cachePath = join(root, "research/.doi-cache.json");
const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const asJson = args.includes("--json");

const cache: Record<string, CacheEntry> = existsSync(cachePath)
  ? JSON.parse(readFileSync(cachePath, "utf8"))
  : {};
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const lookup = (doi: string) => lookupDoi(doi, { fetch, sleep });

let refs: DoiRef[];
const single = flag("--doi");
if (single !== undefined) {
  const doi = normalizeDoi(single);
  if (!doi) {
    console.error(`not a DOI: ${single}`);
    process.exit(1);
  }
  refs = [{ doi, cite: flag("--cite") ?? "", where: "--doi" }];
} else {
  refs = collectRefs(root);
}

const { results, cache: updated } = await checkRefs(refs, { cache, lookup, now: new Date(), sleep });
const sorted = Object.fromEntries(Object.entries(updated).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(cachePath, `${JSON.stringify(sorted, null, 2)}\n`);

const [first] = results;
if (asJson) {
  console.log(
    JSON.stringify(
      single !== undefined && first ? { ...first, meta: updated[first.doi] ?? null } : results,
      null,
      2,
    ),
  );
} else if (single !== undefined && first) {
  const r = first;
  const e = updated[r.doi];
  console.log(`${r.doi}: ${r.status}`);
  if (e?.status === "ok")
    console.log(`  "${e.title}" · first author ${e.first_author ?? "(none)"} · ${e.years.join("/")}`);
  for (const m of r.mismatches) console.log(`  mismatch: ${m.reason}`);
} else {
  const bad = results.filter((r) => r.status !== "ok");
  for (const r of bad) {
    console.log(`${r.status}  ${r.doi}${r.title ? `  "${r.title.slice(0, 70)}"` : ""}`);
    for (const m of r.mismatches) console.log(`    ${m.where}: ${m.reason} — cite: ${m.cite.slice(0, 90)}`);
  }
  const count = (s: string) => results.filter((r) => r.status === s).length;
  console.log(
    `\n${results.length} DOIs (${refs.length} citations): ${count("ok")} ok, ${count("E_DOI_MISMATCH")} mismatched, ` +
      `${count("E_DOI_NOT_FOUND")} not found, ${count("unreachable")} unreachable`,
  );
}
// Set, not exit(): exiting while fetch sockets close trips a libuv assertion on Windows.
process.exitCode = exitCode(results);
