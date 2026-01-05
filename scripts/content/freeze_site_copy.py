#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import os
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

# ============================================================
# Config
# ============================================================

DEFAULT_ROOT = "app/(site)"

INCLUDE_EXT = {".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".txt", ".json", ".html", ".yml", ".yaml"}
EXCLUDE_DIRS = {
    ".git", "node_modules", "dist", "build", ".next", "out",
    ".cache", "coverage", ".venv", "venv", "__pycache__"
}
MAX_FILE_SIZE_MB = 3

# ============================================================
# Audit patterns (gesplitst voor rust)
# ============================================================

PATTERNS: Dict[str, List[str]] = {
    "ProSafetyMatch CTA / funnel": [
        r"meld\s+je\s+gratis\s+aan\s+voor\s+prosafetymatch",
        r"bouw\s+mee\s+aan\s+prosafetymatch",
        r"blijf\s+op\s+de\s+hoogte\s+van\s+prosafetymatch",
        r"interesselijst\s+voor\s+prosafetymatch",
        r"wachtlijst\s+voor\s+prosafetymatch",
    ],
    "ProSafetyMatch feature-claim (moet SOFT)": [
        r"\bprosafetymatch\b.*\b(bundelt|helpt|automatiseert|regelt|levert|brengt)\b",
        r"\bzo\s+kan\s+samenwerking\s+via\s+prosafetymatch\b",
        r"\bkun\s+je\s+straks\b.*\bprosafetymatch\b",
    ],
    "ProSafetyMatch merkvermelding (oké)": [
        r"\bprosafetymatch\b",
    ],
    "Harde DBA / juridische claim": [
        r"\bDBA[-\s]?proof\b",
        r"\b100%\s+DBA\b",
        r"\bgarandeer(t)?\b",
        r"\bgeen\s+enkel\s+risico\b",
    ],
    "Arbeidsrelatie / gezag-framing": [
        r"\bgezag\b",
    ],
    "Exclusiviteit / druk": [
        r"\balleen\s+via\b|\buitsluitend\s+via\b",
        r"\bniet\s+meer\s+welkom\b",
    ],
}

# ============================================================
# Funnelcheck (SOFT vs HARD)
# ============================================================

SOFT_FUNNEL_PATTERNS = [
    r"\bin\s+ontwikkeling\b",
    r"\bconcept\b",
    r"\bkan\b|\bkunnen\b|\bstraks\b",
    r"\bblijf\s+op\s+de\s+hoogte\b",
    r"\binteresselijst\b|\bwachtlijst\b",
]

HARD_FUNNEL_PATTERNS = [
    r"\bvoorloper\b|\bfundament\b",
    r"\bbouw\s+mee\b",
    r"\bzo\s+werkt\s+prosafetymatch\b",
    r"\bprosafetymatch\b.*\b(levert|regelt|doet)\b",
    r"\bDBA[-\s]?proof\b",
]

# ============================================================
# Apply – terminologie (ronde 1)
# ============================================================

REPLACEMENTS: List[Tuple[str, str]] = [
    (r"\bDBA[-\s]?proof\b", "DBA-bewust"),
    (r"\bgezag\b", "rolverdeling"),
    (r"privacy@prosafetymatch\.nl", "privacy@probrandwacht.nl"),
    (r"info@prosafetymatch\.nl", "info@probrandwacht.nl"),
]

# ============================================================
# Soften – ALLE rondes gecombineerd
# ============================================================

SOFTENER_RULES: List[Tuple[str, str]] = [
    # positionering
    (r"(?i)\bvoorloper\s+van\s+ProSafetyMatch\b",
     "basis voor een initiatief in ontwikkeling"),
    (r"(?i)\bfundament\s+voor\s+ProSafetyMatch\b",
     "aansluiting op een initiatief in ontwikkeling"),

    # CTA verzachten
    (r"(?i)\bBouw\s+mee\s+aan\s+ProSafetyMatch\b",
     "Blijf op de hoogte van ProSafetyMatch"),

    # feature claims → concept
    (r"(?i)\bProSafetyMatch\s+helpt\s+je\b",
     "ProSafetyMatch is in ontwikkeling om te helpen"),
    (r"(?i)\bProSafetyMatch\s+bundelt\b",
     "ProSafetyMatch is in ontwikkeling om te bundelen"),
    (r"(?i)\bZo\s+ziet\s+een\s+samenwerking\s+via\s+ProSafetyMatch\s+eruit\b",
     "Zo kan samenwerking via ProSafetyMatch eruitzien (concept in ontwikkeling)"),
    (r"(?i)\bVia\s+ProSafetyMatch\s+kom\s+je\s+rechtstreeks\s+met\s+elkaar\s+in\s+contact\b",
     "Via ProSafetyMatch kun je straks rechtstreeks met elkaar in contact komen (concept in ontwikkeling)"),

    # spoed-funnel
    (r"(?i)\bDeze\s+spoed-funnel\s+is\s+een\s+vroege\s+voorloper\s+van\s+de\s+directe\s+opdrachtmatching\s+in\s+ProSafetyMatch\b",
     "Deze spoed-funnel verkent hoe directe aanvragen kunnen werken; ProSafetyMatch is daarbij een concept in ontwikkeling"),

    # metadata hype
    (r"(?i)\bVoorproef\s+van\s+ProSafetyMatch\b",
     "Concept van ProSafetyMatch (in ontwikkeling)"),
    (r"(?i)\bclaimen\b", "aanvragen"),
]

# ============================================================
# Data classes
# ============================================================

@dataclass
class Hit:
    category: str
    path: Path
    line_no: int
    line: str

@dataclass
class FunnelHit:
    level: str
    path: Path
    line_no: int
    line: str

# ============================================================
# Helpers
# ============================================================

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

# ============================================================
# Audit
# ============================================================

def audit(root: Path) -> List[Hit]:
    compiled = [(cat, re.compile(p, re.I)) for cat, pats in PATTERNS.items() for p in pats]
    hits: List[Hit] = []
    for p in iter_files(root):
        text = p.read_text(encoding="utf-8", errors="ignore")
        for i, line in enumerate(text.splitlines(), 1):
            for cat, creg in compiled:
                if creg.search(line):
                    hits.append(Hit(cat, p, i, line.strip()))
    return hits

def command_audit(root: Path) -> int:
    hits = audit(root)
    print("=" * 90)
    print("AUDIT:", root)
    print("=" * 90)

    if not hits:
        print("✅ Geen hits")
        return 0

    grouped: Dict[str, List[Hit]] = {}
    for h in hits:
        grouped.setdefault(h.category, []).append(h)

    for cat, bucket in grouped.items():
        print(f"\n[{cat}] {len(bucket)} hits")
        if "merkvermelding" in cat.lower():
            print("(samenvatting – details verborgen)")
            continue
        for h in bucket[:50]:
            rel = h.path.relative_to(root)
            print(f"{rel}:{h.line_no}: {h.line}")

    return 2

# ============================================================
# Apply (terminologie)
# ============================================================

def command_apply(root: Path, dry_run: bool) -> int:
    for p in iter_files(root):
        text = p.read_text(encoding="utf-8", errors="ignore")
        new = text
        for pat, repl in REPLACEMENTS:
            new = re.sub(pat, repl, new, flags=re.I)
        if new != text:
            print(f"🛠 {p.relative_to(root)}")
            if not dry_run:
                shutil.copy2(p, p.with_suffix(p.suffix + ".bak"))
                p.write_text(new, encoding="utf-8")
    return 0

# ============================================================
# Soften
# ============================================================

def command_soften(root: Path, dry_run: bool) -> int:
    for p in iter_files(root):
        text = p.read_text(encoding="utf-8", errors="ignore")
        new = text
        for pat, repl in SOFTENER_RULES:
            new = re.sub(pat, repl, new)
        if new != text:
            print(f"🪶 {p.relative_to(root)}")
            if not dry_run:
                shutil.copy2(p, p.with_suffix(p.suffix + ".bak2"))
                p.write_text(new, encoding="utf-8")
    return 0

# ============================================================
# Funnelcheck
# ============================================================

def command_funnelcheck(root: Path) -> int:
    soft = [re.compile(p, re.I) for p in SOFT_FUNNEL_PATTERNS]
    hard = [re.compile(p, re.I) for p in HARD_FUNNEL_PATTERNS]

    soft_hits = 0
    hard_hits = 0

    for p in iter_files(root):
        for i, line in enumerate(p.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):
            if any(r.search(line) for r in soft):
                soft_hits += 1
            if any(r.search(line) for r in hard):
                hard_hits += 1

    print("=" * 90)
    print("FUNNELCHECK:", root)
    print("=" * 90)
    print(f"SOFT hits: {soft_hits}")
    print(f"HARD hits: {hard_hits}")
    return 0 if hard_hits == 0 else 3

# ============================================================
# Main
# ============================================================

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("cmd", choices=["audit", "apply", "soften", "funnelcheck"])
    parser.add_argument("--root", default=DEFAULT_ROOT)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print("Root bestaat niet:", root)
        return 1

    if args.cmd == "audit":
        return command_audit(root)
    if args.cmd == "apply":
        return command_apply(root, args.dry_run)
    if args.cmd == "soften":
        return command_soften(root, args.dry_run)
    if args.cmd == "funnelcheck":
        return command_funnelcheck(root)

    return 0

if __name__ == "__main__":
    raise SystemExit(main())

