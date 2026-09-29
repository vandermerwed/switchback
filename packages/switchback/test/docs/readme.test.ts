import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { packageRoot } from "../../src/shell/fonts";

describe("README.md", () => {
  const readme = readFileSync(join(packageRoot(), "README.md"), "utf8");
  const rows = readme.split("\n").filter((l) => l.startsWith("|"));
  const row = (command: string) => rows.find((l) => l.startsWith(`| \`${command}`)) ?? "";

  it("escapes | inside code spans in table rows, so GitHub renders the tables", () => {
    const unescaped = rows.flatMap((l) =>
      [...l.matchAll(/`[^`]*`/g)].map((m) => m[0]).filter((code) => /(?<!\\)\|/.test(code)),
    );
    expect(unescaped).toEqual([]);
  });

  it("points at registry/styles.json for a style's rules: `switchback show` shows components only", () => {
    expect(readme).not.toMatch(/show <style>/);
    expect(readme).toContain("registry/styles.json");
  });

  it("shows that --set repeats", () => {
    expect(row("profile")).toContain("--set key=value ...");
  });

  it("says media doesn't read WebP", () => {
    expect(row("media")).toMatch(/WebP/);
  });
});
