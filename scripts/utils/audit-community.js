#!/usr/bin/env node
/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function listFiles(dir, filterFn = () => true) {
  const out = [];
  if (!exists(dir)) return out;

  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (filterFn(full)) out.push(full);
    }
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll("\\", "/");
}

function findRoutes() {
  const appDir = path.join(ROOT, "app");
  const pageFiles = listFiles(appDir, (f) => /\/page\.(t|j)sx?$/.test(f));
  const routePaths = pageFiles.map((f) => {
    const r = rel(f)
      .replace(/^app\//, "/")
      .replace(/\/page\.(t|j)sx?$/, "")
      .replace(/\/index$/, "/");
    return r === "" ? "/" : r;
  });

  const apiDir = path.join(appDir, "api");
  const apiFiles = listFiles(apiDir, (f) => /\/route\.(t|j)s$/.test(f));
  const apiPaths = apiFiles.map((f) =>
    rel(f)
      .replace(/^app\//, "/")
      .replace(/\/route\.(t|j)s$/, "")
  );

  return {
    routePaths: [...new Set(routePaths)].sort(),
    apiPaths: [...new Set(apiPaths)].sort(),
  };
}

function hasAnyDependency(pkg, names) {
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  return names.some((n) => Boolean(deps[n]));
}

function scanCommunitySignals({ routePaths, apiPaths }, pkg) {
  const signals = [];

  const knowledgeRoutes = routePaths.filter((r) =>
    ["/kennis", "/kennisbank", "/artikelen", "/blog", "/faq", "/wet-dba"].some((k) =>
      r.startsWith(k)
    )
  );

  signals.push({
    key: "knowledge_routes",
    label: "Kennis / vakinhoud routes",
    ok: knowledgeRoutes.length > 0,
    details: knowledgeRoutes,
  });

  const communityRoutes = routePaths.filter((r) =>
    ["/community", "/vragen", "/forum", "/leden", "/events", "/dashboard"].some(
      (k) => r.startsWith(k)
    )
  );

  signals.push({
    key: "community_routes",
    label: "Community / leden routes",
    ok: communityRoutes.length > 0,
    details: communityRoutes,
  });

  const hasAuthDep = hasAnyDependency(pkg, [
    "next-auth",
    "@clerk/nextjs",
    "@supabase/supabase-js",
    "lucia",
  ]);

  signals.push({
    key: "auth",
    label: "Authenticatie",
    ok: hasAuthDep,
    details: hasAuthDep ? "auth lib gevonden" : "geen auth lib",
  });

  const hasContentDir =
    exists(path.join(ROOT, "content")) || exists(path.join(ROOT, "data"));

  const hasMdxDep = hasAnyDependency(pkg, [
    "@next/mdx",
    "@mdx-js/react",
    "next-mdx-remote",
    "contentlayer",
  ]);

  signals.push({
    key: "content_pipeline",
    label: "Content / MDX pipeline",
    ok: hasContentDir && hasMdxDep,
    details: { hasContentDir, hasMdxDep },
  });

  const hasSeo =
    exists(path.join(ROOT, "next-seo.config.ts")) ||
    exists(path.join(ROOT, "next-sitemap.config.js"));

  signals.push({
    key: "seo",
    label: "SEO / sitemap",
    ok: hasSeo,
    details: hasSeo ? "gevonden" : "ontbreekt",
  });

  return signals;
}

function scoreSignals(signals) {
  let max = signals.length;
  let got = signals.filter((s) => s.ok).length;
  return Math.round((got / max) * 100);
}

function main() {
  const pkgPath = path.join(ROOT, "package.json");
  if (!exists(pkgPath)) {
    console.error("❌ package.json niet gevonden");
    process.exit(1);
  }

  const pkg = readJson(pkgPath);
  const routes = findRoutes();
  const signals = scanCommunitySignals(routes, pkg);
  const score = scoreSignals(signals);

  console.log("\n=== ProBrandwacht Community Audit ===\n");
  console.log(`Score: ${score}%\n`);

  for (const s of signals) {
    console.log(`${s.ok ? "✅" : "⚠️"} ${s.label}`);
    if (s.details) console.log("   ", s.details);
  }

  console.log("\nInterpretatie:");
  if (score >= 70) console.log("✔ Basis is geschikt voor community/kennisinitiatief.");
  else if (score >= 40)
    console.log("⚠️ Goede start, maar mist nog community-essentials.");
  else console.log("❌ Nog te veel marketing/site, te weinig community.");

  console.log("\nVolgende stap:");
  console.log(
    "→ Voeg kennisbank + lichte community toe vóór ProSafetyMatch activatie.\n"
  );
}

main();
