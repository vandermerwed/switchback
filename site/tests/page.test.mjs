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
