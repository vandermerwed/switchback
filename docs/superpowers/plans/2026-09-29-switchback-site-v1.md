# Switchback Site v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `switchback.page`: the approved home page, Starlight docs, a generated component catalogue, a showcase of real printed pages, a changelog and a privacy page, deployed to Cloudflare Pages from GitHub Actions.

**Architecture:** One Astro 7 project in `site/`, a pnpm workspace package that depends on the workspace CLI package. The home page is a custom Astro page (the landing-page plan's work); `/docs/` is Starlight. A prebuild script calls the CLI package's own API (`loadCatalogue`, `renderComponent`, `buildDocument`) to write preview HTML, showcase HTML and PDFs, and JSON the pages read, so nothing on the site can drift from what the CLI prints.

**Tech Stack:** Astro 7.3 (Node ≥22.12), `@astrojs/starlight` 0.42, TypeScript, Node's test runner, Playwright (already in the workspace) for render checks, `wrangler` 4 for deploys, `agentation` 3 with `@astrojs/react` in development only.

**Spec:** `docs/superpowers/specs/2026-09-29-switchback-site-v1.md` (information architecture, decisions, phases). The home page is governed by `docs/superpowers/specs/2026-09-28-switchback-landing-page-design.md` and implemented by `docs/superpowers/plans/2026-09-28-switchback-landing-page.md`, with the amendments in Task 1 below. Approved comp, in the maintainer's git-ignored `.impeccable/` folder: `.impeccable/mocks/contour-return-polished.png`, hero reference `.impeccable/mocks/decision/contour-return.png`, mark draft `.impeccable/mocks/switchback-mark-polished.svg`.

## Global Constraints

- The CLI package keeps its `node >=20.12` floor and its Node 20 CI job. The site needs Node ≥22.12, so root `build` and `test` scripts must not build the site; the site gets its own scripts and its own CI job on Node 24.
- Every claim on the site is something the skill and CLI do today. No paperclip, proximity or agent-profile commands; no productivity or flow claims; no testimonials.
- Printed pages shown on the site are real renderer output. Authored marks are labelled "Illustrative example".
- No analytics, cookies, trackers or third-party scripts in production. Agentation loads only in `astro dev` or when `PUBLIC_FEEDBACK=1` is set for a preview build.
- Colour is never the only carrier of meaning: every ink role shows its name or letter too.
- Install commands on the site are exactly the README's: `/plugin marketplace add vandermerwed/switchback`, `/plugin install switchback@switchback`, `npx skills add vandermerwed/switchback`, `npm install -g @vandermerwed/switchback`.

## Review Focus

1. **A visitor on a phone** (390 px) must read the paper previews and the read-back without sideways scrolling. Pinned in Task 1 and Task 4 screenshot checks.
2. **The catalogue drifts from the CLI** when a component is added. Pinned in Task 4: a test compares the catalogue's ids with `loadCatalogue()`.
3. **A broken link** from docs to a component, the changelog or GitHub. Pinned in Task 6: a link check over `site/dist`.
4. **Agentation leaks into production.** Pinned in Task 3: a test greps `site/dist` for `agentation`.
5. **The site build breaks the CLI's Node 20 CI job.** Pinned in Task 2: root scripts exclude the site and CI runs the site job on Node 24 only.

---

### Task 1: The home page (the landing-page plan, amended)

Execute Tasks 1 to 3 of `docs/superpowers/plans/2026-09-28-switchback-landing-page.md` with these amendments, which supersede its pre-rename constraints:

- The CLI is `switchback` (`node packages/switchback/dist/cli.js`), the sidecar is `.switchback.json`, and the isolated config variable is `SWITCHBACK_CONFIG_DIR`.
- The `#install` section shows the four real install commands from Global Constraints, as copyable code blocks, plus one line on requirements (Node.js 20.12 or later, a printer, a pen, a phone camera). Replace the plan's "no fake `switchback` command" assertion with an assertion that each of the four commands appears exactly as written.
- Navigation is Switchback, Docs, Showcase, GitHub (`https://github.com/vandermerwed/switchback`). Docs and Showcase link to `/docs/` and `/showcase/`, which Tasks 3 and 5 create.
- The site package is `site/package.json` named `@switchback/site`; Task 2 below owns the workspace wiring, so do Task 2 first.

### Task 2: Workspace wiring and CI

**Files:**
- Create: `site/package.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/.gitignore`
- Modify: `pnpm-workspace.yaml`, root `package.json`, `.github/workflows/ci.yml`, `pnpm-lock.yaml`

- [ ] **Step 1:** Add `site` to `pnpm-workspace.yaml`:

```yaml
packages:
  - packages/*
  - site
```

- [ ] **Step 2:** `site/package.json`:

```json
{
  "name": "@switchback/site",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "prebuild": "node scripts/generate.mjs",
    "build": "astro build",
    "dev": "node scripts/generate.mjs && astro dev",
    "preview": "astro preview",
    "test": "node --test tests/"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.42.4",
    "@vandermerwed/switchback": "workspace:*",
    "astro": "^7.3.5"
  },
  "devDependencies": {
    "@astrojs/react": "^7.0.0",
    "agentation": "^3.1.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

`site/.gitignore`: `dist/`, `.astro/`, `public/generated/`, `src/generated/`.

- [ ] **Step 3:** Root `package.json` scripts, so the Node 20 job never touches the site:

```json
"build": "pnpm -r --filter \"./packages/**\" build",
"test": "pnpm -r --filter \"./packages/**\" test && node --test scripts/check-skills.test.mjs",
"site:dev": "pnpm --filter @switchback/site dev",
"site:build": "pnpm --filter @switchback/site build",
"site:test": "pnpm --filter @switchback/site test"
```

- [ ] **Step 4:** In `.github/workflows/ci.yml`, add a `site` job on `ubuntu-latest`, Node 24: checkout, pnpm setup, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm site:build`, `pnpm site:test`.
- [ ] **Step 5:** `pnpm install`, then run `pnpm build && pnpm test` and confirm the counts match before the change (the site is not built). Commit: `build(site): add the site workspace package and its CI job`.

### Task 3: Starlight docs skeleton, theme and development feedback

**Files:**
- Modify: `site/astro.config.mjs`
- Create: `site/src/content.config.ts`, `site/src/styles/starlight.css`, `site/src/components/Feedback.tsx`, `site/src/components/Head.astro`, and the docs pages under `site/src/content/docs/docs/`: `index.mdx` (Getting started), `loop.mdx`, `modes/workbook.mdx`, `modes/proof.mdx`, `modes/read.mdx`, `modes/desk.mdx`, `styles.mdx`, `ink.mdx`, `evidence.mdx`, `troubleshooting.mdx`
- Create: `site/src/pages/privacy.astro`, `site/src/pages/changelog.astro`
- Test: `site/tests/docs.test.mjs`

**Interfaces:**
- Produces: routes `/docs/`, `/docs/loop/`, `/docs/modes/<mode>/`, `/docs/styles/`, `/docs/ink/`, `/docs/evidence/`, `/docs/troubleshooting/`, `/privacy/`, `/changelog/`. Task 4 adds `/docs/components/` and `/docs/cli/` to the sidebar config written here.

- [ ] **Step 1: Write the failing test** `site/tests/docs.test.mjs`: after a build, each route above exists in `site/dist` as `index.html`; `/docs/` contains the four install commands verbatim; `/changelog/` contains `0.1.0`; no file in `site/dist` contains the string `agentation`.
- [ ] **Step 2: Configure Starlight** in `astro.config.mjs`:

```js
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

const feedback = process.env.NODE_ENV !== "production" || process.env.PUBLIC_FEEDBACK === "1";

export default defineConfig({
  site: "https://switchback.page",
  integrations: [
    starlight({
      title: "Switchback",
      logo: { src: "./src/assets/switchback-mark.svg", replacesTitle: false },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/vandermerwed/switchback" }],
      customCss: ["./src/styles/starlight.css"],
      components: { Head: "./src/components/Head.astro" },
      sidebar: [
        { label: "Start here", items: ["docs", "docs/loop"] },
        { label: "Modes", items: ["docs/modes/workbook", "docs/modes/proof", "docs/modes/read", "docs/modes/desk"] },
        { label: "Reference", items: ["docs/styles", "docs/ink", "docs/evidence", "docs/troubleshooting"] },
      ],
    }),
    ...(feedback ? [react()] : []),
  ],
});
```

- [ ] **Step 3: Theme.** `starlight.css` maps Starlight's `--sl-color-*` variables to the home page's tokens (forest `#173b39`, paper `#f7f9f6`, trail `#d1a34b`, ink black) for light and dark, and uses the home page's font stack.
- [ ] **Step 4: Development feedback.** `Head.astro` renders Starlight's default head, then `<Feedback client:only="react" />` only when `import.meta.env.DEV || import.meta.env.PUBLIC_FEEDBACK === "1"`. `Feedback.tsx` lazy-loads the toolbar so production bundles never include it:

```tsx
import { lazy, Suspense } from "react";
const Agentation = lazy(() => import("agentation").then((m) => ({ default: m.Agentation })));
export default function Feedback() {
  return <Suspense fallback={null}><Agentation /></Suspense>;
}
```

Check the export name against `agentation`'s README when installing; adjust the `then` mapping if it differs.
- [ ] **Step 5: Write the pages.** Plain, second-person prose; one idea per paragraph. Sources: `README.md` for install and the loop; `skills/switchback/references/<mode>.md` for what each mode does and what the user does with the paper (describe the user's side, not the agent's procedure); `CONTEXT.md` for terms; `packages/switchback/docs/errors.md` for troubleshooting; `packages/switchback/research/grading-report.md` for the evidence page. `privacy.astro` says: everything stays in the user's `switchback/` folder; the agent sends photos to its model provider to read them; the site and CLI collect nothing. `changelog.astro` renders `../../CHANGELOG.md` with Astro's markdown support.
- [ ] **Step 6:** `pnpm site:build && pnpm site:test`. Expected: pass. Commit: `feat(site): add the Starlight docs, privacy and changelog pages`.

### Task 4: Generated catalogue and CLI reference

**Files:**
- Create: `site/scripts/generate.mjs`, `site/src/pages/docs/components/index.astro`, `site/src/pages/docs/components/[id].astro`, `site/src/pages/docs/cli.astro`
- Modify: `site/astro.config.mjs` (sidebar: add "Components" `/docs/components/` and "CLI" `/docs/cli/` under Reference)
- Test: `site/tests/catalogue.test.mjs`

**Interfaces:**
- Consumes: `loadCatalogue()`, `renderComponent(id, { paper: "A4", embedFonts: true })` and `VERSION` from `@vandermerwed/switchback` (built by `pnpm build`).
- Produces: `site/public/generated/previews/<id>.html` (one per component and preset), `site/src/generated/catalogue.json` (`[{ id, kind, title, tags, phase, variants, dataFields, grounding }]`), `site/src/generated/cli.json` (`[{ command, help }]`).

- [ ] **Step 1: Write the failing test:** the ids in `src/generated/catalogue.json` equal `[...loadCatalogue().components.keys(), ...loadCatalogue().presets.keys()]`; every id has `dist/docs/components/<id>/index.html` and `dist/generated/previews/<id>.html`; `dist/docs/cli/index.html` contains every command name from `switchback --help` (`build`, `validate`, `list`, `show`, `init`, `profile`, `proof`, `media`, `legend`).
- [ ] **Step 2: Write `generate.mjs`.** Import the package, loop the catalogue, write each preview with `renderComponent`, write `catalogue.json` from each component's `meta` (read the field names from `packages/switchback/src/engine/types.ts`), and write `cli.json` by running `node <package>/dist/cli.js <command> --help` for each command. Fail loudly if a render returns diagnostics with severity `error`.
- [ ] **Step 3: The pages.** Both use Starlight's `StarlightPage` component (`@astrojs/starlight/components/StarlightPage.astro`) so they sit in the docs layout. The index groups components by tag, then lists presets. A component page shows its title, what it is for, a scaled A4 frame of its preview (`<iframe loading="lazy" title="Preview of <title>">`, aspect ratio 210/297, sized to the column), its variants, its data fields, and its grounding with each claim's grade letter and sources as links.
- [ ] **Step 4:** `pnpm build && pnpm site:build && pnpm site:test`. Then open `/docs/components/card-sort/` at 1440×900 and 390×844 with Playwright and look at both screenshots: the preview frame fits the column with no sideways scroll. Commit: `feat(site): generate the component catalogue and CLI reference from the CLI`.

### Task 5: Showcase

**Files:**
- Create: `site/showcase/sitting.json`, `series.json`, `incubation.json`, `ritual.json`, `proof.md`, `site/showcase/README.md`, `site/src/pages/showcase.astro`
- Modify: `site/scripts/generate.mjs`
- Test: `site/tests/showcase.test.mjs`

- [ ] **Step 1: Write the failing test:** `dist/showcase/index.html` names all five styles and links a PDF for each; each linked PDF exists in `dist/generated/showcase/`.
- [ ] **Step 2: Author the examples.** One non-sensitive workbook spec per style, each valid under `switchback validate --strict` rules for its style, on a problem a stranger recognises (whether to rewrite a feature, learning a subject for an interview, naming a project, a weekly check-in). `proof.md` is a short draft of a few paragraphs. Record each file's origin in `showcase/README.md`.
- [ ] **Step 3: Generate.** In `generate.mjs`, build each spec with `buildDocument` to HTML, and run `node <package>/dist/cli.js build <spec> --pdf` into `public/generated/showcase/` for the PDFs. When no browser is found locally, write the HTML only and warn; CI's Ubuntu runner has Chrome.
- [ ] **Step 4: The page.** One section per style: what it is for, a scaled frame of its first two pages, and "Download the PDF". Close with the home page's illustrative marked example and its read-back, labelled "Illustrative example".
- [ ] **Step 5:** `pnpm site:build && pnpm site:test`. Commit: `feat(site): add the showcase of real printed workbooks`.

### Task 6: Link check and deploy

**Files:**
- Create: `site/tests/links.test.mjs`, `.github/workflows/site.yml`
- Modify: `site/README.md`

- [ ] **Step 1: Link check.** `links.test.mjs` walks every HTML file in `site/dist`, resolves every internal `href` and `src` against `dist`, and fails listing each broken one. External links are checked for a well-formed URL only.
- [ ] **Step 2: Deploy workflow** `.github/workflows/site.yml`:

```yaml
name: site
on:
  push:
    branches: [main]
    paths: ["site/**", "packages/switchback/**", "skills/**", "CHANGELOG.md", ".github/workflows/site.yml"]
  workflow_dispatch:
permissions:
  contents: read
  deployments: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm site:build
      - run: pnpm site:test
      - run: pnpm dlx wrangler@4 pages deploy site/dist --project-name switchback --branch main
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

- [ ] **Step 3:** `site/README.md` records the one-time setup the owner does: create the Cloudflare Pages project `switchback` (direct upload), add `switchback.page` as its custom domain, create an API token with Pages edit rights, and add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository secrets. Also how to run a feedback preview: `PUBLIC_FEEDBACK=1 pnpm site:build && pnpm --filter @switchback/site preview`.
- [ ] **Step 4:** `pnpm site:build && pnpm site:test`. Commit: `ci(site): check links and deploy to Cloudflare Pages`.
