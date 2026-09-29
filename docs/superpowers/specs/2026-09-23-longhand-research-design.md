# Longhand sub-project 2 — Research

**Status:** draft for review · **Date:** 2026-09-23
**Parents:** [`2026-09-23-longhand-design.md`](2026-09-23-longhand-design.md) (esp. §5.5, §7, §13) · [`2026-09-23-longhand-foundation-design.md`](2026-09-23-longhand-foundation-design.md) (esp. §5, §13). This spec details sub-project 2 and does not reopen the umbrella decisions.

---

## 1. Goal

Give every Longhand component, preset, and style an honest, auditable evidence base:

- a roster that passes the admission test;
- 1–3 load-bearing claims per item;
- primary sources with verified DOIs;
- an A–D grade and a `transfer` rating for every claim;
- a record of every downgrade;
- a grading report the user has signed off.

**Done when**

1. **Gate 1:** `research/roster.md` is approved by the user.
2. Every item on the approved roster (kept components, admitted new components, presets, the five styles) has graded claims in `research/grounding.json`.
3. Every claim is backed by a note in `research/<family>.md`.
4. `check-dois` passes, with zero unresolved and zero mismatched DOIs.
5. **Gate 2:** `research/grading-report.md` is approved by the user.
6. `research/prior-art.md` is written.
7. After the Foundation port lands, `apply-grounding` has merged the grounding into `component.json` / `styles.json` / preset files, and CI runs `longhand validate --strict`. **Done 2026-09-26:** apply-grounding merged; CI runs strict (`pnpm validate`).

All paths in this spec are relative to `packages/longhand/` unless absolute.

## 2. Scope

**In**

- Step 0: roster audit and gap-fill proposal (§3).
- Claim inventory.
- Sourcing, grading, and the adversarial downgrade pass.
- Research notes.
- The grading report.
- `scripts/check-dois.ts` and `scripts/apply-grounding.ts`.
- The CI jobs for both scripts.
- The prior-art review (§10).
- The starter preset list and its licence checks.
- Three schema amendments to Foundation §5/§13 (§5.4).

**Out**

| Item | Goes to |
| --- | --- |
| Renderers for newly admitted components, and removal or merging of existing renderers | Follow-up tasks after Gate 1 (Foundation-style port tasks) |
| Preset JSON files beyond `eisenhower` | Follow-up tasks after Gate 1 (data only) |
| Site presentation of grades | Sub-project 4 |
| Style *rules* in `styles.json` | Sub-project 3 (this sub-project supplies only their `grounding` and the provisional parameters of §8) |

**Coordination with Foundation (which runs in parallel)**

- Research never edits `components/*` directly.
- All grounding is staged in `research/grounding.json`, keyed by id.
- `apply-grounding` merges it once both sub-projects are complete.

## 3. Step 0: roster audit and gap-fill

One Opus agent applies the six-point admission test (umbrella §5.5) to each item and writes `research/roster.md`.

**Structural components** (`cover`, `return-checklist`, `question-queue`, `player-aid`) exist to run the loop rather than to perform a thinking move. They are exempt from test points 1–2. They still need claims for what they assert: orientation, capture, offload.

### 3.1 Existing printables (28)

The **hypothesis** column is the starting position the agent must confirm or overturn with reasons.

| # | Id | Kind | Hypothesis |
| --- | --- | --- | --- |
| 1 | cover | page | keep (structural) |
| 2 | brain-dump | page | keep: offload/externalisation; distinct from free-recall (offload vs retrieval of learned material) |
| 3 | feynman | page | keep: illusion of explanatory depth |
| 4 | node-map | page | keep: concept mapping |
| 5 | card-sort | page | keep; its sort columns should reuse the `zones` helper shared with playmat |
| 6 | timeline | page | keep |
| 7 | matrix-2x2 | page | keep; the base for the eisenhower, swot, impact-effort, and power-interest presets |
| 8 | options-criteria | page | keep |
| 9 | assumption-audit | page | keep |
| 10 | five-whys | page | keep; expected grade D |
| 11 | pre-mortem | page | keep |
| 12 | constraint-removal | page | keep; check overlap with the stimulus-die face "remove the constraint" (face ≠ page: keep both) |
| 13 | forced-connections | page | keep: random entry as a page; stimulus-die is the same mechanism as a piece used throughout (keep both) |
| 14 | ten-bad-ideas | page | keep; expected grade C/D |
| 15 | perspective-swap | page | keep; absorbs meeple (see merges) |
| 16 | commit | page | keep; **adopt the if-then format** ("When ___, I will ___") as its default structure |
| 17 | question-queue | page | keep (structural) |
| 18 | return-checklist | page | keep (structural) |
| 19 | sheet | page | keep as **internal**, not listed in the pattern library; the base for the sub-project 3 `proof` renderer |
| 20 | player-aid | piece | keep (structural): the portable key |
| 21 | tokens | piece | keep |
| 22 | tracker | piece | merge into scoresheet |
| 23 | dashboard | piece | keep: working-memory state is a distinct move from self-monitoring |
| 24 | playmat | piece | keep: general zones for sticky notes and cards; the base for the canvas presets |
| 25 | stimulus-die | piece | keep |
| 26 | timer | piece | keep |
| 27 | scoresheet | piece | keep; absorbs tracker |
| 28 | meeple | piece | merge into perspective-swap |

### 3.2 Merges and demotions to evaluate explicitly

| Proposal | Rationale to test | If accepted |
| --- | --- | --- |
| **tracker → scoresheet** | Both are self-monitoring of a felt quantity; they differ only in *when* you mark it | scoresheet gains variants `before-after` (default) and `running` (the tracker's track); `tracker` becomes an alias that `validate` reports as `E_RENAMED` |
| **meeple → perspective-swap** | The same move (perspective-taking); meeple adds embodiment | perspective-swap gains a `tent` variant [scissors]; meeple's embodiment claim becomes a supporting claim |
| **playmat vs card-sort columns** | Overlapping zones | No merge: card-sort *uses* zones; playmat stays as the table piece. Shared `zones` helper |
| **commit ← if-then** | Implementation intentions are commit's strongest mechanism | No new `if-then` component; commit's default layout becomes if-then. Rejected alternative: a separate if-then page (it would duplicate commit) |
| **sheet → internal** | Not a thinking move | Hidden from `list` by default (`"listed": false`); still renderable |

### 3.3 Candidate new components

| Candidate | Mechanism (provisional grade) | Hypothesis |
| --- | --- | --- |
| **free-recall** | Retrieval practice (A) | **Admit.** The core page of the Series style. Variant `with-confidence` adds confidence dots, grounded in hypercorrection/calibration |
| **woop** | Mental contrasting with implementation intentions (B) | **Admit.** Wish → Outcome → Obstacle → Plan; distinct from commit (it adds obstacle contrasting) |
| **self-explain** | Self-explanation (A–B) | **Admit** as its own page: step-by-step explanation of worked material, distinct from feynman's plain-language explanation of a concept |
| **worked-example completion** | Worked-example / completion effect (A, with expertise reversal) | **Fold** into self-explain as a `faded` variant; alone it tells more than it asks (test point 3) |
| **check-in** | Expressive writing (B, small effect); progress self-monitoring (A–B) | **Admit.** The recurring page of the Ritual style, identical every time |
| **interleaved practice sheet** | Interleaving (B, domain-dependent) | **Reject as a component.** Becomes a Series *rule* (mix problem types within a round) |
| **forecast** | Calibration / forecasting (B) | **Evaluate.** Predict with a probability now and score it at the next return; pairs with Ritual and Series. Admit only if distinct from scoresheet |

Candidates proposed by the agent beyond this list must pass the same test and carry a provisional mechanism and grade.

### 3.4 Starter presets (licence check is part of the task)

| Preset | Base | Licence position to verify |
| --- | --- | --- |
| eisenhower | matrix-2x2 | Idea; no restriction (already shipped by Foundation) |
| swot | matrix-2x2 | Idea; no restriction; attribution disputed, so cite as "traditional" |
| impact-effort | matrix-2x2 | Idea; no restriction |
| power-interest | matrix-2x2 | Idea; attribute to Mendelow (1991) |
| now-next-later | playmat | Idea; no restriction |
| start-stop-continue | playmat | Idea; no restriction |
| kanban | playmat | Idea; no restriction |
| business-model-canvas | playmat (9 zones) | **CC BY-SA 3.0, Strategyzer.** Attribution required. The preset file carries its own licence header and is excluded from the repo licence |
| lean-canvas | playmat (9 zones) | Believed to be CC BY-SA 3.0 (Maurya); **verify from a primary source** |
| empathy-map | playmat | Believed to be CC BY-SA (Gray/XPLANE); **verify** |

Rules:

- Any preset whose licence cannot be verified from a primary source is **dropped**, not shipped as "probably fine".
- Presets inherit their base's grounding. They add claims only where a specific finding exists; e.g. eisenhower may add the mere-urgency effect.

### 3.5 Output and Gate 1

`research/roster.md` has one decision table covering every existing item, candidate, and preset. Columns:

- id;
- decision (`keep` · `merge→<id>` · `demote→preset of <id>` · `internal` · `admit` · `fold→<id>` · `reject`);
- the admission-test result per point (✓/✗/n.a.);
- a reason of at most two sentences.

**Gate 1:** the user approves the table.

- Sourcing for `keep` items starts at once, in parallel with Gate 1.
- Sourcing for `admit`, `merge`, and `fold` items waits for Gate 1.

## 4. Claim families (the batching unit)

| Family file | Components / presets / styles |
| --- | --- |
| `memory-retrieval.md` | free-recall, self-explain, feynman, question-queue · **Series** |
| `creativity-fixation.md` | ten-bad-ideas, forced-connections, constraint-removal, stimulus-die · **Incubation** |
| `decision-diagnosis.md` | options-criteria, pre-mortem, assumption-audit, matrix-2x2 (+ its presets), five-whys, tokens, forecast |
| `planning-self-regulation.md` | commit, woop, timeline, timer, scoresheet · **Sitting** |
| `perspective-emotion.md` | perspective-swap, check-in · **Ritual** |
| `attention-load.md` | dashboard, player-aid, cover; the cover's how-to claims (phone in another room, stop mid-sentence) |
| `reading-review.md` | return-checklist, sheet/proof · **Proof**; the proof-action protocol |
| `externalisation-embodiment.md` | brain-dump, card-sort, playmat (+ its presets), node-map; the colour-language protocol; the handwriting vs typing claim |

- **Claim ids:** `<family>/<slug>`, e.g. `memory-retrieval/testing-effect`.
- **One claim, many items:** a claim that serves several items is researched once and referenced by each.

## 5. Research notes and data mapping

### 5.1 Note template (one `##` section per claim in `research/<family>.md`)

```markdown
## testing-effect
**Claim:** Retrieving material from memory improves later retention more than restudying it.
**Construct:** retrieval practice (testing effect) · **Used by:** free-recall, Series
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Replication
Many Labs / RRR / large pre-registered replications: result, or "none found (searched: …)".

### Backfire evidence
Conditions under which the effect vanishes or reverses, with sources.

### Grade
**B** · transfer **adjacent** · effect **moderate**
Rationale: 3–6 sentences applying §6, naming any tie-break used.

### Adversarial pass
confirmed | downgraded A→B: reason, with source.
```

### 5.2 Mapping into data

Graded claims are written to `research/grounding.json`, the single machine-readable output:

```jsonc
{
  "components": {
    "free-recall": {
      "claims": [{
        "id": "memory-retrieval/testing-effect",
        "claim": "Retrieving material from memory improves later retention more than restudying it",
        "construct": "retrieval practice",
        "grade": "A",
        "transfer": "adjacent",
        "effect": "moderate",                    // small | moderate | large | n/a
        "load_bearing": true,
        "sources": [{ "cite": "Rowland (2014)", "doi": "10.1037/a0037559", "type": "meta-analysis" }],   // illustrative until verified by check-dois
        "rationale": "research/memory-retrieval.md#testing-effect"
      }],
      "helps": "…", "backfires": "…"
    }
  },
  "presets": { }, "styles": { }, "protocols": { }
}
```

- `apply-grounding` writes each entry into the `grounding` block of the matching `component.json` / preset file / `styles.json` entry.
- It fails on ids that don't exist.

### 5.3 Source `type` values

`meta-analysis` · `rrr` (registered replication report / Many Labs) · `experiment` · `review` · `theory` · `practice` (practitioner book, manual, or standard).

### 5.4 Schema amendments to Foundation (applied by `apply-grounding`'s schema update)

1. Claims gain `id`, `load_bearing` (boolean, default `true`), and `effect` (enum above).
2. Sources may carry `isbn` or `url` in place of `doi`. `validate --strict` requires a verified DOI on at least one source **for grades A–C**. Grade D claims may rest on `isbn`/`url` practice or theory sources.

3. Components gain an optional `listed` (boolean, default `true`). `list` and the site hide `listed: false` items (e.g. `sheet`); they remain renderable.

Amendment 2 refines Foundation §13, which required a DOI on every graded claim. Without it, D-grade practitioner claims could never pass strict mode.

## 6. Rubric

### 6.1 Grades (verbatim from umbrella §13.2)

- **A: Robust.** At least one meta-analysis, or several large pre-registered replications; consistent; no failed large replication.
- **B: Supported.** Several independent experiments, mostly consistent; no failed large replication.
- **C: Suggestive.** Few or small studies, mixed results, or a failed replication.
- **D: Practice.** Theory or practitioner craft; not directly tested.

### 6.2 Tie-break rules (applied in order; the first match caps the grade)

1. A failed large replication (RRR, Many Labs, or a pre-registered replication with n at least twice the original) of *this* effect → **at most C**, whatever the earlier literature says.
2. A meta-analysis whose publication-bias-corrected estimate (PET-PEESE, trim-and-fill, or selection models) is near zero or reverses → **at most C**.
3. Meta-analyses that materially disagree → grade by the most rigorous and recent (pre-registered, bias-corrected); **at most B** while the conflict is unresolved.
4. High unexplained heterogeneity (I² > 75%) → **at most B**, unless a reported moderator matches our conditions of use, in which case grade on that subgroup.
5. Evidence only from theory or philosophy (e.g. the extended mind) → **D**, type `theory`.
6. Practitioner-only evidence (books, case reports, company methods) → **D**, type `practice`.
7. A real but small effect (d or g < 0.2) keeps its grade; `effect: small` is mandatory, and the `helps` text must say so.

### 6.3 Aggregation

- **Displayed grade** = the lowest grade among the item's `load_bearing` claims (umbrella §5.3).
- Supporting claims never lower or raise it.
- `transfer` **never changes a grade**. It is shown beside it ("A · analogical").

### 6.4 Transfer

| Value | Definition | Example |
| --- | --- | --- |
| `direct` | Studies tested essentially our manipulation, on paper, with adults | Written if-then plans (implementation intentions) → commit's if-then layout |
| `adjacent` | A similar manipulation or task, different context | Prospective-hindsight studies of explanation generation → a solo pre-mortem page |
| `analogical` | We borrow the mechanism; no study tested anything like our use | Kirsh & Maglio's Tetris epistemic actions → rearranging cards |

## 7. Pipeline and agents

Runs as parallel Agent calls from the lead session. It is not a Workflow; the user has not opted into one.

| Step | Agent | Model (why) | Batch | Output |
| --- | --- | --- | --- | --- |
| 0 Roster | 1 agent | Opus: judgement-heavy, sets scope for everything else | all items | `roster.md` |
| 1 Claim inventory | lead | main session: it owns the design intent | all items | claim list per family, in each note file |
| 2 Sourcing | 8 agents, one per family (≤12 claims each; split larger families) | Sonnet: search-and-extract work at the best cost; WebSearch + WebFetch | family | draft notes plus a structured JSON block per claim |
| 3 Grading | 4 agents, two families each | Opus: applies the rubric and tie-breaks | 2 families | grade, transfer, effect, load_bearing, rationale, helps/backfires drafts |
| 4 Adversarial | 4 agents, two families each, fresh context, never the same agent as step 3 | Opus: must argue *against*; may only confirm or downgrade | 2 families | confirm/downgrade per claim, with evidence |
| 5 Spot-check | lead | main session | **all A grades, all downgrades, and a random ≥20% of the rest** | read each cited abstract; fix or escalate |
| Prior art | 1 agent | Sonnet: survey work | — | `prior-art.md` |

### 7.1 Structured return (sourcing)

Each sourcing agent ends its report with one JSON block per claim, parsed by the lead:

```json
{ "claim_id": "memory-retrieval/testing-effect",
  "sources": [{ "cite": "", "doi": "", "year": 0, "type": "", "design": "", "n": 0, "effect": "", "finding_quote": "", "url": "" }],
  "replication": [{ "cite": "", "doi": "", "result": "replicated|failed|mixed" }],
  "backfire": [{ "cite": "", "doi": "", "condition": "" }],
  "unverified": [{ "cite": "", "reason": "" }] }
```

### 7.2 Citation integrity

- **Agents must never write a DOI they have not verified.**
- Every DOI is checked with `check-dois --doi <doi>` (§9) before it goes in a note. The resolved title, first author, and year must match the citation.
- A source that can't be verified goes in `unverified` and is not used for grading.
- `finding_quote` must be copied from the abstract or text the agent actually fetched, never paraphrased from memory.
- Paywalled full text is fine; the abstract plus meta-analytic summaries are sufficient for grading. The rationale notes when only the abstract was read.

## 8. Style grounding

All parameters are **provisional until graded**. A parameter whose supporting claim grades C or D is either kept and labelled as a design choice, or revised. That call is made in the grading report.

| Style | Load-bearing claims to source | Parameters to justify |
| --- | --- | --- |
| **Sitting** | Implementation intentions (commit); timeboxing / Parkinson's law (expected D); removing the phone reduces distraction (Ward et al. 2017 "brain drain" and its replications); stopping mid-task aids resumption (Zeigarnik, whose recall advantage has not replicated; expected C/D) | ≤10 pages (design choice, D); a 40-minute default sitting; "stop mid-sentence" coaching (kept only if a claim supports it; otherwise reworded as a resumption aid) |
| **Series** | Testing effect; distributed practice; retrieval before review; expanding vs uniform spacing | 3 sessions; gaps of about 1d/3d/7d, derived from Cepeda et al. (2008): the optimal gap is a fraction of the retention interval that shrinks as the interval grows. Record the target retention interval (≈1 month) and the implied gap ratio. Expanding vs uniform: pick the better-graded option. Interleaving within a round (§3.3) |
| **Incubation** | Incubation effect (Sio & Ormerod 2009 meta-analysis: larger for divergent tasks, after longer preparation, with low-demand interim activity); sleep and insight (expected C); walking and divergent thinking (Oppezzo & Schwartz 2014); diverge/converge separation, with time pressure lowering divergent output (Amabile et al.; expected C) | A minimum break length; guidance to do a "low-demand activity, not rest"; printing both halves together with the second marked *after the break* |
| **Ritual** | Monitoring goal progress promotes attainment, more so when physically recorded (Harkin et al. 2016 meta-analysis); expressive writing (small effect; Frattaroli 2006 meta-analysis) | Weekly default cadence; a page identical across returns; ≤10 minutes |
| **Proof** | Automation bias / complacency (Parasuraman & Manzey 2010; systematic reviews); paper vs screen comprehension (Delgado et al. 2018; Clinton 2019 meta-analyses); mark → action conventions (proofreaders' marks, BS 5261 / Chicago; D, practice) | ≤10 pages per proof; numbered paragraphs (D, design choice); research-cost actions need confirmation (design choice) |

The protocol claims are graded the same way, as `protocols` entries in `grounding.json`:

- colour coding as a recoverable second channel (`externalisation-embodiment`);
- confidence dots and calibration (`decision-diagnosis`);
- the proof actions (`reading-review`).

## 9. Scripts and CI

### 9.1 `scripts/check-dois.ts`

Node ≥20, built-in `fetch`, no dependencies, run with `tsx`.

- **Inputs:**
  - (a) `--doi <doi>` (single check, used by agents);
  - (b) default mode, which scans `research/*.md` source tables, `research/grounding.json`, `components/*/component.json`, `presets/*.json`, and `registry/styles.json`.
- **API:** `GET https://api.crossref.org/works/{doi}`.
  - User-Agent: `longhand-doi-check/0.1 (+https://github.com/vandermerwed/skills)`. No email address.
- **Rate limiting:**
  - concurrency 2, ≥250 ms between requests;
  - on 429 or 5xx, exponential backoff (1 s, 2 s, 4 s, 8 s), then fail that DOI as `unreachable`.
- **Match check:**
  - the resolved first-author surname and year must match the `cite` string;
  - a mismatch → `E_DOI_MISMATCH`; a 404 → `E_DOI_NOT_FOUND`.
- **Cache:** `research/.doi-cache.json` (committed), recording `{ doi, title, first_author, year, status, checked_at }`. Entries older than 90 days are re-checked; default mode reads the cache first.
- **Exit codes:** 0 when every DOI resolves and matches; 1 on any `NOT_FOUND`/`MISMATCH`; 2 when only `unreachable` failures occurred (CI reports these as a warning, not a failure).
- **Output:** a human summary by default; `--json` for agents.
- **As built (2026-09-26):** `scripts/check-dois.ts`, with the logic in `scripts/research/dois.ts` and the tests in `test/scripts/dois.test.ts`; run it with `pnpm check-dois [--doi <doi> [--cite "..."]] [--json]`. Four refinements to the match rule, each covered by a test:
  1. The year may match any date Crossref records (issued, print or online), so online-first citations pass.
  2. The year is compared only when both the citation and the record have one; prose often names an author without a year, and theses may carry no date. At least one of the two checks must apply.
  3. In markdown, every DOI on a line is checked. The citation is the text just before the DOI (plus a table row's first cell and year cells). If that doesn't name the author, the whole line is tried.
  4. Cache entries also store `years`.

  The first full run found 364 DOIs and 885 citations, all resolved and matched. The only citations that passed through the whole-line fallback were 6 prose lines, each checked by the lead.

### 9.2 `scripts/apply-grounding.ts`

- Merges `research/grounding.json` into the item files (§5.2).
- Applies the §5.4 schema amendment.
- Idempotent.
- `--check` mode fails if any file differs from what a merge would produce (used in CI).
- **As built (2026-09-26):** the logic is in `scripts/research/grounding.ts`, with the tests in `test/scripts/grounding.test.ts`, run as `pnpm apply-grounding [--check]`.
  - `apply-grounding` reads `research/grounding.json` as its input; it does not build it. `research/tools/build-grounding.mjs` is the step upstream of it: it merges `research/grading/<family>.json` (step 3) and `<family>.adversarial.json` (step 4) into `research/grounding.json`, computing each item's `displayed_grade` (§6.3) along the way, and printing the grading-report summary (§11) with `--summary`. The path for grading a new item is `research/tools/build-grounding.mjs` then `apply-grounding` (see `docs/errors.md`, "Grounding a new item").
  - Files are compared as parsed JSON, so formatting never counts, and the command prints the biome command to run after a write.
  - Components, presets and styles with no entry are left alone, with a warning.
  - Variant and protocol grounding mirrors `grounding.json` exactly.
  - The collection claims live in `registry/collection.json`.
  - `displayed_grade` is not stored (§6.3).
  - `PENDING_STYLES` (a controller ruling): `series`, `incubation`, `ritual` and `proof` are graded but not yet in `registry/styles.json`, so `apply-grounding` warns and keeps them staged in `research/grounding.json` until sub-project 3 adds them.

### 9.3 CI

- **`research` job:** runs on changes to `research/**`, `components/**`, `presets/**`, `registry/styles.json`, plus weekly on a schedule. Steps: `check-dois` and `apply-grounding --check`.
- **The strict flip:** once Gate 2 is approved and `apply-grounding` has run, one commit changes the CI `validate` step to `longhand validate --strict`. That commit is the last task of this sub-project.
- **As built (2026-09-26):** the job is `.github/workflows/research.yml`, which also watches the scripts and runs on Mondays at 05:17 UTC. Biome skips the tool-written research data. CI does not commit the refreshed DOI cache, so once every cached entry has passed the 90-day threshold (§9.1), every run re-fetches all DOIs from Crossref; refresh `research/.doi-cache.json` locally with `pnpm check-dois` and commit it periodically to keep CI's DOI checks fast.

## 10. Prior-art review

One Sonnet agent writes `research/prior-art.md`. For each item it records: what it is, the overlap with Longhand, what to borrow, and how Longhand differs.

| Prior art | Why it matters |
| --- | --- |
| **inkloop** (npm: "local-first CLI for human-AI collaboration on rendered HTML") | The closest direct overlap; read its README and repo in full |
| **Rocketbook / reMarkable / Livescribe** | Paper-to-digital capture. Rocketbook's page symbols route pages to destinations, which is a mark → action protocol |
| **Proofreaders' marks** (BS 5261-2; Chicago Manual of Style) | A century-old mark → action standard; the precedent for Proof |
| **Bullet Journal** (Carroll) | Rapid-logging signifiers as a hand-mark protocol |
| **Getting Things Done paper systems** (Allen) | Externalisation practice and weekly review (Ritual) |
| **Paper prototyping** (Snyder) | Paper as a thinking medium in design |
| **Oblique Strategies; Liberating Structures; Strategyzer canvases** | Card and canvas craft; licence precedents for presets |

The differentiation notes feed the site's *prior art* explanation page (sub-project 4).

## 11. Grading report and Gate 2

`research/grading-report.md` contains:

1. **Summary table:** item → displayed grade · load-bearing claims (grade, transfer, effect) · change from the provisional grade · adversarial result.
2. **Downgrades**, each with its reason and source.
3. **Items graded D only.** For each, recommend *keep, labelled* or *cut*, with a reason.
4. **Style parameters** that §8 marked provisional, with a recommendation for each: keep as a design choice, or revise.
5. **Unverified sources** that were excluded.

**The user decides, per row:** accept the grade, or `dispute` with a reason. For items graded D only, they also decide keep or cut. For provisional parameters, they decide keep or revise.

**Disputes:**

- The lead re-runs one targeted sourcing agent and one adversarial agent on the disputed claim, with the user's reason in the prompt.
- Evidence rules win over preference. The user may **cut** or **relabel** an item at will, but a grade is raised only when new evidence meets the rubric.
- A dispute is resolved when the re-run result is accepted, or when the user chooses cut or relabel.

## 12. Risks

| Risk | Mitigation |
| --- | --- |
| Hallucinated citations | Verify-before-write (§7.2); `check-dois` in CI; lead reads every A-grade abstract |
| Overclaiming transfer ("science-backed") | `transfer` shown beside every grade; tie-break 7 forces `effect: small`; `helps` must state conditions |
| Flagship components grade low (e.g. five-whys D, ten-bad-ideas C) | Intended: the admission test admits D if labelled; the grading report surfaces keep/cut explicitly |
| Paywalled sources | Abstracts and meta-analytic summaries suffice; the rationale records what was read |
| Crossref outages or rate limits | Cache; backoff; `unreachable` does not fail CI |
| A licence misread on a preset | Primary-source verification required; unverifiable → dropped |
| Merge conflicts with the parallel Foundation port | Research writes only to `research/*` and `scripts/*`; `apply-grounding` runs after both are done |
| Cost overrun | **Ceiling:** about 18 agent runs (1 roster + 8 sourcing + 4 grading + 4 adversarial + 1 prior art), estimated at ≤3M subagent tokens in total. If cumulative usage passes 3.5M, the lead stops and reports before spending more. Dispute re-runs are budgeted separately, at 2 runs per dispute. **Raised by the user on 2026-09-25 to 5.5M.** Usage stood at about 3.6M before grading, because the library mining, the gap-fill and the Gate 1b sourcing batch (GB) were added after the original plan. **Raised again by the user on 2026-09-25 to 6.5M**, for the final adversarial pass (DD + AL), at about 6.0M spent. |
