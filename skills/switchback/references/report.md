# The read-back report

One message to the human, and the same text written to `W<n>.readback.md` next to the sidecar
(free-form: `readback-<yyyy-mm-dd>.md` next to the photos). The order is fixed because it is
the order the human needs it in: first whether to trust the read, then what they asked, then
what they told you about the pages, then what they thought, then what happens next.

## The shape

```
# W1 read-back: "<the cover question; for a proof, its title>" (<date>)

**Returned:** <pages, by ID>, as <n> photos (<format>).
**Not returned:** <pages the sidecar expected>; <pages that never return, not counted>.

**Photo test:**
- <what survived, page by page if it varies>
- <what did not: a sideways page, low light, a lighter ink read as pencil>
- <where you were tempted to over-read, and did not>

## Blue
1. <Q1 quoted> — <answer, or "research running: …">
2. …

## Page feedback
| Page | Note (quoted) | Still true in <cli version>? | Where it gets fixed |

## Content
<per page, in order: decisions (○), ideas, commitments, reds still open, ✕ kept visible;
 the human's words quoted where they carry weight>

## Action queue
<a proof only: the queue from action-queue.md, its quick actions done, then its closing line>

## Carry forward
- <open reds>
- <what the next round picks up; for a Series, the recall gaps; for a Ritual, the change>
- <the next step: another round, a hold, or the action queue>
```

**A free-form read** (a board, loose cards, no sidecar) keeps the same order with two changes:
the first line is `**Read:** <what: one board photo, three cards>, as <n> photos`, with no
"Not returned" line, and the page-feedback table appears only when a note is about a printed
page.

## A worked example

The example below is built from a real first read-back, with names removed. It shows the shape
and the level of detail; it is not evidence about any page's current wording, which comes from
`switchback show` and the sidecar.

From a first-round Sitting whose cover asked "What should this become next?", returned as
eight phone photos (HEIC under `.png` names), the cover and pages 2 and 4 to 9.

```
# W1 read-back: "What should this become next?" (2026-09-27)

**Returned:** P1, P2, P4–P9, as 8 HEIC photos.
**Not returned:** P3 (the die). It does not return, and the red note on P9 says
"nothing to photograph — dice page", so nothing is missing.

**Photo test:**
- Every handwritten line is legible at 1800 px; no tiles needed.
- The inks match the cover swatches: blue = Ask, red = Stop, orange = Maybe, highlighter = Crux.
- P5's confidence column holds "50%" on every row but one ("80%"), written as numbers, not
  dots. Reported as written; not read as a considered ranking.
- Two struck-out words on P2 are left struck out.

## Blue
1. "Does this exist?" (P6, beside the CLI idea) — research running; answer to follow.
2. "Is this just the marketplace?" (P6) — research running; answer to follow.
3. "Skill bloat cleanup" (P8) — a comment, not a question: noted as a candidate for the tool
   on P6, and carried forward.

## Page feedback
| Page | Note (quoted) | Still true in 0.1.0? | Where it gets fixed |
| --- | --- | --- | --- |
| P4 card-sort | "Columns are too small for index cards. Landscape?" | yes | landscape pages from 3 piles; `W_NARROW` warns past 3 |
| P4 card-sort | "Where do these cards come from?" | yes | `source` on the page, named by workbook mode |
| P5 assumption-audit | "This is not a good question" | no: the columns were renamed | done |
| P7 commit | "This can be phrased better" | no: replaced by the if-then plan | done |
| P8 question-queue | "The questions are bad" | no: the queue prints blank | done |
| P9 return-checklist | "Nothing to photograph — dice page" | no: only returning pages are listed | done |

## Content
**P2 (brain dump):** three threads recur: a small collection of printables, the read-back loop,
and "programmable stationery" (orange, twice). Recurrence is salience; nothing here is ranked.
**P4 (card sort), Keep pile:** …; **✕:** "a marketplace listing" (rejected, kept visible: the
reason given is "not mine to run").
**P5 (assumptions):** "people will print at all" ◐~ …
**P6 (pre-mortem):** the failure is reach, not the product: "no companion article", "explaining
the loop", and, quoted exactly, "tying it to the collection was the wrong move".
**P7 (commit):** ○ "a collection that produces and reads printed workbooks"; first move
written as an if-then.

## Carry forward
- Open reds: none on the problem; the page notes above go to the components.
- Blue 1 and 2 answered when the research returns.
- Next step: the commit stands; a Series is not needed. Offer a round 2 only if the research
  changes the picture.
```

Personal names, addresses and anything identifying stay out of the example and out of any
research brief; they may appear in the human's own `readback.md`, which stays in their folder.
