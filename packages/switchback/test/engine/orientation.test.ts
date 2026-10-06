import { describe, expect, it } from "vitest";
import { resolveOrientation } from "../../src/engine/orientation";

describe("resolveOrientation", () => {
  it("defaults to portrait", () => {
    expect(resolveOrientation({})).toBe("portrait");
  });

  it("takes the component default when nothing else is set", () => {
    expect(resolveOrientation({ component: "landscape" })).toBe("landscape");
  });

  it("lets the data rule beat the component default", () => {
    expect(resolveOrientation({ component: "portrait", rule: "landscape" })).toBe("landscape");
  });

  it("lets the variant beat the data rule", () => {
    expect(resolveOrientation({ rule: "landscape", variant: "portrait" })).toBe("portrait");
  });

  it("lets the preset beat the variant", () => {
    expect(resolveOrientation({ variant: "portrait", preset: "landscape" })).toBe("landscape");
  });

  it("lets the spec page beat everything", () => {
    expect(
      resolveOrientation({
        page: "portrait",
        preset: "landscape",
        variant: "landscape",
        rule: "landscape",
        component: "landscape",
      }),
    ).toBe("portrait");
  });
});
