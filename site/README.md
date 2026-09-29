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

## One-time deploy setup (the project owner does this once)

The `site` GitHub Actions workflow (`.github/workflows/site.yml`) builds the site and deploys
`site/dist` to Cloudflare Pages on every push to `main` that touches `site/`,
`packages/switchback/`, `skills/` or the changelog. Before the first deploy:

1. **Create the Cloudflare Pages project.** In the Cloudflare dashboard, create a Pages project
   named `switchback` using **direct upload** (not a Git integration — the GitHub Action pushes
   the built `site/dist` itself via `wrangler pages deploy`).
2. **Add the custom domain.** On that Pages project, add `switchback.page` as a custom domain and
   follow Cloudflare's DNS verification steps.
3. **Create an API token.** In the Cloudflare dashboard under My Profile → API Tokens, create a
   token with **Cloudflare Pages — Edit** permission (scoped to the account that owns the
   project).
4. **Add repository secrets.** In the GitHub repository's Settings → Secrets and variables →
   Actions, add:
   - `CLOUDFLARE_API_TOKEN` — the token from step 3.
   - `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID shown on the dashboard's right sidebar.

After that, every push to `main` touching the paths above deploys automatically; `workflow_dispatch`
lets the owner trigger a deploy manually from the Actions tab.
