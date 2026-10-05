import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const installOptions = JSON.parse(readFileSync(new URL("../src/data/install.json", import.meta.url), "utf8"));
const readback = JSON.parse(readFileSync(new URL("../example/readback.json", import.meta.url), "utf8"));
const visibleText = html
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#39;|&#x27;/g, "'")
  .replace(/\s+/g, " ");
const count = (pattern) => (visibleText.match(pattern) ?? []).length;

test("the home page has one clear hero that says what Switchback is and an install action", () => {
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(visibleText, /Step away from the agents\. Think it through on paper\./);
  assert.match(visibleText, /Switchback is a skill for your AI agent\./);
  assert.match(visibleText, /Works with Claude Code, Codex, Cursor and other agents that use skills\./);
  assert.match(html, /<a\b[^>]*href="#install"[^>]*>[^<]*Install Switchback/);
  assert.match(html, /<a\b[^>]*href="#how-it-works"[^>]*>[^<]*See how it works/);
});

test("the round trip follows one everyday example from the request to the next page", () => {
  assert.match(visibleText, /One round trip, start to finish\./);
  for (const heading of [
    "Ask your agent, in plain words",
    "Your agent makes the pages. You print them.",
    "Work it with a pen, away from the screen",
    "Send a photo. Your agent carries on.",
  ]) {
    assert.ok(visibleText.includes(heading), `step "${heading}" is on the page`);
  }
  assert.ok(visibleText.includes(readback.request), "the full request is shown");
  for (const line of [...readback.notes, ...readback.marks]) {
    assert.ok(visibleText.includes(line.text), `"${line.text}" is readable as text`);
  }
  for (const reply of [
    readback.answerFirst,
    readback.unresolved,
    readback.struck,
    readback.nextMove,
    readback.uncertainty,
  ]) {
    assert.ok(visibleText.includes(reply), `the reply "${reply}" is readable as text`);
  }
  assert.match(visibleText, /The next page, if you say yes/);
  assert.ok(count(/Illustrative example/g) >= 2, "every authored mark is labelled illustrative");
  assert.match(visibleText, /Real output from the Switchback renderer/);
});

test("the pens are explained in plain words, with the letter codes introduced once", () => {
  assert.match(visibleText, /Blue is a question for your agent\. It's answered first\./);
  assert.match(visibleText, /Red is something you're unsure of\. It stays open until you settle it\./);
  assert.match(
    visibleText,
    /Highlighter marks the one thing that matters most\. The reply is built around it\./,
  );
  assert.equal(count(/Circle a letter instead/g), 1);
  assert.match(html, /href="\/docs\/ink\/"/);
});

test("a first read meets no release jargon", () => {
  assert.doesNotMatch(visibleText, /\bv1\b/i);
  assert.doesNotMatch(visibleText, /paperclip|agent profile/i);
});

test("the uses section links each kind of work to its real showcase example", () => {
  assert.match(visibleText, /For the thinking you'd rather do yourself\./);
  for (const style of ["sitting", "series", "incubation", "ritual", "proof"]) {
    assert.ok(html.includes(`href="/showcase/#${style}"`), `links to the ${style} example`);
  }
  assert.match(visibleText, /Not for quick questions\./);
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
  assert.match(visibleText, /First, add the marketplace/);
  assert.match(visibleText, /Then ask in plain words/);
  assert.match(visibleText, /I can't decide whether to take the new job/);
  assert.match(visibleText, /You get a PDF in a switchback\/ folder, ready to print/);
  assert.match(visibleText, /The skill fetches the CLI itself/);
  assert.match(visibleText, /Node\.js 20\.12 or later, a printer, a pen, a phone camera/);
  for (const href of ["/docs/", "/showcase/", "/privacy/", "https://github.com/vandermerwed/switchback"]) {
    assert.ok(html.includes(`href="${href}"`), `navigation links to ${href}`);
  }
  assert.ok(html.includes('href="/favicon.svg"'));
  assert.ok(html.includes('href="#install"'));
  assert.match(visibleText, /Terrain: Sani Pass, Drakensberg/);
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

test("the page's design contract survives the production build", () => {
  for (const block of ["THESIS:", "OWN-WORLD:", "STORY:", "FIRST VIEWPORT:", "FORM:", "FINISH:"]) {
    assert.ok(html.includes(block), `${block} is in the built page`);
  }
});
