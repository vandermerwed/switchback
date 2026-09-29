import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("goal-factoring", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("goal-factoring", () => {
  it("lists the goals an action serves with a button test, after a neutrality line", () => {
    const out = html("default");
    expect(out).toContain("equally willing");
    expect(out).toContain("Button test");
    expect(out.indexOf("equally willing")).toBeLessThan(out.indexOf("Button test"));
    expect(out).toContain('class="sb-ifthen"');
  });

  it("gives each part of an avoided activity a verdict before a fix, in aversion", () => {
    const out = html("aversion");
    expect(out).toContain("Verdict");
    expect(out.indexOf("Verdict")).toBeLessThan(out.indexOf("Fix"));
    expect(out).toContain("valid verdict");
  });
});
