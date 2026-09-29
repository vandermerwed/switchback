import { describe, expect, it } from "vitest";
import { buildDocument, renderComponent } from "../../src/engine/build";

describe("step-away", () => {
  const r = renderComponent("step-away", { embedFonts: false });
  it("prints the break instruction and the times to fill in", () => {
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    const html = r.html ?? "";
    expect(html).toContain("Stop here.");
    expect(html).toContain("Don&#39;t reread the pages before this one.");
    expect(html).toContain("Break started");
    expect(html).toContain("Back at");
    expect(html).toContain("What I did");
  });
  // Ruling R9: the page collects what surfaced during the break, and its readback checks the
  // break times, so it comes back (a deviation from spec §6, recorded in §13).
  it("comes back in photos", () => {
    expect(r.sidecar?.pages[0]?.returns).toBe(true);
  });
  it("is on an Incubation's return checklist", () => {
    const pages = [
      "cover",
      "ten-bad-ideas",
      "step-away",
      "matrix-2x2",
      "commit",
      "question-queue",
      "return-checklist",
    ].map((component, i) => ({ id: `W1-P${i + 1}`, component }));
    const b = buildDocument({ switchback: 1, style: "incubation", pages }, { embedFonts: false });
    expect(b.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(b.html).toContain("Photograph W1-P3 flat");
    expect(b.sidecar?.pages.find((p) => p.id === "W1-P3")?.returns).toBe(true);
  });
});
