import { describe, expect, it } from "vitest";
import { isKnownToken, MINIMUM_KIT, missingRequirements, resolveKit, satisfies } from "../../src/engine/kit";

describe("resolveKit", () => {
  it("starts from the minimum kit", () => {
    const { kit, source } = resolveKit({});
    expect(kit).toEqual(MINIMUM_KIT);
    expect(source).toEqual(["minimum"]);
    expect(kit.pens).toEqual([{ colour: "black" }]);
    expect(kit.highlighter).toBe(true);
  });

  it("overlays profile then spec, and the spec replaces the pen list", () => {
    const { kit, source } = resolveKit({
      profile: { scissors: true, pens: [{ colour: "black" }, { colour: "red" }] },
      spec: { pens: [{ colour: "blue" }], paper: "Letter" },
    });
    expect(source).toEqual(["minimum", "profile", "spec"]);
    expect(kit.scissors).toBe(true);
    expect(kit.paper).toBe("Letter");
    expect(kit.pens).toEqual([{ colour: "black" }, { colour: "blue" }]);
  });

  it("always keeps a black pen for reasoning", () => {
    expect(resolveKit({ profile: { pens: [{ colour: "green" }] } }).kit.pens[0]).toEqual({ colour: "black" });
  });
});

describe("requirements", () => {
  const kit = resolveKit({ profile: { index_cards: true } }).kit;

  it("treats printer and pen as always present", () => {
    expect(satisfies(["printer", "pen"], kit)).toBe(true);
  });

  it("accepts any alternative in an 'a | b' requirement", () => {
    expect(satisfies(["scissors | index_cards"], kit)).toBe(true);
    expect(missingRequirements(["scissors", "tape"], kit)).toEqual(["scissors", "tape"]);
  });

  it("knows the stationery vocabulary", () => {
    expect(isKnownToken("index_cards")).toBe(true);
    expect(isKnownToken("laser")).toBe(false);
  });
});
