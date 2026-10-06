import { describe, expect, it } from "vitest";
import { resolveKit } from "../../src/engine/kit";
import { assignPens } from "../../src/engine/pens";
import { loadRegistries } from "../../src/registry/registries";
import { legendStrip, renderDocument, renderPage } from "../../src/shell/page";

const { roles } = loadRegistries();
const pens = assignPens(resolveKit({ profile: { pens: [{ colour: "blue" }] } }).kit, roles).mapping;
const parts = {
  id: "W1-P3",
  component: "options-criteria",
  title: "Options",
  prompt: "Score <each>",
  notes: "",
  body: "<div>body</div>",
  shell: { header: true, prompt: true, legend: true },
  legend: legendStrip(roles, pens, "W1-P3"),
};

describe("renderPage", () => {
  it("draws registration marks, the header, the escaped prompt, and the legend", () => {
    const html = renderPage(parts);
    expect(html.match(/sb-reg /g)).toHaveLength(4);
    expect(html).toContain('<span class="sb-pid">W1-P3</span>');
    expect(html).toContain('<span class="sb-ptag">options-criteria</span>');
    expect(html).toContain("Score &lt;each&gt;");
    expect(html).toContain('class="sb-pfoot"');
  });

  it("still prints the page id when the header and legend are off", () => {
    const html = renderPage({ ...parts, shell: { header: false, prompt: false, legend: false } });
    expect(html).not.toContain("sb-ph");
    expect(html).not.toContain("sb-prompt");
    expect(html).toContain('<span class="sb-legend-id">W1-P3</span>');
  });

  it("adds sb-has-attrib to the page section when an attribution is set", () => {
    const html = renderPage({ ...parts, attribution: "Credit line. CC BY-SA 3.0: https://example.com" });
    expect(html).toMatch(/<section class="sb-page sb-has-attrib" id="W1-P3"/);
    expect(html).not.toContain("style=");
  });

  it("omits sb-has-attrib when there is no attribution", () => {
    const html = renderPage(parts);
    expect(html).toMatch(/<section class="sb-page"/);
    expect(html).not.toContain("sb-has-attrib");
  });

  it("marks a landscape page with sb-landscape and leaves a portrait page alone", () => {
    expect(renderPage({ ...parts, orientation: "landscape" })).toMatch(
      /<section class="sb-page sb-landscape" id="W1-P3"/,
    );
    expect(renderPage({ ...parts, orientation: "portrait" })).toMatch(/<section class="sb-page" id="W1-P3"/);
    expect(renderPage({ ...parts, orientation: "landscape", attribution: "Credit." })).toMatch(
      /<section class="sb-page sb-has-attrib sb-landscape" id="W1-P3"/,
    );
  });
});

describe("legendStrip", () => {
  it("shows pens and circled-letter fallbacks, then the page id", () => {
    const strip = legendStrip(roles, pens, "W1-P3");
    expect(strip).toContain("<span>Q ask = blue</span>");
    expect(strip).toContain('<span><span class="sb-letter">R</span> stop</span>');
    expect(strip).toMatch(/<span class="sb-legend-id">W1-P3<\/span><\/div>$/);
  });
});

describe("renderDocument", () => {
  it("names a portrait and a landscape page for the paper, and de-duplicates component CSS", () => {
    const html = renderDocument({
      title: "T",
      paper: "Letter",
      pages: ["<p>x</p>"],
      componentCss: [".a{}", ".a{}"],
      embedFonts: false,
    });
    expect(html).toContain("@page{size:letter;margin:0}");
    expect(html).toContain("@page sb-portrait{size:letter;margin:0}");
    expect(html).toContain("@page sb-landscape{size:letter landscape;margin:0}");
    expect(html).toContain("--sb-w:215.9mm");
    expect(html.match(/\.a\{\}/g)).toHaveLength(1);
    expect(html).not.toContain("@font-face");
  });

  it("uses A4 for the named pages on A4 paper", () => {
    const html = renderDocument({ title: "T", paper: "A4", pages: [], componentCss: [], embedFonts: false });
    expect(html).toContain("@page sb-landscape{size:A4 landscape;margin:0}");
  });
});
