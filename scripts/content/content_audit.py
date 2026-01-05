#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations
import os, re, sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Tuple

# ============ SCOPE ============
# We scannen ALLEEN app/(site). Blogs worden expliciet genegeerd.
SITE_ROOT_FRAGMENT = "app/(site)"
IGNORE_PATH_FRAGMENTS = ["content/blog", "/content/blog", r"content\blog"]

INCLUDE_EXT = {".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".txt", ".json", ".yml", ".yaml", ".html"}
EXCLUDE_DIRS = {".git", "node_modules", "dist", "build", ".next", "out", ".cache", "coverage", ".venv", "venv", "__pycache__"}
MAX_FILE_SIZE_MB = 3

# ============ PATTERNS ============
# Focus op SITE-COPY risico's:
# - ProSafetyMatch overlap
# - DBA-proof "hard claim"
# - arbeidsrelatie/gezag framing (niet het vakinhoudelijke toezicht)
PATTERNS = {
  "ProSafetyMatch overlap/CTA": [
    r"\b(prosafetymatch)\b",
    r"\b(meld\s+je\s+aan\s+voor\s+prosafetymatch)\b",
    r"\b(bouw\s+mee\s+aan\s+prosafetymatch)\b",
    r"\b(fundament|voorloper)\b.*\b(prosafetymatch)\b",
  ],
  "Harde juridische claim": [
    r"\b(DBA[-\s]?proof)\b",
    r"\b(100%\s+DBA)\b",
    r"\b(garandeer(t)?\s+)\b",
    r"\b(geen\s+enkel\s+risico)\b",
  ],
  # Alleen flaggen als 'gezag/aansturing' in dezelfde zin staat met arbeidsrelatie-signalen.
  "Arbeidsrelatie/gezags-taal": [
    r"\b(tarief|voorwaarden|rooster|planning|uren|werktijden|inbedding|opdracht)\b.*\b(gezag|aansturing|aansturen|leidinggevende)\b",
    r"\b(gezag|aansturing|aansturen|leidinggevende)\b.*\b(tarief|voorwaarden|rooster|planning|uren|werktijden|inbedding|opdracht)\b",
  ],
  "Exclusiviteit/druk": [
    r"\b(exclusief|exclusiviteit)\b",
    r"\b(alleen\s+via|uitsluitend\s+via)\b",
    r"\b(blacklist|zwarte\s+lijst)\b",
    r"\b(kom\s+je\s+er\s+niet\s+meer\s+in|niet\s+meer\s+welkom)\b",
  ],
}

@dataclass
class Hit:
  category: str
  pattern: str
  path: Path
  line_no: int
  line: str

def is_ignored(path: Path) -> bool:
  s = str(path).replace("\\", "/")
  return any(frag in s for frag in IGNORE_PATH_FRAGMENTS)

def is_in_site_scope(path: Path) -> bool:
  s = str(path).replace("\\", "/")
  return SITE_ROOT_FRAGMENT in s

def iter_files(root: Path) -> Iterable[Path]:
  for dirpath, dirnames, filenames in os.walk(root):
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
    for fn in filenames:
      p = Path(dirpath) / fn
      if p.suffix.lower() not in INCLUDE_EXT:
        continue
      if is_ignored(p):
        continue
      # Extra veiligheid: ook als iemand per ongeluk "." scant → alleen site scope.
      if not is_in_site_scope(p):
        continue
      try:
        if p.stat().st_size > MAX_FILE_SIZE_MB * 1024 * 1024:
          continue
      except OSError:
        continue
      yield p

def scan_file(path: Path, compiled: List[Tuple[str, re.Pattern]]) -> List[Hit]:
  hits: List[Hit] = []
  try:
    text = path.read_text(encoding="utf-8", errors="ignore")
  except Exception:
    return hits
  for i, line in enumerate(text.splitlines(), start=1):
    for category, creg in compiled:
      if creg.search(line):
        hits.append(Hit(category, creg.pattern, path, i, line.strip()))
  return hits

def main() -> int:
  # Je mag "app/(site)" meegeven, maar het script forceert scope sowieso.
  roots = [Path(p).resolve() for p in (sys.argv[1:] or ["."])]

  compiled: List[Tuple[str, re.Pattern]] = []
  for cat, pats in PATTERNS.items():
    for pat in pats:
      compiled.append((cat, re.compile(pat, re.IGNORECASE)))

  all_hits: List[Hit] = []
  for root in roots:
    for p in iter_files(root):
      all_hits.extend(scan_file(p, compiled))

  print("="*90)
  print("SITE-COPY CONTENT AUDIT REPORT (scope: app/(site), blogs ignored)")
  for r in roots:
    print(f"- input root: {r}")
  print("="*90)

  if not all_hits:
    print("✅ Geen matches op ingestelde site-copy patronen.")
    return 0

  by_cat = {}
  for h in all_hits:
    by_cat.setdefault(h.category, []).append(h)

  print(f"⚠️  Totaal hits: {len(all_hits)}\n")
  for cat in sorted(by_cat.keys()):
    hits = by_cat[cat]
    print("-"*90)
    print(f"[{cat}] hits: {len(hits)}")
    print("-"*90)
    for h in hits[:250]:
      print(f"{h.path}:{h.line_no}: {h.line}")
    if len(hits) > 250:
      print(f"... ({len(hits)-250} extra hits verborgen)")
    print()
  return 2

if __name__ == "__main__":
  raise SystemExit(main())

