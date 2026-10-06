# @vandermerwed/switchback

Programmable stationery for AI agents. Switchback turns a spec into a print-ready,
black-on-white workbook adapted to the desk in front of you: your paper, your pens, your
scissors (or lack of them). You work it by hand, photograph it, and the agent reads the ink back.

This package is the CLI behind the `/switchback` agent skill. Install the skill from
[github.com/vandermerwed/switchback](https://github.com/vandermerwed/switchback); it runs this CLI for you.

## Quick start

```bash
npx @vandermerwed/switchback init                  # one-minute setup of your desk
npx @vandermerwed/switchback list --tag decide      # browse components
npx @vandermerwed/switchback build workbook.json --pdf
```

Print the HTML with **Margins: None** and **Background graphics: on**, or use the PDF.

## A spec

```json
{
  "switchback": 1,
  "title": "Should we kill the sync feature?",
  "pages": [
    { "id": "W1-P1", "component": "cover" },
    { "id": "W1-P2", "component": "pre-mortem", "data": { "subject": "keeping sync" } },
    { "id": "W1-P3", "component": "commit" },
    { "id": "W1-P4", "component": "question-queue" },
    { "id": "W1-P5", "component": "return-checklist" }
  ]
}
```

`build` writes `workbook.html` and `workbook.switchback.json`, a sidecar recording exactly what
was printed, which the skill's read mode uses to read your photos.

## Commands

| Command | |
| --- | --- |
| `init [--defaults] [--force]` | set up your desk |
| `profile [--json] [--path] [--set key=value ...] [--import file\|-]` | show or edit it (`--set pens=blue,red --set role.stop=pink`), or import a whole profile JSON in one validated step |
| `list [--kind] [--tag] [--phase] [--basis] [--collection] [--fits-kit] [--json]` | browse templates (components and presets) |
| `collections [--json]` | the themed shelves of templates, with counts |
| `show <id> [--json]` | a template's contract, variants, data and what it rests on; or a collection's templates |
| `build <spec> [-o] [--paper] [--pdf] [--open] [--json]` | render (paper: A4 and Letter) |
| `validate [spec] [--strict] [--json]` | check a spec, or the registry |
| `proof <doc.md\|-> [-o spec.json] [--title T] [--paper A4\|Letter] [--max-pages N] [--json]` | turn a Markdown or plain-text document into a numbered, markable Proof-style spec, splitting into several proofs if it runs long |
| `media <files…> [-o dir] [--max 1800] [--tiles auto\|off] [--json]` | decode phone photos (JPEG, PNG and HEIC), turn them upright, scale them down, and tile any that are still huge. WebP isn't supported: convert it to JPEG first |
| `legend [--json]` | print the colour language: roles, marks, confidence scale and your current pen mapping |

Every diagnostic has a code and a `fix`; see [docs/errors.md](docs/errors.md).

## Styles

| Style | Budget | Opening | Closing | Other rules |
| --- | --- | --- | --- | --- |
| **Sitting** | 10 | `cover` | `commit`, `question-queue`, `return-checklist` | none |
| **Series** | 6 | `cover`, then one of `free-recall` / `feynman` / `self-explain` | `question-queue`, `return-checklist` | none |
| **Incubation** | 10 | `cover` | `commit`, `question-queue`, `return-checklist` | exactly one `step-away`, splitting the workbook into a diverge/either half and a converge/either half |
| **Ritual** | 1 | none | none | `allow: ["check-in", "scoresheet"]`; the page is identical every round |
| **Proof** | 10 | none | none | `allow: ["proof", "question-queue"]`; the legend strip prints proof actions |

Run `switchback legend` for the live colour mapping. Each style's full rules and grounding are in [`registry/styles.json`](registry/styles.json); `switchback show` covers components and presets, not styles.

## Your desk decides the page

Pens are assigned to colour roles by priority (Ask, Stop, Keep, Crux, Maybe, Sense, Draft).
Any role without a pen falls back to a circled letter, so a black pen and a highlighter is a complete kit.
Components that need scissors or tape fall back to variants that don't.

## Licence

Apache License 2.0, except the Business Model Canvas and Lean Canvas presets, which are CC BY-SA
3.0 (see `LICENSE` and `NOTICE`). Fonts: Fraunces, Inter, and JetBrains Mono under the SIL Open Font License (see `assets/fonts`).
