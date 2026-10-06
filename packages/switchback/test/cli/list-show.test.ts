import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { listCommand, listRows } from "../../src/cli/commands/list";
import { basisLines, showCommand } from "../../src/cli/commands/show";
import { captureIo } from "../../src/cli/io";
import { catalogueParts, createCatalogue, loadCatalogue } from "../../src/registry/catalogue";

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

describe("basis in show and list", () => {
  const cat = loadCatalogue();
  const zones = cat.components.get("zones")!.meta;
  const kanban = cat.presets.get("kanban")!;

  it("prints research-backed claims, using a preset's own grounding", () => {
    const lines = basisLines(zones, kanban);
    expect(lines[0]).toBe("basis:   research-backed");
    expect(lines.join("\n")).toContain(kanban.grounding!.helps);
    expect(lines.join("\n")).not.toContain(zones.grounding!.helps);
  });

  it("prints a practical template's origin and none of its base's claims", () => {
    const practical = { ...kanban, basis: "practice" as const, attribution: "A common board" };
    expect(basisLines(zones, practical)).toEqual(["basis:   practical template · A common board"]);
  });

  it("carries each row's basis, with a practice preset marked practice", () => {
    const parts = catalogueParts();
    const withPractical = createCatalogue({
      ...parts,
      presets: [
        ...parts.presets,
        {
          id: "plain-board",
          kind: "preset",
          extends: "zones",
          name: "Plain board",
          tags: ["plan"],
          data: {},
          attribution: "A common board",
          licence: "x",
          basis: "practice",
        },
      ],
    });
    const rows = listRows(withPractical, {});
    expect(rows.find((r) => r.id === "plain-board")?.basis).toBe("practice");
    expect(rows.find((r) => r.id === "kanban")?.basis).toBe("research");
  });

  it("filters list by basis and rejects an unknown one", async () => {
    const research = captureIo();
    await listCommand(["--basis", "research", "--json"], research, env);
    const rows = json(research) as Array<{ basis: string }>;
    expect(rows.length).toBeGreaterThan(40);
    expect(rows.every((r) => r.basis === "research")).toBe(true);
    const practice = captureIo();
    await listCommand(["--basis", "practice", "--json"], practice, env);
    expect(json(practice)).toEqual([]);
    await expect(listCommand(["--basis", "vibes"], captureIo(), env)).rejects.toThrow(/--basis/);
  });

  it("puts the basis in show --json and keeps a research preset's grounding", async () => {
    const io = captureIo();
    await showCommand(["kanban", "--json"], io, env);
    const out = json(io);
    expect(out.basis).toBe("research");
    expect(out.origin).toBeNull();
  });
});
