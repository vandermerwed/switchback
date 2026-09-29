import { describe, expect, it } from "vitest";
import { openCommand } from "../../src/cli/open";

describe("openCommand", () => {
  it("launches explorer.exe directly on win32, with the path as its own argument", () => {
    const path = "C:\\reports\\risk & reward 50% ^done.html";
    expect(openCommand(path, "win32")).toEqual(["explorer.exe", [path]]);
  });

  it("uses open on darwin", () => {
    expect(openCommand("/tmp/spec.html", "darwin")).toEqual(["open", ["/tmp/spec.html"]]);
  });

  it("uses xdg-open elsewhere", () => {
    expect(openCommand("/tmp/spec.html", "linux")).toEqual(["xdg-open", ["/tmp/spec.html"]]);
  });
});
