# Read mode

The return half of the loop. The human worked on paper; their marks come back as photos. Read
their thinking without over-reading it, answer what they asked, and carry forward what they
could not resolve. **A guessed reading of someone's thinking is worse than a question.**

Everything you need is in the workbook folder and the CLI: the photos, the sidecar
(`W<n>.switchback.json`), `switchback media` and `switchback legend`. Nothing else on the machine
is yours to read for this: not the user's notes, memory or other projects.

## 1. Take stock

1. **The photos.** Paths the user gave, or the image files in the working directory. A pasted
   image lives in a temp path that can vanish: copy it into the workbook folder first.
2. **The sidecar.** Candidates are the `W<n>.switchback.json` files next to the photos and in the
   `switchback/*/` folders of the working directory. Match one to the photos: its `title` and
   `pages[].title` match what is printed on them; for a proof, `pages[0].data.blocks[0].text` matches
   the first printed text. When no candidate matches, or more than one does, ask in one line
   which workbook the photos are from and do not read on. A split proof is the one exception: its
   parts' sidecars (`W1-part1.switchback.json`, `W1-part2.switchback.json`, …) share a folder and
   every page prints "part N of M". Read the parts as one proof, match each photo to its part by
   that line and then to its page by ID, and write one read-back, `W1.readback.md`. The sidecar names every printed page,
   its `readback` rule, whether it `returns`, the `pens`, and the `cli` version that printed it.
3. **Normalise.** `switchback media <files…> -o <folder>/media --json`. Read every `out` file in
   its `media` list. When a photo has `tiles`, the handwriting is small: read the tiles too. WebP
   is refused: ask for a JPEG. For any other file it cannot read, follow the `fix` line of its
   diagnostic; a HEIC it cannot decode needs a JPEG, which an iPhone takes with Settings, Camera,
   Formats, Most Compatible.
4. **Identify each page by its printed ID** (the header, and the strip at the foot), never by
   file name or order. A page whose header reads sideways was shot in the wrong orientation;
   read it upright and say so.
5. **Completeness.** Expected pages are the sidecar's `returns: true` pages. Name any missing.
   A `returns: false` page (a timer dial, a die, the return checklist) is never missing, and
   a red note on the checklist saying a page had nothing to photograph settles it.
6. **Version.** If the sidecar's `cli` differs from `switchback --version`, page wording may have
   changed since printing; say so in the page-feedback table.

**No sidecar** (a board, loose cards, an old print): read free-form. `switchback legend --json`
gives the pen mapping; identify regions by position ("the top-left card"); say that this is a
free-form read. When a note is about a printed page, `switchback show <component> --json` gives
the page's current wording, which is how "still true?" gets answered without a sidecar.

## 2. Calibrate the inks

The cover's swatches, the boxes the human coloured with their own pens, are the ground truth
for which ink is which role. Read them before any page. Without the cover, calibrate from each
page's own instruction ("circle in your Keep pen") and from context. When a role has a `letter`
assignment, read an ink of that role's `suggested` colour from `switchback legend --json` as that
role, and say in the photo test that the mapping came from the suggested colours, not the user's
swatches. A stroke lighter than the rest may be pencil: treat it as Draft, provisional.

## 3. Read each page

Read in page order, each page under its sidecar `readback` rule. The rules for the marks are in
[reading-marks.md](reading-marks.md). Two kinds of mark share a page:

- **About the problem:** content, answered and carried forward.
- **About the page itself:** "columns too small", "this is not a good question", "nothing to
  photograph". These are product feedback. They go in their own table, mapped to the component,
  and are never answered as content or dropped.

## 4. Report, in this order

The shape and a worked example are in [report.md](report.md).

1. **The photo test:** what survived, what did not, and where you were tempted to over-read and
   did not.
2. **Blue, in number order.** Questions are answered; a blue question the human did not number
   is numbered by you, in the order it appears on the pages. Blue that is not a question is a
   comment, acknowledged and acted on.
3. **Page feedback,** as a table: page, the note quoted, still true in `switchback --version`?,
   where it gets fixed.
4. **The content:** decisions, ideas, commitments, reds still open, ✕ kept visible, quoting the
   human's words exactly where they carry weight.
5. **The next step:** another round, a hold, or the action queue.

## 5. Research

A blue question that needs sources rather than recall ("does this exist?", "is this just X?")
goes to a cheaper research subagent. Its brief states the question, what a good answer looks
like, and this line verbatim: **"Never send any email address, name or personal identifier to
any external service."** Tell the human it is running, and answer when it returns. Everything
else in the report does not wait for it.

## 6. Proof

For a proof (sidecar `style: "proof"`, or, with no sidecar, pages whose header reads "Proof" and
whose paragraphs are numbered ¶1, ¶2, …; then the printed text stands in for `blocks`), build
the action queue as [action-queue.md](action-queue.md) describes: one row per mark, in role
priority, each quoting its paragraph by `¶n` from the sidecar's `blocks`. A tick is "read, no
action". Quick actions (answer, and listing the edits, cuts and locks) happen at once; research
actions (challenge, go deeper, explore, justify, re-centre) wait for the human's "run all" or
"all except". ✕ and ○ are honoured in the next draft.

## 7. Record

Write it down before the chat forgets it:

- `W<n>.readback.md` next to the sidecar (free-form: `readback-<yyyy-mm-dd>.md` in the folder
  the user keeps the photos in), holding the report.
- `carry.md` in the folder, updated: open reds, answered blues, ✕ kept visible, what the next
  round picks up. For a Series, the recall gaps the next round targets. For a Ritual, the change
  since the last return.

## Guardrails

- **Blue first.** Being asked three questions and given nine opinions is noise.
- **Never tidy the marks.** You are a collaborator, not an editor.
- **Don't over-read.** An illegible word is a question. A struck-out word stays struck out.
- **Preserve disagreement.** A gut mark against the numbers is the finding, not an error.
- **Re-shoot, don't guess.** Ambiguous colour under bad light gets one re-shoot request.
- **Quote exactly** where the words carry weight; paraphrase is over-reading.

## Common mistakes

| Mistake | Instead |
| --- | --- |
| A tick read as ○ lock | A tick is read-and-fine; only ○ locks |
| Blue "does this exist?" filed as a to-do for the human | It is a question for you: research it, answer it |
| Asking what a red mark means | Propose the role's action (challenge) and wait for "run" |
| Reading the raw photos, then normalising | `switchback media` first; read its `out` and `tiles` |
| A missing die page reported as an error | `returns: false`, or the human's own note, settles it |
| Reading the user's notes or memory files for context | The folder, the sidecar and the CLI only |
| The read-back only in chat | `W<n>.readback.md` and `carry.md`, written |
