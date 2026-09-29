import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type Browser, chromium } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildDocument, renderComponent } from "../../src/engine/build";
import { parseDocument, proofSpecs } from "../../src/engine/proof";
import { loadCatalogue } from "../../src/registry/catalogue";
import { packageRoot } from "../../src/shell/fonts";

const enabled = process.env.SWITCHBACK_E2E === "1";
const cat = loadCatalogue();
const papers = ["A4", "Letter"] as const;
const cases = [...cat.components.values()].flatMap((c) =>
  Object.keys(c.examples).flatMap((example) => papers.map((paper) => ({ id: c.meta.id, example, paper }))),
);
const presetCases = [...cat.presets.values()].flatMap((p) => papers.map((paper) => ({ id: p.id, paper })));

async function measure(browser: Browser, html: string) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const report = await page.evaluate(() => {
    const mm = (px: number) => px / (96 / 25.4);
    const body = document.querySelector(".sb-pbody") as HTMLElement;
    const foot = document.querySelector(".sb-pfoot") as HTMLElement | null;
    const small = (selector: string, min: number) =>
      Array.from(document.querySelectorAll(selector))
        .map((el) => mm(el.getBoundingClientRect().height))
        .filter((h) => h < min)
        .map((h) => `${selector} is ${h.toFixed(1)}mm (< ${min}mm)`);
    return {
      overflowY: body.scrollHeight - body.clientHeight,
      overflowX: body.scrollWidth - body.clientWidth,
      // The footer is absolutely positioned, so it never shows up in `.sb-pbody`'s own scroll
      // overflow: it can sit on top of the body without the checks above ever noticing. Its top
      // must stay at or below the body's bottom edge (within 0.5px, for sub-pixel rounding).
      footClearance: foot ? foot.getBoundingClientRect().top - body.getBoundingClientRect().bottom : null,
      small: [
        ...small(".sb-lines .sb-rule", 9.5),
        ...small(".sb-box", 18),
        ...small(".sb-cut-cell", 17),
        ...small(".sb-zone", 38),
      ],
    };
  });
  await page.close();
  return report;
}

describe.skipIf(!enabled)("printed layout (A4, real fonts)", () => {
  let browser: Browser;
  beforeAll(async () => {
    browser = await chromium.launch();
  });
  afterAll(async () => {
    await browser?.close();
  });

  it.each(cases)(
    "$id ($example, $paper) fits the page with hand-sized writing areas",
    async ({ id, example, paper }) => {
      const report = await measure(browser, renderComponent(id, { example, paper }).html!);
      expect(report.overflowY).toBeLessThanOrEqual(1);
      expect(report.overflowX).toBeLessThanOrEqual(1);
      expect(report.small).toEqual([]);
      if (report.footClearance !== null) expect(report.footClearance).toBeGreaterThanOrEqual(-0.5);
    },
  );

  it.each(presetCases)(
    "preset $id ($paper) fits the page with hand-sized writing areas",
    async ({ id, paper }) => {
      const report = await measure(browser, renderComponent(id, { paper }).html!);
      expect(report.overflowY).toBeLessThanOrEqual(1);
      expect(report.overflowX).toBeLessThanOrEqual(1);
      expect(report.small).toEqual([]);
      if (report.footClearance !== null) expect(report.footClearance).toBeGreaterThanOrEqual(-0.5);
    },
  );

  it.each(
    ["prose", "lists", "code", "code-long-lines", "code-single-token"].flatMap((f) =>
      papers.map((paper) => ({ f, paper })),
    ),
  )("proof packing of $f fits every page ($paper)", async ({ f, paper }) => {
    const text = readFileSync(join(packageRoot(), `test/fixtures/proof/${f}.md`), "utf8");
    for (const spec of proofSpecs(parseDocument(text), { title: f, paper, maxPages: 10 })) {
      const { html, diagnostics } = buildDocument(spec, {});
      expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
      const page = await browser.newPage();
      await page.setContent(html!, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const over = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".sb-pbody")).map((b) => [
          b.scrollHeight - b.clientHeight,
          b.scrollWidth - b.clientWidth,
        ]),
      );
      await page.close();
      expect(Math.max(...over.map(([y]) => y!))).toBeLessThanOrEqual(1);
      expect(Math.max(...over.map(([, x]) => x!))).toBeLessThanOrEqual(1);
    }
  });

  it("wraps a 200-character unbroken word instead of overflowing", async () => {
    const word = "x".repeat(200);
    const { html } = buildDocument(
      {
        switchback: 1,
        pages: [
          {
            id: "W1-P1",
            component: "options-criteria",
            data: {
              options: [word.slice(0, 40), "<script>alert(1)</script>"],
              criteria: [word.slice(0, 24)],
            },
          },
        ],
      },
      { skipStyleChecks: true },
    );
    expect(html).toContain("&lt;script&gt;");
    const report = await measure(browser, html!);
    expect(report.overflowX).toBeLessThanOrEqual(1);
  });

  const unbroken200 = "z".repeat(200);
  const unbroken160 = "w".repeat(160); // the schema cap for decision/question/problem fields

  const longWordTargets: Array<{ name: string; build: () => ReturnType<typeof buildDocument> }> = [
    {
      name: "the spec title (page header)",
      build: () =>
        buildDocument(
          { switchback: 1, title: unbroken200, pages: [{ id: "W1-P1", component: "pre-mortem" }] },
          { skipStyleChecks: true },
        ),
    },
    {
      name: "a page prompt",
      build: () =>
        buildDocument(
          { switchback: 1, pages: [{ id: "W1-P1", component: "pre-mortem", prompt: unbroken200 }] },
          { skipStyleChecks: true },
        ),
    },
    {
      name: "a commit decision (callout)",
      build: () =>
        buildDocument(
          { switchback: 1, pages: [{ id: "W1-P1", component: "commit", data: { decision: unbroken160 } }] },
          { skipStyleChecks: true },
        ),
    },
    {
      name: "a question-queue question",
      build: () =>
        buildDocument(
          {
            switchback: 1,
            pages: [{ id: "W1-P1", component: "question-queue", data: { questions: [unbroken160] } }],
          },
          { skipStyleChecks: true },
        ),
    },
    {
      name: "a five-whys problem",
      build: () =>
        buildDocument(
          { switchback: 1, pages: [{ id: "W1-P1", component: "five-whys", data: { problem: unbroken160 } }] },
          { skipStyleChecks: true },
        ),
    },
  ];

  it.each(longWordTargets)(
    "wraps a long unbroken token in $name instead of overflowing",
    async ({ build }) => {
      const { html, diagnostics } = build();
      expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
      const report = await measure(browser, html!);
      expect(report.overflowX).toBeLessThanOrEqual(1);
    },
  );
});
