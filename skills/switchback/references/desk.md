# Desk mode

One conversation, one write. Read what is on the desk, import the profile, show the user their
key. A black pen and a highlighter is a complete kit, so setup is quick and never blocks the work.

## 1. Read the current profile

Run `switchback profile --json`.

- `"profile": null` means there is no profile yet. Say so in one line. The `kit` and `pens` it
  still prints are the minimum-kit fallback, not something the user chose.
- Otherwise summarise the saved `kit` in one line ("A4, mono, black and red pens, a highlighter"),
  so the user only tells you what changed.

`--import` in section 4 is the only write this mode makes. It replaces the whole profile in one
go and backs the old one up to `profile.json.bak`. Do not probe with `--set`, do not run `init`,
and never delete the profile file: the CLI's own errors tell you every accepted key and value.

## 2. Ask one batched question, or none

Decide from the user's message:

- **They listed their desk** ("a mono printer, A4, black, blue, red and green pens, a highlighter,
  scissors"): ask nothing. Take the list, fill the gaps with the defaults below, and say which
  gaps you filled.
- **They waved it off** ("just use whatever", "defaults", "don't ask"): ask nothing. Use the
  minimum kit and say so.
- **Anything else**: send one message that covers the whole desk, with concrete suggestions so they
  can answer by pointing. Ask nothing after it.

> What's on your desk? Reply with what you have; I'll assume the rest.
> - Printer: black only, or colour? Paper: A4 or Letter?
> - Pens: which colours? (blue, red, green, orange, purple and a black pen each unlock a role)
> - A highlighter? A pencil?
> - Scissors? Tape or glue? Sticky notes? Index cards? A few coins?
> - A timer or clock? Wall or whiteboard space? A phone camera for sending pages back?

**Defaults for anything unanswered** (state each one you use): A4, mono printer, one black pen,
a highlighter, a phone camera; no pencil, scissors, tape, glue, sticky notes, index cards, coins,
timer or wall space; default style `sitting`, default sitting `40 min`.

What each item unlocks, and how the pages change with and without it, is in
[stationery.md](stationery.md). Read it when the user asks why you want to know, or asks what
would be worth adding.

## 3. How pens become roles

The CLI assigns pens to roles itself, in priority order: **Ask > Stop > Keep > Crux > Maybe > Sense >
Draft**. Each role takes the first unused pen of its suggested colour:

| Role | Meaning | Suggested pen |
| --- | --- | --- |
| Ask | a numbered question for the AI | blue (reserved for Ask whenever there is a blue pen) |
| Stop | blocker, risk, not understood | red |
| Keep | evidence, confident, it worked | green |
| Crux | the one thing that matters | the highlighter (any colour) |
| Maybe | an idea, a what-if | orange |
| Sense | gut feeling | purple |
| Draft | provisional | grey, or the pencil |
| Reason | what you think; the main content | black, always |

A role with no pen gets a circled letter (Q, R, G, X, O, P, D) in any ink. That is fine: a black pen
and a highlighter is a complete kit.

To put a pen on a different role, give that pen a `"role"` in the kit (`{ "colour": "pink", "role":
"stop" }`). A pen with a `role` keeps it; the rest are matched by colour as above. Show the mapping
in the done message (section 5) and offer a swap there. A swap is a second import with `role` set,
not a second question.

## 4. Write the profile

Build the whole profile and pipe it to `switchback profile --import -`. The shape is exactly this,
and no other keys are accepted anywhere in it:

```bash
switchback profile --import - <<'EOF'
{
  "version": 1,
  "kit": {
    "paper": "A4",
    "printer": "mono",
    "pens": [
      { "colour": "black" },
      { "colour": "blue" },
      { "colour": "red" },
      { "colour": "green" }
    ],
    "highlighter": true,
    "pencil": false,
    "scissors": true,
    "tape": false,
    "glue": false,
    "index_cards": false,
    "sticky_notes": false,
    "coins": false,
    "timer": false,
    "wall_space": false,
    "camera": true
  },
  "defaults": { "style": "sitting", "sitting": "40 min" }
}
EOF
```

- `paper` is `A4` or `Letter`; `printer` is `mono` or `colour`; every other kit key is a boolean.
- A pen is `{ "colour": "<word>" }` with an optional `"role"`. Colour only: no brand, no width.
  The highlighter is a boolean with no colour, so "a yellow highlighter" is `"highlighter": true`.
- If a shell will not take the heredoc, write the JSON to a temp file and run
  `switchback profile --import <file>`.

On success the CLI prints the profile path, the kit and the colour roles. On `E_PROFILE_IMPORT`
it says which part of the file is wrong: fix the JSON and import once more. If that fails too,
show the user the error and its `fix` line.

## 5. Show the key

Run `switchback legend`. Then send the done message: a single message, these four parts in this
order, nothing between them and no question in it.

1. **Assumed:** the assumptions you made, each in a few words.
2. **Your pens:** the pen-to-role table for their desk (from the legend), then "swap any of these
   and I'll re-import".
3. **Your key:** one line, "your pens, in the order that matters; a role with no pen is a circled
   letter", then the legend output as a code block.
4. **Later:** one line on changing it: `/switchback desk` again, or
   `switchback profile --set role.stop=pink`.

## 6. Done when

`switchback profile --json` shows the new kit, and the user has seen the legend. Nothing else:
no `list`, no `validate`, no build. If the desk question came from a workbook, go back to
workbook mode and carry on from where it stopped.

## Common mistakes

| Mistake | Instead |
| --- | --- |
| Setting up in silence: a correct profile and no message | The done message in section 5 is the deliverable |
| Probing `--set` with test values, then deleting the profile | One `--import`; the CLI backs the old profile up |
| A second question ("and do you have a timer?") after the first | Assume, state the assumption, move on |
| Adding keys the CLI does not know (`ruler`, `highlighter_colour`) | Only the keys in section 4; extras fail the import |
| Giving blue to Stop because red is missing | Blue is Ask's whenever it exists; Stop gets a circled R |
