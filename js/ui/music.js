/* ============ KÜRESEL ETKİ — Arka plan müziği ============ */
/*
  normal.mp3  → oyun başı / sakin dönem
  felaket.mp3 → felaket (normal 1 sn fade-out)
  sonra: diplomasi.mp3 → savas.mp3 → felaket…

  Ses basamakları (buton): mute (0) → %40 → %100 → mute…
  Tercih: keSettings_oyungrok.volStep (ayarlar + oyun butonu)
*/
window.GAME = window.GAME || {};

GAME.Music = {
  base: 'music/',
  normalTrack: 'normal.mp3',
  crisisPlaylist: ['felaket.mp3', 'diplomasi.mp3', 'savas.mp3'],
  mode: 'idle',
  crisisIndex: 0,
  /** Kullanıcının seçtiği hedef ses: 0 | 0.4 | 1 */
  volume: 0.4,
  /** 0=mute, 1=%40, 2=%100 */
  volStep: 1,
  VOL_STEPS: [0, 0.4, 1],
  audio: null,
  fading: false,
  unlocked: false,
  _bound: false,
  _fadeTimer: null
};

GAME.Music.path = function (file) {
  return GAME.Music.base + file;
};

/** Mute mi? (hedef basamak) */
GAME.Music.isMuted = function () {
  return (GAME.Music.volume || 0) <= 0.001;
};

/** Fade iptal + element sesini GAME.Music.volume ile hizala (muted flag dahil) */
GAME.Music.applyVolumeToAudio = function () {
  const a = GAME.Music.audio;
  if (!a) return;
  const v = Math.max(0, Math.min(1, Number(GAME.Music.volume) || 0));
  a.volume = v;
  a.muted = v <= 0.001;
};

GAME.Music.clearFade = function () {
  if (GAME.Music._fadeTimer) {
    clearInterval(GAME.Music._fadeTimer);
    GAME.Music._fadeTimer = null;
  }
  GAME.Music.fading = false;
};

/** Ayarlardan ses basamağını oku (sayfa açılışı / yeni oyun) */
GAME.Music.loadVolumeFromSettings = function () {
  if (typeof GAME.loadSettings !== 'function') return;
  try {
    const s = GAME.loadSettings();
    let step = s.volStep;
    if (step == null && s.volume != null) {
      const v = Number(s.volume);
      if (v <= 0.001) step = 0;
      else if (v <= 0.5) step = 1;
      else step = 2;
    }
    if (step == null || step < 0 || step >= GAME.Music.VOL_STEPS.length) return;
    GAME.Music.volStep = step | 0;
    GAME.Music.volume = GAME.Music.VOL_STEPS[GAME.Music.volStep];
    GAME.Music.applyVolumeToAudio();
  } catch (e) { /* ignore */ }
};

/** Ses tercihini keSettings_oyungrok içine yaz */
GAME.Music.persistVolume = function () {
  if (typeof GAME.loadSettings !== 'function' || typeof GAME.saveSettings !== 'function') return;
  try {
    const s = GAME.loadSettings();
    s.volStep = GAME.Music.volStep;
    s.volume = GAME.Music.volume;
    GAME.saveSettings(s);
  } catch (e) { /* ignore */ }
};

GAME.Music.ensureAudio = function () {
  if (GAME.Music.audio) return GAME.Music.audio;
  const a = new Audio();
  a.preload = 'auto';
  a.volume = Math.max(0, Math.min(1, Number(GAME.Music.volume) || 0));
  a.muted = GAME.Music.isMuted();
  a.addEventListener('ended', () => GAME.Music.onTrackEnded());
  a.addEventListener('error', () => {
    console.warn('Müzik yüklenemedi:', a.src);
  });
  GAME.Music.audio = a;
  return a;
};

GAME.Music.unlock = function () {
  if (GAME.Music.unlocked) return;
  GAME.Music.unlocked = true;
  const a = GAME.Music.ensureAudio();
  // Kısa sessiz play (autoplay policy). Bitince ASLA eski "prev" ile üzerine yazma —
  // kullanıcı mute etmiş olabilir; her zaman güncel GAME.Music.volume uygula.
  const wasMuted = a.muted;
  a.muted = true;
  a.volume = 0;
  const finish = () => {
    try { a.pause(); } catch (e) { /* ignore */ }
    GAME.Music.applyVolumeToAudio();
    if (!wasMuted && !GAME.Music.isMuted()) {
      /* keep paused until startNormal / onGameStart */
    }
  };
  const p = a.play();
  if (p && p.then) {
    p.then(finish).catch(finish);
  } else {
    finish();
  }
};

GAME.Music.fadeTo = function (targetVol, ms, done) {
  const a = GAME.Music.ensureAudio();
  GAME.Music.clearFade();
  // Kullanıcı mute'ysa hedefi 0'a kilitle (async unlock / eski fade yarışı)
  let target = Math.max(0, Math.min(1, Number(targetVol) || 0));
  if (GAME.Music.isMuted()) target = 0;
  GAME.Music.fading = true;
  const start = a.muted ? 0 : a.volume;
  a.muted = false; // fade sırasında element volume kullan
  if (target <= 0.001) {
    // Sessize inerken muted en sonda
  }
  const steps = Math.max(8, Math.floor(ms / 40));
  let i = 0;
  GAME.Music._fadeTimer = setInterval(() => {
    i++;
    // Fade sırasında mute basılırsa hemen kes
    if (GAME.Music.isMuted()) {
      GAME.Music.clearFade();
      GAME.Music.applyVolumeToAudio();
      if (done) done();
      return;
    }
    const t = i / steps;
    a.volume = Math.max(0, Math.min(1, start + (target - start) * t));
    if (i >= steps) {
      GAME.Music.clearFade();
      if (GAME.Music.isMuted()) {
        GAME.Music.applyVolumeToAudio();
      } else {
        a.volume = target;
        a.muted = target <= 0.001;
      }
      if (done) done();
    }
  }, ms / steps);
};

GAME.Music.playFile = function (file, opts) {
  opts = opts || {};
  const a = GAME.Music.ensureAudio();
  const vol = opts.volume !== undefined ? opts.volume : GAME.Music.volume;
  const muted = (vol || 0) <= 0.001 || GAME.Music.isMuted();
  GAME.Music.clearFade();
  try { a.pause(); } catch (e) { /* ignore */ }
  a.src = GAME.Music.path(file);
  a.currentTime = 0;

  if (muted) {
    a.volume = 0;
    a.muted = true;
    // Track hazır olsun (loop/ended); ses yok
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
    return;
  }

  a.muted = false;
  a.volume = opts.fadeIn ? 0 : vol;
  const p = a.play();
  if (p && p.catch) p.catch(err => console.warn('Müzik play engellendi:', err && err.message));
  if (opts.fadeIn && vol > 0.001) {
    GAME.Music.fadeTo(vol, opts.fadeInMs || 400);
  }
};

GAME.Music.startNormal = function () {
  if (!GAME.Music.unlocked) GAME.Music.unlock();
  GAME.Music.mode = 'normal';
  GAME.Music.crisisIndex = 0;
  GAME.Music.playFile(GAME.Music.normalTrack, { fadeIn: true, fadeInMs: 500 });
  GAME.Music.updateButtons();
};

GAME.Music.onDisaster = function () {
  if (!GAME.Music.unlocked) GAME.Music.unlock();
  const a = GAME.Music.ensureAudio();
  GAME.Music.mode = 'crisis';
  GAME.Music.crisisIndex = 0;
  const startCrisis = () => {
    try { a.pause(); } catch (e) { /* ignore */ }
    GAME.Music.playFile(GAME.Music.crisisPlaylist[0], { fadeIn: true, fadeInMs: 600 });
  };
  if (a.paused || !a.src || a.volume < 0.01 || a.muted || GAME.Music.isMuted()) {
    startCrisis();
    return;
  }
  GAME.Music.fadeTo(0, 1000, startCrisis);
};

GAME.Music.onTrackEnded = function () {
  if (GAME.Music.mode === 'normal') {
    GAME.Music.playFile(GAME.Music.normalTrack);
    return;
  }
  if (GAME.Music.mode === 'crisis') {
    const list = GAME.Music.crisisPlaylist;
    GAME.Music.crisisIndex = (GAME.Music.crisisIndex + 1) % list.length;
    GAME.Music.playFile(list[GAME.Music.crisisIndex], { fadeIn: true, fadeInMs: 400 });
  }
};

GAME.Music.stop = function (fadeMs) {
  const a = GAME.Music.audio;
  if (!a) return;
  if (fadeMs && fadeMs > 0 && !GAME.Music.isMuted()) {
    GAME.Music.fadeTo(0, fadeMs, () => { try { a.pause(); } catch (e) { /* ignore */ } });
  } else {
    GAME.Music.clearFade();
    try { a.pause(); } catch (e) { /* ignore */ }
    GAME.Music.applyVolumeToAudio();
  }
  GAME.Music.mode = 'idle';
};

/** mute → %40 → %100 → mute … */
GAME.Music.cycleVolume = function () {
  if (!GAME.Music.unlocked) GAME.Music.unlock();
  GAME.Music.volStep = (GAME.Music.volStep + 1) % GAME.Music.VOL_STEPS.length;
  GAME.Music.volume = GAME.Music.VOL_STEPS[GAME.Music.volStep];
  GAME.Music.clearFade();
  const a = GAME.Music.ensureAudio();
  GAME.Music.applyVolumeToAudio();
  GAME.Music.persistVolume();
  // Mute'dan çıkınca ve durmuşsa çalmayı dene
  if (!GAME.Music.isMuted() && a.paused && a.src && GAME.Music.mode !== 'idle') {
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  }
  GAME.Music.updateButtons();
};

GAME.Music.buttonLabel = function () {
  const v = GAME.Music.volume;
  if (v <= 0.001) return '🔇';
  if (v <= 0.5) return '🔉 40%';
  return '🔊 100%';
};

GAME.Music.buttonTitle = function () {
  const v = GAME.Music.volume;
  const t = (k) => (GAME.t ? GAME.t(k) : k);
  if (v <= 0.001) return t('ui.music_title_0');
  if (v <= 0.5) return t('ui.music_title_40');
  return t('ui.music_title_100');
};

GAME.Music.updateButtons = function () {
  const label = GAME.Music.buttonLabel();
  const title = GAME.Music.buttonTitle();
  ['btn-music', 'm-btn-music'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = label;
    el.title = title;
    el.setAttribute('aria-label', title);
  });
};

GAME.Music.bindUnlockOnce = function () {
  if (GAME.Music._bound) return;
  GAME.Music._bound = true;
  const unlock = () => {
    GAME.Music.unlock();
    if (GAME.state && !GAME.state.gameOver) {
      if (GAME.state.disaster) {
        if (GAME.Music.mode !== 'crisis') GAME.Music.onDisaster();
      } else if (GAME.Music.mode === 'idle' || GAME.Music.mode === 'normal') {
        if (GAME.Music.mode === 'idle') GAME.Music.startNormal();
      }
    }
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => {
    document.addEventListener(ev, unlock, { once: true, capture: true });
  });
};

GAME.Music.onGameStart = function () {
  // Ayarlardan (mute dahil) yeniden oku — yeni oyun eski tercihi ezmesin
  GAME.Music.loadVolumeFromSettings();
  GAME.Music.unlock();
  if (GAME.Music.volStep === undefined || GAME.Music.volume === undefined) {
    GAME.Music.volStep = 1;
    GAME.Music.volume = 0.4;
  }
  GAME.Music.clearFade();
  GAME.Music.applyVolumeToAudio();
  if (GAME.state && GAME.state.disaster) {
    GAME.Music.mode = 'crisis';
    GAME.Music.crisisIndex = 0;
    GAME.Music.playFile(GAME.Music.crisisPlaylist[0], { fadeIn: true, fadeInMs: 500 });
  } else {
    GAME.Music.startNormal();
  }
  // Unlock async bitince de mute kalsın
  setTimeout(() => GAME.Music.applyVolumeToAudio(), 0);
  setTimeout(() => GAME.Music.applyVolumeToAudio(), 100);
  GAME.Music.updateButtons();
};

GAME.Music.bindButtons = function () {
  const handler = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    GAME.Music.cycleVolume();
  };
  const d = document.getElementById('btn-music');
  const m = document.getElementById('m-btn-music');
  if (d && !d._musicBound) { d._musicBound = true; d.onclick = handler; }
  if (m && !m._musicBound) { m._musicBound = true; m.onclick = handler; }
  GAME.Music.updateButtons();
};
