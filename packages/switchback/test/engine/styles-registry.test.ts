import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";

const build = (style: string, components: string[], data: Record<string, Record<string, unknown>> = {}) =>
  buildDocument(
    {
      switchback: 1,
      style,
      pages: components.map((component, i) => ({
        id: `W1-P${i + 1}`,
        component,
        ...(data[component] ? { data: data[component] } : {}),
      })),
    },
    { embedFonts: false },
  );
const codes = (r: ReturnType<typeof build>) => r.diagnostics.map((d) => d.code);
const proofData = { proof: { blocks: [{ kind: "p", n: 1, text: "Text." }] } };

describe("the registry's five styles", () => {
  it("builds a clean incubation, and rejects a timer before the break with its grade", () => {
    const ok = build("incubation", [
      "cover",
      "ten-bad-ideas",
      "forced-connections",
      "step-away",
      "matrix-2x2",
      "commit",
      "question-queue",
      "return-checklist",
    ]);
    expect(codes(ok).filter((c) => c.startsWith("E_"))).toEqual([]);
    const bad = build("incubation", [
      "cover",
      "timer",
      "step-away",
      "matrix-2x2",
      "commit",
      "question-queue",
      "return-checklist",
    ]);
    expect(bad.html).toBeNull();
    expect(bad.diagnostics.find((d) => d.code === "E_STYLE_FORBID")?.message).toMatch(/grade [ABCD]/);
  });

  it("opens a series round with retrieval", () => {
    expect(
      codes(build("series", ["cover", "free-recall", "self-explain", "question-queue", "return-checklist"])),
    ).not.toContain("W_OPENING");
    expect(codes(build("series", ["cover", "brain-dump", "question-queue", "return-checklist"]))).toContain(
      "W_OPENING",
    );
    expect(
      codes(
        build(
          "series",
          Array.from({ length: 7 }, () => "free-recall"),
        ),
      ),
    ).toContain("E_BUDGET");
  });

  it("keeps a ritual to one allowed page", () => {
    expect(codes(build("ritual", ["check-in"])).filter((c) => c.startsWith("E_"))).toEqual([]);
    expect(codes(build("ritual", ["check-in", "check-in"]))).toContain("E_BUDGET");
    expect(codes(build("ritual", ["brain-dump"]))).toContain("E_STYLE_ALLOW");
  });

  it("builds a proof with the action legend", () => {
    const r = build("proof", ["proof"], proofData);
    expect(codes(r).filter((c) => c.startsWith("E_"))).toEqual([]);
    expect(r.html).toContain("go deeper");
    expect(codes(build("proof", ["proof", "brain-dump"], proofData))).toContain("E_STYLE_ALLOW");
  });
});
