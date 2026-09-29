import { describe, expect, it } from "vitest";
import type { Style } from "../../src/engine/types";
import { catalogueParts } from "../../src/registry/catalogue";
import { loadRegistries } from "../../src/registry/registries";
import { validateRegistry } from "../../src/registry/validate";

const base = loadRegistries().styles.find((s) => s.id === "sitting")!;
const withStyle = (style: unknown) => {
  const parts = catalogueParts();
  const styles = (style as Style).id === "sitting" ? [style as Style] : [base, style as Style];
  return validateRegistry({ ...parts, registries: { ...parts.registries, styles } });
};
const codes = (style: unknown) => withStyle(style).map((d) => d.code);

describe("style validation", () => {
  it("accepts the current sitting style", () => {
    expect(codes(base)).toEqual([]);
  });

  it("accepts slots with alternatives, a split, phase rules and an allow-list", () => {
    const style = {
      ...base,
      id: "trial",
      opening: ["cover", ["free-recall", "feynman"]],
      closing: [["question-queue"], "return-checklist"],
      split_on: "cover",
      phase_rules: [
        {
          section: 0,
          phases: ["diverge", "either"],
          why: "test",
          claim: base.grounding!.claims[0]!.id!,
          forbid: [{ id: "timer", why: "test", claim: base.grounding!.claims[0]!.id! }],
        },
      ],
      allow: ["cover", "free-recall"],
    };
    expect(codes(style)).toEqual([]);
  });

  it("rejects a malformed style with E_STYLE_SCHEMA", () => {
    expect(codes({ ...base, budget: "ten" })).toContain("E_STYLE_SCHEMA");
    expect(codes({ ...base, colour: "red" })).toContain("E_STYLE_SCHEMA");
  });

  it("rejects unknown component ids in every slot and list", () => {
    for (const bad of [
      { opening: ["origami"] },
      { closing: [["commit", "origami"]] },
      { split_on: "origami" },
      { allow: ["origami"] },
      {
        phase_rules: [
          {
            section: 0,
            phases: ["diverge"],
            why: "t",
            claim: base.grounding!.claims[0]!.id!,
            forbid: [{ id: "origami", why: "t", claim: base.grounding!.claims[0]!.id! }],
          },
        ],
      },
    ])
      expect(codes({ ...base, ...bad }), JSON.stringify(bad)).toContain("E_UNKNOWN_COMPONENT");
  });

  it("rejects a rule claim that is not in the style's grounding", () => {
    const style = {
      ...base,
      phase_rules: [{ section: 0, phases: ["either"], why: "t", claim: "memory-retrieval/no-such-claim" }],
    };
    expect(codes(style)).toContain("E_STYLE_CLAIM");
    const why = { ...base, why: { opening: { text: "t", claim: "memory-retrieval/no-such-claim" } } };
    expect(codes(why)).toContain("E_STYLE_CLAIM");
  });
});
