/* ============ KÜRESEL ETKİ — Ülke Verileri (17 güç) ============ */
window.GAME = window.GAME || {};

/*
 Toplam 17 ülke (en güçlü bloklar). Avrupa Birliği tek varlık; İngiltere ayrı.
 Göstergeler: growth, inflation, unemployment, reserves (mlr$), debt (%GDP),
 currency (100=başlangıç), trade (çeyrek mlr$), influence (0-100)
 gov: demokratik | otoriter | hibrit | birlik
*/

GAME.COUNTRIES = {
  USA: {
    id:'USA', name:'ABD', flag:'🇺🇸', difficulty:'Zor', gov:'demokratik',
    desc:'Hegemonya ve rezerv para avantajı. Küresel etki yaratan müdahaleler için ideal; beklenti ve sorumluluk çok yüksek.',
    style:'Küresel etki yaratan müdahaleler',
    ind:{growth:2.0, inflation:2.5, unemployment:4.0, reserves:250, debt:125, currency:100, trade:-250, influence:98},
    internal:{approval:52, stability:68, polCap:70},
    rates:{policy_rate:4.0, tax_rate:27, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.6, diplomacy:0.6, opportunism:0.5, patience:0.4},
    deps:{oil:0.3, food:0.2, chip:0.5, dollar:-0.6, ship:0.3},
    groupPower:{business:0.30, labor:0.20, nationalist:0.15, liberal:0.20, rural:0.05, bureau:0.10},
    tradeLinks:{CHN:0.14, EU:0.12, JPN:0.07, MEX:0.08, CAN:0.09, GBR:0.05, KOR:0.04, IND:0.04, BRA:0.03}
  },
  CHN: {
    id:'CHN', name:'Çin', flag:'🇨🇳', difficulty:'Orta-Zor', gov:'otoriter',
    desc:'Devlet kontrolü yüksek, uzun vadeli planlama. Yapısal projeler ve tedarik zinciri silahlaştırması için güçlü.',
    style:'Yapısal projeler + tedarik zinciri',
    ind:{growth:4.5, inflation:1.5, unemployment:5.2, reserves:3200, debt:80, currency:100, trade:160, influence:90},
    internal:{approval:64, stability:74, polCap:80},
    rates:{policy_rate:3.0, tax_rate:25, public_spending:8, fx_intervention:0, qe:0},
    personality:{aggression:0.6, diplomacy:0.5, opportunism:0.7, patience:0.9},
    deps:{oil:0.5, food:0.4, chip:0.4, dollar:0.3, ship:0.5},
    groupPower:{business:0.20, labor:0.20, nationalist:0.25, liberal:0.05, rural:0.15, bureau:0.15},
    tradeLinks:{USA:0.15, EU:0.12, JPN:0.08, KOR:0.07, AUS:0.05, RUS:0.05, IND:0.04, BRA:0.04, IDN:0.03, SAU:0.03}
  },
  EU: {
    id:'EU', name:'Avrupa Birliği', flag:'🇪🇺', difficulty:'Orta', gov:'birlik',
    desc:'27 üyeli ekonomik dev. Brüksel etkisi, regülasyon ve ihracat gücü yüksek; enerji ve jeopolitik koordine karar yavaş.',
    style:'Regülasyon + ihracat + diplomasi',
    ind:{growth:1.2, inflation:2.2, unemployment:6.0, reserves:900, debt:85, currency:100, trade:95, influence:88},
    internal:{approval:54, stability:72, polCap:62},
    rates:{policy_rate:3.5, tax_rate:32, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.25, diplomacy:0.95, opportunism:0.3, patience:0.75},
    deps:{oil:0.65, food:0.25, chip:0.5, dollar:0.15, ship:0.55},
    groupPower:{business:0.26, labor:0.24, nationalist:0.12, liberal:0.22, rural:0.06, bureau:0.10},
    tradeLinks:{USA:0.12, CHN:0.11, GBR:0.08, JPN:0.04, TUR:0.04, RUS:0.03, IND:0.03, BRA:0.02, KOR:0.02, CHE:0.05}
  },
  JPN: {
    id:'JPN', name:'Japonya', flag:'🇯🇵', difficulty:'Orta', gov:'demokratik',
    desc:'Teknoloji ve finans gücü; yaşlanan nüfus ve dev kamu borcu. Standart dikte ve sermaye piyasaları ana silah.',
    style:'Teknoloji standartları + finans',
    ind:{growth:0.8, inflation:1.5, unemployment:2.6, reserves:1250, debt:260, currency:100, trade:15, influence:68},
    internal:{approval:50, stability:80, polCap:60},
    rates:{policy_rate:0.5, tax_rate:31, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.2, diplomacy:0.8, opportunism:0.4, patience:0.85},
    deps:{oil:0.85, food:0.6, chip:0.3, dollar:0.2, ship:0.7},
    groupPower:{business:0.30, labor:0.18, nationalist:0.14, liberal:0.18, rural:0.08, bureau:0.12},
    tradeLinks:{CHN:0.14, USA:0.12, EU:0.06, KOR:0.05, AUS:0.03, IDN:0.02, IND:0.02}
  },
  IND: {
    id:'IND', name:'Hindistan', flag:'🇮🇳', difficulty:'Orta', gov:'demokratik',
    desc:'Hızla yükselen dev iç pazar. Altyapı ve enerji açığı zayıf nokta; uzun vadeli reform ve demografi avantajı.',
    style:'Uzun vadeli yapısal reformlar',
    ind:{growth:6.5, inflation:5.0, unemployment:7.5, reserves:650, debt:85, currency:100, trade:-55, influence:58},
    internal:{approval:58, stability:62, polCap:70},
    rates:{policy_rate:6.0, tax_rate:28, public_spending:7, fx_intervention:0, qe:0},
    personality:{aggression:0.4, diplomacy:0.7, opportunism:0.6, patience:0.8},
    deps:{oil:0.8, food:0.15, chip:0.4, dollar:0.4, ship:0.4},
    groupPower:{business:0.22, labor:0.20, nationalist:0.20, liberal:0.12, rural:0.18, bureau:0.08},
    tradeLinks:{USA:0.08, CHN:0.08, EU:0.06, SAU:0.04, RUS:0.04, JPN:0.03, GBR:0.03, IDN:0.02}
  },
  GBR: {
    id:'GBR', name:'Birleşik Krallık', flag:'🇬🇧', difficulty:'Orta', gov:'demokratik',
    desc:'Finans merkezi ve soft power. Brexit sonrası AB ile rekabet; City of London ve Anglo-sakson ittifakı güçlü.',
    style:'Finans + diplomasi + soft power',
    ind:{growth:1.3, inflation:2.8, unemployment:4.2, reserves:180, debt:100, currency:100, trade:-25, influence:72},
    internal:{approval:48, stability:70, polCap:60},
    rates:{policy_rate:5.0, tax_rate:28, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.4, diplomacy:0.85, opportunism:0.5, patience:0.55},
    deps:{oil:0.25, food:0.35, chip:0.4, dollar:0.25, ship:0.4},
    groupPower:{business:0.30, labor:0.18, nationalist:0.16, liberal:0.20, rural:0.06, bureau:0.10},
    tradeLinks:{EU:0.14, USA:0.12, CHN:0.05, JPN:0.03, IND:0.03, CAN:0.03, AUS:0.02, CHE:0.03}
  },
  RUS: {
    id:'RUS', name:'Rusya', flag:'🇷🇺', difficulty:'Zor', gov:'otoriter',
    desc:'Enerji kartı güçlü ama yaptırımlara açık. Enerji silahı ve gri alan taktikleri; izolasyon riski yüksek.',
    style:'Enerji silahı + gri alan',
    ind:{growth:1.5, inflation:7.0, unemployment:4.5, reserves:550, debt:20, currency:100, trade:45, influence:62},
    internal:{approval:60, stability:66, polCap:75},
    rates:{policy_rate:12, tax_rate:20, public_spending:7, fx_intervention:0, qe:0},
    personality:{aggression:0.9, diplomacy:0.3, opportunism:0.8, patience:0.6},
    deps:{oil:-0.85, food:-0.25, chip:0.65, dollar:0.4, ship:0.2},
    groupPower:{business:0.18, labor:0.18, nationalist:0.30, liberal:0.04, rural:0.12, bureau:0.18},
    tradeLinks:{CHN:0.18, EU:0.08, TUR:0.06, IND:0.05, KOR:0.02, BRA:0.02, ZAF:0.01}
  },
  CAN: {
    id:'CAN', name:'Kanada', flag:'🇨🇦', difficulty:'Kolay-Orta', gov:'demokratik',
    desc:'Kaynak zengini, ABD\'ye sıkı bağlı. Emtia, enerji ve istikrarlı kurumlar; bağımsız jeopolitik manevra alanı dar.',
    style:'Emtia + istikrar + ABD ekseni',
    ind:{growth:1.8, inflation:2.4, unemployment:5.5, reserves:110, debt:105, currency:100, trade:8, influence:48},
    internal:{approval:55, stability:78, polCap:65},
    rates:{policy_rate:4.5, tax_rate:30, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.2, diplomacy:0.85, opportunism:0.35, patience:0.7},
    deps:{oil:-0.45, food:-0.35, chip:0.35, dollar:0.5, ship:0.3},
    groupPower:{business:0.26, labor:0.22, nationalist:0.10, liberal:0.24, rural:0.10, bureau:0.08},
    tradeLinks:{USA:0.45, CHN:0.08, EU:0.06, GBR:0.04, MEX:0.04, JPN:0.03}
  },
  BRA: {
    id:'BRA', name:'Brezilya', flag:'🇧🇷', difficulty:'Kolay-Orta', gov:'demokratik',
    desc:'Gıda ve maden devi. Emtia fiyatı ve stok yönetimiyle oynanır; siyasi dalgalanma riski.',
    style:'Emtia fiyatı manipülasyonu',
    ind:{growth:2.2, inflation:4.0, unemployment:8.0, reserves:350, debt:75, currency:100, trade:25, influence:42},
    internal:{approval:53, stability:60, polCap:65},
    rates:{policy_rate:10, tax_rate:33, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.3, diplomacy:0.6, opportunism:0.6, patience:0.5},
    deps:{oil:-0.25, food:-0.75, chip:0.3, dollar:0.4, ship:0.3},
    groupPower:{business:0.24, labor:0.22, nationalist:0.10, liberal:0.14, rural:0.22, bureau:0.08},
    tradeLinks:{CHN:0.16, USA:0.10, EU:0.08, MEX:0.03, IND:0.02}
  },
  KOR: {
    id:'KOR', name:'Güney Kore', flag:'🇰🇷', difficulty:'Orta', gov:'demokratik',
    desc:'Çip ve sanayi devi; jeopolitik sıkışma (ABD-Çin-Kuzey). Teknoloji standartları ve ihracat odaklı.',
    style:'Yarı iletken + ihracat',
    ind:{growth:2.4, inflation:2.2, unemployment:3.2, reserves:420, debt:55, currency:100, trade:35, influence:52},
    internal:{approval:50, stability:72, polCap:62},
    rates:{policy_rate:3.5, tax_rate:26, public_spending:5, fx_intervention:0, qe:0},
    personality:{aggression:0.35, diplomacy:0.7, opportunism:0.55, patience:0.65},
    deps:{oil:0.75, food:0.5, chip:-0.35, dollar:0.35, ship:0.55},
    groupPower:{business:0.32, labor:0.20, nationalist:0.14, liberal:0.16, rural:0.06, bureau:0.12},
    tradeLinks:{CHN:0.16, USA:0.12, JPN:0.07, EU:0.06, AUS:0.03, SAU:0.03, IDN:0.02}
  },
  AUS: {
    id:'AUS', name:'Avustralya', flag:'🇦🇺', difficulty:'Kolay-Orta', gov:'demokratik',
    desc:'Maden ve LNG ihracatçısı; Çin talebine bağımlı. AUKUS ve Anglo-sakson ittifakı jeopolitik omurga.',
    style:'Maden/LNG + müttefik ağı',
    ind:{growth:2.0, inflation:3.0, unemployment:4.0, reserves:60, debt:50, currency:100, trade:30, influence:44},
    internal:{approval:54, stability:76, polCap:65},
    rates:{policy_rate:4.0, tax_rate:28, public_spending:6, fx_intervention:0, qe:0},
    personality:{aggression:0.3, diplomacy:0.75, opportunism:0.45, patience:0.6},
    deps:{oil:0.2, food:-0.4, chip:0.35, dollar:0.35, ship:0.45},
    groupPower:{business:0.26, labor:0.20, nationalist:0.12, liberal:0.22, rural:0.12, bureau:0.08},
    tradeLinks:{CHN:0.22, JPN:0.08, KOR:0.06, USA:0.07, EU:0.05, IND:0.04, IDN:0.03}
  },
  MEX: {
    id:'MEX', name:'Meksika', flag:'🇲🇽', difficulty:'Orta', gov:'demokratik',
    desc:'ABD üretim hattı ve nearshoring kazananı. Enerji reformu ve iç güvenlik istikrarı kritik.',
    style:'Nearshoring + ABD ticareti',
    ind:{growth:2.5, inflation:4.5, unemployment:3.0, reserves:200, debt:50, currency:100, trade:15, influence:38},
    internal:{approval:50, stability:55, polCap:58},
    rates:{policy_rate:10, tax_rate:30, public_spending:5, fx_intervention:0, qe:0},
    personality:{aggression:0.3, diplomacy:0.55, opportunism:0.6, patience:0.45},
    deps:{oil:-0.2, food:0.2, chip:0.35, dollar:0.55, ship:0.3},
    groupPower:{business:0.26, labor:0.24, nationalist:0.14, liberal:0.14, rural:0.14, bureau:0.08},
    tradeLinks:{USA:0.50, CHN:0.08, EU:0.05, CAN:0.05, BRA:0.03, JPN:0.02}
  },
  IDN: {
    id:'IDN', name:'Endonezya', flag:'🇮🇩', difficulty:'Orta', gov:'demokratik',
    desc:'Güneydoğu Asya\'nın devi; nikel ve kritik mineraller. Genç nüfus, altyapı açığı ve emtia döngüsü.',
    style:'Kritik mineraller + demografik güç',
    ind:{growth:5.0, inflation:3.0, unemployment:5.5, reserves:140, debt:40, currency:100, trade:12, influence:40},
    internal:{approval:60, stability:64, polCap:68},
    rates:{policy_rate:6.0, tax_rate:22, public_spending:5, fx_intervention:0, qe:0},
    personality:{aggression:0.35, diplomacy:0.65, opportunism:0.55, patience:0.6},
    deps:{oil:0.15, food:0.2, chip:0.3, dollar:0.4, ship:0.4},
    groupPower:{business:0.22, labor:0.18, nationalist:0.18, liberal:0.12, rural:0.20, bureau:0.10},
    tradeLinks:{CHN:0.16, USA:0.06, JPN:0.07, EU:0.05, KOR:0.04, AUS:0.04, IND:0.03, SAU:0.03}
  },
  SAU: {
    id:'SAU', name:'Suudi Arabistan', flag:'🇸🇦', difficulty:'Orta', gov:'otoriter',
    desc:'Petrol süper gücü ve OPEC+ ağırlığı. Vizyon 2030 ile diversifikasyon; enerji silahı ve sermaye ihracı.',
    style:'Petrol kartı + egemen servet',
    ind:{growth:3.0, inflation:2.0, unemployment:5.0, reserves:450, debt:30, currency:100, trade:80, influence:55},
    internal:{approval:62, stability:70, polCap:78},
    rates:{policy_rate:5.5, tax_rate:15, public_spending:8, fx_intervention:0, qe:0},
    personality:{aggression:0.5, diplomacy:0.55, opportunism:0.7, patience:0.55},
    deps:{oil:-0.9, food:0.55, chip:0.35, dollar:0.5, ship:0.35},
    groupPower:{business:0.20, labor:0.12, nationalist:0.22, liberal:0.06, rural:0.10, bureau:0.30},
    tradeLinks:{CHN:0.14, USA:0.08, EU:0.08, IND:0.08, JPN:0.06, KOR:0.05, IDN:0.03}
  },
  TUR: {
    id:'TUR', name:'Türkiye', flag:'🇹🇷', difficulty:'Orta', gov:'hibrit',
    desc:'Bölgesel güç ve lojistik köprü; kronik enflasyon hassasiyeti. Dengeli diplomasi ve fırsatçı müdahaleler.',
    style:'Dengeli diplomasi + fırsatçılık',
    ind:{growth:3.5, inflation:35, unemployment:9.5, reserves:140, debt:35, currency:100, trade:-15, influence:46},
    internal:{approval:48, stability:56, polCap:60},
    rates:{policy_rate:35, tax_rate:25, public_spending:5, fx_intervention:0, qe:0},
    personality:{aggression:0.5, diplomacy:0.6, opportunism:0.8, patience:0.4},
    deps:{oil:0.7, food:0.3, chip:0.3, dollar:0.5, ship:0.4},
    groupPower:{business:0.22, labor:0.22, nationalist:0.22, liberal:0.14, rural:0.12, bureau:0.08},
    tradeLinks:{EU:0.14, RUS:0.08, CHN:0.06, USA:0.04, GBR:0.03, SAU:0.03, IND:0.02}
  },
  CHE: {
    id:'CHE', name:'İsviçre', flag:'🇨🇭', difficulty:'Orta', gov:'demokratik',
    desc:'Küresel finans ve pharma sığınağı. Tarafsızlık + bankacılık gücü; yaptırım ve gri finans baskısına açık.',
    style:'Finans sığınağı + yüksek katma değer',
    ind:{growth:1.4, inflation:1.5, unemployment:2.4, reserves:900, debt:40, currency:100, trade:40, influence:50},
    internal:{approval:62, stability:88, polCap:70},
    rates:{policy_rate:1.5, tax_rate:22, public_spending:4, fx_intervention:0, qe:0},
    personality:{aggression:0.1, diplomacy:0.9, opportunism:0.4, patience:0.85},
    deps:{oil:0.4, food:0.3, chip:0.3, dollar:0.2, ship:0.25},
    groupPower:{business:0.34, labor:0.16, nationalist:0.10, liberal:0.22, rural:0.08, bureau:0.10},
    tradeLinks:{EU:0.28, USA:0.10, CHN:0.06, GBR:0.05, JPN:0.03}
  },
  ZAF: {
    id:'ZAF', name:'Güney Afrika', flag:'🇿🇦', difficulty:'Orta', gov:'demokratik',
    desc:'Afrika\'nın en büyük sanayi ekonomisi ve BRICS üyesi. Maden ihracatı güçlü; enerji ve istikrar zayıf nokta.',
    style:'Maden + BRICS diplomasisi',
    ind:{growth:1.2, inflation:5.0, unemployment:32, reserves:55, debt:75, currency:100, trade:5, influence:36},
    internal:{approval:42, stability:48, polCap:55},
    rates:{policy_rate:8.0, tax_rate:28, public_spending:7, fx_intervention:0, qe:0},
    personality:{aggression:0.35, diplomacy:0.65, opportunism:0.55, patience:0.5},
    deps:{oil:0.45, food:0.15, chip:0.3, dollar:0.45, ship:0.35},
    groupPower:{business:0.22, labor:0.28, nationalist:0.14, liberal:0.14, rural:0.12, bureau:0.10},
    tradeLinks:{CHN:0.14, EU:0.10, USA:0.07, IND:0.05, GBR:0.04, BRA:0.03, RUS:0.02}
  }
};

/* İlişki matrisi (-200..+200). Eksik çiftler newGame'de 0 ile doldurulur. */
GAME.RELATIONS_INIT = [
  /* ABD ekseni */
  ['USA','CHN',-120], ['USA','EU', 130], ['USA','JPN', 150], ['USA','IND',  65],
  ['USA','GBR', 160], ['USA','RUS',-155], ['USA','CAN', 170], ['USA','BRA',  50],
  ['USA','KOR', 140], ['USA','AUS', 155], ['USA','MEX',  80], ['USA','IDN',  40],
  ['USA','SAU',  70], ['USA','TUR',  20], ['USA','CHE', 100], ['USA','ZAF',  45],
  /* Çin */
  ['CHN','EU',  25], ['CHN','JPN', -55], ['CHN','IND', -75], ['CHN','GBR', -20],
  ['CHN','RUS', 115], ['CHN','CAN',  20], ['CHN','BRA',  65], ['CHN','KOR',  15],
  ['CHN','AUS', -30], ['CHN','MEX',  25], ['CHN','IDN',  50], ['CHN','SAU',  55],
  ['CHN','TUR',  30], ['CHN','CHE',  20], ['CHN','ZAF',  55],
  /* AB */
  ['EU','JPN',  95], ['EU','IND',  55], ['EU','GBR',  40], ['EU','RUS',-120],
  ['EU','CAN', 100], ['EU','BRA',  45], ['EU','KOR',  70], ['EU','AUS',  85],
  ['EU','MEX',  40], ['EU','IDN',  30], ['EU','SAU',  20], ['EU','TUR',  15],
  ['EU','CHE', 140], ['EU','ZAF',  50],
  /* Japonya */
  ['JPN','IND',  70], ['JPN','GBR',  80], ['JPN','RUS', -70], ['JPN','CAN',  70],
  ['JPN','BRA',  30], ['JPN','KOR',  50], ['JPN','AUS', 100], ['JPN','MEX',  30],
  ['JPN','IDN',  55], ['JPN','SAU',  40], ['JPN','TUR',  25], ['JPN','CHE',  60],
  ['JPN','ZAF',  30],
  /* Hindistan */
  ['IND','GBR',  70], ['IND','RUS',  75], ['IND','CAN',  50], ['IND','BRA',  55],
  ['IND','KOR',  40], ['IND','AUS',  60], ['IND','MEX',  25], ['IND','IDN',  45],
  ['IND','SAU',  40], ['IND','TUR',  30], ['IND','CHE',  35], ['IND','ZAF',  60],
  /* BK */
  ['GBR','RUS',-100], ['GBR','CAN', 140], ['GBR','BRA',  45], ['GBR','KOR',  60],
  ['GBR','AUS', 145], ['GBR','MEX',  35], ['GBR','IDN',  35], ['GBR','SAU',  50],
  ['GBR','TUR',  40], ['GBR','CHE',  90], ['GBR','ZAF',  70],
  /* Rusya */
  ['RUS','CAN', -60], ['RUS','BRA',  35], ['RUS','KOR', -20], ['RUS','AUS', -50],
  ['RUS','MEX',   5], ['RUS','IDN',  25], ['RUS','SAU',  30], ['RUS','TUR',  45],
  ['RUS','CHE', -40], ['RUS','ZAF',  40],
  /* Kanada */
  ['CAN','BRA',  40], ['CAN','KOR',  50], ['CAN','AUS',  90], ['CAN','MEX',  70],
  ['CAN','IDN',  25], ['CAN','SAU',  30], ['CAN','TUR',  25], ['CAN','CHE',  70],
  ['CAN','ZAF',  40],
  /* Brezilya */
  ['BRA','KOR',  25], ['BRA','AUS',  30], ['BRA','MEX',  50], ['BRA','IDN',  30],
  ['BRA','SAU',  25], ['BRA','TUR',  20], ['BRA','CHE',  30], ['BRA','ZAF',  55],
  /* G. Kore */
  ['KOR','AUS',  65], ['KOR','MEX',  25], ['KOR','IDN',  40], ['KOR','SAU',  45],
  ['KOR','TUR',  25], ['KOR','CHE',  40], ['KOR','ZAF',  25],
  /* Avustralya */
  ['AUS','MEX',  20], ['AUS','IDN',  55], ['AUS','SAU',  35], ['AUS','TUR',  20],
  ['AUS','CHE',  45], ['AUS','ZAF',  40],
  /* Meksika */
  ['MEX','IDN',  15], ['MEX','SAU',  20], ['MEX','TUR',  15], ['MEX','CHE',  25],
  ['MEX','ZAF',  20],
  /* Endonezya */
  ['IDN','SAU',  40], ['IDN','TUR',  25], ['IDN','CHE',  20], ['IDN','ZAF',  30],
  /* Suudi */
  ['SAU','TUR',  35], ['SAU','CHE',  30], ['SAU','ZAF',  25],
  /* Türkiye */
  ['TUR','CHE',  30], ['TUR','ZAF',  20],
  /* İsviçre */
  ['CHE','ZAF',  25]
];

/* İç gruplar */
GAME.GROUPS = {
  business:  {id:'business',  name:'Sermaye / İş Dünyası', concerns:'Kârlılık, istikrar, düşük enflasyon'},
  labor:     {id:'labor',     name:'İşçi / Sendikalar',    concerns:'İş güvencesi, ücret, sosyal haklar'},
  nationalist:{id:'nationalist',name:'Milliyetçiler',      concerns:'Egemenlik, güvenlik, güçlü devlet'},
  liberal:   {id:'liberal',   name:'Liberaller / Kentliler',concerns:'Özgürlük, dışa açıklık, hukuk'},
  rural:     {id:'rural',     name:'Kırsal / Tarım',       concerns:'Gıda fiyatları, tarımsal destek'},
  bureau:    {id:'bureau',    name:'Devlet Bürokrasisi',   concerns:'İstikrar, maaş, statü'}
};

GAME.GLOBALS_INIT = {
  oil:   {name:'Petrol Fiyatı',    val:100},
  food:  {name:'Gıda Fiyatları',   val:100},
  chip:  {name:'Çip / Teknoloji',  val:100},
  dollar:{name:'Dolar Endeksi',    val:100},
  ship:  {name:'Navlun / Lojistik',val:100},
  trade: {name:'Küresel Ticaret',  val:100}
};

GAME.IND_META = {
  growth:      {name:'GDP Büyüme',    unit:'%',  dec:1, goodUp:true},
  inflation:   {name:'Enflasyon',     unit:'%',  dec:1, goodUp:false},
  unemployment:{name:'İşsizlik',      unit:'%',  dec:1, goodUp:false},
  reserves:    {name:'Döviz Rezervi', unit:' mlr$', dec:0, goodUp:true},
  debt:        {name:'Kamu Borcu',    unit:'% GDP', dec:0, goodUp:false},
  currency:    {name:'Para Birimi',   unit:'',   dec:1, goodUp:true},
  trade:       {name:'Ticaret Dengesi',unit:' mlr$', dec:0, goodUp:true},
  influence:   {name:'Küresel Etki',  unit:'',   dec:0, goodUp:true},
  approval:    {name:'Toplum Onayı',  unit:'',   dec:0, goodUp:true},
  stability:   {name:'İstikrar',      unit:'',   dec:0, goodUp:true}
};
