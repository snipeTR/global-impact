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
}
const tr = loadPack('tr');
const en = loadPack('en');
tr.ui.glossary_dont_show = 'Bu açıklamayı bir daha gösterme (kalıcı)';
en.ui.glossary_dont_show = 'Don\'t show this explanation again (permanent)';
emit('tr', tr);
emit('en', en);
console.log('ok');
