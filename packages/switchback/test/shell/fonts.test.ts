import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { fontFaceCss, packageRoot } from "../../src/shell/fonts";

describe("fonts", () => {
  it("finds the package root", () => {
    expect(JSON.parse(readFileSync(join(packageRoot(), "package.json"), "utf8")).name).toBe(
      "@vandermerwed/switchback",
    );
  });

  it("inlines six faces within the 250 KB budget", () => {
    const css = fontFaceCss();
    expect(css.match(/@font-face/g)).toHaveLength(6);
    for (const family of ["Fraunces", "Inter", "JetBrains Mono"])
      expect(css).toContain(`font-family:"${family}"`);
    expect(Buffer.byteLength(css)).toBeLessThanOrEqual(250 * 1024);
  });
});
