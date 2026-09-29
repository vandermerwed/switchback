# Longhand sub-project 1 — Foundation

**Status:** draft for review · **Date:** 2026-09-23
**Parent:** [`2026-09-23-longhand-design.md`](2026-09-23-longhand-design.md). This spec details sub-project 1 and does not reopen the umbrella decisions.

---

## 1. Goal

Ship `@vandermerwed/longhand` v0.1.0, ready to publish: a TypeScript CLI and library that owns the component catalogue and renders print-ready, Field Manual workbooks adapted to the user's kit. All 28 existing printable components are ported to it.

**Done when**

1. `npx @vandermerwed/longhand init`, then `build examples/sync-feature.json --pdf`, produces a Field Manual workbook whose legend reflects the user's pens, together with its sidecar and PDF.
2. All 28 components render in the contact sheet, each passing the structural-parity checks (§12).
3. `longhand validate` passes and CI is green on Ubuntu and Windows (Node 20, 24).
4. The old tree (`slow/`, `_shared/`, `patterns/`) is untouched and still works.

## 2. Scope

**In**

- pnpm monorepo scaffold.
- The package, with six commands: `init · profile · list · show · build · validate`.
- Library exports for the site.
- Page shell and Field Manual print tokens (treatment A · Editorial).
- 28 components ported to per-component folders, with variants.
- The preset mechanism, with one shipped preset (`eisenhower`).
- Registries: `tags`, `legend`, `protocols`, `practices`, and `styles` (Sitting only).
- Profile.
- Kit resolution, pen assignment, fallbacks.
- Sidecar, PDF, agent-readable errors.
- Tests and CI.

**Out (and where it goes)**

| Item | Goes to |
| --- | --- |
| New components (free-recall, if-then, WOOP…) | after the sub-project 2 roster |
| Evidence grades | sub-project 2 (ported claims ship as `unrated`) |
| Series, Incubation, Ritual, and Proof style rules; the `proof` renderer | sub-project 3 |
| Skills, marketplace | sub-project 3 |
| Site | sub-project 4 |
| Deleting the old tree | sub-project 3 |
| Running `npm publish` | a user action, on explicit go-ahead |

## 3. Repository scaffold

```
/
├── package.json              # private root; scripts: build, test, lint, validate, contact-sheet
├── pnpm-workspace.yaml       # packages/*   (site/ added in sub-project 4)
├── tsconfig.base.json        # strict, ES2022, NodeNext
├── biome.json                # lint + format (one tool)
├── .gitattributes            # * text=auto eol=lf
├── .editorconfig
├── .github/workflows/ci.yml
└── packages/longhand/
    ├── package.json          # name @vandermerwed/longhand, bin: longhand, type: module
    ├── tsup.config.ts
    ├── src/
    │   ├── cli/              # one file per command + argv parsing (node:util parseArgs)
    │   ├── engine/           # spec · validate · kit · pens · variants · presets · template · render · sidecar · pdf
    │   ├── shell/            # page shell, print tokens (CSS), fonts
    │   ├── registry/         # loaders + JSON Schemas for every registry file
    │   ├── generated/        # components index (codegen; CI fails if stale)
    │   └── index.ts          # library API
    ├── components/<id>/      # component.json · render.ts · examples/*.json
    ├── presets/eisenhower.json
    ├── registry/             # tags.json · legend.json · protocols.json · practices.json · styles.json
    ├── assets/fonts/         # WOFF2 Latin subsets + OFL licences
    ├── examples/             # sync-feature.json (migrated from slow/to-workbook/assets)
    └── test/
```

**Runtime dependencies (exactly four):** `ajv` (+ `ajv-formats`), `@clack/prompts`, `puppeteer-core`, `env-paths`.
**Dev dependencies:** `typescript`, `tsup`, `vitest`, `@biomejs/biome`, `playwright` (CI screenshots only), `tsx` (scripts).

## 4. Spec format v1

```jsonc
{
  "longhand": 1,                        // format version (required)
  "style": "sitting",                   // default "sitting"
  "title": "Should we kill the sync feature?",
  "subtitle": "Is the sync feature worth what it costs to keep?",
  "paper": "A4",                        // A4 | Letter (A5 deferred until the layouts are paper-aware); default from profile, else A4
  "round": 1,
  "timebox": "40 min",
  "kit": { },                           // optional; same shape as profile.kit; overrides the profile
  "legend_strip": true,
  "pages": [
    {
      "id": "W1-P3",                    // required, unique; pattern ^W\d+-P\d+$
      "component": "options-criteria",  // a component id or preset id
      "variant": "default",             // optional; otherwise chosen by kit (§7)
      "title": "Options vs what they cost",
      "prompt": "…",                    // optional; overrides the component's template
      "notes": "…",
      "data": { }                       // validated against the component's JSON Schema
    }
  ]
}
```

- The spec itself is validated by a JSON Schema at `src/registry/schemas/spec.schema.json`.
- **Legacy keys** (`archetype`, `stationery`, `kind`, `meta`) produce error code `E_LEGACY_KEY`, with a `fix` naming the replacement.
- There is no silent compatibility layer. The one legacy example is migrated by hand.

## 5. Component contract

### 5.1 `component.json`

The umbrella §5.3 schema, plus two fields:

```jsonc
{
  "shell": { "header": true, "prompt": true, "legend": true },   // defaults all true; cover sets header:false, legend:false
  "variants": [                                                   // ordered by preference; first satisfiable wins
    { "id": "cut-out",     "requires": ["scissors"],    "label": "Cut the cards apart" },
    { "id": "index-cards", "requires": ["index_cards"], "label": "Write one per index card" },
    { "id": "write-in",    "requires": [],              "label": "Write into the columns" }
  ]
}
```

- Components with one form declare `[{ "id": "default", "requires": [] }]`.
- `physical.requires` lists only what *every* variant needs (usually `printer`).
- Variant-specific needs live on the variant.

### 5.2 `render.ts`

```ts
import type { Render } from "../../src/engine/types";

export const render: Render<PreMortemData> = (data, ctx) => ctx.h.stack(
  ctx.h.note("Why did it fail? What did we miss? Don't be kind."),
  ctx.h.lines({ fill: true }),
  ctx.h.heading("The most plausible failure — the one worth preventing"),
  ctx.h.box({ height: 46 }),
);
```

- **`ctx`** = `{ paper, variant, kit, pens, page: { id, title }, spec: { title, subtitle, round, timebox, pages }, h }`.
- **`h`** is the shared helper kit: `esc`, `stack`, `note`, `heading`, `lines`, `box`, `cutGrid`, `zones`, `table`, `check`, `callout`, `legendTable`, `svg`.
- Components never write raw CSS values for rules, type, or spacing; they use helpers and token classes. That is what keeps all 28 on one design system.
- `render` is pure and deterministic, with no I/O and no clock. That is what makes snapshots stable and lets the site import it.

### 5.3 Prompt templates

- The existing `{key|fallback}` syntax is kept.
- Context: `data`, plus `subject` (`data.subject` → spec `subtitle` → "this"), `horizon` ("six months"), `constraint` ("the main constraint").
- A page's own `prompt` wins.

## 6. Kit, profile, and pens

### 6.1 Kit shape (shared by `spec.kit` and `profile.kit`)

```jsonc
{
  "paper": "A4", "printer": "mono",                         // mono | colour
  "pens": [ { "colour": "blue" }, { "colour": "red" }, { "colour": "pink", "role": "keep" } ],
  "highlighter": true, "pencil": true,
  "scissors": true, "tape": false, "glue": false,
  "index_cards": false, "sticky_notes": true, "coins": true,
  "timer": true, "wall_space": false, "camera": true
}
```

- Stationery tokens used in `requires` are the keys of this object; `pen` is always satisfied.
- `validate` rejects a component that `requires` an unknown token.

### 6.2 Resolution

1. Start from the **minimum kit**: A4, mono, black pen, one highlighter, camera.
2. Overlay `profile.kit`.
3. Overlay `spec.kit`.

The result and its source are recorded in the sidecar.

### 6.3 Pen assignment

Roles come from `registry/legend.json`. Each role has `{ id, code, name, meaning, short, suggested: string[], priority, proof_action }`.

For roles in priority order (Ask, Stop, Keep, Crux, Maybe, Sense, Draft):

1. An explicit `{ colour, role }` in the kit wins.
2. Otherwise, the first unused pen whose colour is in the role's `suggested` list.
3. Crux → the highlighter if present. Draft → the pencil if present.
4. Otherwise → **letter mode**: circled code.

Reason is always the black pen.

- Unmatched pens stay unassigned (never guessed).
- `build` reports them: *"you have a pink pen with no role; set one with `longhand profile`"*.

### 6.4 Profile

- **Path:** `envPaths('longhand').config/profile.json`.
- **Shape:** `{ "version": 1, "kit": <kit>, "defaults": { "style": "sitting", "sitting": "40 min" } }`.
- **Migration:** a `migrate(profile)` step runs on every read and upgrades older versions in place, keeping a backup.
- **Named kits are v2** and not built now; the hook is the version switch.

### 6.5 `init` wizard (@clack/prompts)

1. Paper.
2. Printer (mono/colour).
3. Pens: multi-select of common colours plus "other…".
4. Highlighter, pencil.
5. Cutting and sticking (scissors, tape, glue).
6. Index cards, sticky notes, coins.
7. Timer, wall space.
8. Usual sitting length.

It then shows the resulting role mapping as a table and offers to override any role. It writes the profile and prints its path.

`init` is re-runnable: it pre-fills from the existing profile.

## 7. Variants, fallbacks, presets

- **Variant choice:** an explicit `page.variant` must be satisfiable (else `E_VARIANT_UNSATISFIED`). Otherwise take the first variant whose `requires` the kit satisfies. If none does: `E_NO_VARIANT`, with `fix` suggesting components sharing a tag that do fit.
- **Substitutions** (anything other than the first-preference variant) are listed in `build` output and the sidecar.
- **Presets:** `page.component` may be a preset id. The engine merges `preset.data` under `page.data` (the page wins), renders the base, and records `{ component: base, preset: id }` in the sidecar. The shipped `eisenhower` preset proves the mechanism.

**Variant plan for the port**

| Component | Variants (preference order) |
| --- | --- |
| `card-sort` | `cut-out` [scissors] → `index-cards` [index_cards] → `write-in` |
| `tokens` | `cut-out` [scissors] → `coins` [coins] (labels to write on sticky notes or the page) → `tally` (pen tallies in labelled boxes) |
| `stimulus-die` | `cube` [scissors, tape] → `table` (six numbered faces; "roll any die, or use the last digit of the clock's seconds") |
| `meeple` | `tent` [scissors] → `flat` (printed figures to place a coin on) |
| `question-queue` | `default`. The `blue_pen` requirement is removed; it uses the Ask role (blue or Ⓠ) |
| everything else | `default` |

## 8. Build pipeline

`longhand build <spec> [-o out.html] [--paper P] [--pdf] [--open] [--json]`

1. **Parse + schema-validate** the spec; reject legacy keys.
2. **Load the catalogue** (components, presets, registries).
3. **Resolve the kit** (§6.2) and **assign pens** (§6.3).
4. For each page: resolve preset → base, validate `data` against the base's JSON Schema, choose the variant (§7), resolve the prompt.
5. **Style checks** (`styles.json`, Sitting only in this sub-project): page budget ≤10 (error `E_BUDGET`); last three pages are `commit`, `question-queue`, `return-checklist` in that order (warning); phase mixing is recorded, with rules added in sub-project 3.
6. **Render** each page inside the shell. Assemble one HTML document with inlined CSS and fonts.
7. **Write** `out.html` (default: next to the spec) and the sidecar `out.longhand.json`.
8. `--pdf`: write `out.pdf` via `puppeteer-core` (§10).
9. Print a summary: pages, paper, pen mapping, substitutions, warnings. With `--json`, emit one machine-readable result.

**Exit codes:** 0 ok (warnings allowed), 1 validation error, 2 usage error, 3 PDF requested but unavailable (the HTML is still written).

## 9. Sidecar

```jsonc
{
  "longhand": 1, "cli": "0.1.0", "built_at": "2026-09-23T18:04:00Z",
  "spec": "longhand/2026-09-23-kill-sync/spec.json",
  "title": "…", "style": "sitting", "round": 1, "paper": "A4",
  "kit_source": ["minimum", "profile", "spec"],
  "pens": { "ask": { "pen": "blue" }, "sense": { "letter": "P" }, "…": {} },
  "pages": [
    { "id": "W1-P3", "component": "options-criteria", "preset": null, "variant": "default",
      "title": "…", "prompt": "…", "readback": "…", "data": { } }
  ],
  "substitutions": [ { "page": "W1-P5", "component": "card-sort", "wanted": "cut-out", "used": "write-in", "missing": ["scissors"] } ],
  "warnings": []
}
```

- `built_at` is the only non-deterministic field.
- Tests pin it via an injected clock.

## 10. PDF

- `puppeteer-core` launched against the first browser found: `LONGHAND_CHROME` env, then OS-specific Chrome/Edge/Chromium paths (a port of the Python `find_chrome`), then `which` on Linux.
- Settings: `printBackground: true`, `preferCSSPageSize: true`, zero margins.
- If no browser is found: exit 3, keep the HTML, and print manual settings ("Print → Margins: None → Background graphics: on").

## 11. Print design system: Field Manual · Editorial

Tokens live in `src/shell/tokens.css` and are exported for the site.

| Token | Value |
| --- | --- |
| Page margins | 14 / 15 / 16 / 15 mm (top / right / bottom / left) |
| Registration marks | 5 mm L-rules, inset 5 mm, 0.5 pt `#9a9a9a` |
| Header | page ID in JetBrains Mono 9 pt bold · title in Fraunces 600, 14 pt · component name in JetBrains Mono 7 pt uppercase `#8a8a8a`, right-aligned · 0.5 pt rule beneath |
| Prompt | Fraunces italic 13 pt / 1.3 |
| Body, notes, tables | Inter 9–10 pt; notes `#555` |
| Writing lines | 10 mm pitch, 0.4 pt `#b8b8b8` |
| Write-in boxes | **solid** 0.6 pt `#a8a8a8`, 1.5 mm radius |
| Cut and fold lines | cut = **dashed** 0.7 pt `#8a8a8a`; fold = **dotted** 0.7 pt (the "cut on dashed, fold on dotted" convention; CSS cannot draw long dashes); cut edges carry a ✂︎ glyph |
| Tables | 0.5 pt `#9a9a9a` hairlines, **no fills or stripes** |
| Legend strip | JetBrains Mono 6.5 pt `#777`, 0.4 pt top rule, 6 mm from the bottom edge |
| Colour | **none**: every value is neutral grey or black |

**Rules the shell enforces**

- **Dashed means cut or fold; solid means write.** Today's dashed write-boxes become solid. This makes cutting instructions unambiguous on the page itself.
- **No colour on the page**, including in headings and callouts. Today's red and blue headings and coloured callout borders are removed. Callout tone becomes a mono glyph (`Q`, `!`, `i`).
- Text that must survive a phone photo is no lighter than `#777`. Lines are light enough not to compete with ink.
- Writing areas **fill the page** (flex layouts from today's `fill` classes). Pages must not end in dead space.

**Fonts:** the @fontsource Latin subsets (U+0000–00FF, U+2000–206F and common punctuation) of Fraunces (600, 400 italic), Inter (400, 600), and JetBrains Mono (400, 700): six WOFF2 files with their OFL licences, inlined as base64 `@font-face`. Symbols outside Latin (✂ ✕ ○ ● ◐ → ▭) fall back to the system symbol font via `--lh-symbol`. Budget: ≤250 KB per document; a test enforces it.

## 12. Porting the 28 components

- **Pages:** cover, brain-dump, feynman, node-map, card-sort, timeline, matrix-2x2, options-criteria, assumption-audit, five-whys, pre-mortem, constraint-removal, forced-connections, ten-bad-ideas, perspective-swap, commit, question-queue, return-checklist, sheet.
- **Pieces:** player-aid, tokens, tracker, zones, stimulus-die, timer, scoresheet, meeple.

For each component:

1. `component.json` from the registry entry: intent, when, physical, readback, prompt template. Tags and phase are assigned by the lead from the umbrella tag set. `data` hint strings are rewritten as JSON Schema. Existing `grounding` becomes `claims[]` with `grade: "unrated"`, `transfer: null`, and sources carried over as `cite` strings (DOIs are added in sub-project 2).
2. `render.ts` ported from the Python function onto the helpers and tokens, with all printed colour removed.
3. `examples/default.json` from the registry `spec` fragment, plus a variant example wherever there is more than one variant.

**Structural parity checks** (automated, per example):

- It renders with no errors and exactly one `.page` per spec page.
- Every `data` field the Python renderer honoured still appears in the output. A test asserts each supplied string is present.
- Writing areas are no smaller than Python's: a declared minimum height per component, asserted in a Playwright check of the contact sheet.
- No colour: a CSS lint rejects any non-neutral colour value in shell and component output.

**Visual QA:** `pnpm contact-sheet` renders every component and variant example onto one review page (A4 frames in a grid), plus a PDF of it. The lead reviews it before and after the port. It is uploaded as a CI artifact and never committed to the repo.

**Deviations from this plan, recorded during the final-review fix wave:**

- The contact sheet ships as HTML plus PNG, not a PDF as this section originally called for.
- "A declared minimum height per component, asserted in a Playwright check of the contact sheet" is implemented instead as global selector thresholds — rule ≥ 9.5 mm, box ≥ 18 mm, cut cell ≥ 17 mm, zone ≥ 38 mm — checked in `test/e2e/layout.test.ts` against every component's rendered examples, rather than per-component declared minimums checked against the contact sheet.
- (Research Gate 1, 2026-09-25: `playmat` renamed to `zones`; `playmat` and `dashboard` are now presets of it.)

## 13. Registries shipped in this sub-project

| File | Contents |
| --- | --- |
| `tags.json` | create, decide, learn, plan, diagnose, review, reflect, focus |
| `legend.json` | 8 roles with code, name, meaning, short, suggested colours, priority, proof_action (umbrella §6.1); structural marks; confidence dots |
| `protocols.json` | colour-language, confidence-dots, structural-marks, page-ids, proof-actions (descriptive; `legend.json` is the machine-readable part) |
| `practices.json` | from substrate (6) + object (4) + capture (4): intent, guidance, requires |
| `styles.json` | `sitting` only: budget 10, closing sequence, phase rules placeholder (an empty array; sub-project 3 fills it) |

**`validate` checks**

- Every file against its schema.
- Unique ids across components and presets.
- Tags exist.
- Variant `requires` tokens are known.
- Each preset's base exists and its `data` validates against the base's schema.
- Every component has a renderer and at least one example, and every example builds.
- The generated index is current.
- `--strict` additionally requires every claim to be graded and to have ≥1 source with a DOI.

## 14. CLI surface

| Command | Notes |
| --- | --- |
| `init [--defaults] [--force]` | §6.5. `--defaults` writes the minimum kit without prompting (CI, agents); `--force` skips pre-filling |
| `profile [--json] [--set key=value] [--path]` | `--set pens=blue,red,green` and `--set role.stop=pink` cover every edit without a wizard |
| `list [--kind page\|piece\|preset] [--tag T] [--phase P] [--fits-kit] [--json]` | `--fits-kit` uses the resolved profile kit |
| `show <id> [--json]` | Contract, variants with satisfiability under the current kit, data schema as a readable table, prompt template, readback, claims, presets of it |
| `build` | §8 |
| `validate [spec] [--strict] [--json]` | With no argument: the registry. With a spec: that spec. |

**Global flags:** `--help`, `--version`, `--no-color` (terminal output only).

**`--json` errors:** `[{ "level": "error"|"warning", "code": "E_…", "page": "W1-P3"|null, "path": "/pages/2/data/options", "message": "…", "fix": "…" }]`. The code list is documented in `docs/errors.md` inside the package.

## 15. Library API (for the site, sub-project 4)

```ts
export { loadCatalogue } from "./registry";          // components, presets, registries (typed)
export { buildDocument } from "./engine/build";      // (spec, { kit, clock }) => { html, sidecar, diagnostics }
export { renderComponent } from "./engine/render";   // single component + example → page HTML (for previews)
export { tokensCss, fontFaceCss } from "./shell";
export type * from "./engine/types";
```

## 16. Testing

- **Unit (vitest):** kit overlay; pen assignment (explicit, suggested match, highlighter/pencil, letter mode, unmatched pens); variant selection and `E_NO_VARIANT`; preset merge; template resolution; style checks; profile migration; legacy-key errors; sidecar determinism with an injected clock.
- **Snapshot:** HTML for every example of every component (fonts stubbed out of snapshots to keep them small).
- **Parity:** §12 checks.
- **CLI:** `init` driven non-interactively via `--defaults`; `build`/`validate` exit codes and `--json` shapes.
- **Integration (CI only):** `build --pdf` of the example on Ubuntu using the runner's Chrome; Playwright screenshot of the contact sheet uploaded as an artifact.
- **Matrix:** Ubuntu + Windows × Node 20 + 24.

## 17. Risks

| Risk | Mitigation |
| --- | --- |
| Fraunces italic subsets are larger than expected, breaking the 250 KB budget | Drop the 400 italic in favour of a synthetic slant for prompts, or subset tighter; the test makes it visible |
| Windows path and newline quirks | `.gitattributes` eol=lf; `node:path` everywhere; Windows in the CI matrix |
| The port subtly shrinks writing areas | Per-component minimum heights asserted in CI |
| The old skills and new CLI diverge during the gap before sub-project 3 | Accepted: the old tree is frozen, and nothing new is added to it |
| A `puppeteer-core` / Chrome version mismatch | We drive the installed browser via CDP only with basic PDF options; tested in CI with the runner's Chrome |
