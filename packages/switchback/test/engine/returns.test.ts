import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";

const pages = [
  "cover",
  "ten-bad-ideas",
  "stimulus-die",
  "timer",
  "commit",
  "question-queue",
  "return-checklist",
].map((component, i) => ({ id: `W1-P${i + 1}`, component }));
const r = buildDocument({ switchback: 1, pages }, { embedFonts: false });

describe("pages that come back", () => {
  it("records returns per page in the sidecar", () => {
    expect(r.sidecar?.pages.map((p) => [p.id, p.returns])).toEqual([
      ["W1-P1", true],
      ["W1-P2", true],
      ["W1-P3", false],
      ["W1-P4", false],
      ["W1-P5", true],
      ["W1-P6", true],
      ["W1-P7", false],
    ]);
  });

  it("lists only returning pages on the return checklist by default", () => {
    const html = r.html ?? "";
    for (const id of ["W1-P1", "W1-P2", "W1-P5", "W1-P6"]) expect(html).toContain(`Photograph ${id} flat`);
    for (const id of ["W1-P3", "W1-P4", "W1-P7"]) expect(html).not.toContain(`Photograph ${id} flat`);
  });

  it("still honours an explicit shots list", () => {
    const withShots = pages.map((p) =>
      p.component === "return-checklist" ? { ...p, data: { shots: ["W1-P3"] } } : p,
    );
    const html = buildDocument({ switchback: 1, pages: withShots }, { embedFonts: false }).html ?? "";
    expect(html).toContain("Photograph W1-P3 flat");
    expect(html).not.toContain("Photograph W1-P1 flat");
  });
});
