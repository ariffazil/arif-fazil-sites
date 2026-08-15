// post-build: copy static HTML pages into dist subdirectories
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const publicRoot = path.join(root, "public");

const SKIP_DIRS = new Set([
  "assets",          // Vite-managed bundler output (already in dist/assets/)
  "node_modules",
  ".git",
]);

// SPA canonical routes that MUST use the React SPA bundle (dist/index.html)
const SPA_ROUTES = [
  "home",
  "words",
  "world",
  "work",
  "AAA",
  "aaa",
  "000",
  "999",
  "world/makcikgpt",
  "missions",
  "economics",
];

const SKIP_FILES = new Set([
  "feed.xml",
  "llms.json",
  "llms.txt",
  "llms-full.txt",
  "sitemap.xml",
  "rsl.xml",
  "robots.txt",
  "page.json",
  "missions.json",
  "soul.json",
]);

function shouldSkip(relativePath, isDir) {
  const parts = relativePath.split(path.sep);
  if (isDir && parts.some(p => SKIP_DIRS.has(p))) return true;
  if (!isDir && relativePath === "index.html") return true;
  if (!isDir && SKIP_FILES.has(parts[parts.length - 1])) return true;
  return false;
}

function mirrorDir(srcDir, destDir, baseRel = "") {
  let entries;
  try { entries = fs.readdirSync(srcDir, { withFileTypes: true }); }
  catch { return; }
  for (const e of entries) {
    const rel = baseRel ? path.join(baseRel, e.name) : e.name;
    if (shouldSkip(rel, e.isDirectory())) continue;
    const sp = path.join(srcDir, e.name);
    const dp = path.join(destDir, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(dp, { recursive: true });
      mirrorDir(sp, dp, rel);
    } else if (e.isFile()) {
      fs.mkdirSync(path.dirname(dp), { recursive: true });
      fs.copyFileSync(sp, dp);
    }
  }
}

// 1. Mirror public/ → dist/
if (fs.existsSync(publicRoot)) {
  console.log("postbuild: mirroring public/ → dist/...");
  mirrorDir(publicRoot, distRoot);
}

// 2. Ensure all canonical SPA routes use the compiled React SPA entry (dist/index.html)
const spaEntryPath = path.join(distRoot, "index.html");
if (fs.existsSync(spaEntryPath)) {
  const spaHtml = fs.readFileSync(spaEntryPath, "utf8");
  for (const route of SPA_ROUTES) {
    const routeDir = path.join(distRoot, route);
    fs.mkdirSync(routeDir, { recursive: true });
    const targetFile = path.join(routeDir, "index.html");
    fs.writeFileSync(targetFile, spaHtml, "utf8");
    console.log(`postbuild: injected SPA shell for /${route} -> ${path.relative(root, targetFile)}`);
  }
}

console.log(`postbuild: static html sync complete.`);
