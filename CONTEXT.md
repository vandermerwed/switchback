# Glossary

The words the skills, the CLI and the docs use, with one meaning each.

- **Switchback:** the product: one agent skill, `/switchback`, and the `switchback` CLI behind it.
  Longhand was its working title.
- **Mode:** what `/switchback` is doing: **workbook** (make pages to think on), **proof** (print a
  document to mark up), **read** (read the photos back) or **desk** (save the user's kit). The
  skill picks the mode from the request; `/switchback <mode>` names it.
- **Component:** a printable `page` or `piece`. `switchback list` shows them; `switchback show <id>`
  gives one component's contract, data fields, variants and grounding.
- **Page:** a component filled in once: a single thinking move.
- **Piece:** a component that sits on the table through a sitting and is consulted or moved:
  a timer dial, tokens, zones, a scoresheet, a player aid.
- **Preset:** a named `data` configuration of a component (a SWOT is a preset of the two-by-two).
- **Variant:** one way a component can be made, chosen by the kit: a card sort is `cut-out` with
  scissors, `index-cards` with cards, `write-in` with neither.
- **Style:** the shape of a workbook over time: Sitting, Series, Incubation, Ritual, Proof. The
  CLI enforces each style's opening, closing, budget and phase rules.
- **Phase:** whether a page generates (`diverge`), judges (`converge`) or either. An Incubation
  keeps diverge pages before the break and converge pages after it.
- **Step-away:** the page that splits an Incubation: a real break, and the page that collects
  what surfaced during it.
- **Kit:** the stationery on the desk: paper, printer, pens and their colours, highlighter,
  pencil, scissors, tape, glue, sticky notes, index cards, coins, timer, wall space, camera.
- **Profile:** the user's saved kit and defaults (`switchback profile`), kept in the user's config
  directory. Desk mode writes it in one conversation.
- **Role:** a meaning in the colour language (Ask, Stop, Keep, Crux, Maybe, Sense, Draft,
  Reason), with a letter code, a priority, and on a proof an action. Pens are assigned to roles
  in priority order; a role without a pen is a circled letter.
- **Legend:** the colour language as printed: the roles, the structural marks (○ ✕ → ▭ ? !),
  the confidence marks (● + ◐ ~ ○ !) and the user's pen mapping. `switchback legend` prints it.
- **Spec:** the JSON a workbook is built from: style, title, paper, round, timebox, pages.
- **Workbook folder:** `switchback/<yyyy-mm-dd>-<slug>/` in the user's working directory, holding
  the spec (`W1.json`), the print (`W1.html`, `W1.pdf`), the sidecar, the prepared photos (`media/`), the read-back
  and `carry.md`.
- **Round:** one printed iteration of a workbook: W1, W2, … A Series has three rounds: round 2
  about a day after round 1, round 3 about three days after round 2, and, if the deadline allows,
  a fourth about a week after that; a round is 20 to 40 minutes. A Ritual has one a week.
- **Sidecar:** `W<n>.switchback.json`, written by `build`, recording exactly what was printed:
  every page, its readback rule, whether it returns, the pen mapping, the CLI version.
- **Returns:** whether a page comes back in the photos. A timer dial or a die does not; the
  return checklist lists only the pages that do.
- **Return checklist:** the last page of a workbook: what to photograph and how.
- **Question queue:** the page the human fills with numbered questions for the AI, in their Ask
  pen. It prints blank.
- **Read-back:** what read mode took from the photos, in a fixed order: the photo test, blue
  answers, page feedback, content, next step. Written to `W<n>.readback.md`.
- **Photo test:** the first section of a read-back: what survived the photo, what did not, and
  where the reader was tempted to over-read.
- **Page feedback:** a mark about the page itself ("columns too small") rather than the problem;
  routed to its own table and checked against the current component.
- **Carry:** `carry.md` in the workbook folder: open reds, answered blues, rejected items kept
  visible, what the next round picks up.
- **Action queue:** the confirmed list of actions derived from a proof's marks, one row per mark
  in role priority, quoting the paragraph by its number. Quick actions run at once; research
  actions wait for "run all".
- **Proof:** a document printed as numbered paragraphs with wide margins, for marking up. Long
  documents are split into parts.
- **Grade:** the evidence strength of a claim behind a component or style: A robust, B supported,
  C suggestive, D practice.
- **Transfer:** how directly a claim's evidence applies to paper work: direct, adjacent,
  analogical.
- **Grounding:** a component's or style's claims, with grades, sources and the conditions under
  which it helps or backfires. `switchback show <id>` prints it.
