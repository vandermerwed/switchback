# switchback.page

The `switchback.page` site: the home page, Starlight docs, a generated component catalogue and
CLI reference, a showcase of real printed workbooks, a changelog and a privacy page. Nothing here
is a copy of the CLI's own output — `scripts/generate.mjs` calls the workspace's
`@vandermerwed/switchback` package directly at build time, so the docs and showcase can never
drift from what the CLI actually prints.

## Scripts

```
pnpm site:dev      # generate + astro dev
pnpm site:build    # generate + astro build (from the repo root)
pnpm site:test     # node --test tests/
```

Run from the repo root; the site is its own workspace package (`@switchback/site`) so the root
`build` and `test` scripts, and the Node 20 CI job, never touch it. The site itself needs
Node ≥22.12.

## Previewing the development feedback toolbar

Agentation (a development-only annotation toolbar) is never part of a production build — see the
`agentation` grep check in `site/tests/docs.test.mjs`. It loads automatically under `astro dev`,
and to see it in an otherwise production-shaped static build:

```
PUBLIC_FEEDBACK=1 pnpm site:build && pnpm --filter @switchback/site preview
```

## Deploying

Cloudflare Pages builds the site straight from this repository, on every push to `main`, with
its Git integration. The project's build settings:

| Setting | Value |
| --- | --- |
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22.12 or later (Cloudflare's default image is fine) |

`npm run build` builds the workspace's CLI package first (`prebuild`), then generates the
catalogue and showcase from it, then runs Astro. Pull requests get Cloudflare preview deployments;
the `site` job in `.github/workflows/ci.yml` builds and tests the site on every pull request too.

### Showcase PDFs

Cloudflare's build image has no Chrome, Edge or Chromium, so it cannot print the showcase PDFs.
The build then uses the committed copies in `showcase/pdf/`, and fails if one is missing. When a
showcase spec or the renderer changes, refresh them on a machine with a browser and commit them:

```
SWITCHBACK_UPDATE_SHOWCASE_PDFS=1 pnpm site:build
git add site/showcase/pdf
```
