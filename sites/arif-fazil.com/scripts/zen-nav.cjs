#!/usr/bin/env node
/**
 * zen-nav.cjs — collapse every static surface's primary nav to the canon
 * v7 invariant (navigation.json primary_links). Kills hand-rolled chaos.
 *
 * The canon is the invariant: HOME EARTH WORDS WORLD WORK (max 5). Machine
 * links (llms.txt, /health, webmcp, organs) belong in FOOTERS only — they are
 * already there on 000/999, so cleaning headers loses nothing.
 *
 * Two hand-rolled families are normalised:
 *   A) sticky inline-styled <header> + <nav>   (000, 999)
 *   B) <nav class="nav" aria-label="Primary"> (economics, missions, doctrine, ...)
 *
 * Idempotent: canonical block wrapped in NAV-ZEN v1 markers; re-run strips first.
 * Safe: only rewrites the primary nav; never touches content/footers.
 *
 * Run from site root: node scripts/zen-nav.cjs [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const CANON = '/root/web-canon/canon/navigation.json';
const DRY = process.argv.includes('--dry-run');

const OPEN = '<!-- NAV-ZEN v1 -->';
const CLOSE = '<!-- /NAV-ZEN v1 -->';

const canon = JSON.parse(fs.readFileSync(CANON, 'utf8'));
const primary = canon.primary_links.items;
const brand = canon.brand || { label: 'ARIF FAZIL', href: '/' };

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Canonical self-contained header (Family A) — inline styles, works anywhere.
function canonicalHeader(currentHref) {
  const links = primary
    .map((i) => {
      const here = i.href === currentHref;
      return `      <a href="${esc(i.href)}" style="color:${here ? '#f2b705' : '#9a9a9a'};text-decoration:none;font-weight:${here ? 700 : 400};">${esc(i.label)}</a>`;
    })
    .join('\n');
  return `
${OPEN}
<header style="background:#0a0a0a;border-bottom:1px solid #2a2a2a;padding:0.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-family:'JetBrains Mono',monospace;position:sticky;top:0;z-index:9999;">
  <a href="${esc(brand.href)}" style="color:#f0f0f0;text-decoration:none;font-weight:900;font-size:1.05rem;letter-spacing:-0.02em;">${esc(brand.label)}</a>
  <nav aria-label="Primary" style="display:flex;align-items:center;gap:1.1rem;font-size:0.75rem;text-transform:uppercase;flex-wrap:wrap;">
${links}
  </nav>
</header>
${CLOSE}`;
}

// Canonical inner links for an existing <nav class="nav"> (Family B).
// Inline styles so the block is self-contained (these pages define no .nav a / .here).
function canonicalNavInner(currentHref) {
  return primary
    .map((i) => {
      const here = i.href === currentHref;
      return `      <a href="${esc(i.href)}" style="color:${here ? '#f2b705' : '#9a9a9a'};text-decoration:none;font-weight:${here ? 700 : 400};">${esc(i.label)}</a>`;
    })
    .join('\n');
}

function stripPrior(html) {
  return html.replace(new RegExp(`\\n?${OPEN}[\\s\\S]*?${CLOSE}\\n?`, 'g'), '\n');
}

// Family A: replace the sticky inline-styled header (first <header ...sticky...>...</header>).
function fixFamilyA(html, currentHref) {
  const re = /<header[^>]*position:sticky[^>]*>[\s\S]*?<\/header>/;
  if (!re.test(html)) return null;
  return html.replace(re, canonicalHeader(currentHref).trim());
}

// Family B: replace the inner links of <nav class="nav" aria-label="Primary">.
function fixFamilyB(html, currentHref) {
  const re = /(<nav class="nav" aria-label="Primary">)[\s\S]*?(<\/nav>)/;
  if (!re.test(html)) return null;
  return html.replace(re, (m, open, close) => `${open}\n${canonicalNavInner(currentHref)}\n    ${close}`);
}

// Family C: the MakcikGPT hub topbar — replace inner links of .topbar-links
// with the canon 5 (its own CSS .topbar-links a styles them).
function fixFamilyC(html, currentHref) {
  const re = /(<div class="topbar-links">)[\s\S]*?(<\/div>)/;
  if (!re.test(html)) return null;
  const inner = primary
    .map((i) => {
      const here = i.href === currentHref;
      return `    <a href="${esc(i.href)}"${here ? ' style="color:#f2b705;font-weight:700;"' : ''}>${esc(i.label)}</a>`;
    })
    .join('\n');
  return html.replace(re, (m, open, close) => `${open}\n${inner}\n  ${close}`);
}

// page -> its own canonical href for the "here" marker.
// NOTE: /missions/ and /doctrine/ 308-redirect to /work/missions/ and
// /words/doctrine/ — those are the files actually served, so zen those.
const PAGES = [
  ['public/000/index.html', '/000/'],
  ['public/999/index.html', '/999/'],
  ['public/economics/index.html', '/economics'],
  ['public/missions/index.html', '/missions'],
  ['public/doctrine/index.html', '/doctrine'],
  ['public/work/missions/index.html', '/work'],
  ['public/words/doctrine/index.html', '/words'],
  ['public/makcikgpt-md/index.html', '/world'],
];

function main() {
  let changed = 0, untouched = 0;
  for (const [rel, href] of PAGES) {
    const file = path.join(SITE_ROOT, rel);
    if (!fs.existsSync(file)) { untouched++; continue; }
    let html = stripPrior(fs.readFileSync(file, 'utf8'));
    const before = html;
    const a = fixFamilyA(html, href);
    if (a !== null) html = a;
    else {
      const b = fixFamilyB(html, href);
      if (b !== null) html = b;
      else {
        const c = fixFamilyC(html, href);
        if (c !== null) html = c;
      }
    }
    if (html === before) { untouched++; continue; }
    if (!DRY) fs.writeFileSync(file, html, 'utf8');
    changed++;
    console.log(`  ✅ ${rel} — nav zen'd`);
  }
  console.log(`zen-nav: changed=${changed} untouched=${untouched}${DRY ? ' [DRY RUN]' : ''}`);
}

main();
