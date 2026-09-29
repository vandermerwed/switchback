import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";
import { styleChecks } from "../../src/engine/styles";
import type { Spec, Style } from "../../src/engine/types";
import { createCatalogue, loadCatalogue } from "../../src/registry/catalogue";
import { loadRegistries } from "../../src/registry/registries";

const cat = loadCatalogue();
const claim = (id: string, grade: "A" | "B" | "C" | "D") => ({
  id,
  claim: `claim ${id}`,
  construct: id,
  grade,
  transfer: "adjacent" as const,
  sources: [{ cite: "Test (2026)", doi: "10.1000/test" }],
});
const incubation: Style = {
  id: "incubation",
  name: "Incubation",
  tags: ["create"],
  budget: 10,
  opening: ["cover"],
  closing: ["commit", "question-queue", "return-checklist"],
  split_on: "step-away",
  phase_rules: [
    {
      section: 0,
      phases: ["diverge", "either"],
      why: "the first half is for generating",
      claim: "t/deferred",
      forbid: [{ id: "timer", why: "time pressure reduces divergent output", claim: "t/time-pressure" }],
    },
    {
      section: 1,
      phases: ["converge", "either"],
      why: "the second half is for judging",
      claim: "t/deferred",
    },
  ],
  why: { split: { text: "a real break helps open-ended problems", claim: "t/incubation" } },
  grounding: {
    claims: [claim("t/deferred", "D"), claim("t/time-pressure", "C"), claim("t/incubation", "B")],
    helps: "h",
    backfires: "b",
  },
};
const ritual: Style = {
  id: "ritual",
  name: "Ritual",
  tags: ["reflect"],
  budget: 1,
  closing: [],
  phase_rules: [],
  allow: ["check-in", "scoresheet"],
  why: { allow: { text: "the same page every time", claim: "t/deferred" } },
  grounding: incubation.grounding,
};
const series: Style = {
  id: "series",
  name: "Series",
  tags: ["learn"],
  budget: 6,
  opening: ["cover", ["free-recall", "feynman", "self-explain"]],
  closing: ["question-queue", "return-checklist"],
  phase_rules: [],
  why: { opening: { text: "recalling before rereading improves learning", claim: "t/incubation" } },
  grounding: incubation.grounding,
};
const spec = (components: string[]): Spec => ({
  switchback: 1,
  pages: components.map((component, i) => ({ id: `W1-P${i + 1}`, component })),
});
const codes = (style: Style, components: string[]) =>
  styleChecks(style, spec(components), cat).map((d) => d.code);
const good = [
  "cover",
  "ten-bad-ideas",
  "step-away",
  "matrix-2x2",
  "commit",
  "question-queue",
  "return-checklist",
];

describe("styleChecks", () => {
  it("passes a well-formed incubation", () => {
    expect(codes(incubation, good)).toEqual([]);
  });

  it("errors on a diverge page after the break, naming the claim's grade", () => {
    const d = styleChecks(
      incubation,
      spec([
        "cover",
        "ten-bad-ideas",
        "step-away",
        "forced-connections",
        "commit",
        "question-queue",
        "return-checklist",
      ]),
      cat,
    );
    const e = d.find((x) => x.code === "E_STYLE_PHASE")!;
    expect(e.level).toBe("error");
    expect(e.page).toBe("W1-P4");
    expect(e.message).toContain("forced-connections is a diverge page after the break");
    expect(e.message).toContain("grade D");
  });

  it("errors on a forbidden timer before the break, ahead of the phase message", () => {
    const d = styleChecks(
      incubation,
      spec(["cover", "timer", "step-away", "matrix-2x2", "commit", "question-queue", "return-checklist"]),
      cat,
    );
    expect(d.map((x) => x.code)).toContain("E_STYLE_FORBID");
    expect(d.map((x) => x.code)).not.toContain("E_STYLE_PHASE");
    expect(d.find((x) => x.code === "E_STYLE_FORBID")!.message).toContain("grade C");
  });

  it("errors when the split page is missing or repeated", () => {
    expect(
      codes(incubation, ["cover", "ten-bad-ideas", "commit", "question-queue", "return-checklist"]),
    ).toContain("E_STYLE_SPLIT");
    expect(
      codes(incubation, ["cover", "step-away", "step-away", "commit", "question-queue", "return-checklist"]),
    ).toContain("E_STYLE_SPLIT");
  });

  it("handles a split page first or last without crashing", () => {
    expect(
      codes(incubation, ["step-away", "matrix-2x2", "commit", "question-queue", "return-checklist"]),
    ).toContain("W_OPENING");
    const last = codes(incubation, ["cover", "ten-bad-ideas", "step-away"]);
    expect(last).toContain("W_CLOSING");
    expect(last).not.toContain("E_STYLE_SPLIT");
  });

  it("accepts any alternative in an opening slot, and warns with the reason otherwise", () => {
    expect(codes(series, ["cover", "feynman", "question-queue", "return-checklist"])).toEqual([]);
    const d = styleChecks(series, spec(["cover", "brain-dump", "question-queue", "return-checklist"]), cat);
    const w = d.find((x) => x.code === "W_OPENING")!;
    expect(w.level).toBe("warning");
    expect(w.message).toContain("cover → free-recall or feynman or self-explain");
    expect(w.message).toContain("recalling before rereading improves learning (grade B)");
  });

  it("errors on components outside the allow-list", () => {
    expect(codes(ritual, ["check-in"])).toEqual([]);
    const d = styleChecks(ritual, spec(["brain-dump"]), cat);
    expect(d[0]).toMatchObject({ code: "E_STYLE_ALLOW", page: "W1-P1" });
  });

  it("uses 'an' before a vowel sound in every style message", () => {
    const msg = (style: Style, components: string[], code: string) =>
      styleChecks(style, spec(components), cat).find((d) => d.code === code)!.message;
    expect(msg(incubation, ["ten-bad-ideas", "step-away", "matrix-2x2"], "W_OPENING")).toMatch(
      /^an Incubation opens with/,
    );
    expect(msg(incubation, ["cover", "ten-bad-ideas", "step-away", "matrix-2x2"], "W_CLOSING")).toMatch(
      /^an Incubation usually ends with/,
    );
    expect(msg(incubation, ["cover", "ten-bad-ideas"], "E_STYLE_SPLIT")).toMatch(/^an Incubation needs/);
    const allow = { ...incubation, allow: ["cover"] };
    expect(msg(allow, ["cover", "brain-dump"], "E_STYLE_ALLOW")).toBe(
      "brain-dump is not part of an Incubation",
    );
    expect(msg(ritual, ["brain-dump"], "E_STYLE_ALLOW")).toMatch(/is not part of a Ritual/);
    expect(msg(series, ["cover", "brain-dump"], "W_OPENING")).toMatch(/^a Series opens with/);
  });

  it("uses 'an' before a vowel-sound phase or pen colour too", () => {
    const either: Style = {
      ...incubation,
      phase_rules: [{ section: 0, phases: ["either"], why: "only either pages", claim: "t/deferred" }],
    };
    const d = styleChecks(either, spec(["cover", "ten-bad-ideas", "step-away", "commit"]), cat).find(
      (x) => x.code === "E_STYLE_PHASE",
    )!;
    expect(d.message).toContain("ten-bad-ideas is a diverge page");
    expect(d.fix).toMatch(/^swap it for an either page/);
    const r = buildDocument(
      {
        switchback: 1,
        kit: { pens: [{ colour: "blue" }, { colour: "amber" }] },
        pages: [{ id: "W1-P1", component: "pre-mortem" }],
      },
      { embedFonts: false, skipStyleChecks: true },
    );
    expect(r.diagnostics.find((x) => x.code === "W_UNASSIGNED_PEN")?.message).toBe(
      "you have an amber pen with no role",
    );
  });

  it("warns when a half of a split style has only its opening or closing pages", () => {
    const empty = (components: string[]) =>
      styleChecks(incubation, spec(components), cat)
        .filter((d) => d.code === "W_STYLE_EMPTY_SECTION")
        .map((d) => [d.level, d.message.split(":")[0]]);
    const before = ["warning", "nothing to generate before the break"];
    const after = ["warning", "nothing to judge after the break"];
    expect(empty(good)).toEqual([]);
    // cover, then step-away, then converging pages: the first half is only the opening slot
    expect(
      empty(["cover", "step-away", "matrix-2x2", "commit", "question-queue", "return-checklist"]),
    ).toEqual([before]);
    // step-away first: the first half is empty
    expect(empty(["step-away", "matrix-2x2", "commit", "question-queue", "return-checklist"])).toEqual([
      before,
    ]);
    // step-away last: the second half is empty
    expect(empty(["cover", "ten-bad-ideas", "step-away"])).toEqual([after]);
    // the second half is only the closing slots
    expect(
      empty(["cover", "ten-bad-ideas", "step-away", "commit", "question-queue", "return-checklist"]),
    ).toEqual([after]);
    // a page that is not in its slot still counts as work for that half
    expect(empty(["ten-bad-ideas", "step-away", "matrix-2x2"])).toEqual([]);
  });

  it("keeps the old budget and closing behaviour for a sitting", () => {
    const sitting = loadRegistries().styles.find((s) => s.id === "sitting")!;
    expect(codes(sitting, ["pre-mortem"])).toContain("W_CLOSING");
    expect(
      codes(
        sitting,
        Array.from({ length: 11 }, () => "pre-mortem"),
      ),
    ).toContain("E_BUDGET");
  });
});

describe("buildDocument with a split style", () => {
  it("tags the pages after the break", () => {
    const base = loadCatalogue();
    const custom = createCatalogue({
      components: [...base.components.values()],
      presets: [...base.presets.values()],
      registries: { ...base.registries, styles: [...base.registries.styles, incubation] },
    });
    const pages = good.map((component, i) => ({ id: `W1-P${i + 1}`, component }));
    const r = buildDocument(
      { switchback: 1, style: "incubation", pages },
      { catalogue: custom, embedFonts: false },
    );
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(r.html).toContain('<span class="sb-ptag">matrix-2x2 · after the break</span>');
    expect(r.html).toContain('<span class="sb-ptag">ten-bad-ideas</span>');
  });
});
