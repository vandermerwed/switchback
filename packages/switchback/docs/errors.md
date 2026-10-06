# Switchback diagnostics

Every problem `switchback build` and `switchback validate` report has this shape:
`{ level, code, page, path, message, fix }`. With `--json` they are returned as a list, and agents act on `fix`.

## Spec errors

| Code | Meaning | Typical fix |
| --- | --- | --- |
| `E_SPEC_READ` | The spec file is missing or could not be read. | Check the path and try again. |
| `E_SPEC_JSON` | The spec file is not valid JSON (the parser message is included). | Fix the JSON syntax, or start from an example. |
| `E_SPEC_SCHEMA` | The spec does not match the v1 format (the `path` points at the field). | Correct the field. |
| `E_LEGACY_KEY` | A pre-v1 key (`archetype`, `stationery`, `kind`, `meta`) or a missing `"switchback": 1`. A spec from before the rename carries `"longhand": 1`; rename the key to `"switchback"`. | Follow the `fix`: `archetype` → `component`, `stationery` → `kit`… |
| `E_DUPLICATE_ID` | Two pages (or two registry entries) share an id. | Make ids unique, e.g. `W1-P3`. |
| `E_UNKNOWN_STYLE` | `style` is not in `registry/styles.json`. | Use `sitting`. |
| `E_UNKNOWN_COMPONENT` | The page names a component or preset that does not exist. | `switchback list`. |
| `E_RENAMED` | The page names a component merged into another (`tracker` → `scoresheet` `running`; `meeple` → `perspective-swap` `tent`). `switchback show tracker`/`show meeple` report the same rename. | Follow the `fix`: use the new component and variant; it also names what changed in the data fields. |
| `E_DATA_SCHEMA` | A page's `data` does not fit the component's schema. | `switchback show <id>` lists the fields. |
| `E_UNKNOWN_VARIANT` | `variant` is not one of the component's variants. | Use a listed variant, or omit it. |
| `E_VARIANT_UNSATISFIED` | The requested variant needs stationery the kit lacks. | Omit `variant` to fall back, or add the stationery. |
| `E_NO_VARIANT` | No variant fits the kit. | Drop the page, or use a suggested alternative. |
| `E_BUDGET` | More pages than the style allows (Sitting 10, Series 6 per round, Incubation 10, Ritual 1, Proof 10). | Cut pages that produce material before those that force a decision. |
| `E_STYLE_PHASE` | A page's phase (diverge/converge) is not allowed in its section of the style, e.g. a diverge page after an Incubation's break. The message names the claim and its grade. | Swap the page, or move it to the other side of the split. |
| `E_STYLE_FORBID` | A component the style forbids in that section, e.g. `timer` before an Incubation's break. | Remove it, or move it after the split. |
| `E_STYLE_SPLIT` | The style needs exactly one split page (Incubation: `step-away`), and the spec has none or several. | Put one split page between the two halves. |
| `E_STYLE_ALLOW` | The style allows only certain components (Ritual: check-in or scoresheet; Proof: proof or question-queue). | Use an allowed component, or choose another style. |
| `E_ZONES_LAYOUT` | A zones layout cell runs past column 10. | Keep col + colSpan − 1 ≤ 10. |

## Proof errors

| Code | Meaning | Typical fix |
| --- | --- | --- |
| `E_PROOF_READ` | `switchback proof` could not read the document. | Check the path. |
| `E_PROOF_EMPTY` | The document has no text to proof. | Give it at least one paragraph. |

## Media errors (`switchback media`)

| Code | Meaning | Typical fix |
| --- | --- | --- |
| `E_MEDIA_READ` | A photo could not be read, or is empty. | Check the path, or re-export it. |
| `E_MEDIA_FORMAT` | A photo is WebP or an unrecognised format. | Convert it to JPEG first. |
| `E_MEDIA_DECODE` | A JPEG, PNG or HEIC could not be decoded. | A JPEG or PNG looks damaged: re-export or re-take the photo. A HEIC: convert it to JPEG with another tool first. |

## Warnings

| Code | Meaning |
| --- | --- |
| `W_OPENING` | The spec does not open with the style's opening pages (e.g. a Series round not starting with a retrieval page). |
| `W_CLOSING` | The spec does not end with the style's closing pages (Sitting: commit → question-queue → return-checklist). |
| `W_STYLE_EMPTY_SECTION` | A half of a split style has no page of its own: before an Incubation's `step-away` there is only the opening `cover` ("nothing to generate before the break"), or after it only the closing pages ("nothing to judge after the break"). Add a generating page before the break, or a judging page after it. |
| `W_SUBSTITUTION` | A fallback variant was used because stationery was missing. |
| `W_UNASSIGNED_PEN` | A pen in the kit has no colour role. |
| `W_NARROW` | card-sort's index-cards variant whose piles are narrower than an index card (about 76mm). Card sorts with 3 or more piles print on a landscape page, which fits 3 piles of index cards; with 4 or 5, use the write-in variant. |
| `W_NO_BROWSER` | `--pdf` found no Chrome, Edge, or Chromium; the HTML was still written (exit 3). |
| `W_PDF_FAILED` | `--pdf` found a browser, but launching or rendering it failed; the HTML was still written and no stale PDF is left behind (exit 3). |
| `W_ZONES_COLUMNS` | zones with `columns: 1` and more than 5 zones; printed in 2 columns instead. |

## Environment errors

| Code | Meaning | Fix |
| --- | --- | --- |
| `E_PROFILE_INVALID` | The saved profile is not valid JSON, or is from a newer CLI. | `switchback init --force`, or upgrade. |
| `E_PROFILE_IMPORT` | `profile --import` got invalid JSON, or a file that is not exactly the profile shape (`version: 1`, a valid `kit`, optional string `defaults.style`/`defaults.sitting`, no other keys); nothing was written. A successful import first backs up the profile it replaces to `profile.json.bak`. | Fix the file; see `switchback profile --json` for the shape. |

## Registry errors (`switchback validate` with no spec)

| Code | Meaning |
| --- | --- |
| `E_NO_RENDERER` | A component folder has no `render.ts`. |
| `E_COMPONENT_SCHEMA` | A `component.json` does not match the component schema. |
| `E_PRESET_SCHEMA` | A preset file does not match the preset schema. |
| `E_GROUNDING_SCHEMA` | A style, protocol or the collection carries a grounding block that doesn't match the grounding schema. Fix the grounding block in `research/grounding.json` and re-run `pnpm apply-grounding` — but a style or component with no entry there is left as is, so fix that one in place instead. |
| `E_UNKNOWN_TAG` | A tag is not in `registry/tags.json`. |
| `E_UNKNOWN_TOKEN` | A `requires` entry names unknown stationery. |
| `E_DATA_SCHEMA_INVALID` | A component's `data` JSON Schema does not compile. |
| `E_NO_EXAMPLE` | A component has no examples. |
| `E_EXAMPLE` | An example (or preset) no longer builds. |
| `E_UNKNOWN_BASE` | A preset `extends` a component that does not exist. |
| `E_STYLE_SCHEMA` | A style in `registry/styles.json` does not match the style schema (unknown field, wrong type). |
| `E_STYLE_CLAIM` | A style rule or note cites a claim id that is not one of the style's grounding claims. |

## Strict grounding errors (`switchback validate --strict`)

| Code | Meaning | Fix |
| --- | --- | --- |
| `E_STRICT_NO_CLAIMS` | No grounding claims yet. | Grade it through `research/grading` (see "Grounding a new item" below). |
| `E_STRICT_HELPS` | `helps` or `backfires` is empty. | Write them through `research/grading` (see "Grounding a new item" below). |
| `E_STRICT_UNRATED` | A claim has not been graded A–D. | Grade it through `research/grading` (see "Grounding a new item" below). |
| `E_STRICT_NO_SOURCE` | A–C claims need a DOI; D claims need a DOI, ISBN, or URL. | Cite a verified source (`pnpm check-dois --doi <doi> --cite "<cite>"` first). |

## Grounding a new item

A new component, preset or style needs a graded entry before `validate --strict` will pass. Variants, protocols and the collection may carry one too, but strict mode doesn't require it. Run every step from `packages/switchback`:

1. Add the claims and the item entry to `research/grading/<family>.json` (creating the family if it's new), with a note in `research/<family>.md`.
2. Run `node research/tools/build-grounding.mjs` to merge the grading files into `research/grounding.json` and compute the displayed grade.
3. Run `pnpm apply-grounding` to merge `research/grounding.json` into the item files.
4. Format what it wrote: `npx biome format --write components presets registry`.
5. Run `pnpm check-dois` to verify every DOI.
6. Run `pnpm validate:strict` to confirm it passes. From the repo root, `pnpm validate` runs the same check.

Verify every DOI, ISBN and URL against the source itself before writing it — `pnpm check-dois --doi <doi> --cite "<cite>"` checks one DOI on demand — and never write one you haven't verified (research spec §7.2).
