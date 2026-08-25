#!/usr/bin/env node
/**
 * generate-md-mirrors.cjs — Generates agentic markdown mirrors under public/makcikgpt-md/
 *
 * Law 1 & Law 3:
 * Reads typed canon via makcik-source.cjs and emits frontmatter + claim matrix.
 *
 * 2026-08-25 (audit upgrade):
 *   - Emits the FULL article body (converted from the canonical {slug}.html in the
 *     same directory) — previously stubs shipped title+URL only, so the agent lane
 *     was not ingestible (F2: a 200 that carries no content is a lie).
 *   - Sealed pieces render Claim Register + Source Ledger tables from essays.json.
 *   - Legacy numeric-id shells (m1-1, s4-2, …) are emitted as redirect stubs via
 *     lib/makcik-legacy-map.cjs — never again as empty self-linking pages.
 *   - Removes id-named .html/.md files in OUT_DIR that have no mapping (orphans).
 */

const fs = require("fs");
const path = require("path");
const { getMakcikSource, computeCanonicalPayloadHash, SITE_ROOT } = require("./lib/makcik-source.cjs");
const { isLegacyShellId, resolveLegacyTarget } = require("./lib/makcik-legacy-map.cjs");

const OUT_DIR = path.join(SITE_ROOT, "public/makcikgpt-md");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ── HTML → Markdown (template-aware: cover, fact-box, pull-quote, callout) ──

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&#(\d+);/g, (m, d) => String.fromCharCode(parseInt(d, 10)));
}

function htmlToMarkdown(html) {
  let h = html.replace(/<!DOCTYPE[^>]*>/i, "");
  h = h.replace(/<head>[\s\S]*?<\/head>/i, "");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Block templates → markdown carriers
  h = h.replace(/<div class="fact-box">[\s\S]*?<div class="fact-box-title">([\s\S]*?)<\/div>\s*<div class="fact-box-content">([\s\S]*?)<\/div>\s*<\/div>/gi,
    (m, title, content) => `\n\n> **▲ ${title.replace(/<[^>]+>/g, "").trim()}**\n> ${content.replace(/<br\s*\/?>/gi, "\n> ").replace(/<[^>]+>/g, "").trim().replace(/\n+/g, "\n> ")}\n`);
  h = h.replace(/<div class="pull-quote">([\s\S]*?)<\/div>/gi,
    (m, c) => `\n\n> ${c.replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")}\n`);
  h = h.replace(/<div class="callout-title">([\s\S]*?)<\/div>\s*<div class="callout-content">([\s\S]*?)<\/div>/gi,
    (m, title, content) => `\n\n**${title.replace(/<[^>]+>/g, "").trim()}** — ${content.replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")}\n`);
  h = h.replace(/<\/?(div|span|section|article|main|body|html)[^>]*>/gi, "\n");

  h = h
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m, c) => `\n\n# ${c.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, c) => `\n\n## ${c.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m, c) => `\n\n### ${c.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, c) => `\n- ${c.replace(/<[^>]+>/g, "").trim()}`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, c) => `\n\n${c.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, c) => {
      const text = c.replace(/<[^>]+>/g, "").trim();
      return text && href && !href.startsWith("#") ? `[${text}](${href})` : text;
    })
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, (m, c) => `**${c.replace(/<[^>]+>/g, "").trim()}**`)
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, (m, c) => `*${c.replace(/<[^>]+>/g, "").trim()}*`)
    .replace(/<hr\s*\/?>/gi, "\n\n---\n")
    .replace(/<[^>]+>/g, "");

  h = decodeEntities(h);

  const lines = h.split("\n").map(l => l.trim());
  const out = [];
  let prevBlank = true;
  for (const l of lines) {
    const isBlank = l === "";
    if (isBlank && prevBlank) continue;
    out.push(l);
    prevBlank = isBlank;
  }
  return out.join("\n").trim();
}

function convertBody(slug) {
  const htmlPath = path.join(OUT_DIR, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) return null;
  try {
    const md = htmlToMarkdown(fs.readFileSync(htmlPath, "utf8"));
    return md.length >= 400 ? md : null; // refuse near-empty conversions
  } catch {
    return null;
  }
}

// ── Canonical mirrors ─────────────────────────────────────────────

const { pieces } = getMakcikSource();
let bodyFull = 0;
let bodyMissing = [];

for (const p of pieces) {
  const slug = p.dest.path.replace("/world/makcikgpt/", "");
  const outFile = path.join(OUT_DIR, `${slug}.md`);

  const payloadHash = computeCanonicalPayloadHash(p);
  const claimReg = p.claim_register || [];
  const sourceLedger = p.source_ledger || [];

  const obsCount = claimReg.filter(c => c.tag === "OBS").length;
  const intCount = claimReg.filter(c => c.tag === "INT").length;
  const specCount = claimReg.filter(c => c.tag === "SPEC").length;
  const derCount = claimReg.filter(c => c.tag === "DER").length;

  let claimsTable = "";
  if (claimReg.length > 0) {
    claimsTable = `\n## Claim Register\n\n| claim_id | tag | text | source_id | maruah |\n|---|---|---|---|---|\n` +
      claimReg.map(c => `| ${c.claim_id} | ${c.tag} | ${String(c.text).replace(/\|/g, "\\|")} | ${c.source_id || "-"} | ${c.maruah_review || "n/a"} |`).join("\n") + "\n";
  }

  let sourcesTable = "";
  if (sourceLedger.length > 0) {
    sourcesTable = `\n## Source Ledger\n\n| source_id | type | title | url |\n|---|---|---|---|\n` +
      sourceLedger.map(s => `| ${s.source_id} | ${s.type} | ${String(s.title).replace(/\|/g, "\\|")} | ${s.url} |`).join("\n") + "\n";
  }

  const bodyMd = convertBody(slug);
  if (bodyMd) bodyFull++; else bodyMissing.push(slug);

  const out = `---
article_id: ${p.id}
canonical_url: https://arif-fazil.com${p.dest.path}
seal: ${p.seal || "null"}
provenance_status: ${p.provenance_status || "legacy"}
version: ${p.version_lineage ? p.version_lineage.version : "1.0"}
merkle_leaf: ${payloadHash}
epistemic_summary:
  obs_count: ${obsCount}
  der_count: ${derCount}
  int_count: ${intCount}
  spec_count: ${specCount}
---

# ${p.title}

> ${p.excerpt || p.title}
>
> Canonical URL: https://arif-fazil.com${p.dest.path}
>
> Bahasa: BM (Bahasa Makcik) · Suara: makcik pasar, bukan institusi · Semua nombor bawa sumber.
> Baca versi HTML: https://arif-fazil.com${p.dest.path}
${claimsTable}${sourcesTable}
---

${bodyMd ? bodyMd : `*(Badan artikel belum dimuat dalam lane md — fetch HTML kanonikal di atas.)*`}
`;

  fs.writeFileSync(outFile, out);
}

// ── Legacy id shells → redirect stubs (never empty self-links) ─────

const byId = new Map(pieces.map(p => [p.id, p]));
let redirects = 0;
for (const f of fs.readdirSync(OUT_DIR)) {
  const m = f.match(/^(m\d+-\d+|s\d+-\d+)\.(html|md)$/);
  if (!m) continue;
  const id = m[1];
  const target = byId.has(id) ? `https://arif-fazil.com${byId.get(id).dest.path}` : resolveLegacyTarget(id);
  if (!target) continue; // unmapped id — leave for orphan cleanup below
  // 2026-08-25 fix: resolveLegacyTarget may return an ABSOLUTE url — don't
  // double-prefix the domain (was emitting https://arif-fazil.com/https://…)
  const abs = /^https?:\/\//.test(target) ? target : `https://arif-fazil.com${target.startsWith("/") ? target : "/" + target}`;
  const filePath = path.join(OUT_DIR, f);
  if (f.endsWith(".html")) {
    fs.writeFileSync(filePath, `<!DOCTYPE html><html lang="ms">
<head><meta charset="utf-8"><title>Perpindahan — MakcikGPT</title>
<meta http-equiv="refresh" content="0; url=${abs}">
<link rel="canonical" href="${abs}">
<meta name="robots" content="index,follow">
<style>body{background:#0d0d0d;color:#ccc;font-family:sans-serif;max-width:640px;margin:3em auto;padding:0 1em}a{color:#d4a843}</style>
</head><body>
<p>Artikel ni dah pindah rumah.</p>
<p><a href="${abs}">Baca artikel penuh →</a></p>
</body></html>`);
  } else {
    fs.writeFileSync(filePath, `---
article_id: ${id}
canonical_url: ${abs}
provenance_status: redirect
---

# Perpindahan

Artikel ni dah pindah rumah.

> Baca penuh: ${abs}
`);
  }
  redirects++;
}

// ── Orphan cleanup: id-named files with no mapping are dead weight ─

let orphans = 0;
for (const f of fs.readdirSync(OUT_DIR)) {
  const m = f.match(/^(m\d+-\d+|s\d+-\d+)\.(html|md)$/);
  if (!m) continue;
  if (byId.has(m[1]) || resolveLegacyTarget(m[1])) continue;
  fs.unlinkSync(path.join(OUT_DIR, f));
  orphans++;
}

console.log(`✓ Generated ${pieces.length} markdown mirrors — ${bodyFull} with full body${bodyMissing.length ? `, body missing: ${bodyMissing.join(", ")}` : ""}`);
console.log(`✓ Rewrote ${redirects} legacy id shells as redirect stubs; removed ${orphans} unmapped orphans`);
