/* Node duman testi: mesaj şablonları + enstrüman sayfalama mantığı (DOM yok) */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const ctx = {
  window: {}, console, Math, Number, Object, Array, JSON, isNaN, parseInt, parseFloat, String
};
ctx.window = ctx;
ctx.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: () => ({ classList: { add(){}, remove(){}, toggle(){} }, style: {}, appendChild(){}, onclick: null }),
  addEventListener: () => {},
  body: { classList: { add(){}, remove(){}, toggle(){}, contains: () => false } }
};
ctx.setTimeout = () => 0;
ctx.clearTimeout = () => {};
ctx.requestAnimationFrame = (fn) => { try { fn(); } catch (e) {} };
ctx.localStorage = { _d: {}, getItem(k){return this._d[k]||null;}, setItem(k,v){this._d[k]=v;}, removeItem(k){delete this._d[k];} };

const files = [
  'js/data/countries.js', 'js/data/instruments.js', 'js/data/disasters.js',
  'js/core/state.js', 'js/core/effects.js', 'js/core/internal.js', 'js/core/diplomacy.js',
  'js/core/news.js', 'js/core/ai.js', 'js/core/turn.js',
  'js/ui/charts.js', 'js/ui/help.js', 'js/ui/panels.js', 'js/ui/screens.js', 'js/ui/mobile.js', 'js/ui/main.js'
];
for (const f of files) {
  const code = fs.readFileSync(path.join(root, f), 'utf8');
  try { vm.runInNewContext(code, ctx, { filename: f }); }
  catch (e) { console.error('LOAD FAIL', f, e.message); process.exit(1); }
}
const G = ctx.GAME;

// --- Mesaj şablonları ---
const n = G.countNewsTemplates();
console.log('news_templates:', n, n >= 80 ? 'PASS' : 'FAIL (hedef 80+)');
if (n < 80) process.exit(1);

// --- Enstrüman sayfalama ---
G.mobile = { active: false };
const desk = G.instrPerPage();
// clientWidth yok → 800 varsayılan → per ~3
console.log('desktop_instrPerPage:', desk);
G.mobile.active = true;
const mob = G.instrPerPage();
console.log('mobile_instrPerPage:', mob, mob >= 9999 ? 'PASS' : 'FAIL');
if (mob < 9999) process.exit(1);

const r = G.testInstrumentPaging();
console.log(r.summary);
r.checks.filter(c => !c.pass).forEach(c => console.log('  FAIL:', c.name, c.detail));
if (!r.ok) process.exit(1);

// Katman dağılımı
const byL = {};
G.INSTRUMENTS.forEach(i => { byL[i.layer] = (byL[i.layer] || 0) + 1; });
console.log('instruments_by_layer:', byL, 'total', G.INSTRUMENTS.length);

console.log('ALL_OK');
