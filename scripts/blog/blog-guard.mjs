#!/usr/bin/env node
import fs from "fs";
import path from "path";

const CONFIG_PATH = "scripts/blog/blog-guard.config.json";
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const TONE_PROFILE_PATH = "scripts/tone/probrandwacht-tone.json";

const findings = [];

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseToPatternString(phrase) {
  const escaped = escapeRegex(phrase).replace(/\s+/g, "\\s+");
  const startsWord = /^[A-Za-z0-9]/.test(phrase);
  const endsWord = /[A-Za-z0-9]$/.test(phrase);
  return startsWord && endsWord ? `\\b${escaped}\\b` : escaped;
}

function loadToneProfile() {
  if (!fs.existsSync(TONE_PROFILE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(TONE_PROFILE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function appendToneForbidden(configObj, tone) {
  if (!tone) return;
  const target = configObj.forbiddenLanguage ?? [];
  const disallowed = tone.disallowed_language ?? {};

  const pushPatterns = (label, phrases) => {
    if (!Array.isArray(phrases) || phrases.length === 0) return;
    phrases.forEach((phrase) => {
      target.push({
        label,
        pattern: phraseToPatternString(phrase)
      });
    });
  };

  pushPatterns("TONE_ACTIVIST", disallowed.activist_terms);
  pushPatterns("TONE_ACCUSATORY", disallowed.accusatory_terms);
  pushPatterns("TONE_COLLECTIVE", disallowed.collective_identity);
  pushPatterns("TONE_EMOTIONAL", disallowed.emotional_charge);
  pushPatterns("TONE_VOICE_AVOID", tone.preferred_voice?.avoid);
  pushPatterns("TONE_GUARANTEES", tone.guarantees_and_promises?.forbidden);
  pushPatterns("TONE_CLOSING_AVOID", tone.closing_guidance?.avoid);

  configObj.forbiddenLanguage = target;
}

appendToneForbidden(config, loadToneProfile());

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full;
  });
}

function parseFrontmatter(src) {
  const match = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return null;
  const fmText = match[1];
  const fm = {};
  const lines = fmText.split("\n");
  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const li = line.match(/^\s*-\s+(.*)\s*$/);
    if (li && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(li[1].trim().replace(/^['"]|['"]$/g, ""));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    currentKey = key;
    if (val === "" || val === "|" || val === ">" || val === ">-" || val === "|-") {
      fm[key] = val;
      continue;
    }
    val = val.replace(/^['"]|['"]$/g, "");
    if (val.startsWith("[") && val.endsWith("]")) {
      const inner = val.slice(1, -1).trim();
      fm[key] = inner
        ? inner.split(",").map((x) => x.trim().replace(/^['"]|['"]$/g, ""))
        : [];
      continue;
    }
    fm[key] = val;
  }
  return { text: fmText, map: fm };
}

function hasSection(src, title) {
  const re = new RegExp(`^##\\s+${title}`, "im");
  return re.test(src);
}

function report(level, file, label, note, context = "") {
  findings.push({ level, file, label, note, context });
}

const files = walk(config.scanRoot).filter((f) =>
  config.extensions.some((ext) => f.endsWith(ext))
);

function paragraphHasNuance(paragraphLower, nuances) {
  return nuances.some((n) => paragraphLower.includes(n));
}

function containsAny(text, needles) {
  const t = text.toLowerCase();
  for (const n of needles) {
    if (t.includes(String(n).toLowerCase())) return n;
  }
  return null;
}

files.forEach((file) => {
  const src = fs.readFileSync(file, "utf8");
  const srcLower = src.toLowerCase();

  // Frontmatter check
  const fm = parseFrontmatter(src);
  if (!fm || !fm.map) {
    report("HIGH", file, "NO_FRONTMATTER", "Frontmatter ontbreekt");
  } else {
    config.requiredFrontmatterKeys.forEach((key) => {
      if (fm.map[key] == null || String(fm.map[key]).trim() === "") {
        report("HIGH", file, "MISSING_FRONTMATTER_KEY", `Ontbrekende key: ${key}`);
      }
    });
  }

  // Section checks
  config.requiredSections.forEach((section) => {
    if (!hasSection(src, section)) {
      report(
        "HIGH",
        file,
        "MISSING_SECTION",
        `Verplichte sectie ontbreekt: ${section}`
      );
    }
  });

  // Forbidden language
  config.forbiddenLanguage.forEach(({ label, pattern }) => {
    const re = new RegExp(pattern, "i");
    const m = src.match(re);
    if (m) {
      report(
        "HIGH",
        file,
        label,
        "Taal ondermijnt veiligheidskundig/neutraliteitskader",
        m[0]
      );
    }
  });

  // SERP tone
  config.serpSignals.discouraged.forEach((term) => {
    if (srcLower.includes(term)) {
      report(
        "MEDIUM",
        file,
        "SERP_RISK",
        `Commerciële SERP-term gevonden: '${term}'`
      );
    }
  });

  // VR/Bbl alignment
  config.vrBblLanguage.avoid.forEach((term) => {
    if (srcLower.includes(term)) {
      report(
        "MEDIUM",
        file,
        "VR_TAAL_RISICO",
        `Term botst met VR/Bbl-taal: '${term}'`
      );
    }
  });

  const isSafetyFramework =
    fm?.map?.category &&
    String(fm.map.category).toLowerCase().includes("veiligheidskundig kader");

  if (fm?.map?.slug && fm?.map?.canonical) {
    const want = `/blog/${String(fm.map.slug).trim().replace(/^\/+/, "")}`;
    const got = String(fm.map.canonical).trim();
    if (got !== want) {
      report(
        "MEDIUM",
        file,
        "CANONICAL_MISMATCH",
        `Canonical wijkt af van slug. Verwacht: ${want}`
      );
    }
  }

  if (fm?.map?.title) {
    const title = String(fm.map.title);
    const min = config.serpSignals.titleMin;
    const max = config.serpSignals.titleMax;
    if (typeof min === "number" && typeof max === "number" && (title.length < min || title.length > max)) {
      report(
        "MEDIUM",
        file,
        "SERP_TITLE_LENGTH",
        `Title lengte buiten range (${min}-${max}).`,
        `${title.length} chars`
      );
    }
    const bad = containsAny(title, config.serpSignals.avoidWordsInTitle || []);
    if (bad) {
      report(
        "HIGH",
        file,
        "TITLE_FORBIDDEN_TERM",
        "Title bevat term die frontstage/VR-frictie kan geven.",
        bad
      );
    }
    const hasIntent = containsAny(title, config.serpSignals.preferIntentWords || []);
    if (!hasIntent) {
      report(
        "LOW",
        file,
        "SERP_INTENT_WEAK",
        "Title is vrij abstract; overweeg ‘wat/wanneer/hoe/checklist/kader’."
      );
    }
  }

  if (fm?.map?.description) {
    const desc = String(fm.map.description);
    const min = config.serpSignals.descriptionMin;
    const max = config.serpSignals.descriptionMax;
    if (typeof min === "number" && typeof max === "number" && (desc.length < min || desc.length > max)) {
      report(
        "LOW",
        file,
        "SERP_DESCRIPTION_LENGTH",
        `Description lengte buiten range (${min}-${max}).`,
        `${desc.length} chars`
      );
    }
  }

  // Conditional terms must be nuanced nearby (skip for veiligheidskundig kader)
  if (!isSafetyFramework && Array.isArray(config.conditionalTerms) && Array.isArray(config.conditionalNuance)) {
    const paragraphs = srcLower.split(/\n\s*\n/);
    const docHasNuance = paragraphHasNuance(srcLower, config.conditionalNuance);
    config.conditionalTerms.forEach((term) => {
      const parasWithTerm = paragraphs.filter((p) => p.includes(term));
      if (parasWithTerm.length === 0) return;
      const ok = docHasNuance || parasWithTerm.some((p) => paragraphHasNuance(p, config.conditionalNuance));
      if (!ok) {
        report(
          "MEDIUM",
          file,
          "CONDITIONAL_TERM_NEEDS_NUANCE",
          `Term vraagt om nuance: '${term}'`
        );
      }
    });
  }

  if (Array.isArray(config.vrWhitelist) && typeof config.vrWhitelistMinHits === "number") {
    const hits = config.vrWhitelist.filter((w) => {
      const re = new RegExp(`\\b${String(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return re.test(src);
    }).length;
    if (hits < config.vrWhitelistMinHits) {
      report(
        "LOW",
        file,
        "VR_TONE_THIN",
        "Weinig VR/Bbl-ankerwoorden. Overweeg 1–2 neutrale kader-termen."
      );
    }
  }
});

// Output
console.log("=== ProBrandwacht Blog Guard ===");
console.log(`Files scanned: ${files.length}`);
console.log(`Findings: ${findings.length}`);

findings.forEach((f) => {
  console.log(`\n[${f.level}] ${f.label}`);
  console.log(`File: ${f.file}`);
  console.log(`Note: ${f.note}`);
  if (f.context) console.log(`Context: ${f.context}`);
});

process.exit(findings.some(f => f.level === "HIGH") ? 2 : 0);
