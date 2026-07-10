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
Object.assign(tr.ui, {
  adv_section: 'Gelişmiş ayarlar',
  adv_section_note: 'Oyun sabitleri, enstrüman maliyetleri ve ülke başlangıç değerleri (excel benzeri tablo). Yalnız masaüstü.',
  adv_open: 'Gelişmiş ayarları aç…',
  adv_desktop_only: 'Gelişmiş ayarlar yalnızca masaüstü sürümünde kullanılabilir.',
  adv_title: 'Gelişmiş Ayarlar',
  adv_sub: 'Sabitler — tablo (key / değer / açıklama)',
  adv_filter_ph: 'Filtrele (anahtar veya açıklama)…',
  adv_all_groups: 'Tüm gruplar',
  adv_save: 'Kaydet',
  adv_export: 'Metin dışa aktar',
  adv_import: 'Metin içe aktar',
  adv_reset: 'Varsayılana dön',
  adv_col_key: 'Değişken',
  adv_col_val: 'Değer',
  adv_col_def: 'Varsayılan',
  adv_col_desc: 'Açıklama',
  adv_saved: 'Kaydedildi ({n} satır). Yeni oyunda ve motor sabitlerinde geçerli.',
  adv_export_hint: 'Metin modu: key=value satırları. Kaydet ile uygula.',
  adv_import_hint: 'Yapıştırdığın key=value metnini Kaydet ile uygula.',
  adv_reset_confirm: 'Tüm gelişmiş ayarlar fabrika varsayılanına dönsün mü?',
  adv_reset_done: 'Varsayılanlara dönüldü.'
});
Object.assign(en.ui, {
  adv_section: 'Advanced settings',
  adv_section_note: 'Game constants, instrument costs and country starting values (spreadsheet-like table). Desktop only.',
  adv_open: 'Open advanced settings…',
  adv_desktop_only: 'Advanced settings are available on desktop only.',
  adv_title: 'Advanced Settings',
  adv_sub: 'Constants — table (key / value / description)',
  adv_filter_ph: 'Filter (key or description)…',
  adv_all_groups: 'All groups',
  adv_save: 'Save',
  adv_export: 'Export text',
  adv_import: 'Import text',
  adv_reset: 'Reset to defaults',
  adv_col_key: 'Variable',
  adv_col_val: 'Value',
  adv_col_def: 'Default',
  adv_col_desc: 'Description',
  adv_saved: 'Saved ({n} rows). Applies to engine constants and new games.',
  adv_export_hint: 'Text mode: key=value lines. Click Save to apply.',
  adv_import_hint: 'Paste key=value text, then Save to apply.',
  adv_reset_confirm: 'Reset all advanced settings to factory defaults?',
  adv_reset_done: 'Defaults restored.'
});
emit('tr', tr);
emit('en', en);
console.log('advanced ui strings ok');
