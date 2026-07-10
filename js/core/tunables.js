/* ============ KÜRESEL ETKİ — Gelişmiş ayarlar (tunables) ============
   Excel-benzeri tablo ile sabitleri düzenle. localStorage: keTunables_oyungrok
   Masaüstü Ayarlar → Gelişmiş ayarlar. Mobilde gizli.
   Ajan: yeni sabit eklerken buraya meta (get/set + desc tr/en) ekle.
*/
window.GAME = window.GAME || {};

GAME.TUNABLES_KEY = 'keTunables_oyungrok';

/* Runtime ayarlanabilir motor sabitleri (varsayılanlar) */
GAME.POLCAP_REGEN_BASE = 2;
GAME.POLCAP_REGEN_APPROVAL = 0.06;
GAME.FX_REGEN_EVERY = 4;
GAME.FX_INFL_TOTAL_BASE = 0.32;
GAME.FX_INFL_DELAY = 4;
GAME.FX_INFL_DUR = 12;

GAME._tunableDefaults = null;
GAME._tunablesReady = false;

GAME._desc = function (tr, en) {
  return { tr: tr, en: en };
};

GAME.tunableDesc = function (d) {
  if (!d) return '';
  if (typeof d === 'string') return d;
  const lang = (GAME.i18n && GAME.i18n.getLang && GAME.i18n.getLang()) || 'tr';
  return d[lang] || d.tr || d.en || '';
};

/** Varsayılanları bir kez yakala (instrument/country data yüklendikten sonra) */
GAME.captureTunableDefaults = function () {
  if (GAME._tunableDefaults) return;
  const snap = {
    MAX_TURNS: GAME.MAX_TURNS,
    SLOTS_PER_TURN: GAME.SLOTS_PER_TURN,
    POLCAP_REGEN_BASE: GAME.POLCAP_REGEN_BASE,
    POLCAP_REGEN_APPROVAL: GAME.POLCAP_REGEN_APPROVAL,
    FX_REGEN_EVERY: GAME.FX_REGEN_EVERY,
    FX_INFL_TOTAL_BASE: GAME.FX_INFL_TOTAL_BASE,
    FX_INFL_DELAY: GAME.FX_INFL_DELAY,
    FX_INFL_DUR: GAME.FX_INFL_DUR,
    TIMESCALES: JSON.parse(JSON.stringify(GAME.TIMESCALES || {})),
    instruments: {},
    countries: {}
  };
  (GAME.INSTRUMENTS || []).forEach(ins => {
    snap.instruments[ins.id] = {
      cost: ins.cost,
      escalateCost: !!ins.escalateCost,
      risk: ins.risk != null ? ins.risk : 0,
      min: ins.min,
      max: ins.max,
      step: ins.step,
      project: ins.project
    };
  });
  if (GAME.COUNTRIES) {
    Object.keys(GAME.COUNTRIES).forEach(cid => {
      const c = GAME.COUNTRIES[cid];
      snap.countries[cid] = {
        ind: Object.assign({}, c.ind),
        rates: Object.assign({}, c.rates || {}),
        internal: Object.assign({}, c.internal || {}),
        difficulty: c.difficulty
      };
    });
  }
  GAME._tunableDefaults = snap;
  GAME._tunablesReady = true;
};

GAME.buildTunableRows = function () {
  GAME.captureTunableDefaults();
  const rows = [];
  const D = GAME._desc;

  const add = (id, group, type, get, set, def, desc) => {
    rows.push({ id: id, group: group, type: type, get: get, set: set, def: def, desc: desc });
  };

  add('game.max_turns', 'game', 'int',
    () => GAME.MAX_TURNS,
    v => { GAME.MAX_TURNS = v; },
    GAME._tunableDefaults.MAX_TURNS,
    D('Toplam tur sayısı (60 ≈ 15 yıl).', 'Total turns (60 ≈ 15 years).'));

  add('game.slots_per_turn', 'game', 'int',
    () => GAME.SLOTS_PER_TURN,
    v => { GAME.SLOTS_PER_TURN = v; },
    GAME._tunableDefaults.SLOTS_PER_TURN,
    D('Tur başına en fazla enstrüman değişikliği (slot).', 'Max instrument changes per turn (slots).'));

  add('game.polcap_regen_base', 'game', 'number',
    () => GAME.POLCAP_REGEN_BASE,
    v => { GAME.POLCAP_REGEN_BASE = v; },
    GAME._tunableDefaults.POLCAP_REGEN_BASE,
    D('Her çeyrek siyasi sermaye yenileme tabanı.', 'Base political-capital regeneration per quarter.'));

  add('game.polcap_regen_approval', 'game', 'number',
    () => GAME.POLCAP_REGEN_APPROVAL,
    v => { GAME.POLCAP_REGEN_APPROVAL = v; },
    GAME._tunableDefaults.POLCAP_REGEN_APPROVAL,
    D('Onay sapmasının regen’e çarpanı: (onay−50)×bu.', 'Approval factor for regen: (approval−50)×this.'));

  add('game.fx_regen_every', 'game', 'int',
    () => GAME.FX_REGEN_EVERY,
    v => { GAME.FX_REGEN_EVERY = Math.max(1, v); },
    GAME._tunableDefaults.FX_REGEN_EVERY,
    D('Kaç FX kullanımında regen penaltısı 1 artar (floor(uses/N)).', 'FX uses per +1 regen penalty step (floor(uses/N)).'));

  add('game.fx_infl_total_base', 'game', 'number',
    () => GAME.FX_INFL_TOTAL_BASE,
    v => { GAME.FX_INFL_TOTAL_BASE = v; },
    GAME._tunableDefaults.FX_INFL_TOTAL_BASE,
    D('FX artışı sonrası gecikmeli enflasyon toplam tabanı.', 'Base total delayed inflation after FX increase.'));

  add('game.fx_infl_delay', 'game', 'int',
    () => GAME.FX_INFL_DELAY,
    v => { GAME.FX_INFL_DELAY = v; },
    GAME._tunableDefaults.FX_INFL_DELAY,
    D('FX enflasyon gecikmesi (çeyrek/tur).', 'FX inflation delay in quarters/turns.'));

  add('game.fx_infl_dur', 'game', 'int',
    () => GAME.FX_INFL_DUR,
    v => { GAME.FX_INFL_DUR = v; },
    GAME._tunableDefaults.FX_INFL_DUR,
    D('FX enflasyon sızma süresi (tur).', 'FX inflation seep duration (turns).'));

  ['imm', 'short', 'med', 'long'].forEach(ts => {
    const defTs = GAME._tunableDefaults.TIMESCALES[ts] || {};
    add('timescale.' + ts + '.delay', 'timescale', 'int',
      () => (GAME.TIMESCALES[ts] || {}).delay,
      v => { if (!GAME.TIMESCALES[ts]) GAME.TIMESCALES[ts] = {}; GAME.TIMESCALES[ts].delay = v; },
      defTs.delay,
      D(ts + ' ölçeği: etki başlamadan önceki gecikme (tur).', ts + ' timescale: delay before effect starts (turns).'));
    add('timescale.' + ts + '.dur', 'timescale', 'int',
      () => (GAME.TIMESCALES[ts] || {}).dur,
      v => { if (!GAME.TIMESCALES[ts]) GAME.TIMESCALES[ts] = {}; GAME.TIMESCALES[ts].dur = v; },
      defTs.dur,
      D(ts + ' ölçeği: etkinin sürdüğü tur sayısı.', ts + ' timescale: duration of the effect (turns).'));
  });

  (GAME.INSTRUMENTS || []).forEach(ins => {
    const id = ins.id;
    const def = GAME._tunableDefaults.instruments[id] || {};
    const nm = ins.name || id;
    add('ins.' + id + '.cost', 'instrument', 'number',
      () => ins.cost,
      v => { ins.cost = v; },
      def.cost,
      D(nm + ' — siyasi sermaye taban maliyeti.', nm + ' — base political capital cost.'));
    add('ins.' + id + '.escalateCost', 'instrument', 'bool',
      () => !!ins.escalateCost,
      v => { ins.escalateCost = !!v; },
      !!def.escalateCost,
      D(nm + ' — her onayda maliyet +1 artsın mı?', nm + ' — escalate cost +1 per confirmed use?'));
    if (ins.risk != null || def.risk != null) {
      add('ins.' + id + '.risk', 'instrument', 'int',
        () => ins.risk || 0,
        v => { ins.risk = v; },
        def.risk || 0,
        D(nm + ' — gri alan tespit riski (0–3).', nm + ' — grey-zone detection risk (0–3).'));
    }
    if (ins.type === 'numerical' || ins.type === 'slider') {
      if (ins.min != null || def.min != null) {
        add('ins.' + id + '.min', 'instrument', 'number',
          () => ins.min, v => { ins.min = v; }, def.min,
          D(nm + ' — minimum değer.', nm + ' — minimum value.'));
      }
      if (ins.max != null || def.max != null) {
        add('ins.' + id + '.max', 'instrument', 'number',
          () => ins.max, v => { ins.max = v; }, def.max,
          D(nm + ' — maksimum değer.', nm + ' — maximum value.'));
      }
      if (ins.step != null || def.step != null) {
        add('ins.' + id + '.step', 'instrument', 'number',
          () => ins.step, v => { ins.step = v; }, def.step,
          D(nm + ' — adım aralığı.', nm + ' — step size.'));
      }
    }
    if (ins.project != null || def.project != null) {
      add('ins.' + id + '.project', 'instrument', 'int',
        () => ins.project || 0, v => { ins.project = v || undefined; }, def.project || 0,
        D(nm + ' — proje süresi (tur, 0=yok).', nm + ' — project length in turns (0=none).'));
    }
  });

  if (GAME.COUNTRIES) {
    Object.keys(GAME.COUNTRIES).forEach(cid => {
      const c = GAME.COUNTRIES[cid];
      const defC = GAME._tunableDefaults.countries[cid] || { ind: {}, rates: {}, internal: {} };
      const label = (c.name || cid) + ' (' + cid + ')';
      const indKeys = Object.keys(c.ind || defC.ind || {});
      indKeys.forEach(k => {
        add('country.' + cid + '.ind.' + k, 'country', 'number',
          () => c.ind[k],
          v => { c.ind[k] = v; },
          defC.ind[k],
          D(label + ' başlangıç ' + k + '.', label + ' starting ' + k + '.'));
      });
      const rateKeys = Object.keys(c.rates || defC.rates || {});
      rateKeys.forEach(k => {
        add('country.' + cid + '.rates.' + k, 'country', 'number',
          () => (c.rates && c.rates[k]),
          v => { if (!c.rates) c.rates = {}; c.rates[k] = v; },
          defC.rates[k],
          D(label + ' başlangıç oranı ' + k + '.', label + ' starting rate ' + k + '.'));
      });
      ['approval', 'stability', 'polCap'].forEach(k => {
        if (c.internal && (c.internal[k] != null || (defC.internal && defC.internal[k] != null))) {
          add('country.' + cid + '.internal.' + k, 'country', 'number',
            () => c.internal[k],
            v => { if (!c.internal) c.internal = {}; c.internal[k] = v; },
            defC.internal[k],
            D(label + ' iç ' + k + ' başlangıcı.', label + ' starting internal ' + k + '.'));
        }
      });
    });
  }

  return rows;
};

GAME.parseTunableValue = function (type, raw) {
  if (type === 'bool') {
    if (raw === true || raw === false) return raw;
    const s = String(raw).trim().toLowerCase();
    if (s === '1' || s === 'true' || s === 'yes' || s === 'evet') return true;
    if (s === '0' || s === 'false' || s === 'no' || s === 'hayır' || s === 'hayir') return false;
    return !!s;
  }
  if (type === 'int') {
    const n = parseInt(raw, 10);
    return isNaN(n) ? 0 : n;
  }
  const n = parseFloat(raw);
  return isNaN(n) ? 0 : n;
};

GAME.formatTunableValue = function (type, v) {
  if (type === 'bool') return v ? 'true' : 'false';
  if (v === undefined || v === null) return '';
  return String(v);
};

GAME.exportTunablesText = function () {
  const rows = GAME.buildTunableRows();
  return rows.map(r => r.id + '=' + GAME.formatTunableValue(r.type, r.get())).join('\n');
};

GAME.applyTunablesObject = function (obj) {
  if (!obj || typeof obj !== 'object') return 0;
  const rows = GAME.buildTunableRows();
  const byId = {};
  rows.forEach(r => { byId[r.id] = r; });
  let n = 0;
  Object.keys(obj).forEach(id => {
    const r = byId[id];
    if (!r) return;
    try {
      r.set(GAME.parseTunableValue(r.type, obj[id]));
      n++;
    } catch (e) { console.warn('tunable', id, e); }
  });
  return n;
};

GAME.applyTunablesText = function (text) {
  const obj = {};
  String(text || '').split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line[0] === '#' || line[0] === ';') return;
    const eq = line.indexOf('=');
    if (eq < 0) return;
    const id = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    obj[id] = val;
  });
  return GAME.applyTunablesObject(obj);
};

GAME.readTunablesFromStorage = function () {
  try {
    const raw = localStorage.getItem(GAME.TUNABLES_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
};

GAME.writeTunablesToStorage = function (obj) {
  try {
    localStorage.setItem(GAME.TUNABLES_KEY, JSON.stringify(obj || {}));
  } catch (e) { console.warn('tunables save', e); }
};

GAME.collectTunablesObject = function () {
  const rows = GAME.buildTunableRows();
  const o = {};
  rows.forEach(r => { o[r.id] = r.get(); });
  return o;
};

GAME.resetTunablesToDefaults = function () {
  GAME.captureTunableDefaults();
  const d = GAME._tunableDefaults;
  GAME.MAX_TURNS = d.MAX_TURNS;
  GAME.SLOTS_PER_TURN = d.SLOTS_PER_TURN;
  GAME.POLCAP_REGEN_BASE = d.POLCAP_REGEN_BASE;
  GAME.POLCAP_REGEN_APPROVAL = d.POLCAP_REGEN_APPROVAL;
  GAME.FX_REGEN_EVERY = d.FX_REGEN_EVERY;
  GAME.FX_INFL_TOTAL_BASE = d.FX_INFL_TOTAL_BASE;
  GAME.FX_INFL_DELAY = d.FX_INFL_DELAY;
  GAME.FX_INFL_DUR = d.FX_INFL_DUR;
  GAME.TIMESCALES = JSON.parse(JSON.stringify(d.TIMESCALES));
  (GAME.INSTRUMENTS || []).forEach(ins => {
    const s = d.instruments[ins.id];
    if (!s) return;
    ins.cost = s.cost;
    ins.escalateCost = s.escalateCost;
    if (s.risk != null) ins.risk = s.risk;
    if (s.min != null) ins.min = s.min;
    if (s.max != null) ins.max = s.max;
    if (s.step != null) ins.step = s.step;
    if (s.project != null) ins.project = s.project;
  });
  if (GAME.COUNTRIES) {
    Object.keys(GAME.COUNTRIES).forEach(cid => {
      const s = d.countries[cid];
      const c = GAME.COUNTRIES[cid];
      if (!s || !c) return;
      c.ind = Object.assign({}, s.ind);
      c.rates = Object.assign({}, s.rates);
      c.internal = Object.assign({}, s.internal);
    });
  }
  try { localStorage.removeItem(GAME.TUNABLES_KEY); } catch (e) {}
};

/** Kayıtlı override’ları uygula (init / menü) */
GAME.applyStoredTunables = function () {
  GAME.captureTunableDefaults();
  const obj = GAME.readTunablesFromStorage();
  if (obj) GAME.applyTunablesObject(obj);
};

GAME.fxRegenPenalty = function (cid) {
  const c = GAME.state && GAME.state.countries[cid];
  if (!c || !c.instrUseCount) return 0;
  const uses = c.instrUseCount.fx_intervention || 0;
  const every = Math.max(1, GAME.FX_REGEN_EVERY || 4);
  return Math.floor(uses / every);
};
