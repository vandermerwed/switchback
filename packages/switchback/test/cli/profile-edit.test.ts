import { describe, expect, it } from "vitest";
import { kitFromAnswers } from "../../src/cli/profile-edit";

describe("kitFromAnswers", () => {
  it("dedupes colours case-insensitively, keeping the first spelling", () => {
    const kit = kitFromAnswers({
      paper: "A4",
      printer: "mono",
      pens: ["Blue", "red"],
      other: "blue, RED, green",
      stationery: [],
    });
    expect(kit.pens?.map((p) => p.colour)).toEqual(["Blue", "red", "green"]);
  });
});
