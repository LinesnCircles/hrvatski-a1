/* Hrvatski A1 — app engine: router, views, exercises, quiz, trainer, exam. */
"use strict";

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("croA1:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("croA1:" + k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- speech (Croatian pronunciation) ---------- */
const speech = {
  supported: "speechSynthesis" in window,
  speak(text) {
    if (!this.supported) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "hr-HR";
      u.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const hr = voices.find(v => /^hr/i.test(v.lang));
      if (hr) u.voice = hr;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
};
if (speech.supported && window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

/* ---------- helpers ---------- */
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/đ/g, "d").replace(/dž/g, "dz").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

function speakBtn(text, cls) {
  if (!speech.supported) return "";
  return `<button class="speak-btn ${cls || ""}" data-speak="${esc(text)}" title="Poslušaj izgovor (hrvatski)" aria-label="Play pronunciation">🔊</button>`;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ---------- progress ---------- */
function getProgress() { return store.get("progress", {}); }
function saveProgress(p) { store.set("progress", p); }
function unitDone(id) {
  const p = getProgress();
  if (!p.units) p.units = {};
  p.units[id] = { done: true, ts: Date.now() };
  saveProgress(p);
  renderNav();
}
function isUnitDone(id) { const p = getProgress(); return !!(p.units && p.units[id] && p.units[id].done); }
function examResult() { return store.get("examResult", null); }

/* ---------- router ---------- */
const routes = {};
function route(path, fn) { routes[path] = fn; }

function navigate() {
  const hash = location.hash.replace(/^#\/?/, "") || "home";
  const parts = hash.split("/");
  const root = parts[0];
  const view = $("#view");
  view.innerHTML = "";
  if (routes[root]) routes[root](parts.slice(1), view);
  else view.innerHTML = `<div class="card"><h2>Stranica nije pronađena</h2><p><a href="#/home">← Početna</a></p></div>`;
  window.scrollTo(0, 0);
  renderNav();
}
window.addEventListener("hashchange", navigate);

/* ---------- nav ---------- */
function renderNav() {
  const links = [
    ["home", "🏠 Početna"], ["units", "📚 Jedinice"], ["trainer", "🃏 Vježbe riječi"],
    ["phrases", "💬 Fraze"], ["grammar", "📖 Gramatika"], ["exam", "📝 Probni ispit A1"]
  ];
  const active = (location.hash.replace(/^#\/?/, "") || "home").split("/")[0];
  $("#nav").innerHTML = links.map(([k, label]) =>
    `<a href="#/${k}" class="${active === k ? "active" : ""}">${label}</a>`).join("");
  const p = getProgress();
  const done = p.units ? Object.keys(p.units).filter(k => p.units[k].done).length : 0;
  const ex = examResult();
  $("#nav-status").innerHTML =
    `<span class="badge">Jedinice: ${done}/${UNITS.length}</span>` +
    (ex ? `<span class="badge ${ex.passed ? "pass" : "fail"}">Ispit: ${ex.score}% ${ex.passed ? "— položen ✅" : "— nije položen"}</span>` : "");
}

/* ---------- HOME ---------- */
route("home", (args, view) => {
  const p = getProgress();
  const done = p.units ? Object.keys(p.units).filter(k => p.units[k].done).length : 0;
  const ex = examResult();
  const next = UNITS.find(u => !isUnitDone(u.id));
  view.innerHTML = `
    <div class="card hero">
      <h1>Hrvatski A1</h1>
      <p class="lead">Interaktivni tečaj hrvatskog jezika za početnike. Kroz 10 jedinica — od pozdrava do putovanja — doći ćete do razine na kojoj možete polagati ispit <strong>A1</strong> (CEFR). Sve je besplatno, radi offline i čuva vaš napredak u pregledniku.</p>
      <div class="hero-actions">
        ${next ? `<a class="btn primary" href="#/unit/${next.id}">Nastavi: ${esc(next.title)} →</a>` : `<a class="btn primary" href="#/exam">Idi na probni ispit A1 →</a>`}
        <a class="btn" href="#/units">Sve jedinice</a>
        <a class="btn" href="#/exam">Probni ispit</a>
      </div>
      <div class="stats">
        <div><strong>${done}/${UNITS.length}</strong><span>jedinica završeno</span></div>
        <div><strong>${ALL_VOCAB.length}</strong><span>riječi u vokabularu</span></div>
        <div><strong>${ex ? ex.score + "%" : "—"}</strong><span>${ex ? (ex.passed ? "ispit položen ✅" : "posljednji ispit") : "probni ispit"}</span></div>
      </div>
    </div>
    <div class="card">
      <h2>Kako učiti s ovom aplikacijom</h2>
      <ol class="howto">
        <li><strong>Jedinice (📚)</strong> — svaka jedinica ima vokabular, gramatiku, dijalog i vježbe. Završite kviz na kraju da biste otvorili iduću.</li>
        <li><strong>Vježbe riječi (🃏)</strong> — ponavljanje vokabulara s razmaknutim ponavljanjem (spaced repetition).</li>
        <li><strong>Fraze (💬)</strong> — 37 najvažnijih fraza za preživljavanje, s izgovorom na klik 🔊.</li>
        <li><strong>Gramatika (📖)</strong> — tablice glagola, brojeva, prisvojnih zamjenica i padeža.</li>
        <li><strong>Probni ispit A1 (📝)</strong> — 4 dijela kao na stvarnom ispitu; za prolaz treba 60%.</li>
      </ol>
    </div>
    <div class="card">
      <h2>Što znači A1?</h2>
      <p>Prema <em>Zajedničkom europskom referentnom okviru</em> (CEFR), na razini <strong>A1</strong> možete: razumjeti i koristiti poznate svakodnevne izraze, predstaviti sebe i druge, postavljati i odgovarati na jednostavna pitanja o osobnim detaljima, sporazumijevati se jednostavnim jezikom ako sugovornik govori polako i jasno.</p>
    </div>`;
});

/* ---------- UNITS LIST ---------- */
route("units", (args, view) => {
  view.innerHTML = `
    <div class="card"><h2>📚 Jedinice — Hrvatski A1</h2>
    <p>Svaka jedinica završava kvizom. Završena jedinica označena je ✅.</p></div>
    <div class="unit-grid">
      ${UNITS.map(u => `
        <a class="unit-card ${isUnitDone(u.id) ? "done" : ""}" href="#/unit/${u.id}">
          <span class="unit-num">${u.id}</span>
          <span class="unit-title">${esc(u.title)}</span>
          <span class="unit-meta">${u.vocab.length} riječi · ${u.exercises.length} vježbi · kviz ${u.quiz.length} pitanja ${isUnitDone(u.id) ? "· ✅" : ""}</span>
        </a>`).join("")}
    </div>`;
});

/* ---------- UNIT DETAIL ---------- */
route("unit", (args, view) => {
  const id = parseInt(args[0], 10);
  const u = UNITS.find(x => x.id === id);
  if (!u) { view.innerHTML = `<div class="card"><p>Jedinica ne postoji.</p><a href="#/units">← Sve jedinice</a></div>`; return; }
  const done = isUnitDone(u.id);
  view.innerHTML = `
    <div class="card">
      <p class="crumbs"><a href="#/units">Jedinice</a> / Jedinica ${u.id}</p>
      <h2>Jedinica ${u.id}: ${esc(u.title)} ${done ? '<span class="badge pass">✅ završeno</span>' : ""}</h2>
      <p>${esc(u.intro)}</p>
      <div class="unit-nav">
        ${u.id > 1 ? `<a class="btn" href="#/unit/${u.id - 1}">← ${u.id - 1}. ${esc(UNITS[u.id - 2].title)}</a>` : ""}
        <a class="btn primary" href="#/unit/${u.id}/exercises">Vježbe (${u.exercises.length}) →</a>
        <a class="btn primary" href="#/unit/${u.id}/quiz">Kviz →</a>
        ${u.id < UNITS.length ? `<a class="btn" href="#/unit/${u.id + 1}">${u.id + 1}. ${esc(UNITS[u.id].title)} →</a>` : `<a class="btn primary" href="#/exam">Probni ispit A1 →</a>`}
      </div>
    </div>

    <div class="card">
      <h3>📖 Gramatika</h3>
      <p>${esc(u.grammar)}</p>
      <ul class="examples">${u.grammarExamples.map(e => `<li>${esc(e)} ${speakBtn(e.split(" — ")[0])}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>🗣️ Dijalog — ${esc(u.dialogue.title)}</h3>
      <div class="dialogue">
        ${u.dialogue.lines.map(([who, line]) => `
          <div class="dline ${who === "Ana" ? "left" : "right"}">
            <span class="dwho">${esc(who)}</span>
            <span class="dtext">${esc(line)} ${speakBtn(line)}</span>
          </div>`).join("")}
      </div>
      <p><button class="btn" id="play-dialogue">▶ Poslušaj cijeli dijalog</button></p>
    </div>

    <div class="card">
      <h3>📝 Vokabular (${u.vocab.length} riječi) <button class="btn small" id="speak-all">🔊 Sve</button></h3>
      <table class="vocab-table">
        <thead><tr><th>Hrvatski</th><th>Engleski</th><th></th></tr></thead>
        <tbody>
          ${u.vocab.map(([hr, en]) => `<tr><td class="hr">${esc(hr)}</td><td>${esc(en)}</td><td>${speakBtn(hr)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div class="card center">
      <a class="btn primary big" href="#/unit/${u.id}/exercises">Kreni na vježbe →</a>
      <a class="btn big" href="#/unit/${u.id}/quiz">Kreni na kviz →</a>
    </div>`;

  const playBtn = view.querySelector("#play-dialogue");
  if (playBtn) playBtn.addEventListener("click", () => {
    if (!speech.supported) return;
    const lines = u.dialogue.lines.map(l => l[1]);
    let i = 0;
    const next = () => { if (i < lines.length) { const ok = speech.speak(lines[i++]); setTimeout(next, ok ? 1600 : 50); } };
    next();
  });
  const allBtn = view.querySelector("#speak-all");
  if (allBtn) allBtn.addEventListener("click", () => {
    u.vocab.forEach(([hr], i) => setTimeout(() => speech.speak(hr), i * 900));
  });
});

/* ---------- EXERCISE RUNNER (unit exercises + quiz share engine) ---------- */
function renderQuestion(container, ex, idx, total, onAnswered) {
  container.innerHTML = `<div class="qcard" data-idx="${idx}">
    <p class="qmeta">Pitanje ${idx + 1} od ${total}</p>
    <p class="qq">${esc(ex.q)}</p>
    <div class="qbody"></div>
    <div class="qfeedback"></div>
  </div>`;
  const body = container.querySelector(".qbody");
  const fb = container.querySelector(".qfeedback");
  let answered = false;

  const check = (ok, correctText) => {
    if (answered) return; answered = true;
    fb.innerHTML = ok
      ? `<div class="fb ok">✅ Točno!</div>`
      : `<div class="fb no">❌ Netočno. Točan odgovor: <strong>${esc(correctText)}</strong></div>`;
    onAnswered(ok);
  };

  if (ex.type === "mcq") {
    body.innerHTML = `<div class="opts">${ex.options.map((o, i) =>
      `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}</div>`;
    body.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.i, 10);
      check(i === ex.answer, ex.options[ex.answer]);
    }));
  } else if (ex.type === "fill" || ex.type === "translate") {
    body.innerHTML = `
      <input type="text" class="answer-input" placeholder="Upiši odgovor…" autocomplete="off">
      ${ex.hint ? `<p class="hint">💡 ${esc(ex.hint)}</p>` : ""}
      <button class="btn primary">Provjeri</button>`;
    const input = body.querySelector("input");
    const btn = body.querySelector("button");
    const submit = () => {
      const answers = ex.type === "fill" ? [ex.answer] : ex.answers;
      const ok = answers.some(a => norm(a) === norm(input.value));
      check(ok, answers[0]);
    };
    btn.addEventListener("click", submit);
    input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
    input.focus();
  } else if (ex.type === "match") {
    const left = shuffle(ex.pairs.map(p => p[0]));
    const right = shuffle(ex.pairs.map(p => p[1]));
    let selectedLeft = null, matched = new Set(), done = 0;
    body.innerHTML = `<div class="match-grid">
      <div class="match-col">${left.map(l => `<button class="match-item" data-l="${esc(l)}">${esc(l)} ${speakBtn(l, "mini")}</button>`).join("")}</div>
      <div class="match-col">${right.map(r => `<button class="match-item" data-r="${esc(r)}">${esc(r)}</button>`).join("")}</div>
    </div>`;
    body.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
      if (answered || matched.has(b.dataset.l)) return;
      body.querySelectorAll("[data-l]").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel"); selectedLeft = b.dataset.l;
    }));
    body.querySelectorAll("[data-r]").forEach(b => b.addEventListener("click", () => {
      if (answered || !selectedLeft || matched.has(b.dataset.r)) return;
      const pair = ex.pairs.find(p => p[0] === selectedLeft && p[1] === b.dataset.r);
      if (pair) {
        matched.add(selectedLeft); matched.add(b.dataset.r); done++;
        body.querySelectorAll(`[data-l="${CSS.escape(selectedLeft)}"]`).forEach(x => x.classList.add("good"));
        b.classList.add("good");
        if (done === ex.pairs.length) check(true, "sve parove");
      } else {
        b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 400);
      }
      selectedLeft = null;
      body.querySelectorAll("[data-l]").forEach(x => x.classList.remove("sel"));
    }));
  }
}

function runExerciseSet(view, { title, back, items, onFinish }) {
  let idx = 0, correct = 0;
  const wrap = document.createElement("div");
  view.appendChild(wrap);
  const render = () => {
    wrap.innerHTML = `
      <div class="card">
        <p class="crumbs"><a href="${back.href}">${esc(back.label)}</a></p>
        <h2>${esc(title)}</h2>
        <div class="progressbar"><div style="width:${(idx / items.length) * 100}%"></div></div>
        <div id="qwrap"></div>
        <p class="center"><button class="btn" id="nextq" style="display:none">Sljedeće →</button></p>
      </div>`;
    renderQuestion(wrap.querySelector("#qwrap"), items[idx], idx, items.length, ok => {
      if (ok) correct++;
      wrap.querySelector(".progressbar div").style.width = ((idx + 1) / items.length) * 100 + "%";
      const nb = wrap.querySelector("#nextq");
      nb.style.display = "inline-block";
      nb.onclick = () => {
        idx++;
        if (idx >= items.length) {
          onFinish(correct, items.length);
        } else render();
      };
    });
  };
  render();
}

/* extend "unit" with subroutes by wrapping the detail route */
const _unitRoute = routes["unit"];
routes["unit"] = (args, view) => {
  if (args[1] === "exercises" || args[1] === "quiz") {
    const id = parseInt(args[0], 10);
    const u = UNITS.find(x => x.id === id);
    if (!u) { view.innerHTML = `<div class="card"><p>Jedinica ne postoji.</p></div>`; return; }
    if (args[1] === "exercises") {
      runExerciseSet(view, {
        title: `Vježbe — Jedinica ${u.id}: ${u.title}`,
        back: { href: `#/unit/${u.id}`, label: `Jedinica ${u.id}` },
        items: shuffle(u.exercises),
        onFinish: (c, t) => {
          view.innerHTML = `
            <div class="card center result">
              <h2>Rezultat vježbi</h2>
              <p class="big-score">${c} / ${t} (${Math.round(c / t * 100)}%)</p>
              <p>${c === t ? "Savršeno! ✅" : c / t >= 0.7 ? "Vrlo dobro! Nastavi na kviz." : "Preporučujemo ponoviti jedinicu prije kviza."}</p>
              <a class="btn primary" href="#/unit/${u.id}/quiz">Idi na kviz →</a>
              <a class="btn" href="#/unit/${u.id}">← Povratak na jedinicu</a>
            </div>`;
        }
      });
    } else {
      runExerciseSet(view, {
        title: `Kviz — Jedinica ${u.id}: ${u.title}`,
        back: { href: `#/unit/${u.id}`, label: `Jedinica ${u.id}` },
        items: shuffle(u.quiz.map(q => ({ type: "mcq", q: q.q, options: q.options, answer: q.answer }))),
        onFinish: (c, t) => {
          const pct = Math.round(c / t * 100);
          const passed = pct >= 60;
          if (passed) unitDone(u.id);
          view.innerHTML = `
            <div class="card center result">
              <h2>Rezultat kviza</h2>
              <p class="big-score">${c} / ${t} (${pct}%)</p>
              <p>${passed ? "✅ Položili ste kviz! Jedinica je završena." : "❌ Za prolaz treba najmanje 60%. Pogledajte vokabular i pokušajte ponovno."}</p>
              ${u.id < UNITS.length && passed ? `<a class="btn primary" href="#/unit/${u.id + 1}">Sljedeća jedinica →</a>` : ""}
              <a class="btn ${passed ? "" : "primary"}" href="#/unit/${u.id}/quiz">Pokušaj ponovno</a>
              <a class="btn" href="#/unit/${u.id}">← Povratak na jedinicu</a>
            </div>`;
        }
      });
    }
    return;
  }
  _unitRoute(args, view);
};

/* ---------- FLASHCARD TRAINER (spaced repetition) ---------- */
function getSrs() { return store.get("srs", {}); }
function saveSrs(s) { store.set("srs", s); }

route("trainer", (args, view) => {
  const srs = getSrs();
  const now = Date.now();
  const due = ALL_VOCAB.filter(v => {
    const r = srs[v.hr];
    return !r || r.next <= now;
  });
  const mastered = ALL_VOCAB.filter(v => srs[v.hr] && srs[v.hr].box >= 4).length;

  if (due.length === 0) {
    view.innerHTML = `
      <div class="card center">
        <h2>🃏 Vježbe riječi</h2>
        <p>Sve riječi za sada su naučene! 🎉</p>
        <p>Zanemarene (savladane) riječi: <strong>${mastered}/${ALL_VOCAB.length}</strong></p>
        <p><button class="btn primary" id="reset-srs">Ponovno pokreni sve kartice</button></p>
        <p><a class="btn" href="#/units">← Jedinice</a></p>
      </div>`;
    view.querySelector("#reset-srs").addEventListener("click", () => { saveSrs({}); navigate(); });
    return;
  }

  view.innerHTML = `
    <div class="card">
      <h2>🃏 Vježbe riječi</h2>
      <p>Kartica se "podiže" kad točno odgovoriš: razina 1→5. Na krivi odgovor vraća se na razinu 1. Broj kartica za ponoviti sada: <strong>${due.length}</strong> (ukupno ${ALL_VOCAB.length}).</p>
      <p><label><input type="checkbox" id="dir-hr-en"> Smjer: engleski → hrvatski (inače hrvatski → engleski)</label></p>
      <p><select id="unit-filter"><option value="0">Sve jedinice</option>${UNITS.map(u => `<option value="${u.id}">${u.id}. ${esc(u.title)}</option>`).join("")}</select></p>
    </div>
    <div id="card-area"></div>`;

  const cardArea = view.querySelector("#card-area");
  const dirBox = view.querySelector("#dir-hr-en");
  const unitFilter = view.querySelector("#unit-filter");
  let queue = shuffle(due);
  let answeredCount = 0, correctCount = 0;

  const rerenderList = () => {
    const f = parseInt(unitFilter.value, 10);
    const list = f ? ALL_VOCAB.filter(v => v.unit === f) : ALL_VOCAB;
    const d = list.filter(v => { const r = srs[v.hr]; return !r || r.next <= now; });
    queue = shuffle(d.length ? d : list.slice(0, 20));
    cardArea.innerHTML = "";
    nextCard();
  };
  unitFilter.addEventListener("change", rerenderList);
  dirBox.addEventListener("change", () => nextCard());

  function nextCard() {
    if (queue.length === 0) {
      cardArea.innerHTML = `
        <div class="card center result">
          <h2>Sjednica gotova! 🎉</h2>
          <p class="big-score">${correctCount}/${answeredCount} točno</p>
          <p><button class="btn primary" id="again">Još jedna rundica</button>
          <a class="btn" href="#/trainer">Osvježi</a></p>
        </div>`;
      cardArea.querySelector("#again").addEventListener("click", () => { answeredCount = 0; correctCount = 0; rerenderList(); });
      return;
    }
    const card = queue.shift();
    const hrEn = !dirBox.checked;
    const prompt = hrEn ? card.hr : card.en;
    const answer = hrEn ? card.en : card.hr;
    const speakText = hrEn ? card.hr : "";
    cardArea.innerHTML = `
      <div class="card flashcard">
        <p class="qmeta">Preostalo kartica: ${queue.length + 1} · Točno u ovoj rundi: ${correctCount}/${answeredCount}</p>
        <p class="flash-prompt">${esc(prompt)} ${speakBtn(speakText)}</p>
        <p class="flash-unit">Jedinica ${card.unit} — ${esc(card.unitTitle)}</p>
        <button class="btn primary big" id="show">Prikaži odgovor</button>
        <div id="answer-area" style="display:none">
          <p class="flash-answer">${esc(answer)}</p>
          <div class="grade-btns">
            <button class="btn danger" id="wrong">✗ Ne znam</button>
            <button class="btn ok" id="right">✓ Znam</button>
          </div>
        </div>
      </div>`;
    cardArea.querySelector("#show").addEventListener("click", () => {
      cardArea.querySelector("#show").style.display = "none";
      cardArea.querySelector("#answer-area").style.display = "block";
      if (!hrEn) speech.speak(card.hr);
    });
    const grade = (ok) => {
      const s = getSrs();
      const r = s[card.hr] || { box: 1, next: 0 };
      if (ok) { r.box = Math.min(5, r.box + 1); r.next = Date.now() + [0, 1, 3, 7, 21][r.box - 1] * 86400000; }
      else { r.box = 1; r.next = Date.now() + 10 * 60000; queue.push(card); }
      s[card.hr] = r; saveSrs(s);
      answeredCount++; if (ok) correctCount++;
      nextCard();
    };
    cardArea.querySelector("#right").addEventListener("click", () => grade(true));
    cardArea.querySelector("#wrong").addEventListener("click", () => grade(false));
  }
  nextCard();
});

/* ---------- PHRASES ---------- */
route("phrases", (args, view) => {
  view.innerHTML = `
    <div class="card">
      <h2>💬 Najvažnije fraze za A1</h2>
      <p>${PHRASES.length} fraza za každodnevnu komunikaciju. Klikni 🔊 za izgovor.</p>
      <input type="text" id="phrase-search" class="answer-input" placeholder="Filtriraj fraze…">
    </div>
    <div class="card"><table class="vocab-table" id="phrase-table">
      <thead><tr><th>Hrvatski</th><th>Engleski</th><th></th></tr></thead>
      <tbody>${PHRASES.map(([hr, en]) => `<tr data-hr="${esc(hr.toLowerCase())}"><td class="hr">${esc(hr)}</td><td>${esc(en)}</td><td>${speakBtn(hr)}</td></tr>`).join("")}</tbody>
    </table></div>`;
  view.querySelector("#phrase-search").addEventListener("input", e => {
    const q = norm(e.target.value);
    view.querySelectorAll("#phrase-table tbody tr").forEach(tr => {
      tr.style.display = !q || tr.dataset.hr.includes(q) ? "" : "none";
    });
  });
});

/* ---------- GRAMMAR REFERENCE ---------- */
route("grammar", (args, view) => {
  view.innerHTML = `
    <div class="card"><h2>📖 Gramatika — referentni pregled za A1</h2>
    <p>Ključne tablice koje pokrivaju gramatiku potrebnu za ispit A1.</p></div>
    ${GRAMMAR_REFERENCE.map(g => `
      <div class="card">
        <h3>${esc(g.title)}</h3>
        <table class="vocab-table">
          <tbody>${g.rows.map(r => `<tr><td class="hr">${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2] || "")}</td></tr>`).join("")}</tbody>
        </table>
      </div>`).join("")}`;
});

/* ---------- MOCK A1 EXAM ---------- */
route("exam", (args, view) => {
  const prev = examResult();
  view.innerHTML = `
    <div class="card">
      <h2>📝 ${esc(EXAM.title)}</h2>
      <p>${esc(EXAM.intro)}</p>
      ${prev ? `<p class="badge ${prev.passed ? "pass" : "fail"}">Posljednji rezultat: ${prev.score}% — ${prev.passed ? "POLOŽEN ✅" : "nije položen"}</p>` : ""}
      <p><button class="btn primary big" id="start-exam">Pokreni probni ispit →</button></p>
    </div>
    <div id="exam-area"></div>`;

  view.querySelector("#start-exam").addEventListener("click", () => {
    const area = view.querySelector("#exam-area");
    const allQuestions = [];
    EXAM.sections.forEach((s, si) => s.questions.forEach((q, qi) => allQuestions.push({ ...q, section: s.name, si, qi })));
    const totalMcq = allQuestions.filter(q => q.type !== "writing").length;
    let idx = 0, correct = 0, writingAnswer = "";

    const render = () => {
      const q = allQuestions[idx];
      const isWriting = q.type === "writing";
      area.innerHTML = `
        <div class="card">
          <p class="crumbs">${esc(q.section)}</p>
          <div class="progressbar"><div style="width:${(idx / allQuestions.length) * 100}%"></div></div>
          <p class="qmeta">Zadatak ${idx + 1} od ${allQuestions.length}</p>
          <p class="qq">${esc(q.q)}</p>
          <div class="qbody">
            ${isWriting ? `
              <textarea id="writing-input" rows="6" class="answer-input" placeholder="Napiši ovdje… (3–5 rečenica)"></textarea>
              <button class="btn primary" id="submit-writing">Nastavi →</button>` : `
              <div class="opts">${q.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}</div>
              <div class="qfeedback"></div>
              <p class="center"><button class="btn" id="nextq" style="display:none">Sljedeće →</button></p>`}
          </div>
        </div>`;
      const body = area.querySelector(".qbody");
      if (isWriting) {
        body.querySelector("#submit-writing").addEventListener("click", () => {
          writingAnswer = body.querySelector("#writing-input").value;
          finish();
        });
      } else {
        body.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => {
          const i = parseInt(btn.dataset.i, 10);
          const ok = i === q.answer;
          if (ok) correct++;
          body.querySelector(".qfeedback").innerHTML = ok
            ? `<div class="fb ok">✅ Točno!</div>`
            : `<div class="fb no">❌ Netočno. Točan odgovor: <strong>${esc(q.options[q.answer])}</strong></div>`;
          const nb = body.querySelector("#nextq");
          nb.style.display = "inline-block";
          nb.onclick = () => {
            idx++;
            if (idx >= allQuestions.length) finish();
            else render();
          };
        }));
      }
    };

    const finish = () => {
      idx = allQuestions.length;
      const score = Math.round(correct / totalMcq * 100);
      const passed = score >= EXAM.passingScore;
      store.set("examResult", { score, passed, correct, total: totalMcq, ts: Date.now() });
      const writingQ = allQuestions.find(q => q.type === "writing");
      area.innerHTML = `
        <div class="card center result">
          <h2>Rezultat probnog ispita A1</h2>
          <p class="big-score ${passed ? "pass-text" : "fail-text"}">${score}%</p>
          <p>${passed ? `✅ POLOŽILI STE! (${correct}/${totalMcq} točnih, prag ${EXAM.passingScore}%)` : `❌ Niste položili (${correct}/${totalMcq} točnih, treba ${EXAM.passingScore}%). Pogledajte jedinice i pokušajte ponovno!`}</p>
          <details class="writing-review">
            <summary>📝 Vaš pisani zadatak i ogledni odgovor</summary>
            <p><strong>Vaš odgovor:</strong></p>
            <p class="writing-box">${esc(writingAnswer) || "(prazno)"}</p>
            <p><strong>Ogledni odgovor:</strong> ${esc(writingQ.modelAnswer)}</p>
          </details>
          <p>
            <button class="btn primary" id="retake">Pokušaj ponovno</button>
            <a class="btn" href="#/units">📚 Jedinice</a>
            <a class="btn" href="#/home">🏠 Početna</a>
          </p>
        </div>`;
      area.querySelector("#retake").addEventListener("click", () => {
        idx = 0; correct = 0; writingAnswer = "";
        area.innerHTML = "";
        render();
      });
      renderNav();
    };
    render();
  });
});

/* ---------- global: pronunciation buttons ---------- */
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-speak]");
  if (btn) { e.preventDefault(); speech.speak(btn.dataset.speak); }
});

/* ---------- init ---------- */
if (!location.hash) location.hash = "#/home";
navigate();
