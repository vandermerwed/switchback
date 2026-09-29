// Checks the Switchback skill and plugin manifests.
// Usage: node scripts/check-skills.mjs [repo-root]. Exits 1 with one line per problem.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PACKAGE = "@vandermerwed/switchback";
const RUNS_CLI = /`switchback\s/;
const PIN = /@vandermerwed\/switchback@([^\s`"')]+)/g;

function files(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

/** Reads `key: value` lines; a folded (`>`, `>-`) or literal (`|`) value takes the indented lines below it. */
function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return null;
  const fields = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = /^([a-z_-]+):\s*(.*)$/i.exec(lines[i]);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^[>|][+-]?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = block.join(value.startsWith(">") ? " " : "\n");
    }
    fields[kv[1]] = value;
  }
  return { fields, body: text.slice(m[0].length) };
}

function readJson(path, problems) {
  if (!existsSync(path)) {
    problems.push(`${path}: missing`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    problems.push(`${path}: invalid JSON (${e.message})`);
    return null;
  }
}

export function checkSkills(root) {
  const problems = [];
  const rel = (p) => relative(root, p).replace(/\\/g, "/");

  const market = readJson(join(root, ".claude-plugin", "marketplace.json"), problems);
  const plugin = readJson(join(root, ".claude-plugin", "plugin.json"), problems);
  if (market && plugin) {
    const listed = (market.plugins ?? []).map((p) => p.name);
    if (!listed.includes(plugin.name))
      problems.push(
        `.claude-plugin/marketplace.json: does not list plugin "${plugin.name}" from plugin.json`,
      );
  }
  const version = plugin?.version;
  const fallback = `npx -y ${PACKAGE}@${version}`;
  if (version) {
    for (const entry of market?.plugins ?? [])
      if (entry.name === plugin.name && entry.version && entry.version !== version)
        problems.push(
          `.claude-plugin/marketplace.json: lists ${entry.name} at ${entry.version}, but plugin.json is ${version}`,
        );
    const pkgPath = join(root, "packages", "switchback", "package.json");
    const pkg = existsSync(pkgPath) ? readJson(pkgPath, problems) : null;
    if (pkg?.version && pkg.version !== version)
      problems.push(`packages/switchback/package.json: is ${pkg.version}, but plugin.json is ${version}`);
  }

  const skillsDir = join(root, "skills");
  const names = existsSync(skillsDir)
    ? readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory())
    : [];
  for (const name of names) {
    const dir = join(skillsDir, name);
    const skillFile = join(dir, "SKILL.md");
    if (!existsSync(skillFile)) {
      problems.push(`${rel(dir)}: no SKILL.md`);
      continue;
    }
    const text = readFileSync(skillFile, "utf8");
    const fm = frontmatter(text);
    if (!fm) {
      problems.push(`${rel(skillFile)}: missing YAML frontmatter`);
      continue;
    }
    const { name: fmName, description } = fm.fields;
    if (fmName !== name)
      problems.push(`${rel(skillFile)}: frontmatter name "${fmName}" differs from folder "${name}"`);
    if (!NAME.test(name) || name.length > 64)
      problems.push(`${rel(skillFile)}: name "${name}" must be lowercase-hyphen and at most 64 characters`);
    if (!description) problems.push(`${rel(skillFile)}: missing description`);
    else if (description.length > 1024)
      problems.push(`${rel(skillFile)}: description is ${description.length} characters (max 1024)`);
    const bodyLines = fm.body.split(/\r?\n/).length;
    if (bodyLines >= 500) problems.push(`${rel(skillFile)}: body is ${bodyLines} lines (must be under 500)`);

    let runsCli = false;
    for (const f of files(dir)) {
      if (!f.endsWith(".md")) continue;
      const t = readFileSync(f, "utf8");
      if (RUNS_CLI.test(t)) runsCli = true;
      if (t.includes("../")) problems.push(`${rel(f)}: references a path outside the skill ("../")`);
      if (t.includes("_shared/")) problems.push(`${rel(f)}: references the removed "_shared/" folder`);
      if (/longhand/i.test(t)) problems.push(`${rel(f)}: still names the old product, Longhand`);
      for (const [, target] of t.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) {
        if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
        if (!existsSync(join(dirname(f), target)))
          problems.push(`${rel(f)}: links to ${target}, which does not exist`);
      }
      for (const [, pinned] of t.matchAll(PIN))
        if (version && pinned !== version)
          problems.push(`${rel(f)}: pins ${PACKAGE}@${pinned}, but the plugin is version ${version}`);
    }
    if (runsCli && !version)
      problems.push(`.claude-plugin/plugin.json: no version to pin the CLI fallback to`);
    else if (runsCli && !text.includes(fallback))
      problems.push(`${rel(skillFile)}: runs the CLI but lacks the fallback "${fallback}"`);
  }
  return { skills: names.length, problems };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..");
  const { skills, problems } = checkSkills(root);
  for (const p of problems) console.error(p);
  if (problems.length) process.exit(1);
  console.log(`ok: ${skills} skill${skills === 1 ? "" : "s"}`);
}
