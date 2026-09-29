import { describe, expect, it } from "vitest";
import { buildDocument, renderComponent } from "../../src/engine/build";

const html = (example: string) => {
  const r = renderComponent("commit", { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("commit", () => {
  it("closes on if-then plans whose first cue is putting the pen down", () => {
    const out = html("default");
    expect(out).toContain('class="sb-ifthen"');
    expect(out).toContain("I put this pen down");
  });

  it("leaves out 'Who I will tell' unless the spec asks for it", () => {
    expect(html("default")).not.toContain("Who I will tell");
    expect(html("tell")).toContain("Who I will tell");
    const bare = buildDocument(
      { switchback: 1, pages: [{ id: "W1-P1", component: "commit", data: {} }] },
      { embedFonts: false },
    );
    expect(bare.html).not.toContain("Who I will tell");
  });

  it("asks for the rule and its exceptions before the instance, in the policy variant", () => {
    const out = html("policy");
    expect(out).toContain("The rule, for every time this comes up");
    expect(out).toContain("Named exceptions");
    expect(out.indexOf("The rule, for every time")).toBeLessThan(out.indexOf("This time, the rule says"));
  });

  it("prints the variant's own prompt for policy, and the component's for default", () => {
    const policyPrompt = /<p class="sb-prompt">(.*?)<\/p>/.exec(html("policy"))?.[1];
    const defaultPrompt = /<p class="sb-prompt">(.*?)<\/p>/.exec(html("default"))?.[1];
    expect(policyPrompt).not.toBe(defaultPrompt);
    expect(policyPrompt).toContain("rule");
    expect(defaultPrompt).toContain("Circle one");
  });
});
