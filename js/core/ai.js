/* ============ KÜRESEL ETKİ — AI Ülke Karar Sistemi v3 ============ */
/* Skor tabanlı aday üretimi: öz-bakım + felaket tepkisi + oyuncu/AI misilleme
   + diplomatik yumuşama + stratejik projeler + emtia silahları.
   Aynı motor GAME.aiPlan(oyuncu) ile "Yardım / Danışma Kurulu" önerilerini de üretir. */
window.GAME = window.GAME || {};

/* Ülke profiline uygun uzun vadeli proje tercihleri */
GAME.AI_PROJECT_PREFS = {
  USA: ['tech_standards', 'capital_markets', 'space_deepsea', 'ip_regime', 'rd_policy'],
  CHN: ['infra_corridor', 'cbdc', 'alt_finance', 'reserve_currency', 'rd_policy'],
  EU:  ['brussels_effect', 'ip_regime', 'capital_markets', 'rd_policy'],
  JPN: ['tech_standards', 'capital_markets', 'ip_regime', 'rd_policy'],
  IND: ['infra_corridor', 'edu_export', 'tech_standards', 'rd_policy'],
  GBR: ['capital_markets', 'ip_regime', 'edu_export', 'tech_standards'],
  RUS: ['alt_finance', 'eez_expansion', 'reserve_currency'],
  CAN: ['capital_markets', 'eez_expansion', 'edu_export'],
  BRA: ['eez_expansion', 'edu_export', 'capital_markets'],
  KOR: ['tech_standards', 'rd_policy', 'ip_regime', 'capital_markets'],
  AUS: ['eez_expansion', 'capital_markets', 'edu_export'],
  MEX: ['infra_corridor', 'edu_export', 'capital_markets'],
  IDN: ['infra_corridor', 'eez_expansion', 'edu_export'],
  SAU: ['capital_markets', 'infra_corridor', 'alt_finance'],
  TUR: ['infra_corridor', 'edu_export', 'eez_expansion', 'rd_policy'],
  CHE: ['capital_markets', 'ip_regime', 'brussels_effect'],
  ZAF: ['eez_expansion', 'edu_export', 'infra_corridor']
};

/* Eylem şiddeti (misilleme eşiği) — oyuncu ve AI karşılıklı */
GAME.PLAYER_ACT_SEVERITY = {
  secondary_sanctions: 3, asset_freeze: 4, chokepoint: 3, food_weapon: 3, energy_weapon: 3,
  service_ban: 2, migration_weapon: 2, rating_pressure: 2, patent_revoke: 2,
  anti_dumping: 1, debt_trap: 1, cert_weapon: 1, lawfare: 1, tariff: 1,
  espionage: 2, disinfo: 3, ngo_use: 2, corruption_net: 2, insurgency_finance: 4
};

/* ---- Aday eylem listesi üret (skorlu + gerekçeli) ---- */
GAME.aiPlan = function (cid) {
  const s = GAME.state, c = s.countries[cid], def = GAME.COUNTRIES[cid], p = def.personality;
  const ind = c.ind, base = def.ind, ins = c.instruments;
  const cands = [];
  const add = (score, insId, val, target, title, body, tone, important, why) => {
    if (score <= 0) return;
    const d = GAME.INSTRUMENTS_BY_ID[insId];
    if (!d || !ins[insId]) return;
    if (ins[insId].val === val) return;
    // Slider/numerical hedef değer aralık kontrolü
    if (d.min !== undefined && val < d.min) val = d.min;
    if (d.max !== undefined && val > d.max) val = d.max;
    cands.push({ score, insId, val, target, title, body, tone, important, why });
  };

  const inflGap = ind.inflation - base.inflation;
  const growthGap = ind.growth - base.growth;
  const curGap = 100 - ind.currency;
  const unempGap = ind.unemployment - base.unemployment;
  const resRatio = ind.reserves / Math.max(1, base.reserves);
  const stab = c.internal.stability;
  const rate = ins.policy_rate.val;
  const ps = ins.public_spending.val;
  const tax = ins.tax_rate.val;
  const qe = ins.qe ? ins.qe.val : 0;
  const baseTax = def.rates.tax_rate || 25;
  const basePs = def.rates.public_spending || 6;
  const baseRate = def.rates.policy_rate || 4;

  /* ===== 1. ÖZ-BAKIM ===== */
  // Enflasyon → faiz artışı
  if (inflGap > 2.5 && rate < 55) {
    const hike = GAME.clamp(Math.round(inflGap / 3), 1, 5);
    add(inflGap * 1.1 + Math.max(0, curGap) * 0.15 - Math.max(0, -growthGap - 2),
      'policy_rate', Math.min(58, rate + hike), null,
      def.name + " faizi %" + GAME.fmt(rate, 1) + "'den %" + GAME.fmt(rate + hike, 1) + "'e çıkardı",
      'Merkez bankası artan enflasyona sıkılaştırmayla yanıt verdi.', null, false,
      'Enflasyon %' + GAME.fmt(ind.inflation, 1) + ' — tabanın ' + GAME.fmt(inflGap, 1) + ' puan üzerinde. Faiz artışı enflasyonu ve kur baskısını düşürür.');
  }
  // Yüksek enflasyon + QE açıksa QE'yi kıs
  if (inflGap > 3 && qe > 0) {
    add(inflGap * 0.8, 'qe', Math.max(0, qe - 2), null,
      def.name + ' miktarsal gevşemeyi yavaşlattı', 'Enflasyon baskısı nedeniyle bilanço genişlemesi frenlendi.', null, false,
      'QE enflasyonu besliyor. Likidite musluğunu kısmak fiyat istikrarı için gerekli.');
  }
  // Fiyat kontrolleri: hiperenflasyon / kriz istikrarı
  if (inflGap > 8 && stab < 55 && ins.price_controls.val < 50) {
    add(inflGap * 0.35 + (50 - stab) * 0.08, 'price_controls', Math.min(80, ins.price_controls.val + 40), null,
      def.name + ' temel mallarda fiyat tavanı getirdi', 'Toplumsal öfkeyi bastırmak için acil fiyat kontrolü.', null, false,
      'Enflasyon %' + GAME.fmt(ind.inflation, 1) + ' ve istikrar kırılgan. Kısa vadede enflasyonu ve öfkeyi bastırır; orta vadede kıtlık riski.');
  }
  // Gevşeme: enflasyon sakinken
  if (inflGap < 1 && growthGap < -1 && rate > baseRate - 0.5) {
    add(-growthGap * 1.1 + 0.5, 'policy_rate', Math.max(0.5, rate - 1.5), null,
      def.name + ' faiz indirimine gitti', 'Zayıflayan ekonomiyi desteklemek için para politikası gevşetildi.', null, false,
      'Enflasyon kontrol altında ama büyüme zayıf. Faiz indirimi krediyi ucuzlatır.');
  }
  // Resesyonda QE (gelişmiş / düşük enflasyon)
  if (growthGap < -1.5 && inflGap < 2 && ind.debt > 80 && qe < 12 && p.patience > 0.35) {
    add(-growthGap * 0.7, 'qe', Math.min(15, qe + 3), null,
      def.name + ' miktarsal gevşeme programı başlattı', 'Merkez bankası varlık alımlarıyla likidite enjekte ediyor.', null, false,
      'Klasik faiz alanının daraldığı ortamda QE büyümeyi destekler; enflasyon ve kur riski taşır.');
  }
  // Maliye teşvik
  if (growthGap < -1.2 && ind.debt < 150) {
    add(-growthGap * 1.0 + (unempGap > 1 ? 0.8 : 0) - (ind.debt > 110 ? 1 : 0),
      'public_spending', Math.min(18, ps + 2), null,
      def.name + ' teşvik paketi açıkladı', 'Kamu harcamaları daralan ekonomiye karşı artırılıyor.', null, false,
      'Büyüme zayıf. Kamu harcaması istihdamı destekler; bedeli borç.');
  }
  // Vergi indirimi (resesyon, borç makul)
  if (growthGap < -1.5 && ind.debt < 100 && tax > baseTax - 5) {
    add(-growthGap * 0.55, 'tax_rate', Math.max(10, tax - 2), null,
      def.name + ' vergi indirimine gitti', 'Özel sektörü canlandırmak için vergi yükü hafifletildi.', null, false,
      'Vergi indirimi talebi ve yatırımı destekler; bütçe açığı riski artar.');
  }
  // Kemer sıkma
  if (ind.debt > 160 && ps > 3) {
    add((ind.debt - 160) * 0.06 + 1, 'public_spending', ps - 2, null,
      def.name + ' kemer sıkmaya geçti', 'Yükselen borç yükü nedeniyle kamu harcamaları kısılıyor.', null, false,
      'Borç %' + GAME.fmt(ind.debt, 0) + ' GDP. Harcama kısmak borç dinamiğini frenler.');
  }
  if (ind.debt > 170 && tax < 45) {
    add((ind.debt - 170) * 0.05 + 0.8, 'tax_rate', Math.min(48, tax + 2), null,
      def.name + ' mali konsolidasyon için vergi artırdı', 'Borç sürdürülebilirliği için gelirler güçlendiriliyor.', null, false,
      'Yüksek borçta vergi artışı bütçeyi onarır; büyüme ve onay bedeli vardır.');
  }
  // Kur savunması
  if (curGap > 8 && resRatio > 0.5) {
    add(curGap * 0.7, 'fx_intervention', Math.min(120, ins.fx_intervention.val + 25), null,
      def.name + ' döviz piyasasına müdahale etti', 'Merkez bankası rezerv satarak kuru savunuyor.', null, false,
      'Para birimi %' + GAME.fmt(curGap, 1) + ' değer kaybetti. Müdahale kuru toparlar, rezerv eritir.');
  }
  if (curGap > 12 && ins.capital_controls.val < 70) {
    add(curGap * 0.45 + (1 - p.diplomacy) * 1.5, 'capital_controls',
      Math.min(100, ins.capital_controls.val + 30), null,
      def.name + ' sermaye kontrollerini sıkılaştırdı', 'Sıcak para çıkışına karşı yeni tedbirler devrede.', null, false,
      'Kur kaybı derin. Sermaye kontrolü çıkışı frenler; yatırım yavaşlar.');
  }
  if (curGap > 10 && def.gov === 'otoriter' && ins.shadow_fx.val === 0) {
    add(curGap * 0.35 * p.opportunism, 'shadow_fx', 1, null, null, null, null, false,
      'Gölge müdahale resmi istatistiklere yansımadan kuru destekler — tespit riski taşır.');
  }
  // Jawboning: ucuz kur/algı desteği
  if (curGap > 5 && curGap < 15 && ins.jawboning.val < 60) {
    add(curGap * 0.25 + 0.5, 'jawboning', Math.min(80, ins.jawboning.val + 30), null,
      def.name + ' piyasalara güvence mesajı verdi', 'Üst düzey açıklamalarla kur ve risk algısı yönetiliyor.', null, false,
      'Ucuz ve hızlı: jawboning kısa ömürlü kur desteği sağlar.');
  }
  // Rezerv koruması
  if (resRatio < 0.35) {
    if (ins.fx_intervention.val > 0) add(4, 'fx_intervention', 0, null,
      def.name + ' kur savunmasını durdurdu', 'Rezervlerin erimesi üzerine döviz müdahalesine son verildi.', null, false,
      'Rezervler kritik. Savunmayı sürdürmek rezervi tüketir.');
    if (ins.shadow_fx.val > 0) add(3.5, 'shadow_fx', 0, null, null, null, null, false,
      'Gölge döviz müdahalesi rezerv yakıyor. Kapat.');
    if (rate < 40) add(2.5, 'policy_rate', Math.min(58, rate + 2), null,
      def.name + ' rezerv kaybını frenlemek için faiz artırdı', null, null, false,
      'Yüksek getiri sermaye çıkışını yavaşlatır.');
  }
  // İstihdam
  if (unempGap > 1.2) {
    add(unempGap * 0.7, 'subsidy', Math.min(100, ins.subsidy.val + 25), null,
      def.name + ' istihdam için sübvansiyonları artırdı', null, null, false,
      'İşsizlik yüksek. Sübvansiyon istihdamı destekler; bütçe yükü artar.');
    if (ins.export_credit.val < 50 && ind.trade < 30)
      add(unempGap * 0.4, 'export_credit', Math.min(80, ins.export_credit.val + 30), null,
        def.name + ' ihracat kredi paketini genişletti', 'Exim tipi desteklerle dış talep çekiliyor.', null, false,
        'İhracat kredisi ticaret dengesini ve büyümeyi destekler.');
  }
  // İstikrar
  if (stab < 45) {
    add((50 - stab) * 0.1, 'strategic_stock', 80, null,
      def.name + ' stratejik stokları güçlendirdi', 'Toplumsal gerilime karşı gıda ve enerji güvenliği önlemleri.', null, false,
      'Yüksek stok gıda fiyatlarını sakinleştirir.');
    add((48 - stab) * 0.09, 'subsidy', Math.min(100, ins.subsidy.val + 20), null, null, null, null, false,
      'Sübvansiyon kısa vadeli rahatlama sağlar.');
  }
  // Ulusal şampiyon: ihracatçı / iş dünyası baskısı, sakin dönem
  if (growthGap > -1 && ind.trade > 20 && ins.national_champion.val === 0 && p.patience > 0.4 && Math.random() < 0.08) {
    add(1.4, 'national_champion', 1, null,
      def.name + ' ulusal şampiyon birleşmelerine yeşil ışık yaktı', 'Yerli devlerin küresel rekabeti hedefleniyor.', null, false,
      'Ölçek ekonomisi ve ihracat gücü artar; enflasyon ve tekel riski vardır.');
  }
  // Ar-Ge politikası
  if (growthGap > -1 && stab > 50 && ins.rd_policy.val < 40 && p.patience > 0.55 && Math.random() < 0.1) {
    add(1.2 + p.patience, 'rd_policy', 55, null,
      def.name + ' stratejik Ar-Ge programını güçlendirdi', 'Uzun vadeli verimlilik ve teknoloji kapasitesi hedefleniyor.', null, false,
      'Ar-Ge yatırımı yavaş ama kalıcı büyüme üretir.');
  }

  /* ===== 2. FELAKETE ÖZEL SAVUNMA ===== */
  const dis = s.disaster ? GAME.DISASTERS.find(d => d.id === s.disaster.id) : null;
  if (dis) {
    if (['food_crisis', 'volcano', 'suez'].indexOf(dis.id) >= 0 && ins.strategic_stock.val < 70)
      add(3, 'strategic_stock', 85, null, def.name + ' kriz stoklarını "Yüksek" seviyeye çekti', null, null, false,
        '"' + dis.name + '" arz zincirlerini vuruyor. Stok felakette 1.4× etkili.');
    if (['china_quake', 'tsunami', 'supernova'].indexOf(dis.id) >= 0 && ins.subsidy.val < 60)
      add(2.2, 'subsidy', Math.min(100, ins.subsidy.val + 30), null,
        def.name + ' sanayiye kriz desteği açıkladı', null, null, false,
        'Üretim zincirleri sarsılıyor. Sübvansiyon işsizlik dalgasını hafifletir.');
    if (dis.id === 'oil_depletion') {
      if (ps < 12) add(2.4, 'public_spending', ps + 2, null,
        def.name + ' enerji dönüşümü için harcamaları artırdı', null, null, false,
        'Petrol şoku kalıcı. Kamu yatırımı dönüşümü hızlandırır.');
      // Enerji ihracatçısı fırsatçılığı
      if (def.deps.oil < -0.3 && ins.energy_weapon.val === 0 && p.opportunism > 0.5) {
        const foes = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) < -40 && (GAME.COUNTRIES[o].deps.oil || 0) > 0.3);
        if (foes.length) add(2.0 + p.opportunism, 'energy_weapon', 1, GAME.pick(foes),
          def.name + ' enerji ihracatını silahlaştırdı', 'Petrol/gaz kısıtı ile jeopolitik baskı.', 5, true,
          'Enerji kartı kriz döneminde en güçlü koz. Küresel petrol fiyatını da fırlatır.');
      }
    }
    if (dis.id === 'food_crisis' && def.deps.food < -0.3 && ins.food_weapon.val === 0 && p.opportunism > 0.45) {
      const foes = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) < -30);
      if (foes.length) add(1.8 + p.opportunism, 'food_weapon', 1, GAME.pick(foes),
        def.name + ' gıda ihracatını kısıtladı', 'Küresel gıda krizinde arz silahı devrede.', 5, true,
        'Gıda ihracatçısı avantajı: hedefte enflasyon ve istikrarsızlık.');
    }
    if (dis.id === 'brics_currency' && cid !== 'USA' && ['CHN', 'RUS', 'IND', 'BRA', 'ZAF', 'SAU'].indexOf(cid) >= 0) {
      if (ins.alt_finance.val === 0 && p.patience > 0.5)
        add(2.5, 'alt_finance', 1, null, def.name + ' alternatif ödeme altyapısını hızlandırdı', null, null, false,
          'Dolar sarsılırken SWIFT alternatifi stratejik fırsat.');
      if (ins.cbdc.val === 0 && cid === 'CHN')
        add(2.2, 'cbdc', 1, null, def.name + ' CBDC sınır ötesi pilotunu genişletti', null, null, false,
          'BRICS para şoku CBDC ile birleşince dolarsızlaşma hızlanır.');
    }
    if (dis.id === 'suez' && ins.infra_corridor.val === 0 && p.patience > 0.5)
      add(2.0, 'infra_corridor', 1, null,
        def.name + ' alternatif koridor projesini başlattı', 'Süveyş tıkanıklığına karşı lojistik diversifikasyon.', null, false,
        'Altyapı kuşağı navlun şokunda kalıcı avantaj yaratır.');
  }

  /* ===== 3. DİPLOMATİK / TİCARİ HAMLELER ===== */
  // Dostlara swap / yardım (yüksek diplomasi)
  if (p.diplomacy > 0.65 && Math.random() < 0.12) {
    const friends = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) > 80);
    if (friends.length && ins.currency_swap.val === 0) {
      const t = GAME.pick(friends);
      const tCur = 100 - s.countries[t].ind.currency;
      if (tCur > 5 || s.countries[t].ind.reserves < GAME.COUNTRIES[t].ind.reserves * 0.7) {
        add(1.6 + p.diplomacy, 'currency_swap', 1, t,
          def.name + ', ' + GAME.COUNTRIES[t].name + ' ile döviz swap hattı açtı',
          'Karşılıklı likidite desteği; ilişki ve piyasa güveni güçlenir.', 2, t === s.player,
          'Swap hattı müttefike rezerv/güven aşılarken senin nüfuzunu da artırır.');
      }
    }
  }
  if (p.diplomacy > 0.7 && ind.reserves > base.reserves * 0.8 && Math.random() < 0.06) {
    const needy = Object.keys(s.countries).filter(o => o !== cid &&
      GAME.getRelation(cid, o) > 20 && s.countries[o].internal.stability < 50);
    if (needy.length && ins.aid_diplomacy.val === 0) {
      const t = GAME.pick(needy);
      add(1.3 + p.diplomacy * 0.5, 'aid_diplomacy', 1, t,
        def.name + ', ' + GAME.COUNTRIES[t].name + "'e kalkınma yardımı paketi açıkladı",
        'Yumuşak güç diplomasisi: yardım karşılığında nüfuz.', 2, t === s.player);
    }
  }
  // İhracat kredisi (ihracat odaklı)
  if (ind.trade > 30 && growthGap < 0 && ins.export_credit.val < 45) {
    add(1.1 + Math.max(0, -growthGap) * 0.3, 'export_credit', 55, null,
      def.name + ' ihracat finansmanını güçlendirdi', null, null, false,
      'Exim desteği ticaret fazlasını ve büyümeyi besler.');
  }

  /* ===== 4. OYUNCU / DIŞ EYLEMLERE TEPKİ ===== */
  if (cid !== s.player) {
    const acts = s.interventionLog.filter(iv => iv.turn === s.turn);
    const pname = GAME.pdef().name;
    acts.forEach(iv => {
      const sev = GAME.PLAYER_ACT_SEVERITY[iv.insId] || 0;
      if (iv.target === cid && sev > 0 && iv.val > 0) {
        const rel = GAME.getRelation(cid, s.player);
        const bs = sev * 1.4 + p.aggression * 3 + (rel < -100 ? 1.5 : 0);
        if (sev >= 3 && p.aggression > 0.5 && ins.secondary_sanctions.val === 0)
          add(bs + 1, 'secondary_sanctions', 1, s.player,
            def.name + ', ' + pname + "'e misilleme yaptırımları başlattı",
            '"' + iv.name + '" kararına yanıt: karşı yaptırım paketi.', 5, true);
        else if (ins.tariff && ins.tariff.val < 40)
          add(bs * 0.9, 'tariff', Math.min(100, (ins.tariff.val || 0) + 50), s.player,
            def.name + ', ' + pname + ' mallarına gümrük duvarı ördü',
            '"' + iv.name + '" hamlesine tarife yanıtı.', 4, true);
        else if (ins.anti_dumping.val === 0)
          add(bs, 'anti_dumping', 1, s.player,
            def.name + ', ' + pname + ' mallarına misilleme vergisi koydu',
            '"' + iv.name + '" hamlesine ticari yanıt.', 4, true);
        if (sev >= 4 && def.gov === 'otoriter' && ins.asset_freeze.val === 0)
          add(bs + 1.5, 'asset_freeze', 1, s.player,
            def.name + ', ' + pname + ' varlıklarını dondurdu',
            'Karşılıklı varlık dondurma dönemi.', 5, true);
        // Enerji kartı misilleme
        if (sev >= 2 && def.deps.oil < -0.4 && ins.energy_weapon.val === 0 && p.aggression > 0.5)
          add(bs + 0.5, 'energy_weapon', 1, s.player,
            def.name + ' enerji musluğunu ' + pname + "'e karşı kıstı",
            'Misilleme: enerji silahı devrede.', 5, true);
      }
      if ((iv.insId === 'chokepoint' || iv.insId === 'food_weapon' || iv.insId === 'energy_weapon') &&
          iv.val > 0 && iv.target !== cid && ins.strategic_stock.val < 60)
        add(1.8 + p.patience, 'strategic_stock', 75, null,
          def.name + ' arz şokuna karşı stok artırdı',
          pname + "'in arz kısıtlamaları sonrası tedarik güvenliği.", 4);
      if ((iv.insId === 'subsidy' || iv.insId === 'export_credit') && iv.val >= 55 && ind.trade > 40) {
        if (ins.anti_dumping.val === 0)
          add(1.2 + p.aggression * 1.5, 'anti_dumping', 1, s.player,
            def.name + ', ' + pname + ' sübvansiyonlarına anti-damping ile yanıt verdi', null, 4, true);
        else if (ins.tariff.val < 40)
          add(1.1 + p.aggression, 'tariff', 55, s.player,
            def.name + ', ' + pname + ' mallarına dengeleyici tarife koydu', null, 4, true);
      }
      // Yardım / swap → olumlu not (AI nadiren taklit eder)
      if ((iv.insId === 'aid_diplomacy' || iv.insId === 'currency_swap') && iv.target === cid && iv.val > 0) {
        // Pasif kabul; ek eylem yok ama skor düşürme yok
      }
    });
  }

  /* ===== 5. STRATEJİK PROJELER ===== */
  const activeProj = GAME.INSTRUMENTS.filter(i =>
    i.project && ins[i.id] && ins[i.id].val > 0 && ins[i.id].progress !== null && ins[i.id].progress < 100).length;
  if (p.patience > 0.5 && growthGap > -1.5 && stab > 50 && activeProj < 2 && Math.random() < p.patience * 0.35) {
    const prefs = (GAME.AI_PROJECT_PREFS[cid] || []).filter(id => {
      if (!ins[id] || ins[id].val !== 0) return false;
      // rd_policy slider: val===0 kapalı say
      return true;
    });
    if (prefs.length) {
      const pj = prefs[0];
      const d = GAME.INSTRUMENTS_BY_ID[pj];
      const openVal = d.type === 'slider' ? 50 : 1;
      add(1.5 + p.patience * 1.5, pj, openVal, null,
        def.name + (d.project ? ' dev stratejik proje başlattı: ' : ' stratejik program açtı: ') + d.name,
        'Uzun vadeli yapısal hamle; etkileri yıllar içinde hissedilecek.', 3, false,
        '"' + d.name + '" ülke profiline uygun uzun vadeli hamle.');
    }
  }

  /* ===== 6. FIRSATÇI AGRESYON ===== */
  if (p.aggression > 0.55 && Math.random() < p.aggression * 0.18) {
    const enemies = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) < -110);
    if (enemies.length) {
      const t = GAME.pick(enemies);
      if (ins.secondary_sanctions.val === 0)
        add(1 + p.aggression * 2, 'secondary_sanctions', 1, t,
          def.name + ', ' + GAME.COUNTRIES[t].name + "'e ikincil yaptırımları devreye aldı",
          'Gerginlik tırmanıyor.', t === s.player ? 5 : 4, t === s.player,
          'Düşmanca ilişkide yaptırım rakibi zayıflatır; ticaret bedeli vardır.');
      else if (def.deps.oil < -0.4 && ins.energy_weapon.val === 0)
        add(1.2 + p.aggression, 'energy_weapon', 1, t,
          def.name + ' enerji silahını ' + GAME.COUNTRIES[t].name + "'e çevirdi", null,
          t === s.player ? 5 : 4, t === s.player);
      else if (ins.chokepoint.val === 0 && c.ind.influence > 55)
        add(1 + p.aggression, 'chokepoint', 1, t,
          def.name + ' kritik tedarikte kota uyguladı', null, t === s.player ? 5 : 4, t === s.player);
    }
  }
  if (p.opportunism > 0.6 && def.gov === 'otoriter' && Math.random() < 0.06) {
    const rivals = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) < -90);
    if (rivals.length && ins.disinfo.val === 0) add(1.3, 'disinfo', 1, GAME.pick(rivals), null, null);
  }
  if (p.opportunism > 0.65 && def.gov === 'otoriter' && Math.random() < 0.04) {
    const rivals = Object.keys(s.countries).filter(o => o !== cid && GAME.getRelation(cid, o) < -80);
    if (rivals.length && ins.espionage.val === 0) add(1.1, 'espionage', 1, GAME.pick(rivals), null, null);
  }

  return cands.sort((a, b) => b.score - a.score);
};

/* ---- AI eylemlerini seç + uygula, kayda yazılabilir script üret ---- */
GAME.recordAICountry = function (cid) {
  const s = GAME.state;
  if (cid === s.player) return { cid: cid, actions: [] };
  const c = s.countries[cid], def = GAME.COUNTRIES[cid];
  if (!c || !def) return { cid: cid, actions: [] };
  const crisis = c.internal.stability < 40 ||
    (c.ind.growth - def.ind.growth) < -3 || (100 - c.ind.currency) > 15;
  const maxActs = crisis ? 3 : 2;

  const cands = GAME.aiPlan(cid);
  const actions = [];
  const used = {};
  for (const cd of cands) {
    if (actions.length >= maxActs) break;
    if (used[cd.insId]) continue;
    if (cd.score < 1.2) break;
    const d = GAME.INSTRUMENTS_BY_ID[cd.insId];
    if (!d) continue;
    const cost = d.cost || 8;
    if (c.internal.polCap < cost) continue;
    const st = c.instruments[cd.insId];
    if (!st) continue;
    const oldVal = st.val;
    c.internal.polCap -= cost;
    GAME.applyInstrumentChange(cid, d, oldVal, cd.val, cd.target);
    used[cd.insId] = true;
    const tone = cd.tone || GAME.calcTone(s.player, cid, d.targeted ? 50 : 20, cd.target === s.player ? 70 : 5);
    actions.push({
      insId: cd.insId, oldVal: oldVal, newVal: cd.val, target: cd.target || null,
      cost: cost, title: cd.title || null, body: cd.body || '',
      tone: tone, important: !!(cd.important || cd.target === s.player),
      cat: d.risk >= 2 ? 'gri' : (d.targeted ? 'diplo' : 'eko')
    });
  }
  return { cid: cid, actions: actions };
};

/* Kaydedilmiş script satırını uygula (haber dahil) */
GAME.applyAIScriptEntry = function (entry) {
  const s = GAME.state;
  if (!entry || !entry.cid) return 0;
  const cid = entry.cid;
  if (cid === s.player) return 0;
  const c = s.countries[cid], def = GAME.COUNTRIES[cid];
  if (!c || !def) return 0;
  let done = 0;
  (entry.actions || []).forEach(act => {
    const d = GAME.INSTRUMENTS_BY_ID[act.insId];
    if (!d) return;
    const st = c.instruments[act.insId];
    if (!st) return;
    c.internal.polCap = Math.max(0, c.internal.polCap - (act.cost || d.cost || 8));
    GAME.applyInstrumentChange(cid, d, st.val, act.newVal, act.target);
    done++;
    if (act.title) {
      GAME.pushNews({
        cat: act.cat || 'eko', tone: act.tone || 3,
        source: def.flag + ' ' + def.name,
        title: act.title, body: act.body || '',
        involves: [cid, act.target].filter(Boolean),
        important: !!act.important
      });
    }
  });
  return done;
};

/* ---- Tek ülkenin turunu oynat (senkron / test) ---- */
GAME.runAICountry = function (cid) {
  const entry = GAME.recordAICountry(cid);
  // recordAICountry enstrümanı uyguladı; haberleri buradan bas
  const def = GAME.COUNTRIES[cid];
  if (!def) return (entry.actions || []).length;
  (entry.actions || []).forEach(act => {
    if (!act.title) return;
    // Aynı turda çift haber olmasın diye yalnızca senkron yolda bas
    GAME.pushNews({
      cat: act.cat || 'eko', tone: act.tone || 3,
      source: def.flag + ' ' + def.name,
      title: act.title, body: act.body || '',
      involves: [cid, act.target].filter(Boolean),
      important: !!act.important
    });
  });
  return (entry.actions || []).length;
};

/* Tüm AI script'ini sırayla üret (durumu değiştirir — çağıran geri almalı) */
GAME.buildAIScript = function () {
  const order = GAME.aiOrder();
  const script = [];
  order.forEach(cid => {
    const entry = GAME.recordAICountry(cid);
    // Haberleri script'e gömülü; canlı push yok (playback'te basılacak)
    // recordAICountry enstrümanları uyguladı — bu doğru (sıradaki AI bunu görsün)
    script.push(entry);
  });
  return { order: order, script: script };
};

GAME.runAI = function () {
  for (const cid in GAME.state.countries) GAME.runAICountry(cid);
};

GAME.cloneState = function (st) {
  return JSON.parse(JSON.stringify(st || GAME.state));
};

/* ---- Gri alan tespit kontrolü ---- */
GAME.checkDetection = function (out) {
  const s = GAME.state;
  const DETECT_CHANCE = { 1: 0.035, 2: 0.07, 3: 0.12 };
  for (const cid in s.countries) {
    const c = s.countries[cid];
    GAME.INSTRUMENTS.forEach(ins => {
      if (!ins.risk) return;
      const st = c.instruments[ins.id];
      if (!st || st.val <= 0) return;
      if (Math.random() < DETECT_CHANCE[ins.risk]) {
        st.val = 0; st.progress = null;
        const target = st.target;
        if (target) GAME.changeRelation(cid, target, -70);
        Object.keys(s.countries).forEach(o => { if (o !== cid && o !== target) GAME.changeRelation(cid, o, -15); });
        const avenger = target || GAME.pick(Object.keys(s.countries).filter(o => o !== cid));
        const av = s.countries[avenger];
        if (av && av.instruments.anti_dumping && av.instruments.anti_dumping.val === 0) {
          GAME.applyInstrumentChange(avenger, GAME.INSTRUMENTS_BY_ID.anti_dumping, 0, 1, cid);
        }
        GAME.addPulse(cid, 'influence', -5, 'imm', 'Tespit skandalı');
        GAME.addPulse(cid, 'approval', -4, 'short', 'Tespit skandalı');
        if (cid === s.player) { s.detectedOps++; s.retaliationDamage += 10; }
        GAME.generateDetectionNews(cid, ins, target, out);
      }
    });
  }
};
