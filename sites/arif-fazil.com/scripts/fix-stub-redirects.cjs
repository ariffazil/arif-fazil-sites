#!/usr/bin/env node
/**
 * fix-stub-redirects.cjs — turn every makcikgpt stub into a redirect page.
 *
 * A stub (series-slug page whose <article> is only a date + self-referential
 * "Baca artikel penuh" link) is rewritten to a clean redirect page pointing at
 * its real content (from scripts/map-stub-redirects.cjs): meta-refresh +
 * canonical + visible link. Humans and crawlers both land on real content.
 *
 * Idempotent: pages already carrying REDIRECT-STUB v1 are skipped.
 * Safe: only touches files isStub() true; never deletes content.
 *
 * Run from site root: node scripts/fix-stub-redirects.cjs [--dry-run]
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SITE_ROOT = path.resolve(__dirname, '..');
const MD_DIR = path.join(SITE_ROOT, 'public/makcikgpt-md');
const DRY = process.argv.includes('--dry-run');
const MARK = '<!-- REDIRECT-STUB v1 -->';

// reuse the mapper's logic by invoking it and parsing its JSON stdout
const map = JSON.parse(
  execFileSync('node', [path.join(__dirname, 'map-stub-redirects.cjs')], { encoding: 'utf8' })
    .match(/\{[\s\S]*\}/)[0]
);

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function redirectPage(title, target) {
  return `${MARK}
<!doctype html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} — MakcikGPT | ARIF FAZIL</title>
  <meta http-equiv="refresh" content="0; url=${esc(target)}" />
  <link rel="canonical" href="${esc(target)}" />
  <style>
    body{background:#0a0a0a;color:#f0f0f0;font-family:'JetBrains Mono',monospace;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center}
    a{color:#f2b705}
  </style>
</head>
<body>
  <div>
    <p>Artikel ni dah pindah.</p>
    <p><a href="${esc(target)}">Teruskan ke artikel penuh →</a></p>
    <p style="color:#666;font-size:0.75rem">Jika tidak auto-redirect, klik pautan di atas.</p>
  </div>
</body>
</html>`;
}

let done = 0, skipped = 0;
for (const [slug, target] of Object.entries(map)) {
  const file = path.join(MD_DIR, slug + '.html');
  if (!fs.existsSync(file)) { skipped++; continue; }
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes(MARK)) { skipped++; continue; }
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || slug;
  const cleanTitle = title.replace(/\s*—\s*MakcikGPT.*$/i, '').trim();
  if (!DRY) fs.writeFileSync(file, redirectPage(cleanTitle, target), 'utf8');
  done++;
}
console.log(`fix-stub-redirects: redirected=${done} skipped=${skipped}${DRY ? ' [DRY RUN]' : ''}`);
