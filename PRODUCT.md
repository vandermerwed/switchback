# Product

<!-- impeccable:product-schema 1 -->

## Users

People who spend much of their working day with AI agents and feel that moving between agent requests leaves too little time for reflection and sustained thought. The motivating example is a programmer who misses becoming immersed in one problem and wants to step out of the agent coordination loop long enough to think deeply.

## Product Purpose

Switchback makes room for deliberate, absorbing work within an AI-assisted workflow. An agent prepares a focused paper workbook or a document proof; the person works it by hand away from the screen; then the agent reads photographs of the marked pages and continues the collaboration. Success means the person can do meaningful thinking on paper and return to the agent without losing the questions, decisions, or unresolved concerns they recorded there.

## Positioning

The product is the complete paper-to-agent loop, rather than a collection of printable worksheets. It chooses and composes pages for the task and the stationery available, gives the human space to think in ink, and uses the marked pages to guide what the agent does next. Where a component or style makes a claim, it carries an explicit grade and sources. Practical templates make no claim and say where they come from.

## Operating Context

- Work starts in an AI-agent conversation. The person prints a workbook or numbered, wide-margin proof pages, works with the pens and paper on their desk, photographs the pages, and returns the photos for readback.
- A saved desk profile records available paper, pens, and other stationery. Printed sidecars record what was made so readback can interpret the returned pages against the actual print.
- The delivery is one agent skill, `/switchback`, with four modes (workbook, proof, read, desk), backed by the `@vandermerwed/switchback` CLI.

## Capabilities and Constraints

- Workbooks support Sitting, Series, Incubation, and Ritual; Proof supports marking up a document. The CLI builds print-ready HTML and PDF, validates workbook specs, prepares phone photos for readback, and shows the current pen legend.
- The printed page asks for the human's thinking; it does not prefill the answer. One page holds one thinking move. The printer uses black on white; handwritten colour carries meaning, with letter codes when a matching pen is unavailable.
- Readback answers marked questions first, separates feedback about the page from feedback about the underlying work, carries unresolved concerns forward, and asks before running the research actions in a proof's action queue.
- **Open decision:** No user-facing digital interface or interface platform has been chosen. The current product is delivered through agent skills, a CLI, and printable pages.

## Brand Commitments

Switchback is the product name; Longhand was its working title. The established category phrase is “programmable stationery.”

## Evidence on Hand

- [`README.md`](README.md) and [`CONTEXT.md`](CONTEXT.md) describe the current loop, terminology, and delivery. The skill in [`skills/switchback`](skills/switchback) and the CLI in [`packages/switchback`](packages/switchback) implement the present workflow.
- [`packages/switchback/research`](packages/switchback/research) records sources and graded claims for components and styles. The grades distinguish robust evidence from practice with weaker or no direct study support.
- The desire for deeper, more satisfying work amid frequent agent handoffs is a first-person product motivation. A research-backed claim that Switchback creates flow or improves outcomes has not been established here and should not be asserted without evidence.

## Product Principles

1. Reserve the sustained thinking for the person; let the agent prepare the paper and resume from what the person actually wrote.
2. Fit the method to the problem and the real desk, including a usable path with a single pen.
3. Preserve questions, objections, decisions, and uncertainty across the paper-to-agent handoff.
4. Grade claims honestly where a template makes them; let practical templates make none, and keep unproven benefits distinct from user motivation.

## Accessibility & Inclusion

Colour is optional for interpreting handwritten roles: each role has a letter-code fallback. Printable output supports A4 and Letter paper, and components can use alternatives when particular stationery is unavailable.
