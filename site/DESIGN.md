---
name: Switchback
description: A skill that prints a page you work by hand, then reads the photo back.
colors:
  forest: "#173b39"
  forest-deep: "#0f2826"
  paper: "#f7f9f6"
  trail: "#d1a34b"
  ink: "#111411"
  ink-soft: "#4a524d"
  rule: "#d9ded8"
  pen-blue: "#2546b0"
  pen-red: "#c42e26"
  pen-black: "#23262b"
  crux: "#f2d13a"
typography:
  display:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2.9rem, 4vw, 4.5rem)"
    fontWeight: 540
    lineHeight: 1.03
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 5.4rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(1.35rem, 2.6vw, 2.35rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.18vw, 1.16rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.2em"
  hand:
    fontFamily: "Kalam, 'Segoe Print', 'Bradley Hand', cursive"
    fontSize: "3.35cqi"
    fontWeight: 400
    lineHeight: 1
rounded:
  sharp: "2px"
  chip: "3px"
  bubble: "8px"
  circle: "50%"
spacing:
  gutter: "clamp(20px, 3.5vw, 58px)"
  container-content: "1460px"
  container-wide: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.trail}"
    textColor: "#17221b"
    typography:
      fontFamily: "Inter, system-ui, sans-serif"
      fontWeight: 600
      fontSize: "1rem"
    rounded: "{rounded.chip}"
    padding: "0.85rem 1.3rem 0.85rem 1.4rem"
    height: "58px"
  button-primary-hover:
    backgroundColor: "#e2b65f"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#f4f8f5"
    typography:
      fontFamily: "Inter, system-ui, sans-serif"
      fontWeight: 600
      fontSize: "1rem"
    padding: "0.4rem 0"
  step-number:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography:
      fontFamily: "Besley, Georgia, serif"
      fontWeight: 500
      fontSize: "1.45rem"
    rounded: "{rounded.circle}"
    width: "52px"
    height: "52px"
  reply-card:
    backgroundColor: "{colors.paper}"
    textColor: "#1d2a22"
    typography:
      fontFamily: "Inter, system-ui, sans-serif"
      fontSize: "0.9rem"
      lineHeight: 1.48
    rounded: "8px 2px 8px 8px"
    padding: "0.8rem 0.9rem"
---

# Design System: Switchback

## Overview

**Creative North Star: "Contour Return"**

The site is a topographic map of one real place — Sani Pass, Drakensberg — with the product's own loop (ask, print, mark, photograph, reply) drawn on top as a dashed ochre trail. The dark forest plateau is the screen you step away from; the white printed page, tilted and shadowed like paper actually left on a desk, is the object the whole page revolves around; the trail runs into it and back out to a reply card, so the visitor reads the loop rather than being told about it. Nothing on the page claims to be a tool landing page: there is no feature grid, no glyph-icon row, no eyebrow sitting above a heading. Headings carry the whole announcement themselves.

Two materials never mix: the map (real terrain, trail-ochre, spaced-caps labels, Besley/Inter) and the page (white paper, black fineliner, pen-blue/pen-red/crux-yellow handwriting in Kalam). The map explains; the page is evidence. Everything photographic on the page — the generated renderer output, the terrain itself — is real; nothing is model-generated imagery (`public/images/SOURCES.md`).

**Key Characteristics:**
- A dark, real-terrain plateau carries the pitch; a tilted white page is the hero's focal object, not an illustration beside it.
- One accent (trail-ochre) marks the route and the one thing to click; everything else is forest-dark or paper-neutral.
- Handwriting (Kalam) is scoped to exactly two places: the illustrative ink overlay and the one-pen circled-letter fallback. It never appears as UI type.
- A single reveal-once sequence (ink writes itself in, then the reply arrives) plays on load and is fully suppressed under `prefers-reduced-motion`.
- No eyebrows above headings, no icon-font or glyph icons anywhere — every icon on the page is a hand-specified inline SVG path.

## Colors

The palette is a map's palette: one dark ground, one paper-neutral, one accent used for wayfinding, and a small set of pen colours that only ever appear as handwriting.

### Primary
- **Trail ochre** (`#d1a34b`): the one accent. The install CTA, the dashed route through the hero scene, the step-number ring, link hover colour, and the bold lead-in on each "Uses" row. It is rare by design — see the One Trail rule below.

### Secondary
- **Forest** (`#173b39`): the hero's base background colour, under the terrain photo and the `theme-color` meta.
- **Forest deep** (`#0f2826`): the darkest surface — footer, chat bubbles, code blocks, the hero's lower gradient. Also the dark-theme override base for `--sb-paper` (`#142723`, a tinted step toward forest, not the same value).

### Tertiary (ink / pen roles — handwriting only)
- **Pen black** (`#23262b`): the fineliner colour for ordinary handwritten notes and strike-throughs.
- **Pen blue** (`#2546b0`): a question for the agent ("Ask"). Answered first in every readback.
- **Pen red** (`#c42e26`): a doubt ("Stop"). Stays open until the person resolves it.
- **Crux yellow** (`#f2d13a`): the highlighter pass over the one thing that matters most. Applied as a translucent, multiply-blended, slightly crooked rectangle behind the text, never a flat fill.

### Neutral
- **Paper** (`#f7f9f6` light / `#142723` dark): page background, reply-card and step-number fill.
- **Ink** (`#111411` light / `#f4f5ef` dark): body text.
- **Ink soft** (`#4a524d` light / `#c3d0c7` dark): secondary copy, captions.
- **Rule** (`#d9ded8` light / `#3c5550` dark): hairlines — list dividers, tab underline, the "one-pen" rule.

### Named Rules
**The One Trail Rule.** Trail-ochre is the only saturated accent anywhere in the UI chrome. It marks a route or a single next action (install, link hover, the one highlighted fact); it is never used for a large fill or a second competing accent.

**The Ink-Stays-On-Paper Rule.** Pen black/blue/red and crux yellow are drawn only inside the handwriting layer (`MarkedPage.astro`) or its "circled letter" fallback. They do not leak into buttons, links, or badges — a blue link or a red error state would borrow a meaning (question / doubt) the page has already assigned to ink.

## Typography

**Display/Headline Font:** Besley (variable, weight 400–900), with Georgia as fallback.
**Body Font:** Inter (static weights 400/600 shipped), with system-ui as fallback.
**Hand Font:** Kalam (static weights 400/700), with "Segoe Print"/"Bradley Hand" as fallback.

**Character:** A serif with real editorial weight (Besley, used only at 500–540 and only on headings) against a plain, quiet sans for everything read in paragraphs. Kalam is held back entirely for the one place the site shows actual ink.

### Hierarchy
- **Display** (540, `clamp(2.9rem, 4vw, 4.5rem)`, 1.03): the hero `<h1>` only — the single heaviest, largest line on the site.
- **Headline** (500, `clamp(2.5rem, 5vw, 6rem)`, ~1.05): every other section `<h2>`/page `<h1>` (How it works, Uses, Begin with a page, the Showcase intro). Size varies by section (2.5rem–4.6rem on the home page, up to 6rem on the Showcase intro); weight, family and the tight, size-scaled negative tracking (roughly −0.02em to −0.04em) stay constant. All of these also carry `text-wrap: balance`.
- **Title** (500, `clamp(1.35rem, 2.6vw, 2.35rem)`, 1.12–1.2): round-trip step headings, the "Uses" row labels, the step-number numeral itself.
- **Body** (400, `clamp(1rem, 1.18vw, 1.16rem)`–1.12rem, 1.6–1.7): lede and paragraph copy, in `ink-soft` almost everywhere it isn't the hero (which is white-on-dark). Line length is left loose (max-width 32–46rem) rather than held to a strict measure.
- **Label** (600, 0.7rem, letter-spacing 0.18–0.2em, uppercase): the hero's spaced-caps map labels ("You ask", "Your agent replies"), the terrain credit line, tab/footnote-scale captions. This is a map-reading convention the OWN-WORLD calls for directly — it is not the banned "eyebrow"; it never sits directly above a heading as an announcement.
- **Hand** (400, 3.35cqi container-relative / 3.7cqi for the coloured marks, line-height 1): the illustrative handwriting layer and the circled-letter glyph. Bold (700) is used once, for the circled fallback letter.

### Named Rules
**The Variable-Weight Rule.** Besley is loaded as a variable font specifically so headings can sit at in-between weights (540 for the hero, 500 elsewhere) instead of snapping to 400/700 — a deliberate, repeatable choice, not a rounding artifact.

## Layout

Two container widths recur: **1600px** for full-bleed scene sections (hero, Showcase gallery) and **1460px** for reading sections (round-trip, Uses, Install). Both are centred with a shared responsive gutter, `clamp(20px, 3.5vw, 58px)` (the Install section and site footer use a slightly wider `clamp(24px, 4vw, 70px)` gutter — a minor, unreconciled variant of the same idea rather than a second system).

The home page reads as a sequence of full-width bands (hero → round-trip → uses → install), each with its own background, rather than a single scrolling canvas with cards. Two breakpoints carry almost all responsive change: **1023px** (desktop two/three-column layouts collapse to one column; the hero's absolutely-positioned scene becomes a relative, top-to-bottom stack threaded on a dashed left rail) and **640px** (type steps down again, stacked art narrows). A handful of sections add their own one-off step (1279px in the hero, 950px/900px in Uses/Showcase, 600px/480px for fine phone tuning) rather than sharing a single breakpoint token.

Vertical rhythm inside a section is loose and generous (section padding in the 3–8rem range, scaled by `clamp()`), while the dashed trail and numbered steps in "How it works" give the page an explicit left-edge spine that most sections don't otherwise have.

## Elevation & Depth

The system is flat chrome (no shadow on buttons, nav, or tabs) layered with **object shadows** reserved for things that represent physical paper or a floating photo. Depth is otherwise conveyed by colour layering (dark gradients and radial glows over the terrain photo, `color-mix` tinted panel backgrounds) rather than by elevation tiers.

### Shadow Vocabulary
- **Paper cast** (`box-shadow: 0 1–2px 2–4px rgba(contact), 10–18px 16–26px 30–38px rgba(cast)`, cast colour tied to forest-dark, e.g. `rgb(20 40 34 / 0.16)` or `rgb(1 14 13 / 0.5)`): every tilted paper object — the hero's marked page, the cover/page-2 stack, the ink close-up, the next-page preview, the Showcase feature pane. Always a tight near-black contact shadow plus a larger, softer, green-tinted cast shadow; never a single flat shadow and never pure black.
- **Chat lift** (`box-shadow: 0 18px 40px rgb(15 40 38 / 0.22)`): the chat transcript panel.
- **CTA lift** (`box-shadow: 0 10px 28px rgb(1 16 15 / 0.32)`): the primary Install button only.

### Named Rules
**The Paper-Only Shadow Rule.** A cast shadow appears only under an object that is standing in for a physical sheet of paper or a chat panel. Flat UI (nav, tabs, chips, the install code block) stays shadowless; its depth comes from a background-colour step instead.

## Shapes

Two corner languages, assigned by what the shape represents. **UI chrome is sharp**: 2px on code blocks and the copy button, 3px on the primary CTA — barely-rounded rectangles that read as print/stationery, not soft app surfaces. **Conversational objects get a pulled corner**: speech bubbles, the reply card and the hero's request bubble use an asymmetric radius (e.g. `8px 8px 8px 2px` or `9px 9px 2px 9px`) where one corner collapses to 2px to suggest a speech-bubble tail, mirrored depending on who is "speaking" (you vs. the agent). Numerals and the north-arrow badge are true circles (`border-radius: 50%`). Printed pages themselves (the marked page, renderer screenshots) carry no radius at all — they are scans of paper, not app cards — and are instead tilted 1–4° with the paper shadow above.

## Components

### Buttons
- **Primary ("Install Switchback"):** trail-ochre fill, near-black text (`#17221b`), 3px radius, generous padding (min-height 58px), an inline SVG arrow that slides 3px right on hover; hover lightens the fill to `#e2b65f`; active nudges down 1px. This is the only filled button on the site.
- **Secondary ("See how it works"):** no fill, underlined text, colour shifts to trail-ochre on hover. Used for every non-primary call to action.
- **Focus:** every interactive element gets the same 3px trail-ochre outline with 2–5px offset — one focus treatment site-wide.

### Install tabs
- Text tabs (Claude Code / Codex, Cursor and others / CLI), no background, a 3px bottom border that's transparent at rest and forest-coloured when selected. Full roving-tab-index keyboard pattern (arrow keys, Home/End) is wired in by a small script that also progressively enhances the tabs from a flat, always-visible stack (no-JS fallback shows every panel).

### Cards / Containers
- **Chat panel:** rounded 10px, `forest-deep`-family background, "you" bubbles right-aligned with the pulled-corner radius; "agent" bubbles unboxed, just coloured text.
- **Reply card:** paper background, `8px 2px 8px 8px` radius, a red-tinted "Still open" row separated by a hairline.
- **Pen-key chip:** a hand-drawn stroke (not a flat swatch) inside a small white rounded box with its own soft shadow — the pen colour is shown as ink on a scrap of paper, so it reads identically in light and dark theme.

### Navigation
- Flat bar, brand mark + wordmark left, text links right, a sun/moon theme-toggle icon (bespoke inline SVG, not an icon font). On the home page the nav sits transparent over the hero image (`on-forest` variant, white text, inverted mark); everywhere else it is opaque paper-background with dark text. Active page is marked by an ochre underline, not a filled pill or background.

### Marked page (signature component)
`MarkedPage.astro` overlays live, selectable HTML text (not a flattened image) onto a static screenshot of the Switchback renderer's real output, positioned against the renderer's own measured rule-line geometry (`15.20% + (line-1) × 3.3647%` of page height). Each line gets a `kind` (note / struck / ask / stop / crux) that drives colour, an SVG circle/underline/strikethrough annotation, and, when `writing` is set, a one-time clip-path "write-in" animation staggered line by line — suppressed under `prefers-reduced-motion: reduce`. Every appearance of this component (hero, round-trip, Showcase) is captioned "Illustrative example" because the handwriting is authored, not a real returned photo (`site/example/README.md`).

## Do's and Don'ts

### Do:
- **Do** keep trail-ochre rare: one route, one CTA, one highlight colour, never a secondary UI palette.
- **Do** give every tilted "paper" object the two-layer paper-cast shadow (tight contact + soft green-tinted cast); don't substitute a generic drop shadow.
- **Do** caption any handwriting or reply content that is authored rather than a real returned photo as "Illustrative example," per the product's own evidence-grading stance (`PRODUCT.md`).
- **Do** keep Kalam confined to the ink layer and its circled-letter fallback; it is a handwriting prop, not a UI typeface.
- **Do** suppress every entrance/write-in animation under `prefers-reduced-motion: reduce`, as `Hero.astro` and `MarkedPage.astro` already do.
- **Do** draw icons as hand-specified inline SVG paths; never pull in an icon font or a Lucide/Heroicons-style glyph set.

### Don't:
- **Don't** put an eyebrow or kicker above a heading. No section on the built site does this, and the surface brief names it as a deliberate refusal — keep it that way.
- **Don't** reuse pen-blue, pen-red, or crux-yellow for ordinary UI state (links, errors, badges); those colours are reserved for handwritten meaning.
- **Don't** add a new near-white text colour for a dark surface. The build already has an untokenized family of one-off light literals on dark backgrounds (`#f4f8f5`, `#eef4f0`, `#e6efe9`, `#dce8df`, `#d9e7df`, `#cfdcd5`, `#c4d6cc`, `#a9c2b7`, `#9fbab0`) instead of one shared "text on dark" token — treat this as debt to consolidate, not a menu to add to.
- **Don't** assume `privacy.astro` and `changelog.astro`'s footer matches the home page's: their own `<style>` blocks give the footer link colour `#dce8df` with no dark background underneath (unlike `global.css`'s `.site-footer`, which is dark `forest-deep`), so on those two pages footer text is a pale colour over the plain paper background — low contrast in light mode. This is a shipped inconsistency, not an intended two-tone footer.

---

**Not canonized:** `--sb-ask` (`#1f4fbf`) and `--sb-stop` (`#c0332b`) are declared in `tokens.css` but never referenced anywhere in `src/` — the shipped ink colours are `--sb-pen-blue`/`--sb-pen-red` instead. They are left out of this system's palette as dead tokens, not folded in as a second blue/red.
