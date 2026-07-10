/* ============ KÜRESEL ETKİ — Ekonomi terimleri sözlüğü (haber akışı) ============
   Dünya olayları satırlarında teknik terimlere * eklenir; hover/tık ile sade dil açıklama.
   Ajan: yeni terim eklerken TR ve EN sözlüğe birlikte ekle; CHANGELOG yaz; push+deploy.
*/
window.GAME = window.GAME || {};

/* Anahtar = metinde aranacak ifade (küçük/büyük harf duyarsız). Uzun ifadeler önce eşleşir. */
GAME.GLOSSARY_BY_LANG = {
  tr: {
    'siyasi sermaye': 'Hükümetin “hareket alanı” puanı. Yeni karar almak için harcanır; halk desteği yüksekse zamanla dolmaya başlar.',
    'siyasi sermayesi': 'Hükümetin “hareket alanı” puanı. Yeni karar almak için harcanır; halk desteği yüksekse zamanla dolmaya başlar.',
    'toplum onayı': 'Halkın yönetime ne kadar destek verdiği. Düşerse grev, protesto veya seçim baskısı artabilir.',
    'onay oranı': 'Halkın yönetime ne kadar destek verdiği. Düşerse grev, protesto veya seçim baskısı artabilir.',
    'istikrar': 'Ülkenin “iç barış / düzen” skoru. Çok düşünce sokak olayları ve siyasi kriz riski büyür.',
    'enflasyon': 'Fiyatların genel olarak artması. Aynı parayla market sepetin küçülür; maaşın yetmez hale gelebilir.',
    'enflasyonu': 'Fiyatların genel olarak artması. Aynı parayla market sepetin küçülür.',
    'enflasyona': 'Fiyatların genel olarak artması anlamında kullanılır.',
    'enflasyonist': 'Fiyatları yükseltmeye iten (enflasyon yaratan) bir durum.',
    'hiper-risk': 'Fiyatların kontrolsüz fırladığı, paranın çok hızlı eridiği tehlikeli enflasyon bölgesi.',
    'defasyon': 'Fiyatların genel olarak düşmesi. İyi gibi dursa da işsizlik ve durgunlukla gelebilir.',
    'büyüme': 'Ekonominin büyümesi: ülkede üretilen mal ve hizmetlerin artması. İş ve gelir umudu buradan gelir.',
    'gdp': 'Ülkenin bir yılda ürettiği toplam mal ve hizmetin değeri. “Ekonominin boyutu / temposu” gibi düşün.',
    'gsyh': 'Ülkenin bir yılda ürettiği toplam mal ve hizmetin değeri. “Ekonominin boyutu / temposu” gibi düşün.',
    'işsizlik': 'İş arayıp bulamayanların oranı. Yüksekse sosyal gerilim ve talep zayıflığı artar.',
    'işsizliği': 'İş arayıp bulamayanların oranı.',
    'rezerv': 'Merkez bankasının / devletin biriktirdiği döviz ve likit varlık “yedek kasası”. Krizde kuru savunmak için kullanılır.',
    'rezervler': 'Devletin döviz ve likit varlık yedek kasası. Azalırsa döviz krizine açık hale gelirsin.',
    'döviz rezervi': 'Yabancı para ve benzeri varlık stoku. İthalat ve kur savunmasının yakıtı.',
    'döviz': 'Yabancı para (dolar, euro vb.). Kuru konuşurken “paramızın dışarıdaki karşılığı” demektir.',
    'kur': 'Bir birim yerli paranın yabancı paraya göre değeri. Kur düşünce ithalat pahalılaşır, enflasyon baskısı artabilir.',
    'para birimi': 'Ülkenin parası. Güçlenirse ithalat ucuzlar; zayıflarsa yurt dışı mallar pahalılaşır.',
    'faiz': 'Borç para kullanmanın bedeli. Yükselince kredi pahalılaşır; harcama ve enflasyon genelde yavaşlar.',
    'politika faizi': 'Merkez bankasının “resmi faiz” ayarı. Tüm kredi ve mevduat faizlerine yön veren ana düğme.',
    'miktarsal gevşeme': 'Merkez bankasının piyasadan tahvil alıp ekonomiye bol para basması (QE). Büyümeyi destekler ama enflasyon ve kur riski taşır.',
    'qe': 'Merkez bankasının piyasaya bol para enjekte etmesi (miktarsal gevşeme). Kısa vadede ferahlatır; uzun vadede fiyat ve kur baskısı yapabilir.',
    'bilanço': 'Merkez bankasının veya bir kurumun varlık-yükümlülük tablosu. “QE ile bilanço şişti” = merkez bankası daha çok varlık tutuyor, yani daha çok para basmış gibi.',
    'kamu borcu': 'Devletin toplam borç yükü. Çok artarsa vergi ve faiz baskısı büyür; “bütçe nefesi” daralır.',
    'borçlanma': 'Devletin veya ekonominin borç alarak finansman sağlaması. Bugünü rahatlatır, yarını borçlu bırakabilir.',
    'bütçe': 'Devletin gelir-gider planı. Açık büyürse borç veya vergi ihtiyacı artar.',
    'maliye': 'Vergi ve kamu harcaması politikası. “Kemer sıkma” = harcamayı kısmak; “teşvik” = harcamayı artırmak.',
    'mali alan': 'Devletin borçlanmadan veya vergiyi bozmadan harcama yapabilme rahatlığı. Tükenirse kriz manevrası zorlaşır.',
    'ticaret dengesi': 'İhracat eksi ithalat. Fazla = dışarıya net satış; açık = net alım. Rezerv ve kuru etkiler.',
    'ihracat': 'Yurt dışına mal/hizmet satmak. Döviz kazandırır, istihdamı destekleyebilir.',
    'ithalat': 'Yurt dışından mal/hizmet almak. Döviz harcar; bazı mallarda enflasyona da yansır.',
    'gümrük': 'Sınırdan geçen mallara konan vergi/engel. Yerli üreticiyi korur ama fiyatları yükseltebilir.',
    'tarife': 'İthal mala konan gümrük vergisi. Karşı taraf da misilleme yapabilir.',
    'yaptırım': 'Bir ülkeyi cezalandırmak için ticaret, finans veya varlık kısıtı. Hedefi sıkıştırır ama misilleme doğurabilir.',
    'ikincil yaptırım': 'Hedef ülkeyle iş yapan üçüncü tarafları da cezalandırma. “Onlarla ticaret yapanı da vururum” demek.',
    'varlık dondurma': 'Hedefin banka hesabı/varlıklarını kilitlemek. Parayı kullanamaz hale getirir.',
    'misilleme': 'Gelen darbenin karşılığını benzer araçlarla verme. Yaptırım-yaptırım sarmalı buradan çıkar.',
    'sermaye kontrolü': 'Paranın ülkeye girip çıkışını sınırlamak. Kur savunusuna yardım eder; yatırım iştahını kesebilir.',
    'sıcak para': 'Kısa vadeli, kolay kaçan yabancı yatırım. Gelince kuru rahatlatır; çıkınca kriz riski yaratır.',
    'likidite': 'Ekonomide “hazır nakit / kolay para” bolluğu. Azsa kredi sıkışır; fazlaysa fiyatlar ısınabilir.',
    'likidite kalkanı': 'Rezerv ve hazır nakit tamponu. İncelirse küçük şoklar bile büyük paniğe dönebilir.',
    'tedarik zinciri': 'Malın hammaddeden rafa kadar izlediği yol. Kopunca kıtlık ve fiyat artışı olur.',
    'navlun': 'Deniz/kara taşıma ücreti. Artınca ithal her şey pahalılaşır.',
    'emtia': 'Petrol, gıda, maden gibi ham ürünler. Fiyatları tüm dünyayı etkiler.',
    'petrol': 'Enerji ve taşımanın ana yakıtı. Pahalılaşınca neredeyse her şeyin maliyeti artar.',
    'gıda fiyatları': 'Temel besinlerin fiyat seviyesi. Yükselince özellikle dar gelirliler zorlanır; toplumsal gerilim artar.',
    'çip': 'Elektronik yarı iletken parçalar. Otomobil ve telefondan sanayiye kadar üretimin “beyni”; kıt olunca üretim durur.',
    'yarı iletken': 'Elektronik çip üretiminin malzemesi/ürünü. Kıtlık tüm sanayiye yayılır.',
    'dolar endeksi': 'Doların diğer büyük paralara göre gücü. Yükselince dolarla borçlu ülkeler ve emtia fiyatları sarsılır.',
    'rezerv para': 'Dünyanın güvenle tuttuğu para (çoğunlukla dolar). Bu statüye sahip olmak borçlanmayı ucuzlatır, yaptırım gücünü artırır.',
    'dolarsızlaşma': 'Ticaret ve rezervlerde dolara bağımlılığı azaltma çabası. Yavaş ve jeopolitik bir süreçtir.',
    'swift': 'Bankalar arası uluslararası mesaj/ödeme ağı. Dışlanmak, global ticareti çok zorlaştırır.',
    'cbdc': 'Merkez bankası dijital parası. Nakit gibi ama dijital; sınır ötesi ödemelerde dolara alternatif aracı olabilir.',
    'swap hattı': 'İki merkez bankasının birbirine döviz “hat” açması. Krizde müttefike döviz likiditesi sağlar.',
    'exim': 'İhracat kredi bankası desteği. Yabancı alıcıya ucuz kredi verip senin ihracatını şişirir.',
    'sübvansiyon': 'Devletin üreticiye/tüketiciye para veya vergi avantajı vermesi. İstihdamı destekler; bütçeyi zorlar.',
    'anti-damping': 'Ucuz “yıkıcı fiyatlı” ithalata ek vergi. Yerli sanayiyi korur; ticaret gerilimi çıkarabilir.',
    'stratejik stok': 'Kriz için biriktirilen gıda/enerji stoku. Fiyat paniğini bastırır; maliyetlidir.',
    'fiyat kontrolü': 'Devletin fiyatlara tavan koyması. Kısa vadede halkı rahatlatır; uzun vadede kıtlık yaratabilir.',
    'gri alan': 'Açık savaş olmayan ama casusluk, propaganda, gizli baskı gibi “kirli” ekonomik taktikler bölgesi. Yakalanırsan skandal olur.',
    'casusluk': 'Gizli bilgi çalma. Ekonomide rakip teknoloji/plan çalmak. Tespit riski yüksektir.',
    'dezenformasyon': 'Kasıtlı yalan/yanıltıcı haber yayma. Piyasa ve toplum psikolojisini bozmak için kullanılır.',
    'jawboning': 'Yetkililerin “konuşarak” piyasayı yönlendirmesi. Ucuzdur ama etkisi kısa ömürlüdür.',
    'lawfare': 'Mahkeme ve uluslararası hukuku rakibi yormak için silah gibi kullanmak.',
    'brüksel etkisi': 'Büyük bir pazarın kurallarını dünyaya dayatması (AB regülasyonu gibi). Firmalar “bir kere uymuşken her yerde uygular”.',
    'küresel etki': 'Ülkenin dünya siyaset-ekonomi sahnesindeki ağırlığı. Yüksekse yaptırım ve standart koyma gücü artar.',
    'nüfuz': 'Başka ülkeleri kendi çıkarına yönlendirme gücü. Para, ticaret ve diplomasiyle birikir.',
    'jeopolitik': 'Coğrafya ve güç dengelerinin ekonomiye yansıması. “Siyaset yüzünden ticaret bozuldu” demek.',
    'çok kutuplu': 'Tek süper güç yerine birkaç büyük gücün olduğu dünya düzeni.',
    'hegemonya': 'Bir ülkenin sisteme fiilen hükmetmesi (ör. rezerv para ve askeri-ekonomik üstünlük).',
    'risk primi': 'Yatırımcının “bu ülke riskli” diye ekstra istediği faiz/getiri. Artarsa borçlanmak pahalılaşır.',
    'volatilite': 'Fiyatların hızlı ve sert oynaması. Belirsizlik ve panik göstergesidir.',
    'refinansman': 'Eski borcu yeni borçla çevirmek. Piyasa kapalıysa kriz çıkar.',
    'sermaye kaçışı': 'Yerli/yabancı paranın hızla yurt dışına çıkması. Kur ve rezervi zora sokar.',
    'mean reversion': 'Aşırı giden göstergelerin zamanla “normale” dönme eğilimi (oyunun denge mekanizması).',
    'okun': 'Büyüme ile işsizlik arasındaki ters ilişki kuralı: ekonomi büyüyünce işsizlik genelde düşer.',
    'proje': 'Yıllar süren yapısal yatırım/politika. Bitince kalıcı “miras” bırakabilir.',
    'miras': 'Oyunda proje bitince kalan kalıcı ekonomik kayma (taban güç değişimi).',
    'felaket': 'Oyunun başındaki büyük küresel şok (volkan, kanal tıkanması vb.). Tüm ülkeleri farklı şiddette vurur.',
    'çeyrek': '3 aylık dönem. Oyunda 1 tur = 1 çeyrek.',
    'müdahale': 'Bu turda enstrüman değiştirmek. Slot ve siyasi sermaye harcar.',
    'enstrüman': 'Faiz, vergi, yaptırım gibi devlet ekonomi araçlarından biri.',
    'danışma kurulu': 'Oyunun sana öneri üreten yardım paneli (aynı AI mantığıyla).',
    'ilişki': 'İki ülke arasındaki dostluk/düşmanlık puanı. Yaptırım düşürür; yardım yükseltir.',
    'ton': 'Diplomatik mesajın sertlik seviyesi (dostane → düşmanca).',
    'petrodolar': 'Petrol ticaretinin dolarla yapılması ve bu paranın finans sistemine akması.',
    'nearshoring': 'Üretimi uzak ülkeden yakındaki müttefik ülkeye taşıma. Tedarik riskini azaltır.',
    'brics': 'Brezilya, Rusya, Hindistan, Çin, Güney Afrika (ve genişleyen) yükselen güçler grubu.',
    'kırmızı çizgi': 'Aşılınca sert tepki göstereceğini ilan ettiğin sınır.',
    'yumuşak güç': 'Kültür, eğitim, yardım ve imajla etkileme gücü (zorlama olmadan).',
    'sert güç': 'Askeri veya kaba ekonomik baskı (yaptırım, ambargo).',
    'ambargo': 'Ticaretin tamamen veya kısmen yasaklanması.',
    'kota': 'İthalat/ihracata miktar sınırı koymak.',
    'rekolte': 'Hasat miktarı. Düşünce gıda fiyatı artar.',
    'sigorta primi': 'Risk karşılığı ödenen bedel. Felakette fırlar; maliyetleri yükseltir.',
    'piyasa': 'Alıcı-satıcıların fiyatı belirlediği yer (borsa, döviz, emtia).',
    'vadeli piyasa': 'İleride teslim mal/fiyat üzerine yapılan bahis/anlaşma piyasası. Beklentiyi şimdiden fiyatlar.',
    'merkez bankası': 'Paranın ve faizin ana yöneticisi kurum. Enflasyon ve kurla boğuşur.',
    'hanehalkı': 'Sıradan aileler/tüketiciler. Enflasyon ve işsizlik onları vurur.',
    'sanayi': 'Fabrika ve üretim sektörü. Enerji, çip ve kredi şartlarına duyarlıdır.',
    'kamu harcaması': 'Devletin yol, maaş, yatırım için para harcaması. Büyümeyi iter; borç/enflasyon riski taşır.',
    'vergi': 'Devletin gelir kaynağı. Artınca bütçe rahatlar ama harcama ve yatırım soğuyabilir.',
    'kemer sıkma': 'Harcamayı kesip bütçeyi toparlama. Borcu yavaşlatır; büyümeyi ve onayı incitir.',
    'teşvik': 'Ekonomiyi canlandırmak için vergi indirimi veya harcama artışı. Kısa vadeli ferahlık; maliyetli olabilir.',
    'istihdam': 'İnsanların iş sahibi olması. Artması sosyal barışı ve talebi destekler.',
    'sendika': 'İşçi örgütü. Grev ve ücret pazarlığında güçtür.',
    'grev': 'İş bırakma eylemi. Üretimi ve ihracatı yavaşlatır.',
    'protesto': 'Sokak tepkisi. Onay ve istikrar düştüğünde artar.',
    'koalisyon': 'Birden fazla partinin birlikte hükümet kurması. Karar almayı yavaşlatabilir.',
    'güven oylaması': 'Parlamento “hükümeti destekliyor muyum?” diye oylar. Düşerse kriz olur.',
    'olağanüstü yetki': 'Kriz bahanesiyle yönetimin daha sert ve az denetimli karar alması.',
    'sivil toplum': 'Devlet dışı örgütler (dernek, NGO). Gri alanda suistimal edilebilir.',
    'ngo': 'Sivil toplum kuruluşu. Yardım ve lobicilik yapar; bazen devletlerce araçsallaştırılır.',
    'ulusal şampiyon': 'Devletin büyüttüğü dev yerli şirket. Küresel rekabete hazırlar; tekel riski vardır.',
    'fikri mülkiyet': 'Patent, marka, telif. Çalınır veya iptal edilirse teknoloji savaşı kızışır.',
    'patent': 'Buluşa verilen yasal tekel hakkı.',
    'sertifikasyon': 'Ürünün standartlara uygunluk belgesi. Silahlaştırılırsa pazar kapısı kapanır.',
    'standart dikte': 'Teknoloji/ürün kurallarını senin yazıp dünyaya dayatman.',
    'altyapı kuşağı': 'Yol, liman, demiryolu koridoru projesi. Ticareti kalıcı değiştirir ama pahalı ve yavaştır.',
    'koridor': 'Ticaretin aktığı güzergâh (deniz veya kara). Tıkanırsa fiyatlar fırlar.',
    'suez': 'Avrupa-Asya deniz ticaretinin dar boğazı. Tıkanınca navlun ve teslimatlar bozulur.',
    'rezerv erimesi': 'Döviz stokunun hızla azalması. Kur savunması sürdürülemez hale gelir.',
    'kur savunması': 'Merkez bankasının döviz satarak parasını güçlü tutmaya çalışması. Rezerv yer.',
    'spekülatif baskı': 'Yatırımcıların “bu para düşecek” diye agresif satış yapması. Krizi hızlandırır.',
    'panik': 'Herkesin aynı anda satması/kaçması. Fiyatlar mantıksız sert hareket eder.',
    'bekle-gör': 'Karar vermeden izlemek. Belirsizlikte sık tercih edilir.',
    'karşılıklılık': 'Sen bana ne yaptıysan ben de sana benzerini yaparım ilkesi.',
    'egemenlik': 'Ülkenin kendi kararını kendi vermesi. Yaptırım ve müdahale egemenlik tartışması yaratır.',
    'yumuşak iniş': 'Ekonominin çökmeden yavaşlaması. Tersi “sert iniş” = durgunluk/kriz.',
    'resesyon': 'Ekonominin küçülmesi dönemi. İşsizlik ve iflas riski artar.',
    'durgunluk': 'Büyümenin zayıf veya negatif olduğu dönem.',
    'canlanma': 'Ekonominin toparlanmaya başlaması.',
    'talep': 'İnsanların/firmaların harcama isteği. Düşünce büyüme yavaşlar.',
    'arz': 'Üretilip satılabilen mal miktarı. Kısıtlanınca fiyat artar.',
    'kıtlık': 'Malın yetmemesi. Fiyat ve kuyruk demektir.',
    'revalüasyon': 'Yerli paranın değerinin bilinçli yükseltilmesi (nadir jargon; “paramız değerlendi” demek).',
    'devalüasyon': 'Yerli paranın değerinin bilinçli düşürülmesi. İhracata yardım, ithalata zarar.',
    'cari açık': 'Ülkenin dışarıya net döviz kaybı (ticaret+hizmet). Sürekli açıksa kırılganlık artar.',
    'fazla': 'Ticarette veya bütçede artı vermek (gelir > gider).',
    'açık': 'Ticarette veya bütçede eksi vermek (gider > gelir).',
    'risk skoru': 'Oyunda yakalanan gri operasyonların ceza notu. Yüksekse kötü yönetim izlenimi.',
    'tespit': 'Gizli operasyonun ortaya çıkması. İlişki ve itibar kaybı getirir.',
    'skandal': 'Kamuoyunu sarsan ifşa. Onay ve ilişkiyi eritir.'
  },
  en: {
    'political capital': 'The government’s “room to act” points. Spending them lets you change policy; high public approval refills them over time.',
    'public approval': 'How much the public supports the government. When it falls, strikes, protests or election pressure rise.',
    'approval': 'Public support for the government. Low approval means social and political trouble.',
    'stability': 'How orderly and calm the country is. Very low stability means unrest and political crisis risk.',
    'inflation': 'Prices rising overall. Your money buys less at the store; wages may not keep up.',
    'unemployment': 'Share of people who want a job but cannot find one. High unemployment fuels social tension.',
    'growth': 'The economy getting larger: more goods and services produced. Jobs and incomes often follow.',
    'gdp': 'Total value of what a country produces in a year. Think “size and pace of the economy.”',
    'reserves': 'The central bank’s rainy-day stash of foreign currency and liquid assets. Used to defend the exchange rate in a crisis.',
    'fx reserves': 'Stock of foreign currency. Fuels imports and currency defense.',
    'currency': 'The country’s money. Stronger currency makes imports cheaper; weaker makes them more expensive.',
    'exchange rate': 'How much one unit of local money is worth in foreign money. A fall can push import prices and inflation up.',
    'policy rate': 'The central bank’s official interest-rate lever. It steers loan and deposit rates across the economy.',
    'interest rate': 'The price of borrowing money. Higher rates make credit expensive and usually cool spending and inflation.',
    'quantitative easing': 'The central bank buys bonds to inject money into the economy (QE). Supports growth but risks inflation and a weaker currency.',
    'qe': 'Central-bank “money injection” by buying assets. Short-term relief; longer-term price and currency risks.',
    'balance sheet': 'A table of assets vs liabilities. A “swollen CB balance sheet” means the bank holds more assets—often after QE.',
    'public debt': 'What the government owes in total. Very high debt means higher taxes or interest pressure later.',
    'fiscal space': 'Room to spend without breaking the budget or scaring markets. When gone, crisis tools get scarce.',
    'austerity': 'Cutting public spending to fix the budget. Slows debt growth but can hurt growth and approval.',
    'stimulus': 'Tax cuts or extra spending to revive the economy. Feels good now; can raise debt or inflation.',
    'trade balance': 'Exports minus imports. Surplus = net seller abroad; deficit = net buyer. Affects reserves and the currency.',
    'exports': 'Selling goods/services abroad. Earns foreign currency and can support jobs.',
    'imports': 'Buying goods/services from abroad. Spends foreign currency; can feed inflation.',
    'tariff': 'A tax on imports. Protects local producers but can raise prices and invite retaliation.',
    'customs': 'Border taxes and checks on traded goods.',
    'sanctions': 'Trade/finance restrictions used to punish a country. Hurts the target but can trigger retaliation.',
    'secondary sanctions': 'Punishing third parties who still deal with the target. “Trade with them and I’ll hit you too.”',
    'asset freeze': 'Locking someone’s bank accounts or assets so they cannot use the money.',
    'retaliation': 'Hitting back with similar tools. This is how sanction spirals start.',
    'capital controls': 'Limits on money entering or leaving the country. Helps defend the currency; scares investors.',
    'hot money': 'Short-term foreign capital that can flee quickly. Arrives and calms markets; leaves and causes crises.',
    'liquidity': 'How much ready cash is floating in the system. Too little freezes credit; too much can heat prices.',
    'supply chain': 'The path from raw materials to finished goods on the shelf. Breaks cause shortages and higher prices.',
    'freight': 'Shipping cost. When it rises, almost all imports get more expensive.',
    'commodities': 'Basic goods like oil, food, metals. Their prices ripple through the whole world economy.',
    'oil': 'Main energy fuel for transport and industry. Costlier oil raises costs almost everywhere.',
    'food prices': 'Cost of basic food. Spikes hurt poorer households first and can spark unrest.',
    'chip': 'Semiconductor parts that run electronics and cars. Scarcity stalls factories worldwide.',
    'semiconductor': 'The materials/products behind computer chips. Shortages cascade across industry.',
    'dollar index': 'How strong the dollar is versus other major currencies. A stronger dollar squeezes dollar debtors and commodities.',
    'reserve currency': 'Money the world happily holds (often the dollar). That status cheapens borrowing and boosts sanction power.',
    'de-dollarization': 'Trying to rely less on the dollar in trade and reserves. Slow and geopolitical.',
    'swift': 'The messaging network banks use for cross-border payments. Being cut off makes global trade much harder.',
    'cbdc': 'Central bank digital currency. Digital cash; can be used for cross-border payments as a dollar alternative experiment.',
    'currency swap': 'Two central banks open a line to lend each other foreign currency in a crisis.',
    'swap line': 'A central-bank emergency foreign-currency credit line between countries.',
    'exim': 'Export-credit agency support: cheap loans for foreign buyers so your exports rise.',
    'subsidy': 'Government money or tax breaks for producers/consumers. Supports jobs; costs the budget.',
    'anti-dumping': 'Extra tariffs on goods sold “too cheap” abroad. Protects industry; starts trade fights.',
    'strategic stockpile': 'Emergency stores of food/energy. Calms price panics; expensive to hold.',
    'price controls': 'Government caps on prices. Soothes the public short-term; can cause shortages later.',
    'grey zone': 'Dirty tactics short of open war: espionage, propaganda, covert pressure. Getting caught causes scandals.',
    'gray zone': 'Dirty tactics short of open war: espionage, propaganda, covert pressure. Getting caught causes scandals.',
    'espionage': 'Stealing secrets. In economics: tech or commercial secrets. High detection risk.',
    'disinformation': 'Deliberate false or misleading stories to move markets or public opinion.',
    'jawboning': 'Officials talking markets into calm or action. Cheap; effects fade fast.',
    'lawfare': 'Using courts and international law as a weapon to exhaust a rival.',
    'brussels effect': 'A big market’s rules becoming global standards because firms prefer one rulebook.',
    'global influence': 'How heavy a country is on the world stage. High influence boosts sanctions and standard-setting.',
    'influence': 'Power to shape other countries’ choices via money, trade and diplomacy.',
    'geopolitics': 'How power and geography spill into the economy—“politics broke trade.”',
    'multipolar': 'A world with several big powers instead of one dominant superpower.',
    'hegemony': 'One country effectively running the system (reserve currency + military-economic edge).',
    'risk premium': 'Extra return investors demand because a country looks risky. Higher premium = costlier borrowing.',
    'volatility': 'Prices swinging fast and hard. A sign of uncertainty and panic.',
    'refinancing': 'Rolling old debt into new debt. If markets close, a crisis can erupt.',
    'capital flight': 'Money rushing out of the country. Hits the currency and reserves hard.',
    'project': 'A multi-year structural investment/policy. Finishing can leave a permanent “legacy” shift.',
    'legacy': 'In this game: a permanent economic base shift after a project completes.',
    'disaster': 'The big global shock early in the game (volcano, canal blockage, etc.). Hits countries with different severity.',
    'quarter': 'A 3-month period. In this game, 1 turn = 1 quarter.',
    'intervention': 'Changing an instrument this turn. Costs a slot and political capital.',
    'instrument': 'A state economic tool: rates, taxes, sanctions, and so on.',
    'advisory board': 'The in-game help panel that suggests moves (same engine as the AI).',
    'relations': 'Friendship/hostility score between two countries. Sanctions lower it; aid raises it.',
    'tone': 'How harsh a diplomatic message is (friendly → hostile).',
    'petrodollar': 'Oil traded in dollars and that money cycling through finance.',
    'nearshoring': 'Moving production closer to home/allies to cut supply-chain risk.',
    'brics': 'Brazil, Russia, India, China, South Africa (and expanding) emerging-power group.',
    'soft power': 'Influence via culture, education, aid and image—not force.',
    'hard power': 'Military or blunt economic pressure (sanctions, embargoes).',
    'embargo': 'A ban on trade, total or partial.',
    'quota': 'A quantity limit on imports or exports.',
    'harvest': 'Crop yield. A bad harvest pushes food prices up.',
    'insurance premium': 'Price of risk cover. Disasters make it explode and raise costs.',
    'market': 'Where buyers and sellers set prices (stocks, FX, commodities).',
    'futures': 'Contracts betting on future prices. They price expectations today.',
    'central bank': 'Institution that steers money and interest rates; fights inflation and currency stress.',
    'households': 'Ordinary families/consumers. Inflation and unemployment hit them first.',
    'industry': 'Factories and production. Sensitive to energy, chips and credit.',
    'public spending': 'Government money on wages, roads, investment. Boosts growth; risks debt/inflation.',
    'tax': 'Government revenue from people and firms. Higher taxes help the budget but can cool spending.',
    'demand': 'Willingness to spend. When weak, growth slows.',
    'supply': 'How much can be produced and sold. When tight, prices rise.',
    'shortage': 'Not enough goods. Means higher prices and queues.',
    'recession': 'A period when the economy shrinks. Job losses and bankruptcies rise.',
    'stagflation': 'Stagnation plus high inflation—bad growth and rising prices together.',
    'detection': 'A covert op being exposed. Costs reputation and relations.',
    'scandal': 'A public exposure that burns approval and trust.',
    'sovereignty': 'A country’s right to decide for itself. Sanctions trigger sovereignty debates.',
    'reciprocity': '“I do to you what you did to me.” The logic of retaliation.',
    'wait-and-see': 'Watching without acting while uncertainty is high.',
    'panic': 'Everyone selling/fleeing at once. Prices move violently.',
    'speculative pressure': 'Aggressive bets that a currency will fall—can force a crisis faster.',
    'currency defense': 'Selling foreign reserves to keep the local currency strong. Burns reserves.',
    'reserve melt': 'Foreign-exchange stock falling fast. Defense becomes unsustainable.',
    'corridor': 'A trade route (sea or land). Block it and prices jump.',
    'suez': 'A chokepoint for Europe–Asia sea trade. Blockage spikes freight and delays.',
    'national champion': 'A state-backed giant firm built to compete globally; monopoly risk attached.',
    'intellectual property': 'Patents, brands, copyrights. Theft or revocation fuels tech conflict.',
    'patent': 'Legal monopoly on an invention for a limited time.',
    'certification': 'Proof a product meets standards. Weaponized, it becomes a market lockout.',
    'infrastructure belt': 'Long road/port/rail corridor projects. Change trade permanently; slow and costly.',
    'current account': 'Net foreign-currency flow from trade and services. Chronic deficits raise vulnerability.',
    'deficit': 'Spending more than earning (budget or trade).',
    'surplus': 'Earning more than spending (budget or trade).',
    'devaluation': 'Deliberately weakening the local currency. Helps exports; hurts imports.',
    'soft landing': 'Slowing the economy without a crash. Opposite of a hard landing/recession crash.',
    'hard landing': 'A sharp economic downturn after tightening.',
    'strike': 'Workers stopping work. Slows production and exports.',
    'protest': 'Street pressure. Rises when approval and stability fall.',
    'union': 'Worker organization that bargains wages and can strike.',
    'ngo': 'Non-governmental organization. Can deliver aid—or be used as a political tool.',
    'civil society': 'Organized public life outside the state (associations, NGOs).',
    'emergency powers': 'Extra authority claimed in a crisis, often with less oversight.',
    'confidence vote': 'Parliament votes whether it still supports the government.',
    'coalition': 'Several parties governing together. Can slow decisions.',
    'employment': 'People having jobs. Supports demand and social calm.',
    'red line': 'A limit you say you will answer harshly if crossed.',
    'risk score': 'In this game: penalty tally for detected grey-zone ops.',
    'mean reversion': 'The game’s tendency for extreme indicators to drift back toward normal.',
    "okun's law": 'Rule of thumb: stronger growth usually lowers unemployment.',
    'okun': 'Rule of thumb linking growth and unemployment (stronger growth → lower joblessness).'
  }
};

GAME.getGlossaryMap = function () {
  const lang = (GAME.i18n && GAME.i18n.getLang && GAME.i18n.getLang()) || 'tr';
  return GAME.GLOSSARY_BY_LANG[lang] || GAME.GLOSSARY_BY_LANG.tr || {};
};

GAME.escapeHtml = function (s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

GAME._isWordChar = function (ch) {
  if (!ch) return false;
  return /[0-9A-Za-z\u00C0-\u024F\u0400-\u04FF\u011E\u011F\u0130\u0131\u015E\u015F\u00C7\u00E7\u00D6\u00F6\u00DC\u00FC]/.test(ch);
};

/** Düz metindeki terimleri bul (çakışmasız, uzun öncelikli) */
GAME.findGlossaryHits = function (raw) {
  const text = String(raw || '');
  if (!text) return [];
  const map = GAME.getGlossaryMap();
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  const lower = text.toLowerCase();
  const occupied = new Array(text.length).fill(false);
  const hits = [];

  keys.forEach(key => {
    const k = key.toLowerCase();
    if (!k) return;
    let from = 0;
    while (from <= lower.length - k.length) {
      const i = lower.indexOf(k, from);
      if (i < 0) break;
      const end = i + k.length;
      const beforeOk = i === 0 || !GAME._isWordChar(text[i - 1]);
      const afterOk = end >= text.length || !GAME._isWordChar(text[end]);
      let blocked = false;
      for (let j = i; j < end; j++) if (occupied[j]) { blocked = true; break; }
      if (beforeOk && afterOk && !blocked) {
        for (let j = i; j < end; j++) occupied[j] = true;
        hits.push({
          start: i,
          end: end,
          surface: text.slice(i, end),
          key: key,
          explain: map[key]
        });
      }
      from = i + 1;
    }
  });
  hits.sort((a, b) => a.start - b.start);
  return hits;
};

/** Metni güvenli HTML'e çevir; terimlere * ve tıklanabilir span ekle */
GAME.annotateGlossaryText = function (raw) {
  const text = String(raw || '');
  if (!text) return '';
  const hits = GAME.findGlossaryHits(text);
  if (!hits.length) return GAME.escapeHtml(text);

  let html = '';
  let cursor = 0;
  hits.forEach((h, idx) => {
    if (h.start > cursor) html += GAME.escapeHtml(text.slice(cursor, h.start));
    const termHtml = GAME.escapeHtml(h.surface) + '*';
    html += '<span class="econ-term" tabindex="0" role="button" data-g-idx="' + idx + '" data-g-key="' +
      GAME.escapeHtml(h.key) + '" data-g-explain="' + GAME.escapeHtml(h.explain) + '" title="' +
      GAME.escapeHtml(h.explain) + '">' + termHtml + '</span>';
    cursor = h.end;
  });
  if (cursor < text.length) html += GAME.escapeHtml(text.slice(cursor));
  return html;
};

/** Satırdaki tüm terimlerden sade dil özeti */
GAME.plainExplainLine = function (raw) {
  const hits = GAME.findGlossaryHits(raw);
  const t = (k, v) => (GAME.t ? GAME.t(k, v) : k);
  if (!hits.length) return t('ui.glossary_none') || 'Bu satırda özel ekonomi terimi işaretlenmedi.';
  const seen = {};
  const parts = [];
  hits.forEach(h => {
    const k = h.key.toLowerCase();
    if (seen[k]) return;
    seen[k] = true;
    parts.push('• <b>' + GAME.escapeHtml(h.surface) + '</b>: ' + GAME.escapeHtml(h.explain));
  });
  return '<div class="gpop-title">' + (t('ui.glossary_line_title') || 'Bu satır ne diyor?') + '</div>' +
    '<div class="gpop-body">' + parts.join('<br><br>') + '</div>';
};

GAME._glossaryPopEl = null;
GAME.ensureGlossaryPop = function () {
  if (GAME._glossaryPopEl) return GAME._glossaryPopEl;
  const el = document.createElement('div');
  el.id = 'glossary-pop';
  el.className = 'glossary-pop hidden';
  el.setAttribute('role', 'tooltip');
  document.body.appendChild(el);
  GAME._glossaryPopEl = el;
  return el;
};

GAME.hideGlossaryPop = function () {
  const el = GAME.ensureGlossaryPop();
  el.classList.add('hidden');
  el.innerHTML = '';
};

GAME.showGlossaryPop = function (html, anchorEl, clientX, clientY) {
  const el = GAME.ensureGlossaryPop();
  el.innerHTML = html +
    '<div class="gpop-close"><button type="button" class="btn btn-small gpop-x">' +
    (GAME.t ? GAME.t('ui.close_modal') : 'Kapat') + '</button></div>';
  el.classList.remove('hidden');
  const xBtn = el.querySelector('.gpop-x');
  if (xBtn) xBtn.onclick = function (e) { e.stopPropagation(); GAME.hideGlossaryPop(); };

  // Konum: mobilde altta geniş; masaüstünde imleç/anchor yanında
  const pad = 8;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  el.style.position = 'fixed';
  el.style.zIndex = '300';
  el.style.maxWidth = (vw < 520 ? Math.min(vw - 16, 360) : 380) + 'px';
  el.style.left = '0px';
  el.style.top = '0px';
  // measure
  const rect = el.getBoundingClientRect();
  let left, top;
  if (vw < 520) {
    left = Math.max(pad, (vw - rect.width) / 2);
    top = Math.max(pad, vh - rect.height - pad - 12);
  } else {
    const ax = clientX != null ? clientX : (anchorEl ? anchorEl.getBoundingClientRect().left : 40);
    const ay = clientY != null ? clientY : (anchorEl ? anchorEl.getBoundingClientRect().bottom : 40);
    left = ax + 12;
    top = ay + 8;
    if (left + rect.width > vw - pad) left = vw - rect.width - pad;
    if (top + rect.height > vh - pad) top = Math.max(pad, ay - rect.height - 8);
    if (left < pad) left = pad;
    if (top < pad) top = pad;
  }
  el.style.left = left + 'px';
  el.style.top = top + 'px';
};

GAME.bindGlossaryUiOnce = function () {
  if (GAME._glossaryBound) return;
  GAME._glossaryBound = true;

  const onTermEnter = function (e) {
    const t = e.target.closest('.econ-term');
    if (!t) return;
    if (window.innerWidth < 520) return; // mobilde hover yok; tık kullan
    const explain = t.getAttribute('data-g-explain') || '';
    const key = t.getAttribute('data-g-key') || t.textContent;
    const html = '<div class="gpop-title">' + GAME.escapeHtml(key) + '</div>' +
      '<div class="gpop-body">' + GAME.escapeHtml(explain) + '</div>';
    GAME.showGlossaryPop(html, t, e.clientX, e.clientY);
  };
  const onTermLeave = function (e) {
    if (window.innerWidth < 520) return;
    const to = e.relatedTarget;
    if (to && (to.closest && (to.closest('#glossary-pop') || to.closest('.econ-term')))) return;
    // küçük gecikme: popover'a geçiş
    setTimeout(function () {
      const pop = GAME._glossaryPopEl;
      if (pop && !pop.matches(':hover') && !document.querySelector('.econ-term:hover')) {
        GAME.hideGlossaryPop();
      }
    }, 120);
  };

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest('.econ-term')) onTermEnter(e);
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest('.econ-term')) onTermLeave(e);
  });

  document.addEventListener('click', function (e) {
    const term = e.target.closest && e.target.closest('.econ-term');
    if (term) {
      e.preventDefault();
      e.stopPropagation();
      const explain = term.getAttribute('data-g-explain') || '';
      const key = term.getAttribute('data-g-key') || term.textContent;
      const html = '<div class="gpop-title">' + GAME.escapeHtml(key) + '</div>' +
        '<div class="gpop-body">' + GAME.escapeHtml(explain) + '</div>' +
        '<div class="gpop-hint">' + (GAME.t ? GAME.t('ui.glossary_term_hint') : '') + '</div>';
      GAME.showGlossaryPop(html, term, e.clientX, e.clientY);
      return;
    }
    const line = e.target.closest && e.target.closest('.irc-line[data-g-raw]');
    if (line && !e.target.closest('.econ-term')) {
      e.preventDefault();
      const raw = line.getAttribute('data-g-raw') || '';
      GAME.showGlossaryPop(GAME.plainExplainLine(raw), line, e.clientX, e.clientY);
      return;
    }
    if (!e.target.closest('#glossary-pop')) GAME.hideGlossaryPop();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') GAME.hideGlossaryPop();
  });
};

/** Haber satırı HTML parçası (title/body/effect) */
GAME.glossNewsParts = function (m) {
  const title = GAME.annotateGlossaryText(m.title || '');
  const body = m.body ? GAME.annotateGlossaryText(m.body) : '';
  const effectLabel = GAME.t ? GAME.t('ui.effect_label') : 'Etki';
  const effect = m.effect
    ? ' <span class="irc-effect">(' + GAME.escapeHtml(effectLabel) + ': ' + GAME.annotateGlossaryText(m.effect) + ')</span>'
    : '';
  const raw = [m.title, m.body, m.effect].filter(Boolean).join(' — ');
  return { title: title, body: body, effect: effect, raw: raw };
};
