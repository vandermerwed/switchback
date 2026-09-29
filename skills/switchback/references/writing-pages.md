# Writing the pages

A page is a `title`, a `prompt` and the `data` its component needs. The prompt is one sentence
that provokes. The data is scaffolding the human works on: options to score, assumptions to
test, words to collide. Nothing on the page is your answer.

These rules came from reading the first workbook back, page by page, with the person who filled
it in.

## Never the answer

The page asks; the human answers. Your view waits until the photos come back.

| Bad | Good |
| --- | --- |
| commit prompt: "Kill it. The numbers say so; commit to a shutdown date." | commit prompt: "Decide. A hold is a real answer, but commit to a first move or it is a wish." |
| `options` with one option in bold, or listed first with "(recommended)" | the options in the order the user gave them, or alphabetical |
| cover `howto`: "By the end you'll see that the sync feature isn't worth it." | cover `howto`: "Score your gut before you look at the criteria." |

## Name the source

A page that works on material from another page names that page. The reader asked "where do
these cards come from?" and nothing on the page said.

| Bad | Good |
| --- | --- |
| card-sort with `"items": []` and no `source` | card-sort with `"source": "the names from W1-P2 to W1-P4"` and `"items": []` |
| options-criteria prompt: "Score the survivors." | options-criteria prompt: "Score the survivors of the sort on W1-P6." |

Material the user gave you in the conversation is your source too: "the 12 ideas you listed"
is fine in `source`.

## Card sort on portrait paper

Index cards are about 76 mm wide; three columns on portrait A4 or Letter leave about 60 mm each,
and the reader wrote "columns are too small for index cards" on the page.

- With scissors and the `items` known when you compose: `"variant": "cut-out"`, any number of
  piles; the cards print on the page and the user cuts them apart.
- With index cards and two piles: `"variant": "index-cards"`, two `columns`.
- With three or more piles and no scissors, or when the items are produced during the sitting:
  `"variant": "write-in"`, and the piles are columns to write into.
- Or omit `variant` and let the CLI pick from the kit. It warns with `W_NARROW` for three or
  more index-card columns on portrait paper. Do what its `fix` says.

## The question queue stays blank

The reader wrote "the questions are bad" beside three questions the AI had printed for them. The
questions are the human's, written with their Ask pen after the sitting.

| Bad | Good |
| --- | --- |
| `{ "id": "W1-P7", "component": "question-queue", "data": { "questions": ["What is the cheapest way to test…", "…"] } }` | `{ "id": "W1-P7", "component": "question-queue" }` |

The one exception: the user gave you questions to print. Then print those, and only those.

## Plain words

Every printed sentence must make sense to someone who has read none of the research. The reader
asked "what does 'over-reading' mean?" A term of art may appear only when the page explains it.

| Bad | Good |
| --- | --- |
| "Diverge first; converge after the break." | "First half: make as many as you can, judge nothing. After the break: choose." |
| "Pre-mortem the two live paths." | "It is six months later and this went badly. Write what happened." |
| "Retrieval before review." | "Close the notes. Write everything you remember first." |
| "Score each assumption's confidence." | "How sure are you? Mark each line ●+ sure, ◐~ probably, ○! guessing." |

Component names (`pre-mortem`, `free-recall`) are ids for the spec, not titles for the page.
Give each page a `title` in the user's words: "It is six months later", "What do you remember?".

Pens are named as the profile maps them. "Gut score with your purple pen" is right when `pens`
says sense is purple; on a black-and-red desk it is "gut score first, marked with a circled P".
A component's default prompt may name a colour; the prompt you write names the user's pen.

## One provoking sentence per page

The prompt is one sentence, about this user's problem, that makes the pen move. The component's
default prompt is generic; replace it.

| Bad | Good |
| --- | --- |
| no `prompt` (the component's default prints: "Everything currently in my head about this:") | "Everything you currently think about sync, before you sort any of it." |
| "Please consider the various options available to you and evaluate each one carefully against the criteria, noting your reasoning." | "Gut score first. Then score each path against what it really costs you." |
| a prompt with two questions in it | the second question is a second page, or is cut |

## Diverge before converge

In an Incubation, the first half generates and the second half judges, and a real break sits
between them. A page that ranks, scores, sorts or commits belongs after `step-away`; a `timer`
never goes before it (time pressure reduces what people generate).

| Bad | Good |
| --- | --- |
| cover → ten-bad-ideas → card-sort → step-away → commit | cover → brain-dump → ten-bad-ideas → forced-connections → step-away → card-sort → options-criteria → commit |
| a `timer` piece on page 2 "to keep the brainstorm to 10 minutes" | no timer; `step-away` ends the first half |

The CLI refuses both with `E_STYLE_PHASE` and `E_STYLE_FORBID`, and names the claim. Move the
page rather than changing the style.

## The cover

`cover` takes `question` (the one question the workbook exists to answer, in the user's words),
`timebox`, `howto` (up to seven short lines, plain words) and `stationery_note`. With no `data` it
prints the title and the timebox, which is enough for a Ritual-adjacent short sitting; a full
workbook deserves the question and three or four `howto` lines:

```json
{ "id": "W1-P1", "component": "cover",
  "data": { "question": "Is sync worth what it costs to keep?", "timebox": "40 min",
            "howto": ["Phone in another room.", "Work in ink, in the colours on this page.",
                      "Score your gut before you look at the criteria.",
                      "When the time is up, stop mid-sentence and write where to pick up.",
                      "Photograph every page and send them back."] } }
```

## The return checklist

Omit `data`. The CLI lists every page that comes back in the photos, skipping the ones that do
not (a timer dial, a die, a player aid). A hand-written `shots` list is only ever wrong.
