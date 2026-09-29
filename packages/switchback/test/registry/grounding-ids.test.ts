import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCatalogue } from "../../src/registry/catalogue";
import { packageRoot } from "../../src/shell/fonts";

const grounding = JSON.parse(readFileSync(join(packageRoot(), "research/grounding.json"), "utf8"));
const cat = loadCatalogue();

describe("every graded id exists in the catalogue", () => {
  it.each(Object.keys(grounding.components))("component %s", (id) => {
    expect(cat.components.has(id), id).toBe(true);
  });

  it.each(Object.keys(grounding.variants))("variant %s", (key) => {
    const parts = key.split("/");
    expect(parts.length, key).toBe(2);
    const [base, variant] = parts;
    expect(
      cat.components.get(base ?? "")?.meta.variants.some((v) => v.id === variant),
      key,
    ).toBe(true);
  });

  it.each(Object.keys(grounding.presets))("preset %s", (id) => {
    expect(cat.presets.has(id), id).toBe(true);
  });
});
