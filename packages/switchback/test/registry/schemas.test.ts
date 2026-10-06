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
