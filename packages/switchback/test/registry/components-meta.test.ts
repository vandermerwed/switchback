import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isKnownToken } from "../../src/engine/kit";
import { ajv } from "../../src/registry/ajv";
import { loadRegistries } from "../../src/registry/registries";
import { componentSchema } from "../../src/registry/schemas";
import { packageRoot } from "../../src/shell/fonts";

const dir = join(packageRoot(), "components");
const ids = readdirSync(dir)
  .filter((d) => existsSync(join(dir, d, "component.json")))
  .sort();
const tags = new Set(loadRegistries().tags.map((t) => t.id));
const validate = ajv.compile(componentSchema);
const BUILT_IN = new Set(["subject", "horizon", "constraint"]);

describe("component metadata", () => {
  it("covers all 37 components", () => {
    expect(ids).toHaveLength(37);
  });

  describe.each(ids)("%s", (id) => {
    const meta = JSON.parse(readFileSync(join(dir, id, "component.json"), "utf8"));

    it("matches the component schema and its folder name", () => {
      expect(validate(meta), JSON.stringify(validate.errors)).toBe(true);
      expect(meta.id).toBe(id);
    });

    it("uses known tags and stationery tokens", () => {
      for (const tag of meta.tags) expect(tags.has(tag), tag).toBe(true);
      const requires = [
        ...meta.physical.requires,
        ...meta.variants.flatMap((v: { requires: string[] }) => v.requires),
      ];
      for (const req of requires)
        for (const token of req.split("|")) expect(isKnownToken(token.trim()), token).toBe(true);
    });

    it("has a compilable data schema whose properties cover every prompt placeholder", () => {
      expect(() => ajv.compile(meta.data)).not.toThrow();
      const props = new Set(Object.keys(meta.data.properties ?? {}));
      for (const [, key] of (meta.prompt ?? "").matchAll(/\{([a-z_]+)/g)) {
        expect(props.has(key) || BUILT_IN.has(key), `{${key}}`).toBe(true);
      }
    });

    it("has a default example whose data validates", () => {
      const example = JSON.parse(readFileSync(join(dir, id, "examples", "default.json"), "utf8"));
      const validateData = ajv.compile(meta.data);
      expect(validateData(example.data ?? {}), JSON.stringify(validateData.errors)).toBe(true);
    });
  });
});
