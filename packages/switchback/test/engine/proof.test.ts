import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";
import { blockCost, PROOF_BUDGET, packPages, parseDocument, proofSpecs } from "../../src/engine/proof";

describe("parseDocument", () => {
  it("splits blocks, numbers them continuously and leaves headings unnumbered", () => {
    const blocks = parseDocument(
      "# Title\n\nFirst para\nstill first.\n\n- one\n- two\n\n```\ncode\n```\n\nLast.",
    );
    expect(blocks).toEqual([
      { kind: "h", text: "Title" },
      { kind: "p", n: 1, text: "First para still first." },
      { kind: "li", n: 2, text: "one" },
      { kind: "li", n: 3, text: "two" },
      { kind: "code", n: 4, text: "code" },
      { kind: "p", n: 5, text: "Last." },
    ]);
  });
  it("tolerates CRLF, a BOM and trailing whitespace", () => {
    expect(parseDocument("﻿One.\r\n\r\nTwo.  \r\n")).toEqual([
      { kind: "p", n: 1, text: "One." },
      { kind: "p", n: 2, text: "Two." },
    ]);
  });
});

describe("packPages", () => {
  it("keeps every page within budget", () => {
    const text = Array.from(
      { length: 40 },
      (_, i) => `Paragraph ${i + 1}. ${"Words go here. ".repeat(12)}`,
    ).join("\n\n");
    for (const page of packPages(parseDocument(text), "A4"))
      expect(page.reduce((s, b) => s + blockCost(b), 0)).toBeLessThanOrEqual(PROOF_BUDGET.A4);
  });
  it("splits a paragraph longer than a page at sentence boundaries, keeping its number", () => {
    const long = Array.from({ length: 200 }, (_, i) => `Sentence ${i + 1} is here.`).join(" ");
    const pages = packPages(parseDocument(long), "A4");
    const all = pages.flat();
    expect(pages.length).toBeGreaterThan(1);
    expect(all.every((b) => b.n === 1)).toBe(true);
    expect(all[0]!.cont).toBeUndefined();
    expect(all.slice(1).every((b) => b.cont === true)).toBe(true);
    expect(all.map((b) => b.text).join(" ")).toBe(long);
  });
  it("keeps a paragraph that costs between half and a full page as a single, unsplit block", () => {
    const text = "Sentence text here. ".repeat(60).trim();
    const pages = packPages(parseDocument(text), "A4");
    const all = pages.flat();
    expect(all).toHaveLength(1);
    expect(all[0]!.cont).toBeUndefined();
    expect(all[0]!.text).toBe(text);
  });
  it("falls back to word boundaries when a unit has no sentence punctuation to split on", () => {
    const long = Array.from({ length: 600 }, () => "word").join(" ");
    const pages = packPages(parseDocument(long), "A4");
    const all = pages.flat();
    expect(all.length).toBeGreaterThan(1);
    expect(all.map((b) => b.text).join(" ")).toBe(long);
  });
  it("splits a long code block at line boundaries", () => {
    const code = `\`\`\`\n${Array.from({ length: 120 }, (_, i) => `line ${i};`).join("\n")}\n\`\`\``;
    const all = packPages(parseDocument(code), "A4").flat();
    expect(all.length).toBeGreaterThan(1);
    expect(all.map((b) => b.text).join("\n")).toBe(
      Array.from({ length: 120 }, (_, i) => `line ${i};`).join("\n"),
    );
  });
  it("costs code by its wrapped visual lines, not its line count", () => {
    const short = { kind: "code" as const, n: 1, text: "x".repeat(40) };
    const long = { kind: "code" as const, n: 1, text: "x".repeat(110) };
    expect(blockCost(long)).toBeGreaterThanOrEqual(2 * blockCost(short) - 60);
    expect(blockCost({ kind: "code", n: 1, text: "" })).toBe(blockCost(short)); // a blank line is a line
  });
  it("keeps long-line code within the page budget", () => {
    const line = (i: number) =>
      `const value${i} = computeSomething(alpha, beta, gamma) + anotherFunctionCall(delta, epsilon) // ${i}`;
    const code = `\`\`\`\n${Array.from({ length: 36 }, (_, i) => line(i)).join("\n")}\n\`\`\``;
    for (const paper of ["A4", "Letter"] as const)
      for (const page of packPages(parseDocument(code), paper))
        expect(page.reduce((s, b) => s + blockCost(b), 0)).toBeLessThanOrEqual(PROOF_BUDGET[paper]);
  });
  it.each([
    ["a 6,000-character code line", `\`\`\`\n${"abcdefghij".repeat(600)}\n\`\`\``, ""],
    ["a 6,000-character word", "abcdefghij".repeat(600), ""],
    [
      "9,000 characters of short code lines",
      `\`\`\`\n${Array.from({ length: 1500 }, () => "x = 1").join("\n")}\n\`\`\``,
      "\n",
    ],
  ])("hard-splits %s so no block's text exceeds 4,000 characters", (_name, doc, joiner) => {
    for (const paper of ["A4", "Letter"] as const) {
      const pages = packPages(parseDocument(doc), paper);
      const all = pages.flat();
      expect(all.length).toBeGreaterThan(1);
      for (const b of all) expect(b.text.length).toBeLessThanOrEqual(4000);
      for (const page of pages)
        expect(page.reduce((s, b) => s + blockCost(b), 0)).toBeLessThanOrEqual(PROOF_BUDGET[paper]);
      expect(all.map((b) => b.text).join(joiner)).toBe(parseDocument(doc)[0]!.text);
      const specs = proofSpecs(parseDocument(doc), { title: "T", paper, maxPages: 10 });
      for (const s of specs)
        expect(
          buildDocument(s, { embedFonts: false }).diagnostics.filter((d) => d.level === "error"),
        ).toEqual([]);
    }
  });
  it("never leaves a heading last on a page", () => {
    const text = [...Array.from({ length: 30 }, (_, i) => `# H${i}\n\n${"Body text. ".repeat(30)}`)].join(
      "\n\n",
    );
    for (const page of packPages(parseDocument(text), "A4").slice(0, -1))
      expect(page.at(-1)!.kind).not.toBe("h");
  });
  it("carries stacked headings at the foot of a page together to the next page", () => {
    // p1 (1,560) + ## A (120) + ### B (120) fits A4's 2,100; p2 (1,560) does not.
    const doc = `${"a".repeat(1500)}\n\n## A\n\n### B\n\n${"b".repeat(1500)}`;
    const pages = packPages(parseDocument(doc), "A4");
    expect(pages.map((p) => p.map((b) => b.kind))).toEqual([["p"], ["h", "h", "p"]]);
    expect(pages[1]!.slice(0, 2).map((b) => b.text)).toEqual(["A", "B"]);
  });
  it("never empties a page to carry headings", () => {
    const doc = Array.from({ length: 40 }, (_, i) => `## H${i}`).join("\n\n");
    const pages = packPages(parseDocument(doc), "A4");
    expect(pages.length).toBeGreaterThan(1);
    for (const page of pages) expect(page.length).toBeGreaterThan(1); // no one-heading cascade
    expect(pages.flat()).toHaveLength(40);
  });
  it("keeps a document's final heading, with no page left empty", () => {
    const doc = `${"a".repeat(1500)}\n\n${"b".repeat(400)}\n\n## The end`;
    const pages = packPages(parseDocument(doc), "A4");
    for (const page of pages) expect(page.length).toBeGreaterThan(0);
    expect(pages.flat().at(-1)).toEqual({ kind: "h", text: "The end" });
    for (const page of pages.slice(0, -1)) expect(page.at(-1)!.kind).not.toBe("h");
  });
});

describe("proofSpecs", () => {
  it("writes valid Proof specs, splitting into parts past the page limit", () => {
    const text = Array.from(
      { length: 200 },
      (_, i) => `Paragraph ${i + 1}. ${"Words go here. ".repeat(12)}`,
    ).join("\n\n");
    const specs = proofSpecs(parseDocument(text), { title: "Draft", paper: "A4", maxPages: 10 });
    expect(specs.length).toBeGreaterThan(1);
    for (const s of specs) {
      expect(s.style).toBe("proof");
      expect(s.pages.length).toBeLessThanOrEqual(10);
      const r = buildDocument(s, { embedFonts: false });
      expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    }
    expect(specs[1]!.title).toBe("Draft (part 2 of " + specs.length + ")");
  });

  const twoPages = `${"a ".repeat(900)}\n\n${"b ".repeat(900)}`;
  const pagesOf = (html: string) => html.split('<section class="sb-page').slice(1);

  it("prints the part on every page's source line when a proof is split", () => {
    const specs = proofSpecs(parseDocument(`${twoPages}\n\n${"c ".repeat(900)}`), {
      title: "Draft",
      paper: "A4",
      maxPages: 2,
      source: "draft.md",
    });
    expect(specs).toHaveLength(2);
    const pages = pagesOf(buildDocument(specs[1]!, { embedFonts: false }).html ?? "");
    expect(pages.length).toBeGreaterThan(0);
    for (const p of pages) expect(p).toContain('<div class="sb-c-psrc">draft.md · part 2 of 2</div>');
    const first = pagesOf(buildDocument(specs[0]!, { embedFonts: false }).html ?? "");
    expect(first).toHaveLength(2);
    for (const p of first) expect(p).toContain("draft.md · part 1 of 2");
  });

  it("keeps a single proof's source as the file name alone", () => {
    const [spec] = proofSpecs(parseDocument(twoPages), {
      title: "Draft",
      paper: "A4",
      maxPages: 10,
      source: "draft.md",
    });
    for (const p of spec!.pages) expect((p.data as { source: string }).source).toBe("draft.md");
  });

  it("names the part from the title when the document came from stdin", () => {
    const specs = proofSpecs(parseDocument(twoPages), { title: "Notes", paper: "A4", maxPages: 1 });
    expect(specs.map((s) => (s.pages[0]!.data as { source?: string }).source)).toEqual([
      "Notes · part 1 of 2",
      "Notes · part 2 of 2",
    ]);
    const [single] = proofSpecs(parseDocument("One."), { title: "Notes", paper: "A4", maxPages: 1 });
    expect((single!.pages[0]!.data as { source?: string }).source).toBeUndefined();
  });

  it.each([
    [10, ""],
    [1, " · part 2 of 2"],
  ])("truncates a long file name so the source fits 120 characters (max %i pages)", (maxPages, suffix) => {
    const name = `${"a-very-long-file-name-".repeat(8)}.md`;
    const specs = proofSpecs(parseDocument(twoPages), { title: "T", paper: "A4", maxPages, source: name });
    const spec = specs.at(-1)!;
    const source = (spec.pages[0]!.data as { source: string }).source;
    expect(source.length).toBeLessThanOrEqual(120);
    expect(source.endsWith(`….md${suffix}`)).toBe(true);
    expect(buildDocument(spec, { embedFonts: false }).diagnostics.filter((d) => d.level === "error")).toEqual(
      [],
    );
  });
});
