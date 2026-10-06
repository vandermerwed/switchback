import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { loadCatalogue } from "@vandermerwed/switchback";

const dist = new URL("../dist/", import.meta.url);
const generated = new URL("../src/generated/", import.meta.url);

const catalogue = loadCatalogue();
const expectedIds = [...catalogue.components.keys(), ...catalogue.presets.keys()];

test("catalogue.json lists exactly the CLI's own component and preset ids", () => {
  const written = JSON.parse(readFileSync(new URL("catalogue.json", generated), "utf8"));
  const writtenIds = written.map((item) => item.id);
  assert.deepEqual(writtenIds.sort(), expectedIds.slice().sort());
});

for (const id of expectedIds) {
  test(`${id} has a docs page and a generated preview`, () => {
    assert.ok(
      existsSync(new URL(`docs/components/${id}/index.html`, dist)),
      `dist/docs/components/${id}/index.html`,
    );
    assert.ok(
      existsSync(new URL(`generated/previews/${id}.html`, dist)),
      `dist/generated/previews/${id}.html`,
    );
  });
}

test("the CLI reference names every command", () => {
  const html = readFileSync(new URL("docs/cli/index.html", dist), "utf8");
  const commands = [
    "build",
    "validate",
    "list",
    "collections",
    "show",
    "init",
    "profile",
    "proof",
    "media",
    "legend",
  ];
  for (const command of commands) {
    assert.ok(html.includes(command), `missing command in CLI reference: ${command}`);
  }
});

test("each catalogue entry records its page orientation, and the wide ones are landscape", () => {
  const entries = JSON.parse(readFileSync(new URL("catalogue.json", generated), "utf8"));
  for (const e of entries)
    assert.ok(["portrait", "landscape"].includes(e.orientation), `${e.id} has an orientation`);
  const landscape = new Set(entries.filter((e) => e.orientation === "landscape").map((e) => e.id));
  for (const id of ["business-model-canvas", "lean-canvas", "kanban", "options-criteria", "timeline"])
    assert.ok(landscape.has(id), `${id} is landscape`);
  assert.ok(!landscape.has("pre-mortem"), "pre-mortem stays portrait");
});

test("each catalogue entry records its basis, and research ones carry their claims", () => {
  const entries = JSON.parse(readFileSync(new URL("catalogue.json", generated), "utf8"));
  for (const e of entries) {
    assert.ok(["research", "practice"].includes(e.basis), `${e.id} has a basis`);
    if (e.basis === "research") assert.ok(e.grounding?.claims?.length, `${e.id} carries claims`);
    else
      assert.ok(
        !e.grounding && e.origin && e.variants.every((v) => !v.grounding),
        `${e.id} carries an origin and no claims, not even on a variant`,
      );
  }
  const kanban = entries.find((e) => e.id === "kanban");
  assert.match(kanban.grounding.helps, /zones/); // the preset's own grounding, not the base's
  const html = readFileSync(new URL("docs/components/kanban/index.html", dist), "utf8");
  assert.match(html, /Research-backed/);
});

test("the components index tells research-backed and practical templates apart", () => {
  const html = readFileSync(new URL("docs/components/index.html", dist), "utf8");
  assert.doesNotMatch(html, /Each carries a grade/);
  assert.doesNotMatch(html, /shape and evidence/);
  assert.match(html, /practical template/i);
});

test("every collection has a page, and the index lists them all", () => {
  const shelves = [...catalogue.collections.keys()];
  assert.equal(shelves.length, 9);
  const index = readFileSync(new URL("docs/collections/index.html", dist), "utf8");
  for (const id of shelves) {
    assert.ok(existsSync(new URL(`docs/collections/${id}/index.html`, dist)), `docs/collections/${id}/`);
    assert.ok(index.includes(`href="/docs/collections/${id}/"`), `index links ${id}`);
  }
});

test("every link on a collection page resolves to a built page", () => {
  for (const id of catalogue.collections.keys()) {
    const html = readFileSync(new URL(`docs/collections/${id}/index.html`, dist), "utf8");
    const links = [...html.matchAll(/href="\/docs\/(components|collections)\/([a-z0-9-]+)\/"/g)];
    assert.ok(links.length > 0, `${id} links its templates`);
    for (const [, kind, target] of links)
      assert.ok(existsSync(new URL(`docs/${kind}/${target}/index.html`, dist)), `${id} → ${kind}/${target}`);
  }
});

test("a collection page shows each template's basis, and a component page its collections", () => {
  const gameDev = readFileSync(new URL("docs/collections/game-dev/index.html", dist), "utf8");
  assert.match(gameDev, /Practical/);
  assert.match(gameDev, /Research-backed/);
  const kanban = readFileSync(new URL("docs/components/kanban/index.html", dist), "utf8");
  assert.match(kanban, /In collections/);
  assert.ok(kanban.includes('href="/docs/collections/planning/"'));
});

test("a practical preset's page gives its attribution once", () => {
  const html = readFileSync(new URL("docs/components/feature-cut/index.html", dist), "utf8");
  assert.equal(html.split("Scope cutting by priority piles").length - 1, 1);
});
