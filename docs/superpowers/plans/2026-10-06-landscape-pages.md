# Landscape Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wide templates print on landscape pages inside an otherwise portrait workbook, as one
mixed-orientation PDF.

**Architecture:**
- Orientation is declared on components, variants, presets and spec pages, plus an optional
  per-component data rule exported from `render.ts`. A pure resolver picks the first declared
  value.
- The shell emits two named CSS pages (`sb-portrait`, `sb-landscape`), and a landscape page
  swaps its width and height through one class.
- Puppeteer already prints with `preferCSSPageSize`, so the PDF step does not change.

**Tech Stack:**
- The CLI: TypeScript (tsup), vitest, ajv JSON Schema, puppeteer-core.
- The e2e tests: Playwright, gated by `SWITCHBACK_E2E=1`.
- The site: Astro.

**Spec:** `docs/superpowers/specs/2026-10-06-landscape-basis-collections-design.md`, Part A.

## Global Constraints

- Orientation values are exactly `"portrait"` and `"landscape"`. The default is `portrait`.
- Precedence, highest first: spec page, then preset, then variant, then the component's data
  rule, then the component's default, then `portrait`.
- Paper sizes are unchanged: A4 is 210×297mm and Letter is 215.9×279.4mm. A landscape page swaps
  width and height.
- A portrait page's markup stays byte-for-byte as today: `<section class="sb-page" …>`, or with
  `sb-has-attrib`. Only landscape pages gain the `sb-landscape` class.
- Templates outside the landscape set do not change.
- The landscape set:
  - presets business-model-canvas, lean-canvas and kanban;
  - components options-criteria, assumption-audit, goal-factoring, perspective-swap and timeline;
  - zones by data rule: 3 or more columns, or a canvas layout of at most 3 rows;
  - card-sort by data rule: 3 or more piles, counting the default of 3.
- An index card is about 76mm wide. Page side margins total 30mm (15mm each), so the writing
  width is 180mm on A4 portrait and 267mm on A4 landscape.
- Conventional Commits. Every commit message ends with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Before each commit, run from the repo root:
  - `pnpm lint`: biome plus `check-skills`, no warnings;
  - `pnpm --filter @vandermerwed/switchback run typecheck`;
  - `pnpm --filter @vandermerwed/switchback run gen --check`;
  - `pnpm test`.
- Work on branch `feat/landscape-pages`, which already holds the spec commit.

## Review Focus

These are the five cases most likely to bite. Each has a test in the task named.

1. A workbook whose first page is landscape and whose later pages are portrait. Chrome must not
   apply the first page's size to every page. Test in Task 5.
2. A spec page that forces `"portrait"` on a landscape template, such as a business model canvas
   on portrait. It must build without errors, and the page must be portrait. Test in Task 4.
3. Index cards on Letter landscape. `W_NARROW` must use Letter's long side (279.4mm), not A4's.
   Test in Task 6.
4. The showcase page splitter must still find a landscape page, whose class attribute carries two
   names. Test in Task 8.
5. A zones canvas with 4 rows must stay portrait, because four 38mm rows do not fit a landscape
   body. Test in Task 6.

---

### Task 1: Orientation type, schemas and the resolver

**Files:**
- Create: `packages/switchback/src/engine/orientation.ts`
- Modify: `packages/switchback/src/engine/types.ts`, at `Variant` (line 138), `ComponentMeta`
  (152), `PresetMeta` (170), `SpecPage` (187), `RenderContext` (235), `Checks` (258),
  `ComponentModule` (263) and `SidecarPage` (288)
- Modify: `packages/switchback/src/registry/schemas.ts`. Add `orientation` to the spec page items
  (line 68), to the component properties and variant item properties (lines 129–193), and to the
  preset properties (line 195).
- Test: `packages/switchback/test/engine/orientation.test.ts`
- Test: `packages/switchback/test/registry/schemas.test.ts` (create it if absent; otherwise add to
  it)

**Interfaces:**
- Produces:
  - `export type Orientation = "portrait" | "landscape";` in `types.ts`.
  - `export type OrientationRule<D = any> = (data: D, variant: string) => Orientation | undefined;`
    in `types.ts`.
  - `orientation?: Orientation` on `Variant`, `ComponentMeta`, `PresetMeta` and `SpecPage`.
  - `orientation: Orientation` on `RenderContext`, on the `Checks` context and on `SidecarPage`.
  - `orientation?: OrientationRule` on `ComponentModule`.
  - `resolveOrientation(o: OrientationSources): Orientation` in `src/engine/orientation.ts`,
    where `OrientationSources` is
    `{ page?: Orientation; preset?: Orientation; variant?: Orientation; rule?: Orientation; component?: Orientation }`.

- [ ] **Step 1: Write the failing resolver test**

Create `packages/switchback/test/engine/orientation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resolveOrientation } from "../../src/engine/orientation";

describe("resolveOrientation", () => {
  it("defaults to portrait", () => {
    expect(resolveOrientation({})).toBe("portrait");
  });

  it("takes the component default when nothing else is set", () => {
    expect(resolveOrientation({ component: "landscape" })).toBe("landscape");
  });

  it("lets the data rule beat the component default", () => {
    expect(resolveOrientation({ component: "portrait", rule: "landscape" })).toBe("landscape");
  });

  it("lets the variant beat the data rule", () => {
    expect(resolveOrientation({ rule: "landscape", variant: "portrait" })).toBe("portrait");
  });

  it("lets the preset beat the variant", () => {
    expect(resolveOrientation({ variant: "portrait", preset: "landscape" })).toBe("landscape");
  });

  it("lets the spec page beat everything", () => {
    expect(
      resolveOrientation({
        page: "portrait",
        preset: "landscape",
        variant: "landscape",
        rule: "landscape",
        component: "landscape",
      }),
    ).toBe("portrait");
  });
});
```

- [ ] **Step 2: Run it and check that it fails**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/orientation.test.ts`
Expected: FAIL with "Failed to load url ../../src/engine/orientation".

- [ ] **Step 3: Add the types**

In `packages/switchback/src/engine/types.ts`, directly after `export type Paper = "A4" | "Letter";`
(line 1), add:

```ts
export type Orientation = "portrait" | "landscape";
```

Then add the field to each interface:

```ts
// in interface Variant, after `readback?: string;`
  orientation?: Orientation;

// in interface ComponentMeta, after `listed?: boolean;`
  orientation?: Orientation;

// in interface PresetMeta, after `footer?: string;`
  orientation?: Orientation;

// in interface SpecPage, after `data?: Record<string, unknown>;`
  orientation?: Orientation;

// in interface RenderContext, after `paper: Paper;`
  orientation: Orientation;

// in interface SidecarPage, after `variant: string;`
  orientation: Orientation;
```

Replace the `Checks` type with:

```ts
// biome-ignore lint/suspicious/noExplicitAny: each component narrows its own data type
export type Checks<D = any> = (
  data: D,
  ctx: { variant: string; paper: Paper; orientation: Orientation; pageId: string },
) => Diagnostic[];

// biome-ignore lint/suspicious/noExplicitAny: each component narrows its own data type
export type OrientationRule<D = any> = (data: D, variant: string) => Orientation | undefined;
```

In `interface ComponentModule`, after `checks?: Checks;`, add:

```ts
  /** Decide the page orientation from the page's data and variant; undefined means "no opinion". */
  orientation?: OrientationRule;
```

- [ ] **Step 4: Write the resolver**

Create `packages/switchback/src/engine/orientation.ts`:

```ts
import type { Orientation } from "./types";

export interface OrientationSources {
  page?: Orientation;
  preset?: Orientation;
  variant?: Orientation;
  rule?: Orientation;
  component?: Orientation;
}

/** The first declared orientation wins: spec page, preset, variant, data rule, component, then portrait. */
export function resolveOrientation(o: OrientationSources): Orientation {
  return o.page ?? o.preset ?? o.variant ?? o.rule ?? o.component ?? "portrait";
}
```

- [ ] **Step 5: Add `orientation` to the JSON schemas**

In `packages/switchback/src/registry/schemas.ts`, add a shared constant near the top, after
`stringList` is declared:

```ts
const orientation = { enum: ["portrait", "landscape"] } as const;
```

Then add `orientation` in four places:

```ts
// specSchema → pages.items.properties, after `data: { type: "object" },`
          orientation,

// componentSchema → properties, after `listed: { type: "boolean" },`
    orientation,

// componentSchema → variants.items.properties, after `grounding: groundingSchema,`
          orientation,

// presetSchema → properties, after `footer: { ... },`
    orientation,
```

- [ ] **Step 6: Write a schema test**

Add to `packages/switchback/test/registry/schemas.test.ts`. Create the file with these imports if
it does not exist.

```ts
import { describe, expect, it } from "vitest";
import { ajv } from "../../src/registry/ajv";
import { componentSchema, presetSchema, specSchema } from "../../src/registry/schemas";

describe("orientation in the schemas", () => {
  it("accepts portrait and landscape on a spec page and rejects anything else", () => {
    const validate = ajv.compile(specSchema);
    const spec = (orientation: string) => ({
      switchback: 1,
      pages: [{ id: "W1-P1", component: "sheet", orientation }],
    });
    expect(validate(spec("landscape"))).toBe(true);
    expect(validate(spec("portrait"))).toBe(true);
    expect(validate(spec("sideways"))).toBe(false);
  });

  it("allows orientation on components, variants and presets", () => {
    const props = componentSchema.properties;
    expect(props.orientation).toEqual({ enum: ["portrait", "landscape"] });
    expect(props.variants.items.properties.orientation).toEqual({ enum: ["portrait", "landscape"] });
    expect(presetSchema.properties.orientation).toEqual({ enum: ["portrait", "landscape"] });
  });
});
```

- [ ] **Step 7: Run the tests and typecheck**

Run:
- `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/orientation.test.ts test/registry/schemas.test.ts`
- `pnpm --filter @vandermerwed/switchback run typecheck`

Expected: the tests PASS. Typecheck FAILS in `src/engine/build.ts`, because `RenderContext`,
`SidecarPage` and the `checks` call now need `orientation`. Task 4 wires that in. To keep this
commit compiling, set `orientation: "portrait"` in those three places in `build.ts` now:
- the `checks` context object at line 145;
- the `ctx: RenderContext` literal at line 159;
- the `sidecarPages.push({...})` at line 192.

Run typecheck again. Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/switchback/src/engine/orientation.ts packages/switchback/src/engine/types.ts packages/switchback/src/registry/schemas.ts packages/switchback/src/engine/build.ts packages/switchback/test/engine/orientation.test.ts packages/switchback/test/registry/schemas.test.ts
git commit -m "feat(cli): an orientation field and its precedence" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Codegen picks up a component's orientation rule

**Files:**
- Modify: `packages/switchback/src/registry/codegen.ts`, lines 26–45
- Regenerate: `packages/switchback/src/generated/components.ts`, with `pnpm gen`
- Test: `packages/switchback/test/registry/codegen.test.ts` (create it if absent; otherwise add to
  it)

**Interfaces:**
- Consumes: `ComponentModule.orientation?: OrientationRule` from Task 1.
- Produces: when a component's `render.ts` contains `export const orientation`, the generated
  index imports it and sets `orientation:` on that module.

- [ ] **Step 1: Write the failing codegen test**

```ts
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { generateIndex } from "../../src/registry/codegen";

function fixture(renderSrc: string): string {
  const root = mkdtempSync(join(tmpdir(), "switchback-codegen-"));
  const dir = join(root, "components", "wide");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "component.json"), "{}");
  writeFileSync(join(dir, "render.ts"), renderSrc);
  return root;
}

describe("generateIndex", () => {
  it("imports and wires an exported orientation rule", () => {
    const code = generateIndex(
      fixture('export const render = () => "";\nexport const orientation = () => "landscape";\n'),
    );
    expect(code).toContain("orientation as orientation_wide");
    expect(code).toContain("orientation: orientation_wide, ");
  });

  it("leaves orientation out when the component has no rule", () => {
    const code = generateIndex(fixture('export const render = () => "";\n'));
    expect(code).not.toContain("orientation");
  });
});
```

- [ ] **Step 2: Run it and check that it fails**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/registry/codegen.test.ts`
Expected: the first test FAILS, because "orientation as orientation_wide" is not in the code.

- [ ] **Step 3: Implement**

In `packages/switchback/src/registry/codegen.ts`, after
`const hasChecks = /export const checks\b/.test(renderSrc);`, add:

```ts
    const hasOrientation = /export const orientation\b/.test(renderSrc);
```

Replace the render import line with:

```ts
    imports.push(
      `import { render as render_${v}${hasCss ? `, css as css_${v}` : ""}${hasChecks ? `, checks as checks_${v}` : ""}${hasOrientation ? `, orientation as orientation_${v}` : ""} } from "../../components/${id}/render";`,
    );
```

Replace the `entries.push(...)` with:

```ts
    entries.push(
      `  { meta: meta_${v} as unknown as ComponentModule["meta"], render: render_${v}, ${hasCss ? `css: css_${v}, ` : ""}${hasChecks ? `checks: checks_${v}, ` : ""}${hasOrientation ? `orientation: orientation_${v}, ` : ""}examples: { ${examples.join(", ")} } as ComponentModule["examples"] },`,
    );
```

- [ ] **Step 4: Run the tests and regenerate**

Run:
- `pnpm --filter @vandermerwed/switchback exec vitest run test/registry/codegen.test.ts`, expecting
  PASS;
- `pnpm --filter @vandermerwed/switchback run gen`, which writes the index. No component exports a
  rule yet, so it is unchanged.
- `pnpm --filter @vandermerwed/switchback run gen --check`, expecting "generated index is current".

- [ ] **Step 5: Commit**

```bash
git add packages/switchback/src/registry/codegen.ts packages/switchback/test/registry/codegen.test.ts packages/switchback/src/generated/components.ts
git commit -m "feat(cli): wire a component's orientation rule into the generated index" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Named pages in the shell

**Files:**
- Modify: `packages/switchback/src/shell/page.ts`:
  - `PageParts` at lines 12–23;
  - `renderPage` at lines 25–41;
  - `renderDocument` at lines 68–98.
- Modify: `packages/switchback/src/shell/tokens.ts`, line 14, the `.sb-page` rule
- Test: `packages/switchback/test/shell/page.test.ts` and `packages/switchback/test/shell/tokens.test.ts`

**Interfaces:**
- Consumes: `Orientation` from Task 1.
- Produces:
  - `PageParts.orientation?: Orientation`. A landscape page renders
    `<section class="sb-page sb-landscape" …>`, or `"sb-page sb-has-attrib sb-landscape"` when it
    has an attribution.
  - `renderDocument` emits `@page sb-portrait{size:<size>;margin:0}` and
    `@page sb-landscape{size:<size> landscape;margin:0}`, plus an unnamed `@page{size:<size>;margin:0}`
    as the fallback.

- [ ] **Step 1: Write the failing tests**

In `packages/switchback/test/shell/page.test.ts`, add to `describe("renderPage")`:

```ts
  it("marks a landscape page with sb-landscape and leaves a portrait page alone", () => {
    expect(renderPage({ ...parts, orientation: "landscape" })).toMatch(
      /<section class="sb-page sb-landscape" id="W1-P3"/,
    );
    expect(renderPage({ ...parts, orientation: "portrait" })).toMatch(/<section class="sb-page" id="W1-P3"/);
    expect(renderPage({ ...parts, orientation: "landscape", attribution: "Credit." })).toMatch(
      /<section class="sb-page sb-has-attrib sb-landscape" id="W1-P3"/,
    );
  });
```

Replace the `renderDocument` test with:

```ts
describe("renderDocument", () => {
  it("names a portrait and a landscape page for the paper, and de-duplicates component CSS", () => {
    const html = renderDocument({
      title: "T",
      paper: "Letter",
      pages: ["<p>x</p>"],
      componentCss: [".a{}", ".a{}"],
      embedFonts: false,
    });
    expect(html).toContain("@page{size:letter;margin:0}");
    expect(html).toContain("@page sb-portrait{size:letter;margin:0}");
    expect(html).toContain("@page sb-landscape{size:letter landscape;margin:0}");
    expect(html).toContain("--sb-w:215.9mm");
    expect(html.match(/\.a\{\}/g)).toHaveLength(1);
    expect(html).not.toContain("@font-face");
  });

  it("uses A4 for the named pages on A4 paper", () => {
    const html = renderDocument({ title: "T", paper: "A4", pages: [], componentCss: [], embedFonts: false });
    expect(html).toContain("@page sb-landscape{size:A4 landscape;margin:0}");
  });
});
```

In `packages/switchback/test/shell/tokens.test.ts`, add:

```ts
  it("put each page on its named print page and swap the box for landscape", () => {
    expect(TOKENS_CSS).toMatch(/\.sb-page \{[^}]*page: sb-portrait/);
    expect(TOKENS_CSS).toContain(
      ".sb-page.sb-landscape { page: sb-landscape; width: var(--sb-h); height: var(--sb-w); }",
    );
  });
```

- [ ] **Step 2: Run them and check that they fail**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/shell/page.test.ts test/shell/tokens.test.ts`
Expected: FAIL. There is no sb-landscape class and no named pages yet.

- [ ] **Step 3: Implement the shell**

In `packages/switchback/src/shell/page.ts`:
- change the type import to
  `import type { Mark, Orientation, Paper, PenMapping, Role, ShellOptions } from "../engine/types";`;
- add `orientation?: Orientation;` to `PageParts`;
- in `renderPage`, replace the `pageClass` line with:

```ts
  const pageClass = ["sb-page", p.attribution ? "sb-has-attrib" : "", p.orientation === "landscape" ? "sb-landscape" : ""]
    .filter(Boolean)
    .join(" ");
```

In `renderDocument`, replace the `@page{size:${size};margin:0}` line with:

```ts
@page{size:${size};margin:0}
@page sb-portrait{size:${size};margin:0}
@page sb-landscape{size:${size} landscape;margin:0}
```

In `packages/switchback/src/shell/tokens.ts`, on line 14, add `page: sb-portrait;` inside the
`.sb-page { ... }` rule, right after `height: var(--sb-h);`. Then add a new line after line 15
(`.sb-page:last-child { ... }`):

```css
.sb-page.sb-landscape { page: sb-landscape; width: var(--sb-h); height: var(--sb-w); }
```

- [ ] **Step 4: Run the tests**

Run:
- `pnpm --filter @vandermerwed/switchback exec vitest run test/shell`, expecting PASS;
- `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/build.test.ts`, expecting PASS
  (portrait markup is unchanged).

- [ ] **Step 5: Commit**

```bash
git add packages/switchback/src/shell/page.ts packages/switchback/src/shell/tokens.ts packages/switchback/test/shell/page.test.ts packages/switchback/test/shell/tokens.test.ts
git commit -m "feat(cli): named portrait and landscape print pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Build resolves each page's orientation

**Files:**
- Modify: `packages/switchback/src/engine/build.ts`, lines 144–204, the per-page block
- Test: `packages/switchback/test/engine/build.test.ts`

**Interfaces:**
- Consumes:
  - `resolveOrientation` (Task 1);
  - `ComponentModule.orientation` (Task 2);
  - `PageParts.orientation` (Task 3).
- Produces: for every page, a resolved `orientation`. It is passed to `checks` and `render` through
  their contexts, set on `renderPage`, and recorded on `SidecarPage.orientation`.

- [ ] **Step 1: Write the failing tests**

Add to `packages/switchback/test/engine/build.test.ts`:

```ts
import { createCatalogue } from "../../src/registry/catalogue";
import type { ComponentModule } from "../../src/engine/types";

const wide = (orientation?: "portrait" | "landscape", rule?: ComponentModule["orientation"]): ComponentModule => ({
  meta: {
    id: "wide",
    kind: "page",
    name: "Wide",
    intent: "x",
    when: "",
    tags: ["decide"],
    phase: "converge",
    physical: { requires: [], body: [], surface: "desk", timebox: "1 min" },
    variants: [{ id: "default", requires: [] }],
    data: { type: "object" },
    grounding: { claims: [], helps: "", backfires: "" },
    ...(orientation ? { orientation } : {}),
  },
  render: (_d, ctx) => `<p>${ctx.orientation}</p>`,
  ...(rule ? { orientation: rule } : {}),
  examples: {},
});
const wideCat = (mod: ComponentModule) =>
  createCatalogue({
    components: [mod],
    presets: [
      {
        id: "wide-portrait",
        kind: "preset",
        extends: "wide",
        name: "Wide, portrait",
        tags: ["decide"],
        data: {},
        attribution: "x",
        licence: "x",
        orientation: "portrait",
      },
    ],
  });
const one = (cat: ReturnType<typeof wideCat>, page: Record<string, unknown>) =>
  buildDocument(spec([{ id: "W1-P1", component: "wide", ...page }]), { ...opts, catalogue: cat, skipStyleChecks: true });

describe("page orientation", () => {
  it("prints a landscape component on a landscape page and records it", () => {
    const r = one(wideCat(wide("landscape")), {});
    expect(r.html).toContain('<section class="sb-page sb-landscape" id="W1-P1"');
    expect(r.html).toContain("<p>landscape</p>");
    expect(r.sidecar?.pages[0]?.orientation).toBe("landscape");
  });

  it("uses the component's data rule", () => {
    const rule = (data: { n?: number }) => ((data.n ?? 0) >= 3 ? "landscape" : undefined);
    expect(one(wideCat(wide(undefined, rule)), { data: { n: 3 } }).sidecar?.pages[0]?.orientation).toBe("landscape");
    expect(one(wideCat(wide(undefined, rule)), { data: { n: 1 } }).sidecar?.pages[0]?.orientation).toBe("portrait");
  });

  it("lets a preset and then a spec page override the component", () => {
    const cat = wideCat(wide("landscape"));
    const viaPreset = buildDocument(spec([{ id: "W1-P1", component: "wide-portrait" }]), {
      ...opts,
      catalogue: cat,
      skipStyleChecks: true,
    });
    expect(viaPreset.sidecar?.pages[0]?.orientation).toBe("portrait");
    const forced = one(cat, { orientation: "portrait" });
    expect(forced.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(forced.html).toContain('<section class="sb-page" id="W1-P1"');
  });

  it("passes the resolved orientation to checks", () => {
    let seen = "";
    const mod = { ...wide("landscape"), checks: (_d: unknown, c: { orientation: string }) => ((seen = c.orientation), []) };
    one(wideCat(mod as ComponentModule), {});
    expect(seen).toBe("landscape");
  });
});
```

Keep the existing `import { describe, expect, it } from "vitest";` and the existing `build` import
at the top of the file. Merge the new imports into the import block rather than repeating them.

- [ ] **Step 2: Run them and check that they fail**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/build.test.ts -t "page orientation"`
Expected: FAIL. The page is portrait, because Task 1 hard-coded `"portrait"`.

- [ ] **Step 3: Implement in `build.ts`**

Add `import { resolveOrientation } from "./orientation";` to the imports. Then, right after the
`if (choice.substituted) { ... }` block and before the `checks` loop, add:

```ts
    const orientation = resolveOrientation({
      page: page.orientation,
      preset: preset?.orientation,
      variant: choice.variant.orientation,
      rule: base.orientation?.(data, choice.variant.id),
      component: meta.orientation,
    });
```

Replace the three temporary `"portrait"` values from Task 1 with `orientation`:
- in the checks context: `{ variant: choice.variant.id, paper, orientation, pageId: page.id }`;
- in `ctx: RenderContext`: `orientation,`, placed after `paper,`;
- in `sidecarPages.push({...})`: `orientation,`, placed after `variant: choice.variant.id,`.

In the `renderPage({ ... })` call, add `orientation,` after `attribution: preset?.footer,`.

- [ ] **Step 4: Run the tests**

Run:
- `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/build.test.ts`, expecting PASS;
- `pnpm --filter @vandermerwed/switchback run typecheck`, expecting PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/switchback/src/engine/build.ts packages/switchback/test/engine/build.test.ts
git commit -m "feat(cli): resolve each page's orientation in the build and record it in the sidecar" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: One PDF mixes portrait and landscape pages

**Files:**
- Test: `packages/switchback/test/engine/pdf.test.ts`. The new test is skipped when no local Chrome
  or Edge is found, like the existing `toPdf` test.

**Interfaces:**
- Consumes: Tasks 1–4. No production change is expected, because `pdf.ts` already passes
  `preferCSSPageSize: true`. If this test fails, fix `src/engine/pdf.ts`, not the test.

- [ ] **Step 1: Write the test**

Add inside the existing `describe.skipIf(!browser)("toPdf (needs a local Chrome/Edge)", ...)`
block:

```ts
  it("mixes landscape and portrait pages in one PDF, starting landscape", async () => {
    const { buildDocument } = await import("../../src/engine/build");
    const { html } = buildDocument(
      {
        switchback: 1,
        pages: [
          { id: "W1-P1", component: "sheet", orientation: "landscape" },
          { id: "W1-P2", component: "sheet" },
          { id: "W1-P3", component: "sheet", orientation: "landscape" },
        ],
      },
      { skipStyleChecks: true, embedFonts: false },
    );
    const out = join(mkdtempSync(join(tmpdir(), "switchback-pdf-")), "mixed.pdf");
    await toPdf(html!, out, browser!);
    // Each page dictionary carries a MediaBox [0 0 width height] in points. A4 is 595.92 x 842.88.
    const boxes = [...readFileSync(out, "latin1").matchAll(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/g)].map(
      ([, w, h]) => (Number(w) > Number(h) ? "landscape" : "portrait"),
    );
    expect(boxes).toEqual(["landscape", "portrait", "landscape"]);
  });
```

- [ ] **Step 2: Run it**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/pdf.test.ts`
Expected: PASS on a machine with Chrome or Edge, and SKIPPED without one.

If it fails with every page the same size, check that `.sb-page.sb-landscape` carries
`page: sb-landscape` in the built HTML. If the MediaBox regex finds nothing, print
`readFileSync(out, "latin1").slice(0, 2000)` and adjust the regex to the PDF's real MediaBox
formatting. Do not weaken the expected order.

- [ ] **Step 3: Commit**

```bash
git add packages/switchback/test/engine/pdf.test.ts
git commit -m "test(cli): a mixed-orientation workbook prints as one PDF" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Data rules for zones and card-sort, and `W_NARROW` from the real width

**Files:**
- Modify: `packages/switchback/components/zones/render.ts`
- Modify: `packages/switchback/components/card-sort/render.ts`
- Modify: `packages/switchback/docs/errors.md`, the `W_NARROW` entry
- Regenerate: `packages/switchback/src/generated/components.ts`, with `pnpm gen`
- Test: `packages/switchback/test/components/zones.test.ts` and `packages/switchback/test/components/card-sort.test.ts`

**Interfaces:**
- Consumes:
  - `OrientationRule` (Task 1);
  - the codegen wiring (Task 2);
  - `orientation` on the checks context (Task 4).
- Produces:
  - `export const orientation` in `zones/render.ts`: landscape when the layout is usable and spans
    at most 3 rows, or when the effective column count is 3 or more.
  - `export const orientation` in `card-sort/render.ts`: landscape when there are 3 or more piles,
    counting the default of 3 unnamed piles.

- [ ] **Step 1: Write the failing tests**

Add to `packages/switchback/test/components/zones.test.ts`:

```ts
describe("zones orientation", () => {
  const sidecarOrientation = (data: Record<string, unknown>) =>
    buildDocument(
      { switchback: 1, pages: [{ id: "W1-P1", component: "zones", data }] },
      { skipStyleChecks: true, embedFonts: false },
    ).sidecar?.pages[0]?.orientation;

  it("goes landscape at three or more columns", () => {
    expect(sidecarOrientation({ zones: ["A", "B", "C"], columns: 3 })).toBe("landscape");
    expect(sidecarOrientation({ zones: ["A", "B"], columns: 2 })).toBe("portrait");
  });

  it("goes landscape when more than five zones fall back to three columns", () => {
    expect(sidecarOrientation({ zones: ["1", "2", "3", "4", "5", "6"] })).toBe("landscape");
  });

  it("goes landscape for a canvas of at most three rows, and stays portrait for four", () => {
    expect(renderComponent("zones", { example: "grid", embedFonts: false }).sidecar?.pages[0]?.orientation).toBe(
      "landscape",
    );
    const fourRows = {
      zones: ["A", "B", "C", "D"],
      layout: [
        { col: 1, row: 1, colSpan: 10 },
        { col: 1, row: 2, colSpan: 10 },
        { col: 1, row: 3, colSpan: 10 },
        { col: 1, row: 4, colSpan: 10 },
      ],
    };
    expect(sidecarOrientation(fourRows)).toBe("portrait");
  });

  it("prints the business model canvas preset on a landscape page", () => {
    expect(renderComponent("business-model-canvas", { embedFonts: false }).sidecar?.pages[0]?.orientation).toBe(
      "landscape",
    );
  });
});
```

In `packages/switchback/test/components/card-sort.test.ts`, replace the existing test
`"warns when index-card columns are too narrow on portrait paper"` with:

```ts
  it("prints three or more piles on a landscape page", () => {
    expect(one({ columns: ["Now", "Later", "Never"] }, "write-in").sidecar?.pages[0]?.orientation).toBe("landscape");
    expect(one({}, "write-in").sidecar?.pages[0]?.orientation).toBe("landscape");
    expect(one({ columns: ["Now", "Later"] }, "write-in").sidecar?.pages[0]?.orientation).toBe("portrait");
  });

  it("fits three index-card piles on a landscape page and warns from four", () => {
    expect(one({ columns: ["Now", "Later", "Never"] }, "index-cards").diagnostics.map((d) => d.code)).not.toContain(
      "W_NARROW",
    );
    const four = one({ columns: ["A", "B", "C", "D"] }, "index-cards");
    const w = four.diagnostics.find((d) => d.code === "W_NARROW")!;
    expect(w).toMatchObject({ level: "warning", page: "W1-P4" });
    expect(w.message).toContain("76 mm");
    expect(w.message).toContain("66 mm");
  });

  it("measures index-card piles on Letter landscape from Letter's long side", () => {
    const four = one({ columns: ["A", "B", "C", "D"] }, "index-cards", "Letter");
    expect(four.diagnostics.find((d) => d.code === "W_NARROW")!.message).toContain("62 mm");
  });
```

Keep the rest of the existing card-sort tests. If an existing assertion expects `W_NARROW` at 3
columns, it is replaced by the tests above.

- [ ] **Step 2: Run them and check that they fail**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/components/zones.test.ts test/components/card-sort.test.ts`
Expected: FAIL. No component exports a rule yet, and `W_NARROW` still assumes 180mm.

- [ ] **Step 3: Implement the zones rule**

In `packages/switchback/components/zones/render.ts`:
- change the import to `import type { Checks, OrientationRule, Render } from "../../src/engine/types";`;
- add these helpers after `usableLayout`:

```ts
/** The column count render uses when there is no usable layout (undefined means one stacked column). */
const columnsFor = (data: Data, labels: string[]): number | undefined =>
  data.columns !== undefined
    ? data.columns >= 2
      ? data.columns
      : labels.length > 5
        ? 2
        : undefined
    : labels.length > 5
      ? 3
      : undefined;

/** Rows a usable layout spans, clamped to the grid's four, as render draws it. */
const layoutRows = (data: Data): number =>
  Math.min(4, Math.max(...data.layout!.map((c) => c.row + Math.max(1, Math.min(c.rowSpan ?? 1, 4 - c.row + 1)) - 1)));

export const orientation: OrientationRule<Data> = (data) => {
  const labels = data.zones?.length ? data.zones : DEFAULT_ZONES;
  // A landscape body holds three 38mm canvas rows, not four.
  if (usableLayout(data, labels)) return layoutRows(data) <= 3 ? "landscape" : undefined;
  return (columnsFor(data, labels) ?? 1) >= 3 ? "landscape" : undefined;
};
```

In `render`, replace the inline `const columns = ...` expression with
`const columns = columnsFor(data, labels);`. Behaviour is unchanged.

- [ ] **Step 4: Implement the card-sort rule and the width-aware check**

In `packages/switchback/components/card-sort/render.ts`:
- change the imports to
  `import type { Checks, OrientationRule, Render } from "../../src/engine/types";` and add
  `import { PAPER_MM } from "../../src/shell/page";`;
- add:

```ts
const piles = (data: Data) => (data.columns?.length ? data.columns.length : 3);

export const orientation: OrientationRule<Data> = (data) => (piles(data) >= 3 ? "landscape" : undefined);
```

Replace `checks` with:

```ts
const INDEX_CARD_MM = 76;
const SIDE_MARGINS_MM = 30;

export const checks: Checks<Data> = (data, { variant, paper, orientation }) => {
  const columns = piles(data);
  if (variant !== "index-cards") return [];
  const [short, long] = PAPER_MM[paper];
  const each = Math.floor(((orientation === "landscape" ? long : short) - SIDE_MARGINS_MM) / columns);
  if (each >= INDEX_CARD_MM) return [];
  return [
    warning(
      "W_NARROW",
      `index cards are about ${INDEX_CARD_MM} mm wide; ${columns} piles leave about ${each} mm each`,
      "use the write-in variant, or fewer piles",
    ),
  ];
};
```

Check the arithmetic: A4 landscape gives (297 − 30) / 4 = 66mm, and Letter landscape gives
(279.4 − 30) / 4 = 62mm.

- [ ] **Step 5: Regenerate and run the tests**

Run:
- `pnpm --filter @vandermerwed/switchback run gen`;
- `pnpm --filter @vandermerwed/switchback exec vitest run test/components test/engine`, expecting
  PASS;
- `pnpm --filter @vandermerwed/switchback run gen --check`, expecting "current".

- [ ] **Step 6: Update the diagnostic docs**

In `packages/switchback/docs/errors.md`, change the `W_NARROW` entry to: "Index cards are about
76mm wide. Card sorts with 3 or more piles print on a landscape page, which fits 3 piles of index
cards. With 4 or 5, use the write-in variant." Then run
`pnpm --filter @vandermerwed/switchback exec vitest run test/docs` and expect PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/switchback/components/zones/render.ts packages/switchback/components/card-sort/render.ts packages/switchback/src/generated/components.ts packages/switchback/docs/errors.md packages/switchback/test/components/zones.test.ts packages/switchback/test/components/card-sort.test.ts
git commit -m "feat(cli): zones and card sorts go landscape when they are wide" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Declare the fixed landscape set and lay it out for landscape

**Files:**
- Modify: `orientation` in five `component.json` files, under `packages/switchback/components/`:
  options-criteria, assumption-audit, goal-factoring, perspective-swap and timeline.
- Modify: `orientation` in three presets, under `packages/switchback/presets/`:
  business-model-canvas.json, lean-canvas.json and kanban.json.
- Modify: `packages/switchback/components/timeline/render.ts`, a landscape layout
- Modify: `packages/switchback/components/goal-factoring/render.ts`, a wider middle column in
  landscape
- Test: `packages/switchback/test/engine/landscape-set.test.ts`, plus the e2e layout test (run,
  not changed)

**Interfaces:**
- Consumes: `RenderContext.orientation` (Task 4). Landscape CSS is scoped under `.sb-landscape`
  (Task 3).

- [ ] **Step 1: Write the failing test**

Create `packages/switchback/test/engine/landscape-set.test.ts`:

```ts
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
const PORTRAIT = ["matrix-2x2", "swot", "now-next-later", "dashboard", "pre-mortem", "cover", "question-queue"];

describe("the landscape set", () => {
  it.each(LANDSCAPE)("%s prints landscape", (id) => {
    expect(renderComponent(id, { embedFonts: false }).sidecar?.pages[0]?.orientation).toBe("landscape");
  });

  it.each(PORTRAIT)("%s stays portrait", (id) => {
    expect(renderComponent(id, { embedFonts: false }).sidecar?.pages[0]?.orientation).toBe("portrait");
  });
});
```

- [ ] **Step 2: Run it and check that it fails**

Run: `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/landscape-set.test.ts`
Expected: FAIL for options-criteria, assumption-audit, goal-factoring, perspective-swap and
timeline. The three presets and the zones-based ones already pass through the Task 6 rule.

- [ ] **Step 3: Declare the orientation**

In each of the five component.json files, add `"orientation": "landscape",` directly after
`"phase": ...`. In each of the three presets, add `"orientation": "landscape",` directly after
`"tags": [...]`.

- [ ] **Step 4: Lay out timeline for landscape**

In `packages/switchback/components/timeline/render.ts`, append to the `css` template:

```css
.sb-landscape .sb-c-slot { min-height: 70mm; }
```

Change the render signature to `(data, { h, orientation })`, and change the closing lines to
`h.lines({ count: orientation === "landscape" ? 4 : 8, fill: true })`.

- [ ] **Step 5: Widen goal-factoring's middle column in landscape**

In `packages/switchback/components/goal-factoring/render.ts`, set `css` to:

```ts
export const css = `.sb-c-gf th:nth-child(2) { width: 30mm; } .sb-landscape .sb-c-gf th:nth-child(2) { width: 62mm; }`;
```

- [ ] **Step 6: Run the unit tests**

Run:
- `pnpm --filter @vandermerwed/switchback exec vitest run test/engine/landscape-set.test.ts`,
  expecting PASS;
- `pnpm validate`, expecting no errors.

- [ ] **Step 7: Run the printed-layout test in landscape**

Run: `pnpm --filter @vandermerwed/switchback exec playwright install chromium`, once per machine.
Then run `SWITCHBACK_E2E=1 pnpm --filter @vandermerwed/switchback exec vitest run test/e2e/layout.test.ts`.
On Windows PowerShell, use `$env:SWITCHBACK_E2E="1"; pnpm --filter @vandermerwed/switchback exec vitest run test/e2e/layout.test.ts`.

Expected: PASS for every component example and preset at A4 and Letter. These now render in their
own orientation. If one overflows in landscape, look up its renderer and give it a
`.sb-landscape`-scoped rule, the way Steps 4 and 5 do. Don't loosen the test thresholds.

- [ ] **Step 8: Look at the landscape set**

Run `pnpm --filter @vandermerwed/switchback run contact-sheet --png`, and open the generated sheet
(the command prints its path). Check every landscape page: the columns read wider than in
portrait, nothing is cut off, and nothing sits in a large empty band. Fix any page that fails with
a scoped rule, then rerun Step 7.

- [ ] **Step 9: Commit**

```bash
git add packages/switchback/components packages/switchback/presets packages/switchback/test/engine/landscape-set.test.ts
git commit -m "feat(cli): wide templates print landscape" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: The site shows landscape pages as landscape

**Files:**
- Modify: `site/scripts/generate.mjs`:
  - the catalogue entries at lines 41–70;
  - the preview render at line 76;
  - the showcase page split at lines 176–188.
- Modify: `site/src/pages/docs/components/[id].astro`, line 48 (the frame) and line 175 (its CSS)
- Modify: `site/src/pages/showcase.astro`, lines 46 and 51 (the markup) and lines 94–98 (the CSS)
- Regenerate: `site/example/next-page.html` and `site/public/example/next-page.png`. The card sort
  is now landscape.
- Modify: `site/src/components/RoundTrip.astro`, the `.next-page` figure, for a landscape image
- Regenerate: the committed showcase PDFs in `site/showcase/pdf/`
- Test: `site/tests/catalogue.test.mjs` and `site/tests/showcase.test.mjs`

**Interfaces:**
- Consumes: `sidecar.pages[n].orientation` (Task 4).
- Produces:
  - `catalogue.json` entries carry `orientation`;
  - `showcase.json` `pagePreviews[]` entries carry `orientation`.

- [ ] **Step 1: Write the failing site tests**

Add to `site/tests/catalogue.test.mjs`:

```js
test("each catalogue entry records its page orientation, and the wide ones are landscape", () => {
  const entries = JSON.parse(readFileSync(new URL("../src/generated/catalogue.json", import.meta.url), "utf8"));
  for (const e of entries) assert.ok(["portrait", "landscape"].includes(e.orientation), `${e.id} has an orientation`);
  const landscape = new Set(entries.filter((e) => e.orientation === "landscape").map((e) => e.id));
  for (const id of ["business-model-canvas", "lean-canvas", "kanban", "options-criteria", "timeline"])
    assert.ok(landscape.has(id), `${id} is landscape`);
  assert.ok(!landscape.has("pre-mortem"), "pre-mortem stays portrait");
});
```

Add to `site/tests/showcase.test.mjs`:

```js
test("every showcase page preview records its orientation, and landscape pages are split out whole", () => {
  const entries = JSON.parse(readFileSync(new URL("../src/generated/showcase.json", import.meta.url), "utf8"));
  for (const entry of entries)
    for (const page of entry.pagePreviews) {
      assert.ok(["portrait", "landscape"].includes(page.orientation), `${page.html} has an orientation`);
      const html = readFileSync(new URL(page.html.slice(1), dist), "utf8");
      if (page.orientation === "landscape") assert.match(html, /<section class="sb-page[^"]*sb-landscape/);
    }
});
```

Merge any missing `readFileSync`, `assert` or `test` imports into each file's existing import
block.

- [ ] **Step 2: Build the site and check that the tests fail**

Run: `pnpm site:build`, then `pnpm site:test`.
Expected: the two new tests FAIL, because `orientation` is missing.

- [ ] **Step 3: Record orientation in `generate.mjs`**

The preview loop (`for (const entry of catalogueEntries)`, line 74) renders every entry after the
entries are pushed, and `catalogue.json` is written after that loop (line 86). So set the
orientation inside the preview loop, on the entry object it already holds. Directly before
`writeFileSync(join(previewsDir, ...))`, add:

```js
  entry.orientation = result.sidecar?.pages[0]?.orientation ?? "portrait";
```

In the showcase split, change the page regex to
`/<section class="sb-page[^"]*"[\s\S]*?<\/section>/g`. Without that, a landscape page, whose class
is `"sb-page sb-landscape"`, is not matched. In the `pagePreviews` map, add this to the returned
object:

```js
    orientation: built.sidecar.pages[index]?.orientation ?? "portrait",
```

`built` is the showcase loop's `buildDocument` result. It is already used on the
`writeFileSync(outHtml, built.html, "utf8");` line.

- [ ] **Step 4: Size the component preview frame**

In `site/src/pages/docs/components/[id].astro`, line 48, change the frame to:

```astro
<div class:list={["preview-frame", { "is-landscape": item.orientation === "landscape" }]} data-preview>
```

In the `<style>` block, after the `.preview-frame { ... aspect-ratio: 210 / 297; ... }` rule, add:

```css
.preview-frame.is-landscape {
  aspect-ratio: 297 / 210;
}
```

The JS `fitPreview` scales from the rendered page box, so it needs no change.

- [ ] **Step 5: Size showcase thumbnails and the featured page**

In `site/src/pages/showcase.astro`:
- on the thumbnail span at line 46, add
  `class:list={["thumb-paper", { "is-landscape": page.orientation === "landscape" }]}` in place of
  `class="thumb-paper"`;
- on the feature div at line 51, add
  `class:list={["feature-paper", { "is-landscape": feature.orientation === "landscape" }]}` in place
  of `class="feature-paper"`.

In the `<style>` block, after the `.feature-paper iframe` rule (line 98), add:

```css
  .thumb-paper.is-landscape { width: 150px; height: 106px; }
  .thumb-paper.is-landscape iframe { width: 1123px; height: 794px; }
  .feature-paper.is-landscape { aspect-ratio: 297 / 210; }
  .feature-paper.is-landscape iframe { width: 1123px; height: 794px; transform: scale(.4987); }
```

At max-width 640px, add `.feature-paper.is-landscape iframe { transform: scale(.311); }`. That is
350 ÷ 1123. Put it inside the existing `@media (max-width: 640px)` rule.

- [ ] **Step 6: Recapture the home page's next page**

From the repo root, with a fresh, isolated profile as `site/example/README.md` describes:

```bash
SWITCHBACK_CONFIG_DIR=$(mktemp -d) node packages/switchback/dist/cli.js profile --set pens=blue,red,highlighter --set role.ask=blue --set role.stop=red --set role.crux=highlighter
SWITCHBACK_CONFIG_DIR=<same dir> node packages/switchback/dist/cli.js build site/example/next-page.json -o site/example/next-page.html --json
node site/example/capture.mjs
```

Run `pnpm --filter @vandermerwed/switchback build` first, so `dist/cli.js` has the new renderer.
`next-page.png` is now about 2246×1588.

In `site/src/components/RoundTrip.astro`, change the next-page `<img>` attributes to
`width="2246" height="1588"`. Update its `alt` to: "The next page, W2-P1, Which stories make the
talk: three empty piles headed In the talk, If there is time, and Cut, on a landscape page". In
the same component's CSS, change `grid-template-columns: minmax(0, 1fr) minmax(150px, 0.42fr);`
under `.reply-art` to `minmax(0, 1fr) minmax(190px, 0.5fr)`, so the landscape thumbnail reads.

- [ ] **Step 7: Refresh the showcase PDFs and run the site tests**

Run from the repo root:

```bash
SWITCHBACK_UPDATE_SHOWCASE_PDFS=1 pnpm site:build
pnpm site:test
```

On PowerShell, use `$env:SWITCHBACK_UPDATE_SHOWCASE_PDFS="1"; pnpm site:build`.

Expected: all site tests PASS, including the two new ones, and any showcase PDF with a landscape
page is rewritten in `site/showcase/pdf/`.

- [ ] **Step 8: Look at it**

Run `pnpm site:dev`, then open `/docs/components/business-model-canvas/`, `/showcase/` and `/` at
1440px wide:
- the component preview is a landscape frame;
- landscape thumbnails are landscape;
- the home page's next page sits beside the reply without overflow at 1440px and 390px.

- [ ] **Step 9: Commit**

```bash
git add site
git commit -m "feat(site): show landscape pages as landscape" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Docs and the skill

**Files:**
- Modify: `site/src/content/docs/docs/troubleshooting.mdx`
- Modify: `skills/switchback/references/workbook.md`, lines 93–96 and 111–112
- Modify: `skills/switchback/references/stationery.md`, line 29
- Modify: `skills/switchback/references/report.md`, line 78

**Interfaces:**
- Consumes: the behaviour from Tasks 4, 6 and 7.

- [ ] **Step 1: Troubleshooting**

Add this section to `site/src/content/docs/docs/troubleshooting.mdx`:

```mdx
## Some pages print sideways

Wide pages, such as the business model canvas, kanban, a card sort with three or more piles, or a
comparison of options, print on landscape pages inside an otherwise portrait PDF. Print the PDF as
it is and keep the printer's auto-rotate on. If you print the HTML page instead, use Chrome or
Edge, which honour each page's orientation.
```

- [ ] **Step 2: The skill**

In `skills/switchback/references/workbook.md`, after the line that begins "- `prompt` is the
sentence printed under the page's title", add:

```md
- `orientation` (`"portrait"` or `"landscape"`) is optional. Wide pages already print landscape
  (canvases, kanban, card sorts with 3 or more piles, options against criteria, timelines), so set
  it only to override the template.
```

Replace the "Card sort on portrait paper" bullet with:

```md
- **Card sort:** 3 or more piles print on a landscape page. Index cards fit 3 piles; with 4 or 5,
  use the `write-in` variant. The CLI warns with `W_NARROW` if you get this wrong.
```

In `skills/switchback/references/stationery.md`, line 29, replace "so a card sort on either size
prefers landscape or a write-in variant." with "so a card sort prints landscape from 3 piles, and
uses the write-in variant past 3."

In `skills/switchback/references/report.md`, line 78, replace "the print-design pass (landscape);
`W_NARROW` warns meanwhile" with "landscape pages from 3 piles; `W_NARROW` warns past 3".

- [ ] **Step 3: Lint and test**

Run from the repo root:
- `pnpm lint`, expecting "ok: 1 skill" and no warnings;
- `pnpm site:build && pnpm site:test`, expecting PASS.

- [ ] **Step 4: Commit**

```bash
git add site/src/content/docs/docs/troubleshooting.mdx skills/switchback/references
git commit -m "docs: landscape pages in the skill and the troubleshooting guide" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Full check and the pull request

- [ ] **Step 1: Run every check CI runs**

From the repo root:

```bash
pnpm lint
pnpm --filter @vandermerwed/switchback run typecheck
pnpm --filter @vandermerwed/switchback run gen --check
pnpm test
pnpm validate
pnpm build
pnpm site:build && pnpm site:test
```

Then run the e2e layout and PDF tests from Task 7, Step 7, plus
`pnpm --filter @vandermerwed/switchback exec vitest run test/engine/pdf.test.ts`.
Expected: everything passes.

- [ ] **Step 2: Open the pull request**

Push `feat/landscape-pages` and open a PR titled "feat: landscape pages for wide templates". Its
body should:
- name the landscape set and the data rules;
- say that one PDF mixes orientations;
- say "Closes #1";
- note that #10 was already fixed by `W_ZONES_COLUMNS` and `E_ZONES_LAYOUT`, with tests, and say
  "Closes #10".

End the body with the Claude Code line.
