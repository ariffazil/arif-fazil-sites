#!/usr/bin/env python3
"""
Generate canonical static shells for /words/writing/ essays.
Matches EssayPage.tsx design: forge-black, gold accents, nav header,
prose-invert body, design system tokens.

Usage: python3 scripts/generate-writing-shells.py
"""

import json
import os
import re
import sys

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(SITE_DIR, "dist")
PUBLIC_DIR = os.path.join(SITE_DIR, "public")
ESSAYS_DIR = os.path.join(SITE_DIR, "src", "data", "essays")
OUTPUT_BASE = os.path.join(PUBLIC_DIR, "words", "writing")

# Read the CSS fingerprint
css_files = [f for f in os.listdir(os.path.join(DIST_DIR, "assets")) if f.startswith("index-") and f.endswith(".css")]
CSS_FILE = css_files[0] if css_files else "index.css"

def extract_essay_data(ts_path):
    """Extract title, date, slug, tags from .ts essay module."""
    with open(ts_path, 'r') as f:
        content = f.read()
    
    # Extract fields
    title_match = re.search(r"title:\s*['\"`]([^'\"`]+)['\"`]", content)
    date_match = re.search(r"date:\s*['\"](\d{4}-\d{2}-\d{2})['\"]", content)
    slug_match = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", content)
    tags_match = re.search(r"tags:\s*\[([^\]]+)\]", content)
    html_match = re.search(r"html:\s*`(?:<article>)?([\s\S]+?)(?:</article>)?\s*`(?:,|\s*\n\s*\};)", content)
    
    if not all([title_match, slug_match, html_match]):
        return None
    
    title = title_match.group(1)
    date = date_match.group(1) if date_match else ""
    slug = slug_match.group(1)
    tags = []
    if tags_match:
        tags = [t.strip().strip("'\"") for t in tags_match.group(1).split(",")]
    html = html_match.group(1).strip()
    
    return {"title": title, "date": date, "slug": slug, "tags": tags, "html": html}

def generate_shell(data):
    """Generate canonical static shell matching EssayPage.tsx."""
    date_formatted = ""
    if data["date"]:
        from datetime import datetime
        dt = datetime.strptime(data["date"], "%Y-%m-%d")
        date_formatted = dt.strftime("%B %d, %Y")
    
    tags_html = ""
    if data["tags"]:
        tags_html = "".join(
            f'<span class="px-2 py-0.5 border border-forge-iron text-forge-dim">{t}</span>'
            for t in data["tags"][:6]
        )
    
    return f'''<!doctype html>
<html lang="en" data-ring="SOUL">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{data["title"]} — Arif Fazil | arifOS</title>
  <meta name="theme-color" content="#0A0B0D" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>Ψ</text></svg>" />
  <link rel="stylesheet" href="/_shared/design-system/tokens.css" />
  <link rel="stylesheet" href="/assets/{CSS_FILE}" />
  <link rel="canonical" href="https://arif-fazil.com/words/writing/{data["slug"]}/" />
</head>
<body class="bg-forge-black">
<div className="bg-forge-black min-h-screen">
  <section className="py-16 border-b-2 border-forge-iron bg-forge-steel">
    <div className="site-frame" style="max-width:80rem;margin:0 auto;padding:0 1.5rem">
      <a href="/writing/" class="font-mono text-xs text-forge-dim hover:text-forge-gold transition-colors mb-6 inline-block" style="font-family:'IBM Plex Mono',monospace;font-size:0.75rem;color:#9AA0A8;text-decoration:none;display:inline-block;margin-bottom:1.5rem">
        ← Essays
      </a>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:#C9A227;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.5rem">Narrative · Ψ SOUL</div>
      <h1 style="font-family:'Fraunces',serif;font-size:clamp(2rem,5vw,3rem);font-weight:900;font-style:italic;text-transform:uppercase;line-height:0.9;letter-spacing:-0.03em;margin-bottom:1.5rem;margin-top:0.5rem;color:#EDEAE2">
        {data["title"]}
      </h1>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;font-family:'IBM Plex Mono',monospace;font-size:0.75rem;color:#9AA0A8">
        <time datetime="{data["date"]}">{date_formatted}</time>
        {tags_html}
      </div>
    </div>
  </section>

  <section style="padding:4rem 0">
    <div style="max-width:48rem;margin:0 auto;padding:0 1.5rem">
      <article style="font-family:'Newsreader',Georgia,serif;font-size:1.125rem;line-height:1.8;color:rgba(237,234,226,0.9)">
        {data["html"]}
      </article>

      <hr style="border:none;border-top:1px solid rgba(237,234,226,0.12);margin:3rem 0" />

      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:0.875rem;padding:0.75rem 1.25rem;border:1px solid rgba(201,162,39,0.3);background:rgba(201,162,39,0.05);display:inline-flex;align-items:center;gap:0.5rem">
          <span style="color:#C9A227">⚒️</span>
          <span style="color:#9AA0A8">Published directly on</span>
          <span style="color:#EDEAE2;font-weight:700">arif-fazil.com</span>
        </div>
        <a href="/writing/" style="font-family:'IBM Plex Mono',monospace;font-size:0.875rem;color:#9AA0A8;text-decoration:none">← All Essays</a>
      </div>
    </div>
  </section>
</div>

<footer style="border-top:1px solid rgba(237,234,226,0.12);padding:2rem;text-align:center;margin-top:4rem">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:0.75rem;color:#9AA0A8;letter-spacing:0.1em">ARIF FAZIL · ARIF-FAZIL.COM</div>
  <div style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:#C9A227;margin-top:0.5rem;letter-spacing:0.15em">DITEMPA BUKAN DIBERI 🇲🇾</div>
</footer>
</body>
</html>'''

def main():
    generated = 0
    skipped = 0
    
    for fname in sorted(os.listdir(ESSAYS_DIR)):
        if not fname.endswith('.ts') or fname in ('types.ts', 'index.ts'):
            continue
        if fname.startswith('generated/'):
            continue
        
        ts_path = os.path.join(ESSAYS_DIR, fname)
        data = extract_essay_data(ts_path)
        if not data:
            skipped += 1
            continue
        
        # Generate shell
        shell_html = generate_shell(data)
        
        # Write to public/
        shell_dir = os.path.join(OUTPUT_BASE, data["slug"])
        os.makedirs(shell_dir, exist_ok=True)
        shell_path = os.path.join(shell_dir, "index.html")
        with open(shell_path, 'w') as f:
            f.write(shell_html)
        
        # Also write to dist/
        dist_dir = os.path.join(DIST_DIR, "words", "writing", data["slug"])
        os.makedirs(dist_dir, exist_ok=True)
        dist_path = os.path.join(dist_dir, "index.html")
        with open(dist_path, 'w') as f:
            f.write(shell_html)
        
        generated += 1
        print(f"  ✅ {data['slug']}")
    
    print(f"\nGenerated: {generated} | Skipped: {skipped}")
    print(f"Output: {OUTPUT_BASE}/<slug>/index.html + dist/words/writing/<slug>/index.html")

if __name__ == "__main__":
    main()
