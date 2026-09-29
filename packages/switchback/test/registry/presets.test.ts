import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";
import { loadCatalogue } from "../../src/registry/catalogue";

const cat = loadCatalogue();

describe("presets from the research roster", () => {
  it.each([
    ["swot", "matrix-2x2", "Strengths"],
    ["impact-effort", "matrix-2x2", "Quick wins"],
    ["power-interest", "matrix-2x2", "Manage closely"],
    ["now-next-later", "zones", "Later"],
    ["start-stop-continue", "zones", "Continue"],
    ["kanban", "zones", "Doing"],
  ])("%s extends %s and prints its labels", (id, base, label) => {
    expect(cat.presets.get(id)?.extends).toBe(base);
    const r = renderComponent(id, { embedFonts: false });
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(r.html).toContain(label);
  });

  it("attributes power-interest to Mendelow (1981)", () => {
    expect(cat.presets.get("power-interest")?.attribution).toContain("Mendelow (1981)");
  });
});

describe("CC BY-SA canvases", () => {
  it.each([
    ["business-model-canvas", "Value Propositions", "Strategyzer"],
    ["lean-canvas", "Unfair Advantage", "LeanStack"],
  ])("%s prints its nine boxes and its attribution footer", (id, box, credit) => {
    const r = renderComponent(id, { embedFonts: false });
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(r.html?.match(/class="sb-zone"/g)).toHaveLength(9);
    expect(r.html).toContain(box);
    expect(r.html).toMatch(new RegExp(`class="sb-attrib"[^>]*>[^<]*${credit}[^<]*CC BY-SA 3\\.0`));
  });

  it("keeps the upstream Business Model Canvas credit in the Lean Canvas footer", () => {
    expect(cat.presets.get("lean-canvas")?.footer).toContain("adapted from The Business Model Canvas");
  });

  it("prints no attribution footer on an ordinary preset", () => {
    // The shared `.sb-attrib` CSS rule is always present in the page shell's
    // stylesheet (like `.sb-legend` and `.sb-pfoot`), so this checks for the
    // rendered <p class="sb-attrib"> element rather than the bare substring.
    expect(renderComponent("kanban", { embedFonts: false }).html).not.toMatch(/<p class="sb-attrib"/);
  });
});
