import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  applyGrounding,
  changedFiles,
  loadItemFiles,
  PENDING_STYLES,
  readGroundingFile,
} from "../../scripts/research/grounding";
import { catalogueParts } from "../../src/registry/catalogue";
import { validateRegistry } from "../../src/registry/validate";
import { packageRoot } from "../../src/shell/fonts";

describe("the catalogue carries the research grades", () => {
  it("matches research/grounding.json (apply-grounding --check would pass)", () => {
    const before = loadItemFiles(packageRoot());
    const { files, errors } = applyGrounding(readGroundingFile(packageRoot()), before);
    expect(errors).toEqual([]);
    expect(changedFiles(before, files).map((c) => c.path)).toEqual([]);
  });

  it("passes validate --strict with no diagnostics", () => {
    expect(validateRegistry(catalogueParts(), { strict: true })).toEqual([]);
  });

  it("has not let a PENDING_STYLES id slip into registry/styles.json yet", () => {
    const { styles } = JSON.parse(readFileSync(join(packageRoot(), "registry/styles.json"), "utf8")) as {
      styles: { id: string }[];
    };
    for (const id of PENDING_STYLES)
      expect(
        styles.some((s) => s.id === id),
        `sub-project 3 added ${id}: remove it from PENDING_STYLES`,
      ).toBe(false);
  });
});
