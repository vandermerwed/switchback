# Longhand sub-project 3: the skills

**Status:** draft. The user asked on 2026-09-27 to "ship as much as you can until we find the right name", so the plan and build proceed without waiting for spec review. Judgement calls are marked **(assumed)** in §11 so they can be overturned cheaply.
**Date:** 2026-09-27 · **Owner:** vandermerwed
**Parent:** [`2026-09-23-longhand-design.md`](2026-09-23-longhand-design.md): §7 styles, §9 CLI, §10 skills, §11 multi-session state, §16 migration.
**Inputs:**
- [`2026-09-27-from-paper-field-notes.md`](2026-09-27-from-paper-field-notes.md): what the first real read-backs taught us.
- The user's round-1 workbook, "What should slow become next?", read back on 2026-09-27. §6 lists the faults they marked.
- The graded grounding for the five styles in `packages/longhand/research/grounding.json`.

---

## 1. Goal

Make the loop usable end to end, today, under the working title (D15):

> a conversation → `to-workbook` or `to-proof` prints the right pages for the problem and the desk → the human works them in ink → `from-paper` reads the photos back, answers blue first, and carries the work forward.

**Success looks like**

1. The user installs the four skills locally, from this repo's plugin marketplace or with `npx skills add <path>`, and runs a real workbook through the loop without touching `slow/`, `_shared/` or the Python renderer.
2. `to-workbook` picks one of four styles (Sitting, Series, Incubation, Ritual), composes pages that fit the saved kit, and gets to a printable PDF after **one** confirmation.
3. `build` enforces each style's rules and explains every violation with the claim and grade behind it.
4. `to-proof` turns any document, typically AI output, into numbered, wide-margin proof pages. `from-paper` turns the marked-up photos into a confirmed **action queue**.
5. `from-paper` handles everything the field notes list: HEIC photos, crops, swatch calibration, free-form photos, and page feedback routed separately from content.
6. `slow/`, `_shared/`, `patterns/` and the Python engine are gone, and the README explains the product.

---

## 2. What ships

| Area | Deliverable |
| --- | --- |
| Styles | `series`, `incubation`, `ritual`, `proof` added to `registry/styles.json` with graded grounding. `PENDING_STYLES` emptied. `opening` and real `phase_rules` enforced by `build` (§3) |
| Components | New: `step-away` (the Incubation break) and `proof` (numbered document pages). Fixes from round 1 (§6). A `physical.returns` flag |
| CLI | New: `longhand proof`, `longhand photos` and `longhand legend`. Also `profile --import`. The sidecar records `returns` per page (§4) |
| Skills | `skills/to-workbook`, `skills/to-proof`, `skills/from-paper`, `skills/setup-longhand` (§5) |
| Packaging | `.claude-plugin/marketplace.json` and `plugin.json` (one plugin). A skills.sh-compatible layout. README, `CONTEXT.md` and `opencode.json` updated (§7) |
| Migration | `slow/`, `_shared/` and `patterns/` deleted once nothing needs them (§7.4) |
| Housekeeping | The known polish bugs from the ports review (§8) |

**Not in this sub-project:**
- **The print-design pass:** landscape pages, hand-drawable confidence marks and the heading serif. These need the user's taste; see §10.
- The docs site (sub-project 4).
- The rename (D15).

---

## 3. Styles

### 3.1 Shape

`Style` gains `opening`, a real `phase_rules`, `split_on` and `allow`. Each opening or closing **slot** is a component id or an array of alternatives:

```jsonc
{
  "id": "incubation",
  "name": "Incubation",
  "tags": ["create"],
  "budget": 10,                        // every page, cover and return included (as today)
  "opening": ["cover"],                // head slots; warning if unmet
  "closing": ["commit", "question-queue", "return-checklist"],   // tail slots; warning if unmet
  "split_on": "step-away",             // optional: the component that divides the sections
  "phase_rules": [                     // optional: one rule per section, in order
    { "section": 0, "phases": ["diverge", "either"], "forbid": ["timer"],
      "claim": "creativity-fixation/time-pressure-divergent" },
    { "section": 1, "phases": ["converge", "either"],
      "claim": "creativity-fixation/deferred-judgement" }
  ],
  "allow": null,                       // optional: an allow-list of components
  "grounding": { … }                   // merged by apply-grounding
}
```

A JSON Schema for the style object is added to `src/registry/schemas.ts`, and `validateRegistry` checks it. Every component id in `opening`, `closing`, `split_on`, `forbid` and `allow` must resolve. Every `claim` must be one of the style's grounding claim ids.

### 3.2 The five styles

| Style | Budget | Opening | Closing | Other rules | Load-bearing grounding |
| --- | --- | --- | --- | --- | --- |
| **Sitting** | 10 | `cover` | `commit`, `question-queue`, `return-checklist` | none | implementation intentions (A) |
| **Series** | 6 per round | `cover`, then one of `free-recall` / `feynman` / `self-explain` | `question-queue`, `return-checklist` | none. The retrieval page opens *every* round; in round 1 it works as a pretest | testing effect (A), distributed practice (A), retrieval before review (B), pretesting (B) |
| **Incubation** | 10 | `cover` | `commit`, `question-queue`, `return-checklist` | exactly one `step-away`. Before it: diverge/either only, no `timer`. After it: converge/either only | incubation effect (B); time pressure hurts divergent output (C) |
| **Ritual** | 1 | none | none | `allow: ["check-in", "scoresheet"]`. The page is identical every round | progress monitoring (B), prior-state recall (C), resumption cues (B) |
| **Proof** | 10 | none | none | `allow: ["proof", "question-queue"]`. The legend strip prints proof actions (§4.4) | automation bias (C), paper vs screen (B) |

Series gets a budget of 6 because the umbrella's "≤4 pages per session" counts content pages; the cover and return checklist come on top. **(assumed)**

### 3.3 Enforcement in `build`

| Check | Code | Severity | Message pattern |
| --- | --- | --- | --- |
| Too many pages | `E_BUDGET` | error | as today |
| Opening slot unmet | `W_OPENING` | warning | "Series rounds open with a retrieval page (free-recall, feynman or self-explain): recalling before rereading improves learning (retrieval before review, grade B)." |
| Closing slot unmet | `W_CLOSING` | warning | as today, slot-aware |
| Page's phase not allowed in its section | `E_STYLE_PHASE` | error | "`forced-connections` is a diverge page after the break. Incubation keeps the second half for converging (deferred judgement, grade D). Move it before `step-away`." |
| Forbidden component in a section | `E_STYLE_FORBID` | error | "timer before the break: time pressure reduces divergent output (grade C). Remove it or move it after `step-away`." |
| `split_on` present but missing, or repeated | `E_STYLE_SPLIT` | error | "Incubation needs exactly one `step-away` page between the diverge and converge halves." |
| Component not in `allow` | `E_STYLE_ALLOW` | error | "A Ritual is one page: check-in or scoresheet." |

Each message reads the claim's text and grade from the style's grounding at runtime, so it can never drift from the research. Pages after `step-away` in an Incubation get "after the break" in the page header tag.

---

## 4. Engine and CLI

### 4.1 New components

**`step-away`** (page, phase `either`, tags `create`, body `walk`/`rest`, `returns: false`)
- The printed break: "Stop here. Take a real break, and make it something easy and different: a walk, chores, or sleep on it. Don't reread the pages before this one."
- Lines for "Break started" and "Back at", plus "What I did".
- Grounding reuses the claims already graded: incubation effect (B), incubation conditions (C), walking (C) and sleep (C).

**`proof`** (page, phase `converge`, tags `review`, body `read`/`mark`)
- Data: `{ blocks: [{ kind: "p"|"h"|"li"|"code", text, n? }], source? }`.
- Renders numbered paragraphs: `¶n` in the left gutter, a text column of about 60% of the width, and a wide ruled right margin for notes. Headings are unnumbered; list items and code are numbered like paragraphs.
- The pilot inline markup is `**bold**`, `*italic*` and `` `code` ``. Anything else prints literally.
- The sidecar keeps every block, so `from-paper` can quote ¶n exactly.
- Grounding reuses the proof style's claims.

### 4.2 `longhand proof <doc> [-o spec.json] [--title T] [--paper P] [--max-pages 10] [--json]`

- Reads a Markdown or plain-text file, or `-` for stdin.
- Splits the text into blocks: blank lines separate them, `#` marks a heading, `-` or `1.` marks list items, and fenced code is kept whole.
- Numbers the blocks continuously.
- Packs the blocks onto pages by a conservative per-paper character budget, with three rules: never leave a heading alone at the foot of a page; split an over-long paragraph at a sentence boundary as "¶n (cont.)"; split code at line boundaries.
- Writes a Proof-style spec, `W1-P1…`.
- More than `--max-pages`: writes `-part1.json`, `-part2.json` and so on, and reports it. The umbrella rule is that long documents become several proofs.
- The e2e layout test builds the packing fixtures and fails on any overflow. That test is what tunes the character budget.

### 4.3 `longhand photos <files…> [-o dir] [--max 1800] [--tiles auto|off] [--json]`

Normalises phone photos for reading, following field notes §1:
- detects the format from magic bytes, never the extension (JPEG, PNG, WebP, HEIC/HEIF);
- decodes HEIC;
- applies the EXIF orientation;
- scales the long edge down to `--max`;
- writes `<dir>/<nn>-<stem>.jpg`.

With `--tiles auto`, a source whose long edge is over 3000 px also gets 2×2 tiles at native resolution with 5% overlap. The JSON manifest lists `{ source, format, out, width, height, tiles[] }`.

**Pure JS or wasm dependencies only**, with no native binaries, so `npx` installs stay reliable. The plan picks the libraries with a spike. If HEIC decoding can't be done without native code, the command reports that clearly and prints per-OS conversion advice (`sips` on macOS, `pillow-heif`) instead of failing silently.

### 4.4 `longhand legend [--json]`

Prints the colour language:
- the roles, with code, meaning, priority and proof action;
- the structural marks, with their proof actions;
- the confidence scale;
- the user's current pen mapping (profile, or the minimum kit).

The skills read the protocol here instead of carrying a copy, which keeps them self-contained (umbrella §4).

The shell's legend strip gains a Proof form (`R challenge · G go deeper · ✕ cut · ○ lock …`), used whenever the style is `proof`.

### 4.5 `profile --import <file|->`

Validates a full profile JSON against the profile schema and writes it. `setup-longhand` builds the kit conversationally and imports it in one step. The `init` wizard stays for humans at a terminal.

### 4.6 Component warnings

`W_NARROW` fires for card-sort's `index-cards` variant with 3 or more columns on portrait paper. The message: "index cards are about 76 mm wide; 3 columns on portrait A4 leave about 57 mm each. Use `write-in`, 2 columns, or wait for landscape pages."

### 4.7 Sidecar

Each `SidecarPage` gains `returns` (from the component's `physical.returns`). `from-paper` uses it to know which pages to expect back (field notes §4). The sidecar already records `cli`. `from-paper` compares that with `longhand --version` to tell when page wording may have changed since printing.

---

## 5. Skills

### 5.1 Shared conventions (each skill restates the parts it needs; nothing is shared on disk)

- **Calling the CLI:** run `longhand …`. If it isn't on PATH, run `npx -y @vandermerwed/longhand …`. Before publishing, the README's dev setup puts `longhand` on PATH with `pnpm --filter @vandermerwed/longhand link --global`.
- **The workbook folder**, in the user's working directory:

  ```
  longhand/<yyyy-mm-dd>-<slug>/
  ├── W1.json · W1.html · W1.pdf · W1.longhand.json   # spec, print, sidecar, per round
  ├── W1.readback.md                                  # what from-paper read (field notes §6)
  ├── photos/                                         # normalised by `longhand photos`
  └── carry.md                                        # open reds, answered blues, what next round picks up
  ```

- **Plain words.** Every printed prompt must make sense to a stranger who has read none of the research. No terms of art on the page ("over-reading", "pretest", "incubation") unless the page explains them.
- **Blue is the human's.** Nothing the AI prints uses the Ask role.

### 5.2 `to-workbook`

**Flow:**
1. **Right tool?** Use it for foggy, creative, decision-heavy or learning work, or when the user asks for paper. Decline factual lookups and mechanical tasks.
2. **Choose the style from the job:**
   - decide, diagnose or plan → Sitting;
   - remember over weeks → Series;
   - create → Incubation;
   - come back to the same question weekly → Ritual;
   - check a document → hand off to `to-proof`.
3. **The kit:** run `longhand profile --json`. If there's no profile, ask **one batched** question about the desk (printer, paper, pens, scissors, index cards…), offer `setup-longhand`, and carry on with stated assumptions.
4. **Compose:** use `longhand list --json --fits-kit` and `show --json`, with one move per page and the style's opening and closing slots.
5. **Write the prompts:** follow the §6 rules.
6. **Confirm once:** one message covering the style, the page list, pen substitutions and the timebox. Build when the user says yes.
7. **Build:** `longhand validate` then `longhand build --pdf` into the workbook folder. Fix any error by following its message; never by skipping the check.
8. **Coach:** phone in another room, work in ink, stop mid-sentence at the timebox, photograph the pages in the return checklist.
9. **Series and Ritual:** say when the next round is due. Series is about 1, then 3, then 7 days. Ritual is weekly by default and 10 minutes or less.

**Done when:** a validated PDF exists in the workbook folder and the user knows how to print it and send it back.

### 5.3 `to-proof`

**Flow:**
1. **Find the document:** a path, a pasted text, or the AI's last long output.
2. **Build:** `longhand proof` → `validate` → `build --pdf` into the folder. Long documents become several proofs, and the skill says so.
3. **Coach the marks** from `longhand legend`: blue ask, red challenge, green go deeper, yellow re-centre, orange explore, purple justify, pencil edit, ✕ cut, ○ lock.
4. **Send back:** photograph every page.

**Guardrail:** decline code review of a diff, which is not what `to-proof` is for, and point to the code-review tooling instead.

### 5.4 `from-paper`

The flow follows field notes §1–§6.
1. **Take stock:**
   - find the sidecar (next to the photos, in the workbook folder, or asked for);
   - run `longhand photos` into `photos/`;
   - match each photo to a page ID, and crop tiles for small handwriting;
   - check the pages that came back against the sidecar's `returns` pages;
   - with no sidecar, read it as free-form using the profile's pen mapping.
2. **Calibrate the colour** from the cover swatches the human coloured, not from the colour names.
3. **Read each page** with its sidecar `readback` rule. Keep **marks about the problem** apart from **marks about the page**.
4. **Report, in this order:**
   1. the photo test;
   2. blue answers (research questions go to a cheaper subagent that never sends personal identifiers anywhere);
   3. page feedback, as a table, checked against the current CLI version;
   4. the content;
   5. the next step: another round, a hold, or the action queue.
5. **Proof:**
   - build the **action queue** (umbrella §10), ordered by role priority, each row carrying the quote from the sidecar;
   - quick actions run at once, research actions wait for confirmation, `✕` cuts and `○` locks are honoured in the next draft.
6. **Write it down:** `W<n>.readback.md` and an updated `carry.md`. For a Series, record what the human failed to recall, so the next round targets it. For a Ritual, record the change since the last return.

**Guardrails:** those in the old `from-workbook` (blue first, never tidy the marks, don't over-read, preserve disagreement, ask for a re-shoot rather than guess), plus "quote the human exactly when it matters".

### 5.5 `setup-longhand`

A conversational `init`, in one batched question with suggestions:
- printer and paper;
- pens and their colours;
- highlighter, pencil, scissors, tape or glue, sticky notes, index cards, ruler, wall space, timer, camera;
- defaults: style and sitting length.

It maps the pens to roles in priority order (umbrella §6.2) and shows the mapping. It then writes the profile with `profile --import` and prints `longhand legend`. The migrated `_shared/stationery-catalogue.md` becomes the skill's reference on how each item changes the design.

### 5.6 Descriptions and triggers

Each description names what the skill does and when to use it, plus when *not* to use it:
- `to-proof` excludes code review;
- `from-paper` covers photos of handwritten pages, including loose cards and boards;
- `to-workbook` excludes plain printing.

A trigger test lists about 8 should-fire and 5 should-not-fire phrasings per skill (§9).

---

## 6. Rules learned from the round-1 workbook

| The user's note | Rule or fix | Where |
| --- | --- | --- |
| "Where do these cards come from?" (card-sort) | Any page that uses material from another page names that page ("the survivors from W1-P2"). card-sort gains an optional `source` field, printed in its note | component + to-workbook |
| "Columns are too small for index cards" | On portrait paper, the `index-cards` variant is allowed with at most 2 columns; otherwise use `write-in`. Landscape comes in the print pass | to-workbook (and a `W_NARROW` build warning) |
| "This is not a good question" (assumption-audit) | Columns become "Assumption · Conf. · What you'd see if it's false · Cheapest way to check": an observation, then an action | component |
| "What does 'over-reading' mean?" | The plain-words rule (§5.1) | to-workbook |
| "The questions are bad" (question-queue) | Don't pre-fill questions. The page stays blank unless the user supplied questions | to-workbook |
| "Nothing to photograph: dice page" | `physical.returns: false` for `stimulus-die`, `timer`, `player-aid`, `step-away` and `return-checklist`. `tokens` still returns, because its tally variant is marked on the page. By default return-checklist lists only pages that return | component + sidecar |
| "The first physical action… can be phrased better" | Already replaced by the if-then plan; no change | none |
| Percentages in the Conf. column | Evidence for the confidence-marks redesign in the print pass | §10 |
| The cover says "no pen: write Ⓠ" next to the swatch boxes (seen while building the naming workbook) | The unassigned-role cell reads "your pen, or write Ⓠ" | cover |
| The cover's CODE header wraps onto two lines | `white-space: nowrap` and a minimum width on that column | cover |
| Ritual needs a resumption cue (the resumption-cues claim, B) | check-in gains a closing "Next time, start from:" line | check-in |

---

## 7. Packaging and migration

### 7.1 Layout

```
skills/<skill>/SKILL.md                   # plus references/ where a skill needs more than about 300 lines
.claude-plugin/marketplace.json           # one plugin, "longhand", source "./"
.claude-plugin/plugin.json                # name, version, description; skills auto-discovered from skills/
```

The plan verifies the exact marketplace and plugin schema against the current Claude Code docs. `skills/<name>/SKILL.md` is also the layout that `npx skills add` discovers.

### 7.2 README

Rewritten in the mattpocock/skills order: what it is (the loop, one diagram), then installation, then why (the thesis, graded evidence), then reference (the four skills, the five styles, the CLI). It says plainly that Longhand is a working title.

### 7.3 `CONTEXT.md`

The glossary from umbrella §17, with the new terms: step-away, action queue, returns, workbook folder.

### 7.4 Deleting the old folders

Delete `slow/`, `_shared/` and `patterns/`, including the Python engine. First, check each item in umbrella §16 has a home. The known homes:
- `_shared/stationery-catalogue.md` → the `setup-longhand` reference;
- `_shared/colour-protocol.md` reading rules → `from-paper`, with the meanings coming from `longhand legend`;
- the method in `slow/*` → the new skills.

Anything with no home is listed in the PR, not dropped silently. `opencode.json` points at `skills/`.

---

## 8. Housekeeping (known bugs with obvious fixes)

- Variant prompts duplicate some page notes: self-explain `why`/`faded`, free-recall `cued`, and forecast duration.
- The tokens `tally` readback says "instead of photographing anything".
- zones with `columns: 1` and more than 5 zones overflows.
- A layout's `col + colSpan` can exceed 10. `validate` should reject it.
- The `lh-has-attrib` footer padding is inline in `page.ts`, while the class goes unused.
- perspective-swap `physical.body` should list `cut`/`fold` for the `tent` variant.

---

## 9. Testing

- **Engine:** unit tests for every style rule and message; snapshots for `step-away`, `proof` and the changed components; e2e layout for proof packing, the new components on A4 and Letter, and `W_NARROW`. Plus `validate --strict`.
- **CLI:** tests for `proof` (splitting, numbering, parts), `photos` (magic-byte detection, orientation, scaling, tiles, a HEIC fixture or the documented fallback), `legend`, and `profile --import` (valid, invalid, round-trip).
- **Skills (superpowers:writing-skills TDD):** for each skill, a baseline run without it, then a run with it, on scripted scenarios, judged by a reviewer agent against the skill's done-when and guardrails.
  - `to-workbook`: a decision with a mono printer and black and red pens; a learning goal; a creative problem; a weekly reflection; a factual lookup it should decline.
  - `to-proof`: an AI draft longer than 10 pages.
  - `from-paper`: the round-1 photos (HEIC); a synthetic marked-up proof (a rendered page with coloured marks drawn on); and free-form board photos. **Fixtures holding the user's handwriting or personal content stay in git-ignored `.superpowers/evals/`, never in the repo.**
  - `setup-longhand`: a conversation that ends in a valid imported profile.
- **Triggers:** the §5.6 phrasings run against all four descriptions together, plus a flat install with superpowers and mattpocock-skills.

---

## 10. Deferred to the print-design pass (needs the user's taste)

- **Landscape pages:**
  - zones and the canvas presets (BMC, Lean Canvas…);
  - card-sort with index cards;
  - matrices.

  The mechanism is proven: the CSS named page `@page land { size: A4 landscape }` with `page: land` and `preferCSSPageSize` produced a mixed-orientation PDF for the naming workbook.
- **Hand-drawable confidence marks:** the user wrote percentages, not ●◐○.
- **A heading serif** to replace Fraunces.
- Agentation on the docs site (sub-project 4).

---

## 11. Decisions log

| # | Decision | Alternative |
| --- | --- | --- |
| S1 | **(assumed)** Series budget 6 per round, with the cover and return on top of 4 content pages | 4 in total, which leaves 2 content pages |
| S2 | **(assumed)** The Incubation break is its own printed page, `step-away` | A `section` field on pages (invisible on paper; the break is a physical act) |
| S3 | **(assumed)** Ritual has no cover and no return checklist: one page, with the legend strip as its key | A cover every week (paper waste; the page must stay identical) |
| S4 | Phase and allow violations are errors; opening and closing are warnings | Everything as warnings (the rules carry the research, so they should bind) |
| S5 | **(assumed)** `returns` is an explicit component flag | Derive it from `physical.body` (the cover's swatches break the derivation) |
| S6 | Proof pagination by character budget, guarded by e2e | Measure in a browser at build time (needs Chrome for every build) |
| S7 | **(assumed)** `photos` uses pure-JS or wasm libraries only | `sharp` (native binaries make `npx` fragile) |
| S8 | Skills read the protocol from `longhand legend` | Copy the colour protocol into each skill (drift) |
| S9 | **(assumed)** Skills are flat in `skills/`, and a skill's references live inside it | A collection folder (none now, D2) |
| S10 | Personal eval fixtures are git-ignored | Committed fixtures (the repo will be public) |

---

## 12. Risks

| Risk | Mitigation |
| --- | --- |
| No pure-JS HEIC decoder works well enough | Clear fallback advice (§4.3). HEIC is the iPhone default, so the plan's spike decides this first |
| The proof character budget misjudges dense text | A conservative budget; e2e fixtures of prose, lists and code; the `(cont.)` split |
| Skills can't reach the CLI before publishing | The README dev setup (`link --global`); the skill checks `longhand --version` first and says what to do |
| Style rules annoy users on edge cases | Every rule names its claim and grade; the skill can choose another style; warnings where the evidence is weak (D) |
| The skills trigger on unrelated requests | Precise descriptions with exclusions; the trigger test in a flat install |

---

## 13. As built (Plan A)

Plan A shipped as designed, with the deviations and rulings below. All suites are green: `pnpm test`, `pnpm validate` (`ok: 37 components, 11 presets (strict)`), `pnpm lint`, `pnpm apply-grounding --check` (`grounding is up to date`, no pending-style warnings), `pnpm typecheck`, `pnpm check-dois` (364/364 DOIs ok), the e2e suite on A4 and Letter, `pnpm build` and `pnpm contact-sheet` all pass.

### 13.1 New commands

- `longhand proof <doc.md|-> [-o spec.json] [--title T] [--paper A4|Letter] [--max-pages N] [--json]`
- `longhand photos <files…> [-o dir] [--max 1800] [--tiles auto|off] [--json]`
- `longhand legend [--json]`
- `longhand profile [--json] [--path] [--set key=value ...] [--import file|-]`

### 13.2 Styles

`registry/styles.json` holds five styles, matching §3.2 exactly: Sitting (budget 10, opening `cover`), Series (6), Incubation (10), Ritual (1), Proof (10).

### 13.3 Components

37 components (including `step-away` and `proof`, added by this plan) and 11 presets. A component may export `checks` (codegen-detected: `scripts/gen-components.ts` wires it into `src/generated/components.ts` alongside `render`/`css`/`meta` whenever a component module exports `const checks`). `physical.returns` is a per-component flag (default true; `false` for `stimulus-die`, `timer`, `player-aid` and `return-checklist`), read by the sidecar to decide which pages `from-paper` expects back. `step-away` returns: see R9.

### 13.4 `photos` libraries

Pure-JS/wasm, no native binaries, per S7:
- `heic-decode@2.1.0` (wasm, via `libheif-js@1.23.2`)
- `jpeg-js@0.4.4`
- `pngjs@7.0.0`
- `@types/heic-decode@2.0.0` (devDependency)

The spike decoded 8 real iPhone HEICs in about 1-3 s each. libheif applies the HEIC's own rotation. `photos` reads and applies the EXIF orientation for JPEG sources only; PNG sources are not rotated, and HEIC relies on libheif.

`heic-decode` is imported lazily, inside the HEIC branch of `decode()`, so no other command loads its wasm bundle. While it runs, `console.log` and `console.info` write to stderr, because libheif-js reports parse errors with `console.log`, which would otherwise corrupt `photos --json` stdout.

### 13.5 `PROOF_BUDGET` and splitting

`PROOF_BUDGET = { A4: 2100, Letter: 1900 }` (cost units, about one per character of prose). The e2e packing fixtures needed no reduction from these values.
- **Cost.** Prose and list items cost by length. Code costs by its wrapped visual lines: the sum over its lines of `max(1, ceil(length / 56))`. That's 56 mono characters per line; the text column measures 59.9 on A4 and 63.3 on Letter.
- **Splitting.** A block is split only when it costs more than a full page, or its text is longer than the schema's 4,000 characters. It is cut into chunks of at most half the budget, and never over 4,000 characters:
  - prose at sentence boundaries, then word boundaries;
  - code at line boundaries.

  A single line or word longer than a chunk is cut at character boundaries.
- **Continuations.** Each continuation prints `(¶n)` in the gutter (R10).
- **Headings.** Every trailing heading is carried to the next page, not just the last one, unless the page holds nothing but headings.
- **Split proofs.** When a proof is split into parts:
  - every page's source line reads `<file> · part N of M` (the title stands in for the file name from stdin), cut to 120 characters keeping the extension and the suffix;
  - `-o out` without `.json` writes `out-part1.json`, `out-part2.json`…

### 13.6 Deviations and rulings

- **R1:** step-away's render test asserts the HTML-escaped apostrophe (`Don&#39;t reread…`), since that's what the renderer actually emits, not a raw `'`.
- **R4:** the styles-schema test keeps the `sitting` style fixture alongside whichever style is under test, rather than isolating a single-style registry. This is a test-isolation problem: a spec with no `style` defaults to `sitting`, so removing sitting from the registry made every example fail with `E_UNKNOWN_STYLE`.
- **R5:** `styleSchema` (in `src/registry/schemas.ts`) checks that `grounding` is present and is an object; it does not re-validate the grounding shape itself, which stays the job of `checkGroundingShape`. This keeps the two concerns (registry shape vs. grounding shape) from being validated twice in different places.
- **R7:** see §13.5 above — the budget values and the split rule.
- **R8:** the tokens `tally` housekeeping test (§8) was rewritten to actually render the `tally` variant and assert on its output, rather than only checking the readback string, so a regression in the variant itself would fail the test and not just the wording.
- **R9: `step-away` returns** (a deviation from §4.1 and §6, which listed it as non-returning). It sets `physical.returns: true`, so it's on the return checklist and in the sidecar's expected pages. The page collects the ideas that surfaced during the break, which is what incubation is for, and its readback checks the break times, so it must come back. Its readback now starts "Read what surfaced while away as fresh material for the judging half" instead of "nothing here needs reading".
- **R10: continuations print `(¶n)`** (a deviation from §4.2, which specified "¶n (cont.)"). "¶n (cont.)" doesn't fit the 10 mm gutter.
- **R11: one `proof_label` per role and mark.** Each role, and each mark with a `proof_action`, carries a human-facing `proof_label` in `registry/legend.json`:
  - roles: ask, challenge, go deeper, re-centre, explore, justify, edit;
  - marks: ✕ cut, ○ lock.

  The proof legend strip and `longhand legend`'s text print it. `proof_action` stays the AI's action id in JSON (Ask's is `answer`, Draft's `apply-edit`). This replaces the earlier "re-centre" special case, which the text table had missed (it printed "re centre").

Also recorded:
- The `proof` component's `blocks` has `minItems: 1`, so an empty array fails validation. Only a *missing* `blocks` is valid, following the repo's existing convention for `sheet`, and renders a Proof page with no numbered paragraphs.
- **The final-review fix wave** (after R9–R11):
  - **Proof engine.** The code cost, the 4,000-character cap and character-boundary splits, carrying stacked headings, the part suffix on every page's source line, the 120-character source, and distinct part files for `-o` without `.json` (§13.5).
  - **Proof markup.** Inline markup cuts code spans out first and keeps them literal, so `` `src/**/*.ts` `` prints as written. Bold and italic apply only outside code spans, and only where the delimiters hug the text, so "2 * 3 * 4" stays literal.
  - **`profile --import`** validates the whole file against `profileSchema` before `migrate()` or any write:
    - the shape is `version: 1`, a valid `kit`, and optional string `defaults.style`/`defaults.sitting`, with no other keys;
    - failures report `E_PROFILE_IMPORT` with import-specific fix text, never the `init --force` advice;
    - a successful import backs up the profile it replaces to `profile.json.bak`.
  - **`photos`.** The HEIC changes are in §13.4. A JPEG or PNG that fails to decode is reported as damaged ("re-export or re-take the photo"). The HEIC conversion advice is kept for HEIC, WebP and unknown formats.
  - **Style messages** use "an" before a vowel sound ("an Incubation", "an either page", "an amber pen").
  - **`W_STYLE_EMPTY_SECTION`** warns when an Incubation's first half holds only its opening slots ("nothing to generate before the break"), or its second half only its closing slots ("nothing to judge after the break").
  - **zones** `checks` use render's own test for a usable layout (one cell per zone). An unusable layout gets `W_ZONES_COLUMNS` as if there were none.
  - **Error docs.** `test/docs/errors.test.ts` scans `components/*/render.ts` as well as `src/`, so the rows for component-raised codes are enforced.
  - **The README:**
    - `|` is escaped in table code spans;
    - `--set key=value ...` shows that `--set` repeats;
    - it notes that WebP isn't supported;
    - it points to `registry/styles.json` for a style's rules, since `longhand show` covers components and presets only.
- `research/tools/build-grounding.mjs` lets a grading item's key differ from the id it grounds: an item named `"proof-page"` in a grading JSON can carry `"id": "proof"`, and the built `grounding.json` files it under `proof`. This let the proof-page-specific claims be grouped separately in the grading source while still attaching to the `proof` component/style.
- `PENDING_STYLES` (in `scripts/research/grounding.ts`) is empty, because all five styles landed in this plan. Its warning branch (a grounded style not yet in `registry/styles.json`) therefore has no exercising test; `test/registry/grounding-applied.test.ts` only checks that no id in the (empty) list has slipped into `styles.json`.
- free-recall's `cued` and `with-confidence` prompts had duplicated the base prompt's wording (§8); removing the duplication left them needing to refer back to the topic, so both gained a `{topic|…}` placeholder resolved by the existing prompt-templating engine.
- The plan's fixtures undercounted by two: `test/cli/validate.test.ts` and `test/registry/catalogue.test.ts` both hardcode the component/preset totals and needed their own +1 (or matching) bumps beyond the ones the plan anticipated, once `step-away` and `proof` were both registered.

## 14. As built (Plan B)

Plan B shipped the four skills flat under `skills/`, the single-plugin marketplace
(`.claude-plugin/`), `scripts/check-skills.mjs` (wired into `pnpm lint`), the README, `CONTEXT.md`
and `opencode.json`, and removed `slow/`, `_shared/` and `patterns/`.

### 14.1 The skills

- **setup-longhand:** one batched desk question or none; the CLI maps pens to roles (blue is
  Ask's whenever it exists); one `profile --import`; the legend in the done message. Reference:
  `references/stationery.md`, the migrated catalogue on the kit keys the CLI accepts.
- **to-workbook:** style from the job; the kit from the profile (no profile: one desk message,
  then carry on); compose through `list --fits-kit` and `show`; the §6 page rules; one
  confirmation; `validate` then `build --pdf` into `longhand/<date>-<slug>/`; a hand-over with the
  sitting's coaching and the return path; Series and Ritual rounds. References: `styles.md`
  (each style's shape, cadence, starting set) and `writing-pages.md` (the rules with examples).
- **to-proof:** refuses code review in one line; `proof -o` into the folder; every part built
  once; the marks table from `legend --json`; one mark per paragraph.
- **from-paper:** sidecar, `photos` (tiles), pages by printed ID, completeness by `returns`,
  swatch calibration, page feedback apart from content, the fixed report order, research by a
  cheaper subagent under the privacy line, the proof action queue, `W<n>.readback.md` and
  `carry.md`. References: `reading-marks.md`, `report.md`, `action-queue.md`.

### 14.2 Evals (git-ignored under `.superpowers/evals/`; nothing personal is recorded here)

Every skill was written test-first: a Sonnet baseline with only the CLI's `--help`, then the
run with the skill, then a refactor.

- **Baselines** failed the same way across skills: correct CLI mechanics, no conversation.
  Setup wrote a profile in silence (one probed `--set` with junk and deleted the profile).
  Workbooks were built without a confirmation, with the question queue pre-filled, in the
  working-directory root, without a PDF or coaching; one read the CLI's source to learn the
  format. The proof baseline coached nothing and, asked to review a PR, spent nine commands
  hunting for it. The from-paper baselines filed blue questions as the human's to-dos, read
  ticks as locks and wrote nothing down.
- **With the skills:** setup 2/2; workbook 6/6 (Sitting, Series, Incubation, Ritual, a factual
  question declined, a card sort on index cards) plus 2 re-runs after the refactor; proof 2/2;
  from-paper 3/3 (a real round-1 workbook with no sidecar, a board photo, a synthetic marked-up
  proof). Refactors closed: default prompts left on pages, a Series starting set over budget,
  timeboxes past a sitting, pen colours the kit lacks, ticks vs locks, unnumbered blue.
- **Triggers:** 52 phrasings (8 should-fire and 5 should-not per skill, with near-misses such as
  "review my PR", "print my shopping list", "photo of my receipt", "set up my printer driver"),
  judged on descriptions alone: all four skills 8/8, no cross-confusion, every near-miss to none
  or the right other tool. No description changed.

### 14.3 Rulings worth knowing

- The eval CLI is a git-ignored shim on PATH, not a global link.
- `longhand proof -o` now creates its folder, as `build -o` does (found by the to-proof eval).
- The plan's 6,000-word proof splits into three parts, not two.
- With no profile, `to-workbook` sends the desk question as its own message and does not wait.
- Deferred to the engine: component default prompts that name a colour ("in purple", "a second
  colour") regardless of the kit; the skills write their own prompts meanwhile.
