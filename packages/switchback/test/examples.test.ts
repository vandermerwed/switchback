import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildDocument } from "../src/engine/build";
import { packageRoot } from "../src/shell/fonts";

describe("examples/sync-feature.json", () => {
  const spec = JSON.parse(readFileSync(join(packageRoot(), "examples/sync-feature.json"), "utf8"));
  // The example ships with no kit of its own — a spec kit would override the user's profile.
  // Supply the desk this example was written for as the profile layer instead.
  const profileKit = {
    printer: "mono" as const,
    pens: [
      { colour: "black" },
      { colour: "red" },
      { colour: "green" },
      { colour: "blue" },
      { colour: "orange" },
      { colour: "purple" },
    ],
    pencil: true,
    highlighter: true,
    scissors: true,
    tape: true,
    sticky_notes: true,
    index_cards: false,
    wall_space: false,
    timer: true,
    camera: true,
  };
  const r = buildDocument(spec, { embedFonts: false, profileKit });

  it("builds a complete sitting with no warnings", () => {
    expect(r.diagnostics).toEqual([]);
    expect(r.sidecar?.pages).toHaveLength(8);
  });

  it("maps the six pens to their roles", () => {
    expect(r.sidecar?.pens).toMatchObject({
      ask: { pen: "blue" },
      stop: { pen: "red" },
      keep: { pen: "green" },
      maybe: { pen: "orange" },
      sense: { pen: "purple" },
      crux: { pen: "highlighter" },
      draft: { pen: "pencil" },
    });
  });

  it("prints every page's own prompt", () => {
    for (const page of spec.pages.filter((p: { prompt?: string }) => p.prompt))
      expect(r.html).toContain(page.prompt.replace(/'/g, "&#39;"));
  });
});

describe("examples/*.json under the style rules", () => {
  const dir = join(packageRoot(), "examples");
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    it(`${file} builds with no errors`, () => {
      const r = buildDocument(JSON.parse(readFileSync(join(dir, file), "utf8")), { embedFonts: false });
      expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    });
  }
});
