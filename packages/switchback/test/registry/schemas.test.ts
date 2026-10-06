import { describe, expect, it } from "vitest";
import { ajv } from "../../src/registry/ajv";
import { componentSchema, presetSchema, specSchema } from "../../src/registry/schemas";

describe("orientation in the schemas", () => {
  it("accepts portrait and landscape on a spec page and rejects anything else", () => {
    const validate = ajv.compile(specSchema);
    const spec = (orientation: string) => ({
      switchback: 1,
      pages: [{ id: "W1-P1", component: "sheet", orientation }],
    });
    expect(validate(spec("landscape"))).toBe(true);
    expect(validate(spec("portrait"))).toBe(true);
    expect(validate(spec("sideways"))).toBe(false);
  });

  it("allows orientation on components, variants and presets", () => {
    const props = componentSchema.properties;
    expect(props.orientation).toEqual({ enum: ["portrait", "landscape"] });
    expect(props.variants.items.properties.orientation).toEqual({ enum: ["portrait", "landscape"] });
    expect(presetSchema.properties.orientation).toEqual({ enum: ["portrait", "landscape"] });
  });
});

describe("basis in the schemas", () => {
  it("requires basis on a component, allows origin, and allows basis on a preset", () => {
    expect(componentSchema.required).toContain("basis");
    expect(componentSchema.required).not.toContain("grounding");
    expect(componentSchema.properties.basis).toEqual({ enum: ["research", "practice"] });
    expect(componentSchema.properties.origin).toEqual({ type: "string", minLength: 1, maxLength: 160 });
    expect(presetSchema.properties.basis).toEqual({ enum: ["research", "practice"] });
  });
});
