import { describe, expect, it } from "vitest";
import { buildDocument, compileData, renderComponent } from "../../src/engine/build";
import type { ComponentMeta, ComponentModule } from "../../src/engine/types";
import { createCatalogue } from "../../src/registry/catalogue";

const clock = () => new Date("2026-09-23T12:00:00.000Z");
const page = (n: number, extra: Record<string, unknown> = {}) => ({
  id: `W1-P${n}`,
  component: "pre-mortem",
  ...extra,
});
const spec = (pages: unknown[], extra: Record<string, unknown> = {}) => ({
  switchback: 1,
  title: "T",
  pages,
  ...extra,
});
const opts = { clock, embedFonts: false, cliVersion: "0.0.0-test" };

describe("buildDocument", () => {
  it("renders pages and a deterministic sidecar", () => {
    const r = buildDocument(spec([page(1, { data: { subject: "the launch" } })]), opts);
    expect(r.html).toContain('<section class="sb-page" id="W1-P1" data-component="pre-mortem">');
    expect(r.html).toContain("Write the post-mortem for the launch.");
    expect(r.sidecar).toMatchObject({
      switchback: 1,
      cli: "0.0.0-test",
      built_at: "2026-09-23T12:00:00.000Z",
      style: "sitting",
      round: 1,
      paper: "A4",
      kit_source: ["minimum"],
      pages: [
        { id: "W1-P1", component: "pre-mortem", preset: null, variant: "default", title: "Pre-mortem" },
      ],
    });
    expect(r.sidecar?.pages[0]?.readback).toContain("half-known");
  });

  it("warns (not errors) when a sitting does not end with the closing pages", () => {
    const r = buildDocument(spec([page(1)]), opts);
    expect(r.html).not.toBeNull();
    expect(r.diagnostics.map((d) => d.code)).toContain("W_CLOSING");
  });

  it("stops at the page budget", () => {
    const r = buildDocument(spec(Array.from({ length: 11 }, (_, i) => page(i + 1))), opts);
    expect(r.html).toBeNull();
    expect(r.diagnostics.map((d) => d.code)).toContain("E_BUDGET");
  });

  it("reports unknown components with a fix, and bad data with a pointer", () => {
    const unknown = buildDocument(spec([{ id: "W1-P1", component: "origami" }]), opts);
    expect(unknown.diagnostics[0]).toMatchObject({
      code: "E_UNKNOWN_COMPONENT",
      page: "W1-P1",
      path: "/pages/0/component",
    });
    const bad = buildDocument(spec([page(1, { data: { subject: 42 } })]), opts);
    expect(bad.diagnostics[0]).toMatchObject({ code: "E_DATA_SCHEMA", path: "/pages/0/data/subject" });
    const extra = buildDocument(spec([page(1, { data: { colour: "red" } })]), opts);
    expect(extra.diagnostics[0]?.code).toBe("E_DATA_SCHEMA");
  });

  it("rejects unknown styles", () => {
    expect(buildDocument(spec([page(1)], { style: "marathon" }), opts).diagnostics[0]?.code).toBe(
      "E_UNKNOWN_STYLE",
    );
  });

  it("prints every role as a circled letter on a black-pen-only desk", () => {
    const r = buildDocument(
      spec([page(1)], { kit: { pens: [{ colour: "black" }], highlighter: false } }),
      opts,
    );
    for (const code of ["Q", "R", "G", "X", "O", "P", "D"])
      expect(r.html).toContain(`<span class="sb-letter">${code}</span>`);
    expect(r.sidecar?.kit_source).toEqual(["minimum", "spec"]);
  });

  it("layers the profile kit under the spec kit and warns about pens without a role", () => {
    const r = buildDocument(spec([page(1)], { kit: { pens: [{ colour: "blue" }, { colour: "teal" }] } }), {
      ...opts,
      profileKit: { scissors: true },
    });
    expect(r.sidecar?.kit_source).toEqual(["minimum", "profile", "spec"]);
    expect(r.sidecar?.pens.ask).toEqual({ pen: "blue" });
    expect(r.diagnostics.find((d) => d.code === "W_UNASSIGNED_PEN")?.message).toContain("teal");
  });

  it("drops the legend strip when legend_strip is false but keeps the page id", () => {
    const r = buildDocument(spec([page(1)], { legend_strip: false }), opts);
    expect(r.html).not.toContain(" = black</span>");
    expect(r.html).toContain('<span class="sb-legend-id">W1-P1</span>');
  });

  it("honours paper and a page's own prompt and title", () => {
    const r = buildDocument(
      spec([page(1, { prompt: "My own prompt", title: "Mine" })], { paper: "Letter" }),
      opts,
    );
    expect(r.html).toContain("@page{size:letter;margin:0}");
    expect(r.html).toContain("My own prompt");
    expect(r.sidecar?.pages[0]?.title).toBe("Mine");
  });

  it("rejects A5, which v0.1.0 does not support", () => {
    const r = buildDocument(spec([page(1)], { paper: "A5" }), opts);
    expect(r.html).toBeNull();
    expect(r.diagnostics.map((d) => d.code)).toContain("E_SPEC_SCHEMA");
  });

  it("tells a spec that names a merged component where its move went", () => {
    const r = buildDocument(spec([{ id: "W1-P1", component: "tracker" }]), opts);
    expect(r.html).toBeNull();
    expect(r.diagnostics[0]).toMatchObject({ code: "E_RENAMED", page: "W1-P1", path: "/pages/0/component" });
    expect(r.diagnostics[0]?.fix).toContain('"component": "scoresheet", "variant": "running"');
    expect(r.diagnostics[0]?.fix).toContain("`rows` is now a list of labels, plus one `steps` number");
  });

  it("points a meeple page at perspective-swap's tent variant", () => {
    const r = buildDocument(spec([{ id: "W1-P1", component: "meeple" }]), opts);
    expect(r.diagnostics[0]?.code).toBe("E_RENAMED");
    expect(r.diagnostics[0]?.fix).toContain('"component": "perspective-swap", "variant": "tent"');
    expect(r.diagnostics[0]?.fix).toContain(
      "tent needs scissors in the kit; `labels` is now `roles` (max 3)",
    );
  });
});

describe("renderComponent", () => {
  it("renders a component's example as a single page without style checks", () => {
    const r = renderComponent("pre-mortem", { embedFonts: false });
    expect(r.diagnostics.filter((d) => d.code === "W_CLOSING")).toEqual([]);
    expect(r.html).toContain("It is six months later");
  });
});

describe("compileData", () => {
  it("caches per schema object, not per component id", () => {
    // Two different metas that happen to share an id must each get their own
    // validator: caching by id would let the second one silently reuse the
    // first's compiled schema.
    const metaA = {
      id: "x",
      data: { type: "object", required: ["a"], properties: { a: { type: "string" } } },
    } as unknown as ComponentMeta;
    const metaB = {
      id: "x",
      data: { type: "object", required: ["b"], properties: { b: { type: "string" } } },
    } as unknown as ComponentMeta;
    const validateA = compileData(metaA);
    const validateB = compileData(metaB);
    expect(validateA({ a: "x" })).toBe(true);
    expect(validateB({ b: "y" })).toBe(true);
    expect(validateB({ a: "x" })).toBe(false);
  });
});

const wide = (
  orientation?: "portrait" | "landscape",
  rule?: ComponentModule["orientation"],
): ComponentModule => ({
  meta: {
    id: "wide",
    kind: "page",
    name: "Wide",
    intent: "x",
    when: "",
    tags: ["decide"],
    phase: "converge",
    physical: { requires: [], body: [], surface: "desk", timebox: "1 min" },
    variants: [{ id: "default", requires: [] }],
    data: { type: "object" },
    grounding: { claims: [], helps: "", backfires: "" },
    ...(orientation ? { orientation } : {}),
  },
  render: (_d, ctx) => `<p>${ctx.orientation}</p>`,
  ...(rule ? { orientation: rule } : {}),
  examples: {},
});
const wideCat = (mod: ComponentModule) =>
  createCatalogue({
    components: [mod],
    presets: [
      {
        id: "wide-portrait",
        kind: "preset",
        extends: "wide",
        name: "Wide, portrait",
        tags: ["decide"],
        data: {},
        attribution: "x",
        licence: "x",
        orientation: "portrait",
      },
    ],
  });
const onWide = (cat: ReturnType<typeof wideCat>, pageExtra: Record<string, unknown>) =>
  buildDocument(spec([{ id: "W1-P1", component: "wide", ...pageExtra }]), {
    ...opts,
    catalogue: cat,
    skipStyleChecks: true,
  });

describe("page orientation", () => {
  it("prints a landscape component on a landscape page and records it", () => {
    const r = onWide(wideCat(wide("landscape")), {});
    expect(r.html).toContain('<section class="sb-page sb-landscape" id="W1-P1"');
    expect(r.html).toContain("<p>landscape</p>");
    expect(r.sidecar?.pages[0]?.orientation).toBe("landscape");
  });

  it("uses the component's data rule", () => {
    const rule = (data: { n?: number }) => ((data.n ?? 0) >= 3 ? "landscape" : undefined);
    expect(onWide(wideCat(wide(undefined, rule)), { data: { n: 3 } }).sidecar?.pages[0]?.orientation).toBe(
      "landscape",
    );
    expect(onWide(wideCat(wide(undefined, rule)), { data: { n: 1 } }).sidecar?.pages[0]?.orientation).toBe(
      "portrait",
    );
  });

  it("lets a preset and then a spec page override the component", () => {
    const cat = wideCat(wide("landscape"));
    const viaPreset = buildDocument(spec([{ id: "W1-P1", component: "wide-portrait" }]), {
      ...opts,
      catalogue: cat,
      skipStyleChecks: true,
    });
    expect(viaPreset.sidecar?.pages[0]?.orientation).toBe("portrait");
    const forced = onWide(cat, { orientation: "portrait" });
    expect(forced.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(forced.html).toContain('<section class="sb-page" id="W1-P1"');
  });

  it("passes the resolved orientation to checks", () => {
    let seen = "";
    const mod: ComponentModule = {
      ...wide("landscape"),
      checks: (_d, c) => {
        seen = c.orientation;
        return [];
      },
    };
    onWide(wideCat(mod), {});
    expect(seen).toBe("landscape");
  });
});
