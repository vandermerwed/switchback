import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const example = new URL("../example/", import.meta.url);
const readJson = (name) => JSON.parse(readFileSync(new URL(name, example), "utf8"));

test("the worked example matches one generated page and its ink legend", () => {
  const workbook = readJson("workbook.json");
  const sidecar = readJson("generated-page.switchback.json");
  const readback = readJson("readback.json");
  const page = sidecar.pages.find((item) => item.id === readback.pageId);

  assert.equal(workbook.switchback, 1);
  assert.equal(sidecar.switchback, 1);
  assert.ok(page, "readback page ID is in the renderer sidecar");
  assert.equal(page.prompt, readback.printedPrompt);
  assert.equal(workbook.pages.find((item) => item.id === page.id)?.prompt, page.prompt);
  for (const component of ["commit", "question-queue", "return-checklist"]) {
    const componentPage = workbook.pages.find((item) => item.component === component);
    assert.ok(componentPage, `${component} page exists`);
    const filled = componentPage.data ?? {};
    assert.equal(Object.keys(filled).length, 0, `${component} leaves the human's answers blank`);
  }
  for (const role of ["ask", "stop", "crux"]) {
    const marks = readback.marks.filter((item) => item.role === role);
    assert.equal(marks.length, 1, `exactly one ${role} mark`);
    assert.ok(marks[0].label && marks[0].text, `${role} has visible text`);
    assert.equal(sidecar.pens[role].pen, { ask: "blue", stop: "red", crux: "highlighter" }[role]);
  }
  assert.equal(readback.marks.find((item) => item.role === "ask").mark, "Q1");
  assert.equal(readback.crux, readback.marks.find((item) => item.role === "crux").text);
  // The reply answers the Ask first, keeps the Stop open, and builds on the Crux.
  assert.match(readback.answerFirst, /^You asked how much fits in 20 minutes\./);
  assert.match(readback.answerFirst, /ask for help earlier/i);
  assert.match(readback.heroAnswer, /three ideas/);
  assert.match(readback.answerFirst, /three ideas/);
  assert.match(readback.unresolved, /live demo/);
  assert.match(readback.heroUnresolved, /live demo/);
  assert.match(readback.unresolved, /until you decide/);
  assert.match(readback.nextMove, /print one page/);
  assert.match(readback.uncertainty, /Tell me if I misread a mark/);
  assert.match(readback.request, /plan it on paper/);
});

test("the handwriting sits on the sheet's ruled lines, one line each", () => {
  const workbook = readJson("workbook.json");
  const readback = readJson("readback.json");
  const sheet = workbook.pages.find((item) => item.id === readback.pageId);
  const ruled = sheet.data.blocks.find((block) => block.type === "lines").count;
  const lines = [...readback.notes, ...readback.marks].map((item) => item.line);
  assert.equal(new Set(lines).size, lines.length, "no two marks share a line");
  for (const line of lines)
    assert.ok(Number.isInteger(line) && line >= 1 && line <= ruled, `line ${line} is a ruled line`);
});

test("the example's pages are real renderer output", () => {
  const generated = readFileSync(new URL("generated-page.html", example), "utf8");
  const commitPage = generated.match(/<section class="sb-page"[^>]*id="W1-P3"[\s\S]*?<\/section>/)?.[0];
  assert.ok(commitPage, "the commit page is in the generated output");
  assert.doesNotMatch(commitPage, /Decision:\s*What should my 20-minute talk/);
  for (const image of ["generated-page.png", "cover-page.png", "next-page.png"]) {
    assert.ok(existsSync(new URL(`../public/example/${image}`, import.meta.url)), `public/example/${image}`);
  }
  const next = readJson("next-page.json");
  const nextSidecar = readJson("next-page.switchback.json");
  assert.equal(next.round, 2);
  assert.equal(next.pages.length, 1);
  assert.equal(next.pages[0].id, "W2-P1");
  assert.equal(next.pages[0].component, "card-sort");
  assert.equal(next.pages[0].variant, "write-in");
  assert.match(next.pages[0].data.source, /W1-P2/);
  assert.equal(nextSidecar.pages[0].id, "W2-P1");
  assert.ok(existsSync(new URL("next-page.html", example)));
});
