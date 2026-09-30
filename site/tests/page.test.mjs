import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const installOptions = JSON.parse(readFileSync(new URL("../src/data/install.json", import.meta.url), "utf8"));
const visibleText = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ");

test("the home page has one clear hero and an install action", () => {
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(visibleText, /Step away from the agents\. Come back with a clearer thought\./);
  assert.match(html, /<a\b[^>]*href="#install"[^>]*>[^<]*Install Switchback/);
});

test("the worked round trip stays readable as HTML and names every ink role", () => {
  assert.match(visibleText, /Same terrain\. A clearer next step\./);
  assert.match(visibleText, /Illustrative example/);
  assert.match(visibleText, /Q1, answered first/);
  assert.match(visibleText, /Stop/);
  assert.match(visibleText, /Crux/);
  assert.match(visibleText, /What are we really optimizing for\?/);
  assert.match(visibleText, /We have not decided what to say no to/);
  assert.match(visibleText, /Trade breadth for depth in v1/);
  assert.match(visibleText, /A useful pause/);
  assert.match(visibleText, /A five-page sitting, about 30 minutes, on A4 or Letter paper/);
  assert.match(visibleText, /W2-P1/);
  assert.match(visibleText, /Read from 1 photo\. Tell me if I misread a mark/);
  assert.match(visibleText, /Marks your agent can read/);
  assert.match(visibleText, /One pen works too\. Write the letter in a circle/);
  assert.doesNotMatch(visibleText, /paperclip|agent profile/i);
});

test("the install section has three readable routes with commands from one data file", () => {
  assert.equal((html.match(/id="install"/g) ?? []).length, 1);
  assert.equal(installOptions.length, 3);
  for (const option of installOptions) {
    assert.ok(html.includes(`id="panel-${option.id}"`), `${option.id} panel exists`);
    assert.ok(html.includes(option.label), `${option.id} has a visible heading`);
    for (const command of option.commands) {
      assert.ok(html.includes(`<code>${command}</code>`), `${command} is selectable`);
    }
  }
  assert.doesNotMatch(html, /class="install-panel"[^>]*hidden/);
  assert.match(visibleText, /Then install it/);
  assert.match(visibleText, /The skill fetches the CLI itself/);
  assert.match(visibleText, /Node\.js 20\.12 or later, a printer, a pen, a phone camera/);
  for (const href of ["/docs/", "/showcase/", "/privacy/", "https://github.com/vandermerwed/switchback"]) {
    assert.ok(html.includes(`href="${href}"`), `navigation links to ${href}`);
  }
});

test("every install command has a copy button", () => {
  for (const option of installOptions)
    for (const command of option.commands) {
      assert.ok(
        html.includes(`aria-label="Copy ${command}"`),
        `${command} has a copy button labelled for it`,
      );
    }
});
