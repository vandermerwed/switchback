import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { collectionsCommand } from "../../src/cli/commands/collections";
import { listCommand } from "../../src/cli/commands/list";
import { showCommand } from "../../src/cli/commands/show";
import { captureIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";

const env = { SWITCHBACK_CONFIG_DIR: mkdtempSync(join(tmpdir(), "switchback-collections-")) };
const json = (io: ReturnType<typeof captureIo>) => JSON.parse(io.stdout.join("\n"));

describe("switchback collections", () => {
  it("lists every collection with its template count and description", async () => {
    const io = captureIo();
    expect(await collectionsCommand([], io, env)).toBe(0);
    const text = io.stdout.join("\n");
    expect(text).toMatch(
      /^game-dev\s+11\s+Game Development: For designing, scoping and playtesting a game\.$/m,
    );
    expect(text).toMatch(/\n9 collections$/);
  });

  it("gives the members in --json, own templates first", async () => {
    const io = captureIo();
    await collectionsCommand(["--json"], io, env);
    const gameDev = json(io).find((c: { id: string }) => c.id === "game-dev");
    expect(gameDev.own).toEqual(["core-loop", "feature-cut", "game-one-pager", "playtest-notes"]);
    expect(gameDev.includes).toContain("ten-bad-ideas");
    expect(gameDev.count).toBe(11);
  });

  it("is a command the CLI knows", async () => {
    const io = captureIo();
    expect(await run(["--help"], io)).toBe(0);
    expect(io.stdout.join("\n")).toMatch(/collections/);
  });
});

describe("list --collection", () => {
  it("filters to a shelf and combines with the other filters", async () => {
    const io = captureIo();
    await listCommand(["--collection", "game-dev", "--basis", "practice", "--json"], io, env);
    expect(json(io).map((r: { id: string }) => r.id)).toEqual([
      "core-loop",
      "feature-cut",
      "game-one-pager",
      "playtest-notes",
    ]);
  });

  it("lists every template a shelf holds, the count `collections` gives", async () => {
    const shelves = captureIo();
    await collectionsCommand(["--json"], shelves, env);
    for (const shelf of json(shelves) as Array<{ id: string; count: number }>) {
      const io = captureIo();
      await listCommand(["--collection", shelf.id, "--json"], io, env);
      expect(json(io).length, shelf.id).toBe(shelf.count);
    }
  });

  it("refuses an unknown collection and points at the list", async () => {
    await expect(listCommand(["--collection", "gamedev"], captureIo(), env)).rejects.toThrow(
      /unknown collection "gamedev".*switchback collections/,
    );
  });
});

describe("show <collection>", () => {
  it("prints the shelf: description, own templates, includes and each one's basis", async () => {
    const io = captureIo();
    expect(await showCommand(["game-dev"], io, env)).toBe(0);
    const text = io.stdout.join("\n");
    expect(text).toMatch(/^Game Development \(game-dev\) · collection · 11 templates$/m);
    expect(text).toMatch(/^its own:\n {2}core-loop/m);
    expect(text).toMatch(/^ {2}feature-cut\s+Feature cut\s+practical$/m);
    expect(text).toMatch(/^includes:\n {2}ten-bad-ideas/m);
    expect(text).toMatch(/^ {2}pre-mortem\s+Pre-mortem\s+research-backed$/m);
  });

  it("gives the shelf in --json", async () => {
    const io = captureIo();
    await showCommand(["game-dev", "--json"], io, env);
    const out = json(io);
    expect(out.collection.id).toBe("game-dev");
    expect(out.templates[0]).toEqual({
      id: "core-loop",
      name: "Core loop",
      kind: "preset",
      basis: "practice",
      own: true,
    });
  });

  it("still reports an unknown id", async () => {
    const io = captureIo();
    expect(await showCommand(["no-such-thing"], io, env)).toBe(1);
    expect(io.stderr.join("\n")).toMatch(/unknown component, preset or collection: no-such-thing/);
  });
});

describe("show <template> names its collections", () => {
  it("in text and in --json", async () => {
    const text = captureIo();
    await showCommand(["kanban"], text, env);
    expect(text.stdout.join("\n")).toMatch(/^collections: planning, productivity$/m);
    const io = captureIo();
    await showCommand(["kanban", "--json"], io, env);
    expect(json(io).collections).toEqual(["planning", "productivity"]);
  });

  it("says nothing for a template on no shelf", async () => {
    const io = captureIo();
    await showCommand(["cover"], io, env);
    expect(io.stdout.join("\n")).not.toMatch(/^collections:/m);
  });

  it("prints a practical preset's attribution once", async () => {
    const io = captureIo();
    await showCommand(["feature-cut"], io, env);
    const text = io.stdout.join("\n");
    expect(text.split("Scope cutting by priority piles").length - 1).toBe(1);
    expect(text).toMatch(/^licence: idea; no restriction$/m);
  });
});
