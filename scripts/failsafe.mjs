#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// ------------------------------
// Args
// ------------------------------
const argv = parseArgs(process.argv.slice(2));

const BASE = String(argv.base || "http://localhost:3000");
const STRICT = !!argv.strict;
const RUN_SEO = !!argv.seo;

// Tone Guard routes (één string, comma-separated)
const TONE_PATHS = String(
  argv.paths || "/,/opdrachtgevers,/voor-brandwachten,/belangen,/over-ons"
);

const REPORT_DIR = path.resolve(process.cwd(), "reports");
fs.mkdirSync(REPORT_DIR, { recursive: true });

console.log("\n🛡️ ProBrandwacht FAILSAFE — preflight checks\n");
console.log(`Base:   ${BASE}`);
console.log(`Strict: ${STRICT ? "YES" : "NO"}`);
console.log(`SEO:    ${RUN_SEO ? "YES" : "NO"}`);
console.log("—".repeat(120));

// ------------------------------
// Runner helpers
// ------------------------------
function resolveLocalBin(binName) {
  const suffix = process.platform === "win32" ? ".cmd" : "";
  const local = path.resolve(
    process.cwd(),
    "node_modules",
    ".bin",
    `${binName}${suffix}`
  );
  return fs.existsSync(local) ? local : null;
}

function runExec(label, command, args = []) {
  const r = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  return {
    label,
    code: r.status ?? 1,
    stdout: r.stdout || "",
    stderr: r.stderr || "",
  };
}

function runNode(label, scriptPath, args = []) {
  const full = path.resolve(process.cwd(), scriptPath);
  if (!fs.existsSync(full)) {
    return {
      label,
      code: 0,
      stdout: "",
      stderr: `Geen script gevonden (${scriptPath}). Check overgeslagen.`,
      _missing: true,
    };
  }
  return runExec(label, process.execPath, [full, ...args]);
}

function runTypeScript(label, scriptPath, args = []) {
  const full = path.resolve(process.cwd(), scriptPath);
  if (!fs.existsSync(full)) {
    return {
      label,
      code: 0,
      stdout: "",
      stderr: `Geen script gevonden (${scriptPath}). Check overgeslagen.`,
      _missing: true,
    };
  }

  const tsNodeBin = resolveLocalBin("ts-node");
  if (tsNodeBin) return runExec(label, tsNodeBin, ["--esm", full, ...args]);

  const tsxBin = resolveLocalBin("tsx");
  if (tsxBin) return runExec(label, tsxBin, [full, ...args]);

  return {
    label,
    code: 0,
    stdout: "",
    stderr:
      "Geen TypeScript runner gevonden (verwacht `tsx` of `ts-node` in node_modules/.bin). Check overgeslagen.",
    _missing: true,
  };
}

function computeStatusFromResult(res) {
  if (res._missing) return "warn";
  return res.code === 0 ? "ok" : "fail";
}

function printBlock(res, finalStatus) {
  const icon = finalStatus === "ok" ? "✅" : finalStatus === "warn" ? "⚠️" : "❌";
  console.log(`\n▶ ${res.label}`);
  console.log("—".repeat(120));
  console.log(`${icon} ${res.label} — ${finalStatus.toUpperCase()}`);
  if (res.stdout.trim()) console.log(res.stdout.trim());
  if (res.stderr.trim()) console.log(res.stderr.trim());
  console.log("—".repeat(120));
}

function add(res, finalOverride = null) {
  const baseStatus = computeStatusFromResult(res);
  const final = finalOverride || baseStatus;
  results.push({ ...res, status: baseStatus, final });
  printBlock(res, final);
}

function parseArgs(args) {
  // ondersteunt:
  // --base http://...
  // --base=http://...
  // --strict
  // --seo
  // --paths="/,/x,/y"
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith("--")) continue;

    if (a.includes("=")) {
      const [k, v] = a.slice(2).split("=");
      out[k] = v === undefined ? true : v;
      continue;
    }

    const key = a.slice(2);
    const next = args[i + 1];

    // boolean flags
    if (key === "strict" || key === "seo") {
      out[key] = true;
      continue;
    }

    // value flags
    if (next && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = true; // fallback
    }
  }
  return out;
}

// ------------------------------
// Checks
// ------------------------------
const results = [];

// 1) Tone Guard — ALWAYS pass explicit flags (no booleans)
add(
  runNode("Tone Guard", "scripts/tone-guard.ts", [
    `--url=${BASE}`,
    `--paths=${TONE_PATHS}`,
    ...(STRICT ? ["--strict"] : []),
  ])
);

// 2) Vakbond Scan — run TS script with same flags
add(
  runTypeScript("Vakbond Scan", "scripts/vakbond-sanity-scan.ts", [
    `--base=${BASE}`,
    `--paths=${TONE_PATHS}`,
    ...(STRICT ? ["--strict"] : []),
  ])
);

// 3) Tarief / Indicatie Check (optional)
add(runNode("Tarief / Indicatie Check", "scripts/tarief-indicatie.mjs", []));

// 4) Content Consistency (optional)
add(runNode("Content Consistency", "scripts/content-consistency.mjs", []));

// 5) SEO Sanity — only fail in STRICT mode, otherwise warn on non-zero
if (RUN_SEO) {
  const seoRes = runNode("SEO Sanity", "scripts/seoAudit.mjs", [
    "--start=https://www.probrandwacht.nl",
  ]);

  const seoStatus = computeStatusFromResult(seoRes);
  const seoFinal =
    seoStatus === "ok" ? "ok" : STRICT ? "fail" : "warn";

  add(seoRes, seoFinal);
} else {
  add({
    label: "SEO Sanity",
    code: 0,
    stdout: "",
    stderr: "SEO audit overgeslagen (run met --seo om te draaien).",
    _missing: true,
  });
}

// ------------------------------
// Summary + exit code
// ------------------------------
const summary = { ok: 0, warn: 0, fail: 0 };
for (const r of results) summary[r.final]++;

console.log(`\n📊 Samenvatting`);
console.log(`   OK:    ${summary.ok}`);
console.log(`   WARN:  ${summary.warn}`);
console.log(`   FAIL:  ${summary.fail}`);

const outPath = path.join(REPORT_DIR, "failsafe.json");
fs.writeFileSync(
  outPath,
  JSON.stringify({ base: BASE, strict: STRICT, seo: RUN_SEO, results }, null, 2),
  "utf8"
);
console.log(`\n📝 JSON-rapport: ${outPath}`);

if (summary.fail > 0) {
  console.log(`\n⛔ FAILSAFE BLOCKED\nFix eerst de FAIL checks hierboven.`);
  process.exit(1);
}

console.log(`\n✅ FAILSAFE OK (warnings zijn toegestaan${STRICT ? " (strict mode)" : ""}).`);
process.exit(0);

