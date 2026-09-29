# planning-self-regulation

**Family** `planning-self-regulation` (claims.md §4, plus the Gate 1b claims 4.9–4.12 in §11). **Batches merged:** PSR (`sourcing/PSR.md` and `PSR.json`) for 4.1–4.8, and the planning-self-regulation part of GB (`sourcing/GB.md` and `GB.json`) for 4.9–4.12. **Graded:** 2026-09-25 (step 3, grading agent). **Adversarial pass pending.** Grades apply spec §6 and claims.md §10. Only sources whose finding was read count. A source flagged "still unread", recorded only from a search-tool synthesis or a secondary description, or listed as unverified does not support a grade, unless its cached abstract in `.superpowers/research/abstracts/PSR.md` or `GB.md` supports the recorded finding. In that case its Finding cell quotes the cached abstract, marked "(abstract via <API>)". Where the cache is empty the source stays unread and its cell says so. Where the cached abstract does not support the recorded finding, the cell and the rationale say so. Where a claim is left with no admissible evidence it is graded D, and the rationale states the grade it would earn once the recorded findings are read. For every source used, only the abstract was read unless the cell says otherwise. Ariely & Wertenbroch (2002) is retracted and counts for nothing. Effect labels: `small` for d or g below about 0.3 or where the authors call the effect small, `moderate` for about 0.3–0.7, `n/a` where no read source gives a size. **Grades:** A 2 · B 1 · C 5 · D 4.

> **Batch note (PSR):** All DOIs were verified against the Crossref REST API, confirming resolved title, first author and year, per claims.md §10 ruling 8. Many PSR findings were recorded "via search synthesis"; each has been checked against the abstract cache below.
> **Batch note (GB):** Every DOI was checked against Crossref. A source marked `**still unread:**` was not read beyond its metadata. Sources not so marked were read by the sourcing agent.

---

## implementation-intentions
**Claim:** Forming written if-then plans ("When situation X arises, I will do Y") increases goal attainment compared with forming a goal intention alone.
**Construct:** implementation intentions · **Used by:** commit (LB), Sitting (LB), mental-contrast (S), frame-by-frame (S, §11.1)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gollwitzer, P. M., "Implementation intentions: Strong effects of simple plans" | 10.1037/0003-066X.54.7.493 | 1999 | theory | narrative review introducing construct + early experiments | — | n/a | "A program of research demonstrates that implementation intentions further the attainment of goals, and it reveals the underlying processes." (abstract via OpenAlex) |
| Gollwitzer, P. M. & Sheeran, P., "Implementation Intentions and Goal Achievement: A Meta-analysis of Effects and Processes" | 10.1016/S0065-2601(06)38002-1 | 2006 | meta-analysis | meta-analysis | k = 94 independent tests | d = 0.65, 95% CI [0.60, 0.70] | "Findings from 94 independent tests showed that implementation intentions had a positive effect of medium‐to‐large magnitude ( d = .65) on goal attainment." (abstract via Semantic Scholar) |
| Adriaanse, M. A., Vinkers, C. D. W., De Ridder, D. T. D., Hox, J. J. & De Wit, J. B. F., "Do implementation intentions help to eat a healthy diet? A systematic review and meta-analysis of the empirical evidence" | 10.1016/j.appet.2010.10.012 | 2011 | meta-analysis | meta-analysis, 23 studies | d = 0.51 (healthy eating increase); d = 0.29 (unhealthy eating decrease) | Implementation intentions "effective in both promoting healthy eating (d=0.51) as well as decreasing unhealthy eating (d=0.29)" (search synthesis of abstract). **Unread: no cached abstract; not used for grading.** |
| Milkman, K. L., Beshears, J., Choi, J. J., Laibson, D. & Madrian, B. C., "Using implementation intentions prompts to enhance influenza vaccination rates" | 10.1073/pnas.1103170108 | 2011 | experiment | large field experiment (employer vaccination clinics) | large firm employee population (thousands) | control 33.1% vaccinated; date-only prompt +1.5 percentage points; date-and-time prompt +4.2 percentage points (added from the cached abstract) | "The vaccination rate among control condition employees was 33.1%. Employees who received the prompt to write down just a date had a vaccination rate 1.5 percentage points higher than the control group, a difference that is not statistically significant. Employees who received the more specific prompt to write down both a date and a time had a 4.2 percentage point higher vaccination rate, a difference that is both statistically significant and of meaningful magnitude." (abstract via OpenAlex) |

### Replication
No dedicated Many Labs / RRR / large pre-registered replication of the core implementation-intentions effect was found in this session (searched). Milkman et al. 2011 functions as a large-scale real-world field replication with a positive, if modest, result (+1.5pp on a 33.1% base rate).
*Grading note:* the cached abstract shows the +1.5pp date-only arm was **not** significant; the specific date-and-time plan gave a significant +4.2pp. The field test supports the claim, and specifically supports specific plans.

### Backfire evidence
- Dalton, A. N. & Spiller, S. A., "Too Much of a Good Thing: The Benefits of Implementation Intentions Depend on the Number of Goals," *Journal of Consumer Research* 39(3), 2012. DOI 10.1086/664500 (verified). Experiments. Finding: "The benefits of implemental planning for attaining a single goal do not typically extend to multiple goals; instead, implemental planning draws attention to the difficulty of executing multiple goals, which undermines commitment to those goals ... and thereby undermines goal success" (search synthesis of abstract; the cached abstract via OpenAlex confirms this wording, and adds: "Framing the execution of multiple goals as a manageable endeavor, however, reduces the perceived difficulty of multiple goal pursuit"). This directly answers the brief's "do plans for many goals at once dilute the effect?" question: yes.
- The "rigid plans fail when the cue never occurs" question was not directly located as a tested empirical claim in this session (searched).

### Grade
**A** · transfer **direct** · effect **moderate**
Rationale: The Gollwitzer & Sheeran (2006) meta-analysis of 94 independent tests (abstract read via the cache) reports d = .65 on goal attainment. The Milkman et al. (2011) field experiment (abstract read) is consistent: the specific date-and-time plan raised vaccination by a significant 4.2 points, and the vaguer date-only plan by a non-significant 1.5. No failed large replication is recorded, so this meets A on §6.1. Tie-break: none. Tie-break 2 could not be tested, because the notes hold no bias-corrected estimate; the 2006 figure is uncorrected, which is why the effect is labelled moderate rather than large. The grade hinges on that gap, and the adversarial pass should check for a later bias-corrected meta-analysis. Adriaanse et al. (2011) has no cached abstract and is not used. Dalton & Spiller (2012) is a boundary condition (many goals at once), not an inconsistency.

### Adversarial pass
confirmed: no bias-corrected estimate near zero and no failed large replication was found (searched); Sheeran, Listrom & Gollwitzer (2024; 642 tests; DOI 10.1080/10463283.2024.2334563; abstract via OpenAlex) reports effects of ".27 ≤ d ≤ .66" with no correction in the abstract, and the pre-registered alcohol meta-analysis (Cooke, McEwan & Norman 2023; DOI 10.1111/dar.13553) is smaller but positive (d+ = −0.14 on weekly drinking; trim-and-fill "estimated that there are zero missing studies"), so A holds, though `moderate` sits at the low edge; Carrera et al. (2018; n = 877; DOI 10.1016/j.jhealeco.2018.09.002) found "a tightly estimated null effect" for scheduling a repeated behaviour (gym visits), which is a boundary condition and not a tie-break 1 replication, and the gym megastudy (Milkman et al. 2021; DOI 10.1038/s41586-021-04128-4) cannot isolate planning because 53 of its 54 arms included a planning prompt.

---

## intention-announcement
**Claim:** Telling others about an identity-relevant intention can substitute for acting on it, reducing the effort invested compared with keeping it private.
**Construct:** symbolic self-completion; public commitment · **Used by:** commit (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wicklund, R. A. & Gollwitzer, P. M., *Symbolic Self-Completion* | — (book, ISBN not confirmed this session) | 1982 | theory | theory (foundational to Studies below) | — | n/a | Not independently fetched; cited as the theoretical basis for Gollwitzer et al. 2009. Listed in `unverified`. |
| Gollwitzer, P. M., Sheeran, P., Michalski, V. & Seifert, A. E., "When Intentions Go Public: Does Social Reality Widen the Intention-Behavior Gap?" | 10.1111/j.1467-9280.2009.02336.x | 2009 | experiment | 4 experiments (field + lab) | not extracted per-study | field: reduced 1-week persistence; lab: fewer opportunities seized | "Identity-related behavioral intentions that had been noticed by other people were translated into action less intensively than those that had been ignored (Studies 1-3). This effect was evident in the field (persistent striving over 1 week's time; Study 1) and in the laboratory (jumping on opportunities to act; Studies 2 and 3), and it held among participants with strong but not weak commitment to the identity goal (Study 3)." (abstract via OpenAlex) |

### Replication
No pre-registered replication of Gollwitzer et al. 2009 was found in this session (searched).

### Backfire evidence
Counter-evidence that public commitment *increases* follow-through, i.e. the opposite direction from the claim, exists in the organizational goal-setting literature:
- Hollenbeck, J. R., Williams, C. R. & Klein, H. J., "An empirical examination of the antecedents of commitment to difficult goals," *Journal of Applied Psychology* 74(1), 1989. DOI 10.1037/0021-9010.74.1.18 (verified). Field study. Public statement of a goal (vs. private) was associated with higher goal commitment. **Unread: no quote recorded and no cached abstract.**
- Klein, H. J., Wesson, M. J., Hollenbeck, J. R. & Alge, B. J., "Goal commitment and the goal-setting process: Conceptual clarification and empirical synthesis," *Journal of Applied Psychology* 84(6), 1999. DOI 10.1037/0021-9010.84.6.885 (verified). Meta-analysis of 83 independent samples; public declaration of a goal is one antecedent that strengthens goal commitment generally. **Discrepancy: the cached abstract (via OpenAlex) confirms a meta-analysis "based on 83 independent samples" of "the antecedents and consequences of goal commitment", but does not mention public declaration. The recorded finding is not supported by what was read, so it does not count.**
- Klein, H. J., Cooper, J. T. & Monahan, C. A., "Goal Commitment," in Locke & Latham (eds.), *New Developments in Goal Setting and Task Performance* (Routledge, 2013), pp. 65–89 — **unverified**; not used for grading.

The two literatures may concern different mechanisms: Gollwitzer et al. 2009 concerns *identity-relevant* intentions noticed by others (substitution for identity completion), while Hollenbeck et al. 1989 and Klein et al. 1999 concern *deliberate, accountable public declaration* of a work-type goal (social accountability). No single study tests both head-to-head.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The only read support is one paper, Gollwitzer et al. (2009), with four experiments from one group (abstract read via the cache). It shows the effect for identity goals, and only among people strongly committed to them. No pre-registered replication was found. That is "few studies" on §6.1, so C. Tie-break: none. The counter-evidence cannot be weighed: Hollenbeck et al. (1989) is unread, and the cached Klein et al. (1999) abstract does not mention public declaration. For commit, the evidence supports keeping the "Who I will tell" line optional and off by default. It does not show that telling someone who will check on you backfires.

### Adversarial pass
confirmed: the only read support is one paper of four experiments from one group, with no replication found, which is C ("few studies").

---

## mental-contrasting
**Claim:** Contrasting a desired future with the inner obstacle that stands in its way, then planning how to meet that obstacle (MCII / WOOP), increases goal attainment compared with positive fantasising, dwelling on obstacles, or planning alone.
**Construct:** mental contrasting with implementation intentions · **Used by:** mental-contrast (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Oettingen, G., Pak, H. & Schnetter, K., "Self-regulation of goal-setting: Turning free fantasies about the future into binding goals" | 10.1037/0022-3514.80.5.736 | 2001 | experiment | multiple experiments manipulating contrast order | not extracted | future-then-reality order produced expectancy-dependent commitment; other orders did not | "when people contrast their fantasies about a desired future with reflections on present reality, a necessity to act is induced that leads to the activation and use of relevant expectations. Strong goal commitment arises in light of favorable expectations, and weak goal commitment arises in light of unfavorable expectations. To the contrary, when people only fantasize about a desired future or only reflect on present reality, expectancy-independent moderate goal commitment emerges. Four experiments pertaining to various life domains supported these hypotheses." (abstract via OpenAlex). *The recorded detail that reality-then-future "produces no contrast effect" is not in the cached abstract.* |
| Wang, G., Wang, Y. & Gai, X., "A Meta-Analysis of the Effects of Mental Contrasting With Implementation Intentions on Goal Attainment" | 10.3389/fpsyg.2021.565202 | 2021 | meta-analysis | meta-analysis | k = 24 effect sizes / 21 studies, N = 15,907 | Hedges' g = 0.336, 95% CI [0.229, 0.443]; trim-and-fill bias-corrected g = 0.242, 95% CI [0.143, 0.342] | "Results showed that MCII to be effective for goal attainment with a small to medium effect size (g = 0.336). The effect was mainly moderated by intervention style." (quoted verbatim from the PMC full-text article, fetched directly: pmc.ncbi.nlm.nih.gov/articles/PMC8149892/). Moderator: face-to-face experimenter delivery g = 0.465 vs. document-based delivery g = 0.277 (p < .05); Egger's test suggested some asymmetry (t = 5.46, p < .01) but fail-safe N = 482 exceeded the critical threshold, and the trim-and-fill-adjusted estimate remains clearly above zero. The cached abstract adds: "because of some publication bias, the actual effect sizes may be smaller." |

### Replication
No dedicated large pre-registered replication of MCII was found in this session (searched). The Wang et al. 2021 meta-analysis's own publication-bias correction (trim-and-fill) is the closest available check, and it does **not** null out the effect (g drops from 0.336 to 0.242, still significant and positive), so tie-break 2 (§6.2) is not triggered.

### Backfire evidence
- Kappes, H. B. & Oettingen, G., "Positive fantasies about idealized futures sap energy," *Journal of Experimental Social Psychology* 47(4), 2011. DOI 10.1016/j.jesp.2011.02.003 (verified). 4 experiments. "Induced positive fantasies resulted in less energy than fantasies that questioned the desired future, negative fantasies, or neutral fantasies," because positive fantasies "trigger the relaxation that would normally accompany actual achievement, rather than marshaling the energy needed to obtain it" (search synthesis of abstract). **Unread: no cached abstract.**
- Mental contrasting *without* the obstacle/plan step (pure positive fantasy, "Indulging") is expected to underperform; Oettingen et al. 2001's read abstract supports that fantasy alone yields only "expectancy-independent moderate goal commitment".
- Low expectancy: contrasting is expectancy-dependent by design; with unfavourable expectations it produces "weak goal commitment" (Oettingen et al. 2001, abstract via OpenAlex). The `helps` text must say so.

### Grade
**B** · transfer **direct** · effect **small**
Rationale: The Wang et al. (2021) meta-analysis (full text read) supports MCII against control conditions: g = 0.336, falling to 0.242 after trim-and-fill, and 0.277 for document-based delivery, which is what a paper page is. That part alone would meet A. But the claim as written also compares MCII with positive fantasising, dwelling, and planning alone. Those comparisons rest on Oettingen et al. (2001; four experiments, abstract read via the cache), which measured commitment rather than attainment and did not test the plan step. No read source compares MCII with planning alone. So B, on several consistent experiments for the comparative part. Tie-break: none (tie-break 2 was checked and is not triggered). The effect is labelled small because the corrected and paper-delivery estimates sit at the low end of the authors' "small to medium".
Suggested rewording: "Contrasting a desired future with the inner obstacle, then planning how to meet it (MCII / WOOP), gives a small-to-moderate increase in goal attainment compared with control conditions, and a smaller one when delivered on paper without a guide." This would earn **A** (direct, small).

### Adversarial pass
confirmed: Wang et al.'s (2021) trim-and-fill estimate (g = 0.242) stays clearly above zero and no large pre-registered failure of MCII was found (searched); the comparative half rests on Oettingen et al.'s (2001) four experiments, so B is the ceiling for the claim as written.

---

## task-unpacking
**Claim:** Breaking a task into its ordered component steps before predicting when it will be done reduces optimistic bias in completion-time predictions.
**Construct:** unpacking; the planning fallacy · **Used by:** timeline (LB), forecast `duration` (S, §11.1)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Buehler, R., Griffin, D. & Ross, M., "Exploring the 'planning fallacy': Why people underestimate their task completion times" | 10.1037/0022-3514.67.3.366 | 1994 | experiment | field/lab studies of thesis completion predictions | 37 psychology students (thesis study) | mean predicted 33.9 days vs. actual 55.5 days; only ~30% finished by their own predicted date (*not in the cached abstract*) | "Ss' predictions of their completion times were too optimistic for a variety of academic and nonacademic tasks. Think-aloud procedures revealed that Ss focused primarily on future scenarios when predicting their completion times. In Study 4, the optimistic bias was eliminated for Ss instructed to connect relevant past experiences with their predictions." (abstract via OpenAlex). *The recorded thesis figures are not in the abstract; the abstract supports the bias, not the numbers.* |
| Kruger, J. & Evans, M., "If you don't want to be late, enumerate: Unpacking reduces the planning fallacy" | 10.1016/j.jesp.2003.11.001 | 2004 | experiment | multiple experiments (holiday shopping, getting ready, formatting, food prep) | not extracted | unpacking → significantly longer (more realistic) time estimates | "participants in the unpack condition estimated significantly longer time" for tasks such as holiday shopping (search synthesis). **Unread: no cached abstract; not used for grading.** |
| Forsyth, D. K. & Burt, C. D. B., "Allocating time to future tasks: The effect of task segmentation on planning fallacy bias" | 10.3758/mc.36.4.791 | 2008 | experiment | 3 experiments | not extracted | summed subtask estimates > single-task estimate ("segmentation effect") | "allocated time for a single task was significantly smaller than the summed time allocated to the individual subtasks" (search synthesis of abstract). **Unread: no cached abstract; not used for grading.** |
| Buehler, R., Griffin, D. & Peetz, J., "The Planning Fallacy: Cognitive, Motivational, and Social Origins" | 10.1016/S0065-2601(10)43001-4 | 2010 | review | narrative review | — | n/a | Reviews scope, definitional controversies, and generality of the planning fallacy (search synthesis). **Unread: no cached abstract.** |

### Replication
No RRR/Many-Labs-style replication was found (searched). Kruger & Evans 2004 and Forsyth & Burt 2008 are independent conceptual replications of the unpacking/segmentation mechanism across different task domains, both reported as supporting the effect (both unread; see above).

**Search for critical-path/sequencing evidence (per brief):** none found (searched: unpacking + planning fallacy + critical path + prerequisite sequencing combinations). The located literature supports unpacking a task *for the purpose of estimating duration*; no study was found that tests whether explicitly sequencing steps or prerequisites improves plan *execution*.

### Backfire evidence
- Buehler, R. & Griffin, D., "Planning, personality, and prediction: The role of future focus in optimistic time predictions," *Organizational Behavior and Human Decision Processes* 92, 2003. DOI 10.1016/S0749-5978(03)00089-X (verified). Experiments. A detailed, "flowing," future-focused completion *scenario* **increased** optimistic bias (search synthesis). **Unread: no cached abstract.** The read Buehler et al. (1994) abstract points the same way: predictors "focused primarily on future scenarios", and the bias went away only when they connected "relevant past experiences" to the prediction.
- Timeline's ordered list of discrete steps sits closer to Kruger & Evans's itemised unpacking than to a narrative scenario, but both could be described as "breaking a task into steps."

### Grade
**D** · transfer **adjacent** · effect **n/a**
Rationale: No read source tests unpacking. Kruger & Evans (2004) and Forsyth & Burt (2008), the two papers that do, were recorded from search syntheses and have no cached abstract, so they stay unread. The one read source, Buehler et al. (1994), establishes the planning fallacy itself. Its only debiasing result is linking the prediction to past experience, not unpacking. With no admissible test of the claim, the grade is D. Tie-break: none; this is a D for want of read evidence, not the theory or practice rules. If the two unpacking abstracts confirm the recorded findings, the claim would earn **B** (two independent multi-experiment papers). Separately, timeline asks for order and prerequisites but no time estimate, and no study of sequencing for execution was found. That transfer gap would remain.

### Adversarial pass
confirmed: no read source tests unpacking (Kruger & Evans 2004 and Forsyth & Burt 2008 have no cached abstract), so D.

---

## timeboxing
**Claim:** Setting a fixed time limit for a phase of work ends deliberation sooner, with no loss of decision quality for convergent tasks.
**Construct:** timeboxing; deadlines as goals (Parkinson's law) · **Used by:** timer (LB), Sitting (LB, 40-minute default)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Parkinson, C. N., "Parkinson's Law" | — (no DOI) · https://web.archive.org/web/20180705215319/https://www.economist.com/news/1955/11/19/parkinsons-law | 1955 | practice | essay, not empirical | — | n/a | Origin of "work expands to fill the time available for its completion"; not an empirical study. Listed in `unverified` (no DOI, type `practice`). |
| Bryan, J. F. & Locke, E. A., "Parkinson's Law as a goal-setting phenomenon" | 10.1016/0030-5073(67)90021-9 | 1967 | experiment | experiment | not extracted | generous deadlines → lower self-set performance goals → slower work | "the Parkinson effect wasn't just about available time – it was about goals. People given generous deadlines set lower performance goals for themselves, and those lower goals ... drove the slower pace" (search synthesis). **Unread: no cached abstract; not used for grading.** |
| Ordóñez, L. & Benson, L. III, "Decisions under Time Pressure: How Time Constraint Affects Risky Decision Making" | 10.1006/obhd.1997.2717 | 1997 | experiment | experiment (gamble valuation) | not extracted | time pressure → shift to simplifying/eliminating strategies | Time-constrained participants shifted toward "screening items out of the choice set ... to reduce the set and thus the processing time necessary to make a final choice" (search synthesis). **Unread: no cached abstract.** |
| Edland, A. & Svenson, O., "Judgment and Decision Making Under Time Pressure," in Svenson & Maule (eds.), *Time Pressure and Stress in Human Judgment and Decision Making* | 10.1007/978-1-4757-6846-6_2 | 1993 | review | narrative review of prior three decades | — | n/a | "effects of time pressure include an over-reliance on negative information and an increased reliance on fewer attributes or dimensions in making choices" (search synthesis). **Unread: no cached abstract.** |

### Replication and integrity finding (critical)
**Ariely, D. & Wertenbroch, K., "Procrastination, Deadlines, and Performance: Self-Control by Precommitment," *Psychological Science* 13(3), 2002.** DOI 10.1111/1467-9280.00441 (verified — Crossref now returns the title with a "RETRACTED:" prefix). This was the brief's lead for "self-imposed deadlines are weaker than external ones."

**This paper was retracted in September 2026 and counts for nothing.** A replication of its Study 2, Hyndman, K. & Bisin, A., "Replication of 'Procrastination, Deadlines, and Performance: Self-Control by Precommitment'," *Psychological Science*, 2026. DOI 10.1177/09567976261460772 (verified), found: "In our replication, with adult participants enrolled at a large public university in the United States, changes in the deadlines had a negligible effect on the three performance metrics and several survey metrics used in the original study. Evenly spaced deadlines, externally imposed on participants by the experimenters, did not stand out for their effectiveness in reducing procrastination in participants." (abstract via OpenAlex). Data Colada's forensic analyses (datacolada.org/138) then found evidence that the original Study 2 data were tampered with or fabricated. Retraction notice: DOI 10.1177/09567976261488042 (verified, 2026).

The remaining unretracted evidence (Bryan & Locke 1967; Ordóñez & Benson 1997; Edland & Svenson 1993; all unread, see above) was recorded as supporting only the weaker claims that deadlines work through goal-setting, and that time pressure changes decision *strategy*. No source located supports "no loss of decision quality for convergent tasks"; the recorded time-pressure findings point towards *reduced* thoroughness.

### Backfire evidence
See `creativity-fixation/time-pressure-divergent` for the divergent-thinking side. Within this batch, Edland & Svenson 1993 and Ordóñez & Benson 1997 were recorded as describing time pressure degrading decision *process* (fewer attributes, over-weighting of negative information). Both are unread.

### Grade
**D** · transfer **adjacent** · effect **n/a**
Rationale: Ariely & Wertenbroch (2002) is retracted and counts for nothing. The three empirical sources were recorded from search syntheses and have no cached abstract, so all three are unread. Parkinson's essay is the only admissible support, and it is practice. Tie-break 1 matches first: Hyndman & Bisin (2026; abstract read) is a failed replication of the deadline study, which caps the self-set-deadline side of the construct at C. But with no read source supporting any part of the claim, rule 6 (practice only) sets the grade at D, as the spec expected. Nothing read addresses the claim's second half, "no loss of decision quality"; what was recorded (unread) points the other way.
Suggested rewording: "Setting a fixed stop time for a convergent phase is a craft practice for forcing a decision; whether it preserves decision quality is untested." This is **D** (practice).

### Adversarial pass
confirmed: Ariely & Wertenbroch (2002) is retracted, the three empirical sources are unread, and the only admissible support is Parkinson's essay (practice), so D.

Strict-mode source (2026-09-26): Parkinson (1955), The Economist essay added as the claim's D-grade practice source; the grade is unchanged.

---

## sitting-duration *(parameter)*
**Claim:** A single focused working session of about 40 minutes can be sustained without a marked decline in attention or quality for self-directed thinking work.
**Construct:** sustained attention over a session; vigilance decrement; mental fatigue · **Used by:** Sitting (P, 40-minute default)
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wilson, K. & Korn, J. H., "Attention during Lectures: Beyond Ten Minutes" | 10.1080/00986280701291291 | 2007 | review | review of note-taking, observational, self-report, and physiological studies | — | n/a | "We found that the research on which this estimate is based provides little support for the belief that students' attention declines after 10 to 15 min. Most studies failed to account for individual differences in attention." (abstract via OpenAlex) |
| Bradbury, N., "Attention span during lectures: 8 seconds, 10 minutes, or more?" | 10.1152/advan.00109.2016 | 2016 | review | literature review | — | n/a | "Thus, the available primary data do not support the concept of a 10- to 15-min attention limit. Interestingly, the most consistent finding from a literature review is that the greatest variability in student attention arises from differences between teachers and not from the teaching format itself." (abstract via OpenAlex). *The recorded sentence "The 15-minute attention span is a myth" is not in the cached abstract.* |
| Mackworth, N. H., "The Breakdown of Vigilance during Prolonged Visual Search" | 10.1080/17470214808416738 | 1948 | experiment | clock-test vigilance paradigm, 2-hour watch | — | detection declined ~10–15% in the first 30 min, then more gradually over 90 min | Seminal vigilance-decrement finding (search synthesis). **Unread: the cache holds only a citation line, no abstract.** Analogical at best. |
| Warm, J. S., Parasuraman, R. & Matthews, G., "Vigilance Requires Hard Mental Work and Is Stressful" | 10.1518/001872008x312152 | 2008 | review | review across 4 evidence types (task type, perceived workload, neural measures, stress) | — | n/a | "Subjective reports also show that the workload of vigilance is high and sensitive to factors that increase processing demands." and "Converging evidence using behavioral, neural, and subjective measures shows that vigilance requires hard mental work and is stressful." (abstract via OpenAlex) |

### Replication
Not directly applicable (no "40-minute session" study exists to replicate). As a caution on generic "mental fatigue/depletion" framing:
- Hagger, M. S. et al., "A multilab preregistered replication of the ego-depletion effect," *Perspectives on Psychological Science* 11(4), 2016. DOI 10.1177/1745691616652873 (verified, `rrr`). "Multiple laboratories (k = 23, total N = 2,141) ... revealed that the size of the ego-depletion effect was small with 95% confidence intervals (CIs) that encompassed zero (d = 0.04, 95% CI [-0.07, 0.15]." (abstract via OpenAlex)
- Vohs, K. D. et al., "A Multisite Preregistered Paradigmatic Test of the Ego-Depletion Effect," *Psychological Science*, 2021. DOI 10.1177/0956797621989733 (verified, `rrr`). k = 36 labs, N = 3,531; "Confirmatory tests found a nonsignificant result ( d = 0.06)." (abstract via OpenAlex)

### Backfire evidence
The question is whether there is evidence for a specific duration. **Answer: no; this is a design choice.** No source tests 40 minutes, or any specific duration, for self-paced thinking work. Wilson & Korn 2007 and Bradbury 2016 argue *against* treating fixed-minute thresholds as evidence-based in the lecture context. Warm et al. 2008 describes a real vigilance cost, but in passive monitoring, not active writing. The ego-depletion RRRs undercut a "willpower runs out" rationale.

### Grade
**D** · transfer **analogical** · effect **n/a**
Rationale: No read source tests any session length for self-directed thinking work. The two read reviews of lecture attention find no support for fixed attention limits. The vigilance review concerns passive monitoring. Mackworth (1948) is unread. The two ego-depletion RRRs failed, but they are not replications of this claim, so tie-break 1 does not apply. Tie-break: none; D on §6.1, "not directly tested".
Parameter recommendation: keep as a design choice. The reviews give no reason to shorten 40 minutes, and none to justify it.

### Adversarial pass
confirmed: no read source tests any session length for self-directed thinking work, so D (a design choice).

---

## progress-monitoring
**Claim:** Monitoring progress towards a goal increases goal attainment, and more so when the progress is physically recorded.
**Construct:** progress monitoring / self-monitoring · **Used by:** check-in (LB), Ritual (LB), scoresheet (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harkin, B., Webb, T. L., Chang, B. P. I., Prestwich, A., Conner, M., Kellar, I., Benn, Y. & Sheeran, P., "Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence" | 10.1037/bul0000025 | 2016 | meta-analysis | RCTs meta-analysis | k = 138 studies, N = 19,951 | medium effect, d ≈ 0.40, on goal attainment | "A random effects model revealed that, on average, interventions were successful at increasing the frequency of monitoring goal progress (d+ = 1.98, 95% CI [1.71, 2.24]) and promoted goal attainment (d+ = 0.40, 95% CI [0.32, 0.48]). Furthermore, changes in the frequency of progress monitoring mediated the effect of the interventions on goal attainment. Moderation tests revealed that progress monitoring had larger effects on goal attainment when the outcomes were reported or made public, and when the information was physically recorded." (abstract via OpenAlex) |
| Michie, S., Abraham, C., Whittington, C., McAteer, J. & Gupta, S., "Effective techniques in healthy eating and physical activity interventions: A meta-regression" | 10.1037/a0016136 | 2009 | meta-analysis | meta-regression across heterogeneous interventions | — | self-monitoring among the most consistently effective techniques, especially combined with other control-theory techniques | "The technique, "self-monitoring," explained the greatest amount of among-study heterogeneity (13%). Interventions that combined self-monitoring with at least one other technique derived from control theory were significantly more effective than the other interventions (0.42 vs. 0.26)." (abstract via OpenAlex) |
| Burke, L. E., Wang, J. & Sevick, M. A., "Self-Monitoring in Weight Loss: A Systematic Review of the Literature" | 10.1016/j.jada.2010.10.008 | 2011 | review | systematic review, 22 studies (1993–2009) | — | dietary self-monitoring associated with greater weight loss; dose-response with log consistency (*dose-response not in the cached abstract*) | "A significant association between self-monitoring and weight loss was consistently found; however, the level of evidence was weak because of methodological limitations." (abstract via Semantic Scholar) |

### Replication
No dedicated large pre-registered replication beyond the Harkin et al. 2016 meta-analysis itself was found in this session (searched); Harkin 2016 is already a synthesis of 138 randomised studies.

### Backfire evidence
- Deci, E. L., Koestner, R. & Ryan, R. M., "A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation," *Psychological Bulletin* 125(6), 1999. DOI 10.1037/0033-2909.125.6.627 (verified). Meta-analysis, 128 studies. "Engagement-contingent, completion-contingent, and performance-contingent rewards significantly undermined free-choice intrinsic motivation (d = -0.40, -0.36, and -0.28, respectively) ... Verbal rewards and feedback, on the other hand, can have a positive effect when they are informative" (verbatim from the accessible abstract PDF found via search). The cached abstract (via OpenAlex) confirms the first part and adds: "Positive feedback enhanced both free-choice behavior (d = 0.33) and self-reported interest (d = 0.31)."
- Lepper, M. R., Greene, D. & Nisbett, R. E., "Undermining children's intrinsic interest with extrinsic reward: A test of the 'overjustification' hypothesis," *Journal of Personality and Social Psychology* 28(1), 1973. DOI 10.1037/h0035519 (verified). Field experiment. "The results supported the prediction that subjects in the expected-award condition would show less subsequent intrinsic interest in the target activity than subjects in either of the other two conditions." (abstract via OpenAlex)
- Applicability caveat: both concern *extrinsic rewards contingent on* a target, which is adjacent to monitoring itself. Whether reward-free recording becomes a gamed target, or causes discouragement when progress is poor, was searched and **none found**.

### Grade
**A** · transfer **adjacent** (check-in, Ritual) / **analogical** (scoresheet) · effect **moderate**
Rationale: Harkin et al. (2016; abstract read via the cache) is a meta-analysis of 138 randomised studies (N = 19,951) finding d+ = 0.40 on goal attainment. It also reports the moderator the claim names: larger effects "when the information was physically recorded". Michie et al. (2009; abstract read) is a consistent second meta-analytic line, in which self-monitoring explained the most heterogeneity. Burke et al. (2011; abstract read) is consistent but rates its own evidence as weak. There is no failed large replication, so A. Tie-break: none. Tie-break 4 could not be tested, because Harkin's I² is not in the abstract; Michie's I² of 69% is below the threshold. Transfer differs by item. Check-in and Ritual are weekly written goal monitoring. Scoresheet tracks a felt quantity within one sitting, not goal progress, so it is analogical.

### Adversarial pass
downgraded A→B: tie-break 4 — Harkin et al.'s full text (author manuscript, eprints.whiterose.ac.uk/id/eprint/87431) reports goal-attainment heterogeneity "Q(137) = 837.77" (I² ≈ 84%), and the two reported moderators that match a private paper page pull apart ("monitoring in private (d+ = 0.19)" against "Physically recording the information ... (d+ = 0.43)"), with no private-and-recorded subgroup, so the heterogeneity is not resolved for our conditions; trim-and-fill gives "d+ = 0.19 (95% CI = 0.10 to 0.28)", not near zero, so tie-break 2 does not fire; `effect` should become small (DOI 10.1037/bul0000025).

---

## prior-state-recall
**Claim:** People recall their earlier attitudes, feelings or confidence as closer to their present state than they were, or as fitting their theory of how they must have changed. A written baseline is therefore needed to see real change.
**Construct:** consistency and change biases in autobiographical memory (implicit theories of stability and change) · **Used by:** scoresheet (LB), check-in (LB), Ritual (LB), worst-case (S, §11.1), scoresheet `domains` (S, §11.1)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Goethals, G. R. & Reckman, R. F., "The perception of consistency in attitudes" | 10.1016/0022-1031(73)90030-9 | 1973 | experiment | field/lab discussion-group experiment (busing attitudes) | small groups of high-school students | subjects distorted recalled pre-discussion attitude toward new attitude; controls did not | "subjects distorted their recall of their initial stand on bussing so as to make it consistent with their new attitude ... control subjects did not distort their original bussing attitudes" (search synthesis of abstract). **Unread: no cached abstract; not used for grading.** |
| Ross, M., "Relation of Implicit Theories to the Construction of Personal Histories" | 10.1037/0033-295X.96.2.341 | 1989 | theory | theoretical synthesis + supporting study | — | n/a | "It is then suggested that people use their implicit theories of self to construct their personal histories. This formulation is used to interpret the results of a wide-ranging set of studies of memory of personal attributes. It is concluded that implicit theories of stability and change can lead to biases in recall." (abstract via OpenAlex) |
| Conway, M. & Ross, M., "Getting what you want by revising what you had" | 10.1037/0022-3514.47.4.738 | 1984 | experiment | field experiment: study-skills program with pre/post self-ratings | not extracted | participants recalled pre-program self-ratings as worse than originally given, manufacturing illusory improvement | Participants rated study skills before an ineffective program, then recalled their original ratings, and "nevertheless perceived an improvement in their study skills" via revised recall of the baseline (search synthesis). **Unread: no cached abstract; not used for grading.** |
| Wolfe, M. B. & Williams, T. J., "Poor metacognitive awareness of belief change" | 10.1080/17470218.2017.1363792 | 2018 | experiment | 2 experiments (belief about spanking, pre/post persuasive text) | not extracted | recalled initial beliefs biased toward current beliefs; people largely unaware their beliefs changed | "Recollections of initial beliefs tended to be biased in the direction of subjects' current beliefs. In addition, the relationship between the belief consistency of the text read and accuracy of belief recollections was mediated by belief change. This belief memory bias was independent of on-line text processing and comprehension measures, and indicates poor metacognitive awareness of belief change." (abstract via OpenAlex) |

### Replication
No dedicated large pre-registered replication of Goethals & Reckman 1973 or Conway & Ross 1984 was found (searched). Wolfe & Williams 2018 is a modern conceptual replication of the general phenomenon in the belief domain.

### Backfire evidence
The brief asks whether a visible earlier rating anchors the later one and suppresses real change. No primary study was fetched with a verified DOI; it is listed in `unverified`. This is an open design question for scoresheet (whether to hide the "before" column at the "after" rating), unresolved either way.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The read evidence is Wolfe & Williams (2018; two experiments, abstract read via the cache) and Ross's (1989) theoretical synthesis (abstract read), which interprets "a wide-ranging set of studies" but is typed as theory. The two classic experiments that test the claim most directly, Goethals & Reckman (1973) and Conway & Ross (1984), have no cached abstract and stay unread. One read experimental paper plus a theory synthesis is "few studies", so C. Tie-break: none. If the two classic abstracts confirm the recorded findings, this would earn **B** (several independent experiments, consistent). Conway & Ross is also the closest analogue to a before/after page. The claim's second sentence ("a written baseline is therefore needed") is an inference from the bias, and no read study tests it.

### Adversarial pass
confirmed: one read two-experiment paper (Wolfe & Williams 2018) plus a theory synthesis (Ross 1989) is "few studies", so C.

---

## graduated-self-experiment
**Claim:** Deliberately testing a feared prediction with a small, planned real-world action, and then comparing what happened with what was expected, reduces avoidance and revises the expectation. The comparison step is doing work, not just the exposure.
**Construct:** behavioural experiments; expectancy violation (inhibitory learning); mastery experiences (self-efficacy) · **Used by:** small-experiment (LB) · goal-factoring `aversion` (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bandura | 10.1037/0033-295X.84.2.191 | 1977 | theory | foundational self-efficacy theory paper | n/a | n/a | Confirmed via Crossref (title/author/year). Not independently re-quoted (theory paper). **Cache discrepancy: the cached "abstract" for this DOI (via OpenAlex) is the abstract of an unrelated thalassemia-screening study, so it cannot be used. Stays unread.** |
| Craske, Treanor, Conway, Zbozinek & Vervliet | 10.1016/j.brat.2014.04.006 | 2014 | review/theory | clinical review translating inhibitory-learning model into exposure practice | n/a | n/a | "Exposure optimization strategies include (1) expectancy violation, (2) deepened extinction, (3) occasional reinforced extinction, (4) removal of safety signals, (5) variability, (6) retrieval cues, (7) multiple contexts, and (8) affect labeling." The cached abstract (via Semantic Scholar) confirms, and adds: "Although evidence supports an inhibitory learning model of extinction, there has been little discussion of how to implement this model in clinical practice." |
| Norton & Price | 10.1097/01.nmd.0000253843.70149.9a | 2007 | meta-analysis | meta-analytic review of adult CBT outcome across anxiety disorders, 108 trials | 108 trials | efficacious, no differential effect by component | "Cognitive therapy and exposure therapy alone, in combination, or combined with relaxation training, were efficacious across the anxiety disorders, with no differential efficacy for any treatment components for any specific diagnoses... CBT effects were superior to those for no-treatment and expectancy control treatments." (confirmed by the cached abstract, via OpenAlex) |
| Haug, Nordgreen, Öst & Havik | 10.1016/j.cpr.2012.04.002 | 2012 | meta-analysis | meta-analysis + meta-regression of self-help treatment for anxiety disorders, 56 articles/82 comparisons | 56 articles, 82 comparisons | g = 0.78 vs waitlist/placebo; g = −0.20 vs face-to-face | "When self-help treatment was compared to wait-list or placebo, a meta-analysis indicated a moderate to large effect size (g=0.78). When self-help treatment was compared to face-to-face treatment, results indicated a small effect that favored the latter (g=-0.20)... self-help is effective in the treatment of anxiety disorders." (read by the sourcing agent; no cached abstract) |

### Replication
Haug et al. (2012) is a meta-analytic synthesis across 56 self-help studies, the closest large-sample check on the "self-directed, no therapist" question. No RRR of expectancy violation or inhibitory learning was located.

### Backfire evidence
Haug et al.'s g = −0.20 (self-help worse than face-to-face) supports the "adjacent" transfer call: self-guided exposure is effective against no treatment but underperforms guided delivery. No source tested whether unguided exposure can *sensitise* rather than habituate, or tested the page's "accept either outcome" pre-commitment. Both remain unverified design choices.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The first half of the claim, that planned exposure reduces avoidance, is well supported in clinical anxiety. Norton & Price (2007; 108 trials) and Haug et al. (2012; self-help g = 0.78 against waitlist) are both read meta-analyses. But the claim's distinctive second sentence, that the comparison step does work beyond the exposure, rests on Craske et al.'s (2014) clinical review. That review itself says there has been "little discussion" of how to implement the model. The only read component-level evidence, Norton & Price, found "no differential efficacy for any treatment components", which does not favour a comparison step. Graded as written, the component claim rests on theory plus one review, with read meta-analytic evidence that is at best silent on it. That is C: few studies, mixed. Tie-break: none. Bandura (1977) stays unread, because the cache holds the wrong abstract for its DOI.
Suggested rewording: "Planned, graded exposure to a feared situation reduces avoidance and anxiety, including when self-guided, though self-guided versions do somewhat less well than guided ones." This would earn **A** (two consistent meta-analyses; transfer adjacent, since both concern diagnosed anxiety).

### Adversarial pass
confirmed: the exposure half has read meta-analytic support (Norton & Price 2007; Haug et al. 2012) while the comparison-step half rests on one review, so C rather than D, since the page's action is tested in an adjacent population; nothing leans on Bandura (1977), whose cached abstract is an unrelated paper and which is not counted or listed in the JSON sources.

---

## goal-decomposition
**Claim:** A persistent behaviour often serves several goals at once. Listing the goals it serves before looking for alternatives yields replacements that are more likely to be adopted than replacements aimed at its stated goal alone.
**Construct:** multifinality (goal systems theory); functional assessment and functionally equivalent replacement behaviour · **Used by:** goal-factoring (LB) · goal-factoring `aversion` (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kruglanski, Shah, Fishbach, Friedman, Chun & Sleeth-Keppler | 10.1016/S0065-2601(02)80008-9 | 2002 | theory | goal-systems theory chapter (multifinality, equifinality) | n/a | n/a | Confirmed via Crossref. Theory source for one behaviour serving multiple goals at once (multifinality); not an empirical test of self-applied listing. No quote recorded and no cached abstract. |
| Sheldon & Kasser | 10.1037/0022-3514.68.3.531 | 1995 | experiment (2 studies) | personal-strivings framework; functional coherence among listed goals | 2 studies | related to well-being outcomes | "Functional coherence was defined as occurring when participants' 'personal strivings' ... help bring about each other or help bring about higher level goals... Study 2 showed that these goal integration measures were also related to role system integration and were prospective predictors of daily mood, vitality, and engagement." (read by the sourcing agent; no cached abstract) |
| Gage, Lewis & Stichter | 10.1177/019874291203700201 | 2012 | meta-analysis | hierarchical linear modeling meta-analysis of functional-behavioral-assessment-based interventions in schools | 69 FBA studies / 146 subjects / 206 outcome graphs | large for FBA-based, ~0 for non-FBA-based (*comparison not in the cached abstract*) | "Based on a sample of 69 FBA studies, 146 subjects, and 206 outcome graphs, results indicated that, overall, FBA-based interventions reduced problem behavior by an average of 70.5% and that the procedure was effective across all student characteristics." (abstract via OpenAlex). *The recorded comparison with non-FBA interventions is not in the cached abstract and does not count.* |
| O'Neill, Horner, Albin, Storey & Sprague, *Functional Assessment and Program Development for Problem Behavior* | — (ISBN 0-534-25366-9) | 1997 | practice (manual) | practitioner handbook for functional assessment | n/a | n/a | **still unread** as a primary text. |

### Replication
Gage, Lewis & Stichter (2012) evaluates function-based *interventions delivered by practitioners* to *other people's* problem behaviour in schools, mostly single-subject designs. It is not self-applied goal listing. No test of self-applied functional analysis was found.

### Backfire evidence
No source tests whether a self-generated goal list is a post-hoc rationalisation rather than an accurate account of what the behaviour serves (the Nisbett & Wilson 1977 introspective-access critique, not re-sourced). This is an unaddressed gap.

### Grade
**D** · transfer **analogical** · effect **n/a**
Rationale: The claim is comparative: replacements found by listing a behaviour's goals are adopted more than replacements aimed at its stated goal alone. No read source tests that comparison. Gage et al. (2012; abstract read via the cache) shows that function-based school interventions reduce problem behaviour. Its comparison with non-function-based interventions is not in the abstract, so it does not count. Sheldon & Kasser (1995) concerns goal coherence and well-being, not replacement. Kruglanski et al. (2002) is theory, and O'Neill et al. (1997) is practice, both unread. That leaves the claim not directly tested: D on §6.1. Tie-break: none formally; the admissible support is theory and practitioner method. The grade hinges on Gage et al.'s full text. If it confirms that function-based interventions beat non-function-based ones, the claim would earn **C** with analogical transfer: one meta-analysis of single-subject designs, in a distant population, with practitioner delivery.

### Adversarial pass
confirmed: no read source tests the comparative claim, and the admissible support is theory, practice and a practitioner-delivered meta-analysis whose comparison is not in its abstract, so D.

---

## choice-bracketing
**Claim:** Deciding a class of repeated choices together, as a rule or policy, produces more consistent and more farsighted choices than deciding each instance separately.
**Construct:** broad vs narrow choice bracketing; bundling of choices; personal rules · **Used by:** commit `policy` (LB for the variant)
**Load-bearing:** yes (for the variant)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Read, Loewenstein & Rabin | 10.1023/A:1007879411489 | 1999 | theory/review | conceptual + evidence review of choice bracketing | n/a | n/a | "When making many choices, a person can broadly bracket them by assessing the consequences of all of them taken together, or narrowly bracket them by making each choice in isolation." (opening abstract sentence, confirmed via a citing aggregator; primary publisher page paywalled). **Secondary description with no cached abstract: counted as unread.** It is a definition, not a finding. |
| Hofmeyr, Ainslie, Charlton & Ross | 10.1111/j.1360-0443.2010.03166.x | 2010 (online) / 2011 (print, *Addiction*) | experiment | smokers vs non-smokers choosing SS vs LL rewards, free/suggested/forced bundling conditions, 4 decisions over 8 weeks | 30 smokers, 30 non-smokers | positive for smokers only | "Smokers increased their preference for LL rewards when 'bundling' of individual decisions into a sequence was either suggested or forced. This preference increased with repeated experience. Non-smokers showed neither pattern." (confirmed by the cached abstract, via OpenAlex, which adds: "If replicated, this finding may form the basis of an intervention") |
| Read & Loewenstein | 10.1037/1076-898x.1.1.34 | 1995 | experiment (multiple) | combined vs separated snack/consumption choices; diversification bias | multiple experiments (incl. Simonson 1990 data: 64% vs 9% variety) | mechanism: time contraction + choice bracketing | "There appears to be at least one situation in which combined choices actually leave consumers worse off. This occurs when consumers select many goods of the same kind to meet future consumption needs... [subjects] showed much more variety seeking when making simultaneous choices (64% chose three different items) than when making sequential choices (9%)." The cached abstract (via OpenAlex) confirms the diversification bias and attributes it to "time contraction" and "choice bracketing". |
| Ainslie, *Picoeconomics* | — (ISBN 0-521-40724-4) | 1992 | theory (book) | personal-rules/bundling theory of self-control | n/a | n/a | **still unread** as a primary text. |

### Replication
No RRR of choice bracketing was found. Hofmeyr et al. (2011)'s "suggested" and "forced" bundling conditions converge, but only in smokers, the population theorised to need it; the authors themselves write "if replicated".

### Backfire evidence
Read & Loewenstein's diversification bias: combining choices is **not** uniformly better. When the choices are for repeated consumption of the same good, combined choice produces more variety-seeking than people's sequential choices reveal they want. The "what-the-hell" collapse and rigid-rule over-control risks rest on Ainslie's theory, which is unread.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The one read test of the claim is Hofmeyr et al. (2011), a small experiment (30 smokers, 30 non-smokers; abstract read). Bundling decisions raised farsighted choices in smokers only, and the authors flag the finding as awaiting replication. Read & Loewenstein (1995; read) shows a condition where broad bracketing leaves people worse off by their own preferences. That is few, small studies with mixed results, so C. Tie-break: none. Read et al. (1999) and Ainslie (1992) are unread theory. The claim's "more consistent" half is not tested by any read source.
Suggested rewording: "Deciding a series of repeated choices as one bundle can shift people towards the farsighted option, at least for those who usually choose the short-term one." This is still **C** (one small experiment).

### Adversarial pass
confirmed: one small read experiment (30 smokers, 30 non-smokers) with the authors' own "if replicated", against a read counter-condition (diversification bias), is C.

---

## goal-gradient
**Claim:** Effort towards a goal increases as the remaining distance to it shrinks, and making the remaining distance visible strengthens the effect.
**Construct:** the goal-gradient effect; perceived goal distance · **Used by:** tokens `countdown` (LB for the variant)
**Load-bearing:** yes (for the variant)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hull | 10.1037/h0072640 | 1932 | experiment (animal) | classic runway/maze experiments, rats | n.r. | large, foundational | Cited via a secondary quotation embedded in Kivetz et al. (2006). **Secondary description with no cached abstract: unread.** |
| Kivetz, Urminsky & Zheng | 10.1509/jmkr.43.1.39 | 2006 | experiment (field + secondary data + lab) | café loyalty-card program, song-rating website, Tobit/logit models | multiple field samples | positive, replicated across 4 findings | "(1) participants in a real café reward program purchase coffee more frequently the closer they are to earning a free coffee; (2) Internet users who rate songs in return for reward certificates visit the rating Web site more often, rate more songs per visit, and persist longer in the rating effort as they approach the reward goal; (3) the illusion of progress toward the goal induces purchase acceleration ... and (4) a stronger tendency to accelerate toward the goal predicts greater retention and faster reengagement in the program." (confirmed by the cached abstract, via OpenAlex) |
| Bonezzi, Brendl & De Angelis | 10.1177/0956797611404899 | 2011 | theory + experiment | psychophysical model of goal pursuit; "stuck in the middle" | n.r. (Psych Science report) | non-monotonic gradient (U-shaped) | "motivation to engage in goal-consistent behavior can be higher when people are either far from or close to the end state and lower when they are about halfway to the end state... the shape of the goal gradient varies depending on whether an individual monitors progress in terms of distance from the initial state or from the desired end state." (confirmed by the cached abstract, via OpenAlex) |
| Fishbach & Dhar | 10.1086/497548 | 2005 | experiment (4 studies) | perceived goal progress and licensing of inconsistent choices | 4 studies | positive (progress liberates) | "These studies demonstrate that in the course of self-regulation progress along one goal liberates people to pursue inconsistent goals. Furthermore, merely planning to make goal progress in the future may facilitate incongruent choice of immediate action." (confirmed by the cached abstract, via OpenAlex) |

### Replication
No dedicated pre-registered replication of Kivetz et al. (2006) or of endowed-progress effects was located (a gap, not a confirmed absence).

### Backfire evidence
Two boundary conditions: (1) Bonezzi, Brendl & De Angelis show motivation can dip in the middle, which is why the countdown variant must pair with nearer milestones; (2) Fishbach & Dhar show that perceived progress can **license** off-goal behaviour, the coasting risk the brief names.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: Kivetz et al. (2006; abstract read) shows effort rising near a reward, across field and lab data. Bonezzi et al. (2011; abstract read) shows the gradient is not always monotonic: motivation dips about halfway, and the curve's shape depends on whether progress is framed from the start or from the end. That qualifies the claim's first half. Neither read source tests the second half, that making the remaining distance visible strengthens the effect; in Kivetz's studies the card was always visible. Fishbach & Dhar (2005) adds that progress can license coasting. No replication was found. That is mixed results for the first half and no test of the second, so C. Tie-break: none.
Suggested rewording: "Effort towards a goal tends to rise as the end draws near, though motivation can dip about halfway, and how progress is framed (done so far vs still to go) changes the shape." This would earn **B** (Kivetz and Bonezzi, independent and consistent with this wording).

### Adversarial pass
confirmed: the first half is mixed (Kivetz et al. 2006 against Bonezzi et al.'s mid-distance dip) and no read source tests the visibility half, so C.
