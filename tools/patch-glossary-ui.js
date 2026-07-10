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
  console.log('wrote', lang);
}

const tr = loadPack('tr');
const en = loadPack('en');
Object.assign(tr.ui, {
  glossary_none: 'Bu satırda özel ekonomi terimi işaretlenmedi. Yıldızlı (*) kelimelere bak.',
  glossary_line_title: 'Bu satır ne diyor? (sade dil)',
  glossary_line_hint: 'Satıra tıkla: sade dil özeti · Yıldızlı (*) terime gel/tıkla: terim açıklaması',
  glossary_term_hint: 'Yıldız (*) teknik/ekonomi terimini işaretler.',
  effect_label: 'Etki',
  feed_empty: 'Bu kanalda henüz mesaj yok.'
});
Object.assign(en.ui, {
  glossary_none: 'No special economics terms marked on this line. Look for words with an asterisk (*).',
  glossary_line_title: 'What does this line mean? (plain language)',
  glossary_line_hint: 'Tap the line for a plain summary · Hover/tap a starred (*) term for its meaning',
  glossary_term_hint: 'An asterisk (*) marks a technical/economic term.',
  effect_label: 'Effect',
  feed_empty: 'No messages in this channel yet.'
});
emit('tr', tr);
emit('en', en);
