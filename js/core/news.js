/* ============ KÜRESEL ETKİ — Mesaj ve Haber Üretim Sistemi ============ */
window.GAME = window.GAME || {};

/* Mesaj kategorileri: eko | diplo | global | ic | proje | risk | ai | felaket
   Metinler lang paketlerinden uygulanır (i18n.applyDataStrings). */
GAME.NEWS_CATS = {
  eko:    'Ekonomik Haberler',
  diplo:  'Diplomatik Mesajlar',
  global: 'Küresel Etkiler',
  ic:     'İç Olaylar',
  gri:    'Casusluk / Gri Alan',
  benim:  'Beni Etkileyenler'
};

/* Küresel endeks haber gövdeleri — i18n globalBody ile ezilir */
GAME.GLOBAL_BODY = [
  'Tedarik zincirleri yeniden fiyatlanıyor.',
  'İthalatçı ve ihracatçı ülkeler asimetrik etkileniyor.',
  'Merkez bankaları ve bakanlıklar brifing üstüne brifing veriyor.',
  'Vadeli piyasalar volatilite primi istiyor.',
  'Jeopolitik risk primi fiyatlara yansıyor.'
];

/* Mesaj ekle */
GAME.pushNews = function (msg) {
  const s = GAME.state;
  msg.turn = s.turn;
  msg.date = GAME.turnDate(s.turn);
  msg.id = s.news.length;
  s.news.push(msg);
  return msg;
};

/* ---- Diplomatik tepki şablonları (tona göre) — çeşitlilik hedefi 80+ toplam şablon ---- */
GAME.DIPLO_TEMPLATES = {
  1: [
    '"{actor}\'nin bu adımını anlayışla ve memnuniyetle karşılıyoruz. Koordineli hareket etmeye hazırız."',
    '"Bu cesur kararı destekliyoruz. {actor} ile işbirliğimizi derinleştireceğiz."',
    '"{actor}\'nin hamlesi ortak çıkarlarımıza hizmet ediyor. Yanındayız."',
    '"Ortak bir geleceğe katkı sağlayan bu politikayı takdir ediyoruz."',
    '"{actor} ile diyalog kanallarımız her zamankinden açık. Bu adım umut verici."',
    '"Bölgesel istikrara hizmet eden bir hamle; el ele ilerleyebiliriz."',
    '"Ticaret ve yatırım ortaklığımız bu kararla güçlenecek."',
    '"Samimi bir jest. Karşılıklı fayda ilkesiyle ilerlemeye hazırız."'
  ],
  2: [
    '"Bu kararı not ettik. {actor} ile işbirliği fırsatlarına açığız."',
    '"{actor}\'nin adımını olumlu değerlendiriyoruz."',
    '"Yapıcı bir adım. Gelişmeleri memnuniyetle izliyoruz."',
    '"İlk izlenimimiz olumlu; detayları birlikte çalışmak isteriz."',
    '"Bu yönelimin sürdürülebilir olmasını umuyoruz."',
    '"Ortak komitelerimiz bu dosyayı önceliklendirebilir."',
    '"Piyasalar da bu sinyali olumlu okuyor; biz de temkinli iyimseriz."',
    '"Teknik düzeyde diyaloga her zaman açığız."'
  ],
  3: [
    '"Durumu değerlendiriyoruz. {actor}\'nin adımlarını yakından izliyoruz."',
    '"{actor}\'nin kararının etkilerini analiz ediyoruz."',
    '"Bu aşamada bir yorumumuz yok; gelişmeleri takip ediyoruz."',
    '"Resmi bir tutum için veri ve zaman gerekiyor."',
    '"Ne destek ne karşıtlık: gözlem modundayız."',
    '"Ulusal çıkarlarımız ışığında dosyayı inceliyoruz."',
    '"Bekle-gör yaklaşımını tercih ediyoruz."',
    '"Diplomatik kanallar açıktır; aceleci yorumdan kaçınıyoruz."'
  ],
  4: [
    '"Bu kararı endişeyle karşılıyoruz. {actor}\'yi yeniden düşünmeye davet ediyoruz."',
    '"{actor}\'nin bu adımı ikili ilişkilerimizi olumsuz etkileyebilir. Durumu yakından takip edeceğiz."',
    '"Bu politika bölgesel dengeler açısından kaygı vericidir."',
    '"Karşılıklılık ilkesi unutulmamalı; misilleme seçenekleri masadadır."',
    '"Ticaret ortaklarımızın zarar görmesini istemeyiz; geri adım bekliyoruz."',
    '"Uluslararası normlara aykırı yönelimler kabul edilemez."',
    '"Bu adım güven ortamını zedeliyor. Acil istişare talep ediyoruz."',
    '"Piyasalar zaten fiyatlamaya başladı; siyasi maliyet yükselecektir."'
  ],
  5: [
    '"{actor}\'nin bu düşmanca ve tek taraflı adımı kabul edilemez. Gerekli misilleme önlemlerini alacağız."',
    '"Bu açık bir ekonomik saldırıdır. {actor} bunun bedelini ödeyecektir."',
    '"{actor} ateşle oynuyor. Cevabımız sert olacak."',
    '"Tüm ekonomik ve diplomatik araçlarımızı devreye alıyoruz."',
    '"Bu eylemi egemenliğimize yönelik bir saldırı sayıyoruz."',
    '"Uluslararası toplum {actor}\'nin sorumsuzluğunu görecektir."',
    '"Kırmızı çizgiler aşıldı. Artık diyalog değil, savunma zamanı."',
    '"Misilleme paketi hazırlanıyor; piyasalara net mesaj gidecektir."'
  ]
};

/* Ekonomik haber başlık/gövde varyantları */
GAME.ECON_TITLE = {
  up: [
    '{name}: {meta} yükseldi',
    '{name} — {meta} artışı',
    '{name}\'de {meta} tırmanışı',
    'Veri: {name} {meta} yukarı',
    '{name} ekonomisinde {meta} baskısı artıyor'
  ],
  down: [
    '{name}: {meta} düştü',
    '{name} — {meta} gerilemesi',
    '{name}\'de {meta} yumuşadı',
    'Veri: {name} {meta} aşağı',
    '{name} ekonomisinde {meta} gevşemesi'
  ]
};
GAME.ECON_BODY = {
  up: [
    '{meta} {prev}{unit} → {cur}{unit}. Analistler kısa vadeli baskının sürebileceğini belirtiyor.',
    '{meta} {prev}{unit} seviyesinden {cur}{unit} seviyesine çıktı. Piyasalar tepki veriyor.',
    'Son çeyrekte {meta} {prev}{unit} iken şimdi {cur}{unit}. Zincirleme etkiler izleniyor.',
    '{meta} artışı ({prev}{unit} → {cur}{unit}) hanehalkı ve firmaları zorluyor.',
    'Resmi veriler {meta} göstergesini {prev}{unit} → {cur}{unit} gösterdi.'
  ],
  down: [
    '{meta} {prev}{unit} → {cur}{unit}. Gevşeme sinyali mi, yoksa geçici mi tartışılıyor.',
    '{meta} {prev}{unit} seviyesinden {cur}{unit} seviyesine geriledi.',
    'Son çeyrekte {meta} {prev}{unit} iken şimdi {cur}{unit}.',
    '{meta} düşüşü ({prev}{unit} → {cur}{unit}) politika yapıcıları rahatlattı.',
    'Resmi veriler {meta} göstergesini {prev}{unit} → {cur}{unit} gösterdi.'
  ]
};

GAME.GLOBAL_TITLE = {
  up: [
    '{name} endeksi yükseliyor',
    'Küresel {name}: sert artış',
    '{name} piyasalarında tansiyon',
    '{name} endeksi rekor bölgede',
    'Dünya {name} fiyatında sıçrama'
  ],
  down: [
    '{name} endeksi geriliyor',
    'Küresel {name}: geri çekilme',
    '{name} piyasalarında sakinleşme',
    '{name} endeksi baskı altında',
    'Dünya {name} fiyatında düşüş'
  ]
};

GAME.RISK_TEMPLATES = {
  reserves: [
    { t: 'Döviz rezervi kritik seviyede', b: 'Rezervler {v} milyar dolara düştü. Kur savunma kapasitemiz tükenmek üzere.' },
    { t: 'Rezerv erimesi alarmı', b: 'Merkez bankası rezervi {v} mlr$. Spekülatif baskı artabilir.' },
    { t: 'Likidite kalkanı inceliyor', b: 'Yalnızca {v} mlr$ rezerv kaldı. Acil önlem penceresi daralıyor.' }
  ],
  inflation: [
    { t: 'Enflasyon kontrolden çıkıyor', b: 'Yıllık enflasyon %{v}. Toplumsal tepki büyüyor.' },
    { t: 'Fiyat istikrarı bozuldu', b: 'Enflasyon %{v} ile politika hedefinin çok üzerinde.' },
    { t: 'Hiper-risk bölgesi', b: '%{v} enflasyon hanehalkı satın alma gücünü eritiyor.' }
  ],
  stability: [
    { t: 'İstikrar alarm veriyor', b: 'İstikrar skoru {v}. Büyük çaplı toplumsal olaylar kapıda olabilir.' },
    { t: 'Toplumsal gerilim tırmanıyor', b: 'İstikrar {v}/100. Yönetim manevra alanı daralıyor.' },
    { t: 'Kırılgan denge', b: 'İstikrar göstergesi {v}. Küçük bir şok büyük dalgalanma yaratabilir.' }
  ],
  debt: [
    { t: 'Borç sürdürülemez seviyede', b: 'Kamu borcu GDP\'nin %{v}\'ine ulaştı. Borçlanma maliyeti hızla artıyor.' },
    { t: 'Mali alan tükeniyor', b: 'Borç/GDP %{v}. Piyasalar risk primi istiyor.' },
    { t: 'Borç dinamiği bozuldu', b: '%{v} borç yükü faiz ve büyüme dengesini tehdit ediyor.' }
  ],
  polCap: [
    { t: 'Siyasi sermaye tükeniyor', b: 'Hükümetin manevra alanı daralıyor. Yeni müdahaleler için toplumsal destek gerekiyor.' },
    { t: 'Politika yorgunluğu', b: 'Siyasi sermaye düşük ({v}). Cesur reformlar pahalı hale geldi.' },
    { t: 'Meclis ve sokak baskısı', b: 'Sermaye skoru {v}. Her yeni adım siyasi maliyet üretiyor.' }
  ]
};

/* ---- Oyuncu (veya AI) eylemine diplomatik tepkiler üret ---- */
GAME.generateReactions = function (actorCid, ins, target, out) {
  const s = GAME.state;
  const actorName = GAME.COUNTRIES[actorCid].name;
  const severity = ins.targeted ? (ins.layer >= 3 ? 70 : 55) : (ins.layer === 1 ? 15 : 30);
  const observers = Object.keys(s.countries).filter(c => c !== actorCid);
  const speakers = [];
  if (target && target !== actorCid) speakers.push(target);
  observers.filter(o => o !== target)
    .sort((a, b) => Math.abs(GAME.getRelation(b, actorCid)) - Math.abs(GAME.getRelation(a, actorCid)))
    .slice(0, GAME.randInt(1, 3))
    .forEach(o => speakers.push(o));

  speakers.forEach(obs => {
    const selfImpact = (obs === target) ? 60 : (GAME.COUNTRIES[obs].tradeLinks[actorCid] || 0) * 200;
    const tone = GAME.calcTone(obs, actorCid, severity, selfImpact);
    GAME.toneFeedback(obs, actorCid, tone);
    const tmpl = GAME.pick(GAME.DIPLO_TEMPLATES[tone]).replace(/{actor}/g, actorName);
    const titles = [
      GAME.COUNTRIES[obs].name + ' — ' + ins.name + ' hakkında',
      GAME.COUNTRIES[obs].name + ' dışişleri: ' + ins.name,
      GAME.COUNTRIES[obs].flag + ' resmi tepki: ' + ins.name,
      GAME.COUNTRIES[obs].name + ' basına brifing verdi'
    ];
    out.push(GAME.pushNews({
      cat: 'diplo', tone: tone, source: GAME.COUNTRIES[obs].flag + ' ' + GAME.COUNTRIES[obs].name,
      title: GAME.pick(titles),
      body: tmpl,
      effect: (obs === target) ? ('İlişki: ' + GAME.sign(Math.round(ins.onTarget && ins.onTarget.rel || -10)) + ' puan') : null,
      involves: [actorCid, obs],
      important: tone === 5 || obs === target
    }));
  });
};

/* ---- Ekonomik değişim haberleri ---- */
GAME.generateEconNews = function (out) {
  const s = GAME.state;
  for (const cid in s.countries) {
    const c = s.countries[cid];
    const name = GAME.COUNTRIES[cid].name, flag = GAME.COUNTRIES[cid].flag;
    const h = c.history;
    const chk = (k, thr) => {
      const arr = h[k]; if (!arr || arr.length < 2) return;
      const d = c.ind[k] - arr[arr.length - 1];
      if (Math.abs(d) < thr) return;
      const meta = GAME.IND_META[k];
      const dir = d > 0 ? 'up' : 'down';
      const fill = (str) => str
        .replace(/\{name\}/g, name)
        .replace(/\{meta\}/g, meta.name)
        .replace(/\{prev\}/g, GAME.fmt(arr[arr.length - 1], meta.dec))
        .replace(/\{cur\}/g, GAME.fmt(c.ind[k], meta.dec))
        .replace(/\{unit\}/g, meta.unit);
      out.push(GAME.pushNews({
        cat: 'eko', tone: 0, source: flag + ' ' + name,
        title: fill(GAME.pick(GAME.ECON_TITLE[dir])),
        body: fill(GAME.pick(GAME.ECON_BODY[dir])),
        effect: (d > 0 ? '+' : '') + GAME.fmt(d, meta.dec) + meta.unit,
        involves: [cid],
        important: cid === s.player && Math.abs(d) >= thr * 2
      }));
    };
    const me = cid === s.player;
    chk('inflation', me ? 1.5 : 4);
    chk('growth', me ? 0.8 : 2);
    chk('currency', me ? 4 : 9);
    if (me) { chk('unemployment', 0.8); chk('reserves', 30); }
  }

  const gnames = GAME.GLOBALS_INIT;
  for (const k in s.globals) {
    const arr = s.gHistory[k]; if (!arr || arr.length < 2) continue;
    const prev = arr[arr.length - 1], cur = s.globals[k], d = cur - prev;
    if (Math.abs(d) < 5) continue;
    const dir = d > 0 ? 'up' : 'down';
    const nm = gnames[k].name;
    out.push(GAME.pushNews({
      cat: 'global', tone: 0, source: '🌍 Küresel',
      title: GAME.pick(GAME.GLOBAL_TITLE[dir]).replace(/\{name\}/g, nm),
      body: nm + ': ' + GAME.fmt(prev, 0) + ' → ' + GAME.fmt(cur, 0) + ' (' + (d > 0 ? '+' : '') + GAME.fmt(d, 0) + '). ' +
        GAME.pick(GAME.GLOBAL_BODY || [
          'Tedarik zincirleri yeniden fiyatlanıyor.',
          'İthalatçı ve ihracatçı ülkeler asimetrik etkileniyor.',
          'Merkez bankaları ve bakanlıklar brifing üstüne brifing veriyor.',
          'Vadeli piyasalar volatilite primi istiyor.',
          'Jeopolitik risk primi fiyatlara yansıyor.'
        ]),
      involves: [], important: Math.abs(d) >= 10
    }));
  }
};

/* ---- Risk uyarıları (oyuncuya) ---- */
GAME.generateRiskWarnings = function (out) {
  const s = GAME.state, c = GAME.pc();
  const warn = (pack, v) => {
    const t = GAME.pick(pack);
    out.push(GAME.pushNews({
      cat: 'ic', tone: 4, source: '⚠ Danışma Kurulu',
      title: t.t,
      body: t.b.replace(/\{v\}/g, v),
      involves: [s.player], important: true
    }));
  };
  if (c.ind.reserves < 50) warn(GAME.RISK_TEMPLATES.reserves, GAME.fmt(c.ind.reserves, 0));
  if (c.ind.inflation > 50) warn(GAME.RISK_TEMPLATES.inflation, GAME.fmt(c.ind.inflation, 0));
  if (c.internal.stability < 30) warn(GAME.RISK_TEMPLATES.stability, GAME.fmt(c.internal.stability, 0));
  if (c.ind.debt > 150) warn(GAME.RISK_TEMPLATES.debt, GAME.fmt(c.ind.debt, 0));
  if (c.internal.polCap < 15) warn(GAME.RISK_TEMPLATES.polCap, GAME.fmt(c.internal.polCap, 0));
};

/* ---- İç olay haberleri (çoklu varyant) ---- */
GAME.EVENT_TEXTS = {
  grev: [
    { t: 'Grev dalgası başladı', b: 'Sendikalar ücret ve iş güvencesi talepleriyle üretimi durdurdu. Sanayi üretimi geriliyor.' },
    { t: 'Fabrikalarda iş bırakma', b: 'Metal ve lojistik sektöründe grevler yayıldı. İhracat siparişleri aksıyor.' },
    { t: 'Sendika eylemi büyüyor', b: 'Genel grev çağrıları yükseliyor; hükümet arabuluculuğa zorlanıyor.' }
  ],
  protesto: [
    { t: 'Sokak protestoları', b: 'Ekonomik koşullara tepki gösteren gruplar sokaklara döküldü.' },
    { t: 'Meydanlarda gerginlik', b: 'Fiyat artışları ve işsizlik protestolara dönüştü.' },
    { t: 'Sivil toplum sokağa indi', b: 'Barışçıl yürüyüşler bazı kentlerde çatışmaya dönüştü.' }
  ],
  buyuk_protesto: [
    { t: 'Büyük protesto dalgası', b: 'On binlerce kişi hükümetin ekonomi politikalarını protesto ediyor. Olaylar büyüyor.' },
    { t: 'Ulusal çapta eylem günü', b: 'Başkent ve büyükşehirlerde kitlesel gösteriler. Ulaşım felç.' },
    { t: 'İstifa çağrıları yükseldi', b: 'Kalabalıklar hükümeti istifaya davet ediyor; güvenlik güçleri alarma geçti.' }
  ],
  secim_baskisi: [
    { t: 'Seçim baskısı artıyor', b: 'Düşen onay oranları hükümetin manevra alanını daraltıyor. Muhalefet erken seçim istiyor.' },
    { t: 'Sandık tartışması', b: 'Anketler iktidarı geride gösteriyor; koalisyon görüşmeleri speküle ediliyor.' },
    { t: 'Parlamentoda kriz', b: 'Güven oylaması söylentileri ekonomi politikasını gölgeliyor.' }
  ],
  hukumet_degisti: [
    { t: 'HÜKÜMET DEĞİŞTİ', b: 'Toplumsal tepki sandığa yansıdı; yeni bir hükümet kuruldu. Politika belirsizliği arttı.' },
    { t: 'İktidar el değiştirdi', b: 'Yeni kabine yemin etti. Piyasalar "bekle-gör" modunda.' },
    { t: 'Yönetim devri tamam', b: 'Eski ekip gitti; reform vaatleri ve belirsizlik bir arada.' }
  ],
  otoriter_sikilasma: [
    { t: 'Otoriter sıkılaştırma', b: 'Yönetim, artan istikrarsızlığa olağanüstü yetkilerle yanıt verdi. Sokaklar sessiz ama gerilim sürüyor.' },
    { t: 'Olağanüstü yetkiler', b: 'Medya ve sivil alan daraltıldı; "istikrar" gerekçesi öne çıkarıldı.' },
    { t: 'Sıkıyönetim sinyalleri', b: 'Güvenlik aygıtı genişletildi; sermaye kaçışı endişesi var.' }
  ]
};
GAME.generateEventNews = function (events, out) {
  const s = GAME.state;
  events.forEach(e => {
    const pack = GAME.EVENT_TEXTS[e.ev]; if (!pack) return;
    const txt = Array.isArray(pack) ? GAME.pick(pack) : pack;
    const cn = GAME.COUNTRIES[e.cid];
    out.push(GAME.pushNews({
      cat: 'ic', tone: e.ev === 'hukumet_degisti' ? 5 : 4,
      source: cn.flag + ' ' + cn.name,
      title: cn.name + ': ' + txt.t, body: txt.b,
      involves: [e.cid], important: e.cid === s.player
    }));
  });
};

/* ---- Proje haberleri ---- */
GAME.PROJECT_DONE = [
  'Uzun vadeli stratejik proje tamamlandı. Kalıcı yapısal etkiler devreye giriyor.',
  'Proje bitti: miras sistemi güncellendi. Rakipler pozisyon almak zorunda.',
  'Tamamlanan altyapı/politika paketi ülkenin küresel ağırlığını değiştirebilir.',
  'Stratejik hedefe ulaşıldı. Piyasalar "yeni normal" fiyatlamasına geçiyor.'
];
GAME.PROJECT_PROG = [
  'Proje planlanan şekilde ilerliyor.',
  'Kilometre taşı geçildi; bütçe ve zaman çizelgesi yakından izleniyor.',
  'Saha ekipleri ve bürokrasi uyumlu çalışıyor; gecikme riski düşük.',
  'Uluslararası ortaklar süreci dikkatle takip ediyor.'
];
GAME.generateProjectNews = function (projEvents, out) {
  projEvents.forEach(p => {
    const cn = GAME.COUNTRIES[p.cid];
    out.push(GAME.pushNews({
      cat: p.done ? 'global' : 'eko', tone: p.done ? 2 : 0,
      source: cn.flag + ' ' + cn.name,
      title: p.done
        ? GAME.pick([
          cn.name + ': "' + p.insName + '" TAMAMLANDI',
          cn.name + ' stratejik projeyi bitirdi: ' + p.insName,
          'Miras: ' + cn.name + ' — ' + p.insName
        ])
        : GAME.pick([
          cn.name + ': ' + p.insName + ' %' + p.pct + ' seviyesinde',
          cn.name + ' projesi ilerliyor (%' + p.pct + '): ' + p.insName,
          'Güncelleme — ' + p.insName + ' @ %' + p.pct
        ]),
      body: p.done ? GAME.pick(GAME.PROJECT_DONE) : GAME.pick(GAME.PROJECT_PROG),
      involves: [p.cid], important: p.done
    }));
  });
};

/* ---- Gri alan tespit haberi ---- */
GAME.DETECTION_TITLES = [
  'İFŞA: {an}\'nin gizli operasyonu ortaya çıktı',
  'SKANDAL: {an} örtülü ekonomik operasyonda yakalandı',
  'Sızıntı: {an} — "{ins}" dosyası sızdırıldı',
  'Uluslararası baskı: {an} gri alan operasyonu ifşa'
];
GAME.DETECTION_BODIES = [
  '"{ins}" operasyonu {by} tarafından belgelendi. Uluslararası tepki büyük.',
  'Kanıtlar {by} eliyle yayımlandı. "{ins}" artık inkâr edilemez.',
  '"{ins}" dosyası sızdı; {by} brifing verdi. Misilleme sinyalleri geliyor.',
  'Diplomatik kriz: "{ins}" operasyonu ifşa oldu. Piyasalar panik alımı yapıyor.'
];
GAME.generateDetectionNews = function (actorCid, ins, target, out) {
  const an = GAME.COUNTRIES[actorCid], tn = target ? GAME.COUNTRIES[target] : null;
  const by = tn ? tn.name + ' istihbaratı' : 'uluslararası basın';
  const fill = (s) => s.replace(/\{an\}/g, an.name).replace(/\{ins\}/g, ins.name).replace(/\{by\}/g, by);
  out.push(GAME.pushNews({
    cat: 'gri', tone: 5,
    source: tn ? (tn.flag + ' ' + tn.name) : '🌍 Küresel',
    title: fill(GAME.pick(GAME.DETECTION_TITLES)),
    body: fill(GAME.pick(GAME.DETECTION_BODIES)),
    effect: 'İlişkiler çöktü, misilleme başlıyor',
    involves: [actorCid, target].filter(Boolean), important: true
  }));
};

/* ---- Felaket sürüyor haberleri ---- */
GAME.DISASTER_FLAVOR = {
  volcano: [
    'Kül bulutu hava koridorlarını kapalı tutuyor; kargo uçuşları deniz yoluna kayıyor.',
    'Tarım kuşaklarında rekolte kaybı derinleşiyor.',
    'Sigorta primleri felaket bölgelerinde üçe katlandı.',
    'Turizm gelirleri çökerken alternatif destinasyonlar doldu.'
  ],
  suez: [
    'Afrika çevresi rotası liman kapasitelerini zorluyor.',
    'Orta Koridor ve Kuzey Yolu\'na ilgi rekor kırıyor.',
    'Konteyner navlunu kriz öncesinin katına çıktı.',
    'Avrupa-Asya tedarik sözleşmeleri yeniden yazılıyor.'
  ],
  megahurricane: [
    'Sigorta şirketleri hasar taleplerini karşılayamıyor.',
    'ABD\'de yeniden inşa maliyetleri bütçeyi zorluyor.',
    'Enerji altyapısı onarımı aylar sürecek.',
    'İç göç dalgası emlak ve işgücü piyasalarını sarsıyor.'
  ],
  china_quake: [
    'Çip stokları eriyor; otomotiv üreticileri hat durduruyor.',
    '"Çin+1" stratejisi yönetim kurullarının ana gündemi.',
    'Batarya ve yarı iletken fiyatları sert yükseldi.',
    'Acil ithalat lisansları ve stok seferberliği başladı.'
  ],
  tsunami: [
    'Doğu Asya limanları kademeli olarak yeniden açılıyor.',
    'Çip fiyatlarındaki artış elektronik talebini soğutuyor.',
    'Bölgesel üretim kayması Güneydoğu Asya\'ya kayıyor.',
    'Sigorta ve lojistik maliyetleri hâlâ kriz seviyelerinde.'
  ],
  summit_attack: [
    'Liderlik boşluğu küresel kurumları felç etti.',
    'Piyasalar her açıklamada sert dalgalanıyor.',
    'İttifak toplantıları iptal veya erteleme yağmuru.',
    'Güvenlik harcamaları bütçelerde tavan yaptı.'
  ],
  oil_depletion: [
    'Enerji karneleri gündemde; sanayi elektrik kesintilerine hazırlanıyor.',
    'Nükleer ve yenilenebilir yatırım başvuruları rekor kırdı.',
    'Petrodolar tartışması merkez bankası toplantılarının ana maddesi.',
    'Ulaşım ve gıda enflasyonu enerji şokunu hanehalkına yansıtıyor.'
  ],
  supernova: [
    'Şebeke onarımları yavaş ilerliyor; bölgesel kesintiler sürüyor.',
    'Analog yedek sistemlere talep patladı.',
    'Dijital ödeme kesintileri nakit kullanımını artırdı.',
    'Uydu ve internet omurgası kademeli toparlanıyor.'
  ],
  food_crisis: [
    'Tahıl ihracat yasakları domino etkisi yaratıyor.',
    'Gıda kuyrukları birçok başkentte günlük manzara haline geldi.',
    'Gübre ve tohum kıtlığı gelecek sezon rekoltesini tehdit ediyor.',
    'Acil gıda yardımı diplomasisinin sıcaklığı arttı.'
  ],
  brics_currency: [
    'Merkez bankaları rezerv kompozisyonlarını sessizce değiştiriyor.',
    'Yeni rezerv birimiyle ilk büyük enerji anlaşması imzalandı.',
    'Dolar cinsi borçlu ülkelerde refinansman paniği.',
    'Çok kutuplu finans mimarisi tartışması ana akıma oturdu.'
  ]
};
GAME.generateDisasterNews = function (out) {
  const s = GAME.state;
  if (!s.disaster) return;
  const dis = GAME.DISASTERS.find(d => d.id === s.disaster.id);
  const elapsed = s.turn - s.disaster.startTurn;
  if (elapsed <= dis.duration && Math.random() < 0.7) {
    const titles = [
      'Felaketin etkileri sürüyor (' + elapsed + '. çeyrek)',
      dis.name + ' — ' + elapsed + '. çeyrek güncellemesi',
      'Kriz günlüğü: ' + dis.name,
      'Hâlâ sarsıntıda: ' + dis.icon + ' küresel ekonomi'
    ];
    out.push(GAME.pushNews({
      cat: 'global', tone: 4, source: dis.icon + ' ' + dis.name,
      title: GAME.pick(titles),
      body: GAME.pick(GAME.DISASTER_FLAVOR[dis.id] || ['Küresel ekonomi şokun etkisi altında.']),
      involves: [], important: false
    }));
  }
};

/* Şablon sayısı (test / debug) */
GAME.countNewsTemplates = function () {
  let n = 0;
  const walk = (x) => {
    if (typeof x === 'string') { n++; return; }
    if (Array.isArray(x)) { x.forEach(walk); return; }
    if (x && typeof x === 'object') {
      if (x.t && x.b) { n += 2; return; }
      Object.keys(x).forEach(k => walk(x[k]));
    }
  };
  [GAME.DIPLO_TEMPLATES, GAME.ECON_TITLE, GAME.ECON_BODY, GAME.GLOBAL_TITLE,
    GAME.RISK_TEMPLATES, GAME.EVENT_TEXTS, GAME.PROJECT_DONE, GAME.PROJECT_PROG,
    GAME.DETECTION_TITLES, GAME.DETECTION_BODIES, GAME.DISASTER_FLAVOR].forEach(walk);
  return n;
};
