/* ============ KÜRESEL ETKİ — Arka plan müziği ============ */
/*
  normal.mp3  → oyun başı / sakin dönem
  felaket.mp3 → felaket (normal 1 sn fade-out)
  sonra: diplomasi.mp3 → savas.mp3 → felaket… 

  Ses basamakları (buton): mute (0) → %40 → %100 → mute…
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

GAME.Music.ensureAudio = function () {
  if (GAME.Music.audio) return GAME.Music.audio;
  const a = new Audio();
  a.preload = 'auto';
  a.volume = GAME.Music.volume;
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
  const prev = a.volume;
  a.volume = 0;
  const p = a.play();
  if (p && p.then) {
    p.then(() => { a.pause(); a.volume = prev; }).catch(() => { a.volume = prev; });
  } else {
    try { a.pause(); } catch (e) { /* ignore */ }
    a.volume = prev;
  }
};

GAME.Music.fadeTo = function (targetVol, ms, done) {
  const a = GAME.Music.ensureAudio();
  if (GAME.Music._fadeTimer) {
    clearInterval(GAME.Music._fadeTimer);
    GAME.Music._fadeTimer = null;
  }
  GAME.Music.fading = true;
  const start = a.volume;
  const steps = Math.max(8, Math.floor(ms / 40));
  let i = 0;
  GAME.Music._fadeTimer = setInterval(() => {
    i++;
    const t = i / steps;
    a.volume = Math.max(0, Math.min(1, start + (targetVol - start) * t));
    if (i >= steps) {
      clearInterval(GAME.Music._fadeTimer);
      GAME.Music._fadeTimer = null;
      GAME.Music.fading = false;
      a.volume = targetVol;
      if (done) done();
    }
  }, ms / steps);
};

GAME.Music.playFile = function (file, opts) {
  opts = opts || {};
  const a = GAME.Music.ensureAudio();
  const vol = opts.volume !== undefined ? opts.volume : GAME.Music.volume;
  try { a.pause(); } catch (e) { /* ignore */ }
  a.src = GAME.Music.path(file);
  a.currentTime = 0;
  a.volume = opts.fadeIn ? 0 : vol;
  // mute basamağında çalma (sessiz tut)
  if (vol <= 0.001) {
    a.volume = 0;
    // yine de track hazır olsun; ended için play gerekir — sessiz play
  }
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
  if (a.paused || !a.src || a.volume < 0.01) {
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
  if (fadeMs && fadeMs > 0) {
    GAME.Music.fadeTo(0, fadeMs, () => { try { a.pause(); } catch (e) { /* ignore */ } });
  } else {
    try { a.pause(); } catch (e) { /* ignore */ }
  }
  GAME.Music.mode = 'idle';
};

/** mute → %40 → %100 → mute … */
GAME.Music.cycleVolume = function () {
  if (!GAME.Music.unlocked) GAME.Music.unlock();
  GAME.Music.volStep = (GAME.Music.volStep + 1) % GAME.Music.VOL_STEPS.length;
  GAME.Music.volume = GAME.Music.VOL_STEPS[GAME.Music.volStep];
  const a = GAME.Music.ensureAudio();
  // Fade ortasındaysa kes
  if (GAME.Music._fadeTimer) {
    clearInterval(GAME.Music._fadeTimer);
    GAME.Music._fadeTimer = null;
    GAME.Music.fading = false;
  }
  a.volume = GAME.Music.volume;
  // Mute'dan çıkınca ve durmuşsa çalmayı dene
  if (GAME.Music.volume > 0 && a.paused && a.src && GAME.Music.mode !== 'idle') {
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
  if (v <= 0.001) return 'Ses: kapalı — tıkla: %40';
  if (v <= 0.5) return 'Ses: %40 — tıkla: %100';
  return 'Ses: %100 — tıkla: sessiz';
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
  GAME.Music.unlock();
  // Başlangıç / varsayılan %40
  if (GAME.Music.volStep === undefined || GAME.Music.volume === undefined) {
    GAME.Music.volStep = 1;
    GAME.Music.volume = 0.4;
  }
  // İlk açılışta step 1 = %40 kalsın (kullanıcı değiştirdiyse koru)
  if (GAME.Music.audio) GAME.Music.audio.volume = GAME.Music.volume;
  if (GAME.state && GAME.state.disaster) {
    GAME.Music.mode = 'crisis';
    GAME.Music.crisisIndex = 0;
    GAME.Music.playFile(GAME.Music.crisisPlaylist[0], { fadeIn: true, fadeInMs: 500 });
  } else {
    GAME.Music.startNormal();
  }
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
