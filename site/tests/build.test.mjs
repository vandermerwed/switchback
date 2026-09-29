import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const dist = new URL("../dist/", import.meta.url);

test("the build writes the home page and the docs", () => {
  assert.ok(existsSync(new URL("index.html", dist)), "dist/index.html");
  assert.ok(existsSync(new URL("docs/index.html", dist)), "dist/docs/index.html");
});
