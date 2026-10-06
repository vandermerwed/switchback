# Showcase source specs

Everything the `/showcase/` page renders (one workbook per style, plus one drawn from a collection) is generated at build time from the files here, by
`site/scripts/generate.mjs`, using the workspace's own `@vandermerwed/switchback` package — never
from copies or screenshots. Each spec was authored by hand for this page and validates cleanly
under `switchback validate` (`node packages/switchback/dist/cli.js validate <file> --json`).

| File | Style | Problem | Notes |
| --- | --- | --- | --- |
| `sitting.json` | Sitting | Whether to rewrite a feature | Cover, brain-dump, options-criteria, pre-mortem, commit, question queue, return checklist |
| `series.json` | Series | Learning a subject for an interview | Round 1 of 3: cover, cued free-recall, node-map, Feynman explanation, question queue, return checklist |
| `incubation.json` | Incubation | Naming a new project | A generating half (brain-dump, ten bad ideas, forced connections), a real break (`step-away`), then a judging half (card sort, options-criteria, commit) |
| `ritual.json` | Ritual | A weekly check-in | The style's one allowed page, a check-in, unchanged across rounds so change is visible |
| `proof.md` | Proof | A short internal draft ("should the team meet daily?") | Authored prose; `generate.mjs` runs `switchback proof` on it to produce the numbered-paragraph spec, exactly as a user would |
| `game-dev.json` | Sitting | Scoping a game for a two-week jam | Drawn from the Game Development collection: cover, game one-pager, core loop, feature cut (write-in), pre-mortem, commit, question queue, return checklist |

Each spec's `pages` follow the shape [`workbook.md`](../../skills/switchback/references/workbook.md)
and [`styles.md`](../../skills/switchback/references/styles.md) describe: an opening, a budget the
style enforces, and closing pages with no invented recommendation on any page. None of the
problems, names or drafts are real; they are chosen to be recognisable to a stranger without
describing anyone's actual situation.

`generate.mjs` builds every spec through `buildDocument` (for the on-page HTML preview) and
through the CLI's own `build --pdf` (for the downloadable PDF), so the showcase can never print
something the CLI itself would not.
