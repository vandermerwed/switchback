import { describe, expect, it } from "vitest";
import type { CollectionModule } from "../../src/engine/types";
import { catalogueParts, createCatalogue } from "../../src/registry/catalogue";
import { collectionsOf, membersOf } from "../../src/registry/collections";

const parts = catalogueParts();
const own = {
  id: "board-one",
  kind: "preset" as const,
  extends: "zones",
  name: "Board one",
  tags: ["plan"],
  data: { zones: ["A", "B"] },
  attribution: "A common board",
  licence: "idea; no restriction",
  basis: "practice" as const,
};
const shelf = (
  id: string,
  includes: string[],
  presets = [] as CollectionModule["presets"],
): CollectionModule => ({
  dir: id,
  meta: { id, name: id, description: `The ${id} shelf.`, includes },
  presets,
});

describe("collections in the catalogue", () => {
  const cat = createCatalogue({
    ...parts,
    collections: [shelf("alpha", ["kanban", "timeline", "board-one"], [own]), shelf("beta", ["kanban"])],
  });

  it("joins a collection's own presets into the preset map", () => {
    expect(cat.presets.get("board-one")).toEqual(own);
    expect(cat.presets.get("kanban")).toBeDefined();
    expect([...cat.collections.keys()]).toEqual(["alpha", "beta"]);
  });

  it("lists a shelf's own templates first, then what it includes, each once", () => {
    expect(membersOf(cat, "alpha")).toEqual(["board-one", "kanban", "timeline"]);
    expect(membersOf(cat, "nope")).toEqual([]);
  });

  it("computes which shelves hold a template", () => {
    expect(collectionsOf(cat, "kanban")).toEqual(["alpha", "beta"]);
    expect(collectionsOf(cat, "board-one")).toEqual(["alpha"]);
    expect(collectionsOf(cat, "cover")).toEqual([]);
  });

  it("defaults to no collections", () => {
    expect(createCatalogue({ components: parts.components }).collections.size).toBe(0);
  });
});
