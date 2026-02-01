# arif-fazil-sites

Static frontend sites for the arif-fazil.com domain ecosystem. Extracted from the [arifOS](https://github.com/ariffazil/arifOS) monorepo.

## Structure

```
arif-fazil-sites/
├── body/     ← arif-fazil.com        (Portfolio & Dashboard)
├── soul/     ← apex.arif-fazil.com   (Constitutional Canon)
├── docs/     ← arifos.arif-fazil.com (arifOS Documentation)
└── shared/   ← Deduplicated image assets
```

## Tech Stack

| Site | Framework | Build Tool | Deploy Target |
|------|-----------|------------|---------------|
| **BODY** | React 19 + TypeScript | Vite 7 | Cloudflare Pages (`arif-fazil`) |
| **SOUL** | React 19 + TypeScript | Vite 7 | Cloudflare Pages (`apex-dpf`) |
| **DOCS** | React 18 + TypeScript | Vite 5 | Cloudflare Pages (`arifos-docs`) |

All sites use TailwindCSS for styling.

## Local Development

```bash
# BODY
cd body && npm install && npm run dev

# SOUL
cd soul && npm install && npm run dev

# DOCS
cd docs && npm install && npm run dev
```

## Deployment

Automated via GitHub Actions on push to `main`. See [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Requires these GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Related

- **MIND** (MCP backend): Deployed separately from [arifOS](https://github.com/ariffazil/arifOS) to Railway at `aaamcp.arif-fazil.com`

---

*DITEMPA BUKAN DIBERI — Forged, Not Given*
