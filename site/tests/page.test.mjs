import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
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
  assert.match(visibleText, /Ask \(Q1\)/);
  assert.match(visibleText, /Stop/);
  assert.match(visibleText, /Crux/);
  assert.match(visibleText, /What are we really optimizing for\?/);
  assert.match(visibleText, /We have not decided what to say no to/);
  assert.match(visibleText, /Trade breadth for depth in v1/);
  assert.doesNotMatch(visibleText, /paperclip|agent profile/i);
});

test("the install section has three groups, each with the verified commands and the requirements", () => {
  assert.equal((html.match(/id="install"/g) ?? []).length, 1);
  const commands = [
    "/plugin marketplace add vandermerwed/switchback",
    "/plugin install switchback@switchback",
    "npx skills add vandermerwed/switchback",
    "npm install -g @vandermerwed/switchback",
  ];
  for (const command of commands) {
    assert.ok(html.includes(`<code>${command}</code>`), `${command} is a selectable code block`);
  }
  assert.match(visibleText, /Claude Code: run both, in order/);
  assert.match(visibleText, /Codex, opencode, Cursor and other agents/);
  assert.match(visibleText, /Optional: install the CLI once, instead of fetching it with npx each time/);
  assert.match(visibleText, /Node\.js 20\.12 or later, a printer, a pen, a phone camera/);
  for (const href of ["/docs/", "/showcase/", "/privacy/", "https://github.com/vandermerwed/switchback"]) {
    assert.ok(html.includes(`href="${href}"`), `navigation links to ${href}`);
  }
});

test("every install command has a copy button", () => {
  const commands = [
    "/plugin marketplace add vandermerwed/switchback",
    "/plugin install switchback@switchback",
    "npx skills add vandermerwed/switchback",
    "npm install -g @vandermerwed/switchback",
  ];
  for (const command of commands) {
    assert.ok(html.includes(`aria-label="Copy: ${command}"`), `${command} has a copy button labelled for it`);
  }
});
