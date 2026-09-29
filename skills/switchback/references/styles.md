# The four workbook styles

The CLI enforces each style's shape in `switchback build` and `switchback validate`: an opening or
closing slot that is unmet is a warning (`W_OPENING`, `W_CLOSING`); a page in the wrong half, a
forbidden piece, a missing split page or a page the style does not allow is an error
(`E_STYLE_PHASE`, `E_STYLE_FORBID`, `E_STYLE_SPLIT`, `E_STYLE_ALLOW`); more pages than the budget
is `E_BUDGET`. Every message names the research claim and its grade, and carries a `fix`. Read
them and do what they say.

Components are listed by `switchback list --json --fits-kit` with their `tags` and `phase`
(`diverge`, `converge`, `either`). The fifth style, Proof, belongs to proof mode ([proof.md](proof.md)).

## Sitting: decide, diagnose, plan

- **Budget:** 10 pages, cover and closing included.
- **Opening:** `cover`. **Closing:** `commit` → `question-queue` → `return-checklist`.
- **Timebox:** the profile's default sitting (40 minutes unless changed); each page carries its
  own minutes.
- **Starting set for a decision:** `brain-dump` (empty the tank) → `options-criteria` or
  `matrix-2x2` (score the paths) → `assumption-audit` (what has to be true) → `pre-mortem`
  (it is six months later and it failed) → `commit`.
- **For a diagnosis:** `brain-dump` → `five-whys` or `frame-by-frame` → `assumption-audit` →
  `small-experiment` → `commit`.
- **For a plan:** `goal-factoring` → `timeline` → `pre-mortem` → `mental-contrast` → `commit`.
- **Why it works:** a written if-then plan at the end (implementation intentions, grade A); a
  fixed time to stop deliberating; the phone in another room.

## Series: remember something over weeks

- **Budget:** 6 pages per round.
- **Opening:** `cover`, then one of `free-recall`, `feynman` or `self-explain`. The recall page
  opens every round; in round 1 it works as a test before any study.
- **Closing:** `question-queue` → `return-checklist`.
- **Cadence:** three rounds: round 2 about a day after round 1, round 3 about three days after
  round 2, and, if the deadline allows, a fourth about a week after that. Say the dates. A round
  is 20 to 40 minutes.
- **Starting set, round 1** (six pages, the most a round holds; two content pages is a fine
  round): `cover` → `free-recall` (topic, a few cue prompts; the `cued` variant) → `node-map`
  (the shape of the subject) → `self-explain` or `feynman` → `question-queue` →
  `return-checklist`.
- **Round 2 and 3:** a new spec (`W2.json`, `round: 2`), opening with recall aimed at the gaps
  the read recorded in `carry.md`, then one page on those gaps and `practice-audit` (what to
  study before next time).
- **Why it works:** recalling before rereading (testing effect, grade A); spacing the rounds
  (distributed practice, grade A).

## Incubation: create, name, invent

- **Budget:** 10 pages, both halves together.
- **Opening:** `cover`. **Closing:** `commit` → `question-queue` → `return-checklist`.
- **The split:** exactly one `step-away` page. Before it, only `diverge` or `either` pages, and no
  `timer`. After it, only `converge` or `either` pages, marked "after the break" by the CLI.
- **The break:** `step-away` takes a `suggestion` (a walk, chores, sleep on it). It comes back
  with the photos: it collects what surfaced while away.
- **Time:** each half fits one sitting on its own; the `timebox` is the active time, the break
  not counted ("2 × 30 min").
- **Starting set:** `brain-dump` → `ten-bad-ideas` → `forced-connections` or
  `constraint-removal` → `step-away` → `card-sort` (the candidates from the first half, named as
  the source) → `options-criteria` (the survivors) → `commit`.
- **Why it works:** a real break between generating and judging (incubation effect, grade B);
  time pressure while generating reduces output (grade C), hence no timer before the break.

## Ritual: the same question, weekly

- **Budget:** 1 page. No cover, no closing pages.
- **Allowed:** `check-in` (rows to rate, a scale, "what changed", "next time start from") or
  `scoresheet`.
- **Cadence:** weekly by default, 10 minutes or less. For a later round, copy `W1.json` to
  `W<n+1>.json`, set `round` to n+1 and renumber the ids; change nothing else, so change shows
  across returns.
- **Why it works:** an identical page makes change visible (progress monitoring, grade B); the
  closing "next time, start from" line is a resumption cue (grade B).

## Pieces

`kind: piece` components sit on the table through the sitting rather than being filled in once:
`timer` (a dial to move a marker round), `tokens` (a budget to spend: coins, cut-outs or tallies),
`zones` (places to put cards or notes), `scoresheet` (rate now, rate again at the end),
`player-aid` (the legend beside you), `stimulus-die` (needs scissors and tape). They count toward
the budget. `timer`, `player-aid`, `stimulus-die` and `return-checklist` do not come back in the
photos; the CLI knows which pages return.
