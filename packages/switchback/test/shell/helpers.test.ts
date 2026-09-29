import { describe, expect, it } from "vitest";
import { resolveKit } from "../../src/engine/kit";
import { assignPens } from "../../src/engine/pens";
import { loadRegistries } from "../../src/registry/registries";
import { esc, helpers as h } from "../../src/shell/helpers";

describe("esc", () => {
  it("escapes HTML-significant characters", () => {
    expect(esc(`<script>alert("x") & 'y'</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  it("renders null and undefined as empty", () => {
    expect(esc(undefined)).toBe("");
    expect(esc(null)).toBe("");
  });
});

describe("helpers", () => {
  it("draws the requested number of writing rules", () => {
    expect(h.lines({ count: 3 }).match(/sb-rule/g)).toHaveLength(3);
  });

  it("marks fill areas", () => {
    expect(h.lines({ fill: true })).toContain('class="sb-lines sb-fill"');
    expect(h.box({ fill: true })).toContain('class="sb-box sb-fill"');
  });

  it("sizes boxes in millimetres and escapes labels", () => {
    expect(h.box({ height: 46, label: "<b>" })).toBe(
      '<div class="sb-box" style="height:46mm"><span class="sb-label">&lt;b&gt;</span></div>',
    );
  });

  it("builds a shared-cut-line grid with one scissors mark", () => {
    const grid = h.cutGrid({ cells: ["a", "b", "c", "d"], columns: 2, minHeight: 18 });
    expect(grid.match(/sb-cut-cell/g)).toHaveLength(4);
    expect(grid).toContain("grid-template-columns:repeat(2,1fr)");
    expect(grid.match(/sb-scissors/g)).toHaveLength(1);
  });

  it("escapes table cells and wraps fill tables", () => {
    expect(h.table({ head: ["A"], rows: [["<i>"]] })).toContain("<td>&lt;i&gt;</td>");
    expect(h.table({ head: ["A"], rows: [], fill: true })).toMatch(/^<div class="sb-table-wrap sb-fill">/);
  });

  it("omits empty zone labels", () => {
    expect(h.zones({ labels: ["now", ""] }).match(/sb-label/g)).toHaveLength(1);
  });

  it("prints the pen, or a circled letter, in the legend table", () => {
    const { roles } = loadRegistries();
    const { mapping } = assignPens(resolveKit({ profile: { pens: [{ colour: "blue" }] } }).kit, roles);
    const table = h.legendTable(roles, mapping);
    expect(table).toContain('<td class="sb-pen">blue</td>');
    expect(table).toContain('<span class="sb-letter">R</span>');
    expect(table.match(/<tr>/g)).toHaveLength(9);
  });

  it("writes if-then plan rows and pre-fills only the first cue", () => {
    const html = h.ifThen({ count: 2, first: "I put this pen down" });
    expect(html.match(/class="sb-ifthen-row"/g)).toHaveLength(2);
    expect(html.match(/I put this pen down/g)).toHaveLength(1);
    expect(html.match(/I will/g)).toHaveLength(2);
  });

  it("escapes the pre-filled cue and always draws at least one row", () => {
    expect(h.ifThen({ first: "<b>" })).toContain("&lt;b&gt;");
    expect(h.ifThen({ count: 0 }).match(/class="sb-ifthen-row"/g)).toHaveLength(1);
  });
});
