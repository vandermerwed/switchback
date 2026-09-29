import type { Catalogue } from "../registry/catalogue";
import { article, error, warning } from "./diagnostics";
import { resolveComponent } from "./resolve";
import type { Diagnostic, Slot, Spec, Style } from "./types";

/** The word with its article: "an Incubation", "a Ritual". */
const an = (word: string) => `${article(word)} ${word}`;
const slotIds = (slot: Slot): string[] => (Array.isArray(slot) ? slot : [slot]);
const describeSlot = (slot: Slot): string => slotIds(slot).join(" or ");
const fits = (slots: Slot[], ids: string[]): boolean =>
  ids.length === slots.length && slots.every((slot, i) => slotIds(slot).includes(ids[i]!));

/** How many of `ids`, from the start, fill `slots` in order (stopping at the first that doesn't). */
function matchedLead(slots: Slot[], ids: string[]): number {
  let n = 0;
  while (n < slots.length && n < ids.length && slotIds(slots[n]!).includes(ids[n]!)) n++;
  return n;
}

/** " (grade C)" for a claim in the style's grounding, or "" when the style has no such claim. */
export function gradeNote(style: Style, claimId: string): string {
  const c = style.grounding?.claims.find((x) => x.id === claimId);
  return c ? ` (grade ${c.grade})` : "";
}

function why(style: Style, key: "opening" | "closing" | "allow" | "split"): string {
  const note = style.why?.[key];
  return note ? `: ${note.text}${gradeNote(style, note.claim)}` : "";
}

export function styleChecks(style: Style, spec: Spec, cat: Catalogue): Diagnostic[] {
  const out: Diagnostic[] = [];
  const ids = spec.pages.map((p) => resolveComponent(cat, p.component)?.base.meta.id ?? p.component);
  const where = (i: number) => ({ page: spec.pages[i]!.id, path: `/pages/${i}` });

  if (spec.pages.length > style.budget) {
    out.push(
      error(
        "E_BUDGET",
        `${spec.pages.length} pages exceeds the ${style.name} budget of ${style.budget}`,
        "cut pages that produce material before pages that force a decision, or move the rest to another round",
        { path: "/pages" },
      ),
    );
  }

  const opening = style.opening ?? [];
  if (opening.length && !fits(opening, ids.slice(0, opening.length))) {
    out.push(
      warning(
        "W_OPENING",
        `${an(style.name)} opens with ${opening.map(describeSlot).join(" → ")}${why(style, "opening")}`,
        "start with those pages unless the situation makes that wrong",
        { path: "/pages" },
      ),
    );
  }

  if (style.closing.length && !fits(style.closing, ids.slice(-style.closing.length))) {
    out.push(
      warning(
        "W_CLOSING",
        `${an(style.name)} usually ends with ${style.closing.map(describeSlot).join(" → ")}${why(style, "closing")}`,
        "end with those pages unless the situation makes that wrong",
        { path: "/pages" },
      ),
    );
  }

  if (style.allow) {
    const allow = style.allow;
    ids.forEach((id, i) => {
      if (!allow.includes(id))
        out.push(
          error(
            "E_STYLE_ALLOW",
            `${id} is not part of ${an(style.name)}${why(style, "allow")}`,
            `use ${allow.join(" or ")}, or choose another style`,
            where(i),
          ),
        );
    });
  }

  let split = -1;
  if (style.split_on) {
    const at = ids.flatMap((id, i) => (id === style.split_on ? [i] : []));
    if (at.length !== 1) {
      out.push(
        error(
          "E_STYLE_SPLIT",
          `${an(style.name)} needs exactly one ${style.split_on} page between its two halves (found ${at.length})${why(style, "split")}`,
          `put one ${style.split_on} page after the last generating page`,
          { path: "/pages" },
        ),
      );
      return out; // sections are undefined without exactly one split, so phase rules cannot apply
    }
    split = at[0]!;
    // Each half needs at least one page of its own work, beyond the opening and closing slots
    // it carries. An Incubation whose first half is only its cover has nothing to incubate.
    const before = ids.slice(0, split);
    const after = ids.slice(split + 1);
    const lead = matchedLead(opening, before);
    const trail = matchedLead([...style.closing].reverse(), [...after].reverse());
    if (before.length === lead)
      out.push(
        warning(
          "W_STYLE_EMPTY_SECTION",
          `nothing to generate before the break: ${before.length ? `only ${before.join(", ")} comes` : "no page comes"} before ${style.split_on}`,
          `put at least one page that generates material before ${style.split_on}`,
          { path: "/pages" },
        ),
      );
    if (after.length === trail)
      out.push(
        warning(
          "W_STYLE_EMPTY_SECTION",
          `nothing to judge after the break: ${after.length ? `only ${after.join(", ")} comes` : "no page comes"} after ${style.split_on}`,
          `put at least one page that judges the first half's material after ${style.split_on}`,
          { path: "/pages" },
        ),
      );
  }

  if (style.phase_rules.length) {
    ids.forEach((id, i) => {
      if (i === split) return;
      const section = split === -1 || i < split ? 0 : 1;
      const rule = style.phase_rules.find((r) => r.section === section);
      if (!rule) return;
      const side = split === -1 ? "" : section === 0 ? ` before the ${style.split_on}` : " after the break";
      const move = split === -1 ? "" : ` or move it ${section === 0 ? "after" : "before"} ${style.split_on}`;
      const forbidden = rule.forbid?.find((f) => f.id === id);
      if (forbidden) {
        out.push(
          error(
            "E_STYLE_FORBID",
            `${id}${side}: ${forbidden.why}${gradeNote(style, forbidden.claim)}`,
            `remove it${move}`,
            where(i),
          ),
        );
        return;
      }
      const phase = cat.components.get(id)?.meta.phase;
      if (phase && !rule.phases.includes(phase))
        out.push(
          error(
            "E_STYLE_PHASE",
            `${id} is ${an(phase)} page${side}: ${rule.why}${gradeNote(style, rule.claim)}`,
            `swap it for ${an(rule.phases.join(" or "))} page${move}`,
            where(i),
          ),
        );
    });
  }
  return out;
}
