#!/usr/bin/env bash
set -euo pipefail

# ---- Settings (override via env vars if you want) ----
AIDER_BIN="${AIDER_BIN:-$HOME/.local/bin/aider}"
AIDER_MODEL="${AIDER_MODEL:-gpt-4o-mini}"
AIDER_MAP_TOKENS="${AIDER_MAP_TOKENS:-4000}"
AIDER_ENV_FILE="${AIDER_ENV_FILE:-.env.local}"

# Optional toggles:
#   AIDER_YES_ALWAYS=1       # auto-accept patches
#   AIDER_NO_AUTO_COMMITS=1  # don't auto-commit; you commit manually
# Optional config/ignore (ONLY if you’re sure they’re clean):
#   AIDER_CONFIG=aider.conf.yml
#   AIDER_IGNORE=aiderignore

# ---- Load key if not already set ----
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  if [[ -f "$AIDER_ENV_FILE" ]]; then
    export OPENAI_API_KEY="$(grep -E '^OPENAI_API_KEY=' "$AIDER_ENV_FILE" | cut -d= -f2- || true)"
  fi
fi
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "❌ OPENAI_API_KEY missing. Put it in $AIDER_ENV_FILE or export it."
  exit 1
fi

# ---- Build command ----
cmd=(
  "$AIDER_BIN"
  --openai-api-key "$OPENAI_API_KEY"
  --model "$AIDER_MODEL"
  --edit-format diff
  --map-tokens "$AIDER_MAP_TOKENS"
)

# Only include config/ignore if explicitly provided via env (to avoid your earlier CLI issues)
[[ -n "${AIDER_CONFIG:-}" && -f "$AIDER_CONFIG" ]] && cmd+=(-c "$AIDER_CONFIG")
[[ -n "${AIDER_IGNORE:-}" && -f "$AIDER_IGNORE" ]] && cmd+=(--aiderignore "$AIDER_IGNORE")

[[ "${AIDER_YES_ALWAYS:-}" == "1" ]] && cmd+=(--yes-always)
[[ "${AIDER_NO_AUTO_COMMITS:-}" == "1" ]] && cmd+=(--no-auto-commits)

# ---- Messages (your tested workflow) ----
cmd+=(
  --message "/add package.json vitest.config.* tsconfig*.json postcss.config.* tailwind.config.* vite.config.* next.config.*"
  --message "/add app/* components/* lib/* styles/* __tests__/*"
  --message "Run a repo-wide sanity check: align ESM/CommonJS, ensure Tailwind & PostCSS, align @ alias; keep changes minimal."
  --message "/run npm run lint"
  --message "Fix ESLint issues with minimal diffs."
  --message "/run npm run typecheck"
  --message "Fix TypeScript errors without weakening types."
  --message "/run npm run build"
  --message "Resolve build errors; keep diffs small and explain changes briefly."
)

echo "▶ Launching Aider sanity sweep…"
echo "   aider: $AIDER_BIN"
echo "   model: $AIDER_MODEL"
echo "   map tokens: $AIDER_MAP_TOKENS"
[[ -n "${AIDER_CONFIG:-}" ]] && echo "   config: $AIDER_CONFIG"
[[ -n "${AIDER_IGNORE:-}" ]] && echo "   ignore: $AIDER_IGNORE"
echo

exec "${cmd[@]}"

