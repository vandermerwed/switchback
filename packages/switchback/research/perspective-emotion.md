# perspective-emotion

**Family** `perspective-emotion` (claims.md §5, plus the Gate 1b claims 5.7–5.10 in §11). **Batches merged:** the perspective-emotion half of PE-AL (`sourcing/PE-AL.md` and `PE-AL.json`; its gap-fill log concerns attention-load only) for 5.1–5.6, and the perspective-emotion part of GB (`sourcing/GB.md` and `GB.json`) for 5.7–5.10. **Graded:** 2026-09-25 (step 3, grading agent). **Adversarial pass pending.** Grades apply spec §6 and claims.md §10. Only sources whose finding was read count. A source flagged "still unread" or "partially unread", recorded from a secondary description, or read only as metadata does not support a grade, unless its cached abstract in `.superpowers/research/abstracts/PE-AL.md` or `GB.md` supports the recorded finding. In that case its Finding cell quotes the cached abstract, marked "(abstract via <API>)". Most PE-AL findings were read directly from abstracts by the sourcing agent and stand as recorded. For every source used, only the abstract was read unless the cell says otherwise. Check-in's and Ritual's load-bearing claims (progress-monitoring, prior-state-recall) live in `planning-self-regulation.md`. Effect labels: `small` for d or g below about 0.3 or where the authors call the effect small, `moderate` for about 0.3–0.7, `n/a` where no read source gives a size. **Grades:** A 1 · B 2 · C 5 · D 2.

> **Batch note (PE-AL):** All DOIs were checked against Crossref. Where a record was located but no abstract could be read, the sourcing agent said so and offered no `finding_quote`.
> **Batch note (GB):** Every DOI was checked against Crossref. A source marked `**still unread:**` was not read beyond its metadata. Sources not so marked were read by the sourcing agent.

---

## perspective-taking
**Claim:** Deliberately writing out a situation from another party's point of view reduces egocentric bias, and brings out considerations the writer would otherwise miss, compared with considering it only from one's own view.
**Construct:** perspective-taking · **Used by:** perspective-swap (LB), perspective-swap `two-sides` (base LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Galinsky & Moskowitz (2000) | 10.1037/0022-3514.78.4.708 | 2000 | experiment | 3 experiments, stereotype/minimal-group tasks | not stated in abstract | not quantified in abstract | "Using 3 experiments, the authors explored the role of perspective-taking in debiasing social thought... In Experiment 1, perspective-taking decreased stereotypic biases on both a conscious and a nonconscious task... In Experiment 3, perspective-taking reduced evidence of in-group bias in the minimal group paradigm by increasing the positivity of evaluations of the out-group." (read: abstract, verified via journal PDF, JPSP 78(4):708–724) |
| Galinsky, Maddux, Gilin & White (2008) | 10.1111/j.1467-9280.2008.02096.x | 2008 | experiment | 3 negotiation studies | not stated in abstract | not quantified | "perspective taking increased individuals' ability to discover hidden agreements and to both create and claim resources at the bargaining table. However, empathy did not prove nearly as advantageous and at times was detrimental..." (read: full first page via journal PDF, Psychological Science 19(4):378–384; confirmed by the cached abstract, via OpenAlex) |
| Todd & Galinsky (2014) — synthesis | 10.1111/spc3.12116 | 2014 | review | narrative review | n/a | n/a | "we review empirical research investigating the efficacy of perspective-taking... more favorable implicit and explicit intergroup evaluations, stronger approach-oriented action tendencies... reduced reliance on stereotype-maintaining mental processes..." also names moderators and mechanisms. (read: abstract via Crossref; confirmed by the cached abstract, via OpenAlex) |

### Replication
No pre-registered replication or Many-Labs/RRR test of the Galinsky & Moskowitz (2000) stereotype-accessibility finding or the Galinsky et al. (2008) negotiation finding was found (searched: PubMed/Europe PMC and Crossref bibliographic search for "replication" + author names; none found).

### Backfire evidence
| Cite | DOI | Condition |
| --- | --- | --- |
| Epley, Caruso & Bazerman (2006) | 10.1037/0022-3514.91.5.872 (verified: JPSP 91(5):872–889) | "Leading people to consider other members' thoughts and perspectives can reduce these egocentric (self-centered) judgments... however, the consideration of others' thoughts and perspectives actually increases egoistic (selfish) behavior... in competitive contexts... This reactive egoism is attenuated in cooperative contexts." (read: abstract) |
| Galinsky, Wang & Ku (2008) | 10.1037/0022-3514.95.2.404 (verified: JPSP 95(2):404–419) | "perspective-takers are particularly likely to adopt a target's positive and negative stereotypical traits and behaviors... taking the perspective of a professor led to improved performance on an analytic task, whereas taking the perspective of a cheerleader led to decreased performance, in line with the respective stereotypes." (read: abstract, Europe PMC) |

### Grade
**B** · transfer **adjacent** · effect **n/a**
Rationale: Several independent experiments support the first half of the claim. Galinsky & Moskowitz (2000; three experiments) and Epley et al. (2006; a series of experiments) both find that perspective-taking reduces egocentric or self-centred judgement. Eyal et al. (2018; see perspective-getting) reports the same: "Perspective taking reduced egocentric biases". For the second half, Galinsky et al. (2008) shows perspective-takers discovered hidden agreements in negotiation. Todd & Galinsky (2014) reviews a consistent intergroup literature. No meta-analysis and no replication was found, so B, not A. Tie-break: none. The backfires are real but conditional (competitive contexts; stereotype assimilation). Eyal et al. warns that the considerations surfaced are not more *accurate*, which the page must not imply. No read study used a written exercise; all used brief instructed perspective-taking.

### Adversarial pass
confirmed: several independent read experiments support the claim and no failed large replication was found (searched); a p-curve analysis (Huang, Peng & Simmons 2021; DOI 10.1177/1368430220957081; abstract via OpenAlex) calls the stereotype results "mixed" but found "some evidential value" despite "low statistical power", which fits B and rules out A.

---

## perspective-getting
**Claim:** Imagining another person's perspective does not reliably make you more accurate about what they think. Asking them does.
**Construct:** perspective mistaking vs. perspective getting · **Used by:** perspective-swap (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Eyal, Steffel & Epley (2018) | 10.1037/pspa0000115 | 2018 | experiment | 25 experiments testing accuracy about others' mental states | large multi-study program | "no consistent evidence" of benefit | "we report 25 experiments testing whether being instructed to adopt another person's perspective increases interpersonal insight... we failed to find any consistent evidence that it actua[lly does]." (read: abstract, Europe PMC; JPSP 114(4):547–571). The cached abstract (via OpenAlex) adds: "If anything, perspective taking decreased accuracy overall while occasionally increasing confidence in judgment. Perspective taking reduced egocentric biases, but the information used in its place was not systematically more accurate. A final experiment confirmed that getting another person's perspective directly, through conversation, increased accuracy but that perspective taking did not." |
| Epley (2014), *Mindwise* | — (book) | 2014 | practice/theory | trade-press synthesis | n/a | n/a | ISBN 9780307743565. Not read directly beyond bibliographic metadata; no verbatim quote taken. |

### Replication
Not separately searched beyond the 25-experiment program itself; no additional independent replication located.

### Backfire evidence
This claim is itself the boundary condition on perspective-taking's accuracy benefits: Eyal et al. (2018) report perspective-taking sometimes *decreased* accuracy while increasing confidence.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The first sentence rests on 25 experiments in one research programme (abstract read), consistent in finding no accuracy gain. That would be B-level, though all 25 come from one lab. The second sentence, "Asking them does", rests on a single final experiment, and no independent replication was found. Graded as written, the claim's positive half is one study, so C. Tie-break: none. The finding still supports the page's closing "what would you ask them?" line and its caveat that the imagined view is not their view.
Suggested rewording: "Imagining another person's perspective does not reliably make you more accurate about what they think, and can raise confidence without raising accuracy." This would earn **B** (many experiments, consistent; single lab).

### Adversarial pass
confirmed: the "Asking them does" half rests on one final experiment in Eyal et al. (2018), with no independent replication, so C.

---

## self-distancing
**Claim:** Reflecting on one's own situation from a distanced perspective (third person, or "me in a year") reduces emotional reactivity and supports wiser reasoning, compared with a first-person immersed view.
**Construct:** self-distancing (spatial, temporal, linguistic) · **Used by:** perspective-swap (S), perspective-swap `two-sides` (S, §11.1)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kross & Ayduk (2011) | 10.1177/0963721411408883 | 2011 | review | narrative review | n/a | n/a | DOI verified. Abstract text not obtainable; only bibliographic metadata confirmed. No quote offered. **Unread.** |
| Kross et al. (2014), "self-talk" | 10.1037/a0035173 | 2014 | experiment | 7 studies, N = 585 | moderate (objective-rater performance + distress measures, not reduced to single ES in abstract) | "using non-first-person pronouns and one's own name (rather than first-person pronouns) during introspection enhances self-distancing... the non-first-person group performed better according to objective raters... They also displayed less distress... and engaged in less maladaptive postevent processing." (read: abstract; JPSP 106(2):304–324) |
| Grossmann & Kross (2014), Solomon's paradox | 10.1177/0956797614535400 | 2014 | experiment | 3 experiments, N = 693 | asymmetry eliminated by manipulation (no single d given in abstract) | "participants displayed wiser reasoning... about another person's problems compared with their own. Across Studies 2 and 3, instructing individuals to self-distance (rather than self-immerse) eliminated this asymmetry." (read: abstract; Psychological Science 25(8):1571–1580) |
| Bruehlman-Senecal & Ayduk (2015), "This too shall pass" | 10.1037/a0038324 | 2015 | experiment | 7 studies | not quantified in abstract | "adopting a distant-future perspective on recent stressors... reduces emotional distress... temporal distancing plays an important role in emotional coping with negative events... by directing individuals' attention to the impermanent aspects of these events." (read: abstract; JPSP 108(2):356–375) |
| Powers & LaBar (2019) — synthesis | 10.1016/j.neubiorev.2018.04.023 | 2019 | review (with supporting neuroimaging meta-analysis) | narrative + meta-analytic neuroimaging component | n/a | n/a | "Distancing is a type of emotion regulation that involves simulating a new perspective to alter the psychological distance and emotional impact of a stimulus... a promising tool for clinical applications." (read: abstract; Neurosci Biobehav Rev 96:155–173) |
| **Murdoch, Chapman, Crane & Gucciardi (2023) — best synthesis** | 10.1002/smi.3199 | 2023 | meta-analysis (pre-registered) | 25 experiments, N = 2,397, 68 effects | **g = 0.19, SE = 0.07, 95% CI [0.05, 0.33] — small-to-moderate** | "A three-level, random effects meta-analysis of 25 experiments... revealed a small-to-moderate advantage of self-distanced reflections... and were most effective when they targeted a stressor experience that emphasised one's emotional state or lifetime. Nevertheless, our assessment of the overall quality of evidence including risk of bias suggested uncertainty regarding the benefit of this pragmatic self-regulatory tactic..." (read: abstract; Stress and Health 39(2):255–271; confirmed by the cached abstract, via OpenAlex) |

### Replication
The Murdoch et al. (2023) pre-registered meta-analysis is the strongest replication-style evidence: a small effect (g = 0.19), explicitly flagged as uncertain given risk of bias in the underlying literature. No separate RRR/Many-Labs test of a single self-distancing study was found.

### Backfire evidence
Murdoch et al. (2023) note quality and risk-of-bias concerns across the literature rather than a specific reversal. No direct evidence was found that distancing becomes avoidance or blunts emotion that carries useful information; this is a gap, not a confirmed backfire.

### Grade
**B** · transfer **adjacent** · effect **small**
Rationale: A pre-registered meta-analysis (Murdoch et al. 2023; 25 experiments) finds a positive advantage for self-distanced reflection. It is supported by several independent multi-study papers: Kross et al. 2014 on self-talk, Grossmann & Kross 2014 on wise reasoning, and Bruehlman-Senecal & Ayduk 2015 on temporal distance. That meets A's letter. It is graded B because the meta-analysts' own quality and risk-of-bias assessment "suggested uncertainty regarding the benefit", which is not "robust". This is a judgement call, flagged for the adversarial pass. Tie-break 7 applies: g = 0.19 < 0.2, so `effect: small` is mandatory, and the `helps` text must say so. The "wiser reasoning" half rests on one paper (Grossmann & Kross 2014).

### Adversarial pass
confirmed: Murdoch et al.'s (2023) pre-registered meta-analysis (g = 0.19) flags risk-of-bias uncertainty and no failed large replication was found (searched), so B; tie-break 7 keeps the grade with `effect: small`.

---

## expressive-writing
**Claim:** Writing about emotional experiences produces small improvements in wellbeing and health outcomes compared with neutral writing.
**Construct:** expressive writing · **Used by:** check-in (S) · Ritual (S)
**Load-bearing:** no

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pennebaker & Beall (1986) | 10.1037/0021-843x.95.3.274 | 1986 | experiment | seminal RCT (trauma writing vs. control) | not read (abstract unavailable; metadata only) | n/a | Not quoted — metadata verified only: J Abnorm Psychol 95(3):274–281. **Unread.** |
| Smyth (1998) | 10.1037/0022-006x.66.1.174 | 1998 | meta-analysis | early small meta-analysis | k not stated in abstract | positive, significant (direction only in abstract) | "This writing task was found to lead to significantly improved health outcomes in healthy participants. Health was enhanced in 4 outcome types... but health behaviors were not influenced. Writing also increased immediate... distress, which was unrelated to health outcomes." (read: abstract; J Consult Clin Psychol 66(1):174–184) |
| **Frattaroli (2006) — best synthesis** | 10.1037/0033-2909.132.6.823 | 2006 | meta-analysis (random effects) | 146 randomized studies | **r = .075, positive and significant (small)** | "One hundred forty-six randomized studies of experimental disclosure were collected... Results of random effects analyses indicate that experimental disclosure is effective, with a positive and significant average r-effect size of .075. In addition, a number of moderators were identified." (read: abstract; Psychol Bull 132(6):823–865; confirmed by the cached abstract, via OpenAlex) |
| Baikie & Wilhelm (2005) — review | 10.1192/apt.11.5.338 | 2005 | review | narrative clinical review | n/a | n/a | DOI verified. Abstract not obtained (paywalled); no quote offered. **Unread.** |
| Reinhold, Bürkner & Holling (2018) | 10.1111/cpsp.12224 | 2018 | meta-analysis | meta-analysis of expressive writing and depressive symptoms | not read | not read | DOI verified. Abstract paywalled; no quote offered. **Unread.** |

### Replication
Frattaroli (2006) supersedes and reconciles two earlier small meta-analyses (Smyth 1998; Frisina, Borod & Lepore 2004) using random- rather than fixed-effects models, a form of cumulative replication. No RRR/Many-Labs-style single-study replication located.

### Backfire evidence
Frattaroli's r = .075 is small by any convention (tie-break 7: `effect: small`). Smyth (1998) reports that writing "increased immediate... distress". The brief's question (can writing about feelings feed rumination; who is harmed, e.g. by writing about very recent trauma?) was not resolved with a quoted source; it is a gap, not a confirmed backfire.

### Grade
**A** · transfer **analogical** · effect **small**
Rationale: Two read meta-analyses agree in direction. Smyth (1998) found significantly improved health outcomes. Frattaroli (2006; 146 randomised studies, random effects) found a positive, significant r = .075. No failed large replication is recorded, so this meets A on §6.1. The claim itself asserts only "small" improvements. Tie-break 7 applies: r = .075 is roughly d = 0.15, below 0.2, so `effect: small` is mandatory. Tie-break 2 could not be tested, because the notes hold no bias-corrected estimate, and the brief asked for one. With an effect this small, a correction could plausibly push it near zero, so the grade hinges on that check, and the adversarial pass should make it. Transfer is analogical: the tested protocol is 15–20 minutes on consecutive days, while check-in is a weekly 10-minute page. Smyth's finding of more immediate distress is the known cost.

### Adversarial pass
downgraded A→B: tie-break 3 — the meta-analyses materially disagree: Mogk et al. (2006; 30 RCTs; no DOI, PMC2736499) found that "Neither regarding somatic nor psychological health variables significant effect sizes were found", and Reinhold, Bürkner & Holling (2018; 39 RCTs; DOI 10.1111/cpsp.12224; abstract via OpenAlex) found that "Expressive writing did not yield significant long-term effects on depressive symptoms", against Frattaroli's r = .075; the most recent read synthesis, Guo (2023; 31 RCTs; DOI 10.1111/bjc.12408), finds a "small but significant effect (Hedges' g = −0.12)", which leaves the conflict open; no bias-corrected estimate near zero was found, so not C; `effect` stays small.

---

## ritual-cadence *(parameter)*
**Claim:** Monitoring and reflecting once a week is frequent enough to obtain most of the benefit of progress monitoring, without the adherence drop-off of daily monitoring.
**Construct:** monitoring frequency; adherence to self-monitoring · **Used by:** Ritual (P)
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harkin, Webb, Chang, Prestwich, Conner, Kellar, Benn & Sheeran (2016) | 10.1037/bul0000025 | 2016 | meta-analysis | 138 studies, N = 19,951 | **d+ = 0.40 [0.32, 0.48] for goal attainment; d+ = 1.98 for monitoring frequency itself** | "Moderation tests revealed that progress monitoring had larger effects on goal attainment when the outcomes were reported or made public, and when the information was physically recorded." (read: abstract; Psychol Bull 142(2):198–229). The cached abstract (via OpenAlex) also states: "Furthermore, changes in the frequency of progress monitoring mediated the effect of the interventions on goal attainment." |
| Burke, Wang & Sevick (2011) | 10.1016/j.jada.2010.10.008 | 2011 | review | systematic review, 22 studies | n/a (descriptive) | n/a | "This review highlights the need for studies in more diverse populations, for objective measures of adherence to self-monitoring, and for studies that establish **the required dose of self-monitoring** for successful outcomes." (read: abstract; J Am Diet Assoc 111(1):92–102) |

### Replication
n/a (parameter claim; no cadence-specific replication located).

### Backfire evidence
Neither source directly tests weekly-vs-daily cadence. Harkin et al.'s reported moderators are "public/reported" and "physically recorded", not a frequency schedule; **the claim that weekly is "frequent enough" is not directly tested**. Burke et al. (2011) says the required dose of self-monitoring has not been established.

### Grade
**D** · transfer **adjacent** · effect **n/a**
Rationale: No read source compares weekly with daily monitoring, or tests any cadence. Burke et al. (2011) says outright that the required dose is unknown. Harkin et al.'s abstract reports that increases in monitoring *frequency* mediated the effect on attainment. If anything, that suggests more frequent monitoring does more, and it gives no support for "weekly is enough". Tie-break: none; D on §6.1, "not directly tested".
Parameter recommendation: keep as a design choice, labelled as such. A weekly default is defensible on adherence and convenience grounds, but not on evidence of sufficiency. Note that claims.md §5.5 expected Harkin to supply a frequency moderator; the read abstract does not supply one.

### Adversarial pass
confirmed: no read source tests any monitoring cadence, and Burke et al. (2011) says the required dose is unknown, so D (a design choice).

---

## ritual-duration *(parameter)*
**Claim:** A reflective writing session of ten minutes or less is enough to obtain the benefits of monitoring and reflective writing.
**Construct:** dose in expressive writing and reflection · **Used by:** Ritual (P)
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Frattaroli (2006) | 10.1037/0033-2909.132.6.823 | 2006 | meta-analysis | 146 studies; "duration of the manipulation" examined as a moderator | r = .075 overall | abstract names duration of manipulation as one of the moderators but does not give the specific direction/magnitude in the text read | "The relation between written emotional expression and health was moderated by a number of variables, including... duration of the manipulation..." (read: abstract) — direction of the duration moderator not obtained (would require the full paper, which is paywalled). *The cached abstract (via OpenAlex) is shorter and ends at "a number of moderators were identified"; the moderator list is from the sourcing agent's direct read.* |
| Burton & King (2008), "the two-minute miracle" | 10.1348/135910707x250910 | 2008 | experiment | 2 min/day × 2 days | small (fewer health complaints at follow-up) | "Participants wrote about either a personal trauma, a positive life experience, or a control topic for 2 minutes each day for 2 days... Both the trauma and the positive experience conditions reported fewer health complaints at follow-up than the control condition." (read: abstract; Br J Health Psychol 13(1):9–14; confirmed by the cached abstract, via OpenAlex) |

### Replication
Not separately searched; Burton & King (2008) is a single boundary-test of minimum dose, not independently replicated as far as found.

### Backfire evidence
Burton & King (2008) pushes the *other* direction from the brief's worry: 2 minutes per day is far *below* the 10-minute design, suggesting the floor for benefit may be lower than assumed. No read moderator data favour longer sessions (that would need Frattaroli's full text).

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: One small experiment (Burton & King 2008; abstract read) found health benefits from two 2-minute sessions of emotional writing. That is suggestive that short sessions can suffice. The direction of Frattaroli's duration moderator was not read, so the one synthesis that could settle the question is silent in the notes. No read source addresses whether ten minutes is enough for the *monitoring* half of the claim. One study, so C. Tie-break: none. The outcome measured was self-reported health complaints, not reflection or monitoring benefits.
Parameter recommendation: keep as a design choice. Burton & King gives no reason to lengthen the session. Revisit if Frattaroli's duration moderator is read and favours longer sessions.

### Adversarial pass
confirmed: one small read experiment (Burton & King 2008) is C; Reinhold et al. (2018) reports larger effects "when the number of sessions was higher", which concerns session count rather than session length and does not change the grade.

---

## decatastrophizing

**Claim:** Writing out a dreaded outcome concretely, including what would happen next and how one would cope, lowers its felt severity. People overestimate how bad and how long-lasting their reaction to negative events will be.
**Construct:** decatastrophising (cognitive therapy); the impact bias and immune neglect in affective forecasting · **Used by:** worst-case (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Beck, *Cognitive Therapy of Depression* | — (ISBN 0-89862-000-7) | 1979 | practice/theory | foundational cognitive-therapy text (decatastrophising as a technique) | n/a | n/a | **still unread** as a primary text. |
| Gilbert, Pinel, Wilson, Blumberg & Wheatley | 10.1037/0022-3514.75.3.617 | 1998 | experiment (6 studies) | affective-forecasting studies across breakups, tenure denial, electoral defeat, rejection, negative feedback, bereavement account | 6 studies | large, consistent overestimation | "People are generally unaware of the operation of the ... psychological immune system ... and thus they tend to overestimate the duration of their affective reactions to negative events... The present experiments suggest that people neglect the psychological immune system when making affective forecasts." (read by the sourcing agent; no cached abstract) |
| Wilson, Wheatley, Meyers, Gilbert & Axsom | 10.1037/0022-3514.78.5.821 | 2000 | experiment (5 studies) | college football fans predicting happiness impact of game outcomes; focalism manipulation | 5 studies | reduces durability bias | "Asking people to think about other future activities should reduce the durability bias... college football fans were less likely to overpredict how long the outcome of a football game would influence their happiness if they first thought about how much time they would spend on other future activities." (read by the sourcing agent; no cached abstract) The closest direct test of worst-case's "next day/week/month" block. |
| Norem & Cantor | 10.1037/0022-3514.51.6.1208 | 1986 | experiment (2 studies) | defensive pessimism vs anxiety/low-expectation performance effects | 2 experiments | positive for defensive pessimism, not naive low expectations | "With a strategy called defensive pessimism ... individuals may sometimes use low expectations to cope with their anxiety so that it does not become debilitating... interference with the defensive-pessimism strategy impairs performance." (read by the sourcing agent; no cached abstract) |
| Mathieu & Gosling | 10.1177/0956797611427044 | 2012 | commentary/brief report (2 pp.) | reanalysis distinguishing relative vs absolute accuracy in affective-forecast studies | k = 16 findings reviewed | asymmetric, direction-dependent | **partially unread:** recorded via secondary paraphrase; primary abstract not fetched and not in the cache. **Unread; not used for grading.** |

### Replication
No large pre-registered RRR of decatastrophising or the impact bias was located.

### Backfire evidence
Wilson et al. (2000)'s focalism mechanism is double-edged for worst-case: thinking through concrete future consequences works by getting people to consider *other* future events that will compete for attention. The mechanism is dilution, not "vivid imagination reduces dread". If the page's block rehearses the catastrophe in isolation, without the competing events, the tested mechanism may not transfer. No source tested whether detailed catastrophe rehearsal feeds rumination (the Borkovec worry concern); this is a gap.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The claim's second sentence is well supported. Gilbert et al. (1998; six studies) and Wilson et al. (2000; five studies) find that people overestimate how long negative events will affect them. The first sentence, the page's actual move, is less supported. Decatastrophising itself (Beck 1979) is unread practice. The one read intervention test, Wilson et al. (2000), reduced a *forecast of duration* by prompting thought about *other* activities. It did not lower felt severity by rehearsing the outcome and coping. With one indirect test of the intervention half, and no meta-analysis read (Mathieu & Gosling is unread), the claim as written earns C. Tie-break: none. Both papers come from overlapping authors, which limits independence.
Suggested rewording: "People overestimate how long their distress after a bad outcome will last, and thinking through the other things that will fill the following days reduces that overestimate." This would earn **B** (two multi-study papers, consistent; overlapping labs). It also implies a design note: the next day, week and month block should ask what else will be going on, not only how the catastrophe unfolds.

### Adversarial pass
confirmed: the forecasting half is supported, but the intervention half has only one indirect test (Wilson et al. 2000), from overlapping authors, so C.

---

## gratitude

**Claim:** Regularly writing down things one is grateful for produces small improvements in well-being. Weekly writing is at least as effective as daily.
**Construct:** gratitude interventions; hedonic adaptation to repeated positive activities · **Used by:** check-in (S; the optional gratitude row)
**Load-bearing:** no (supporting)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Emmons & McCullough | 10.1037/0022-3514.84.2.377 | 2003 | experiment (3 studies) | gratitude-listing vs hassles/neutral/social-comparison conditions, weekly and daily records; 1 study in neuromuscular-disease patients | 3 studies | positive, most robust on positive affect | "The gratitude-outlook groups exhibited heightened well-being across several, though not all, of the outcome measures across the 3 studies, relative to the comparison groups. The effect on positive affect appeared to be the most robust finding." (confirmed by the cached abstract, via OpenAlex, which also states that participants "kept weekly (Study 1) or daily (Study 2) records") |
| Cregg & Cheavens | 10.1007/s10902-020-00236-6 | 2020 (online) / 2021 (print, *J. Happiness Studies* vol. 22) | meta-analysis | meta-analysis of gratitude interventions' effect on depression/anxiety symptoms | k = 27, N = 3,675 | small | Per direct-quote follow-up (ScienceDaily, quoting the authors): "There was a difference, but it was a small difference. It would not be something you would recommend as a treatment" (J. Cheavens). **Secondary description (press coverage) with no cached abstract: unread; not used for grading.** |
| Lyubomirsky, Sheldon & Schkade | 10.1037/1089-2680.9.2.111 | 2005 | theory | "architecture of sustainable change" model of hedonic adaptation | n/a | n/a | **still unread** by the sourcing agent. The cached abstract (via OpenAlex) exists, but no finding was recorded, and the abstract does not address weekly vs daily frequency: "The authors then consider adaptation and dynamic processes to show why the activity category offers the best opportunities for sustainably increasing happiness." It does not support the frequency point. |

### Replication
Cregg & Cheavens (2020/2021) would be the large-sample synthesis check (k = 27, N = 3,675), but it is unread and concerns depression/anxiety symptoms, not general well-being.

### Backfire evidence
Cregg & Cheavens (unread) is reported as finding a small effect on clinical symptoms, not a treatment-grade one. The "weekly beats daily" point (Lyubomirsky et al. 2005) was not verified. The brief's questions about active controls and forced gratitude in depressed participants were not answered by a read source.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: The only read source is Emmons & McCullough (2003; three studies, abstract read). It found heightened well-being on "several, though not all" outcomes, most robustly positive affect. No meta-analysis was read: Cregg & Cheavens is known only through press quotes, and Davis et al. (2016) and Dickens (2017) were not sourced. The claim's second sentence, that weekly is at least as effective as daily, has no read support. Emmons & McCullough used weekly records in one study and daily in another, but the abstract does not compare them. Lyubomirsky et al.'s abstract does not address frequency. One multi-study paper, and nothing on the frequency half, so C. Tie-break: none. No effect size was read; the claim's own "small" is the most the page may say.
Suggested rewording: "Regularly listing things one is grateful for raised well-being, most reliably positive mood, in controlled studies using weekly or daily lists." This would stay at **C** until a meta-analysis is read.

### Adversarial pass
confirmed: the only read source is Emmons & McCullough (2003), and nothing read addresses the weekly-versus-daily half, so C.

---

## intrapersonal-goal-conflict

**Claim:** Conflict between a person's own goals predicts negative affect and inaction. Making both sides explicit and looking for an integrating resolution reduces that conflict more than overriding one side.
**Construct:** intrapersonal goal conflict; ambivalence; resolution through integration · **Used by:** perspective-swap `two-sides` (LB for the variant)
**Load-bearing:** yes (for the variant)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Emmons & King | 10.1037/0022-3514.54.6.1040 | 1988 | experiment (3 studies) | personal-strivings conflict/ambivalence ratings; diary + experience sampling; 1-year follow-up | 88 undergraduates (2 studies) + follow-up + 3rd sampling study | positive (conflict → negative affect) | "Conflict and ambivalence were associated with high levels of negative affect, depression, neuroticism, and psychosomatic complaints... subjects were less likely to act on conflictful and ambivalent strivings but to spend more time thinking about these strivings." (read by the sourcing agent; no cached abstract) |
| Gray, Ozer & Rosenthal | 10.1016/j.jrp.2016.12.003 | 2017 | meta-analysis | meta-analysis of goal conflict and psychological well-being | k = 54 studies | negative association, stronger for distress | "Higher levels of goal conflict are related to lower levels of positive psychological outcomes and greater psychological distress, though this relationship is stronger for distress outcomes... This meta-analysis provides evidence that goal conflict has a negative association with psychological well-being." (read by the sourcing agent; no cached abstract) |
| Miller & Rose | 10.1017/S1352465813000878 | 2013 (online) / 2015 (print) | review | review of motivational-interviewing decisional balance vs evocation for ambivalence | n/a | n/a | "With ambivalent people, a DB [decisional balance] intervention tends to decrease commitment to change, whereas evocation ... promotes change... DB is an appropriate procedure when the clinician wishes to maintain neutrality and not favor the resolution of ambivalence in any particular direction." (confirmed by the cached abstract, via OpenAlex) |

### Replication
Gray, Ozer & Rosenthal's meta-analysis (k = 54) confirms the *first half* of the claim (conflict predicts poorer well-being). No test of the *second half* (a written two-sided resolution method reduces conflict more than overriding one side) was located, matching the brief's expectation of a D/analogical grade for that half.

### Backfire evidence
Miller & Rose (2015) is a direct warning: with ambivalent people, a neutral both-sides "decisional balance" exercise, structurally similar to a two-column page, **decreases commitment to change** relative to evoking movement towards one side.

### Grade
**D** · transfer **analogical** · effect **n/a**
Rationale: The first sentence is strongly supported, but only as an association. Gray et al. (2017) is a meta-analysis of 54 studies, and Emmons & King (1988) links conflict with negative affect and with less action on the conflicted strivings. The second sentence is what the two-sides page does, and no read source tests it. The nearest read evidence, Miller & Rose's review, finds that a neutral two-sided exercise tends to *lower* commitment to change in ambivalent people. Graded as written, the load-bearing mechanism is not directly tested, so D, as the roster expected. Tie-break: none (D on §6.1; the resolution half rests on untested practice such as two-chair work, which was not sourced). The page's crux line and if-then close aim at resolution rather than neutral balance. That may be what separates it from decisional balance, but it is untested.
Suggested rewording: "Conflict between a person's own goals is associated with lower well-being, more distress, and less action on the conflicted goals." This would earn **A** as an association claim (one consistent meta-analysis). It grounds why the page exists, not that the page works.

### Adversarial pass
confirmed: the resolution half, which is what the two-sides page does, is untested, and the nearest read evidence (Miller & Rose) warns against it, so D.

---

## domain-satisfaction

**Claim:** Rating satisfaction in several named life domains gives a reliable and valid measure of subjective well-being, and it shows which domain drives a change that a single overall rating hides.
**Construct:** domain satisfaction; the Personal Wellbeing Index; bottom-up models of life satisfaction · **Used by:** scoresheet `domains` (LB for the variant)
**Load-bearing:** yes (for the variant; grounds the measure, not a claimed benefit)

### Sources
| Cite | DOI/ISBN | Year | Type | Design | n | Effect | Finding (quoted from source) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| International Wellbeing Group, *Personal Wellbeing Index – Adult, 5th edition* (manual) | ISBN 978-1-74156-177-7 (url: deakin.edu.au/research/acqol/instruments/wellbeing-index) | 2013 | practice (instrument manual) | 7-domain 0–10 self-report scale, psychometric summary of pooled Australian/international surveys | 28 Australian surveys pooled + international | Cronbach α .70–.85; ICC test-retest .84; convergent r=.78 | "Cronbach alpha lies between .70 and .85 in Australia and overseas. Inter-domain correlations are often moderate at round .30 to .55 and item-total correlations are at least .50. The index has also demonstrated good test-retest reliability across 1-2 week interval with an intra-class correlation coefficient of 0.84." Convergent validity: "A correlation of .78 with the Satisfaction with Life Scale ... has been reported." |
| Diener | 10.1037/0033-2909.95.3.542 | 1984 | review | foundational review defining subjective well-being's cognitive + affective structure | n/a | n/a | **still unread:** abstract not retrievable; the cache is also empty (no title returned). |
| Schimmack & Oishi | 10.1037/0022-3514.89.3.395 | 2005 | experiment (5 studies) | tests whether item order (domain before/after global satisfaction) drives life-satisfaction judgements, vs chronically accessible information | 225 / 100 / 200 / 222 / 651 (5 studies) | weak item-order effect; strong chronic-accessibility effect | "Meta-analyses revealed high retest-reliability of life satisfaction judgments and weak effects of the item order of domain and global satisfaction judgments. Study 1 (N=225) failed to replicate a widely cited finding of strong item-order effects. In Studies 2 (N=100), 3 (N=200), and 4 (N=222), chronically accessible information was a strong predictor of life satisfaction judgments, whereas item order had a relatively small effect." (abstract via OpenAlex) |
| Strack, Martin & Schwarz | 10.1002/ejsp.2420180505 | 1988 | experiment | question-order priming effect on life-satisfaction/dating-frequency correlation | college students (n not independently confirmed) | large order effect (r = −.12 → r = .66) (*figures not in the cached abstract*) | "Two experiments examined the effects of answering a question about a specific component of life satisfaction on respondents' assessment of their overall satisfaction with life... When the two questions are merely placed in sequence without a conversational context, the answer to the subsequent general question is based in part on the primed specific information. As a result, the answer to the general question becomes similar to that for the specific question (i.e. assimilation). However, this does not occur when the two questions are placed in a communication context." (abstract via OpenAlex). *The cached abstract supports a qualitative order (assimilation) effect; the recorded correlations and the dating question are not in it.* |

### Replication
Schimmack & Oishi (2005) is a direct replication attempt of an earlier strong item-order finding and **fails to replicate a strong item-order effect** across 5 studies (total N ≈ 1,398). It finds item order has "a relatively small effect" once chronically accessible information is accounted for.

### Backfire evidence
Strack et al. (1988) is the textbook citation for "the sequence of ratings can distort the judgement", which is the brief's concern about the fixed print order of scoresheet `domains`. Schimmack & Oishi's later, larger, multi-study work, with meta-analyses, finds that effect weak. The concern that a composite can hide the one low domain is not tested by either source; it is a property of averaging.

**Resolving the conflict (per §6.2):** Tie-break 1 does not strictly apply. Schimmack & Oishi (2005) is not an RRR or a pre-registered replication, and whether its Study 1 had twice the original n cannot be checked. Tie-break 3 does not apply either, because Strack et al. is not a meta-analysis. Grading by the more rigorous and recent evidence, Schimmack & Oishi's meta-analyses plus five studies (N ≈ 1,398) outweigh two 1988 experiments. The conclusion: order effects exist in the conditions Strack et al. describe (a specific question placed right before a general one, without conversational framing), but they are small in general. The Strack effect itself is capped at C by its failed conceptual replication. For the page, rating order is a minor risk, and it is smaller still when no overall rating directly follows a domain rating.

### Grade
**C** · transfer **adjacent** · effect **n/a**
Rationale: Reliability is supported. The PWI manual (practice, but reporting pooled psychometrics) gives α .70–.85 and test-retest ICC .84. Schimmack & Oishi's meta-analyses (abstract read) report "high retest-reliability of life satisfaction judgments" and only weak order effects. Validity rests on the manual's r = .78 with the Satisfaction with Life Scale, a practice source; Diener (1984) is unread. The claim's second half, that domain ratings show which domain drives a change a single rating hides, is not tested by any read source; it follows from arithmetic rather than evidence. One peer-reviewed multi-study paper plus an instrument manual, with half the claim untested, is C. Tie-break: none; not rule 6, because Schimmack & Oishi is peer-reviewed empirical evidence. As claims.md requires, this grounds the measure, not any benefit of rating. Transfer is adjacent: the page's domains are self-chosen, while the PWI's are fixed and validated.
Suggested rewording: "Rating satisfaction in several named life domains follows an established well-being measure with good retest reliability, and the order of the ratings has only a small effect on the answers." This would earn **B** (meta-analyses and five studies in one paper, plus the manual's psychometrics).

### Adversarial pass
confirmed: reliability rests on one peer-reviewed multi-study paper plus an instrument manual (practice), and the "shows which domain drives a change" half is untested, so C.
