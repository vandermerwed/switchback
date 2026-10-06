import { describe, expect, it } from "vitest";
import {
  applyGrounding,
  changedFiles,
  type GroundingFile,
  type ItemFiles,
  sameJson,
} from "../../scripts/research/grounding";

const claim = {
  id: "fam/x",
  claim: "A claim.",
  construct: "a construct",
  grade: "B",
  transfer: "adjacent",
  effect: "n/a",
  load_bearing: true,
  sources: [{ cite: "Smith (2020)", doi: "10.1000/xyz", type: "experiment" }],
  rationale: "research/fam.md#x",
};
const entry = (over: Record<string, unknown> = {}) => ({
  displayed_grade: "B",
  claims: [claim],
  helps: "when x",
  backfires: "when y",
  ...over,
});
const empty = { claims: [], helps: "", backfires: "" };
const files = (): ItemFiles => ({
  components: {
    alpha: {
      id: "alpha",
      variants: [
        { id: "default", requires: [] },
        { id: "wide", requires: [], grounding: entry() },
      ],
      prompt: "p",
      grounding: empty,
    },
    beta: { id: "beta", variants: [{ id: "default", requires: [] }], grounding: empty },
  },
  presets: { gamma: { id: "gamma", extends: "alpha" } },
  styles: { styles: [{ id: "sitting", budget: 10 }] },
  protocols: { protocols: [{ id: "dots" }, { id: "marks", grounding: empty }] },
  collection: {},
});
const full: GroundingFile = {
  generated: "2026-09-26",
  components: { alpha: entry(), beta: entry() },
  variants: {},
  presets: { gamma: entry() },
  styles: { sitting: entry() },
  protocols: { dots: entry() },
  collection: { collection: entry({ displayed_grade: null }) },
};

describe("applyGrounding", () => {
  it("writes each entry into its item without the derived displayed grade, keeping key order", () => {
    const { files: out, errors } = applyGrounding(full, files());
    expect(errors).toEqual([]);
    const alpha = out.components.alpha!;
    expect(Object.keys(alpha)).toEqual(["id", "variants", "prompt", "grounding"]);
    expect(alpha.grounding).toEqual({ claims: [claim], helps: "when x", backfires: "when y" });
    expect(out.presets.gamma!.grounding).toEqual({ claims: [claim], helps: "when x", backfires: "when y" });
    expect(out.styles.styles[0]!.grounding).toMatchObject({ helps: "when x" });
    expect(out.protocols.protocols[0]!.grounding).toMatchObject({ helps: "when x" });
    expect(out.collection.grounding).toMatchObject({ helps: "when x" });
    expect(JSON.stringify(out)).not.toContain("displayed_grade");
  });

  it("removes grounding from a variant or protocol that grounding.json no longer lists", () => {
    const { files: out } = applyGrounding(full, files());
    expect(out.components.alpha!.variants).toEqual([
      { id: "default", requires: [] },
      { id: "wide", requires: [] },
    ]);
    expect(out.protocols.protocols[1]).toEqual({ id: "marks" });
  });

  it("warns and leaves an item with no entry unchanged", () => {
    const g = { ...full, components: { alpha: entry() }, styles: {} };
    const { files: out, errors, warnings } = applyGrounding(g, files());
    expect(errors).toEqual([]);
    expect(out.components.beta!.grounding).toEqual(empty);
    expect(warnings).toEqual(
      expect.arrayContaining([
        expect.stringContaining("component beta"),
        expect.stringContaining("style sitting"),
      ]),
    );
  });

  it("rejects unknown ids in every section, and unknown top-level keys", () => {
    const g = {
      ...full,
      components: { ...full.components, alpah: entry() },
      variants: { "alpha/narrow": entry(), "nope/default": entry(), "alpha/wide/extra": entry() },
      presets: { gama: entry() },
      styles: { sereis: entry() },
      protocols: { dot: entry() },
      collection: { site: entry() },
      extras: {},
    } as GroundingFile;
    const { errors } = applyGrounding(g, files());
    for (const bad of [
      '"alpah"',
      '"alpha/narrow"',
      '"nope/default"',
      '"alpha/wide/extra"',
      '"gama"',
      '"sereis"',
      '"dot"',
      '"site"',
      '"extras"',
    ])
      expect(
        errors.some((e) => e.includes(bad)),
        bad,
      ).toBe(true);
  });

  it("rejects a component entry named constructor as unknown, not as a prototype property", () => {
    const g = { ...full, components: { ...full.components, constructor: entry() } };
    const { errors } = applyGrounding(g, files());
    expect(errors.some((e) => e.includes('"constructor"'))).toBe(true);
  });

  it("rejects an entry the grounding schema refuses, naming the item and the path", () => {
    const badSource = {
      ...claim,
      sources: [{ cite: "Parkinson (1955)", url: null, note: "x", type: "practice" }],
    };
    const { errors } = applyGrounding(
      { ...full, components: { alpha: entry({ claims: [badSource] }), beta: entry() } },
      files(),
    );
    expect(errors.some((e) => e.startsWith("component alpha: grounding/claims/0/sources/0"))).toBe(true);
    expect(
      errors.some((e) => e.startsWith("component alpha: grounding/claims/0/sources/0") && e.includes("note")),
    ).toBe(true);
  });

  it("is idempotent and ignores key order", () => {
    const once = applyGrounding(full, files()).files;
    const twice = applyGrounding(full, once).files;
    expect(changedFiles(once, twice)).toEqual([]);
    expect(sameJson({ a: 1, b: [{ c: 2, d: 3 }] }, { b: [{ d: 3, c: 2 }], a: 1 })).toBe(true);
    expect(sameJson({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
  });

  it("reports exactly the files whose content differs", () => {
    const before = files();
    const after = applyGrounding(full, before).files;
    expect(changedFiles(before, after).map((c) => c.path)).toEqual([
      "components/alpha/component.json",
      "components/beta/component.json",
      "presets/gamma.json",
      "registry/styles.json",
      "registry/protocols.json",
      "registry/catalogue.json",
    ]);
    const drifted = structuredClone(after);
    (drifted.components.beta!.grounding as { helps: string }).helps = "hand-edited";
    expect(changedFiles(drifted, applyGrounding(full, drifted).files).map((c) => c.path)).toEqual([
      "components/beta/component.json",
    ]);
  });

  it("does not modify its input", () => {
    const input = files();
    const copy = structuredClone(input);
    applyGrounding(full, input);
    expect(input).toEqual(copy);
  });
});
