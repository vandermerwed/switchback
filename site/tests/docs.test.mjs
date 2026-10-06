import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const dist = new URL("../dist/", import.meta.url);

const routes = [
  "docs/",
  "docs/loop/",
  "docs/modes/workbook/",
  "docs/modes/proof/",
  "docs/modes/read/",
  "docs/modes/desk/",
  "docs/styles/",
  "docs/ink/",
  "docs/evidence/",
  "docs/troubleshooting/",
  "privacy/",
  "changelog/",
];

for (const route of routes) {
  test(`the build writes ${route}index.html`, () => {
    const path = new URL(`${route}index.html`, dist);
    assert.ok(statSync(path, { throwIfNoEntry: false }), `dist/${route}index.html`);
  });
}

test("the getting-started page shows the four install commands verbatim", () => {
  const html = readFileSync(new URL("docs/index.html", dist), "utf8");
  const commands = [
    "/plugin marketplace add vandermerwed/switchback",
    "/plugin install switchback@switchback",
    "npx skills add vandermerwed/switchback",
    "npm install -g @vandermerwed/switchback",
  ];
  for (const command of commands) {
    assert.ok(html.includes(command), `missing install command: ${command}`);
  }
});

// The sidebar links the collections on every docs page, so look only at the page's own content.
const mainOf = (route) => {
  const html = readFileSync(new URL(`${route}index.html`, dist), "utf8");
  return html.slice(html.indexOf("<main"), html.indexOf("</main>"));
};

test("the guides point at the collections, not just the sidebar", () => {
  for (const route of ["docs/", "docs/modes/workbook/", "docs/components/"])
    assert.ok(mainOf(route).includes('href="/docs/collections/"'), `${route} links the collections`);
  assert.match(mainOf("docs/modes/workbook/"), /<h2[^>]*>Collections<\/h2>/);
});

test("the changelog page names the current version", () => {
  const html = readFileSync(new URL("changelog/index.html", dist), "utf8");
  assert.ok(html.includes("0.1.0"), "changelog should mention 0.1.0");
});

const BINARY_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".ico",
]);

test("agentation never reaches the production build", () => {
  const offenders = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const ext = full.slice(full.lastIndexOf(".")).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) continue;
      if (readFileSync(full, "utf8").toLowerCase().includes("agentation")) offenders.push(full);
    }
  };
  walk(new URL(dist).pathname.replace(/^\/(\w):/, "$1:"));
  assert.deepEqual(offenders, [], `agentation leaked into: ${offenders.join(", ")}`);
});
