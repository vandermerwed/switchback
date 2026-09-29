# Sourcing batch MR-A — memory-retrieval, retrieval and spacing (claims.md §1, claims 1.1–1.10)

All DOIs below were verified against the Crossref REST API in this session (`curl -A "longhand-research (https://github.com/vandermerwed/skills)" "https://api.crossref.org/works/<doi>"`), confirming resolved title, first author, and year match the citation, per claims.md §10 ruling 8. Where a finding is marked "search synthesis" or "paraphrase," the primary abstract page could not be independently fetched this session (PubMed captcha-blocked; several publisher pages 403'd or served only cover sheets) and the wording comes from a secondary source reproducing it, not from text I fetched myself — flagged per the citation-integrity rule rather than presented as a verbatim quote. Where a quote is marked "verbatim, fetched" it was read directly from a PDF or API response in this session. Grade and Adversarial pass are left `pending` for the grading agents.

---

## testing-effect
**Claim:** Retrieving studied material from memory (for example, writing down everything you can recall with the book closed) improves retention at a delay of days or more, compared with spending the same time restudying it.
**Construct:** retrieval practice (testing effect) · **Used by:** free-recall (LB, transfer **direct**) · Series (LB, transfer **adjacent**)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Roediger, H. L. & Karpicke, J. D., "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention" | 10.1111/j.1467-9280.2006.01693.x | 2006 | experiment | 2 experiments; prose passages; repeated free-recall test(s) without feedback vs. repeated restudy; immediate (5 min) and delayed final tests | undergraduates, within-subject | restudy > testing at 5-min test; testing > restudy at delayed test | "When the final test was given after 5 min, repeated studying improved recall relative to repeated testing. However, on the delayed tests, prior testing produced substantially greater retention than studying." (search synthesis reproducing the published abstract; PubMed page itself was captcha-blocked and the SAGE abstract page 403'd, so I could not independently re-fetch the primary text). |
| Rowland, C. A., "The Effect of Testing Versus Restudy on Retention: A Meta-Analytic Review of the Testing Effect" | 10.1037/a0037559 | 2014 | meta-analysis | random-effects meta-analysis, 159 effect sizes from 61 studies (1975–2013), test vs. restudy | k = 159 effect sizes | g = 0.50, 95% CI [0.42, 0.58] | "The mean weighted effect size from the random-effects model, g = 0.50 (CI [0.42, 0.58]), was greater than 0 ... indicating a reliable testing effect ... There was a high degree of heterogeneity among the samples included in the analysis (tau² = 0.21, Q = 1,009.42, p < .001), with a substantial majority of the overall between studies resulting from heterogeneity (I² = 84.35)." (verbatim, fetched from the full-text PDF, Results section, p. 12). |
| Adesope, O. O., Trevisan, D. A. & Sundararajan, N., "Rethinking the Use of Tests: A Meta-Analysis of Practice Testing" | 10.3102/0034654316689306 | 2017 | meta-analysis | meta-analysis of practice-testing studies (secondary sources describe it as ~217 studies) | not independently verified this session | g ≈ 0.51 (vs. restudy); g ≈ 0.93 (vs. filler/no re-presentation) | "Students who take practice tests often outperform students in non-testing learning conditions such as restudying, practice, filler activities, or no re-presentation of the material." (search synthesis of a secondary summary page; the primary SAGE/ERIC abstract page could not be fetched — ERIC connection reset, ResearchGate 403'd). |
| Pan, S. C. & Rickard, T. C., "Transfer of Test-Enhanced Learning: Meta-Analytic Review and Synthesis" | 10.1037/bul0000151 | 2018 | meta-analysis | random-effects meta-analysis; 192 transfer effect sizes, 122 experiments, 67 articles, N = 10,382 | N = 10,382 | d = 0.40, 95% CI [0.31, 0.50] (transfer, vs. nontesting reexposure control) | "A random-effects model revealed that testing can yield transferrable learning as measured relative to a nontesting reexposure control condition (d = 0.40, 95% CI [0.31, 0.50]). That transfer of learning is greatest across test formats, to application and inference questions, to problems involving medical diagnoses, and to mediator and related word cues; it is weakest to rearranged stimulus–response items, to untested materials seen during initial study, and to problems involving worked examples ... In two assessments for publication bias using PET-PEESE and various selection methods, the moderator effect sizes were minimally affected. However, the intercept predictions were substantially reduced, often indicating no positive transfer when none of the aforementioned moderators are present." (verbatim, fetched via Semantic Scholar API, full abstract). |

### Replication
No Many Labs or RRR project targeting the testing effect specifically was found (searched: general knowledge of the Many Labs 1–5 and RRR project lists; none names test-enhanced learning as its target effect). The effect's robustness instead rests on the convergence of the four independent meta-analyses above, spanning 1975–2017 source studies.

### Backfire evidence
- Roediger & Karpicke 2006 itself: at a 5-minute (near-immediate) final test, repeated restudy beat repeated testing; the testing advantage appeared only at the delayed test. This bounds free-recall's design: the benefit is a delayed-retention effect, not an immediate-performance one.
- Pan & Rickard 2018: transfer of testing is **weakest** for untested material seen during initial study and for problems involving worked examples, and their publication-bias-corrected models show the transfer intercept is "often indicating no positive transfer when none of the aforementioned moderators are present" — i.e., transfer is conditional, not a free-standing near-zero-cost bonus. This is directly relevant to tie-break rule 2 (§6.2) **for the transfer question specifically**, though it does not touch the core (non-transfer) testing-vs-restudy retention effect, which Rowland 2014 grades robustly.
- Flag for the grading step: Rowland 2014 reports I² = 84.35% (>75%), which trips tie-break rule 4 (§6.2, "high unexplained heterogeneity → at most B, unless a reported moderator matches our conditions of use"). Rowland does report a moderator — initial test type (recall vs. recognition) — that plausibly matches free-recall's own design (open-book-closed free recall), which the grading agent should weigh against the heterogeneity cap.

### Grade
pending

### Adversarial pass
pending

---

## retrieval-feedback
**Claim:** Checking recall against the source right after retrieving it increases the retention benefit and corrects errors that would otherwise persist. Without feedback, errors produced during recall tend to be retained.
**Construct:** feedback in test-enhanced learning; self-scoring accuracy · **Used by:** free-recall (LB: the second-colour check pass)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pashler, H., Cepeda, N. J., Wixted, J. T. & Rohrer, D., "When Does Feedback Facilitate Learning of Words?" | 10.1037/0278-7393.31.1.3 | 2005 | experiment | Luganda–English word pairs; feedback presence/type varied between subjects; final test 1 week later | N = 258 | supplying correct answer after an error increased final retention by 494%; feedback after correct responses had little effect | "Supplying the correct answer after an incorrect response not only improved performance during the initial learning session—it also increased final retention by 494%. On the other hand, feedback after correct responses made little difference either immediately or at a delay, regardless of whether the subject was confident in the response." (verbatim, fetched from the full-text PDF abstract). |
| Butler, A. C. & Roediger, H. L., "Feedback Enhances the Positive Effects and Reduces the Negative Effects of Multiple-Choice Testing" | 10.3758/MC.36.3.604 | 2008 | experiment | multiple-choice test with immediate feedback, delayed feedback, or no feedback; delayed cued-recall final test | not stated in abstract | feedback increased correct responses and reduced intrusions from lure items, vs. no feedback | "In comparison with the no-feedback condition, both immediate and delayed feedback increased the proportion of correct responses and reduced the proportion of intrusions (i.e., lure responses from the initial multiple-choice test) on a delayed cued recall test. Educators should provide feedback when using multiple-choice tests." (verbatim, fetched from the full-text PDF abstract). |
| Butler, A. C., Karpicke, J. D. & Roediger, H. L., "Correcting a Metacognitive Error: Feedback Increases Retention of Low-Confidence Correct Responses" | 10.1037/0278-7393.34.4.918 | 2008 | experiment | 2 experiments; general-knowledge multiple-choice with confidence judgments, then feedback | not independently verified | feedback selectively boosted retention of low-confidence (but correct) responses | "When correct responses are made with low confidence, feedback serves to correct this initial metacognitive error, enhancing retention of low-confidence correct responses." (search synthesis; primary abstract page not independently fetched this session). |
| Dunlosky, J., Hartwig, M., Rawson, K. A. & Lipko, A. R., "Improving College Students' Evaluation of Text Learning Using Idea-Unit Standards" | 10.1080/17470218.2010.502239 | 2011 | experiment | 2 experiments; recall of key-term definitions, self-judged whole-definition vs. idea-unit standards | not independently verified | global self-judgment is overconfident; idea-unit judgment reduces overconfidence | "College students are often overconfident in the quality of their responses [when self-scoring recall against a standard]. Even with commission errors, they often judge that their response is entirely or partially correct... idea-unit judgements [reduce] overconfidence." (search synthesis; Tandfonline abstract page 403'd, Semantic Scholar and Unpaywall returned no cached abstract). |

### Replication
No large pre-registered replication of feedback timing (immediate vs. delayed) was found (searched).

### Backfire evidence
- Dunlosky et al. 2011 (above): when learners self-score their own recall against a standard, they are systematically overconfident unless forced to judge idea-unit by idea-unit rather than globally — directly relevant to free-recall's design, which relies on the person self-administering the check pass. This supports building the check as an idea-unit-level comparison rather than a global "did I get it right?" judgment.
- Pashler et al. 2005 (above): feedback's benefit is concentrated on **correcting errors**; it does little for already-correct recall. This means free-recall's check pass functions mainly as error-correction, not as a general retention booster on top of testing itself — worth naming explicitly in the item's `helps` text.

### Grade
pending

### Adversarial pass
pending

---

## hypercorrection
**Claim:** Errors a person made with high confidence are more likely to be corrected on a later test, once feedback is seen, than errors made with low confidence.
**Construct:** the hypercorrection effect · **Used by:** free-recall (S; variant `with-confidence`) · decision-diagnosis/confidence-dots protocol (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Butterfield, B. & Metcalfe, J., "Errors Committed With High Confidence Are Hypercorrected" | 10.1037/0278-7393.27.6.1491 | 2001 | experiment | general-knowledge questions, confidence ratings, then correct-answer feedback, later retest | not independently verified (PubMed page captcha-blocked) | high-confidence errors corrected more than low-confidence errors | Described (not independently re-quoted from its own abstract) via Metcalfe & Finn 2011's replication text, below, which cites this as "the standard paradigm." |
| Metcalfe, J. & Finn, B., "People's Hypercorrection of High-Confidence Errors: Did They Know It All Along?" | 10.1037/a0021962 | 2011 | experiment | 3 experiments replicating and extending Butterfield & Metcalfe 2001's paradigm | not stated in abstract | high-confidence errors are both more likely corrected and, per the "knew it all along" account, more likely to have been implicitly known | "In the standard paradigm ... participants were asked to generate the answers to general information questions and to rate their confidence in the correctness of each answer they produced. They were then given the correct answer. At later test, it was found that people were more likely to respond correctly to the questions that had produced high- rather than low-confidence errors." Also: "when people said that they knew it all along, they were right." (verbatim, fetched from the full-text PDF). |
| Metcalfe, J., "Learning From Errors" | 10.1146/annurev-psych-010416-044022 | 2017 | review | Annual Review synthesis of errorful-learning and hypercorrection literature | n/a | corrective feedback after errorful learning is beneficial, especially for high-confidence errors | "Experimental investigations indicate that errorful learning followed by corrective feedback is beneficial to learning. Interestingly, the beneficial effects are particularly salient when individuals strongly believe that their error is correct: Errors committed with high confidence are corrected more readily than low-confidence errors. Corrective feedback, including analysis of the reasoning leading up to the mistake, is crucial." (verbatim, fetched from the full-text PDF abstract). |
| Butler, A. C., Fazio, L. K. & Marsh, E. J., "The Hypercorrection Effect Persists Over a Week, But High-Confidence Errors Return" | 10.3758/s13423-011-0173-y | 2011 | experiment | general-knowledge questions, confidence ratings, feedback; retest immediately or after a 1-week delay | not stated in abstract | hypercorrection occurs at both delays, but weakens, and previously-corrected high-confidence errors reappear more than low-confidence ones | "The hypercorrection effect occurred on both the immediate and delayed final tests, but error correction decreased on the delayed test. When subjects failed to correct an error on the delayed test, they sometimes reproduced the same error from the initial test. Interestingly, high-confidence errors were more likely than low-confidence errors to be reproduced on the delayed test." (verbatim, fetched via WebFetch of the Duke Scholars record, which reproduces the full published abstract). |

### Replication
No Many Labs/RRR-style replication was found. Butler, Fazio & Marsh 2011 functions as a direct extension/replication of Butterfield & Metcalfe 2001's paradigm at a 1-week delay, and confirms the core effect persists but weakens.

### Backfire evidence
Butler, Fazio & Marsh 2011 (above) is itself the backfire/boundary finding the brief asked for: high-confidence errors, if the correction is later forgotten, are **more** likely than low-confidence errors to reappear at delay. So hypercorrection's benefit is not permanent — it depends on the correction itself being retained, which raises the same forgetting curve the effect otherwise ameliorates.

### Grade
pending

### Adversarial pass
pending

---

## pretesting
**Claim:** Trying to answer questions about material before studying it, even when most answers are wrong, improves later retention of that material compared with studying it without a pretest.
**Construct:** the pretesting / prequestion effect (errorful generation) · **Used by:** free-recall (S; variant `cued`, used before the first study session) · Series (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Richland, L. E., Kornell, N. & Kao, L. S., "The Pretesting Effect: Do Unsuccessful Retrieval Attempts Enhance Learning?" | 10.1037/a0016496 | 2009 | experiment | 5 experiments; essay/prose passages; pretest condition vs. extended-study condition; only pretest-unsuccessful items analyzed | not independently verified | posttest performance better after pretesting than after extended study, in all 5 experiments | "Posttest performance was better in the test condition than in the extended study condition in all experiments—a pretesting effect—even though only items that were not successfully retrieved on the pretest were analyzed." (search synthesis; primary APA abstract page not independently fetched). |
| Kornell, N., Hays, M. J. & Bjork, R. A., "Unsuccessful Retrieval Attempts Enhance Subsequent Learning" | 10.1037/a0015729 | 2009 | experiment | 6 experiments; general-knowledge questions and weak cue–associate pairs, engineered so retrieval attempts fail; test condition vs. read-only condition | not stated in abstract | unsuccessful retrieval attempts enhanced later learning with both materials | "Unsuccessful retrieval attempts enhanced learning with both types of materials. These results demonstrate that retrieval attempts enhance future learning; they also suggest that challenging tests—instead of avoiding errors—may be key to effective learning." (verbatim, fetched from the full-text PDF abstract). |
| Pan, S. C. & Carpenter, S. K., "Prequestioning and Pretesting Effects: A Review of Empirical Research, Theoretical Perspectives, and Implications for Educational Practice" | 10.1007/s10648-023-09814-5 | 2023 | review | narrative + quantitative-leaning review of the prequestioning/pretesting literature | n/a | prequestioning/pretesting reliably helps, magnitude varies by procedure and assessment | "This prequestioning effect or pretesting effect has been successfully demonstrated with a variety of learning materials, despite many erroneous responses being generated on initial tests, and in conjunction with text materials, videos, lectures, and/or correct answer feedback... The evidence to date indicates that prequestioning and pretesting can often enhance learning, but the extent of that enhancement may vary due to differences in procedure or how learning is assessed." (verbatim, fetched via Semantic Scholar API, full abstract). |
| Carpenter, S. K. & Toftness, A. R., "The Effect of Prequestions on Learning From Video Presentations" | 10.1016/j.jarmac.2016.07.014 | 2017 (JARMAC print; Crossref/Unpaywall record the online/journal year as 2016) | experiment | 85 students watched a 3-segment video (Easter Island history); half attempted 2 prequestions before each ~2-min segment; later test covered both prequestioned and non-prequestioned content | N=85 | prequestions helped recall of **both** prequestioned and non-prequestioned video content — no selective-processing cost found | **Gap-fill correction (2026-09-25):** the row as originally written implied this study found the selective-processing cost it was testing for. It did not. Per a WebSearch synthesis of the abstract (ScienceDirect and Unpaywall still returned no fetchable abstract text this session, so this remains unverified by direct quote — flagged accordingly): the study's own framing is that "studies demonstrating the prequestion effect in reading tasks have shown that such prequestions may not enhance — and could even impair — learning of information that was not prequestioned... The current study explored the effects of prequestions on learning from videos, where such a selective processing strategy would be less likely to occur," and it found "a significant advantage for the Prequestion Group over the Control Group, and this pertained to both prequestioned and non-prequestioned information." If this synthesis is accurate, the selective-processing backfire is a **reading**-specific risk, not one demonstrated for video, which is the reverse of how the row previously read. **Still not independently fetched verbatim this session — treat the direction as a strong lead, not a confirmed quote, until re-checked.** |

### Replication
No Many Labs/RRR replication was found; Pan & Carpenter 2023 is the most current synthesis and post-dates the seminal studies by well over a decade, functioning as an informal large-scale replication check across many labs' individual studies.

### Backfire evidence
- **Gap-fill correction (2026-09-25):** Carpenter & Toftness 2017 (above) was previously read as evidence of a selective-processing cost. On closer reading (still via WebSearch synthesis, not a verbatim primary quote — see the row above), the paper's own video experiment found **no** such cost: prequestioning helped both prequestioned and non-prequestioned content. The selective-processing risk it discusses is attributed to *prior reading-based studies*, not to its own video findings. This weakens, rather than supports, the backfire case for pretesting/prequestioning specifically as applied to video or passage material — though the risk may still hold for reading tasks per those prior studies, which were not independently traced this session.
- Kornell, Hays & Bjork 2009's own introduction explicitly weighs the pretesting effect against **errorless-learning theory**, which predicts the opposite (that unsuccessful retrieval should impede, not help, learning) — the brief's "does instruction-first ever win" question is the live theoretical fault line here, not a settled boundary condition.

### Grade
pending

### Adversarial pass
pending

---

## retrieval-before-review
**Claim:** Opening a study session by retrieving earlier material before restudying it improves learning from the restudy that follows, compared with restudying first.
**Construct:** test-potentiated learning (retrieval-enhanced new learning) · **Used by:** Series (LB): every session opens with retrieval before review
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Izawa, C., "Optimal Potentiating Effects and Forgetting-Prevention Effects of Tests in Paired-Associate Learning" | 10.1037/h0028541 | 1970 | experiment | paired-associate learning; test-trial vs. study-trial sequencing | not fetched | origin of "test-potentiated learning" as a construct | **still unread (gap-fill 2026-09-25):** Crossref confirms title, sole author (Chizuko Izawa), journal (*Journal of Experimental Psychology*, vol. 83, pp.340–344), and February 1970 publication date exactly, and its Crossref record links to `http://psycnet.apa.org/journals/xge/83/2p1/340.pdf` (APA's own copy). No abstract field exists on the Crossref record — consistent with 1970-era APA journal practice, which did not carry structured abstracts. WebSearch this session turned up only citation-list mentions (e.g. as one of the pre-1980s seminal testing-effect studies alongside Gates 1917, Spitzer 1939, Tulving 1967), never a quotable summary of its own findings. The PDF link itself was not fetched this session (time budget). Genuinely unread; flagged rather than guessed at. |
| Arnold, K. M. & McDermott, K. B., "Test-Potentiated Learning: Distinguishing Between Direct and Indirect Effects of Tests" | 10.1037/a0029199 | 2013 | experiment | uses conditional probability to isolate the indirect (potentiating) effect of a prior test on subsequent restudy from the direct effect of the test itself | not stated in abstract | unsuccessful retrieval attempts enhanced the effectiveness of subsequent restudy | "The results indicate that unsuccessful retrieval attempts enhance the effectiveness of subsequent restudy, demonstrating that tests do potentiate subsequent learning." (verbatim, fetched via Semantic Scholar API, full abstract). |
| Chan, J. C. K., Meissner, C. A. & Davis, S. D., "Retrieval Potentiates New Learning: A Theoretical and Meta-Analytic Review" | 10.1037/bul0000166 | 2018 | meta-analysis | theoretical review + meta-analysis of the test-potentiated-new-learning literature | n/a in abstract | testing reliably potentiates later learning of new material, but the size/direction depends on several moderators | "Our quantitative review of the literature showed that testing reliably potentiates the future learning of new materials by increasing correct recall or by reducing erroneous intrusions, and several factors have a powerful impact on whether testing potentiates or impairs new learning ... Results of a metaregression analysis provide considerable support for the integration account." (verbatim, fetched via Semantic Scholar API, full abstract). |

**Lead correction:** claims.md's brief cites this meta-analysis as "Chan, Manley, Davis & Szpunar 2018." The actual paper (verified via Crossref, DOI 10.1037/bul0000166) is authored by **Chan, Meissner & Davis** (2018) — no "Manley" and no Szpunar. A related but distinct paper, Chan & Szpunar et al. (Journal of Memory and Language, 2018, "Testing potentiates new learning across a retention interval and a lag"), does exist with Szpunar as a co-author, but it is not this meta-analysis.

### Replication
No Many Labs/RRR replication was found; Chan, Meissner & Davis 2018's meta-analytic synthesis is the closest available large-scale check on the effect's generality.

### Backfire evidence
Chan, Meissner & Davis 2018's own abstract flags that "several factors have a powerful impact on whether testing potentiates **or impairs** new learning" — i.e., the effect is not unconditional. Time did not permit pulling the specific moderator list from the full text this session; flagged for the grading/adversarial step to check before treating this as unconditionally robust.

### Grade
pending

### Adversarial pass
pending

---

## distributed-practice
**Claim:** Spreading the same amount of study or retrieval across sessions separated by days produces better long-term retention than massing it into one session.
**Construct:** the spacing effect (distributed practice) · **Used by:** Series (LB, transfer **direct to adjacent**)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. & Rohrer, D., "Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis" | 10.1037/0033-2909.132.3.354 | 2006 | meta-analysis | review/meta-analysis of verbal-recall spacing studies | 839 effect sizes from 317 experiments in 184 articles | positive distributed-practice effect, robust across a wide range of lags | "The authors performed a meta-analysis of the distributed practice effect ... finding 839 assessments of distributed practice in 317 experiments located in 184 articles." (search synthesis; the escholarship PDF served only a cover/landing page, not the abstract text, in this session). |
| Donovan, J. J. & Radosevich, D. J., "A Meta-Analytic Review of the Distribution of Practice Effect: Now You See It, Now You Don't" | 10.1037/0021-9010.84.5.795 | 1999 | meta-analysis | 63 studies, 112 effect sizes, spaced vs. massed practice | k = 112 effect sizes / 63 studies | overall weighted effect size 0.46 favoring spaced practice | "A meta-analysis of 63 studies with 112 effect sizes yielded an overall mean weighted effect size of 0.46, indicating that individuals in spaced practice conditions performed significantly higher than those in massed practice conditions. Subsequent analyses, however, suggested that the nature of the task being practiced, the intertrial time interval, and the interaction between these two variables significantly moderated the relationship between practice conditions and performance. In addition, significantly higher effect sizes were found in studies with low methodological rigor as compared with those studies higher in rigor." (verbatim, fetched from the full-text PDF abstract). |
| Kornell, N., "Optimising Learning Using Flashcards: Spacing Is More Effective Than Cramming" | 10.1002/acp.1537 | 2009 | experiment | flashcard-based vocabulary learning; spaced vs. massed study schedules, real study materials | not independently verified | spacing outperformed massed cramming | Title itself states the finding; primary abstract page not independently fetched this session (publisher paywalled, no cached abstract via Semantic Scholar/Unpaywall). |
| Kornell, N. & Bjork, R. A., "Optimising Self-Regulated Study: The Benefits—and Costs—of Dropping Flashcards" | 10.1080/09658210701763899 | 2008 | experiment | self-paced flashcard study; examines what learners do when allowed to drop mastered items | not independently verified | learners' self-regulation choices interact with, and can undercut, the benefits of spacing | Title/topic confirmed via Crossref; primary abstract not independently fetched this session. |

**Disambiguation note:** two distinct "Kornell & Bjork 2008" papers exist in this literature. The one used under `interleaving-confusable` below ("Learning Concepts and Categories: Is Spacing the Enemy of Induction?", 10.1111/j.1467-9280.2008.02127.x, painting-style induction) is **not** the same paper as the one used here (flashcard-dropping, 10.1080/09658210701763899). The brief's citation for this claim's "judgment of learning" backfire point is more precisely satisfied by Kornell 2009 (flashcards) than by either 2008 paper; both are included above since both are genuinely about self-regulated spacing choices.

### Replication
The spacing effect is among the most-replicated findings in cognitive psychology; no single Many Labs/RRR project was found, but its robustness rests on the convergence of at least two independent meta-analyses three decades apart (Donovan & Radosevich 1999; Cepeda et al. 2006), plus the ridgeline study under `spacing-gap-ratio` below.

### Backfire evidence
Kornell 2009 and Kornell & Bjork 2008 (dropping flashcards) both bear on the brief's question: learners' own judgments of learning tend to favor massed study even when spaced study produces superior test performance, which is a metacognitive-illusion risk for whether people will actually keep to the Series schedule voluntarily rather than reverting to cramming. Donovan & Radosevich 1999 additionally reports that the spacing advantage is **moderated by task type and intertrial interval**, and that effect sizes were inflated in lower-rigor studies — worth weighing against Cepeda et al. 2006's larger, more recent synthesis if the two disagree (tie-break rule 3).

### Grade
pending

### Adversarial pass
pending

---

## spacing-gap-ratio *(parameter)*
**Claim:** For a fixed retention interval, the gap between sessions that maximises retention is a fraction of that interval, and that fraction shrinks as the interval grows. For a target of about one month, gaps of about 1, 3 and 7 days fall in or near the high-retention region.
**Construct:** the spacing lag × retention interval interaction (the "temporal ridgeline") · **Used by:** Series (P): the 1d/3d/7d gap schedule and the ≈1-month target retention interval
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T. & Pashler, H., "Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention" | 10.1111/j.1467-9280.2008.02209.x | 2008 | experiment | fact-learning; initial study, a gap of up to 3.5 months, a review, then a final test at a further delay of up to 1 year | N > 1,350 | optimal gap is a fraction of retention interval that shrinks as the interval grows | "At any given test delay, an increase in the interstudy gap at first increased, and then gradually reduced, final test performance. The optimal gap increased as test delay increased. However, when measured as a proportion of test delay, the optimal gap declined from about 20 to 40% of a 1-week test delay to about 5 to 10% of a 1-year test delay. The interaction of gap and test delay implies that many educational practices are highly inefficient." (verbatim, fetched from the full-text PDF abstract). |
| Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. & Rohrer, D. (2006) — see `distributed-practice` above | 10.1037/0033-2909.132.3.354 | 2006 | meta-analysis | (as above) | — | corroborates the general spacing-gap interaction at a larger scale | Cross-referenced as supporting synthesis; not re-quoted here. |

### Extraction (per the brief)
The paper reports the optimal-gap-as-proportion-of-delay figure at two benchmarks: **~20–40% of a 1-week delay**, and **~5–10% of a 1-year delay**. Longhand's target retention interval is ≈1 month. Interpolating between these two points (log-ish decay implied by the abstract's own framing), the optimal gap ratio for a ~1-month delay plausibly sits somewhere in the ~10–20% range, i.e., roughly 3–6 days. Checked against Series' 1d/3d/7d schedule: 1 day = 3.3% of 30 days (below the interpolated band — on this reading, the first gap may be shorter than optimal, though it is also the first of three escalating rounds, not a single test); 3 days = 10% (at the low end of the interpolated band); 7 days = 23% (within, or just above, the interpolated band). The **7-day gap is the best-supported of the three** by this direct extrapolation; the 1-day gap is the weakest-supported. This reading is an interpolation between two reported benchmarks, not a value read directly off the paper's own ~1-month data point — the adversarial pass should re-check the paper's Figure 3/4 (not read this session) for whether a ~30-day-delay curve is reported directly, which would replace this interpolation with a real data point.

### Backfire evidence
The abstract itself frames the relationship as a ridgeline (inverted-U), not a monotonic one: gaps that are too short **and** gaps that are too long both reduce final performance relative to the optimum. I did not, within this session's time budget, extract the reported asymmetry (i.e., whether being too short costs more than being too long, or vice versa) from the body of the paper — flagged as open for the grading/spot-check step, since it bears on how much slack the "about 1/3/7 days" wording should be given if a session slips.

### Grade
pending

### Adversarial pass
pending

---

## expanding-vs-uniform
**Claim:** An expanding schedule of retrieval gaps (for example 1d → 3d → 7d) produces better long-term retention than a uniform schedule with the same total spacing.
**Construct:** expanding vs. equal-interval retrieval practice · **Used by:** Series — **reclassified to Parameter per claims.md §10 ruling 4** (was LB per spec §8; the lead ruling moves it to P because the comparison is inconclusive and Series' mechanism does not depend on which schedule shape wins)
**Load-bearing:** no (parameter, per ruling 4)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Karpicke, J. D. & Roediger, H. L., "Expanding Retrieval Practice Promotes Short-Term Retention, But Equally Spaced Retrieval Enhances Long-Term Retention" | 10.1037/0278-7393.33.4.704 | 2007 | experiment | word-pair retrieval practice; expanding vs. equal ("uniform") retrieval schedules; short- and long-term final tests | not independently verified | expanding wins short-term; equal/uniform spacing wins long-term | The paper's own title states the finding directly: expanding retrieval helps short-term retention, but equal/uniform spacing wins at a longer delay. Full abstract text not independently fetched this session (Purdue mirror had a certificate mismatch; the direct memory.psych.purdue.edu link failed TLS validation). |
| Latimier, A., Peyre, H. & Ramus, F., "A Meta-Analytic Review of the Benefit of Spacing Out Retrieval Practice Episodes on Retention" | 10.1007/s10648-020-09572-8 | 2021 | meta-analysis | meta-analysis of spaced-retrieval-practice studies | not independently verified | supports spacing generally; comparison of expanding vs. uniform specifically not confirmed this session | Not independently quoted this session (OSF/PsyArXiv preprint page returned only a stub; the published Springer page was not reached). Included as a verified-DOI lead for the adversarial pass to follow up. |

### Replication
No dedicated pre-registered comparison of expanding vs. uniform schedules was found (searched, within time budget).

### Backfire / moderator (this claim IS the moderator finding)
Karpicke & Roediger 2007's own title is the moderator: which schedule "wins" **reverses** depending on retention interval (expanding for short delays, uniform for long delays). This directly supports lead ruling 4's decision to demote this claim from load-bearing to parameter — Series' mechanism (spacing + retrieval) does not depend on resolving which schedule shape is better, and the grading report should record which option (uniform, given Series' month-long target retention interval) the Series schedule should adopt on this evidence.

### Grade
pending

### Adversarial pass
pending

---

## successive-relearning *(parameter)*
**Claim:** Retrieving items to a criterion across several spaced sessions, and dropping or targeting items according to the previous session's failures, gives durable retention. Returns diminish after about three relearning sessions.
**Construct:** successive relearning · **Used by:** Series (P): three sessions, and "each round's recall prompts target the previous round's gaps"
**Load-bearing:** no (parameter)

**Gap-fill (2026-09-25): resolved with a new primary source (Rawson & Dunlosky 2012) and a directly-fetched review chapter (Dunlosky, Wissman, Greve, Badali & Rawson 2023) that reproduces the underlying data. The picture changes from claims.md's framing: the literature does not show returns "diminishing after about three sessions" as a plateau point — retention keeps climbing through the fifth session tested, with the increment shrinking each time, and the seminal authors explicitly decline to name three as a cutoff.**

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rawson, K. A. & Dunlosky, J., "When Is Practice Testing Most Effective for Improving the Durability and Efficiency of Student Learning?" | 10.1007/s10648-012-9203-1 | 2012 | review | narrative review by the seminal authors, summarising their own lab's experiments on relearning-session count (including Rawson & Dunlosky 2011, Experiment 3, N=335 undergraduates, 1–5 relearning sessions, final tests at 1 and 4 months) | N=335 (the underlying large-scale study reviewed) | retention rises across all 5 sessions tested, with shrinking increments; authors recommend "at least three" as a floor, not a plateau point | Abstract: "To briefly foreshadow, a particularly effective schedule involves practicing retrieval until target information is correctly recalled once during initial learning and then relearned to one correct recall in three to four subsequent sessions." Body (p.426, reporting the 1-month/4-month final tests by number of relearning sessions): "Completing three versus one relearning session produced a 60% relative increase in performance on the 1-month test... Completing five versus one relearning sessions produced an 86% relative increase on the 1-month test and a 64% increase on the 4-month test." Conclusion (p.431): "With that said, certainly some point will be reached at which additional relearning sessions no longer produce meaningful improvements in durable learning. The results shown in Fig. 3 suggest as much, given the minimal differences in long-term retention after four versus five relearning sessions... We are reluctant to declare a universal 'magic number' of relearning sessions at this point... However, our tentative recommendation is that students engage in at least three relearning sessions, because the benefits consistently appear to warrant the costs." (verbatim, fetched from the full-text PDF, read in full this session) |
| Dunlosky, J., Wissman, K. T., Greve, M., Badali, S. & Rawson, K. A., "Successive Relearning: An Introduction and Guide for Educators" | isbn/url: APA Division 2's *In Their Own Words* series, 2023, pp.83–93 (no DOI on record; open PDF at unh.edu, see below) | 2023 | practice/review | practitioner guide by the seminal authors, summarising Rawson et al. (2013), Higham et al. (2022), Janes et al. (2020), Rawson et al. (2020), and an unpublished study (Rawson, Wissman & Dunlosky 2021, 174 eighth-graders, 0/1/2/3 relearning sessions) | 174 (the eighth-grade study reported in Figure 2) | recall rises monotonically from 0→1→2→3 sessions, with no plateau evident by 3; the guide itself states the "how many sessions" question is unresolved | On the eighth-grade study (Fig. 2): "A month after practice, students who completed three relearning sessions recalled nearly 60% of the concepts from memory." On the open "how many is enough" question generally (p.91): "we must emphasize that research has not yet systematically explored 'how much is enough' for producing (extremely) long-term retention of knowledge. Given the promise of successive relearning, a major challenge for educational research will be to better understand how much successive relearning is required to enjoy its long-term benefits." (verbatim, fetched from the full-text PDF at https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-successive-relearning-dunlosky-greve-badali-wissman-rawson.pdf, read in full this session) |
| Rawson, K. A., Dunlosky, J. & Janes, J. L., "All Good Things Must Come to an End: A Potential Boundary Condition on the Potency of Successive Relearning" | 10.1007/s10648-020-09528-y | 2020 | experiment | 3 experiments, N=431 college students, probability-problem-solving (not verbal/definitional) relearning, 1 vs. 3 sessions, criterion test 1 week later | N=431 | small effect on a novel-problem criterion test (d=.28); average performance ~50% or below even with 3 sessions — a domain-specific (procedural, not verbal) boundary condition, not a "diminishing after 3" finding | Not independently fetched this session (no open abstract found; ScienceDirect/Springer paywalled, Semantic Scholar elides the abstract). Title, authors and year verified via Crossref. Described here via the Dunlosky et al. 2023 guide's own summary (fetched directly, above): "the successive relearning group demonstrated a significant advantage on the criterion test, but the effect size was small (Cohen's d = .28); average performance was also around 50% or less for the successive relearning group, which means even more (or a different kind of) practice may be needed to gain mastery." |
| Rawson, K. A., Dunlosky, J. & Sciartelli, S. M., "The Power of Successive Relearning: Improving Performance on Course Exams and Long-Term Retention" | 10.1007/s10648-013-9240-4 | 2013 | review | narrative synthesis of successive-relearning studies, course-exam and long-term-retention outcomes | n/a | successive relearning across sessions durably improves exam performance and retention; not itself the source of a "3 sessions" recommendation | Not independently quoted this session (Springer page redirected to an IdP login wall; no cached abstract found via Semantic Scholar/Unpaywall). Title and DOI verified via Crossref. Its own headline result, reported second-hand via the Dunlosky et al. 2023 guide (fetched directly): using successive relearning, "students recalled over 60% of the concepts correctly... whereas they recalled less than 20% when they learned the concepts on their own" 24 days after an exam. |
| Rawson, K. A., Vaughn, K. E., Walsh, M. & Dunlosky, J., "Investigating and Explaining the Effects of Successive Relearning on Long-Term Retention" | 10.1037/xap0000146 | 2018 | experiment | key-term relearning across multiple spaced sessions to a recall criterion | not independently verified | quantifies durability of successive relearning sessions | Not independently quoted this session; verified via Crossref only. Publisher abstract remains closed (confirmed again via Semantic Scholar/Unpaywall this session: `abstract` field elided). |

### Extraction (per the brief) — updated
**Lead correction:** claims.md's brief names Rawson, Dunlosky & Sciartelli 2013 as the "Evidence" source for the number of sessions. The actual primary data on session-count and diminishing returns comes from **Rawson & Dunlosky 2011** (Experiment 3, N=335, tested 1–5 relearning sessions), as reviewed and quoted directly in **Rawson & Dunlosky 2012** (fetched in full this session, above) — a different paper from the one claims.md names. Rawson, Dunlosky & Sciartelli 2013 and the Higham et al. 2022 replication (see below) are course-embedded field studies that used **three** sessions by design choice, not because they demonstrated three is where returns plateau.

**What the evidence actually says:** Retention increases from 1→2→3→4→5 relearning sessions with a shrinking but still-positive increment at every step (34%→46%→54%→60%→63% correct recall at the 1-month test, per Rawson & Dunlosky 2011's data as summarized in the 2012 review). The authors' own account of "diminishing returns" is about **time cost**, not benefit: "completing more relearning sessions produces diminishing incremental costs (i.e., in time spent studying), because the speed of relearning accelerates across sessions" (Rawson & Dunlosky 2012, General Discussion). The only point where they observe near-zero *marginal benefit* is between the fourth and fifth session, not the third. Their own recommendation — "at least three relearning sessions" — is an evidence-based floor chosen because the cost/benefit ratio is favourable by that point, explicitly **not** a claim that benefits stop growing after three, and they refuse to call any number a "magic number." A separate, more recent paper (Rawson, Dunlosky & Janes 2020) found the successive-relearning advantage is much weaker for procedural material (probability problem-solving) than for the verbal/definitional material used in the session-count studies above — a genuine boundary condition on the whole construct, distinct from the diminishing-returns question.

**Bottom line for grading:** claims.md's "returns diminish after about three relearning sessions" is not well supported as stated. The literature supports "three sessions is a reasonable, evidence-based minimum, chosen for good cost/benefit reasons, with further sessions continuing to help modestly" — a materially different and weaker claim. The grading agent should treat Series' "3 sessions" as a defensible design choice (D-adjacent, closer to a parameter grounded loosely in evidence) rather than as an empirically-derived point of maximal return.

### Backfire evidence
Rawson, Dunlosky & Janes 2020 (above) is itself the clearest backfire/boundary evidence located this session: successive relearning's benefit shrinks and is inconsistent for procedural (mathematical) material relative to the verbal/definitional material most of this literature uses — directly relevant since Series applies the technique to "mixed personal material," not course key-terms. The brief's other backfire questions (do learners drop items too early; does targeting only the gaps starve weakly-held items) remain open — no source located this session tests them directly. Bahrick 1979 (the brief's other seminal lead, decades-long relearning studies) was not located/verified this session due to time; it is cited within the Dunlosky et al. 2023 guide as the theoretical basis for why forgetting necessitates relearning at all, but not for the specific session-count question.

### Grade
pending

### Adversarial pass
pending

---

## interleaving-confusable *(parameter / style rule)*
**Claim:** Interleaving practice across confusable categories or problem types improves later discrimination and problem solving compared with blocked practice. The benefit shrinks, or reverses, for dissimilar categories and for verbal or expository material.
**Construct:** interleaving (discriminative contrast) · **Used by:** Series (P): the conditional rule "mix problem types within a round only when categories are confusable"
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kornell, N. & Bjork, R. A., "Learning Concepts and Categories: Is Spacing the 'Enemy of Induction'?" | 10.1111/j.1467-9280.2008.02127.x | 2008 | experiment | participants learn painters' styles either massed (same artist's paintings consecutively) or interleaved (different artists mixed); final style-recognition test | not independently verified | interleaved/spaced study produced better inductive learning than massed study, despite learners rating massed as more effective | "Participants learn new painting styles either by presenting different paintings of the same artist consecutively (massed presentation) or by mixing paintings of different artists (spaced presentation)... spacing resulted in better inductive learning than massing... Participants rated massing as more effective than spacing, even after their own test performance had demonstrated the opposite." (search synthesis; primary SAGE abstract page 403'd this session). |
| Rohrer, D. & Taylor, K., "The Shuffling of Mathematics Problems Improves Learning" | 10.1007/s11251-007-9015-8 | 2007 | experiment | college-level maths practice problems, blocked vs. interleaved (shuffled) practice | not independently verified | interleaved/shuffled practice improved later test performance over blocked practice | Title states the finding; primary abstract not independently fetched this session (Springer-hosted, no cached abstract found). |
| Brunmair, M. & Richter, T., "Similarity Matters: A Meta-Analysis of Interleaved Learning and Its Moderators" | 10.1037/bul0000209 | 2019 | meta-analysis | multilevel meta-analysis, 59 studies, 238 effect sizes nested in 158 samples | k = 238 effect sizes / 59 studies | moderate overall interleaving benefit, strongly moderated by material type | "A multilevel meta-analysis revealed a moderate overall interleaving effect (Hedges' g = 0.42). Interleaved practice was best for studies using paintings (g = 0.67) and other visual materials. Results for studies using mathematical tasks revealed a small interleaving effect (g = 0.34), whereas results for expository texts and tastes were ambiguous with nonsignificant overall effects. An advantage of blocking compared with interleaving was found for studies based on words (g = -0.39). A multiple metaregression analysis revealed stronger interleaving effects for learning material more similar between categories, for learning material less similar within categories, and for more complex learning material... We conclude that interleaving can effectively foster inductive learning but that the setting and the type of learning material must be considered. The interleaved learning, however, should be used with caution in certain conditions, especially for expository texts and words." (verbatim, fetched via Semantic Scholar API, full abstract). |

### Replication
No dedicated Many Labs/RRR replication was found; Brunmair & Richter 2019 is a large, recent, multilevel meta-analysis that functions as the best available generality check.

### Backfire evidence
Brunmair & Richter 2019 directly and quantitatively confirms the brief's backfire question: the interleaving benefit **reverses** for word-based material (g = −0.39, i.e., blocking wins) and is non-significant for expository text — precisely the moderator (category similarity / material type) that Series' conditional rule ("mix only when categories are confusable," roster §3.3) is built to respect. This is strong direct support for keeping the rule conditional rather than making interleaving Series' default.

### Grade
pending

### Adversarial pass
pending

---

## Gap-fill log (2026-09-25)

- **successive-relearning:** Closed the main gap. Found and read in full a new primary review (Rawson & Dunlosky 2012, "When Is Practice Testing Most Effective...", DOI 10.1007/s10648-012-9203-1) and a 2023 practitioner guide by the seminal authors (Dunlosky, Wissman, Greve, Badali & Rawson), both fetched as complete PDFs. **Lead correction:** claims.md's cited "Evidence" source (Rawson, Dunlosky & Sciartelli 2013) is not where the session-count/diminishing-returns finding comes from — that is Rawson & Dunlosky (2011, Exp. 3), reviewed and quoted in the 2012 paper above. **Finding that changes the picture:** the literature does not show a plateau after 3 sessions; retention keeps rising (with shrinking increments) through the 5 sessions tested, the authors' own "diminishing returns" language is about time-cost not benefit, and they explicitly refuse to name any number as a "magic number," recommending "at least three" as a cost/benefit floor. Also newly sourced: Rawson, Dunlosky & Janes (2020), a genuine boundary-condition study (procedural material, weak/small effect) distinct from the session-count question. Flagged for the grading step: Series' "3 sessions" is better graded as a defensible design choice than as the literature's identified point of maximal return.
- **Carpenter & Toftness 2017 (pretesting):** Re-examined via WebSearch synthesis (still not independently fetched verbatim — ScienceDirect/Unpaywall remained blocked). **Correction:** the study's own video experiment found prequestions helped *both* prequestioned and non-prequestioned content — no selective-processing cost, contrary to how the original row read. Updated both the source row and the backfire-evidence paragraph under `pretesting`. Flagged as a lead, not a confirmed quote, pending a direct fetch.
- **Izawa 1970:** Confirmed via Crossref (title/author/journal/date match exactly) that no abstract exists on record — consistent with pre-1980s APA practice, not a search failure. Left as an honest **still unread** flag with the standard wording; no further primary text was locatable this session.
- No changes made to any other claim in this file.
