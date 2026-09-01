#!/usr/bin/env node
/**
 * inject-article-nav.cjs — kill the article dead-end (design fix).
 *
 * Every MakcikGPT article currently ends with only a "← Semua Artikel" link.
 * A reader who finishes one story is dropped; the 80+ article corpus never
 * pulls them forward. This injects, before the footer of each article:
 *   1. prev/next links (reading order = date-desc, same as the hub list)
 *   2. up to 3 related articles (same series)
 *
 * Source of truth for order/series/title: the hub's embedded ARTICLES array
 * in public/makcikgpt-md/index.html (the fullest ordered corpus).
 *
 * Idempotent: block is wrapped in NAV-PREVNEXT markers; re-run strips first.
 * Safe: only touches files present in the hub array; never deletes content.
 *
 * Run from site root: node scripts/inject-article-nav.cjs [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const MD_DIR = path.join(SITE_ROOT, 'public/makcikgpt-md');
const HUB = path.join(MD_DIR, 'index.html');
const DRY = process.argv.includes('--dry-run');

const OPEN = '<!-- NAV-PREVNEXT v1 -->';
const CLOSE = '<!-- /NAV-PREVNEXT v1 -->';

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseHubArticles() {
  const html = fs.readFileSync(HUB, 'utf8');
  const m = html.match(/const ARTICLES=\[([\s\S]*?)\];/);
  if (!m) throw new Error('hub ARTICLES array not found');
  const entries = [];
  // field values may contain escaped quotes (\"Kekal Milik Penuh...\") — allow \" inside
  const re = /\{s:"((?:[^"\\]|\\.)*)",d:"((?:[^"\\]|\\.)*)",u:"((?:[^"\\]|\\.)*)",t:"((?:[^"\\]|\\.)*)"\}/g;
  const un = (s) => s.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  let x;
  while ((x = re.exec(m[1])) !== null) {
    entries.push({ s: un(x[1]), d: un(x[2]), u: un(x[3]), t: un(x[4]) });
  }
  return entries;
}

function buildBlock(list, idx) {
  // `list` must be the title-deduped, date-sorted corpus so prev/next/related
  // never show the same article twice.
  const cur = list[idx];
  const prev = idx > 0 ? list[idx - 1] : null;          // newer
  const next = idx < list.length - 1 ? list[idx + 1] : null; // older
  const exclude = new Set([cur.u, prev && prev.u, next && next.u].filter(Boolean));
  const related = list
    .filter((a) => a.s === cur.s && !exclude.has(a.u))
    .sort((a, b) => b.d.localeCompare(a.d))
    .slice(0, 3);

  const card = (a, label, arrow, align) => a ? `
    <a href="${esc(a.u)}" style="flex:1 1 240px;display:block;border:1px solid var(--border);background:var(--bg-card);border-radius:8px;padding:14px 16px;text-decoration:none;transition:border-color .15s" onmouseover="this.style.borderColor='var(--yellow)'" onmouseout="this.style.borderColor='var(--border)'">
      <span style="display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--fg-subtle);text-transform:uppercase;margin-bottom:6px">${arrow} ${label}</span>
      <span style="display:block;font-weight:600;font-size:14px;line-height:1.4;color:var(--fg)">${esc(a.t)}</span>
    </a>` : `
    <div style="flex:1 1 240px;border:1px dashed var(--border);border-radius:8px;padding:14px 16px;opacity:.45">
      <span style="display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--fg-subtle);text-transform:uppercase;margin-bottom:6px">${arrow} ${label}</span>
      <span style="display:block;font-size:14px;color:var(--fg-subtle)">—</span>
    </div>`;

  const relHtml = related.length ? `
    <div style="margin-top:22px">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--yellow);text-transform:uppercase;margin-bottom:10px">Baca juga · Series ${esc(cur.s)}</div>
      <ul style="list-style:none;margin:0;padding:0">
        ${related.map((r) => `
        <li style="margin:0 0 8px"><a href="${esc(r.u)}" style="color:var(--fg);text-decoration:none;font-size:14px;line-height:1.4;display:inline-block;border-bottom:1px solid var(--border);padding-bottom:2px">${esc(r.t)}</a> <span style="font-family:var(--mono);font-size:11px;color:var(--fg-subtle)">· ${esc(r.d)}</span></li>`).join('')}
      </ul>
    </div>` : '';

  return `
${OPEN}
<nav aria-label="Artikel berkaitan" style="margin:48px 0 0">
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    ${card(prev, 'Sebelumnya', '←', 'left')}
    ${card(next, 'Seterusnya', '→', 'right')}
  </div>
  ${relHtml}
</nav>
${CLOSE}
`;
}

function main() {
  const raw = parseHubArticles();
  // The hub array contains duplicate slugs (e.g. an article listed under two
  // ids). Dedupe by slug, keeping the first occurrence, so prev/next never
  // point at the same article twice.
  const seen = new Set();
  const list = raw.filter((a) => {
    const slug = a.u.replace('/world/makcikgpt/', '');
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
  // Some articles are listed under two slugs with the same title (data wart in
  // the hub array). Readers see titles, so collapse same-title entries too.
  const seenTitle = new Set();
  const deduped = list.filter((a) => {
    const key = a.t.trim().toLowerCase();
    if (seenTitle.has(key)) return false;
    seenTitle.add(key);
    return true;
  });
  const byDate = [...deduped].sort((a, b) => b.d.localeCompare(a.d) || a.u.localeCompare(b.u));
  const slugOf = (a) => a.u.replace('/world/makcikgpt/', '');
  // title -> all slugs that share it, so duplicate-slug pages get nav too.
  const slugsByTitle = new Map();
  for (const a of list) {
    const key = a.t.trim().toLowerCase();
    if (!slugsByTitle.has(key)) slugsByTitle.set(key, []);
    slugsByTitle.get(key).push(slugOf(a));
  }

  let injected = 0, skipped = 0, missing = 0;
  for (let i = 0; i < byDate.length; i++) {
    const block = buildBlock(byDate, i);
    const slugs = slugsByTitle.get(byDate[i].t.trim().toLowerCase()) || [slugOf(byDate[i])];
    for (const slug of slugs) {
      const file = path.join(MD_DIR, slug + '.html');
      if (!fs.existsSync(file)) { missing++; continue; }
      let html = fs.readFileSync(file, 'utf8');
      const prior = new RegExp(`\\n?${OPEN}[\\s\\S]*?${CLOSE}\\n?`);
      const hadNav = prior.test(html);
      html = html.replace(prior, '\n');
      // redirect pages (stubs resolved elsewhere) carry no nav — clean + skip
      if (html.includes('REDIRECT-STUB v1')) {
        if (hadNav && !DRY) fs.writeFileSync(file, html, 'utf8');
        continue;
      }
      const footerIdx = html.indexOf('<footer');
      if (footerIdx !== -1) {
        const closeIdx = html.lastIndexOf('</div>', footerIdx);
        if (closeIdx !== -1) html = html.slice(0, closeIdx) + block + html.slice(closeIdx);
        else { skipped++; continue; }
      } else {
        const bodyIdx = html.lastIndexOf('</body>');
        if (bodyIdx === -1) { skipped++; continue; }
        html = html.slice(0, bodyIdx) + block + html.slice(bodyIdx);
      }
      if (!DRY) fs.writeFileSync(file, html, 'utf8');
      injected++;
    }
  }
  console.log(`inject-article-nav: injected=${injected} skipped=${skipped} missingHtml=${missing} (of ${byDate.length} hub entries)${DRY ? ' [DRY RUN]' : ''}`);
}

main();
