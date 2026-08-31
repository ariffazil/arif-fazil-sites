// glue.js — GEOX timescale mount + click → draft-claim queue
//
// Mounts @macrostrat/d3-timescale into #geox-ts-mount.
// On interval click, writes a row to IndexedDB via geoxTsQueue.
// Exposes a small inspector showing queue depth + last 5 entries.
//
// The chart's click handler is hijacked because the library's internal `clicked()`
// doesn't expose the payload. We listen for `click` on the chart's <g id="cells">
// and walk back to the d3 datum via the event target's data via __data__.
//
// F2 TRUTH: every queued claim is flagged DEFERRABLE — never SEALED. Sealing
// requires an OPERATOR-authority session (Hermes lane, A-FORGE PR #2).
// F13 SOVEREIGN: this code makes no claim about what the chart displays. It
// merely records what the user clicked. The interpretation remains sovereign.

import { geoTimescale } from "./index.module.js";
import { geoxTsQueue } from "./queue.js";

const PROVENANCE = {
  source_class: "RECEIVED", // per log_abstention.py
  citation: "ICS 2023 + PBDB",
  // F2 disclaimer: ICS provides the chart, PBDB the age calibration.
  // Per-interval uncertainty not provided by upstream; treated as DEFERRABLE.
  uncertainty_note:
    "Uncertainties ≥ ±1 Ma for Phanerozoic ages, larger for Precambrian (per ICS 2023 chart conventions).",
};

function pathFor(d) {
  // Walk d3 ancestors for the cell. d3-hierarchy exposes .ancestors() but the
  // event payload is the rect's bound datum (the cell), whose .data.name we read.
  if (!d) return [];
  const names = [];
  let cur = d;
  while (cur) {
    if (cur.data && cur.data.name) names.unshift(cur.data.name);
    cur = cur.parent;
  }
  return names;
}

function ageRange(d) {
  if (!d || !d.data) return null;
  const { start, end } = d.data;
  if (typeof start !== "number" || typeof end !== "number") return null;
  // ICS convention: start = older Ma, end = younger Ma (or 0 for "today")
  return { start_ma: start, end_ma: end };
}

function shortId() {
  return "ts-" + Math.random().toString(36).slice(2, 8);
}

async function refreshInspector() {
  const counter = document.getElementById("geox-ts-count");
  const list = document.getElementById("geox-ts-list");
  if (!counter || !list) return;
  const n = await geoxTsQueue.count();
  counter.textContent = String(n);
  const rows = await geoxTsQueue.list({ limit: 5 });
  if (rows.length === 0) {
    list.innerHTML =
      '<li class="geox-ts-empty">No draft claims queued yet. Click an interval.</li>';
    return;
  }
  list.innerHTML = rows
    .map(
      (r) => `
      <li class="geox-ts-row">
        <code>${r.id}</code>
        <span class="geox-ts-context">${escapeHtml(r.context)}</span>
        <span class="geox-ts-meta">${r.source_class} · ${formatTs(r.ts)}</span>
      </li>`,
    )
    .join("");
}

function formatTs(iso) {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(11, 19) + "Z";
  } catch {
    return iso;
  }
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

async function attachClickCapture(mountEl) {
  // d3 binds data to DOM nodes via __data__. We delegate clicks on the cells group.
  mountEl.addEventListener("click", async (ev) => {
    const target = ev.target;
    if (!target || !target.__data__) return;
    const d = target.__data__;
    const path = pathFor(d);
    const age = ageRange(d);
    const name = path[path.length - 1] || "(unnamed)";
    const fullPath = path.join(" › ");
    const context = `earth › deeptime › ${fullPath}`;
    const draftClaim = age
      ? `ICS interval "${name}" covers ${age.start_ma}–${age.end_ma} Ma`
      : `ICS interval "${name}" clicked at ${fullPath}`;
    try {
      const id = await geoxTsQueue.enqueue({
        context,
        draft_claim: draftClaim,
        source_class: PROVENANCE.source_class,
        withheld_because:
          "Browser session is OBSERVE_ONLY. Sealing requires OPERATOR authority via Hermes lane.",
      });
      flash(`Queued draft claim #${id}: ${name}`);
      refreshInspector();
    } catch (err) {
      console.error("[geox-ts] queue write failed", err);
      flash("Queue write failed — see console");
    }
  });
}

let flashTimer = null;
function flash(msg) {
  const el = document.getElementById("geox-ts-flash");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

function wireClearButton() {
  const btn = document.getElementById("geox-ts-clear");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    if (!confirm("Clear all queued draft claims? (Reversible — no sovereign write occurs.)"))
      return;
    await geoxTsQueue.clear();
    flash("Queue cleared");
    refreshInspector();
  });
}

export async function mountGeoXTimescale(mountSelector = "#geox-ts-mount") {
  const mount = document.querySelector(mountSelector);
  if (!mount) {
    console.warn("[geox-ts] mount not found:", mountSelector);
    return;
  }
  // Library mounts an <svg> into the selector. Use a child container so we
  // don't blow away provenance/inspector siblings.
  const chartHost = document.createElement("div");
  chartHost.id = "geox-ts-chart";
  chartHost.className = "geox-ts-chart";
  mount.prepend(chartHost);

  // Use viewport-aware sizing
  const width = Math.min(960, Math.max(420, chartHost.clientWidth || 720));
  const height = Math.min(360, Math.max(220, Math.round(width * 0.42)));

  geoTimescale(chartHost, { width, height, fontSize: 11 });

  await attachClickCapture(chartHost);
  wireClearButton();
  refreshInspector();

  // Re-render count if another tab enqueues
  window.addEventListener("storage", () => refreshInspector());
  // IndexedDB also fires a `versionchange` we could listen to, but storage
  // event covers the cross-tab case well enough for this surface.

  // Expose for debugging
  window.__geoxTs = { queue: geoxTsQueue, refresh: refreshInspector };
}
