# The action queue (proofs)

A proof comes back as marks beside numbered paragraphs. Each page's `data.blocks` in the sidecar carry every
paragraph's number (`n`) and text, so each row of the queue quotes the exact paragraph. The
sidecar's `pens` and `switchback legend --json` give each role's `proof_action` and `proof_label`.

## Priority

Rows are ordered by the role's priority, then by paragraph number:

| # | Mark | Action | Cost |
| --- | --- | --- | --- |
| 1 | Ask (Q1, Q2, …) | answer | quick |
| 2 | Stop | challenge: fact-check, steelman the other side, cite or retract | research |
| 3 | Keep | go deeper: expand, find support | research |
| 4 | Crux | re-centre the piece around it | research |
| 5 | Maybe | explore: two or three alternatives | research |
| 6 | Sense | justify the reasoning behind it | research |
| 7 | Draft (an edit written in) | apply the edit as written | quick |
| 8 | ✕ through a paragraph | cut | quick |
| 9 | ○ round a paragraph | lock: never change it in the next draft | quick |

A tick, or a paragraph with no mark, is "read": no row.

## The format

```
#  Mark       Where  Quote                                   Action        Cost
1  Q1 blue    ¶4     "cuts support tickets by a third…"      answer: why?  quick
2  red        ¶2     "moving the payment step to the end…"   challenge     research
3  ✕          ¶5     "Search latency on the largest…"        cut           quick
Run all? (or "all except 2")
```

The Quote column holds the first words of the sidecar block, enough to recognise it; the full
text is in the sidecar. Where the human wrote words beside the mark ("why?", "source?", "this
contradicts ¶9"), they go in the Action column after the label.

## Running it

- **Quick actions run at once**, in the same message as the queue: answer the Ask rows in number
  order, and list the cuts, the locks and each Draft edit exactly as it will be applied. The
  edits themselves land in the next draft.
- **Research actions wait.** Show the queue and the line "Run all? (or 'all except N')". Do not
  start a challenge, a go-deeper or an explore before the human says which. A queue with no
  research rows ends instead with "Write the next draft?".
- A challenge is done honestly: if the claim holds, say so and cite; if it does not, retract it
  in the next draft. A Stop mark is not an instruction to agree.

## The next draft

When the human answers that line, write the next draft as a new file in the folder (`draft-2.md` beside
the original; never overwrite the original), with:

- every ○ paragraph unchanged, word for word;
- every paragraph whose only mark was an Ask unchanged too: the answer lives in the read-back,
  and the paragraph changes only if the human's question was an edit ("cut this sentence?");
- every ✕ paragraph removed, and listed at the end of your message as "cut: ¶n";
- every Draft edit applied as written;
- the challenge, go-deeper and explore results worked into the paragraphs they were marked on.

Then offer to print it again: proof mode on the new file makes `W2`, and the loop continues.
