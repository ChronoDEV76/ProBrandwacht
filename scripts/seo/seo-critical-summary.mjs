#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = { file: "seo_report.json", url: "https://www.probrandwacht.nl/" };
  for (const a of argv) {
    if (a.startsWith("--file=")) out.file = a.split("=").slice(1).join("=");
    if (a.startsWith("--url=")) out.url = a.split("=").slice(1).join("=");
  }
  return out;
}

function pick(obj, keys) {
  for (const k of keys) if (obj && obj[k] != null) return obj[k];
  return null;
}

function normalizeUrl(u) {
  return String(u || "").replace(/\/+$/, "") + "/";
}

const args = parseArgs(process.argv.slice(2));
const reportPath = path.resolve(process.cwd(), args.file);

if (!fs.existsSync(reportPath)) {
  console.error(`❌ Report not found: ${reportPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

const pages = pick(report, ["pages", "results", "items"]) || [];
const target = normalizeUrl(args.url);

const page =
  pages.find((p) => normalizeUrl(p.url) === target) ||
  pages.find((p) => normalizeUrl(p.pageUrl || p.href) === target) ||
  pages.find((p) => String(p.url || "").includes("probrandwacht.nl/"));

if (!page) {
  console.error(`❌ Page not found in report for: ${args.url}`);
  console.error(`Found pages: ${pages.length}`);
  process.exit(1);
}

const issues = pick(page, ["issues", "findings", "problems"]) || [];
const critical = issues.filter((i) => {
  const sev = String(pick(i, ["severity", "level", "type"]) || "").toLowerCase();
  return sev === "critical" || sev === "error";
});

console.log("—".repeat(80));
console.log(`🔎 SEO Criticals for: ${page.url || args.url}`);
console.log(`Critical found: ${critical.length}`);
console.log("—".repeat(80));

for (const c of critical) {
  const code = pick(c, ["code", "id", "rule"]) || "UNKNOWN";
  const msg = pick(c, ["message", "title", "description"]) || JSON.stringify(c).slice(0, 200);
  console.log(`- [${code}] ${msg}`);
}

process.exit(0);

