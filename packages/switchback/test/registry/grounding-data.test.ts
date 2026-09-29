import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Claim } from "../../src/engine/types";
import { ajv } from "../../src/registry/ajv";
import { claimSchema } from "../../src/registry/schemas";
import { packageRoot } from "../../src/shell/fonts";

const grounding = JSON.parse(readFileSync(join(packageRoot(), "research/grounding.json"), "utf8"));
const validateClaim = ajv.compile(claimSchema);
const SECTIONS = ["components", "variants", "presets", "styles", "protocols", "collection"];
const entries = SECTIONS.flatMap((section) =>
  Object.entries(grounding[section] ?? {}).map(([id, entry]) => ({
    key: `${section}/${id}`,
    claims: (entry as { claims: Claim[] }).claims,
  })),
);

describe.each(entries)("research/grounding.json $key", ({ claims }) => {
  it("has claims that match the claim schema", () => {
    for (const c of claims)
      expect(validateClaim(c), `${c.id}: ${JSON.stringify(validateClaim.errors)}`).toBe(true);
  });

  it("cites a source that validate --strict accepts", () => {
    for (const c of claims) {
      const ok =
        c.grade === "D" ? c.sources.some((s) => s.doi || s.isbn || s.url) : c.sources.some((s) => s.doi);
      expect(ok, `${c.id} (${c.grade})`).toBe(true);
    }
  });
});
