#!/usr/bin/env node
/**
 * map-stub-redirects.cjs — resolve every makcikgpt stub to its real content.
 *
 * A "stub" is a series-slug .html whose <article> is just a date + a
 * self-referential "Baca artikel penuh" link (dead loop). Its content lives:
 *   1. onsite  — a named sibling slug with the same title (full Primer page)
 *   2. medium  — essays.json dest.type=medium (canonical publication)
 *   3. spa     — SPA essays index (src/data/essays/index.ts) at /writing/:slug
 *   4. hub     — nowhere: fall back to the hub landing
 *
 * Prints a JSON map { stubSlug: targetUrl } for review; with --write it emits
 * Caddy redirect snippets + rewrites the stubs to meta-refresh pages.
 *
 * Run: node scripts/map-stub-redirects.cjs
 */
const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const MD_DIR = path.join(SITE_ROOT, 'public/makcikgpt-md');
const ESSAYS = path.join(SITE_ROOT, 'src/data/essays.json');
const SPA_INDEX = path.join(SITE_ROOT, 'src/data/essays/index.ts');
const BASE = 'https://arif-fazil.com';

function articleText(html) {
  const m = html.match(/<article[\s\S]*?<\/article>/);
  return m ? m[0].replace(/<[^>]+>/g, '').trim() : '';
}
function isStub(html) {
  return html.includes('Baca artikel penuh') && articleText(html).length < 150;
}

function norm(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const essays = JSON.parse(fs.readFileSync(ESSAYS, 'utf8'));
const spaSrc = fs.readFileSync(SPA_INDEX, 'utf8');
// parse SPA essays: slug + title pairs from index.ts
const spa = [];
const reBlock = /slug:\s*"([^"]+)"[\s\S]*?title:\s*`([^`]+)`/g;
let x;
while ((x = reBlock.exec(spaSrc))) spa.push({ slug: x[1], title: x[2] });
const spaByNorm = new Map();
for (const s of spa) spaByNorm.set(norm(s.title), s);

// onsite non-stub pages: slug -> normalized title (from <title> or <h1>)
const onsiteByNorm = new Map();
for (const f of fs.readdirSync(MD_DIR).filter((f) => f.endsWith('.html') && f !== 'index.html')) {
  const html = fs.readFileSync(path.join(MD_DIR, f), 'utf8');
  if (isStub(html)) continue;
  const t = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  onsiteByNorm.set(norm(t.replace(/<[^>]+>/g, '')), f.replace('.html', ''));
}

const hub = fs.readFileSync(path.join(MD_DIR, 'index.html'), 'utf8');
const mHub = hub.match(/const ARTICLES=\[([\s\S]*?)\];/);
// field values may contain escaped quotes (\"Kekal Milik Penuh...\") — allow \" inside
const reHub = /\{s:"((?:[^"\\]|\\.)*)",d:"((?:[^"\\]|\\.)*)",u:"((?:[^"\\]|\\.)*)",t:"((?:[^"\\]|\\.)*)"\}/g;
const un = (s) => s.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
const list = [];
while ((x = reHub.exec(mHub[1]))) list.push({ u: un(x[3]), t: un(x[4]) });
const byTitle = new Map();
for (const a of list) {
  const k = a.t.toLowerCase();
  if (!byTitle.has(k)) byTitle.set(k, []);
  byTitle.get(k).push(a);
}

const map = {};
for (const a of list) {
  const slug = a.u.replace('/world/makcikgpt/', '');
  const f = path.join(MD_DIR, slug + '.html');
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  if (!isStub(html)) continue;

  // 1. onsite sibling (exact title, then normalized)
  const sib = (byTitle.get(a.t.toLowerCase()) || []).find((b) => {
    if (b.u === a.u) return false;
    const bf = path.join(MD_DIR, b.u.replace('/world/makcikgpt/', '') + '.html');
    return fs.existsSync(bf) && !isStub(fs.readFileSync(bf, 'utf8'));
  });
  if (sib) { map[slug] = BASE + sib.u; continue; }
  const nT = norm(a.t);
  const onSlug = onsiteByNorm.get(nT);
  if (onSlug && onSlug !== slug) { map[slug] = BASE + '/world/makcikgpt/' + onSlug; continue; }
  // containment: onsite title that starts with the stub title (longer variants)
  let cont = null;
  for (const [nt, s] of onsiteByNorm) {
    if (s !== slug && nT.length >= 12 && (nt.startsWith(nT) || nT.startsWith(nt))) { cont = s; break; }
  }
  if (cont) { map[slug] = BASE + '/world/makcikgpt/' + cont; continue; }

  // 2. essays.json dest (medium external OR onsite under /writing etc)
  const entry = essays.find((e) => e.id === slug || e.title === a.t);
  if (entry && entry.dest) {
    if (entry.dest.type === 'medium' && entry.dest.url) { map[slug] = entry.dest.url; continue; }
    if (entry.dest.type === 'onsite' && entry.dest.path) { map[slug] = BASE + entry.dest.path; continue; }
  }

  // 3. spa essay (normalized title)
  const sp = spaByNorm.get(norm(a.t));
  if (sp) { map[slug] = BASE + '/writing/' + sp.slug; continue; }

  // 4. hub fallback
  map[slug] = BASE + '/world/makcikgpt/';
}

console.log(JSON.stringify(map, null, 1));
console.error('total stubs mapped:', Object.keys(map).length);
