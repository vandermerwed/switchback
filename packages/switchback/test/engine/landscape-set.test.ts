import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const LANDSCAPE = [
  "business-model-canvas",
  "lean-canvas",
  "kanban",
  "options-criteria",
  "assumption-audit",
  "goal-factoring",
  "perspective-swap",
  "timeline",
];
const PORTRAIT = [
  "matrix-2x2",
  "swot",
  "now-next-later",
  "dashboard",
  "pre-mortem",
  "cover",
  "question-queue",
];

describe("the landscape set", () => {
  it.each(LANDSCAPE)("%s prints landscape", (id) => {
    expect(renderComponent(id, { embedFonts: false }).sidecar?.pages[0]?.orientation).toBe("landscape");
  });

  it.each(PORTRAIT)("%s stays portrait", (id) => {
    expect(renderComponent(id, { embedFonts: false }).sidecar?.pages[0]?.orientation).toBe("portrait");
  });
});
