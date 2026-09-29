import { describe, expect, it } from "vitest";
import { buildDocument } from "../../src/engine/build";

const one = (data: Record<string, unknown>, variant: string, paper = "A4") =>
  buildDocument(
    {
      switchback: 1,
      paper,
      kit: { index_cards: true, scissors: true },
      pages: [{ id: "W1-P4", component: "card-sort", variant, data }],
    },
    { embedFonts: false },
  );

describe("card-sort", () => {
  it("names where the candidates come from", () => {
    const html =
      one({ source: "the survivors from W1-P2", columns: ["Now", "Later"] }, "index-cards").html ?? "";
    expect(html).toContain("Write each candidate from the survivors from W1-P2 on its own index card");
    const writeIn = one({ source: "the survivors from W1-P2" }, "write-in").html ?? "";
    expect(writeIn).toContain("write each candidate from the survivors from W1-P2 straight into the pile");
  });

  it("warns when index-card columns are too narrow on portrait paper", () => {
    const three = one({ columns: ["Now", "Later", "Never"] }, "index-cards");
    const w = three.diagnostics.find((d) => d.code === "W_NARROW")!;
    expect(w).toMatchObject({ level: "warning", page: "W1-P4" });
    expect(w.message).toContain("76 mm");
    expect(one({ columns: ["Now", "Later"] }, "index-cards").diagnostics.map((d) => d.code)).not.toContain(
      "W_NARROW",
    );
    expect(
      one({ columns: ["Now", "Later", "Never"] }, "write-in").diagnostics.map((d) => d.code),
    ).not.toContain("W_NARROW");
    expect(one({}, "index-cards").diagnostics.map((d) => d.code)).toContain("W_NARROW"); // 3 unnamed piles
  });
});
