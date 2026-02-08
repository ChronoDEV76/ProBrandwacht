#!/usr/bin/env node
/**
 * VR Blog Guard (live crawl)
 * - Crawls /blog
 * - Fetches each post
 * - Checks headings + tone rules + VR/Bbl vocabulary score
 *
 * Usage:
 *   node scripts/blog/vr-blog-guard.mjs
 *   node scripts/blog/vr-blog-guard.mjs --config scripts/blog/vr-blog-guard.config.json
 *   node scripts/blog/vr-blog-guard.mjs --base https://www.probrandwacht.nl --path /blog --max 40
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_CONFIG = "scripts/blog/vr-blog-guard.config.json";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const FORCE_LOCAL =
  String(process.argv.find((a) => a.startsWith("--local="))?.split("=")[1] ?? "0") === "1" ||
  process.env.CI === "true";

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeWhitespace(s) {
  return s.replace(/\s+/g, " ").trim();
}

function stripMarkdown(text) {
  return normalizeWhitespace(
    text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]+`/g, " ")
      .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
      .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#>*_~`]/g, " ")
  );
}

function stripHtml(html) {
  // crude but effective: remove scripts/styles, then tags, decode common entities
  const noScript = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const text = noScript.replace(/<[^>]+>/g, " ");
  return decodeEntities(normalizeWhitespace(text));
}

function decodeEntities(s) {
  // Minimal decoding (enough for context printing)
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function safeUrlJoin(base, p) {
  if (!p) return base;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const pp = p.startsWith("/") ? p : `/${p}`;
  return `${b}${pp}`;
}

async function fetchText(url, cfg) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), cfg.timeoutMs ?? 15000);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": cfg.userAgent ?? "VR Blog Guard/1.0" },
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function extractPostLinksFromBlogIndex(html, cfg) {
  // Parse all href="/blog/slug" occurrences; de-dupe.
  const links = new Set();
  const re = /href\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (!href) continue;
    if (!cfg.includeUrlPrefixes.some((p) => href.startsWith(p))) continue;
    if (cfg.excludeUrlPatterns.some((pat) => new RegExp(pat).test(href))) continue;
    links.add(href.split("#")[0]);
  }
  return Array.from(links);
}

function extractHeadings(html) {
  // grab H1/H2/H3 text content
  const headings = [];
  const re = /<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = stripHtml(m[2]);
    if (raw) headings.push(raw);
  }
  return headings;
}

function extractHeadingsFromMdx(content) {
  const lines = content.split(/\r?\n/);
  const headings = [];
  for (const line of lines) {
    const m = line.match(/^#{1,3}\s+(.+?)\s*$/);
    if (m) headings.push(m[1].trim());
  }
  return headings;
}

function findMatches(text, patterns, contextChars) {
  const findings = [];
  for (const pat of patterns) {
    const re = new RegExp(pat, "gi");
    let m;
    while ((m = re.exec(text)) !== null) {
      const idx = m.index;
      const match = m[0];
      const start = Math.max(0, idx - contextChars);
      const end = Math.min(text.length, idx + match.length + contextChars);
      const ctx = text.slice(start, end);
      findings.push({ match, context: ctx });
      // prevent infinite loops on zero-length
      if (re.lastIndex === idx) re.lastIndex++;
      // only show first few per pattern to keep output readable
      if (findings.length >= 6) break;
    }
  }
  return findings;
}

function anyRequiredHeadingPresent(headings, requiredSets) {
  const hay = headings.map((h) => h.toLowerCase());
  const missing = [];

  for (const set of requiredSets) {
    const ok = set.some((needle) =>
      hay.some((h) => h.includes(String(needle).toLowerCase()))
    );
    if (!ok) missing.push(set);
  }
  return { ok: missing.length === 0, missing };
}

function vrToneScore(text, toneCfg) {
  // Score idea:
  // - Start 100
  // - subtract for softBan hits
  // - add small points if whitelist terms appear (cap)
  let score = 100;

  const lower = text.toLowerCase();

  let softHits = 0;
  for (const pat of toneCfg.softBan ?? []) {
    const re = new RegExp(pat, "gi");
    if (re.test(lower)) softHits++;
  }
  score -= softHits * 8;

  let whitelistHits = 0;
  for (const w of toneCfg.whitelist ?? []) {
    const re = new RegExp(`\\b${escapeRegExp(String(w).toLowerCase())}\\b`, "g");
    if (re.test(lower)) whitelistHits++;
  }
  score += Math.min(15, whitelistHits * 1.2);

  // Clamp
  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, softHits, whitelistHits };
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function severityRank(s) {
  if (s === "HIGH") return 3;
  if (s === "MEDIUM") return 2;
  if (s === "LOW") return 1;
  return 0;
}

function printHeader(cfg, configPath) {
  console.log("=== ProBrandwacht VR Blog Guard (live) ===");
  console.log(`Base: ${cfg.baseUrl}`);
  console.log(`Start: ${cfg.startPath}`);
  console.log(`Config: ${path.resolve(configPath)}`);
  console.log(`Time: ${nowIso()}`);
  console.log("");
}

function printSummary(findings) {
  const counts = { HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 };
  for (const f of findings) counts[f.severity] = (counts[f.severity] ?? 0) + 1;

  const total = findings.length;
  console.log(
    `Findings: ${total} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, LOW ${counts.LOW}, INFO ${counts.INFO})`
  );
  console.log("");
}

function printFindingBlock(f) {
  console.log(`[${f.severity}] ${f.ruleId}`);
  if (f.note) console.log(`  Note: ${f.note}`);
  console.log(`  URL: ${f.url}`);
  if (f.title) console.log(`  Title: ${f.title}`);

  if (f.match) console.log(`  Match: ${f.match}`);
  if (f.context) console.log(`  Context: ${f.context}`);
  if (f.extra) console.log(`  Extra: ${f.extra}`);
  console.log("");
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function parseFrontmatter(src) {
  const match = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return { data: {}, body: src };
  const fmText = match[1];
  const body = src.slice(match[0].length);
  const data = {};
  const lines = fmText.split("\n");
  for (const line of lines) {
    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    val = val.replace(/^['"]|['"]$/g, "");
    data[key] = val;
  }
  return { data, body };
}

async function main() {
  const configPath = argValue("--config") || DEFAULT_CONFIG;
  const cfg = readJson(configPath);

  // CLI overrides
  cfg.baseUrl = argValue("--base") || cfg.baseUrl;
  cfg.startPath = argValue("--path") || cfg.startPath;
  cfg.maxPosts = Number(argValue("--max") || cfg.maxPosts || 80);

  const indexUrl = safeUrlJoin(cfg.baseUrl, cfg.startPath);
  printHeader(cfg, configPath);

  if (FORCE_LOCAL) {
    console.log("⚠️  Live crawl overgeslagen (force local / CI).");
    const files = walk(BLOG_DIR).filter((f) => f.endsWith(".mdx") && !path.basename(f).startsWith("_"));

    const allFindings = [];

    for (const file of files) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slug = data.slug ? String(data.slug) : path.basename(file, ".mdx");
      const url = safeUrlJoin(cfg.baseUrl, `/blog/${slug}`);
      const headings = extractHeadingsFromMdx(body);
      const title = data.title ? String(data.title) : (headings[0] || slug);

      const req = anyRequiredHeadingPresent(headings, cfg.requiredHeadingsAnyOf || []);
      if (!req.ok) {
        allFindings.push({
          severity: "MEDIUM",
          ruleId: "MISSING_SECTIONS",
          note: "Blog mist 1 of meer verwachte secties (kader/afbakening/gerelateerd).",
          url,
          title,
          extra: `Missing: ${req.missing.map((s) => `[${s.join(" | ")}]`).join(", ")}`
        });
      }

      const text = stripMarkdown(body);

      for (const rule of cfg.rules || []) {
        const matches = findMatches(text, rule.patterns || [], cfg.contextChars ?? 90);
        if (!matches.length) continue;

        for (const m of matches) {
          if (rule.allowIfNear?.length) {
            const ctxLower = (m.context || "").toLowerCase();
            const allowed = rule.allowIfNear.some((a) => new RegExp(a, "i").test(ctxLower));
            if (allowed) continue;
          }

          allFindings.push({
            severity: rule.severity,
            ruleId: rule.id,
            note: rule.note,
            url,
            title,
            match: m.match,
            context: m.context
          });
        }
      }

      const tone = vrToneScore(text, cfg.vrBblTone || {});
      const minOk = cfg.vrBblTone?.minScoreOk ?? 70;
      if (tone.score < minOk) {
        allFindings.push({
          severity: "MEDIUM",
          ruleId: "VR_TONE_SCORE_LOW",
          note: "VR/Bbl-toon score onder drempel (meer neutraal/verklarend formuleren).",
          url,
          title,
          extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits}, minOk=${minOk})`
        });
      } else if (hasFlag("--verbose")) {
        allFindings.push({
          severity: "INFO",
          ruleId: "VR_TONE_SCORE_OK",
          note: "VR/Bbl-toon score ok.",
          url,
          title,
          extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits})`
        });
      }
    }

    allFindings.sort((a, b) => {
      const d = severityRank(b.severity) - severityRank(a.severity);
      if (d !== 0) return d;
      return String(a.url).localeCompare(String(b.url));
    });

    printSummary(allFindings);
    for (const f of allFindings) printFindingBlock(f);
    const hasHigh = allFindings.some((f) => f.severity === "HIGH");
    process.exit(hasHigh ? 1 : 0);
  }

  let indexHtml;
  try {
    indexHtml = await fetchText(indexUrl, cfg);
  } catch (e) {
    console.error(`Failed to fetch blog index: ${indexUrl}`);
    console.error(String(e?.message || e));
    console.log("⚠️  Falling back to local content/blog scan.");
    const files = walk(BLOG_DIR).filter((f) => f.endsWith(".mdx") && !path.basename(f).startsWith("_"));

    const allFindings = [];

    for (const file of files) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slug = data.slug ? String(data.slug) : path.basename(file, ".mdx");
      const url = safeUrlJoin(cfg.baseUrl, `/blog/${slug}`);
      const headings = extractHeadingsFromMdx(body);
      const title = data.title ? String(data.title) : (headings[0] || slug);

      const req = anyRequiredHeadingPresent(headings, cfg.requiredHeadingsAnyOf || []);
      if (!req.ok) {
        allFindings.push({
          severity: "MEDIUM",
          ruleId: "MISSING_SECTIONS",
          note: "Blog mist 1 of meer verwachte secties (kader/afbakening/gerelateerd).",
          url,
          title,
          extra: `Missing: ${req.missing.map((s) => `[${s.join(" | ")}]`).join(", ")}`
        });
      }

      const text = stripMarkdown(body);

      for (const rule of cfg.rules || []) {
        const matches = findMatches(text, rule.patterns || [], cfg.contextChars ?? 90);
        if (!matches.length) continue;

        for (const m of matches) {
          if (rule.allowIfNear?.length) {
            const ctxLower = (m.context || "").toLowerCase();
            const allowed = rule.allowIfNear.some((a) => new RegExp(a, "i").test(ctxLower));
            if (allowed) continue;
          }

          allFindings.push({
            severity: rule.severity,
            ruleId: rule.id,
            note: rule.note,
            url,
            title,
            match: m.match,
            context: m.context
          });
        }
      }

      const tone = vrToneScore(text, cfg.vrBblTone || {});
      const minOk = cfg.vrBblTone?.minScoreOk ?? 70;
      if (tone.score < minOk) {
        allFindings.push({
          severity: "MEDIUM",
          ruleId: "VR_TONE_SCORE_LOW",
          note: "VR/Bbl-toon score onder drempel (meer neutraal/verklarend formuleren).",
          url,
          title,
          extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits}, minOk=${minOk})`
        });
      } else if (hasFlag("--verbose")) {
        allFindings.push({
          severity: "INFO",
          ruleId: "VR_TONE_SCORE_OK",
          note: "VR/Bbl-toon score ok.",
          url,
          title,
          extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits})`
        });
      }
    }

    allFindings.sort((a, b) => {
      const d = severityRank(b.severity) - severityRank(a.severity);
      if (d !== 0) return d;
      return String(a.url).localeCompare(String(b.url));
    });

    printSummary(allFindings);
    for (const f of allFindings) printFindingBlock(f);
    const hasHigh = allFindings.some((f) => f.severity === "HIGH");
    process.exit(hasHigh ? 1 : 0);
  }

  const postPaths = extractPostLinksFromBlogIndex(indexHtml, cfg).slice(0, cfg.maxPosts);
  if (!postPaths.length) {
    console.log("No blog posts found on index page. (Parsing rule may need update.)");
    process.exit(0);
  }

  const allFindings = [];

  for (const p of postPaths) {
    const url = safeUrlJoin(cfg.baseUrl, p);

    let html;
    try {
      html = await fetchText(url, cfg);
    } catch (e) {
      allFindings.push({
        severity: "HIGH",
        ruleId: "FETCH_ERROR",
        note: "Kon blog niet ophalen (HTTP/timeout).",
        url
      });
      continue;
    }

    const headings = extractHeadings(html);
    const title = headings.find((h) => h && h.length > 3) || "";

    // Required sections check
    const req = anyRequiredHeadingPresent(headings, cfg.requiredHeadingsAnyOf || []);
    if (!req.ok) {
      allFindings.push({
        severity: "MEDIUM",
        ruleId: "MISSING_SECTIONS",
        note: "Blog mist 1 of meer verwachte secties (kader/afbakening/gerelateerd).",
        url,
        title,
        extra: `Missing: ${req.missing.map((s) => `[${s.join(" | ")}]`).join(", ")}`
      });
    }

    // Text content checks
    const text = stripHtml(html);

    for (const rule of cfg.rules || []) {
      const matches = findMatches(text, rule.patterns || [], cfg.contextChars ?? 90);
      if (!matches.length) continue;

      for (const m of matches) {
        // allowIfNear logic (for guarantee language)
        if (rule.allowIfNear?.length) {
          const ctxLower = (m.context || "").toLowerCase();
          const allowed = rule.allowIfNear.some((a) => new RegExp(a, "i").test(ctxLower));
          if (allowed) continue;
        }

        allFindings.push({
          severity: rule.severity,
          ruleId: rule.id,
          note: rule.note,
          url,
          title,
          match: m.match,
          context: m.context
        });
      }
    }

    // VR/Bbl tone score
    const tone = vrToneScore(text, cfg.vrBblTone || {});
    const minOk = cfg.vrBblTone?.minScoreOk ?? 70;

    if (tone.score < minOk) {
      allFindings.push({
        severity: "MEDIUM",
        ruleId: "VR_TONE_SCORE_LOW",
        note: "VR/Bbl-toon score onder drempel (meer neutraal/verklarend formuleren).",
        url,
        title,
        extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits}, minOk=${minOk})`
      });
    } else if (hasFlag("--verbose")) {
      allFindings.push({
        severity: "INFO",
        ruleId: "VR_TONE_SCORE_OK",
        note: "VR/Bbl-toon score ok.",
        url,
        title,
        extra: `score=${tone.score} (softHits=${tone.softHits}, whitelistHits=${tone.whitelistHits})`
      });
    }
  }

  // Sort by severity then URL
  allFindings.sort((a, b) => {
    const d = severityRank(b.severity) - severityRank(a.severity);
    if (d !== 0) return d;
    return String(a.url).localeCompare(String(b.url));
  });

  printSummary(allFindings);

  for (const f of allFindings) printFindingBlock(f);

  // Exit codes like a guard
  const hasHigh = allFindings.some((f) => f.severity === "HIGH");
  process.exit(hasHigh ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
