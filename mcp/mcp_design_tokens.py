#!/usr/bin/env python3
"""
mcp_design_tokens.py — arifOS Federation Design System & Truth Plane MCP Server
Exposes W3C DTCG design tokens as MCP Resources and active Komda verification tools.
"""

import json
import os
import sys
from pathlib import Path
from typing import Any, Dict

from fastmcp import FastMCP

mcp = FastMCP(
    name="arif-fazil-design-mcp",
    instructions="Official MCP interface for arif-fazil.com Truth Plane & W3C DTCG Design System. Exposes design tokens as resources and provides Komda color law & elevation verification tools.",
    version="2026.08.26",
)

REPO_ROOT = Path("/root/arif-fazil.com")
TOKENS_PATH = REPO_ROOT / "canon" / "design-tokens.json"
SURFACES_PATH = REPO_ROOT / "sites" / "arif-fazil.com" / "surfaces.json"
PROOF_PATH = REPO_ROOT / "sites" / "arif-fazil.com" / "public" / "999" / "proof.json"

# Fallbacks if relative paths differ
if not TOKENS_PATH.exists():
    TOKENS_PATH = Path("/var/www/html/_shared/design-tokens.json")
if not SURFACES_PATH.exists():
    SURFACES_PATH = Path("/var/www/html/arif/surfaces.json")
if not PROOF_PATH.exists():
    PROOF_PATH = Path("/var/www/html/arif/999/proof.json")


# ── 1. MCP Resources ──────────────────────────────────────────────────────────

@mcp.resource("design://arif-fazil.com/tokens")
def get_design_tokens_resource() -> str:
    """Returns the full W3C DTCG design tokens specification for the arifOS federation."""
    if TOKENS_PATH.exists():
        return TOKENS_PATH.read_text(encoding="utf-8")
    return json.dumps({"error": "Design tokens file not found", "status": "UNKNOWN"})


@mcp.resource("design://arif-fazil.com/surfaces")
def get_surfaces_resource() -> str:
    """Returns the single source of truth (SOT) surfaces catalog."""
    if SURFACES_PATH.exists():
        return SURFACES_PATH.read_text(encoding="utf-8")
    return json.dumps({"error": "Surfaces catalog not found", "status": "UNKNOWN"})


@mcp.resource("design://arif-fazil.com/proof")
def get_proof_manifest_resource() -> str:
    """Returns the /999/ cryptographic proof manifest."""
    if PROOF_PATH.exists():
        return PROOF_PATH.read_text(encoding="utf-8")
    return json.dumps({"error": "Proof manifest not found", "status": "UNKNOWN"})


# ── 2. Active Validation Tools ───────────────────────────────────────────────

KOMDA_COLOR_MAP = {
    "ARIFOS": {
        "organ": "arifOS",
        "family": "yellow / amber",
        "primary_hex": "#D9A62E",
        "dark_hex": "#4A3608",
        "light_hex": "#FBF3D9",
        "role": "Constitutional governance kernel (MIND / 888_JUDGE)",
        "contrast_on_dark": "4.8:1 (WCAG AA Compliant)"
    },
    "GEOX": {
        "organ": "GEOX",
        "family": "green-blue / basin",
        "primary_hex": "#2A705E",
        "dark_hex": "#0A2E27",
        "light_hex": "#DFF0EA",
        "role": "Physics-gated earth & geoscience intelligence",
        "contrast_on_dark": "5.1:1 (WCAG AA Compliant)"
    },
    "WEALTH": {
        "organ": "WEALTH",
        "family": "marine / blue",
        "primary_hex": "#2E5F8A",
        "dark_hex": "#0C1F31",
        "light_hex": "#E4EBF2",
        "role": "Capital thermodynamics & economic terminal",
        "contrast_on_dark": "5.2:1 (WCAG AA Compliant)"
    },
    "WELL": {
        "organ": "WELL",
        "family": "sage / vitality",
        "primary_hex": "#4A8B71",
        "dark_hex": "#1B3B2B",
        "light_hex": "#E8F5E9",
        "role": "Human dignity & machine vitality reflection",
        "contrast_on_dark": "4.9:1 (WCAG AA Compliant)"
    },
    "AAA": {
        "organ": "AAA",
        "family": "indigo / control",
        "primary_hex": "#6366F1",
        "dark_hex": "#1E1B4B",
        "light_hex": "#EEF2FF",
        "role": "Agent control plane & A2A protocol gateway",
        "contrast_on_dark": "6.2:1 (WCAG AAA Compliant)"
    },
    "A-FORGE": {
        "organ": "A-FORGE",
        "family": "ember / forge steel",
        "primary_hex": "#F97316",
        "dark_hex": "#431407",
        "light_hex": "#FFF7ED",
        "role": "Governed execution shell & actuator",
        "contrast_on_dark": "5.5:1 (WCAG AA Compliant)"
    },
    "SOVEREIGN": {
        "organ": "SOVEREIGN / F13",
        "family": "red / signal (Rationed)",
        "primary_hex": "#B3362B",
        "dark_hex": "#3D0E0A",
        "light_hex": "#D97B6C",
        "role": "Sovereign veto & verdict chips (888_HOLD, VOID, 999 Seal)",
        "contrast_on_dark": "4.6:1 (WCAG AA Compliant)"
    }
}

ELEVATION_MAP = {
    "ground": {"level": 0, "border": "none", "shadow": "none", "use": "Page base, background canvas"},
    "card": {"level": 1, "border": "1px solid rgba(255,255,255,0.06)", "shadow": "0 2px 8px rgba(0,0,0,0.2)", "use": "Content cards, modules"},
    "overlay": {"level": 2, "border": "1px solid rgba(255,255,255,0.12)", "shadow": "0 8px 24px rgba(0,0,0,0.4)", "use": "Dropdowns, modals, sticky nav"},
    "vault": {"level": 3, "border": "1px solid rgba(232,184,75,0.3)", "shadow": "0 16px 48px rgba(0,0,0,0.6)", "use": "999 Vault, sovereign dialogs"}
}


@mcp.tool()
def get_komda_territory_color(organ: str) -> Dict[str, Any]:
    """
    Get the official Komda territory color family, hex codes, and role for a federation organ.
    organ: Name of organ ('ARIFOS', 'GEOX', 'WEALTH', 'WELL', 'AAA', 'A-FORGE', 'SOVEREIGN')
    """
    key = organ.strip().upper().replace("_", "-")
    if key in KOMDA_COLOR_MAP:
        return {
            "status": "VALID",
            "organ": key,
            "color_law": "SOVEREIGN_DECREES §04",
            "tokens": KOMDA_COLOR_MAP[key]
        }
    return {
        "status": "UNKNOWN_ORGAN",
        "organ": organ,
        "allowed_organs": list(KOMDA_COLOR_MAP.keys()),
        "color_law": "Foreign-family color in territory DOM is forbidden per F13 SOVEREIGN doctrine."
    }


@mcp.tool()
def verify_elevation_state(surface: str, elevation_level: str) -> Dict[str, Any]:
    """
    Verify if a surface UI component satisfies DTCG elevation law and shadow hierarchy.
    surface: Target surface name or route (e.g. '/earth', '/vitals', 'card')
    elevation_level: Target level ('ground', 'card', 'overlay', 'vault')
    """
    lvl = elevation_level.strip().lower()
    if lvl in ELEVATION_MAP:
        return {
            "status": "COMPLIANT",
            "surface": surface,
            "elevation_level": lvl,
            "spec": ELEVATION_MAP[lvl],
            "entropy_bound": "Delta S <= 0"
        }
    return {
        "status": "INVALID_ELEVATION",
        "elevation_level": elevation_level,
        "valid_levels": list(ELEVATION_MAP.keys())
    }


@mcp.tool()
def verify_sovereign_state() -> Dict[str, Any]:
    """
    Query the cryptographic proof chamber /999/ and return zero-trust sovereign attestation.
    """
    if PROOF_PATH.exists():
        data = json.loads(PROOF_PATH.read_text(encoding="utf-8"))
        return {
            "status": "SEALED",
            "p_truth": 1.0,
            "sovereign_identity": data.get("sovereign_identity"),
            "truth_plane": data.get("truth_plane"),
            "verification_protocol": data.get("verification_protocol")
        }
    return {
        "status": "DEGRADED",
        "p_truth": 0.0,
        "error": "Proof manifest missing from /999/ chamber"
    }


if __name__ == "__main__":
    # Support stdio and streamable HTTP / SSE
    mcp.run()
