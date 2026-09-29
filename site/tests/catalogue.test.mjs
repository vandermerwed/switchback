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
  const commands = ["build", "validate", "list", "show", "init", "profile", "proof", "media", "legend"];
  for (const command of commands) {
    assert.ok(html.includes(command), `missing command in CLI reference: ${command}`);
  }
});
