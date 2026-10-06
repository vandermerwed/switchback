# Research Basis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every template declares what it rests on, either graded research or practice. Research
becomes optional, and a practical template says honestly where it comes from.

**Architecture:**
- Components gain a required `basis`, plus an `origin` for practice. Presets may override the
  basis, and their existing `attribution` serves as the origin.
- One small module, `src/registry/basis.ts`, answers "what basis, which grounding, what origin"
  for any component-or-preset pair. Validation, `show`, `list` and the site all ask it.
- Strict grounding checks run only on research templates.
- The product-wide claim file `registry/collection.json` becomes `registry/catalogue.json` (type
  `CatalogueClaims`), which frees the word for Plan C.

**Tech Stack:** TypeScript, vitest, ajv JSON Schema, Astro (site).

**Spec:** `docs/superpowers/specs/2026-10-06-landscape-basis-collections-design.md`, Part B.

## Global Constraints

- `basis` is exactly `"research"` or `"practice"`. All 37 existing components are `"research"`.
  The 11 presets inherit it, so nothing changes for them.
- With `research`, grounding is required. Strict mode checks it as today: graded claims, sources,
  helps and backfires.
- With `practice`:
  - grounding must be absent, on the template and on every variant;
  - a component needs `origin`, at most 160 characters;
  - a preset's existing required `attribution` is its origin, so presets get no new field.
- A preset inherits its base component's basis unless it declares its own.
- New diagnostics:
  - `E_BASIS_CLAIMS`: a practice template, or one of its variants, carries grounding;
  - `E_BASIS_ORIGIN`: a practice component has no `origin`.
- A practical template never shows or implies research claims, including its base component's.
- Ruling (it deviates from the spec's wording): the catalogue-wide claim moves to
  `registry/catalogue.json`, with TS type `CatalogueClaims` and registry key `catalogueClaims`. The
  spec's `Catalogue` / `catalogue` names collide with the existing `Catalogue` interface in
  `src/registry/catalogue.ts`. The research pipeline's internal section key `"collection"` in
  `research/grounding.json` and `research/grading/*.json` stays as it is, because those files are
  the research record. Only the file path that `apply-grounding` writes changes.
- Conventional Commits, each ending with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Run vitest from `packages/switchback` as `pnpm exec vitest run <files>`.
  `pnpm --filter … exec vitest` misreports on this machine.
- Before each commit:
  - `pnpm lint`;
  - `pnpm --filter @vandermerwed/switchback run typecheck`;
  - the task's tests;
  - before the last task, also `pnpm test` and `pnpm validate`.
- Work on branch `feat/research-basis`, from `main`.

## Review Focus

These are the five failure modes most likely to bite. Each has a test in the named task.

1. A practice preset of a research component (the Plan C case) must not show the base component's
   claims anywhere: not in `show`, not on the site, not in the catalogue entry. Tests in Tasks 2,
   4 and 5.
2. A research preset with its own grounding (kanban) shows its own grounding, not the base's.
   Today `show` prints the base's. Test in Task 4.
3. Strict validation must still fail a research template whose grounding is missing or
   ungraded, while passing a practice one that has none. Test in Task 3.
4. A practice component whose variant carries grounding must fail with `E_BASIS_CLAIMS`. Test in
   Task 3.
5. Renaming `collection.json` must not break `pnpm apply-grounding --check`, which the research
   CI job runs. Test in Task 1.

---

### Task 1: Rename the catalogue-wide claim file

**Files:**
- Move: `packages/switchback/registry/collection.json` → `packages/switchback/registry/catalogue.json`
  (with `git mv`)
- Modify:
  - `packages/switchback/src/engine/types.ts`: `interface Collection` (line 187) becomes
    `interface CatalogueClaims`;
  - `packages/switchback/src/registry/registries.ts`: lines 1, 7, 17 and 29;
  - `packages/switchback/src/registry/validate.ts`: lines 302–305;
  - `packages/switchback/scripts/research/grounding.ts`: lines 166, 190 and 212, the file path
    only;
  - `packages/switchback/scripts/apply-grounding.ts`: line 1, the comment;
  - `packages/switchback/docs/errors.md`: lines 72 and 93.
- Test:
  - `packages/switchback/test/registry/validate.test.ts`: lines 79–98;
  - `packages/switchback/test/scripts/grounding.test.ts`: line 160.

**Interfaces:**
- Produces: `CatalogueClaims` (`{ grounding?: Grounding }`), and `Registries.catalogueClaims`,
  loaded from `registry/catalogue.json`.

- [ ] **Step 1: Change the tests to the new names.** In
  `test/registry/validate.test.ts`, in the test now titled "checks the shape of grounding on
  styles, protocols and the catalogue":
  - rename the title to that;
  - use `registries.catalogueClaims` in place of `registries.collection`;
  - expect `"registry/catalogue.json"` in place of `"registry/collection.json"`.

  In `test/scripts/grounding.test.ts` line 160, expect `"registry/catalogue.json"`.

- [ ] **Step 2: Run them and check that they fail.**
  `pnpm exec vitest run test/registry/validate.test.ts test/scripts/grounding.test.ts`.
  Expected: FAIL. `catalogueClaims` is undefined, and the path is still `registry/collection.json`.

- [ ] **Step 3: Rename.**
  1. `git mv packages/switchback/registry/collection.json packages/switchback/registry/catalogue.json`.
  2. In `types.ts`, rename the interface:
     ```ts
     /** The catalogue-wide claims that underpin every writing page (claims.md §10 ruling 1). */
     export interface CatalogueClaims {
       grounding?: Grounding;
     }
     ```
  3. In `registries.ts`:
     - `import catalogueClaims from "../../registry/catalogue.json";`;
     - import `CatalogueClaims` in place of `Collection`;
     - the field becomes `catalogueClaims: CatalogueClaims;`;
     - the value becomes `catalogueClaims: catalogueClaims as CatalogueClaims,`.
  4. In `validate.ts` lines 302–305:
     ```ts
     const claims = parts.registries.catalogueClaims;
     out.push(...checkGroundingShape("the catalogue", claims.grounding, "registry/catalogue.json"));
     if (opts.strict && claims.grounding)
       out.push(...strictGrounding("the catalogue", claims.grounding, "registry/catalogue.json"));
     ```
  5. In `scripts/research/grounding.ts`, change `"registry/collection.json"` to
     `"registry/catalogue.json"` on lines 190 and 212. Change the comment on line 166 to: "The
     collection-level claims (claims.md §10 ruling 1; the research files' `collection` section)
     live in registry/catalogue.json." Keep every `collection` identifier there, because they
     mirror the research JSON's section key.
  6. In `scripts/apply-grounding.ts` line 1, the comment ends "…style, protocol and catalogue
     files".
  7. In `docs/errors.md`, line 72 ("…a style, protocol or the catalogue-wide claim
     (`registry/catalogue.json`)…") and line 93 ("Variants, protocols and the catalogue-wide claim
     may carry one too…").

- [ ] **Step 4: Run the tests and the research check.**
  - `pnpm exec vitest run test/registry test/scripts test/docs`: PASS.
  - From `packages/switchback`, `pnpm apply-grounding --check`: no drift reported, exit 0.
  - `pnpm run typecheck`: PASS.
- [ ] **Step 5: Commit.** `refactor(cli): the catalogue-wide claim lives in registry/catalogue.json`

---

### Task 2: `basis` and `origin` in the schema, the types and one resolver

**Files:**
- Create: `packages/switchback/src/registry/basis.ts`
- Modify:
  - `packages/switchback/src/engine/types.ts`: `ComponentMeta` and `PresetMeta`;
  - `packages/switchback/src/registry/schemas.ts`: `componentSchema` and `presetSchema`;
  - all 37 `packages/switchback/components/*/component.json`: add `"basis": "research"`;
  - `packages/switchback/src/index.ts`: export the basis helpers;
  - `packages/switchback/src/cli/commands/show.ts`: lines 106–110, a compile fix only.
- Test: `packages/switchback/test/registry/basis.test.ts` and
  `packages/switchback/test/registry/schemas.test.ts`

**Interfaces:**
- Produces:
  - `export type Basis = "research" | "practice";` in `types.ts`.
  - `ComponentMeta` gains `basis: Basis` and `origin?: string`, and its `grounding` becomes
    optional.
  - `PresetMeta` gains `basis?: Basis`.
  - In `src/registry/basis.ts`:
    - `basisOf(meta: ComponentMeta, preset?: PresetMeta | null): Basis`;
    - `groundingOf(meta, preset?): Grounding | undefined`. This is `undefined` for practice. For
      research it is the preset's own grounding when present, else the component's.
    - `originOf(meta, preset?): string | undefined`. This is `undefined` for research. For
      practice it is the preset's `attribution` when there is a preset, else the component's
      `origin`.
  - All three are exported from `src/index.ts`.

- [ ] **Step 1: Write the failing tests.** Create `test/registry/basis.test.ts`:
  ```ts
  import { describe, expect, it } from "vitest";
  import type { ComponentMeta, PresetMeta } from "../../src/engine/types";
  import { basisOf, groundingOf, originOf } from "../../src/registry/basis";

  const g = (helps: string) => ({ claims: [], helps, backfires: "" });
  const meta = (extra: Partial<ComponentMeta>): ComponentMeta =>
    ({ id: "zones", basis: "research", grounding: g("base"), ...extra }) as ComponentMeta;
  const preset = (extra: Partial<PresetMeta>): PresetMeta =>
    ({ id: "p", kind: "preset", extends: "zones", name: "P", tags: ["plan"], data: {}, attribution: "A common format", licence: "x", ...extra }) as PresetMeta;

  describe("basis", () => {
    it("reads a component's basis, grounding and origin", () => {
      expect(basisOf(meta({}))).toBe("research");
      expect(groundingOf(meta({}))?.helps).toBe("base");
      expect(originOf(meta({}))).toBeUndefined();
      const practice = meta({ basis: "practice", grounding: undefined, origin: "A studio format" });
      expect(basisOf(practice)).toBe("practice");
      expect(groundingOf(practice)).toBeUndefined();
      expect(originOf(practice)).toBe("A studio format");
    });

    it("lets a preset inherit, use its own grounding, or declare practice", () => {
      expect(basisOf(meta({}), preset({}))).toBe("research");
      expect(groundingOf(meta({}), preset({ grounding: g("own") }))?.helps).toBe("own");
      expect(groundingOf(meta({}), preset({}))?.helps).toBe("base");
      const practical = preset({ basis: "practice" });
      expect(basisOf(meta({}), practical)).toBe("practice");
      expect(groundingOf(meta({}), practical)).toBeUndefined(); // never the base's claims
      expect(originOf(meta({}), practical)).toBe("A common format");
    });
  });
  ```
  Then add to `test/registry/schemas.test.ts`:
  ```ts
  describe("basis in the schemas", () => {
    it("requires basis on a component, allows origin, and allows basis on a preset", () => {
      expect(componentSchema.required).toContain("basis");
      expect(componentSchema.required).not.toContain("grounding");
      expect(componentSchema.properties.basis).toEqual({ enum: ["research", "practice"] });
      expect(componentSchema.properties.origin).toEqual({ type: "string", minLength: 1, maxLength: 160 });
      expect(presetSchema.properties.basis).toEqual({ enum: ["research", "practice"] });
    });
  });
  ```
- [ ] **Step 2: Run them and check that they fail.**
  `pnpm exec vitest run test/registry/basis.test.ts test/registry/schemas.test.ts`. Expected: FAIL.
  `basis.ts` does not exist, and the schema has no `basis`.
- [ ] **Step 3: Implement.**
  1. In `types.ts`:
     - add `export type Basis = "research" | "practice";` after `Orientation`;
     - in `ComponentMeta`, add `basis: Basis;` and `origin?: string;`, and change `grounding` to
       `grounding?: Grounding;`;
     - in `PresetMeta`, add `basis?: Basis;`.
  2. In `schemas.ts`:
     - add `const basis = { enum: ["research", "practice"] } as const;` next to `orientation`;
     - in `componentSchema.required`, replace `"grounding"` with `"basis"`;
     - add `basis,` and `origin: { type: "string", minLength: 1, maxLength: 160 },` to its
       properties;
     - add `basis,` to `presetSchema.properties`.
  3. Create `src/registry/basis.ts`:
     ```ts
     import type { Basis, ComponentMeta, Grounding, PresetMeta } from "../engine/types";

     /** A preset inherits its component's basis unless it declares its own. */
     export function basisOf(meta: ComponentMeta, preset?: PresetMeta | null): Basis {
       return preset?.basis ?? meta.basis;
     }

     /** The claims a template stands on. A practical template has none, never its base's. */
     export function groundingOf(meta: ComponentMeta, preset?: PresetMeta | null): Grounding | undefined {
       if (basisOf(meta, preset) === "practice") return undefined;
       return preset?.grounding ?? meta.grounding;
     }

     /** Where a practical template comes from: a preset's attribution, or a component's origin. */
     export function originOf(meta: ComponentMeta, preset?: PresetMeta | null): string | undefined {
       if (basisOf(meta, preset) !== "practice") return undefined;
       return preset ? preset.attribution : meta.origin;
     }
     ```
  4. Add `export { basisOf, groundingOf, originOf } from "./registry/basis";` to `src/index.ts`.
  5. Migrate every component. Insert `"basis": "research"` directly after `"phase"` in all 37
     `component.json` files. Use the same Node one-off as the landscape plan's Task 7: parse,
     rebuild the key order, write. Then run `pnpm exec biome format --write` on them, and check
     `git diff --stat` shows one added line per file.
  6. In `show.ts`, make the existing grounding lines compile against the optional field, with no
     behaviour change yet (Task 4 rewrites this block):
     ```ts
     const grounding = meta.grounding ?? { claims: [], helps: "", backfires: "" };
     ```
     Use `grounding.` in place of `meta.grounding.` on lines 106–110.
- [ ] **Step 4: Run the tests.** `pnpm exec vitest run test/registry test/cli` and `pnpm run typecheck`.
  Expected: PASS. Then run `pnpm validate` from the repo root. Expected: `ok: 37 components, 11
  presets (strict)`.
- [ ] **Step 5: Commit.** `feat(cli): every template declares its basis`

---

### Task 3: Validation: practice templates make no claims, research ones stay strict

**Files:**
- Modify: `packages/switchback/src/registry/validate.ts`, the component loop (lines 143–205) and
  the preset loop (lines 207–239)
- Modify: `packages/switchback/docs/errors.md`. Add `E_BASIS_CLAIMS` and `E_BASIS_ORIGIN`, and
  update "Grounding a new item".
- Test: `packages/switchback/test/registry/validate.test.ts`

**Interfaces:**
- Consumes: `basisOf` (Task 2).

- [ ] **Step 1: Write the failing tests.** Add to `test/registry/validate.test.ts`:
  ```ts
  describe("basis", () => {
    const practical = () => {
      const c = clone("timeline");
      c.meta.id = "practical";
      c.meta.basis = "practice";
      c.meta.origin = "A common planning format";
      delete c.meta.grounding;
      return c;
    };

    it("accepts a practice component with an origin and no claims, in strict mode too", () => {
      const parts2 = { ...parts, components: [...parts.components, practical()] };
      expect(validateRegistry(parts2)).toEqual([]);
      expect(validateRegistry(parts2, { strict: true })).toEqual([]);
    });

    it("rejects a practice component that carries claims, on itself or a variant", () => {
      const withClaims = practical();
      withClaims.meta.grounding = { claims: [], helps: "h", backfires: "b" };
      const withVariantClaims = practical();
      withVariantClaims.meta.id = "practical-variant";
      withVariantClaims.meta.variants = [
        { id: "default", requires: [], grounding: { claims: [], helps: "h", backfires: "b" } },
      ];
      const found = validateRegistry({ ...parts, components: [...parts.components, withClaims, withVariantClaims] });
      expect(found.filter((d) => d.code === "E_BASIS_CLAIMS").map((d) => d.path)).toEqual([
        "components/practical",
        "components/practical-variant#variants/default",
      ]);
    });

    it("rejects a practice component with no origin", () => {
      const noOrigin = practical();
      delete noOrigin.meta.origin;
      expect(codes(validateRegistry({ ...parts, components: [...parts.components, noOrigin] }))).toContain(
        "E_BASIS_ORIGIN",
      );
    });

    it("rejects a practice preset that carries claims, and passes one that doesn't, in strict mode", () => {
      const preset = {
        id: "plain-board",
        kind: "preset" as const,
        extends: "zones",
        name: "Plain board",
        tags: ["plan"],
        data: { zones: ["A", "B"] },
        attribution: "A common board",
        licence: "idea; no restriction",
        basis: "practice" as const,
      };
      expect(validateRegistry({ ...parts, presets: [...parts.presets, preset] }, { strict: true })).toEqual([]);
      const claimed = { ...preset, id: "claimed-board", grounding: { claims: [], helps: "h", backfires: "b" } };
      expect(codes(validateRegistry({ ...parts, presets: [...parts.presets, claimed] }))).toContain("E_BASIS_CLAIMS");
    });

    it("still fails a research component with no grounding in strict mode", () => {
      const bare = clone("timeline");
      bare.meta.id = "bare-research";
      delete bare.meta.grounding;
      expect(codes(validateRegistry({ ...parts, components: [...parts.components, bare] }, { strict: true }))).toContain(
        "E_STRICT_NO_CLAIMS",
      );
    });
  });
  ```
- [ ] **Step 2: Run them and check that they fail.** `pnpm exec vitest run test/registry/validate.test.ts`.
  Expected: FAIL. Strict mode fails the practice component with `E_STRICT_NO_CLAIMS`, and no
  `E_BASIS_*` code exists yet.
- [ ] **Step 3: Implement.** In `validate.ts`, import `basisOf` from `./basis`. In the component
  loop, before `if (opts.strict) {`, add:
  ```ts
  if (m.basis === "practice") {
    if (m.grounding)
      out.push(
        error("E_BASIS_CLAIMS", `${m.id} is a practical template but carries research claims`, "remove grounding, or set \"basis\": \"research\" and grade it through research/grading", { path }),
      );
    for (const v of m.variants ?? [])
      if (v.grounding)
        out.push(
          error("E_BASIS_CLAIMS", `${m.id}/${v.id} carries research claims on a practical template`, "remove the variant's grounding, or set \"basis\": \"research\"", { path: `${path}#variants/${v.id}` }),
        );
    if (!m.origin)
      out.push(
        error("E_BASIS_ORIGIN", `${m.id} is a practical template with no origin`, "add \"origin\": one line on where the format comes from", { path }),
      );
  }
  ```
  Change the strict block to run only for research components:
  `if (opts.strict && m.basis === "research") {`.

  In the preset loop, after the `E_UNKNOWN_BASE` check (the base exists by then), add:
  ```ts
  const base = cat.components.get(p.extends)!.meta;
  const presetBasis = basisOf(base, p);
  if (presetBasis === "practice" && p.grounding)
    out.push(
      error("E_BASIS_CLAIMS", `${p.id} is a practical template but carries research claims`, "remove grounding, or drop \"basis\": \"practice\"", { path }),
    );
  ```
  Change the preset strict line to
  `if (opts.strict && presetBasis === "research") out.push(...strictGrounding(p.id, p.grounding, path));`.
- [ ] **Step 4: Document the codes.** In `docs/errors.md`, add two rows to the errors table:
  - `E_BASIS_CLAIMS`: "A practical template (`"basis": "practice"`), or one of its variants,
    carries a grounding block. Practical templates make no research claim: remove the grounding,
    or make the template research-backed and grade it."
  - `E_BASIS_ORIGIN`: "A practical component has no `origin`. Add one line on where the format
    comes from. A practical preset uses its `attribution`."

  Start the "Grounding a new item" section with: "Only research-backed templates
  (`"basis": "research"`) need this. A practical template (`"basis": "practice"`) carries no
  grounding and states its `origin`."
- [ ] **Step 5: Run the tests.** `pnpm exec vitest run test/registry test/docs`, then `pnpm validate`
  from the root. Expected: PASS, and `ok: 37 components, 11 presets (strict)`.
- [ ] **Step 6: Commit.** `feat(cli): practical templates make no claims, research ones stay strict`

---

### Task 4: `show` and `list` say what a template rests on

**Files:**
- Modify: `packages/switchback/src/cli/commands/show.ts` (the text output from line 80, and the
  JSON output)
- Modify: `packages/switchback/src/cli/commands/list.ts` (the rows and filters)
- Test: `packages/switchback/test/cli/show.test.ts`, `packages/switchback/test/cli/list.test.ts`

**Interfaces:**
- Consumes: `basisOf`, `groundingOf`, `originOf` (Task 2).
- Produces:
  - In `show.ts`: `export function basisLines(meta: ComponentMeta, preset?: PresetMeta | null): string[]`.
  - In `list.ts`: `export function listRows(cat: Catalogue, opts: { all?: boolean }): ListRow[]`,
    where `ListRow` is `Row & { basis: Basis; meta: ComponentMeta }`.
  - A `--basis research|practice` flag on `list`.

- [ ] **Step 1: Write the failing tests.** Add to `test/cli/show.test.ts`:
  ```ts
  import { basisLines } from "../../src/cli/commands/show";
  import { loadCatalogue } from "../../src/registry/catalogue";

  describe("basisLines", () => {
    const cat = loadCatalogue();
    const zones = cat.components.get("zones")!.meta;
    it("prints research-backed claims, using a preset's own grounding", () => {
      const kanban = cat.presets.get("kanban")!;
      const lines = basisLines(zones, kanban);
      expect(lines[0]).toBe("basis:   research-backed");
      expect(lines.join("\n")).toContain(kanban.grounding!.helps);
      expect(lines.join("\n")).not.toContain(zones.grounding!.helps);
    });
    it("prints a practical template's origin and none of its base's claims", () => {
      const practical = { ...cat.presets.get("kanban")!, basis: "practice" as const, attribution: "A common board" };
      const lines = basisLines(zones, practical);
      expect(lines).toEqual(["basis:   practical template · A common board"]);
    });
  });
  ```
  Add to `test/cli/list.test.ts`:
  ```ts
  import { listRows } from "../../src/cli/commands/list";
  import { createCatalogue, catalogueParts } from "../../src/registry/catalogue";

  describe("listRows basis", () => {
    it("carries each row's basis, with a practice preset marked practice", () => {
      const parts = catalogueParts();
      const cat = createCatalogue({
        ...parts,
        presets: [...parts.presets, { id: "plain-board", kind: "preset", extends: "zones", name: "Plain board", tags: ["plan"], data: {}, attribution: "A common board", licence: "x", basis: "practice" }],
      });
      const rows = listRows(cat, {});
      expect(rows.find((r) => r.id === "plain-board")?.basis).toBe("practice");
      expect(rows.find((r) => r.id === "kanban")?.basis).toBe("research");
    });
  });
  ```
  Also add an end-to-end case that `listCommand(["--basis", "research", "--json"], ...)` returns
  every row with `basis: "research"`, and that `--basis nonsense` throws a usage error. Follow the
  file's existing `captureIo`/`env` setup.
- [ ] **Step 2: Run them and check that they fail.**
  `pnpm exec vitest run test/cli/show.test.ts test/cli/list.test.ts`. Expected: FAIL. Neither
  export exists, and there is no `--basis`.
- [ ] **Step 3: Implement `show`.** Export:
  ```ts
  export function basisLines(meta: ComponentMeta, preset?: PresetMeta | null): string[] {
    if (basisOf(meta, preset) === "practice") return [`basis:   practical template · ${originOf(meta, preset) ?? ""}`];
    const g = groundingOf(meta, preset);
    const lines = ["basis:   research-backed", "grounding:"];
    if (!g?.claims.length) lines.push("  (not yet researched)");
    for (const c of g?.claims ?? []) lines.push(`  - ${c.claim} [${c.grade}] ${c.sources.map((s) => s.cite).join("; ")}`);
    if (g?.helps) lines.push(`  helps: ${g.helps}`);
    if (g?.backfires) lines.push(`  backfires: ${g.backfires}`);
    return lines;
  }
  ```
  Replace the `grounding:` block in the text output with `lines.push(...basisLines(meta, preset));`.
  In the JSON output, add `basis: basisOf(meta, preset)` and `origin: originOf(meta, preset) ?? null`.
  When `basisOf(meta, preset) === "practice"`, set `component: { ...meta, grounding: undefined }`
  so the base's claims never leak.
- [ ] **Step 4: Implement `list`.**
  - Move the row-building loop into exported `listRows(cat, { all })`, which adds
    `basis: basisOf(c.meta)` for components and `basis: basisOf(base.meta, p)` for presets.
  - Add `basis: { type: "string" }` to the parsed options.
  - Validate it against `["research", "practice"]` with a `UsageError`, the way `--kind` is.
  - Filter with `.filter((r) => !values.basis || r.basis === values.basis)`.
  - Add `[--basis research|practice]` to `USAGE`.
  - In the table, append `  (practical)` after the name for practice rows.
  - JSON rows include `basis`.
- [ ] **Step 5: Run the tests.** `pnpm exec vitest run test/cli` and `pnpm run typecheck`. Expected: PASS.
- [ ] **Step 6: Commit.** `feat(cli): show and list say what each template rests on`

---

### Task 5: The site shows the basis

**Files:**
- Modify: `site/scripts/generate.mjs`, the catalogue entries (lines 41–70)
- Modify: `site/src/pages/docs/components/[id].astro`, the grounding block (lines 89–122)
- Modify: `site/src/content/docs/docs/evidence.mdx`, the opening paragraph
- Test: `site/tests/catalogue.test.mjs`

**Interfaces:**
- Consumes: `basisOf`, `groundingOf`, `originOf` from `@vandermerwed/switchback` (Task 2).
- Produces: catalogue entries carry `basis`, `origin` (or `null`) and `grounding`, the latter
  only for research.

- [ ] **Step 1: Write the failing site test.** Add to `site/tests/catalogue.test.mjs`:
  ```js
  test("each catalogue entry records its basis, and research ones carry their claims", () => {
    const entries = JSON.parse(readFileSync(new URL("catalogue.json", generated), "utf8"));
    for (const e of entries) {
      assert.ok(["research", "practice"].includes(e.basis), `${e.id} has a basis`);
      if (e.basis === "research") assert.ok(e.grounding?.claims?.length, `${e.id} carries claims`);
      else assert.ok(!e.grounding && e.origin, `${e.id} carries an origin and no claims`);
    }
    const kanban = entries.find((e) => e.id === "kanban");
    assert.match(kanban.grounding.helps, /zones/); // the preset's own grounding, not the base's
    const html = readFileSync(new URL("docs/components/kanban/index.html", dist), "utf8");
    assert.match(html, /Research-backed/);
  });
  ```
- [ ] **Step 2: Build and check that it fails.** `pnpm site:build && pnpm site:test`. Expected:
  the new test FAILS, because entries have no `basis`.
- [ ] **Step 3: Implement `generate.mjs`.**
  - Import `basisOf, groundingOf, originOf` from `@vandermerwed/switchback`.
  - For components, set `basis: basisOf(meta)`, `origin: originOf(meta) ?? null` and
    `grounding: groundingOf(meta)`.
  - For presets, use `basis: basisOf(base.meta, preset)`, `origin: originOf(base.meta, preset) ?? null`
    and `grounding: base ? groundingOf(base.meta, preset) : undefined`. This replaces
    `preset.grounding ?? base?.meta.grounding`.
- [ ] **Step 4: Implement the page.** In `[id].astro`, above the existing
  `claims.length > 0 && (...)` block:
  - render `<p class="basis basis-research">Research-backed</p>` when `item.basis === "research"`;
  - otherwise render `<p class="basis basis-practice"><strong>Practical template.</strong> {item.origin} It makes no research claim.</p>`.

  Style both with the page's existing tokens. Use `.basis` for a small uppercase label, and give
  `.basis-practice` the `--sl-color-gray-2` text colour. Give the claims block its `<h2>Grounding</h2>`
  only for research, as now.
- [ ] **Step 5: Rewrite the evidence page opening.** Replace the first paragraph of `evidence.mdx` with:
  > Templates come in two kinds. A **research-backed** template carries a claim about why it might
  > help, and that claim is graded, not asserted. A **practical template** is a common format people
  > already use (a game one-pager, a playtest sheet); it makes no research claim and says where it
  > comes from. `switchback show <id>` prints either: a research-backed template's claims, grades,
  > sources and when it helps or backfires, or a practical template's origin.

  Change the front-matter `description` to: "Research-backed and practical templates, and what the
  A to D grades mean."
- [ ] **Step 6: Run the tests.** `pnpm site:build && pnpm site:test`. Expected: PASS.
- [ ] **Step 7: Commit.** `feat(site): show whether each template is research-backed or practical`

---

### Task 6: Product, CI and the skill say the same

**Files:**
- Modify: `PRODUCT.md`, lines 15 and 45
- Modify: `.github/workflows/ci.yml`, line 31 (the comment)
- Modify: `skills/switchback/references/workbook.md`, the "Write the pages" rules
- Modify: `skills/switchback/references/writing-pages.md`, only if it cites evidence for pages
  (`grep -n "grade\|evidence\|research" skills/switchback/references/writing-pages.md`)

- [ ] **Step 1: Edit `PRODUCT.md`.** Line 15's last sentence becomes: "Where a component or style
  makes a claim, it carries an explicit grade and sources. Practical templates make no claim and
  say where they come from." Principle 4 becomes: "Grade claims honestly where a template makes
  them; let practical templates make none, and keep unproven benefits distinct from user
  motivation."
- [ ] **Step 2: Edit `ci.yml`.** The comment on line 31 becomes
  `# strict since 2026-09-26 (research spec §9.3): every research-backed item must carry graded grounding`.
- [ ] **Step 3: Edit the skill.** In `workbook.md` under "## 5. Write the pages", add:
  ```md
  - **Evidence only where it exists.** `switchback show` says whether a template is research-backed
    or practical. Cite grounding only for research-backed templates; a practical template makes no
    claim, so never imply one. If the user wants evidence-backed pages only, pick from
    `switchback list --basis research`.
  ```
- [ ] **Step 4: Lint.** `pnpm lint`. Expected: "ok: 1 skill".
- [ ] **Step 5: Commit.** `docs: research is optional, and every template says what it rests on`

---

### Task 7: Full check and the pull request

- [ ] **Step 1: Run every CI step from the repo root.**
  - `pnpm lint`
  - `pnpm --filter @vandermerwed/switchback run typecheck`
  - `pnpm --filter @vandermerwed/switchback run gen --check`
  - `pnpm test`
  - `pnpm validate`
  - `pnpm build`
  - `pnpm site:build && pnpm site:test`
  - `cd packages/switchback && pnpm apply-grounding --check`

  Expected: all green.
- [ ] **Step 2: Final review, then open the PR.** Run a whole-branch review. Then push
  `feat/research-basis` and open "feat: research is optional; every template declares its basis".
  The body lists the basis rules, the two new codes, the `CatalogueClaims` rename ruling, and the
  site and skill changes. End it with the Claude Code line.
