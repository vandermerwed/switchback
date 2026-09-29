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
    const filled = workbook.pages.find((item) => item.component === component)?.data ?? {};
    assert.equal(Object.keys(filled).length, 0, `${component} leaves the human's answers blank`);
  }
  for (const role of ["ask", "stop", "crux"]) {
    const marks = readback.marks.filter((item) => item.role === role);
    assert.equal(marks.length, 1, `exactly one ${role} mark`);
    assert.ok(marks[0].label && marks[0].text, `${role} has visible text`);
    assert.equal(sidecar.pens[role].pen, { ask: "blue", stop: "red", crux: "highlighter" }[role]);
  }
  assert.equal(readback.answerFirst, readback.marks.find((item) => item.role === "ask").text);
  assert.equal(readback.marks.find((item) => item.role === "ask").mark, "Q1");
  assert.equal(readback.unresolved, readback.marks.find((item) => item.role === "stop").text);
  assert.equal(readback.crux, readback.marks.find((item) => item.role === "crux").text);
  assert.ok(existsSync(new URL("generated-page.html", example)));
  assert.ok(existsSync(new URL("../public/example/generated-page.png", import.meta.url)));
});
