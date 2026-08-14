# Palette Reconciliation Note

> **Status:** RECONCILED 2026-08-15 by FI-003 Qwen Code  
> **Canonical authority:** SITE_DESIGN_LAW.md (ratified F13 2026-08-14, L1/L2 FROZEN)  
> **Supersedes:** SITE_CONSTITUTION.md RULE 3 palette (ratified 2026-08-09)

## The Decision

SITE_DESIGN_LAW.md is the **canonical palette authority**. Its L1 tokens are FROZEN — only L3 content is mutable without sovereign approval.

SITE_CONSTITUTION.md RULE 3 palette (`paper #0A0B0D`, `ember #E4572E`, `gold #C9A227`) is **superseded** for color values. It remains valid for its other rules (RULE 1-2, 4-6).

## Six Color Systems Inventoried

| # | System | Source | Status |
|---|---|---|---|
| 1 | **SITE_CONSTITUTION RULE 3** | `/root/_archive/2026-08-04/sites/SITE_CONSTITUTION.md` | ❌ Superseded by #2 |
| 2 | **SITE_DESIGN_LAW L1 tokens** | `/root/arif-fazil.com/SITE_DESIGN_LAW.md` | ✅ **CANONICAL (FROZEN)** |
| 3 | **site-tokens.css** | `/root/arif-fazil.com/sites/.../site-tokens.css` | ✅ Implements #2 correctly |
| 4 | **Komda Color Law** | `/root/arif-fazil.com/data/family-colors.yaml` | ✅ Territory-specific organ colors |
| 5 | **Tailwind config** | `/root/arif-fazil.com/sites/.../tailwind.config.js` | ⚠️ Contains legacy Arrow-of-Time palette |
| 6 | **Trinity Design Seam tokens.css** | `/var/www/html/_shared/design-system/tokens.css` | ⚠️ Organ colors diverge from Komda (#4) |

## Known Sub-Contradictions (Open)

### Trinity tokens.css vs Komda territory colors

Trinity `tokens.css` defines organ colors that differ from Komda `family-colors.yaml`:

| Organ | Trinity tokens.css | Komda family-colors.yaml |
|---|---|---|
| arifOS | `#E8B84B` (gold) | `#A82733` (crimson) |
| GEOX | `#6BD3B4` (teal) | `#2D5F8B` (deep blue) |
| WEALTH | — | `#FFCC00` (gold) |
| WELL | — | `#5FB84A` (green) |
| AAA | `#7C9CFF` (periwinkle) | `#9A9AA8` (silver) |

**Resolution needed:** Are organ cockpit pages (aaa.arif-fazil.com) "territory-claimed" under Komda? If yes, Trinity tokens.css organ colors should be overridden by Komda on territory pages. If no, the two systems serve different contexts (Trinity = cross-organ UI, Komda = organ-branded pages).

**Pending sovereign decision (T2).** Until resolved, both systems coexist with their respective scopes:
- Trinity: observatory, cross-organ surfaces
- Komda: organ-territory branded pages

## Implementation Rule

All new page development MUST use `site-tokens.css` variables (system #3). Direct hex values from legacy systems (#1, #5) are prohibited in new code.

```css
/* ✓ Correct */
background: var(--bg);
color: var(--fg);
accent: var(--red);

/* ✗ Prohibited */
background: #0A0B0D;  /* legacy SITE_CONSTITUTION */
color: #E4572E;        /* legacy ember */
```

## Audit Trail

- 2026-08-09: SITE_CONSTITUTION.md ratified (RULE 3 palette)
- 2026-08-14: SITE_DESIGN_LAW.md ratified, L1/L2 FROZEN (supersedes RULE 3 colors)
- 2026-08-15: This reconciliation note. SITE_DESIGN_LAW confirmed as canonical.

---
*DITEMPA BUKAN DIBERI*

## Trinity vs Komda Scope Decision (2026-08-15, F13 approved)

**Decision:** Two systems, two scopes — no conflict.

| System | Scope | Where used |
|---|---|---|
| **Trinity tokens.css** | Cross-organ UI — cockpit, observatory, shared surfaces | `aaa.arif-fazil.com`, `arifos.arif-fazil.com`, `mcp.arif-fazil.com` |
| **Komda family-colors.yaml** | Organ-territory branded pages — organ-specific landings | `geox.arif-fazil.com`, `wealth.arif-fazil.com`, `well.arif-fazil.com` |

**Rule:** If a page is branded as a specific organ's territory (logo, identity), Komda colors apply. If a page is a cross-organ utility surface (cockpit, observatory, gateway), Trinity colors apply.

This resolves the arifOS gold (`#E8B84B` Trinity) vs crimson (`#A82733` Komda) divergence: the AAA cockpit uses Trinity gold; if arifOS ever gets a branded territory page, it uses Komda crimson.
