// Fetch the abstract of every DOI cited in research/sourcing/*.json, so graders
// can check recorded findings against text that was actually retrieved.
// Sources, in order: OpenAlex, Semantic Scholar, Crossref. No API keys, no email.
//
// Usage: node research/tools/fetch-abstracts.mjs [outDir]
// Writes <outDir>/<BATCH>.md (one per sourcing batch) and <outDir>/cache.json.
// The default outDir is ../../../../.superpowers/research/abstracts (git-ignored):
// abstracts are publishers' text, so they are cached locally, not committed.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcingDir = join(here, "..", "sourcing");
const outDir = process.argv[2] ?? join(here, "..", "..", "..", "..", ".superpowers", "research", "abstracts");
const UA = "longhand-research (https://github.com/vandermerwed/switchback)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(outDir, { recursive: true });
const cachePath = join(outDir, "cache.json");
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};

async function getJson(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return res.json();
    if (res.status === 404) return null;
    if (res.status === 429 || res.status >= 500) {
      await sleep(1000 * 2 ** attempt);
      continue;
    }
    return null;
  }
  return null;
}

function fromInverted(index) {
  if (!index) return null;
  const words = [];
  for (const [word, positions] of Object.entries(index)) for (const p of positions) words[p] = word;
  return words.join(" ").trim() || null;
}

const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

async function fetchAbstract(doi) {
  const enc = encodeURIComponent(doi);
  const oa = await getJson(`https://api.openalex.org/works/doi:${enc}`);
  const meta = { title: oa?.title ?? null, year: oa?.publication_year ?? null };
  const oaText = fromInverted(oa?.abstract_inverted_index);
  if (oaText) return { ...meta, via: "OpenAlex", abstract: oaText };
  await sleep(1100);
  const ss = await getJson(
    `https://api.semanticscholar.org/graph/v1/paper/DOI:${enc}?fields=title,year,abstract`,
  );
  if (ss?.abstract)
    return {
      title: meta.title ?? ss.title,
      year: meta.year ?? ss.year,
      via: "Semantic Scholar",
      abstract: ss.abstract,
    };
  await sleep(1000);
  const cr = await getJson(`https://api.crossref.org/works/${enc}`);
  const crAbs = cr?.message?.abstract;
  if (crAbs)
    return {
      title: meta.title ?? cr.message.title?.[0] ?? null,
      year: meta.year,
      via: "Crossref",
      abstract: stripTags(crAbs),
    };
  return { ...meta, via: null, abstract: null };
}

const batches = readdirSync(sourcingDir).filter((f) => f.endsWith(".json"));
let fetched = 0,
  found = 0,
  missing = 0;
for (const file of batches) {
  const batch = file.replace(/\.json$/, "");
  let claims;
  try {
    claims = JSON.parse(readFileSync(join(sourcingDir, file), "utf8"));
  } catch {
    console.log(`${batch}: skipped (not valid JSON yet)`);
    continue;
  }
  const lines = [
    `# Abstracts for sourcing batch ${batch}`,
    "",
    "Fetched by research/tools/fetch-abstracts.mjs. `via` names the API the text came from; the text is the abstract only.",
    "",
  ];
  for (const c of claims) {
    const refs = [...(c.sources ?? []), ...(c.replication ?? []), ...(c.backfire ?? [])];
    const dois = [
      ...new Set(
        refs
          .map((r) => (r.doi ?? "").trim().replace(/^https?:\/\/doi\.org\//, ""))
          .filter((d) => d.startsWith("10.")),
      ),
    ];
    lines.push(`## ${c.claim_id}`, "");
    for (const doi of dois) {
      if (!cache[doi]) {
        cache[doi] = await fetchAbstract(doi);
        fetched++;
        await sleep(300);
        writeFileSync(cachePath, JSON.stringify(cache, null, 1));
      }
      const a = cache[doi];
      a.abstract ? found++ : missing++;
      lines.push(
        `### ${doi}`,
        `**${a.title ?? "(no title)"}** (${a.year ?? "?"}) · via ${a.via ?? "none"}`,
        "",
        a.abstract ?? "_No abstract available from OpenAlex, Semantic Scholar or Crossref._",
        "",
      );
    }
  }
  writeFileSync(join(outDir, `${batch}.md`), lines.join("\n"));
  console.log(`${batch}: done`);
}
console.log(
  `fetched ${fetched} new; abstract found ${found}, missing ${missing} (counted per claim reference)`,
);
