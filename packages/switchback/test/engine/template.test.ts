import { describe, expect, it } from "vitest";
import { resolvePrompt } from "../../src/engine/template";

describe("resolvePrompt", () => {
  it("fills placeholders from data", () => {
    expect(resolvePrompt("It is impossible to {constraint}.", { constraint: "ship on Friday" }, {})).toBe(
      "It is impossible to ship on Friday.",
    );
  });

  it("uses inline fallbacks for missing keys", () => {
    expect(resolvePrompt("{seed|Everything in my head:}", {}, {})).toBe("Everything in my head:");
  });

  it("defaults subject to the spec subtitle, then 'this'", () => {
    expect(resolvePrompt("Explain {subject}.", {}, { subtitle: "the sync engine" })).toBe(
      "Explain the sync engine.",
    );
    expect(resolvePrompt("Explain {subject}.", {}, {})).toBe("Explain this.");
  });

  it("defaults horizon and constraint", () => {
    expect(resolvePrompt("{horizon} / {constraint}", {}, {})).toBe("six months / the main constraint");
  });
});
