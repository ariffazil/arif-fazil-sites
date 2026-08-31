/**
 * makcik-legacy-map.cjs — Legacy numeric-id → canonical URL map for MakcikGPT.
 *
 * History: 2026-06→07 era published shells named by series id (m1-1, s4-2, …)
 * under /world/makcikgpt/. Those shells carried only title + a self-link —
 * crawl-traps (F2: a 200 with no content is a lie). Canonical pieces live at
 * named slugs (/world/makcikgpt/<slug>) and English essays under /words/writing/.
 *
 * Consumers:
 *   - generate-md-mirrors.cjs   → emits 301 stubs instead of empty shells
 *   - Caddy vhost               → exact 301s (see /etc/caddy/vhosts/arif-fazil.com.conf MAKCIKGPT section)
 *   - deploy-makcik.sh          → must never regenerate id-named shells again
 *
 * Map authority: src/data/essays.json dest.path (BM pieces) + live /words/writing/ index (EN).
 * Medium-only essays have no onsite canonical → /words/ (writing index).
 */

const MAKCIK_REDIRECTS = {
  // ── BM MakcikGPT series ids → named canonical slugs ────────────────
  "m1-1": "/world/makcikgpt/iran-hormuz",
  "m1-2": "/world/makcikgpt/petronas-dna",
  "m1-3": "/world/makcikgpt/suriname-exxon-cabut",
  "m1-4": "/world/makcikgpt/petronas-hive-sale",
  "m1-5": "/world/makcikgpt/petronas-atm-kerajaan",
  "m1-6": "/world/makcikgpt/petronas-visi-misi",
  "m2-1": "/world/makcikgpt/siasatan-harakah",
  "m2-2": "/world/makcikgpt/cerita-makcik",
  "m2-3": "/world/makcikgpt/searah-followup",
  "m2-4": "/world/makcikgpt/searah-kekal-milik-penuh",
  "m2-5": "/world/makcikgpt/searah-senyum-media-suap",
  "m2-6": "/world/makcikgpt/anak-sarawak-bayar-pda-anak-bangla-telefon",
  "m2-7": "/world/makcikgpt/searah-bernama-lewat",
  "m2-8": "/world/makcikgpt/suara-terlalu-siap",
  "m2-9": "/world/makcikgpt/syaitan-ingat-dirinya-malaikat",
  "m2-10": "/world/makcikgpt/mykad-rm75-billion",
  "m3-1": "/world/makcikgpt/ilmu-bbb",
  "m3-2": "/world/makcikgpt/ytl-monopoli",
  "m4-1": "/world/makcikgpt/daily-2026-07-01",
  "m4-2": "/world/makcikgpt/ai-johor-rakyat-2026",
  "m5-1": "/world/makcikgpt/sam-altman-elon-musk-anwar-akal",
  "m5-2": "/world/makcikgpt/anwar-jung-shadow",
  "m5-3": "/world/makcikgpt/dap-8-tahun-bangang",
  "m5-4": "/world/makcikgpt/chennah-bangang",
  "m6-1": "/world/makcikgpt/nusantara-ai-paradox",
  "m6-2": "/world/makcikgpt/taufik-klcc-ceo-petronas",

  // ── English essays once mirrored as MakcikGPT s-shells → live writing slugs ──
  "s2-2": "/words/writing/agentic-intelligence-big-bang/",
  "s3-1": "/words/writing/the-tool-is-the-thought/",
  "s3-2": "/words/writing/survival-of-the-fittest-tools/",
  "s3-3": "/words/writing/three-timelines-one-boundary/",
  "s3-4": "/words/writing/agentic-intelligence-big-bang/",
  "s5-2": "/words/writing/the-mind-is-not-the-model-6-axis-constitutional-coordinate-system/",
  "s6-11": "/words/writing/contrast-governed-anomaly-detection-formal-bridge-avo-attention/",
  "s6-12": "/words/writing/physics-constrained-attention-zoeppritz-constitutional-floor/",
  "s6-13": "/words/writing/contrast-primitive-derivation-avo-fluid-factor-attention-residual/",
};

// Medium-only essays: no onsite canonical. Umbrella target = writing index.
const LEGACY_FALLBACK = "/words/";

function isLegacyShellId(id) {
  return /^(m|s)\d+-\d+$/.test(id);
}

function resolveLegacyTarget(id) {
  if (Object.prototype.hasOwnProperty.call(MAKCIK_REDIRECTS, id)) {
    return MAKCIK_REDIRECTS[id];
  }
  return isLegacyShellId(id) ? LEGACY_FALLBACK : null;
}

module.exports = { MAKCIK_REDIRECTS, LEGACY_FALLBACK, isLegacyShellId, resolveLegacyTarget };
