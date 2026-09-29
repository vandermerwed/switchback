import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { listCommand } from "../../src/cli/commands/list";
import { showCommand } from "../../src/cli/commands/show";
import { captureIo } from "../../src/cli/io";

const dir = mkdtempSync(join(tmpdir(), "switchback-list-"));
const env = { SWITCHBACK_CONFIG_DIR: dir };
const json = (io: ReturnType<typeof captureIo>) => JSON.parse(io.stdout.join("\n"));

describe("switchback list", () => {
  it("filters by kind and tag", async () => {
    const presets = captureIo();
    await listCommand(["--kind", "preset", "--json"], presets, env);
    expect(json(presets).map((r: { id: string }) => r.id)).toEqual([
      "business-model-canvas",
      "dashboard",
      "eisenhower",
      "impact-effort",
      "kanban",
      "lean-canvas",
      "now-next-later",
      "playmat",
      "power-interest",
      "start-stop-continue",
      "swot",
    ]);
    const create = captureIo();
    await listCommand(["--tag", "create", "--json"], create, env);
    const ids = json(create).map((r: { id: string }) => r.id);
    expect(ids).toContain("ten-bad-ideas");
    expect(ids).not.toContain("commit");
  });

  it("hides components the saved kit cannot support with --fits-kit", async () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "profile.json"),
      JSON.stringify({ version: 1, kit: { camera: false }, defaults: {} }),
    );
    const io = captureIo();
    await listCommand(["--fits-kit", "--json"], io, env);
    expect(json(io).map((r: { id: string }) => r.id)).not.toContain("return-checklist");
  });

  it("prints a readable table", async () => {
    const io = captureIo();
    expect(await listCommand([], io, env)).toBe(0);
    expect(io.stdout.join("\n")).toMatch(/pre-mortem\s+page\s+converge\s+decide, plan\s+Pre-mortem/);
  });

  it("rejects an unknown --kind or --phase as a usage error", async () => {
    await expect(listCommand(["--kind", "gadget"], captureIo(), env)).rejects.toThrow(/--kind/);
    await expect(listCommand(["--phase", "sideways"], captureIo(), env)).rejects.toThrow(/--phase/);
  });
});

describe("switchback show", () => {
  it("shows variants with whether the kit supports each", async () => {
    const io = captureIo();
    await showCommand(["card-sort", "--json"], io, { SWITCHBACK_CONFIG_DIR: join(dir, "none") });
    const out = json(io);
    expect(out.variants.map((v: { id: string; fits: boolean }) => [v.id, v.fits])).toEqual([
      ["cut-out", false],
      ["index-cards", false],
      ["write-in", true],
    ]);
  });

  it("resolves presets to their base", async () => {
    const io = captureIo();
    await showCommand(["eisenhower", "--json"], io, env);
    expect(json(io).component.id).toBe("matrix-2x2");
    expect(json(io).preset.id).toBe("eisenhower");
  });

  it("prints a readable summary and lists presets of a component", async () => {
    const io = captureIo();
    expect(await showCommand(["matrix-2x2"], io, env)).toBe(0);
    const text = io.stdout.join("\n");
    expect(text).toContain("variants:");
    expect(text).toMatch(/x_axis\s+string\[\] \(2–2\)/);
    expect(text).toContain("presets: eisenhower");
  });

  it("exits 1 for an unknown id", async () => {
    expect(await showCommand(["origami"], captureIo(), env)).toBe(1);
  });

  it("reports the rename for a renamed component instead of a bare unknown-id error", async () => {
    const tracker = captureIo();
    expect(await showCommand(["tracker"], tracker, env)).toBe(1);
    const trackerErr = tracker.stderr.join("\n");
    expect(trackerErr).toContain('"component": "scoresheet", "variant": "running"');
    expect(trackerErr).toContain("`rows` is now a list of labels, plus one `steps` number");
    expect(trackerErr).not.toContain("unknown component or preset");

    const meeple = captureIo();
    expect(await showCommand(["meeple"], meeple, env)).toBe(1);
    const meepleErr = meeple.stderr.join("\n");
    expect(meepleErr).toContain('"component": "perspective-swap", "variant": "tent"');
    expect(meepleErr).toContain("tent needs scissors in the kit; `labels` is now `roles` (max 3)");
    expect(meepleErr).not.toContain("unknown component or preset");
  });
});
