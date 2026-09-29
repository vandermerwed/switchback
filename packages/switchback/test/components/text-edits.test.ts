import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { listCommand } from "../../src/cli/commands/list";
import { captureIo } from "../../src/cli/io";
import { renderComponent } from "../../src/engine/build";
import { loadCatalogue } from "../../src/registry/catalogue";

const html = (id: string) => renderComponent(id, { embedFonts: false }).html ?? "";

describe("approved text and layout edits", () => {
  it("puts the gut score before the criteria in options-criteria", () => {
    const out = html("options-criteria");
    expect(out.indexOf("Gut (first)")).toBeGreaterThan(-1);
    expect(out.indexOf("Gut (first)")).toBeLessThan(out.indexOf("Total"));
  });

  it("asks brain-dump for a next step, or 'none', beside each item", () => {
    expect(html("brain-dump")).toContain("next step, or &#39;none&#39;");
  });

  it("words the cover's phone and stop lines as design choices, not findings", () => {
    const out = html("cover");
    expect(out).toContain("so it can&#39;t interrupt");
    expect(out).toContain("where to pick up");
    expect(out).not.toContain("even mid-sentence");
  });

  it("hides sheet from listings", async () => {
    expect(loadCatalogue().components.get("sheet")?.meta.listed).toBe(false);

    const dir = mkdtempSync(join(tmpdir(), "switchback-text-edits-"));
    const io = captureIo();
    expect(await listCommand(["--json"], io, { SWITCHBACK_CONFIG_DIR: dir })).toBe(0);
    const ids = JSON.parse(io.stdout.join("\n")).map((r: { id: string }) => r.id);
    expect(ids).not.toContain("sheet");
  });
});
