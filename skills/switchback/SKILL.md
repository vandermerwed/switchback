---
name: switchback
description: Use when the user wants to work something through by hand on paper, away from the screen (a decision, plan, diagnosis or creative problem, something to learn over weeks, a weekly reflection page; "workbook", "think on paper", "step away from the screen"); to print a draft, spec or AI answer as numbered pages to mark up with a pen ("proof this", "red-pen it"); when they send photos or scans of handwritten or marked-up pages, or name a page ID like W1-P3; or to set up or change the pens, paper and printer on their desk. Not for code review of a diff or pull request, or for plain printing.
---

# Switchback

The paper half of working with an agent. You make focused pages; the human works them in ink,
away from the screen; the marked pages come back as photos and steer what you do next. The
friction is the point. The printer prints a scaffold; the human supplies the colour.
**A page asks; it never contains the answer.**

## 1. Pick the mode

Take the first row that fits, then read that mode's reference in full before you do anything else.

| The request | Mode | Read |
| --- | --- | --- |
| The words after `/switchback` start with a mode: `workbook`, `proof`, `read` or `desk` | that mode | its reference below |
| A diff, a pull request, a commit or a file of source code to review | none | decline in one line and point at the code-review tools: the `/code-review` skill, `gh pr view`, or the pull request's review page |
| Photos or scans of paper the human worked by hand (Switchback pages, a planning board, loose index cards), or a page ID like `W1-P3` | **read** | [references/read.md](references/read.md) |
| The desk: setting it up, pens, paper, printer, stationery, "I got new pens" | **desk** | [references/desk.md](references/desk.md) |
| A document to check, edit or mark up: a path, pasted text, or your own last long answer, with "proof", "mark up", "red-pen" or "go through it with a pen" | **proof** | [references/proof.md](references/proof.md) |
| Any other thinking to do on paper: decide, diagnose, plan, create, learn, reflect | **workbook** | [references/workbook.md](references/workbook.md) |

One mode leads to the next. A read ends with the next round (workbook) or the next draft
(proof); a workbook with no saved desk offers to save it (desk). Send the current mode's done
message first, then read the next mode's reference.

## 2. Find the CLI

<!-- x-release-please-start-version -->
Run `switchback --version`. If it prints `0.2.0`, use `switchback`. If the command is not found, or
prints another version, run `npx -y @vandermerwed/switchback@0.2.0 --version` and prefix every
command in every reference with `npx -y @vandermerwed/switchback@0.2.0` instead of `switchback`.
<!-- x-release-please-end -->

If both fail, show the user the error the command printed, say the Switchback CLI needs Node.js
20.12 or later and network access the first time `npx` fetches it, and stop.

## 3. Rules every mode keeps

- **The CLI is the source of truth** for components, styles and the colour language:
  `switchback list`, `switchback collections`, `switchback show`, `switchback legend`, and the
  `fix` line of every diagnostic. Learn the format from those, never from the package's files on
  disk.
- **One folder per piece of work:** `switchback/<yyyy-mm-dd>-<slug>/` in the user's working
  directory, with today's date and a short slug from the title. Its first round is `W1.json`; a
  later round in that folder is `W<n+1>.json` with page ids `W<n+1>-P<k>`. Never overwrite an
  existing `W<n>.json`, `.html`, `.pdf` or `.switchback.json`.
- **Validate, then build once.** Run `switchback validate <spec> --json`. Follow the `fix` for
  every error and for `W_OPENING`, `W_CLOSING`, `W_NARROW`, `W_STYLE_EMPTY_SECTION` and
  `W_ZONES_COLUMNS`, then validate again. `W_SUBSTITUTION` and `W_UNASSIGNED_PEN` go into the
  hand-over in plain words: their `fix` lines edit the saved profile, and only desk mode writes
  the profile. Then run `switchback build <spec> --pdf --json`, once. It writes the HTML, the PDF
  and the `.switchback.json` sidecar next to the spec.
- **No PDF:** on `W_NO_BROWSER` or `W_PDF_FAILED` the HTML is still there. Give the print steps:
  open the HTML, Print, margins None, background graphics on, scale 100%. If the warning's `fix`
  names landscape pages, pass that on: in a browser other than Chrome or Edge, those pages print
  separately with Landscape chosen in the print dialog. For PDFs next time, the user installs
  Chrome, Edge or Chromium, or sets `SWITCHBACK_CHROME` to a browser's path.
- **Your view waits for the photos.** Until the marked pages come back, no page, confirmation or
  done message carries your recommendation.
