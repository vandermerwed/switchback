# Contributing

Switchback is an early preview. Bug reports and ideas are the most useful contribution right
now: open an [issue](https://github.com/vandermerwed/switchback/issues). For a code change, open
an issue first so we can agree the shape before you build it.

## Photos in issues

A bug in the read-back often needs a photo of a marked page. Your pages hold your own thinking,
so crop or blur anything private before you attach one, or describe the marks instead.

## The repository

| Path | What it holds |
| --- | --- |
| `skills/switchback/` | The agent skill: `SKILL.md` routes to a mode, `references/` holds each mode's procedure |
| `packages/switchback/` | The `@vandermerwed/switchback` CLI: components, presets, styles, renderer, PDF, `proof`, `media`, `legend` |
| `packages/switchback/research/` | The graded evidence behind every research-backed template and style |
| `.claude-plugin/` | The Claude Code plugin and marketplace manifests |
| `scripts/check-skills.mjs` | Checks the skill's frontmatter, links, CLI fallback and version pin |
| `docs/superpowers/specs/` | Design history. It predates the rename, so it says Longhand |

## Development

You need Node.js 20.12 or later and pnpm 10.

```
pnpm install
pnpm build
pnpm test        # unit tests, plus the skill checker's tests
pnpm validate    # the registry, strict: every research-backed template and style carries graded grounding
pnpm lint        # biome, then the skill checker
```

The browser tests render real pages and PDFs:

```
pnpm --filter @vandermerwed/switchback exec playwright install chromium
SWITCHBACK_E2E=1 pnpm --filter @vandermerwed/switchback exec vitest run test/e2e test/engine/pdf.test.ts
```

To try the skill against your working copy of the CLI, put it on your PATH:

```
pnpm --filter @vandermerwed/switchback link --global
```

## Commits and releases

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `docs:`, `chore:`), because the changelog is built from them. On `main`,
release-please keeps a release pull request open. Merging it tags the version, publishes the
CLI to npm, and bumps the version in the plugin manifests and in the skill's pinned `npx`
fallback together. `pnpm lint` fails if those versions ever disagree.

Two things the automation does not do. Version 0.1.0 was published to npm by hand, because npm
only lets a package that already exists trust a GitHub workflow; every later version is
published by the release workflow through npm trusted publishing. And a release pull request
opened by release-please does not trigger CI, so run the `ci` workflow on its branch by hand
before merging it.
