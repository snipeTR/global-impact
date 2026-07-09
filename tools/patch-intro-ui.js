const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');

function loadPack(lang) {
  const pack = {};
  const sb = { window: {}, GAME: { i18n: { register(l, s, d) { pack[s] = d; } } } };
  sb.window.GAME = sb.GAME;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(root, 'lang', lang, 'pack.js'), 'utf8'), sb);
  return pack;
}

function emit(lang, sections) {
  let out = '/* Language pack: ' + lang + ' */\nwindow.GAME = window.GAME || {};\n(function () {\n';
  out += "  var R = function (s, d) { GAME.i18n.register('" + lang + "', s, d); };\n";
  for (const [sec, data] of Object.entries(sections)) {
    out += '  R(' + JSON.stringify(sec) + ', ' + JSON.stringify(data) + ');\n';
  }
  out += '})();\n';
  fs.writeFileSync(path.join(root, 'lang', lang, 'pack.js'), out);
  console.log('patched', lang, out.length);
}

const tr = loadPack('tr');
const en = loadPack('en');
tr.ui.intro_title = 'Dünya ekonomisi istikrarlı görünüyor';
tr.ui.intro_body = '2026 yılı sakin başladı. Ancak uzmanlar küresel tedarik zincirlerinin ve finansal sistemin aşırı kırılgan olduğunu belirtiyor. Bu sükûnet ne kadar sürer?';
en.ui.intro_title = 'The world economy looks stable';
en.ui.intro_body = '2026 began calmly. Yet experts warn that global supply chains and the financial system are extremely fragile. How long will the calm last?';
emit('tr', tr);
emit('en', en);
