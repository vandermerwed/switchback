# Switchback landing page

**Status:** Contour Return composition and lower-section refinement approved for implementation

**Approved composition:** `.impeccable/mocks/contour-return-polished.png`, preserving the hero of `.impeccable/mocks/decision/contour-return.png`. The hero's terrain, route, large marked page, left-aligned message, and readback placement are the spatial reference. The off-white lower section begins quietly with a large heading and one paper/readback example extending below the viewport. Generated text and paper details in either comp are illustrative, not implementation assets.

**Date:** 2026-09-28

**Scope:** the first page at `switchback.page`, not the full documentation site or the product rename

## Intent

Switchback is for people whose work with AI agents has become a sequence of handoffs and interruptions. The page should make one proposition clear: a deliberate paper session can put useful friction back into that workflow, giving the person time to think before returning to an agent with clearer intent. This is the user's motivation, not a measured claim that Switchback causes flow or improves outcomes.

The product is the **round trip**. An agent prepares pages for the current problem; the person steps away from the screen and works in ink; the agent reads the returned pages and continues from the person's questions, decisions, and unresolved concerns. The mountain switchback is a metaphor for a sustainable way through difficult terrain, not a sequence of product milestones. The route must visibly turn back between paper and agent.

A first-time visitor should understand that loop, see a believable example of it, and know how to install Switchback when the rename and publication are complete.

## Chosen approach

Build a focused, static, persuasive landing page in `site/`, using the Astro static-site approach already proposed for this repository. This first slice does not implement the earlier full docs and pattern-library plan. It supersedes the old spec's *site* visual treatment, while preserving the printed pages' black-on-white typography, page IDs, registration marks, and ink legend.

The page is a **worked round trip**, not a feature catalogue. One concrete problem carries the story from agent request to printed page, handwritten marks, photograph, and readback. A small amount of copy explains why the deliberate pause matters. Install is the only primary conversion action. The site must remain intelligible as a static page, with JavaScript and motion unnecessary for comprehension.

Two alternatives were considered and set aside:

1. A mountain-first campaign would be atmospheric but could leave visitors unsure what Switchback actually does.
2. A field-guide/catalogue page would explain the components and future possibilities but would make the landing page feel like a product roadmap.

The worked round trip keeps the mountain setting and the product mechanism in the same frame.

## Page narrative

1. **First viewport — the deliberate turn.** A clear headline about stepping away from agents and returning with a clearer thought; one sentence describing the paper-to-agent loop; an install action. One route crosses a forest-green contour field from agent prompt through a large real Switchback page to its marked return and readback. The route visibly changes direction; the page and return remain more important than the terrain.
2. **One round trip — show the handoff.** Present one specific, non-sensitive example in three connected moments: the agent's focused question and printable page; the person's marked page; the agent's readback and next move. The printed page should come from the current renderer. The marked page and readback must be a matched pair. If the marks are authored for demonstration rather than captured from actual use, label the example as illustrative.
   The section begins on a quiet off-white field immediately after the hero. Use the heading “Same terrain. A clearer next step.” and a single large, readable paper/readback pairing that continues below the viewport. Do not reproduce the original comp's clipped stack of tiny generated pages or turn this into a feature grid.
3. **The useful pause.** Briefly explain that Switchback interrupts the rapid handoff cycle where the human thinking happens. The copy should invite sustained attention without attacking AI agents or promising a clinical or productivity outcome. The visual pacing should become quieter here, like reaching a trail rest, before returning to the working example.
4. **The working ink language.** Inside the example, identify only a few marks that materially affect the readback: a blue Ask answered first, a red Stop carried as unresolved, and a highlighted Crux that recentres the response. Show each with a text label or letter code, never colour alone. This is where “programmable stationery” earns a short explanation: physical marks carry agreed meaning back to the agent. It is not the hero promise or a separate speculative feature list.
5. **Return and install.** Close by restating the loop in plain terms and offering the verified Switchback installation route. The final action should feel like beginning a sitting, not signing up for an imagined platform.

Navigation should stay minimal: Switchback, How it works, and Install. Add documentation or GitHub links only when their destinations exist. The install action may link to an on-page install section, but the publicly shipped command and destination must be verified after the rename; no Longhand command should be presented as an already-shipped Switchback command.

## Visual and interaction direction

The selected world is **Contour Return**: dense, precise topographic linework on a deep forest-green field, with one ochre route that makes the back-and-forth legible. It evokes mountain terrain without turning the hero into a stock landscape photograph. The paper itself stays clean black-on-white. Site colour comes from the terrain, route, and actual ink marks. Keep the printed page's proportions and marks recognizable rather than recasting it as a web card. The first viewport must be product-specific even if the contours are removed.

The route line is a compositional device linking the agent, page, and return. It must not turn into a linear stepper, a feature timeline, or a map of unreleased capabilities. The site should have one memorable demonstration, then close. Responsive layouts should preserve the same reading order, with the paper example large enough to inspect on a phone.

The recorded design preference is **image composition first**. Three compositions in this world were compared, and the user selected the original Contour Return hero with the quieter lower-section refinement. Reuse the actual rendered page as an input or exact reference for the final composition; illustrative map material must not alter what the product prints or reads.

Motion and video are deferred enhancements. The static route and example must communicate every relationship. A later animation could trace the turn from agent to paper and back, or a short silent demonstration could show marking and readback, provided it adds understanding rather than atmosphere. Any motion must respect reduced-motion preferences; no autoplay video is required for launch.

## Content and product-truth rules

- Demonstrate current ink and structural-mark semantics only. Card proximity, paperclips, and notes invoking agent profiles are a direction for future protocol design, not launch capabilities. They do not appear as functioning commands or simulated readbacks on this landing page.
- Do not imply that Switchback automatically detects handwriting perfectly. The readback should show the actual photo-to-agent workflow and its uncertainty where relevant.
- Do not claim proven flow, productivity, or psychological benefits. The user's desire for deeper thought is the framing; any later research claim needs an explicit source and careful transfer statement.
- Keep the action truthful during the rename. Building the page locally can precede publication, but public release waits for the package/skill rename, a verified installation command, and working destinations.
- Use a real generated print page and a matched annotated/readback example. Do not use a decorative fake page with impossible mark semantics. Record the source and permissions of every shipped image.

## Implementation boundary

The first build adds only the landing page, its local assets, and the minimal workspace wiring needed to build and preview it. It does not rename packages or skill IDs, build the complete documentation IA, add analytics, create a waitlist, or implement a new spatial/paperclip protocol. A host-agnostic static build is the output; deployment to `switchback.page` is separate.

The page can use semantic HTML and CSS with minimal client-side JavaScript. Generated print content is an asset/source of truth, not a runtime dependency on the CLI in a visitor's browser. Preserve accessible headings, focus states, text alternatives for the demonstration, usable contrast, and a meaningful no-motion experience. Avoid inaccessible text baked solely into a bitmap: the key problem, marks, and readback must also be real page text.

## Verification and release gates

Before calling the landing page ready, verify:

- A first-time visitor can explain what Switchback is, why the pause exists, and what to do next from the first viewport and worked example.
- The printed example matches the renderer, and every displayed mark has the meaning and priority shown in the corresponding readback.
- Desktop and mobile renders preserve the page's hierarchy and legibility; keyboard navigation, contrast, text alternatives, and reduced-motion behavior work.
- The static build succeeds and every visible link resolves.
- The public install command works under the Switchback name. Until it does, the page remains an unlaunched preview rather than shipping a broken primary CTA.

The scope is intentionally small: one honest loop, one reason to make the turn, one action.
