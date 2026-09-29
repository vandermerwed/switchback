# Sourcing batch EE — externalisation-embodiment

Batch id: `EE`. Covers all 12 claims in `claims.md` §8 (`externalisation-embodiment.md`), including the contested collection-level handwriting-vs-typing claim. Grading and adversarial pass are left `pending` for other agents.

Note on process: this batch's WebSearch quota was exhausted partway through (a session-wide limit shared across concurrently running sourcing agents), after claims 8.1–8.8 and part of 8.9 were searched. From that point, DOI discovery and verification continued via direct Crossref bibliographic queries (`curl` against `api.crossref.org`), and quote-level detail was pursued via WebFetch where publishers allowed it. Where a source's abstract could not be fetched in this session (paywall, reCAPTCHA, or JS-only page), the source is still DOI-verified (title/first-author/year match against Crossref) but the "Finding" cell says so plainly instead of quoting from memory.

---

## unfulfilled-goal-offload
**Claim:** Writing down unfinished tasks and concerns, with at least a next step for each, reduces their intrusion into attention during later work. Listing them without any plan does not.
**Construct:** the cognitive effects of unfulfilled goals; offload by plan-making.
**Used by:** brain-dump (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Masicampo & Baumeister (2011) | 10.1037/a0024192 | 2011 | experiment | 5+ within-study experiments (reading task, lexical accessibility, anagram) | not stated in abstract | not reported as standardized effect size | "Unfulfilled goals persist in the mind... Unfinished goals caused intrusive thoughts during an unrelated reading task (Studies 1 and 5B), high mental accessibility of goal-related words (Studies 2 and 3), and poor performance on an unrelated anagram task (Study 4). Allowing participants to formulate specific plans for their unfulfilled goals eliminated the various activation and interference effects. Reduction of the effects was mediated by the earnestness of participants' plans." (full text fetched, PDF) |
| Ramirez & Beilock (2011), *Science* | 10.1126/science.1199427 | 2011 | experiment | 2 lab + 2 randomized field experiments; study 1 n=20 | not given as standardized d/g in the abstract | "The intervention, a brief expressive writing assignment that occurred immediately before taking an important test, significantly improved students' exam scores, especially for students habitually anxious about test taking. Simply writing about one's worries before a high-stakes exam can boost test scores." (abstract box, full text fetched) |
| Scullin, Krueger, Ballard, Pruett & Bliwise (2018) | 10.1037/xge0000374 | 2018 | experiment (polysomnography RCT) | n=57 healthy young adults | not independently confirmed (only press summary read) | Only a secondary press summary was read, not the abstract: "to-do list" condition fell asleep significantly faster than "completed activity list" condition; more specific to-do lists predicted faster sleep onset, the opposite pattern held for completed-activity lists. |

### Replication
No replication of Masicampo & Baumeister (2011) itself was found (searched directly); none found for Ramirez & Beilock either within this session's remaining budget. Not "none found (exhaustive)" — flag for a follow-up search if this claim needs an A grade.

### Backfire evidence
The Scullin et al. (2018) result is a partial complication for the claim's second sentence ("listing them without any plan does not [reduce intrusion]"): a bare to-do list (not a plan with a stated next step) still produced a measurable benefit — faster sleep onset — and the benefit scaled with how *specific* the list was, not with whether it contained plans. This is a different outcome measure (sleep onset latency vs. intrusive-thought/anagram interference) than Masicampo & Baumeister used, so it does not directly contradict their no-plan condition, but it does mean "bare listing has no effect" cannot be asserted as a general finding across outcomes. The original Masicampo & Baumeister no-plan condition itself is the source's own internal backfire: goal activation persisted in that condition, motivating the claim's plan-making requirement.

### Grade
pending

### Adversarial pass
pending

---

## free-listing-salience
**Claim:** When people freely list what they know or think about a domain, the items they list earlier and more often are the ones most salient to them.
**Construct:** free-listing salience (output order and frequency).
**Used by:** brain-dump (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bousfield & Barclay (1950) | 10.1037/h0059019 | 1950 | experiment | associative-response listing task | not stated | n/a | Foundational demonstration of the relationship between output order and frequency of restricted associative responses; read via secondary description only, not the original text. |
| Romney & D'Andrade (1964) | 10.1525/aa.1964.66.3.02a00870 | 1964 | theory/method (componential analysis) | kin-term elicitation | n/a | n/a | Early use of free-listing/sorting to surface a domain's cognitive structure (English kin terms); read via secondary description, not original text. |
| Smith (1993) | 10.1177/1525822x9300500301 | 1993 | practice (method) | methodological note | n/a | n/a | Defines the weighted free-list salience index, combining an item's frequency across lists and its mean rank position; read via secondary description. |
| Quinlan (2005) | 10.1177/1525822x05277460 | 2005 | practice (method) | fieldwork methodology (ethnobotany) | n/a | n/a | Practical guidance for collecting freelists in the field, underpinning the salience-index method; read via secondary description. |

### Replication
Not applicable in the RCT/meta-analysis sense — this is a methods literature, not an effect with replications to check. No large pre-registered test of "list-order predicts self-rated salience" specifically was found.

### Backfire evidence
Sousa, Soldati, Monteiro, Araújo & Albuquerque (2016), *PLOS ONE*, DOI 10.1371/journal.pone.0165838 (verified; abstract read via secondary source): "Individuals have a tendency to recall information about medicinal plants used during the preceding year and that the recalled plants were also the most important plants during this period." Read together with a broader critique surfaced in this session's search (unattributed synthesis, not itself a single verified citation): free-list salience indices are argued to conflate **accessibility/recency** with **importance** — items recalled first may simply be the most recently or frequently *encountered*, not the most important. This is directly relevant to brain-dump's read-back instruction ("recurrence is salience"): the read-back may be detecting rumination/recency rather than true priority. Flag as the claim's chief boundary condition.

### Grade
pending

### Adversarial pass
pending

---

## epistemic-action
**Claim:** Physically rearranging external objects to think, rather than to reach a physical goal, reduces the cognitive cost of a problem and improves or speeds its solution compared with manipulating the same elements mentally.
**Construct:** epistemic action; interactivity in problem solving.
**Used by:** card-sort (LB) · tokens (S) · playmat (S)
**Load-bearing:** yes (card-sort)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kirsh & Maglio (1994) | 10.1207/s15516709cog1804_1 | 1994 | theory + experiment | Tetris play analysis | n/a | n/a | "Certain cognitive and perceptual problems are more quickly, easily, and reliably solved by performing actions in the world rather than by performing computational actions in the head alone" — epistemic actions distinguished from pragmatic actions. (read via secondary description, not original text) |
| Vallée-Tourangeau, Steffensen, Vallée-Tourangeau & Sirota (2016), "Insight with hands and things," *Acta Psychologica* | 10.1016/j.actpsy.2016.08.006 | 2016 | experiment | between-subjects, physical pipe-cleaner manipulation vs. tablet/stylus sketching; n=50 | proportion solved | "41% of the participants in the pipe cleaners condition found a full or partial solution to the problem, while none of the participants in the tablet condition solved the problem." (read via secondary description) |
| Guthrie, Harris & Vallée-Tourangeau (2015) | 10.1515/slgr-2015-0019 | 2015 | experiment | mental-arithmetic task, low- vs. high-interactivity (movable tokens) conditions | n not confirmed | accuracy/efficiency comparison | "Accuracy and efficiency was greater in the high compared to the low interactivity condition. ... maths anxiety, objective numeracy, [and] working memory were stronger predictors of performance in the low- than in the high-interactivity conditions." (read via secondary description) |
| Clark & Chalmers (1998), "The Extended Mind" | 10.1093/analys/58.1.7 (Crossref currently resolves the alias DOI 10.1111/1467-8284.00096 to this) | 1998 | theory | philosophical argument (active externalism) | n/a | n/a | Theoretical grounding only; not an empirical test. |

### Replication
No dedicated replication search of the interactivity advantage was completed before the search budget ran out; the Guthrie et al. and Vallée-Tourangeau et al. lines of work are themselves a partial multi-study replication programme from the same lab group, which is a limitation (non-independent replications) worth flagging for the grading pass.

### Backfire evidence
Not independently searched this session (budget exhausted). The brief's own questions stand open: does manipulation cost time relative to mental solution, and are the benefits confined to problems with spatial/manipulable structure (as both cited studies used spatially structured tasks — Tetris, pipe-cleaner construction, token arithmetic)? Recommend a follow-up search specifically for a boundary/failure case before grading this A or B.

### Grade
pending

### Adversarial pass
pending

---

## sorting-elicitation
**Claim:** Having people sort items into their own groups reveals the categories and dimensions they actually use, including ones they cannot readily state.
**Construct:** card sorting as knowledge elicitation.
**Used by:** card-sort (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI / ISBN | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chi, Feltovich & Glaser (1981), "Categorization and Representation of Physics Problems by Experts and Novices" | 10.1207/s15516709cog0502_2 | 1981 | experiment | 4 experiments; sorting tasks + protocols | not stated | n/a | "Experts and novices begin their problem representations with specifiably different problem categories... unlike experts who categorize problems based on the physical principles involved in solving them, introductory students categorized problems involving inclined planes in one category and pulleys in a separate category." (read via secondary description) |
| Rugg & McGeorge (2005), "The sorting techniques: a tutorial paper on card sorts, picture sorts and item sorts" | 10.1111/j.1468-0394.2005.00300.x | 2005 | practice (tutorial) | method description | n/a | n/a | Describes repeated single-criterion card sorting as a technique for eliciting a person's own categories, distinct from repertory grids/laddering. |
| Coxon (1999), *Sorting Data: Collection and Analysis* | ISBN 0-8039-7237-7 (no DOI; book) | 1999 | practice | monograph | n/a | n/a | Standard methods reference for free-sorting data collection and analysis (multidimensional scaling, clustering). Not independently verified via DOI — recorded with ISBN as instructed. |

### Replication
Not applicable (methods literature). A direct search for "does card sorting elicit tacit categories better than interviews" returned no empirical head-to-head comparison; record as "none found (searched)."

### Backfire evidence
Brief's questions (printed column headings imposing categories, anchoring by the first sort, false tidiness) were not independently sourced this session; no study found either supporting or refuting them. Flag as untested.

### Grade
pending

### Adversarial pass
pending

---

## common-region
**Claim:** Items placed inside the same bounded region are perceived as belonging together, even against other grouping cues, so labelled zones make category membership readable at a glance.
**Construct:** the Gestalt principle of common region (perceptual grouping).
**Used by:** zones (LB, shared structural claim) · matrix-2x2 (S) · card-sort (S)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Palmer (1992), "Common region: A new principle of perceptual grouping," *Cognitive Psychology* | 10.1016/0010-0285(92)90014-s | 1992 | experiment | grouping-judgment experiments with simple shapes | not stated | n/a | "Common region produces clear powerful grouping effects, yet cannot be reduced to any other known grouping factor" — shown to be a stronger organizing cue than proximity alone. (read via secondary description) |
| Wagemans, Elder, Kubovy, Palmer, Peterson, Singh & von der Heydt (2012), "A century of Gestalt psychology in visual perception: I," *Psychological Bulletin* | 10.1037/a0029333 | 2012 | review | centennial synthesis of grouping/figure-ground literature | n/a | n/a | Confirms common region's status as a distinct, robust grouping principle within the broader Gestalt grouping literature. (read via secondary description) |
| Nielsen Norman Group, "The Principle of Common Region: Containers Create Groupings" | url: https://www.nngroup.com/articles/common-region/ | n/a | practice | applied UI guidance, not a controlled study | n/a | n/a | Practitioner application of common region to forms/layouts (background shading, borders); illustrates use, not new evidence. |

### Replication
Not applicable in the RCT sense; common region is a well-established perceptual-grouping effect with a long, converging literature (per Wagemans et al. 2012's synthesis), not a single-study effect awaiting a large replication.

### Backfire evidence
Not independently sourced this session beyond what the roster/brief already notes (items straddling a region border are ambiguous; region grouping can override meaningful proximity). No specific citation found or sought for this within the remaining budget.

### Grade
pending

### Adversarial pass
pending

---

## spatial-externalisation
**Claim:** Assigning categories to fixed places on a surface lets people keep track of and retrieve which items belong where with less effort than holding the categories in mind or in a list.
**Construct:** spatial externalisation; memory for location.
**Used by:** playmat (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Malone (1983), "How do people organize their desks?", *ACM TOIS* | 10.1145/357423.357430 | 1983 | practice/field study | interviews of office workers | not stated | n/a | "A very important function of desk organization is to remind the user of things to do, not just to help the user find desired information... The cognitive difficulty of categorizing information is an important factor in explaining how people organize their desks." (read via secondary description) |
| Andrews, Endert & North (2010), "Space to think," CHI '10 | 10.1145/1753326.1753336 | 2010 | qualitative/observational study | analysts using a large high-res display prototype | not stated | n/a | "Space supports human cognitive abilities in multiple ways... notes attached to monitors, papers spread out on desks, diagrams on whiteboards, and objects used to recall, reveal relationships, and think." (read via secondary description) |
| Twomey & Kroneisen (2021), meta-analysis of the method of loci | 10.1177/1747021821993457 | 2021 | meta-analysis | 13 RCTs | g = 0.65, 95% CI [0.45, 0.85], I² = 45.5% | Analogical evidence only (spatial-location mnemonic, not category-zone memory): "the effectiveness of the loci method as a mnemonic device... medium effect size... remained at similar levels [after] adjusting for publication bias." (read via secondary description) |
| Rothkopf (1971), "Incidental memory for location of information in text" | 10.1016/s0022-5371(71)80066-x | 1971 | experiment | incidental recall of text-location after reading a 3000-word passage | above-chance accuracy (no d/g given) | "Incidental memory for locations within any page and within the text sequence was more accurate than chance, and accuracy of substance and within-page location recall were correlated." (read via secondary description) |

### Replication
No large replication found for Malone (1983) or Andrews et al. (2010) (both observational/qualitative, not effect-size studies to replicate in the RRR sense). Twomey & Kroneisen (2021) is itself the large-N synthesis for the analogical method-of-loci evidence and reports the bias-corrected estimate held up.

### Backfire evidence
Brief's own question (mat freezes a premature taxonomy when categories aren't really distinct) was not independently sourced this session; carried over from the existing backfire text as unresolved.

### Grade
pending

### Adversarial pass
pending

---

## concept-mapping
**Claim:** Building a concept map, made of nodes joined by labelled links, improves understanding and retention compared with reading, listing or outlining the same material.
**Construct:** concept mapping.
**Used by:** node-map (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Nesbit & Adesope (2006), meta-analysis, *Review of Educational Research* | 10.3102/00346543076003413 | 2006 | meta-analysis | 67 effect sizes from 55 studies | n = 5,818; effect small to large depending on use/comparison | "The use of concept maps was associated with increased knowledge retention, with mean effect sizes varying from small to large depending on how concept maps were used and on the type of comparison treatment." (read via secondary description) |
| Schroeder, Nesbit, Anguiano & Adesope (2018), meta-analysis, *Educational Psychology Review* | 10.1007/s10648-017-9403-9 | 2018 | meta-analysis | 142 effect sizes | n = 11,814; g = 0.58 overall | "A random-effects model meta-analysis revealed that learning with concept and knowledge maps produced a moderate, statistically significant effect (g = 0.58, p < 0.001). Creating concept maps (g = 0.72) was associated with greater benefit... than studying concept maps (g = 0.43)." (read via secondary description) |
| Karpicke & Blunt (2011), *Science* | 10.1126/science.1199327 | 2011 | experiment | retrieval practice vs. elaborative concept mapping | not stated as d/g | "Practicing retrieval produces greater gains in meaningful learning than elaborative studying with concept mapping... the advantage of retrieval practice occurred even when the criterial test involved creating concept maps." (read via secondary description) — contrast evidence, not support |
| Lechuga, Ortega-Tudela & Gómez-Ariza (2015), *Learning and Instruction* | 10.1016/j.learninstruc.2015.08.002 | 2015 | experiment (conceptual replication) | free recall vs. concept mapping as retrieval formats | not stated | "Repeated retrieval leads to better conceptual learning than concept mapping, and... a short training in concept mapping does not change this pattern." (read via secondary description) |

### Replication
The meta-analyses (Nesbit & Adesope 2006; Schroeder et al. 2018) broadly agree that concept mapping beats passive study, but Karpicke & Blunt (2011) and its conceptual replication (Lechuga et al. 2015) show retrieval practice consistently beats concept mapping on the *comparisons node-map competes against in this collection* (§6.2 tie-break 3 relevant: two meta-analyses agree with each other but disagree in spirit with the Karpicke/Lechuga line, which used a different comparison condition — concept mapping vs. retrieval, not vs. passive reading).

### Backfire evidence
Not independently sourced this session for the "time cost" / "dense maps photograph poorly" / "vague link labels" questions in the brief; flagged as unresolved. The Karpicke & Blunt / Lechuga findings above are themselves the strongest backfire-adjacent evidence: concept mapping is reliably *worse* than retrieval practice specifically, even though it beats passive study.

### Grade
pending

### Adversarial pass
pending

---

## causal-diagramming
**Claim:** Drawing a diagram of the causal relations in a problem improves causal reasoning about it compared with reasoning from text alone.
**Construct:** learner-generated diagrams and drawing; causal mapping.
**Used by:** node-map (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fiorella & Zhang (2018), "Drawing Boundary Conditions for Learning by Drawing," *Educational Psychology Review* | 10.1007/s10648-018-9444-8 | 2018 | meta-analysis | drawing as a generative learning strategy | not stated in the summary read | "Self-generated drawings are an effective and valuable learning strategy... more effective than just reading or summarising [scientific text]," but "self-generated drawings do not always have a positive impact on learning outcomes" — boundary conditions apply. (read via secondary description) |
| Van Meter & Garner (2005), review, *Educational Psychology Review* | 10.1007/s10648-005-8136-3 | 2005 | review | literature review/synthesis of learner-generated drawing | n/a | n/a | Reviews applied and empirical literature on learner-generated drawing; finds a gap between prescriptive claims and research-based understanding. (read via secondary description) |
| Ainsworth, Prain & Tytler (2011), "Drawing to Learn in Science," *Science* | 10.1126/science.1204153 | 2011 | theory/perspective | argues for drawing as a core science-learning practice | n/a | n/a | Perspective piece on drawing (including causal/diagrammatic drawing) as integral to reasoning and learning in science, not itself a controlled experiment. |
| Easterday, Aleven & Scheines (2007), "'Tis Better to Construct than to Receive?", AIED 2007 proceedings | **unverified — no DOI located** | 2007 | experiment | text-only vs. pre-made diagram vs. self-constructed diagram tool; n=63 CMU students | not stated | Read via secondary description only: on an immediate transfer test, students given a *correct pre-made diagram* outperformed both other groups; when tested later with all aids removed, students who had *constructed* their own diagrams performed better than those who had only received one. This nuances the claim: constructing a diagram helps durable/transferable reasoning specifically, not immediate performance with the diagram in hand. |

### Replication
No dedicated replication search completed for this claim before time ran short; Fiorella & Zhang (2018) is itself a meta-analytic synthesis, which is the appropriate check for a single-study effect, but a large pre-registered replication check specific to *causal* (not general) diagramming was not performed.

### Backfire evidence
The brief's core worry — "can a drawn causal map feel like understanding without being accurate" (paralleling memory-retrieval/explanatory-depth) — was not independently sourced this session. The Easterday et al. (2007) construct-vs-receive contrast above is the closest evidence found and should be read into the grading pass.

### Unverified
- Easterday, Aleven & Scheines (2007): reason — conference proceedings paper (AIED 2007, IOS Press); no DOI could be located via Crossref bibliographic search or web search in this session. URL: https://oli.cmu.edu/wp-content/uploads/2012/05/Easterday_2007_Effects_of_Diagram_Tools.pdf

### Grade
pending

### Adversarial pass
pending

---

## colour-coding-search
**Claim:** Colour-coding items by category speeds finding the items of a target category and improves accuracy, compared with uncoded material, when the reader knows the code. The benefit falls as the number of colours grows.
**Construct:** colour coding in visual search.
**Used by:** colour-language protocol (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Christ (1975), "Review and Analysis of Color Coding Research for Visual Displays," *Human Factors* | 10.1177/001872087501700602 | 1975 | review | synthesis of prior color-coding experiments | n/a | n/a | Classic review establishing that color coding speeds visual search and identification when the code is small and known, with diminishing/negative returns as the number of codes grows; read via secondary description, original text not fetched. |
| Green & Anderson (1956), "Color coding in a visual search task" | 10.1037/h0047484 | 1956 | experiment | visual search task, coded vs. uncoded displays | not stated | n/a | Seminal demonstration that color coding speeds visual search; read via secondary description only. |
| Ponce, Mayer & Méndez (2022), meta-analysis of highlighting | 10.1007/s10648-021-09654-1 | 2022 | meta-analysis | learner-generated vs. instructor-provided highlighting | not stated in the summary read | n/a | Adjacent evidence (highlighting as a visual-marking device, not colour-category coding specifically); read via secondary description. |
| Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), "Improving Students' Learning With Effective Learning Techniques," *Psychological Science in the Public Interest* | 10.1177/1529100612453266 | 2013 | review | evaluation of 10 learning techniques including highlighting | n/a | n/a | Rates highlighting/underlining as **low utility** as a *learning* strategy — this is a different claim (durable learning) from the present one (visual-search speed), and the sourcing brief itself distinguishes them; recorded as a boundary/contrast case, not a direct contradiction. |

### Replication
Not applicable in the RRR sense for Christ (1975)/Green & Anderson (1956) — these summarize/demonstrate a well-replicated applied-psychology effect rather than a single contested finding.

### Backfire evidence
Dunlosky et al. (2013) is the clearest backfire-adjacent source: whatever colour coding does for *finding* things, it (and highlighting generally) does little for *learning* the material, which matters if colour-language's efficacy is ever oversold as a comprehension aid rather than a lookup aid. The brief's numeric question (do eight roles exceed reliably distinguishable colours) was not independently sourced this session.

### Grade
pending

### Adversarial pass
pending

---

## redundant-coding
**Claim:** Coding a category in two channels at once, colour plus letter or glyph, keeps it identifiable when one channel fails (colour-vision deficiency, poor light, a mono print or photo) and improves identification over colour alone.
**Construct:** redundant coding (redundancy gain); accessibility of colour use.
**Used by:** colour-language protocol (LB) · confidence-dots protocol (LB)
**Load-bearing:** yes

### Sources
| Cite | DOI / URL | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WCAG 2.1, Success Criterion 1.4.1 "Use of Color" | url: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html | 2018 (WCAG 2.1) | practice (standard) | n/a | n/a | n/a | Normative accessibility requirement: color must not be the only visual means of conveying information; a second channel (text, pattern, icon) is required. |
| Garner (1974), *The Processing of Information and Structure* | 10.4324/9781315802862 **(Crossref records this DOI under the 2014 Routledge reissue, not the 1974 original — cite as Garner 1974/2014 reissue)** | 1974 / 2014 (reissue) | theory | monograph | n/a | n/a | Foundational treatment of redundancy gain: redundant, correlated dimensions of a stimulus are processed faster/more accurately together than either alone; read via secondary description, original text not fetched. |
| Birch (2012), "Worldwide prevalence of red-green color deficiency," *JOSA A* | 10.1364/josaa.29.000313 | 2012 | review (prevalence data) | population survey synthesis | n/a | n/a | Establishes the base rate of red-green colour-vision deficiency (roughly 8% of males, <1% of females of Northern European descent — figure recalled from general knowledge of this literature, not independently re-confirmed by fetched text this session; treat as indicative pending a direct read). |

### Replication
Not applicable — WCAG is a standard, Garner is foundational theory, Birch is prevalence data, not a single contested experimental effect.

### Backfire evidence
Not independently sourced this session; the brief's questions (double coding costing writing time; letter fallback skipped once colour is available) remain open.

### Grade
pending

### Adversarial pass
pending

---

## handwriting-vs-typing *(collection level; contested)*
**Claim:** Writing by hand rather than typing improves conceptual understanding and recall of the material written.
**Construct:** longhand vs laptop note-taking; the encoding effects of handwriting.
**Used by:** collection level only (decision 1)
**Load-bearing:** no (per Lead ruling 1 — collection-level `grounding.json` key, not attached to any single item)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mueller & Oppenheimer (2014), "The Pen Is Mightier Than the Keyboard," *Psychological Science* | 10.1177/0956797614524581 | 2014 | experiment (seminal) | 3 studies, laptop vs. longhand lecture note-taking | not given as standardized d/g in abstract | **quoted verbatim, fetched directly (Europe PMC/PubMed, PMID 24760141) — gap-fill 2026-09-25:** "Taking notes on laptops rather than in longhand is increasingly common. Many researchers have suggested that laptop note taking is less effective than longhand note taking for learning. Prior studies have primarily focused on students' capacity for multitasking and distraction when using laptops. The present research suggests that even when laptops are used solely to take notes, they may still be impairing learning because their use results in shallower processing. In three studies, we found that students who took notes on laptops performed worse on conceptual questions than students who took notes longhand. We show that whereas taking more notes can be beneficial, laptop note takers' tendency to transcribe lectures verbatim rather than processing information and reframing it in their own words is detrimental to learning." A corrigendum was later issued for this paper — see below. |
| **Corrigendum** to Mueller & Oppenheimer (2014) | 10.1177/0956797618781773 | 2018 | correction | n/a | n/a | **still unread (gap-fill 2026-09-25):** citation verified only (Crossref); the corrigendum's text was not fetched this session (no OA copy located, SAGE paywalled). Flag for the grading pass to check what was corrected before treating the original effect size as reliable. |
| Morehead, Dunlosky & Rawson (2019), "How Much Mightier Is the Pen than the Keyboard for Note-Taking? A Replication and Extension of Mueller and Oppenheimer (2014)," *Educational Psychology Review* | 10.1007/s10648-019-09468-2 | 2019 | experiment (direct replication + extension) | 2 experiments + an internal meta-analysis of direct replications | small, nonsignificant effect favouring longhand (pooled) | **still unread (gap-fill 2026-09-25): paywalled, confirmed no OA location via Unpaywall.** DOI/title/authors/year verified via Crossref. A WebSearch-sourced paraphrase (not independently re-fetched, so not used as a graded quote) reads: "Some trends suggested longhand superiority; however, performance did not consistently differ between any groups (experiments 1 and 2), including a group who did not take notes (experiment 2)... A meta-analysis (combining direct replications) of test performance revealed small (nonsignificant) effects favoring longhand." If accurate, this is a **failed/attenuated direct replication** — relevant to tie-break 1 — but the grading agent should treat the quoted text above as unconfirmed until read from the primary source. |
| Urry, Crittle, Floerke et al. (2021), "Don't Ditch the Laptop Just Yet: A Direct Replication of Mueller and Oppenheimer's (2014) Study 1 Plus Mini Meta-Analyses Across Similar Studies," *Psychological Science* | 10.1177/0956797620965541 | 2021 | experiment (direct pre-registered-style replication of Study 1, n = 74 laptop / 68 longhand) + mini meta-analyses of 8 similar studies | direct replication: null on the quiz outcome | **quoted verbatim, fetched directly (Semantic Scholar API) — gap-fill 2026-09-25:** "In this direct replication of Mueller and Oppenheimer's (2014) Study 1, participants watched a lecture while taking notes with a laptop (n = 74) or longhand (n = 68). After a brief distraction and without the opportunity to study, they took a quiz. As in the original study, laptop participants took notes containing more words spoken verbatim by the lecturer and more words overall than did longhand participants. However, laptop participants did not perform better than longhand participants on the quiz. Exploratory meta-analyses of eight similar studies echoed this pattern. In addition, in both the original study and our replication, higher word count was associated with better quiz performance, and higher verbatim overlap was associated with worse quiz performance, but the latter finding was not robust in our replication. Overall, results do not support the idea that longhand note taking improves immediate learning via better encoding of information." This is a **direct, pre-registered-style replication of the seminal study itself (not merely a conceptual one), and it is null.** Per §6.2 tie-break 1, this caps the claim at **C**. |
| Voyer, Ronis & Byers (2022), systematic review + meta-analysis, *Contemporary Educational Psychology* | 10.1016/j.cedpsych.2021.102025 | 2022 (Crossref; Elsevier's online-first date is 2021-11-08) | meta-analysis | 77 effect sizes from 39 samples / 36 articles, multilevel meta-analysis with robust variance estimation | **null, per a WebSearch-sourced paraphrase (not independently re-fetched)** | **still unread (gap-fill 2026-09-25): paywalled, confirmed no OA location via Unpaywall.** DOI/title/authors verified via Crossref. Unconfirmed paraphrase: "Results showed no effect of method on performance under controlled conditions... when distractions from digital devices are controlled for, the choice between handwritten and typed notetaking does not significantly affect academic performance." If accurate, this is a **second failed/null large synthesis**, independently reinforcing Urry et al.'s null and Morehead et al.'s small/nonsignificant result — but treat as unconfirmed until the abstract itself is read. |
| Flanigan, Wheeler, Colliot, Lu & Kiewra (2024), meta-analysis, *Educational Psychology Review* | 10.1007/s10648-024-09914-w | 2024 | meta-analysis | 24 studies across 21 articles, college students | **g = 0.248, p < .001, favouring handwritten notes on achievement; g = 0.919, p < .001, favouring typed notes on note-taking volume** | **quoted verbatim, fetched directly (Georgia Southern University scholars profile page) — gap-fill 2026-09-25:** "Many college students prefer to type their lecture notes rather than write them by hand... Results from 24 separate studies across 21 articles revealed that taking and reviewing handwritten notes leads to higher achievement (Hedges' g = 0.248; p < 0.001), even though typing notes benefits note-taking volume (Hedges' g = 0.919; p < 0.001), among college students. Furthermore, our binomial effect size display shows that taking handwritten lecture notes is expected to produce higher course grades than typing notes among college students. We conclude that handwritten notes are more useful for studying and committing to memory than typed notes, ultimately contributing to higher achievement for college students." This is the most recent and largest meta-analysis found, and it reports a **small but positive, significant** pooled effect for handwriting — the opposite emphasis from Urry et al.'s null direct replication of the seminal study. The two do not strictly contradict (Flanigan pools mostly *conceptual* replications across a decade of studies; Urry is one direct replication of Study 1), but per §6.2 tie-break 3 (meta-analyses/large syntheses materially disagreeing) this keeps the claim capped at **B at best**, and tie-break 1 (Urry's failed direct replication of the seminal study) independently caps it at **C**. |
| Longcamp, Zerbato-Poudou & Velay (2005), *Acta Psychologica* | 10.1016/j.actpsy.2004.10.019 | 2005 | experiment | preschool children, handwriting vs. typing practice, letter recognition | not confirmed this session | **still unread (gap-fill 2026-09-25):** paywalled, no OA location found. Citation verified only. Adjacent transfer (letter learning in children, not adult problem-working). |
| Mangen, Anda, Oxborough & Brønnick (2015), "Handwriting versus keyboard writing: Effect on word recall," *Journal of Writing Research* | 10.17239/jowr-2015.07.02.1 | 2015 | experiment | handwriting vs. keyboard word-recall task | not confirmed this session | **still unread (gap-fill 2026-09-25):** citation verified only; not independently fetched this session (deprioritised — adjacent evidence, not central to the contested claim). |
| Van der Weel & van der Meer (2023 online / 2024 print), "Handwriting but not typewriting leads to widespread brain connectivity: a high-density EEG study with implications for the classroom," *Frontiers in Psychology* | 10.3389/fpsyg.2023.1219945 | **2024** (Crossref and Semantic Scholar both give 2024 as the citable year, despite the DOI's "2023" segment — the brief's instruction to "check the year" is confirmed correct: cite as 2024, not 2023) | experiment (high-density EEG, 256-channel) | n = 36 university students | connectivity difference only; no behavioural learning outcome measured | **quoted verbatim, fetched directly (Semantic Scholar API) — gap-fill 2026-09-25:** "Brain electrical activity was recorded in 36 university students as they were handwriting visually presented words using a digital pen and typewriting the words on a keyboard. Connectivity analyses were performed on EEG data recorded with a 256-channel sensor array. When writing by hand, brain connectivity patterns were far more elaborate than when typewriting on a keyboard, as shown by widespread theta/alpha connectivity coherence patterns between network hubs and nodes in parietal and central brain regions... Our findings suggest that the spatiotemporal pattern from visual and proprioceptive information obtained through the precisely controlled hand movements when using a pen, contribute extensively to the brain's connectivity patterns that promote learning." **Important for grading: this study measures EEG connectivity only — it reports no behavioural recall, comprehension, or conceptual-understanding outcome.** It cannot itself support the claim's stated outcome ("improves conceptual understanding and recall"); it is indirect, mechanistic, and contested evidence at best. **Author-order correction confirmed:** the sourcing brief's "van der Meer & van der Weel" is reversed; Crossref and Semantic Scholar agree the correct order is **Van der Weel & Van der Meer**. |

### Replication
**Gap-fill update (2026-09-25):** the crux replication evidence is now confirmed rather than inferred from titles. **Urry et al. (2021) is a direct, pre-registered-style replication of Mueller & Oppenheimer's own Study 1** (n = 74 laptop vs. 68 longhand) and its verbatim, fetched abstract states plainly: "laptop participants did not perform better than longhand participants on the quiz... results do not support the idea that longhand note taking improves immediate learning via better encoding of information." Under §6.2 tie-break 1 (a failed large replication, n at least twice the original — Mueller & Oppenheimer's Study 1 had n ≈ 65; Urry's n = 142 clears the bar), **this caps the claim at C, applied with confidence now, not merely flagged as likely.** Morehead et al. (2019) and Voyer et al. (2022) could not be independently fetched this session (paywalled, no OA copy per Unpaywall) but their WebSearch-derived paraphrases, if accurate, would reinforce the same null/small-and-inconsistent picture. Flanigan et al. (2024), the largest and most recent meta-analysis, reports a small but significant *positive* effect (g = 0.248) for handwriting on achievement — this sits in tension with Urry et al.'s direct-replication null (tie-break 3: materially disagreeing large syntheses/replications → at most B while the conflict is unresolved), but tie-break 1 already caps the claim lower, at C, because of the failed direct replication of the seminal study specifically.

### Backfire evidence
**Gap-fill update (2026-09-25):** Urry et al.'s fetched abstract directly answers the brief's mediator question: "in both the original study and our replication, higher word count was associated with better quiz performance, and higher verbatim overlap was associated with worse quiz performance, but the latter finding was not robust in our replication" — i.e., the word-count mediator (typing lets you write more, which helps) held up, but the verbatim-transcription-is-bad mediator that Mueller & Oppenheimer's theory depends on did **not** robustly replicate. This directly supports the brief's suspected backfire mechanism. Van der Weel & van der Meer (2024) is frequently cited in popular coverage as pro-handwriting neuroscience, but its own fetched abstract confirms it measured only EEG connectivity, not recall or comprehension — using it to support the behavioural claim would be a construct-fit error, and the grading/adversarial pass should flag this if it is cited as direct behavioural evidence. Taken together, this claim looks like a genuinely **contested, likely C-grade** case: one seminal study, a corrigendum, a direct pre-registered replication that is null on the primary outcome and only partially replicates the proposed mechanism, two meta-analyses that disagree with each other in direction/significance, and one oft-cited EEG study that does not measure the claimed outcome at all.

### Grade
pending

### Adversarial pass
pending

---

## embodied-perspective
**Claim:** Physically placing a figure at, or standing in, another party's position increases adoption of that party's perspective, compared with imagining it.
**Construct:** embodied (spatial) perspective-taking; chair work.
**Used by:** perspective-swap (S)
**Load-bearing:** no (supporting)

### Sources
| Cite | DOI | Year | Type | Design | n | Effect | Finding (quoted from abstract) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tversky & Hard (2009), "Embodied and disembodied cognition: Spatial perspective-taking," *Cognition* | 10.1016/j.cognition.2008.10.008 | 2009 | experiment | 2 studies; respondents describe spatial relations in photographed scenes, with/without a person present who could act on the objects | not given as standardized d/g in abstract | **quoted verbatim, fetched directly (Europe PMC) — gap-fill 2026-09-25:** "Although people can take spatial perspectives different from their own, it is widely assumed that egocentric perspectives are natural and have primacy. Two studies asked respondents to describe the spatial relations between two objects on a table in photographed scenes; in some versions, a person sitting behind the objects was either looking at or reaching for one of the objects. The mere presence of another person in a position to act on the objects induced a good proportion of respondents to describe the spatial relations from that person's point of view (Experiment 1). When the query about the spatial relations was phrased in terms of action, more respondents took the other's perspective than their own (Experiment 2). The implication of action elicits spontaneous spatial perspective-taking, seemingly in the service of understanding the other's actions." Note for grading: this tests the mere **presence** of another party inducing a spatial viewpoint shift — a reasonably close match to perspective-swap's "place a figure at their position" mechanic, closer than the brief's "analogical" rating implies. |
| Kessler & Thomson (2010), "The embodied nature of spatial perspective taking," *Cognition* | 10.1016/j.cognition.2009.08.015 | 2010 | experiment | 4 experiments contrasting embodied-transformation vs. sensorimotor-interference accounts | not given as standardized d/g in abstract | **quoted verbatim, fetched directly (Europe PMC) — gap-fill 2026-09-25:** "Humans are able to mentally adopt the spatial perspective of others and understand the world from their point of view. We propose that spatial perspective taking (SPT) could have developed from the physical alignment of perspectives... In a series of four experiments we found substantial evidence that the transformations during SPT comprise large parts of the body schema, which we did not observe for object rotation... Overall our results are much more in agreement with an 'embodied' transformation account than with the notion of sensorimotor interference." |
| Barsalou (2008), "Grounded Cognition," *Annual Review of Psychology* | 10.1146/annurev.psych.59.103006.093639 | 2008 | theory/review | n/a | n/a | Theoretical umbrella (grounded/embodied cognition); not itself a test of chair-work or perspective-swap specifically. |
| Paivio & Greenberg (1995), "Resolving 'unfinished business': Efficacy of experiential therapy using empty-chair dialogue," *Journal of Consulting and Clinical Psychology* | 10.1037/0022-006x.63.3.419 | 1995 | experiment (clinical RCT) | 34 clients, randomised: Gestalt empty-chair intervention vs. attention-placebo psychoeducation, followed to 1 year | large, sustained clinical gains vs. control (no single d/g given in abstract) | **quoted verbatim, fetched directly (PubMed efetch, PMID 7608354) — gap-fill 2026-09-25:** "In this study, 34 clients with unresolved feelings related to a significant other were randomly assigned to either experiential therapy using a Gestalt empty-chair dialogue intervention or an attention-placebo condition... Results indicated that experiential therapy achieved clinically meaningful gains for most clients and significantly greater improvement than the psychoeducational group on all outcome measures. Treatment gains for the experiential therapy group were maintained at follow-up." This is the actual empty-chair efficacy trial (clinical distress/resolution outcomes, n = 34, not a general social-perspective-accuracy test) — confirms the transfer rating of **analogical** is appropriate: the mechanism (dialogue with an empty chair standing in for another party) is real and clinically supported, but the outcome tested (resolving one's own unfinished emotional business) differs from perspective-swap's goal (understanding the other party's view). |
| Ranehill, Dreber, Johannesson, Leiberg, Sul & Weber (2015), "Assessing the robustness of power posing: no effect on hormones and risk tolerance in a large sample of men and women," *Psychological Science* | 10.1177/0956797614553946 | 2015 | experiment (large replication attempt) | not stated (brief report) | null (title states the result) | **still unread (gap-fill 2026-09-25): this paper appears to carry no indexed abstract at all** — confirmed via both Europe PMC and a direct PubMed `efetch` (PMID 25810452); PubMed's own record has no AB (abstract) field, consistent with this being a short "Registered Replication"-style brief report. The full title itself is a citable finding: "no effect on hormones and risk tolerance in a large sample of men and women." Sets the prior for skepticism about embodiment effects generally (does not itself test perspective-taking). |
| Wagenmakers et al. (2016), "Registered Replication Report" (facial feedback / Strack, Martin & Stepper 1988), *Perspectives on Psychological Science* | 10.1177/1745691616674458 | 2016 | RRR (17-lab, pre-registered, multi-site) | k = 17 independent replications | **original rating difference 0.82 (10-point Likert); replication meta-analytic estimate 0.03, 95% CI [−0.11, 0.16] — a near-total null** | **quoted verbatim, fetched directly (Semantic Scholar API) — gap-fill 2026-09-25:** "This seminal study of the facial feedback hypothesis has not been replicated directly. This Registered Replication Report describes the results of 17 independent direct replications of Study 1 from Strack et al. (1988)... The original Strack et al. (1988) study reported a rating difference of 0.82 units on a 10-point Likert scale. Our meta-analysis revealed a rating difference of 0.03 units with a 95% confidence interval ranging from −0.11 to 0.16." This is now a fully quantified, confirmed **failed large replication** of a high-profile embodiment effect, strengthening (with exact numbers) the cautionary prior the brief asked for. |

### Replication
**Gap-fill update (2026-09-25):** no large replication of spatial/chair-work perspective-taking specifically was found or fetched. The Ranehill (2015) and Wagenmakers (2016) citations remain **prior-setting** failed replications of *adjacent* embodiment effects (power posing, facial feedback) rather than direct tests of this claim — now confirmed with exact numbers for Wagenmakers (0.82 → 0.03, CI crossing zero) and confirmed (via two independent lookups) that Ranehill et al.'s paper has no abstract to quote beyond its own title. Tversky & Hard (2009) and Kessler & Thomson (2010) themselves are not single-study, unreplicated findings in isolation — they are two independent experimental programmes (different labs, different manipulations: mere-presence-in-a-photo vs. body-schema/eye-tracking) converging on the same embodied-perspective-taking conclusion, which is more reassuring than a single study, though still short of a dedicated large replication.

### Backfire evidence
The brief's question — can chair work become role-play theatre that produces sympathy without insight — was not independently sourced this session; carried over as unresolved from meeple's existing backfire text. **Gap-fill note (2026-09-25):** the base-rate caution the brief asked for is now on firmer footing: two of the three "adjacent" embodiment effects checked in this family (power posing, facial feedback) are now *confirmed* null/near-null in large replications with exact effect sizes, not just "reported to fail" — this should weigh on the adversarial pass when it decides how much prior skepticism to apply to Tversky & Hard / Kessler & Thomson, which themselves have not been large-replicated.

### Grade
pending

### Adversarial pass
pending

---

## Gap-fill log (2026-09-25)

- **handwriting-vs-typing:** fetched verbatim abstracts for Mueller & Oppenheimer (2014), Urry et al. (2021), Flanigan et al. (2024), and Van der Weel & van der Meer (2024). Confirmed via Crossref that the EEG paper's citable year is **2024**, not 2023 (brief's "check the year" instruction resolved). Confirmed the direct-replication finding: Urry et al.'s pre-registered replication of Mueller & Oppenheimer's Study 1 is **null** on the quiz outcome, which — per §6.2 tie-break 1 — now confidently caps this claim at **C**. Also found Flanigan et al.'s 2024 meta-analysis reports a small, significant, *positive* effect for handwriting (g = 0.248) on achievement, in tension with Urry's null (tie-break 3 also applies). Found that Van der Weel & van der Meer (2024) measures EEG connectivity only, no behavioural recall/comprehension outcome — flagged as a construct-fit problem if cited as direct support. Morehead et al. (2019) and Voyer et al. (2022) remain **still unread**: both paywalled with no OA location (confirmed via Unpaywall); only WebSearch-derived paraphrases are recorded, explicitly flagged as unconfirmed. Mangen et al. (2015) and Longcamp et al. (2005) remain unread (deprioritised, adjacent evidence). **This claim's likely grade has moved from "flagged as very likely C" to confidently C**, on the strength of the now-verified direct replication.
- **embodied-perspective:** fetched verbatim abstracts for Tversky & Hard (2009), Kessler & Thomson (2010), Paivio & Greenberg (1995, n = 34 clinical RCT), and Wagenmakers et al.'s 2016 RRR (now with exact numbers: original 0.82 vs. replicated 0.03, 95% CI [−0.11, 0.16]). Confirmed Ranehill et al. (2015) is a brief report with **no abstract at all** in PubMed/Europe PMC (checked twice) — not a case of paywalling, but of no indexed abstract to quote. Tversky & Hard's actual finding (mere presence of another person induces a spatial-perspective shift) is a closer match to perspective-swap's mechanic than the existing "analogical" framing suggested; flagged for the grading pass to consider.
