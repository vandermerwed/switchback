import { describe, expect, it } from "vitest";
import * as switchback from "../src/index";

describe("library API", () => {
  it("exports the documented functions", () => {
    for (const name of [
      "loadCatalogue",
      "createCatalogue",
      "buildDocument",
      "renderComponent",
      "fontFaceCss",
      "resolveKit",
      "assignPens",
    ]) {
      expect(typeof (switchback as Record<string, unknown>)[name], name).toBe("function");
    }
    expect(typeof switchback.tokensCss).toBe("string");
    expect(switchback.MINIMUM_KIT.paper).toBe("A4");
  });
});
