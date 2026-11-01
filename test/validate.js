/* Validation + smoke tests for Hrvatski A1. Run: node test/validate.js */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

let failures = 0;
function ok(cond, msg) {
  if (cond) console.log("  PASS " + msg);
  else { failures++; console.error("  FAIL " + msg); }
}

/* ---- load data.js in a sandbox ---- */
const dataSrc = fs.readFileSync(path.join(__dirname, "..", "js", "data.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
const data = vm.runInContext(dataSrc + "\n;({ UNITS, GRAMMAR_REFERENCE, EXAM, PHRASES, ALL_VOCAB, CRO_LEVEL });", sandbox);
const { UNITS, GRAMMAR_REFERENCE, EXAM, PHRASES, ALL_VOCAB, CRO_LEVEL } = data;

console.log("== data.js ==");
ok(CRO_LEVEL === "A1", "level is A1");
ok(UNITS.length === 10, "10 units");
ok(new Set(UNITS.map(u => u.id)).size === 10, "unit ids unique 1..10");
UNITS.forEach(u => {
  ok(!!u.title && !!u.intro && !!u.grammar && !!u.dialogue && u.vocab.length >= 20,
    `unit ${u.id}: complete structure, ${u.vocab.length} vocab`);
  ok(u.exercises.length >= 8 && u.quiz.length >= 5, `unit ${u.id}: ${u.exercises.length} exercises, ${u.quiz.length} quiz`);
  u.exercises.forEach((e, i) => {
    if (e.type === "mcq") ok(e.answer >= 0 && e.answer < e.options.length, `unit ${u.id} ex${i}: mcq answer in range`);
    if (e.type === "fill") ok(typeof e.answer === "string" && e.answer.length > 0, `unit ${u.id} ex${i}: fill answer present`);
    if (e.type === "translate") ok(Array.isArray(e.answers) && e.answers.length > 0, `unit ${u.id} ex${i}: translate answers present`);
    if (e.type === "match") ok(e.pairs.length >= 4 && e.pairs.every(p => p.length === 2), `unit ${u.id} ex${i}: match pairs valid`);
  });
  u.quiz.forEach((q, i) => ok(q.answer >= 0 && q.answer < q.options.length, `unit ${u.id} quiz${i}: answer in range`));
  ok(u.dialogue.lines.length >= 4, `unit ${u.id}: dialogue has ${u.dialogue.lines.length} lines`);
});
ok(ALL_VOCAB.length >= 250, `ALL_VOCAB has ${ALL_VOCAB.length} entries`);
ok(GRAMMAR_REFERENCE.length >= 8, `grammar reference has ${GRAMMAR_REFERENCE.length} tables`);
ok(PHRASES.length >= 30, `phrases has ${PHRASES.length} entries`);

let examMcq = 0;
EXAM.sections.forEach(s => s.questions.forEach(q => {
  if (q.type === "writing") ok(!!q.modelAnswer, "exam writing has model answer");
  else { examMcq++; ok(q.answer >= 0 && q.answer < q.options.length, `exam q in range: ${q.q.slice(0, 40)}…`); }
}));
ok(examMcq >= 15, `exam has ${examMcq} auto-graded questions`);
ok(EXAM.passingScore === 60, "exam passing score 60%");

/* ---- smoke test: load app.js with a DOM shim and render every route ---- */
console.log("== app.js smoke test ==");
function makeEl() {
  const el = {
    innerHTML: "", style: {}, dataset: {}, value: "", checked: false,
    children: [],
    querySelector: () => makeEl(),
    querySelectorAll: () => [],
    addEventListener: () => {},
    appendChild: c => el.children.push(c),
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {}, focus: () => {}, click: () => {},
  };
  return el;
}
const documentShim = {
  querySelector: () => makeEl(),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => makeEl(),
};
const localStorageShim = { _s: {}, getItem(k) { return this._s[k] ?? null; }, setItem(k, v) { this._s[k] = String(v); }, removeItem(k) { delete this._s[k]; } };
const appSandbox = {
  console, localStorage: localStorageShim, document: documentShim,
  window: { addEventListener: () => {}, scrollTo: () => {} },
  location: { hash: "#/home" },
  SpeechSynthesisUtterance: undefined,
  CSS: { escape: s => s },
  setTimeout, Date, Math, JSON, Object, Array, String, parseInt, RegExp,
};
appSandbox.window.location = appSandbox.location;
vm.createContext(appSandbox);
vm.runInContext(dataSrc + "\n;globalThis.__D = { UNITS, GRAMMAR_REFERENCE, EXAM, PHRASES, ALL_VOCAB, CRO_LEVEL };", appSandbox);
const appSrc = fs.readFileSync(path.join(__dirname, "..", "js", "app.js"), "utf8");
try {
  vm.runInContext(appSrc, appSandbox);
  ok(true, "app.js loads and initializes without throwing");
} catch (e) {
  ok(false, "app.js threw on load: " + e.message);
}
const routes = vm.runInContext("routes", appSandbox);
ok(typeof routes === "object" && Object.keys(routes).length >= 6,
  "routes registered: " + Object.keys(routes || {}).join(", "));
["home", "units", "trainer", "phrases", "grammar", "exam"].forEach(r => {
  try {
    const view = makeEl();
    routes[r]([], view);
    ok(view.innerHTML.length > 50, `route #/${r} renders (${view.innerHTML.length} chars)`);
  } catch (e) {
    ok(false, `route #/${r} threw: ${e.message}`);
  }
});
[1, 5, 10].forEach(id => {
  try {
    const view = makeEl();
    routes["unit"]([String(id)], view);
    ok(view.innerHTML.includes("Vokabular") || view.innerHTML.length > 100, `route #/unit/${id} renders`);
  } catch (e) { ok(false, `route #/unit/${id} threw: ${e.message}`); }
});
[1, 10].forEach(id => {
  ["exercises", "quiz"].forEach(sub => {
    try {
      const view = makeEl();
      routes["unit"]([String(id), sub], view);
      ok(true, `route #/unit/${id}/${sub} renders`);
    } catch (e) { ok(false, `route #/unit/${id}/${sub} threw: ${e.message}`); }
  });
});

console.log(failures === 0 ? "\nALL TESTS PASSED ✅" : `\n${failures} FAILURE(S) ❌`);
process.exit(failures === 0 ? 0 : 1);
