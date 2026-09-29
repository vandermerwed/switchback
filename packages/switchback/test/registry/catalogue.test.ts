import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ajv } from "../../src/registry/ajv";
import { loadCatalogue } from "../../src/registry/catalogue";
import { generateIndex } from "../../src/registry/codegen";
import { componentSchema } from "../../src/registry/schemas";
import { packageRoot } from "../../src/shell/fonts";

const root = packageRoot();

describe("codegen", () => {
  it("the committed index is current (run `pnpm gen` if this fails)", () => {
    const committed = readFileSync(join(root, "src/generated/components.ts"), "utf8").replace(/\r\n/g, "\n");
    expect(committed).toBe(generateIndex(root));
  });
});

describe("loadCatalogue", () => {
  const cat = loadCatalogue();

  it("contains pre-mortem with its default example", () => {
    const pm = cat.components.get("pre-mortem");
    expect(pm?.meta.name).toBe("Pre-mortem");
    expect(Object.keys(pm?.examples ?? {})).toContain("default");
    expect(typeof pm?.render).toBe("function");
  });

  it("validates pre-mortem's component.json against the component schema", () => {
    const validate = ajv.compile(componentSchema);
    expect(validate(cat.components.get("pre-mortem")?.meta)).toBe(true);
  });

  it("includes the registries", () => {
    expect(cat.registries.roles).toHaveLength(8);
  });
});

describe("completeness", () => {
  it("has a renderer for every component folder", () => {
    const cat = loadCatalogue();
    expect(cat.skipped).toEqual([]);
    expect(cat.components.size).toBe(37);
  });
});
