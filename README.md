# KÜRESEL ETKİ

Sıra tabanlı ekonomik devlet yönetimi simülasyonu. Büyük bir küresel felaket sonrası
seçtiğin ülkeyi **sadece ekonomik enstrümanlarla** yönet; her müdahalenin tüm dünya
ekonomisine yayılan kısa/orta/uzun vadeli etkilerini gör.

## Nasıl Çalıştırılır?

**En kolay yol:** `index.html` dosyasına çift tıkla (tarayıcıda açılır).

**Sunucu ile (önerilen):**
```
node serve.js
```
→ http://localhost:8123


## Oyun Özellikleri

- **17 ülke:** ABD, Çin, AB, Japonya, Hindistan, BK, Rusya, Kanada, Brezilya, G. Kore, Avustralya, Meksika, Endonezya, Suudi Arabistan, Türkiye, İsviçre, G. Afrika
- **10 küresel felaket:** Süper volkan, Süveyş tıkanması, mega kasırga, BRICS para birimi…
- **48 enstrüman, 4 katman:** Yapısal projeler, konjonktürel/makro araçlar, piyasa operasyonları, gri alan taktikleri
- **4 slot kuralı:** Her turda (3 ay) en fazla 4 müdahale
- **Etki motoru:** Anlık şok → kısa vade → orta vade → kalıcı paradigma değişimi
- **Tonlu diplomasi:** 5 seviyeli mesaj sistemi (Dostane → Düşmanca), ülke kişilikleri
- **İç dinamikler:** 6 çıkar grubu, toplum onayı, istikrar, protestolar, hükümet değişikliği
- **AI ülkeler:** Kendi krizlerine tepki verir, proje başlatır, yaptırım uygular
- **Gri alan riski:** Örtülü operasyonlar tespit edilirse ilişkiler çöker, misilleme gelir
- **Miras sistemi:** Oyun sonunda kalıcı yapısal değişimlerin ve 5 performans skoru

- **Kayıt:** Otomatik (localStorage). Menüden "Devam Et".

## Geliştirme

- Kalıcı kurallar / mimari: [AGENTS.md](AGENTS.md)
- Açık todo şablonu: [YAPILACAKLAR.example.md](YAPILACAKLAR.example.md)  
  (Gerçek sunucu/SSH bilgileri `YAPILACAKLAR.md` dosyasında tutulur; **gitignore** — repoya girmez.)
- Test: `node test-consistency.js`
