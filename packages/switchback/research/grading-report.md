# Longhand grading report (Gate 2)

**Status:** draft for Gate 2 · **Date:** 2026-09-25 · **Spec:** research design §11
**Built from:** `grounding.json`, which `tools/build-grounding.mjs` generates from `grading/*.json` (step 3) and `grading/*.adversarial.json` (step 4); `spot-check.md` (step 5); and `prior-art.md`.

> **Status:** steps 3–5 are complete for all eight families. Gate 2 was approved on 2026-09-25 (§8). The last adversarial pass (DD + AL) finished after the approval; its results, and the one decision they raise, are in §9.

**Headline:** 90 claims were graded. Across the 66 grounded items (styles, components, variants, presets, protocols), the displayed grades are:

| Displayed grade | Items |
| --- | --- |
| A | 1 (commit) |
| B | 14 |
| C | 27 |
| D | 23 |

Of the 18 claims at D:
- 7 rest on practitioner craft;
- 2 rest on theory only;
- 2 were never directly tested;
- **7 are D only because their empirical sources could not be read**, marked `D (unread)` below. Those seven can be disputed with a targeted re-read. They are not evidence that the page doesn't work.

## How to decide

For each row in §1, **accept** or **dispute** (with a reason). For the D items in §3, also choose **keep, labelled** or **cut**. For the style parameters in §4, choose **keep** or **revise**. Reply with only the rows you want changed; anything not mentioned is taken as accepted with the recommendation.

## 1. Summary: item → displayed grade

The displayed grade is the lowest grade among the item's load-bearing claims (§6.3). "Set by" names the claim or claims that fix it. Provisional grades in the catalogue were all `unrated`, so every row is new.

| item | kind | displayed | set by (weakest load-bearing claim) | LB claims | step 4 |
| --- | --- | --- | --- | --- | --- |
| incubation | style | **D** | deferred-judgement (unread) | 5 | done |
| proof | style | **D** | proofreading-marks (practice) | 3 | done |
| ritual | style | **C** | prior-state-recall | 2 | done |
| series | style | **B** | retrieval-before-review | 3 | done |
| sitting | style | **D** | timeboxing (practice) | 4 | done |
| assumption-audit | component | **D** | assumption-surfacing (practice) | 3 | done |
| brain-dump | component | **C** | unfulfilled-goal-offload, free-listing-salience | 2 | done |
| card-sort | component | **C** | epistemic-action, sorting-elicitation | 2 | done |
| check-in | component | **C** | prior-state-recall | 2 | done |
| commit | component | **A** | implementation-intentions | 1 | done |
| constraint-removal | component | **C** | constraint-relaxation | 1 | done |
| cover | component | **D** | goal-orientation (unread) | 1 | done |
| feynman | component | **B** | explanatory-depth | 1 | done |
| five-whys | component | **D** | root-cause-why-chain (practice) | 1 | done |
| forced-connections | component | **D** | random-stimuli (unread), conceptual-combination (unread) | 2 | done |
| forecast | component | **C** | calibration-feedback | 2 | done |
| frame-by-frame | component | **D** | chain-analysis (practice) | 1 | done |
| free-recall | component | **B** | retrieval-feedback | 2 | done |
| goal-factoring | component | **D** | goal-decomposition (unread) | 1 | done |
| matrix-2x2 | component | **D** | two-axis-mapping (theory) | 1 | done |
| mental-contrast | component | **B** | mental-contrasting | 1 | done |
| node-map | component | **D** | causal-diagramming (theory) | 2 | done |
| options-criteria | component | **B** | decomposed-judgement, anchoring | 2 | done |
| perspective-swap | component | **B** | perspective-taking | 1 | done |
| player-aid | component | **C** | job-aid | 2 | done |
| practice-audit | component | **B** | practice-specificity | 1 | done |
| pre-mortem | component | **C** | prospective-hindsight, premortem-overconfidence | 2 | done |
| question-queue | component | **B** | generate-before-told, cognitive-offload | 2 | done |
| return-checklist | component | **C** | job-aid | 1 | done |
| scoresheet | component | **C** | prior-state-recall | 2 | done |
| self-explain | component | **B** | self-explanation | 1 | done |
| sheet | component | **B** | paper-vs-screen | 1 | done |
| small-experiment | component | **C** | graduated-self-experiment | 1 | done |
| stimulus-die | component | **D** | random-stimuli (unread) | 2 | done |
| ten-bad-ideas | component | **D** | deferred-judgement (unread), bad-ideas-criterion (practice) | 3 | done |
| timeline | component | **D** | task-unpacking (unread) | 1 | done |
| timer | component | **D** | timeboxing (practice) | 1 | done |
| tokens | component | **C** | tangible-allocation | 1 | done |
| worst-case | component | **C** | decatastrophizing | 1 | done |
| zones | component | **C** | common-region | 1 | done |
| check-in/gratitude | variant | **C** | prior-state-recall | 2 | done |
| commit/policy | variant | **C** | choice-bracketing | 2 | done |
| forecast/duration | variant | **C** | duration-feedback | 2 | done |
| free-recall/cued | variant | **B** | retrieval-feedback | 2 | done |
| free-recall/with-confidence | variant | **B** | retrieval-feedback | 2 | done |
| goal-factoring/aversion | variant | **D** | goal-decomposition (unread) | 1 | done |
| pre-mortem/iterate | variant | **C** | prospective-hindsight, premortem-overconfidence | 2 | done |
| scoresheet/domains | variant | **C** | prior-state-recall, domain-satisfaction | 3 | done |
| self-explain/faded | variant | **B** | self-explanation | 1 | done |
| self-explain/why | variant | **B** | self-explanation | 1 | done |
| tokens/countdown | variant | **C** | tangible-allocation, goal-gradient | 2 | done |
| business-model-canvas | preset | **C** | common-region | 1 | done |
| dashboard | preset | **C** | common-region | 2 | done |
| eisenhower | preset | **D** | two-axis-mapping (theory) | 2 | done |
| impact-effort | preset | **D** | two-axis-mapping (theory) | 1 | done |
| kanban | preset | **C** | common-region | 1 | done |
| lean-canvas | preset | **C** | common-region | 1 | done |
| now-next-later | preset | **C** | common-region | 1 | done |
| playmat | preset | **C** | common-region, spatial-externalisation | 2 | done |
| power-interest | preset | **D** | two-axis-mapping (theory) | 1 | done |
| start-stop-continue | preset | **C** | common-region | 1 | done |
| swot | preset | **D** | two-axis-mapping (theory) | 1 | done |
| colour-language | protocol | **D** | redundant-coding (practice) | 2 | done |
| confidence-dots | protocol | **D** | redundant-coding (practice) | 2 | done |
| proof-actions | protocol | **D** | proofreading-marks (practice) | 2 | done |
| collection | collection | **—** | — | 0 | done |

`perspective-swap/two-sides` is cut, and not grounded.

## 2. Downgrades from the adversarial pass (step 4)

| Claim | Change | Reason | Source |
| --- | --- | --- | --- |
| creativity-fixation/random-stimuli | C → D | No counted source tests random, unrelated stimuli: Dugosh et al. used other people's ideas, and Leahy et al. show that examples fixate. This takes `stimulus-die` to D. | Dugosh et al. 2000, 10.1037/0022-3514.79.5.722; Leahy et al. 2020, 10.1115/1.4046446 |
| memory-retrieval/interleaving-confusable | A → B | Tie-break 4: I² = 77.3% overall and 76.9% for maths, with no matching subgroup; trim-and-fill g = 0.29. | Brunmair & Richter 2019, 10.1037/bul0000209 |
| memory-retrieval/spacing-gap-ratio | B → C | Cepeda 2008's own data put the optimal recall gap at about 11 days for a 35-day test. Series' 1d and 3d gaps sit on the costly short side. | Cepeda et al. 2008, 10.1111/j.1467-9280.2008.02209.x |
| reading-review/paper-vs-screen | A → B | Tie-break 4: I² = 89.9 in the within-participant studies, with prediction intervals spanning zero. The newest meta-analysis finds g = −0.11 for handhelds. | Delgado et al. 2018, 10.1016/j.edurev.2018.09.003; Salmerón et al. 2024, 10.1037/edu0000830 |
| reading-review/automation-bias | B → C | The mitigation half of the claim rests on one experiment, and the literature contradicts it. | Buçinca et al. 2021, 10.1145/3449287; Parasuraman & Manzey 2010, 10.1177/0018720810376055 |
| planning-self-regulation/progress-monitoring | A → B | Tie-break 4: I² ≈ 84%. For a *private* written record, d+ = 0.19, so the effect is labelled **small**. | Harkin et al. 2016, 10.1037/bul0000025 |
| decision-diagnosis/decomposed-judgement | A → B | Tie-break 4: unexplained heterogeneity in both meta-analyses (Grove I² ≈ 92%, Ægisdóttir ≈ 81%). The effect is **small** (d ≈ .12–.16). This takes options-criteria from A to B. | Grove et al. 2000, 10.1037/1040-3590.12.1.19; Ægisdóttir et al. 2006, 10.1177/0011000005285875 |
| decision-diagnosis/anchoring | A → B | "Seen" (incidental) anchors failed three high-powered studies; only anchors that are considered replicate. Rewording the claim to "written or compared against", which is the page's actual case, would restore A. options-criteria stays B either way, because of decomposed-judgement. | Shanks et al. 2020, 10.1525/collabra.310 |
| decision-diagnosis/consider-the-opposite | B → C | The overconfidence half failed to replicate (Allwood & Johansson 2004) and was marginal in Walters et al. 2017. | Allwood & Johansson 2004, 10.1016/j.actpsy.2004.06.006; Walters et al. 2017, 10.1287/mnsc.2016.2580 |
| decision-diagnosis/duration-feedback | B → C | In three experiments, "duration feedback did not influence bias"; only task similarity did. This takes forecast/duration from B to C. | Thomas & König 2018, 10.3389/fpsyg.2018.00760 |
| attention-load/goal-orientation | C → D (unread) | No counted source tests stating a session's question: advance organisers preview material, which is a different manipulation. This takes **cover** to D (see §9). | Luiten et al. 1980, 10.3102/00028312017002211 |
| perspective-emotion/expressive-writing | A → B | Tie-break 3: the meta-analyses disagree (Reinhold 2018 and Mogk 2006 find no effect; Guo 2023 finds a small one). It is a supporting claim, so no displayed grade moves. | Reinhold et al. 2018, 10.1111/cpsp.12224; Guo 2023, 10.1111/bjc.12408 |

Four claims hold A: testing effect, distributed practice, implementation intentions and hindsight-record. The lead read all of them (`spot-check.md` §2). For hindsight-record, the adversarial pass confirmed that the memory design holds (Bernstein 2011; Chen 2021). Every downgrade DOI was re-verified by the lead on Crossref.

## 3. Items whose displayed grade is D: keep, labelled, or cut

**Recommendation: keep everything labelled, except one.** The admission test allows D if it is labelled honestly (§12), and most of these are D because the move is craft, not because it has been shown not to work.

| Item | Why D | Recommendation |
| --- | --- | --- |
| **perspective-swap/two-sides** (Gate 1b) | Resolving the conflict is untested, **and** Miller & Rose 2015 find that a neutral two-column decisional-balance exercise *lowers* commitment to change in ambivalent people. The variant's layout is close to that. | **Cut for v0.1** (do not build). Reconsider only as a redesign that does not print as a balanced pros/cons pair. |
| timeline | task-unpacking **D (unread)**: Kruger & Evans 2004 and Forsyth & Burt 2008 are unread, and the grader expects B once read. | Keep; **dispute → re-read**. |
| forced-connections | random-stimuli and conceptual-combination, both D (unread). | Keep, labelled; dispute → re-read if you care about this page. |
| goal-factoring (+ `aversion`) | goal-decomposition, D (unread for its comparative half: Gage et al. 2012's full text). | Keep, labelled; dispute → re-read. |
| incubation (style) | deferred-judgement, D (unread). The other four load-bearing claims are B/C. | Keep, labelled; **dispute → re-read** (it would likely become C). |
| sitting (style) | timeboxing, D (practice). The retracted Ariely & Wertenbroch paper counts for nothing, and the deadline replication failed. | Keep, labelled. The 40-minute timebox is presented as a design choice. |
| timer | timeboxing, D (practice). | Keep, labelled as a design choice. |
| proof (style) · proof-actions (protocol) | proofreading-marks, D (practice), as the spec expected. | Keep, labelled. The mark convention is established professional practice. |
| assumption-audit | assumption-surfacing, D (practice), while consider-the-opposite is B. | Keep, labelled. |
| five-whys | root-cause-why-chain, D (practice). | Keep, labelled, positioned for causes in systems; `frame-by-frame` covers one's own recurring behaviour. |
| frame-by-frame (Gate 1b) | chain-analysis, D (practice); the concreteness literature is only analogical. | Keep, labelled. |
| matrix-2x2 · eisenhower · swot · impact-effort · power-interest | two-axis-mapping, D (theory). | Keep, labelled. |
| node-map | causal-diagramming, D (theory), while concept-mapping is B. | Keep, labelled. Option: dispute whether causal-diagramming should be load-bearing for node-map at all, since concept mapping is the page's move. |
| stimulus-die | random-stimuli, D (downgraded in step 4). | Keep, labelled. |
| ten-bad-ideas | deferred-judgement (unread) and bad-ideas-criterion (practice); serial-order is B. | Keep, labelled. Its `helps` now says the later-is-better tendency is small and unreliable for any one person. |
| colour-language · confidence-dots (protocols) | redundant-coding, D (practice). | Keep, labelled; these are core protocols. |

## 4. Style parameters (§8 provisional)

| Style | Parameter | Claim grade | Recommendation |
| --- | --- | --- | --- |
| Series | 3 sessions | successive-relearning **C** | **Keep 3 as a labelled minimum**, never "the point of diminishing returns"; retention kept rising through 5 sessions. **Revise** "target the previous round's gaps" so correctly recalled items stay in later rounds. |
| Series | gaps 1d / 3d / 7d | spacing-gap-ratio **C** | **Revise** to about a week between sessions for the ≈1-month target retention interval (a gap ratio of ≈15–25%). At minimum, lengthen the 1-day first gap. |
| Series | expanding vs uniform | expanding-vs-uniform **C** (a parameter, per ruling 4) | **Revise to uniform**, e.g. 7d / 7d / 7d. It is the better-supported option, which §8 says to pick. |
| Series | interleave only confusable categories | interleaving-confusable **B** | **Keep, supported.** |
| Sitting | 40-minute default | sitting-duration **D** | Keep as a design choice, labelled. |
| Sitting | ≤10 pages | no claim | Keep as a design choice (D). |
| Sitting | "stop mid-sentence" coaching | stop-mid-task **C** (step 4 pending) | Reword as a resumption aid, not as the Zeigarnik effect. |
| Incubation | minimum break length | incubation-conditions **C** | Keep as a design choice; no number is supported. |
| Incubation | "low-demand activity, not rest" | incubation-conditions **C** | Keep, worded as "an easy, different activity". Don't claim that rest never works. |
| Incubation | no timer during the diverge half | time-pressure-divergent **C** | **Keep the rule, reword the reason.** The evidence shows an inverted U, not a flat harm, so the rule is a cautious default, not a finding. |
| Ritual | weekly cadence | ritual-cadence **D** | Keep as a design choice, labelled. Harkin suggests more frequent monitoring does more, not that weekly is enough. |
| Ritual | ≤10 minutes | ritual-duration **C** | Keep as a design choice. |
| Proof | paper review is better | paper-vs-screen **B** (small) | **Keep, with a boundary note.** The one error-detection study (Calvo-Ferrer 2022) found screen review *better*, and error-finding is Proof's task. Proof's case rests on its colour-mark read-back, not on paper beating screen. |
| Proof | ≤10 pages, numbered paragraphs, confirm before research-cost actions | no claim | Keep as design choices (D). |

## 5. Findings that change page text

These don't change grades. They change what a page or its `helps` may say, and they will be applied when the grounding is merged (sub-project 3 for prompts, `apply-grounding` for `helps`).

1. **brain-dump:** its prompt asks for no next step, and that is exactly the condition under which its load-bearing claim (writing out unfinished goals) says offloading does *not* help. **Recommend** adding one line: "for each item, the next step, or 'none'."
2. **pre-mortem:** never print the popular "30% more reasons" figure. It comes from Klein's HBR article, and the paper it is attributed to (Mitchell et al. 1989) reports that temporal perspective "showed little influence". The grade is C.
3. **Small effects must be stated as small:** progress monitoring (check-in, Ritual, scoresheet), free-recall's format (g ≈ 0.24–0.29), self-distancing (g = 0.19), expressive writing, mere-urgency and the serial-order effect.
4. **gratitude (check-in option):** "weekly beats daily" is unsupported. Keep the row optional, with no frequency claim.
5. **forecast/duration:** now **C**, the same as the base page, after step 4 (duration feedback is mixed). The Gate 1b carve-out, which allows it in a one-off Sitting, rested on fast feedback rather than on the grade, so it still stands. Its `helps` says the evidence is mixed and that it helps most when the next task is like the last.
6. **phone line on the cover:** the phone-presence effect failed a pre-registered direct replication (C). Reword it from "the phone drains your capacity" to a plain design choice ("out of the room, so it can't interrupt").

## 6. Sources excluded as unverified

48 sources are in the `unverified` blocks of `sourcing/*.json`, and none of them contributes to a grade. By kind:
- pre-DOI books and essays: Osborn 1953, Parkinson 1955, Zeigarnik 1927, Ovsiankina 1928, and others;
- leads from claims.md that do not exist as cited: "Estes & Ward 2002", "Nusbaum, Silvia & Beaty 2014", and Hauser & Shugan 1980 as a "constant sum" source;
- conference papers with no DOI;
- "searched, none found" entries, which record honest nulls.

In addition, 110 table rows cite a DOI with no retrievable abstract. Those count only where the agent read the text and says so.

## 7. Costs and process notes

- **Subagent spend:** about 6.3M tokens in total, against a ceiling raised from 3.5M to 5.5M and then 6.5M. The overrun came from library mining, the gap-fill and the Gate 1b batch (all added after the plan), and from grading runs larger than estimated. The final adversarial run (DD + AL) used about 0.31M.
- **Abstract cache:** `tools/fetch-abstracts.mjs` retrieved abstracts from OpenAlex, Semantic Scholar and Crossref for most of the cited DOIs. Graders used it to turn search-summary findings into verbatim quotes. It turned nine unread D grades into real grades in CF and EE alone.
- **Incident:** one adversarial agent sent the user's email address to the Unpaywall API while looking up open-access copies. It was a lookup only. The remaining agents were told never to send any email address, and the briefs for future runs must say so.

## 8. Gate 2 outcomes (user, 2026-09-25)

**All recommendations are approved as drafted.** No row was disputed. In particular:

- **§1 grades:** accepted. The `decision-diagnosis` and `attention-load` rows were accepted subject to their step-4 adversarial pass (the ceiling was raised to 6.5M for it), which may only lower a grade. Any downgrade it produces is recorded in §9 and flows into `grounding.json` without needing a further decision, unless it moves an item to D.
- **§3 D items:** all are kept and labelled, except **`perspective-swap/two-sides`, which is cut for v0.1** (it is not built). It is recorded as cut in roster.md §9.
- **§3 re-reads:** the recommended "dispute → re-read" rows (timeline, Incubation, and optionally forced-connections and goal-factoring) are **not** triggered by this approval. They stay labelled D (unread) until a separate re-read is requested.
- **§4 style parameters:**
  - **Series:** 3 sessions, labelled as a minimum; uniform gaps of about 7d / 7d / 7d; correctly recalled items stay in later rounds; interleave only confusable categories.
  - **Incubation:** "an easy, different activity"; the no-timer rule is kept, with its reason reworded.
  - **Sitting:** the "stop mid-sentence" line is reworded as a resumption aid.
  - **Proof:** keeps its screen-review boundary note.
  - **The rest:** kept as labelled design choices.
- **§5 text changes:** approved:
  - brain-dump gains a "next step, or 'none'" line;
  - pre-mortem never prints the "30%" figure;
  - small effects are stated as small;
  - gratitude makes no frequency claim;
  - the cover's phone line is reworded as a design choice.

**Where each outcome lands:**

| Outcome | Where it goes |
| --- | --- |
| grades, `helps`, `backfires` | `grounding.json`, then `apply-grounding` (spec §9.2) |
| style parameters and prompt wording | sub-project 3 (skills and `styles.json` rules) |
| the two-sides cut | roster.md §9 |

**Ported (2026-09-26 plan):** every component, variant and preset in `grounding.json` now exists in the catalogue (test: `test/registry/grounding-ids.test.ts`). `apply-grounding` can run.

## 9. After Gate 2: the DD + AL adversarial pass

The pass ran after the Gate 2 approval, as §8 anticipated. There were 18 confirmations and 5 downgrades (§2). The lead spot-checked every downgrade: the DOIs resolve, and the Shanks 2020 and Thomas & König 2018 abstracts say what the reasons quote. The following were applied to `grading/*.json` and `grounding.json`:
- decomposed-judgement: `effect: small`;
- job-aid: `tie_break: none` (Urbach 2014 is a natural experiment, not an RRR, so C rests on mixed results);
- `helps` rewritten to stop overclaiming for options-criteria (small), assumption-audit (mixed), forecast/duration (mixed) and player-aid (mixed).

Items whose displayed grade moved:

| Item | Before | After | Set by |
| --- | --- | --- | --- |
| options-criteria | A | B | decomposed-judgement and anchoring |
| forecast/duration | B | C | duration-feedback |
| **cover** | C | **D (unread)** | goal-orientation |

**Decision needed (§8 rule: a move to D comes back to the user).** The cover is structural, and its one load-bearing claim ("stating the session's question up front orients the work") is now D because nothing read tests it. The goal-setting and adjunct-question literatures may well support it, but their sources are unread (Locke & Latham 2002; Rothkopf & Billington 1979).
- **Recommendation: keep the cover, labelled D (unread).** It cannot be cut, since it runs the loop.
- Optionally add goal-orientation to the "dispute → re-read" list, with timeline and Incubation.

**Outcome (user, 2026-09-26):** keep the cover, labelled **D (unread)**. goal-orientation is not added to the re-read list.
