# Step 5: lead spot-check

**Date:** 2026-09-25 · **Spec:** research design §7, step 5 · **Scope:** all A grades; all downgrades; a seeded random 20% or more of the rest; plus a mechanical quote-fidelity check over every family file.

**Status:** complete for the six families with an adversarial pass. For `decision-diagnosis` and `attention-load`, the A grades and the 20% sample have been read, but their adversarial pass had not run yet at the time of writing (it was waiting for a budget decision).

## 1. Quote fidelity (mechanical, all families)

Every quoted finding in a family file's sources table was checked against the cached abstract for its DOI (`.superpowers/research/abstracts/cache.json`, fetched by `tools/fetch-abstracts.mjs`). Matching ignored case, quote marks, ellipses, bracketed insertions and trailing punctuation.

| Result | Count |
| --- | --- |
| Quote found verbatim in its cached abstract | 196 |
| Quote not found verbatim | 59 |
| Row whose DOI has no cached abstract (not checkable this way) | 110 |

Triage of the 59, by the share of the quote's five-word sequences that appear in the abstract:
- **30 score ≥ 0.45.** The same sentences, with in-quote ellipses, or small differences between the OpenAlex version and the publisher version. Accepted.
- **29 score ≈ 0.** Most of these are one of:
  - parse artefacts, e.g. fragments of the rationale prose that sit in quotes;
  - short phrase-quotes that the rationale already says are "not in the abstract, not used";
  - quotes the gap-fill and adversarial agents took from full text, which §7.2 allows when the rationale says so (Flyvbjerg 2013; Zhu et al. 2018, from the PDF; Rowland 2014's results; Delgado 2018; the Salmerón and Calvo-Ferrer papers; the RCA papers in BMJ Quality & Safety).
- **Fix needed:**
  - ~~**Jacowitz & Kahneman (1995), under `decision-diagnosis/anchoring`.**~~ **A false positive, withdrawn on inspection.** The row quotes the real abstract (verified against the cache). Separately, and with its source named, it quotes Klein et al. 2014's description of the original. The checker picked up that second quote. No fix is needed.
  - **Mitchell, Russo & Pennington (1989), under `prospective-hindsight`.** The "30%" quote belongs to Klein's HBR article, not this paper. The grader already flagged it and excluded it from the grade. It stays excluded.
  - **Basadur (1986).** Its cached text is unrelated (Spanish); it was already excluded.

## 2. A grades (all read)

| Claim | Grade after step 4 | Spot-check | Note |
| --- | --- | --- | --- |
| memory-retrieval/testing-effect | A | **confirmed** | Every quote matches the Rowland 2014, Adesope 2017, Pan & Rickard 2018 and Roediger & Karpicke 2006 abstracts. The bias check (Yang et al. 2021, PEESE g ≈ 0.47) was fetched and its DOI verified. **Refinement:** the free-recall format itself gives g ≈ 0.24–0.29 (Rowland's Table 1; Yang), so `free-recall`'s `helps` must describe its benefit as small to moderate, not moderate. |
| memory-retrieval/distributed-practice | A | **confirmed** | The Cepeda 2006, Donovan & Radosevich 1999 and Kornell 2009 abstracts match. Latimier et al.'s DOI was verified (online 2020, print 2021). |
| planning-self-regulation/implementation-intentions | A | **confirmed** | The Gollwitzer & Sheeran 2006 abstract gives d = .65. The adversarial pass added Sheeran et al. 2024 (d .27–.66) and a pre-registered meta-analysis of alcohol use with zero imputed missing studies. `moderate` is at the low edge. Carrera 2018 (a null result for scheduling a repeated behaviour) goes in `backfires`. |
| decision-diagnosis/decomposed-judgement | A | **confirmed, pending step 4** | The Grove 2000, Ægisdóttir 2006 and Dawes 1979 abstracts match. The transfer is correctly analogical: it moves from statistical versus clinical prediction to a person's own criteria scores. |
| decision-diagnosis/anchoring | A | **confirmed, pending step 4** | It rests on Many Labs 1 (Klein et al. 2014): 36 samples, pre-registered, with anchoring among the 10 effects that replicated. The d values come from the full text. The Jacowitz & Kahneman row quotes its own abstract correctly (§1). The live risk, that the gut score anchors the criteria scores, is already in the rationale for `backfires`. |
| decision-diagnosis/hindsight-record | A | **provisionally confirmed, pending step 4** | The Guilbault et al. 2004 abstract matches (95 studies, d = .39). **Open:** whether the pooled estimate holds for the memory design (recalling one's own earlier estimate) as well as the hypothetical design. Longhand depends on the memory design. The DD + AL adversarial pass must check it. |

## 3. Downgrades (all read)

Every downgrade cites evidence whose DOI resolves on Crossref to the paper named. All eleven DOIs cited by the adversarial agents were re-verified by the lead.

| Claim | Change | Spot-check |
| --- | --- | --- |
| creativity-fixation/random-stimuli | C → D | **Accepted.** No counted source tests random, unrelated stimuli. Dugosh et al. 2000 tests other people's ideas, and Leahy et al. 2020 shows that examples fixate. |
| memory-retrieval/interleaving-confusable | A → B | **Accepted.** The Brunmair & Richter 2019 abstract confirms similarity as a moderator. I² = 77.3% and trim-and-fill g = 0.29 come from the full text. Tie-break 4 applies, with no subgroup estimate to grade on. |
| memory-retrieval/spacing-gap-ratio | B → C | **Accepted.** The Cepeda et al. 2008 abstract gives an optimal gap of about 20–40% of a 1-week delay, falling to 5–10% of a 1-year delay. For a one-month target, that implies gaps of roughly 5–11 days, so Series' 1d and 3d gaps fall on the short side. The adversarial agent's figure of 11 days at 35 days is consistent with that range. |
| reading-review/paper-vs-screen | A → B | **Accepted.** The Delgado 2018 abstract confirms g = −0.21 (small) and the time-frame moderator. I² and the prediction intervals come from the full text. Salmerón 2024 was verified. |
| reading-review/automation-bias | B → C | **Accepted.** The claim's second sentence (that forcing interventions reduce overreliance) rests on one experiment, against Parasuraman & Manzey 2010. |
| planning-self-regulation/progress-monitoring | A → B | **Accepted.** Tie-break 4, from the Harkin 2016 author manuscript (I² ≈ 84%). The moderators that match a private page disagree (private d+ = 0.19). The effect should be labelled small for Longhand's private page. |
| perspective-emotion/expressive-writing | A → B | **Accepted.** Tie-break 3: Reinhold 2018 and Mogk 2006 find no effect, and Guo 2023 finds a small one. The claim is supporting only, so no displayed grade moves. |

## 4. Random sample (20% of the rest, seeded 20260925)

19 claims read: 3 CF, 3 EE, 3 MR, 1 RR, 3 DD, 2 AL, 2 PSR, 2 PE. **No grading errors were found.** In every case the rationale applies §6.1 and the tie-breaks as written, names what was read, and keeps unread sources out of the grade.

The sample and the A reads raise one pattern for the Gate 2 report:

- **Unread Ds versus practice Ds.** §6.1 defines D as "theory or practitioner craft; not directly tested". Several claims are D because their empirical sources could not be read (paywalled, with no cached abstract). The evidence may exist; we just have not read it. Examples: `planning-self-regulation/task-unpacking` (Kruger & Evans 2004 and Forsyth & Burt 2008 unread; the grader estimates B once read), `externalisation-embodiment/causal-diagramming`, and the comparative half of `goal-decomposition`. The grading report must label these **D (unread)**, separately from **D (practice)**, so the user can dispute them and trigger a targeted re-read (§11 disputes), not cut them.

## 5. Fixes to apply before `grounding.json`

1. ~~`anchoring` quote~~: withdrawn; it was a false positive (§1).
2. **Applied.** `handwriting-vs-typing`: set `tie_break` to `1`. Urry et al. 2021 is pre-registered, with N = 142, more than twice the original's 65 (confirmed by the adversarial pass from the article).
3. **Applied.** `serial-order-effect`: set `effect: small` (Barbot et al. 2026, per the adversarial pass).
4. **Applied.** `progress-monitoring`: set `effect: small` for the private-page use. The `helps` text for check-in, Ritual and scoresheet must say the gain is small (the adversarial pass flagged these as overclaiming).
5. **Applied.** `free-recall`: its `helps` says small to moderate (§2).
6. **Applied.** `ten-bad-ideas`: its `helps` says the later-is-better tendency is small and unreliable for any one person (the adversarial pass flagged this as overclaiming).
7. `proofreading-marks`: add BS 5261C:2005's ISBN from a catalogue.
