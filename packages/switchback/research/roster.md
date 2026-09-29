# Longhand roster: Step 0 audit (Gate 1 draft)

**Status:** draft for Gate 1 · **Date:** 2026-09-24 · **Spec:** [research design §3](../../../docs/superpowers/specs/2026-09-23-longhand-research-design.md#3-step-0-roster-audit-and-gap-fill)
**Inputs read:** research design §3, §4, §6; umbrella design §5.5, §6, §7; `patterns/layers/archetype.json`; `patterns/layers/component.json`; `patterns/GROUNDING.md`; the render functions in `_shared/scripts/build_print.py`.

This step applies the admission test. It does not grade. Any evidence strength given here is a **prior**, used only to set priorities; sourcing and grading come later (§7). No citations or DOIs are asserted here. Where a construct is named as a backfire or a mechanism, step 2 still has to source it.

## How to read the table

Test points (umbrella §5.5): **1** distinct move · **2** earns the paper · **3** asks, not tells · **4** known backfire · **5** read-back-able · **6** honestly gradable (a mechanism can be named and graded; D is allowed).

- `✓` passes; `✗` fails; `n.a.` not applicable.
- Structural components (`cover`, `return-checklist`, `question-queue`, `player-aid`) are exempt from points 1 and 2 and show `n.a.` there (§3).
- A `✓` on point 2 for a pure writing page is the **baseline pass**. It rests only on the collection-level claims: the phone is out of the room, the writing is by hand, and the colour is a second channel. It does not claim a page-specific spatial benefit. Pages where the paper does real work (cut, place, sort, roll, flip back through past pages) are noted in §3.
- Presets are not components. Points 1–6 are `n.a.`; they take the lighter preset test (name · attribution · licence), which is covered in §4.
- The decision table keeps **exactly the §3.5 columns**. Each candidate's mechanism, claim family and evidence prior are in Table 2.

---

## 1. Decision table

### 1a. Existing printables (28)

| id | decision | 1 | 2 | 3 | 4 | 5 | 6 | reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cover | keep | n.a. | n.a. | ✗ | ✓ | ✓ | ✓ | It is structural: it orients the sitting and collects the pen→role key. It fails point 3 as the test is written, so see Gate decision 6. |
| brain-dump | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It offloads what is in the head, and its read-back is "themes, not correctness". That is the opposite of free-recall's read-back, so the two stay separate. |
| feynman | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It explains a whole concept in plain language, which exposes the illusion of explanatory depth. It differs from self-explain in both input (your own concept, not given material) and grain (the whole, not each step). |
| node-map | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It externalises relations; the verbs on its labelled edges are what the agent decodes. Dense maps photograph poorly, so its `helps` text should cap the node count. |
| card-sort | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Sorting is physical and exposes the taxonomy the person already holds; the paper does real work here. Its columns should reuse the `zones` helper shared with playmat (no merge). |
| timeline | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It forces order ("what must be true first"), which node-map does not. Candidate mechanism: unpacking a task into ordered parts. |
| matrix-2x2 | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | You place items between two competing axes. It is the base for four presets. |
| options-criteria | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Its value is the gap between the total and the gut score, and its point-2 pass is weak (a spreadsheet can total a score). Move the gut column so it is filled **before** scoring, so the total cannot anchor it. |
| assumption-audit | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It surfaces hidden premises with confidence and a falsifier. The falsifier column is already consider-the-opposite, which is folded here (§1b). |
| five-whys | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Its move, descending from symptom to cause, is distinct. Expected grade D; the known backfire is a single linear chain with an arbitrary stopping point, a common critique in safety practice. |
| pre-mortem | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Prospective hindsight generates failure reasons. Transfer from group studies to a solo page is at best adjacent. |
| constraint-removal | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | The page is a two-phase move: design without the constraint, then bring it back. The die face is a one-roll prompt. Face ≠ page, so keep both. |
| forced-connections | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It is random entry using several words, worked one after another on one page. The die rolls heuristic operators throughout the sitting, which is a different use, so keep both. |
| ten-bad-ideas | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It defers judgement by demanding badness first, which is distinct from random or constraint stimuli. Expected grade C/D. |
| perspective-swap | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It absorbs meeple as a `tent` variant. Add the known backfire: imagining a view is not the same as learning it, so the read-back should steer towards asking the real person. |
| commit | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It closes a decision into a cued action; adopt if-then as the default layout. The "Who I will tell" line becomes optional until it is graded (see Gate decision 4). |
| question-queue | keep | n.a. | n.a. | ✓ | ✓ | ✓ | ✓ | It is structural: blue questions batched for the AI, answered first. Backfire: it can outsource a question the person should work out on the page. |
| return-checklist | keep | n.a. | n.a. | ✓ | ✓ | ✓ | ✓ | It is structural: it makes the photo return complete and deliberate. Its claim is capture completeness, expected grade D. |
| sheet | internal | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | It carries the agent's content, not a move, so it fails points 1 and 3 as a listed component. Set `listed: false`; it stays renderable as the base for `proof`. |
| player-aid | keep | n.a. | n.a. | ✗ | ✓ | ✓ | ✓ | It is structural: a portable key that persists across Series and Ritual returns. The key the person colours in is how the agent learns the pen mapping, so it **is** read back. It fails point 3 as written (see Gate decision 6). |
| tokens | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It spends a finite resource with physical pieces, which nothing else does, and the paper does real work. Evidence is likely analogical, so the grade is likely D. |
| tracker | merge→scoresheet | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | It is the same move as scoresheet (self-monitoring a felt quantity) and differs only in when you mark it. It becomes scoresheet's `running` variant, and `tracker` is kept as an `E_RENAMED` alias. |
| dashboard | demote→preset of playmat | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | **Overturned.** The spec tested it only against scoresheet, but playmat with labelled zones already renders it: `hudbox` and `zone` are both labelled boxes. It becomes a preset of playmat, `data.zones` = its fields, adding its own working-memory claim. |
| playmat | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It turns categories into places for pieces, and the paper does real work. It is the base for seven presets, so its schema needs a `layout` so the canvas presets can validate (§5). |
| stimulus-die | keep | ✓ | ✓ | ✓ | ✓ | n.a. | ✓ | It injects random operators throughout a sitting; cutting, folding and rolling earn the paper. Nothing on the die itself is read back, because the responses land on pages. |
| timer | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It bounds phases, with a known and specific backfire (time pressure during divergent work). Timeboxing is expected to grade D, so present it as a design choice. |
| scoresheet | keep | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It rates the same thing before and after, and absorbs tracker (variants `before-after` as the default, and `running`). The overjustification and Goodhart caveats carry over: it is for sight, not score. |
| meeple | merge→perspective-swap | ✗ | ✓ | ✗ | ✓ | ✗ | ✓ | It is the same move as perspective-swap. On its own the figures carry only labels, and the output is speech that leaves no ink (it fails points 3 and 5). As the `tent` variant [scissors] of perspective-swap, the columns give that speech a place to land. |

### 1b. Candidate new components

Spec candidates first, then the ones this audit proposes (marked ⁺).

| id | decision | 1 | 2 | 3 | 4 | 5 | 6 | reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| free-recall | admit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | You retrieve studied material with the book closed, then check it against the source in a second colour. Its read-back (correctness against a source) cannot be a brain-dump preset, because presets cannot change a read-back. |
| mental-contrast | admit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Its move is mental contrasting (wish and outcome set against an inner obstacle), which neither pre-mortem (failure of a plan) nor commit (a decided action) does. Its Plan box reuses commit's if-then block as a shared helper, so it does not duplicate commit. |
| self-explain | admit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | You justify each step of given material ("why does this follow?"); feynman works on the whole of your own concept. Variant `faded` adds worked-example completion. |
| worked-example | fold→self-explain | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | Printed on its own, a worked example tells more than it asks. As self-explain's `faded` variant, the blanks make it ask; the expertise-reversal backfire limits it to novices. |
| check-in | admit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | It is the recurring Ritual page: fixed rows, a short free-write, and "since last time". The paper earns its place because past pages pile up and can be flipped back through. **Amended:** progress monitoring is the load-bearing claim and expressive writing is supporting, because the canonical protocol (longer, emotional topics, consecutive days) is far from a weekly 10-minute page. |
| interleaved-practice | reject | ✗ | n.a. | ✓ | ✓ | ✓ | ✓ | It is an arrangement of items across a round, not a move on a page; any free-recall or problem page with mixed items does it. It becomes a conditional **Series rule**: mix problem types within a round only when the categories are confusable. |
| forecast | admit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Predict an event with a probability and a resolve-by date, then score it at the next return. That makes it distinct from scoresheet (no ground truth) and assumption-audit (no resolution or score). The written prior is the paper's job, because it blocks hindsight edits. Admit **only in styles with a return** (Ritual, Series). |
| if-then | fold→commit | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | A separate if-then page would duplicate commit's closing move. It becomes commit's default layout and mental-contrast's Plan block. |
| consider-the-opposite⁺ | fold→assumption-audit | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | It already exists as the "what would prove it false" column. It is recorded here so its debiasing claim gets sourced as a supporting claim for assumption-audit. |
| self-distancing⁺ | fold→perspective-swap | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | "Me in a year" or "me, seen from outside" is simply a role in perspective-swap (meeple already defaults to one). It adds a supporting claim, not a page. |
| pretest⁺ | fold→free-recall | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | Answering prequestions before study is free-recall's `cued` variant used before the first study session. The Series rule sets the timing; no new page. |
| elaborative-interrogation⁺ | fold→self-explain | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | "Why is this true?" for facts is a prompt variant of self-explain. It is too close in form and mechanism to be a separate move. |
| reference-class⁺ | fold→forecast | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | The base-rate step ("how often does this kind of thing happen?") becomes forecast's first line, before the probability. It is part of the forecasting move, not a move of its own. |
| best-possible-self⁺ | reject | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | It overlaps mental-contrast's Wish/Outcome step. Its pure positive visualisation is the condition that the mental-contrasting research reports as lowering effort. |

### 1c. Starter presets

| id | decision | 1 | 2 | 3 | 4 | 5 | 6 | reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| eisenhower | keep | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | It is already shipped by Foundation: matrix-2x2, attributed as "popularised by Covey, after Eisenhower". It may add the mere-urgency claim. |
| swot | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | It validates as matrix-2x2 (x: helpful→harmful, y: internal→external). Its attribution is disputed, so cite it as "traditional". |
| impact-effort | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | matrix-2x2, attributed as "traditional". No licence attaches to the method, and the layout is our own. |
| power-interest | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | matrix-2x2. **Correction:** attribute it to Mendelow (**1981**), ICIS proceedings, not 1991 (§4). |
| now-next-later | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | playmat, 3 zones. It is commonly credited to a product-roadmap practitioner; print "traditional" unless step 2 verifies an originator. |
| start-stop-continue | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | playmat, 3 zones, attributed as "traditional" retrospective practice. |
| kanban | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | playmat with to-do / doing / done zones and optional WIP-limit labels. Attribute it as "after Toyota's kanban; knowledge-work boards are traditional". |
| business-model-canvas | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | **Verified CC BY-SA 3.0 Unported**, from Strategyzer's own canvas PDF. The preset file carries a BY-SA header and is excluded from the repo licence, and the printed page carries an attribution footer. |
| lean-canvas | admit | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | **Verified CC BY-SA 3.0 Unported**, from LeanStack's own v4 canvas PDF ("adapted from The Business Model Canvas"). It takes the same obligations as the BMC. |
| empathy-map | reject | n.a. | n.a. | n.a. | n.a. | n.a. | n.a. | **Overturned.** The current primary canvas (2017) prints only "© 2017 Dave Gray, xplane.com", with no Creative Commons licence. No redistributable licence could be verified, so it is dropped under the §3.4 rule. |

---

## 2. Candidates: mechanism, family, evidence prior

A prior is a judgement about where sourcing will probably land. It is **not a grade** and is used only for priority. "Worth building" means the prior is plausibly A or B.

| id | mechanism it operationalises | family | prior | build priority |
| --- | --- | --- | --- | --- |
| free-recall | retrieval practice (testing effect); `with-confidence` adds hypercorrection/calibration | memory-retrieval | A/B, direct (written recall by adults is the tested manipulation) | worth building; first |
| mental-contrast | mental contrasting with implementation intentions | planning-self-regulation | B, adjacent to direct; effects likely small to moderate | worth building |
| self-explain (+ `faded`) | self-explanation effect; worked-example / completion effect with expertise reversal | memory-retrieval | A/B, adjacent (much of the literature uses structured domains such as maths and science) | worth building |
| check-in | progress monitoring (load-bearing); expressive writing (supporting, small) | perspective-emotion (its progress-monitoring claim is shared with planning-self-regulation) | B for monitoring, adjacent; expressive writing small and analogical in this form | worth building (Ritual needs it) |
| forecast (+ reference-class) | calibration through scored forecasts; base rates / outside view | decision-diagnosis | B/C: calibration training is adjacent; scoring a handful of personal forecasts gives noisy feedback | build after the above; thin at the page level |
| interleaved-practice (Series rule) | interleaving / discriminative contrast | memory-retrieval (Series) | B, strongly domain-dependent | as a rule only |
| if-then (in commit) | implementation intentions | planning-self-regulation | A/B, direct | the claim is load-bearing for commit and Sitting |
| consider-the-opposite (in assumption-audit) | a debiasing strategy (considering why you might be wrong) | decision-diagnosis | B, adjacent | supporting claim |
| self-distancing (in perspective-swap) | self-distancing / a third-person view of the self | perspective-emotion | B/C, adjacent | supporting claim |
| pretest (free-recall `cued`, before study) | pretesting / prequestion effect | memory-retrieval | B, adjacent | supporting claim (Series) |
| elaborative-interrogation (in self-explain) | elaborative interrogation | memory-retrieval | B, adjacent | supporting claim |
| best-possible-self | positive future writing | — | B for mood, but rejected on point 1 | — |

---

## 3. Rationale per item

Each line applies the six points; §1 carries the marks.

### Existing pages

- **cover**: Structural (points 1–2 n.a.). **3 ✗**: it is mostly reading, apart from the pen boxes the person colours. **4 ✓**: its how-to claims can be wrong (the "phone in another room" evidence is contested; "stop mid-sentence" rests on a Zeigarnik-type claim whose recall advantage has not replicated), so those lines must follow their grades. **5 ✓**: the coloured key is read back. **6 ✓**: orientation and the how-to claims (attention-load). Keep.
- **brain-dump**: **1 ✓**: offloading current thoughts is a different move from retrieving learned material. The read-backs are opposites (themes vs correctness), which the free-recall hypothesis relies on, and that holds. **2 ✓** baseline. **3 ✓**: it is all lines. **4 ✓**: rumination, and dumping without sorting just moves the fog onto paper. **5 ✓**. **6 ✓**: offload / writing out unfinished goals (externalisation-embodiment). Keep.
- **feynman**: **1 ✓** vs self-explain (see that entry). **2 ✓** baseline. **3 ✓**. **4 ✓**: a fluent but wrong explanation feels like understanding, and the page gives no correctness feedback unless the agent checks it. **5 ✓**. **6 ✓**: illusion of explanatory depth plus generation (memory-retrieval). Keep.
- **node-map**: **1 ✓**: relations with named verbs. **2 ✓**: drawing and spatial layout do real work. **3 ✓**. **4 ✓**: a premature structure, and vague edges ("relates to"). **5 ✓** with the caveat that dense maps fail to decode, so cap nodes in `helps`. **6 ✓**: concept mapping, adjacent when used for problems rather than study. Keep.
- **card-sort**: **1 ✓**: the sort exposes the person's own taxonomy. It is distinct from playmat, which holds a persistent flow, but should share the `zones` helper. **2 ✓** real: cutting and moving pieces is epistemic action. **3 ✓**. **4 ✓**: false tidiness. **5 ✓**: photograph the whole arrangement. **6 ✓** (externalisation-embodiment). Keep.
- **timeline**: **1 ✓**: order, which node-map does not force. **2 ✓** baseline. **3 ✓**. **4 ✓**: false linearity, and putting things in sequence does not correct duration optimism. **5 ✓**. **6 ✓**: candidate mechanism is task unpacking (planning-self-regulation); expected C/D. Keep.
- **matrix-2x2**: **1 ✓**: placing items against two axes. **2 ✓**: spatial placement. **3 ✓**. **4 ✓**: false dichotomies, and an axis that does not discriminate. **5 ✓**. **6 ✓** (decision-diagnosis). Keep; it is the base for eisenhower, swot, impact-effort and power-interest.
- **options-criteria**: **1 ✓**. **2 ✓, weakly**: a spreadsheet totals better, and the page's only paper advantage is that the gut and total are written by hand, side by side. **3 ✓**. **4 ✓**: criteria chosen after the fact to justify a favourite, and the false rigour of a weighted sum. **5 ✓**. **6 ✓**. Keep, but change the layout so the gut score is written **before** criteria scoring and the total cannot anchor it (that ordering is what makes the mismatch informative).
- **assumption-audit**: **1 ✓**. **2 ✓** baseline. **3 ✓**. **4 ✓**: a long list gives false reassurance, and confidence dots can be miscalibrated. **5 ✓**. **6 ✓**: consider-the-opposite and confidence (decision-diagnosis). Keep.
- **five-whys**: **1 ✓**: a vertical causal descent. **2 ✓** baseline. **3 ✓**. **4 ✓**: a single chain, arbitrary stopping, blaming a person. **5 ✓**. **6 ✓**: likely practice-only, so D. Keep, labelled.
- **pre-mortem**: **1 ✓**: prospective failure narrative (mental-contrast's obstacle is internal and wish-anchored, so it does not overlap). **2 ✓** baseline. **3 ✓**. **4 ✓**: anxiety, or confidence that rises while the plan stays the same. **5 ✓**. **6 ✓**: prospective hindsight, adjacent. Keep.
- **constraint-removal**: **1 ✓**: two phases (remove the constraint, then restore it) is a structure a single die face cannot hold. **2 ✓** baseline. **3 ✓**. **4 ✓**: ideas with the constraint removed can be unrecoverable fantasy. **5 ✓**. **6 ✓**: fixation and constraint relaxation (creativity-fixation). Keep.
- **forced-connections**: **1 ✓** vs stimulus-die: several associations worked through on one page, where the die supplies operators rolled across the sitting. **2 ✓** baseline. **3 ✓**. **4 ✓**: noise during convergence. **5 ✓**. **6 ✓**: random entry / bisociation (creativity-fixation). Keep.
- **ten-bad-ideas**: **1 ✓**: deferring judgement by demanding badness. **2 ✓** baseline. **3 ✓**. **4 ✓**: it can stay deliberately trivial and produce nothing usable. **5 ✓**. **6 ✓**: expected C/D. Keep.
- **perspective-swap**: **1 ✓**. **2 ✓** baseline, and real with the `tent` variant. **3 ✓**. **4 ✓**, **sharpened**: imagining another person's view does not reliably make you more accurate about it, and projection can pass for insight. The read-back should end with "what would you ask them?" (perspective getting). **5 ✓**. **6 ✓** (perspective-emotion; the embodiment claim is supporting, in externalisation-embodiment). Keep; absorbs meeple and self-distancing.
- **commit**: **1 ✓**: decision → cued action. **2 ✓** baseline. **3 ✓**. **4 ✓**: hold/drop are legitimate outcomes, so do not force a commit. **Amended:** "Who I will tell" may backfire for identity-relevant goals (the symbolic self-completion account: announcing an intention can substitute for acting on it), so it is optional and off by default until graded. **5 ✓**. **6 ✓**: implementation intentions (planning-self-regulation). Keep. The default layout is commit / hold / drop, then 1–2 lines of "When ___, I will ___". The first line is pre-framed as "When I put this pen down, I will ___", which keeps the existing 5-minute action inside the if-then format.
- **question-queue**: Structural. **3 ✓**. **4 ✓**: it can outsource thinking the page should have done; batching can also defer a question that blocks the work. **5 ✓**. **6 ✓**: capture/offload (memory-retrieval, per §4). Keep.
- **return-checklist**: Structural. **3 ✓**: the person ticks the list. **4 ✓**: ticking without checking. **5 ✓**. **6 ✓**: likely D. Keep.
- **sheet**: **1 ✗**: not a move. **3 ✗**: the content is the agent's. **2, 4, 5, 6 ✓**: paper reading, automation complacency during review, and the mark read-back are all real. They belong to the Proof style, not to a listed component. Internal (`listed: false`, amendment 3).

### Existing pieces

- **player-aid**: Structural. **3 ✗**: it is a reference card. **5 ✓**: the key the person colours in is how `from-paper` learns the pen→role mapping. **4 ✓**: a checklist that replaces judgement. **6 ✓**: offload (attention-load). Keep. When both it and the cover are printed, the cover's "keep this page beside you" line should point to the aid instead of duplicating it (a renderer note).
- **tokens**: **1 ✓**: nothing else gives a finite quantity a body. **2 ✓** real. **3 ✓**: blank tokens, labelled by the person. **4 ✓**: too many quantities, and taking the metaphor literally. **5 ✓**: photograph the board. **6 ✓**: likely analogical, so D (decision-diagnosis). Keep.
- **tracker**: **1 ✗** against scoresheet: the same self-monitoring move, sampled continuously rather than twice. Points 2–6 pass but are inherited. Merge→scoresheet (`running`), keeping `tracker` as an `E_RENAMED` alias. The spec's hypothesis is **confirmed**.
- **dashboard**: **1 ✗, overturned.** The spec separated it from scoresheet (confirmed: state is not self-rating) but never compared it with playmat. The renders are the same: a set of labelled boxes (`arch_dashboard` vs `arch_playmat`). A preset of playmat whose zones are the dashboard's fields performs it, and the umbrella test's own wording, "even with a preset", excludes it. Points 2–6 pass. Demote→preset of playmat. Its working-memory / situation-awareness claim becomes the preset's added claim, with the family unchanged (attention-load). If presets and components share one id namespace, `dashboard` keeps resolving and no alias is needed.
- **playmat**: **1 ✓**: persistent zones for pieces in a flow. **2 ✓** real. **3 ✓**. **4 ✓**: a premature taxonomy. **5 ✓**. **6 ✓**: spatial externalisation, likely analogical. Keep. It becomes the base for seven presets (dashboard, now-next-later, start-stop-continue, kanban, BMC, lean-canvas, and potentially more), so its schema needs `layout` (§5).
- **stimulus-die**: **1 ✓** (see forced-connections and constraint-removal). **2 ✓** real: cut, fold, roll. **3 ✓**: the faces are prompts, not answers. **4 ✓**: noise during convergence. **5 n.a.**: the responses are read on the pages. **6 ✓** (creativity-fixation). Keep.
- **timer**: **1 ✓**. **2 ✓**: a physical dial and marker. **3 ✓**: the person sets the phases and moves the marker. **4 ✓**: time pressure during divergent work (the style rule for Incubation already bans it from the diverge half). **5 ✓** if the marker position is inked. **6 ✓**: expected D (planning-self-regulation). Keep, labelled as a design choice.
- **scoresheet**: **1 ✓**. **2 ✓** baseline, and real in the `running` variant with a token. **3 ✓**. **4 ✓**: overjustification, Goodhart, false precision. **5 ✓**. **6 ✓**: self-monitoring (planning-self-regulation). Keep; absorbs tracker. The name invites a "score" reading that GROUNDING.md warns against; a rename is optional and not a Gate item.
- **meeple**: **1 ✗** (the same move as perspective-swap). **3 ✗** (only a label on each figure). **5 ✗** (speech is not ink). Merge→perspective-swap `tent` [scissors], where the tents stand beside columns that capture what each figure "said". The embodiment claim becomes supporting. **Confirmed**, with a stronger reason than the spec gave.

### Candidates

- **free-recall**: **1 ✓**: it could not be a brain-dump preset. A preset carries data, not a read-back, and free-recall's read-back (check against the source; next round targets the gaps) is the opposite of brain-dump's. **2 ✓**: closed-book writing by hand, then a second-colour check pass. **3 ✓**. **4 ✓**: recalling errors without feedback can entrench them, so the check pass is mandatory, and very low recall success gives little benefit. **5 ✓**. **6 ✓**. Admit, with variants `default` (uncued), `with-confidence` (confidence dots), and `cued` (numbered prompts drawn from last round's gaps, and used before study as a pretest).
- **woop**: **1 ✓** (see §1b). **2 ✓** baseline. **3 ✓**: four boxes to fill. **4 ✓**: for a wish with low expectations, contrasting leads towards disengagement (by design, but it must be stated), and a wish without the obstacle step lowers effort. **5 ✓**. **6 ✓**. Admit. The Plan box reuses commit's if-then block. **Name check:** no ™ or ® was found on woopmylife.org's home page, but its site notice was not read, so the name's use is unverified and needs a check before shipping. The fallback id is `mental-contrast`.
  Renamed to `mental-contrast` (user decision, 2026-09-26).
- **self-explain**: **1 ✓** vs feynman: given material, explained step by step, and justified rather than simplified. **2 ✓** baseline. **3 ✓**: the explanation lines dominate the page, and the printed steps are short. **4 ✓**: novices producing wrong explanations without feedback, and time cost on material that is already well explained. **5 ✓**. **6 ✓**. Admit, with variant `faded` for worked-example completion and a `why` prompt for elaborative interrogation.
- **worked-example**: **3 ✗** on its own, so it folds as the `faded` variant. The expertise-reversal backfire goes into `backfires` and limits it to novices. The spec's hypothesis is confirmed.
- **check-in**: **1 ✓**: a scoresheet preset cannot add the free-write or "since last time". **2 ✓** real: identical pages pile up and are compared by flipping back. **3 ✓**. **4 ✓**: rumination, reactivity to monitoring, and a ritual that becomes a chore and is abandoned. **5 ✓**: the same layout each time makes comparison mechanical. **6 ✓**. Admit, with the load-bearing claim re-pointed to progress monitoring (§1b).
- **interleaved-practice**: **1 ✗**: interleaving is how items are ordered, not a thinking move a page performs. Reject as a component. As a Series rule, it mixes types only when the material has confusable categories, because interleaving is expected to help less or hurt on unrelated or verbal material. The spec's hypothesis is confirmed.
- **forecast**: **1 ✓**: it resolves against reality and is scored, which no existing page does. **2 ✓**: a written, dated prior cannot be quietly revised (hindsight bias), and paper is the tamper-evident record. **3 ✓**. **4 ✓**: overprecision, forecasting the unknowable, and noisy lessons from a few scored forecasts. **5 ✓**: numbers and dates are easy to decode. **6 ✓**. **Admit, restricted** to styles with a return (Ritual, Series, or a Sitting that schedules a return). In a one-off Sitting it collapses into assumption-audit with numbers. It includes the reference-class line.
- **if-then, consider-the-opposite, self-distancing, pretest, elaborative-interrogation, reference-class**: each **fails 1** because its move already lives in an existing or admitted page (commit, assumption-audit, perspective-swap, free-recall, self-explain, forecast). Each folds in as a layout default, role, variant or line, and brings its claim in as a supporting claim; only if-then's claim is load-bearing (for commit).
- **best-possible-self**: **1 ✗** vs mental-contrast's Wish/Outcome. On top of that, pure positive visualisation is the backfire condition of the research that justifies mental-contrast. Reject.

---

## 4. Presets: licence and attribution

The rule (§3.4): a preset whose licence cannot be verified from a primary source is dropped. For an unrestricted method, "licence" means that no licence attaches to the idea and our layout is original; the check is then about the attribution string.

| preset | base | licence (as verified) | primary source checked | attribution to print | status |
| --- | --- | --- | --- | --- | --- |
| eisenhower | matrix-2x2 | method; none attaches | n/a (method) | "Popularised by Stephen Covey (1989), after Eisenhower" (already shipped) | ship |
| swot | matrix-2x2 | method; none attaches | n/a | "Traditional" (origin disputed) | ship |
| impact-effort | matrix-2x2 | method; none attaches | n/a | "Traditional" | ship |
| power-interest | matrix-2x2 | method; none attaches | AIS eLibrary record: A. L. Mendelow, "Environmental Scanning — The Impact of the Stakeholder Concept", ICIS 1981 proceedings (aisel.aisnet.org/icis1981/20) | "After Mendelow (1981)". **The spec's "1991" appears to be a common miscitation**; step 2 confirms the exact citation. | ship |
| now-next-later | playmat | method; none attaches | n/a | "Traditional" unless step 2 verifies an originator | ship |
| start-stop-continue | playmat | method; none attaches | n/a | "Traditional" | ship |
| kanban | playmat | method; the term is generic | n/a | "After Toyota's kanban; boards for knowledge work are traditional" | ship |
| business-model-canvas | playmat (9 zones, `layout`) | **CC BY-SA 3.0 Unported**, verified | Strategyzer's canvas PDF (assets.strategyzer.com/assets/resources/the-business-model-canvas.pdf): "This work is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported License." Strategyzer's usage page requires "full identification and credit of the source of the tool … Strategyzer.com". | "The Business Model Canvas by Strategyzer AG (strategyzer.com), CC BY-SA 3.0. Adapted." | ship, with obligations ↓ |
| lean-canvas | playmat (9 zones, `layout`) | **CC BY-SA 3.0 Unported**, verified | LeanStack's v4 canvas PDFs (leanstack.s3.amazonaws.com/templates/lean-canvas-v4.pdf): "Lean Canvas is adapted from The Business Model Canvas (BusinessModelGeneration.com) and is licensed under the Creative Commons Attribution-Share Alike 3.0 Un-ported License." | "Lean Canvas by Ash Maurya (LeanStack), adapted from the Business Model Canvas; CC BY-SA 3.0. Adapted." Use the v4 box labels, the version whose licence line we checked. | ship, with obligations ↓ |
| empathy-map | playmat | **not verified; no redistributable licence found** | The current canvas (gamestorming.com, "Last updated on 16 July 2017") prints only "© 2017 Dave Gray, xplane.com". XPLANE's article and the gamestorming page state no licence. Secondary sources describe the 2009 version as CC BY-NC-ND, which would forbid adaptation anyway (not verified from a primary source). | — | **drop**; reconsider only with written permission from XPLANE/Dave Gray |

**Obligations for the two CC BY-SA canvases:**

1. The preset JSON file carries its own CC BY-SA 3.0 header and is excluded from the repo licence (as the spec intends).
2. The **printed page** carries an attribution-and-licence footer, because the render is itself an adaptation. The renderer needs a per-preset `attribution` footer slot (a Foundation follow-up).
3. Share-alike applies to the adapted canvas layout. It does not spread to the Longhand code or to the person's filled-in content.
4. The attribution names the source without implying endorsement by Strategyzer or LeanStack.

Note that the licence verified here is for the BMC only. Strategyzer's usage page reserves rights on the **Value Proposition Canvas** (adaptations and use in software need permission), so it must not be added later on the strength of the BMC's licence.

---

## 5. Consequences for follow-up tasks (after Gate 1)

- **playmat schema:** add an optional `layout` (grid areas with spans). Without it, the BMC and Lean Canvas presets cannot validate against the base (§5.4 requires preset `data` to validate against the base schema). Recommend A3, or write-in rather than sticky notes, for the 9-zone canvases, because A4 zones are about one sticky note in size.
- **Aliases:** `tracker` → `scoresheet` (`running`) and `meeple` → `perspective-swap` (`tent`) as `E_RENAMED`. `dashboard` becomes a preset id; confirm presets and components share one id namespace so existing specs keep resolving.
- **Shared helpers:** `zones` (card-sort and playmat); `if-then` block (commit and mental-contrast).
- **Layout changes:** commit (if-then default, "who I will tell" optional); options-criteria (gut column first); perspective-swap (`tent` variant, "what would you ask them?" closing line); free-recall variants; self-explain `faded` and `why`; forecast reference-class line.
- **`listed: false`:** sheet (amendment 3).
- **Style rules (sub-project 3):** Series interleaving is conditional on confusable categories; forecast is allowed only in styles with a return.
- **Family index (§4) updates:** add consider-the-opposite and reference-class (decision-diagnosis), self-distancing (perspective-emotion), and pretest and elaborative-interrogation (memory-retrieval) as supporting claims; move dashboard's claim to its preset entry. memory-retrieval gains the most (two admitted pages, two supporting claims, and the Series rule), so it is the family likeliest to exceed the 12-claim sourcing cap and need a split.

---

## 6. Decisions for Gate 1

Sourcing for the 24 `keep` components can start now. These are the calls that block the rest:

1. **Demote `dashboard` to a preset of `playmat`?** This overturns the spec. *Recommend: yes.* Its render is playmat's (labelled boxes), so it fails "distinct move, even with a preset". It keeps its name and its working-memory claim as a preset, and it cuts one component from grading.
2. **Admit `forecast`, restricted to styles with a return?** *Recommend: yes.* Its scored resolution makes it distinct from scoresheet and assumption-audit, and a dated written prior is a real paper benefit. Without a return, it is only assumption-audit with numbers.
3. **Drop `empathy-map`?** *Recommend: drop.* The current primary canvas is "© 2017 Dave Gray" with no licence, and the older version is reported as no-derivatives. Reconsider only with written permission. The BMC and Lean Canvas are both verified as CC BY-SA 3.0 and should ship with a printed attribution footer and a `layout` schema on playmat.
4. **Commit: adopt if-then as the default, and make "Who I will tell" optional (off by default) until graded?** *Recommend: yes to both.* If-then is commit's strongest claim; public announcement has a known backfire for identity goals that step 2 should source.
5. **Check-in: make progress monitoring the load-bearing claim, with expressive writing supporting?** *Recommend: yes.* The expressive-writing protocol is far from a weekly 10-minute page, and leaving it load-bearing would cap Ritual's displayed grade on a claim of mostly analogical transfer.
6. **Extend the structural exemption to test point 3 for `cover` and `player-aid`?** *Recommend: yes.* Both are reference by design and fail "asks, not tells" as written. Exempting them explicitly is more honest than marking a silent pass.

Confirmed without a Gate decision: tracker→scoresheet, meeple→perspective-swap, sheet internal, admitting free-recall, mental-contrast and self-explain (+ `faded`), worked-example folded, interleaving as a Series rule, the five audit folds, best-possible-self rejected, and power-interest attributed to Mendelow (1981).

### Counts

| decision | components | presets |
| --- | --- | --- |
| keep | 24 | 1 (eisenhower) |
| merge | 2 (tracker, meeple) | — |
| fold | 7 (worked-example, if-then, consider-the-opposite, self-distancing, pretest, elaborative-interrogation, reference-class) | — |
| demote→preset | 1 (dashboard) | — |
| internal | 1 (sheet) | — |
| admit | 5 (free-recall, mental-contrast, self-explain, check-in, forecast) | 8 |
| reject | 2 (interleaved-practice, best-possible-self) | 1 (empathy-map) |

## 7. Gate 1 outcomes (user, 2026-09-25)

1. **Dashboard → preset:** approved, with a rename. The base component `playmat` becomes the neutral structural `zones` (labelled areas on a page). `playmat` (Inbox/Doing/Done/Parked), `dashboard` (HUD fields), and the planned kanban, now-next-later, start-stop-continue, BMC and Lean Canvas are all presets of `zones`. Grounding: dashboard's working-memory claim and playmat's spatial-externalisation claim each attach to their preset; `zones` carries the shared structural claim.
2. **Admit `forecast`, restricted to styles with a return:** approved.
3. **Drop `empathy-map`:** approved (dropped).
4. **Commit: if-then as default; "Who I will tell" optional and off by default until graded:** approved (both).
5. **Check-in: progress monitoring load-bearing, expressive writing supporting:** approved.
6. **Exempt `cover` and `player-aid` from test point 3:** approved.

---

## 8. Gate 1b draft: candidates from library mining

**Status:** draft for Gate 1b · **Date:** 2026-09-25 · **Inputs:** [mining/BestSelf.md](mining/BestSelf.md), [mining/CFAR.md](mining/CFAR.md), the catalogue on main (`scoresheet`, `tokens` schemas), and claims.md.

These are the lead's recommendations on the miners' candidates. Priors are still priors. Two corrections to the mining files:
- CFAR.md §5 says the umbrella design's §5.5 already lists Goal Factoring as a known gap. It does not; that list is free-recall, if-then, WOOP, self-explain and the Ritual page.
- BestSelf.md proposes wheel-of-life and countdown as **presets**. Both change the read-back (across returns, not within a sitting; remaining count, not allocation), and a preset cannot change a read-back (§3). They are **variants** below.

Planning fallacy is already claim 4.4 (`task-unpacking`), so the duration variant needs no new claim.

### 8a. New components

| # | id (working) | source | recommendation | prior | why |
| --- | --- | --- | --- | --- | --- |
| 1 | `small-experiment` | CFAR, Comfort Zone Expansion | **admit**, restricted to styles with a return | B/C, adjacent | Design a small, safe real-world probe of a felt aversion, write "I accept either outcome" first, then digest it at the return. Nothing in Longhand scaffolds an off-page behavioural probe. The digest happens after the action, so it needs a return (like forecast). Print a line saying it is not a treatment for anxiety. Claims: behavioural experiments, inhibitory-learning exposure, self-efficacy. |
| 2 | `goal-factoring` (+ `aversion` variant) | CFAR, Goal Factoring and Aversion Factoring | **admit** | C/D, analogical | It starts from one entrenched behaviour and works outward to the goals it serves, then looks for other means. No page does this: options-criteria scores given options. The `aversion` variant factors an avoided activity into parts, each with a verdict before any fix, and routes internal fixes to `small-experiment`. Claims: goal systems (multifinality), functional behavioural assessment. |
| 3 | `frame-by-frame` | CFAR, Frame-by-Frame Debugging | **admit**, and keep `five-whys` | C/D, analogical | One concrete recent instance, the exact divergence frame, then a forgetting-or-motivation triage that routes to the next page. It patches two known five-whys backfires (an arbitrary stop, blaming a person). Five-whys stays for causes in systems; frame-by-frame is for your own recurring behaviour. Claim: DBT chain analysis; forgetting-type fixes inherit implementation intentions. |
| 4 | `worst-case` | CFAR, Mundanification | **admit the base; defer** the Negative Visualization variant | B/C, adjacent | Write a dreaded outcome out concretely (next day, week, month), with a felt-magnitude rating before and after. Pre-mortem explains why a plan failed; this defuses a dread that belongs to no plan. Claims: decatastrophising, the impact bias in affective forecasting. Negative Visualization is a habitual practice with thinner evidence, and it overlaps check-in. |
| 5 | `practice-audit` | CFAR, Turbocharging | **admit**, Series only, late in the build | B/C, adjacent | Compare the practice method's trigger and action with the real skill's, then revise or keep it. It is the only page that checks whether a study method trains the intended skill, and it belongs to Series, the learning style. Claims: transfer-appropriate processing, identical elements, conditions for far transfer. |
| 6 | Bucket Errors | CFAR | **defer** to the backlog | C/D (method) | It passes point 1, but narrowly against assumption-audit. Only the underlying attribute-substitution effect is well evidenced, not the splitting technique. Revisit after v0.1. |
| 7 | Internal Double Crux | CFAR | **fold** into `perspective-swap` as a `two-sides` variant | D, analogical | Two columns, both parts of you, with a crux line and the if-then close from commit. perspective-swap already has columns per perspective and absorbed self-distancing. Supporting claim: intrapersonal goal conflict (Emmons & King 1988). Do not cite Internal Family Systems; the CFAR glossary itself calls it controversial. |

### 8b. Variants and options on existing pages

| # | change | source | recommendation | prior | why |
| --- | --- | --- | --- | --- | --- |
| 8 | forecast `duration` variant, with a carve-out from the Gate 1 restriction | BestSelf, 30-minute estimate circles | **admit**; allow this variant alone in a one-off Sitting | B, direct | Estimate each task's duration before starting, then resolve it the same day. This is the planning-fallacy paradigm itself, so transfer is direct. Many fast-resolving forecasts answer the base page's weakness (noisy feedback from a few forecasts). Claims already exist: 4.4, 3.12. |
| 9 | pre-mortem `iterate` variant | CFAR, Murphyjitsu | **admit** | inherits 3.3/3.4; the loop is D | A surprise gate ("how shocked would I be?") decides whether to run another round of reasons and fixes. No new claim. The CFAR claim that "each cycle roughly halves the odds" is uncited and must never be printed. |
| 10 | commit `policy` variant | CFAR, Policy-level Decisionmaking | **admit** | B/C, adjacent | Decide the rule, with named exceptions, before deciding the instance. One supporting claim: broad choice bracketing and rules (Read, Loewenstein & Rabin 1999). |
| 11 | scoresheet `domains` variant (wheel of life) | BestSelf, Benchmark page | **admit**, Ritual only, low priority | B for the measure, adjacent | Rows are life domains, each with a note line, re-rated across returns (quarterly). The schema already has up to 6 `rows` and a 3–7 `scale`, so it needs only a note line and the across-returns read-back. The claim (Personal Wellbeing Index, domain satisfaction) grounds the measure's validity, not a benefit, and the grading must say so. Backfire: an average can hide the one domain that matters. |
| 12 | tokens `countdown` variant | BestSelf, weeks-remaining dots | **admit**, Series and Ritual only | B, adjacent | One token per remaining session, removed as the arc proceeds. Claim: goal gradient (Kivetz, Urminsky & Zheng 2006). The same research predicts an early dip, so it must be paired with nearer milestones. |
| 13 | check-in options | BestSelf | **admit a gratitude row**, optional and off by default, with a supporting claim; **add wins and lessons** as `helps` prompts only (D, unsourced); **add a three-state mark** (missed / partial / done) to scoresheet `running` as an option (D, unsourced) | gratitude C likely | Gratitude meta-analyses report small effects that often vanish against active controls; weekly beats daily, which suits the Ritual default. Wins and lessons, and the three-state mark, are copy and design, not claims. Spend no sourcing on them. |

### 8c. Style, skill and docs changes (no new pages)

| # | change | recommendation | cost |
| --- | --- | --- | --- |
| 14 | **Saving State** (CFAR): one closing line in Sitting and Ritual ("in a phrase, what is true now that was not before?") that feeds `carry.md` | **adopt** (sub-project 3) | none; rides on the existing resumption-cues claim |
| 15 | Guidance, all for sub-project 3: Socratic Ducking as the question phrasing for `from-paper`; one shared "accept either outcome" framing line for small-experiment, goal-factoring and two-sides; five-second versions ("this page is training wheels") in the cover or docs; the CFAR Strategic Level as an optional closing row on five-whys; task-switching cost as a supporting claim for one move per page in Sitting | **adopt all** | only the task-switching claim needs sourcing |
| 16 | A docs note saying Longhand is deliberately not a day-management system, against the BestSelf "leave zero white space" philosophy | **adopt** (sub-project 4) | none |

### 8d. Rejected or deferred, for confirmation

- **Deferred:** the milestone roadmap (a skin on timeline, with no new move or evidence, and a 13-week goal page pulls towards day management); Negative Visualization; Bucket Errors; Hamming Questions; Resolve Cycles (an optional stuck-task pacing rule, perhaps later).
- **Rejected:** Start/Stop/Continue/Improve, the Daily Rituals Card, the accountability line, the "why" field, eat the frog, zero-based scheduling, the rule of 3, the bucket list; Overlearning (the lead to verify is that overlearning gains decay quickly, per Rohrer et al. 2005); Try Things; Units of Exchange; Taste & Shaping; Againstness; two-person Double Crux; the flash classes.
- **Coaching only, no page:** Systemization; TAPs for noticing.

### 8e. Cost if all are approved

- **+5 components** (small-experiment, goal-factoring, frame-by-frame, worst-case, practice-audit), on top of the Gate 1 admissions still to be built.
- **+8 variants or options:** aversion, duration, iterate, policy, domains, countdown, two-sides, and the check-in gratitude row.
- **About 12 new claims to source:** graduated self-experiment, goal decomposition, chain analysis, decatastrophising, practice specificity, choice bracketing, goal gradient, domain satisfaction, gratitude, intrapersonal goal conflict, task switching, and a supporting claim on the impact bias.
- `planning-self-regulation` is at 8 claims and would gain about 4 (goal decomposition, graduated experiment, choice bracketing, goal gradient). Group the first two as a small behaviour-change neighbourhood so that the shared "accept either outcome" framing is graded once. It stays under the 12-claim cap.

## 9. Gate 1b outcomes (user, 2026-09-25)

**All 17 recommendations in §8 were approved as drafted.** The user added one note:

- **16, amended.** Longhand is not a day-management system in itself. But printing a customised daily planning sheet, or a mini workbook built from gathered context (calendar, tasks, carry-over), that is completed by hand and sent back to the AI **is a valid use case**. The docs note should draw the line this way: no "zero white space", no system that takes over the whole day; a one-day sheet for one sitting is fine.
  - *Consequence for sub-project 3:* treat the "day sheet" as a `to-workbook` use case, probably a Sitting whose cover is pre-filled from gathered context, not as a new style or component. It is the natural home for the forecast `duration` variant (8), `commit` (if-then) and Saving State (14).
  - *Consequence for sub-project 4:* the docs note (16) mentions the day sheet as an example of the right side of the line.

**Follow-ups this opens:**
- Add the new claims (§8e) to claims.md as a new sourcing batch (GB, "Gate 1b"), then source them. `planning-self-regulation` gains a small behaviour-change neighbourhood.
- Record the forecast carve-out: the `duration` variant alone is allowed in a one-off Sitting.
- Component ports (sub-project 1 follow-ups): 5 components, 8 variants or options.

**Gate 2 amendment (user, 2026-09-25):** `perspective-swap/two-sides` (§8a item 7) is **cut for v0.1**. Miller & Rose 2015 find that a neutral two-column decisional-balance exercise lowers commitment to change in ambivalent people, and resolving the conflict is untested (grading-report.md §3).
