# İçerik Yol Haritası

Bu dosya, hangi konunun hangi sırayla yazılacağına **sen** karar verip takip ettiğin bir kuyruk/durum tablosudur. İçindeki konu listesini Claude belirlemez — sen doldurursun. Claude Code, yeni bir içerik üretirken "sırada ne var, hangi kategoriye ve hangi sıraya (order) giriyor" bilgisini buradan okur.

## Nasıl Doldurulur

- Her kategori (JavaScript / React / Next.js / Genel / eklediğin yeni kategoriler) kendi tablosunda tutulur — `ARCHITECTURE.md`'deki klasör yapısıyla birebir eşleşir (`content/docs/<kategori>/`).
- `order` sütunu, o kategori içindeki sidebar sırasını belirler ve `meta.json`'daki `pages` dizisiyle eşleşmeli.
- Yeni bir kategori açarsan (ör. "TypeScript", "Tasarım Desenleri"), hem burada yeni bir tablo başlığı aç hem `content/docs/<yeni-kategori>/` klasörünü ve `meta.json`'ını oluştur (bkz. `ARCHITECTURE.md`).
- Bir konuyu yazmaya başladığında durumunu 🔄, bitirdiğinde ✅ olarak güncelle.

## Durum Lejantı

| İşaret | Anlamı |
|---|---|
| ✅ | Yayında |
| 🔄 | Yazılıyor / taslak halinde |
| ⬜ | Planlandı, henüz başlanmadı |

## JavaScript

| Durum | Konu | order |
|---|---|---|
| ✅ | Variable Scope & Closure | 1 |
| ✅ | Object Methods & this | 2 |
| ⬜ | | 3 |

## React

| Durum | Konu | order |
|---|---|---|
| ⬜ | | |

## Next.js

| Durum | Konu | order |
|---|---|---|
| ⬜ | | |

## Genel

| Durum | Konu | order |
|---|---|---|
| ⬜ | | |

---

## Claude Code'a Konu Verirken

Yeni bir konu yazdırmak istediğinde Claude Code'a şuna benzer bir talimat ver:

```
project-docs/CONTENT-GUIDELINES.md ve project-docs/ARCHITECTURE.md dosyalarını oku.
Sonra content/docs/react/<dosya-adi>.mdx dosyasını "<senin belirlediğin konu adı>"
için bu kurallara göre yaz.
Bittiğinde project-docs/CONTENT-ROADMAP.md'deki ilgili satırı ✅ olarak işaretle
ve konu adını/order'ını tabloya ekle.
```

Bu talimat hem üretilen içeriğin kural setine uymasını garanti eder hem de bu dosyayı güncel tutar — böylece hangi konuların yazıldığını, hangilerinin sırada olduğunu tek bir yerden takip edersin.
