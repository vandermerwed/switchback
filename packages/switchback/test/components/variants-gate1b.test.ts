import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";

const html = (id: string, example: string) => {
  const r = renderComponent(id, { example, embedFonts: false });
  expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  return r.html ?? "";
};

describe("Gate 1b variants on existing pages", () => {
  it("pre-mortem iterate gates each round on how surprising a failure would be", () => {
    const out = html("pre-mortem", "iterate");
    expect(out).toContain("How surprised would I be if it failed? (0–10)");
    expect(out.match(/<tr>/g)?.length).toBe(1 + 3);
    expect(out).not.toMatch(/30 ?%/);
  });

  it("tokens countdown numbers the sessions left and asks for the nearer milestone", () => {
    const out = html("tokens", "countdown");
    expect(out.match(/class="sb-c-count"/g)).toHaveLength(6);
    expect(out).toContain("The nearer milestone");
  });

  it("scoresheet domains asks which domain moved most, and prints no average", () => {
    const out = html("scoresheet", "domains");
    expect(out).toContain("The domain that moved most since last time");
    expect(out.toLowerCase()).not.toContain("average");
  });

  it("scoresheet running explains three marks when three_state is set", () => {
    expect(html("scoresheet", "running")).toContain("✓ done · / partial · – missed");
  });
});
