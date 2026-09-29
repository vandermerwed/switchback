# Longhand research: Step 1 claim inventory

**Status:** step 1 draft · **Date:** 2026-09-25 · **Spec:** [research design](../../../docs/superpowers/specs/2026-09-23-longhand-research-design.md) §4, §5, §6.3–6.4, §8
**Inputs read:** the research design spec; `research/roster.md` (see the note below); every `components/*/component.json` and `presets/eisenhower.json` in the main checkout (read-only); `registry/protocols.json`, `registry/legend.json`, `registry/styles.json`; the cover and stimulus-die renderers (for the printed how-to lines and die faces); `patterns/GROUNDING.md` (seed only).

This step names claims. It does not source or grade them. Every paper named below is a **lead to verify**. None of them is asserted as a citation, and the file contains no DOIs. Sourcing agents verify each lead with `check-dois` (§7.2) before it goes in a note. Where the spec already expects a grade (for example "expected D"), the expectation is repeated so that sourcing effort can be planned. It is not a grade.

> **Roster file note.** At `ba04e17`, `research/roster.md` is corrupted: it is 19 MB, and the Gate 1 outcome line is repeated about 39,000 times. This inventory therefore uses the intact version at `557f9d8`, together with the Gate 1 item 1 resolution taken from the `ba04e17` commit message and the repeated line. That resolution renames `playmat` to `zones`, and makes `playmat`, `dashboard`, `now-next-later`, `start-stop-continue`, `kanban`, `business-model-canvas` and `lean-canvas` presets of `zones`. This step did not repair the roster file, because it may commit only `claims.md`.

## Conventions

- **Claim id:** `<family>/<slug>`. A claim lives in one family file and is referenced by id from items in any family (§4, "one claim, many items").
- **Load-bearing (LB):** the claim is what the item asserts. Per §6.3, the lowest LB grade becomes the item's displayed grade. **Supporting (S)** claims never move that grade. **Parameter (P)** claims justify one of the provisional style parameters in §8. They do not move the displayed grade. Instead, the grading report uses them to decide between *keep as design choice* and *revise*.
- **Transfer** follows §6.4: `direct` · `adjacent` · `analogical`. Each claim gives a reason. Where the transfer differs between items, it is given per item.
- **Sourcing brief:** *Seminal* gives the originating work. *Synthesis* gives the meta-analyses and reviews to search for. *Replication check* covers Many Labs, RRR and large pre-registered replications. *Backfire* is the question the backfire section must answer.
- **Items covered:** only items the approved roster keeps, merges into, admits, marks internal, or keeps or admits as presets. Rejected items (interleaved-practice as a component, best-possible-self, empathy-map) get no claims. Folded items (if-then, consider-the-opposite, self-distancing, pretest, elaborative-interrogation, reference-class, worked-example) and merged items (tracker, meeple) contribute claims to their host.

## Decisions for the lead (made in this inventory; flag or overturn)

1. **Handwriting vs typing is collection-level, not load-bearing on any item.** It underpins the point-2 baseline pass that every writing page shares (roster, "How to read the table"). Making it LB on each page would cap every writing page at one contested grade. `grounding.json` has no collection-level key, and `apply-grounding` fails on ids that don't exist, so it needs a home: either a `protocols.handwriting` entry or a new top-level `collection` key.
2. **Ritual: expressive writing is supporting.** This applies the Gate 1 decision 5 reasoning to Ritual as well as to check-in, although spec §8 lists expressive writing among Ritual's load-bearing claims. Ritual *is* the check-in page, so the two should not diverge.
3. **Style LB lists follow §8 literally.** Several of those claims are expected to grade D (Sitting: timeboxing; Proof: mark → action conventions) or C (Incubation: sleep and insight; Sitting: stop mid-task, phone presence). On the §6.3 rule, that fixes Sitting and Proof at a displayed D whatever else grades well. The lead may want to reclassify some of these as parameter claims before sourcing. See the per-style notes.
4. **Series: expanding vs uniform spacing is LB (per §8), but it works like a parameter.** The spec says to "pick the better-graded option". If the comparison is inconclusive, as the literature suggests it may be, an LB status caps Series on a question its mechanism doesn't depend on. The recommendation is to reclassify it as P.
5. **Assumption-audit: consider-the-opposite stays supporting (per the roster).** Its only other LB claim (assumption surfacing) is expected to be practice-only. That fixes the page at D even if consider-the-opposite, which is the falsifier column's actual mechanism, grades B. The lead should consider re-pointing it to LB, as Gate 1 did for check-in.
6. **Zones gets a perceptual-grouping claim (common region)** as "the shared structural claim" that Gate 1 assigned it. `playmat` keeps spatial externalisation, and `dashboard` keeps working-memory offload, each as its preset's added claim.
7. **Question-queue takes one claim from attention-load** (cognitive offload) alongside its memory-retrieval claim. The same offload claim also serves player-aid, dashboard and brain-dump.

---

## 1. `memory-retrieval.md`

**Items served (5):** free-recall (variants `default`, `with-confidence`, `cued`), self-explain (variants `faded` and `why`), feynman, question-queue, **Series**.

| Item | Load-bearing | Supporting | Parameter |
| --- | --- | --- | --- |
| free-recall | testing-effect · retrieval-feedback | hypercorrection (`with-confidence`) · pretesting (`cued`, before study) · decision-diagnosis/confidence-resolution (`with-confidence`) | — |
| self-explain | self-explanation | worked-example-fading (`faded`) · elaborative-interrogation (`why`) | — |
| feynman | explanatory-depth | explaining-to-learn · generate-before-told | — |
| question-queue | generate-before-told · attention-load/cognitive-offload | — | — |
| Series | testing-effect · distributed-practice · retrieval-before-review · expanding-vs-uniform (see decision 4) | pretesting | spacing-gap-ratio · successive-relearning · interleaving-confusable |

**Claim count:** 16. **Sourcing batches:** 2, since the family exceeds the 12-claim cap. **MR-A, retrieval and spacing:** claims 1.1–1.10. **MR-B, explanation:** claims 1.11–1.16.

### 1.1 `memory-retrieval/testing-effect`
- **Claim:** Retrieving studied material from memory (for example, writing down everything you can recall with the book closed) improves retention at a delay of days or more, compared with spending the same time restudying it.
- **Construct:** retrieval practice (testing effect).
- **Used by:** free-recall (LB) · Series (LB).
- **Transfer:** free-recall is **direct**, because written free recall of studied prose by adults is the canonical manipulation. Series is **adjacent**, because the style recalls personally chosen material across self-scheduled sessions, not lab-timed ones.
- **Sourcing brief:**
  - *Seminal:* Roediger & Karpicke 2006; Karpicke & Roediger 2008.
  - *Synthesis:* Rowland 2014 meta-analysis; Adesope, Trevisan & Sundararajan 2017 meta-analysis; Yang et al. 2021 classroom meta-analysis (Psych Bull); Dunlosky et al. 2013 (PSPI) utility ratings.
  - *Replication check:* search for Many Labs or RRR coverage (none is known); look for large pre-registered classroom replications.
  - *Backfire:* When does restudy win? Check short retention intervals (minutes), very low initial retrieval success with no feedback, and high-element-interactivity material (van Gog & Sweller 2015 special issue vs Karpicke & Aue 2015). Does the benefit transfer to untested items or new questions (Pan & Rickard 2018 meta-analysis)?

### 1.2 `memory-retrieval/retrieval-feedback`
- **Claim:** Checking recall against the source right after retrieving it increases the retention benefit and corrects errors that would otherwise persist. Without feedback, errors produced during recall tend to be retained.
- **Construct:** feedback in test-enhanced learning; self-scoring accuracy.
- **Used by:** free-recall (LB): the second-colour check pass is mandatory in the roster's design.
- **Transfer:** **adjacent.** The literature mostly tests experimenter-given feedback. Free-recall's check is self-administered, with the person scoring their own recall against the source.
- **Sourcing brief:**
  - *Seminal:* Pashler, Cepeda, Wixted & Rohrer 2005; Butler & Roediger 2008; Butler, Karpicke & Roediger 2008 (feedback for low-confidence correct answers).
  - *Synthesis:* the feedback moderator in Rowland 2014 and Adesope et al. 2017.
  - *Replication check:* any large pre-registered study of feedback timing (immediate vs delayed).
  - *Backfire:* Are self-scorers lenient, crediting partial or wrong recall (Rawson & Dunlosky 2007; Dunlosky, Hartwig, Rawson & Lipko 2011 on idea-unit standards)? Does the check pass turn into restudy, and lose the retrieval benefit?

### 1.3 `memory-retrieval/hypercorrection`
- **Claim:** Errors a person made with high confidence are more likely to be corrected on a later test, once feedback is seen, than errors made with low confidence.
- **Construct:** the hypercorrection effect.
- **Used by:** free-recall (S; variant `with-confidence`) · decision-diagnosis/confidence-dots protocol (S).
- **Transfer:** **adjacent.** The studies mostly use general-knowledge questions, whereas free-recall uses self-studied material.
- **Sourcing brief:**
  - *Seminal:* Butterfield & Metcalfe 2001.
  - *Synthesis:* Metcalfe 2017, "Learning from errors" (Annual Review); Metcalfe & Finn 2011.
  - *Replication check:* search for pre-registered replications and for its durability at a delay.
  - *Backfire:* Do high-confidence errors return after a delay (lead: Butler, Fazio & Marsh 2011)? Does rating confidence during recall change what is recalled (reactivity; see 3.7)?

### 1.4 `memory-retrieval/pretesting`
- **Claim:** Trying to answer questions about material before studying it, even when most answers are wrong, improves later retention of that material compared with studying it without a pretest.
- **Construct:** the pretesting / prequestion effect (errorful generation).
- **Used by:** free-recall (S; variant `cued` used before the first study session) · Series (S).
- **Transfer:** **adjacent.** The literature uses researcher-written prequestions. Here the agent writes the cued prompts.
- **Sourcing brief:**
  - *Seminal:* Richland, Kornell & Kao 2009; Kornell, Hays & Bjork 2009.
  - *Synthesis:* Pan & Carpenter 2023 review (Ed Psych Review); St. Hilaire & Carpenter 2020.
  - *Replication check:* search for pre-registered replications with educational texts or video.
  - *Backfire:* Is the benefit confined to prequestioned content, while non-prequestioned content suffers (Carpenter & Toftness 2017)? Do errors on unrelated material fail to help (Huelser & Metcalfe 2012)?

### 1.5 `memory-retrieval/retrieval-before-review`
- **Claim:** Opening a study session by retrieving earlier material before restudying it improves learning from the restudy that follows, compared with restudying first.
- **Construct:** test-potentiated learning (retrieval-enhanced new learning).
- **Used by:** Series (LB): every session opens with retrieval before review.
- **Transfer:** **adjacent.** The lab tasks are word lists and prose on a timed schedule; the Series is self-paced.
- **Sourcing brief:**
  - *Seminal:* Izawa 1970 (test-potentiated learning); Arnold & McDermott 2013.
  - *Synthesis:* Chan, Manley, Davis & Szpunar 2018 meta-analysis (Psych Bull, "Retrieval potentiates new learning"); Pastötter & Bäuml 2014 review.
  - *Replication check:* search for any large pre-registered replication.
  - *Backfire:* Do some conditions reverse the effect, such as retrieval-induced forgetting of unpracticed related items, or very low initial retrieval?

### 1.6 `memory-retrieval/distributed-practice`
- **Claim:** Spreading the same amount of study or retrieval across sessions separated by days produces better long-term retention than massing it into one session.
- **Construct:** the spacing effect (distributed practice).
- **Used by:** Series (LB).
- **Transfer:** **direct to adjacent.** Adults and multi-day gaps have been tested. Retrieval practice spaced by self-scheduled sessions is less common in the literature.
- **Sourcing brief:**
  - *Seminal:* Ebbinghaus 1885.
  - *Synthesis:* Cepeda, Pashler, Vul, Wixted & Rohrer 2006 meta-analysis (Psych Bull); Donovan & Radosevich 1999 meta-analysis; Janiszewski, Noel & Sawyer 2003 meta-analysis; Carpenter, Cepeda, Rohrer, Kang & Pashler 2012 review.
  - *Replication check:* search for Many Labs or RRR coverage; the effect is widely replicated but record what was searched.
  - *Backfire:* Does massing win on immediate tests? Do learners judge massed practice more effective (Kornell & Bjork 2008; Kornell 2009), which matters for whether people adhere to the Series schedule?

### 1.7 `memory-retrieval/spacing-gap-ratio` *(parameter)*
- **Claim:** For a fixed retention interval, the gap between sessions that maximises retention is a fraction of that interval, and that fraction shrinks as the interval grows. For a target of about one month, gaps of about 1, 3 and 7 days fall in or near the high-retention region.
- **Construct:** the spacing lag × retention interval interaction (the "temporal ridgeline").
- **Used by:** Series (P): the 1d/3d/7d gap schedule and the ≈1-month target retention interval.
- **Transfer:** **adjacent.** The ridgeline studies use single-session trivia or fact learning with one relearning session, whereas Series has three retrieval rounds.
- **Sourcing brief:**
  - *Seminal:* Cepeda, Vul, Rohrer, Wixted & Pashler 2008 (Psych Science, "temporal ridgeline").
  - *Synthesis:* Cepeda et al. 2009 (Exp Psych, "Optimizing distributed practice"); Rohrer & Pashler 2007.
  - *Extract:* the reported optimal gap for the retention interval closest to one month, and the implied gap ratio. Record whether 1d/3d/7d is inside, near or outside the reported optimum.
  - *Backfire:* How steep is the cost of a gap that is too short, compared with one that is too long, in the reported curves?

### 1.8 `memory-retrieval/expanding-vs-uniform`
- **Claim:** An expanding schedule of retrieval gaps (for example 1d → 3d → 7d) produces better long-term retention than a uniform schedule with the same total spacing.
- **Construct:** expanding vs equal-interval retrieval practice.
- **Used by:** Series (LB per §8; decision 4 recommends reclassifying it as P).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Landauer & Bjork 1978.
  - *Evidence:* Karpicke & Roediger 2007 (uniform was better at a delay); Logan & Balota 2008; Kang, Lindsey, Mozer & Pashler 2014.
  - *Synthesis:* Latimier, Peyre & Ramus 2021 meta-analysis (Ed Psych Review); Balota, Duchek & Logan 2007 review.
  - *Replication check:* search for pre-registered comparisons.
  - *Backfire:* Under what conditions does expanding lose, for example when the first gap is long enough that initial retrieval fails? The grading report must say which option grades better, and the Series schedule adopts that option.

### 1.9 `memory-retrieval/successive-relearning` *(parameter)*
- **Claim:** Retrieving items to a criterion across several spaced sessions, and dropping or targeting items according to the previous session's failures, gives durable retention. Returns diminish after about three relearning sessions.
- **Construct:** successive relearning.
- **Used by:** Series (P): three sessions, and "each round's recall prompts target the previous round's gaps".
- **Transfer:** **adjacent.** The literature uses key-term definitions in courses, whereas Series uses mixed personal material.
- **Sourcing brief:**
  - *Seminal:* Bahrick 1979; Rawson & Dunlosky 2011.
  - *Evidence:* Rawson, Dunlosky & Sciartelli 2013.
  - *Synthesis:* Higham, Zengel, Bartlett & Hadwin 2022 review (Ed Psych Review).
  - *Extract:* what the literature says about the number of relearning sessions (the basis for "3 sessions").
  - *Backfire:* Do learners drop items too early (Karpicke 2009; Kornell & Bjork 2008 on dropping)? Does targeting only the gaps starve items that were recalled but are weakly held?

### 1.10 `memory-retrieval/interleaving-confusable` *(parameter / style rule)*
- **Claim:** Interleaving practice across confusable categories or problem types improves later discrimination and problem solving compared with blocked practice. The benefit shrinks, or reverses, for dissimilar categories and for verbal or expository material.
- **Construct:** interleaving (discriminative contrast).
- **Used by:** Series (P): the conditional rule "mix problem types within a round only when categories are confusable", from roster §3.3.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Kornell & Bjork 2008 (painting styles); Rohrer & Taylor 2007.
  - *Evidence:* Birnbaum, Kornell, Bjork & Bjork 2013; Carvalho & Goldstone 2014 (blocking better for low-similarity categories); Rohrer, Dedrick & Stershic 2015 (classroom maths).
  - *Synthesis:* Brunmair & Richter 2019 meta-analysis (Psych Bull); Firth et al. 2021 systematic review.
  - *Backfire:* Does the effect reverse for words or expository text? Confirm the moderator the rule relies on (category similarity).

### 1.11 `memory-retrieval/self-explanation`
- **Claim:** Prompting learners to explain to themselves why each step of given material follows improves understanding and transfer, compared with studying the same material without such prompts.
- **Construct:** the self-explanation effect.
- **Used by:** self-explain (LB).
- **Transfer:** **adjacent.** Much of the literature uses structured domains (maths, physics, biology texts), whereas self-explain is used on any stepwise material the agent supplies.
- **Sourcing brief:**
  - *Seminal:* Chi, Bassok, Lewis, Reimann & Glaser 1989; Chi, de Leeuw, Chiu & LaVancher 1994.
  - *Synthesis:* Bisra, Liu, Nesbit, Salimi & Winne 2018 meta-analysis (Ed Psych Review); Rittle-Johnson, Loehr & Durkin 2017 review (ZDM); Dunlosky et al. 2013 utility rating.
  - *Replication check:* search for large pre-registered replications.
  - *Backfire:* What happens when novices produce incorrect explanations and get no feedback? Is the effect confounded by time on task? Do prompts add little when the material already includes explanations (lead: Schworm & Renkl 2006)?

### 1.12 `memory-retrieval/worked-example-fading`
- **Claim:** For novices, studying worked examples whose final steps are progressively removed (completion problems) improves learning compared with unaided problem solving. The advantage shrinks or reverses as expertise grows.
- **Construct:** the worked-example effect with fading, and the expertise-reversal effect.
- **Used by:** self-explain (S; variant `faded`, folded from worked-example).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Sweller & Cooper 1985; Renkl, Atkinson, Maier & Staley 2002; Renkl & Atkinson 2003.
  - *Synthesis:* Atkinson, Derry, Renkl & Wortham 2000 review (RER); lead: Barbieri, Clerjuste & Chawla 2023 meta-analysis of worked examples in mathematics.
  - *Expertise reversal:* Kalyuga, Ayres, Chandler & Sweller 2003.
  - *Backfire:* How strong is the expertise reversal? How does fading relate to productive-failure findings (see 1.16)? Does the effect depend on element interactivity (lead: Chen, Kalyuga & Sweller 2015)?

### 1.13 `memory-retrieval/elaborative-interrogation`
- **Claim:** Prompting learners to answer "why is this true?" for stated facts improves recall of those facts compared with reading them.
- **Construct:** elaborative interrogation.
- **Used by:** self-explain (S; `why` prompt variant).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Pressley, McDaniel, Turnure, Wood & Ahmad 1987.
  - *Evidence:* Woloshyn, Paivio & Pressley 1994.
  - *Synthesis:* Dunlosky et al. 2013 (moderate utility).
  - *Replication check:* search.
  - *Backfire:* Does it depend on prior knowledge, so that learners without it generate poor "why" answers (lead: Martin & Pressley 1991)?

### 1.14 `memory-retrieval/explanatory-depth`
- **Claim:** People overestimate how well they understand how things work. Attempting a step-by-step explanation lowers that self-rating, which exposes the gap.
- **Construct:** the illusion of explanatory depth (IOED).
- **Used by:** feynman (LB).
- **Transfer:** **adjacent.** The IOED paradigm is rate → explain mechanically → rerate, using devices and natural phenomena. Feynman asks for a plain-language explanation of the person's own concept, with no rerating step.
- **Sourcing brief:**
  - *Seminal:* Rozenblit & Keil 2002.
  - *Evidence:* Alter, Oppenheimer & Zemla 2010; Fernbach, Rogers, Fox & Sloman 2013 (policy extremism); Lawson 2006 (drawing bicycles).
  - *Replication check:* lead: Crawford & Ruscio 2021, a pre-registered replication of the Fernbach et al. moderation effect reported as failing. Separate the core IOED from that downstream claim. Search for replications of the core effect itself.
  - *Backfire:* Can a fluent but wrong explanation raise false confidence? Does the self-rating drop without any learning following? Would a before/after rating on the page (pairing with scoresheet) be needed to reproduce the tested manipulation?

### 1.15 `memory-retrieval/explaining-to-learn`
- **Claim:** Explaining material to an imagined novice in one's own words improves understanding and retention compared with restudying it.
- **Construct:** learning by explaining / teaching (generative learning).
- **Used by:** feynman (S): the page's intent is diagnostic, so the learning benefit is secondary.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Fiorella & Mayer 2013.
  - *Evidence:* Hoogerheide, Loyens & van Gog 2014.
  - *Synthesis:* Fiorella & Mayer 2016 review, "Eight ways to promote generative learning"; lead: Kobayashi 2019 meta-analysis of preparing-to-teach and teaching.
  - *Backfire:* Is **written** explaining to a fictitious audience weaker than oral explaining (lead: Lachner, Ly & Nückles 2018; Hoogerheide et al. 2016)? This matters directly because Longhand is written. Does "explain it to a twelve-year-old" drive oversimplification that drops the mechanism?

### 1.16 `memory-retrieval/generate-before-told`
- **Claim:** Attempting an answer yourself before being given one improves later understanding and retention, compared with receiving the answer first.
- **Construct:** the generation effect; productive failure (problem solving before instruction).
- **Used by:** question-queue (LB): questions are batched, and the AI answers them after the sitting, not during it · feynman (S) · collection spine (S): "the human answers, the AI does not answer for them" (GROUNDING.md).
- **Transfer:** **analogical to adjacent.** The studies compare attempting then being taught with being taught then practising, on set problems. The queue defers AI answers until the page has been worked.
- **Sourcing brief:**
  - *Seminal:* Slamecka & Graf 1978; Kapur 2008.
  - *Synthesis:* Bertsch, Pesta, Wiscott & McDaniel 2007 meta-analysis (generation effect); lead: McCurdy et al. 2020 meta-analysis; lead: Sinha & Kapur 2021 meta-analysis of productive failure (RER); Loibl, Roll & Rummel 2017 review.
  - *Backfire:* When does instruction first win, for example with high element interactivity or no prior knowledge (Kirschner, Sweller & Clark 2006; lead: Ashman, Kalyuga & Sweller 2020)? A deferred question that blocks the work can stall the sitting.

---

## 2. `creativity-fixation.md`

**Items served (5):** ten-bad-ideas, forced-connections, constraint-removal, stimulus-die, **Incubation**.

| Item | Load-bearing | Supporting | Parameter |
| --- | --- | --- | --- |
| ten-bad-ideas | deferred-judgement · bad-ideas-criterion · serial-order-effect | — | — |
| forced-connections | random-stimuli · conceptual-combination | — | — |
| constraint-removal | constraint-relaxation | deferred-judgement (phase 2 restores the constraint) | — |
| stimulus-die | random-stimuli · heuristic-prompts | constraint-relaxation (the "remove the constraint" face) | — |
| Incubation | incubation-effect · sleep-insight · walking-divergent · deferred-judgement (diverge/converge separation) · time-pressure-divergent | — | incubation-conditions |

**Claim count:** 12. **Sourcing batches:** 1, at the cap. Incubation's LB list follows §8 (decision 3). With sleep-insight expected C, Incubation's displayed grade is likely C at best.

### 2.1 `creativity-fixation/random-stimuli`
- **Claim:** Exposure to randomly selected stimuli (words or prompts unrelated to the problem) during idea generation increases the number and originality of ideas, compared with generating without stimuli.
- **Construct:** random entry / external stimulation in idea generation.
- **Used by:** forced-connections (LB) · stimulus-die (LB).
- **Transfer:** **adjacent.** Brainstorming and design-ideation studies use supplied stimuli. Forced-connections uses agent-chosen words, and the die rolls fixed operators.
- **Sourcing brief:**
  - *Seminal:* de Bono 1970 (practice, D-type source); Mednick 1962 (associative theory).
  - *Evidence:* Dugosh, Paulus, Roland & Yang 2000 (cognitive stimulation in brainstorming); Nijstad, Stroebe & Lodewijkx 2002 (stimulus homogeneity); Chan et al. 2011 and Fu et al. 2013 (near vs far stimuli in design). Search specifically for random-word stimulus experiments.
  - *Synthesis:* search for a meta-analysis of stimuli / examples in ideation.
  - *Backfire:* Do very far or unrelated stimuli lower quality or feasibility? Do stimuli induce fixation on the stimulus itself (Jansson & Smith 1991; Vasconcelos & Crilly 2016 review)? Is random input noise during convergence?

### 2.2 `creativity-fixation/heuristic-prompts`
- **Claim:** Prompting idea generation with generic transformation heuristics ("reverse it", "make it 10×", "borrow from another field") increases the variety and creativity of generated concepts, compared with unprompted generation.
- **Construct:** design heuristics / transformation operators; analogical transfer ("steal from another field").
- **Used by:** stimulus-die (LB): default faces "who else is affected?", "reverse it", "remove the constraint", "make it 10x", "make it 0.1x" and "steal from another field".
- **Transfer:** **adjacent.** The tested manipulation is design students using heuristic cards; the die rolls heuristics at random.
- **Sourcing brief:**
  - *Evidence:* Yilmaz, Daly, Seifert & Gonzalez 2016 (Design Studies, evidence-based design heuristics); Daly, Yilmaz, Christian, Seifert & Gonzalez 2012; Gick & Holyoak 1980 and 1983 (analogical transfer needs a hint).
  - *Practice (D-type):* SCAMPER; Oblique Strategies (Eno & Schmidt 1975); TRIZ.
  - *Replication check:* search.
  - *Backfire:* Does a randomly assigned heuristic that misfits the problem waste the roll? Is analogical transfer poor without an explicit prompt to apply it?

### 2.3 `creativity-fixation/conceptual-combination`
- **Claim:** Deliberately combining two distant concepts produces more original ideas than working from a single concept, with originality driven by attributes that emerge from the combination.
- **Construct:** conceptual combination (bisociation).
- **Used by:** forced-connections (LB): "force a collision".
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Theory:* Koestler 1964.
  - *Evidence:* Mobley, Doares & Mumford 1992; Ward 1994 (structured imagination); Wilkenfeld & Ward 2001; Estes & Ward 2002.
  - *Synthesis:* search for a review or meta-analysis of conceptual combination and creativity.
  - *Backfire:* Do highly dissimilar pairs yield less useful combinations? Is output quality lower, even when originality rises?

### 2.4 `creativity-fixation/deferred-judgement`
- **Claim:** Separating idea generation from evaluation, with judgement deferred until generation is done, increases the number of ideas without reducing, and sometimes increasing, the number of good ones.
- **Construct:** deferral of judgement; diverge/converge separation.
- **Used by:** ten-bad-ideas (LB) · Incubation (LB; the diverge half → break → converge half structure) · constraint-removal (S).
- **Transfer:** **adjacent.** The classic studies are group and individual brainstorming. Longhand's pages are solo.
- **Sourcing brief:**
  - *Seminal:* Osborn 1953 (practice); Parnes & Meadow 1959.
  - *Evidence:* Basadur, Graen & Scandura 1986; Rietzschel, Nijstad & Stroebe 2006/2007 (quantity, quality and idea selection).
  - *Synthesis:* Mullen, Johnson & Salas 1991 meta-analysis (group vs nominal brainstorming); Diehl & Stroebe 1987.
  - *Backfire:* Is quantity reached without quality? Are people poor at selecting their best ideas afterwards (Rietzschel et al. 2006; Silvia 2008)?

### 2.5 `creativity-fixation/bad-ideas-criterion`
- **Claim:** Instructing people to generate deliberately bad ideas lowers self-censorship and yields more ideas, including some usable ones, than instructing them to generate good ideas.
- **Construct:** lowered quality criterion; instruction effects in divergent thinking.
- **Used by:** ten-bad-ideas (LB). The spec expects C/D.
- **Transfer:** **analogical to adjacent.** Evidence on explicit instructions (such as "be creative") exists. Direct tests of "be bad" instructions may not.
- **Sourcing brief:**
  - *Evidence:* Harrington 1975 ("be creative" instructions); Nusbaum, Silvia & Beaty 2014.
  - *Synthesis:* lead: Acar, Runco & Park 2020 meta-analysis of explicit instructions in divergent-thinking tests.
  - *Practice:* "worst possible idea" and "reverse brainstorming" techniques.
  - *Search:* explicitly for experiments with "bad", "worst" or "silly" instructions; record "none found (searched: …)" if there are none.
  - *Backfire:* Does output stay deliberately trivial or jokey? Does a "be bad" framing anchor on humour rather than on range?

### 2.6 `creativity-fixation/serial-order-effect`
- **Claim:** In a single idea-generation run, later ideas tend to be more original than earlier ones.
- **Construct:** the serial order effect in divergent thinking.
- **Used by:** ten-bad-ideas (LB): its read-back is "read box 10 first".
- **Transfer:** **adjacent.** Tested on alternate-uses tasks with time limits, whereas ten-bad-ideas has a fixed count of ten.
- **Sourcing brief:**
  - *Seminal:* Christensen, Guilford & Wilson 1957.
  - *Evidence:* Beaty & Silvia 2012; Gilhooly, Fioratou, Anthony & Wynn 2007 (early ideas come from memory, later ones from strategies).
  - *Replication check:* search for large or pre-registered replications.
  - *Backfire:* Does the effect need enough time or fluency to reach later ideas? Does a count of ten reach the region where originality rises?

### 2.7 `creativity-fixation/constraint-relaxation`
- **Claim:** Impasses in problem solving are overcome when the solver relaxes a self-imposed constraint on the solution, so deliberately removing a constraint makes new solution paths available.
- **Construct:** constraint relaxation (representational change); fixation / Einstellung.
- **Used by:** constraint-removal (LB) · stimulus-die (S; the "remove the constraint" face).
- **Transfer:** **analogical.** The studies use insight puzzles with implicit constraints (for example matchstick arithmetic). The page asks the person to remove an explicit, real constraint.
- **Sourcing brief:**
  - *Seminal:* Luchins 1942 (Einstellung); Ohlsson 1992 (representational change theory); Knoblich, Ohlsson, Haider & Rhenius 1999.
  - *Evidence:* Knoblich, Ohlsson & Raney 2001; Öllinger, Jones & Knoblich 2008.
  - *Replication check:* search.
  - *Backfire (opposing literature):* Do constraints *raise* creativity (Moreau & Dahl 2005; Haught-Tromp 2017; Acar, Tarakci & van Knippenberg 2019 review)? Are ideas generated without the constraint unrecoverable once it returns?

### 2.8 `creativity-fixation/incubation-effect`
- **Claim:** Setting a creative problem aside for a break, then returning to it, increases solutions or ideas compared with working on it continuously for the same total time.
- **Construct:** the incubation effect.
- **Used by:** Incubation (LB).
- **Transfer:** **adjacent.** The lab breaks last minutes, filled with set tasks. The style's break is a walk or a night's sleep.
- **Sourcing brief:**
  - *Theory:* Wallas 1926.
  - *Synthesis:* Sio & Ormerod 2009 meta-analysis (Psych Bull); extract the moderators (task type, preparation length, interim-task demand); Dodds, Ward & Smith review; Gilhooly 2016 review.
  - *Evidence:* Baird et al. 2012 (mind-wandering during a low-demand incubation task).
  - *Replication check:* search for replications of Baird et al. 2012, and for the unconscious-thought literature's failed replication (lead: Nieuwenstein et al. 2015), which bears on accounts of incubation.
  - *Backfire:* Can a break cost momentum on convergent or well-structured problems?

### 2.9 `creativity-fixation/incubation-conditions` *(parameter)*
- **Claim:** Incubation benefits are larger (a) after a longer preparation period, (b) with longer breaks up to a point, and (c) when the break is filled with a low-demand activity rather than rest or a demanding task.
- **Construct:** incubation moderators.
- **Used by:** Incubation (P): the minimum break length, and the "low-demand activity, not rest" guidance.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Primary:* the Sio & Ormerod 2009 moderator analyses; extract numbers for break length and interim-task demand; Baird et al. 2012; lead: Ellwood, Pallier, Snyder & Gallate 2009.
  - *Backfire:* Has the low-demand vs rest difference replicated? What minimum break length does the data actually support?

### 2.10 `creativity-fixation/sleep-insight`
- **Claim:** Sleeping between first exposure to a problem and a later retest increases the likelihood of discovering a hidden solution or rule, compared with an equal period awake.
- **Construct:** sleep and insight (offline consolidation).
- **Used by:** Incubation (LB per §8). The spec expects C.
- **Transfer:** **adjacent to analogical.** Lab rule-discovery tasks vs a personal creative problem.
- **Sourcing brief:**
  - *Seminal:* Wagner, Gais, Haider, Verleger & Born 2004 (Nature).
  - *Evidence:* Cai, Mednick, Harrison, Kanady & Mednick 2009 (REM); Sio, Monaghan & Ormerod 2013 ("only if it is difficult"); lead: Lacaux et al. 2021 (N1 sleep).
  - *Synthesis:* search for a meta-analysis of sleep and insight or creativity.
  - *Replication check:* search specifically for failed replications of Wagner et al. 2004.
  - *Backfire:* Does the effect hold only for difficult problems, or only for some sleep stages?

### 2.11 `creativity-fixation/walking-divergent`
- **Claim:** Walking, compared with sitting, increases divergent-thinking output during the walk and shortly after it.
- **Construct:** walking / acute physical activity and divergent thinking.
- **Used by:** Incubation (LB per §8; the break suggestion "walk").
- **Transfer:** **adjacent.** Tested with alternate-uses tasks, not with a return to one's own problem.
- **Sourcing brief:**
  - *Seminal:* Oppezzo & Schwartz 2014 (JEP:LMC).
  - *Synthesis:* lead: Frith, Ryu, Kang & Loprinzi 2019 systematic review of acute exercise and creativity; search for a later meta-analysis.
  - *Replication check:* search for pre-registered replications of Oppezzo & Schwartz.
  - *Backfire:* Does convergent thinking fail to benefit, or suffer (as Oppezzo & Schwartz reported for one task)? Does the benefit decay quickly after the walk ends?

### 2.12 `creativity-fixation/time-pressure-divergent`
- **Claim:** Time pressure during idea generation reduces creative, divergent output.
- **Construct:** time pressure and creativity (challenge vs hindrance stressors).
- **Used by:** Incubation (LB per §8; the rule "no `timer` in the diverge half") · planning-self-regulation/timer (S; its stated backfire). The spec expects C.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Amabile, Hadley & Kramer 2002 (practice, diary); lead: Amabile et al. 2002 longitudinal field study (HBS working paper).
  - *Synthesis:* Byron, Khazanchi & Nazarian 2010 meta-analysis (stressors and creativity); Baer & Oldham 2006 (inverted U).
  - *Replication check:* search for experiments with manipulated deadlines.
  - *Backfire:* Is the relationship curvilinear, so that moderate pressure helps? That would contradict the style rule as currently written.

---

## 3. `decision-diagnosis.md`

**Items served (12):** options-criteria, pre-mortem, assumption-audit, matrix-2x2 with presets eisenhower, swot, impact-effort and power-interest, five-whys, tokens, forecast, and the **confidence-dots** protocol.

| Item | Load-bearing | Supporting |
| --- | --- | --- |
| options-criteria | decomposed-judgement · anchoring | — |
| pre-mortem | prospective-hindsight · premortem-overconfidence | — |
| assumption-audit | assumption-surfacing · confidence-resolution | consider-the-opposite (see decision 5) |
| matrix-2x2 | two-axis-mapping | externalisation-embodiment/common-region (quadrants are regions) |
| eisenhower (preset) | inherits matrix-2x2 + mere-urgency | — |
| swot (preset) | inherits matrix-2x2; no preset-specific claim | backfire lead only: Hill & Westbrook 1997 |
| impact-effort (preset) | inherits matrix-2x2; no preset-specific claim | backfire link: effort estimates are subject to the planning fallacy (planning-self-regulation/task-unpacking) |
| power-interest (preset) | inherits matrix-2x2; no preset-specific claim | attribution only (Mendelow 1981) |
| five-whys | root-cause-why-chain | — |
| tokens | tangible-allocation | externalisation-embodiment/epistemic-action |
| forecast | calibration-feedback · hindsight-record | reference-class · anchoring |
| confidence-dots (protocol) | confidence-resolution · externalisation-embodiment/redundant-coding | memory-retrieval/hypercorrection |

**Claim count:** 14. **Sourcing batches:** 2. **DD-A, judgement and forecasting:** 3.1, 3.2, 3.5–3.7, 3.12–3.14. **DD-B, planning tools:** 3.3, 3.4, 3.8–3.11.

### 3.1 `decision-diagnosis/decomposed-judgement`
- **Claim:** Scoring options on explicit criteria and combining the scores mechanically gives more consistent and more accurate judgements than an unaided holistic judgement.
- **Construct:** linear models and decomposition vs holistic (clinical) judgement.
- **Used by:** options-criteria (LB).
- **Transfer:** **analogical to adjacent.** The evidence is predictive accuracy on tasks with a known criterion. A personal decision has none, and the page's value is the gap between the total and the gut score.
- **Sourcing brief:**
  - *Seminal:* Dawes 1979 (improper linear models); Dawes, Faust & Meehl 1989.
  - *Synthesis:* Grove, Zald, Lebow, Snitz & Nelson 2000 meta-analysis; Ægisdóttir et al. 2006 meta-analysis; lead: MacGregor, Lichtenstein & Slovic 1988 (decomposition).
  - *Practice:* Kahneman, Lovallo & Sibony 2019 (mediating assessments).
  - *Backfire:* Can analysing reasons lower choice quality (Wilson & Schooler 1991; Wilson et al. 1993)? Are criteria chosen after the fact to justify a favourite (lead: Uhlmann & Cohen 2005 on constructed criteria)? Also, unconscious-thought claims that "gut beats analysis" failed a large replication (lead: Nieuwenstein et al. 2015), which matters for how the read-back treats the gut column.

### 3.2 `decision-diagnosis/anchoring`
- **Claim:** A number written or seen earlier pulls later numeric judgements towards it, so a gut score written *before* criteria scoring cannot be anchored by the total.
- **Construct:** the anchoring effect (including self-generated anchors).
- **Used by:** options-criteria (LB; the roster's layout change moves the gut column first) · forecast (S; the reference-class line is placed first on purpose).
- **Transfer:** **adjacent.** Here the anchor is the person's own earlier number.
- **Sourcing brief:**
  - *Seminal:* Tversky & Kahneman 1974; Jacowitz & Kahneman 1995; Epley & Gilovich 2001 (self-generated anchors).
  - *Replication check:* Many Labs 1 (Klein et al. 2014) anchoring items; confirm the result.
  - *Synthesis:* Furnham & Boo 2011 review; search for a recent anchoring meta-analysis.
  - *Backfire:* Does writing the gut score first reverse the anchoring, so that it pulls the criteria scores and makes the total converge on the gut? Could consistency pressure hide the very mismatch the page exists to reveal?

### 3.3 `decision-diagnosis/prospective-hindsight`
- **Claim:** Imagining that an outcome has already happened ("it failed") leads people to generate more, and more specific, reasons for it than imagining that it might happen.
- **Construct:** prospective hindsight.
- **Used by:** pre-mortem (LB).
- **Transfer:** **adjacent.** This is spec §6.4's own example: explanation-generation studies applied to a solo page.
- **Sourcing brief:**
  - *Seminal:* Mitchell, Russo & Pennington 1989.
  - *Practice:* Klein 2007 (HBR).
  - *Evidence:* search for replications of the "more reasons" finding.
  - *Backfire:* Does imagining an outcome as certain inflate its judged likelihood (Koehler 1991, on explanation bias)?

### 3.4 `decision-diagnosis/premortem-overconfidence`
- **Claim:** Running a pre-mortem on a plan reduces overconfidence in it and surfaces more risks than a standard critique or pros-and-cons review.
- **Construct:** the pre-mortem as a debiasing technique.
- **Used by:** pre-mortem (LB).
- **Transfer:** **adjacent.** The studies are group or team based, whereas the page is solo.
- **Sourcing brief:**
  - *Evidence:* lead: Veinott, Klein & Wiggins 2010; lead: Gallop, Willy & Bischoff 2016.
  - *Replication check:* search for any pre-registered test.
  - *Backfire:* Does struggling to generate many failure reasons make failure feel *less* likely, raising confidence (ease of retrieval: Schwarz et al. 1991; Sanna, Schwarz & Stocker 2002, "When debiasing backfires")? Does confidence rise while the plan stays unchanged (roster)?

### 3.5 `decision-diagnosis/assumption-surfacing`
- **Claim:** Explicitly listing the assumptions a plan depends on, and naming a test for each, identifies more of the plan's vulnerabilities than reviewing the plan without such a list.
- **Construct:** a key-assumptions check / assumption-based planning.
- **Used by:** assumption-audit (LB). The expected source type is practice.
- **Transfer:** **adjacent.** The techniques come from intelligence and strategy practice.
- **Sourcing brief:**
  - *Practice:* Mason & Mitroff 1981 (strategic assumption surfacing and testing); McGrath & MacMillan 1995 (discovery-driven planning); Dewar 2002 (RAND assumption-based planning); Heuer & Pherson (structured analytic techniques).
  - *Evaluations:* lead: Coulthart 2017, an evidence-based evaluation of structured analytic techniques; search for experimental tests of the key-assumptions check, and of ACH (lead: Dhami and colleagues; Mandel and colleagues).
  - *Backfire:* Does a long list give false reassurance? Do the SAT evaluations find little or no debiasing benefit?

### 3.6 `decision-diagnosis/consider-the-opposite`
- **Claim:** Asking people to consider reasons their judgement could be wrong reduces overconfidence and biased assimilation, compared with no instruction or an instruction to be unbiased.
- **Construct:** the consider-the-opposite debiasing strategy.
- **Used by:** assumption-audit (S; the falsifier column, folded from the consider-the-opposite candidate; decision 5).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Koriat, Lichtenstein & Fischhoff 1980; Lord, Lepper & Preston 1984.
  - *Evidence:* Hirt & Markman 1995; Mussweiler, Strack & Pfeiffer 2000.
  - *Synthesis:* Larrick 2004 debiasing review; Arkes 1991.
  - *Backfire:* When generating reasons against feels difficult, does the original belief strengthen (Sanna, Schwarz & Stocker 2002)?

### 3.7 `decision-diagnosis/confidence-resolution`
- **Claim:** Coarse, three-level confidence ratings discriminate correct from incorrect judgements above chance (resolution), even though people are typically overconfident in absolute terms. Items marked low-confidence are therefore a useful flag for risk.
- **Construct:** metacognitive resolution and calibration; overconfidence.
- **Used by:** confidence-dots protocol (LB) · assumption-audit (LB; its read-back reads low-confidence, untested items as risks) · free-recall (S; `with-confidence`).
- **Transfer:** **adjacent.** The literature uses continuous or percentage scales on general-knowledge items, not a three-point dot scale on self-generated assumptions.
- **Sourcing brief:**
  - *Seminal:* Lichtenstein, Fischhoff & Phillips 1982 (calibration review); Nelson 1984.
  - *Measurement:* Fleming & Lau 2014.
  - *Evidence:* Koriat 2012 (self-consistency model); Moore & Healy 2008 (three faces of overconfidence).
  - *Search:* for work on the granularity of confidence scales, and on whether resolution survives three levels.
  - *Backfire:* Is rating confidence reactive, changing performance (lead: Double & Birney 2019 meta-analysis on the reactivity of metacognitive judgements)? Does overprecision mean that "high" dots mislead the agent?

### 3.8 `decision-diagnosis/two-axis-mapping`
- **Claim:** Placing items on a spatial layout defined by two explicit dimensions makes their relative standing on both dimensions easier to judge and compare than a list or table does.
- **Construct:** diagrammatic representation; position along a common scale; graphic organisers.
- **Used by:** matrix-2x2 (LB), and through inheritance eisenhower, swot, impact-effort and power-interest.
- **Transfer:** **analogical.** The perception and diagram literature does not test placing personal options in a hand-drawn 2×2.
- **Sourcing brief:**
  - *Theory:* Larkin & Simon 1987 ("Why a diagram is (sometimes) worth ten thousand words").
  - *Adjacent:* Cleveland & McGill 1984 (graphical perception; position is judged most accurately).
  - *Synthesis:* lead: Kim, Vaughn, Wanzek & Wei 2004 graphic-organiser meta-analysis; lead: Dexter & Hughes 2011.
  - *Practice:* consulting 2×2s (lead: Lowy & Hood 2004).
  - *Backfire:* Does "nothing may sit on a line" force false dichotomies? Does a non-discriminating axis crowd one quadrant? For swot, record Hill & Westbrook 1997 (Long Range Planning) as preset-level backfire evidence (SWOTs produce long, unused lists).

### 3.9 `decision-diagnosis/mere-urgency`
- **Claim:** People prefer tasks framed as urgent (short completion windows) over important tasks with objectively larger payoffs. Separating urgency from importance should therefore counter that bias.
- **Construct:** the mere urgency effect.
- **Used by:** eisenhower (LB; preset-specific addition allowed by §3.4).
- **Transfer:** **adjacent** for the effect. **Analogical** for the countermeasure, since no study is known to test an Eisenhower grid as the fix.
- **Sourcing brief:**
  - *Seminal:* Zhu, Yang & Hsee 2018 (J Consumer Research).
  - *Replication check:* search for independent or pre-registered replications.
  - *Backfire:* Did Zhu et al. test an intervention (for example, highlighting outcomes) that reduced the effect? Is the grid's "delegate" quadrant supported by anything, or is it practice only?

### 3.10 `decision-diagnosis/root-cause-why-chain`
- **Claim:** Iteratively asking "why?" from a symptom reaches a cause which, when addressed, prevents recurrence more reliably than unstructured problem discussion.
- **Construct:** five whys / root-cause analysis.
- **Used by:** five-whys (LB). The spec expects D (practice).
- **Transfer:** **adjacent.** It comes from manufacturing and healthcare RCA practice.
- **Sourcing brief:**
  - *Practice:* Ohno 1988 (Toyota Production System); Serrat 2017.
  - *Critique:* lead: Card 2017 ("The problem with '5 whys'", BMJ Quality & Safety); lead: Peerally, Carr, Waring & Dixon-Woods 2017 ("The problem with root cause analysis"); lead: Kellogg et al. 2017 (RCA in healthcare and recurrence).
  - *Search:* any experiment comparing why-laddering with other RCA methods.
  - *Backfire:* Does a single linear chain stop at an arbitrary depth? Does it end in blaming a person? Does it miss multiple causes?

### 3.11 `decision-diagnosis/tangible-allocation`
- **Claim:** Distributing a fixed budget of tokens across options makes trade-offs and opportunity costs explicit, and yields more differentiated priorities than rating each option independently.
- **Construct:** constant-sum allocation vs independent ratings; opportunity-cost neglect.
- **Used by:** tokens (LB).
- **Transfer:** **analogical.** The survey-method literature (ratings vs rankings) and the opportunity-cost experiments are not physical-token tests.
- **Sourcing brief:**
  - *Evidence:* Alwin & Krosnick 1985; Krosnick & Alwin 1988 (ratings vs rankings, non-differentiation); Frederick, Novemsky, Wang, Dhar & Nowlis 2009 (opportunity-cost neglect); lead: Hauser & Shugan 1980 (constant sum).
  - *Replication check:* search for replications of opportunity-cost neglect (lead: Read, Olivola & Hardisty 2017).
  - *Practice:* dot voting.
  - *Backfire:* Can too many quantities be tokenised at once? Are token counts read as measurements? Does a fixed budget force options to be spread even when one dominates?

### 3.12 `decision-diagnosis/calibration-feedback`
- **Claim:** Making explicit probability forecasts and then receiving outcome feedback or scores improves calibration over successive rounds.
- **Construct:** calibration training; forecasting with scoring rules.
- **Used by:** forecast (LB).
- **Transfer:** **adjacent.** The training studies used many items and formal scoring. Forecast produces a handful of scored predictions per return, so its feedback is noisy.
- **Sourcing brief:**
  - *Seminal:* Lichtenstein & Fischhoff 1980 ("Training for calibration").
  - *Evidence:* Benson & Önkal 1992; Mellers et al. 2014 (Psych Science, forecasting-tournament training); Moore, Swift, Mellers & Tetlock 2017 (multiyear calibration).
  - *Theory/practice:* Tetlock 2005.
  - *Backfire:* How few items are too few to learn from? Does outcome bias lead people to judge forecasts by results (Baron & Hershey 1988)? Does overprecision persist despite feedback?

### 3.13 `decision-diagnosis/hindsight-record`
- **Claim:** After an outcome is known, people misremember their earlier probability estimates as closer to the outcome than they were. A dated, written prediction removes that memory distortion when the forecast is scored.
- **Construct:** hindsight bias (the memory-design "I knew it" effect).
- **Used by:** forecast (LB; the roster's "the written prior is the paper's job").
- **Transfer:** **direct** for the memory-distortion component. **Adjacent** for the benefit of scoring against a record.
- **Sourcing brief:**
  - *Seminal:* Fischhoff 1975; Fischhoff & Beyth 1975.
  - *Synthesis:* Christensen-Szalanski & Willham 1991 meta-analysis; Guilbault, Bryant, Brockway & Posavac 2004 meta-analysis; Roese & Vohs 2012 review.
  - *Replication check:* search for Many Labs coverage.
  - *Backfire:* Even with the record in hand, do people reinterpret it (creeping determinism, outcome bias)? Does seeing one's own earlier estimate reduce hindsight bias, or not?

### 3.14 `decision-diagnosis/reference-class`
- **Claim:** Starting a prediction from the base rate for its reference class ("how often does this kind of thing happen?") improves forecast accuracy compared with starting from the specifics of the case.
- **Construct:** the outside view / reference-class forecasting; base-rate neglect.
- **Used by:** forecast (S; folded from the reference-class candidate).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Kahneman & Tversky 1979 ("Intuitive prediction: biases and corrective procedures"); Kahneman & Lovallo 1993.
  - *Practice/field:* Lovallo & Kahneman 2003; Flyvbjerg 2006.
  - *Evidence:* Buehler, Griffin & Ross 1994 (ignoring past experience); the base-rate component of the Mellers et al. 2014 training.
  - *Backfire:* What happens when the wrong reference class is chosen? Does the base rate over-anchor the estimate (see 3.2)?

---

## 4. `planning-self-regulation.md`

**Items served (6):** commit, woop, timeline, timer, scoresheet (absorbs tracker as the `running` variant), **Sitting**.

| Item | Load-bearing | Supporting | Parameter |
| --- | --- | --- | --- |
| commit | implementation-intentions | intention-announcement (governs the optional "Who I will tell" line) | — |
| woop | mental-contrasting | implementation-intentions (its Plan block is commit's if-then block) | — |
| timeline | task-unpacking | — | — |
| timer | timeboxing | creativity-fixation/time-pressure-divergent | — |
| scoresheet | prior-state-recall · progress-monitoring | — | — |
| Sitting | implementation-intentions · timeboxing · attention-load/phone-presence · attention-load/stop-mid-task | attention-load/resumption-cues | sitting-duration; "≤10 pages" has no claim (design choice) |

**Claim count:** 8. **Sourcing batches:** 1. The Sitting LB list follows §8 (decision 3). With timeboxing expected D, Sitting's displayed grade is expected D. Note that umbrella §7 listed prospective hindsight for Sitting, but §8 does not, so it is not attached here.

### 4.1 `planning-self-regulation/implementation-intentions`
- **Claim:** Forming written if-then plans ("When situation X arises, I will do Y") increases goal attainment compared with forming a goal intention alone.
- **Construct:** implementation intentions.
- **Used by:** commit (LB) · Sitting (LB) · woop (S).
- **Transfer:** **direct.** This is §6.4's example: written if-then plans by adults.
- **Sourcing brief:**
  - *Seminal:* Gollwitzer 1999 (Am Psych).
  - *Synthesis:* Gollwitzer & Sheeran 2006 meta-analysis; Adriaanse et al. 2011 (eating); Bélanger-Gravel, Godin & Amireault 2013 (physical activity).
  - *Tie-break 2 check:* find the most recent meta-analysis that reports bias-corrected estimates.
  - *Field and megastudy:* Milkman, Beshears, Choi, Laibson & Madrian 2011 (vaccination planning prompts); lead: Milkman et al. 2021 (Nature megastudy); lead: Rogers, Milkman, John & Norton 2015.
  - *Backfire:* Do plans for many goals at once dilute the effect? Do rigid plans fail when the cue never occurs?

### 4.2 `planning-self-regulation/intention-announcement`
- **Claim:** Telling others about an identity-relevant intention can substitute for acting on it, reducing the effort invested compared with keeping it private.
- **Construct:** symbolic self-completion; public commitment.
- **Used by:** commit (S): it decides whether the optional, off-by-default "Who I will tell" line is kept (Gate 1 decision 4).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Theory:* Wicklund & Gollwitzer 1982.
  - *Seminal:* Gollwitzer, Sheeran, Michalski & Seifert 2009 (Psych Science, "When intentions go public").
  - *Replication check:* search for pre-registered replications of Gollwitzer et al. 2009.
  - *Counter-evidence:* public commitment increases follow-through (Hollenbeck, Williams & Klein 1989; lead: Klein, Cooper & Monahan 2013 on goal commitment).
  - *Backfire:* Under which conditions does announcing help (non-identity goals, accountability to a specific person) and under which does it hurt?

### 4.3 `planning-self-regulation/mental-contrasting`
- **Claim:** Contrasting a desired future with the inner obstacle that stands in its way, then planning how to meet that obstacle (MCII / WOOP), increases goal attainment compared with positive fantasising, dwelling on obstacles, or planning alone.
- **Construct:** mental contrasting with implementation intentions.
- **Used by:** woop (LB).
- **Transfer:** **direct.** Written WOOP exercises by adults are tested.
- **Sourcing brief:**
  - *Seminal:* Oettingen, Pak & Schnetter 2001; Oettingen 2012 review.
  - *Evidence:* Duckworth, Grant, Loew, Oettingen & Gollwitzer 2011; Kappes & Oettingen 2011 (positive fantasies sap energy).
  - *Synthesis:* lead: Wang et al. 2021 meta-analysis of MCII (Frontiers); search for others and for bias-corrected estimates.
  - *Replication check:* search for pre-registered replications.
  - *Backfire:* When expectations of success are low, does contrasting lead to disengagement? That is by design, but the `helps` text must say so.

### 4.4 `planning-self-regulation/task-unpacking`
- **Claim:** Breaking a task into its ordered component steps before predicting when it will be done reduces optimistic bias in completion-time predictions.
- **Construct:** unpacking; the planning fallacy.
- **Used by:** timeline (LB). The roster expects C/D.
- **Transfer:** **adjacent.** Timeline asks for order and prerequisites but does not ask for a time estimate, while the tested benefit is on estimates.
- **Sourcing brief:**
  - *Seminal:* Buehler, Griffin & Ross 1994 (the planning fallacy); Kruger & Evans 2004 (unpacking).
  - *Evidence:* Forsyth & Burt 2008 (segmentation effect).
  - *Synthesis:* Buehler, Griffin & Peetz 2010 review.
  - *Search:* evidence that explicitly sequencing steps or prerequisites (critical-path style) improves plan execution. Record "none found" if there is none.
  - *Backfire:* Can a step-by-step planning focus *increase* optimism (Buehler & Griffin 2003)? Does unpacking help only for complex multi-step tasks?

### 4.5 `planning-self-regulation/timeboxing`
- **Claim:** Setting a fixed time limit for a phase of work ends deliberation sooner, with no loss of decision quality for convergent tasks.
- **Construct:** timeboxing; deadlines as goals (Parkinson's law).
- **Used by:** timer (LB) · Sitting (LB per §8; the 40-minute default). The spec expects D.
- **Transfer:** **adjacent** at best.
- **Sourcing brief:**
  - *Practice:* Parkinson 1955 (essay).
  - *Evidence:* lead: Bryan & Locke 1967 ("Parkinson's law as a goal-setting phenomenon"); Ariely & Wertenbroch 2002 (self-imposed deadlines).
  - *Time pressure and decision quality:* Edland & Svenson 1993 review; Ordóñez & Benson 1997.
  - *Backfire:* see creativity-fixation/time-pressure-divergent. Does time pressure lower the quality of complex decisions? Are self-imposed deadlines weaker than external ones (Ariely & Wertenbroch)?

### 4.6 `planning-self-regulation/sitting-duration` *(parameter)*
- **Claim:** A single focused working session of about 40 minutes can be sustained without a marked decline in attention or quality for self-directed thinking work.
- **Construct:** sustained attention over a session; vigilance decrement; mental fatigue.
- **Used by:** Sitting (P): the 40-minute default sitting.
- **Transfer:** **analogical.** Lecture-attention and vigilance paradigms differ from self-paced writing.
- **Sourcing brief:**
  - *Evidence:* Wilson & Korn 2007 ("Attention during lectures: beyond ten minutes"); Bradbury 2016 (attention-span review).
  - *Vigilance:* Mackworth 1948; Warm, Parasuraman & Matthews 2008.
  - *Replication check:* ego-depletion RRRs (Hagger et al. 2016; Vohs et al. 2021) as a caution on fatigue claims.
  - *Backfire:* Is there any evidence for a specific duration, or is this a design choice (likely D)?

### 4.7 `planning-self-regulation/progress-monitoring`
- **Claim:** Monitoring progress towards a goal increases goal attainment, and more so when the progress is physically recorded.
- **Construct:** progress monitoring / self-monitoring.
- **Used by:** check-in (LB; Gate 1 decision 5) · Ritual (LB) · scoresheet (LB, especially the `running` variant absorbed from tracker).
- **Transfer:** **adjacent** for check-in and Ritual (weekly written monitoring). **Analogical** for scoresheet (felt quantities within one sitting, not goal progress).
- **Sourcing brief:**
  - *Synthesis:* Harkin et al. 2016 meta-analysis (Psych Bull); extract the moderators "physically recorded", "reported publicly" and monitoring frequency, which ritual-cadence needs; Michie et al. 2009 (self-monitoring as a behaviour-change technique); Burke, Wang & Sevick 2011 review.
  - *Replication check:* search.
  - *Backfire:* Does monitoring undermine intrinsic motivation (Deci, Koestner & Ryan 1999 meta-analysis; Lepper, Greene & Nisbett 1973)? Is the measure gamed once it becomes a target (Goodhart)? Does poor recorded progress lead to discouragement or abandonment?

### 4.8 `planning-self-regulation/prior-state-recall`
- **Claim:** People recall their earlier attitudes, feelings or confidence as closer to their present state than they were, or as fitting their theory of how they must have changed. A written baseline is therefore needed to see real change.
- **Construct:** consistency and change biases in autobiographical memory (implicit theories of stability and change).
- **Used by:** scoresheet (LB) · check-in (LB) · Ritual (LB; "a page identical across returns so change is visible").
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Goethals & Reckman 1973; Ross 1989 (Psych Review, implicit theories).
  - *Evidence:* Conway & Ross 1984; Levine 1997 (recall of past emotions); Levine, Safer & Lench 2006; lead: Wolfe & Williams 2018 (poor metacognitive awareness of belief change).
  - *Replication check:* search.
  - *Backfire:* When the earlier rating is visible, does it anchor the later one and suppress real change (consistency pressure)? That bears on whether scoresheet should hide the "before" column at the "after" rating.

---

## 5. `perspective-emotion.md`

**Items served (3):** perspective-swap (absorbs meeple as the `tent` variant, and self-distancing as a role), check-in, **Ritual**.

| Item | Load-bearing | Supporting | Parameter |
| --- | --- | --- | --- |
| perspective-swap | perspective-taking | perspective-getting (governs the "what would you ask them?" line) · self-distancing · externalisation-embodiment/embodied-perspective (`tent`) | — |
| check-in | planning-self-regulation/progress-monitoring · planning-self-regulation/prior-state-recall | expressive-writing | — |
| Ritual | planning-self-regulation/progress-monitoring · planning-self-regulation/prior-state-recall | expressive-writing (decision 2) | ritual-cadence · ritual-duration |

**Claim count:** 6 (Ritual's and check-in's LB claims live in planning-self-regulation). **Sourcing batches:** 1; this family can pair with another small one.

### 5.1 `perspective-emotion/perspective-taking`
- **Claim:** Deliberately writing out a situation from another party's point of view reduces egocentric bias, and brings out considerations the writer would otherwise miss, compared with considering it only from one's own view.
- **Construct:** perspective-taking.
- **Used by:** perspective-swap (LB).
- **Transfer:** **adjacent.** The studies use negotiation and stereotyping tasks with brief instructed perspective-taking.
- **Sourcing brief:**
  - *Seminal:* Galinsky & Moskowitz 2000.
  - *Evidence:* Galinsky, Maddux, Gilin & White 2008 (negotiation: perspective-taking vs empathy).
  - *Synthesis:* Todd & Galinsky 2014 review; search for a meta-analysis of perspective-taking interventions.
  - *Replication check:* search for pre-registered replications of the stereotyping and negotiation findings.
  - *Backfire:* Can perspective-taking increase selfish behaviour in competitive settings (Epley, Caruso & Bazerman 2006)? Does it fail to improve accuracy about others (see 5.2)?

### 5.2 `perspective-emotion/perspective-getting`
- **Claim:** Imagining another person's perspective does not reliably make you more accurate about what they think. Asking them does.
- **Construct:** perspective mistaking vs perspective getting.
- **Used by:** perspective-swap (S): it justifies the roster's closing line "what would you ask them?" and the read-back caveat.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Eyal, Steffel & Epley 2018 (JPSP, "Perspective mistaking", many experiments).
  - *Theory/practice:* Epley 2014 (*Mindwise*).
  - *Replication check:* search for independent replications or critiques.
  - *Backfire:* Does asking fail when the other person lacks insight or has reasons to mislead?

### 5.3 `perspective-emotion/self-distancing`
- **Claim:** Reflecting on one's own situation from a distanced perspective (third person, or "me in a year") reduces emotional reactivity and supports wiser reasoning, compared with a first-person immersed view.
- **Construct:** self-distancing (spatial, temporal and linguistic).
- **Used by:** perspective-swap (S; the self-distanced role, folded from the self-distancing candidate).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Kross & Ayduk 2011 review.
  - *Evidence:* Kross et al. 2014 (self-talk); Grossmann & Kross 2014 (Solomon's paradox); Bruehlman-Senecal & Ayduk 2015 (temporal distancing).
  - *Synthesis:* lead: Powers & LaBar 2019 meta-analysis of distancing.
  - *Replication check:* search for pre-registered replications of the self-talk and Solomon's-paradox findings.
  - *Backfire:* Can distancing become avoidance? Does it blunt emotions that carry needed information?

### 5.4 `perspective-emotion/expressive-writing`
- **Claim:** Writing about emotional experiences produces small improvements in wellbeing and health outcomes compared with neutral writing.
- **Construct:** expressive writing.
- **Used by:** check-in (S; Gate 1 decision 5) · Ritual (S; decision 2).
- **Transfer:** **analogical.** The canonical protocol is 3–4 consecutive days of 15–20 minutes on emotional topics. Check-in is a weekly, 10-minute page with fixed rows.
- **Sourcing brief:**
  - *Seminal:* Pennebaker & Beall 1986.
  - *Synthesis:* Smyth 1998 meta-analysis; Frattaroli 2006 meta-analysis (Psych Bull; extract the dose moderators for ritual-duration); lead: Reinhold, Bürkner & Holling 2018 (depression); Baikie & Wilhelm 2005 review.
  - *Tie-break 2 check:* bias-corrected estimates.
  - *Backfire:* Can writing about feelings feed rumination? Who is harmed, for example by writing about very recent trauma?

### 5.5 `perspective-emotion/ritual-cadence` *(parameter)*
- **Claim:** Monitoring and reflecting once a week is frequent enough to obtain most of the benefit of progress monitoring, without the adherence drop-off of daily monitoring.
- **Construct:** monitoring frequency; adherence to self-monitoring.
- **Used by:** Ritual (P): the weekly default cadence.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Evidence:* the frequency moderator in Harkin et al. 2016 (shared with 4.7); Burke et al. 2011 on self-monitoring adherence; search for studies of self-monitoring adherence decay.
  - *Backfire:* Is weekly too sparse to show within-week change? Is there evidence for any specific cadence, or is this a design choice?

### 5.6 `perspective-emotion/ritual-duration` *(parameter)*
- **Claim:** A reflective writing session of ten minutes or less is enough to obtain the benefits of monitoring and reflective writing.
- **Construct:** dose in expressive writing and reflection.
- **Used by:** Ritual (P): ≤10 minutes.
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Evidence:* the session-length moderator in Frattaroli 2006; lead: Burton & King 2008 ("the two-minute miracle", very brief writing).
  - *Backfire:* Do the moderator data favour *longer* sessions? If so, the parameter becomes a design choice traded against adherence.

---

## 6. `attention-load.md`

**Items served (3):** the dashboard preset (of zones), player-aid, cover. It also covers the cover's how-to claims: "Put your phone in another room" and "Stop when the timebox ends, even mid-sentence".

| Item | Load-bearing | Supporting |
| --- | --- | --- |
| dashboard (preset of zones) | inherits zones (common-region) + cognitive-offload | resumption-cues |
| player-aid | cognitive-offload · job-aid | — |
| cover | goal-orientation | phone-presence (the phone line) · stop-mid-task (the mid-sentence line) · resumption-cues (fallback wording) |

These claims are also referenced from Sitting (phone-presence LB, stop-mid-task LB, resumption-cues S), question-queue (cognitive-offload LB), brain-dump (cognitive-offload S) and return-checklist (job-aid LB).

**Claim count:** 6. **Sourcing batches:** 1; this family can pair with reading-review.

### 6.1 `attention-load/cognitive-offload`
- **Claim:** Keeping task-relevant information in a stable, visible external store, rather than in working memory, improves performance on the concurrent task, at the cost of weaker memory for the offloaded content.
- **Construct:** cognitive offloading (working-memory offload).
- **Used by:** player-aid (LB) · dashboard (LB; Gate 1: "dashboard's working-memory claim") · question-queue (LB) · brain-dump (S).
- **Transfer:** **adjacent.** Lab tasks involve writing down or externally storing items during a concurrent task.
- **Sourcing brief:**
  - *Synthesis:* Risko & Gilbert 2016 (TiCS, "Cognitive offloading").
  - *Evidence:* Gilbert 2015 (intention offloading); Storm & Stone 2015 (saving-enhanced memory); lead: Grinschgl, Papenmeier & Meyerhoff 2021.
  - *Theory:* Clark & Chalmers 1998; Hutchins 1995; Sweller 1988 (all seeds from GROUNDING.md).
  - *Replication check:* Sparrow, Liu & Wegner 2011 ("Google effects") in the Social Sciences Replication Project (lead: Camerer et al. 2018); confirm the result.
  - *Backfire:* Does offloaded content go unlearned? Does keeping the store up to date become a second job, as dashboard's existing backfire text says?

### 6.2 `attention-load/job-aid`
- **Claim:** A checklist or reference card kept at hand reduces omissions in multi-step or rule-governed tasks compared with relying on memory.
- **Construct:** job aids / checklists; omission errors.
- **Used by:** player-aid (LB) · reading-review/return-checklist (LB).
- **Transfer:** **analogical.** The evidence comes from surgery, aviation and maintenance procedures, not from a thinking session's conventions or a photo-return step.
- **Sourcing brief:**
  - *Evidence:* Haynes et al. 2009 (NEJM surgical checklist); lead: Reason 2002 (omission errors and reminders).
  - *Synthesis:* Hales & Pronovost 2006 review.
  - *Practice:* Degani & Wiener 1993 (cockpit checklists); Gawande 2009.
  - *Replication check:* Urbach et al. 2014 (NEJM, Ontario, no effect); treat it as a large replication of the surgical-checklist claim.
  - *Backfire:* Can a checklist replace judgement? Does ticking without checking set in (checklist complacency)?

### 6.3 `attention-load/goal-orientation`
- **Claim:** Stating at the outset the specific question a session must answer improves the relevance and focus of the work, compared with starting without a stated goal.
- **Construct:** goal specificity; advance organisers; learning objectives.
- **Used by:** cover (LB; "the question is the contract").
- **Transfer:** **analogical.**
- **Sourcing brief:**
  - *Seminal:* Ausubel 1960 (advance organisers); Locke & Latham 2002 (goal-setting); lead: Rothkopf & Billington 1979 (goal-guided learning).
  - *Synthesis:* Luiten, Ames & Ackerson 1980 and Stone 1983 meta-analyses of advance organisers.
  - *Backfire:* Does a stated goal improve goal-relevant work at the expense of incidental discovery (Rothkopf & Billington: learning of non-objective material falls)? Can an early, narrow question lock in the wrong problem?

### 6.4 `attention-load/phone-presence`
- **Claim:** Having one's smartphone within reach, even silent and face down, reduces available cognitive capacity, and moving it to another room restores that capacity.
- **Construct:** the "brain drain" / mere-presence effect of smartphones.
- **Used by:** Sitting (LB per §8) · cover (S; its "Put your phone in another room" line follows this grade).
- **Transfer:** **adjacent.** Tested with working-memory and fluid-intelligence tasks in the lab, not self-directed writing.
- **Sourcing brief:**
  - *Seminal:* Ward, Duke, Gneezy & Bos 2017 (JACR, "Brain drain"); Thornton, Faires, Robbins & Rollins 2014.
  - *Replication check:* leads: Hartmann, Martarelli, Reber & Rothen 2020; Ruiz Pardo & Minda 2022, both reported as failing. Search for others.
  - *Synthesis:* lead: a 2023 meta-analysis of the brain-drain effect (Böttger, Poschik & Zierer); search for others.
  - *Adjacent alternative:* notifications disrupt attention even when ignored (Stothart, Mitchum & Yehnert 2015). If mere presence fails, the line could be re-grounded on interruption.
  - *Backfire:* Does separation anxiety cost more than the phone's presence for heavy users (lead: Hartanto & Yang 2016)?

### 6.5 `attention-load/stop-mid-task`
- **Claim:** Ending a work session in the middle of a unit of work, such as mid-sentence, rather than at a natural break, increases the likelihood and ease of resuming the work at the next session.
- **Construct:** the resumption tendency after interruption (Ovsiankina effect); the Zeigarnik effect.
- **Used by:** Sitting (LB per §8; the spec expects C/D) · cover (S; its "Stop when the timebox ends, even mid-sentence" line follows this grade, and falls back to resumption-cues wording if it fails).
- **Transfer:** **analogical.** The lab studies interrupt short tasks, whereas here a thinking session is stopped until the next return.
- **Sourcing brief:**
  - *Seminal:* Zeigarnik 1927 (recall advantage); Ovsiankina 1928 (resumption).
  - *Review:* Butterfield 1964 (the recall advantage is inconsistent).
  - *Synthesis:* lead: Ghibellini & Meier, a recent meta-analysis reported to find no Zeigarnik memory advantage but support for Ovsiankina resumption.
  - *Practice:* the Hemingway "stop mid-sentence" writing advice.
  - *Backfire:* Do open tasks intrude and cause rumination (Masicampo & Baumeister 2011)? That is in tension with brain-dump's offload claim.

### 6.6 `attention-load/resumption-cues`
- **Claim:** Leaving a visible cue of where you were and what comes next at the point of interruption reduces the time and errors involved in resuming a task.
- **Construct:** memory for goals; resumption lag.
- **Used by:** dashboard (S) · Sitting (S; the fallback basis for rewording "stop mid-sentence" as a resumption aid, per §8) · cover (S).
- **Transfer:** **analogical to adjacent.** Lab interruptions last seconds to minutes, while Longhand's gaps last until the next session.
- **Sourcing brief:**
  - *Seminal:* Altmann & Trafton 2002 ("Memory for goals"); Trafton, Altmann, Brock & Mintz 2003.
  - *Evidence:* Monk, Trafton & Boehm-Davis 2008; Hodgetts & Jones 2006.
  - *Replication check:* search.
  - *Backfire:* Do cues decay in value over long gaps? Does writing the cue itself cost time the lab studies didn't measure?

---

## 7. `reading-review.md`

**Items served (4):** return-checklist, sheet (internal; the base for `proof`), **Proof**, and the **proof-actions** protocol.

| Item | Load-bearing | Supporting | Parameter |
| --- | --- | --- | --- |
| return-checklist | attention-load/job-aid | — | — |
| sheet (internal) | paper-vs-screen | automation-bias | — |
| Proof | automation-bias · paper-vs-screen · proofreading-marks | consistent-mapping | none with a claim: ≤10 pages per proof, numbered paragraphs, and confirmation for research-cost actions are all design choices (D) per §8 |
| proof-actions (protocol) | proofreading-marks · consistent-mapping | — | — |

**Claim count:** 4. **Sourcing batches:** 1; this family can pair with attention-load. Proof's LB list follows §8. With proofreading-marks expected D, Proof's displayed grade is expected D (decision 3).

### 7.1 `reading-review/paper-vs-screen`
- **Claim:** Reading on paper yields better comprehension than reading the same text on a screen, especially for expository text read under time limits.
- **Construct:** the screen inferiority effect.
- **Used by:** sheet (LB) · Proof (LB).
- **Transfer:** **adjacent.** The studies test comprehension, whereas Proof is critical review and error-finding in AI drafts.
- **Sourcing brief:**
  - *Synthesis:* Delgado, Vargas, Ackerman & Salmerón 2018 meta-analysis; Clinton 2019 meta-analysis; Kong, Seo & Zhai 2018 meta-analysis; search for later updates.
  - *Evidence:* Ackerman & Goldsmith 2011 (metacognitive regulation on screen); Mangen, Walgermo & Brønnick 2013.
  - *Search:* evidence on proofreading or error detection on paper vs screen specifically.
  - *Backfire:* Is the effect small? Does it vanish for narrative text, or when reading is untimed? Does it shrink with screen familiarity?

### 7.2 `reading-review/automation-bias`
- **Claim:** People reviewing automated or AI output accept its errors at elevated rates, both acting on wrong outputs (commission) and missing unflagged problems (omission). Interventions that force active evaluation reduce this overreliance.
- **Construct:** automation bias and complacency; cognitive forcing.
- **Used by:** Proof (LB) · sheet (S).
- **Transfer:** **adjacent.** Most evidence is from decision aids in aviation and healthcare; newer work covers AI assistants.
- **Sourcing brief:**
  - *Seminal:* Mosier, Skitka, Heers & Burdick 1998; Parasuraman & Manzey 2010 (Human Factors).
  - *Synthesis:* Goddard, Roudsari & Wyatt 2012 systematic review; Lyell & Coiera 2017 systematic review.
  - *Mitigation:* Skitka, Mosier & Burdick 2000 (accountability); lead: Buçinca, Malaya & Gajos 2021 (cognitive forcing functions reduce overreliance on AI).
  - *Search:* recent experiments on reviewing LLM output.
  - *Backfire:* Do forcing functions reduce overreliance but annoy users, so they are abandoned (Buçinca et al.)? Can marking become rubber-stamping?

### 7.3 `reading-review/proofreading-marks`
- **Claim:** A fixed, shared set of marks, each mapped to one editing action, is used reliably by writers and editors to communicate corrections on paper.
- **Construct:** proofreaders' marks as a mark → action convention.
- **Used by:** proof-actions protocol (LB) · Proof (LB per §8). The spec expects D (practice).
- **Transfer:** **adjacent.** Human editors apply the marks, whereas in Longhand an agent executes them.
- **Sourcing brief:**
  - *Practice:* BS 5261-2 (verify the edition and title from the BSI catalogue; use the `isbn` or `url` source form); Chicago Manual of Style (proofreading marks).
  - *Search:* any study of comprehension or accuracy of proofreading marks. Record "none found (searched: …)" if there is none.
  - *Backfire:* Are marks misread or ambiguous (for example, a stray circle)? Does an agent applying marks literally lose editorial judgement?

### 7.4 `reading-review/consistent-mapping`
- **Claim:** Keeping each mark's or colour's meaning constant across contexts leads to faster, more accurate use than mappings that change with context, which provoke mode errors.
- **Construct:** consistent vs varied mapping (automaticity); mode errors.
- **Used by:** proof-actions protocol (LB; umbrella decision D7: proof actions derive from the existing colour meanings) · Proof (S) · externalisation-embodiment/colour-language (S; "fixed and universal across every artifact").
- **Transfer:** **analogical.**
- **Sourcing brief:**
  - *Seminal:* Schneider & Shiffrin 1977 and Shiffrin & Schneider 1977 (consistent vs varied mapping); Norman 1981 (action slips and mode errors); lead: Fitts & Seeger 1953 (stimulus-response compatibility).
  - *Human factors:* Sarter & Woods 1995 (mode awareness).
  - *Backfire:* Does a fixed mapping that fits one page poorly (for example, "go deeper" on green in a list of risks) cause misuse?

---

## 8. `externalisation-embodiment.md`

**Items served (11, plus one collection-level claim):** brain-dump, card-sort, node-map, zones, the zones presets (playmat, now-next-later, start-stop-continue, kanban, business-model-canvas, lean-canvas), the **colour-language** protocol, and the collection-level handwriting vs typing claim. (The dashboard preset is covered in attention-load.)

| Item | Load-bearing | Supporting |
| --- | --- | --- |
| brain-dump | unfulfilled-goal-offload · free-listing-salience | attention-load/cognitive-offload |
| card-sort | epistemic-action · sorting-elicitation | common-region |
| node-map | concept-mapping · causal-diagramming | — |
| zones (base) | common-region | — |
| playmat (preset) | inherits zones + spatial-externalisation | epistemic-action |
| now-next-later · start-stop-continue · kanban · business-model-canvas · lean-canvas (presets) | inherit zones; no preset-specific claim | — |
| colour-language (protocol) | colour-coding-search · redundant-coding | reading-review/consistent-mapping |
| collection level (see decision 1) | — | handwriting-vs-typing (no item carries it as LB) |

Other items that use claims from this family:

- tokens uses epistemic-action (S);
- matrix-2x2 uses common-region (S);
- perspective-swap uses embodied-perspective (S);
- the confidence-dots protocol uses redundant-coding (LB).

**Claim count:** 12. **Sourcing batches:** 1, at the cap.

### 8.1 `externalisation-embodiment/unfulfilled-goal-offload`
- **Claim:** Writing down unfinished tasks and concerns, with at least a next step for each, reduces their intrusion into attention during later work. Listing them without any plan does not.
- **Construct:** the cognitive effects of unfulfilled goals; offload by plan-making.
- **Used by:** brain-dump (LB).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Masicampo & Baumeister 2011 (JPSP, "Consider it done!").
  - *Evidence:* Scullin, Krueger, Ballard, Pruett & Bliwise 2018 (to-do list before bed); Ramirez & Beilock 2011 (Science, writing about worries before an exam).
  - *Replication check:* search for replications of Masicampo & Baumeister and of Ramirez & Beilock. Record any failures as tie-break 1 inputs.
  - *Backfire:* Does dumping without sorting or planning just move the fog onto paper, as the roster says and as the no-plan condition in the original study suggests? Can worry-writing increase rumination?

### 8.2 `externalisation-embodiment/free-listing-salience`
- **Claim:** When people freely list what they know or think about a domain, the items they list earlier and more often are the ones most salient to them.
- **Construct:** free-listing salience (output order and frequency).
- **Used by:** brain-dump (LB: the read-back "read for themes and repetition … recurrence is salience" relies on it).
- **Transfer:** **adjacent.** Anthropology and category-norm free listing of a domain differs from dumping one's own current concerns.
- **Sourcing brief:**
  - *Seminal:* Bousfield & Barclay 1950 (output order); Romney & D'Andrade 1964.
  - *Methods:* Battig & Montague 1969 (output dominance norms); lead: Smith 1993 (salience index); Quinlan 2005 (Field Methods).
  - *Backfire:* Does output order track accessibility (recency, fluency, rumination) rather than importance? Does the read-back mistake a loop for a priority?

### 8.3 `externalisation-embodiment/epistemic-action`
- **Claim:** Physically rearranging external objects to think, rather than to reach a physical goal, reduces the cognitive cost of a problem and improves or speeds its solution compared with manipulating the same elements mentally.
- **Construct:** epistemic action; interactivity in problem solving.
- **Used by:** card-sort (LB) · tokens (S) · playmat (S).
- **Transfer:** **analogical.** This is §6.4's own example: Tetris rotations applied to rearranging cards.
- **Sourcing brief:**
  - *Seminal:* Kirsh & Maglio 1994; Kirsh 1995 ("The intelligent use of space").
  - *Evidence:* lead: Vallée-Tourangeau, Steffensen, Vallée-Tourangeau & Sirota 2016 (insight with manipulable objects); lead: Guthrie & Vallée-Tourangeau 2015 (arithmetic with tokens).
  - *Theory:* Clark & Chalmers 1998.
  - *Replication check:* search for replications of the interactivity advantage.
  - *Backfire:* Does manipulation cost time? Are the benefits confined to problems with a spatial structure?

### 8.4 `externalisation-embodiment/sorting-elicitation`
- **Claim:** Having people sort items into their own groups reveals the categories and dimensions they actually use, including ones they cannot readily state.
- **Construct:** card sorting as knowledge elicitation.
- **Used by:** card-sort (LB).
- **Transfer:** **adjacent.** Elicitation by a researcher differs from self-insight read back by an agent.
- **Sourcing brief:**
  - *Seminal:* Chi, Feltovich & Glaser 1981 (experts sort by deep principles, novices by surface features).
  - *Methods:* Rugg & McGeorge 1997/2005 (card-sort tutorial); Coxon 1999; Spencer 2009 (practice).
  - *Search:* evidence that sorting surfaces tacit categories better than interviews.
  - *Backfire:* Do the printed column headings impose categories that aren't the person's own? Does the first sort anchor later ones? Does the result look falsely tidy?

### 8.5 `externalisation-embodiment/common-region`
- **Claim:** Items placed inside the same bounded region are perceived as belonging together, even against other grouping cues, so labelled zones make category membership readable at a glance.
- **Construct:** the Gestalt principle of common region (perceptual grouping).
- **Used by:** zones (LB: the Gate 1 "shared structural claim"), and through inheritance every zones preset · matrix-2x2 (S) · card-sort (S).
- **Transfer:** **adjacent.** Studies use simple shapes in drawn regions, whereas zones hold sticky notes and cards in printed boxes. The claim also serves the agent's read-back of the photo.
- **Sourcing brief:**
  - *Seminal:* Palmer 1992 (Cognitive Psychology, "Common region").
  - *Synthesis:* Wagemans et al. 2012 (Psych Bull, a century of Gestalt).
  - *Search:* applied work on common region in layouts and forms.
  - *Backfire:* Are items straddling a border ambiguous? The read-back already uses these ("stuck between zones"). Can region grouping override meaningful proximity?

### 8.6 `externalisation-embodiment/spatial-externalisation`
- **Claim:** Assigning categories to fixed places on a surface lets people keep track of and retrieve which items belong where with less effort than holding the categories in mind or in a list.
- **Construct:** spatial externalisation; memory for location.
- **Used by:** playmat (LB; Gate 1: "playmat's spatial-externalisation claim" attaches to its preset).
- **Transfer:** **analogical.**
- **Sourcing brief:**
  - *Seminal:* Kirsh 1995; lead: Malone 1983 ("How do people organize their desks?").
  - *Evidence:* Andrews, Endert & North 2010 ("Space to think"); lead: Rothkopf 1971 (memory for the location of information on a page).
  - *Analogical:* method of loci (lead: Twomey & Kroneisen 2021 meta-analysis).
  - *Backfire:* When the categories are not really distinct, does the mat freeze a premature taxonomy (existing backfire text)?

### 8.7 `externalisation-embodiment/concept-mapping`
- **Claim:** Building a concept map, made of nodes joined by labelled links, improves understanding and retention compared with reading, listing or outlining the same material.
- **Construct:** concept mapping.
- **Used by:** node-map (LB).
- **Transfer:** **adjacent.** The literature is about learning from text, whereas node-map is often used to structure a problem (roster).
- **Sourcing brief:**
  - *Seminal:* Novak & Gowin 1984 (practice/theory).
  - *Synthesis:* Nesbit & Adesope 2006 meta-analysis (RER); Schroeder, Nesbit, Anguiano & Adesope 2018 meta-analysis (Ed Psych Review).
  - *Replication/contrast:* Karpicke & Blunt 2011 (retrieval practice beat concept mapping), together with its replications and critiques (lead: Lechuga, Ortega-Tudela & Gómez-Ariza 2015).
  - *Backfire:* Is the time cost high? Do dense maps photograph poorly, supporting the roster's node cap? Do vague link labels such as "relates to" cancel the benefit?

### 8.8 `externalisation-embodiment/causal-diagramming`
- **Claim:** Drawing a diagram of the causal relations in a problem improves causal reasoning about it compared with reasoning from text alone.
- **Construct:** learner-generated diagrams and drawing; causal mapping.
- **Used by:** node-map (LB; its verb-labelled edges: causes, blocks, needs, decides).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Evidence:* lead: Easterday, Aleven & Scheines 2007 (diagram tools and causal reasoning); Ainsworth, Prain & Tytler 2011 (Science, drawing to learn).
  - *Synthesis:* lead: Fiorella & Zhang 2018 meta-analysis of drawing as a learning strategy; Van Meter & Garner 2005 review.
  - *Practice/theory:* Axelrod 1976; Eden 1988 (cognitive and causal maps).
  - *Backfire:* Can a drawn causal map feel like understanding without being accurate (compare memory-retrieval/explanatory-depth)?

### 8.9 `externalisation-embodiment/colour-coding-search`
- **Claim:** Colour-coding items by category speeds finding the items of a target category and improves accuracy, compared with uncoded material, when the reader knows the code. The benefit falls as the number of colours grows.
- **Construct:** colour coding in visual search.
- **Used by:** colour-language protocol (LB; "colour coding as a recoverable second channel", §8).
- **Transfer:** **adjacent.** The evidence comes from display research. Here the ink is handwritten on paper, and the readers are the person flipping back and the agent reading the photo.
- **Sourcing brief:**
  - *Seminal:* lead: Christ 1975 (Human Factors review of colour-coding research).
  - *Evidence:* Green & Anderson 1956.
  - *Textbook:* Wickens and colleagues (engineering psychology).
  - *Text highlighting:* Fowler & Barker 1974; lead: Ponce, Mayer & Méndez 2022 meta-analysis of highlighting; Dunlosky et al. 2013 (low utility as a *learning* strategy).
  - *Backfire:* Do eight roles exceed the number of reliably distinguishable colours? Do colours without a learned meaning add clutter? Does the Crux highlighter invite passive over-highlighting?

### 8.10 `externalisation-embodiment/redundant-coding`
- **Claim:** Coding a category in two channels at once, colour plus letter or glyph, keeps it identifiable when one channel fails (colour-vision deficiency, poor light, a mono print or photo) and improves identification over colour alone.
- **Construct:** redundant coding (redundancy gain); accessibility of colour use.
- **Used by:** colour-language protocol (LB; "letters are the floor, colour is an accelerator") · confidence-dots protocol (LB; "survives colour-blindness and bad photos").
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Standard (practice):* WCAG 2.x SC 1.4.1, Use of Color (use the `url` source form).
  - *Theory/evidence:* lead: Garner 1974 (redundancy gain); the human-factors textbook treatment of redundant coding.
  - *Prevalence:* lead: Birch 2012 (worldwide prevalence of red-green colour deficiency).
  - *Backfire:* Does double coding cost writing time or clutter the page? Does the letter fallback get skipped once people have pens?

### 8.11 `externalisation-embodiment/handwriting-vs-typing` *(collection level; contested)*
- **Claim:** Writing by hand rather than typing improves conceptual understanding and recall of the material written.
- **Construct:** longhand vs laptop note-taking; the encoding effects of handwriting.
- **Used by:** collection level only (decision 1). It underpins the roster's point-2 "baseline pass" for writing pages, but is not LB on any item.
- **Transfer:** **adjacent.** The literature is lecture note-taking and word or letter learning. Longhand is working one's own problem on a page.
- **Sourcing brief:**
  - *Seminal:* Mueller & Oppenheimer 2014 (Psych Science).
  - *Replication check:* Morehead, Dunlosky & Rawson 2019 (Ed Psych Review; a replication with no reliable advantage); lead: Urry et al. 2021 (Psych Science, pre-registered direct replication). Apply tie-break 1 if these fail.
  - *Synthesis:* lead: Voyer, Ronis & Byers 2022 meta-analysis; lead: Flanigan et al. 2024 meta-analysis of typed vs handwritten lecture notes.
  - *Adjacent:* Longcamp, Zerbato-Poudou & Velay 2005 (children's letter learning); Mangen et al. 2015; lead: van der Meer & van der Weel 2024 (EEG; contested).
  - *Backfire:* Does typing let people write more, which itself predicts better outcomes? Did the verbatim-transcription mediator fail to replicate? GROUNDING.md already flags the claim as task-dependent, not settled.

### 8.12 `externalisation-embodiment/embodied-perspective`
- **Claim:** Physically placing a figure at, or standing in, another party's position increases adoption of that party's perspective, compared with imagining it.
- **Construct:** embodied (spatial) perspective-taking; chair work.
- **Used by:** perspective-swap (S; the `tent` variant absorbed from meeple, whose embodiment claim became supporting).
- **Transfer:** **analogical.** The evidence is spatial perspective-taking and clinical chair work, not social perspective in a workbook.
- **Sourcing brief:**
  - *Evidence:* lead: Tversky & Hard 2009 (spatial perspective-taking when a body is present); lead: Kessler & Thomson 2010.
  - *Theory:* Barsalou 2008 (grounded cognition).
  - *Clinical:* lead: Paivio & Greenberg 1995 (empty-chair dialogue).
  - *Replication caution:* high-profile embodiment effects that failed large replications (power posing, e.g. Ranehill et al. 2015; the facial-feedback RRR, Wagenmakers et al. 2016) set the prior.
  - *Backfire:* Can it become role-play theatre that produces sympathy without insight (meeple's existing backfire text)?

---

## 9. Summary

### 9.1 Counts and sourcing effort

| Family | Items | Claims (unique) | LB · S · P | Batches (≤12) | Estimated sourcing effort |
| --- | --- | --- | --- | --- | --- |
| memory-retrieval | 5 | 16 | 8 · 5 · 3 | 2 (MR-A 10, MR-B 6) | **High.** Dense literature with many meta-analyses, so it is easy to find but high in volume. The Cepeda ridgeline extraction and the expanding-vs-uniform comparison need careful reading. |
| creativity-fixation | 5 | 12 | 11 · 0 · 1 | 1 | **High.** Scattered design and creativity literature, contested replications (incubation, sleep, walking), and at least one claim likely to find no direct test (bad-ideas-criterion). |
| decision-diagnosis | 12 | 14 | 12 · 2 · 0 | 2 (DD-A 8, DD-B 6) | **High.** A broad judgement-and-decision-making literature, several practice-only claims (assumption-surfacing, root-cause-why-chain), and a newer effect (mere-urgency) needing replication search. |
| planning-self-regulation | 6 | 8 | 6 · 1 · 1 | 1 | **Medium.** Strong meta-analyses (implementation intentions, MCII, Harkin); publication-bias checks needed; timeboxing is thin. |
| perspective-emotion | 3 | 6 | 1 · 3 · 2 | 1 | **Medium-low.** Well-mapped literatures; the key task is extracting moderators (Frattaroli dose, Harkin frequency). |
| attention-load | 3 | 6 | 5 · 1 · 0 | 1 | **Medium.** The phone-presence replication debate and the Zeigarnik/Ovsiankina meta-analysis need care. |
| reading-review | 4 | 4 | 4 · 0 · 0 | 1 | **Low.** Clear meta-analyses; the BS 5261 check is a catalogue lookup. |
| externalisation-embodiment | 11 (+ collection) | 12 | 10 · 2 · 0 (handwriting counted as S) | 1 | **High.** Theory-heavy and analogical, with the contested handwriting literature and several leads to verify. |
| **Total** | **49** (30 components · 11 presets · 5 styles · 3 protocols) | **78** | 57 · 14 · 7 | **10** | |

*LB · S · P counts each claim by its strongest role on any item. For example, cognitive-offload counts as LB even though it is S for brain-dump.*

**Batching against the cost ceiling (§12: 8 sourcing runs).** Ten family batches exceed the ceiling. To stay at eight runs, pair the small batches:

- MR-B (6) + reading-review (4) = 10;
- perspective-emotion (6) + attention-load (6) = 12.

Each run still writes its claims to the owning family file. The eight runs are MR-A, MR-B + RR, CF, DD-A, DD-B, PSR, PE + AL and EE.

### 9.2 Items with no defensible load-bearing claim (candidates for an honest D)

"No defensible claim" here means that every LB claim identified is practice-only, theory-only, or analogical with no tested analogue close to the use.

| Item | Why | Likely outcome |
| --- | --- | --- |
| **five-whys** | The only LB claim (root-cause-why-chain) rests on Toyota practice and RCA critiques; no experiment is known. | D, labelled (as the spec expects) |
| **matrix-2x2** (and its four presets through inheritance; eisenhower adds mere-urgency) | two-axis-mapping is diagram theory plus graphical-perception findings; nothing tests placing options in a 2×2. | D or C, analogical |
| **return-checklist** | Its only LB claim (job-aid) transfers from surgery and aviation checklists to a photo-return step, and the surgical evidence includes a large null (Ontario). | D, as the roster expects |
| **proof-actions** (protocol) | proofreading-marks is a practice standard; consistent-mapping is analogical lab evidence. | D, labelled |
| **zones presets without their own claim** (now-next-later, start-stop-continue, kanban, business-model-canvas, lean-canvas, swot, impact-effort, power-interest) | These are not D candidates as such: they inherit their base's grade. They have no preset-specific finding, and none should be invented. | inherit base |

Items that do have defensible LB claims but carry one LB claim likely to be practice-only, which on §6.3 fixes their displayed grade at D:

- **ten-bad-ideas** (bad-ideas-criterion);
- **assumption-audit** (assumption-surfacing; see decision 5);
- **timer** (timeboxing);
- **Sitting** (timeboxing; decision 3);
- **Proof** (proofreading-marks; decision 3).

**Style parameters with no claim.** Per §8 these are design choices (D), to be labelled in the grading report:

- Sitting: ≤10 pages;
- Proof: ≤10 pages per proof, numbered paragraphs, and confirmation before research-cost actions;
- Incubation: printing both halves together, with the second marked *after the break*.

**Outside §8's protocol list, so no claims were drafted.** The lead should decide whether these need grounding:

- the `structural-marks` and `page-ids` protocols;
- the cover how-to lines "Work in ink, in the colour language" and "Cross out, don't erase".

---

## 10. Lead rulings (2026-09-25)

1. Handwriting vs typing: collection level. `grounding.json` gains a top-level `collection` key. apply-grounding must accept it (sub-project 2 script work).
2. Ritual: expressive writing is **supporting**, matching Gate 1 decision 5.
3. Style LB lists stay literal to §8. No claim is reclassified to escape a D. A claim is reclassified only if sourcing shows the style's mechanism does not depend on it, and the grading report must name any such change.
4. Series `expanding-vs-uniform`: reclassified to **P** (parameter). §8 says to pick the better-graded option, and the style's mechanism is spacing plus retrieval, not the schedule shape.
5. Assumption-audit: `consider-the-opposite` becomes **LB**, because the falsifier column is the page's mechanism (the Gate 1 check-in precedent).
6. Zones: the shared structural claim is common region. Confirmed.
7. Question-queue: also uses attention-load/cognitive-offload (LB). Confirmed.
8. DOI verification: until `scripts/check-dois.ts` exists, sourcing agents verify each DOI against the Crossref REST API directly. `check-dois` re-verifies everything once it lands.
9. Sourcing output: each of the 8 batches writes `research/sourcing/<batch>.md` (§5.1 note sections) and `<batch>.json` (§7.1 blocks). Batches that share a family file are merged into `research/<family>.md` at grading time.

---

## 11. Gate 1b additions (2026-09-25)

These are the claims for the items admitted at Gate 1b (roster.md §8–§9). The same conventions apply: every paper named is a lead to verify, and none of these is a citation. Each claim is numbered into its owning family, so the family files merge as §10 ruling 9 describes. All 12 are sourced as one batch, **GB**, which is at the cap.

**Items served:**

| Item | Load-bearing | Supporting | Notes |
| --- | --- | --- | --- |
| small-experiment | planning-self-regulation/graduated-self-experiment | — | Allowed only in styles with a return. |
| goal-factoring | planning-self-regulation/goal-decomposition | — | The `aversion` variant adds graduated-self-experiment (S) for the internal fixes it routes on. |
| frame-by-frame | decision-diagnosis/chain-analysis | planning-self-regulation/implementation-intentions (the forgetting-type fixes) | |
| worst-case | perspective-emotion/decatastrophizing | planning-self-regulation/prior-state-recall (the before/after magnitude rating) | |
| practice-audit | memory-retrieval/practice-specificity | — | Series only. |
| forecast `duration` | decision-diagnosis/duration-feedback | planning-self-regulation/task-unpacking · decision-diagnosis/calibration-feedback | This variant alone is allowed in a one-off Sitting. |
| pre-mortem `iterate` | inherits 3.3, 3.4 | — | The surprise-gate loop is a design choice (D). Never print "each cycle halves the odds". |
| commit `policy` | commit's own LB, plus planning-self-regulation/choice-bracketing for this variant | — | |
| perspective-swap `two-sides` | perspective-emotion/intrapersonal-goal-conflict for this variant | perspective-emotion/self-distancing | Do not cite Internal Family Systems. |
| scoresheet `domains` | perspective-emotion/domain-satisfaction for this variant | planning-self-regulation/prior-state-recall | The claim grounds the measure, not a benefit. |
| tokens `countdown` | planning-self-regulation/goal-gradient for this variant | — | |
| check-in gratitude row | — | perspective-emotion/gratitude | The row is optional and off by default. |
| Sitting | (unchanged) | attention-load/task-switching (one move per page) · attention-load/resumption-cues (the Saving State closing line) | |
| Ritual | (unchanged) | attention-load/resumption-cues (the Saving State closing line) | |

A variant's own LB claim sits beside the base item's LB claims when the grading report computes that variant's displayed grade (§6.3). The base item's grade does not change.

**Family counts after GB:**

| Family | Count after GB |
| --- | --- |
| memory-retrieval | 17 |
| decision-diagnosis | 16 |
| planning-self-regulation | 12 (at the cap) |
| perspective-emotion | 10 |
| attention-load | 7 |

### 1.17 `memory-retrieval/practice-specificity`
- **Claim:** Practice transfers to a target skill to the extent that the practice's cues and required actions resemble the target's. A study method that exercises a different process from the one the test or task demands transfers poorly.
- **Construct:** transfer-appropriate processing; identical elements; near vs far transfer.
- **Used by:** practice-audit (LB).
- **Transfer:** **adjacent.** The effect is well tested in memory and training research. The page's four-question self-audit is CFAR's own format and is untested.
- **Sourcing brief:**
  - *Seminal:* Morris, Bransford & Franks 1977; Thorndike & Woodworth 1901.
  - *Synthesis:* Barnett & Ceci 2002 (a taxonomy of far transfer); lead: Sala & Gobet 2017 (far transfer rarely occurs).
  - *Evidence:* lead: encoding-specificity work (Tulving & Thomson 1973; Godden & Baddeley 1975), and whether the context-dependent-memory effect survives meta-analysis (Smith & Vela 2001).
  - *Backfire:* Does varying practice conditions (variability of practice; Schmidt 1975) sometimes beat matching them? Then "make practice resemble the target" would need a caveat.

### 3.15 `decision-diagnosis/chain-analysis`
- **Claim:** Reconstructing one concrete recent instance of a problem behaviour link by link, and locating the specific point where a different response was possible, identifies a better intervention point than an abstract account of the problem.
- **Construct:** behavioural chain analysis; functional analysis of a single episode.
- **Used by:** frame-by-frame (LB).
- **Transfer:** **analogical.** Chain analysis is a clinical DBT component, evaluated within a whole treatment package and used on serious dysregulation. The page applies it alone, to everyday recurring annoyances.
- **Sourcing brief:**
  - *Seminal:* Linehan 1993 (the DBT manual); lead: Rizvi & Ritschel 2014 (a chain-analysis guide).
  - *Synthesis:* search for any dismantling study or component analysis that isolates chain analysis. DBT meta-analyses (lead: Kliem, Kröger & Kosfelder 2010) test the package, not the component.
  - *Related:* the specificity of autobiographical memory, i.e. concrete vs overgeneral recall and problem solving (lead: Williams et al. 2007; concreteness training, lead: Watkins et al. 2012). This may be the stronger analogue for "one concrete instance".
  - *Backfire:* Can a detailed reconstruction of a failure turn into rumination? What does work on abstract vs concrete rumination (Watkins 2008) say?

### 3.16 `decision-diagnosis/duration-feedback`
- **Claim:** Writing down a duration estimate before a task and comparing it with the actual duration afterwards reduces later underestimation, because people otherwise misremember how long past tasks took.
- **Construct:** the planning fallacy; memory bias for past durations; feedback on estimates.
- **Used by:** forecast `duration` (LB).
- **Transfer:** **direct to adjacent.** Adults predicting their own task times is the tested paradigm. Repeated same-day self-feedback is less tested than single predictions.
- **Sourcing brief:**
  - *Seminal:* Buehler, Griffin & Ross 1994 (past experience is ignored unless it is made relevant); Roy, Christenfeld & McKenzie 2005 (Psych Bull, "underestimating the duration of future events: memory incorrectly used or memory bias?").
  - *Evidence:* lead: Roy, Mitten & Christenfeld 2008 (correcting memory improves time estimation); lead: König 2005 (feedback on anchors and predictions).
  - *Synthesis:* Buehler, Griffin & Peetz 2010 (also a source for 4.4); search for a meta-analysis of the planning fallacy or task-duration estimation.
  - *Backfire:* Does knowing that estimates are tracked lead people to pad them defensively? Does feedback correct the bias for familiar tasks only?

### 4.9 `planning-self-regulation/graduated-self-experiment`
- **Claim:** Deliberately testing a feared prediction with a small, planned real-world action, and then comparing what happened with what was expected, reduces avoidance and revises the expectation. The comparison step is doing work, not just the exposure.
- **Construct:** behavioural experiments; expectancy violation (inhibitory learning); mastery experiences (self-efficacy).
- **Used by:** small-experiment (LB) · goal-factoring `aversion` (S).
- **Transfer:** **adjacent.** The clinical protocols are mostly therapist-guided and target diagnosed anxiety. The page is self-designed and targets everyday aversions.
- **Sourcing brief:**
  - *Seminal:* Bandura 1977 (self-efficacy); Bennett-Levy et al. 2004 (Oxford guide to behavioural experiments).
  - *Evidence:* Craske et al. 2014 (maximising exposure; expectancy violation); lead: McMillan & Lee 2010 (a review of behavioural experiments vs exposure alone).
  - *Synthesis:* search for meta-analyses of self-guided exposure or self-help CBT for everyday avoidance; Norton & Price 2007 for the clinical baseline.
  - *Replication check:* is expectancy violation itself supported? Lead: meta-analytic or large tests of the inhibitory-learning predictions.
  - *Backfire:* Can self-directed exposure without guidance sensitise rather than habituate? Is there evidence on the "accept either outcome" pre-commitment? If none is found, record it as a design choice.

### 4.10 `planning-self-regulation/goal-decomposition`
- **Claim:** A persistent behaviour often serves several goals at once. Listing the goals it serves before looking for alternatives yields replacements that are more likely to be adopted than replacements aimed at its stated goal alone.
- **Construct:** multifinality (goal systems theory); functional assessment and functionally equivalent replacement behaviour.
- **Used by:** goal-factoring (LB) · goal-factoring `aversion` (LB).
- **Transfer:** **analogical.** Goal systems theory is lab and theory work. Functional assessment is applied behaviour analysis, done by a practitioner on someone else's behaviour. The page is self-applied. The roster expects C/D.
- **Sourcing brief:**
  - *Theory:* Kruglanski et al. 2002 (a theory of goal systems); lead: Köpetz, Faber, Fishbach & Kruglanski 2011 (the multifinality constraints effect).
  - *Evidence:* O'Neill et al. 1997 (functional assessment); search for a meta-analysis of function-based vs non-function-based interventions (lead: Heyvaert et al. or Gage, Lewis & Stichter 2012).
  - *Related:* Sheldon & Kasser 1995 (goal coherence), which CFAR cites.
  - *Backfire:* Can goal lists be rationalisations produced after the fact (the Nisbett & Wilson 1977 limits on introspective access)? Record whether any test of self-applied functional analysis exists.

### 4.11 `planning-self-regulation/choice-bracketing`
- **Claim:** Deciding a class of repeated choices together, as a rule or policy, produces more consistent and more farsighted choices than deciding each instance separately.
- **Construct:** broad vs narrow choice bracketing; bundling of choices; personal rules.
- **Used by:** commit `policy` (LB for the variant).
- **Transfer:** **adjacent.**
- **Sourcing brief:**
  - *Seminal:* Read, Loewenstein & Rabin 1999 (choice bracketing); Ainslie 1992, 2001 (picoeconomics, personal rules).
  - *Evidence:* lead: Hofmeyr, Ainslie, Charlton & Ross 2011 (choice bundling and self-control, experimental); lead: Kirby & Guastello 2001 (making choices in advance, patterns).
  - *Synthesis:* search for a review or meta-analysis of broad bracketing interventions.
  - *Backfire:* Do rigid personal rules produce compulsive over-control or "what-the-hell" collapse after a lapse (Ainslie's own caution)? Does narrow bracketing sometimes help (lead: diversification bias, Read & Loewenstein 1995)?

### 4.12 `planning-self-regulation/goal-gradient`
- **Claim:** Effort towards a goal increases as the remaining distance to it shrinks, and making the remaining distance visible strengthens the effect.
- **Construct:** the goal-gradient effect; perceived goal distance.
- **Used by:** tokens `countdown` (LB for the variant).
- **Transfer:** **adjacent.** Loyalty-card and lab studies have a reward at the end. The countdown tracks a person's own session arc, with no external reward.
- **Sourcing brief:**
  - *Seminal:* Hull 1932; Kivetz, Urminsky & Zheng 2006 (JMR).
  - *Evidence:* Bonezzi, Brendl & De Angelis 2011 (stuck in the middle: a motivation dip at mid-distance); Cheema & Bagchi 2011; lead: Nunes & Drèze 2006 (endowed progress).
  - *Replication check:* search for pre-registered replications of Kivetz et al. 2006 and of endowed progress.
  - *Backfire:* The early or middle dip (Bonezzi et al.), which is why the variant must pair with nearer milestones. Does visible progress lead to coasting once a goal feels nearly done (lead: Fishbach & Dhar 2005, goal licensing)?

### 5.7 `perspective-emotion/decatastrophizing`
- **Claim:** Writing out a dreaded outcome concretely, including what would happen next and how one would cope, lowers its felt severity. People overestimate how bad and how long-lasting their reaction to negative events will be.
- **Construct:** decatastrophising (cognitive therapy); the impact bias and immune neglect in affective forecasting.
- **Used by:** worst-case (LB).
- **Transfer:** **adjacent.** Decatastrophising is usually done in therapy with guidance. Impact-bias studies measure forecasts; they do not test a writing intervention.
- **Sourcing brief:**
  - *Seminal:* Beck 1979; Gilbert, Pinel, Wilson, Blumberg & Wheatley 1998 (immune neglect); Wilson & Gilbert 2005 (affective forecasting review).
  - *Evidence:* lead: Wilson, Wheatley, Meyers, Gilbert & Axsom 2000 (focalism: thinking through the rest of one's life reduces the impact bias). This is the closest test of the page's "next day, week, month" block.
  - *Synthesis:* search for meta-analyses of the impact bias (lead: Mathieu & Gosling 2012) and of cognitive restructuring as a standalone component.
  - *Related:* Norem & Cantor 1986 (defensive pessimism).
  - *Backfire:* Does detailed rehearsal of a catastrophe feed worry or rumination (lead: Borkovec's work on worry as avoidance)? Can it make a real risk feel acceptable?

### 5.8 `perspective-emotion/gratitude`
- **Claim:** Regularly writing down things one is grateful for produces small improvements in well-being. Weekly writing is at least as effective as daily.
- **Construct:** gratitude interventions; hedonic adaptation to repeated positive activities.
- **Used by:** check-in (S; the optional gratitude row).
- **Transfer:** **adjacent.** The studies use dedicated multi-week gratitude protocols; here it is one row on a weekly page.
- **Sourcing brief:**
  - *Seminal:* Emmons & McCullough 2003; Seligman, Steen, Park & Peterson 2005 ("three good things").
  - *Frequency:* Lyubomirsky, Sheldon & Schkade 2005.
  - *Synthesis:* Davis et al. 2016 (meta-analysis); Cregg & Cheavens 2021 (meta-analysis); lead: Dickens 2017. Extract effects against active vs neutral controls.
  - *Backfire:* Do effects vanish against active controls? Does forced or rote gratitude backfire, e.g. for depressed participants (lead: Sin & Lyubomirsky 2009 on person–activity fit)?

### 5.9 `perspective-emotion/intrapersonal-goal-conflict`
- **Claim:** Conflict between a person's own goals predicts negative affect and inaction. Making both sides explicit and looking for an integrating resolution reduces that conflict more than overriding one side.
- **Construct:** intrapersonal goal conflict; ambivalence; resolution through integration.
- **Used by:** perspective-swap `two-sides` (LB for the variant).
- **Transfer:** **analogical.** The first half (conflict is costly) is correlational research. The second half (the two-column method resolves it) is untested. The roster expects D.
- **Sourcing brief:**
  - *Seminal:* Emmons & King 1988.
  - *Synthesis:* lead: Gray, Ozer & Rosenthal 2017 (a meta-analysis of goal conflict and well-being); lead: Kelly, Mansell & Wood 2015 (goal conflict and well-being review).
  - *Resolution:* lead: motivational-interviewing work on ambivalence (Miller & Rollnick), including decisional balance and its critique; search for any test of written two-sided dialogue or empty-chair work (lead: Greenberg's two-chair work).
  - *Backfire:* Decisional balance exercises can increase ambivalence or strengthen the status quo (lead: Miller & Rose 2015). This is a direct warning for a two-column page.

### 5.10 `perspective-emotion/domain-satisfaction`
- **Claim:** Rating satisfaction in several named life domains gives a reliable and valid measure of subjective well-being, and it shows which domain drives a change that a single overall rating hides.
- **Construct:** domain satisfaction; the Personal Wellbeing Index; bottom-up models of life satisfaction.
- **Used by:** scoresheet `domains` (LB for the variant).
- **Transfer:** **adjacent.** A validated fixed-item instrument is given by researchers. The page's domains are self-chosen and re-rated quarterly by the same person alone. Note that this claim grounds the **measure**; it does not say rating improves anything.
- **Sourcing brief:**
  - *Seminal:* the International Wellbeing Group's PWI manual (Cummins et al.); Diener 1984.
  - *Evidence:* lead: Cummins, Eckersley, Pallant, van Vugt & Misajon 2003 (developing the index); lead: Schimmack & Oishi 2005 (item-order and domain effects on life-satisfaction judgements).
  - *Synthesis:* search for a psychometric review of the PWI or of domain-satisfaction measures.
  - *Backfire:* Does rating domains in sequence prime or distort the judgement (Schwarz & Strack's context effects; the Strack, Martin & Schwarz 1988 dating question)? Does a composite average hide the domain that matters?

### 6.7 `attention-load/task-switching`
- **Claim:** Switching between tasks carries a measurable time and accuracy cost compared with staying on one task. Doing one kind of thinking at a time avoids that cost.
- **Construct:** task-switching costs; multitasking.
- **Used by:** Sitting (S; one move per page, working one page at a time).
- **Transfer:** **analogical.** Lab switch costs are measured in milliseconds on simple tasks. Moving between thinking moves across a sitting is far coarser.
- **Sourcing brief:**
  - *Seminal:* Rogers & Monsell 1995; Rubinstein, Meyer & Evans 2001.
  - *Synthesis:* Monsell 2003 (review); Kiesel et al. 2010 (review).
  - *Applied:* lead: Ophir, Nass & Wagner 2009 (heavy media multitaskers) and its replication record (lead: Wiradhany & Nieuwenstein 2017, meta-analysis); lead: Leroy 2009 (attention residue).
  - *Backfire:* Is attention residue robust? Search for replications. Can breaking one task off for a different one help incubation (see creativity-fixation/incubation-effect)? That tension bears on Incubation's two halves.

### 11.1 Uses of existing claims added by Gate 1b

These add to the "Used by" lines above, so the grading report can compute each item's grade.

- 3.3 prospective-hindsight and 3.4 premortem-overconfidence: pre-mortem `iterate`.
- 3.12 calibration-feedback: forecast `duration` (S).
- 4.1 implementation-intentions: frame-by-frame (S).
- 4.4 task-unpacking: forecast `duration` (S).
- 4.8 prior-state-recall: worst-case (S); scoresheet `domains` (S).
- 5.3 self-distancing: perspective-swap `two-sides` (S).
- 6.6 resumption-cues: Sitting and Ritual (S; the Saving State closing line).
