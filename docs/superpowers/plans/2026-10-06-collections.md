# Collections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The catalogue is browsable by collection, a themed shelf of templates, in the CLI, the
skill and the site. A first practical collection, Game dev, ships with four templates that make
no research claim.

**Architecture:**
- A collection is a folder, `packages/switchback/collections/<id>/`. It holds a `collection.json`
  and, optionally, `presets/*.json` (the collection's own templates).
- Membership is by reference: `includes` names templates that live elsewhere. The reverse index
  ("which collections hold kanban?") is computed, never stored.
- Codegen bundles the collection files into `src/generated/components.ts`, exactly as it bundles
  components and presets. The CLI never reads them from disk at runtime.
- `createCatalogue` joins every collection's own presets into the one preset map, so `build`,
  `show`, `list` and the site treat them like any core preset.
- One small module, `src/registry/collections.ts`, answers "what is on this shelf" (`membersOf`)
  and "which shelves hold this template" (`collectionsOf`). The CLI and the site ask it.

**Tech Stack:** TypeScript, vitest, ajv JSON Schema, Astro + Starlight (site), node:test (site
tests).

**Spec:** `docs/superpowers/specs/2026-10-06-landscape-basis-collections-design.md`, Part C. It
builds on Part B (PR #44, `feat/research-basis`), because Game dev's templates are practical.

## Global Constraints

- `collection.json` has exactly these fields, with `additionalProperties: false`:
  - `id`: kebab-case, equal to the folder name;
  - `name`: required;
  - `description`: one line, at most 160 characters;
  - `includes`: required, a list of template ids (components or presets, from core or any
    collection);
  - `grounding`: optional collection-level claims, strict-checked when present and never
    inherited by members.
- A collection's own presets use the existing preset schema, with `basis` required.
- A template file lives in exactly one place. Collections point at it; nothing is copied.
- Diagnostics:
  - `E_COLLECTION_INCLUDE`: an `includes` id does not resolve to a template;
  - `E_DUPLICATE_ID` (exists already): an id is defined twice anywhere, across core components,
    core presets and every collection's presets;
  - `E_COLLECTION_ID`: a collection id clashes with a template id or another collection.
- Ruling (beyond the spec): a malformed `collection.json`, or one whose id differs from its
  folder, reports `E_COLLECTION_SCHEMA`. This matches `E_COMPONENT_SCHEMA` and
  `E_PRESET_SCHEMA`; the spec lists no code for a schema failure.
- Ruling (it deviates from the spec): `package.json` `files` does **not** gain `collections`.
  Codegen imports the JSON, and tsup bundles it into `dist`, the same way `components/` and
  `presets/`, which are not in `files` either, reach the npm package. Task 7 checks the built CLI
  lists the collections.
- Collections never fence anything off. Any template stays usable in any workbook.
- The workbook structure and generic pieces sit in no collection: cover, return-checklist,
  step-away, player-aid, tokens, zones, playmat.
- Conventional Commits, each ending with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Run vitest from `packages/switchback` as `pnpm exec vitest run <files>`.
  `pnpm --filter … exec vitest` misreports on this machine.
- Format new JSON with `npx biome format --write <paths>` from the repo root before committing.
- Before each commit, run:
  - `pnpm lint`;
  - `pnpm --filter @vandermerwed/switchback run typecheck`;
  - the task's tests.
- Work on branch `feat/collections`, stacked on `feat/research-basis`. Rebase onto `main` once
  PR #44 merges.
- Two minors deferred from Plan B's review are folded in here, because these tasks edit the
  same lines:
  - a practical preset shows its attribution twice (Tasks 4 and 6);
  - the README's `list` row lacks `--basis`, and `run.ts` and the README describe `show` as
    "…grounding" (Task 4).

## Review Focus

These are the five failure modes most likely to bite. Each has a test in the named task.

1. **Duplicate preset ids.** A collection's preset that reuses a core preset's id silently
   replaces it in the preset map. Validation must catch this with `E_DUPLICATE_ID`. Test in
   Task 2.
2. **Unknown includes.** A typo in `includes` must fail validation. It must never vanish from the
   shelf quietly. Test in Task 2.
3. **`show <collection-id>`.** It must resolve before the "unknown component" error, and an
   unknown id must still print that error and exit 1. Test in Task 4.
4. **Bad `--collection` values.** `list --collection <unknown>` must be a usage error (exit 2)
   that points at `switchback collections`, not an empty table. Test in Task 4.
5. **Broken site links.** Every link on the collection pages must resolve to a built page: each
   template link and each collection link. Test in Task 6.

---

### Task 1: Collections load

**Files:**
- Modify: `packages/switchback/src/engine/types.ts` (add `CollectionMeta`, `CollectionModule`)
- Modify: `packages/switchback/src/registry/schemas.ts` (add `collectionSchema`)
- Modify: `packages/switchback/src/registry/codegen.ts` (scan `collections/`)
- Modify: `packages/switchback/src/registry/catalogue.ts` (parts and catalogue gain collections)
- Create: `packages/switchback/src/registry/collections.ts` (`membersOf`, `collectionsOf`)
- Modify: `packages/switchback/src/index.ts` (export `membersOf` and `collectionsOf`)
- Regenerate: `packages/switchback/src/generated/components.ts` (`pnpm gen`)
- Test: `packages/switchback/test/registry/codegen.test.ts`,
  `packages/switchback/test/registry/collections.test.ts` (new)

**Interfaces:**
- Produces:
  ```ts
  // types.ts
  export interface CollectionMeta { id: string; name: string; description: string; includes: string[]; grounding?: Grounding; }
  export interface CollectionModule { dir: string; meta: CollectionMeta; presets: PresetMeta[]; }
  // catalogue.ts
  CatalogueParts.collections: CollectionModule[]
  Catalogue.collections: Map<string, CollectionModule>   // keyed by meta.id
  Catalogue.presets: Map<string, PresetMeta>             // core presets, then every collection's own
  // collections.ts
  export function membersOf(cat: Catalogue, collectionId: string): string[];
  export function collectionsOf(cat: Catalogue, templateId: string): string[];
  // generated/components.ts
  export const collections: CollectionModule[];
  ```

- [ ] **Step 1: Write the failing codegen test.** Append to `test/registry/codegen.test.ts`
  inside the `describe("generateIndex", …)` block:
  ```ts
  it("bundles each collection folder and its own presets", () => {
    const root = fixture('export const render = () => "";\n');
    const shelf = join(root, "collections", "shelf");
    mkdirSync(join(shelf, "presets"), { recursive: true });
    writeFileSync(join(shelf, "collection.json"), "{}");
    writeFileSync(join(shelf, "presets", "one-off.json"), "{}");
    mkdirSync(join(root, "collections", "no-file"), { recursive: true });
    const code = generateIndex(root);
    expect(code).toContain('import collection_shelf from "../../collections/shelf/collection.json";');
    expect(code).toContain(
      'import collection_shelf_preset_one_off from "../../collections/shelf/presets/one-off.json";',
    );
    expect(code).toContain(
      '  { dir: "shelf", meta: collection_shelf as unknown as CollectionModule["meta"], presets: [collection_shelf_preset_one_off as unknown as PresetMeta] },',
    );
    expect(code).not.toContain("no-file");
  });

  it("emits an empty collection list when there is no collections folder", () => {
    const code = generateIndex(fixture('export const render = () => "";\n'));
    expect(code).toContain("export const collections: CollectionModule[] = [\n];");
  });
  ```
- [ ] **Step 2: Write the failing catalogue and membership test.** Create
  `test/registry/collections.test.ts`:
  ```ts
  import { describe, expect, it } from "vitest";
  import type { CollectionModule } from "../../src/engine/types";
  import { catalogueParts, createCatalogue } from "../../src/registry/catalogue";
  import { collectionsOf, membersOf } from "../../src/registry/collections";

  const parts = catalogueParts();
  const own = {
    id: "board-one",
    kind: "preset" as const,
    extends: "zones",
    name: "Board one",
    tags: ["plan"],
    data: { zones: ["A", "B"] },
    attribution: "A common board",
    licence: "idea; no restriction",
    basis: "practice" as const,
  };
  const shelf = (id: string, includes: string[], presets = [] as CollectionModule["presets"]): CollectionModule => ({
    dir: id,
    meta: { id, name: id, description: `The ${id} shelf.`, includes },
    presets,
  });

  describe("collections in the catalogue", () => {
    const cat = createCatalogue({
      ...parts,
      collections: [shelf("alpha", ["kanban", "timeline", "board-one"], [own]), shelf("beta", ["kanban"])],
    });

    it("joins a collection's own presets into the preset map", () => {
      expect(cat.presets.get("board-one")).toEqual(own);
      expect(cat.presets.get("kanban")).toBeDefined();
      expect([...cat.collections.keys()]).toEqual(["alpha", "beta"]);
    });

    it("lists a shelf's own templates first, then what it includes, each once", () => {
      expect(membersOf(cat, "alpha")).toEqual(["board-one", "kanban", "timeline"]);
      expect(membersOf(cat, "nope")).toEqual([]);
    });

    it("computes which shelves hold a template", () => {
      expect(collectionsOf(cat, "kanban")).toEqual(["alpha", "beta"]);
      expect(collectionsOf(cat, "board-one")).toEqual(["alpha"]);
      expect(collectionsOf(cat, "cover")).toEqual([]);
    });

    it("defaults to no collections", () => {
      expect(createCatalogue({ components: parts.components }).collections.size).toBe(0);
    });
  });
  ```
- [ ] **Step 3: Run both and watch them fail.**
  `pnpm exec vitest run test/registry/codegen.test.ts test/registry/collections.test.ts`.
  Expected: FAIL. Codegen emits no collections, and `../../src/registry/collections` does not
  exist.
- [ ] **Step 4: Add the types.** In `src/engine/types.ts`, after `PresetMeta`:
  ```ts
  /** A themed shelf of templates. Membership is by reference: `includes` names templates that live elsewhere. */
  export interface CollectionMeta {
    id: string;
    name: string;
    description: string;
    includes: string[];
    /** Collection-level claims, strict-checked when present and never inherited by its members. */
    grounding?: Grounding;
  }

  export interface CollectionModule {
    /** The folder under collections/, which the id must match. */
    dir: string;
    meta: CollectionMeta;
    /** The collection's own templates: presets that live in its folder. */
    presets: PresetMeta[];
  }
  ```
- [ ] **Step 5: Add the schema.** In `src/registry/schemas.ts`, after `presetSchema`:
  ```ts
  export const collectionSchema = {
    type: "object",
    additionalProperties: false,
    required: ["id", "name", "description", "includes"],
    properties: {
      id: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
      name: { type: "string", minLength: 1 },
      description: { type: "string", minLength: 1, maxLength: 160 },
      includes: { type: "array", items: { type: "string", minLength: 1 }, uniqueItems: true },
      grounding: groundingSchema,
    },
  } as const;
  ```
- [ ] **Step 6: Extend codegen.** In `src/registry/codegen.ts`:
  - change the emitted type import to
    `'import type { CollectionModule, ComponentModule, PresetMeta } from "../engine/types";'`;
  - after the `presets` block, add:
    ```ts
    const collectionsDir = join(root, "collections");
    const collectionIds = existsSync(collectionsDir)
      ? readdirSync(collectionsDir, { withFileTypes: true })
          .filter((d) => d.isDirectory() && existsSync(join(collectionsDir, d.name, "collection.json")))
          .map((d) => d.name)
          .sort()
      : [];
    const collections = collectionIds.map((id) => {
      const v = ident(id);
      imports.push(`import collection_${v} from "../../collections/${id}/collection.json";`);
      const ownDir = join(collectionsDir, id, "presets");
      const own = existsSync(ownDir)
        ? readdirSync(ownDir)
            .filter((f) => f.endsWith(".json"))
            .sort()
        : [];
      const presetVars = own.map((file) => {
        const pv = `collection_${v}_preset_${ident(file.replace(/\.json$/, ""))}`;
        imports.push(`import ${pv} from "../../collections/${id}/presets/${file}";`);
        return `${pv} as unknown as PresetMeta`;
      });
      return `  { dir: ${JSON.stringify(id)}, meta: collection_${v} as unknown as CollectionModule["meta"], presets: [${presetVars.join(", ")}] },`;
    });
    ```
  - in the returned lines, after the `presets` export and its blank line, add
    `"export const collections: CollectionModule[] = [", ...collections, "];", "",`.
- [ ] **Step 7: Extend the catalogue.** In `src/registry/catalogue.ts`:
  - import `collections` from `../generated/components` and `CollectionModule` from the types;
  - add `collections: CollectionModule[]` to `CatalogueParts`;
  - add `collections: Map<string, CollectionModule>` to `Catalogue`, and a doc comment on
    `presets`: `/** Core presets, then every collection's own presets, by id. */`;
  - in `catalogueParts()`, return `collections` too;
  - in `createCatalogue`:
    ```ts
    const collections = parts.collections ?? [];
    return {
      components: new Map(parts.components.map((c) => [c.meta.id, c])),
      presets: new Map(
        [...(parts.presets ?? []), ...collections.flatMap((c) => c.presets)].map((p) => [p.id, p]),
      ),
      collections: new Map(collections.map((c) => [c.meta.id, c])),
      registries: parts.registries ?? loadRegistries(),
      skipped: parts.skipped ?? [],
    };
    ```
- [ ] **Step 8: Add the membership helpers.** Create `src/registry/collections.ts`:
  ```ts
  import type { Catalogue } from "./catalogue";

  /** A collection's templates: its own presets first, then what it includes, each once. */
  export function membersOf(cat: Catalogue, collectionId: string): string[] {
    const c = cat.collections.get(collectionId);
    if (!c) return [];
    return [...new Set([...c.presets.map((p) => p.id), ...c.meta.includes])];
  }

  /** The collections a template sits on, computed from the shelves, so nobody maintains both sides. */
  export function collectionsOf(cat: Catalogue, templateId: string): string[] {
    return [...cat.collections.keys()].filter((id) => membersOf(cat, id).includes(templateId)).sort();
  }
  ```
  Export both from `src/index.ts`:
  `export { collectionsOf, membersOf } from "./registry/collections";`.
- [ ] **Step 9: Regenerate, then run the tests.** Run `pnpm gen`, then
  `pnpm exec vitest run test/registry && pnpm --filter @vandermerwed/switchback run typecheck` (the
  typecheck from the repo root). Expected: PASS. With no `collections/` folder yet, the generated
  file ends with an empty `collections` list.
- [ ] **Step 10: Commit.** `feat(cli): collections load from folders, by reference`

---

### Task 2: Collections validate

**Files:**
- Modify: `packages/switchback/src/registry/validate.ts`
- Modify: `packages/switchback/docs/errors.md`
- Test: `packages/switchback/test/registry/validate.test.ts`

**Interfaces:**
- Consumes: `CatalogueParts.collections`, `collectionSchema`, `CollectionModule.dir` (Task 1).
- Produces: the diagnostics `E_COLLECTION_SCHEMA`, `E_COLLECTION_INCLUDE` and `E_COLLECTION_ID`;
  `E_DUPLICATE_ID` across collection presets; `E_PRESET_SCHEMA` for a collection preset with no
  `basis`.

- [ ] **Step 1: Write the failing tests.** Append to `test/registry/validate.test.ts`:
  ```ts
  describe("collections", () => {
    const preset = (id: string, extra: Record<string, unknown> = {}) => ({
      id,
      kind: "preset" as const,
      extends: "zones",
      name: id,
      tags: ["plan"],
      data: { zones: ["A", "B"] },
      attribution: "A common board",
      licence: "idea; no restriction",
      basis: "practice" as const,
      ...extra,
    });
    const shelf = (id: string, includes: string[], presets: ReturnType<typeof preset>[] = [], dir = id) => ({
      dir,
      meta: { id, name: id, description: `The ${id} shelf.`, includes },
      presets,
    });
    const run = (collections: ReturnType<typeof shelf>[], strict = false) =>
      validateRegistry({ ...parts, collections }, { strict });

    it("passes a shelf of core templates and its own practical preset, in strict mode too", () => {
      const ok = [shelf("alpha", ["kanban", "timeline"], [preset("board-one")])];
      expect(run(ok)).toEqual([]);
      expect(run(ok, true)).toEqual([]);
    });

    it("rejects an include that names no template", () => {
      const found = run([shelf("alpha", ["kanban", "kanbna"])]).filter((d) => d.code === "E_COLLECTION_INCLUDE");
      expect(found.map((d) => [d.path, d.message])).toEqual([
        ["collections/alpha/collection.json", 'collection alpha includes unknown template "kanbna"'],
      ]);
    });

    it("rejects a collection id that is a template's or another collection's", () => {
      const found = run([shelf("kanban", []), shelf("alpha", []), shelf("alpha", [], [], "alpha-2")]);
      expect(found.filter((d) => d.code === "E_COLLECTION_ID").map((d) => d.path)).toEqual([
        "collections/kanban/collection.json",
        "collections/alpha-2/collection.json",
      ]);
    });

    it("rejects a collection preset whose id is already taken", () => {
      const found = run([shelf("alpha", [], [preset("kanban")])]);
      expect(found.filter((d) => d.code === "E_DUPLICATE_ID").map((d) => d.path)).toEqual([
        "collections/alpha/presets/kanban.json",
      ]);
    });

    it("requires a basis on a collection's own preset", () => {
      const { basis: _basis, ...bare } = preset("board-one");
      const found = run([shelf("alpha", [], [bare as ReturnType<typeof preset>])]);
      expect(found.filter((d) => d.code === "E_PRESET_SCHEMA").map((d) => d.path)).toEqual([
        "collections/alpha/presets/board-one.json",
      ]);
    });

    it("rejects a malformed collection.json, or one whose id is not its folder's", () => {
      const bad = shelf("alpha", []);
      (bad.meta as Record<string, unknown>).colour = "red";
      const moved = shelf("beta", [], [], "gamma");
      const found = run([bad, moved]).filter((d) => d.code === "E_COLLECTION_SCHEMA");
      expect(found.map((d) => d.path)).toEqual([
        "collections/alpha/collection.json",
        "collections/gamma/collection.json",
      ]);
    });

    it("checks a collection's own grounding when it has one", () => {
      const claimed = shelf("alpha", []);
      (claimed.meta as Record<string, unknown>).grounding = { claims: "none" };
      expect(codes(run([claimed]))).toContain("E_GROUNDING_SCHEMA");
    });
  });
  ```
- [ ] **Step 2: Run the tests and watch them fail.**
  `pnpm exec vitest run test/registry/validate.test.ts`. Expected: the new `collections` tests
  FAIL, because validation ignores collections.
- [ ] **Step 3: Implement.** In `src/registry/validate.ts`:
  - compile `const validateCollection = ajv.compile(collectionSchema);` beside the others, and
    import `collectionSchema`;
  - replace the body of `for (const p of parts.presets) { … }` with a call to a local
    `checkPreset(p, path, ownedBy)`. It keeps today's checks in the same order, and adds one at
    the top for a collection's own preset (`ownedBy` is the collection id, or `null` for core):
    ```ts
    if (ownedBy && p.basis === undefined)
      out.push(
        error(
          "E_PRESET_SCHEMA",
          `${p.id} is collection ${ownedBy}'s own template and must declare its basis`,
          'add "basis": "research" or "basis": "practice"',
          { path },
        ),
      );
    ```
    Core presets run as `checkPreset(p, \`presets/${p.id}.json\`, null)`. Each collection's
    presets run as
    `checkPreset(p, \`collections/${c.dir}/presets/${p.id}.json\`, c.dir)`. Because
    `unique(p.id, path)` runs inside `checkPreset`, `E_DUPLICATE_ID` now covers every preset
    everywhere.
  - after the presets, add the collection checks:
    ```ts
    const templateIds = new Set([...cat.components.keys(), ...cat.presets.keys()]);
    const collectionIds = new Set<string>();
    for (const c of parts.collections ?? []) {
      const path = `collections/${c.dir}/collection.json`;
      const m = c.meta;
      if (!validateCollection(m as unknown)) {
        for (const e of validateCollection.errors ?? []) {
          const extra = e.keyword === "additionalProperties" ? ` (${e.params.additionalProperty})` : "";
          out.push(
            error(
              "E_COLLECTION_SCHEMA",
              `collection ${c.dir}${e.instancePath} ${e.message ?? "is invalid"}${extra}`,
              "fix collection.json to match the collection schema (see docs/errors.md)",
              { path },
            ),
          );
        }
        continue;
      }
      if (m.id !== c.dir)
        out.push(
          error(
            "E_COLLECTION_SCHEMA",
            `collection folder ${c.dir} holds id "${m.id}"`,
            "rename the folder or the id, so they match",
            { path },
          ),
        );
      if (templateIds.has(m.id) || collectionIds.has(m.id))
        out.push(
          error(
            "E_COLLECTION_ID",
            `collection ${m.id} has the same id as ${templateIds.has(m.id) ? "a template" : "another collection"}`,
            "give the collection an id no template or other collection uses",
            { path },
          ),
        );
      collectionIds.add(m.id);
      for (const id of m.includes)
        if (!templateIds.has(id))
          out.push(
            error(
              "E_COLLECTION_INCLUDE",
              `collection ${m.id} includes unknown template "${id}"`,
              "name a component or preset id (`switchback list --all`)",
              { path },
            ),
          );
      out.push(...checkGroundingShape(`collection ${m.id}`, m.grounding, path));
      if (opts.strict && m.grounding) out.push(...strictGrounding(`collection ${m.id}`, m.grounding, path));
    }
    ```
  - `CatalogueParts.collections` is required, so `parts.collections ?? []` is belt and braces
    for callers that build parts by hand. Keep it.
- [ ] **Step 4: Document the codes.** In `docs/errors.md`:
  - **Spec errors:** change the `E_DUPLICATE_ID` row's meaning to "Two pages share an id, or two
    registry entries do (components, presets and every collection's own presets share one
    namespace)."
  - **Registry errors:** add three rows after `E_PRESET_SCHEMA`:
    - `E_COLLECTION_SCHEMA`: "A `collections/<id>/collection.json` does not match the collection
      schema (`id`, `name`, `description` of at most 160 characters, `includes`, optional
      `grounding`), or its id is not its folder's name.";
    - `E_COLLECTION_INCLUDE`: "A collection's `includes` names a template that does not exist.
      Use a component or preset id from `switchback list --all`.";
    - `E_COLLECTION_ID`: "A collection's id is already a template's, or another collection's."
  - In the `E_PRESET_SCHEMA` row, add: "A collection's own preset must also declare its `basis`."
- [ ] **Step 5: Run the tests.**
  `pnpm exec vitest run test/registry test/docs`. Expected: PASS, including `errors.test.ts`,
  which checks every code is documented.
- [ ] **Step 6: Commit.** `feat(cli): validate collections, their includes and their ids`

---

### Task 3: The first shelf

**Files:**
- Create: `packages/switchback/collections/{planning,productivity,business,product,systems-thinking,design,engineering,learning,game-dev}/collection.json`
- Create: `packages/switchback/collections/game-dev/presets/{game-one-pager,core-loop,playtest-notes,feature-cut}.json`
- Modify: `packages/switchback/src/cli/commands/validate.ts` (the `ok:` line counts collections)
- Regenerate: `packages/switchback/src/generated/components.ts`
- Test: `packages/switchback/test/registry/shelf.test.ts` (new),
  `packages/switchback/test/cli/validate.test.ts`, `packages/switchback/test/cli/list-show.test.ts`

**Interfaces:**
- Consumes: Tasks 1 and 2.
- Produces: nine collections and four practical presets, which Tasks 4 and 6 read by id.

- [ ] **Step 1: Write the failing shelf test.** Create `test/registry/shelf.test.ts`:
  ```ts
  import { describe, expect, it } from "vitest";
  import { renderComponent } from "../../src/engine/build";
  import { loadCatalogue } from "../../src/registry/catalogue";
  import { collectionsOf } from "../../src/registry/collections";

  const cat = loadCatalogue();
  const OFF_SHELF = ["cover", "return-checklist", "step-away", "player-aid", "tokens", "zones", "playmat"];

  describe("the first shelf", () => {
    it("has the eight sorted collections and Game dev", () => {
      expect([...cat.collections.keys()]).toEqual([
        "business",
        "design",
        "engineering",
        "game-dev",
        "learning",
        "planning",
        "product",
        "productivity",
        "systems-thinking",
      ]);
    });

    it("keeps the workbook structure and generic pieces off every shelf", () => {
      for (const id of OFF_SHELF) expect(collectionsOf(cat, id), id).toEqual([]);
    });

    it("puts every other template on at least one shelf", () => {
      const ids = [...cat.components.keys(), ...cat.presets.keys()].filter((id) => !OFF_SHELF.includes(id));
      expect(ids.filter((id) => collectionsOf(cat, id).length === 0)).toEqual([]);
    });

    it("gives Game dev four practical presets of existing components", () => {
      const own = cat.collections.get("game-dev")!.presets;
      expect(own.map((p) => [p.id, p.extends, p.basis])).toEqual([
        ["core-loop", "node-map", "practice"],
        ["feature-cut", "card-sort", "practice"],
        ["game-one-pager", "zones", "practice"],
        ["playtest-notes", "zones", "practice"],
      ]);
      for (const p of own) {
        expect(p.grounding, p.id).toBeUndefined();
        expect(p.licence, p.id).toBe("idea; no restriction");
      }
    });

    it("prints each Game dev template whole, in its orientation", () => {
      const expected = {
        "game-one-pager": "landscape",
        "feature-cut": "landscape",
        "core-loop": "portrait",
        "playtest-notes": "portrait",
      };
      for (const [id, orientation] of Object.entries(expected)) {
        const r = renderComponent(id, { embedFonts: false });
        expect(r.diagnostics, id).toEqual([]);
        expect(r.sidecar?.pages[0]?.orientation, id).toBe(orientation);
      }
    });
  });
  ```
- [ ] **Step 2: Run it and watch it fail.** `pnpm exec vitest run test/registry/shelf.test.ts`.
  Expected: FAIL, because there are no collections.
- [ ] **Step 3: Write the eight sorted collections.** One `collection.json` per folder, each in
  this shape:
  `{ "id": "<id>", "name": "<name>", "description": "<description>", "includes": [<ids>] }`.

  | id | name | description | includes |
  | --- | --- | --- | --- |
  | `planning` | Planning | For deciding what to do, in what order, and what could go wrong. | now-next-later, kanban, timeline, card-sort, impact-effort, eisenhower, pre-mortem, forecast, small-experiment, mental-contrast, commit |
  | `productivity` | Productivity | For focus, priorities and keeping work moving. | eisenhower, kanban, dashboard, check-in, brain-dump, timer, scoresheet, start-stop-continue, goal-factoring, worst-case |
  | `business` | Business | For business models, stakeholders and the bets a business makes. | business-model-canvas, lean-canvas, swot, power-interest, options-criteria, assumption-audit, pre-mortem, forecast |
  | `product` | Product | For choosing what to build, testing assumptions and scoping. | lean-canvas, assumption-audit, impact-effort, options-criteria, small-experiment, pre-mortem, card-sort, perspective-swap, now-next-later |
  | `systems-thinking` | Systems Thinking | For seeing causes, connections and constraints. | node-map, five-whys, frame-by-frame, goal-factoring, constraint-removal, assumption-audit |
  | `design` | Design | For generating ideas, reframing problems and sorting what you have. | ten-bad-ideas, forced-connections, stimulus-die, constraint-removal, perspective-swap, brain-dump, card-sort, matrix-2x2 |
  | `engineering` | Engineering | For technical decisions, root causes and reviewing work. | sheet, proof, five-whys, pre-mortem, assumption-audit, frame-by-frame, options-criteria, question-queue |
  | `learning` | Learning | For studying, recalling and checking what you understand. | free-recall, feynman, self-explain, practice-audit, question-queue, node-map |

  Keep each `includes` list in the table's order. It is the order the shelf shows.
- [ ] **Step 4: Write Game dev.** `collections/game-dev/collection.json`:
  ```json
  {
    "id": "game-dev",
    "name": "Game dev",
    "description": "For designing, scoping and playtesting a game.",
    "includes": ["ten-bad-ideas", "forced-connections", "stimulus-die", "pre-mortem", "impact-effort", "small-experiment", "timeline"]
  }
  ```
  Then its four presets in `collections/game-dev/presets/`. Every one has
  `"kind": "preset"`, `"basis": "practice"` and `"licence": "idea; no restriction"`.
  - `game-one-pager.json`. Zones on a three-row layout, so the zones rule prints it landscape. The
    pitch runs across most of the top, and the core loop is the largest zone (8 cells):
    ```json
    {
      "id": "game-one-pager",
      "kind": "preset",
      "extends": "zones",
      "name": "Game one-pager",
      "tags": ["plan", "create"],
      "basis": "practice",
      "data": {
        "zones": ["Pitch", "Biggest risk", "Core fantasy", "Core loop", "Win and lose", "Art and sound", "Player verbs", "Scope: in and out"],
        "layout": [
          { "col": 1, "row": 1, "colSpan": 7 },
          { "col": 8, "row": 1, "colSpan": 3 },
          { "col": 1, "row": 2, "colSpan": 2 },
          { "col": 3, "row": 2, "colSpan": 4, "rowSpan": 2 },
          { "col": 7, "row": 2, "colSpan": 2 },
          { "col": 9, "row": 2, "colSpan": 2, "rowSpan": 2 },
          { "col": 1, "row": 3, "colSpan": 2 },
          { "col": 7, "row": 3, "colSpan": 2 }
        ]
      },
      "attribution": "The one-page game design document, a common studio format",
      "licence": "idea; no restriction"
    }
    ```
  - `core-loop.json`: extends `node-map`, name "Core loop", tags `["create", "diagnose"]`, data
    `{ "center": "Core loop", "hint": "One step of the loop per circle: what the player does, gets, grows and comes back for. Label every arrow with a verb." }`,
    attribution "The core loop diagram, common across game design".
  - `playtest-notes.json`: extends `zones`, name "Playtest notes", tags `["review", "reflect"]`,
    data
    `{ "zones": ["What players did", "Where they got stuck", "What they said", "Moments of fun", "Bugs and rough edges", "Change before next test"], "columns": 2 }`,
    attribution "Playtest observation sheets, common practice in game design".
  - `feature-cut.json`: extends `card-sort`, name "Feature cut", tags `["decide", "plan"]`, data
    `{ "source": "your feature list", "columns": ["Must have", "Nice to have", "Cut"] }`,
    attribution "Scope cutting by priority piles, common practice".
- [ ] **Step 5: Format and regenerate.** From the repo root, run
  `npx biome format --write packages/switchback/collections`, then `pnpm --filter @vandermerwed/switchback run gen`.
- [ ] **Step 6: Count collections in `validate`.** In `src/cli/commands/validate.ts`, the
  success line counts every preset (core and collections') and the collections:
  ```ts
  const presetCount = parts.presets.length + parts.collections.reduce((n, c) => n + c.presets.length, 0);
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  // ok: 37 components, 15 presets, 9 collections (strict)
  `ok: ${plural(parts.components.length, "component")}, ${plural(presetCount, "preset")}, ${plural(parts.collections.length, "collection")}${values.strict ? " (strict)" : ""}`
  ```
  Update `test/cli/validate.test.ts` lines 15 and 21 to
  `/^ok: 37 components, 15 presets, 9 collections/` and
  `/^ok: 37 components, 15 presets, 9 collections \(strict\)/`.
- [ ] **Step 7: Update the preset list test.** In `test/cli/list-show.test.ts`, the
  `--kind preset` expectation gains the four Game dev presets after the eleven core ones, in
  file order: `"core-loop", "feature-cut", "game-one-pager", "playtest-notes"`.
- [ ] **Step 8: Run the tests.**
  `pnpm exec vitest run test/registry test/cli test/components/render.test.ts`, then
  `CI=true pnpm exec vitest run test/e2e/layout.test.ts`. The e2e test checks every preset on A4
  and Letter for overflow in a real browser, and it skips without one. Then run `pnpm validate`
  from the repo root. Expected:
  - the tests PASS;
  - `ok: 37 components, 15 presets, 9 collections (strict)`.

  If a Game dev preset overflows, shorten its labels. Never shrink the grid.
- [ ] **Step 9: Commit.** `feat(catalogue): the first shelf, and Game dev's practical templates`

---

### Task 4: The CLI browses collections

**Files:**
- Create: `packages/switchback/src/cli/commands/collections.ts`
- Modify: `packages/switchback/src/cli/commands/list.ts` (`--collection`)
- Modify: `packages/switchback/src/cli/commands/show.ts` (a collection; a template's `collections:`)
- Modify: `packages/switchback/src/cli/run.ts` (register the command; USAGE)
- Modify: `packages/switchback/README.md` (the command table)
- Test: `packages/switchback/test/cli/collections.test.ts` (new),
  `packages/switchback/test/cli/list-show.test.ts`

**Interfaces:**
- Consumes: `membersOf`, `collectionsOf` (Task 1); the shelf (Task 3); `basisOf` (Plan B).
- Produces:
  ```ts
  export interface CollectionRow { id: string; name: string; description: string; count: number; own: string[]; includes: string[] }
  export function collectionRows(cat: Catalogue): CollectionRow[];
  export async function collectionsCommand(argv: string[], io: Io, env: NodeJS.ProcessEnv): Promise<number>;
  // show.ts
  export function showCollectionJson(cat: Catalogue, id: string): { collection: CollectionMeta; templates: Array<{ id: string; name: string; kind: string; basis: Basis; own: boolean }> } | null;
  // showJson(...) gains `collections: string[]`
  ```

- [ ] **Step 1: Write the failing tests.** Create `test/cli/collections.test.ts`:
  ```ts
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
      expect(text).toMatch(/^game-dev\s+11\s+Game dev: For designing, scoping and playtesting a game\.$/m);
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
      expect(text).toMatch(/^Game dev \(game-dev\) · collection · 11 templates$/m);
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
  ```
- [ ] **Step 2: Run them and watch them fail.**
  `pnpm exec vitest run test/cli/collections.test.ts`. Expected: FAIL, because
  `../../src/cli/commands/collections` does not exist.
- [ ] **Step 3: Write `collections.ts`.**
  ```ts
  import type { Catalogue } from "../../registry/catalogue";
  import { loadCatalogue } from "../../registry/catalogue";
  import { membersOf } from "../../registry/collections";
  import { parseCommand } from "../args";
  import type { Io } from "../io";

  const USAGE = "usage: switchback collections [--json]";

  export interface CollectionRow {
    id: string;
    name: string;
    description: string;
    count: number;
    own: string[];
    includes: string[];
  }

  /** One row per collection: what it is for and how many templates it holds. */
  export function collectionRows(cat: Catalogue): CollectionRow[] {
    return [...cat.collections.values()].map((c) => ({
      id: c.meta.id,
      name: c.meta.name,
      description: c.meta.description,
      count: membersOf(cat, c.meta.id).length,
      own: c.presets.map((p) => p.id),
      includes: c.meta.includes,
    }));
  }

  export async function collectionsCommand(argv: string[], io: Io, _env: NodeJS.ProcessEnv): Promise<number> {
    const { values } = parseCommand(argv, { json: { type: "boolean" } }, USAGE);
    if (values.help) {
      io.out(USAGE);
      return 0;
    }
    const rows = collectionRows(loadCatalogue());
    if (values.json) {
      io.out(JSON.stringify(rows, null, 2));
      return 0;
    }
    const idWidth = Math.max(...rows.map((r) => r.id.length), 2);
    const countWidth = Math.max(...rows.map((r) => String(r.count).length));
    for (const r of rows)
      io.out(`${r.id.padEnd(idWidth)}  ${String(r.count).padStart(countWidth)}  ${r.name}: ${r.description}`);
    io.out(`\n${rows.length} collection${rows.length === 1 ? "" : "s"}`);
    return 0;
  }
  ```
  Then register it in `src/cli/run.ts`:
  - `import { collectionsCommand } from "./commands/collections";`;
  - add `collections: collectionsCommand,` to `COMMANDS`;
  - in `USAGE`:
    - after the `list` line, add `  collections the themed shelves of templates`;
    - change `list` to `  list        browse templates (components and presets)`;
    - change `show` to `  show <id>   a template's contract, or a collection's templates`.
- [ ] **Step 4: Add `--collection` to `list`.** In `src/cli/commands/list.ts`:
  - add `[--collection ID]` to `USAGE` after `--basis`;
  - add `collection: { type: "string" },` to the parsed options;
  - after the `--basis` check, add:
    ```ts
    const cat = loadCatalogue();
    if (values.collection !== undefined && !cat.collections.has(values.collection as string))
      throw new UsageError(
        `unknown collection "${values.collection}"; see \`switchback collections\` for the shelves`,
      );
    const onShelf = values.collection ? new Set(membersOf(cat, values.collection as string)) : null;
    ```
    Then move the existing `const cat = loadCatalogue();` up to this point, so it is defined once.
  - add `.filter((r) => !onShelf || onShelf.has(r.id))` after the `--basis` filter;
  - import `membersOf` from `../../registry/collections`.
- [ ] **Step 5: Show collections.** In `src/cli/commands/show.ts`:
  - import `collectionsOf, membersOf` from `../../registry/collections`, and `CollectionMeta` and
    `Basis` from the types;
  - add `collections: collectionsOf(cat, resolved.preset?.id ?? meta.id),` to the `showJson`
    return value, after `grounding`;
  - add the collection view:
    ```ts
    /** What `show <collection-id> --json` prints: the shelf, and each template on it with its basis. */
    export function showCollectionJson(cat: Catalogue, id: string) {
      const c = cat.collections.get(id);
      if (!c) return null;
      const own = new Set(c.presets.map((p) => p.id));
      const templates = membersOf(cat, id).flatMap((tid) => {
        const r = resolveComponent(cat, tid);
        if (!r) return [];
        return [
          {
            id: tid,
            name: r.preset?.name ?? r.base.meta.name,
            kind: r.preset ? "preset" : r.base.meta.kind,
            basis: basisOf(r.base.meta, r.preset),
            own: own.has(tid),
          },
        ];
      });
      return { collection: c.meta, templates };
    }
    ```
  - in `showCommand`, right after `const cat = loadCatalogue();` and before
    `resolveComponent`, print a collection when the id is one:
    ```ts
    const shelf = showCollectionJson(cat, id);
    if (shelf) {
      if (values.json) {
        io.out(JSON.stringify(shelf, null, 2));
        return 0;
      }
      const { collection, templates } = shelf;
      const idWidth = Math.max(...templates.map((t) => t.id.length));
      const nameWidth = Math.max(...templates.map((t) => t.name.length));
      const row = (t: (typeof templates)[number]) =>
        `  ${t.id.padEnd(idWidth)}  ${t.name.padEnd(nameWidth)}  ${t.basis === "practice" ? "practical" : "research-backed"}`;
      const lines = [
        `${collection.name} (${collection.id}) · collection · ${templates.length} templates`,
        collection.description,
      ];
      const own = templates.filter((t) => t.own);
      if (own.length) lines.push("its own:", ...own.map(row));
      const included = templates.filter((t) => !t.own);
      if (included.length) lines.push("includes:", ...included.map(row));
      for (const line of lines) io.out(line);
      return 0;
    }
    ```
  - change the not-found message to
    `` `unknown component, preset or collection: ${id}. Try \`switchback list\` or \`switchback collections\`.` ``;
  - change `USAGE` to
    `"usage: switchback show <template-or-collection-id> [--json]"`;
  - in the text view, add a `collections:` line after `tags:`, only when the template is on a
    shelf:
    ```ts
    const shelves = collectionsOf(cat, preset?.id ?? meta.id);
    ```
    and push `` `collections: ${shelves.join(", ")}` `` when `shelves.length` is non-zero;
  - **The attribution prints once (a deferred Plan B minor).** For a practical preset, the
    basis line already carries the attribution as its origin. So the preset block prints
    `` `licence: ${preset.licence}` `` instead of `` `attribution: … · licence: …` ``, when
    `basisOf(meta, preset) === "practice"`.
- [ ] **Step 6: Update the README's command table.** In `packages/switchback/README.md`:
  - make the `list` row
    `` | `list [--kind] [--tag] [--phase] [--basis] [--collection] [--fits-kit] [--json]` | browse templates (components and presets) | ``;
  - make the `show` row
    `` | `show <id> [--json]` | a template's contract, variants, data and what it rests on; or a collection's templates | ``;
  - add after `list`:
    `` | `collections [--json]` | the themed shelves of templates, with counts | ``.
- [ ] **Step 7: Run the tests.**
  `pnpm exec vitest run test/cli test/docs`. Expected: PASS. The README test checks that `|` is
  escaped inside code spans, and the new rows have no `|` inside code.
- [ ] **Step 8: Commit.** `feat(cli): browse collections with collections, list --collection and show`

---

### Task 5: The skill uses collections

**Files:**
- Modify: `skills/switchback/references/workbook.md`, section 4 "Compose with the CLI"
- Modify: `skills/switchback/SKILL.md`, the "CLI is the source of truth" rule

- [ ] **Step 1: Add the step.** In `workbook.md`, section 4, insert before item 1 and renumber
  the rest:
  ```md
  1. **A shelf first, when one fits.** If the request is about an area a collection covers (game
     design, product, learning…), run `switchback collections`, then
     `switchback list --collection <id> --json --fits-kit`. Prefer that collection's templates
     where they fit the job, and name the collection in the confirmation message. A collection
     never fences anything off: any template stays usable in any workbook. If `collections` is an
     unknown command, the CLI predates collections, so skip this step.
  ```
- [ ] **Step 2: Name the command.** In `SKILL.md`, change
  `` `switchback list`, `switchback show`, `switchback legend` `` to
  `` `switchback list`, `switchback collections`, `switchback show`, `switchback legend` ``.
- [ ] **Step 3: Lint.** `pnpm lint`. Expected: "ok: 1 skill".
- [ ] **Step 4: Commit.** `docs(skill): draw from a collection when the request fits one`

---

### Task 6: The site shows collections

**Files:**
- Modify: `site/scripts/generate.mjs` (entries gain `collections`; write `collections.json`; the
  CLI list gains `collections`)
- Create: `site/src/components/PagePreview.astro` (the fitted preview, shared)
- Modify: `site/src/pages/docs/components/[id].astro` (use `PagePreview`; "In collections";
  attribution once)
- Create: `site/src/pages/docs/collections/index.astro`
- Create: `site/src/pages/docs/collections/[id].astro`
- Modify: `site/astro.config.mjs` (sidebar)
- Test: `site/tests/catalogue.test.mjs`

**Interfaces:**
- Consumes: `collectionsOf`, `membersOf` from `@vandermerwed/switchback` (Task 1); the shelf
  (Task 3).
- Produces: `site/src/generated/collections.json`, in the form
  `[{ id, name, description, own: string[], members: string[] }]`. Each catalogue entry gains
  `collections: string[]`.

- [ ] **Step 1: Write the failing site tests.** Append to `site/tests/catalogue.test.mjs`:
  ```js
  test("every collection has a page, and the index lists them all", () => {
    const shelves = [...catalogue.collections.keys()];
    assert.equal(shelves.length, 9);
    const index = readFileSync(new URL("docs/collections/index.html", dist), "utf8");
    for (const id of shelves) {
      assert.ok(existsSync(new URL(`docs/collections/${id}/index.html`, dist)), `docs/collections/${id}/`);
      assert.ok(index.includes(`href="/docs/collections/${id}/"`), `index links ${id}`);
    }
  });

  test("every link on a collection page resolves to a built page", () => {
    for (const id of catalogue.collections.keys()) {
      const html = readFileSync(new URL(`docs/collections/${id}/index.html`, dist), "utf8");
      const links = [...html.matchAll(/href="\/docs\/(components|collections)\/([a-z0-9-]+)\/"/g)];
      assert.ok(links.length > 0, `${id} links its templates`);
      for (const [, kind, target] of links)
        assert.ok(existsSync(new URL(`docs/${kind}/${target}/index.html`, dist)), `${id} → ${kind}/${target}`);
    }
  });

  test("a collection page shows each template's basis, and a component page its collections", () => {
    const gameDev = readFileSync(new URL("docs/collections/game-dev/index.html", dist), "utf8");
    assert.match(gameDev, /Practical/);
    assert.match(gameDev, /Research-backed/);
    const kanban = readFileSync(new URL("docs/components/kanban/index.html", dist), "utf8");
    assert.match(kanban, /In collections/);
    assert.ok(kanban.includes('href="/docs/collections/planning/"'));
  });

  test("a practical preset's page gives its attribution once", () => {
    const html = readFileSync(new URL("docs/components/feature-cut/index.html", dist), "utf8");
    assert.equal(html.split("Scope cutting by priority piles").length - 1, 1);
  });
  ```
  In the existing CLI reference test, add `"collections"` to `commands`.
- [ ] **Step 2: Build and watch the tests fail.** Run `pnpm site:build && pnpm site:test` from the
  repo root. Expected: the new tests FAIL, because there are no collection pages.
- [ ] **Step 3: Generate the data.** In `site/scripts/generate.mjs`:
  - add `collectionsOf` and `membersOf` to the package import;
  - give each component entry and each preset entry
    `collections: collectionsOf(catalogue, id),`;
  - after `catalogue.json` is written, add:
    ```js
    // --- The collections: themed shelves, membership by reference ----------------------------
    const collectionEntries = [...catalogue.collections.values()].map((c) => ({
      id: c.meta.id,
      name: c.meta.name,
      description: c.meta.description,
      own: c.presets.map((p) => p.id),
      members: membersOf(catalogue, c.meta.id),
    }));
    writeJson(join(generatedDir, "collections.json"), collectionEntries);
    ```
  - add `"collections"` to the `commands` list, after `"list"`;
  - in the closing `console.log`, mention `collections.json`.
- [ ] **Step 4: Share the preview.** Create `site/src/components/PagePreview.astro`. Move the
  `.preview-frame` markup, its CSS rules (`.preview-frame`, `.preview-frame.is-landscape`,
  `.preview-frame iframe`) and the whole `fitPreview` `<script>` out of
  `docs/components/[id].astro` unchanged, with these props:
  ```astro
  ---
  interface Props { id: string; title: string; orientation?: string; compact?: boolean }
  const { id, title, orientation, compact = false } = Astro.props;
  ---
  <div
    class:list={["preview-frame", { "is-landscape": orientation === "landscape", compact }]}
    data-preview
  >
    <iframe loading="lazy" title={`Preview of ${title}`} src={`/generated/previews/${id}.html`} />
  </div>
  ```
  Add `.preview-frame.compact { margin: 0 0 0.75rem; }` to its styles. In `[id].astro`, replace
  the frame with `<PagePreview id={item.id} title={item.title} orientation={item.orientation} />`
  and delete the moved CSS and script. Astro bundles a component's script once per page, however
  many previews the page shows.
- [ ] **Step 5: Show collections on a component page.** In `[id].astro`:
  - import the collections, and build a name lookup in the frontmatter:
    ```js
    import collections from "../../../generated/collections.json";
    const shelfName = new Map(collections.map((c) => [c.id, c.name]));
    ```
  - after the `component-meta` paragraph, add:
    ```astro
    {
      item.collections.length > 0 && (
        <p class="in-collections">
          In collections:{" "}
          {item.collections.map((id, i) => (
            <>
              {i > 0 && ", "}
              <a href={`/docs/collections/${id}/`}>{shelfName.get(id) ?? id}</a>
            </>
          ))}
        </p>
      )
    }
    ```
  - **The attribution prints once (a deferred Plan B minor).** For a practical preset, the
    basis line already shows the attribution as its origin. So the preset paragraph shows
    `Attribution: …` only when `item.basis !== "practice"`.
- [ ] **Step 6: Add the collections index.** Create
  `site/src/pages/docs/collections/index.astro`. Use `StarlightPage` with:
  - the title "Collections";
  - the description "Themed shelves of templates: what each one holds, and what it rests on.";
  - this intro: "A collection is a shelf of templates around one area. A template can sit on
    several shelves, and every template stays usable in any workbook. `switchback collections`
    lists the same shelves."

  Below the intro, render one card per entry of `collections.json`, in the
  `.component-list` card style from `docs/components/index.astro` (copy those CSS rules). Each card
  has:
  - the name, linked to `/docs/collections/<id>/`;
  - a `component-kind` span with "<n> templates";
  - a "<k> practical" span, when any member's catalogue entry has `basis === "practice"`;
  - the description as a `<p>`.
- [ ] **Step 7: Add a collection page.** Create `site/src/pages/docs/collections/[id].astro`:
  - `getStaticPaths` maps `collections.json` to `{ params: { id }, props: { shelf } }`;
  - look up each member's entry in `catalogue.json` by id;
  - the `StarlightPage` title is the shelf's name, and its description is the shelf's
    description;
  - the page shows the description as its intro, then the line "`switchback list --collection <id>`
    lists the same templates in the CLI.";
  - when `shelf.own` is not empty, a section `<h2>Made for this shelf</h2>`, then
    `<h2>From the catalogue</h2>` for the rest. With no own templates, there is one list with no
    heading.
  - Each template is a card in a grid (`repeat(auto-fill, minmax(16rem, 1fr))`) with:
    - `<PagePreview id={e.id} title={e.title} orientation={e.orientation} compact />`;
    - the title, linked to `/docs/components/<id>/`;
    - a basis badge: "Research-backed", or "Practical", the latter in `--sl-color-gray-2`;
    - the entry's `intent` for a component, or its `attribution` for a preset, as a `<p>`.
- [ ] **Step 8: Add it to the sidebar.** In `site/astro.config.mjs`, under "Reference", after
  `{ label: "Components", link: "/docs/components/" }`, add
  `{ label: "Collections", link: "/docs/collections/" }`.
- [ ] **Step 9: Run the tests.** Run `pnpm site:build && pnpm site:test`. Expected: PASS, with no
  broken links.
- [ ] **Step 10: Check one page by eye.** Start the built site
  (`pnpm --filter site preview`, or the repo's preview script). Take one Playwright screenshot of
  `/docs/collections/game-dev/` at 1280px wide and one at 390px wide, and look for clipped
  previews or broken layout. Fix what you see in one pass. Do not iterate.
- [ ] **Step 11: Commit.** `feat(site): collection pages, and which collections hold each template`

---

### Task 7: Full check and the pull request

- [ ] **Step 1: Run every CI step from the repo root.**
  - `pnpm lint`
  - `pnpm --filter @vandermerwed/switchback run typecheck`
  - `pnpm --filter @vandermerwed/switchback run gen --check`
  - `pnpm test`
  - `pnpm validate`, which should print `ok: 37 components, 15 presets, 9 collections (strict)`
  - `pnpm build`
  - `pnpm site:build && pnpm site:test`
  - `cd packages/switchback && pnpm apply-grounding --check`

  Expected: all green.
- [ ] **Step 2: Check that the built CLI carries the shelves.** From a temp directory, run
  `node <repo>/packages/switchback/dist/cli.js collections`. Expected: nine rows and
  "9 collections". This shows the bundled JSON reaches `dist` without a `files` entry.
- [ ] **Step 3: Final review, then open the PR.**
  - Run a whole-branch review against the base: `feat/research-basis`, or `main` once PR #44
    has merged.
  - Push `feat/collections` and open "feat: collections, and Game dev's practical templates",
    based on `main` if #44 has merged, or else on `feat/research-basis`.
  - The body lists:
    - the folder format and the membership-by-reference rule;
    - the four codes;
    - the CLI commands;
    - the skill step;
    - the site pages;
    - the shelf with Game dev's four presets;
    - both rulings from Global Constraints (`E_COLLECTION_SCHEMA`, and no `files` entry).

    End it with the Claude Code line.
