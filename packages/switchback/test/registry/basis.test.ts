import { describe, expect, it } from "vitest";
import type { ComponentMeta, PresetMeta } from "../../src/engine/types";
import { basisOf, groundingOf, originOf } from "../../src/registry/basis";

const g = (helps: string) => ({ claims: [], helps, backfires: "" });
const meta = (extra: Partial<ComponentMeta>): ComponentMeta =>
  ({ id: "zones", basis: "research", grounding: g("base"), ...extra }) as ComponentMeta;
const preset = (extra: Partial<PresetMeta>): PresetMeta =>
  ({
    id: "p",
    kind: "preset",
    extends: "zones",
    name: "P",
    tags: ["plan"],
    data: {},
    attribution: "A common format",
    licence: "x",
    ...extra,
  }) as PresetMeta;

describe("basis", () => {
  it("reads a component's basis, grounding and origin", () => {
    expect(basisOf(meta({}))).toBe("research");
    expect(groundingOf(meta({}))?.helps).toBe("base");
    expect(originOf(meta({}))).toBeUndefined();
    const practice = meta({ basis: "practice", grounding: undefined, origin: "A studio format" });
    expect(basisOf(practice)).toBe("practice");
    expect(groundingOf(practice)).toBeUndefined();
    expect(originOf(practice)).toBe("A studio format");
  });

  it("lets a preset inherit, use its own grounding, or declare practice", () => {
    expect(basisOf(meta({}), preset({}))).toBe("research");
    expect(groundingOf(meta({}), preset({ grounding: g("own") }))?.helps).toBe("own");
    expect(groundingOf(meta({}), preset({}))?.helps).toBe("base");
    const practical = preset({ basis: "practice" });
    expect(basisOf(meta({}), practical)).toBe("practice");
    expect(groundingOf(meta({}), practical)).toBeUndefined(); // never the base's claims
    expect(originOf(meta({}), practical)).toBe("A common format");
  });
});
