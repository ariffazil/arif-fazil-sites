#!/usr/bin/env node
/**
 * makcik-hub-zen.cjs — the MakcikGPT hub is the WORLD VOICE in Bahasa
 * Nusantara. English essays belong in WORDS (/words/writing/).
 *
 * Rebuilds the hub's embedded ARTICLES array from the live corpus:
 *   1. ENTRIES: only entries whose target page is a real makcik article
 *      (not a REDIRECT-STUB page — those exist only as legacy aliases).
 *   2. DEDUPE: when a title exists under both a series slug (m1-2) and a
 *      named slug (petronas-dna), keep the NAMED slug (canonical, human).
 *   3. COUNTS: stats block (Artikel / Siri) recomputed from the real list,
 *      never hardcoded.
 *   4. EN ABSORBED: dropped entries are English essays — they already live
 *      at /words/writing/ (static landing, 53 links). Nothing is lost.
 *
 * Idempotent: rewrites the ARTICLES array + stats in place; safe to re-run.
 * Run from site root: node scripts/makcik-hub-zen.cjs [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const HUB = path.join(SITE_ROOT, 'public/makcikgpt-md/index.html');
const MD_DIR = path.join(SITE_ROOT, 'public/makcikgpt-md');
const DRY = process.argv.includes('--dry-run');

const un = (s) => s.replace(/\\"/g, '"');
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

function parseHub(html) {
  const m = html.match(/const ARTICLES=\[([\s\S]*?)\];/);
  if (!m) throw new Error('ARTICLES array not found');
  const re = /\{s:"((?:[^"\\]|\\.)*)",d:"((?:[^"\\]|\\.)*)",u:"((?:[^"\\]|\\.)*)",t:"((?:[^"\\]|\\.)*)"\}/g;
  const list = [];
  let x;
  while ((x = re.exec(m[1]))) list.push({ s: un(x[1]), d: un(x[2]), u: un(x[3]), t: un(x[4]) });
  return { list, raw: m[0] };
}

function isRealArticle(u) {
  const slug = u.replace('/world/makcikgpt/', '');
  const f = path.join(MD_DIR, slug + '.html');
  if (!fs.existsSync(f)) return false;
  return !fs.readFileSync(f, 'utf8').includes('REDIRECT-STUB v1');
}

// EN detection: essays whose canonical home is /words/writing (title matches
// the writing landing) OR the target page is a redirect stub into /writing.
function absorbedByWords(u, t) {
  const slug = u.replace('/world/makcikgpt/', '');
  const f = path.join(MD_DIR, slug + '.html');
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    const mredir = html.match(/url=([^"]+)"/);
    if (mredir && (mredir[1].includes('/writing/') || mredir[1].includes('medium.com'))) return true;
  }
  return false;
}

function main() {
  let html = fs.readFileSync(HUB, 'utf8');
  const { list, raw } = parseHub(html);

  // Step 1 — keep only entries whose page is a real (non-redirect) article
  const real = list.filter((a) => isRealArticle(a.u));
  const absorbed = list.filter((a) => !isRealArticle(a.u) && absorbedByWords(a.u, a.t));
  const droppedOther = list.filter((a) => !isRealArticle(a.u) && !absorbedByWords(a.u, a.t));

  // Step 2 — dedupe by normalized title; prefer NAMED slugs over series slugs
  const isSeriesSlug = (u) => /^\/world\/makcikgpt\/[ms]\d+-\d+$/.test(u);
  const byTitle = new Map();
  for (const a of real) {
    const k = norm(a.t);
    const prev = byTitle.get(k);
    if (!prev) { byTitle.set(k, a); continue; }
    // keep the named slug
    if (isSeriesSlug(prev.u) && !isSeriesSlug(a.u)) byTitle.set(k, a);
  }
  const deduped = [...byTitle.values()];
  const removedDupes = real.length - deduped.length;

  // Step 3 — rebuild array text (same field order/format)
  const arrText = 'const ARTICLES=[' + deduped
    .map((a) => `{s:${JSON.stringify(a.s)},d:${JSON.stringify(a.d)},u:${JSON.stringify(a.u)},t:${JSON.stringify(a.t)}}`)
    .join(',') + '];';
  html = html.replace(raw, arrText);

  // Stats: recompute Artikel count + note EN absorbed → keep Siri 5
  const siri = new Set(deduped.map((a) => a.s)).size;
  html = html.replace(/<b class="c-r">\d+<\/b><span>Artikel<\/span>/, `<b class="c-r">${deduped.length}</b><span>Artikel</span>`);
  html = html.replace(/<b class="c-b">\d+<\/b><span>Siri<\/span>/, `<b class="c-b">${siri}</b><span>Siri</span>`);
  html = html.replace(/SEAL 999 · \d+ ARTIKEL/, `SEAL 999 · ${deduped.length} ARTIKEL`);
  html = html.replace(/(\d+) articles, 5 series/, `${deduped.length} articles, ${siri} series`);

  console.log(`entries: ${list.length}`);
  console.log(`real BM articles kept: ${real.length} → deduped: ${deduped.length} (removed ${removedDupes} series-slug dupes)`);
  console.log(`EN essays absorbed by /words/writing (already there): ${absorbed.length}`);
  console.log(`dropped other: ${droppedOther.length}${droppedOther.length ? ' → ' + droppedOther.map((a) => a.u.split('/').pop()).join(', ') : ''}`);
  console.log(`stats → Artikel=${deduped.length}, Siri=${siri}`);
  if (!DRY) fs.writeFileSync(HUB, html, 'utf8');
  console.log(DRY ? '[DRY RUN — no write]' : 'written: ' + HUB);
}

main();
