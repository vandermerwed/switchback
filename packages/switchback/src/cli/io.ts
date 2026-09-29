export interface Io {
  out(line: string): void;
  err(line: string): void;
}

export const processIo: Io = {
  out: (line) => process.stdout.write(`${line}\n`),
  err: (line) => process.stderr.write(`${line}\n`),
};

export function captureIo(): Io & { stdout: string[]; stderr: string[] } {
  const stdout: string[] = [];
  const stderr: string[] = [];
  return { stdout, stderr, out: (line) => stdout.push(line), err: (line) => stderr.push(line) };
}
