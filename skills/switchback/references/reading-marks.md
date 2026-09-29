# Reading the marks

The meanings of the roles, structural marks and confidence marks come from `switchback legend
--json`; the user's own pen for each role is in the sidecar's `pens` (or the legend's
`assignment` when there is no sidecar). This file is how to read them off a photo.

## Calibrate first

- **The cover swatches are the ground truth.** The human coloured one box per role with the pen
  they used. Match every stroke on every page to those boxes, not to the colour names.
- **No cover in the batch:** calibrate from each page's own instruction ("circle in your Keep
  pen", "Ask pen, numbered") and from context, and say in the photo test that you did.
- **Off the workbook** (a board, loose cards): the same inks carry the same roles. Use the
  profile's pen mapping from the legend, and say the read is free-form.
- **Lighter strokes** than the rest of the page are probably pencil: Draft, provisional.
- **Photos are lossy.** Blue and purple, red and orange, can merge under warm light. When a
  role is ambiguous and the reading matters, ask for one re-shoot of that page.

## Roles

Colour is meaning; ignore aesthetics. Every mark carries one role:

| Role | Read it as | Then |
| --- | --- | --- |
| Ask | a numbered question or comment for the AI | answer in number order, before anything unasked |
| Stop | broken, risky, not understood; unresolved | never summarise as settled; carry it forward or advance it |
| Keep | evidence, confident, it worked | treat as the human's settled ground |
| Crux | the one thing that matters | the centre of gravity; engage with it directly |
| Maybe | an idea, a what-if | list it as theirs; never promote it to a decision |
| Sense | a gut feeling | attribute it to their intuition; never launder it into your conclusion |
| Draft | provisional | hold lightly; do not build on it |
| Reason | black; what they think | the content itself |

When a role's assignment is a `letter`, read an ink of that role's `suggested` colour in
`switchback legend --json` as that role: blue Ask, red Stop, green Keep, orange Maybe, purple
Sense and grey Draft. Say in the photo test that this mapping came from suggested colours, not
the user's swatches. A colour that is neither assigned nor suggested is quoted and asked about,
never given a role. The shape
of a stroke in a role's pen (an underline, a bracket, a squiggle beside a passage) does not
change the role: it marks *that passage* with it. Only the structural marks below add meaning.

## Structural marks (any ink)

| Mark | Meaning | Read it as |
| --- | --- | --- |
| ○ round an item | commit / choose this | a decision; in a proof, lock the paragraph |
| ✕ through an item | rejected, kept visible | name it in the read-back and say why it may still matter |
| → | leads to / causes | a causal claim of theirs |
| ▭ | this is a decision | a decision point |
| ? in the margin | revisit | open |
| ! in the margin | important | weight |
| ✓ a tick | read, nothing to add | no action; in a proof, "seen" |

## Confidence

`● +` high, `◐ ~` medium, `○ !` low, drawn beside a claim. Numbers written instead ("50%",
"80%") are read as the human wrote them and reported as such; they are not converted into
dots.

## Two kinds of mark on one page

| About the problem | About the page |
| --- | --- |
| "Users actually use it" ◐~ | "Columns are too small for index cards" |
| ✕ "Rewrite it (~1 month)" | "This is not a good question" |
| Q3 "Is this just the marketplace?" | "Nothing to photograph — dice page" |
| ○ "Freeze it" | "The questions are bad" |

The left column is content: answer, carry, report. The right column is product feedback: it
goes in the page-feedback table with the page ID and component, checked against the current
CLI version, and is never answered as if it were about the problem.

## Over-reading, and where it happens

- **Struck-out words.** They stay struck out. Do not recover them as intent.
- **A column of identical values** (every confidence "50%" but one): report the pattern; do not
  invent a reason for it.
- **An illegible word.** Quote what you can see, mark it "[illegible]", and ask. Do not fill it
  from context.
- **Paraphrase.** "Tying it to the collection was the wrong move" is not "the user wants to
  split the repo". Quote; let the human draw the conclusion.
- **A blank.** A blank question queue or an unfilled row is not an omission to explain. Report
  it as blank.

## Photos of the page, not the page

- **A sideways header.** The photo's EXIF was right for the camera, not for the page. Read it
  upright and note it in the photo test.
- **Small handwriting.** The downscaled whole image shows the layout; the `tiles` show the
  words. Read both.
- **A page that did not come back.** Missing only if the sidecar says it `returns`; otherwise
  it had nothing to photograph.
