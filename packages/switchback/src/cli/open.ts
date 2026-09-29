import { spawn } from "node:child_process";

/**
 * Pure command construction, kept separate from the spawn so it can be
 * asserted on directly. On win32 this launches `explorer.exe` with the path
 * as its own argv entry — never through `cmd`, whose `/c` shell parsing would
 * mistreat a path containing `&`, `^`, or `%`.
 */
export function openCommand(path: string, platform: NodeJS.Platform): [string, string[]] {
  return platform === "win32"
    ? ["explorer.exe", [path]]
    : platform === "darwin"
      ? ["open", [path]]
      : ["xdg-open", [path]];
}

export function openInBrowser(path: string, platform: NodeJS.Platform = process.platform): void {
  const [cmd, args] = openCommand(path, platform);
  spawn(cmd, args, { detached: true, stdio: "ignore", windowsHide: true }).unref();
}
