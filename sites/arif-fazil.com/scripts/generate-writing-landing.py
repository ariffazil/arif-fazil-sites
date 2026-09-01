#!/usr/bin/env python3
"""
Generate unified /words/writing/ landing page.
Lists ALL essays from .ts files + essays.json, organized by date.
Canonical design: Satoshi + Cabinet Grotesk + JetBrains Mono, gold accents.
"""
import json, os, re
from datetime import datetime

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ESSAYS_DIR = os.path.join(SITE, "src", "data", "essays")
OUTPUT = os.path.join(SITE, "public", "words", "writing", "index.html")

def extract_meta(ts_path):
    with open(ts_path) as f:
        c = f.read()
    title = re.search(r"title:\s*[`'\"]([^`'\"]+)", c)
    date = re.search(r"date:\s*['\"](\d{4}-\d{2}-\d{2})", c)
    slug = re.search(r"slug:\s*['\"]([^'\"]+)", c)
    tags = re.search(r"tags:\s*\[([^\]]+)\]", c)
    excerpt = re.search(r"excerpt:\s*[`'\"]([^`'\"]{20,200})", c)
    medium = re.search(r"mediumUrl:\s*['\"]([^'\"]+)", c)
    if not (title and slug):
        return None
    tag_list = [t.strip().strip("'\"") for t in tags.group(1).split(",")] if tags else []
    return {
        "title": title.group(1).strip(),
        "date": date.group(1) if date else "",
        "slug": slug.group(1).strip(),
        "tags": tag_list,
        "excerpt": (excerpt.group(1) if excerpt else "")[:120],
        "has_medium": bool(medium and medium.group(1)),
        "has_static": os.path.exists(os.path.join(SITE, "public", "words", "writing", slug.group(1).strip(), "index.html")),
    }

def card(e, featured=False):
    date_fmt = ""
    if e["date"]:
        try:
            dt = datetime.strptime(e["date"], "%Y-%m-%d")
            date_fmt = dt.strftime("%b %d, %Y")
        except: date_fmt = e["date"]
    tags_html = ""
    for t in e["tags"][:4]:
        cls = "seal" if "999" in str(t) else "int" if "arifos" in t.lower() else "site"
        tags_html += f'<span class="w-tag {cls}">{t}</span>'
    link = f'/words/writing/{e["slug"]}/'
    cta = "Read essay →" if not e["has_medium"] else "Read on Medium ↗"
    return f'''      <div class="w-card">
        <div class="w-card-head">
          <h3><a href="{link}">{e["title"]}</a></h3>
          <span class="w-card-date">{date_fmt}</span>
        </div>
        <p class="w-card-excerpt">{e["excerpt"]}</p>
        <div class="w-card-foot">
          {tags_html}
          <a href="{link}" class="w-card-cta">{cta}</a>
        </div>
      </div>'''

def main():
    # Collect all essays from .ts files
    essays = []
    for fname in sorted(os.listdir(ESSAYS_DIR)):
        if not fname.endswith('.ts') or fname in ('types.ts', 'index.ts') or fname.startswith('generated/'):
            continue
        meta = extract_meta(os.path.join(ESSAYS_DIR, fname))
        if meta:
            essays.append(meta)
    
    # Sort by date descending
    essays.sort(key=lambda e: e["date"], reverse=True)
    
    # Split into featured (first 4) and rest
    featured = essays[:4]
    rest = essays[4:]
    
    # Group by month
    months = {}
    for e in rest:
        if e["date"]:
            try:
                dt = datetime.strptime(e["date"], "%Y-%m-%d")
                key = dt.strftime("%B %Y")
            except: key = "Other"
        else:
            key = "Undated"
        months.setdefault(key, []).append(e)
    
    total = len(essays)
    static_count = sum(1 for e in essays if e["has_static"])
    
    # Build HTML
    featured_cards = "\n".join(card(e, featured=True) for e in featured)
    
    sections_html = ""
    for month, month_essays in months.items():
        cards_html = "\n".join(card(e) for e in month_essays)
        sections_html += f'''
  <div class="w-section">
    <div class="w-section-head">
      <h2>{month}</h2>
      <span class="w-section-pill">{len(month_essays)} essays</span>
    </div>
{cards_html}
  </div>
'''
    
    html = f'''<!DOCTYPE html>
<html lang="en" data-ring="SOUL" data-plane="hub" data-lane="words">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Writing — Constitutional Essays · arif-fazil.com</title>
<meta name="description" content="Sovereign reading room — {total} long-form essays by Muhammad Arif bin Fazil on AI governance, institutions, and the path to AGI."/>
<link rel="canonical" href="https://arif-fazil.com/words/writing/"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta name="agent-access" content="allow-read allow-train allow-cite"/>
<meta name="theme-color" content="#0A0B0D"/>
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@400,700,800&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/_shared/design-system/tokens.css"/>
<link rel="stylesheet" href="/_shared/design-system/hub-words.css"/>
<style>
  :root {{
    --gold: #D4A853; --gold-dim: rgba(212,168,83,0.4);
    --font-sans: 'Satoshi', -apple-system, system-ui, sans-serif;
    --font-display: 'Cabinet Grotesk', Georgia, serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  }}
  .site-frame {{ max-width: 64rem; margin: 0 auto; padding: 0 1.5rem; }}
  body {{ margin: 0; background: #0A0B0D; color: #EDEAE2; font-family: var(--font-sans); line-height: 1.55; }}

  /* Nav */
  .site-nav {{ display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 0; border-bottom: 1px solid #1E232A; margin-bottom: 2rem; }}
  .site-nav .brand {{ font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: #EDEAE2; text-decoration: none; letter-spacing: -0.02em; }}
  .site-nav .links {{ display: flex; gap: 1.5rem; font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; }}
  .site-nav .links a {{ color: #6A665E; text-decoration: none; transition: color 0.2s; }}
  .site-nav .links a:hover, .site-nav .links a.active {{ color: var(--gold); }}

  /* Hero */
  .w-hero {{ margin-bottom: 2rem; }}
  .w-hero h1 {{ font-family: var(--font-display); font-size: clamp(1.75rem,5vw,2.75rem); font-weight: 800; color: #EDEAE2; line-height: 1.05; margin: 0 0 0.75rem; letter-spacing: -0.02em; }}
  .w-hero-desc {{ font-size: 0.95rem; color: #A09D96; line-height: 1.55; margin: 0 0 0.75rem; max-width: 40rem; }}
  .w-hero-desc strong {{ color: #EDEAE2; font-weight: 600; }}
  .w-stats {{ font-family: var(--font-mono); font-size: 0.65rem; color: #6A665E; letter-spacing: 0.08em; text-transform: uppercase; }}

  /* Quote */
  .w-quote {{ border-left: 3px solid var(--gold); padding: 0.65rem 1.15rem; margin: 1.5rem 0; font-style: italic; color: #D8D4CC; font-size: 0.9rem; line-height: 1.6; background: rgba(212,168,83,0.03); border-radius: 0 6px 6px 0; max-width: 40rem; }}

  /* Sections */
  .w-section {{ margin: 2.5rem 0 0.5rem; }}
  .w-section-head {{ display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1E232A; }}
  .w-section-head h2 {{ font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: #7A7670; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; }}
  .w-section-pill {{ font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.15em 0.5em; border-radius: 3px; font-weight: 600; background: rgba(212,168,83,0.1); color: var(--gold); }}

  /* Cards */
  .w-card {{ background: #111318; border: 1px solid #1E232A; border-top: 3px solid var(--gold); border-radius: 6px; padding: 1.15rem 1.35rem; margin: 0.65rem 0; transition: border-color 0.2s ease, background 0.2s ease; }}
  .w-card:hover {{ background: #161820; border-color: #2A2E3A; }}
  .w-card-head {{ display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; margin-bottom: 0.35rem; }}
  .w-card h3 {{ margin: 0; font-family: var(--font-display); font-size: 1rem; font-weight: 700; line-height: 1.3; }}
  .w-card h3 a {{ color: #EDEAE2; text-decoration: none; }}
  .w-card h3 a:hover {{ color: var(--gold); }}
  .w-card-date {{ font-family: var(--font-mono); font-size: 0.6rem; color: #6A665E; letter-spacing: 0.06em; white-space: nowrap; flex-shrink: 0; }}
  .w-card-excerpt {{ font-size: 0.82rem; color: #8A8578; line-height: 1.5; margin: 0.35rem 0 0.5rem; }}
  .w-card-foot {{ display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }}
  .w-tag {{ font-family: var(--font-mono); font-size: 0.52rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.12em 0.4em; border-radius: 3px; font-weight: 600; }}
  .w-tag.seal {{ color: var(--gold); background: rgba(212,168,83,0.1); }}
  .w-tag.int {{ color: #6BCF8B; background: rgba(107,207,139,0.1); }}
  .w-tag.site {{ color: #8A8578; background: rgba(138,133,120,0.1); }}
  .w-card-cta {{ font-family: var(--font-mono); font-size: 0.62rem; color: var(--gold); text-decoration: none; letter-spacing: 0.05em; border-bottom: 1px dotted var(--gold-dim); transition: border-color 0.15s; margin-left: auto; }}
  .w-card-cta:hover {{ border-bottom-color: var(--gold); }}

  /* Featured grid */
  .featured-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }}
  .featured-grid .w-card {{ padding: 1.35rem 1.5rem; }}
  .featured-grid .w-card h3 {{ font-size: 1.05rem; }}

  /* Footer */
  .site-footer {{ margin-top: 4rem; padding: 2rem 0; border-top: 1px solid #1E232A; text-align: center; }}
  .site-footer .identity {{ font-family: var(--font-mono); font-size: 0.7rem; color: #6A665E; letter-spacing: 0.1em; }}
  .site-footer .tagline {{ font-family: var(--font-mono); font-size: 0.6rem; color: var(--gold); margin-top: 0.5rem; letter-spacing: 0.15em; }}

  @media (max-width: 640px) {{
    .featured-grid {{ grid-template-columns: 1fr; }}
    .w-card {{ padding: 0.95rem 1.05rem; }}
  }}
</style>
</head>
<body>
<div class="site-frame">

  <nav class="site-nav">
    <a href="/" class="brand">ARIF FAZIL</a>
    <div class="links">
      <a href="/">Home</a>
      <a href="/earth/">Earth</a>
      <a href="/words/" class="active">Words</a>
      <a href="/world/">World</a>
      <a href="/work/">Work</a>
    </div>
  </nav>

  <div class="w-hero">
    <h1>Writing</h1>
    <p class="w-hero-desc">Sovereign reading room — long-form essays by <strong>Muhammad Arif bin Fazil</strong> on AI governance, institutions, and the path to AGI.</p>
    <p class="w-stats">{total} essays · {static_count} with full content · DITEMPA BUKAN DIBERI</p>
  </div>

  <blockquote class="w-quote">
    "Humans, institutions, and AI do not become evil because they are malicious. They become evil when they get better at protecting narratives than correcting themselves with reality."
    <cite>— Arif Fazil</cite>
  </blockquote>

  <!-- FEATURED -->
  <div class="w-section">
    <div class="w-section-head">
      <h2>Featured</h2>
      <span class="w-section-pill">start here</span>
    </div>
    <div class="featured-grid">
{featured_cards}
    </div>
  </div>

{sections_html}

</div>

<footer class="site-footer" style="max-width:64rem;margin:4rem auto 0;padding:2rem 1.5rem;border-top:1px solid #1E232A;text-align:center">
  <div class="identity">ARIF FAZIL · ARIF-FAZIL.COM · {total} ESSAYS</div>
  <div class="tagline">DITEMPA BUKAN DIBERI 🇲🇾</div>
</footer>

</body>
</html>'''
    
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w') as f:
        f.write(html)
    print(f"Wrote {OUTPUT} ({len(html)} bytes)")
    print(f"Featured: {len(featured)} | Sections: {len(months)} | Total: {total}")

if __name__ == "__main__":
    main()
