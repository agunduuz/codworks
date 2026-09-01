# İçerik Yazım Kuralları

Bu doküman, Claude Code'un (veya bu projede içerik üretecek herhangi bir Claude örneğinin) her yeni `.mdx` konusunu üretirken **birebir uyması gereken** stil rehberidir. "Variable Scope & Closure" ve "Object Methods & this" makaleleri bu kuralların referans uygulamasıdır — yeni bir konu yazarken önce bu ikisine bak.

## 1. Temel İlkeler

- **Dil:** Türkçe.
- **Hedef kitle:** Konuyu ilk kez öğrenen junior geliştiriciden, mülakata hazırlanan mid-level geliştiriciye, gerçek projede sorun çözen deneyimli geliştiriciye kadar geniş bir yelpaze — "Beginner to Expert" prensibi.
- **Yabancı terim kuralı:** Bir İngilizce terim ilk geçtiği yerde mutlaka parantez içinde Türkçe karşılığı/açıklaması verilir. Örnek: `closure (kapanış)`, `hoisting (yukarı taşıma)`. Aynı terim tekrar geçtiğinde parantez tekrarlanmaz.
- **Karar + gerekçe ilkesi:** Bir kural veya davranış anlatılırken sadece "böyledir" denmez, **neden böyle olduğu** da açıklanır. ("`const` her yerde tercih edilir" değil, "`const` her yerde tercih edilir çünkü yeniden atamayı derleme zamanında engeller ve kodun okunabilirliğini artırır.")
- **Adım adım, sıra sıra anlatım:** Karmaşık mekanizmalar (ör. closure'ın iç işleyişi, `this` bağlanma kuralları) tek paragrafta değil, numaralandırılmış adımlarla anlatılır.
- **Gerçekçi ve disiplinli ton:** Abartılı pazarlama dili yok ("inanılmaz", "muhteşem" gibi ifadelerden kaçınılır). Ders kitabı okur gibi net, sakin, güvenilir bir ton korunur.

## 2. Zorunlu Bölüm Şablonu

Her yeni konu makalesi aşağıdaki sırayı takip eder (konunun doğasına göre bölüm sayısı değişebilir ama sıra mantığı korunur):

1. **Hero / Giriş** — Konunun başlığı, kısa bir alt başlık (bu makale mülakatta/projede neye yarayacak?).
2. **İçindekiler (TOC)** — Tüm bölümlere anchor link.
3. **Temel kavram(lar)** — Her kavram önce 🧸 **çocuğa anlatır gibi** bir analoji ile açılır, sonra teknik tanım gelir.
4. **Derinlemesine mekanizma** — Motorun/dilin arka planda ne yaptığı (🧠 uzman seviyesi kutusu ile).
5. **Kullanım alanları / pratik senaryolar** — Gerçek kod örnekleriyle.
6. **Klasik hatalar ve mülakat soruları** — Konunun en sık sorulan mülakat sorusu ayrı bir bölüm olarak işlenir.
7. **⚛️ Frontend Developer notları** — Konunun React/Next.js/tarayıcı ortamındaki özel yansımaları, ayrı ayrı kutucuklarla.
8. **Sık yapılan hatalar** — Kısa, madde madde.
9. **Mülakat soru-cevap özeti** — Tablo halinde, hızlı tekrar için.
10. **Uçtan uca örnekler** — Zorluk seviyesi etiketlenmiş (Başlangıç / Orta Seviye / İleri Düzey), en az 4-6 örnek.
11. **Hızlı referans (cheat sheet)** — Koyu temalı, tablo halinde özet.

## 3. Callout (Kutucuk) Sistemi

Her makalede aynı beş kutucuk tipi, aynı anlamla kullanılır:

| Kutucuk | İkon | Ne Zaman Kullanılır |
|---|---|---|
| Çocuğa Anlatır Gibi | 🧸 | Her yeni ana kavramın ilk tanıtımında, teknik tanımdan önce |
| Frontend Developer Notu | ⚛️ | Konunun React/Next.js/tarayıcı/DOM ile kesiştiği her nokta |
| Mülakat İpucu | 💼 | Konunun mülakatta nasıl soru olarak çıktığı ve nasıl cevaplanacağı |
| Uzman Seviyesi | 🧠 | Spesifikasyon/motor seviyesinde detaylar (ör. V8'in davranışı, ECMAScript terimleri) |
| Dikkat / Sık Hata | ⚠️ | Yaygın yanlış anlamalar, tuzaklar |

Yeni bir kutucuk tipi eklemeden önce bu beşinin yetersiz kaldığından emin ol — tutarlılık, okuyucunun kutucuğa bakar bakmaz ne bekleyeceğini bilmesini sağlar.

## 4. Kod Örneği Kuralları

- Kod içindeki değişken/fonksiyon isimleri **Türkçe** olabilir (ör. `sepetToplaminiHesapla`), İngilizce API isimleri (ör. `useState`, `addEventListener`) olduğu gibi kalır.
- Satır içi yorumlar Türkçe yazılır ve kısa tutulur.
- Beklenen çıktı her zaman yorum satırı olarak belirtilir (`// "Merhaba"`).
- Yanlış/riskli kod `❌`, doğru/önerilen kod `✅` ile işaretlenir.
- Her kod bloğunun üstünde küçük bir "dosya adı" etiketi olur (ör. `hoisting-var.js`) — bu, örneğin bağlamını (bağımsız bir dosya mı, bir component mi) netleştirir.
- Bir kavramın "yanlış kullanımı" gösterilecekse, hemen ardından "doğru kullanımı" da gösterilir — asla sadece hata gösterip bırakılmaz.

## 5. Örnek Seviyelendirme

Uçtan uca örnekler bölümünde her örnek şu üç etiketten biriyle işaretlenir:

- **Başlangıç** — Tek kavramı izole gösteren, yorumsuz okunabilecek kadar kısa kod.
- **Orta Seviye** — Gerçek bir senaryo (bir bug'ı düzeltmek, bir UI davranışını yönetmek).
- **İleri Düzey** — Birden fazla kavramı birleştiren, genellikle React/Next.js bağlamına oturan senaryo.

## 6. Pedagojik / Bilimsel Dayanaklar

İçerik sadece "iyi anlatım sezgisiyle" değil, öğrenme bilimindeki yerleşik kavramlarla da destekleniyor. Yeni içerik üretilirken bu ilkeler bilinçli olarak uygulanmalı:

- **Dual Coding Theory (İkili Kodlama Teorisi — Allan Paivio):** Bilgi hem sözel hem görsel/mecazi biçimde sunulduğunda hafızada daha güçlü iz bırakır. 🧸 analoji kutuları (mecazi/görsel kodlama) + teknik tanım (sözel/soyut kodlama) kombinasyonu doğrudan bu ilkeye dayanır.
- **Cognitive Load Theory (Bilişsel Yük Teorisi — John Sweller):** Çalışan bellek sınırlıdır; bilgi küçük, yönetilebilir parçalara (chunking) bölünmeli. Bu yüzden her makalede tek bir kavram tek bir bölümde işlenir, adım adım numaralandırılmış listeler kullanılır, uzun paragraflardan kaçınılır.
- **Worked Example Effect (Çözümlü Örnek Etkisi):** Yeni öğrenenler, önce çözülmüş bir örneği inceleyerek daha hızlı öğrenir, sonra kendi başlarına problem çözmeye geçer. Bu yüzden her yeni kavramdan hemen sonra çalışan bir kod örneği gelir — teori asla örneksiz bırakılmaz.
- **Elaborative Interrogation (Açıklayıcı Sorgulama):** "Neden böyle?" sorusunu sorup cevaplamak, bilgiyi mevcut bilgiyle ilişkilendirerek kalıcılığı artırır. "Karar + gerekçe ilkesi" (madde 1) bunun doğrudan uygulamasıdır.
- **Retrieval Practice / Testing Effect (Hatırlama Pratiği):** Bilgiyi tekrar tekrar pasif okumak yerine aktif olarak hatırlamaya çalışmak, kalıcı öğrenmeyi güçlendirir. Mülakat soru-cevap özeti ve cheat sheet bölümleri, okuyucunun konuyu kendi kendine test etmesi için tasarlanır.
- **Spaced Repetition (Aralıklı Tekrar) için uygunluk:** Her makalenin sonunda bir cheat sheet olması, okuyucunun haftalar sonra geri dönüp hızlıca tazelemesini kolaylaştırır — bu da uzun vadeli hafızayı destekler.

Yeni bir konu yazılırken, mümkünse ilgili alanın (ör. React'in resmi dokümantasyonu, TC39 spesifikasyonu, MDN) güncel kaynaklarına bakılmalı; teknik detaylarda tahmine değil doğrulanmış bilgiye dayanılmalı.

## 7. MDX Frontmatter Şeması

Her `.mdx` dosyasının başında şu alanlar bulunur (kesin alan adları `ARCHITECTURE.md`'de tanımlı):

```yaml
---
title: "Object Methods & this"
description: "Object literal'de method tanımlama ve this'in 4+1 bağlanma kuralı"
category: "javascript"
level: "beginner-to-expert"
tags: ["this", "object", "call", "apply", "bind", "arrow-function"]
order: 2
---
```

## 8. Kontrol Listesi (Yeni Konu Yayınlamadan Önce)

- [ ] Her ana kavram için 🧸 çocuğa anlatır gibi kutu var mı?
- [ ] Her yabancı terim ilk geçtiği yerde parantezle açıklandı mı?
- [ ] Her kural/karar için "neden" cevaplandı mı?
- [ ] En az bir ⚛️ Frontend Developer bölümü var mı?
- [ ] Klasik mülakat sorusu ayrı başlıkla işlendi mi?
- [ ] Uçtan uca örnekler seviyelendirildi mi (Başlangıç/Orta/İleri)?
- [ ] Mülakat soru-cevap tablosu ve cheat sheet eklendi mi?
- [ ] Frontmatter eksiksiz mi (title, description, category, level, tags, order)?
