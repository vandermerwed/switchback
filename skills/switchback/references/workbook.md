# Workbook mode

Hand the work to the human on paper: a few pages they work through by hand, then photograph
back. If a page could be answered by reading it, it is a report, not a page.

## 1. Right tool?

- **The user asked for paper** ("workbook", "on paper", "print this out to think"): skip the offer.
- **The work is foggy, creative, decision-heavy, or has to be learned**: offer a workbook in one
  sentence and let them decline. Slowing down is never done to someone.
- **A factual question or a mechanical task** ("what's the capital of Portugal", "rename these
  files", "print my shopping list"): answer it, or decline the workbook, in one line. No workbook.
- **A document to check, edit or red-pen**: that is proof mode. Read [proof.md](proof.md) instead.

## 2. Choose the style from the job

| The job | Style | Shape |
| --- | --- | --- |
| decide, diagnose, plan | **Sitting** | one session; cover → 3–6 pages → commit → question-queue → return-checklist |
| remember something over weeks | **Series** | three rounds: round 2 about a day after round 1, round 3 about three days after round 2, and, if the deadline allows, a fourth about a week after that; each opens with a recall page |
| create, name, invent | **Incubation** | a generating half → `step-away` (a real break) → a judging half |
| come back to the same question weekly | **Ritual** | one page, `check-in` or `scoresheet`, identical every round |

Name the style and why in one line, in the confirmation. [styles.md](styles.md) has each style's
opening, closing, budget, cadence and a starting page set; read it before composing.

## 3. The kit

Run `switchback profile --json`.

- **A profile exists:** the `pens` block is the user's colour language. A role with `letter` has no
  pen and prints as a circled letter; say so in the confirmation.
- **`"profile": null`:** send one short message now: the minimum kit you will assume (A4, mono
  printer, a black pen, a highlighter, a phone camera), one batched question about the desk
  (printer and paper, pen colours, highlighter, scissors, index cards, sticky notes, timer), and
  that `/switchback desk` saves the answer for next time. Do not wait for the reply: keep
  composing with the stated assumptions. If the reply arrives before the confirmation, compose
  with it. If it arrives with or after the confirmation and changes the kit, re-send only the
  changed **Pens** line, and the page list only if a variant changed, then build on the user's
  yes. If it changes nothing, build. The desk the user described goes into the spec's `kit` (the
  same keys as a profile's kit: `paper`, `printer`, `pens: [{ "colour": "red" }]`, `highlighter`,
  `scissors`, `index_cards`, …), so the build maps their pens to roles and prints them in the
  legend strip.

## 4. Compose with the CLI

1. `switchback list --json --fits-kit` lists every component and preset the kit can use, with
   `kind`, `tags` and `phase`. Pick by the style's tags (decide, diagnose, plan, learn, create,
   reflect) and, for an Incubation, by `phase`.
2. `switchback show <id> --json` gives a component's `data` fields with their limits, its default
   `prompt`, its `physical.timebox` and its variants. Read it for every page you use; never guess a
   field.
3. **One move per page.** Prefer pages that move the body (sort, cut, place, walk) when the kit
   allows. Within the style's budget: the opening, three to six content pages, the closing.
4. **One sitting.** Add up the pages' `physical.timebox`. The total fits the profile's default
   sitting (40 minutes unless changed); more than ten minutes over means a page comes out. Cut pages that
   produce material before those that force a decision. An Incubation's halves each
   fit a sitting, with the break uncounted. A Series round is 20 to 40 minutes.
5. Pieces (`kind: piece`, such as `timer`, `tokens`, `zones`) sit on the table through the sitting;
   add one only when it does a job a page cannot.

The spec skeleton, with the keys a workbook uses. The `data` fields come from `show`; with no
profile, add the desk as `kit` (section 3).

```json
{
  "switchback": 1,
  "style": "sitting",
  "title": "Should I kill the sync feature?",
  "subtitle": "One question: is sync worth what it costs to keep?",
  "paper": "A4",
  "round": 1,
  "timebox": "40 min",
  "pages": [
    { "id": "W1-P1", "component": "cover",
      "data": { "question": "Is sync worth what it costs to keep?", "timebox": "40 min",
                "howto": ["Phone in another room.", "Work in ink, in the colours on this page.",
                          "When the time is up, stop mid-sentence.", "Photograph every page and send them back."] } },
    { "id": "W1-P2", "component": "brain-dump", "title": "Empty the tank",
      "prompt": "Everything you currently think about sync, before you sort any of it.",
      "data": { "minutes": 8 } },
    { "id": "W1-P3", "component": "card-sort", "variant": "write-in", "title": "What sync is for",
      "prompt": "Put each use of sync in the pile it belongs in, not the one you wish it did.",
      "data": { "source": "the uses you listed on W1-P2", "columns": ["Vital", "Nice", "Never used"] } },
    { "id": "W1-P4", "component": "commit",
      "prompt": "Decide. A hold is a real answer, but commit to a first move or it is a wish." },
    { "id": "W1-P5", "component": "question-queue" },
    { "id": "W1-P6", "component": "return-checklist" }
  ]
}
```

- Page ids are `W<round>-P<n>` in order. `paper` comes from the profile.
- `prompt` is the sentence printed under the page's title; you write it. `data` holds the
  component's own slots (`items`, `criteria`, `subject`), and `variant` is one of the ids `show`
  lists, or omitted to let the kit choose.
- `orientation` (`"portrait"` or `"landscape"`) is optional. Wide pages already print landscape
  (canvases, kanban, card sorts with 3 or more piles, options against criteria, timelines), so set
  it only to override the template.
- Material the sitting itself produces (the names from the first half, the survivors of a sort)
  is not in `data`: leave `items` or `options` out and name the `source`.
- `return-checklist` needs no `data`: the CLI lists the pages that come back.

## 5. Write the pages

Every page gets a `title` in plain words and a `prompt`: **one sentence that provokes**, written
for this user's problem. The rules, with examples, are in [writing-pages.md](writing-pages.md).
In short:

- **Never the answer.** No option is recommended, no conclusion appears, nothing on the page
  says what you think.
- **Name the source.** A page that works on material from another page names it: "the survivors
  from W1-P2", and card-sort's `data.source`.
- **Card sort:** 3 or more piles print on a landscape page. Index cards fit 3 piles; with 4 or 5,
  use the `write-in` variant. The CLI warns with `W_NARROW` if you get this wrong.
- **question-queue stays blank.** No `data.questions` unless the user gave you questions to print.
- **Plain words.** No term of art on a page unless the page explains it: not "diverge",
  "pre-mortem", "retrieval", "incubation".
- **Pens as the profile maps them.** A page says "your red pen" or "a circled P", from the `pens`
  block, never a colour the kit lacks. Some component defaults say "in purple": that is a page
  whose prompt you write yourself.
- **Diverge before converge.** In an Incubation, nothing that judges, ranks or scores before
  `step-away`, and no `timer` before it. The CLI refuses both.
- **Evidence only where it exists.** `switchback show` says whether a template is research-backed
  or practical. Cite grounding only for research-backed templates; a practical template makes no
  claim, so never imply one. If the user wants evidence-backed pages only, pick from
  `switchback list --basis research`.

## 6. Confirm once

One message, then wait for yes. It carries, in this order, and nothing else:

1. **Style:** the style and why, one line.
2. **Pages:** one line each, `W1-P2 Empty the tank: <the prompt>`, pieces included. A line
   that quotes a component's default prompt is a page you have not written yet; the cover and
   the closing pages are the only ones without a prompt of yours.
3. **Pens:** the roles with no pen (circled letters), any variant the kit forces (no scissors
   means write-in), and any page that will not come back.
4. **Time:** the timebox, and for a Series or Ritual, when the next round is due.
5. **Folder:** `switchback/<yyyy-mm-dd>-<slug>/`, in the user's working directory.
6. "Say yes and I'll build it, or change anything above."

No other question goes in it. Build only after the user says yes.

## 7. Build

1. Pick the round's file by the folder rules in SKILL.md: `W1.json` in a new folder, `W<n+1>.json`
   in an existing one.
2. Write the spec to it.
3. Validate and build it as SKILL.md says. Read the build's `substitutions` and `diagnostics`.

## 8. Hand over

One message, in this order:

1. **Where:** the PDF (or the HTML and the print steps) and the folder.
2. **Substitutions and warnings** from the build, in plain words: which pen does which job, which
   page changed variant and why.
3. **The sitting:** phone in another room; work in ink, in the colours on the cover; keep to the
   timebox and stop mid-sentence when it ends; cross-outs stay, nothing gets tidied.
4. **Coming back:** the last page lists what to photograph. Send the photos and they get read
   back. For a Series or Ritual, when the next round is due.

## 9. Rounds

- **Series:** three rounds. Round 2 is due about a day after round 1, round 3 about three days
  after round 2, and, if the deadline allows, a fourth about a week after that. Say the dates.
  Each round is 20 to 40 minutes, has its own spec (`W2.json`, `round: 2`, ids `W2-P<n>`), opens
  with a recall page, and targets the gaps a read recorded in the folder's `carry.md`.
- **Ritual:** weekly by default, 10 minutes or less, the same page each time. For a later round,
  copy `W1.json` to `W<n+1>.json`, set `round` to n+1 and renumber the ids; change nothing else,
  so change shows across returns.

## 10. Done when

A validated PDF (or HTML with print steps) is in the workbook folder, the confirmation was one
message, and the user knows how to print it and send the pages back.

## Common mistakes

| Mistake | Instead |
| --- | --- |
| Building first and describing the workbook afterwards | Section 6 is one message and a yes, then section 7 |
| Reading the CLI's source, registry or schema files to learn the format | The skeleton above, `switchback show`, and the `fix` line of every diagnostic |
| Pre-filling the question queue "to help" | Leave it blank; the questions are the human's |
| Your recommendation on the page or in the message | The page asks; your view waits for the photos |
| A Sitting with a break in it, or an Incubation without `step-away` | Choose the style for the job; the CLI enforces its shape |
| Guessing `data.shots` for the return checklist, or a timebox | Omit `shots`; sum the pages' timeboxes |
| Files in the working directory root | `switchback/<date>-<slug>/W1.json` and its outputs |
