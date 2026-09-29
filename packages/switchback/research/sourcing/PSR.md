# Sourcing batch PSR — planning-self-regulation (claims.md §4)

All DOIs below were verified against the Crossref REST API in this session (`curl -A "longhand-research (https://github.com/vandermerwed/skills)" "https://api.crossref.org/works/<doi>"`), confirming resolved title, first author, and year match the citation, per claims.md §10 ruling 8. Grade and Adversarial pass are left `pending` for the grading agents.

---

## implementation-intentions
**Claim:** Forming written if-then plans ("When situation X arises, I will do Y") increases goal attainment compared with forming a goal intention alone.
**Construct:** implementation intentions · **Used by:** commit (LB), Sitting (LB), woop (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gollwitzer, P. M., "Implementation intentions: Strong effects of simple plans" | 10.1037/0003-066X.54.7.493 | 1999 | theory | narrative review introducing construct + early experiments | — | n/a | "Implementation intentions delegate control of goal-directed responses to anticipated situational cues, which automatically elicit these responses when encountered," furthering "the attainment of goals" (paraphrase of abstract per search synthesis; full text not fetched, title/author/year verified via Crossref). |
| Gollwitzer, P. M. & Sheeran, P., "Implementation Intentions and Goal Achievement: A Meta-analysis of Effects and Processes" | 10.1016/S0065-2601(06)38002-1 | 2006 | meta-analysis | meta-analysis | k = 94 independent tests | d = 0.65, 95% CI [0.60, 0.70] | "Findings from 94 independent tests showed that implementation intentions had a positive effect of medium-to-large magnitude (d = .65) on goal attainment." (abstract, read via search synthesis, not independently fetched in full) |
| Adriaanse, M. A., Vinkers, C. D. W., De Ridder, D. T. D., Hox, J. J. & De Wit, J. B. F., "Do implementation intentions help to eat a healthy diet? A systematic review and meta-analysis of the empirical evidence" | 10.1016/j.appet.2010.10.012 | 2011 | meta-analysis | meta-analysis, 23 studies | d = 0.51 (healthy eating increase); d = 0.29 (unhealthy eating decrease) | Implementation intentions "effective in both promoting healthy eating (d=0.51) as well as decreasing unhealthy eating (d=0.29)" (search synthesis of abstract). |
| Milkman, K. L., Beshears, J., Choi, J. J., Laibson, D. & Madrian, B. C., "Using implementation intentions prompts to enhance influenza vaccination rates" | 10.1073/pnas.1103170108 | 2011 | experiment | large field experiment (employer vaccination clinics) | large firm employee population (thousands) | control 33.1% vaccinated; date-only prompt +1.5 percentage points | "the vaccination rate among control condition employees at 33.1%, and employees who received the prompt to write down just a date having a vaccination rate 1.5 percentage points higher than the control group" (search synthesis; PDF full text fetch failed, abstract not independently re-verified beyond search). |

### Replication
No dedicated Many Labs / RRR / large pre-registered replication of the core implementation-intentions effect was found in this session (searched). Milkman et al. 2011 functions as a large-scale real-world field replication with a positive, if modest, result (+1.5pp on a 33.1% base rate).

### Backfire evidence
- Dalton, A. N. & Spiller, S. A., "Too Much of a Good Thing: The Benefits of Implementation Intentions Depend on the Number of Goals," *Journal of Consumer Research* 39(3), 2012. DOI 10.1086/664500 (verified). Experiments. Finding: "The benefits of implemental planning for attaining a single goal do not typically extend to multiple goals; instead, implemental planning draws attention to the difficulty of executing multiple goals, which undermines commitment to those goals ... and thereby undermines goal success" (search synthesis of abstract) — directly answers the brief's "do plans for many goals at once dilute the effect?" question: yes.
- The "rigid plans fail when the cue never occurs" question was not directly located as a tested empirical claim in this session (searched); it is discussed qualitatively in review literature as a known boundary condition of cue-dependent automaticity but no dedicated citation was verified.

### Grade
pending

### Adversarial pass
pending

---

## intention-announcement
**Claim:** Telling others about an identity-relevant intention can substitute for acting on it, reducing the effort invested compared with keeping it private.
**Construct:** symbolic self-completion; public commitment · **Used by:** commit (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wicklund, R. A. & Gollwitzer, P. M., *Symbolic Self-Completion* | — (book, ISBN not confirmed this session) | 1982 | theory | theory (foundational to Studies below) | — | n/a | Not independently fetched; cited as the theoretical basis for Gollwitzer et al. 2009. Listed in `unverified`. |
| Gollwitzer, P. M., Sheeran, P., Michalski, V. & Seifert, A. E., "When Intentions Go Public: Does Social Reality Widen the Intention-Behavior Gap?" | 10.1111/j.1467-9280.2009.02336.x | 2009 | experiment | 4 experiments (field + lab) | not extracted per-study | field: reduced 1-week persistence; lab: fewer opportunities seized | "Identity-related behavioral intentions that had been noticed by other people were translated into action less intensively than those that had been ignored (Studies 1–3) ... it held among participants with strong but not weak commitment to the identity goal (Study 3)" (search synthesis of abstract). |

### Replication
No pre-registered replication of Gollwitzer et al. 2009 was found in this session (searched).

### Backfire evidence
Counter-evidence that public commitment *increases* follow-through, i.e. the opposite direction from the claim, exists in the organizational goal-setting literature:
- Hollenbeck, J. R., Williams, C. R. & Klein, H. J., "An empirical examination of the antecedents of commitment to difficult goals," *Journal of Applied Psychology* 74(1), 1989. DOI 10.1037/0021-9010.74.1.18 (verified). Field study. Public statement of a goal (vs. private) was associated with higher goal commitment.
- Klein, H. J., Wesson, M. J., Hollenbeck, J. R. & Alge, B. J., "Goal commitment and the goal-setting process: Conceptual clarification and empirical synthesis," *Journal of Applied Psychology* 84(6), 1999. DOI 10.1037/0021-9010.84.6.885 (verified). Meta-analysis of 83 independent samples; public declaration of a goal is one antecedent that strengthens goal commitment generally.
- Klein, H. J., Cooper, J. T. & Monahan, C. A., "Goal Commitment," in Locke & Latham (eds.), *New Developments in Goal Setting and Task Performance* (Routledge, 2013), pp. 65–89 — lead confirmed to exist, but **unverified**: only the edited volume's own DOI (10.4324/9780203082744, resolving to editor "Locke," not to this chapter's authors) was found in Crossref; no chapter-level DOI resolves to Klein/Cooper/Monahan. Not used for grading.

These two literatures appear to genuinely conflict rather than one simply failing to replicate the other: Gollwitzer et al. 2009 concerns *identity-relevant* intentions noticed incidentally by others (a substitution-for-identity-completion mechanism), while Hollenbeck et al. 1989 and Klein et al. 1999 concern *deliberate, accountable public declaration* of a work-type goal (a social-accountability mechanism). The brief's own framing anticipates this: "under which conditions does announcing help (non-identity goals, accountability to a specific person) and under which does it hurt (identity goals, noticed incidentally)?" The evidence found is consistent with exactly that split, but no single study tests both mechanisms head-to-head.

### Grade
pending

### Adversarial pass
pending

---

## mental-contrasting
**Claim:** Contrasting a desired future with the inner obstacle that stands in its way, then planning how to meet that obstacle (MCII / WOOP), increases goal attainment compared with positive fantasising, dwelling on obstacles, or planning alone.
**Construct:** mental contrasting with implementation intentions · **Used by:** woop (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Oettingen, G., Pak, H. & Schnetter, K., "Self-regulation of goal-setting: Turning free fantasies about the future into binding goals" | 10.1037/0022-3514.80.5.736 | 2001 | experiment | multiple experiments manipulating contrast order | not extracted | future-then-reality order produced expectancy-dependent commitment; other orders did not | "future-then-reality produces selective expectancy-driven commitment, reality-then-future produces no contrast effect, and neither alone (Indulging or Dwelling) produces it" (search synthesis of abstract/summary). |
| Wang, G., Wang, Y. & Gai, X., "A Meta-Analysis of the Effects of Mental Contrasting With Implementation Intentions on Goal Attainment" | 10.3389/fpsyg.2021.565202 | 2021 | meta-analysis | meta-analysis | k = 24 effect sizes / 21 studies, N = 15,907 | Hedges' g = 0.336, 95% CI [0.229, 0.443]; trim-and-fill bias-corrected g = 0.242, 95% CI [0.143, 0.342] | "Results showed that MCII to be effective for goal attainment with a small to medium effect size (g = 0.336). The effect was mainly moderated by intervention style." (quoted verbatim from the PMC full-text article, fetched directly: pmc.ncbi.nlm.nih.gov/articles/PMC8149892/). Moderator: face-to-face experimenter delivery g = 0.465 vs. document-based delivery g = 0.277 (p < .05); Egger's test suggested some asymmetry (t = 5.46, p < .01) but fail-safe N = 482 exceeded the critical threshold, and the trim-and-fill-adjusted estimate remains clearly above zero. |

### Replication
No dedicated large pre-registered replication of MCII was found in this session (searched). The Wang et al. 2021 meta-analysis's own publication-bias correction (trim-and-fill) is the closest available check, and it does **not** null out the effect (g drops from 0.336 to 0.242, still significant and positive) — so this does not trigger tie-break rule 2 (§6.2) as a null/reversed corrected estimate.

### Backfire evidence
- Kappes, H. B. & Oettingen, G., "Positive fantasies about idealized futures sap energy," *Journal of Experimental Social Psychology* 47(4), 2011. DOI 10.1016/j.jesp.2011.02.003 (verified). 4 experiments. "Induced positive fantasies resulted in less energy than fantasies that questioned the desired future, negative fantasies, or neutral fantasies," because positive fantasies "trigger the relaxation that would normally accompany actual achievement, rather than marshaling the energy needed to obtain it" (search synthesis of abstract).
- This is the mechanism the brief flags as "by design": mental contrasting *without* the obstacle/plan step (i.e., pure positive fantasy, "Indulging") is expected to underperform or actively sap energy, which the WOOP page's `helps`/`backfires` text should state explicitly — plain positive visualization is not the mechanism being sold; contrast-plus-plan is.
- The brief's low-expectancy question ("when expectations of success are low, does contrasting lead to disengagement?") is answered affirmatively by design in the Oettingen line (contrasting is expectancy-dependent: it should energize high-expectancy pursuers and *deliberately* disengage low-expectancy ones), consistent with Oettingen et al. 2001's finding that contrasting produces "selective expectancy-driven commitment." This is a feature, not a bug, per the theory, but the `helps` text must say so per the brief.

### Grade
pending

### Adversarial pass
pending

---

## task-unpacking
**Claim:** Breaking a task into its ordered component steps before predicting when it will be done reduces optimistic bias in completion-time predictions.
**Construct:** unpacking; the planning fallacy · **Used by:** timeline (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Buehler, R., Griffin, D. & Ross, M., "Exploring the 'planning fallacy': Why people underestimate their task completion times" | 10.1037/0022-3514.67.3.366 | 1994 | experiment | field/lab studies of thesis completion predictions | 37 psychology students (thesis study) | mean predicted 33.9 days vs. actual 55.5 days; only ~30% finished by their own predicted date | "the average estimate was 33.9 days" predicted vs. "55.5 days" actual completion; "only about 30% of the students completed the project on the timeline they had predicted" (search synthesis). |
| Kruger, J. & Evans, M., "If you don't want to be late, enumerate: Unpacking reduces the planning fallacy" | 10.1016/j.jesp.2003.11.001 | 2004 | experiment | multiple experiments (holiday shopping, getting ready, formatting, food prep) | not extracted | unpacking → significantly longer (more realistic) time estimates | "participants in the unpack condition estimated significantly longer time" for tasks such as holiday shopping, reducing the gap versus actual completion time (search synthesis). |
| Forsyth, D. K. & Burt, C. D. B., "Allocating time to future tasks: The effect of task segmentation on planning fallacy bias" | 10.3758/mc.36.4.791 | 2008 | experiment | 3 experiments | not extracted | summed subtask estimates > single-task estimate ("segmentation effect") | "allocated time for a single task was significantly smaller than the summed time allocated to the individual subtasks" (search synthesis of abstract). |
| Buehler, R., Griffin, D. & Peetz, J., "The Planning Fallacy: Cognitive, Motivational, and Social Origins" | 10.1016/S0065-2601(10)43001-4 | 2010 | review | narrative review | — | n/a | Reviews scope, definitional controversies, and generality of the planning fallacy (search synthesis; not independently fetched in full). |

### Replication
No RRR/Many-Labs-style replication was found (searched). Kruger & Evans 2004 and Forsyth & Burt 2008 are independent conceptual replications of the unpacking/segmentation mechanism across different task domains, both supporting the effect.

**Search for critical-path/sequencing evidence (per brief):** none found. The located literature supports unpacking a task into its component parts *for the purpose of estimating duration*; no study was found that tests whether explicitly sequencing steps or prerequisites (critical-path style, independent of estimation) improves plan *execution*. This is the transfer gap the claims.md brief already flags for timeline (asks for order/prerequisites, not a time estimate) — record as "none found (searched: unpacking + planning fallacy + critical path + prerequisite sequencing combinations)."

### Backfire evidence
- Buehler, R. & Griffin, D., "Planning, personality, and prediction: The role of future focus in optimistic time predictions," *Organizational Behavior and Human Decision Processes* 92, 2003. DOI 10.1016/S0749-5978(03)00089-X (verified). Experiments. Instructing participants to construct a detailed, "flowing," future-focused completion *scenario* ("a complete picture, from beginning to end, of how this assignment" will proceed) **increased** optimistic bias, rather than reducing it (search synthesis).
- This is an important boundary condition: it is a *different* manipulation from Kruger & Evans's itemized unpacking (list components, estimate each, sum) — a narrative "how it will unfold" scenario backfires, while an itemized checklist-style unpacking helps. Timeline's design (an ordered list of discrete steps) sits closer to the helpful Kruger & Evans manipulation than to the harmful Buehler & Griffin 2003 scenario-construction manipulation, but this distinction should be named explicitly in grading, since both are plausibly described as "breaking a task into steps."

### Grade
pending

### Adversarial pass
pending

---

## timeboxing
**Claim:** Setting a fixed time limit for a phase of work ends deliberation sooner, with no loss of decision quality for convergent tasks.
**Construct:** timeboxing; deadlines as goals (Parkinson's law) · **Used by:** timer (LB), Sitting (LB, 40-minute default)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Parkinson, C. N., "Parkinson's Law" | — (Economist essay, no DOI) | 1955 | practice | essay, not empirical | — | n/a | Origin of "work expands to fill the time available for its completion"; not an empirical study. Listed in `unverified` (no DOI, practitioner/practice source, type `practice`). |
| Bryan, J. F. & Locke, E. A., "Parkinson's Law as a goal-setting phenomenon" | 10.1016/0030-5073(67)90021-9 | 1967 | experiment | experiment | not extracted | generous deadlines → lower self-set performance goals → slower work | "the Parkinson effect wasn't just about available time – it was about goals. People given generous deadlines set lower performance goals for themselves, and those lower goals ... drove the slower pace" (search synthesis). |
| Ordóñez, L. & Benson, L. III, "Decisions under Time Pressure: How Time Constraint Affects Risky Decision Making" | 10.1006/obhd.1997.2717 | 1997 | experiment | experiment (gamble valuation) | not extracted | time pressure → shift to simplifying/eliminating strategies | Time-constrained participants shifted toward "screening items out of the choice set ... to reduce the set and thus the processing time necessary to make a final choice" (search synthesis). |
| Edland, A. & Svenson, O., "Judgment and Decision Making Under Time Pressure," in Svenson & Maule (eds.), *Time Pressure and Stress in Human Judgment and Decision Making* | 10.1007/978-1-4757-6846-6_2 | 1993 | review | narrative review of prior three decades | — | n/a | "effects of time pressure include an over-reliance on negative information and an increased reliance on fewer attributes or dimensions in making choices" (search synthesis). |

### Replication and integrity finding (critical)
**Ariely, D. & Wertenbroch, K., "Procrastination, Deadlines, and Performance: Self-Control by Precommitment," *Psychological Science* 13(3), 2002.** DOI 10.1111/1467-9280.00441 (verified — Crossref now returns the title with a "RETRACTED:" prefix). This was the brief's lead for "self-imposed deadlines are weaker than external ones," and was historically the single most-cited empirical basis for exactly that sub-claim (near 1,000–2,100 citations depending on source).

**This paper was retracted in September 2026.** A replication of its Study 2 — Hyndman, K. & Bisin, A., "Replication of 'Procrastination, Deadlines, and Performance: Self-Control by Precommitment'," *Psychological Science*, 2026. DOI 10.1177/09567976261460772 (verified) — found that "changes in the deadlines had a negligible effect on the three performance metrics and several survey metrics used in the original study," i.e. a **failed large replication**. Data Colada's forensic analyses (datacolada.org/138) then found evidence the original Study 2 data were tampered with or fabricated; Wertenbroch (the surviving co-author) requested retraction on 2026-07-23, and the retraction was issued 2026-09-02. Retraction notice: DOI 10.1177/09567976261488042 (verified, "Retraction: Procrastination, Deadlines, and Performance: Self-Control by Precommitment," 2026).

Per §6.2 tie-break rule 1 ("A failed large replication ... of *this* effect → at most C, whatever the earlier literature says"), and given the underlying data are now understood to be fabricated, **Ariely & Wertenbroch 2002 must not be used as supporting evidence for timeboxing at all** — it is worse than a null result. This directly addresses the brief's own question, "are self-imposed deadlines weaker than external ones (Ariely & Wertenbroch)?": the paper that was supposed to answer this no longer stands. The remaining, unretracted evidence (Bryan & Locke 1967; Ordóñez & Benson 1997; Edland & Svenson 1993) supports only the weaker, more general claims that (a) deadlines function through goal-setting rather than raw time scarcity, and (b) time pressure changes decision *strategy* (simplification, fewer attributes, negative-information weighting) — not that self-imposed deadlines specifically underperform external ones, nor that timeboxing preserves decision quality for convergent tasks. No source located in this session directly supports "no loss of decision quality for convergent tasks" as stated in the claim; if anything, Ordóñez & Benson and Edland & Svenson point toward *reduced* decision quality/thoroughness under time constraint in general.

### Backfire evidence
See `creativity-fixation/time-pressure-divergent` (out of this batch) for the divergent-thinking side. Within this batch: Edland & Svenson 1993 and Ordóñez & Benson 1997 both describe time pressure degrading decision *process* (fewer attributes considered, over-weighting of negative information), which is in tension with the claim's "no loss of decision quality for convergent tasks" — the claim as worded may be overstated even before accounting for the Ariely & Wertenbroch retraction.

### Grade
pending

### Adversarial pass
pending

---

## sitting-duration *(parameter)*
**Claim:** A single focused working session of about 40 minutes can be sustained without a marked decline in attention or quality for self-directed thinking work.
**Construct:** sustained attention over a session; vigilance decrement; mental fatigue · **Used by:** Sitting (P, 40-minute default)
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wilson, K. & Korn, J. H., "Attention during Lectures: Beyond Ten Minutes" | 10.1080/00986280701291291 | 2007 | review | review of note-taking, observational, self-report, and physiological studies | — | n/a | "the research on which this estimate is based provides little support for the belief that students' attention declines after 10 to 15 minutes. Most studies failed to account for individual differences in attention" (search synthesis of abstract). |
| Bradbury, N., "Attention span during lectures: 8 seconds, 10 minutes, or more?" | 10.1152/advan.00109.2016 | 2016 | review | literature review | — | n/a | "The available primary data do not support the concept of a 10- to 15-minute attention limit. The 15-minute attention span is a myth" (search synthesis of abstract). "The greatest variability in student attention arises from differences between teachers and not from the teaching format itself." |
| Mackworth, N. H., "The Breakdown of Vigilance during Prolonged Visual Search" | 10.1080/17470214808416738 | 1948 | experiment | clock-test vigilance paradigm, 2-hour watch | — | detection declined ~10–15% in the first 30 min, then more gradually over 90 min | Seminal vigilance-decrement finding (search synthesis); paradigm is sustained low-stimulation monitoring, not self-paced generative writing — flagged as an **analogical** transfer at best. |
| Warm, J. S., Parasuraman, R. & Matthews, G., "Vigilance Requires Hard Mental Work and Is Stressful" | 10.1518/001872008x312152 | 2008 | review | review across 4 evidence types (task type, perceived workload, neural measures, stress) | — | n/a | Challenges "the traditional view that vigilance tasks are undemanding ... and that the vigilance decrement results from a decline in arousal due to understimulation"; finds "the workload of vigilance is high" (search synthesis). |

### Replication
Not directly applicable (no single "40-minute session" study exists to replicate). As a caution on generic "mental fatigue/depletion" framing for any duration claim, the brief asks for the ego-depletion RRRs:
- Hagger, M. S. et al., "A multilab preregistered replication of the ego-depletion effect," *Perspectives on Psychological Science* 11(4), 2016. DOI 10.1177/1745691616652873 (verified, `rrr`). Multi-lab RRR found the ego-depletion effect close to zero.
- Vohs, K. D. et al., "A Multisite Preregistered Paradigmatic Test of the Ego-Depletion Effect," *Psychological Science*, 2021. DOI 10.1177/0956797621989733 (verified, `rrr`). k = 36 labs, N = 3,531; "Confirmatory tests found a nonsignificant result (d = 0.06)," and Bayesian analysis favored the null 4:1 over a moderate prior effect.

### Backfire evidence
Not applicable in the usual sense — the question here (per the brief) is "is there any evidence for a specific duration, or is this a design choice?" **Answer: this is a design choice.** No source located in this session tests 40 minutes, or any single specific duration, for self-paced generative/thinking work. Wilson & Korn 2007 and Bradbury 2016 actively argue *against* treating any fixed-minute threshold as evidence-based for attention in an analogous (lecture) context. Mackworth 1948 and Warm et al. 2008 describe a genuine vigilance decrement, but in a different paradigm (passive monitoring for rare signals, not active self-directed writing), and the RRRs on ego-depletion (Hagger 2016, Vohs 2021) undercut the generic "willpower runs out" mechanism some `helps` copy might otherwise lean on. This claim looks like a strong candidate for **D, design choice**, consistent with the brief's own expectation.

### Grade
pending

### Adversarial pass
pending

---

## progress-monitoring
**Claim:** Monitoring progress towards a goal increases goal attainment, and more so when the progress is physically recorded.
**Construct:** progress monitoring / self-monitoring · **Used by:** check-in (LB), Ritual (LB), scoresheet (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harkin, B., Webb, T. L., Chang, B. P. I., Prestwich, A., Conner, M., Kellar, I., Benn, Y. & Sheeran, P., "Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence" | 10.1037/bul0000025 | 2016 | meta-analysis | RCTs meta-analysis | k = 138 studies, N = 19,951 | medium effect, d ≈ 0.40, on goal attainment | "a reliable medium-sized effect (d ≈ 0.40) on goal attainment was found across health, money and other domains" and "monitoring helped more when progress was physically recorded rather than just noticed, and it helped more when the information was made visible or reported rather than kept in your head" (search synthesis of abstract/press coverage). |
| Michie, S., Abraham, C., Whittington, C., McAteer, J. & Gupta, S., "Effective techniques in healthy eating and physical activity interventions: A meta-regression" | 10.1037/a0016136 | 2009 | meta-analysis | meta-regression across heterogeneous interventions | — | self-monitoring among the most consistently effective techniques, especially combined with other control-theory techniques | Search synthesis: "the technique of self-monitoring was effective and its effect was increased in combination with other techniques theoretically predicted to increase effectiveness." |
| Burke, L. E., Wang, J. & Sevick, M. A., "Self-Monitoring in Weight Loss: A Systematic Review of the Literature" | 10.1016/j.jada.2010.10.008 | 2011 | review | systematic review, 22 studies (1993–2009) | — | dietary self-monitoring associated with greater weight loss; dose-response with log consistency | "dietary self-monitoring was significantly associated with weight loss, and ... weight loss was significantly greater among individuals who returned self-monitoring logs on a more consistent basis" (search synthesis). |

### Replication
No dedicated large pre-registered replication beyond the Harkin et al. 2016 meta-analysis itself was found in this session (searched); Harkin 2016 is already the field's synthesis of 138 independent RCTs, which functions as strong internal replication.

### Backfire evidence
- Deci, E. L., Koestner, R. & Ryan, R. M., "A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation," *Psychological Bulletin* 125(6), 1999. DOI 10.1037/0033-2909.125.6.627 (verified). Meta-analysis, 128 studies. "Engagement-contingent, completion-contingent, and performance-contingent rewards significantly undermined free-choice intrinsic motivation (d = -0.40, -0.36, and -0.28, respectively) ... Verbal rewards and feedback, on the other hand, can have a positive effect when they are informative" (verbatim from the accessible abstract PDF found via search, matches title/author/year verified via Crossref).
- Lepper, M. R., Greene, D. & Nisbett, R. E., "Undermining children's intrinsic interest with extrinsic reward: A test of the 'overjustification' hypothesis," *Journal of Personality and Social Psychology* 28(1), 1973. DOI 10.1037/h0035519 (verified). Field experiment. Classic overjustification finding: an expected extrinsic reward for an already-interesting activity reduced subsequent free-choice engagement with it.
- Applicability caveat: Deci et al. 1999 and Lepper et al. 1973 concern *extrinsic rewards contingent on* a monitored target, which is adjacent to, but not identical to, monitoring itself. Whether merely recording progress (with no attached reward) can itself become a Goodhart-style gamed target, or lead to discouragement/abandonment when progress is poor, was searched but **no direct empirical test of that specific framing was found** — record as "none found (searched: self-monitoring + Goodhart/gaming + discouragement/abandonment)." The intrinsic-motivation-undermining evidence is real but answers a related, not identical, question to the brief's "is the measure gamed" and "does poor recorded progress lead to discouragement" questions.

### Grade
pending

### Adversarial pass
pending

---

## prior-state-recall
**Claim:** People recall their earlier attitudes, feelings or confidence as closer to their present state than they were, or as fitting their theory of how they must have changed. A written baseline is therefore needed to see real change.
**Construct:** consistency and change biases in autobiographical memory (implicit theories of stability and change) · **Used by:** scoresheet (LB), check-in (LB), Ritual (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Goethals, G. R. & Reckman, R. F., "The perception of consistency in attitudes" | 10.1016/0022-1031(73)90030-9 | 1973 | experiment | field/lab discussion-group experiment (busing attitudes) | small groups of high-school students | subjects distorted recalled pre-discussion attitude toward new attitude; controls did not | "subjects distorted their recall of their initial stand on bussing so as to make it consistent with their new attitude ... control subjects did not distort their original bussing attitudes" (search synthesis of abstract). |
| Ross, M., "Relation of Implicit Theories to the Construction of Personal Histories" | 10.1037/0033-295X.96.2.341 | 1989 | theory | theoretical synthesis + supporting study | — | n/a | "people possess implicit theories regarding the inherent consistency of their attributes ... it is suggested that people use their implicit theories of self to construct their personal histories," concluding that "implicit theories of stability and change can lead to biases in recall" (search synthesis of abstract). |
| Conway, M. & Ross, M., "Getting what you want by revising what you had" | 10.1037/0022-3514.47.4.738 | 1984 | experiment | field experiment: study-skills program with pre/post self-ratings | not extracted | participants recalled pre-program self-ratings as worse than originally given, manufacturing illusory improvement | Design directly analogous to scoresheet/check-in: "asked individuals to evaluate their study skills before participating in a study skills program, and at the conclusion of the program, participants were asked to recall their original ratings"; the program was in fact ineffective, but "participants nevertheless perceived an improvement in their study skills" via revised recall of the baseline (search synthesis). |
| Wolfe, M. B. & Williams, T. J., "Poor metacognitive awareness of belief change" | 10.1080/17470218.2017.1363792 | 2018 | experiment | 2 experiments (belief about spanking, pre/post persuasive text) | not extracted | recalled initial beliefs biased toward current beliefs; people largely unaware their beliefs changed | "Belief recollections were closer to current beliefs than they were to initial beliefs, which suggests that people have poor metacognitive awareness of changes in their beliefs" (search synthesis of abstract). Framed by the brief as a modern replication-check-style confirmation of the older consistency-bias literature; it is a conceptual replication in a different (belief, not attitude/skill) domain, not a direct replication of Goethals & Reckman or Conway & Ross. |

### Replication
No dedicated large pre-registered replication of Goethals & Reckman 1973 or Conway & Ross 1984 specifically was found (searched). Wolfe & Williams 2018 is a conceptual replication of the general phenomenon (recall bias toward the current state) in the belief-change domain, using modern methods, and reaches the same conclusion — this is reasonably strong corroboration even without being a direct RRR.

### Backfire evidence
The brief asks: "when the earlier rating is visible, does it anchor the later one and suppress real change?" This is a real and well-known concern in the broader anchoring/self-rating literature (e.g., visible prior performance ratings anchoring subsequent manager ratings, with hiding the prior rating reducing — but, unless rating history is also removed, not eliminating — the anchoring effect), but no specific primary study surfaced in this session that I fetched and can cite with a verified DOI; it is listed in `unverified` (reason: only found as secondary/synthesized commentary, not a primary source read directly). This is a genuine open question for scoresheet's design (whether to hide the "before" column at the "after" rating) that the grading/adversarial agents should flag as unresolved rather than settled either way.

### Grade
pending

### Adversarial pass
pending
