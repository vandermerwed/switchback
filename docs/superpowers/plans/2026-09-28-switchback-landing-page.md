# Switchback Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static preview of `switchback.page` that makes the agent → paper → agent return legible through one truthful worked example.

**Architecture:** Add one Astro app at `site/` to the pnpm workspace. The page is static HTML/CSS/SVG; a captured page from the current Longhand renderer supplies the paper evidence, authored ink overlays are labelled illustrative, and the readback is real text. The approved comp governs composition, not page copy or invented print details.

**Tech Stack:** Astro static output, TypeScript in Astro frontmatter, CSS, inline SVG, Node's built-in test runner, the existing Longhand CLI, and Playwright for bounded screenshot checks.

**Spec:** `docs/superpowers/specs/2026-09-28-switchback-landing-page-design.md`; approved comp: `.impeccable/mocks/contour-return-polished.png`.

## Global Constraints

- Scope is the first landing page only: no package/skill rename, full docs site, analytics, waitlist, or deployment.
- Public installation under the Switchback name is not available in this checkout. The preview may link to an on-page install section, but it must not invent a command or present Longhand as already renamed.
- Print output stays black on white; only authored ink marks carry blue/red/highlighter colour. Show text/letter roles as well as colour.
- Show one matched, non-sensitive, explicitly illustrative page/mark/readback example. Do not imply perfect photo interpretation, future spatial commands, or researched flow outcomes.
- Use the approved forest-green contour hero and ochre returning route. The off-white second section is a quiet editorial continuation, not a card grid or roadmap.
- No client JavaScript is needed for comprehension; respect reduced motion if optional motion is added.
- Astro currently requires Node `>=22.12.0`; record that engine floor in `site/package.json`, while leaving the existing package's `>=20.12` floor unchanged. [Astro install guide](https://docs.astro.build/en/install-and-setup/)

## Review Focus

1. A visitor without JavaScript still sees the full loop and reaches the install-status section: test built HTML for required sections and links in Task 3.
2. A visitor on a 390px viewport can read the paper and readback without horizontal overflow: capture mobile screenshot in Task 3.
3. A visitor unable to distinguish ink colours can identify Ask, Stop, and Crux: test visible text labels and alt text in Task 1 and Task 3.
4. A visitor clicking Install before the rename gets an honest status, not a broken command: test CTA target and absence of a fake command in Task 3.
5. The displayed paper and readback could drift apart: compare the page ID, printed prompt, authored marks, and readback data in Task 1.

---

### Task 1: Build the worked-example evidence bundle

**Files:**
- Create: `site/example/workbook.json`, `site/example/readback.json`, `site/example/README.md`
- Create: `site/public/example/generated-page.png`, `site/example/generated-page.html`, `site/example/generated-page.longhand.json`
- Create: `site/tests/example.test.mjs`

**Interfaces:** `readback.json` exports plain JSON fields `pageId`, `printedPrompt`, `marks` (each with `role`, `label`, `text`), `answerFirst`, `unresolved`, and `crux`. Task 3 imports it directly; it does not parse a photo at runtime.

- [ ] **Step 1: Write failing content tests.** Assert that the JSON has exactly one Ask, one Stop, and one Crux; the Ask is answered first; Stop remains unresolved; the page ID and prompt match the renderer sidecar; its pen mapping assigns blue Ask, red Stop, and highlighter Crux; every role has a visible label; the image exists.
- [ ] **Step 2: Run `node --test site/tests/example.test.mjs`.** Expected: fail because the evidence bundle does not exist.
- [ ] **Step 3: Author a non-sensitive Sitting workbook around “What is the decision we are avoiding?” with cover, one blank thinking page, commit, question queue, and return checklist.** Build the existing CLI first. In an isolated temporary `LONGHAND_CONFIG_DIR`, run `node packages/longhand/dist/cli.js profile --set pens=blue,red,highlighter --set role.ask=blue --set role.stop=red --set role.crux=highlighter`, then `node packages/longhand/dist/cli.js build site/example/workbook.json -o site/example/generated-page.html --json`; capture the actual thinking page at readable resolution. Keep the spec, HTML, sidecar, and rendered-page capture; document the exact command, page ID, mark authorship, and image origin in the README. Do not copy the fake paper from the comp.
- [ ] **Step 4: Write the matched illustrative marks/readback JSON.** Use Ask Q1 “What are we really optimizing for?”, Stop “We have not decided what to say no to”, and Crux “Trade breadth for depth in v1”; answer Q1 first and carry Stop forward. Label it an authored demonstration, not automated transcription.
- [ ] **Step 5: Run `node --test site/tests/example.test.mjs`.** Expected: pass. Commit only this evidence bundle.

### Task 2: Build the static shell and approved hero

**Files:**
- Modify: `pnpm-workspace.yaml`, `pnpm-lock.yaml`
- Create: `site/package.json`, `site/astro.config.mjs`, `site/tsconfig.json`
- Create: `site/src/pages/index.astro`, `site/src/components/Hero.astro`, `site/src/components/ContourField.astro`, `site/src/styles/global.css`, `site/public/switchback-mark.svg`
- Create: `site/tests/page.test.mjs`

**Interfaces:** `Hero.astro` takes no props; it renders the visible first-viewport message, nav, anchor CTA, prompt/page/readback composition, and route. `ContourField.astro` is decorative SVG with `aria-hidden="true"`. The page imports the hero and global stylesheet.

- [ ] **Step 1: Write failing built-page tests.** Assert one `<h1>`, exact hero headline “Step away from the agents. Come back with a clearer thought.”, and a primary CTA with `href="#install"`. Test resolved anchors after Task 3 adds their sections.
- [ ] **Step 2: Run `node --test site/tests/page.test.mjs`.** Expected: fail because there is no site build.
- [ ] **Step 3: Add the minimal Astro workspace package and install its locked dependencies.** Use static output, no adapter or UI framework. Astro's `public/` assets are copied as-is to `dist/`; its static output is the default. [Astro configuration](https://docs.astro.build/en/reference/configuration-reference/)
- [ ] **Step 4: Implement the hero with semantic text, the real page capture, HTML readback, a code-native contour field and one ochre returning route.** Use the approved comp's scale and topology; avoid rasterizing text or using the comp bitmap as the page. Start with `#173b39` forest, `#f7f9f6` paper, and `#d1a34b` trail, then sample/record actual approved-comp pixels before finalizing tokens. Use the conservatively polished mark, keeping its route cutout transparent.
- [ ] **Step 5: Run `pnpm --filter @switchback/site build` and `node --test site/tests/page.test.mjs`.** Expected: pass, with `site/dist/index.html` generated. Commit the shell and hero.

### Task 3: Complete the return, install preview, and verification

**Files:**
- Create: `site/src/components/WorkedExample.astro`, `site/src/components/Install.astro`, `site/README.md`
- Modify: `site/src/pages/index.astro`, `site/src/styles/global.css`, `site/tests/page.test.mjs`, `site/example/README.md`

**Interfaces:** `WorkedExample.astro` imports `site/example/readback.json` and renders one readable marked-page/readback pairing with the “Same terrain. A clearer next step.” heading. `Install.astro` owns `id="install"` and the honest pre-rename status; it exports no speculative command.

- [ ] **Step 1: Extend the page tests to fail on absent lower sections.** Assert the exact lower heading, a visible “Illustrative example” label, text labels Ask/Stop/Crux, the matching readback, one `id="install"`, no fake `switchback` shell command, and no `paperclip`/agent-profile launch claim.
- [ ] **Step 2: Run `pnpm --filter @switchback/site build` followed by `node --test site/tests/page.test.mjs`.** Expected: the new assertions fail.
- [ ] **Step 3: Implement the off-white editorial continuation, short useful-pause copy, actual page plus authored mark overlay, readback and truthful install-status section.** The primary CTA remains `#install` in preview; replacing that status with a verified Switchback install route is a separate release gate after rename.
- [ ] **Step 4: Run `pnpm --filter @switchback/site build`, `node --test site/tests/example.test.mjs site/tests/page.test.mjs`, `pnpm lint`, and `git diff --check`.** Expected: pass. Inspect one desktop (1440×900) and one mobile (390×844) render together, fix the material issues in one batch, and verify keyboard focus, no horizontal overflow, legible paper/readback, and reduced-motion behavior. Run Impeccable's detector once after the changed UI is finished.
- [ ] **Step 5: Record remaining release blockers in `site/README.md`:** package/skill rename, verified install command and destination, final page/readback signoff, and deployment. Do not call this preview publicly launched. Commit the finished preview.

## Self-review

The tasks cover the spec's proof, hero, lower narrative, truthful CTA, accessibility, responsiveness, and static build. The comp is a spatial reference; the real renderer and written readback supply product truth. The only deferred items are explicitly outside the first build or blocked on the separate Switchback rename.
