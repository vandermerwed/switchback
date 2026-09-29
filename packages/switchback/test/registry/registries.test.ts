import { describe, expect, it } from "vitest";
import { loadRegistries } from "../../src/registry/registries";

describe("loadRegistries", () => {
  const r = loadRegistries();

  it("has eight roles with unique letter codes", () => {
    expect(r.roles).toHaveLength(8);
    expect(new Set(r.roles.map((x) => x.code)).size).toBe(8);
  });

  it("orders the seven non-reason roles by priority 1..7", () => {
    const priorities = r.roles.filter((x) => x.priority !== null).map((x) => x.priority);
    expect([...priorities].sort()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(r.roles.find((x) => x.id === "ask")?.priority).toBe(1);
  });

  it("gives every role and mark with a proof action exactly one human-facing proof_label", () => {
    const labels = Object.fromEntries(
      [...r.roles.map((x) => [x.id, x]), ...r.marks.map((m) => [m.glyph, m])].map(([k, v]) => [
        k,
        [
          (v as { proof_action?: string | null }).proof_action ?? null,
          (v as { proof_label?: string | null }).proof_label ?? null,
        ],
      ]),
    );
    expect(labels).toEqual({
      ask: ["answer", "ask"],
      stop: ["challenge", "challenge"],
      keep: ["go-deeper", "go deeper"],
      crux: ["re-centre", "re-centre"],
      maybe: ["explore", "explore"],
      sense: ["justify", "justify"],
      draft: ["apply-edit", "edit"],
      reason: [null, null],
      "○": ["lock", "lock"],
      "✕": ["cut", "cut"],
      "→": [null, null],
      "▭": [null, null],
      "?": [null, null],
      "!": [null, null],
    });
  });

  it("ships the eight tags and the sitting style", () => {
    expect(r.tags.map((t) => t.id)).toEqual([
      "create",
      "decide",
      "learn",
      "plan",
      "diagnose",
      "review",
      "reflect",
      "focus",
    ]);
    expect(r.styles.find((s) => s.id === "sitting")?.budget).toBe(10);
  });

  it("migrated protocols and practices", () => {
    expect(r.protocols.map((p) => p.id)).toContain("proof-actions");
    expect(r.practices.length).toBe(14);
  });
});
