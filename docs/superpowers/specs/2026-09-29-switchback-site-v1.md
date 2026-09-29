# Switchback site, version 1: home, docs, showcase

**Date:** 2026-09-29
**Status:** proposed; extends the approved landing-page design in `2026-09-28-switchback-landing-page-design.md`, which still governs the home page.
**Scope:** everything `switchback.page` needs so early users can install Switchback, learn it, and see real pages: the home page, the docs, a showcase, a changelog and a privacy page.

## Intent

An early user arrives from a link someone shared. They should understand the round trip from the home page, install it in under two minutes, run a first sitting with the docs open beside them, and see enough real pages in the showcase to trust what will come out of their printer. The site is the product's front door, not a marketing campaign: every claim on it is something the skill and CLI do today.

## Information architecture

| Route | Page | Source of truth |
| --- | --- | --- |
| `/` | Home: the approved Contour Return hero, the worked round trip, the useful pause, the ink language, install | the landing-page spec |
| `/docs/` | Getting started: install, the first sitting, sending photos back | hand-written |
| `/docs/loop/` | How the round trip works, and why the friction is deliberate | hand-written, from PRODUCT.md |
| `/docs/modes/workbook/`, `/proof/`, `/read/`, `/desk/` | One page per mode: what to say, what you get, what to do with the paper | hand-written, checked against `skills/switchback/references/` |
| `/docs/styles/` | Sitting, Series, Incubation, Ritual, Proof: shape, cadence, when to use | `registry/styles.json` plus prose |
| `/docs/ink/` | The colour language: roles, structural marks, confidence marks, the one-pen fallback | `switchback legend --json` plus prose |
| `/docs/components/` and `/docs/components/<id>/` | The catalogue: every component and preset, a rendered preview, its data fields, variants, and graded grounding | generated at build time from the CLI package |
| `/docs/evidence/` | What the A to D grades mean, how claims were sourced and checked | `research/grading-report.md`, summarised |
| `/docs/cli/` | Command reference | generated from each command's `--help` |
| `/docs/troubleshooting/` | No PDF (no browser), photos that will not read (WebP, damaged files), wrong colours in a read | `docs/errors.md` plus prose |
| `/showcase/` | One real printed workbook per style, a proof, and the illustrative marked page with its read-back | generated at build time from example specs |
| `/changelog/` | Release notes | `CHANGELOG.md` |
| `/privacy/` | What stays local, what the agent's model provider sees, no analytics | hand-written |

Navigation: Switchback (home), Docs, Showcase, GitHub. The footer adds Changelog, Privacy and npm.

## Decisions

1. **Astro with Starlight for the docs.** The home page stays a custom Astro page as the landing plan builds it; Starlight serves `/docs/` with its sidebar, search (Pagefind) and accessible defaults, themed with the home page's tokens so the two read as one site.
2. **Generated pages come from the CLI, never from copies.** The component catalogue, the CLI reference and the showcase are built by calling the workspace's own `@vandermerwed/switchback` package at build time. A component's docs page cannot drift from what the CLI prints, because it is what the CLI prints.
3. **Rendered pages are shown as they print.** Each preview is the renderer's own HTML, scaled into a frame at A4 proportions, with a PDF download beside it. No screenshots to go stale.
4. **Build on GitHub Actions, deploy to Cloudflare Pages.** The domain is registered at Cloudflare. Building in Actions gives the showcase a browser for its PDFs (GitHub's Ubuntu runners ship Chrome); the built `dist/` is uploaded with `wrangler pages deploy`. Deploys run on pushes to `main` that touch `site/`, `packages/switchback/` or `skills/`.
5. **Agentation in development and preview only.** The user annotates components and pages on a local or preview build and pastes the result to an agent. Agentation's licence covers internal use, so it never ships in the production build.
6. **No analytics, no cookies, no waitlist.** The privacy page can then say so plainly.
7. **Showcase honesty.** Printed pages are real renderer output. Any marked page is labelled as an illustrative example unless it is a real returned page shared with permission.

## Phases

1. **Home** (the existing landing-page plan, with the install section now showing the real commands).
2. **Docs skeleton:** Starlight, theme, Getting started, the four mode pages, ink, styles, troubleshooting, privacy, changelog.
3. **Generated docs:** the component catalogue with previews and grounding, and the CLI reference.
4. **Showcase:** a real workbook per style plus a proof, built from example specs.
5. **Deploy:** the Actions workflow and the Cloudflare Pages project on `switchback.page`.

The site can be shared once phases 1, 2 and 5 are done; 3 and 4 can follow within days.

## Verification

- Every page builds statically; every internal link resolves (checked in CI).
- The install commands on the site are the ones in the README, and they work from a clean machine.
- Desktop and mobile renders keep the paper legible; keyboard focus, contrast and reduced motion hold.
- The catalogue lists exactly the components `switchback list --json --all` lists.
