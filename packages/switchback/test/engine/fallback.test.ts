import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";

describe("a black-pen-only desk", () => {
  const spec = {
    switchback: 1,
    kit: { pens: [{ colour: "black" }], highlighter: false },
    pages: [
      {
        id: "W1-P1",
        component: "card-sort",
        data: { items: ["Offline mode"], columns: ["now", "later", "cut"] },
      },
    ],
  };

  it("falls back to write-in with a substitution warning, not an error", () => {
    const r = buildDocument(spec, { embedFonts: false });
    expect(r.html).not.toBeNull();
    expect(r.sidecar?.pages[0]?.variant).toBe("write-in");
    expect(r.sidecar?.substitutions).toEqual([
      { page: "W1-P1", component: "card-sort", wanted: "cut-out", used: "write-in", missing: ["scissors"] },
    ]);
    expect(r.diagnostics.map((d) => d.code)).toContain("W_SUBSTITUTION");
    expect(r.html).not.toContain('class="sb-scissors"');
  });
});
