/* ============ KÜRESEL ETKİ — Yardım Ansiklopedisi (çok detaylı) ============ */
window.GAME = window.GAME || {};

GAME.HELP_TOPICS = {};

GAME.HELP_TOPICS.instruments =
  '<h4>Enstrümanlar — Tam Rehber</h4>' +
  '<p>Her enstrüman bir <b>devlet ekonomi aracıdır</b>. Değiştirmek 1 müdahale slotu + siyasi sermaye harcar. ' +
  'Açık bırakmak (sürdürmek) slot harcamaz. Etkiler üç kanalda akar: <b>pulse</b> (değişim anı), ' +
  '<b>sustain</b> (açık kaldığı her çeyrek), <b>complete/perm</b> (proje bitince kalıcı taban kayması).</p>' +

  '<h5>Tipler</h5><ul>' +
  '<li><b>Toggle (Aç/Kapat):</b> Ya tam açık ya kapalı. Yaptırımlar, projeler, gri alan operasyonları. ' +
  'Hedefliyse açarken ülke seçilir. Kapatınca ilişkinin bir kısmı toparlanabilir.</li>' +
  '<li><b>Slider (0–100):</b> Yoğunluk. 0 = kapalı. Sübvansiyon, stok, sermaye kontrolü, tarife, Ar-Ge… ' +
  'Süreğen etkiler seviye ile orantılıdır (50 → yarı güç).</li>' +
  '<li><b>Sayısal:</b> Faiz %, vergi %, kamu harcaması, döviz müdahalesi (mlr$), QE. ' +
  'Süreğen etki = mevcut değer − ülkenin nötr başlangıç oranı. Örn. faizi nötrün üstüne çıkarmak enflasyonu baskılar.</li></ul>' +

  '<h5>Katman 1 — Yapısal Strateji</h5>' +
  '<p>5–9 yıllık projeler. Slot harcamadan ilerler; bitince <b>miras</b> (kalıcı base shift) bırakır. ' +
  'Örnekler: rezerv para inşası, SWIFT alternatifi, sermaye piyasaları, CBDC, altyapı koridoru, ' +
  'beyin göçü, MEB, uzay/derin deniz, teknoloji standartları, fikri mülkiyet, eğitim ihracı, Brüksel etkisi, Ar-Ge.</p>' +
  '<p><i>Ne zaman:</i> İstikrar ve büyüme görece sakinse. Krizde acil makro araçlara öncelik ver.</p>' +

  '<h5>Katman 2 — Konjonktürel + Makro</h5>' +
  '<ul>' +
  '<li><b>Politika faizi:</b> Enflasyon/kur vs büyüme/işsizlik. Yüksek borçta etki güçlenir; sermaye kontrolüyle kur etkisi büyür.</li>' +
  '<li><b>Vergi / kamu harcaması:</b> Maliye. Vergi borcu düşürür ama büyümeyi ve onayı yer. Harcama büyütür, borç ve enflasyon üretir.</li>' +
  '<li><b>Döviz müdahalesi / gölge FX:</b> Kur savunması rezerv yer. Düşük rezerv veya yüksek enflasyonda zayıflar.</li>' +
  '<li><b>QE:</b> Likidite. Büyüme destek, enflasyon/kur riski. Faiz zaten düşükken büyüme etkisi artar.</li>' +
  '<li><b>Sübvansiyon, stok, sermaye kontrolü, tarife, anti-damping, exim:</b> Ticaret ve sanayi taktikleri.</li>' +
  '<li><b>Yaptırım ailesi:</b> İkincil yaptırım, varlık dondurma, servis yasağı, chokepoint, gıda/enerji silahı. ' +
  'Enerji/gıda silahı yalnızca net ihracatçıda tam güç.</li>' +
  '<li><b>Swap / yardım:</b> İlişkiyi iyileştiren pozitif araçlar; rezerv ve nüfuz maliyeti vardır.</li>' +
  '<li><b>Fiyat kontrolleri:</b> Kısa vadede enflasyon ve öfke baskısı; orta vadede büyüme/istikrar yan etkisi.</li></ul>' +

  '<h5>Katman 3 — Piyasa Operasyonları</h5>' +
  '<p>Casusluk, içeriden ticaret, derecelendirme baskısı, ulusal şampiyon, patent iptali, sertifikasyon, ' +
  'jawboning, dezenformasyon. Birçoğunda <b>tespit riski</b> vardır. Jawboning ucuz ve kısa ömürlüdür.</p>' +

  '<h5>Katman 4 — Gri Alan</h5>' +
  '<p>NGO kullanımı, yolsuzluk ağı, isyan finansmanı, lawfare. En yüksek risk. Tespit: ilişki çöküşü, ' +
  'misilleme vergisi, etki ve onay kaybı. Oyun sonu “risk skoru”na yazılır.</p>' +

  '<h5>4 Slot Kuralı</h5>' +
  '<p>Her tur en fazla 4 farklı enstrüman değişir. Aynı enstrümanı aynı turda iki kez değiştiremezsin ' +
  '(bekleyen kaydı güncelleyebilirsin, yine 1 slot). Onayla ve İlerle → etkiler uygulanır, AI ülkeler tepki verir.</p>' +

  '<h5>Siyasi Sermaye</h5>' +
  '<p>Her müdahale maliyet düşer. Onay yükseldikçe sermaye daha hızlı dolar. Sermaye bitince pahalı araçlar kilitlenir. ' +
  'AI ülkeler de sermaye harcar.</p>';

GAME.HELP_TOPICS.countries =
  '<h4>Ülkeler — 17 Güç Rehberi</h4>' +
  '<p>Oyun dünyasında <b>17 oyuncuya açık güç</b> vardır. Avrupa Birliği tek varlık olarak oynanır; ' +
  'İngiltere ayrıdır. Her ülkenin göstergeleri, kişiliği, ticaret ağı, küresel bağımlılıkları ve iç grup güçleri farklıdır.</p>' +

  '<h5>Göstergeler</h5><ul>' +
  '<li><b>GDP büyüme:</b> Ekonomik canlılık. Düşük/negatif → teşvik baskısı; yüksek → enflasyon riski.</li>' +
  '<li><b>Enflasyon:</b> Fiyat istikrarı. Yüksekse faiz, stok, fiyat kontrolü devreye girer; istikrar ve onay erir.</li>' +
  '<li><b>İşsizlik:</b> Okun bağı ile büyümeye bağlı. Sübvansiyon/harcama ile düşürülebilir.</li>' +
  '<li><b>Rezerv:</b> Kur savunması yakıtı. Düşükse müdahale zayıflar.</li>' +
  '<li><b>Borç %GDP:</b> Mali alan. Çok yüksekse faiz maliyeti ve crowding-out büyümeyi keser.</li>' +
  '<li><b>Para birimi endeksi:</b> 100 = başlangıç. Düşüş enflasyona geçişkenlik yaratır.</li>' +
  '<li><b>Ticaret dengesi:</b> Rezervi besler; yaptırımlardan etkilenir.</li>' +
  '<li><b>Küresel etki:</b> Standart, yaptırım ve derecelendirme araçlarının gücünü artırır.</li></ul>' +

  '<h5>Kişilik (AI)</h5>' +
  '<p><b>aggression</b> misilleme/yaptırım eğilimi; <b>diplomacy</b> swap/yardım ve yumuşak ton; ' +
  '<b>opportunism</b> kriz fırsatçılığı ve gri alan; <b>patience</b> uzun proje başlatma. ' +
  'Otoriterler gölge FX ve sert misillemeye daha yatkındır. AB <code>birlik</code> tipindedir (demokratik seçim kuralları + yavaş koordinasyon hissi).</p>' +

  '<h5>Bağımlılıklar (deps)</h5>' +
  '<p>Petrol/gıda/çip/navlun/dolar endeksine duyarlılık. <b>Negatif</b> = o fiyat yükselince kazanırsın (ihracatçı). ' +
  'Enerji/gıda silahı bu yüzden yalnızca net ihracatçıda gerçekçi güçtedir.</p>' +

  '<h5>Kısa ülke notları</h5><ul>' +
  '<li><b>ABD:</b> Rezerv para, yaptırım gücü, yüksek borç. Zor.</li>' +
  '<li><b>Çin:</b> Yapısal projeler, tedarik zinciri, yüksek rezerv, sabır.</li>' +
  '<li><b>AB:</b> Brüksel etkisi, ihracat, enerji bağımlılığı, yüksek diplomasi.</li>' +
  '<li><b>Japonya:</b> Teknoloji/finans, dev borç, enerji ithalatçısı.</li>' +
  '<li><b>Hindistan:</b> Hızlı büyüme, petrol bağımlılığı, reform odaklı.</li>' +
  '<li><b>BK:</b> Finans + soft power, AB ile karma ilişki.</li>' +
  '<li><b>Rusya:</b> Enerji silahı, gri alan, yaptırım riski.</li>' +
  '<li><b>Kanada:</b> Emtia + ABD ekseni, istikrarlı kurumlar.</li>' +
  '<li><b>Brezilya:</b> Gıda/emtia kartı.</li>' +
  '<li><b>G. Kore:</b> Çip/ihracat, jeopolitik sıkışma.</li>' +
  '<li><b>Avustralya:</b> Maden/LNG, Çin talebi.</li>' +
  '<li><b>Meksika:</b> Nearshoring, ABD ticareti.</li>' +
  '<li><b>Endonezya:</b> Kritik mineraller, genç nüfus.</li>' +
  '<li><b>Suudi:</b> Petrol süper gücü, egemen servet.</li>' +
  '<li><b>Türkiye:</b> Köprü ülke, enflasyon hassasiyeti, fırsatçılık.</li>' +
  '<li><b>İsviçre:</b> Finans sığınağı, tarafsızlık.</li>' +
  '<li><b>G. Afrika:</b> Maden + BRICS, yüksek işsizlik/istikrar riski.</li></ul>' +

  '<h5>İlişkiler</h5>' +
  '<p>−200…+200. Yaptırım/hedefli hamle düşürür; yardım/swap yükseltir. Tonlu diplomatik mesajlar ilişkiyi hafifçe besler. ' +
  'Her tur yavaş nötre sürüklenme vardır. Üst şeritteki renkler senin ülkeye göre ilişkiyi gösterir.</p>';

GAME.HELP_TOPICS.charts =
  '<h4>Grafikler — Nasıl Okunur?</h4>' +
  '<p>Merkez paneldeki çizgi grafik, seçtiğin göstergenin <b>zaman serisini</b> çizer. ' +
  'Amaç: “faizi artırdım → enflasyon ne zaman düştü?” gibi neden-sonuç okumaktır.</p>' +

  '<h5>Gösterge seçimi</h5>' +
  '<p>Üstteki çipler: GDP büyüme, enflasyon, işsizlik, rezerv, borç, para birimi, ticaret, küresel etki, ' +
  'onay, istikrar. İyi/kötü yönü renkle ve sol panel oklarıyla da görürsün.</p>' +

  '<h5>Zaman ölçeği</h5><ul>' +
  '<li><b>1 yıl (4 tur):</b> Acil şoklar, faiz ve kur tepkileri.</li>' +
  '<li><b>3–5 yıl:</b> Sübvansiyon, stok, orta vade yapısal adaptasyon.</li>' +
  '<li><b>10 yıl / tümü:</b> Projelerin complete etkileri ve paradigma kaymaları.</li></ul>' +

  '<h5>Motor ile ilişki</h5>' +
  '<p>Her tur simülasyon: mean reversion (tabana çekilme) + pulse tick + sustain + küresel emtia ' +
  '+ ticaret yayılımı + Okun/kur-enflasyon bağları + iç dinamikler. Grafik bu bileşik sonucu gösterir; ' +
  'tek bir müdahalenin izini görmek için müdahaleden hemen sonraki 2–8 turu kısa ölçekte izle.</p>' +

  '<h5>Sol panel okları</h5>' +
  '<p>Son turdaki değişim: yeşil = senin için iyi yönde, kırmızı = kötü (göstergenin goodUp meta’sına göre). ' +
  'Küçük dalgalanmalar normaldir; trend ve felaket şoklarına bak.</p>' +

  '<h5>Küresel değişkenler</h5>' +
  '<p>Petrol, gıda, çip, dolar, navlun, küresel ticaret endeksleri (100 = 2026 başı) her ülkeyi ' +
  'deps üzerinden etkiler. Chokepoint/gıda/enerji silahı ve felaketler bu endeksleri iter.</p>' +

  '<h5>İpuçları</h5><ul>' +
  '<li>Enflasyon grafiğini faiz/QE ile yan yana düşün (sırayla bak).</li>' +
  '<li>Rezerv erimesi + kur düşüşü = müdahaleyi bırak / faiz artır sinyali.</li>' +
  '<li>Proje bitince influence/currency/trade’te basamak şeklinde kalıcı sıçrama ararsın.</li>' +
  '<li>Oyun sonunda miras listesi kalıcı kaymaları metin olarak arşivler.</li></ul>';

GAME.HELP_TOPICS.topics =
  '<h4>Konular &amp; Sistem — Derin Mekanikler</h4>' +

  '<h5>Oyun amacı ve misyon</h5>' +
  '<p><b>Kazanmak yok.</b> Amaç: bir ekonomik enstrümanı değiştirdiğinde dünyada ne olduğunu hissetmek. ' +
  'Güç, sorumluluk ve “keşke şöyle yapsaydım” meraklısı bir simülasyon. 60 tur ≈ 15 yıl; her tur 1 çeyrek (3 ay).</p>' +

  '<h5>Tur akışı</h5>' +
  '<ol><li>Sen en fazla 4 bekleyen müdahale seçersin.</li>' +
  '<li>Onayla ve İlerle → kararların uygulanır, diplomatik tepkiler üretilir.</li>' +
  '<li>AI ülkeler (karışık sıra, gecikmeli haber) kendi adaylarını skorlayıp uygular.</li>' +
  '<li>Simülasyon tick: reversion, pulse, sustain, küresel, ticaret, ekonomik bağlar, projeler, iç dinamikler, tespit.</li>' +
  '<li>Haberler, kayıt, tur artışı. Felaket 2–4. turda bir kez tetiklenir.</li></ol>' +

  '<h5>Etki zaman ölçekleri</h5>' +
  '<p>imm (0 gecikme / 2 tur), short (1/4), med (4/10), long (12/24). Pulse toplam etki bu süreye bölünür. ' +
  'Sustain her çeyrek seviye×m ekler. Mean reversion sınırsız birikimi engeller (büyüme hızlı, borç yavaş döner).</p>' +

  '<h5>Çapraz çarpanlar</h5>' +
  '<p>Yüksek borç × faiz; sermaye kontrolü × faiz-kur; düşük rezerv × FX; felaket × stok; ' +
  'QE × enflasyon; influence &gt;70 × yaptırım/standart; needsExporter × enerji/gıda silahı. ' +
  'Varlık dondurma rezerv şoku hedefin rezervi ve senin gücünle ölçeklenir. İkincil yaptırım ticaret ortaklarına sızar.</p>' +

  '<h5>İç dinamikler</h5>' +
  '<p>6 grup (iş dünyası, emek, milliyetçi, liberal, kırsal, bürokrasi). Enstrüman groups etkileri + ekonomik koşullar ' +
  'memnuniyeti değiştirir. Onay = ağırlıklı ortalama; istikrar kutuplaşma/radikalizm/işsizlik/enflasyona bağlı. ' +
  'Protesto, grev, seçim baskısı, hükümet değişikliği (demokratik/birlik), otoriter sıkılaşma olabilir.</p>' +

  '<h5>Diplomasi ve ton</h5>' +
  '<p>5 ton: dostane → düşmanca. İlişki, eylem şiddeti, gözlemci kişiliği ve self-impact hesaplanır. ' +
  'Sert tonlar ilişkiyi daha da bozar. Haritada tıkla: ülke bilgisi + ticaret hatları.</p>' +

  '<h5>Harita navigasyonu</h5>' +
  '<p>Google Haritalar tarzı: sürükle = kaydır, tekerlek = zoom, çift tık = yaklaş, +/−/⌂ düğmeleri. ' +
  'Ülke sınırına tıkla = o ülkenin paneline geç.</p>' +

  '<h5>AI</h5>' +
  '<p>Skor tabanlı adaylar: öz-bakım, felaket savunması, oyuncu misillemesi, projeler, fırsatçı agresyon. ' +
  'Krizde 3, normalde 2 eylem. Danışma Kurulu aynı motoru senin için çalıştırır.</p>' +

  '<h5>Kayıt</h5>' +
  '<p>localStorage anahtarı <code>kureselEtkiSave_oyungrok</code> (eski /oyun/ sürümünden ayrı). ' +
  'Her tur otomatik kayıt. Eski kayıtlar yeni enstrüman/ülke setiyle uyumsuz olabilir → Yeni Oyun önerilir.</p>' +

  '<h5>Oyun sonu skorları</h5>' +
  '<p>Ülke performansı, küresel istikrar, miras (kalıcı değişim sayısı), proje tutarlılığı, risk (tespit/misilleme). ' +
  'Hepsi 0–100’e sıkıştırılır; “kazanma” değil değerlendirme panosudur.</p>';

/* Ana menü “Nasıl Oynanır” özet metni (detaylı) */
GAME.ABOUT_MAIN_HTML =
  '<h4>Misyon</h4>' +
  '<p><b>Küresel Etki</b>, klasik “kazan-kaybet” oyunu değildir. Büyük bir küresel felaket sonrası seçtiğin ülkeyi ' +
  '<b>yalnızca ekonomik enstrümanlarla</b> yönetirsin. Her faiz artışı, yaptırım, stok kararı veya 8 yıllık proje ' +
  'sadece senin GDP’ni değil; ticaret ortaklarını, emtia fiyatlarını, diplomatik tonları ve 15 yıl sonraki ' +
  'küresel düzeni değiştirir. Amaç: <i>“Ben bu aracı değiştirdiğimde dünyada gerçekten ne oluyor?”</i> sorusunu yaşamak.</p>' +

  '<h4>Temel kurallar</h4><ul>' +
  '<li><b>Tur = 3 ay.</b> Oyun 60 tur (≈15 yıl) sürer.</li>' +
  '<li><b>4 slot:</b> Her tur en fazla 4 enstrüman değişikliği. Sürdürmek ücretsizdir.</li>' +
  '<li><b>Siyasi sermaye:</b> Müdahaleler maliyetlidir; toplum onayı sermayeyi yeniler.</li>' +
  '<li><b>17 ülke:</b> AB tek varlık, İngiltere ayrı. AI ülkeler senin hamlelerine tepki verir.</li>' +
  '<li><b>1 felaket:</b> 2–4. turda rastgele tetiklenir; şiddet ülkeye göre değişir.</li>' +
  '<li><b>Gri alan riski:</b> Örtülü operasyonlar tespit edilebilir → skandal + misilleme.</li></ul>' +

  '<h4>Arayüz haritası</h4><ul>' +
  '<li><b>Sol üst ülke şeridi:</b> İlişki renkli kısa adlar; tıkla → dünya haritası (sürükle/zoom).</li>' +
  '<li><b>Sol panel:</b> Göstergeler, iç gruplar, aktif politikalar.</li>' +
  '<li><b>Merkez:</b> Zaman serisi grafikleri.</li>' +
  '<li><b>Sağ:</b> mIRC tarzı olay akışı (#ekonomi, #diplomasi…).</li>' +
  '<li><b>Alt:</b> 4 katmanlı enstrüman menüsü — ekran genişliğine göre <b>sayfalı</b> (kaydırma yok).</li>' +
  '<li><b>❓ Yardım:</b> Danışma Kurulu önerileri + ansiklopedi butonları.</li></ul>' +

  '<h4>Strateji ipuçları</h4><ul>' +
  '<li>Krizde önce makro (faiz, stok, rezerv); sakin dönemde yapısal proje.</li>' +
  '<li>Yaptırım misilleme doğurur; müttefiklere swap/yardım ilişki kazanır.</li>' +
  '<li>Grafikte 1–3 yıl ölçeğini izle — etkiler gecikmeli gelir.</li>' +
  '<li>Her karar bir seçimdir: 4 kötü slot, felaketi büyütür.</li></ul>' +

  '<p style="margin-top:12px;color:#505050"><b>Alttaki butonlardan</b> enstrümanlar, ülkeler, grafikler ve sistem ' +
  'konularında çok daha detaylı metinlere geçebilirsin.</p>';
