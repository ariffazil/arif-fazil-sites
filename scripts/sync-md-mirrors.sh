#!/usr/bin/env bash
# sync-md-mirrors.sh — Copy canonical .md docs to public web root
# 2026-08-15 — llms.txt v2: .md mirrors for AI agent discoverability
set -euo pipefail

WEB_ROOT="/var/www/html"
SOURCES=(
  # source_path:public_url_path
  "/root/AGENTS.md:${WEB_ROOT}/AGENTS.md"
  "/root/arifOS/README.md:${WEB_ROOT}/arifos/README.md"
  "/root/GEOX/README.md:${WEB_ROOT}/geox/README.md"
  "/root/WEALTH/README.md:${WEB_ROOT}/wealth/README.md"
  "/root/WELL/README.md:${WEB_ROOT}/well/README.md"
  "/root/A-FORGE/README.md:${WEB_ROOT}/forge/README.md"
  "/root/AAA/README.md:${WEB_ROOT}/aaa/README.md"
  "/root/arifOS/FEDERATION_CONTRACT.md:${WEB_ROOT}/FEDERATION_CONTRACT.md"
)

COPIED=0
SKIPPED=0

for entry in "${SOURCES[@]}"; do
  src="${entry%%:*}"
  dst="${entry##*:}"
  dst_dir=$(dirname "$dst")

  if [ ! -f "$src" ]; then
    echo "⚠ SKIP: $src (not found)"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  mkdir -p "$dst_dir"
  cp "$src" "$dst"
  echo "✓ $(basename "$src") → ${dst#${WEB_ROOT}/}"
  COPIED=$((COPIED + 1))
done

echo ""
echo "[md-mirrors] Copied: ${COPIED} | Skipped: ${SKIPPED}"
