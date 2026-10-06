import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";
import { loadCatalogue } from "../../src/registry/catalogue";
import { collectionsOf } from "../../src/registry/collections";

const cat = loadCatalogue();
const OFF_SHELF = ["cover", "return-checklist", "step-away", "player-aid", "tokens", "zones", "playmat"];

describe("the first shelf", () => {
  it("has the eight sorted collections and Game Development", () => {
    expect([...cat.collections.keys()]).toEqual([
      "business",
      "design",
      "engineering",
      "game-dev",
      "learning",
      "planning",
      "product",
      "productivity",
      "systems-thinking",
    ]);
  });

  it("keeps the workbook structure and generic pieces off every shelf", () => {
    for (const id of OFF_SHELF) expect(collectionsOf(cat, id), id).toEqual([]);
  });

  it("puts every other template on at least one shelf", () => {
    const ids = [...cat.components.keys(), ...cat.presets.keys()].filter((id) => !OFF_SHELF.includes(id));
    expect(ids.filter((id) => collectionsOf(cat, id).length === 0)).toEqual([]);
  });

  it("gives Game Development four practical presets of existing components", () => {
    const own = cat.collections.get("game-dev")!.presets;
    expect(own.map((p) => [p.id, p.extends, p.basis])).toEqual([
      ["core-loop", "node-map", "practice"],
      ["feature-cut", "card-sort", "practice"],
      ["game-one-pager", "zones", "practice"],
      ["playtest-notes", "zones", "practice"],
    ]);
    for (const p of own) {
      expect(p.grounding, p.id).toBeUndefined();
      expect(p.licence, p.id).toBe("idea; no restriction");
    }
  });

  it("prints each Game Development template whole, in its orientation", () => {
    const expected = {
      "game-one-pager": "landscape",
      "feature-cut": "landscape",
      "core-loop": "portrait",
      "playtest-notes": "portrait",
    };
    for (const [id, orientation] of Object.entries(expected)) {
      const r = renderComponent(id, { embedFonts: false });
      // A kit without scissors falls back to write-in (W_SUBSTITUTION); that is the kit, not the template.
      const faults = r.diagnostics.filter(
        (d) => d.level === "error" || d.code === "W_NARROW" || d.code === "W_ZONES_COLUMNS",
      );
      expect(faults, id).toEqual([]);
      expect(r.sidecar?.pages[0]?.orientation, id).toBe(orientation);
    }
  });
});
