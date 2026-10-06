# Stationery: what to ask about, and how each answer changes the pages

Switchback designs around the desk the user actually has, not an imagined one. The principle: **the
printer prints a scaffold; the human supplies the colour.** A mono printer is the default, not a
limitation, because all the meaningful colour is the person's own ink.

The kit keys below are the ones `switchback profile --import` accepts. Anything not listed (ruler,
graph paper, envelopes) is not recorded; mention it in conversation if it matters, but keep it out of
the JSON.

## Kits

| Kit | Holds | Unlocks |
| --- | --- | --- |
| **Minimum** | mono printer, A4, a black pen, a highlighter, a phone camera | every page; roles without a pen use circled letters |
| **Standard** | minimum + blue, red and green pens + scissors + tape + sticky notes | the full colour language for Ask, Stop and Keep; cut-out and paste pages |
| **Rich** | standard + orange and purple pens + index cards + coins + a timer + wall space | every role in its own colour; sorting with real cards; token budgets; timed sittings; wall maps |

When the user is impatient or says "whatever", the minimum kit is the right answer. Say so.

## Each item

### Printer and paper (`printer`, `paper`)

- `printer`: `mono` or `colour`. Every page prints black-on-white either way. The cover's legend
  swatches print empty for the user to colour with their own pens, which is also how read mode
  learns what each ink looks like. A colour printer is recorded but changes nothing on the page.
- `paper`: `A4` or `Letter`. It sets the page size of every build; wide pages print on landscape
  sheets of the same paper. Index cards on portrait paper are cramped, so a card sort prints
  landscape from 3 piles, and uses the write-in variant past 3.
- No printer at all: print at a library, a shop or work, or hand-copy the page from the HTML.
  A workbook with no printer is slower but still works. Reading it on screen is not a fallback;
  that removes the point.

### Pens (`pens`)

Each pen is a colour, and each colour may unlock a role (see desk.md, section 3). Colours that
unlock nothing on their own (pink, brown, teal) are still worth recording: the user can give one a
`role` and it prints in the legend.

- A **black** pen is always the reasoning ink and never takes a role.
- **Blue** is Ask's whenever it exists: the human's numbered questions to the AI.
- **Red** is Stop, **green** is Keep, **orange** is Maybe, **purple** is Sense, **grey** is Draft.
- A role without a pen becomes a circled letter in any ink. Never demand a colour the user lacks.

### Highlighter (`highlighter`)

One highlighter of any colour marks Crux, the one thing that matters most. It is in the minimum kit
because a highlighter is the mark most people already own and the one hardest to over-use.

### Pencil (`pencil`)

The provisional ink. With a pencil, Draft gets the pencil instead of a grey pen or a circled D, and
"write it lightly, you may rub it out" becomes a real instruction.

### Scissors (`scissors`) and tape or glue (`tape`, `glue`)

- Scissors unlock the cut-out variants: a card sort with a printed deck, a stimulus die to fold,
  perspective cards to deal out, tokens to cut.
- Tape is needed to fold and tape the die; glue or tape for paste-based pages.
- Without scissors, every cut-out page has a **write-in** variant: the card sort becomes columns
  to fill, the tokens become tally marks. The CLI picks it when the kit says so.

### Sticky notes (`sticky_notes`)

Movable pieces are a thinking superpower. With sticky notes, pages get zones sized to the note, and
the design prefers pieces the user can rearrange before committing in ink.

### Index cards (`index_cards`)

A card sort uses the cards directly, with no cutting: one idea per card, sorted on the desk. A card
sort with 3 or more piles prints on a landscape page, which fits 3 piles of index cards; with 4 or
5 piles the CLI warns and the design uses the write-in variant.

### Coins (`coins`)

A handful of coins become tokens: label a box for each thing you are spending on, and place a coin as
you spend. A budget you can feel running out beats a budget you write down.

### Timer (`timer`)

A timer or clock is what keeps a sitting a sitting. With one, pages carry per-page timeboxes and
the cover carries a total; the instruction "stop mid-sentence when it rings" only works with a
timer. Without one, the design keeps a total time on the cover and drops the per-page boxes.

### Wall space (`wall_space`)

Wall or whiteboard space unlocks "put it on the wall and step back": maps and boards that are
read from a distance, and the board photo that read mode reads by region. Without it, big maps
split across desk-sized pages.

### Camera (`camera`)

A phone camera or a scanner is the return path. It is in the minimum kit because almost everyone
has one, and without it the pages never come back. The return checklist page needs it.

## Adaptation at a glance

| If they have… | The pages change how |
| --- | --- |
| A mono printer | The default. Black-on-white; all colour is the human's ink. |
| A colour printer | Still black-on-white; the user colours the cover swatches by hand. |
| No scissors | Cut-out pages use their write-in variants. |
| No tape or glue | No die, no paste-based pages. |
| Sticky notes | Zones sized to the note; movable pieces before ink. |
| Index cards | Card sorts use the cards, no cutting; up to 3 piles, on a landscape page from 3. |
| Coins | Token budgets use coins instead of tally marks. |
| Fewer coloured pens | The legend collapses to what they have; missing roles are circled letters. |
| Wall space | Wall maps and boards, with "step back" instructions. |
| No wall space | Everything stays on the desk; big maps split across pages. |
| A timer | Per-page timeboxes and a total sitting time on the cover. |
| No printer | Print elsewhere or hand-copy; fewer pages. |
