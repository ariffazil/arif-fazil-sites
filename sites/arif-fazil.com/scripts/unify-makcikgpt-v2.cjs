#!/usr/bin/env node
/**
 * Unify ALL MakcikGPT articles to canonical Primer Dark template.
 * Handles: no-nav, no-article-tag, duplicate h1, old CSS, stubs.
 */
const fs = require('fs');
const path = require('path');

const DIR = '/var/www/html/arif/makcikgpt-md';
const SKIP = new Set(['index.html', 'semua-hidup-adalah-jual-beli.html', 'empat-cara-kenal-realiti.html', 'cinta-bukan-lawan-jual-beli.html', 'benda-paling-nyata-tak-boleh-ditimbang.html', 'syaitan-ingat-dirinya-malaikat.html', 'semua-hidup-adalah-transaksi.html', 'kenapa-love-mati.html', 'tiga-lapis-realiti.html']);

// Canonical template parts
const HEAD_OPEN = `<!doctype html>
<html lang="ms" data-ring="SOUL">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />`;

const HEAD_CLOSE = `
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>Ψ</text></svg>" />
  <link rel="stylesheet" href="/_shared/design-system/tokens.css" />
  <link rel="stylesheet" href="/assets/index-Dte6gqTG.css" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400..900&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0a;--bg-card:#111;--fg:#f0f0f0;--fg-muted:#9a9a9a;--red:#e0301e;--blue:#1f3fd4;--yellow:#f2b705}
body{background:var(--bg);color:var(--fg);font-family:"Newsreader","Georgia",serif;font-size:18px;line-height:1.7;max-width:720px;margin:0 auto;padding:60px 24px}
h1{font-family:"Cabinet Grotesk","Inter",sans-serif;font-size:clamp(28px,5vw,42px);font-weight:800;line-height:1.1;letter-spacing:-0.02em;margin:0 0 16px}
h2{color:var(--yellow);font-size:1.4em;margin:2em 0 0.8em;font-weight:700}
h3{color:var(--red);font-size:1.1em;margin:1.5em 0 0.6em;font-weight:700}
p{margin-bottom:1.2em}
a{color:var(--yellow);text-decoration:underline;text-underline-offset:3px}
a:hover{color:var(--fg)}
blockquote{border-left:4px solid var(--blue);padding:12px 20px;margin:1.5em 0;background:rgba(31,63,212,0.06);border-radius:0 8px 8px 0;font-style:italic;color:var(--fg-muted)}
strong{color:var(--yellow);font-weight:700}
em{color:var(--fg-muted)}
hr{border:none;border-top:1px solid #2a2a2a;margin:2em 0}
ul,ol{margin-bottom:1.2em;padding-left:1.5em}
li{margin-bottom:0.4em}
table{width:100%;border-collapse:collapse;margin:1.5em 0}
th{text-align:left;padding:10px 12px;border-bottom:2px solid var(--yellow);color:var(--yellow);font-weight:700;font-size:0.85em;text-transform:uppercase;letter-spacing:0.04em}
td{padding:8px 12px;border-bottom:1px solid #2a2a2a}
</style>
</head>`;

const NAV = `
<body class="bg-forge-black">
<div class="site-frame max-w-4xl mx-auto px-4">
  <header class="flex items-center justify-between py-6 border-b border-forge-iron mb-10">
    <a href="/" class="font-display text-2xl text-forge-white hover:text-forge-gold transition-colors">ARIF FAZIL</a>
    <nav class="flex gap-6 font-mono text-xs text-forge-dim uppercase tracking-widest">
      <a href="/" class="hover:text-forge-gold transition-colors">Home</a>
      <a href="/earth/" class="hover:text-forge-gold transition-colors">Earth</a>
      <a href="/words/" class="hover:text-forge-gold transition-colors">Words</a>
      <a href="/world/" class="text-forge-gold">World</a>
      <a href="/work/" class="hover:text-forge-gold transition-colors">Work</a>
    </nav>
  </header>`;

const FOOTER = `
  <hr class="border-forge-iron my-12" />
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
    <div class="brutalist-card border border-forge-gold/50 px-5 py-3 inline-flex items-center gap-2 font-mono text-sm bg-forge-gold/5">
      <span class="text-forge-gold">⚒️</span>
      <span class="text-forge-dim">Published directly on</span>
      <span class="text-forge-white font-bold">arif-fazil.com</span>
    </div>
    <a href="/world/makcikgpt/" class="font-mono text-sm text-forge-dim hover:text-forge-gold transition-colors">← Semua Artikel</a>
  </div>
</div>
<footer style="border-top:1px solid #2a2a2a;padding:2rem;text-align:center;margin-top:4rem">
  <div style="display:flex;justify-content:center;gap:6px;margin-bottom:0.5rem">
    <span style="width:6px;height:6px;border-radius:50%;background:#e0301e;display:inline-block"></span>
    <span style="width:6px;height:6px;border-radius:50%;background:#1f3fd4;display:inline-block"></span>
    <span style="width:6px;height:6px;border-radius:50%;background:#f2b705;display:inline-block"></span>
  </div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#666;letter-spacing:0.1em">MAKCIKGPT · ARIF-FAZIL.COM</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:#f2b705;margin-top:0.5rem;letter-spacing:0.15em">DITEMPA BUKAN DIBERI 🇲🇾</div>
</footer>
</body>
</html>`;

function extractTitle(html) {
  // Try <h1> first, then <title>
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1) {
    let t = h1[1].replace(/<[^>]*>/g, '').trim();
    // Remove "MakcikGPT — " prefix if present
    t = t.replace(/^MakcikGPT\s*[—–-]\s*/i, '');
    return t;
  }
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  if (title) {
    let t = title[1].replace(/<[^>]*>/g, '').trim();
    t = t.replace(/\s*[—–-]\s*MakcikGPT.*$/i, '').replace(/\s*\|\s*ARIF FAZIL.*$/i, '');
    return t;
  }
  return '';
}

function extractDescription(html) {
  const m = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  return m ? m[1] : '';
}

function extractBody(html) {
  // Strategy 1: extract <article> content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (articleMatch) return articleMatch[1].trim();
  
  // Strategy 2: extract everything after <body> or after first <h1>, before </body>
  let body = html;
  
  // Find start: after <body> tag or after first </style>
  const bodyStart = body.indexOf('<body');
  if (bodyStart > -1) body = body.substring(bodyStart);
  
  // Find the first <h1> — that's where content starts
  const h1Start = body.indexOf('<h1');
  if (h1Start > -1) body = body.substring(h1Start);
  
  // Find end: before </body> or </html>
  const bodyEnd = body.lastIndexOf('</body>');
  if (bodyEnd > -1) body = body.substring(0, bodyEnd);
  
  // Strip any existing nav/header/footer/div wrappers
  body = body.replace(/<header[\s\S]*?<\/header>/g, '');
  body = body.replace(/<footer[\s\S]*?<\/footer>/g, '');
  body = body.replace(/<nav[\s\S]*?<\/nav>/g, '');
  
  // Remove the first <h1> (we'll add it back in the template)
  body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
  
  // Remove subtitle/description paragraph (first <p> after h1)
  body = body.replace(/^[\s\S]*?<\/div>\s*/, '');
  
  // Remove meta pills (div with "By MakcikGPT" etc)
  body = body.replace(/<div class="flex[\s\S]*?<\/div>\s*/g, '');
  
  // Remove the first <hr> if present
  body = body.replace(/<hr[^>]*\/?>\s*/, '');
  
  return body.trim();
}

function cleanBody(body) {
  // Remove any existing <style> blocks
  body = body.replace(/<style[\s\S]*?<\/style>/g, '');
  
  // Remove any existing <script> blocks  
  body = body.replace(/<script[\s\S]*?<\/script>/g, '');
  
  // Remove any <head> blocks that might be inside body
  body = body.replace(/<head[\s\S]*?<\/head>/g, '');
  
  // Remove <html> tags if present
  body = body.replace(/<\/?html[^>]*>/g, '');
  
  return body.trim();
}

function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

let fixed = 0, skipped = 0, errors = 0;

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
for (const file of files) {
  if (SKIP.has(file)) { skipped++; continue; }
  
  const filePath = path.join(DIR, file);
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has nav
    if (html.includes('header class="flex') && html.includes('MAKCIKGPT ARTICLE')) {
      skipped++;
      continue;
    }
    
    const title = extractTitle(html);
    const desc = extractDescription(html);
    let body = extractBody(html);
    body = cleanBody(body);
    
    if (!title || body.length < 50) {
      console.log(`  ⚠️  ${file} — no title or empty body, skipping`);
      skipped++;
      continue;
    }
    
    const slug = file.replace('.html', '');
    const canonicalUrl = `https://arif-fazil.com/world/makcikgpt/${slug}`;
    
    const unified = `${HEAD_OPEN}
  <title>${title} — MakcikGPT | ARIF FAZIL</title>
  <meta name="theme-color" content="#0A0B0D" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,700,800&f[]=satoshi@400,500,700;900&display=swap" rel="stylesheet">
  <meta name="description" content="${desc || title}" />
  <link rel="canonical" href="${canonicalUrl}" />${HEAD_CLOSE}
${NAV}
  <a href="/world/makcikgpt/" class="font-mono text-xs text-forge-red hover:text-forge-white transition-colors mb-8 inline-block">← MakcikGPT</a>
  <div class="font-mono text-[0.65rem] text-forge-red uppercase tracking-widest mb-4">MAKCIKGPT × CIVIC INTELLIGENCE · SEALED 999</div>
  <h1 class="font-display text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter mb-6 text-forge-white">${title}</h1>
  ${desc ? `<p class="font-body text-lg md:text-xl text-forge-white/70 mb-8 leading-snug max-w-3xl">${desc}</p>` : ''}
  <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-forge-dim mb-3">
    <span class="px-2 py-0.5 border border-forge-iron text-forge-white/90">By MakcikGPT</span>
    <span class="px-2 py-0.5 border border-forge-red text-forge-red">Sealed 999</span>
  </div>
  <hr class="border-forge-iron mb-12" />
  <article class="font-body text-lg leading-relaxed text-forge-white/85 space-y-5 max-w-3xl">
${body}
  </article>${FOOTER}`;
    
    fs.writeFileSync(filePath, unified);
    fixed++;
    console.log(`  ✅ ${file} — ${title.substring(0,50)} (${(unified.length/1024).toFixed(1)}KB)`);
  } catch (e) {
    errors++;
    console.log(`  ❌ ${file} — ${e.message}`);
  }
}

console.log(`\nDone: fixed=${fixed} skipped=${skipped} errors=${errors}`);
