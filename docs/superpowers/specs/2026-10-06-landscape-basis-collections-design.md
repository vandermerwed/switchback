# Landscape pages, a declared basis, and collections

Date: 2026-10-06. Status: approved in conversation, awaiting review of this written spec.

## Why

Daniel asked for three changes to the template catalogue:

1. Templates that are squished horizontally on a portrait page should print landscape.
2. Collections should exist now. They were parked behind the monetisation brief's unit-of-sale
   question (T19 in `Forge/working/switchback/2026-09-29-open-source-brand-monetisation-brief.md`),
   but what a collection is does not depend on whether any collection is ever sold.
3. Research backing should be optional. "It's great to back templates by research but not all of
   them need to be." Today every component must carry graded grounding to pass CI.

Success looks like this:

- A wide template prints on a landscape page inside an otherwise portrait workbook.
- A template can say plainly that it makes no research claim and where it comes from.
- The catalogue is browsable by collection in the CLI, the skill and the site.
- A first practical collection (Game dev) ships with templates that make no claim.

## Decisions from the conversation

| Question | Answer |
| --- | --- |
| What is a collection? | A themed shelf: a named set of templates around one area. It can include existing templates and add its own. The agent draws from it when a request fits. |
| Sources in the first cut | Core only, built to extend. Personal and community collections come later and need no format change. |
| First shelf | Today's templates sorted into collections, plus one new collection of templates that make no research claim. |
| The new collection | Game dev. |
| How a template without research presents itself | A declared basis: `research` (graded claims) or `practice` (no claims, plus where it comes from). |
| Storage | Collection folders. Membership is stored on the collection as references, never as copies. |

## Non-goals

- Personal, private and community collections. The folder format is the extension point, but
  the first cut reads collections from the package only.
- Paid collections, free tiers and partner collections. These are still the monetisation brief's
  questions.
- D&D, Boardgames and Finances content. They are future collections.
- New components with render code for Game dev. Its new templates are presets of existing
  components.
- Landscape for the 2×2 matrices or the stacked zone presets (now-next-later,
  start-stop-continue, playmat, dashboard). The audit found them fine in portrait.
- Changing the grounding of styles. Styles stay research-backed.

## Part A: Landscape pages

### Where orientation comes from

`orientation` is `"portrait"` or `"landscape"`. It can be declared on:

- a component (`component.json`, top level; default `portrait`);
- a variant (`variants[].orientation`);
- a preset (`orientation`, top level);
- a page in a workbook spec (`pages[].orientation`), so the agent or the person can override it.

A component can also decide from its data. Its `render.ts` may export
`orientation(data, variantId): "portrait" | "landscape" | undefined`.

The first declared value wins, in this order:

1. the spec page;
2. the preset;
3. the variant;
4. the component's `orientation()` rule;
5. the component's default;
6. `portrait`.

Two components get data rules:

- **zones**: landscape when `columns` is 3 or more, or when a `layout` is given.
- **card-sort**: landscape when there are 3 or more piles. For the `index-cards` variant, the
  existing `W_NARROW` check is recomputed from the real page width.

### Renderer

`src/shell/page.ts` stops emitting one global `@page` rule and emits two named pages. For A4:

```css
@page sb-portrait  { size: A4;           margin: 0; }
@page sb-landscape { size: A4 landscape; margin: 0; }
```

Letter works the same way, with `letter` and `letter landscape`. In the page tokens
(`src/shell/tokens.ts`), `.sb-page` gets `page: sb-portrait`, and
`.sb-page.sb-landscape { page: sb-landscape; width: var(--sb-h); height: var(--sb-w); }`. The
build resolves each page's orientation and sets the class.

`src/engine/pdf.ts` already passes `preferCSSPageSize: true`, so a single PDF mixes the two
sizes. That route was proven in an earlier spike (`docs/superpowers/specs/2026-09-27-longhand-skills-design.md`,
"Deferred to the print-design pass").

The sidecar records each page's `orientation` on `SidecarPage`. Read mode needs no change.

### The landscape set

Chosen from a visual audit of all 48 previews at A4 portrait on 2026-10-06:

| Template | Kind | Why it goes landscape |
| --- | --- | --- |
| business-model-canvas | preset | five columns about 30mm wide |
| lean-canvas | preset | the same canvas shape |
| kanban | preset | three tall, narrow lanes |
| options-criteria | component | six columns; the criteria columns are about 25mm |
| assumption-audit | component | a four-column table whose text columns wrap |
| goal-factoring | component | its middle column header wraps onto six lines |
| perspective-swap | component | three narrow writing columns |
| timeline | component | six slots of about 28mm above an empty page |
| zones | component | by its data rule |
| card-sort | component | by its data rule |

Every template in the set gets a layout pass in landscape, not just a rotated box. For example,
timeline's six slots become tall writing columns that use the page height, and fixed mm minimums
that only fitted a portrait body are checked. A template that is not in the set does not change.

### Site, docs and skill

- **Site:**
  - `site/scripts/generate.mjs` renders each preview in its resolved orientation, and
    `catalogue.json` carries `orientation`.
  - `site/src/pages/docs/components/[id].astro` sizes its preview frame from it (no more fixed
    `210 / 297`).
  - `site/src/pages/showcase.astro` sizes each thumbnail iframe from the page's orientation.
- **Docs:**
  - `troubleshooting.mdx` gets a short section on printing a workbook with landscape pages: print
    the PDF as is, and keep auto-rotate on. From the HTML fallback, Chrome and Edge honour the
    named pages.
  - `docs/errors.md` documents any new diagnostic.
- **Skill:** the card-sort note in `skills/switchback/references/stationery.md` becomes
  accurate, and the reference that lists spec page fields documents `orientation` as an override.

### Issues

Closes #1. Closes #10, which is already fixed in `components/zones/render.ts` by
`W_ZONES_COLUMNS` and `E_ZONES_LAYOUT` and covered by tests. The PR says so.

### Tests

- Orientation precedence, one case per level.
- The zones and card-sort data rules.
- A mixed workbook builds one PDF whose pages have portrait and landscape sizes.
- The e2e layout test (`test/e2e/layout.test.ts`) checks every template's example for overflow
  in its own orientation, at A4 and Letter.
- The sidecar records orientation.

## Part B: A declared basis

### Schema

- Every component gets a required `basis`, either `"research"` or `"practice"`.
- With `research`, `grounding` is required, as today.
- With `practice`, `grounding` must be absent, and `origin` is required. `origin` is one line,
  160 characters at most, on where the format comes from, for example "A common one-page game
  design document".
- A preset inherits its base component's basis unless it declares its own.
  - A preset whose basis is `research` needs grounding in strict mode, as today.
  - A preset whose basis is `practice` must not carry grounding. Its existing, required
    `attribution` line serves as its origin, so presets get no new field.
- Variants may carry grounding only inside a research template.
- Styles stay research-backed and are unchanged.

### Validation

These new diagnostics are added to `docs/errors.md` and to the error test:

| Code | When |
| --- | --- |
| `E_BASIS_CLAIMS` | a template whose basis is `practice` carries grounding, on the template or on a variant |
| `E_BASIS_ORIGIN` | a component whose basis is `practice` has no `origin` |

Strict mode (`validate --strict`) applies `strictGrounding` only to templates whose basis is
`research`. The research workflow's drift check (`apply-grounding.ts --check`) skips practice
templates, which have no entries in `research/grounding.json`.

### Migration

- All 37 components get `"basis": "research"`. The 11 presets inherit it. Nothing else changes for
  them.
- `registry/collection.json` (the catalogue-wide claim about handwriting) is renamed
  `registry/catalogue.json`, to free the word "collection":
  - the type `Collection` becomes `Catalogue`;
  - the registry key becomes `catalogue`;
  - the validator and its docs follow.

### Where people see it

- **`switchback show`** prints `basis: research-backed` followed by the grounding as today, or
  `basis: practical template` followed by the origin.
- **`switchback list`** gains `--basis research|practice` and marks practical templates in its
  table.
- **On the site:**
  - `catalogue.json` carries `basis` and `origin`.
  - Each component page shows a "Research-backed" badge with the grades, or "Practical template"
    with the origin.
  - The evidence page (`evidence.mdx`) opens with the two kinds of template.
- **In `PRODUCT.md`:**
  - The positioning sentence becomes: "Where a component or style makes a claim, it carries an
    explicit grade and sources. Practical templates make no claim and say where they come from."
  - Principle 4 is reworded the same way.
- **In CI:** the comment in `.github/workflows/ci.yml` changes to "every research-backed item must
  carry graded grounding".

### The agent

The agent picks templates by fit, whatever their basis. Wherever it explains a page, it cites
grounding only for research templates and never implies evidence for a practical one. If someone
asks for evidence-backed pages only, it filters with `list --basis research`. The skill references
that talk about grounding are updated to say this.

### Tests

- A practice component with grounding fails with `E_BASIS_CLAIMS`.
- A practice component without an origin fails with `E_BASIS_ORIGIN`.
- A research component still needs graded, sourced claims in strict mode.
- A preset inherits its base component's basis.
- `show` and `list --basis` output.
- The rename of `collection` to `catalogue` in the registry and its validation.

## Part C: Collections

### On disk

```
packages/switchback/collections/<id>/
  collection.json
  presets/<preset-id>.json     (optional: the collection's own templates)
```

`collection.json` has these fields, with `additionalProperties: false`:

| Field | Rule |
| --- | --- |
| `id` | kebab-case; the folder name |
| `name` | required |
| `description` | one line, 160 characters at most |
| `includes` | required: a list of template ids (components or presets, from core or any collection) |
| `grounding` | optional: collection-level claims, strict-checked when present and never inherited by members |

A collection's own presets use the existing preset schema, with `basis` required.

**Membership is by reference.** A template file lives in exactly one place: core templates in
`components/` and `presets/`, a collection's own templates in its folder. Any collection that
includes a template points at that one file. The CLI and the site compute the reverse index, so
`show kanban` prints the collections that include it and nobody maintains both sides. A personal
or community collection later is another folder with the same shape, so it can include core
templates without editing them.

### Loader and validation

`src/registry/registries.ts` loads `collections/*/collection.json` and
`collections/*/presets/*.json`. The presets join the preset registry and record which collection
they came from. `package.json` `files` adds `collections`, so the npm package and the npx
fallback ship them.

| Code | When |
| --- | --- |
| `E_COLLECTION_INCLUDE` | an `includes` id does not resolve to a template |
| `E_DUPLICATE_ID` | an id is defined twice anywhere: in core components, core presets or any collection's presets |
| `E_COLLECTION_ID` | a collection id clashes with a template id or another collection |

### CLI

- `switchback collections [--json]` lists the collections with their template counts and
  descriptions.
- `switchback list --collection <id>` filters the template table. It combines with the existing
  filters.
- `switchback show <collection-id>` prints a collection: its description, its own templates, the
  templates it includes, and each one's basis.
- `switchback show <template-id>` adds a `collections:` line.

### Skill

`skills/switchback/references/workbook.md` gains a step: when a request is about an area a
collection covers, run `switchback collections` and `switchback list --collection <id>`, prefer
that collection's templates where they fit, and name the collection in the confirmation message.
Collections never fence anything off; any template stays usable in any workbook.

### Site

- `generate.mjs` writes the collections into `catalogue.json`, with each template's `collections`.
- A new `/docs/collections/` page lists the collections.
- A new `/docs/collections/<id>/` page shows a collection's description and its templates, with
  previews and basis badges.
- Component pages show "In collections: …", linked.
- The docs sidebar gets a Collections entry.

### The first shelf

Today's templates, sorted by what they are for. This is a starting point for Daniel to edit. A
template can sit on several shelves.

| Collection | Includes |
| --- | --- |
| Planning (`planning`) | now-next-later, kanban, timeline, card-sort, impact-effort, eisenhower, pre-mortem, forecast, small-experiment, mental-contrast, commit |
| Productivity (`productivity`) | eisenhower, kanban, dashboard, check-in, brain-dump, timer, scoresheet, start-stop-continue, goal-factoring, worst-case |
| Business (`business`) | business-model-canvas, lean-canvas, swot, power-interest, options-criteria, assumption-audit, pre-mortem, forecast |
| Product (`product`) | lean-canvas, assumption-audit, impact-effort, options-criteria, small-experiment, pre-mortem, card-sort, perspective-swap, now-next-later |
| Systems Thinking (`systems-thinking`) | node-map, five-whys, frame-by-frame, goal-factoring, constraint-removal, assumption-audit |
| Design (`design`) | ten-bad-ideas, forced-connections, stimulus-die, constraint-removal, perspective-swap, brain-dump, card-sort, matrix-2x2 |
| Engineering (`engineering`) | sheet, proof, five-whys, pre-mortem, assumption-audit, frame-by-frame, options-criteria, question-queue |
| Learning (`learning`) | free-recall, feynman, self-explain, practice-audit, question-queue, node-map |

The workbook structure and generic pieces sit in no collection: cover, return-checklist,
step-away, player-aid, tokens, zones, playmat. The styles add them, and they stay usable anywhere.

### Game dev (`game-dev`), the first practical collection

**Description:** "For designing, scoping and playtesting a game."

**Includes:** ten-bad-ideas, forced-connections, stimulus-die, pre-mortem, impact-effort,
small-experiment, timeline.

**Its own templates.** Each is a preset of an existing component, with `"basis": "practice"`. The
`attribution` line is its origin.

| Id | Extends | What it is | Attribution |
| --- | --- | --- | --- |
| `game-one-pager` | zones (landscape, by layout) | Pitch across the top. Then core fantasy, core loop (the largest zone), player verbs, win and lose, biggest risk, scope in and out, art and sound, on the zones grid. | The one-page game design document, a common studio format |
| `core-loop` | node-map | Centre "Core loop". The hint asks for one step of the loop per circle (act, get, grow, come back), with every arrow labelled with a verb. | The core loop diagram, common across game design |
| `playtest-notes` | zones (2 columns) | What players did, where they got stuck, what they said, moments of fun, bugs and rough edges, and what to change before the next playtest. | Playtest observation sheets, common practice in game design |
| `feature-cut` | card-sort (landscape, three piles) | Sort the feature list into must have, nice to have, and cut. | Scope cutting by priority piles, common practice |

Each preset's exact `data` is written during implementation against the component's data schema,
and each must render without overflow and validate. Their `licence` is "idea; no restriction".

### Tests

- Collections load.
- `includes` resolve, and an unknown include fails.
- Duplicate ids and clashing collection ids fail.
- The reverse index is right.
- `collections`, `list --collection` and `show <collection>` output.
- Every Game dev preset validates and renders without overflow in its orientation.
- The site builds the collection pages, and every link resolves.

## Rollout

Three pull requests, in this order. Each is releasable on its own.

1. **Landscape pages:** Part A.
2. **Research basis:** Part B.
3. **Collections:** Part C. It depends on Part B, because Game dev is practical.

The CLI changes reach users through release-please as the next minor release. Each PR is checked
by CI and a Cloudflare preview. Bounded tasks can go to Codex through Orca if Claude usage is
high, with judgement and review staying on Claude.
