// Merge research/grading/<family>.json (step 3) and <family>.adversarial.json (step 4)
// into research/grounding.json (spec §5.2), and print the per-item summary used by the
// grading report (spec §11). The displayed grade is the lowest final grade among an
// item's load-bearing claims (§6.3); a downgrade from step 4 replaces the step-3 grade.
//
// Usage: node research/tools/build-grounding.mjs [--summary]

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const gradingDir = join(root, "grading");
const ORDER = { A: 0, B: 1, C: 2, D: 3 };

const claims = {};
const items = {};
for (const file of readdirSync(gradingDir).filter(
  (f) => f.endsWith(".json") && !f.includes(".adversarial."),
)) {
  const fam = JSON.parse(readFileSync(join(gradingDir, file), "utf8"));
  const advPath = join(gradingDir, file.replace(".json", ".adversarial.json"));
  const adv = existsSync(advPath) ? JSON.parse(readFileSync(advPath, "utf8")) : null;
  const md = readFileSync(join(root, `${fam.family}.md`), "utf8");
  for (const [id, c] of Object.entries(fam.claims)) {
    const a = adv?.[id];
    const grade = a?.result === "downgraded" ? a.to : c.grade;
    let dKind = null;
    if (grade === "D") {
      const tb = String(c.tie_break ?? "");
      const slug = id.split("/")[1];
      const sec = md.slice(Math.max(0, md.search(new RegExp(`^## .*${slug}`, "m"))));
      const gradeBlock = sec.slice(sec.indexOf("### Grade"), sec.indexOf("### Adversarial pass"));
      if (/\b6\b/.test(tb)) dKind = "practice";
      else if (/\b5\b/.test(tb)) dKind = "theory";
      else if (/unread|not read|no cached abstract/i.test(gradeBlock)) dKind = "unread";
      else dKind = "untested";
    }
    claims[id] = {
      claim: c.claim,
      construct: c.construct,
      grade,
      grade_step3: c.grade,
      adversarial: a ? a.result : "pending",
      transfer: c.transfer,
      effect: c.effect,
      tie_break: c.tie_break,
      d_kind: dKind,
      sources: c.sources,
      rationale: c.rationale,
      suggested_rewording: c.suggested_rewording ?? null,
    };
  }
  // Style ids in registry/styles.json are lower case; graders sometimes capitalised them.
  for (const [id, it] of Object.entries(fam.items))
    items[it.kind === "style" ? id.toLowerCase() : id] = { ...it, family: fam.family };
}

const out = {
  generated: new Date().toISOString().slice(0, 10),
  components: {},
  variants: {},
  presets: {},
  styles: {},
  protocols: {},
  collection: {},
};
const summary = [];
const cut = [];
for (const [id, it] of Object.entries(items)) {
  if (it.cut) {
    cut.push(id);
    continue;
  } // cut at a gate: not built, so not grounded
  const resolved = it.claims.map((ref) => {
    const c = claims[ref.id];
    return {
      id: ref.id,
      load_bearing: ref.load_bearing,
      transfer: ref.transfer ?? c?.transfer ?? null,
      ...(c
        ? {
            claim: c.claim,
            construct: c.construct,
            grade: c.grade,
            effect: c.effect,
            sources: c.sources,
            rationale: c.rationale,
          }
        : { missing: true }),
    };
  });
  const lb = resolved.filter((r) => r.load_bearing);
  const graded = lb.filter((r) => r.grade);
  const displayed = graded.length
    ? graded.reduce((w, r) => (ORDER[r.grade] > ORDER[w] ? r.grade : w), "A")
    : null;
  const bucket =
    {
      component: "components",
      variant: "variants",
      preset: "presets",
      style: "styles",
      protocol: "protocols",
      collection: "collection",
    }[it.kind] ?? "components";
  out[bucket][it.id ?? id] = {
    displayed_grade: displayed,
    claims: resolved,
    helps: it.helps,
    backfires: it.backfires,
  };
  const weakest = graded
    .filter((r) => r.grade === displayed)
    .map((r) => `${r.id.split("/")[1]}${claims[r.id].d_kind ? ` (${claims[r.id].d_kind})` : ""}`);
  const pending = lb.some((r) => claims[r.id]?.adversarial === "pending");
  summary.push({
    id: it.id ?? id,
    kind: it.kind,
    displayed,
    weakest,
    lbCount: lb.length,
    missing: resolved.filter((r) => r.missing).map((r) => r.id),
    pending,
  });
}

writeFileSync(join(root, "grounding.json"), JSON.stringify(out, null, 2) + "\n");

if (process.argv.includes("--summary")) {
  const kinds = ["style", "component", "variant", "preset", "protocol", "collection"];
  summary.sort((a, b) => kinds.indexOf(a.kind) - kinds.indexOf(b.kind) || a.id.localeCompare(b.id));
  console.log("| item | kind | displayed | set by (weakest load-bearing claim) | LB claims | step 4 |");
  console.log("| --- | --- | --- | --- | --- | --- |");
  for (const s of summary)
    console.log(
      `| ${s.id} | ${s.kind} | **${s.displayed ?? "—"}** | ${s.weakest.join(", ") || "—"}${s.missing.length ? ` · missing: ${s.missing.join(", ")}` : ""} | ${s.lbCount} | ${s.pending ? "pending" : "done"} |`,
    );
  const counts = {};
  for (const s of summary) counts[s.displayed ?? "—"] = (counts[s.displayed ?? "—"] ?? 0) + 1;
  if (cut.length) console.log(`\ncut at a gate (not grounded): ${cut.join(", ")}`);
  console.log(`\nitems: ${summary.length} · displayed grades: ${JSON.stringify(counts)}`);
  const cc = {};
  for (const c of Object.values(claims)) {
    const k = c.grade + (c.d_kind ? `-${c.d_kind}` : "");
    cc[k] = (cc[k] ?? 0) + 1;
  }
  console.log(`claims: ${Object.keys(claims).length} · ${JSON.stringify(cc)}`);
}
