/* ============ KÜRESEL ETKİ — Bayrak görselleri (PNG, Win95 çerçeve) ============
   Emoji bayraklar Windows'ta CA/BR gibi harf çiftine düşer → yerel PNG kullan.
   Dosyalar: assets/flags/{iso}.png
*/
window.GAME = window.GAME || {};

/** Oyun cid → ISO 3166-1 alpha-2 (flagcdn / dosya adı) */
GAME.FLAG_ISO = {
  USA: 'us',
  CHN: 'cn',
  EU: 'eu',
  JPN: 'jp',
  IND: 'in',
  GBR: 'gb',
  RUS: 'ru',
  CAN: 'ca',
  BRA: 'br',
  KOR: 'kr',
  AUS: 'au',
  MEX: 'mx',
  IDN: 'id',
  SAU: 'sa',
  TUR: 'tr',
  CHE: 'ch',
  ZAF: 'za'
};

GAME.FLAG_BASE = 'assets/flags/';

/** ISO kodu (cid veya def) */
GAME.flagIso = function (cidOrDef) {
  if (!cidOrDef) return '';
  if (typeof cidOrDef === 'string') return GAME.FLAG_ISO[cidOrDef] || '';
  if (cidOrDef.id) return GAME.FLAG_ISO[cidOrDef.id] || '';
  return '';
};

/**
 * Win95 çerçeveli bayrak HTML.
 * @param {string|object} cidOrDef — ülke id veya COUNTRIES kaydı
 * @param {object} [opts] — size: 'sm'|'md'|'lg' (varsayılan md), className, title
 */
GAME.flagHtml = function (cidOrDef, opts) {
  opts = opts || {};
  const cid = typeof cidOrDef === 'string' ? cidOrDef : (cidOrDef && cidOrDef.id);
  const def = (cid && GAME.COUNTRIES && GAME.COUNTRIES[cid]) ||
    (typeof cidOrDef === 'object' ? cidOrDef : null) || {};
  const iso = GAME.flagIso(cid || def);
  const name = def.name || cid || iso || '';
  const size = opts.size || 'md';
  const extra = opts.className ? (' ' + opts.className) : '';
  const title = opts.title != null ? opts.title : name;
  const esc = (GAME.escapeHtml ? GAME.escapeHtml(name) : String(name).replace(/"/g, '&quot;'));
  const escTitle = (GAME.escapeHtml ? GAME.escapeHtml(title) : String(title).replace(/"/g, '&quot;'));

  if (iso) {
    const src = GAME.FLAG_BASE + iso + '.png';
    return '<span class="flag-win95 flag-' + size + extra + '" title="' + escTitle + '">' +
      '<img src="' + src + '" alt="' + esc + '" draggable="false" loading="lazy">' +
      '</span>';
  }
  /* yedek: emoji (destekleyen ortamlarda) */
  const emoji = def.flag || '';
  return '<span class="flag-win95 flag-' + size + ' flag-emoji-fallback' + extra + '" title="' + escTitle + '">' +
    emoji + '</span>';
};

/** Bayrak + boşluk + metin (inline) */
GAME.flagLabelHtml = function (cidOrDef, text, opts) {
  opts = opts || {};
  const label = text != null ? text : ((typeof cidOrDef === 'object' && cidOrDef.name) || '');
  const esc = GAME.escapeHtml ? GAME.escapeHtml(label) : String(label);
  return GAME.flagHtml(cidOrDef, opts) + ' <span class="flag-label-text">' + esc + '</span>';
};

/**
 * Düz metin ülke adı (emoji yok — Windows feed/status’ta CA/BR harfi olmasın).
 * Haber source, setFeedStatus, plain logs.
 */
GAME.countryText = function (cidOrDef) {
  if (!cidOrDef) return '';
  if (typeof cidOrDef === 'string') {
    const d = GAME.COUNTRIES && GAME.COUNTRIES[cidOrDef];
    return d ? d.name : cidOrDef;
  }
  return cidOrDef.name || cidOrDef.id || '';
};

/** Haber / diplomasi source satırı (yalnız ad) */
GAME.countrySource = function (cidOrDef) {
  return GAME.countryText(cidOrDef);
};
