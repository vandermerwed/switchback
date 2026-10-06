import { describe, expect, it } from "vitest";
import type { ComponentModule } from "../../src/engine/types";
import { catalogueParts } from "../../src/registry/catalogue";
import { validateRegistry } from "../../src/registry/validate";

const parts = catalogueParts();
const codes = (d: { code: string }[]) => d.map((x) => x.code);
const clone = (id: string): ComponentModule => {
  const c = parts.components.find((x) => x.meta.id === id)!;
  return { ...c, meta: structuredClone(c.meta), examples: structuredClone(c.examples) };
};

describe("validateRegistry", () => {
  it("passes for the shipped catalogue", () => {
    expect(validateRegistry(parts)).toEqual([]);
  });

  it("reports ungraded and empty grounding in strict mode", () => {
    const ungraded = clone("pre-mortem");
    ungraded.meta.id = "ungraded";
    ungraded.meta.grounding = {
      claims: [{ claim: "x", construct: "x", grade: "unrated", transfer: null, sources: [] }],
      helps: "h",
      backfires: "b",
    };
    const bare = clone("timeline");
    bare.meta.id = "bare";
    bare.meta.grounding = { claims: [], helps: "", backfires: "" };
    const strict = codes(
      validateRegistry({ ...parts, components: [...parts.components, ungraded, bare] }, { strict: true }),
    );
    expect(strict).toEqual(
      expect.arrayContaining(["E_STRICT_UNRATED", "E_STRICT_NO_CLAIMS", "E_STRICT_HELPS"]),
    );
  });

  it("catches unknown tags, unknown stationery, and missing examples", () => {
    const bad = clone("pre-mortem");
    bad.meta.id = "bad-one";
    bad.meta.tags = ["vibes"];
    bad.meta.variants = [{ id: "default", requires: ["laser"] }];
    bad.examples = {};
    const found = codes(validateRegistry({ ...parts, components: [...parts.components, bad] }));
    expect(found).toEqual(expect.arrayContaining(["E_UNKNOWN_TAG", "E_UNKNOWN_TOKEN", "E_NO_EXAMPLE"]));
  });

  it("catches presets with a missing base, and components without a renderer", () => {
    const found = codes(
      validateRegistry({
        ...parts,
        skipped: ["half-done"],
        presets: [
          ...parts.presets,
          {
            id: "swot",
            kind: "preset",
            extends: "quadrants",
            name: "SWOT",
            tags: ["decide"],
            data: {},
            attribution: "traditional",
            licence: "idea",
          },
        ],
      }),
    );
    expect(found).toEqual(expect.arrayContaining(["E_UNKNOWN_BASE", "E_NO_RENDERER"]));
  });

  it("catches an example that no longer fits its schema", () => {
    const drifted = clone("timeline");
    drifted.meta.id = "timeline-copy";
    drifted.examples = { default: { data: { horizon: 12 } } };
    expect(codes(validateRegistry({ ...parts, components: [...parts.components, drifted] }))).toContain(
      "E_EXAMPLE",
    );
  });

  it("checks the shape of grounding on styles, protocols and the catalogue", () => {
    const registries = structuredClone(parts.registries);
    (registries.styles[0] as { grounding?: unknown }).grounding = {
      claims: "none",
      helps: "",
      backfires: "",
    };
    (registries.protocols[0] as { grounding?: unknown }).grounding = { claims: [] };
    (registries.catalogueClaims as { grounding?: unknown }).grounding = {
      claims: [],
      helps: "",
      backfires: "",
      extra: 1,
    };
    const found = validateRegistry({ ...parts, registries }).filter((d) => d.code === "E_GROUNDING_SCHEMA");
    expect(found.map((d) => d.path)).toEqual([
      "registry/styles.json",
      "registry/protocols.json",
      "registry/catalogue.json",
    ]);
  });

  it("requires grounding on every preset and style, and checks variant grounding, in strict mode", () => {
    const withVariant = clone("commit");
    withVariant.meta.variants = withVariant.meta.variants.map((v) =>
      v.id === "policy"
        ? {
            ...v,
            grounding: {
              claims: [{ claim: "x", construct: "x", grade: "unrated", transfer: null, sources: [] }],
              helps: "h",
              backfires: "b",
            },
          }
        : v,
    );
    const components = parts.components.map((c) => (c.meta.id === "commit" ? withVariant : c));
    // Strip grounding explicitly, so the test still holds after Task 4 fills every preset and style.
    const without = <T extends object>(o: T): T =>
      Object.fromEntries(Object.entries(o).filter(([k]) => k !== "grounding")) as T;
    const presets = parts.presets.map(without);
    const registries = { ...parts.registries, styles: parts.registries.styles.map(without) };
    const strict = validateRegistry({ ...parts, components, presets, registries }, { strict: true });
    const at = (path: string) => strict.filter((d) => d.path?.startsWith(path)).map((d) => d.code);
    expect(at("presets/swot.json")).toContain("E_STRICT_NO_CLAIMS");
    expect(at("registry/styles.json")).toContain("E_STRICT_NO_CLAIMS");
    expect(at("components/commit#variants/policy")).toContain("E_STRICT_UNRATED");
  });
});

describe("basis", () => {
  const practical = () => {
    const c = clone("timeline");
    c.meta.id = "practical";
    c.meta.basis = "practice";
    c.meta.origin = "A common planning format";
    delete c.meta.grounding;
    return c;
  };

  it("accepts a practice component with an origin and no claims, in strict mode too", () => {
    const withPractical = { ...parts, components: [...parts.components, practical()] };
    expect(validateRegistry(withPractical)).toEqual([]);
    expect(validateRegistry(withPractical, { strict: true })).toEqual([]);
  });

  it("rejects a practice component that carries claims, on itself or a variant", () => {
    const withClaims = practical();
    withClaims.meta.grounding = { claims: [], helps: "h", backfires: "b" };
    const withVariantClaims = practical();
    withVariantClaims.meta.id = "practical-variant";
    withVariantClaims.meta.variants = [
      { id: "default", requires: [], grounding: { claims: [], helps: "h", backfires: "b" } },
    ];
    const found = validateRegistry({
      ...parts,
      components: [...parts.components, withClaims, withVariantClaims],
    });
    expect(found.filter((d) => d.code === "E_BASIS_CLAIMS").map((d) => d.path)).toEqual([
      "components/practical",
      "components/practical-variant#variants/default",
    ]);
  });

  it("rejects a practice component with no origin", () => {
    const noOrigin = practical();
    delete noOrigin.meta.origin;
    expect(codes(validateRegistry({ ...parts, components: [...parts.components, noOrigin] }))).toContain(
      "E_BASIS_ORIGIN",
    );
  });

  it("rejects a practice preset that carries claims, and passes one that doesn't, in strict mode", () => {
    const preset = {
      id: "plain-board",
      kind: "preset" as const,
      extends: "zones",
      name: "Plain board",
      tags: ["plan"],
      data: { zones: ["A", "B"] },
      attribution: "A common board",
      licence: "idea; no restriction",
      basis: "practice" as const,
    };
    expect(validateRegistry({ ...parts, presets: [...parts.presets, preset] }, { strict: true })).toEqual([]);
    const claimed = { ...preset, id: "claimed-board", grounding: { claims: [], helps: "h", backfires: "b" } };
    expect(codes(validateRegistry({ ...parts, presets: [...parts.presets, claimed] }))).toContain(
      "E_BASIS_CLAIMS",
    );
  });

  it("still fails a research component with no grounding in strict mode", () => {
    const bare = clone("timeline");
    bare.meta.id = "bare-research";
    delete bare.meta.grounding;
    expect(
      codes(validateRegistry({ ...parts, components: [...parts.components, bare] }, { strict: true })),
    ).toContain("E_STRICT_NO_CLAIMS");
  });
});
