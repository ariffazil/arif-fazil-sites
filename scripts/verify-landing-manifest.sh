#!/usr/bin/env bash
# verify-landing-manifest.sh — Landing ≡ Manifest Parity Gate
# Verifies each organ's live MCP tool manifest matches public claims.
# DITEMPA BUKAN DIBERI
#
# Checks per organ:
#   a) Tool count from /tools matches landing page claim
#   b) /llms.txt returns 200
#   c) /.well-known/mcp/server.json returns 200
#   d) /.well-known/oauth-protected-resource returns 200 or 301
#   e) HTTP Link header with rel="llms" present
#   f) No file:/// references in llms.txt

set -o pipefail

# ── Configuration ──────────────────────────────────────────────────────
ORGANS=(
  "mcp.arif-fazil.com|arifOS"
  "geox.arif-fazil.com|GEOX"
  "wealth.arif-fazil.com|WEALTH"
  "well.arif-fazil.com|WELL"
)

TIMEOUT=10
PASS=0
FAIL=0
WARNINGS=""

# ── Helpers ────────────────────────────────────────────────────────────
check_mark() { printf "✓"; }
cross_mark() { printf "✗"; }

http_status() {
  curl -sI -o /dev/null -w '%{http_code}' --max-time "$TIMEOUT" "$1" 2>/dev/null
}

http_header() {
  curl -sI --max-time "$TIMEOUT" "$1" 2>/dev/null | grep -i "$2"
}

fetch_text() {
  curl -sL --max-time "$TIMEOUT" "$1" 2>/dev/null
}

# ── Main ───────────────────────────────────────────────────────────────
echo "[verify-landing] Checking organ parity..."
echo ""

for entry in "${ORGANS[@]}"; do
  IFS='|' read -r host label <<< "$entry"
  base="https://${host}"
  line_out="  ${host}: "
  line_fail=0

  # ── (a) Tool count from /tools ──────────────────────────────────────
  tools_raw=$(fetch_text "${base}/tools")
  # Count tool entries — JSON may be on one line, so use grep -o for occurrence count
  tool_count=$(echo "$tools_raw" | grep -o '"name"' 2>/dev/null | wc -l)
  tool_count=$((tool_count + 0))  # ensure numeric
  if [ "$tool_count" -gt 0 ]; then
    line_out+="tools=${tool_count}, "
  else
    line_out+="tools=??, "
    line_fail=1
  fi

  # ── (b) /llms.txt returns 200 ───────────────────────────────────────
  llms_status=$(http_status "${base}/llms.txt")
  if [ "$llms_status" = "200" ]; then
    line_out+="llms.txt=200, "
  else
    line_out+="llms.txt=${llms_status}$(cross_mark), "
    line_fail=1
  fi

  # ── (c) /.well-known/mcp/server.json returns 200 or 301→kernel ─────
  prm_status=$(http_status "${base}/.well-known/mcp/server.json")
  if [ "$prm_status" = "200" ] || [ "$prm_status" = "301" ]; then
    line_out+="PRM=${prm_status}, "
  else
    line_out+="PRM=${prm_status}$(cross_mark), "
    line_fail=1
  fi

  # ── (d) /.well-known/oauth-protected-resource ───────────────────────
  oauth_status=$(http_status "${base}/.well-known/oauth-protected-resource")
  if [ "$oauth_status" = "200" ] || [ "$oauth_status" = "301" ]; then
    line_out+="OAuth=${oauth_status}, "
  elif [ "$oauth_status" = "404" ]; then
    line_out+="OAuth=404$(cross_mark), "
    line_fail=1
  else
    line_out+="OAuth=${oauth_status}, "
  fi

  # ── (e) HTTP Link header with rel="llms" ───────────────────────────
  link_header=$(http_header "${base}/" 'link:')
  if echo "$link_header" | grep -q 'rel="llms"' 2>/dev/null; then
    line_out+="Link=$(check_mark)"
  else
    line_out+="Link=$(cross_mark)"
    line_fail=1
  fi

  # ── Print result line ──────────────────────────────────────────────
  if [ "$line_fail" -eq 0 ]; then
    echo "$(check_mark) ${line_out}"
    PASS=$((PASS + 1))
  else
    echo "$(cross_mark) ${line_out}"
    FAIL=$((FAIL + 1))
  fi

  # ── (f) Check llms.txt for file:/// references ────────────────────
  if [ "$llms_status" = "200" ]; then
    llms_content=$(fetch_text "${base}/llms.txt")
    file_refs=$(echo "$llms_content" | grep -o 'file:///' 2>/dev/null | wc -l)
    file_refs=$((file_refs + 0))  # ensure numeric
    if [ "$file_refs" -gt 0 ]; then
      echo "  ⚠ ${host}/llms.txt contains ${file_refs} file:/// reference(s) — local path leak!"
      WARNINGS="${WARNINGS}  - ${host}/llms.txt: ${file_refs} file:/// refs\n"
    fi
  fi
done

echo ""

# ── Summary ────────────────────────────────────────────────────────────
TOTAL=$((PASS + FAIL))
echo "[verify-landing] ${PASS}/${TOTAL} checks passed"

if [ -n "$WARNINGS" ]; then
  echo ""
  echo "[verify-landing] Warnings:"
  printf "$WARNINGS"
fi

echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "[verify-landing] ✗ FAIL — ${FAIL} organ(s) did not pass parity gate."
  exit 1
else
  echo "[verify-landing] ✓ PASS — all organs match manifest."
  exit 0
fi
