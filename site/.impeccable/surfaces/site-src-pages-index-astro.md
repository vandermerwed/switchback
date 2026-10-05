---
version: 1
slug: "site-src-pages-index-astro"
primary_target: "site/src/pages/index.astro"
related_targets: ["site/src/components/Hero.astro","site/src/components/RoundTrip.astro"]
---

Scope: the switchback.page home page (`site/src/pages/index.astro` and its components). Mode: Persuade.

Audience and job: people who work with AI agents all day and want room to think something through themselves. Within seconds a first-time visitor must know it is an agent skill, that it prints a page you work by hand, and that the agent carries on from a photo of what you wrote; then install.

Proof on the page: one everyday example (planning a 20-minute talk) followed from the request to the next page, using real renderer pages and authored handwriting labelled "Illustrative example". Pens are explained in plain words first; the letter codes Q, R, X appear once, as the one-pen fallback (issue #37). No "v1" or release jargon on a first read.

Direction: Contour Return, pinned by the user to `.impeccable/mocks/decision/contour-return.png`. Words set on real Sani Pass terrain; the marked page is the focal object; a trail runs from the request into the page and back out to the reply. Memorable moment: the ink writes itself onto the page on load, then the reply arrives.

Constraints: headline "Step away from the agents. Think it through on paper." (chosen by the user). No eyebrow above headings. Example content lives in `site/example/readback.json`; tests in `site/tests/page.test.mjs` and `example.test.mjs` hold it to the page.

Open: real worked examples from real sittings (#38) could replace the authored handwriting later; the body face is still Inter.
