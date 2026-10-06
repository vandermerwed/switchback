import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { generateIndex } from "../../src/registry/codegen";

function fixture(renderSrc: string): string {
  const root = mkdtempSync(join(tmpdir(), "switchback-codegen-"));
  const dir = join(root, "components", "wide");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "component.json"), "{}");
  writeFileSync(join(dir, "render.ts"), renderSrc);
  return root;
}

describe("generateIndex", () => {
  it("imports and wires an exported orientation rule", () => {
    const code = generateIndex(
      fixture('export const render = () => "";\nexport const orientation = () => "landscape";\n'),
    );
    expect(code).toContain("orientation as orientation_wide");
    expect(code).toContain("orientation: orientation_wide, ");
  });

  it("bundles each collection folder and its own presets", () => {
    const root = fixture('export const render = () => "";\n');
    const shelf = join(root, "collections", "shelf");
    mkdirSync(join(shelf, "presets"), { recursive: true });
    writeFileSync(join(shelf, "collection.json"), "{}");
    writeFileSync(join(shelf, "presets", "one-off.json"), "{}");
    mkdirSync(join(root, "collections", "no-file"), { recursive: true });
    const code = generateIndex(root);
    expect(code).toContain('import collection_shelf from "../../collections/shelf/collection.json";');
    expect(code).toContain(
      'import collection_shelf_preset_one_off from "../../collections/shelf/presets/one-off.json";',
    );
    expect(code).toContain(
      '  { dir: "shelf", meta: collection_shelf as unknown as CollectionModule["meta"], presets: [collection_shelf_preset_one_off as unknown as PresetMeta] },',
    );
    expect(code).not.toContain("no-file");
  });

  it("emits an empty collection list when there is no collections folder", () => {
    const code = generateIndex(fixture('export const render = () => "";\n'));
    expect(code).toContain("export const collections: CollectionModule[] = [\n];");
  });

  it("leaves orientation out when the component has no rule", () => {
    const code = generateIndex(fixture('export const render = () => "";\n'));
    expect(code).not.toContain("orientation");
  });
});
