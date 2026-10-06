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

  it("leaves orientation out when the component has no rule", () => {
    const code = generateIndex(fixture('export const render = () => "";\n'));
    expect(code).not.toContain("orientation");
  });
});
