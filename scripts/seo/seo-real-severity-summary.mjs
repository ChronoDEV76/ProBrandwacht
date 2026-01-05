#!/usr/bin/env node
import fs from "node:fs";

const argv = process.argv.slice(2);
const fileArg =
  argv.find((x) => x.startsWith("--file="))?.split("=")[1] ??
  "reports/seo_report.json";

const raw = JSON.parse(fs.readFileSync(fileArg, "utf8"));

function sev(x) {
  return String(x?.severity ?? x?.level ?? x?.sev ?? "").toLowerCase();
}
function listify(x) {
  if (!x) return [];
  if (Array.isArray(x)) return x.flatMap(listify);
  if (typeof x === "object") return Object.values(x).flatMap(listify);
  return [];
}

function countBySeverity(any) {
  const items = listify(any);
  let critical = 0;
  let warning = 0;
  let info = 0;
  for (const it of items) {
    const s = sev(it);
    if (s === "critical") critical++;
    else if (s === "warning") warning++;
    else if (s === "info") info++;
  }
  return { critical, warning, info };
}

let total = { critical: 0, warning: 0, info: 0 };
let rollup = { critical: 0, warning: 0, info: 0 };

const pages = raw.pages || [];
for (const p of pages) {
  const a = countBySeverity(p.errors);
  const b = countBySeverity(p.suggestions);
  const c = countBySeverity(p.checks);

  total.critical += a.critical + b.critical + c.critical;
  total.warning += a.warning + b.warning + c.warning;
  total.info += a.info + b.info + c.info;

  const s = p._severityCounts || {};
  rollup.critical += s.critical || 0;
  rollup.warning += s.warning || 0;
  rollup.info += s.info || 0;
}

console.log("—".repeat(80));
console.log(`🔎 SEO report file: ${fileArg}`);
console.log("—".repeat(80));
console.log(`Pages: ${pages.length}`);
console.log(
  `REAL findings     — Critical: ${total.critical} · Warnings: ${total.warning} · Info: ${total.info}`
);
console.log(
  `ROLLUP (_severity) — Critical: ${rollup.critical} · Warnings: ${rollup.warning} · Info: ${rollup.info}`
);

if (rollup.critical > 0 && total.critical === 0) {
  console.log(
    "\n⚠️ Note: report bevat rollup criticals maar geen uitleesbare critical findings."
  );
  console.log(
    "   Dit wijst op een export/serialisatie-issue in de audittool."
  );
}
