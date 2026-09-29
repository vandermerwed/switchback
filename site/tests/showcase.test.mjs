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
  for (const style of ["sitting", "series", "incubation", "ritual", "proof"]) {
    const pdf = new URL(`../showcase/pdf/${style}.pdf`, import.meta.url);
    assert.ok(existsSync(pdf), `site/showcase/pdf/${style}.pdf`);
    assert.equal(readFileSync(pdf).subarray(0, 5).toString("latin1"), "%PDF-", `${style}.pdf is a PDF`);
  }
});
