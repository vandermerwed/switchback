import { describe, expect, it } from "vitest";
import { formatDiagnostic } from "../../src/engine/diagnostics";
import { parseSpec } from "../../src/engine/spec";

const minimal = { switchback: 1, pages: [{ id: "W1-P1", component: "pre-mortem" }] };

describe("parseSpec", () => {
  it("accepts a minimal v1 spec", () => {
    const { spec, diagnostics } = parseSpec(minimal);
    expect(diagnostics).toEqual([]);
    expect(spec?.pages[0]?.component).toBe("pre-mortem");
  });

  it("names every legacy key with a fix", () => {
    const { spec, diagnostics } = parseSpec({
      kind: "workbook",
      stationery: {},
      meta: { round: 1 },
      pages: [{ id: "W1-P1", archetype: "cover" }],
    });
    expect(spec).toBeNull();
    const codes = diagnostics.map((d) => [d.code, d.path]);
    expect(codes).toContainEqual(["E_LEGACY_KEY", "/kind"]);
    expect(codes).toContainEqual(["E_LEGACY_KEY", "/stationery"]);
    expect(codes).toContainEqual(["E_LEGACY_KEY", "/meta"]);
    expect(codes).toContainEqual(["E_LEGACY_KEY", "/pages/0/archetype"]);
    expect(codes).toContainEqual(["E_LEGACY_KEY", "/switchback"]);
    expect(diagnostics.find((d) => d.path === "/pages/0/archetype")?.fix).toContain("component");
  });

  it("names the old format key when a spec still says longhand", () => {
    const { spec, diagnostics } = parseSpec({
      longhand: 1,
      pages: [{ id: "W1-P1", component: "pre-mortem" }],
    });
    expect(spec).toBeNull();
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0]).toMatchObject({ code: "E_LEGACY_KEY", path: "/longhand" });
    expect(diagnostics[0]?.fix).toContain('rename "longhand" to "switchback"');
  });

  it("reports schema violations with a JSON pointer", () => {
    const { diagnostics } = parseSpec({ switchback: 1, pages: [{ id: "page one", component: "x" }] });
    expect(diagnostics[0]?.code).toBe("E_SPEC_SCHEMA");
    expect(diagnostics[0]?.path).toBe("/pages/0/id");
  });

  it("rejects duplicate page ids", () => {
    const { diagnostics } = parseSpec({
      switchback: 1,
      pages: [
        { id: "W1-P1", component: "a" },
        { id: "W1-P1", component: "b" },
      ],
    });
    expect(diagnostics.map((d) => d.code)).toEqual(["E_DUPLICATE_ID"]);
  });

  it("rejects non-objects", () => {
    expect(parseSpec([]).diagnostics[0]?.code).toBe("E_SPEC_SCHEMA");
  });

  it("formats a diagnostic for humans", () => {
    const { diagnostics } = parseSpec({
      switchback: 1,
      pages: [
        { id: "W1-P1", component: "a" },
        { id: "W1-P1", component: "b" },
      ],
    });
    expect(formatDiagnostic(diagnostics[0]!)).toMatch(/^error E_DUPLICATE_ID W1-P1: .+\n {2}fix: /);
  });
});
