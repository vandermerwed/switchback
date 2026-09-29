import { describe, expect, it } from "vitest";
import { resolveKit } from "../../src/engine/kit";
import { assignPens, describeAssignment, formatPens } from "../../src/engine/pens";
import { loadRegistries } from "../../src/registry/registries";

const { roles } = loadRegistries();
const kitWith = (profile: Parameters<typeof resolveKit>[0]["profile"]) => resolveKit({ profile }).kit;

describe("assignPens", () => {
  it("matches a full desk by suggested colour", () => {
    const kit = kitWith({
      pens: ["black", "blue", "red", "green", "orange", "purple"].map((colour) => ({ colour })),
      highlighter: true,
      pencil: true,
    });
    const { mapping, unassigned } = assignPens(kit, roles);
    expect(mapping).toEqual({
      ask: { pen: "blue" },
      stop: { pen: "red" },
      keep: { pen: "green" },
      crux: { pen: "highlighter" },
      maybe: { pen: "orange" },
      sense: { pen: "purple" },
      draft: { pen: "pencil" },
      reason: { pen: "black" },
    });
    expect(unassigned).toEqual([]);
  });

  it("falls back to circled letters when there is only a black pen", () => {
    const kit = kitWith({ pens: [{ colour: "black" }], highlighter: false, pencil: false });
    const { mapping } = assignPens(kit, roles);
    expect(mapping.ask).toEqual({ letter: "Q" });
    expect(mapping.stop).toEqual({ letter: "R" });
    expect(mapping.crux).toEqual({ letter: "X" });
    expect(mapping.draft).toEqual({ letter: "D" });
    expect(mapping.reason).toEqual({ pen: "black" });
  });

  it("lets an explicit role win and reports pens left without a role", () => {
    const kit = kitWith({
      pens: [{ colour: "pink", role: "keep" }, { colour: "green" }, { colour: "teal" }],
    });
    const { mapping, unassigned } = assignPens(kit, roles);
    expect(mapping.keep).toEqual({ pen: "pink" });
    expect(unassigned).toEqual(["green", "teal"]);
  });

  it("marks a second pen with an already-taken explicit role used, not reassigned, and reports it unassigned", () => {
    // "red" explicitly asks for "keep", which "green" already won. "red" is also the
    // suggested colour for "stop" — the bug this guards against reassigned it there
    // instead of reporting it unassigned.
    const kit = kitWith({
      pens: [
        { colour: "green", role: "keep" },
        { colour: "red", role: "keep" },
      ],
    });
    const { mapping, unassigned } = assignPens(kit, roles);
    expect(mapping.keep).toEqual({ pen: "green" });
    expect(mapping.stop).not.toEqual({ pen: "red" });
    expect(unassigned).toEqual(["red"]);
  });

  it("matches colours case-insensitively and prefers a yellow pen over the highlighter", () => {
    const kit = kitWith({ pens: [{ colour: "Blue" }, { colour: "yellow" }], highlighter: true });
    const { mapping } = assignPens(kit, roles);
    expect(mapping.ask).toEqual({ pen: "Blue" });
    expect(mapping.crux).toEqual({ pen: "yellow" });
  });
});

describe("formatting", () => {
  it("describes letter fallbacks in words", () => {
    expect(describeAssignment({ letter: "P" })).toBe("no pen — write P in a circle");
    expect(describeAssignment({ pen: "red" })).toBe("red");
  });

  it("formats a one-line summary in priority order", () => {
    const { mapping } = assignPens(kitWith({ pens: [{ colour: "blue" }] }), roles);
    expect(formatPens(mapping, roles)).toMatch(/^Q ask=blue · R stop=Ⓡ/);
  });
});
