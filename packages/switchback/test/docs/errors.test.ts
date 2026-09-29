import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { packageRoot } from "../../src/shell/fonts";

describe("docs/errors.md", () => {
  const root = packageRoot();
  // Diagnostics come from src/ and from the components' own renderers (their `checks`).
  const files = [
    ...readdirSync(join(root, "src"), { recursive: true, encoding: "utf8" })
      .filter((f) => f.endsWith(".ts"))
      .map((f) => join(root, "src", f)),
    ...readdirSync(join(root, "components"), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => join(root, "components", d.name, "render.ts")),
  ];
  const codes = new Set(
    files.flatMap((f) => [...readFileSync(f, "utf8").matchAll(/"([EW]_[A-Z_]+)"/g)].map((m) => m[1]!)),
  );

  it("documents every diagnostic code used in src and in components/*/render.ts", () => {
    const doc = readFileSync(join(root, "docs/errors.md"), "utf8");
    const missing = [...codes].filter((c) => !doc.includes(`\`${c}\``));
    expect(missing).toEqual([]);
    expect(codes.size).toBeGreaterThan(20);
  });

  it("scans the component renderers too", () => {
    for (const code of ["W_NARROW", "W_ZONES_COLUMNS", "E_ZONES_LAYOUT"]) expect(codes).toContain(code);
  });
});
