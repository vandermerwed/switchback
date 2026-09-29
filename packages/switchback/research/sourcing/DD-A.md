# Sourcing batch DD-A — decision-diagnosis, judgement and forecasting

Claims 3.1, 3.2, 3.5–3.7, 3.12–3.14 from `research/claims.md` §3. Grading and adversarial pass are left `pending` for later agents.

---

## decomposed-judgement
**Claim:** Scoring options on explicit criteria and combining the scores mechanically gives more consistent and more accurate judgements than an unaided holistic judgement.
**Construct:** linear models and decomposition vs holistic (clinical) judgement · **Used by:** options-criteria (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Grove, Zald, Lebow, Snitz & Nelson (2000) | 10.1037/1040-3590.12.1.19 | 2000 | meta-analysis | meta-analysis of clinical vs. mechanical prediction studies | ~136 studies | ~10% accuracy advantage for mechanical prediction | "On average, mechanical-prediction techniques were about 10% more accurate than clinical predictions... mechanical prediction substantially outperformed clinical prediction in 33%-47% of studies examined... in only a few studies (6%-16%) were [clinical predictions] substantially more accurate... Superiority for mechanical-prediction techniques was consistent, regardless of the judgment task, type of judges, judges' amounts of experience, or the types of data being combined." (verbatim abstract, fetched via PubMed) |
| Ægisdóttir, White, Spengler et al. (2006) | 10.1177/0011000005285875 | 2006 | meta-analysis | "The Meta-Analysis of Clinical Judgment Project," 56 years of accumulated studies | 67 studies, 92 effect sizes (per secondary description) | statistical prediction ~13% more accurate in the most stringent sample | Abstract not independently accessible in this session (SAGE/PsycNet paywalled; Semantic Scholar and Crossref both elide the abstract field). Only a search-engine paraphrase was available, which is **not** used as a quoted finding. Recorded here as a DOI-verified corroborating meta-analysis; its numeric claims should be re-verified from primary text before grading. |
| Dawes (1979) | 10.1037/0003-066X.34.7.571 | 1979 | theory | seminal argument for (even improper) linear models over clinical intuition | n/a | n/a | Abstract not accessible in this session (APA PsycNet is JS-rendered; Semantic Scholar elides the abstract). DOI verified via CrossRef (title "The robust beauty of improper linear models in decision making," Dawes, *American Psychologist* 34(7):571–582, 1979) but no verbatim text was fetched. Cited here as the seminal theoretical source that the two meta-analyses above test empirically. |
| Wilson & Schooler (1991) | 10.1037/0022-3514.60.2.181 | 1991 | experiment | 2 studies, jam and course preferences vs. expert ratings | college students, 2 studies | analysis-of-reasons reduced agreement with experts | "Students who analyzed why they felt the way they did agreed less with the experts than students who did not... Analyzing reasons can focus people's attention on nonoptimal criteria, causing them to base their subsequent choices on these criteria." (verbatim abstract, fetched via PubMed) — **backfire** |
| Uhlmann & Cohen (2005) | 10.1111/j.0956-7976.2005.01559.x | 2005 | experiment | "Constructed Criteria," *Psychological Science* | n/a | criteria for merit shift to favor a preferred candidate | Abstract not independently accessible in this session (paywalled; Semantic Scholar has no record under this DOI). DOI verified via CrossRef (title, first author Uhlmann, year 2005 all match). Cited on the strength of its well-established title/thesis (self-serving construal of "merit" criteria) as a **backfire** candidate; its specific numbers were not verified here and should not be used for grading without a direct read. |
| Nieuwenstein, Wierenga, Morey, Wicherts, Blom, Wagenmakers & van Rijn (2015) | 10.1017/s1930297500003144 | 2015 | meta-analysis + large pre-registered replication | meta-analysis + N=399 pre-registered replication of the "unconscious thought advantage" | 399 (replication) | no evidence for the effect at adequate power | "Consistent with the reliability account, the large-scale replication study yielded no evidence for the UTA, and the meta-analysis showed that previous reports of the UTA were confined to underpowered studies... we conclude that there exists no reliable support for the claim that a momentary diversion of thought leads to better decision making than a period of deliberation." (verbatim abstract, fetched via Semantic Scholar) — **failed large replication, tie-break relevant** |

### Replication
No Many Labs/RRR item targets decomposed judgement directly. The two cited meta-analyses (Grove et al. 2000, k≈136; Ægisdóttir et al. 2006, k=67) are themselves large-scale aggregations across decades of studies and function as the closest thing to a broad "replication" of the clinical-vs-mechanical finding; both point the same direction. Separately — and this matters for the "gut score" framing the roster leans on — Nieuwenstein et al. (2015) is a **pre-registered, adequately powered replication that failed** to find the "unconscious thought advantage" (the "gut beats analysis" claim), which caps any related claim at grade C per tie-break rule 1 if that claim were used. It does not directly test decomposed-judgement, but it undercuts a nearby popular claim the roster's design gestures at (leaving the gut column first/unaided).

### Backfire evidence
Two independent lines of backfire evidence, both about the *side effects* of generating and combining reasons rather than the reliability of mechanical combination itself:
1. Wilson & Schooler (1991): explicitly analyzing reasons for a preference can shift the choice toward reasons that are easy to articulate but not the true determinants of quality, reducing agreement with experts.
2. Uhlmann & Cohen (2005) (DOI verified, quote not independently confirmed): criteria themselves can be constructed post hoc to fit a preferred outcome, which would undermine the "consistency" benefit of decomposition if criteria are chosen after an initial holistic reaction rather than before it — directly relevant to the page's instruction to set criteria before scoring.
The transfer note in claims.md is correct to flag this as **analogical to adjacent**: the literature's criterion is predictive accuracy against a *known* outcome; a personal decision has no such external criterion, so the page's actual claimed benefit (surfacing the gap between the mechanical total and the gut score) is one step removed from what has been tested.

### Grade
pending

### Adversarial pass
pending

---

## anchoring
**Claim:** A number written or seen earlier pulls later numeric judgements towards it, so a gut score written *before* criteria scoring cannot be anchored by the total.
**Construct:** the anchoring effect (including self-generated anchors) · **Used by:** options-criteria (LB) · forecast (S)
**Load-bearing:** yes (options-criteria)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tversky & Kahneman (1974) | 10.1126/science.185.4157.1124 | 1974 | theory/review | seminal identification of the anchoring-and-adjustment heuristic | n/a | n/a | "This article described three heuristics that are employed in making judgments under uncertainty: (i) representativeness... (ii) availability... and (iii) adjustment from an anchor, which is usually employed in numerical prediction when a relevant value is available." (verbatim, fetched via CrossRef's stored abstract) |
| Jacowitz & Kahneman (1995) | 10.1177/01461672952111004 | 1995 | experiment | 15-topic estimation tasks, anchors set at 15th/85th percentile of a calibration sample | not independently confirmed here | original effect size ES ≈ 0.93 (Cohen's d, per the Many Labs 1 replication's own reporting of the original) | Abstract not independently fetched (SAGE page returned 403). The method and original effect size are instead quoted from Klein et al. (2014), who describe it directly: "Jacowitz and Kahneman (1995) presented a number of scenarios in which participants estimated size or distance after first receiving a number that was clearly too large or too small... The original number served as an anchor, biasing estimates to be closer to it." (verbatim, fetched from the Klein et al. 2014 PDF, p.145) |
| Epley & Gilovich (2001) | 10.1111/1467-9280.00372 | 2001 | experiment | 3 studies, self-generated vs. experimenter-provided anchors | not reported in abstract | insufficient adjustment specifically for self-generated anchors | "We present evidence that insufficient adjustment produces anchoring effects when the anchors are self-generated... These results suggest it is time to reintroduce anchoring and adjustment as an explanation for some judgments under uncertainty." (verbatim abstract, fetched via PubMed) — **boundary condition** |
| Klein et al., "Many Labs 1" (2014) | 10.1027/1864-9335/a000178 | 2014 | rrr | 36 independent samples, N=6,344 total, 13 classic effects including 4 anchoring items | 5,282–5,940 per anchoring item (Table 2) | anchoring replicated with **larger** effect sizes than the originals (weighted d = 1.17–2.42 vs. original d = 0.93 across all 4 items) | "Although replication is a central tenet of science, direct replications are rare in psychology. This research tested variation in the replicability of 13 classic and contemporary effects across 36 independent samples totaling 6,344 participants. In the aggregate, 10 effects replicated consistently." (verbatim abstract, fetched from PDF) — Table 2 (verbatim, read from PDF p.148) gives, for the 4 anchoring items (babies born, Mt. Everest, Chicago, distance to NYC): original ES 0.93 (all four); weighted replication ES 2.42, 2.23, 1.79, 1.17 respectively; all had p<.001 and 0% of samples in the wrong direction. |

### Replication
This is one of the most convincingly replicated effects available: Many Labs 1 (Klein et al. 2014) replicated all four Jacowitz & Kahneman anchoring items in 36 independent samples (5 of the top effect sizes in the whole 13-effect project were anchoring variants), with the replicated effect sizes **larger**, not smaller, than the originals. No failed large replication of anchoring itself was found.

### Backfire evidence
The relevant boundary is not "does anchoring exist" (settled, above) but "does the mechanism still apply to a self-generated anchor written by the same person, in the same order the page uses." Epley & Gilovich (2001) show the classic "insufficient adjustment" account applies specifically to **self-generated** anchors (the mechanism options-criteria depends on, since the page's own earlier gut score is the anchor, not an experimenter-given one) — this strengthens transfer rather than weakening it, but it also means the phenomenon options-criteria is trying to neutralise (the gut score anchoring the criteria total) is exactly the self-generated-anchor case with the best-supported mechanism.
No direct test was found of the page's actual intervention — writing the gut score *first*, before criteria scores, specifically to prevent the *total* from anchoring the gut impression (i.e., using order to try to neutralise anchoring in the *other* direction). This is a genuine gap: the literature establishes that earlier numbers anchor later ones, which supports the page's ordering logic in principle, but no study was located that tests whether reordering in this way actually prevents contamination, or whether consistency pressure (wanting the total and the gut score to agree) reintroduces the very convergence the page exists to reveal. Flagging as "none found (searched: Jacowitz & Kahneman follow-ups, anchoring-order literature via PubMed/CrossRef/Semantic Scholar within this session's tool budget)."

### Grade
pending

### Adversarial pass
pending

---

## assumption-surfacing
**Claim:** Explicitly listing the assumptions a plan depends on, and naming a test for each, identifies more of the plan's vulnerabilities than reviewing the plan without such a list.
**Construct:** a key-assumptions check / assumption-based planning · **Used by:** assumption-audit (LB)
**Load-bearing:** yes — expected practice/D type per the sourcing brief

### Sources
| Cite | DOI/ISBN/URL | Year | Type | Design | n | Effect | Finding (quoted from source) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mason & Mitroff, *Challenging Strategic Planning Assumptions* | ISBN 9780471082194 (verified via OpenLibrary: author Richard O. Mason, first published 1981) | 1981 | practice | book, consulting methodology (SAST) | n/a | n/a | Book not fetched in full text in this session; ISBN/author/year verified bibliographically only. Recorded per §5.4 amendment 2 (books may carry `isbn` in place of `doi`). |
| Dewar, *Assumption-Based Planning: A Tool for Reducing Avoidable Surprises* | ISBN 9780521001267 (verified via OpenLibrary: author James A. Dewar, 2002) | 2002 | practice | RAND-originated monograph, method description | n/a | n/a | Not fetched in full text; ISBN/author/year verified bibliographically only. |
| McGrath & MacMillan, "Discovery-Driven Planning" | https://hbr.org/1995/07/discovery-driven-planning (verified by direct fetch) | 1995 | practice | *Harvard Business Review*, Jul–Aug 1995 | n/a | n/a | "Business lore is full of stories about smart companies that incur huge losses when they enter unknown territory—new alliances, new markets, new products, new technologies." (verbatim opening, fetched directly) — practitioner method for surfacing and tracking assumptions under uncertainty (a checklist/milestone-planning relative of the assumption-audit mechanism, not a direct match). |
| Coulthart (2017) | 10.1080/08850607.2016.1230706 | 2017 | review | "An Evidence-Based Evaluation of 12 Core Structured Analytic Techniques," *Int'l J. of Intelligence and CounterIntelligence* 30(2) | n/a | n/a | Abstract not independently accessible in this session (Tandfonline 403; Semantic Scholar elides abstract). DOI verified via CrossRef (title, first author Coulthart, year 2017 match). Its stated scope (evaluating structured analytic techniques including assumption-based methods against outcomes) is the right target for this claim but its specific findings on the key-assumptions check were **not verified here** and should not be used for grading without a direct read of the text. |

### Replication
No experimental test of the key-assumptions check specifically was located within this session's search budget — this matches the sourcing brief's own expectation. Recorded as "none found (searched: PubMed and CrossRef bibliographic search for experimental/RCT tests of 'key assumptions check' and 'assumption-based planning'; WebSearch budget for this batch was exhausted before an exhaustive check of the intelligence-analysis evaluation literature could be completed — see report)."

### Backfire evidence
None directly quoted in this session (see the Coulthart caveat above — its abstract, which would likely speak to whether structured analytic techniques including assumption surfacing show a measurable benefit over unstructured review, could not be read). The sourcing brief's own backfire questions ("does a long list give false reassurance? do SAT evaluations find little or no debiasing benefit?") remain open and should be answered by whoever next reads Coulthart (2017) or Peerally et al. (2017)/Card (2017) in full, none of which were reached in this session.

### Grade
pending

### Adversarial pass
pending

---

## consider-the-opposite
**Claim:** Asking people to consider reasons their judgement could be wrong reduces overconfidence and biased assimilation, compared with no instruction or an instruction to be unbiased.
**Construct:** the consider-the-opposite debiasing strategy · **Used by:** assumption-audit — **reclassified load-bearing per Lead ruling 5** (the falsifier column is the page's mechanism)
**Load-bearing:** yes (per Lead ruling 5, overriding the claims.md table's "supporting")

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract/text) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Koriat, Lichtenstein & Fischhoff (1980) | 10.1037/0278-7393.6.2.107 | 1980 | experiment | 2 experiments; Exp.2 manipulated listing (a) a supporting reason, (b) a contradicting reason, or (c) both | not stated in the fetched excerpt | only contradicting-reason listing improved calibration | "Experiment 2 simplified the manipulation by asking subjects first to choose an answer and then to list (a) one reason supporting that choice, (b) one reason contradicting it, or (c) one reason supporting and one reason contradicting. Only the listing of contradicting reasons improved the appropriateness of confidence." (verbatim, fetched full text, *J. Exp. Psych: Human Learning & Memory* 6(2):107–118) |
| Lord, Lepper & Preston (1984) | 10.1037/0022-3514.47.6.1231 | 1984 | experiment | 2 experiments; explicit consider-the-opposite instructions vs. stimulus materials vs. "be fair/unbiased" instructions | not stated in fetched abstract | consider-the-opposite reduced biased assimilation and biased hypothesis testing more than "be unbiased" instructions | "In both experiments the induction of a consider-the-opposite strategy had greater corrective effect than more demand-laden alternative instructions to be as fair and unbiased as possible." (verbatim abstract, fetched via PubMed) |
| Larrick (2004), "Debiasing," ch.16 in *Blackwell Handbook of Judgment and Decision Making* | 10.1002/9780470752937.ch16 | 2004 | review | narrative review of debiasing strategies | n/a | n/a | "the simple but general strategy of 'consider the opposite' [is] impressive, because it has been effective at reducing overconfidence, hindsight biases, and anchoring effects (see Arkes, 1991; Mussweiler, Strack, & Pfeiffer, 2000). The strategy consists of nothing more than asking oneself, 'What are some reasons that my initial judgment might be wrong?'... [it] directly counteracts the basic problem of association-based processes—an overly narrow sample of evidence—by expanding the sample and making it more representative." (verbatim, fetched full text, p.323) |
| Sanna, Schwarz & Stocker (2002) | 10.1037/0278-7393.28.3.497 | 2002 | experiment | 2 studies; listing 2 vs. 10 counterfactual ("could have been otherwise") thoughts | not stated in fetched abstract | listing many (10) counterfactuals **increased** hindsight bias via difficulty/ease-of-retrieval | "Listing many counterfactual thoughts was experienced as difficult and consistently increased the hindsight bias, presumably because the experienced difficulty suggested that there were not many ways in which the event might have turned out otherwise. No significant hindsight effects were obtained when participants listed only a few counterfactual thoughts." (verbatim abstract, fetched via PubMed) — **backfire, quantity-dependent** |

### Replication
No Many Labs/RRR item targets consider-the-opposite directly. Two independent original experiments (Koriat et al. 1980; Lord et al. 1984) converge on the same mechanism from different angles (confidence calibration vs. biased assimilation/hypothesis testing), and Larrick's 2004 review treats the effect as one of the more robust general debiasing strategies, citing further corroboration (Mussweiler, Strack & Pfeiffer 2000) not independently re-verified here. Searched for a pre-registered replication of Lord et al. (1984) specifically; none was located within this session's budget — "none found (searched via CrossRef/PubMed/Semantic Scholar)."

### Backfire evidence
Direct and well-quantified: Sanna, Schwarz & Stocker (2002) show the strategy's benefit is **quantity-dependent and can reverse**. A short list of contrary reasons (2) helps; a long list (10) is experienced as effortful, and that felt difficulty is (mis)read as evidence the original judgement was right after all — worsening the very bias the technique is meant to fix. Larrick's review independently notes the same boundary in passing ("asking someone to list too many contrary reasons can backfire"). This is directly actionable for assumption-audit's falsifier column: a short prompt (one or two "why might this be wrong" reasons per assumption) is supported; padding the column with many forced reasons per assumption risks the reversal Sanna et al. document.

### Grade
pending

### Adversarial pass
pending

---

## confidence-resolution
**Claim:** Coarse, three-level confidence ratings discriminate correct from incorrect judgements above chance (resolution), even though people are typically overconfident in absolute terms. Items marked low-confidence are therefore a useful flag for risk.
**Construct:** metacognitive resolution and calibration; overconfidence · **Used by:** confidence-dots protocol (LB) · assumption-audit (LB) · free-recall (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Koriat, Lichtenstein & Fischhoff (1980) | 10.1037/0278-7393.6.2.107 | 1980 | experiment | (see consider-the-opposite above) | — | confidence tracks the amount/strength of *retrieved* supporting evidence, not necessarily accuracy | "People are often overconfident in evaluating the correctness of their knowledge... Correlational analyses of the data of Experiment 1 strongly suggested that the confidence depends on the amount and strength of the evidence supporting the answer chosen." (verbatim, fetched full text) |
| Fleming & Lau (2014) | 10.3389/fnhum.2014.00443 | 2014 | review/methods | measurement review distinguishing metacognitive bias, sensitivity (resolution), and efficiency | n/a | n/a | "the degree of association between accuracy and confidence can be taken as a quantitative measure of metacognition... we distinguish between the related concepts of metacognitive bias (a difference in subjective confidence despite basic task performance remaining constant), metacognitive sensitivity (how good one is at distinguishing between one's own correct and incorrect judgments) and metacognitive efficiency." (verbatim abstract, fetched via PubMed) |
| Moore & Healy (2008) | 10.1037/0033-295X.115.2.502 | 2008 | theory/review | reconciles overestimation, overplacement, and overprecision as 3 distinct overconfidence phenomena | n/a | n/a | "On difficult tasks, people overestimate their actual performances but also mistakenly believe that they are worse than others; on easy tasks, people underestimate their actual performances but mistakenly believe they are better than others... Overprecision appears to be more persistent than either of the other 2 types of overconfidence." (verbatim abstract, fetched via PubMed) — **backfire/boundary: overprecision persists even where over/underestimation reverses** |

### Replication
No dedicated large replication of "does a coarse (e.g. 3-point) confidence scale retain above-chance resolution" was located within this session's budget. The general finding that confidence-accuracy correlations are reliably positive but imperfect is treated as well-established background in both Fleming & Lau (2014) and Moore & Healy (2008), but neither is itself a replication study of scale granularity. Flag: "none found (searched via PubMed/CrossRef/Semantic Scholar for granularity-of-confidence-scale replications); Double & Birney's 2019 meta-analysis on reactivity of metacognitive judgements, named as a lead in the sourcing brief, could not be located under that search string within this session's budget and should be re-attempted directly from its DOI once known."

### Backfire evidence
Moore & Healy (2008) supply the key boundary: even where the *direction* of overconfidence reverses between easy and hard tasks (overestimation vs. underestimation), **overprecision** — excess certainty in the tightness of one's own belief — is comparatively persistent. Applied to confidence-dots: resolution (high dots correlate with more accurate items) can hold in aggregate while individual "high confidence" ratings remain overprecise, i.e. still wrong more often than the person's own stated certainty implies. This supports treating dots as a *relative* risk flag (low vs. high) rather than a literal probability, which is how the protocol brief frames it.

### Grade
pending

### Adversarial pass
pending

---

## calibration-feedback
**Claim:** Making explicit probability forecasts and then receiving outcome feedback or scores improves calibration over successive rounds.
**Construct:** calibration training; forecasting with scoring rules · **Used by:** forecast (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lichtenstein & Fischhoff (1980), "Training for calibration" | 10.1016/0030-5073(80)90052-5 | 1980 | experiment | seminal calibration-training study, *Organizational Behavior and Human Performance* 26(2):149–171 | not verified here | n/a | Abstract not independently accessible in this session (ScienceDirect 403; Semantic Scholar elides abstract). DOI verified via CrossRef (title, both authors, year, and page range 149–171 all match). Cited on its well-established title/role as the seminal calibration-training study; its specific numeric findings were not re-verified here. |
| Mellers, Ungar, Baron, Ramos, Gurcay, Fincher, Scott, Moore, Atanasov, Swift, Murray, Stone & Tetlock (2014) | 10.1177/0956797614524255 | 2014 | experiment (large field forecasting tournament) | 2-year IARPA-sponsored geopolitical forecasting tournament, 5 competing research teams | large (tournament-scale, exact N not stated in abstract) | probability training, teaming and tracking each improved both calibration and resolution | "Our group tested and found support for three psychological drivers of accuracy: training, teaming, and tracking. Probability training corrected cognitive biases, encouraged forecasters to use reference classes, and provided forecasters with heuristics, such as averaging when multiple estimates were available... Results showed that probability training, team collaboration, and tracking improved both calibration and resolution." (verbatim abstract, fetched full text via open-access PDF) |
| Baron & Hershey (1988), "Outcome bias in decision evaluation" | 10.1037/0022-3514.54.4.569 | 1988 | experiment | original within-participants outcome-bias study | N=20 (original, per the 2023 replication's own description) | decisions judged more favourably when the outcome was good, holding the decision process constant | Abstract not independently fetched in this session; existence, authorship, and the "outcome bias" finding are corroborated by the verified 2023 pre-registered replication below, which quotes and extends it. |
| Aiyer, Kam, Ng, Young, Shi & Feldman (2023) | 10.5334/irsp.751 | 2023 | rrr (pre-registered replication + extension) | pre-registered, online (MTurk/CloudResearch), between-participants replication of Baron & Hershey (1988) Experiment 1 | N=692 | outcome bias replicated with a **larger** effect than the original, including among people who explicitly said outcomes shouldn't matter | "We successfully replicated signal and direction of the outcome bias (original: d(paired) = 0.21–0.53; replication: d(independent) = 0.77 [0.62, 0.93] to 1.1 [0.94, 1.26]), and even for participants who stated that outcomes should not be taken into consideration when evaluating decisions (d = 0.64 [0.21, 1.08])." (verbatim abstract, fetched via Semantic Scholar) — **backfire/boundary** |

### Replication
Direct evidence of calibration training's benefit comes from a large field tournament (Mellers et al. 2014) rather than a lab RRR; no Many Labs item targets calibration training specifically. Separately, and directly relevant to the backfire question the sourcing brief asks ("does outcome bias lead people to judge forecasts by results?"), Baron & Hershey's (1988) outcome-bias finding has itself now been **pre-registered and replicated at large scale (N=692) with a larger effect than the original** (Aiyer et al. 2023) — a genuine large replication, though of the boundary condition rather than of calibration training itself.

### Backfire evidence
Two related risks, both well-evidenced: (1) Aiyer et al.'s replication confirms outcome bias is robust and even affects people who explicitly disavow it — meaning forecast's own scoring, if read casually, risks being judged by whether the outcome happened to occur rather than by whether the stated probability was well-calibrated at the time. (2) The sourcing brief's own question — "how few items are too few to learn from?" — remains open; the Mellers et al. tournament involved hundreds of forecasts per participant over two years, while forecast produces "a handful of scored predictions per return." This is a real transfer gap: the training benefit is well-established at tournament scale, not at the scale of a personal ritual page, which is why the claims.md brief already flags forecast's feedback as "noisy."

### Grade
pending

### Adversarial pass
pending

---

## hindsight-record
**Claim:** After an outcome is known, people misremember their earlier probability estimates as closer to the outcome than they were. A dated, written prediction removes that memory distortion when the forecast is scored.
**Construct:** hindsight bias (the memory-design "I knew it" effect) · **Used by:** forecast (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fischhoff (1975), "Hindsight is not equal to foresight" | 10.1037/0096-1523.1.3.288 (original, *J. Exp. Psych: Human Perception & Performance* 1(3):288–299) | 1975 | experiment | 3 experiments on outcome-knowledge effects on judgement | not stated in fetched text | outcome knowledge increased postdicted likelihood and distorted memory of one's prior judgement | "Receipt of such outcome knowledge was found to increase the postdicted likelihood of reported events... Judges were, however, largely unaware of the effect that outcome knowledge had on their perceptions. As a result, they overestimated what they would have known without outcome knowledge... as well as what others actually did know without outcome knowledge." (verbatim, fetched via PubMed from the identical-text 2003 reprint, *Qual Saf Health Care* 12(4):304-311, DOI 10.1136/qhc.12.4.304 — the original 1975 DOI above was independently verified via CrossRef by title/author/year/page match, but the quoted text itself was read from the reprint, which reproduces the original abstract) |
| Fischhoff & Beyth (1975), "I knew it would happen" | 10.1016/0030-5073(75)90002-1 | 1975 | experiment | remembered probabilities of once-future political/personal events, before vs. after the outcome was known | not verified here | n/a | Abstract not independently accessible (pre-DOI-era paper, no abstract on record with CrossRef or Semantic Scholar). DOI verified via CrossRef (title, both authors, and year match); this is the paper that coined "creeping determinism"/the "I-knew-it-all-along" memory-distortion effect central to this claim, but its specific text was not read here. |
| Christensen-Szalanski & Willham (1991), "The hindsight bias: A meta-analysis" | 10.1016/0749-5978(91)90010-q | 1991 | meta-analysis | meta-analysis of hindsight-bias studies | not verified here | n/a | Abstract not independently accessible in this session (ScienceDirect 403; Semantic Scholar elides abstract). DOI verified via CrossRef (title, both authors, year match). |
| Guilbault, Bryant, Brockway & Posavac (2004), "A Meta-Analysis of Research on Hindsight Bias" | 10.1080/01973533.2004.9646399 | 2004 | meta-analysis | meta-analysis of hindsight-bias studies, *Basic and Applied Social Psychology* | not verified here | n/a | Abstract not independently accessible in this session (Tandfonline 403; Semantic Scholar elides abstract). DOI verified via CrossRef (title, all four authors, year match). |
| Sanna, Schwarz & Stocker (2002) | 10.1037/0278-7393.28.3.497 | 2002 | experiment | (see consider-the-opposite above) | — | attempts to debias hindsight can themselves increase it, depending on how many counterfactuals are generated | (see quote above) — **backfire** |

### Replication
Two independent meta-analyses (Christensen-Szalanski & Willham 1991; Guilbault et al. 2004) exist and were DOI-verified, giving the claim the "several independent... consistent" shape the rubric looks for, though neither's specific pooled effect size was independently re-confirmed here (both abstracts were paywalled beyond this session's tools). No Many Labs/RRR item targets hindsight bias directly; searched for one and found none — "none found (searched via CrossRef/PubMed/Semantic Scholar within this session's budget)."

### Backfire evidence
Even holding a written, dated prior in hand, Sanna, Schwarz & Stocker (2002) show that debiasing attempts (asking someone to generate reasons the outcome could have gone otherwise) can **increase** hindsight bias if the person is asked to generate too many such reasons, via the same ease-of-retrieval mechanism documented under consider-the-opposite above. This is directly relevant to forecast's read-back step: simply showing someone their old written estimate is the well-evidenced part of the mechanism; asking them to additionally re-argue why they were "really" right or wrong risks the same quantity-dependent reversal. The sourcing brief's own question about "creeping determinism" (do people reinterpret the record itself) was not separately resolved with a fetched source in this session and remains open.

### Grade
pending

### Adversarial pass
pending

---

## reference-class
**Claim:** Starting a prediction from the base rate for its reference class ("how often does this kind of thing happen?") improves forecast accuracy compared with starting from the specifics of the case.
**Construct:** the outside view / reference-class forecasting; base-rate neglect · **Used by:** forecast (S)
**Load-bearing:** no (supporting)

**Gap-fill (2026-09-25): the open question — does writing a base rate first act as a genuine outside-view correction, or does it just anchor the estimate — is now addressed with directly-fetched primary text on both sides. Short answer: the evidence supports a real, non-anchoring correction effect when the base rate is genuinely used as a benchmark, but a second, independent literature shows that simply prompting people to recall/consider a reference point often fails to change behaviour unless they are forced to actively connect it to the specific case. The two literatures aren't in direct conflict; they're about different failure modes.**

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kahneman & Tversky, "Intuitive prediction: Biases and corrective procedures" | 10.1017/cbo9780511809477.031 | **1982** (book-chapter reprint; see note below) | theory | seminal argument for the "outside view"/reference-class approach to prediction | n/a | n/a | Not independently fetched in full text in this session; DOI verified via CrossRef (title and both authors match). **Lead correction:** claims.md cites this as "Kahneman & Tversky 1979," which is the original TIMS Studies in Management Science publication; that 1979 journal printing has no DOI on record in CrossRef. The only DOI-verifiable record found is the 1982 reprint as a chapter in *Judgment under Uncertainty: Heuristics and Biases* (Cambridge University Press). Both should be cited together, or the 1982 reprint cited alone, until the 1979 original is separately verified. |
| Flyvbjerg, B., "Quality Control and Due Diligence in Project Management: Getting Decisions Right by Taking the Outside View" | 10.1016/j.ijproman.2012.10.007 | 2013 | practice/review | applies Kahneman & Tversky's outside-view theory to project-management due diligence; reports a controlled experiment on students (Lovallo & Kahneman 2003's own report of it) as direct evidence the outside view corrects rather than merely anchors | n/a (reviewed experiment: 2 groups of incoming college students) | a simple "diversion into relevant outside-view information" **reduced** the size of the bias, it did not just relocate it | **Verbatim, fetched from the full-text PDF (International Journal of Project Management), read in full this session:** "The contrast between inside and outside views has been confirmed by systematic research (Buehler, Griffin, and Ross, 1994; Gilovich, Griffin, and Kahneman, 2002). The research shows that when people are asked simple questions requiring them to take an outside view, their forecasts become significantly more accurate. For example, a group of students enrolling at a college were asked to rate their future academic performance relative to their peers in their major. On average, these students expected to perform better than 84 percent of their peers, which is logically impossible. The forecasts were biased by overconfidence. Another group of incoming students from the same major were asked about their entrance scores and their peers' scores before being asked about their expected performance. This simple diversion into relevant outside-view information, which both groups of subjects were aware of, reduced the second group's average expected performance ratings by 20 percent. That is still overconfident, but it is significantly more realistic than the forecast made by the first group (Lovallo and Kahneman 2003:61)." The paper also gives an explicit **boundary condition**: "In this type of situation — when forecasters are honestly trying to gauge the future — the potential for using the outside view to improve outcomes is good... In the second type of situation — where strategic misrepresentation is the main cause of inaccuracy... managers and forecasters may not be interested in this because inaccuracy is deliberate... Under these circumstances the potential for using the outside view is low." |
| Buehler, Griffin & MacDonald (1997), "The Role of Motivated Reasoning in Optimistic Time Predictions," *Personality and Social Psychology Bulletin* 23(3), 238-247 | 10.1177/0146167297233003 | 1997 | experiment | task-completion-time predictions; a "recall condition" prompted participants to recall similar past experiences before predicting; a further manipulation forced participants to actively connect the recalled experience to their current prediction | not independently verified here (abstract elided by publisher/Semantic Scholar) | merely recalling past experiences did **not** reduce optimistic bias; only *forcing* the past to be treated as relevant did | Not independently fetched verbatim this session (JSTOR/SAGE closed; Semantic Scholar/Unpaywall carry no abstract). DOI verified via CrossRef (title/authors/year match). Reported here via a WebSearch synthesis of secondary descriptions of the paper, not a primary quote — flagged accordingly: "Only 12% of participants reported thinking about past experiences when making their current plans in the Recall condition (compared to 2% in the Control condition)... attention to and awareness of the past is not enough to make the past relevant to the future... forcing the past to become relevant eliminates the optimistic prediction bias for completion times." **This is the direct evidence for the "just an anchor, easily ignored" failure mode** — the opposite risk from anchoring: people can write down or be shown a base rate and then simply not use it, discounting it as inapplicable to their special case. |
| Buehler, Griffin & Ross (1994), "Exploring the 'planning fallacy'" | 10.1037/0022-3514.67.3.366 | 1994 | experiment | studies on task-completion time estimation, ignoring past experience | not verified here | n/a | Abstract not independently accessible in this session (Semantic Scholar elides it). DOI verified via CrossRef (title, all three authors, year match). Cited for the well-established finding that people underweight their own past experience (a reference class of one) in favour of scenario-specific plans; not independently re-confirmed by text in this session. Cited directly (and its finding corroborated) in the Flyvbjerg 2013 review above, which treats it as one of the two foundational demonstrations (with Gilovich, Griffin & Kahneman 2002) that outside-view questions improve forecast accuracy. |
| Mellers et al. (2014) | 10.1177/0956797614524255 | 2014 | experiment (field tournament) | (see calibration-feedback above) | — | probability training that explicitly taught forecasters to use reference classes improved calibration and resolution | "Probability training corrected cognitive biases, encouraged forecasters to use reference classes, and provided forecasters with heuristics, such as averaging when multiple estimates were available." (verbatim, already quoted above) — reference-class use is one specific, named ingredient of the trained intervention that worked in a real tournament |

### Replication
No dedicated large replication of reference-class forecasting per se was located within this session's budget; Mellers et al. (2014) is itself a large field study (not a lab replication) that supports the mechanism as one trained component among several, which weakens attribution of its effect to reference-class use alone. The Flyvbjerg 2013 review (now fetched) reports the Lovallo & Kahneman 2003 outside-view manipulation as a **direct, replicated (across two independent research programmes: Buehler/Griffin/Ross and Gilovich/Griffin/Kahneman) demonstration that outside-view prompts improve accuracy**, which is the closest thing to a "replication" of the core reference-class mechanism found this session.

### Backfire evidence
**Gap-fill resolution (2026-09-25):** the evidence on "does the base rate over-anchor, or does it genuinely correct" splits into two distinct findings, both now sourced:
1. **The outside view can genuinely correct, not just anchor**, when the person is made to actually use the reference information as a benchmark (Flyvbjerg 2013, quoting Lovallo & Kahneman 2003: a simple diversion into outside-view information reduced overconfident forecasts by 20%, moving them *toward* accuracy, not just toward an arbitrary number). This is real evidence for the forecast page's design, not merely a plausible mechanism.
2. **The opposite failure mode is at least as well documented: people ignore the reference point.** Buehler, Griffin & MacDonald (1997, WebSearch synthesis, not yet independently fetched verbatim) found that merely prompting recall of past experience did *not* reduce the planning fallacy — only 12% of participants spontaneously connected it to their current estimate, and the bias persisted until participants were forced to actively link the past experience to the plan at hand. This suggests the risk for `forecast` is less "the reference-class number anchors and distorts the estimate" (the risk claims.md's brief and the `anchoring` claim above worry about) and more "the reference-class line gets written and then quietly discounted as not applicable to this case" — a different, and arguably more likely, failure mode than anchoring.
3. Flyvbjerg 2013 also supplies a genuine **boundary condition** not previously sourced: the outside view helps when forecasters are honestly trying to be accurate (optimism-bias case), but does little when inaccuracy is motivated/strategic (their example: competitive grant or project bids) — a distinction the grading step should weigh if forecast's predictions could ever be motivated (e.g., wanting to look good in a review) rather than purely epistemic.
4. This softens, rather than resolves, the design tension the earlier sourcing pass flagged between `anchoring` and `reference-class`: the risk of the base rate becoming a sticky, hard-to-adjust anchor (the `anchoring` claim's well-replicated mechanism) and the risk of it being written and then ignored are **both plausible**, and no source located this session tests forecast's exact manipulation (a written reference-class line placed first, in one's own hand, before a specific-case forecast) to say which risk dominates in that setup.

### Grade
pending

### Adversarial pass
pending

---

## Gap-fill log (2026-09-25)

- **reference-class:** Closed the main open question (outside-view correction vs. anchor). Added and directly fetched in full Flyvbjerg (2013), which reports Lovallo & Kahneman's (2003) controlled experiment showing an outside-view prompt genuinely improved forecast accuracy (reduced overconfidence by 20%, moving estimates toward truth, not toward an arbitrary anchor) — real evidence for a correction mechanism, not just anchoring. Added Buehler, Griffin & MacDonald (1997) via WebSearch synthesis (not yet independently fetched verbatim — flagged) showing the opposite failure mode: people often fail to use a recalled/available reference point at all unless forced to connect it to the specific case, which reframes the likely risk for `forecast` as "the reference-class line gets ignored" rather than "the reference-class line over-anchors." Also surfaced a genuine boundary condition (outside view works for honest forecasting, not for strategic/motivated misrepresentation) not previously sourced. No claim's grade is directly changed by this (still supporting/no load-bearing), but the backfire-evidence section is substantially more informative for the grading and adversarial steps.
- No changes made to decomposed-judgement, anchoring, assumption-surfacing, consider-the-opposite, confidence-resolution, calibration-feedback, or hindsight-record — out of scope for this gap-fill pass (anchoring itself was reviewed for consistency with the reference-class update but its own sources/backfire text were left as originally written, since the assigned gap was specifically the reference-class question).
