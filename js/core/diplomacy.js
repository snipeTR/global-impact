/* ============ KÜRESEL ETKİ — Diplomasi: İlişki Puanları ve Ton Sistemi ============ */
window.GAME = window.GAME || {};

/* İlişki değiştir (-200..+200) */
GAME.changeRelation = function (a, b, delta) {
  const s = GAME.state;
  if (!s.relations[a] || s.relations[a][b] === undefined) return;
  const v = GAME.clamp(s.relations[a][b] + delta, -200, 200);
  s.relations[a][b] = v;
  s.relations[b][a] = v;
};

GAME.getRelation = function (a, b) {
  const s = GAME.state;
  return (s.relations[a] && s.relations[a][b] !== undefined) ? s.relations[a][b] : 0;
};

/* Her tur ilişkiler nötre çok yavaş döner */
GAME.relationDrift = function () {
  const s = GAME.state;
  const ids = Object.keys(s.countries);
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const v = s.relations[ids[i]][ids[j]];
    const drift = -v * 0.005;
    s.relations[ids[i]][ids[j]] = v + drift;
    s.relations[ids[j]][ids[i]] = v + drift;
  }
};

/* ---- Ton hesabı ----
   severity: eylemin şiddeti 0..100 (agresif eylem = yüksek)
   selfImpact: eylem o ülkeyi ne kadar olumsuz etkiliyor 0..100
   Dönüş: 1 Dostane Olumlu | 2 Olumlu | 3 Nötr | 4 Olumsuz | 5 Düşmanca */
GAME.calcTone = function (observerCid, actorCid, severity, selfImpact) {
  const rel = GAME.getRelation(observerCid, actorCid);      // -200..200
  const pers = GAME.COUNTRIES[observerCid].personality;
  const persFactor = (pers.diplomacy - pers.aggression) * 20; // diplomatik ülke yumuşak konuşur
  let score = (rel / 200) * 40 * 0.4
            + (severity || 0) * -0.35
            + persFactor * 0.15
            + (selfImpact || 0) * -0.25
            + (GAME.state.disaster ? -3 : 0)
            + GAME.rand(-4, 4);
  if (score > 14) return 1;
  if (score > 5) return 2;
  if (score > -8) return 3;
  if (score > -20) return 4;
  return 5;
};

GAME.TONE_META = {
  1: { name: 'Dostane Olumlu', cls: 't1' },
  2: { name: 'Olumlu',         cls: 't2' },
  3: { name: 'Nötr',           cls: 't3' },
  4: { name: 'Olumsuz',        cls: 't4' },
  5: { name: 'Düşmanca',       cls: 't5' }
};

/* Ton mesajı sonrası ilişkiye küçük geri besleme (doc 7.7) */
GAME.toneFeedback = function (observerCid, actorCid, tone) {
  if (tone === 5) GAME.changeRelation(observerCid, actorCid, -6);
  else if (tone === 4) GAME.changeRelation(observerCid, actorCid, -3);
  else if (tone === 1) GAME.changeRelation(observerCid, actorCid, 4);
  else if (tone === 2) GAME.changeRelation(observerCid, actorCid, 2);
};

/* Harita rengi için ilişki sınıfı (oyuncuya göre) */
GAME.relationColor = function (rel) {
  if (rel > 80) return '#006400';
  if (rel > 30) return '#008000';
  if (rel > -30) return '#806000';
  if (rel > -90) return '#c05000';
  return '#c00000';
};
