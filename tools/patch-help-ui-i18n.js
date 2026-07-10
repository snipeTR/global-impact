/* Inject help modal + tooltip UI strings into lang packs */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function inject(file, needle, addObj) {
  const p = path.join(root, file);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('"help_intro"')) {
    console.log('skip (exists)', file);
    return;
  }
  if (!s.includes(needle)) {
    console.error('needle missing', file);
    process.exit(1);
  }
  const add = Object.keys(addObj).map(k => ',"' + k + '":' + JSON.stringify(addObj[k])).join('');
  s = s.replace(needle, needle + add);
  fs.writeFileSync(p, s);
  console.log('ok', file);
}

inject('lang/tr/pack.js', '"help_title":"Danışma Kurulu: hangi enstrümanı kullanmalıyım?"', {
  help_intro: 'Hangi enstrümanı kullanmanız gerektiğine dair tur bazlı öneri verir.',
  help_intro_detail: 'Alttaki butonlardan enstrümanlar, ülkeler, grafikler ve sistem hakkında ansiklopedi okuyabilirsiniz.',
  help_ask_advice: 'Bu çeyrek için öneri istiyor musunuz?',
  help_yes_advice: 'Evet, öneri ver',
  advice_title: '🧭 Danışma Kurulu Önerileri',
  cross_rules_title: 'Çapraz etki kuralları',
  grey_risk_title: 'Gri alan riski',
  grey_risk_body: 'Açık kaldığı her çeyrek {pct} tespit şansı. Tespitte: hedefle ilişki -70, herkesle -15, misilleme vergisi, Küresel Etki -5, Toplum Onayı -4.',
  scenario_title: 'Senaryo'
});

inject('lang/en/pack.js', '"help_title":"Advisory Board: which instrument should I use?"', {
  help_intro: 'Gives turn-based advice on which instruments to consider.',
  help_intro_detail: 'Use the buttons below for deeper encyclopaedia pages on instruments, countries, charts and system rules.',
  help_ask_advice: 'Would you like advice for this quarter?',
  help_yes_advice: 'Yes, advise me',
  advice_title: '🧭 Advisory Board suggestions',
  cross_rules_title: 'Cross-effect rules',
  grey_risk_title: 'Grey-zone risk',
  grey_risk_body: 'While open, {pct} detection chance each quarter. On exposure: relation with target -70, everyone -15, retaliation tax, Global Influence -5, Approval -4.',
  scenario_title: 'Scenario'
});
