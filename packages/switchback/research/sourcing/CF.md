# Sourcing batch CF — creativity-fixation (claims.md §2)

All DOIs below were verified against the Crossref REST API in this session (`curl -A "longhand-research (https://github.com/vandermerwed/skills)" "https://api.crossref.org/works/<doi>"`), confirming resolved title, first author, and year match the citation, per claims.md §10 ruling 8. Where a finding is marked "quoted verbatim, fetched directly" it was pulled via NCBI PubMed E-utilities (`efetch`), the Semantic Scholar Graph API, or a directly-read PDF/page in this session. Where marked "search synthesis" it comes from a WebSearch tool summary of the source and was not independently re-fetched — treated as lower-confidence and flagged for the grading agents. Grade and Adversarial pass are left `pending`.

---

## random-stimuli
**Claim:** Exposure to randomly selected stimuli (words or prompts unrelated to the problem) during idea generation increases the number and originality of ideas, compared with generating without stimuli.
**Construct:** random entry / external stimulation in idea generation · **Used by:** forced-connections (LB), stimulus-die (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dugosh, K. L., Paulus, P. B., Roland, E. J. & Yang, H. C., "Cognitive stimulation in brainstorming" | 10.1037/0022-3514.79.5.722 | 2000 | experiment | 3 experiments (audiotape idea exposure; electronic brainstorming) | not extracted per-experiment | positive; moderated by attentional set and exposure content | "Evidence was obtained for enhanced idea generation both during and after idea exposure. The attentional set of the participant and the content of the exposure manipulation (number of ideas, presence of irrelevant information) influenced this effect." (quoted verbatim, fetched directly via PubMed efetch, PMID 11079237) |
| Vasconcelos, L. & Crilly, N., "Inspiration and fixation: Questions, methods, findings, and challenges" | 10.1016/j.destud.2015.11.001 | 2016 | review | integrative review of 25 experimental studies, 14 manipulated variables | 25 studies | mixed/heterogeneous across studies | "This reveals 14 manipulated variables, relating to properties of the inspiration source and features of the design process. However, whilst these studies follow a similar approach, when scrutinised and compared, they show great variety in the methods used and the results obtained." (quoted verbatim, fetched directly via Semantic Scholar API) |
| Sio, U. N., Kotovsky, K. & Cagan, J., "Fixation or inspiration? A meta-analytic review of the role of examples on design processes" | 10.1016/j.destud.2015.04.004 | 2015 | meta-analysis | meta-analysis, 43 design studies | 43 studies | mixed: examples both narrow and diversify ideas | **still unread (gap-fill 2026-09-25): reattempted and confirmed still inaccessible — paywalled, no OA location per Unpaywall (checked again this session).** Existence and full citation (title/authors/year/journal) verified via Crossref. The finding below is carried over from a WebSearch synthesis, not independently verified: providing examples increased example-related and reduced idea-category counts, but increased average novelty, with stronger effects for fewer/less-common examples. **Not used for grading beyond DOI-verified existence.** |
| Jansson, D. G. & Smith, S. M., "Design fixation" | 10.1016/0142-694x(91)90003-f | 1991 | experiment | multiple experiments, engineering-design students | not extracted | fixation on provided example even when flawed | Abstract not independently fetched (pre-OA, no PubMed record). Quoted secondarily via Leahy et al. 2020 (below), which paraphrases the original directly: "Jansson and Smith (1991, 'Design Fixation,' Des. Stud., 12(1), pp. 3-11) demonstrated that design fixation occurs when an example solution is provided along with a design problem. After seeing an example concept—even with its flaws pointed out—new designs often share its features." (quoted verbatim from Leahy et al. 2020's abstract, fetched directly) |
| Leahy, K., Daly, S. R., McKilligan, S. & Seifert, C. M., "Design Fixation From Initial Examples: Provided Versus Self-Generated Ideas" | 10.1115/1.4046446 | 2020 | experiment | large-scale experiment, beginning engineers | large sample (not extracted exactly) | fixation occurs from self-generated concepts too; Design Heuristics mitigate it in a second generation phase | "The results showed that both groups experienced less fixation during the second-generation phase [after using Design Heuristics]." (quoted verbatim, fetched directly via Semantic Scholar API) |

### Replication
No Many Labs / RRR of random-stimuli-in-ideation specifically was found. The closest large-scale synthesis is the Sio, Kotovsky & Cagan (2015) meta-analysis of 43 studies (above), which functions as an aggregation rather than a pre-registered replication, and Vasconcelos & Crilly's (2016) 25-study integrative review, which explicitly reports "great variety in the methods used and the results obtained" — i.e., the underlying literature is heterogeneous rather than convergent (relevant to §6.2 tie-break 4).

### Backfire evidence
- Jansson & Smith (1991, above): the seminal demonstration that exposure to an example *causes* fixation on that example's features, even when its flaws are pointed out — direct evidence that stimuli can narrow rather than widen output.
- Vasconcelos & Crilly (2016, above) and the broader design-fixation literature it reviews document that whether a stimulus inspires or fixates depends heavily on manipulated variables (source concreteness/abstractness, similarity to the target problem, number of examples shown) rather than being a uniform effect.
- Leahy et al. (2020, above): a targeted mitigation (Design Heuristics) reduced fixation on both provided and self-generated initial ideas — suggesting random/generic prompts may work better as heuristic operators (see `heuristic-prompts`) than as raw stimuli, if the mechanism is disrupting fixation on a single first idea rather than adding novel content per se.

### Grade
pending

### Adversarial pass
pending

---

## heuristic-prompts
**Claim:** Prompting idea generation with generic transformation heuristics ("reverse it", "make it 10x", "borrow from another field") increases the variety and creativity of generated concepts, compared with unprompted generation.
**Construct:** design heuristics / transformation operators; analogical transfer ("steal from another field") · **Used by:** stimulus-die (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Yilmaz, S., Daly, S. R., Seifert, C. M. & Gonzalez, R., "Evidence-based design heuristics for idea generation" | 10.1016/j.destud.2016.05.001 | 2016 | review/observational | analysis of 4 empirical studies of design process/outcomes (award-winning products; one designer's multi-concept set; 48 designers' concept sets), 3,450+ process outcomes | 3,450+ design outcomes | 77 heuristics extracted as recurring patterns of "intentional variation" | "The resulting set of patterns, in the form of 77 Design Heuristics, catalog how designers appear to introduce intentional variation into conceptual product designs. These heuristics provide 'cognitive shortcuts' that can help designers generate more, and more varied, candidate concepts." (quoted verbatim, fetched directly via Semantic Scholar API). **Caveat for grading: this is an observational/extraction study of what expert designers already do, not an RCT that randomly assigns heuristic-prompting vs. no-prompting and measures output.** |
| Leahy, K., Daly, S. R., McKilligan, S. & Seifert, C. M., "Design Fixation From Initial Examples: Provided Versus Self-Generated Ideas" (same source as under `random-stimuli`) | 10.1115/1.4046446 | 2020 | experiment | large-scale experiment, beginning engineers, pre/post Design Heuristics | large sample | reduced fixation after Design Heuristics prompting | "To consider whether fixation on initial examples ... might be mitigated, we asked these students to complete a second (30 min) idea generation phase using Design Heuristics for idea inspiration. The results showed that both groups experienced less fixation during the second-generation phase." (quoted verbatim, fetched directly) — this is the closest experimental (not merely observational) evidence that heuristic prompting causally changes output. |
| Gick, M. L. & Holyoak, K. J., "Analogical problem solving" | 10.1016/0010-0285(80)90013-4 | 1980 | experiment | classic analogical-transfer experiments (Duncker radiation problem) | not extracted | spontaneous analogical transfer is low without a hint to use the source analogy | Not independently fetched this session (Semantic Scholar returned no abstract; open-access link 403'd). DOI/title/author/year verified via Crossref only. Cited here as the canonical finding — well established in secondary literature — that analogical transfer requires an explicit prompt, which is the direct rationale for the die's random *operator* faces rather than leaving analogical transfer to chance; **not used as a quoted finding for grading.** |
| Gick, M. L. & Holyoak, K. J., "Schema induction and analogical transfer" | 10.1016/0010-0285(83)90002-6 | 1983 | experiment | follow-up experiments testing schema abstraction as a fix for low spontaneous transfer | not extracted | providing/inducing an abstract schema raises transfer rate | Not independently fetched this session (abstract inaccessible). DOI verified via Crossref only; **not used as a quoted finding for grading.** |

### Replication
No dedicated large-scale or pre-registered replication of "prompting with generic heuristics increases creative output" was found this session (searched via Crossref bibliographic search for replication/registered-replication terms combined with "design heuristics"). The Yilmaz et al. (2016) heuristics catalog has been used and partially validated in several follow-up studies (Yilmaz, Seifert, Daly & Gonzalez 2016, DOI 10.1115/1.4032219, verified via Crossref but not independently read this session), but these are extensions rather than replications of a causal prompting effect.

### Backfire evidence
The brief asks whether a randomly assigned heuristic that misfits the problem wastes the roll, and whether analogical transfer is poor without an explicit prompt to apply it. No study directly tests "wasted die rolls." On the second question, the well-established Gick & Holyoak (1980, 1983) result — that spontaneous analogical transfer between a source and target is low unless solvers are explicitly told or hinted to use the source — supports the *design rationale* for the die (it converts an implicit, low-transfer analogy task into an explicit prompt), but this is inferred from secondary knowledge of the literature rather than a verbatim-quoted finding, since the two 1980s abstracts could not be fetched this session.

### Grade
pending

### Adversarial pass
pending

---

## conceptual-combination
**Claim:** Deliberately combining two distant concepts produces more original ideas than working from a single concept, with originality driven by attributes that emerge from the combination.
**Construct:** conceptual combination (bisociation) · **Used by:** forced-connections (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ward, T. B., "Structured Imagination: the Role of Category Structure in Exemplar Generation" | 10.1006/cogp.1994.1010 | 1994 | experiment | 5 experiments, undergraduates imagining novel-planet animals | 385 undergraduates (across 5 experiments) | imagined novel exemplars are structured by earth-typical category properties | **still unread (gap-fill 2026-09-25): reattempted this session (Semantic Scholar, ScienceDirect, ERIC) — confirmed paywalled, no OA location found, DOI verified via Crossref only.** The finding below is carried over from a WebSearch synthesis, not independently verified: "The majority of imagined creatures were structured by properties that are typical of animals on earth: bilateral symmetry, sensory receptors, and appendages... Results ... are consistent with the idea that similar structures and processes underlie creative and noncreative aspects of cognition." |
| Wilkenfeld, M. J. & Ward, T. B., "Similarity and Emergence in Conceptual Combination" | 10.1006/jmla.2000.2772 | 2001 | experiment | participants wrote definitions for 8 similar / 8 dissimilar word pairs | not extracted | dissimilar (distant) pairs produced more emergent features than similar pairs | **still unread (gap-fill 2026-09-25): reattempted this session (ScienceDirect, academia.edu) — confirmed paywalled, no OA location found, DOI verified via Crossref only.** The finding below is carried over from a WebSearch synthesis, not independently verified: "Similar pairs led to fewer emergent features than dissimilar pairs, and first attempts at defining the combinations produced fewer emergent features than second attempts. Definitions of similar pairs more often assigned a property of one concept to the other, whereas definitions of dissimilar pairs more often identified a thematic relation between the concepts." |
| Sio, U. N., Kotovsky, K. & Cagan, J. (2015) (same meta-analysis cited under `random-stimuli`) | 10.1016/j.destud.2015.04.004 | 2015 | meta-analysis | 43 design studies | 43 studies | remote/uncommon examples raised novelty at some feasibility cost | See caveat above under `random-stimuli`: DOI-verified only, abstract not read this session. |

### Replication
No Many Labs / RRR was found for conceptual combination specifically. **Lead correction:** the brief's suggested "Estes & Ward 2002" does not resolve to a real, matching paper — Crossref bibliographic search for that author pair and year returns nothing matching; the closest hits are Estes (2003, solo-authored, "A tale of two similarities: comparison and integration in conceptual combination," DOI 10.1016/j.cogsci.2003.01.001 / 10.1207/s15516709cog2706_4, both verified) and Wilkenfeld & Ward (2001, above). This lead appears to be a wrong author/year pairing in claims.md; Estes (2003) and Wilkenfeld & Ward (2001) together cover the intended synthesis territory.

### Backfire evidence
The brief asks whether highly dissimilar pairs yield less useful combinations, or lower output quality even as originality rises. Wilkenfeld & Ward (2001, above) is directly relevant but cuts the other way on originality/emergence (dissimilar pairs produce *more* emergent, novel content) without measuring usefulness or quality directly. The Sio, Kotovsky & Cagan (2015) meta-analysis pattern reported in secondary sources — remote/uncommon stimuli raising novelty while narrowing the idea-category count — is the closest available evidence for a quantity/breadth-vs-novelty trade-off, but its abstract was not independently read this session (see caveat above), so it is not used as a graded backfire finding.

### Grade
pending

### Adversarial pass
pending

---

## deferred-judgement
**Claim:** Separating idea generation from evaluation, with judgement deferred until generation is done, increases the number of ideas without reducing, and sometimes increasing, the number of good ones.
**Construct:** deferral of judgement; diverge/converge separation · **Used by:** ten-bad-ideas (LB), Incubation (LB), constraint-removal (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Parnes, S. J. & Meadow, A., "Effects of 'brainstorming' instructions on creative problem solving by trained and untrained subjects" | 10.1037/h0047223 | 1959 | experiment | classic brainstorming-instructions experiment | not extracted | deferred-judgement instructions increased good-quality response counts | **still unread (gap-fill 2026-09-25):** pre-OA era paper, no abstract indexed in PubMed/Europe PMC/Semantic Scholar; not fetched. DOI/title/author/year verified via Crossref only; **not used as a quoted finding for grading.** |
| Basadur, M., Graen, G. B. & Scandura, T. A., "Training effects on attitudes toward divergent thinking among manufacturing engineers" | 10.1037/0021-9010.71.4.612 | 1986 | experiment | field training experiment, manufacturing engineers | not extracted | training in deferred judgement improved attitudes toward, and practice of, divergent thinking | **still unread (gap-fill 2026-09-25):** not indexed in PubMed/Europe PMC under this search, no OA copy found via Unpaywall. DOI verified via Crossref only; **not used as a quoted finding for grading.** |
| Rietzschel, E. F., Nijstad, B. A. & Stroebe, W., "Productivity is not enough: A comparison of interactive and nominal brainstorming groups on idea generation and selection" | 10.1016/j.jesp.2005.04.005 | 2006 | experiment | comparison of interactive vs. nominal brainstorming groups, generation + selection phases | not extracted | nominal-group productivity advantage in generation does not guarantee good selection afterward; people favour feasible over original ideas when selecting | **still unread (gap-fill 2026-09-25): confirmed paywalled, no OA location via Unpaywall; not independently re-fetched.** The finding below is carried over from a WebSearch synthesis of the abstract (not verbatim, not independently confirmed this session — flag for a full read before grading): "The conclusion that nominal brainstorming groups outperform interactive brainstorming groups has been exclusively based on studies of idea generation. This study tested whether the productivity advantage of nominal groups would also result in better idea selection ... people prefer ideas that are feasible to those that are original [when selecting]." |
| Litchfield, R. C., "Brainstorming rules as assigned goals: Does brainstorming really improve idea quantity?" | 10.1007/s11031-008-9109-x | 2009 | experiment | tests classic brainstorming rules (including deferred judgement) through a goal-setting lens | not extracted | questions whether the classic rule set (of which deferred judgement is one) causally improves quantity beyond a simple goal-setting effect | **still unread (gap-fill 2026-09-25):** not independently fetched, no OA copy found; DOI/title/author/year verified via Crossref only. Directly relevant as a critical/mechanistic re-examination of the deferred-judgement rule; **flag for a full read before grading — this paper's title alone suggests boundary-condition evidence.** |
| Mullen, B., Johnson, C. & Salas, E., "Productivity Loss in Brainstorming Groups: A Meta-Analytic Integration" | 10.1207/s15324834basp1201_1 | 1991 | meta-analysis | meta-analysis, studies 1958-1990 | k studies (not extracted) | brainstorming groups significantly less productive than nominal groups, both quantity and quality | **quoted verbatim, fetched directly (Read tool, PDF page 1) — gap-fill 2026-09-25:** "This article reports the results of a meta-analytic integration of previous research on productivity loss in brainstorming groups. The following patterns were observed: Generally, brainstorming groups are significantly less productive than nominal groups, in terms of both quantity and quality. Stronger productivity loss was demonstrated in the context of (a) larger groups, (b) experimenter presence, (c) tape-recorded vocalization of contributions (vs. writing of contributions), and (d) in comparison to a nominal group of truly Alone individuals (vs. a nominal group of Together individuals)." **Correction: the previously-recorded "r = .57 / r = .56" effect-size quote does not appear in this paper's actual abstract** (confirmed by direct read) — it may be a results-section figure the earlier agent picked up via WebSearch synthesis rather than the abstract as labelled; downgrade confidence in that specific number until the results section is read directly. **Construct-fit caveat stands: this meta-analysis is about group-interaction productivity loss (production blocking), not directly about the deferred-judgement/diverge-converge manipulation. It is adjacent evidence at best — see note below.** |

### Replication
No Many Labs / RRR of deferred-judgement specifically was found. Diehl & Stroebe's (1987) "Productivity Loss in Brainstorming Groups: Toward the Solution of a Riddle" (DOI 10.1037/0022-3514.53.3.497, verified via Crossref) and Mullen et al. (1991, above) are frequently-replicated findings about production blocking in *group* brainstorming, which the field treats as well-established, but again this is a different construct from solo deferred judgement. **Gap-fill update (2026-09-25):** Diehl & Stroebe's abstract was fetched directly (read from the original PDF, page 1, via a source found through WebSearch and fetched with WebFetch/Read this session): "We conducted four experiments to investigate free riding, evaluation apprehension, and production blocking as explanations of the difference in brainstorming productivity typically observed between real and nominal groups... Finally, by manipulating blocking directly, we determined in Experiment 4 that production blocking accounted for most of the productivity loss of real brainstorming groups. The processes underlying production blocking are discussed, and a motivational interpretation of blocking is offered." This closes the gap the instructions flagged (Diehl & Stroebe's abstract was previously unfetched). It reinforces, rather than changes, the existing construct-fit caveat: this is strong, well-replicated evidence for production blocking in *group* brainstorming, not for solo deferred judgement, which this claim is actually about.

### Backfire evidence
Rietzschel, Nijstad & Stroebe (2006, above) is the most direct backfire-relevant source located: reaching a large quantity of ideas does not guarantee people can identify their best ones afterward, and selection tends to favour feasible over original ideas — i.e. quantity is "not enough." This matches the brief's own framing exactly.

**Note on brief accuracy:** the sourcing brief's suggested Synthesis leads — Mullen, Johnson & Salas (1991) and Diehl & Stroebe (1987) — are real, correctly cited papers, but they test *group vs. nominal (solo) brainstorming productivity*, not the *deferred-judgement/diverge-converge* manipulation that this claim is actually about (which is tested more directly in Osborn 1953's original instructions, Parnes & Meadow 1959, and Basadur et al. 1986). This looks like the brief conflating two related-but-distinct brainstorming literatures. Flagged for the grading agent: treat Mullen (1991) and Diehl & Stroebe (1987) as adjacent-transfer support at best, not as direct tests of judgement deferral.

### Grade
pending

### Adversarial pass
pending

---

## bad-ideas-criterion
**Claim:** Instructing people to generate deliberately bad ideas lowers self-censorship and yields more ideas, including some usable ones, than instructing them to generate good ideas.
**Construct:** lowered quality criterion; instruction effects in divergent thinking · **Used by:** ten-bad-ideas (LB)
**Load-bearing:** yes (spec expects C/D)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harrington, D. M., "Effects of explicit instructions to 'be creative' on the psychological meaning of divergent thinking test scores" | 10.1111/j.1467-6494.1975.tb00715.x | 1975 | experiment | classic explicit-instruction manipulation ("be creative" vs. standard instructions) | not extracted | "be creative" instructions changed the validity/meaning of DT scores, not tested with "be bad"/"be silly" wording | Abstract not independently fetched this session (blocked). DOI/title/author/year verified via Crossref only; **not used as a quoted finding for grading.** |
| Acar, S., Runco, M. A. & Park, H., "What should people be told when they take a divergent thinking test? A meta-analytic review of explicit instructions for divergent thinking" | 10.1037/aca0000256 | 2020 | meta-analysis | meta-analysis of explicit-instruction studies in DT testing | not extracted (abstract inaccessible) | synthesizes instruction-type effects (e.g., "be creative," "be fluent") on DT scores | Abstract not independently fetched this session (Semantic Scholar/PsycNet blocked). DOI/title/author/year verified via Crossref only — title exactly matches the brief's suggested synthesis lead. **Flag as the single most important source to re-read in full before grading; not used as a quoted finding this session.** |

### Replication
Searched explicitly (per the brief) for experiments using "bad," "worst," or "silly" instruction wording, both via Crossref bibliographic search and via the meta-analyses above. **None found.** The "worst possible idea" / reverse-brainstorming technique is documented as a practitioner technique (e.g., in creativity-training texts and blog literature) but no controlled experiment testing "generate bad ideas" vs. "generate good ideas" instructions, with idea-count or usable-idea outcomes, was located this session.

### Backfire evidence
No direct backfire evidence for "be bad" instructions was found (see Replication, above — the underlying manipulation itself is untested). The brief's proposed mechanism (lowering self-censorship via instruction) has a plausible relative — Harrington (1975) and Acar, Runco & Park (2020) show explicit instructions of any kind (including "be creative") do change divergent-thinking output and its psychometric meaning — but neither tests the specific "bad ideas" framing, and neither abstract was independently confirmed this session. On current evidence this claim rests on an **absence of direct tests**, which by itself supports the spec's own expectation of a C/D grade.

**Note on brief accuracy:** the brief's lead "Nusbaum, Silvia & Beaty 2014" could not be matched to a real paper. Crossref bibliographic search for this author combination and year returns only unrelated Nusbaum/Silvia/Beaty collaborations (e.g., a 2013 paper on verbal fluency and creativity, DOI 10.1016/j.intell.2013.05.004, and a 2014 book chapter on rumination and creativity, DOI 10.1017/cbo9781139128902.025) — none of which concerns explicit "be bad" instructions. Flagged as a likely wrong lead in claims.md.

### Grade
pending

### Adversarial pass
pending

---

## serial-order-effect
**Claim:** In a single idea-generation run, later ideas tend to be more original than earlier ones.
**Construct:** the serial order effect in divergent thinking · **Used by:** ten-bad-ideas (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Christensen, P. R., Guilford, J. P. & Wilson, R. C., "Relations of creative responses to working time and instructions" | 10.1037/h0045461 | 1957 | experiment | classic alternate-uses-style task, timed responses | not extracted | later responses in a timed run more original than earlier ones | Confirmed as MEDLINE-indexed (PMID 13406185) via PubMed efetch, but this 1957 record carries no abstract text (pre-abstract era for J. Exp. Psychol.). Title/author/year/DOI verified directly. **Not used as a quoted finding for grading — no fetchable text found this session.** |
| Beaty, R. E. & Silvia, P. J., "Why do ideas get more creative across time? An executive interpretation of the serial order effect in divergent thinking tasks" | 10.1037/a0029171 | 2012 | experiment | divergent-thinking task, time-course analysis, executive-function measures | not extracted | later ideas more original; effect linked to executive/strategic processes rather than pure memory retrieval | Abstract not independently fetched this session (Semantic Scholar returned no abstract; blocked elsewhere). DOI/title/author/year verified via Crossref only; **not used as a quoted finding for grading.** |
| Gilhooly, K. J., Fioratou, E., Anthony, S. H. & Wynn, V., "Divergent thinking: Strategies and executive involvement in generating novel uses for familiar objects" | 10.1111/j.2044-8295.2007.tb00467.x | 2007 | experiment | alternate-uses task with think-aloud/strategy coding | not extracted | early ideas drawn from memory retrieval; later ideas draw more on generative strategies | Abstract not independently fetched this session. DOI/title/author/year verified via Crossref only, and the paper's title matches the brief's description exactly ("early ideas come from memory, later ones from strategies"); **not used as a quoted finding for grading.** |

### Replication
Searched via Crossref bibliographic search for a large or pre-registered replication of the serial order effect; **none found this session.** The effect is treated as well-replicated in the divergent-thinking literature (it recurs across Christensen et al. 1957, Beaty & Silvia 2012, and Gilhooly et al. 2007 using different tasks and decades), but no single dedicated large-N or pre-registered replication study was located.

### Backfire evidence
The brief asks whether the effect needs enough time or fluency to reach later ideas, and whether a fixed count of ten (as in ten-bad-ideas) reaches the region where originality rises. No study located tests a fixed-count-of-ten paradigm directly; the cited studies use timed, open-ended generation, so **ten-bad-ideas's specific parameter (count = 10, not time-limited) is an extrapolation beyond the tested paradigm** — this is a genuine transfer gap worth flagging for the grading agent, consistent with claims.md's own "adjacent" transfer rating for this claim.

### Grade
pending

### Adversarial pass
pending

---

## constraint-relaxation
**Claim:** Impasses in problem solving are overcome when the solver relaxes a self-imposed constraint on the solution, so deliberately removing a constraint makes new solution paths available.
**Construct:** constraint relaxation (representational change); fixation / Einstellung · **Used by:** constraint-removal (LB), stimulus-die (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Knoblich, G., Ohlsson, S., Haider, H. & Rhenius, D., "Constraint relaxation and chunk decomposition in insight problem solving" | 10.1037/0278-7393.25.6.1534 | 1999 | experiment | matchstick-arithmetic insight problems, multiple experiments | not extracted | relaxing an implicit self-imposed constraint on the representation resolves the impasse | Abstract not independently fetched this session. Quoted secondarily via Thevenot & Oakhill (2008, DOI 10.1016/j.actpsy.2008.08.008, verified via Crossref+PubMed PMID 18834964), which paraphrases the theory directly: describes "Knoblich and colleagues' representational change theory," whose "main concepts, namely, constraint relaxation and chunk decomposition" explain insight problem solving (quoted verbatim from Thevenot & Oakhill's own abstract, fetched directly via PubMed). |
| Knoblich, G., Ohlsson, S. & Raney, G. E., "An eye movement study of insight problem solving" | 10.3758/bf03195762 | 2001 | experiment | matchstick-arithmetic problems, eye-tracking | 24 | eye-movement patterns consistent with representational-change predictions | "The representational change theory of insight claims that insight problems cause impasses because they mislead problem solvers into constructing inappropriate initial representations. Insight is attained when the initial representation is changed. In the present study (N = 24) ... The results were consistent with the predictions... only the representational change theory accounts for both the performance data and the eye movement data." (quoted verbatim, fetched directly via PubMed efetch, PMID 11820744) |
| Moreau, C. P. & Dahl, D. W., "Designing the Solution: The Impact of Constraints on Consumers' Creativity" | 10.1086/429597 | 2005 | experiment | consumer creative-design task under varying constraint levels | not extracted | moderate constraints *increased* output creativity relative to low or very high constraint | Abstract not independently fetched this session (Semantic Scholar/other sources blocked). DOI/title/author/year verified via Crossref only. Cited as the canonical **backfire** source (constraints can raise, not just lower, creativity) per the brief; **not used as a quoted finding for grading — flag for a full read.** |
| Acar, O. O., Tarakci, M. & van Knippenberg, D., "Creativity and Innovation Under Constraints: A Cross-Disciplinary Integrative Review" | 10.1177/0149206318805832 | 2019 | review | integrative review across strategic management, entrepreneurship, organizational behavior, marketing | n/a (review) | constraint effects on creativity are heterogeneous and mechanism-dependent, not uniformly negative | "Research in these fields has focused on various constraints that trigger distinct mediating mechanisms but is fragmented and yields conflicting findings. We develop a taxonomy of constraints and mediating mechanisms and provide an integrative synthesis that explains how constraints affect creativity and innovation." (quoted verbatim, fetched directly via Semantic Scholar API) |

### Replication
No Many Labs / RRR of constraint relaxation in insight problem solving was found. Knoblich et al.'s 1999 and 2001 findings are treated as a converging, internally-replicated program (same lab, same task family, matching predictions across behavioural and eye-tracking measures), which is stronger than a single study but weaker than an independent large-scale replication.

**Lead correction:** the brief's "Ohlsson 1992" (representational change theory) does not resolve to a Crossref DOI under any bibliographic search tried this session; the closest verified Ohlsson record is "Restructuring revisited" (1984, DOI 10.1111/j.1467-9450.1984.tb01005.x). Ohlsson's 1992 chapter ("Information-processing explanations of insight and related phenomena," in Keane & Gilhooly (eds.), *Advances in the Psychology of Thinking*) is very likely a real book chapter that simply predates reliable DOI assignment for edited-volume chapters; it is recorded in `unverified` rather than asserted with a DOI. Likewise Luchins (1942), the founding Einstellung study (*Psychological Monographs*), predates DOIs and is recorded unverified (type: theory/seminal).

### Backfire evidence
- Moreau & Dahl (2005, above): moderate constraints can *increase* consumer creative output — the opposing literature the brief explicitly asks about.
- Haught-Tromp, K., "The Green Eggs and Ham Hypothesis: How Constraints Facilitate Creativity," DOI 10.1037/aca0000061 (2017), verified via Crossref (abstract not independently fetched this session — Semantic Scholar returned "not found" for this DOI, and other fetches were blocked). Title alone is directly on-point for the "constraints help" backfire question; flagged for a full read before grading.
- Acar, Tarakci & van Knippenberg (2019, above): a systematic integrative review confirming the constraints-creativity relationship is genuinely mixed across disciplines and mechanisms, which under §6.2 tie-break 3/4 argues for caution rather than a high grade on either direction of the claim.
- The brief also asks whether ideas generated without the constraint are unrecoverable once it returns; no study located tests this directly (searched).

### Grade
pending

### Adversarial pass
pending

---

## incubation-effect
**Claim:** Setting a creative problem aside for a break, then returning to it, increases solutions or ideas compared with working on it continuously for the same total time.
**Construct:** the incubation effect · **Used by:** Incubation (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sio, U. N. & Ormerod, T. C., "Does incubation enhance problem solving? A meta-analytic review" | 10.1037/a0014212 | 2009 | meta-analysis | meta-analysis of incubation studies, moderator analysis | not extracted (many studies) | positive overall incubation effect; moderated by task type, cue presence, preparation/incubation length, and interim-task cognitive demand | "The authors identified a positive incubation effect, with divergent thinking tasks benefiting more than linguistic and visual insight tasks from incubation. Longer preparation periods gave a greater incubation effect, whereas filling an incubation period with high cognitive demand tasks gave a smaller incubation effect. Surprisingly, low cognitive demand tasks yielded a stronger incubation effect than did rest during an incubation period when solving linguistic insight problems." (quoted verbatim, fetched directly via PubMed efetch, PMID 19210055) |
| Baird, B., Smallwood, J., Mrazek, M. D., Kam, J. W., Franklin, M. S. & Schooler, J. W., "Inspired by distraction: Mind wandering facilitates creative incubation" | 10.1177/0956797612446024 | 2012 | experiment | Unusual Uses Task with demanding / undemanding / rest / no-break incubation conditions | not extracted | undemanding-task incubation produced substantial improvement over demanding task, rest, or no break | "Compared with engaging in a demanding task, rest, or no break, engaging in an undemanding task during an incubation period led to substantial improvements in performance on previously encountered problems ... associated with higher levels of mind wandering." (quoted verbatim, fetched directly via PubMed efetch, PMID 22941876) |
| Nieuwenstein, M., Wierenga, T., Morey, R. D., Wicherts, J. M., Blom, T. N., Wagenmakers, E.-J. & van Rijn, H., "On making the right choice: A meta-analysis and large-scale replication attempt of the unconscious thought advantage" | 10.1017/s1930297500003144 | 2015 | rrr | meta-analysis + large-scale pre-registered-style replication, N = 399 | 399 | no reliable evidence for the unconscious-thought advantage; prior positive reports confined to small, underpowered studies | "Consistent with the reliability account, the large-scale replication study yielded no evidence for the UTA, and the meta-analysis showed that previous reports of the UTA were confined to underpowered studies... we conclude that there exists no reliable support for the claim that a momentary diversion of thought leads to better decision making than a period of deliberation." (quoted verbatim, fetched directly via Semantic Scholar API) |
| Cai, D. J., Mednick, S. A., Harrison, E. M., Kanady, J. C. & Mednick, S. C., "REM, not incubation, improves creativity by priming associative networks" | 10.1073/pnas.0900271106 | 2009 | experiment | nap paradigm with quiet rest / non-REM / REM conditions, Remote Associates Test | not extracted | REM sleep specifically, not incubation/rest per se, drove the creative benefit | "Compared with quiet rest and non-REM sleep, REM enhanced the formation of associative networks and the integration of unassociated information." (quoted verbatim, fetched directly via PubMed efetch, PMID 19506253) — **the paper's own title argues the "incubation" framing is the wrong mechanism attribution; see Backfire below.** |

### Replication
Nieuwenstein et al. (2015, above) is a genuine large-scale, pre-registered-style replication attempt — but of the *unconscious-thought advantage* in decision-making (a related theoretical cousin of incubation, concerned with off-line, non-conscious processing benefits), not of creative-incubation problem solving directly. It found no reliable effect and traced prior positive reports to underpowered studies. This is directly relevant to accounts of incubation that invoke unconscious processing, and under §6.2 tie-break 1 it caps any claim resting specifically on an "unconscious thought" mechanism at C — but it does not by itself falsify the incubation-effect claim on divergent-thinking/insight tasks, which Sio & Ormerod's (2009) meta-analysis (a different, larger, and more directly on-topic body of evidence) still supports as positive.

### Backfire evidence
- Cai et al. (2009, above): directly challenges the "incubation" framing itself, arguing the benefit is attributable to REM sleep specifically rather than to time-away-from-the-problem generally — i.e., "incubation" may be a proxy for "getting some REM sleep during the break," not a general break-length effect. Important for grading Incubation's LB claim honestly.
- Nieuwenstein et al. (2015, above): failed large replication of the cousin "unconscious thought" mechanism.
- The brief also asks whether a break can cost momentum on convergent or well-structured problems; Sio & Ormerod's (2009) own moderator finding that divergent tasks benefit more than "linguistic and visual insight tasks" is suggestive but not a direct test of momentum loss on convergent tasks; no dedicated study of momentum loss was found.

### Grade
pending

### Adversarial pass
pending

---

## incubation-conditions *(parameter)*
**Claim:** Incubation benefits are larger (a) after a longer preparation period, (b) with longer breaks up to a point, and (c) when the break is filled with a low-demand activity rather than rest or a demanding task.
**Construct:** incubation moderators · **Used by:** Incubation (P)
**Load-bearing:** no (parameter)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sio, U. N. & Ormerod, T. C. (2009) (same meta-analysis as under `incubation-effect`) | 10.1037/a0014212 | 2009 | meta-analysis | moderator analysis within meta-analysis | — | longer preparation → larger effect; high cognitive demand during break → smaller effect; low-demand beat rest specifically for linguistic insight problems | Same quote as above: "Longer preparation periods gave a greater incubation effect, whereas filling an incubation period with high cognitive demand tasks gave a smaller incubation effect. Surprisingly, low cognitive demand tasks yielded a stronger incubation effect than did rest ... when solving linguistic insight problems." (quoted verbatim, fetched directly) |
| Baird et al. (2012) (same as under `incubation-effect`) | 10.1177/0956797612446024 | 2012 | experiment | 4-condition incubation-break manipulation | — | undemanding task > demanding task, rest, and no break | Same quote as above (quoted verbatim, fetched directly) |
| Ellwood, S., Pallier, G., Snyder, A. & Gallate, J., "The Incubation Effect: Hatching a Solution?" | 10.1080/10400410802633368 | 2009 | experiment | Idea Generation Test; break filled with a different task, a similar task, or continuous work | 90 | break-with-different-task > continuous work or same-task break | "Most important, results demonstrated that having a break during which one works on a completely different task is more beneficial for idea production than working on a similar task or generating ideas continuously. The advantage afforded by a break cannot be accounted for in terms of relief from functional fixedness or general fatigue." (quoted verbatim, read directly from the paper's PDF page 1, fetched this session) |

### Replication
No dedicated large or pre-registered replication of the specific moderator numbers (minimum break length, exact demand thresholds) was found. Sio & Ormerod's (2009) meta-analysis is itself the closest thing to convergent evidence, since it aggregates across many primary studies; no independent second meta-analysis was located to cross-check its moderator estimates.

### Backfire evidence
The brief asks what minimum break length the data actually supports, and whether the low-demand-vs-rest difference has replicated. Neither Sio & Ormerod (2009) nor Baird et al. (2012) nor Ellwood et al. (2009) reports a specific minimum break-length threshold in minutes that would justify a numeric parameter in the style guide directly; Sio & Ormerod's finding is comparative (longer preparation and appropriately-filled breaks help) rather than a fixed cutoff. **This is a genuine gap: no source in this session supports a specific minimum-break-length number.** The low-demand-vs-rest distinction is supported independently by two different research groups (Sio & Ormerod's meta-analytic moderator, and Baird et al.'s direct experimental manipulation), which is reasonably convergent, though not a formal replication of one specific study.

### Grade
pending

### Adversarial pass
pending

---

## sleep-insight
**Claim:** Sleeping between first exposure to a problem and a later retest increases the likelihood of discovering a hidden solution or rule, compared with an equal period awake.
**Construct:** sleep and insight (offline consolidation) · **Used by:** Incubation (LB per §8; spec expects C)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wagner, U., Gais, S., Haider, H., Verleger, R. & Born, J., "Sleep inspires insight" | 10.1038/nature02223 | 2004 | experiment | number-reduction task with hidden abstract rule; nocturnal sleep vs. nocturnal wake vs. daytime wake | not extracted | more than twice as many participants gained insight after sleep vs. wakefulness | "At subsequent retesting, more than twice as many subjects gained insight into the hidden rule after sleep as after wakefulness, regardless of time of day. Sleep did not enhance insight in the absence of initial training." (quoted verbatim, fetched directly via PubMed efetch, PMID 14737168) |
| Cai, D. J., Mednick, S. A., Harrison, E. M., Kanady, J. C. & Mednick, S. C. (2009) (same as under `incubation-effect`) | 10.1073/pnas.0900271106 | 2009 | experiment | nap paradigm; quiet rest vs. non-REM vs. REM, Remote Associates Test | not extracted | REM sleep specifically enhanced associative integration, not sleep/incubation generally | "This study shows that compared with quiet rest and non-REM sleep, REM enhances the integration of unassociated information for creative problem solving." (quoted verbatim, fetched directly via PubMed efetch, PMID 19506253) |
| Sio, U. N., Monaghan, P. & Ormerod, T., "Sleep on it, but only if it is difficult: Effects of sleep on problem solving" | 10.3758/s13421-012-0256-7 | 2013 | experiment | remote-associates problems varying in difficulty; sleep vs. wake vs. no-delay retest | not extracted | sleep group solved more *difficult* problems than other groups; no difference for easy problems | "The sleep group solved a greater number of difficult problems than did the other groups, but no difference was found for easy problems. We conclude that sleep facilitates problem solving, most likely via spreading activation, but this has its primary effect for harder problems." (quoted verbatim, fetched directly via PubMed efetch, PMID 23055117) |
| Lacaux, C., Andrillon, T., Bastoul, C., Idir, Y., Fonteix-Galet, A., Arnulf, I. & Oudiette, D., "Sleep onset is a creative sweet spot" | 10.1126/sciadv.abj5866 | 2021 | experiment | hidden-rule math problems; resting period with EEG-staged microsleep (N1) | 103 | ≥15s of N1 sleep tripled rule-discovery rate; effect vanished with deeper sleep | "Spending at least 15 s in N1 during a resting period tripled the chance to discover the hidden rule (83% versus 30% when participants remained awake), and this effect vanished if subjects reached deeper sleep." (quoted verbatim, fetched directly via PubMed efetch, PMID 34878849) |

### Replication
No large-N or pre-registered replication of Wagner et al. (2004) specifically was found this session (searched via Crossref bibliographic search for "Wagner" + "sleep" + "insight" + replication terms; none matched). However, the effect has been substantively extended and partially convergently supported by later, independent work using different paradigms and labs: Cai et al. (2009, REM-specific mechanism, RAT task), Sio, Monaghan & Ormerod (2013, difficulty-dependent boundary, RAT task), and Lacaux et al. (2021, N1 micro-sleep specificity, hidden-rule math task) — a converging-but-not-identical-replication picture rather than a clean RRR.

### Backfire evidence
- Sio, Monaghan & Ormerod (2013, above): the effect holds "only if it is difficult" — a clear boundary condition directly answering the brief's backfire question.
- Cai et al. (2009, above): the benefit is attributable to REM sleep specifically (not sleep or incubation generally), and its own title explicitly frames this as a correction to a generic "incubation" account.
- Lacaux et al. (2021, above): the benefit is further localized to light N1 sleep specifically, and "vanished if subjects reached deeper sleep" — a second, independent boundary condition (sleep stage matters, more sleep is not simply better).

Taken together, three independent groups each narrow the sleep-insight effect to a specific sleep stage or difficulty condition, which is a coherent (rather than contradictory) picture, but each boundary condition also means the effect is considerably narrower than the general claim as stated ("sleeping... increases the likelihood") — relevant to the spec's own expectation of a C grade here.

### Grade
pending

### Adversarial pass
pending

---

## walking-divergent
**Claim:** Walking, compared with sitting, increases divergent-thinking output during the walk and shortly after it.
**Construct:** walking / acute physical activity and divergent thinking · **Used by:** Incubation (LB per §8)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Oppezzo, M. & Schwartz, D. L., "Give your ideas some legs: The positive effect of walking on creative thinking" | 10.1037/a0036577 | 2014 | experiment | 4 experiments: seated vs. treadmill, indoor vs. outdoor walking, GAU (divergent) and CRA (convergent) tasks, residual-effect test | not extracted per-experiment | walking raised divergent output in ~81% of participants but only 23% on convergent task; residual boost after sitting down; outdoor walking best for novel analogies | "Walking increased 81% of participants' creativity on the GAU, but only increased 23% of participants' scores for the CRA... when seated after walking, participants exhibited a residual creative boost... Walking opens up the free flow of ideas." (quoted verbatim, fetched directly via PubMed efetch, PMID 24749966) |
| Frith, E., Ryu, S., Kang, M. & Loprinzi, P. D., "Systematic Review of the Proposed Associations between Physical Exercise and Creative Thinking" | 10.5964/ejop.v15i4.1773 | 2019 | review | systematic review, 13 studies (PubMed, Google Scholar, PsycInfo) | 13 studies | weak-to-modest support; high methodological risk of bias in most included studies | "Among the evaluated 13 studies, 92% indicated a beneficial relationship. However, 77% were vulnerable to moderate-high risk for methodological bias... There appears to be weak to modest support for acute, moderate-intensity exercise to benefit creativity... Too few studies were conducted on strong methodological foundations." (quoted verbatim, fetched directly via Semantic Scholar API) |

### Replication
No dedicated pre-registered replication of Oppezzo & Schwartz (2014) was found this session (searched). Frith et al.'s (2019) systematic review functions as the closest available synthesis check and reports the broader exercise-creativity literature as directionally supportive (92% of 13 reviewed studies) but methodologically weak (77% at moderate-high risk of bias) — under §6.2 tie-break 4 (high unexplained heterogeneity / low-rigor evidence base), this caps confidence below what a single strong experiment (Oppezzo & Schwartz) would suggest on its own.

### Backfire evidence
- Oppezzo & Schwartz (2014, above), in their own data: convergent thinking (CRA) did **not** reliably benefit from walking (only 23% of participants improved, versus 81% on the divergent GAU task) — this is the exact backfire the brief asks about, present within the seminal study itself, and it is why Incubation's converge half specifically avoids recommending walking during convergent work.
- The brief also asks whether the benefit decays quickly after the walk ends. Oppezzo & Schwartz's Experiment 2 found the opposite of quick decay: a "residual creative boost" persisted into a subsequent seated period — evidence against fast decay, at least over the timescale tested in that experiment (not independently extracted in minutes).

### Grade
pending

### Adversarial pass
pending

---

## time-pressure-divergent
**Claim:** Time pressure during idea generation reduces creative, divergent output.
**Construct:** time pressure and creativity (challenge vs. hindrance stressors) · **Used by:** Incubation (LB per §8), planning-self-regulation/timer (S)
**Load-bearing:** yes (spec expects C)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Byron, K., Khazanchi, S. & Nazarian, D., "The relationship between stressors and creativity: A meta-analysis examining competing theoretical models" | 10.1037/a0017868 | 2010 | meta-analysis | meta-analysis, 76 experimental studies / 82 independent samples | 82 samples (76 studies) | curvilinear (inverted-U) relation for evaluative stress; linear negative for uncontrollability | "We found a curvilinear relationship between evaluative stress and creativity such that low evaluative contexts increased creative performance over control conditions, whereas highly evaluative contexts decreased creative performance. We found a linearly negative relationship between uncontrollability and creativity ... The results suggest that stressors' effect on creativity is more complex than previously assumed." (quoted verbatim, fetched directly via PubMed efetch, PMID 20085417) |
| Baer, M. & Oldham, G. R., "The curvilinear relation between experienced creative time pressure and creativity: Moderating effects of openness to experience and support for creativity" | 10.1037/0021-9010.91.4.963 | 2006 | experiment | field study, 170 employees / 10 supervisors, manufacturing organization | 170 | inverted-U time-pressure–creativity relation, moderated by openness and workplace support | "Results showed an inverted U-shaped creative time pressure-creativity relation for employees who scored high on openness to experience while simultaneously receiving support for creativity." (quoted verbatim, fetched directly via PubMed efetch, PMID 16834519) |
| Amabile, T. M., Hadley, C. N. & Kramer, S. J., "Creativity Under the Gun" (Harvard Business Review) | — (no DOI resolves via Crossref) | 2002 | practice | diary-based field study reported in a practitioner magazine | not extracted | time pressure generally undermines creative thinking, with a possible short-lived exception ("time-pressure hangover") | **Unverified.** No Crossref DOI resolves for this HBR piece under any bibliographic search tried this session (consistent with the claims.md brief's own framing of this as "practice, diary"-type evidence). Not used for grading; recorded in `unverified`. |

### Replication
No Many Labs / RRR of time pressure and divergent thinking specifically was found. Byron, Khazanchi & Nazarian's (2010) meta-analysis of 76 experimental studies is the largest available synthesis and itself resolves prior "equivocal evidence" into a moderated (curvilinear) pattern rather than a simple negative one — which is the key finding for grading.

### Backfire evidence
- Baer & Oldham (2006, above) and Byron, Khazanchi & Nazarian (2010, above) **both independently report a curvilinear (inverted-U), not simply negative, relationship** between time/evaluative pressure and creativity — i.e., some pressure can help, especially for open, well-supported people, and only high pressure clearly hurts. This directly contradicts a flat "time pressure always reduces divergent output" reading of the claim, and is exactly the backfire the brief anticipates ("Is the relationship curvilinear, so that moderate pressure helps? That would contradict the style rule as currently written.") — it does. **The grading agent should treat the current claim wording ("time pressure... reduces... output") as an oversimplification of two independent, moderately-large, high-quality sources that both find an inverted-U instead.**
- Amabile, Hadley & Kramer's (2002) HBR piece (unverified, see above) is reported in secondary literature to have found a "time-pressure hangover" (creativity drops on high-pressure days and stays lower the following day even under lower pressure) but this could not be independently verified this session.

### Grade
pending

### Adversarial pass
pending

---

## Gap-fill log (2026-09-25)

- **deferred-judgement:** closed the named gap — fetched Diehl & Stroebe (1987)'s abstract directly (read from the original PDF page image), replacing the "abstract not fetched" placeholder with a verbatim quote. It confirms production blocking, not free-riding or evaluation apprehension, "accounted for most of the productivity loss of real brainstorming groups" — reinforcing, not changing, the existing construct-fit caveat (this is group-brainstorming evidence, not solo deferred-judgement evidence). Also fetched Mullen, Johnson & Salas (1991)'s actual abstract directly and found it does **not** contain the "r = .57 / r = .56" effect-size figures the batch had attributed to it via WebSearch synthesis — replaced with the verbatim abstract text and flagged the discrepancy for the grading pass; those specific numbers are not confirmed and should not be used until read from the results section. Parnes & Meadow (1959), Basadur et al. (1986), Rietzschel et al. (2006), and Litchfield (2009) remain **still unread**: no OA copies found this session; flags made uniform.
- **random-stimuli / conceptual-combination:** reattempted Sio, Kotovsky & Cagan (2015), Ward (1994), and Wilkenfeld & Ward (2001); all three remain paywalled with no OA location (confirmed via Unpaywall and direct publisher-page fetch attempts this session). Flags standardised to "still unread (gap-fill 2026-09-25)"; their previously-recorded findings remain unconfirmed WebSearch paraphrases, not used for grading beyond DOI-verified existence.
