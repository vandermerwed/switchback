// Tests for scripts/check-skills.mjs. Run with: node --test scripts/
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { checkSkills } from "./check-skills.mjs";

function repo(skills = {}, { marketplace = true, version = "0.1.0" } = {}) {
  const root = mkdtempSync(join(tmpdir(), "check-skills-"));
  if (marketplace) {
    mkdirSync(join(root, ".claude-plugin"));
    writeFileSync(
      join(root, ".claude-plugin", "marketplace.json"),
      JSON.stringify({
        name: "switchback",
        owner: { name: "x" },
        plugins: [{ name: "switchback", source: "./" }],
      }),
    );
    writeFileSync(
      join(root, ".claude-plugin", "plugin.json"),
      JSON.stringify(version ? { name: "switchback", version } : { name: "switchback" }),
    );
  }
  mkdirSync(join(root, "skills"));
  for (const [name, files] of Object.entries(skills)) {
    mkdirSync(join(root, "skills", name), { recursive: true });
    for (const [file, text] of Object.entries(files)) {
      mkdirSync(join(root, "skills", name, file, ".."), { recursive: true });
      writeFileSync(join(root, "skills", name, file), text);
    }
  }
  return root;
}
const RUNS = "Run `switchback list`, or `npx -y @vandermerwed/switchback@0.1.0 list`.";
const skill = (name, body = RUNS, desc = "Does a thing. Use when x.") =>
  `---\nname: ${name}\ndescription: ${desc}\n---\n\n# ${name}\n\n${body}\n`;

test("an empty skills folder is ok", () => {
  assert.deepEqual(checkSkills(repo()), { skills: 0, problems: [] });
});

test("a well-formed skill passes", () => {
  const r = checkSkills(repo({ "to-thing": { "SKILL.md": skill("to-thing") } }));
  assert.deepEqual(r.problems, []);
  assert.equal(r.skills, 1);
});

test("flags a name that differs from its folder, or is not lowercase-hyphen", () => {
  const r = checkSkills(repo({ "to-thing": { "SKILL.md": skill("To_Thing") } }));
  assert.ok(r.problems.some((p) => p.includes("name")));
});

test("flags missing frontmatter and a missing or over-long description", () => {
  assert.ok(
    checkSkills(repo({ a: { "SKILL.md": "# no frontmatter\n" } })).problems.some((p) =>
      p.includes("frontmatter"),
    ),
  );
  const long = skill("a", undefined, "x".repeat(1025));
  assert.ok(checkSkills(repo({ a: { "SKILL.md": long } })).problems.some((p) => p.includes("description")));
});

test("reads a folded description as its text", () => {
  const folded = (text) => `---\nname: a\ndescription: >-\n  ${text}\n  Use when x.\n---\n\n# a\n\n${RUNS}\n`;
  assert.deepEqual(checkSkills(repo({ a: { "SKILL.md": folded("Does a thing.") } })).problems, []);
  const long = checkSkills(repo({ a: { "SKILL.md": folded("x".repeat(1025)) } }));
  assert.ok(long.problems.some((p) => p.includes("description is")));
});

test("flags a body of 500 lines or more", () => {
  const body = `${RUNS}\n${"line\n".repeat(500)}`;
  assert.ok(
    checkSkills(repo({ a: { "SKILL.md": skill("a", body) } })).problems.some((p) => p.includes("500")),
  );
});

test("flags reaching outside the skill folder", () => {
  const r = checkSkills(
    repo({ a: { "SKILL.md": skill("a"), "references/x.md": "see ../other/SKILL.md and _shared/" } }),
  );
  assert.ok(r.problems.some((p) => p.includes("../")));
  assert.ok(r.problems.some((p) => p.includes("_shared/")));
});

test("flags a skill that runs the CLI without the npx fallback pinned to the plugin version", () => {
  const r = checkSkills(repo({ a: { "SKILL.md": skill("a", "Run `switchback build spec.json`.") } }));
  assert.ok(r.problems.some((p) => p.includes("npx -y @vandermerwed/switchback@0.1.0")));
});

test("flags a reference that runs the CLI when SKILL.md lacks the fallback", () => {
  const r = checkSkills(
    repo({
      a: {
        "SKILL.md": skill("a", "See references/x.md."),
        "references/x.md": "Run `switchback media a.jpg`.",
      },
    }),
  );
  assert.ok(r.problems.some((p) => p.includes("lacks the fallback")));
});

test("flags a pinned version that differs from the plugin's", () => {
  const r = checkSkills(
    repo({
      a: {
        "SKILL.md": skill("a"),
        "references/x.md": "Or `npx -y @vandermerwed/switchback@0.0.9 show x`.",
      },
    }),
  );
  assert.ok(r.problems.some((p) => p.includes("@0.0.9") && p.includes("0.1.0")));
});

test("flags a plugin with no version when a skill runs the CLI", () => {
  const r = checkSkills(repo({ a: { "SKILL.md": skill("a") } }, { version: null }));
  assert.ok(r.problems.some((p) => p.includes("plugin.json") && p.includes("version")));
});

test("flags any mention of the old Longhand name", () => {
  const r = checkSkills(
    repo({ a: { "SKILL.md": skill("a"), "references/x.md": "Read the `W1.longhand.json` sidecar." } }),
  );
  assert.ok(r.problems.some((p) => p.includes("references/x.md") && p.includes("Longhand")));
});

test("flags a relative link whose target is missing", () => {
  const r = checkSkills(
    repo({ a: { "SKILL.md": skill("a", `${RUNS}\nSee [the mode](references/missing.md).`) } }),
  );
  assert.ok(r.problems.some((p) => p.includes("references/missing.md")));
  const ok = checkSkills(
    repo({
      a: {
        "SKILL.md": skill("a", `${RUNS}\nSee [the mode](references/x.md) and [web](https://example.com).`),
        "references/x.md": "Back to [the other](y.md).",
        "references/y.md": "y",
      },
    }),
  );
  assert.deepEqual(ok.problems, []);
});

test("flags a marketplace or package version that differs from the plugin's", () => {
  const root = repo({ a: { "SKILL.md": skill("a") } });
  const market = join(root, ".claude-plugin", "marketplace.json");
  writeFileSync(
    market,
    JSON.stringify({ name: "switchback", plugins: [{ name: "switchback", source: "./", version: "0.0.9" }] }),
  );
  mkdirSync(join(root, "packages", "switchback"), { recursive: true });
  writeFileSync(join(root, "packages", "switchback", "package.json"), JSON.stringify({ version: "0.0.8" }));
  const r = checkSkills(root);
  assert.ok(r.problems.some((p) => p.includes("marketplace.json") && p.includes("0.0.9")));
  assert.ok(r.problems.some((p) => p.includes("package.json") && p.includes("0.0.8")));
});

test("flags invalid or mismatched plugin manifests", () => {
  const root = repo({}, { marketplace: false });
  assert.ok(checkSkills(root).problems.some((p) => p.includes("marketplace.json")));
});
