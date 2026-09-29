import { VERSION } from "../version";
import { type Command, UsageError } from "./args";
import { buildCommand } from "./commands/build";
import { initCommand } from "./commands/init";
import { legendCommand } from "./commands/legend";
import { listCommand } from "./commands/list";
import { mediaCommand } from "./commands/media";
import { profileCommand } from "./commands/profile";
import { proofCommand } from "./commands/proof";
import { showCommand } from "./commands/show";
import { validateCommand } from "./commands/validate";
import type { Io } from "./io";

export const USAGE = `switchback <command> [options]

Commands:
  init        set up your desk (paper, pens, stationery)
  profile     show or edit your saved profile
  list        browse components and presets
  show <id>   one component: contract, data, grounding
  build       render a spec to print-ready HTML (+ sidecar, --pdf)
  proof       turn a document into numbered proof pages to mark up
  media       make phone photos readable: HEIC, rotation, size, tiles
  legend      the colour language, marks and your pen mapping
  validate    check a spec, or the registry when run without one

Run \`switchback <command> --help\` for command options.`;

const COMMANDS: Record<string, Command> = {
  build: (argv, io, env) => buildCommand(argv, io, env),
  init: (argv, io, env) => initCommand(argv, io, env),
  legend: (argv, io, env) => legendCommand(argv, io, env),
  list: listCommand,
  media: (argv, io) => mediaCommand(argv, io),
  profile: profileCommand,
  proof: (argv, io, env) => proofCommand(argv, io, env),
  show: showCommand,
  validate: validateCommand,
};

export async function run(argv: string[], io: Io, env: NodeJS.ProcessEnv = process.env): Promise<number> {
  // Output is never coloured, so the global --no-color flag is accepted and ignored.
  const [command, ...rest] = argv.filter((arg) => arg !== "--no-color");
  if (command === undefined) {
    io.out(USAGE);
    return 2;
  }
  if (command === "--help" || command === "-h") {
    io.out(USAGE);
    return 0;
  }
  if (command === "--version" || command === "-v") {
    io.out(VERSION);
    return 0;
  }
  const handler = COMMANDS[command];
  if (!handler) {
    io.err(`unknown command: ${command}\n\n${USAGE}`);
    return 2;
  }
  try {
    return await handler(rest, io, env);
  } catch (e) {
    if (e instanceof UsageError) {
      io.err(e.message);
      return 2;
    }
    throw e;
  }
}
