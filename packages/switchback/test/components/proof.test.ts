import { describe, expect, it } from "vitest";
import { inline } from "../../components/proof/render";
import { buildDocument, renderComponent } from "../../src/engine/build";
import { resolveKit } from "../../src/engine/kit";
import { assignPens } from "../../src/engine/pens";
import { loadRegistries } from "../../src/registry/registries";
import { esc } from "../../src/shell/helpers";
import { legendStrip } from "../../src/shell/page";

describe("proof", () => {
  it("numbers paragraphs in the gutter and leaves headings unnumbered", () => {
    const html = renderComponent("proof", { example: "mixed", embedFonts: false }).html ?? "";
    expect(html).toContain('<span class="sb-c-pn">¶1</span>');
    expect(html).toMatch(/sb-c-ph[^>]*>\s*<span class="sb-c-pn"><\/span>/);
    expect(html).toContain('<span class="sb-c-pn">(¶3)</span>'); // a continuation
  });

  it("renders the inline markup and escapes everything else", () => {
    const r = buildDocument(
      {
        switchback: 1,
        pages: [
          {
            id: "W1-P1",
            component: "proof",
            data: { blocks: [{ kind: "p", n: 1, text: "A **bold** and *soft* `x<y` <b>raw</b>" }] },
          },
        ],
      },
      { embedFonts: false, skipStyleChecks: true },
    );
    const html = r.html ?? "";
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>soft</em>");
    expect(html).toContain("<code>x&lt;y</code>");
    expect(html).toContain("&lt;b&gt;raw&lt;/b&gt;");
  });

  it.each([
    ["`src/**/*.ts`", "<code>src/**/*.ts</code>"],
    ["2 * 3 * 4", "2 * 3 * 4"],
    ["`*args` and `**kwargs`", "<code>*args</code> and <code>**kwargs</code>"],
    ["**bold** then *soft*", "<strong>bold</strong> then <em>soft</em>"],
    ["a ** b ** c", "a ** b ** c"],
    ["*soft* `*not*` **bold `x`**", "<em>soft</em> <code>*not*</code> **bold <code>x</code>**"],
  ])("inline(%j) keeps code literal and asterisks with spaces round them as text", (text, html) => {
    expect(inline(text, esc)).toBe(html);
  });

  it("legendStrip in proof mode prints each role's and mark's proof_label; roles mode does not", () => {
    const { roles, marks } = loadRegistries();
    const { mapping } = assignPens(resolveKit({}).kit, roles);
    const strip = legendStrip(roles, mapping, "W1-P1", marks, "proof");
    for (const s of [
      '<span class="sb-letter">Q</span> ask</span>',
      '<span class="sb-letter">R</span> challenge</span>',
      '<span class="sb-letter">G</span> go deeper</span>',
      "<span>X re-centre = highlighter</span>",
      '<span class="sb-letter">O</span> explore</span>',
      '<span class="sb-letter">P</span> justify</span>',
      '<span class="sb-letter">D</span> edit</span>',
      "<span>✕ cut</span>",
      "<span>○ lock</span>",
    ])
      expect(strip).toContain(s);
    expect(strip).not.toContain("answer"); // the AI's action id, not the label
    expect(strip).not.toContain("apply edit");
    expect(legendStrip(roles, mapping, "W1-P1", marks)).not.toContain("go deeper");
  });
});
