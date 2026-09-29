import { describe, expect, it } from "vitest";
import { resolveKit } from "../../src/engine/kit";
import { alternativesFor, chooseVariant, resolveComponent } from "../../src/engine/resolve";
import type { ComponentModule, Variant } from "../../src/engine/types";
import { createCatalogue } from "../../src/registry/catalogue";

const fake = (id: string, variants: Variant[], requires: string[] = ["printer"]): ComponentModule => ({
  meta: {
    id,
    kind: "page",
    name: id,
    intent: "x",
    when: "",
    tags: ["decide"],
    phase: "converge",
    physical: { requires, body: [], surface: "desk", timebox: "1 min" },
    variants,
    data: { type: "object" },
    grounding: { claims: [], helps: "", backfires: "" },
  },
  render: () => "",
  examples: {},
});

const sort = fake("sort", [
  { id: "cut-out", requires: ["scissors"] },
  { id: "write-in", requires: [] },
]);
const matrix = fake("matrix", [{ id: "default", requires: [] }]);
const die = fake("die", [{ id: "cube", requires: ["scissors", "tape"] }]);
const photo = fake("photo", [{ id: "default", requires: [] }], ["camera"]);
const cat = createCatalogue({
  components: [sort, matrix, die, photo],
  presets: [
    {
      id: "eisen",
      kind: "preset",
      extends: "matrix",
      name: "Eisen",
      tags: ["decide"],
      data: { a: 1, b: 2 },
      attribution: "x",
      licence: "x",
    },
    {
      id: "orphan",
      kind: "preset",
      extends: "missing",
      name: "Orphan",
      tags: ["decide"],
      data: {},
      attribution: "x",
      licence: "x",
    },
  ],
});
const minimum = resolveKit({}).kit;
const withScissors = resolveKit({ profile: { scissors: true } }).kit;

describe("resolveComponent", () => {
  it("resolves components directly", () => {
    expect(resolveComponent(cat, "sort")?.base.meta.id).toBe("sort");
  });

  it("resolves presets to their base, page data winning", () => {
    const r = resolveComponent(cat, "eisen", { b: 3 });
    expect(r?.base.meta.id).toBe("matrix");
    expect(r?.preset?.id).toBe("eisen");
    expect(r?.data).toEqual({ a: 1, b: 3 });
  });

  it("returns null for unknown ids and presets with a missing base", () => {
    expect(resolveComponent(cat, "nope")).toBeNull();
    expect(resolveComponent(cat, "orphan")).toBeNull();
  });
});

describe("chooseVariant", () => {
  it("falls back to the first satisfiable variant and reports what was missing", () => {
    expect(chooseVariant(sort.meta, minimum)).toEqual({
      ok: true,
      variant: { id: "write-in", requires: [] },
      substituted: true,
      missing: ["scissors"],
    });
  });

  it("uses the preferred variant when the kit allows", () => {
    expect(chooseVariant(sort.meta, withScissors)).toMatchObject({
      ok: true,
      variant: { id: "cut-out" },
      substituted: false,
    });
  });

  it("rejects an explicit variant the kit cannot satisfy", () => {
    expect(chooseVariant(sort.meta, minimum, "cut-out")).toEqual({
      ok: false,
      code: "E_VARIANT_UNSATISFIED",
      missing: ["scissors"],
    });
    expect(chooseVariant(sort.meta, minimum, "origami")).toEqual({
      ok: false,
      code: "E_UNKNOWN_VARIANT",
      missing: [],
    });
  });

  it("reports E_NO_VARIANT when nothing fits, including the base requirements", () => {
    expect(chooseVariant(die.meta, minimum)).toEqual({
      ok: false,
      code: "E_NO_VARIANT",
      missing: ["scissors", "tape"],
    });
    expect(chooseVariant(photo.meta, resolveKit({ profile: { camera: false } }).kit)).toEqual({
      ok: false,
      code: "E_NO_VARIANT",
      missing: ["camera"],
    });
  });
});

describe("alternativesFor", () => {
  it("suggests same-tag components that fit the kit", () => {
    expect(alternativesFor(cat, die.meta, minimum)).toEqual(["sort", "matrix", "photo"]);
  });
});
