#!/usr/bin/env ts-node

/**
 * toneCompare-report.ts
 *
 * Vergelijkt:
 *  - reports/tone-live-report.json   (jouw site)
 *  - reports/tone-competitors-report.json (concurrenten)
 *
 * Geeft in de console een overzichtstabel én schrijft een JSON-rapport:
 *  - reports/tone-compare-report.json
 */

import fs from "node:fs";
import path from "node:path";

type LivePage = {
  url: string;
  ok: boolean;
  issues: { found: string; suggestion: string }[];
  positives: string[];
};

type LiveReport = {
  base: string;
  scannedAt: string;
  pages: LivePage[];
};

type CompetitorPage = {
  url: string;
  ok: boolean;
  issues: { found: string; suggestion: string }[];
  positives: string[];
  words?: number;
  hardWordCount?: number;
  toneScore?: number;
};

type CompetitorReport = {
  scannedAt: string;
  pages: CompetitorPage[];
};

type CompareRow = {
  group: "probrandwacht" | "competitor";
  label: string;
  url: string;
  toneScore: number | null;
  issues: number;
  positives: number;
  positivesExample: string;
};

type CompareReport = {
  generatedAt: string;
  self: {
    base: string;
    pages: CompareRow[];
  };
  competitors: {
    pages: CompareRow[];
  };
};

function loadJson<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Bestand niet gevonden: ${fullPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw) as T;
}

// Simpele toneScore voor live pages (je eerdere live-scanner had die niet)
// Idee: 100 als geen issues, anders 100 - (issues * 8) met minimum 0.
function computeToneScoreForLive(issuesCount: number): number {
  if (issuesCount <= 0) return 100;
  const penalty = Math.min(100, issuesCount * 8);
  return Math.max(0, 100 - penalty);
}

function formatUrlLabel(base: string, url: string): string {
  if (!url.startsWith(base)) return url;
  const pathPart = url.slice(base.length) || "/";
  return `ProBrandwacht ${pathPart}`;
}

function main() {
  const liveReport = loadJson<LiveReport>(
    "reports/tone-live-report.json"
  );
  const competitorReport = loadJson<CompetitorReport>(
    "reports/tone-competitors-report.json"
  );

  const selfRows: CompareRow[] = liveReport.pages.map((p) => {
    const issuesCount = p.issues?.length ?? 0;
    const toneScore = computeToneScoreForLive(issuesCount);

    return {
      group: "probrandwacht",
      label: formatUrlLabel(liveReport.base, p.url),
      url: p.url,
      toneScore,
      issues: issuesCount,
      positives: p.positives?.length ?? 0,
      positivesExample: (p.positives || []).join(", "),
    };
  });

  const competitorRows: CompareRow[] = competitorReport.pages.map((p) => {
    const issuesCount = p.issues?.length ?? 0;
    const toneScore =
      typeof p.toneScore === "number"
        ? p.toneScore
        : computeToneScoreForLive(issuesCount);

    return {
      group: "competitor",
      label: p.url,
      url: p.url,
      toneScore,
      issues: issuesCount,
      positives: p.positives?.length ?? 0,
      positivesExample: (p.positives || []).join(", "),
    };
  });

  const compareReport: CompareReport = {
    generatedAt: new Date().toISOString(),
    self: {
      base: liveReport.base,
      pages: selfRows,
    },
    competitors: {
      pages: competitorRows,
    },
  };

  // Console-output: simpele tabel
  console.log("📊 Tone-of-Voice vergelijking\n");

  const allRows: CompareRow[] = [
    ...selfRows,
    ...competitorRows,
  ];

  // Kolombreedtes bepalen
  const colLabelWidth = Math.max(
    "Label".length,
    ...allRows.map((r) => r.label.length)
  );
  const colToneWidth = "ToneScore".length;
  const colIssuesWidth = "Issues".length;
  const colPosWidth = "Positief".length;

  const pad = (str: string | number, len: number) =>
    String(str).padEnd(len, " ");

  console.log(
    pad("Type", 14),
    pad("Label", colLabelWidth + 2),
    pad("ToneScore", colToneWidth + 2),
    pad("Issues", colIssuesWidth + 2),
    pad("Positief", colPosWidth + 2)
  );
  console.log("-".repeat(14 + colLabelWidth + colToneWidth + colIssuesWidth + colPosWidth + 12));

  for (const row of allRows) {
    const typeLabel =
      row.group === "probrandwacht" ? "ProBrandwacht" : "Concurrent";

    console.log(
      pad(typeLabel, 14),
      pad(row.label, colLabelWidth + 2),
      pad(
        row.toneScore !== null ? `${row.toneScore}` : "n/a",
        colToneWidth + 2
      ),
      pad(row.issues, colIssuesWidth + 2),
      pad(row.positives, colPosWidth + 2)
    );
  }

  console.log("\n📝 Details per groep:");

  console.log("\n• ProBrandwacht-pagina’s:");
  selfRows.forEach((r) => {
    console.log(
      `  - ${r.label}: ToneScore ${r.toneScore}, issues: ${r.issues}, positieve signalen: ${r.positives} (${r.positivesExample || "—"})`
    );
  });

  console.log("\n• Concurrenten:");
  competitorRows.forEach((r) => {
    console.log(
      `  - ${r.label}: ToneScore ${r.toneScore}, issues: ${r.issues}, positieve signalen: ${r.positives} (${r.positivesExample || "—"})`
    );
  });

  // JSON wegschrijven
  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, "tone-compare-report.json");
  fs.writeFileSync(outFile, JSON.stringify(compareReport, null, 2), "utf8");

  console.log(`\n📂 JSON vergelijkingsrapport: ${outFile}`);
}

main();
