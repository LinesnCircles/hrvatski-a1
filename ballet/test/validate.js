#!/usr/bin/env node
"use strict";
/* Validation for the Ballet 1830-1930 offline app.
 * Run: node ballet/test/validate.js   (from the repo root)
 * Checks the data file structure/cross-links/images, and smoke-tests the web UI
 * (list render, search, type filter, detail view with cross-links and placeholder)
 * through a minimal DOM shim. No dependencies.
 */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "entries.json");

let failures = 0;
function ok(cond, label) {
  if (cond) { console.log("  PASS", label); }
  else { failures++; console.error("  FAIL", label); }
}

/* ---------- 1. data file ---------- */
console.log("data/entries.json");
const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const entries = data.entries;
ok(Array.isArray(entries) && entries.length === 48, "48 entries total");

const counts = {};
for (const e of entries) counts[e.type] = (counts[e.type] || 0) + 1;
ok(counts.ballet === 20, "20 ballets");
ok(counts.dancer === 10, "10 dancers");
ok(counts["impresario-choreographer"] === 6, "6 impresarios & choreographers");
ok(counts.theatre === 6, "6 theatres");
ok(counts.composer === 6, "6 composers");
ok(JSON.stringify(counts) === JSON.stringify(data.meta.counts) ||
   Object.keys(data.meta.counts).every((k) => data.meta.counts[k] === counts[k]), "meta counts match actual");

const ids = new Set(entries.map((e) => e.id));
ok(ids.size === 48, "ids unique");

let linksOk = true, selfLinks = 0, linksTotal = 0;
for (const e of entries) {
  if (!e.title || !e.dates || !Number.isInteger(e.sortYear) || !e.history || !Array.isArray(e.sources) || e.sources.length === 0) linksOk = false;
  for (const l of e.links || []) { linksTotal++; if (!ids.has(l)) linksOk = false; if (l === e.id) selfLinks++; }
  if (e.type === "ballet" && !e.synopsis) linksOk = false;
}
ok(linksOk, "every entry has title/dates/sortYear/history/sources; ballets have synopsis");
ok(selfLinks === 0, "no self-links");
ok(linksTotal > 100, `cross-links resolve (${linksTotal} links)`);

let imgOk = true, pd = 0, ph = 0;
for (const e of entries) {
  if (!e.image) { ph++; continue; }
  const f = path.join(ROOT, "data", e.image.file);
  if (!fs.existsSync(f)) { imgOk = false; continue; }
  if (!e.image.source || !e.image.licence) imgOk = false;
  const lic = e.image.licence.toLowerCase();
  if (!(lic.includes("public domain") || lic.includes("cc0"))) imgOk = false;
  else pd++;
}
ok(imgOk, "all image entries: file exists + source + licence (PD/CC0 only)");
console.log(`  info: ${pd} public-domain images, ${ph} labelled placeholders`);

/* ---------- 2. web assets ---------- */
console.log("web UI");
const web = path.join(ROOT, "web");
for (const f of ["index.html", "css/style.css", "js/app.js"]) {
  ok(fs.existsSync(path.join(web, f)), `web/${f} exists`);
}
try {
  cp.execSync(`node --check ${JSON.stringify(path.join(web, "js", "app.js"))}`, { stdio: "pipe" });
  ok(true, "js/app.js parses (node --check)");
} catch (e) { ok(false, "js/app.js parses (node --check)"); }

/* ---------- 3. UI smoke test with a minimal DOM shim ---------- */
console.log("UI smoke test (DOM shim)");
function makeEl() {
  const el = {
    innerHTML: "", value: "", dataset: {},
    _h: {},
    addEventListener(ev, fn) { this._h[ev] = fn; },
    querySelectorAll() { return []; },
  };
  return el;
}
const els = {};
const handlers = {};
global.document = { querySelector: (s) => (els[s] = els[s] || makeEl()) };
global.window = { addEventListener: (ev, fn) => { handlers[ev] = fn; }, scrollTo: () => {} };
global.location = { hash: "" };
global.fetch = async (url) => ({
  json: async () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8")),
});

require(path.join(web, "js", "app.js"));

(async () => {
  await new Promise((r) => setTimeout(r, 50));

  const view = els["#view"].innerHTML;
  ok((view.match(/class="card"/g) || []).length === 48, "list renders all 48 entries");
  ok((els["#filters"].innerHTML.match(/class="chip/g) || []).length === 6, "filter chips: All + 5 types");

  els["#search"].value = "taglioni";
  els["#search"]._h.input({ target: els["#search"] });
  ok((els["#view"].innerHTML.match(/class="card"/g) || []).length >= 2, "search 'taglioni' narrows the list");
  els["#search"].value = "";
  els["#search"]._h.input({ target: els["#search"] });

  global.location.hash = "#/entry/b-giselle";
  handlers.hashchange();
  const det = els["#view"].innerHTML;
  ok(det.includes("Giselle") && det.includes("Synopsis") && det.includes("Related") && det.includes("Sources"),
     "detail view: title, synopsis, related links, sources");
  ok(det.includes("assets") === false && det.includes("../data/images/b-giselle"), "detail shows the entry image with path");
  ok(det.includes("Licence:") && det.includes("Public domain"), "image licence shown");

  global.location.hash = "#/entry/b-le-carnaval";
  handlers.hashchange();
  ok(els["#view"].innerHTML.includes("Placeholder") && els["#view"].innerHTML.includes("No public-domain image"),
     "entry without a free image shows the labelled placeholder");

  global.location.hash = "#/entry/d-marie-taglioni";
  handlers.hashchange();
  ok(els["#view"].innerHTML.includes("#/entry/b-la-sylphide"), "cross-links from dancer to ballet work");

  if (failures) { console.error(`\n${failures} FAILURES`); process.exit(1); }
  console.log("\nALL TESTS PASSED ✅");
})();
