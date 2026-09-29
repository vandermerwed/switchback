import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";

const ruleCount = (html: string) => (html.match(/class="sb-rule"/g) ?? []).length;

const render = (prompts: string[]) => {
  const { html, diagnostics } = buildDocument(
    {
      switchback: 1,
      pages: [
        {
          id: "W1-P1",
          component: "free-recall",
          variant: "cued",
          data: { topic: "t", prompts },
        },
      ],
    },
    { skipStyleChecks: true },
  );
  expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return html ?? "";
};

describe("free-recall cued writing-line budget", () => {
  it("keeps 2 writing lines per prompt at 4 or fewer prompts", () => {
    const html = render(["a", "b", "c", "d"]);
    // 4 prompts x 2 rules each, plus the "What I missed" check block (3 rules).
    expect(ruleCount(html)).toBe(4 * 2 + 3);
  });

  it("gives each prompt 1 writing line when there are more than 4 prompts", () => {
    const html = render(["a", "b", "c", "d", "e"]);
    // 5 prompts x 1 rule each, plus the check block (3 rules).
    expect(ruleCount(html)).toBe(5 * 1 + 3);
  });

  it("still gives 1 writing line per prompt at the schema maximum of 6 prompts", () => {
    const html = render(["a", "b", "c", "d", "e", "f"]);
    expect(ruleCount(html)).toBe(6 * 1 + 3);
  });
});
