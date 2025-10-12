#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <file> [more files...] [-- <custom message>]"
  echo "Examples:"
  echo "  $0 'app/(site)/layout.tsx'"
  echo "  $0 lib/blog.ts -- 'Fix the unclosed catch block and keep logic unchanged.'"
  exit 1
fi

# === Configurable via env ===
AIDER_BIN="${AIDER_BIN:-$HOME/.local/bin/aider}"
AIDER_MODEL="${AIDER_MODEL:-gpt-4o-mini}"
AIDER_MAP_TOKENS="${AIDER_MAP_TOKENS:-4000}"
AIDER_ENV_FILE="${AIDER_ENV_FILE:-.env.local}"
# Optional toggles:
#   AIDER_YES_ALWAYS=1       # auto-accept patches
#   AIDER_NO_AUTO_COMMITS=1  # don't auto-commit
# Optional config/ignore:
#   AIDER_CONFIG=aider.conf.yml
#   AIDER_IGNORE=aiderignore

# === Sanity checks ===
if ! command -v "$AIDER_BIN" >/dev/null 2>&1; then
  echo "❌ Aider not found at $AIDER_BIN"
  exit 1
fi

# Load key from env or .env.local
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  if [[ -f "$AIDER_ENV_FILE" ]]; then
    # Trim CRLF & optional quotes
    OPENAI_API_KEY="$(grep -E '^OPENAI_API_KEY=' "$AIDER_ENV_FILE" | cut -d= -f2- | tr -d '\r' | sed 's/^["'\'']//; s/["'\'']$//')"
    export OPENAI_API_KEY
  fi
fi
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "❌ OPENAI_API_KEY missing. Put it in $AIDER_ENV_FILE or export it."
  exit 1
fi

# Collect files until `--`
FILES=()
while [[ $# -gt 0 && "${1:-}" != "--" ]]; do
  FILES+=("$1")
  shift
done

# Collect custom message after `--` (optional)
CUSTOM_MSG=""
if [[ "${1:-}" == "--" ]]; then
  shift
  CUSTOM_MSG="$*"
fi

# Build base command
cmd=(
  "$AIDER_BIN"
  --openai-api-key "$OPENAI_API_KEY"
  --model "$AIDER_MODEL"
  --edit-format diff
  --map-tokens "$AIDER_MAP_TOKENS"
)

# Optional config/ignore if provided
[[ -n "${AIDER_CONFIG:-}" && -f "$AIDER_CONFIG" ]] && cmd+=(-c "$AIDER_CONFIG")
[[ -n "${AIDER_IGNORE:-}" && -f "$AIDER_IGNORE" ]] && cmd+=(--aiderignore "$AIDER_IGNORE")
[[ "${AIDER_YES_ALWAYS:-}" == "1" ]] && cmd+=(--yes-always)
[[ "${AIDER_NO_AUTO_COMMITS:-}" == "1" ]] && cmd+=(--no-auto-commits)

# Add each file safely
for f in "${FILES[@]}"; do
  cmd+=( --message "/add $f" )
done

# Default message if none provided
if [[ -z "$CUSTOM_MSG" ]]; then
  CUSTOM_MSG="Fix lint/type errors only in: ${FILES[*]}. Keep diffs minimal and do not change dependencies."
fi
cmd+=( --message "$CUSTOM_MSG" )

echo "▶ aider: $AIDER_BIN"
echo "   model: $AIDER_MODEL"
echo "   files: ${FILES[*]}"
echo "   map tokens: $AIDER_MAP_TOKENS"
echo "   key: ${OPENAI_API_KEY:0:8}…${OPENAI_API_KEY: -6}"
[[ -n "${AIDER_CONFIG:-}" ]] && echo "   config: $AIDER_CONFIG"
[[ -n "${AIDER_IGNORE:-}" ]] && echo "   ignore: $AIDER_IGNORE"
echo

exec "${cmd[@]}"

