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

  it("prints three or more piles on a landscape page", () => {
    expect(one({ columns: ["Now", "Later", "Never"] }, "write-in").sidecar?.pages[0]?.orientation).toBe(
      "landscape",
    );
    expect(one({}, "write-in").sidecar?.pages[0]?.orientation).toBe("landscape"); // 3 unnamed piles
    expect(one({ columns: ["Now", "Later"] }, "write-in").sidecar?.pages[0]?.orientation).toBe("portrait");
  });

  it("fits three index-card piles on a landscape page and warns from four", () => {
    expect(
      one({ columns: ["Now", "Later", "Never"] }, "index-cards").diagnostics.map((d) => d.code),
    ).not.toContain("W_NARROW");
    expect(one({}, "index-cards").diagnostics.map((d) => d.code)).not.toContain("W_NARROW");
    const four = one({ columns: ["A", "B", "C", "D"] }, "index-cards");
    const w = four.diagnostics.find((d) => d.code === "W_NARROW")!;
    expect(w).toMatchObject({ level: "warning", page: "W1-P4" });
    expect(w.message).toContain("76 mm");
    expect(w.message).toContain("66 mm");
    expect(one({ columns: ["A", "B", "C", "D"] }, "write-in").diagnostics.map((d) => d.code)).not.toContain(
      "W_NARROW",
    );
  });

  it("measures index-card piles on Letter landscape from Letter's long side", () => {
    const four = one({ columns: ["A", "B", "C", "D"] }, "index-cards", "Letter");
    expect(four.diagnostics.find((d) => d.code === "W_NARROW")!.message).toContain("62 mm");
  });
});
