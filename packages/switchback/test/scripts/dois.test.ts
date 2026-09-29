import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  type CacheEntry,
  checkRefs,
  collectRefs,
  exitCode,
  extractFromJson,
  extractFromMarkdown,
  type Lookup,
  lookupDoi,
  matchCitation,
  normalizeDoi,
} from "../../scripts/research/dois";

describe("checkRefs", () => {
  const now = new Date("2026-09-26T00:00:00Z");
  const rowlandMeta = { title: "Testing vs restudy", first_author: "Rowland", years: [2014] };
  const okLookup =
    (meta = rowlandMeta) =>
    async (): Promise<Lookup> => ({ status: "ok", meta });
  const base = { now, sleep: async () => {} };

  it("uses a cache entry younger than 90 days without looking the DOI up", async () => {
    const cache: Record<string, CacheEntry> = {
      "10.1037/a0037559": {
        doi: "10.1037/a0037559",
        ...rowlandMeta,
        year: 2014,
        status: "ok",
        checked_at: "2026-08-01T00:00:00Z",
      },
    };
    let lookups = 0;
    const { results } = await checkRefs(
      [{ doi: "10.1037/a0037559", cite: "Rowland (2014)", where: "a.md:1" }],
      {
        ...base,
        cache,
        lookup: async () => {
          lookups++;
          return { status: "unreachable" };
        },
      },
    );
    expect(lookups).toBe(0);
    expect(results[0]?.status).toBe("ok");
  });

  it("looks up again when the cache entry is older than 90 days, and refreshes it", async () => {
    const cache: Record<string, CacheEntry> = {
      "10.1037/a0037559": {
        doi: "10.1037/a0037559",
        ...rowlandMeta,
        year: 2014,
        status: "ok",
        checked_at: "2026-01-01T00:00:00Z",
      },
    };
    const out = await checkRefs([{ doi: "10.1037/a0037559", cite: "Rowland (2014)", where: "a.md:1" }], {
      ...base,
      cache,
      lookup: okLookup(),
    });
    expect(out.cache["10.1037/a0037559"]?.checked_at).toBe(now.toISOString());
  });

  it("reports each citation that does not match, with where it is and why", async () => {
    const refs = [
      { doi: "10.1037/a0037559", cite: "Rowland (2014)", where: "a.md:1" },
      { doi: "10.1037/a0037559", cite: "Roland (2014)", where: "b.md:9" },
    ];
    const { results } = await checkRefs(refs, { ...base, cache: {}, lookup: okLookup() });
    expect(results[0]?.status).toBe("E_DOI_MISMATCH");
    expect(results[0]?.mismatches).toEqual([
      { cite: "Roland (2014)", where: "b.md:9", reason: expect.stringMatching(/author/) },
    ]);
  });

  it("accepts a citation whose line names the author elsewhere, but not one whose line does not", async () => {
    const refs = [
      {
        doi: "10.1037/a0037559",
        cite: "tie-break 4 applies (",
        context: "tie-break 4 applies (…). Rowland's 2014 table",
        where: "a.md:1",
      },
      { doi: "10.1037/a0037559", cite: "see (", context: "see (…) for details", where: "b.md:2" },
    ];
    const { results } = await checkRefs(refs, { ...base, cache: {}, lookup: okLookup() });
    expect(results[0]?.mismatches.map((m) => m.where)).toEqual(["b.md:2"]);
  });

  it("reports a DOI Crossref does not know as not found", async () => {
    const { results } = await checkRefs([{ doi: "10.9999/nope", cite: "X (2000)", where: "a.md:1" }], {
      ...base,
      cache: {},
      lookup: async () => ({ status: "not_found" }),
    });
    expect(results[0]?.status).toBe("E_DOI_NOT_FOUND");
  });

  it("runs at most two lookups at once and spaces them at least 250 ms apart", async () => {
    let inFlight = 0;
    let peak = 0;
    const waits: number[] = [];
    const lookup = async (): Promise<Lookup> => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((r) => setTimeout(r, 5));
      inFlight--;
      return { status: "ok", meta: rowlandMeta };
    };
    const refs = ["a", "b", "c", "d", "e"].map((s) => ({
      doi: `10.1/${s}`,
      cite: "Rowland (2014)",
      where: "x",
    }));
    await checkRefs(refs, { now, cache: {}, lookup, sleep: async (ms) => void waits.push(ms) });
    expect(peak).toBeLessThanOrEqual(2);
    expect(waits.every((ms) => ms >= 250)).toBe(true);
    expect(waits).toHaveLength(5);
  });
});

describe("collectRefs", () => {
  it("scans the spec §9.1 locations: research notes, grounding, components, presets and styles", () => {
    const root = mkdtempSync(join(tmpdir(), "dois-"));
    const put = (p: string, s: string) => {
      mkdirSync(join(root, p, ".."), { recursive: true });
      writeFileSync(join(root, p), s);
    };
    put("research/memory-retrieval.md", "| Rowland | 10.1037/a0037559 | 2014 |\n");
    put("research/sourcing/MR-A.md", "| Ignored | 10.1000/batch | 2014 |\n");
    put(
      "research/grounding.json",
      JSON.stringify({ c: { sources: [{ cite: "A (2001)", doi: "10.1000/g" }] } }),
    );
    put(
      "components/free-recall/component.json",
      JSON.stringify({ grounding: { claims: [{ sources: [{ cite: "B (2002)", doi: "10.1000/c" }] }] } }),
    );
    put("presets/eisenhower.json", JSON.stringify({ sources: [{ cite: "C (2003)", doi: "10.1000/p" }] }));
    put(
      "registry/styles.json",
      JSON.stringify({ styles: [{ sources: [{ cite: "D (2004)", doi: "10.1000/s" }] }] }),
    );
    expect(
      collectRefs(root)
        .map((r) => r.doi)
        .sort(),
    ).toEqual(["10.1000/c", "10.1000/g", "10.1000/p", "10.1000/s", "10.1037/a0037559"]);
  });
});

describe("exitCode", () => {
  it("is 0 when every DOI resolves and matches, 1 on any not-found or mismatch, 2 when only unreachable", () => {
    expect(exitCode([{ status: "ok" }])).toBe(0);
    expect(exitCode([{ status: "ok" }, { status: "unreachable" }])).toBe(2);
    expect(exitCode([{ status: "unreachable" }, { status: "E_DOI_MISMATCH" }])).toBe(1);
    expect(exitCode([{ status: "E_DOI_NOT_FOUND" }])).toBe(1);
  });
});

describe("extractFromMarkdown", () => {
  it("takes the citation from a source-table row's first cell and its year column", () => {
    const md = [
      "| Cite | DOI | Year | Type | Finding |",
      "| --- | --- | --- | --- | --- |",
      '| Rowland, "The effect of testing" | 10.1037/a0037559 | 2014 | meta-analysis | "g = 0.50" (Adesope 2017 agrees) |',
    ].join("\n");
    expect(extractFromMarkdown(md, "memory-retrieval.md")).toEqual([
      {
        doi: "10.1037/a0037559",
        cite: 'Rowland, "The effect of testing" 2014',
        where: "memory-retrieval.md:3",
        context: md.split("\n")[2],
      },
    ]);
  });

  it("takes the citation from the text before a DOI in a prose line", () => {
    const md =
      "- Dalton & Spiller, *J. Consumer Research*, 2012. DOI 10.1086/664500 (verified). Finding: fewer goals.";
    expect(extractFromMarkdown(md, "x.md")).toEqual([
      {
        doi: "10.1086/664500",
        cite: "- Dalton & Spiller, *J. Consumer Research*, 2012. DOI",
        where: "x.md:1",
        context: md,
      },
    ]);
  });
});

describe("extractFromMarkdown, citations beside the DOI", () => {
  it("extracts every DOI on a line, each with the text that precedes it", () => {
    const md =
      "confirmed: Yang et al. 2021 (10.1037/bul0000309) and Latimier 2021 (10.1007/s10648-020-09572-8) agree";
    expect(extractFromMarkdown(md, "x.md").map((r) => [r.doi, r.cite])).toEqual([
      ["10.1037/bul0000309", "confirmed: Yang et al. 2021 ("],
      ["10.1007/s10648-020-09572-8", "and Latimier 2021 ("],
    ]);
  });

  it("keeps the whole line as context for the fallback check", () => {
    const md = "downgraded (10.1037/bul0000209). Brunmair & Richter report I² = 77%";
    expect(extractFromMarkdown(md, "x.md")[0]?.context).toBe(md);
  });

  it("includes a name written in the DOI's own table cell", () => {
    const md =
      "| memory-retrieval/interleaving | A → B | reason | Brunmair & Richter 2019, 10.1037/bul0000209 |";
    expect(extractFromMarkdown(md, "r.md")[0]?.cite).toBe(
      "memory-retrieval/interleaving Brunmair & Richter 2019,",
    );
  });
});

describe("extractFromJson", () => {
  it("collects every object that carries a doi, with its cite", () => {
    const json = {
      components: {
        a: {
          claims: [
            {
              sources: [
                { cite: "Rowland (2014)", doi: "10.1037/A0037559" },
                { cite: "Book", isbn: "123" },
              ],
            },
          ],
        },
      },
    };
    expect(extractFromJson(json, "grounding.json")).toEqual([
      { doi: "10.1037/a0037559", cite: "Rowland (2014)", where: "grounding.json" },
    ]);
  });
});

const crossrefBody = {
  message: {
    title: ["Test-enhanced learning"],
    author: [{ family: "Roediger", given: "Henry L." }, { family: "Karpicke" }],
    issued: { "date-parts": [[2006, 3]] },
    "published-online": { "date-parts": [[2006, 1, 5]] },
  },
};

function fakeFetch(responses: Array<number | Error>) {
  const calls: string[] = [];
  const fetch = async (url: string, init?: { headers?: Record<string, string> }) => {
    calls.push(`${url} ${init?.headers?.["User-Agent"] ?? ""}`);
    const next = responses.shift();
    if (next instanceof Error) throw next;
    return { status: next ?? 200, ok: next === 200, json: async () => crossrefBody } as Response;
  };
  return { fetch, calls };
}

describe("lookupDoi", () => {
  const noSleep = async () => {};

  it("reduces a Crossref record to first author, title and every recorded year", async () => {
    const { fetch, calls } = fakeFetch([200]);
    const result = await lookupDoi("10.1111/j.1467-9280.2006.01693.x", { fetch, sleep: noSleep });
    expect(result).toEqual({
      status: "ok",
      meta: { title: "Test-enhanced learning", first_author: "Roediger", years: [2006] },
    });
    expect(calls[0]).toContain("https://api.crossref.org/works/10.1111%2Fj.1467-9280.2006.01693.x");
    expect(calls[0]).toContain("switchback-doi-check/0.1 (+https://github.com/vandermerwed/switchback)");
    expect(calls[0]).not.toMatch(/@|mailto/);
  });

  it("reports a 404 as not found without retrying", async () => {
    const { fetch, calls } = fakeFetch([404]);
    expect(await lookupDoi("10.1/x", { fetch, sleep: noSleep })).toEqual({ status: "not_found" });
    expect(calls).toHaveLength(1);
  });

  it("backs off 1, 2, 4 and 8 seconds on 429 or 5xx, then reports unreachable", async () => {
    const { fetch, calls } = fakeFetch([429, 503, 500, 502, 429]);
    const waits: number[] = [];
    const result = await lookupDoi("10.1/x", { fetch, sleep: async (ms) => void waits.push(ms) });
    expect(result).toEqual({ status: "unreachable" });
    expect(waits).toEqual([1000, 2000, 4000, 8000]);
    expect(calls).toHaveLength(5);
  });

  it("recovers when a retry succeeds, treating network errors as retryable", async () => {
    const { fetch } = fakeFetch([new Error("ECONNRESET"), 200]);
    const result = await lookupDoi("10.1/x", { fetch, sleep: noSleep });
    expect(result.status).toBe("ok");
  });
});

describe("matchCitation", () => {
  const rowland = { title: "The effect of testing versus restudy", first_author: "Rowland", years: [2014] };

  it("accepts a citation naming the first author and the year", () => {
    expect(matchCitation("Rowland (2014)", rowland)).toEqual({ ok: true });
  });

  it("rejects a citation whose year matches none of Crossref's dates", () => {
    const result = matchCitation("Rowland (2019)", rowland);
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reason).toMatch(/year/);
  });

  it("rejects a citation that does not name the first author", () => {
    const result = matchCitation("Adesope et al. (2014)", rowland);
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reason).toMatch(/author/);
  });

  it("accepts an online-first year when Crossref also records the print year", () => {
    const latimier = { title: "Spacing", first_author: "Latimier", years: [2020, 2021] };
    expect(matchCitation("Latimier, Peyre & Ramus (2021)", latimier)).toEqual({ ok: true });
  });

  it("ignores diacritics and letter case in surnames", () => {
    const aegis = { title: "Clinical judgment", first_author: "Ægisdóttir", years: [2006] };
    expect(matchCitation("AEGISDOTTIR et al. (2006)", aegis)).toEqual({ ok: true });
  });

  it("checks only the author when the citation carries no year", () => {
    expect(matchCitation("Rowland's full-text feedback moderator", rowland)).toEqual({ ok: true });
    expect(matchCitation("full-text feedback moderator", rowland).ok).toBe(false);
  });

  it("checks only the author when Crossref records no year", () => {
    const thesis = { title: "Improving Planning", first_author: "Peabody", years: [] };
    expect(matchCitation("Peabody (2017)", thesis)).toEqual({ ok: true });
  });

  it("checks only the year when Crossref names no personal first author", () => {
    const group = { title: "Many Labs", first_author: null, years: [2014] };
    expect(matchCitation("Open Science Collaboration (2014)", group)).toEqual({ ok: true });
  });
});

describe("normalizeDoi", () => {
  it("lower-cases and strips a doi.org prefix and trailing punctuation", () => {
    expect(normalizeDoi("https://doi.org/10.1037/A0037559).")).toBe("10.1037/a0037559");
  });

  it("stops at a closing backtick when the DOI is written as inline code", () => {
    expect(normalizeDoi("see `10.1037/0033-2909.110.3.499` above")).toBe("10.1037/0033-2909.110.3.499");
  });

  it("returns null for strings that are not DOIs", () => {
    expect(normalizeDoi("ISBN 9780471082194")).toBeNull();
  });
});
