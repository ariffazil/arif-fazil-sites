// queue.js — GEOX timesc ale draft-claim queue
//
// Schema mirrors /root/AAA/scripts/log_abstention.py (P4, F13-greenlit 2026-08-25):
//   {ts, context, draft_claim, source_class, withheld_because}
// Storage: IndexedDB (per-origin, so multiple tabs of /earth share the queue).
// Lifetime: until user clears site data (F1 AMANAH — reversible, no sovereign write).
//
// Public API:
//   geoxTsQueue.enqueue({context, draft_claim, source_class, withheld_because}) → Promise<id>
//   geoxTsQueue.count() → Promise<number>
//   geoxTsQueue.list({limit?}) → Promise<Row[]>
//   geoxTsQueue.clear() → Promise<void>
//
// The browser NEVER seals. Sealing happens when an OPERATOR-authority session
// drains this queue (Hermes lane, A-FORGE PR #2 — not staged here).
//
// DITEMPA BUKAN DIBERI — Forged, not given.

const DB_NAME = "geox_timescale_drafts";
const STORE = "drafts";
const VERSION = 1;

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const os = db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        os.createIndex("ts", "ts", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(db, mode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

export const geoxTsQueue = {
  async enqueue({ context, draft_claim, source_class, withheld_because }) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const store = tx(db, "readwrite");
      const rec = {
        ts: new Date().toISOString(),
        context,
        draft_claim,
        source_class,
        withheld_because,
      };
      const req = store.add(rec);
      req.onsuccess = () => {
        db.close();
        resolve(req.result); // auto-incremented id
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  },

  async count() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const req = tx(db, "readonly").count();
      req.onsuccess = () => {
        db.close();
        resolve(req.result);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  },

  async list({ limit = 20 } = {}) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const idx = tx(db, "readonly").index("ts");
      const out = [];
      const req = idx.openCursor(null, "prev");
      req.onsuccess = () => {
        const cur = req.result;
        if (cur && out.length < limit) {
          out.push(cur.value);
          cur.continue();
        } else {
          db.close();
          resolve(out);
        }
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  },

  async clear() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const req = tx(db, "readwrite").clear();
      req.onsuccess = () => {
        db.close();
        resolve();
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  },
};
