#!/usr/bin/env python3
import json, hashlib, sys
from bs4 import BeautifulSoup

def verify():
    webroot_path = '/var/www/html/arif/world/makcikgpt/index.html'
    essays_path = '/root/arif-fazil.com/sites/arif-fazil.com/src/data/essays.json'

    # 1. Parse DOM
    with open(webroot_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    articles = soup.find_all('article')
    dom_count = len(articles)

    dom_titles = [a.find('h2').text.strip() for a in articles if a.find('h2')]
    dom_hash = hashlib.sha256(json.dumps(dom_titles, ensure_ascii=False).encode('utf-8')).hexdigest()

    # 2. Parse Source JSON
    with open(essays_path, 'r', encoding='utf-8') as f:
        essays = json.load(f)

    bm_essays = [
        e for e in essays 
        if e.get('lang') == 'bm' and e.get('dest', {}).get('path', '').startswith('/world/makcikgpt/')
    ]
    sorted_json = sorted(bm_essays, key=lambda x: (x.get('date',''), x.get('id','')), reverse=True)
    json_count = len(sorted_json)

    json_titles = [e['title'] for e in sorted_json]
    json_hash = hashlib.sha256(json.dumps(json_titles, ensure_ascii=False).encode('utf-8')).hexdigest()

    # 3. Structural Evidence Verdict
    count_pass = (dom_count == json_count == 23)
    hash_pass = (dom_hash == json_hash)
    syaitan_pass = ('Syaitan yang Ingat Dirinya Malaikat' in dom_titles and dom_titles[0] == 'Syaitan yang Ingat Dirinya Malaikat')

    report = {
        "status": "PASS" if (count_pass and hash_pass and syaitan_pass) else "FAIL",
        "evidence": {
            "dom_article_count": dom_count,
            "json_article_count": json_count,
            "target_count": 23,
            "dom_titles_sha256": dom_hash,
            "json_titles_sha256": json_hash,
            "target_article_position": 1 if syaitan_pass else -1,
            "target_article_title": dom_titles[0] if dom_titles else None
        }
    }

    print(json.dumps(report, indent=2))
    return 0 if report["status"] == "PASS" else 1

if __name__ == '__main__':
    sys.exit(verify())
