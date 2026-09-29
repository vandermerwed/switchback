import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";
import { loadCatalogue } from "../../src/registry/catalogue";

const cases = [...loadCatalogue().components.values()].flatMap((c) =>
  c.meta.variants.map((v) => ({ id: c.meta.id, variant: v.id })),
);
const fullKit = {
  scissors: true,
  coins: true,
  tape: true,
  glue: true,
  index_cards: true,
  sticky_notes: true,
  timer: true,
  wall_space: true,
  highlighter: true,
  pencil: true,
};

describe.each(cases)("$id ($variant) with empty data", ({ id, variant }) => {
  it("renders one page with no errors", () => {
    const r = buildDocument(
      { switchback: 1, kit: fullKit, pages: [{ id: "W1-P1", component: id, variant, data: {} }] },
      { embedFonts: false },
    );
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(r.html?.match(/<section class="sb-page"/g)).toHaveLength(1);
  });
});
