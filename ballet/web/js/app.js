"use strict";

/* Ballet 1830–1930 — offline reference UI. All content comes from data/entries.json. */

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const TYPE_ORDER = ["ballet", "dancer", "impresario-choreographer", "theatre", "composer"];
const state = { q: "", type: "all" };
let DATA = null;

function typeLabel(t) {
  return (DATA.meta.typeLabels && DATA.meta.typeLabels[t]) || t;
}

function byId(id) {
  return DATA.entries.find((e) => e.id === id);
}

function matches(e) {
  if (state.type !== "all" && e.type !== state.type) return false;
  if (!state.q) return true;
  const q = state.q.toLowerCase();
  const hay = [e.title, e.dates, e.history, e.synopsis || "", typeLabel(e.type)]
    .join(" ").toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}

function renderFilters() {
  const counts = { all: DATA.entries.length };
  for (const e of DATA.entries) counts[e.type] = (counts[e.type] || 0) + 1;
  const types = ["all"].concat(TYPE_ORDER);
  $("#filters").innerHTML = types.map((t) => {
    const label = t === "all" ? "All" : typeLabel(t);
    const active = state.type === t ? " active" : "";
    return `<button class="chip${active}" data-type="${esc(t)}">${esc(label)} <span class="n">${counts[t] || 0}</span></button>`;
  }).join("");
  $("#filters").querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => {
      state.type = b.dataset.type;
      render();
    })
  );
}

function renderList() {
  renderFilters();
  const items = DATA.entries.filter(matches).sort((a, b) => a.sortYear - b.sortYear || a.title.localeCompare(b.title));
  $("#view").innerHTML =
    `<p class="result-count">${items.length} of ${DATA.entries.length} entries</p>` +
    items.map((e) => `
      <a class="card" href="#/entry/${esc(e.id)}">
        <span class="badge">${esc(typeLabel(e.type))}</span>
        <h3>${esc(e.title)}</h3>
        <p class="dates">${esc(e.dates)}</p>
      </a>`).join("") +
    (items.length === 0 ? `<p class="result-count">No entries match your search.</p>` : "");
}

function imageBlock(e) {
  if (e.image && e.image.file) {
    const src = "../data/" + e.image.file;
    const credit = e.image.credit ? ` — ${esc(e.image.credit)}` : "";
    const link = e.image.source ? ` · <a href="${esc(e.image.source)}" target="_blank" rel="noopener">source</a>` : "";
    return `
      <figure class="figure">
        <img src="${esc(src)}" alt="${esc(e.title)}" loading="lazy">
        <figcaption>Image: ${esc(e.image.commonsTitle || e.image.file)}${credit} · Licence: <strong>${esc(e.image.licence)}</strong>${link}</figcaption>
      </figure>`;
  }
  return `
      <figure class="figure">
        <div class="placeholder"><strong>Placeholder</strong>No public-domain image could be found for this entry, so none is shown. (No unlicensed or invented image is used.)</div>
      </figure>`;
}

function renderDetail(id) {
  const e = byId(id);
  if (!e) { $("#view").innerHTML = `<div class="detail"><a class="back" href="#/">← All entries</a><p>Entry not found.</p></div>`; return; }
  const rel = e.links.map(byId).filter(Boolean);
  $("#view").innerHTML = `
    <div class="detail">
      <a class="back" href="#/">← All entries</a>
      <span class="badge">${esc(typeLabel(e.type))}</span>
      <h1>${esc(e.title)}</h1>
      <p class="dates">${esc(e.dates)}</p>
      ${imageBlock(e)}
      <h2>History</h2>
      <p>${esc(e.history)}</p>
      ${e.synopsis ? `<h2>Synopsis</h2><p>${esc(e.synopsis)}</p>` : ""}
      ${rel.length ? `<h2>Related</h2><div class="rel-links">${rel.map((r) =>
        `<a href="#/entry/${esc(r.id)}">${esc(r.title)} <span class="t">${esc(typeLabel(r.type))}</span></a>`).join("")}</div>` : ""}
      <h2>Sources</h2>
      <ul class="sources">${e.sources.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    </div>`;
  window.scrollTo(0, 0);
}

function route() {
  const m = location.hash.match(/^#\/entry\/([A-Za-z0-9-]+)$/);
  if (m) renderDetail(m[1]); else renderList();
}

async function init() {
  const r = await fetch("../data/entries.json");
  DATA = await r.json();
  $("#search").addEventListener("input", (ev) => { state.q = ev.target.value.trim(); renderList(); });
  window.addEventListener("hashchange", route);
  route();
}

init();
