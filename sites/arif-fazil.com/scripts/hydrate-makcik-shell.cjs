#!/usr/bin/env node
/**
 * hydrate-makcik-shell.cjs — some makcikgpt static pages are shells
 * ("Redirect to interactive version") while their full BM content lives in
 * src/data/makcikgpt/<slug>.ts. This hydrates the shell: injects the .ts
 * html into the existing <article> of the static page, keeping the page's
 * own head/nav/footer skeleton. Idempotent (skips pages already hydrated).
 *
 * Usage: node scripts/hydrate-makcik-shell.cjs <slug> [<slug>...]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function tsHtml(slug) {
  const p = path.join(ROOT, 'src/data/makcikgpt', slug + '.ts');
  if (!fs.existsSync(p)) return null;
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/html:\s*`([\s\S]*?)`,?\s*\n\};/);
  return m ? m[1] : null;
}

for (const slug of process.argv.slice(2)) {
  const page = path.join(ROOT, 'public/makcikgpt-md', slug + '.html');
  if (!fs.existsSync(page)) { console.log(slug, ': page missing'); continue; }
  const html = fs.readFileSync(page, 'utf8');
  const isShell = /interactive version|Open interactive article/i.test(html);
  const body = (html.match(/<body[\s\S]*<\/body>/) || [''])[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!isShell && body.length > 400) { console.log(slug, ': already full (' + body.length + ' chars), skip'); continue; }
  if (!isShell) { console.log(slug, ': not a shell and not full — inspect manually'); continue; }
  const content = tsHtml(slug);
  if (!content) { console.log(slug, ': no .ts content found'); continue; }
  const out = html.replace(/<article[^>]*>[\s\S]*?<\/article>/, '<article>\n' + content + '\n</article>');
  if (out === html) { console.log(slug, ': no <article> tag to hydrate'); continue; }
  fs.writeFileSync(page, out, 'utf8');
  console.log(slug, ': hydrated (' + content.length + ' chars injected)');
}
