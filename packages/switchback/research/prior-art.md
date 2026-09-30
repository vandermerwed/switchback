# Longhand prior-art review

**Status:** draft · **Date:** 2026-09-25 · **Agent:** Sonnet, prior-art step (research design §10)
**Feeds:** the docs site's `/explanation/prior art` page (sub-project 4).

For each item: what it is, its overlap with Longhand, what to borrow, how Longhand differs, and licence notes where relevant. Every factual claim below is cited to a URL read this session.

---

## inkloop

**What it is.** A local-first CLI (npm: `inkloop`, installed with `npm install --global inkloop` or run via `npx -y inkloop <html-file>`) for iterating on AI-generated HTML artifacts. It starts a local Node.js server (`node:http`, no framework) and prints a session URL. A human opens the rendered HTML in a browser, clicks elements or selects text to leave annotations (queuing several at once), and the agent retrieves them with `inkloop poll`, an HTTP long-poll bounded to about 30 seconds, returned in TOON format to cut agent-side token usage. The agent revises the HTML; live reload preserves scroll position and unsent drafts. The loop repeats until `inkloop end`. It ships content "stencils" for eight artifact types (plan, comparison, table, report, mockup, diagram, code, design baseline). MIT licence. Its own README states the purpose directly: "Agents write HTML now. inkloop is how you talk back to it – point at what's wrong, say why, done." (github.com/seemantshekhar43/inkloop). The npm registry page could not be fetched this session (HTTP 403); the GitHub README was read in full and is the primary source above.

**Overlap with Longhand.** This is the closest direct analogue in spirit: both exist because "an agent produces an artifact, a human marks it up, the agent reads the marks and revises" is a real, recurring loop that screenshots and prose don't serve well. Both are local-first CLIs, both avoid a hosted service, both are explicitly designed to be invoked by a human or by an agent shelling out to the same command.

**What to borrow.** The long-poll handshake (`poll` / `end`) is a clean, minimal session-lifecycle idea worth studying for `from-paper`'s eventual scripting surface. The "stencils" idea (typed artifact templates) is structurally similar to Longhand's `component.json` catalogue, though inkloop's stencils are content shapes for HTML, not printable moves.

**How Longhand differs.** inkloop's medium is the screen: a rendered HTML page, edited by clicking and typing, synced over HTTP in the same session. Longhand's medium is paper: the artifact is printed, worked by hand with a pen away from any screen, then read back from a photograph — there is no live connection during the working session, and the annotation vocabulary is a fixed colour language (green/red/blue/…) rather than free-form clicks and text. inkloop's stencils are about document *shape* (plan, table, diagram); Longhand's components are about cognitive *moves* (pre-mortem, feynman, card-sort), each graded for evidence of working. inkloop has no research/evidence layer, no styles, no kit/pen model, and no printing story at all — its README makes no mention of paper, printing, or handwriting (verified by reading the full README this session). It is a general-purpose review tool for any AI-produced HTML; Longhand is a specific claim that *paper, ink, and the body* do cognitive work a screen annotation cannot.

**Sources:** github.com/seemantshekhar43/inkloop (README, read in full via WebFetch this session).

---

## Rocketbook

**What it is.** A reusable, erasable notebook (dot-grid or ruled pages, wipeable pen) whose pages each carry seven small destination symbols along the bottom edge. In the companion app, the user maps up to seven cloud destinations (email, Google Drive, Evernote, Dropbox, OneNote, Trello, Slack, Box, Asana, Todoist, iCloud/iMessage, Google Photos, Nextcloud) to those seven symbols. After writing, the user marks one or more symbols with a pen; the app scans the page, recognises the marked symbols, and routes a high-resolution image of that page to the corresponding destination(s). An "Auto-Send" mode sends automatically once a page is scanned (getrocketbook.com/pages/how-rocketbook-works; rocketbookhelp.zendesk.com articles on destination marking and scan settings). The Fusion planner line adds seven page *templates* (monthly calendar, weekly planner, task list, OKR goal tracker, idea list, dot-grid, lined) that scan into structured digital forms — e.g. a marked task list becomes an interactive checklist in the app (medium.com/the-launch-pad, "Breaking Down All 7 Templates in the Rocketbook Fusion").

**Overlap with Longhand.** This is the clearest existing precedent for a **mark → action protocol**: a small, fixed vocabulary of marks made on paper, read by software, that route the page's content to different downstream handling. That is structurally the same shape as Longhand's colour language (a mark decides what happens to the ink next), just routing to a folder instead of to an interpretive action.

**What to borrow.** The destination symbols are deliberately few (seven), fixed in position on every page, and degrade gracefully (unmarked pages just aren't sent anywhere) — a good precedent for Longhand's own small, fixed, position-independent colour/letter vocabulary and its "unassigned roles print as a circled letter" fallback. The per-page bypass ("mark to skip destination selection") is a useful degrade-gracefully pattern.

**How Longhand differs.** Rocketbook's marks route a *whole page* to a storage destination; they do not carry semantic content and there is no reasoning at the far end — the endpoint is a folder or app, not an agent that interprets and acts on what was written. Longhand's colours mark individual passages within a page for different cognitive actions (challenge, go deeper, question, apply) that an AI agent then actually performs. Rocketbook has no evidence-graded component catalogue, no styles, and no notion of "the page asks, the human answers" — it is a capture-and-file tool, not a thinking-move library.

**Sources:** getrocketbook.com/pages/how-rocketbook-works; rocketbookhelp.zendesk.com ("How to Send to a Destination Without Marking Your Page"); medium.com/the-launch-pad ("Breaking Down All 7 Templates in the Rocketbook Fusion").

---

## reMarkable

**What it is.** An E Ink tablet line ("paper tablets") with a textured, low-latency matte display designed to feel like paper under a stylus. Handwriting can be converted to typed text on-device using a handwriting-recognition model licensed from MyScript; a Connect subscription adds handwriting search, cloud sync, and further AI tools, and users can write directly on imported PDFs (remarkable.com/products/remarkable-paper/pro/details/features; pocket-lint.com review of Paper Pro handwriting conversion).

**Overlap with Longhand.** Shares the premise that a paper-like writing surface produces a different, valued cognitive experience from typing, and that the handwritten result should still become machine-legible.

**What to borrow.** Nothing structural — reMarkable is a hardware/software product with no colour-language or mark-based protocol; its overlap is philosophical (paper-feel matters), not mechanical.

**How Longhand differs.** reMarkable digitises the writing surface itself; there is no physical paper, no printer, no pen ink, and no photograph step — the "capture" is native to the device. Longhand is deliberately the opposite: real paper, a real pen, a real photograph taken with an ordinary phone camera, explicitly because "the paper does real work" (cutting, placing, sorting, rolling) that a flat digital slate cannot replicate for several of its components (card-sort, stimulus-die, tokens). reMarkable has no evidence-graded thinking-move catalogue and no agent-driven composition of a bespoke document per problem.

**Sources:** remarkable.com/products/remarkable-paper/pro/details/features; pocket-lint.com, "The biggest problem with taking notes on the reMarkable Paper Pro is converting handwriting to text."

---

## Livescribe

**What it is.** A smartpen line built on Anoto's dot-positioning system (DPS): special paper is printed with a near-invisible microdot pattern; the pen's infrared camera reads the dots as it writes, so it always knows which page and exact position it is on, and streams the resulting "digital ink" to a companion app. The pen can additionally record audio in sync with strokes, so tapping a written word replays the audio from that moment (us.livescribe.com; livescribe.com "Introducing the Livescribe Smartpen"; en.wikipedia.org/wiki/Livescribe; en.wikipedia.org/wiki/Anoto).

**Overlap with Longhand.** Real paper, real pen, and a capture path back to software — the closest of the three capture products to Longhand's "ordinary pen on ordinary-feeling paper" premise, because the paper is genuinely just paper (printed with a dot pattern) rather than a screen.

**What to borrow.** The dot-pattern idea (paper that silently encodes its own page identity and every stroke's position) is a plausible future upgrade path for Longhand's page-ID system if higher-fidelity capture is ever wanted — though it requires a proprietary pen and pre-printed dot paper, which conflicts with the "any printer, any pen" floor.

**How Longhand differs.** Livescribe requires a special pen and Anoto dot-paper; a page cannot be printed on an arbitrary home printer and worked with an arbitrary pen, which breaks Longhand's D8/D9 "letter codes are the universal floor, a black-pen-only kit is a complete kit" commitment. Livescribe's read-back is raw handwriting plus audio, with no notion of colour-coded roles, evidence grading, or an agent that composes a bespoke multi-page document and interprets marks as actions.

**Sources:** us.livescribe.com; livescribe.com, "Introducing the Livescribe Smartpen"; en.wikipedia.org/wiki/Livescribe; en.wikipedia.org/wiki/Anoto.

---

## Proofreaders' marks (BS 5261-2; Chicago Manual of Style)

**What it is.** BS 5261-2:2005 ("Copy preparation and proof correction — Part 2: Specification for typographic requirements, marks for copy preparation and proof correction, proofing procedure") is the current British Standard superseding BS 5261-2:1976; it specifies textual and marginal marks for marking up copy and correcting proofs, and the proofing procedure between customer and typesetter (knowledge.bsigroup.com; standards.globalspec.com). The *Chicago Manual of Style* (18th edition) publishes its own, US-convention proofreaders' marks reference, distinguishing punctuation marks from operational marks for layout/content/spacing errors (chicagomanualofstyle.org/help-tools/proofreading-marks.html).

**Overlap with Longhand.** This is the century-old precedent for exactly Longhand's Proof style: a small, standardised vocabulary of marks made on a printed page, each mapping to one specific downstream action (delete, insert, transpose, query), read and acted on by a second party (historically a typesetter; for Longhand, an AI agent).

**What to borrow.** The core discipline — a fixed, small mark set, each mark meaning exactly one action, marks placed in the margin as well as in the text so they are easy to scan — is directly borrowed by Longhand's Proof style (numbered paragraphs, wide margins, a legend strip) and its `✕` = cut / `○` = lock structural marks.

**How Longhand differs.** Proofreaders' marks exist only to correct typeset copy (spelling, spacing, punctuation, layout); they carry no colour channel, no "priority" ordering, no confidence signal, and no concept of a reasoning action (challenge a claim, go deeper, ask a question) — Chicago's and BS 5261's marks are entirely mechanical corrections, not epistemic stances. Longhand's colour-to-action mapping (§6.1 of the umbrella design) reuses the same *mark → action* shape but extends it from typographic correction to argumentative and epistemic response, and the mapping is shared across every page in the collection rather than being specific to one proofing task.

**Sources:** knowledge.bsigroup.com (BS 5261-2 product page); standards.globalspec.com (BS 5261-2 summary); chicagomanualofstyle.org/help-tools/proofreading-marks.html.

---

## Bullet Journal (Ryder Carroll)

**What it is.** A handwritten organisational method whose core language is "rapid logging": short, categorised entries prefixed by bullets — a solid dot (•) for a task, a dash (–) for a note, an open circle (O) for an event — with an "x" marking a completed task and a "›" marking one migrated to another list. "Signifiers" are a second layer placed to the left of a bullet for extra context: an asterisk (*) for priority, an exclamation mark (!) for an idea (bulletjournal.com, "What is Rapid Logging?"; 101planners.com "Bullet Journal Key" guide).

**Overlap with Longhand.** A second precedent for a small, hand-drawn mark vocabulary layered onto free writing, used consistently across many pages so the writer (and, for Longhand, an AI reader) can scan quickly for what matters.

**What to borrow.** The signifier idea — a small mark placed beside an entry that doesn't replace the entry's content but adds a orthogonal layer of meaning ("this matters", "this is provisional") — is structurally close to Longhand's colour-as-second-channel principle (letters are the floor, colour is an accelerator).

**How Longhand differs.** Bullet Journal signifiers are self-directed: the same person writes and later re-reads their own bullets, with no second party (human or AI) decoding them, and no printed page — it is a blank-notebook practice, not a printed, agent-composed artifact. It has no evidence grading, no styles tied to research mechanisms, and no read-back protocol; the vocabulary exists purely for the writer's own future scanning.

**Sources:** bulletjournal.com/blogs/faq/what-is-rapid-logging-understand-rapid-logging-bullets-and-signifiers; 101planners.com/bullet-journal-key.

---

## Getting Things Done (David Allen)

**What it is.** A productivity methodology built around capturing everything into trusted external lists ("externalisation") and a recurring **Weekly Review**, which Allen calls "a critical factor for success." The canonical review has three phases — Get Clear (process all loose ends, including physical in-tray paper: business cards, receipts, meeting notes), Get Current (bring every list up to date), Get Creative (generate new ideas) — and is documented in Allen's own Weekly Review Checklist (gettingthingsdone.com/wp-content/uploads/2014/10/Weekly_Review_Checklist.pdf; todoist.com "The Weekly Review: A Productivity Ritual to Get More Done"; en.wikipedia.org/wiki/Getting_Things_Done).

**Overlap with Longhand.** The single strongest existing precedent for the *shape* of Longhand's Ritual style: a short, recurring, structured session whose entire point is to externalise what's in the head and reconcile it against what changed since last time.

**What to borrow.** GTD's insistence that the weekly review is what makes the rest of the system trustworthy — that capture alone is not enough without a scheduled return to it — supports Longhand's own design decision that Ritual is a recurring page, identical every time, precisely so change becomes visible across returns.

**How Longhand differs.** GTD is a comprehensive, indefinite life-organisation system covering every task and project a person has, with no evidence-grading of its own techniques and no single printed artifact — it is closer to a philosophy plus a set of list types than to a printable page. Longhand's Ritual is deliberately one page, bounded to about ten minutes, and Longhand explicitly declines to become a day-management system at all (per the roster's Gate 1b outcome 16): a one-day sheet for one sitting is in scope, but "zero white space" planning is not.

**Sources:** gettingthingsdone.com/wp-content/uploads/2014/10/Weekly_Review_Checklist.pdf; todoist.com/productivity-methods/weekly-review; en.wikipedia.org/wiki/Getting_Things_Done.

---

## Paper prototyping (Carolyn Snyder)

**What it is.** A usability-engineering practice, codified in Carolyn Snyder's 2003 book *Paper Prototyping: The Fast and Easy Way to Design and Refine User Interfaces* (Morgan Kaufmann), in which hand-drawn or cut-and-assembled paper mock-ups of a user interface are tested with real users before any software is built. Snyder, a usability consultant, wrote it as a practical how-to guide; roughly a third of the book covers the paper-prototyping technique itself, with the remainder serving as a general usability-testing reference (uxmatters.com book review; articles.centercentre.com interview with Snyder; shop.elsevier.com book listing).

**Overlap with Longhand.** The clearest existing articulation of "paper as a thinking/testing medium," and of the idea that a low-fidelity, disposable physical artifact surfaces problems that a polished one hides — a philosophical cousin of Longhand's "an unfinished workbook is a worked workbook."

**What to borrow.** Snyder's discipline of testing with a *person physically manipulating* paper pieces (moving cut-out menus, swapping screens by hand) is a precedent for Longhand's own components where "the paper does real work" (card-sort, stimulus-die, tokens) rather than merely displaying text to fill in.

**How Longhand differs.** Paper prototyping tests an *interface design* with a third-party user, is facilitated by a researcher in real time, and is disposable by design (thrown away once the design is validated) — it is a design-research method, not a personal thinking practice, and it has no read-back-by-AI step, no colour language, and no repeated/graded catalogue of techniques.

**Sources:** uxmatters.com/mt/archives/2006/05/book-review-paper-prototyping.php; articles.centercentre.com/snyder_interview; shop.elsevier.com/books/paper-prototyping/snyder/978-1-55860-870-2.

---

## Oblique Strategies; Liberating Structures; Strategyzer canvases

**Oblique Strategies.** A deck of "Over One Hundred Worthwhile Dilemmas" — printed cards, each bearing an ambiguous constraint or prompt — created by Brian Eno and Peter Schmidt and first published in 1975, intended to break creative block through oblique, lateral prompts (en.wikipedia.org/wiki/Oblique_Strategies). Longhand's `stimulus-die` (random operators rolled throughout a sitting) is a structural cousin: a small, physical, randomising prompt object used mid-work to interrupt fixation. Longhand differs by pairing the random prompt with a graded psychological mechanism (creativity-fixation family) and a specific page the response lands on, rather than a bare aphorism.

**Liberating Structures.** A named set of 33+ facilitation "microstructures" (10 core principles, 43 named structures, each with icons and step-by-step specifications) for group work, published by its authors under **Creative Commons CC BY-SA 4.0**, explicitly so that "every breakthrough stays open and available for everyone, forever" via the "LS Commons" (liberatingstructures.com/commons; liberatingstructures.com/faq-search). This licence precedent — share-alike, attribution required, free to reuse and adapt — is the same shape of obligation Longhand already applies to its two verified CC BY-SA 3.0 presets (see below), and confirms that "attribute, share-alike, no further restriction" is a normal, well-understood licence stance in this space.

**Strategyzer canvases.** The Business Model Canvas is licensed under **Creative Commons Attribution-Share Alike 3.0 Unported**; Strategyzer's own canvas PDF states this, and its usage-of-tools page requires "full identification and credit of the source of the tool … Strategyzer.com" for any use, with the canvas itself "open for building other approaches and variations" (assets.strategyzer.com/assets/resources/the-business-model-canvas.pdf; strategyzer.com/legal/usage-of-our-tools). This matches and confirms the licence finding already verified independently by the roster audit (`packages/longhand/research/roster.md` §4), which records the same CC BY-SA 3.0 Unported status for the BMC preset and a matching CC BY-SA 3.0 status for the Lean Canvas (Ash Maurya / LeanStack), and records that the Empathy Map (Dave Gray / XPLANE) carries **no verifiable redistributable licence** and was dropped on that basis. Longhand's presets differ from these canvases only in medium — they render Strategyzer's and Maurya's zone layouts as printable Longhand `zones` presets with a printed attribution-and-licence footer, per the roster's obligations list — not in content or claim to originality.

**Sources:** en.wikipedia.org/wiki/Oblique_Strategies; liberatingstructures.com/commons; liberatingstructures.com/faq-search; assets.strategyzer.com/assets/resources/the-business-model-canvas.pdf; strategyzer.com/legal/usage-of-our-tools; `packages/longhand/research/roster.md` §4 (already-verified BMC/Lean Canvas/Empathy Map licence findings, not re-verified here).

---

## BestSelf (Self Journal / Self Planner) and the CFAR Participant Handbook

These two sources are already mined in `research/mining/BestSelf.md` and `research/mining/CFAR.md`; per this task's scope, they are not re-mined here — only the differentiation is summarised.

**BestSelf.** A commercial planner line (undated Self Planner; the 13-week Self Journal) whose stated philosophy is maximalist and totalising: "zero-based scheduling," fill every white-space minute, track everything against a hard 13-week cycle, treat an unticked box as failure. Its mining file states this is "close to the opposite of Longhand's 'an unfinished workbook is a worked workbook.'" Its individual techniques (wheel-of-life domain rating, same-day duration forecasting, countdown tokens, a gratitude row) are mostly well-evidenced and several were independently admitted into Longhand's roster (as a `scoresheet` preset, a `forecast` variant, a `tokens` preset, and a `check-in` option) — but BestSelf's differentiator from Longhand is *scale and completeness* (a whole life, indefinitely, with no page left blank), not any one page-level move, which is precisely the axis Longhand's docs should draw the contrast on.

**CFAR Participant Handbook.** A workshop companion (Center for Applied Rationality, 2021 edition) documenting roughly 30 named "classes," each opening with a self-assigned epistemic status (Preliminary, Mixed, Anecdotally strong, Firm, Established) — an unusually honest graded-evidence posture the mining file notes "maps directly onto Longhand's own A–D grading." Several CFAR techniques were independently admitted or folded into the roster (Comfort Zone Expansion, Goal Factoring/Aversion Factoring, Frame-by-Frame Debugging, Mundanification, Saving State). CFAR's differentiator is that it is an in-person workshop curriculum explicitly not designed as a stand-alone guide ("this handbook is not designed to be a stand-alone guide") — it assumes a facilitator and a live cohort; Longhand is designed to work solo, cold, from a printed page with no facilitator present.

**Sources (as already cited in the mining files; not re-verified this session):** `research/mining/BestSelf.md`; `research/mining/CFAR.md`.

---

## Extras

### ellmos-ai/worksheet-generator

**What it is.** An open-source (MIT) Python tool for generating individualised worksheets for special-education teachers, speech/occupational therapists, and mainstream classroom teachers, from either an ICF-coded support goal and age/level, or a curriculum subject/grade/topic. It runs a three-stage pipeline — **generate** (structured JSON schema), **enrich** (a local LLM agent, e.g. Claude Code, populates exercise content against the JSON contract), **render** (output to Markdown/HTML/DOCX, print-ready) — and runs entirely offline with "zero mandatory external dependencies." Its own README states explicitly: "This module is a material generator, not a therapy program and not a guarantee of treatment success" (github.com/ellmos-ai/worksheet-generator).

**Overlap.** The closest thing found to Longhand's *generation* half: an LLM populating a structured, schema-validated worksheet template for print. Its "generate → enrich → render" pipeline is structurally close to Longhand's `build` pipeline (validate spec → resolve kit → render).

**What to borrow.** The explicit scope-limiting disclaimer pattern ("a material generator, not a X") is a good precedent for how Longhand's own docs should state what the collection is not (a day-management system, a diagnostic tool, a treatment).

**How Longhand differs.** There is, by the README's own account, **no feedback loop**: nothing is photographed or handwritten back into the system — it is "strictly a forward-facing material production tool." Longhand's entire premise is the return half of the loop (the human works it in ink, photographs it, the agent reads and acts on marks); this tool stops exactly where Longhand's `from-paper` begins.

**Sources:** github.com/ellmos-ai/worksheet-generator (README, read via WebFetch this session).

### Goodnotes AI ("Ask Goodnotes")

**What it is.** An AI feature inside the Goodnotes digital note-taking app that reads a user's notebook (typed or handwritten, including images), answers natural-language questions about it, produces summaries, explains hastily-scribbled past notes, and can generate quizzes. Users invoke it from a toolbar icon or by lassoing a selection (goodnotes.com/blog/ask-goodnotes; support.goodnotes.com "A guide to Goodnotes AI").

**Overlap.** A real product instance of "AI reads my handwriting and acts on it" — the read-back half of Longhand's loop, running today, at consumer scale.

**What to borrow.** Nothing structural; it confirms that AI handwriting comprehension for exactly this kind of use (explain what I wrote, work with it) is mature enough to build on.

**How Longhand differs.** Goodnotes' ink is native digital ink on a tablet, inside one continuous app session — there is no printing, no physical pen-on-paper, no photograph, and no colour-coded action vocabulary; the AI answers questions about notes, it doesn't execute a defined action queue derived from marks. Longhand's paper-first constraint, and the mark → action protocol, have no analogue here.

**Sources:** goodnotes.com/blog/ask-goodnotes; support.goodnotes.com/hc/en-us/articles/10779112528399-A-guide-to-Goodnotes-AI.

---

## Differentiation summary

- **Mark → action protocols exist and work at scale** (Rocketbook's destination symbols, BS 5261-2/Chicago's proofreaders' marks), but every existing one routes *where a page goes* or *what typographic fix to make* — none routes to a distinct set of *epistemic actions* (challenge, go deeper, ask, apply) the way Longhand's colour language does.
- **inkloop is the closest single product**, because it is the same loop (agent produces artifact → human marks it up → agent reads marks and revises) — but it lives entirely on-screen; Longhand's whole bet is that paper, ink, and the body do something a click-and-type annotation cannot, for at least some of its components (card-sort, stimulus-die, tokens).
- **Paper-to-digital capture products (Rocketbook, reMarkable, Livescribe) solve capture, not composition or evidence.** None of them composes a bespoke document per problem, and none grades its own techniques against research.
- **Rapid-logging and GTD supply precedent for the mark vocabulary and the recurring-review shape** (Bullet Journal signifiers, GTD's Weekly Review), but both are self-directed practices with no second reader (human or AI) and no printed, agent-composed artifact.
- **Licence precedent is consistent across the field:** Liberating Structures (CC BY-SA 4.0) and the Strategyzer Business Model Canvas / Lean Canvas (CC BY-SA 3.0) all use attribution-plus-share-alike, which is the same obligation Longhand's roster already applies to its two admitted canvas presets; the Empathy Map's unverifiable licence (dropped by the roster) shows the "verify from a primary source or drop" rule catching a real case.
- **No prior-art item combines all four of: printed paper, a fixed colour-coded mark vocabulary, an AI agent that composes the document up front and reads it back afterward, and public evidence grading of the techniques used.** Longhand's differentiation is the conjunction, not any single element.
- **The nearest generation-side tool (ellmos-ai/worksheet-generator) explicitly stops before the return trip** ("not... a feedback loop... strictly forward-facing"), and the nearest read-back product (Goodnotes AI) has no paper, print, or mark protocol at all — underscoring that the round trip itself, not either half alone, is what's missing from the field.
- **BestSelf and CFAR show the risk to watch, not a competitive threat:** both independently invented several mechanisms Longhand also wants (duration forecasting, goal-gradient tokens, graded epistemic status), which is good corroboration of Longhand's roster choices, but BestSelf's totalising day-management scope is the explicit line Longhand's docs must keep drawing against ("a one-day sheet for one sitting is fine; zero white space is not").
