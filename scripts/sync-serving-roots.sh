#!/usr/bin/env bash
# ⚒️ sync-serving-roots.sh — Split-root serving sync (2026-08-25 root-cause fix)
#
# WHY: the 2026-08-10 Caddy reorg split the canon. `handle /earth*` and
# `@root_static` serve from /var/www/html (top-level), while every deploy
# path syncs dist → /var/www/html/arif only. Result: earth page + surfaces.json
# + llms.json + page.json silently served pre-fix copies while deploys
# reported success (proven 2026-08-25 — catalog routes live, page stale).
#
# WHAT: after a deploy, mirror the files Caddy actually serves from the
# top-level into the top-level. Source of truth = dist/ (same bytes that
# just landed in /var/www/html/arif). Only copies files that exist in dist.
# Backs up replaced files first. Idempotent. Never touches status.json
# (top-only, generated elsewhere) or Caddy.
#
# Wiring: Makefile `make deploy` (split-roots step) + deploy-site.sh post-deploy
# hook. F2: verifies live bytes at the end — exit 1 on marker mismatch.
set -euo pipefail

DIST="${1:-/root/arif-fazil.com/sites/arif-fazil.com/dist}"
TOP="/var/www/html"
TS="$(date +%Y%m%d-%H%M%S)"
BK="$TOP/.split-roots-backup-$TS"
LOG_PREFIX="[split-roots]"

# Root-static files served by @root_static (Caddy vhosts/arif-fazil.com.conf)
# — copied ONLY if present in dist (status.json etc. are generated top-level).
ROOT_STATIC_FILES=(
  surfaces.json llms.json page.json llms-full.txt sitemap.xml floors.json
  human.md AGENTS.md robots.txt rsl.xml soul.json feed.xml
)

echo "$LOG_PREFIX dist=$DIST top=$TOP"

# ── 1. earth tree (handle /earth* roots at /var/www/html) ──────────────────
if [ -d "$DIST/earth" ]; then
  mkdir -p "$BK"
  [ -d "$TOP/earth" ] && cp -a "$TOP/earth" "$BK/earth"
  rsync -a --delete "$DIST/earth/" "$TOP/earth/"
  echo "$LOG_PREFIX synced earth/ ($(find "$TOP/earth" -type f | wc -l) files)"
else
  echo "$LOG_PREFIX WARN: no earth/ in dist — skipping (build first?)" >&2
fi

# ── 2. root-static files (@root_static handler) ────────────────────────────
synced=0
for f in "${ROOT_STATIC_FILES[@]}"; do
  if [ -f "$DIST/$f" ]; then
    [ -f "$TOP/$f" ] && cp -a "$TOP/$f" "$BK/${f}.bak"
    cp -a "$DIST/$f" "$TOP/$f"
    synced=$((synced+1))
  fi
done
echo "$LOG_PREFIX synced $synced root-static files"

# ── 3. F2 live-byte verification ───────────────────────────────────────────
fail=0
probe() { # url marker label
  body="$(curl -s -m 10 "$1" || true)"
  if echo "$body" | grep -qF "$2"; then
    echo "$LOG_PREFIX   ✓ $3"
  else
    echo "$LOG_PREFIX   ✗ $3 — MARKER MISSING at $1" >&2
    fail=1
  fi
}
probe "https://arif-fazil.com/surfaces.json" "kinabalu" "surfaces.json carries earth dossiers"
probe "https://arif-fazil.com/earth/" "/map/#earth" "earth page links to canonical /map/#earth"
probe "https://arif-fazil.com/llms.json" "arif-fazil.com" "llms.json serves"

if [ "$fail" -ne 0 ]; then
  echo "$LOG_PREFIX FAILED live verification — rollback: cp -a $BK/* $TOP/" >&2
  exit 1
fi
echo "$LOG_PREFIX ✅ serving roots aligned with dist. Backup: $BK"
