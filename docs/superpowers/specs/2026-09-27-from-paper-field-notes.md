# from-paper field notes: the first real read-backs

**Date:** 2026-09-27
**Status:** requirements input for sub-project 3 (the `from-paper` skill). They add to the umbrella spec §10 and do not replace it.

The source is one session in which the user sent back two batches of phone photos:

1. The filled-in round-1 workbook, "What should slow become next?". It was printed by the old `slow` renderer. The batch held the cover and pages P2 and P4 to P9; P3, the die page, was not photographed.
2. A photo of a planning board: an A3 sheet with a diagram, and index cards pinned around it.

The old `slow/from-workbook` skill already covers some rules: answer blue first, flag missing pages, don't over-read, and ask for a re-shoot when colour is ambiguous. Everything below is new.

## 1. Getting the image in

- **Detect the format from the file's bytes, not its extension.** Every photo arrived as HEIC (the iPhone default) under a `.png` name, and the image reader rejected all of them. Check the magic bytes: `ftypheic` / `ftypmif1` at offset 4 means HEIC or HEIF.
- **Normalise every photo before reading it:**
  - convert HEIC to JPEG;
  - apply the EXIF orientation, or portrait pages come out sideways;
  - downscale to about 1800 px on the long edge.

  In this session Python `pillow-heif` plus `ImageOps.exif_transpose` did the job. In the TS CLI this probably belongs in a helper, for example `longhand photos <files…>` → normalised JPEGs. Prebuilt `sharp` has no HEIC decoder, so it would need a wasm decoder such as `heic-convert`.
- **Copy or convert the photos into the working directory first.** Pasted images live in OS temp paths that can disappear.
- **Read in two passes when the handwriting is small.** A downscaled whole image shows the layout. For the 4032×3024 board photo, the small handwriting needed crops at native resolution: quadrants, or the region around each card. Whole workbook pages at 1800 px read fine.

- **Turn each page upright by its content, not by the photo's EXIF.** The naming workbook's landscape word cloud (2026-09-27) came back in a portrait photo, rotated 90°. EXIF orientation was correct for the camera, but the page was sideways. Rotate until the page header and ID read left to right.

## 2. Calibrating the colour

- **Map inks from the human's own swatches, not from the suggested colour names.** The cover's "colour each box with the pen you will use" swatches were the ground truth. Blue marks matched the Q swatch, red matched R and orange matched O.
- **When the cover's swatches don't come back,** calibrate from each page's own instruction ("circle in your Keep pen") and from context. Say you did this in the photo test. The naming workbook returned only P2–P4.
- **The colour language travels off the workbook.** The user wrote on a board and loose index cards with the same inks: black for their thinking, blue for questions and comments to the AI, orange for ideas. `from-paper` must accept free-form photos with no page IDs and no sidecar. It should apply the saved colour key and identify regions by position ("top-left card").

## 3. Two kinds of mark on the same page

A human marks up the problem and the page itself, in the same inks.

- **About the problem:** content, answered and carried forward as the umbrella spec already describes.
- **About the page or component:** "Columns are too small. Landscape?", "This is not a good question", "The questions are bad", "This can be phrased better", "Nothing to photograph — dice page". These are product feedback. Route them to a separate section of the read-back and map each one to its component. Don't answer them as content, and don't drop them.

When mapping page feedback, **check it against the current component version.** This workbook was printed by an older renderer. One note had already been fixed (`commit`'s "first physical action" prompt), and the others were still true. The sidecar should record the CLI and component versions so that this check is mechanical.

## 4. Completeness

- **Only pages with something to write on count as missing when unphotographed.** The die (a `piece`) had nothing to photograph, and the user said so in red on the return checklist. Use the sidecar to decide which pages are expected back. The `return-checklist` component has the same bug: it lists every page ID.

## 5. Answering blue

- **Some blue questions need research, not recall.** Examples: "Does this exist?" and "Is this just the Claude marketplace?". Send those to a cheaper research subagent that returns sources, and answer when it reports back. Tell the human it is running rather than guessing. Every research brief carries the rule: never send any personal identifier (email, name) to an external service.
- **Blue that isn't a question** ("Skill bloat cleanup", "Not technically paper…") is still addressed to the AI. Treat it as a comment to acknowledge and act on, not as noise.

## 6. Reporting what was read

The read-back that worked had this order:

1. **The photo test.** Say what survived the photo and what didn't. Also say where the reader was tempted to over-read, and don't interpret those spots. Examples: struck-out words; every confidence written as 50% except one.
2. **Blue answers.**
3. **Page feedback,** as a table: page, note, whether it is still true in the current version, and where it gets fixed.
4. **The content itself:** decisions, ideas (orange), and commitments.
5. **The next step,** as a confirmed action queue or one question.

Two more rules:

- **Write the read-back somewhere durable,** next to the sidecar (`W<n>.readback.md`) or into the project's memory, not only into chat. The next session needs it.
- **Quote the human's words exactly** when they're load-bearing ("tying it to my skills collection was the wrong move"). Paraphrasing them into stronger or softer claims is over-reading.
