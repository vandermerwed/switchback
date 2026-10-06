import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";
import { loadCatalogue } from "../../src/registry/catalogue";
import { esc } from "../../src/shell/helpers";
import { borderStyleViolations, colourViolations, styleSources } from "../support/lint";

const cat = loadCatalogue();
const IGNORED_KEYS = new Set(["type", "tone"]);

// self-explain's "faded" variant blanks steps from `fade_from` onwards, printing "Complete this
// step" instead of the step's own text (the learner fills it in). This mirrors that math so the
// "shows every string" check below can exempt only the strings actually blanked, not the whole
// example.
function selfExplainFadedBlanks(data: { steps?: string[]; fade_from?: number }): string[] {
  const steps = data.steps ?? [];
  const from = Math.min(data.fade_from ?? Math.ceil(steps.length / 2) + 1, steps.length + 1) - 1;
  return steps.filter((_, i) => i >= from);
}

// Examples whose data intentionally omits some of its own strings from the render, by design.
// Verified instead by that component's own test file.
const PARTIAL_BY_DESIGN: Record<string, (data: Record<string, unknown>) => string[]> = {
  "self-explain:faded": selfExplainFadedBlanks,
  "self-explain:faded-max": selfExplainFadedBlanks,
};

function strings(value: unknown, key = ""): string[] {
  if (typeof value === "string") return IGNORED_KEYS.has(key) || value === "" ? [] : [value];
  if (Array.isArray(value)) return value.flatMap((v) => strings(v, key));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => strings(v, k));
  return [];
}

const cases = [...cat.components.values()].flatMap((c) =>
  Object.keys(c.examples).map((example) => ({ id: c.meta.id, example })),
);

describe.each(cases)("$id ($example)", ({ id, example }) => {
  const component = cat.components.get(id)!;
  const result = renderComponent(id, { example, embedFonts: false });

  it("renders exactly one page without errors", () => {
    expect(result.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(result.html?.match(/<section class="sb-page[ "]/g)).toHaveLength(1);
  });

  it("shows every string it was given", () => {
    const data = component.examples[example]?.data ?? {};
    const blanked = new Set(PARTIAL_BY_DESIGN[`${id}:${example}`]?.(data as Record<string, unknown>) ?? []);
    for (const s of strings(data)) {
      if (blanked.has(s)) continue;
      expect(result.html).toContain(esc(s));
    }
  });

  it("prints no colour, and uses dashed only for cutting and dotted only for folding", () => {
    expect(colourViolations(styleSources(result.html ?? ""))).toEqual([]);
    expect(borderStyleViolations(component.css ?? "")).toEqual([]);
  });

  it("matches its snapshot", () => {
    expect(result.html).toMatchSnapshot();
  });
});

const presets = [...cat.presets.values()];
if (presets.length) {
  describe.each(presets.map((p) => ({ id: p.id })))("preset $id", ({ id }) => {
    it("renders its base with the preset data", () => {
      const r = renderComponent(id, { embedFonts: false });
      expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
      expect(r.sidecar?.pages[0]?.preset).toBe(id);
      for (const s of strings(cat.presets.get(id)!.data)) expect(r.html).toContain(esc(s));
    });
  });
}
