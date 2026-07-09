/* ============ KÜRESEL ETKİ — Canvas Grafikler ============ */
window.GAME = window.GAME || {};

GAME.chart = {
  indicator: 'growth',
  range: 'all',   // '1y' | '3y' | '5y' | '10y' | 'all'
  RANGES: { '1y': 4, '3y': 12, '5y': 20, '10y': 40, 'all': 999 },
  /* Grafikte seçilebilen seriler */
  SERIES: [
    { id: 'growth',    name: 'GDP Büyüme' },
    { id: 'inflation', name: 'Enflasyon' },
    { id: 'currency',  name: 'Para Birimi' },
    { id: 'trade',     name: 'Ticaret Dengesi' },
    { id: 'debt',      name: 'Kamu Borcu' },
    { id: 'reserves',  name: 'Rezerv' },
    { id: 'stability', name: 'İstikrar' },
    { id: 'influence', name: 'Küresel Etki' },
    { id: 'g:oil',     name: 'Petrol (Küresel)' },
    { id: 'g:food',    name: 'Gıda (Küresel)' },
    { id: 'g:dollar',  name: 'Dolar Endeksi' }
  ]
};

/* Orta paneli sığdır: grafik yüksekliği paneli doldurur; min eşiğin altında kaydırma açılır */
GAME.MIN_CHART_H = 140;
GAME.layoutCenterPanel = function () {
  const panel = document.getElementById('panel-center');
  const canvas = document.getElementById('main-chart');
  const wrap = document.getElementById('chart-wrap');
  const controls = document.getElementById('chart-controls');
  const cards = document.getElementById('center-cards');
  if (!panel || !canvas || !document.getElementById('screen-game').classList.contains('active')) return;

  panel.classList.remove('center-scroll');
  // Önce kaydırmasız ölç
  const panelH = panel.clientHeight;
  const panelW = panel.clientWidth;
  if (panelH < 40 || panelW < 40) return;

  const controlsH = controls ? controls.offsetHeight : 0;
  const cardsH = cards ? cards.offsetHeight : 0;
  const gaps = 14;
  let chartH = panelH - controlsH - cardsH - gaps;
  let chartW = wrap ? wrap.clientWidth : (panelW - 24);

  if (chartH < GAME.MIN_CHART_H) {
    // Aşırı sıkışma: min yükseklik + panel kaydırılabilir
    panel.classList.add('center-scroll');
    chartH = GAME.MIN_CHART_H;
  } else {
    // Üst sınır: çok yüksek ekranda abartma
    chartH = Math.min(chartH, Math.max(GAME.MIN_CHART_H, Math.floor(panelH * 0.72)));
  }
  chartW = Math.max(200, Math.floor(chartW));
  chartH = Math.max(GAME.MIN_CHART_H, Math.floor(chartH));

  canvas.style.width = chartW + 'px';
  canvas.style.height = chartH + 'px';
  if (canvas.width !== chartW || canvas.height !== chartH) {
    canvas.width = chartW;
    canvas.height = chartH;
  }
};

GAME.drawChart = function () {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  // Boyut paneli henüz layout etmediyse ayarla
  if (!canvas.width || !canvas.height) GAME.layoutCenterPanel();
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  if (W < 10 || H < 10) return;
  ctx.clearRect(0, 0, W, H);

  const s = GAME.state;
  if (!s) return;
  const ch = GAME.chart;

  // Veri serisi
  let data, name;
  if (ch.indicator.startsWith('g:')) {
    data = s.gHistory[ch.indicator.slice(2)] || [];
    name = (GAME.GLOBALS_INIT[ch.indicator.slice(2)] || {}).name || ch.indicator;
  } else {
    data = GAME.pc().history[ch.indicator] || [];
    name = (GAME.IND_META[ch.indicator] || {}).name || ch.indicator;
  }
  const maxN = ch.RANGES[ch.range];
  const startIdx = Math.max(0, data.length - maxN);
  const view = data.slice(startIdx);
  if (view.length < 2) {
    ctx.fillStyle = '#404040'; ctx.font = '13px Tahoma';
    ctx.fillText('Grafik için en az 2 tur gerekli — turu ilerlet.', 30, H / 2);
    return;
  }

  // Dar/kısa canvas'ta etiket payını sıkıştır
  const PAD = {
    l: H < 180 ? 42 : 56,
    r: 12,
    t: H < 180 ? 20 : 30,
    b: H < 180 ? 22 : 30
  };
  const plotW = Math.max(40, W - PAD.l - PAD.r), plotH = Math.max(30, H - PAD.t - PAD.b);
  let lo = Math.min(...view), hi = Math.max(...view);
  if (hi - lo < 0.5) { hi += 0.5; lo -= 0.5; }
  const pad = (hi - lo) * 0.12; lo -= pad; hi += pad;

  const x = i => PAD.l + (i / (view.length - 1)) * plotW;
  const y = v => PAD.t + (1 - (v - lo) / (hi - lo)) * plotH;

  // Izgara + eksen etiketleri
  ctx.strokeStyle = '#c8c8c8'; ctx.fillStyle = '#404040'; ctx.font = '11px Tahoma';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = lo + (hi - lo) * i / 4, yy = y(v);
    ctx.beginPath(); ctx.moveTo(PAD.l, yy); ctx.lineTo(W - PAD.r, yy); ctx.stroke();
    ctx.fillText(GAME.fmt(v, Math.abs(hi - lo) > 20 ? 0 : 1), 8, yy + 4);
  }
  // X ekseni tarih etiketleri
  const step = Math.max(1, Math.floor(view.length / 6));
  for (let i = 0; i < view.length; i += step) {
    ctx.fillText(GAME.turnDate(startIdx + i + 1), x(i) - 18, H - 8);
  }

  // Sıfır çizgisi
  if (lo < 0 && hi > 0) {
    ctx.strokeStyle = '#808080'; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(PAD.l, y(0)); ctx.lineTo(W - PAD.r, y(0)); ctx.stroke();
    ctx.setLineDash([]);
  }

  // Felaket işareti
  if (s.disaster && s.disaster.startTurn - 1 >= startIdx && s.disaster.startTurn - 1 < startIdx + view.length) {
    const dx = x(s.disaster.startTurn - 1 - startIdx);
    ctx.strokeStyle = 'rgba(192,0,0,.6)'; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(dx, PAD.t); ctx.lineTo(dx, H - PAD.b); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#c00000'; ctx.fillText('⚠ FELAKET', dx + 4, PAD.t + 12);
  }

  // Oyuncu müdahale işaretleri
  ctx.fillStyle = '#806000';
  GAME.state.interventionLog.forEach(iv => {
    const idx = iv.turn - 1 - startIdx;
    if (idx >= 0 && idx < view.length) {
      ctx.beginPath(); ctx.arc(x(idx), H - PAD.b - 5, 3, 0, Math.PI * 2); ctx.fill();
    }
  });

  // Ana çizgi (düz lacivert — 90'lar stili)
  ctx.strokeStyle = '#000080'; ctx.lineWidth = 2;
  ctx.beginPath();
  view.forEach((v, i) => { i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v)); });
  ctx.stroke();

  // Son değer vurgusu
  const lastV = view[view.length - 1];
  ctx.fillStyle = '#008000';
  ctx.beginPath(); ctx.arc(x(view.length - 1), y(lastV), 4, 0, Math.PI * 2); ctx.fill();

  // Başlık
  ctx.fillStyle = '#000000'; ctx.font = (H < 180 ? 'bold 11px' : 'bold 13px') + ' Tahoma';
  ctx.fillText(name + ' — ' + GAME.fmt(lastV, 1), PAD.l, H < 180 ? 14 : 18);
};

/* Grafik kontrol çipleri */
GAME.renderChartControls = function () {
  const indBox = document.getElementById('chart-ind-buttons');
  const rngBox = document.getElementById('chart-range-buttons');
  indBox.innerHTML = ''; rngBox.innerHTML = '';
  GAME.chart.SERIES.forEach(sr => {
    const b = document.createElement('button');
    b.className = 'chip' + (GAME.chart.indicator === sr.id ? ' active' : '');
    b.textContent = sr.name;
    b.onclick = () => { GAME.chart.indicator = sr.id; GAME.renderChartControls(); GAME.drawChart(); };
    indBox.appendChild(b);
  });
  [['1y', 'ui.range_1y'], ['3y', 'ui.range_3y'], ['5y', 'ui.range_5y'], ['10y', 'ui.range_10y'], ['all', 'ui.range_all']].forEach(([id, labelKey]) => {
    const label = GAME.t ? GAME.t(labelKey) : labelKey;
    const b = document.createElement('button');
    b.className = 'chip' + (GAME.chart.range === id ? ' active' : '');
    b.textContent = label;
    b.onclick = () => { GAME.chart.range = id; GAME.renderChartControls(); GAME.drawChart(); };
    rngBox.appendChild(b);
  });
};
