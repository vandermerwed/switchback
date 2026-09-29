# Proof mode

Put the document on paper with numbered paragraphs and a wide margin, and hand the user their
pens. The reading is theirs: a proof exists so that every paragraph gets a mark, and a mark is a
judgement a skim never makes. You print, you coach the marks, and you wait for the photos.

## 1. Is it a document?

A proof is for prose: a draft, a spec, an essay, a plan, an AI's answer. Code review was routed
away in SKILL.md; a request that turns out to be a diff, a pull request or source code gets the
same one-line decline. Do not fetch the pull request, search for it, or print the diff.

## 2. Find the document

- **A text path:** use a `.md`, `.markdown` or `.txt` path as is.
- **Another file:** do not pass a PDF, Word, HTML or other non-text file to `proof`. Extract its
  text to `switchback/<yyyy-mm-dd>-<slug>/source.md` first and say in one line how you extracted
  it, or ask the user for a text version. A file that is not text is never proofed.
- **Pasted text, or the AI's own last long output:** write it to
  `switchback/<yyyy-mm-dd>-<slug>/source.md` in the user's working directory, and proof that file.
- **Two candidates** (a file and a recent answer, say): name the one you will proof in one line
  and carry on; the user corrects you if you are wrong.

## 3. Proof it

1. Run `switchback profile --json`. Use `kit.paper` with `--paper <A4|Letter>`; a paper size the
   user stated wins. With no profile, use A4.
2. Pick the round by the folder rules in SKILL.md. For a later draft such as `draft-2.md`, write
   `-o <folder>/W2.json`. `switchback proof` numbers pages `W1-P<k>`; after it writes the spec or
   specs, change every page `id` from `W1-` to `W2-` and set `"round": 2` before `validate`.

```
switchback proof <doc> -o switchback/<date>-<slug>/W1.json --paper <A4|Letter> --json
```

It returns `specs`: the spec files it wrote. One file is one proof. More than one means the
document was long and was split into parts (`W1-part1.json`, `W1-part2.json`, …), each a proof of
at most ten pages whose pages say "part N of M". Say so to the user, and build every part.

`--title` sets the title when the document has no heading.

## 4. Validate and build, once per part

For each spec in `specs`, validate and build it as SKILL.md says. A part is built once.

## 5. Coach the marks

Run `switchback legend --json`. Each role has a `proof_label` (the action the mark asks of the AI)
and the user's pen or circled letter from `assignment`. Put them in a table, in this order:

| Mark | Means | The AI then | Pen |
| --- | --- | --- | --- |
| Ask | a numbered question in the margin | answers it | the user's Ask pen, or a circled Q |
| Stop | wrong, risky, not understood | challenges it: fact-checks, steelmans the other side, cites or retracts | … |
| Keep | good, true, worth more | goes deeper: expands, finds support | … |
| Crux | the one thing that matters | re-centres the piece around it | … |
| Maybe | a what-if | explores: two or three alternatives | … |
| Sense | a gut reaction | justifies the reasoning behind it | … |
| Draft | an edit written in | applies the edit as written | … |
| ✕ through a paragraph | cut it | cuts it in the next draft | any pen |
| ○ round a paragraph | lock it | never changes it | any pen |

Fill the Pen column of the seven role rows from the legend, never from memory; ✕ and ○ take any
pen. Then three lines of coaching:

- **Every paragraph gets a mark.** A tick counts. An unmarked paragraph is one that was skimmed.
- **Ask questions are numbered** (Q1, Q2, …) so the answers can be matched to them.
- **Phone in another room; pen, not pencil, unless Draft is the pencil.** Cross-outs stay.

## 6. Send back

Say: photograph every page flat, page ID visible, and send them all together. The read-back
turns the marks into an action queue in the order above. It answers the questions and lists the
cuts, locks and edits at once, and asks before it starts any challenge, going deeper or other
research.

## 7. The done message

One message: where the PDF is (or the HTML and the print steps), with no profile that the paper
is A4, and for a split document how many parts and their files; the marks table; the three coaching lines; the send-back line. No
summary of the document, no opinion on it, no offer to read it first.

## Done when

Every part has a PDF (or HTML with print steps) in `switchback/<date>-<slug>/`, and the user has
the marks table and knows to send the photos back.

## Common mistakes

| Mistake | Instead |
| --- | --- |
| Hunting for the PR, the repo, or the diff to print it | One line, the code-review tools, stop |
| Skimming the document and flagging the shaky parts "to help" | The reading is the user's; your view waits for the marks |
| Specs and PDFs in the working directory root | `switchback/<date>-<slug>/`, from `proof -o` onwards |
| Building each part twice (once for HTML, once for `--pdf`) | One `build --pdf` per part |
| Pen colours from memory ("blue for questions") | The Pen column comes from `switchback legend --json` |
| Building part 1 and mentioning the rest | Every part is built before the done message |
