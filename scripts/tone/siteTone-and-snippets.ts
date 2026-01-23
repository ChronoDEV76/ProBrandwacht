#!/usr/bin/env ts-node

/**
 * siteTone-and-snippets.ts
 *
 * Combineert:
 *  - layout check (main + dark layout)
 *  - simpele tone-of-voice scan (harde vs positieve woorden)
 *  - snippet injectie voor kernroutes van ProBrandwacht
 *
 * Output:
 *  - console-overzicht
 *  - JSON-rapport in reports/site-tone-snippet-report.json
 *
 * Gebruik:
 *   npx ts-node scripts/tone/siteTone-and-snippets.ts
 */

import fs from "node:fs";
import path from "node:path";

type SnippetConfig = {
  route: string;
  file: string; // relatief vanaf project-root
  snippet: string;
  preferredAnchors?: RegExp[]; // optionele anchor-patterns (bv. h2-tekst)
};

type PageReport = {
  file: string;
  route?: string;
  layoutOk: boolean;
  headingFound: boolean;
  badWords: string[];
  positiveSignals: string[];
  bridgeHits: string[];
  soloWords: string[];
  overusedPositives: Array<{ word: string; count: number }>;
  snippetStatus?:
    | "inserted"
    | "skipped_existing"
    | "failed_no_anchor"
    | "file_missing"
    | "not_configured";
  snippetStrategy?: string;
};

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, "app", "(site)");
const REPORT_FILE = path.join(
  ROOT,
  "reports",
  "site-tone-snippet-report.json"
);

// ---------- Tone-of-voice woorden ----------

const BAD_WORDS = [
  "uitbuiting",
  "misbruik",
  "kapotmaken",
  "strijd",
  "vechten",
  "schaamteloos",
  "slachtoffer",
  "uitzendbureau",
  "uitzendconstructie",
  "payroll",
  "detacheringsbureau",
  "bureaumodel",
  "tussenpersoon",
  "commerciële marge",
];

const POSITIVE_WORDS = [
  "eerlijke",
  "eerlijk",
  "dba-proof",
  "samenwerking",
  "samen werken",
  "zelfstandige brandwacht",
  "zelfstandige brandwachten",
  "eerlijke afspraken",
  "heldere afspraken",
  "duidelijk",
  "controleerbaar",
  "goedgekeurd",
  "gezamenlijk",
  "samen verantwoordelijk",
  "helder",
  "toetsbaar",
];

const BRIDGE_KEYWORDS = [
  "gezamenlijk",
  "samen verantwoordelijk",
  "goedgekeurd",
  "controleerbaar",
  "duidelijk",
  "helder",
  "toetsbaar",
  "eerlijke afspraken",
  "samenwerking",
  "afstemming",
  "documentatie",
];

const SOLO_WORDS = [
  "wij bepalen",
  "wij regelen",
  "zonder overleg",
  "zonder feedback",
  "achter gesloten deuren",
  "alleen wij",
  "eenzijdig",
  "exclusief",
  "een platform voor ons",
];

// ---------- Snippet-config voor kernroutes ----------

const SNIPPET_CONFIGS: SnippetConfig[] = [
  {
    route: "/",
    file: "app/(site)/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            ProBrandwacht is een onafhankelijk initiatief dat uitlegt hoe zelfstandige samenwerking
            werkbaar en uitlegbaar blijft — geen bureau, geen matching-engine, geen beloftes.
          </p>
    `,
    preferredAnchors: [
      /<h1[^>]*>[\s\S]*?ProBrandwacht[\s\S]*?<\/h1>/i,
      /<HomeHero[\s>]/i,
      /<Hero[\s>]/i,
    ],
  },
  {
    route: "/voor-brandwachten",
    file: "app/(site)/voor-brandwachten/page.tsx",
    snippet: `
          <p className="mt-4 text-xs text-slate-300">
            ProBrandwacht is frontstage: publieke uitleg en kaders. Geen planning, geen opdrachten,
            geen beloftes — wel context om 1-op-1 afspraken scherp te maken.
          </p>
    `,
    preferredAnchors: [/Aanmelden in 3 stappen/i],
  },
  {
    route: "/opdrachtgevers",
    file: "app/(site)/opdrachtgevers/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Je werkt direct samen met zelfstandige brandwachten. Rolverdeling, taken en gezag
            spreken jullie 1-op-1 af — ProBrandwacht duidt waar je op moet letten, zonder
            tussenlagen of sturing.
          </p>
    `,
    preferredAnchors: [
      /Samenwerken met zelfstandige brandwachten/i,
      /<h1[^>]*>[\s\S]*?opdrachtgevers[\s\S]*?<\/h1>/i,
    ],
  },
  {
    route: "/belangen",
    file: "app/(site)/belangen/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Dezelfde uitgangspunten zie je terug in alle pagina's en uitleg: onafhankelijke
            duiding, rolafbakening en afspraken die uitlegbaar blijven — zonder beloftes.
          </p>
    `,
    preferredAnchors: [
      /Belangen & richtlijnen voor modern samenwerken/i,
      /<h1[^>]*>[\s\S]*?Belangen[\s\S]*?<\/h1>/i,
    ],
  },
  {
    route: "/steden/[city]",
    file: "app/(site)/steden/[city]/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            De manier van samenwerken blijft overal hetzelfde: eerlijk, DBA-proof en met ruimte
            voor professioneel ondernemerschap — of je nu in Amsterdam, Rotterdam of op een
            industrieterrein werkt.
          </p>
    `,
    preferredAnchors: [
      /Samenwerken met zelfstandige brandwachten in/i,
      /<h1[^>]*>[\s\S]*?brandwachten in[\s\S]*?<\/h1>/i,
    ],
  },
  {
    route: "/probrandwacht-direct-spoed",
    file: "app/(site)/probrandwacht-direct-spoed/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Ook bij spoed blijft het kader leidend: duidelijke rolverdeling en afspraken
            die uitvoerbaar zijn. ProBrandwacht duidt de randvoorwaarden — partijen spreken
            het verder 1-op-1 af.
          </p>
    `,
    preferredAnchors: [
      /SPOED — direct een brandwacht claimen/i,
      /<h1[^>]*>[\s\S]*?SPOED[\s\S]*?<\/h1>/i,
    ],
  },
  {
    route: "/blog",
    file: "app/(site)/blog/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            In de kennisbank van ProBrandwacht leggen we uit hoe de markt voor brandveiligheid
            verandert, wat dat betekent voor zelfstandige brandwachten en opdrachtgevers, en hoe
            je afspraken eerlijk en DBA-proof houdt. Geen strijdtaal tegen bureaus, maar
            praktische uitleg en voorbeelden uit de praktijk.
          </p>
    `,
    preferredAnchors: [
      /Kennisbank & inzichten voor brandveiligheid/i,
      /<h1[^>]*>[\s\S]*?Kennisbank[\s\S]*?<\/h1>/i,
    ],
  },
  {
    route: "/over-ons",
    file: "app/(site)/over-ons/page.tsx",
    snippet: `
          <p className="mt-3 text-sm text-slate-200">
            Alles wat je op ProBrandwacht ziet is gebouwd vanuit dezelfde gedachte: publiek,
            uitlegbaar en marktduidend — zonder rol in uitvoering of afspraken.
          </p>
    `,
    preferredAnchors: [/Waarom ProBrandwacht\?/i],
  },
  {
    route: "/faq",
    file: "app/(site)/faq/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Deze veelgestelde vragen sluiten aan op de manier van werken die je op de rest van
            ProBrandwacht ziet: eerlijk, DBA-proof en met respect voor zelfstandig
            ondernemerschap.
          </p>
    `,
    preferredAnchors: [/Veelgestelde vragen/i],
  },
  {
    route: "/privacy",
    file: "app/(site)/privacy/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Onze manier van werken is niet alleen inhoudelijk eerlijk, maar ook in de
            manier waarop we met gegevens omgaan. We verwerken data alleen om samenwerking
            veilig, uitlegbaar en professioneel te ondersteunen.
          </p>
    `,
    preferredAnchors: [/Privacyverklaring/i],
  },
  {
    route: "/seo-resources",
    file: "app/(site)/seo-resources/page.tsx",
    snippet: `
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Deze SEO-hulpmiddelen zijn gemaakt vanuit dezelfde visie als het initiatief:
            eerlijk, uitlegbaar en gericht op duurzame samenwerking — niet op snelle trucjes.
          </p>
    `,
    preferredAnchors: [/SEO resources/i],
  },
];

// ---------- Helpers ----------

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function walkSitePages(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkSitePages(full));
    } else if (entry.name === "page.tsx") {
      files.push(full);
    }
  }
  return files;
}

function analyzeTone(content: string) {
  const lower = content.toLowerCase();
  const bad = BAD_WORDS.filter((w) => lower.includes(w.toLowerCase()));

  const positiveCounts = new Map<string, number>();
  for (const word of POSITIVE_WORDS) {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");
    const matches = lower.match(regex);
    if (matches) {
      positiveCounts.set(word, matches.length);
    }
  }

  const positiveSignals = Array.from(positiveCounts.keys());
  const bridgeHits = BRIDGE_KEYWORDS.filter((word) => {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    return regex.test(lower);
  });
  const soloHits = SOLO_WORDS.filter((word) => {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    return regex.test(lower);
  });
  const overusedPositives = Array.from(positiveCounts.entries())
    .filter(([, count]) => count >= 4)
    .map(([word, count]) => ({ word, count }));

  return {
    badWords: bad,
    positiveSignals,
    bridgeHits,
    soloWords: soloHits,
    overusedPositives,
  };
}

function hasMainLayout(content: string): boolean {
  return /<main[^>]*className=["'][^"']*min-h-screen[^"']*bg-slate-950[^"']*text-slate-50[^"']*["']/.test(
    content
  );
}

function findFirstHeadingIndex(content: string): number | null {
  const re = /<(h1|h2)[^>]*>[\s\S]*?<\/\1>/i;
  const m = content.match(re);
  if (!m || m.index === undefined) return null;
  return m.index + m[0].length;
}

function findBreadcrumbBlockIndex(content: string): number | null {
  const re = /<StructuredBreadcrumbs[\s\S]*?<\/div>/i;
  const m = content.match(re);
  if (!m || m.index === undefined) return null;
  return m.index + m[0].length;
}

function injectAt(content: string, index: number, snippet: string): string {
  return content.slice(0, index) + snippet + content.slice(index);
}

// ---------- Snippet injectie ----------

function injectSnippetForConfig(
  cfg: SnippetConfig
): { status: PageReport["snippetStatus"]; strategy?: string } {
  const fullPath = path.join(ROOT, cfg.file);

  if (!fs.existsSync(fullPath)) {
    return { status: "file_missing" };
  }

  const original = fs.readFileSync(fullPath, "utf8");

  if (original.includes(cfg.snippet.trim())) {
    return { status: "skipped_existing", strategy: "already_present" };
  }

  // 1) Probeer preferredAnchors
  if (cfg.preferredAnchors && cfg.preferredAnchors.length > 0) {
    for (const anchor of cfg.preferredAnchors) {
      const m = original.match(anchor);
      if (m && m.index !== undefined) {
        const pos = m.index + m[0].length;
        const updated = injectAt(original, pos, cfg.snippet);
        fs.writeFileSync(fullPath, updated, "utf8");
        return { status: "inserted", strategy: "preferredAnchor" };
      }
    }
  }

  // 2) Probeer eerste h1/h2
  const headingPos = findFirstHeadingIndex(original);
  if (headingPos !== null) {
    const updated = injectAt(original, headingPos, cfg.snippet);
    fs.writeFileSync(fullPath, updated, "utf8");
    return { status: "inserted", strategy: "firstHeading" };
  }

  // 3) Probeer na StructuredBreadcrumbs
  const crumbPos = findBreadcrumbBlockIndex(original);
  if (crumbPos !== null) {
    const updated = injectAt(original, crumbPos, cfg.snippet);
    fs.writeFileSync(fullPath, updated, "utf8");
    return { status: "inserted", strategy: "breadcrumbsBlock" };
  }

  return { status: "failed_no_anchor" };
}

// ---------- MAIN ----------

function main() {
  console.log("🚀 Site Tone & Snippets Manager — ProBrandwacht");

  if (!fs.existsSync(SITE_DIR)) {
    console.error("❌ app/(site) bestaat niet. Klopt je projectstructuur?");
    process.exit(1);
  }

  const pageFiles = walkSitePages(SITE_DIR);
  console.log(`📂 Gevonden pagina's in app/(site): ${pageFiles.length}\n`);

  const reports: PageReport[] = [];

  for (const full of pageFiles) {
    const rel = path.relative(ROOT, full);
    const content = fs.readFileSync(full, "utf8");
    const layoutOk = hasMainLayout(content);
    const headingPos = findFirstHeadingIndex(content);
    const headingFound = headingPos !== null;
    const tone = analyzeTone(content);

    // Kijk of er een snippet-config is
    const cfg = SNIPPET_CONFIGS.find((c) => c.file === rel);
    let snippetStatus: PageReport["snippetStatus"] = "not_configured";
    let snippetStrategy: string | undefined;

    if (cfg) {
      const res = injectSnippetForConfig(cfg);
      snippetStatus = res.status;
      snippetStrategy = res.strategy;
    }

    reports.push({
      file: rel,
      route: cfg?.route,
      layoutOk,
      headingFound,
      badWords: tone.badWords,
      positiveSignals: tone.positiveSignals,
      bridgeHits: tone.bridgeHits,
      soloWords: tone.soloWords,
      overusedPositives: tone.overusedPositives,
      snippetStatus,
      snippetStrategy,
    });
  }

  // Console output
  let layoutIssues = 0;
  let toneIssues = 0;

  for (const r of reports) {
    const icon =
      !r.layoutOk || r.badWords.length > 0 ? "⚠️" : "✅";

    console.log(`${icon} ${r.file}${r.route ? ` (${r.route})` : ""}`);

    if (!r.layoutOk) {
      layoutIssues++;
      console.log(
        "   - Layout: geen <main> gevonden met `min-h-screen bg-slate-950 text-slate-50`"
      );
    } else {
      console.log("   - Layout: ok (main met dark layout gevonden)");
    }

    if (r.badWords.length) {
      toneIssues++;
      console.log(
        `   - Tone-of-voice: ongewenste termen: ${r.badWords
          .map((w) => `'${w}'`)
          .join(", ")}`
      );
    } else {
      console.log("   - Tone-of-voice: geen harde termen gevonden");
    }

    if (r.positiveSignals.length) {
      console.log(
        `   - Positieve signalen: ${r.positiveSignals.join(", ")}`
      );
    }

    if (r.bridgeHits.length === 0) {
      toneIssues++;
      console.log(
        `   - Brugtaal: geen bridgewoorden gevonden; overweeg woorden zoals ${BRIDGE_KEYWORDS.slice(
          0,
          3
        ).join(", ")}`
      );
    } else {
      const label =
        r.bridgeHits.length < 3
          ? `   - Brugtaal (kan sterker): ${r.bridgeHits.join(", ")}`
          : `   - Brugtaal: ${r.bridgeHits.join(", ")}`;
      console.log(label);
    }

    if (r.soloWords.length) {
      toneIssues++;
      console.log(
        `   - Solo-taal (vervang door bridge-taal): ${r.soloWords.join(", ")}`
      );
    }

    if (r.overusedPositives.length) {
      console.log(
        `   - Herhaling: ${r.overusedPositives
          .map(({ word, count }) => `${word} (${count}x)`)
          .join(", ")}`
      );
    }

    if (r.snippetStatus && r.snippetStatus !== "not_configured") {
      console.log(
        `   - Snippet: ${r.snippetStatus}${
          r.snippetStrategy ? ` (strategie: ${r.snippetStrategy})` : ""
        }`
      );
    }

    console.log("");
  }

  console.log("📊 Samenvatting");
  console.log(
    `   Layout-issues: ${layoutIssues} / ${reports.length} pagina's`
  );
  console.log(
    `   Tone-issues:   ${toneIssues} / ${reports.length} pagina's`
  );
  const bridgeWarnings = reports.filter((r) => r.bridgeHits.length === 0).length;
  console.log(
    `   Brug-taal-issues: ${bridgeWarnings} / ${reports.length} pagina's`
  );

  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(reports, null, 2), "utf8");
  console.log("\n📄 Rapport opgeslagen in:", REPORT_FILE);
  console.log("✨ Klaar — layout, tone en snippets gecontroleerd en bijgewerkt.");
}

main();
