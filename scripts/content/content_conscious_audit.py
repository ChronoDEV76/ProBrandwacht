#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Tuple


DEFAULT_ROOT = "app/(site)"
INCLUDE_EXT = {".ts", ".tsx", ".md", ".mdx"}
EXCLUDE_DIRS = {".git", "node_modules", "dist", "build", ".next", "out", ".cache", "coverage", ".venv", "venv", "__pycache__"}
MAX_FILE_SIZE_MB = 3


# -----------------------------
# Noise filters (verwijder ruis)
# -----------------------------
SCHEMA_CONTEXT_RE = re.compile(r'["\']@context["\']\s*:\s*["\']https?://schema\.org', re.IGNORECASE)

# Skip lines that are clearly code comments / jsx comments (keep normal text strings)
COMMENT_LINE_RE = re.compile(r"^\s*(//|/\*|\*|\*/|\{/\*|\*/\})")

# A helper: "context" only if it's human-language, not schema.org
HUMAN_CONTEXT_RE = re.compile(r"\bcontext\b", re.IGNORECASE)


# -----------------------------
# Audit rules (jouw echte doel)
# -----------------------------
AUDIT_RULES: Dict[str, List[str]] = {
    # ✅ Wil je juist vaker zien / toevoegen
    "🟢 Keuze & autonomie (goed)": [
        r"\bbewuste\s+keuze\b",
        r"\b(jij|je)\s+kiest\b",
        r"\b(eigen|jouw)\s+(tarief|voorwaarden)\b",
        r"\bzelfstandig(e|)\s+(professional|ondernemer)\b",
        r"\bzonder\s+verplichtingen\b",
        r"\bje\s+kunt\s+weigeren\b|\bkun\s+je\s+weigeren\b",
        r"\bmeerdere\s+opdrachtgevers\b|\bmeer\s+dan\s+één\s+opdrachtgever\b",
        r"\bperiodiek\b.*\bherijken\b",
    ],

    # ⚠️ kan: prima, maar snel te “sturend” of lijkt op indirecte garantie
    "🟡 Aanscherpen (te sturend / te veel belofte)": [
        r"\b(altijd|garantie|gegarandeerd)\b",
        r"\bzekerheid\b",
        r"\bzonder\s+risico\b|\bgeen\s+risico\b",
        r"\bwij\s+regelen\b|\bwij\s+lossen\b|\bwij\s+doen\b",
        r"\bcompliant\b|\b100%\b",
        r"\btoegang\s+tot\s+opdrachten\b",
        r"\bde\s+standaard\b|\bmarktleider\b",
    ],

    # 🚫 liever niet op werving/landing pages; zet dit in blogs als je het wil duiden
    "🔴 Druk / angst / vijand-taal (vermijden op funnel)": [
        r"\bbelastingdienst\b.*\b(druk|jaagt|pakt)\b",
        r"\boverheid\b.*\bmaakt\b.*\bmoeilijk\b",
        r"\bsysteem\b.*\b(krom|giftig|ziek)\b",
        r"\bmoet\b.*\b(anders|want)\b",
        r"\bgevaar\b|\bonder\s+druk\b|\bangst\b",
    ],

    # ⚠️ exclusiviteit / afhankelijkheid: vaak het kernprobleem dat je juist wilt vermijden
    "🟠 Afhankelijkheid / exclusiviteit (checken)": [
        r"\b(alleen|uitsluitend)\s+via\b",
        r"\bexclusief\b|\bexclusiviteit\b",
        r"\bniet\s+meer\s+welkom\b|\bkom\s+je\s+er\s+niet\s+meer\s+in\b",
        r"\bverboden\b.*\bdirect\b.*\bopdrachtgever\b",
        r"\bblacklist\b|\bzwarte\s+lijst\b",
        r"\braamovereenkomst\b",
    ],

    # ✅ bonus: pakt “context” alleen als mensentaal (niet schema)
    "🟢 Mensentaal: context & verantwoordelijkheden (oké)": [
        r"\bverantwoordelijkheid\b",
        r"\brolverdeling\b|\bverantwoordelijkheden\b",
        r"\bcontext\b.*\b(indicatie|vertrekpunt|bespreking)\b",
    ],
}


# -----------------------------
# Optional “missing” detector:
# vind pagina’s met CTA maar zonder reflectievragen
# -----------------------------
CTA_RE = re.compile(r"\b(blijf\s+op\s+de\s+hoogte|meld\s+je\s+aan|interesselijst|wachtlijst|aanvragen)\b", re.IGNORECASE)
REFLECT_Q_RE = re.compile(r"\?\s*$")  # lines ending with ?


@dataclass
class Hit:
    category: str
    relpath: str
    line_no: int
    line: str
    pattern: str


def iter_files(root: Path) -> Iterable[Path]:
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            p = Path(dirpath) / fn
            if p.suffix.lower() not in INCLUDE_EXT:
                continue
            try:
                if p.stat().st_size > MAX_FILE_SIZE_MB * 1024 * 1024:
                    continue
            except OSError:
                continue
            yield p


def should_skip_line(line: str) -> bool:
    if SCHEMA_CONTEXT_RE.search(line):
        return True
    if COMMENT_LINE_RE.search(line):
        # skip only if it’s pure comment line; text in strings still passes
        return True
    return False


def run_audit(root: Path, only: str | None = None) -> Tuple[List[Hit], List[str]]:
    compiled: List[Tuple[str, re.Pattern, str]] = []
    for cat, pats in AUDIT_RULES.items():
        if only and only.lower() not in cat.lower():
            continue
        for pat in pats:
            compiled.append((cat, re.compile(pat, re.IGNORECASE), pat))

    hits: List[Hit] = []
    cta_files: Dict[str, bool] = {}
    question_files: Dict[str, bool] = {}

    for p in iter_files(root):
        rel = str(p.relative_to(root)).replace("\\", "/")

        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        has_cta = False
        has_questions = False

        for i, rawline in enumerate(text.splitlines(), start=1):
            line = rawline.strip()
            if not line:
                continue

            # ignore schema.org @context lines & pure comment lines
            if should_skip_line(rawline):
                continue

            # keep human "context", but only if not schema-context
            # (rules handle this; here we just keep it in stream)

            if CTA_RE.search(line):
                has_cta = True
            if REFLECT_Q_RE.search(line):
                has_questions = True

            for cat, creg, pat in compiled:
                if creg.search(line):
                    hits.append(Hit(cat, rel, i, line, pat))

        if has_cta:
            cta_files[rel] = True
        if has_questions:
            question_files[rel] = True

    # “missing” list: CTA pages without any question marks
    missing_questions = sorted([f for f in cta_files.keys() if f not in question_files])

    return hits, missing_questions


def print_report(hits: List[Hit], missing_questions: List[str], show: int) -> int:
    by_cat: Dict[str, List[Hit]] = {}
    for h in hits:
        by_cat.setdefault(h.category, []).append(h)

    print("=" * 90)
    print("CONTENT AUDIT – Bewust zelfstandig werken (v2)")
    print("=" * 90)

    if not hits:
        print("✅ 0 hits.")
    else:
        for cat in sorted(by_cat.keys()):
            bucket = by_cat[cat]
            print(f"\n[{cat}] – {len(bucket)} hits")
            print("-" * 90)
            for h in bucket[:show]:
                print(f"{h.relpath}:{h.line_no}: {h.line}")
            if len(bucket) > show:
                print(f"... ({len(bucket) - show} meer)")

    print("\n" + "=" * 90)
    print("CTA-pagina’s zonder reflectievragen (kans om bewustwording toe te voegen)")
    print("=" * 90)
    if not missing_questions:
        print("✅ Geen gevonden (of er staan al vragen).")
    else:
        for f in missing_questions[:50]:
            print(f"- {f}")
        if len(missing_questions) > 50:
            print(f"... ({len(missing_questions)-50} meer)")

    print("\nLegenda:")
    print("🟢 = goed / versterken")
    print("🟡 = aanscherpen (minder belofte / minder sturing)")
    print("🟠 = check afhankelijkheid/exclusiviteit")
    print("🔴 = liever niet op funnel (verplaats naar blog of neutraler)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=DEFAULT_ROOT)
    ap.add_argument("--show", type=int, default=25, help="aantal regels per categorie tonen")
    ap.add_argument("--only", default=None, help="filter categorieën (substring match)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print("Root niet gevonden:", root)
        return 1

    hits, missing_questions = run_audit(root, only=args.only)
    return print_report(hits, missing_questions, show=args.show)


if __name__ == "__main__":
    raise SystemExit(main())

