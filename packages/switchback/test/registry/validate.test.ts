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

  it("fails a research component with no grounding even outside strict mode", () => {
    const bare = clone("timeline");
    bare.meta.id = "bare-research";
    delete bare.meta.grounding;
    expect(codes(validateRegistry({ ...parts, components: [...parts.components, bare] }))).toContain(
      "E_COMPONENT_SCHEMA",
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

describe("collections", () => {
  const preset = (id: string, extra: Record<string, unknown> = {}) => ({
    id,
    kind: "preset" as const,
    extends: "zones",
    name: id,
    tags: ["plan"],
    data: { zones: ["A", "B"] },
    attribution: "A common board",
    licence: "idea; no restriction",
    basis: "practice" as const,
    ...extra,
  });
  const shelf = (id: string, includes: string[], presets: ReturnType<typeof preset>[] = [], dir = id) => ({
    dir,
    meta: { id, name: id, description: `The ${id} shelf.`, includes },
    presets,
  });
  const run = (collections: ReturnType<typeof shelf>[], strict = false) =>
    validateRegistry({ ...parts, collections }, { strict });

  it("passes a shelf of core templates and its own practical preset, in strict mode too", () => {
    const ok = [shelf("alpha", ["kanban", "timeline"], [preset("board-one")])];
    expect(run(ok)).toEqual([]);
    expect(run(ok, true)).toEqual([]);
  });

  it("rejects an include that names no template", () => {
    const found = run([shelf("alpha", ["kanban", "kanbna"])]).filter(
      (d) => d.code === "E_COLLECTION_INCLUDE",
    );
    expect(found.map((d) => [d.path, d.message])).toEqual([
      ["collections/alpha/collection.json", 'collection alpha includes unknown template "kanbna"'],
    ]);
  });

  it("rejects a collection id that is a template's or another collection's", () => {
    const found = run([shelf("kanban", []), shelf("alpha", []), shelf("alpha", [], [], "alpha-2")]);
    expect(found.filter((d) => d.code === "E_COLLECTION_ID").map((d) => d.path)).toEqual([
      "collections/kanban/collection.json",
      "collections/alpha-2/collection.json",
    ]);
  });

  it("rejects a collection preset whose id is already taken", () => {
    const found = run([shelf("alpha", [], [preset("kanban")])]);
    expect(found.filter((d) => d.code === "E_DUPLICATE_ID").map((d) => d.path)).toEqual([
      "collections/alpha/presets/kanban.json",
    ]);
  });

  it("requires a basis on a collection's own preset", () => {
    const { basis: _basis, ...bare } = preset("board-one");
    const found = run([shelf("alpha", [], [bare as ReturnType<typeof preset>])]);
    expect(found.filter((d) => d.code === "E_PRESET_SCHEMA").map((d) => d.path)).toEqual([
      "collections/alpha/presets/board-one.json",
    ]);
  });

  it("rejects a malformed collection.json, or one whose id is not its folder's", () => {
    const bad = shelf("alpha", []);
    (bad.meta as Record<string, unknown>).colour = "red";
    const moved = shelf("beta", [], [], "gamma");
    const found = run([bad, moved]).filter((d) => d.code === "E_COLLECTION_SCHEMA");
    expect(found.map((d) => d.path)).toEqual([
      "collections/alpha/collection.json",
      "collections/gamma/collection.json",
    ]);
  });

  it("checks a collection's own grounding when it has one", () => {
    const claimed = shelf("alpha", []);
    (claimed.meta as Record<string, unknown>).grounding = { claims: "none" };
    expect(codes(run([claimed]))).toContain("E_GROUNDING_SCHEMA");
  });
});
