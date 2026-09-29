# Longhand — umbrella design

**Status:** draft for review · **Date:** 2026-09-23 · **Owner:** vandermerwed
**Scope:** the whole redesign. Each sub-project in §15 gets its own detailed spec → plan → build cycle; this document fixes the decisions and the contracts they share.

---

## 1. Intent

**What the user asked for**

- Intentionally bring friction back into AI-assisted work.
- Ground it in proven psychological research.
- Different styles of workbook, with components tagged by what they help with (creativity, learning, …).
- A pattern library that feels like shadcn: "print-first components".
- A skills page in the spirit of aihero.dev/skills, docs structured by Diátaxis, delivery like mattpocock/skills.
- It must look good.

**What we concluded together**

- The standalone printable is a commodity. The product is the **loop**: the agent picks and composes the right pages for the problem and the desk, the human works them in ink, and the agent reads the ink back and continues. So Longhand ships as **skills**, not as a component registry. The pattern library is the *documentation* of what the skills can print and why.
- Every claim about why a component works carries an **evidence grade** and primary sources. Honesty about weak evidence is a feature.

**Success looks like**

1. `npx skills add vandermerwed/<repo>` (or the Claude plugin) installs the four Longhand skills, each self-contained, with no reach into shared folders. The repo name is set when the final name is (D15).
2. From a conversation, `to-workbook` produces a printable workbook in the right *style* for the problem, adapted to the user's saved kit, in one confirmation instead of an interview.
3. `from-paper` reads photos back against the printed sidecar, answers blue first, and, for Proofs, runs a confirmed action queue.
4. Every printable component has a live preview, a free PDF, a props table, and graded, cited grounding on the docs site.
5. The printed pages and the site both read as one considered design (Field Manual).

---

## 2. Principles (carried forward, still binding)

1. **The printer is a scaffold; the human is the colour.** Print black-on-white.
2. **Never put the answer on the page.** It asks; the human answers.
3. **One move per page.**
4. **Letters are the floor, colour is an accelerator.** Every role works with a black pen alone.
5. **Answer blue before offering anything unasked.**
6. **An unfinished workbook is a worked workbook.**
7. **Grade honestly.** A weak claim is labelled weak, never omitted or inflated.

---

## 3. Decision log

| # | Decision | Rejected alternative (and why) |
| --- | --- | --- |
| D1 | Bundle components inside the product; no public component registry | shadcn-style registry (no evidence anyone wants print component *source*; the value is the loop) |
| D2 | *Revised 2026-09-27.* Longhand is a **standalone product repo** with its own name, site and launch, delivered as skills (as impeccable is). A personal skills hub (`/skills` on dvdm.com and Rokkit200.co) is a separate, later project. It curates the user's own skills, their products and third-party collections, and links to this repo rather than vendoring it | A collection inside `vandermerwed/skills` (the original D2). The user's round-1 pre-mortem named "tying it to my skills collection" as a cause of failure. The skills repo held no other collection, so going standalone cost nothing before the first push |
| D3 | Delivery: this repo's own Claude plugin marketplace (one plugin) + `npx skills add vandermerwed/<repo>` | npm-only CLI install of skills |
| D4 | Skills hold **method only**; a TS CLI `@vandermerwed/longhand` holds catalogue, templates, renderer, PDF | Skills carrying all components (bloated context; `_shared/` breaks per-skill install) |
| D5 | Port the Python renderer to **TypeScript**; one component source for CLI, site previews and PDFs | Keep Python via `uvx` (uv far less common; site would need a second renderer) |
| D6 | Workbook **styles** are research-shaped formats: Sitting · Series · Incubation · Ritual · Proof | Purpose-named collections; visual themes (a later, orthogonal layer) |
| D7 | Proof colour actions **derive from existing colour meanings** | A separate command palette (same pen meaning different things on different pages) |
| D8 | Degrade by **role priority**; letter codes as the universal floor | Demanding specific pens |
| D9 | Persistent **profile** with a single `kit`; named kits deferred but migration-ready | Named kits now (YAGNI) |
| D10 | Every grounding claim graded **A/B/C/D** with primary sources + a `transfer` field | Ungraded mechanism + citations (cannot distinguish a meta-analysis from a blog) |
| D11 | Visual direction **Field Manual** | Drafting Table, Riso Zine |
| D12 | Components = curated **moves** with an admission test; frameworks = open-ended **presets** | Unbounded component list (worksheet zoo; grading cost; worse agent selection) |
| D13 | Skill names `to-workbook · to-proof · from-paper · setup-longhand` | `to-review` (collides with code review; breaks the `to-<artifact>` convention); `to-print` (merged into `to-proof`) |
| D14 | Cut `eject` from the CLI | Local component overrides (YAGNI) |
| D15 | *2026-09-27.* **Longhand is the working title.** Everything ships under it until the final name is found. The category line is "Programmable stationery". **Gate:** the final name, plus a collision and trademark check, must come before the GitHub remote or any publish. The rename is then one mechanical pass: a script with a dry run and guardrails, followed by the full test, validate, lint and e2e suite. It covers the package, CLI, config directory, sidecar extension, spec key, `lh-` prefix, env vars and folders. It must not touch `research/`, where "longhand vs laptop" is a real construct, or the executed plans | Renaming now to a provisional name (Inkubate). That would mean two passes if the name changes again, and it would put a working name into data formats |

---

## 4. Repository layout

```
vandermerwed/<repo>                    # standalone product repo (D2); named at the first push (D15)
├── skills/
│   ├── to-workbook/SKILL.md
│   ├── to-proof/SKILL.md
│   ├── from-paper/SKILL.md
│   └── setup-longhand/SKILL.md
├── packages/
│   └── longhand/                      # published as @vandermerwed/longhand
│       ├── src/                       # CLI, engine, page shell, kit resolution
│       ├── components/<id>/           # component.json · render.ts · examples/
│       ├── presets/<id>.json
│       ├── registry/                  # tags.json · styles.json · protocols.json · legend.json · practices.json
│       └── research/<family>.md       # sources, excerpts, grading rationale
├── site/                              # Astro; the product's docs site (the hub is a separate project)
├── .claude-plugin/marketplace.json    # one plugin: the four skills
├── docs/superpowers/specs|plans/
├── CONTEXT.md                         # shared vocabulary (this doc's glossary, §17)
└── package.json · pnpm-workspace.yaml
```

**Self-containment:** the whole repo is the product (D2), so there is no collection boundary to keep. Each skill is still self-contained: it reaches the catalogue only through the CLI, never through shared folders.

The current `slow/`, `_shared/`, and `patterns/` are migrated (§16) and then removed.

---

## 5. Component model

### 5.1 Kinds

| Kind | What | Printable | Source today |
| --- | --- | --- | --- |
| `page` | A thinking move (pre-mortem, feynman…) | yes | archetype layer |
| `piece` | A table component consulted across the sitting (timer, tokens, die…) | yes | component layer |
| `preset` | A named configuration of a `page` or `piece` (Eisenhower = `matrix-2x2` + axes) | yes (via its base) | new |
| `style` | A workbook format (§7) | no | loop layer, reworked |
| `protocol` | A shared convention (colour language, structural marks, confidence dots, proof actions) | no | protocol layer |
| `practice` | Mechanics and technique (registration marks, shared cut lines, photographing pages, index cards) | no | substrate + object + capture |

### 5.2 Printable component folder

```
components/pre-mortem/
├── component.json
├── render.ts          # (data, ctx) => string  — pure; ctx = { paper, kit, pens, page }
└── examples/default.json
```

### 5.3 `component.json`

```jsonc
{
  "id": "pre-mortem",
  "kind": "page",                       // page | piece
  "name": "Pre-mortem",
  "intent": "Make failure vivid before committing, so it can be prevented.",
  "when": "a plan is about to be locked in, or optimism is unexamined",
  "tags": ["decide", "plan"],           // must exist in registry/tags.json
  "phase": "converge",                  // diverge | converge | either
  "physical": {
    "requires": ["printer"],            // "a | b" = alternatives
    "body": ["write"],
    "surface": "desk",
    "timebox": "10 min"
  },
  "fallbacks": [                         // declared, applied mechanically by `build`
    // e.g. card-sort: { "missing": "scissors", "variant": "write-in" }
  ],
  "variants": ["default"],              // render.ts receives the chosen variant in ctx
  "data": { /* JSON Schema (draft 2020-12) for the page's data */ },
  "prompt": "It is {horizon} from now and {subject} has failed. Write the story of how.",
  "readback": "The most plausible failure is usually half-known; ask which part is preventable this week.",
  "grounding": {
    "claims": [
      {
        "claim": "Imagining an outcome has already occurred increases the reasons people generate for it",
        "construct": "prospective hindsight",
        "grade": "B",                   // A | B | C | D  (rubric §13.2)
        "transfer": "adjacent",         // direct | adjacent | analogical
        "sources": [
          { "cite": "Mitchell, Russo & Pennington (1989)", "doi": "10.1002/bdm.3960020103", "type": "experiment" }
        ],
        "rationale": "research/decision.md#prospective-hindsight"
      }
    ],
    "helps": "…",
    "backfires": "…"
  }
}
```

- Citations in this example (and in §5.4) are illustrative; sub-project 2 verifies every source before anything is published.
- **Displayed grade** = the lowest grade among the component's load-bearing claims. It never overstates.
- `data` becomes real JSON Schema (replacing today's hint strings). The CLI validates specs against it; the site renders it as a props table.
- `prompt` keeps the existing `{key|fallback}` template syntax.

### 5.4 Presets

```jsonc
{
  "id": "eisenhower",
  "kind": "preset",
  "extends": "matrix-2x2",
  "name": "Eisenhower matrix",
  "tags": ["decide", "focus"],
  "data": { "x_axis": ["not urgent", "urgent"], "y_axis": ["not important", "important"] },
  "attribution": "Popularised by Stephen Covey (1989), after Eisenhower",
  "licence": "idea — no restriction",
  "grounding": { "claims": [ /* optional additions, e.g. the mere-urgency effect (Zhu, Yang & Hsee, 2018) */ ] }
}
```

A preset inherits its base's grounding and may add claims. Its `data` must validate against the base schema.

### 5.5 Admission test

**A new component** (`page` or `piece`) must pass all six:

1. **Distinct move.** No existing component performs it, even with a preset.
2. **Earns the paper.** Hands, body, or space help. If it's better in a spreadsheet, it's out.
3. **Asks, not tells.** Most of the page is for the human to fill.
4. **Known backfire.** We can state when it hurts.
5. **Read-back-able.** An agent can decode it from a phone photo at hand-writing scale.
6. **Honestly graded.** D is admissible; unlabelled is not.

**A new preset** needs a clear name, attribution, and a licence that permits redistribution.

**Growth is research-first.** New components come from robust mechanisms that have no page yet, not from framework lists. Known gaps to evaluate in sub-project 2: free-recall (retrieval practice), if-then plan (implementation intentions), WOOP (mental contrasting), explain-each-step (self-explanation), and the Ritual page (expressive writing).

### 5.6 Registries

All in `packages/longhand/registry/`, validated by `longhand validate` in CI:

- `tags.json`: `{ id, label, description }`. v1 set: `create, decide, learn, plan, diagnose, review, reflect, focus`. Extensible by adding an entry.
- `styles.json` (§7), `protocols.json` (§6), `legend.json` (colour roles, codes, priority, proof actions), `practices.json`.

---

## 6. Protocols

### 6.1 Colour language (unchanged meanings)

| Code | Ink (suggested) | Role | Meaning | Priority | Proof action |
| --- | --- | --- | --- | --- | --- |
| Q | blue (reserved) | Ask | a numbered question for the AI | 1 | **answer** |
| R | red | Stop | blocker, risk, not understood | 2 | **challenge**: fact-check, steelman the opposite, cite or retract |
| G | green | Keep | evidence, confident, worked | 3 | **go deeper**: research, expand, find support |
| X | yellow highlighter | Crux | the one thing that matters | 4 | **re-centre**: rebuild the summary/argument around it |
| O | orange | Maybe | an idea, a what-if | 5 | **explore**: offer 2–3 alternatives |
| P | purple | Sense | gut feeling | 6 | **justify**: explain the reasoning behind it |
| D | pencil | Draft | provisional | 7 | **apply** the handwritten edit as written |
| B | black | Reason | what I think | — | (context, no action) |

Structural marks keep their meanings. In a Proof, `✕` means **cut** and `○` means **lock** (never change it in the next draft). Confidence dots (`●+ ◐~ ○!`) are unchanged.

### 6.2 Degradation

- `build` assigns the user's pens to roles **in priority order**. Roles without a pen fall back to a **circled letter code** in any ink.
- Every page's legend strip prints the *user's* mapping (e.g. `R stop = pink`). Unassigned roles print as `ⓇR stop`.
- A black-pen-only kit is a complete, supported kit.

---

## 7. Styles

| Style | Serves (tags) | Shape | Budget | Load-bearing research (grades provisional until sub-project 2) |
| --- | --- | --- | --- | --- |
| **Sitting** | decide, diagnose, plan | One session; ends commit → question-queue → return | ≤10 pages | Implementation intentions (A); prospective hindsight (B) |
| **Series** | learn | 3 short sessions at expanding gaps (~1d, 3d, 7d); each opens with **retrieval before review**; each round's recall prompts target the previous round's gaps | ≤4 pages per session | Testing effect, spacing (A) |
| **Incubation** | create | Diverge half → a real break (walk, sleep) → converge half; printed together, second half marked *after the break* | ≤10 pages total | Incubation meta-analysis (B); diverge/converge separation |
| **Ritual** | reflect, focus | One recurring page (daily/weekly), identical each time so change is visible across returns | 1 page | Expressive writing (B); self-monitoring |
| **Proof** | review | Any document, numbered paragraphs, wide margins; colour → action (§6.1) | ≤10 pages; longer documents are split into several proofs | Automation complacency; paper vs screen comprehension (B) |

`styles.json` encodes per style: budget, required opening/closing components, allowed phases per section (e.g. Incubation: diverge-only first half, no `timer` there), and session structure. `build` enforces these and explains violations with the relevant claim and grade.

---

## 8. Profile

- Location: `<user config dir>/longhand/profile.json` (XDG on macOS/Linux, `%APPDATA%` on Windows).
- Shape: `{ "version": 1, "kit": { paper, printer, pens: [{ colour, role? }], highlighter, pencil, scissors, tape, glue, sticky_notes, index_cards, ruler, wall_space, timer, camera }, "defaults": { style, sitting } }`.
- **Named kits are deferred.** Migration path: v2 adds `kits: { default: <v1 kit>, … }` plus `default`; the CLI upgrades v1 files on read. No v1 consumer changes.
- Resolution order at build time: spec's `kit` → profile → the minimum kit (mono A4, black pen, one highlighter).

---

## 9. CLI — `@vandermerwed/longhand`

| Command | Behaviour |
| --- | --- |
| `init` | Short interactive wizard; writes the profile |
| `profile [--json]` | Print or edit the profile |
| `list [--kind --tag --phase --style --fits-kit] [--json]` | Browse the catalogue (components + presets) |
| `show <id> [--json]` | Contract, schema, grounding with grades, fallbacks, presets of it |
| `build <spec> [-o file] [--pdf] [--open]` | Validate → resolve kit → apply fallbacks → assign pens → render |
| `validate [spec]` | Registry validation (CI) or spec validation (agents) |

**`build` pipeline**

1. Validate the spec: each page's `data` against its JSON Schema; style rules (budget, required pages, phase mixing). Errors are written for an agent to act on, e.g. *"timer on a diverge page: time pressure can reduce divergent output (Amabile et al., grade C). Remove it or move it to the converge half."*
2. Resolve the kit (§8).
3. Apply fallbacks and report each substitution.
4. Assign pens by role priority (§6.2).
5. Render one self-contained HTML file (fonts inlined as WOFF2) and a **sidecar `<name>.longhand.json`**: page IDs → component, variant, data, and readback rules, plus the pen mapping used.
6. `--pdf`: `puppeteer-core` against a locally installed Chrome or Edge (no browser download). If none is found, print manual print settings instead.

**Page IDs** keep the existing `W<round>-P<n>` form for every style, so a photo of any single page is self-describing.

**Rendering:** each component is a pure TS function returning an HTML string. No framework. A shared **page shell** provides paper sizing (A4/Letter/A5), registration marks, page ID, legend strip, and the Field Manual print tokens (§14).

**Testing**

- Vitest unit tests: kit resolution, pen assignment, fallbacks, style rules, template resolution.
- HTML snapshot per component example.
- Playwright screenshot checks in CI only (dev dependency, never shipped).
- Parity check during migration: TS output compared against the Python engine's output for every existing example.

---

## 10. Skills

All four live in `skills/`. Each is self-contained and calls the CLI via `npx @vandermerwed/longhand …`.

| Skill | Invoked by | Role |
| --- | --- | --- |
| `to-workbook` | user or model | Diagnose the job → choose a style → confirm the kit from `profile` → compose with `list`/`show` → write prompts that don't give the answer away → `build` → coach the sitting |
| `to-proof` | user or model | Print any document, especially AI output, for markup: numbered paragraphs, wide margins, Proof legend |
| `from-paper` | user or model | Read photos against the sidecar. Answer blue first, carry reds forward, keep rejected (`✕`) items visible. For Proofs, build the **action queue** |
| `setup-longhand` | user | Run `init` conversationally |

**Naming rule:** `to-<artifact>` makes a printable artifact; `from-paper` takes any of them back.

**Field notes:** [`2026-09-27-from-paper-field-notes.md`](2026-09-27-from-paper-field-notes.md) records what the first real read-backs taught us. It covers HEIC photos, crops, swatch calibration, free-form photos and page-feedback routing. Treat it as requirements for `from-paper`.

**Action queue (Proof)**

```
#  Mark       Where  Quote                        Action           Cost
1  Q1 blue    ¶4     "why not event sourcing?"    answer           quick
2  red        ¶7     "cuts latency 40%"           challenge claim  research
3  green      ¶2     "offline-first users"        go deeper        research
4  ✕          ¶9     —                            cut              quick
Run all? (or "all except 3")
```

Quick actions run immediately. Research-cost actions wait for confirmation.

---

## 11. Multi-session state

Each workbook gets a folder in the user's working directory:

```
longhand/2026-09-23-kill-sync/
├── spec.json
├── W1.longhand.json · W2.longhand.json    # one sidecar per round
└── carry.md                               # open reds, answered blues, what the next round must pick up
```

- **Series:** `from-paper` records what the human failed to recall. The next round's retrieval prompts target those gaps.
- **Ritual:** returns accumulate, and `from-paper` surfaces change across them.
- Reminders and scheduling are out of scope; the user's calendar handles them.

---

## 12. Docs site

**Stack:** Astro (static), Pagefind search, self-hosted fonts, light theme only for v1 (tokens ready for dark). Host-agnostic static output.

**Information architecture**

*Revised 2026-09-27 (D2):* this is the product's own site. The personal hub, with `/skills` grouped by flow across every source, is a separate later project that links here.

```
/                                   what this is, install, the thesis, the loop, the five styles
/skills                             the four skills, grouped by flow (Out → Back → Setup)
  /tutorial/first-workbook
  /how-to/                          print properly · photograph pages · set up your kit ·
                                    proof an AI draft · work a Series · two people ·
                                    propose a component or preset
  /reference/components             pattern library grid
  /reference/components/[id]        component detail
  /reference/                       styles · presets · colour language · proof actions · cli · spec · profile
  /explanation/                     why friction · evidence grades · diverge vs converge ·
                                    admission test · when paper is the wrong tool ·
                                    prior art (proofreaders' marks, inkloop)
```

**`/skills`:** grouped by where each skill sits in the flow: Out → Back → Setup. One line per skill, who invokes it, and a copyable install command.

**Pattern library grid:** cards with build-time screenshot thumbnails. Filters: tag, phase, kind, grade, and "fits my kit" (tick your stationery; the rest greys out).

**Component detail page**

1. Name and intent; tags, phase, grade badge.
2. Live preview in a page frame, A4/Letter toggle, **Download PDF** (built in CI by the CLI).
3. *Use it:* spec snippet and `longhand show` command.
4. Physical contract and fallbacks.
5. Props table generated from the JSON Schema.
6. *Why it works:* claims with grade, transfer, and DOI links; helps / backfires.
7. Presets of it; related components; styles it appears in.

**Quality:** every page is generated from the registry and render functions, so it cannot drift from the package. CI runs the build, a link check (including DOIs), and screenshots of key pages. Colours meet WCAG AA; grades always show their letter, never colour alone.

Detailed mockups of the grid and detail pages are produced in sub-project 4's spec, not here.

---

## 13. Research

### 13.1 Pipeline

| Step | Who | Output |
| --- | --- | --- |
| 0. **Audit and gap-fill:** apply the admission test to the existing 28 printables; propose merges (e.g. tracker / scoresheet / dashboard), demotions to presets, and new components from ungrounded robust mechanisms | Opus subagent → user decision | component roster |
| 1. **Claim inventory:** 1–3 load-bearing claims per component and style | lead (main session) | claim list |
| 2. **Find sources:** meta-analyses first, then experiments; DOI, n, effect size if reported, replication attempts (Many Labs, RRRs) | Sonnet subagents, batched by claim family | `research/<family>.md` notes |
| 3. **Grade** against the rubric | Opus subagent | grade + rationale |
| 4. **Adversarial downgrade pass:** hunt failed replications; verify each DOI resolves and supports the claim as stated | a separate Opus subagent | confirmed or downgraded |
| 5. **Spot-check, then user sign-off** on a grading report | lead → user | approval to publish |

### 13.2 Rubric

- **A: Robust.** At least one meta-analysis, or several large pre-registered replications; consistent; no failed large replication.
- **B: Supported.** Several independent experiments, mostly consistent; no failed large replication.
- **C: Suggestive.** Few or small studies, mixed results, or a failed replication.
- **D: Practice.** Theory or practitioner craft; not directly tested.

`transfer` records how directly the evidence applies to a paper workbook: `direct` (tested essentially this), `adjacent` (a similar task), or `analogical` (mechanism borrowed).

### 13.3 Enforcement

- CI checks every DOI against the Crossref API.
- `validate` rejects printable components without at least one graded claim, `helps`, and `backfires`.

---

## 14. Visual direction: Field Manual

**Site**

- Warm paper ground (~`#f3efe6`).
- Fraunces for display, Inter for body, JetBrains Mono for metadata and IDs.
- The ink-swatch colours are the only accents.
- Registration and crop marks are used as a decorative motif.
- Calm, bookish, trustworthy.

**Print**

- Strictly black on white.
- Fraunces for titles and prompts; Inter for instructions; JetBrains Mono for page IDs and the legend strip.
- Hairline rules, ~10 mm writing lines, subtle corner registration marks.
- Hand-scale writing areas are never shrunk to fit; cut a page instead.

The shared print tokens live in the page shell and are imported by the site, so the two cannot drift.

---

## 15. Sub-projects and order

| # | Sub-project | Delivers | Depends on |
| --- | --- | --- | --- |
| 1 | **Foundation** | pnpm monorepo; `@vandermerwed/longhand` CLI (`init · profile · list · show · build · validate`); page shell + Field Manual print tokens; all existing printables ported to per-component folders with parity; profile; fallbacks; pen assignment; sidecar; PDF | this spec |
| 2 | **Research** | Audit/gap-fill roster (§13.1 step 0); graded, cited grounding for every component, preset, and style; `research/*.md` | this spec (schema only), so it runs **in parallel with 1** |
| 3 | **Skills** | `to-workbook`, `to-proof`, `from-paper`, `setup-longhand`; styles implemented in `styles.json` and enforced by `build`; plugin marketplace + skills.sh layout; README (installation → why → reference, like mattpocock/skills) | 1, 2 |
| 4 | **Site** | The product's Astro site: `/skills`, Diátaxis docs, pattern library, detail pages, PDFs, search, and Agentation for component feedback. The personal hub is a separate later project (D2) | 1, 2, 3 |

Each gets its own spec → plan → build cycle and user review.

---

## 16. Migration

| From | To |
| --- | --- |
| `patterns/layers/archetype.json` + `build_print.py` renderers | `components/<id>/` (`kind: page`) |
| `patterns/layers/component.json` | `components/<id>/` (`kind: piece`) |
| `patterns/layers/loop.json` | `registry/styles.json` (reworked into the five styles) |
| `patterns/layers/protocol.json`, `_shared/colour-protocol.md` | `registry/protocols.json`, `registry/legend.json` + reference docs |
| `patterns/layers/substrate.json`, `object.json`, `capture.json` | `registry/practices.json` + how-to docs |
| `_shared/stationery-catalogue.md` | profile schema + `setup-longhand` + how-to "set up your kit" |
| `_shared/page-archetypes.md` (generated) | replaced by the site's reference pages and `longhand show` |
| `patterns/GROUNDING.md` | seed input for sub-project 2 |
| `slow/to-workbook`, `slow/from-workbook`, `slow/to-print` | `skills/to-workbook`, `skills/from-paper`, `skills/to-proof` |
| `opencode.json` | updated to point at `skills/` |

The Python engine stays until TS parity is proven (sub-project 1), then it is deleted.

---

## 17. Glossary (seed for `CONTEXT.md`)

- **Longhand:** the working title of the product (D15).
- **Component:** a printable `page` or `piece`.
- **Page:** a single thinking move, filled in once.
- **Piece:** a table component consulted throughout a sitting.
- **Preset:** a named `data` configuration of a component.
- **Style:** the shape of a workbook over time (Sitting, Series, Incubation, Ritual, Proof).
- **Kit:** the stationery on the desk.
- **Profile:** the user's saved kit and defaults.
- **Role:** a meaning in the colour language (Ask, Stop, Keep…), with a letter code and a priority.
- **Sidecar:** the `.longhand.json` recording exactly what was printed.
- **Round:** one printed iteration of a workbook (W1, W2…).
- **Action queue:** the confirmed list of actions derived from a Proof's marks.
- **Grade:** A/B/C/D evidence strength of a claim.
- **Transfer:** how directly a claim's evidence applies to paper work.

---

## 18. Out of scope / deferred

- Public component registry and `eject` (D1, D14).
- Named kits (D9; migration path defined).
- Visual themes beyond Field Manual; dark mode.
- Reminders and scheduling for Series and Ritual.
- A native Codex plugin (skills.sh covers other agents).
- Analytics beyond what the static host provides. PDF download counts, if the host gives them, are the signal for revisiting D1.

---

## 19. Risks

| Risk | Mitigation |
| --- | --- |
| `npx` first run needs network, so offline users stall | Document `npm i -g @vandermerwed/longhand`; the CLI works fully offline once installed; fonts are inlined |
| Research pass downgrades flagship components (e.g. to C) | Intended: honest grades are the differentiator; the admission test allows D |
| Photo read-back is lossy (colour under poor light) | Letter floor; sidecar tells `from-paper` what each page is; ask for a re-shoot rather than guess |
| Prior art (`inkloop`) overlaps | Review in sub-project 2; differentiate on graded research, styles, and the paper-native loop |
| Skill triggering conflicts with other collections in a flat install | Distinct names (D13); precise descriptions; tested against common phrasings in sub-project 3 |
| Global git identity is the Rokkit200 email on a personal repo | User to decide before the first push (a history rewrite is trivial before publishing) |
| The working title changes after more is built on it | One scripted rename pass before the first push (D15). Nothing is published, so no data format needs migrating |
