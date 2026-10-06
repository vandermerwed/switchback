import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const dist = new URL("../dist/", import.meta.url);

test("the showcase page exists", () => {
  assert.ok(existsSync(new URL("showcase/index.html", dist)), "dist/showcase/index.html");
});

test("the showcase names all five styles and links a PDF for each", () => {
  const html = readFileSync(new URL("showcase/index.html", dist), "utf8");
  const styles = ["Sitting", "Series", "Incubation", "Ritual", "Proof"];
  for (const style of styles) {
    assert.ok(html.includes(style), `showcase should name the ${style} style`);
  }
  const pdfHrefs = [...html.matchAll(/href="(\/generated\/showcase\/[^"]+\.pdf)"/g)].map((m) => m[1]);
  assert.ok(pdfHrefs.length >= styles.length, "showcase should link at least one PDF per style");
  for (const href of pdfHrefs) {
    const path = href.replace(/^\//, "");
    assert.ok(existsSync(new URL(path, dist)), `dist/${path}`);
  }
});

test("every showcase style has a committed PDF for builds without a browser", () => {
  for (const style of ["sitting", "series", "incubation", "ritual", "proof", "game-dev"]) {
    const pdf = new URL(`../showcase/pdf/${style}.pdf`, import.meta.url);
    assert.ok(existsSync(pdf), `site/showcase/pdf/${style}.pdf`);
    assert.equal(readFileSync(pdf).subarray(0, 5).toString("latin1"), "%PDF-", `${style}.pdf is a PDF`);
  }
});

test("the gallery presents the request and every renderer page without JavaScript", () => {
  const html = readFileSync(new URL("showcase/index.html", dist), "utf8");
  const entries = JSON.parse(
    readFileSync(new URL("../src/generated/showcase.json", import.meta.url), "utf8"),
  );
  assert.equal(entries.length, 6);
  for (const entry of entries) {
    assert.ok(html.includes(entry.request), `${entry.style} request is visible`);
    assert.ok(html.includes(entry.why), `${entry.style} reason is visible`);
    assert.equal(entry.pagePreviews.length, entry.pageCount, `${entry.style} has every page`);
    for (const page of entry.pagePreviews) {
      assert.ok(existsSync(new URL(page.html.slice(1), dist)), `${page.html} is published`);
      assert.ok(html.includes(`src="${page.html}"`), `${page.html} is present without script`);
    }
  }
});

test("every showcase page preview records its orientation, and landscape pages are split out whole", () => {
  const entries = JSON.parse(
    readFileSync(new URL("../src/generated/showcase.json", import.meta.url), "utf8"),
  );
  for (const entry of entries)
    for (const page of entry.pagePreviews) {
      assert.ok(["portrait", "landscape"].includes(page.orientation), `${page.html} has an orientation`);
      const html = readFileSync(new URL(page.html.slice(1), dist), "utf8");
      if (page.orientation === "landscape") assert.match(html, /<section class="sb-page[^"]*sb-landscape/);
    }
});

test("the showcase has a workbook drawn from the Game Development collection", () => {
  const entries = JSON.parse(
    readFileSync(new URL("../src/generated/showcase.json", import.meta.url), "utf8"),
  );
  const gameDev = entries.find((e) => e.id === "game-dev");
  assert.ok(gameDev, "a game-dev example");
  assert.equal(gameDev.style, "sitting");
  assert.equal(gameDev.collection, "game-dev");
  assert.ok(
    entries.find((e) => e.id === "sitting"),
    "the original sitting keeps its own id",
  );
  const spec = JSON.parse(readFileSync(new URL("../showcase/game-dev.json", import.meta.url), "utf8"));
  for (const id of ["game-one-pager", "core-loop", "feature-cut"])
    assert.ok(
      spec.pages.some((p) => p.component === id),
      `uses ${id}`,
    );
  const html = readFileSync(new URL("showcase/index.html", dist), "utf8");
  assert.ok(html.includes('id="game-dev"'), "has its own anchor");
  assert.ok(html.includes('href="/docs/collections/game-dev/"'), "links its collection");
  assert.ok(html.includes("Game Development"), "names its collection");
  assert.match(html, /Six examples/);
});

test("the gallery's 9mm frame offset matches the renderer's on-screen page margin", () => {
  const entries = JSON.parse(
    readFileSync(new URL("../src/generated/showcase.json", import.meta.url), "utf8"),
  );
  const page = readFileSync(new URL(entries[0].pagePreviews[0].html.slice(1), dist), "utf8");
  assert.match(page, /\.sb-page \{[^}]*margin: 9mm auto/, "showcase.astro offsets each frame by 9mm");
});
