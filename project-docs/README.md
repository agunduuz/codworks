# Kod Atlası (öneri — kolayca değiştirilebilir proje adı)

JavaScript, React, Next.js ve daha geniş web geliştirme ekosistemi üzerine; mülakata hazırlanırken de günlük geliştirme sırasında da başvurulabilecek, Türkçe, derinlemesine ve öğreticiliği yüksek bir kişisel bilgi kaynağı / öğrenme platformu.

Bu proje şu iki makaleyle başladı ve aynı yapı korunarak büyütülüyor:
- **JavaScript Variable Scope & Closure**
- **JavaScript Object Methods & this**

Bundan sonraki her konuyu sen belirliyorsun; her biri `CONTENT-GUIDELINES.md` içinde tanımlanan aynı kalıpla üretilecek.

---

## Bu Klasördeki Dosyalar

| Dosya | Ne İşe Yarar |
|---|---|
| `README.md` | Bu dosya — genel bakış ve hızlı başlangıç |
| `TECH-STACK.md` | Seçilen teknoloji yığını ve gerekçeleri |
| `CONTENT-GUIDELINES.md` | İçerik yazım kuralları — Claude Code'un her yeni konuyu üretirken uyacağı stil rehberi |
| `CONTENT-ROADMAP.md` | Konu listesi ve durumları — **sen** dolduruyorsun (JavaScript / React / Next.js / Genel + eklediğin yeni kategoriler) |
| `ARCHITECTURE.md` | Klasör yapısı, içerik şeması (frontmatter), routing planı |
| `DESIGN-BRIEF.md` | Claude Design ile arayüz tasarımı yaparken kullanılacak marka/görsel kimlik notu |
| `SETUP.md` | Sıfırdan Vercel'e kadar tüm kurulum komutları — npm, GitHub, Vercel dahil adım adım |

Bu dosyaların hepsi proje reposuna eklenir. Aşağıdaki bölüm tam olarak nereye ve nasıl kullanılacağını anlatıyor.

---

## Dosyaları Nereye Koyacaksın?

Önerilen konum proje kökünde ayrı bir **`project-docs/`** klasörü — `content/docs/` ile karışmasın diye bilerek farklı isim seçildi; o klasör Fumadocs'un yayınladığı **gerçek makaleler** için, bu 7 dosya ise **proje hafızası/planlama** için:

```
kod-atlasi/
├── project-docs/              ← bu 7 dosya burada yaşar
│   ├── README.md
│   ├── TECH-STACK.md
│   ├── SETUP.md
│   ├── DESIGN-BRIEF.md
│   ├── CONTENT-GUIDELINES.md
│   ├── CONTENT-ROADMAP.md
│   └── ARCHITECTURE.md
├── content/docs/               ← Fumadocs'un yayınladığı gerçek .mdx makaleler
├── app/
├── components/
└── ...
```

## Hangi Dosyayı Claude Code'a Vereceksin?

Hepsini repoya eklemen yeterli — ama **her içerik üretimi isteğinde** Claude Code'a özellikle şu ikisini işaret et, çünkü üretilen makalenin kurallara uyup uymadığını bunlar belirliyor:

| Dosya | Claude Code'a her seferinde referans verilir mi? | Neden |
|---|---|---|
| `CONTENT-GUIDELINES.md` | ✅ **Evet, her yeni konuda** | Yazım kuralları, callout sistemi, kontrol listesi |
| `ARCHITECTURE.md` | ✅ **Evet, her yeni konuda** | Frontmatter şeması, klasör/route eşlemesi |
| `CONTENT-ROADMAP.md` | ✅ Evet — hem hangi konunun yazılacağını okumak hem durumu güncellemek için | Konu listesini **sen** dolduruyorsun (dosyanın içindeki brief'e bak) |
| `TECH-STACK.md` | Hayır — tek seferlik | Sadece proje iskeletini kurarken lazım |
| `SETUP.md` | Hayır — tek seferlik | Sadece ilk kurulum, GitHub/Vercel bağlarken lazım |
| `DESIGN-BRIEF.md` | Hayır | Sadece Claude Design'da arayüz tasarlarken lazım |
| `README.md` | Hayır | Genel oryantasyon — Claude Code'un okumasına gerek yok |

**Pratikte nasıl kullanılır:** Yeni bir konu yazdırmak istediğinde Claude Code'a şöyle bir talimat verirsin:

```
project-docs/CONTENT-GUIDELINES.md ve project-docs/ARCHITECTURE.md dosyalarını oku.
Sonra content/docs/react/<dosya-adi>.mdx dosyasını "<senin seçtiğin konu adı>"
için bu kurallara göre yaz.
Bittiğinde project-docs/CONTENT-ROADMAP.md'deki ilgili satırı ✅ işaretle.
```

Konu adını, sırasını ve hangi kategoriye gireceğini **sen** belirliyorsun — bunu `CONTENT-ROADMAP.md` dosyasına kendin işliyorsun. O dosyanın başında bunu nasıl dolduracağını anlatan kısa bir brief var.

---

## Önerilen Çalışma Akışı

1. **Tasarım (Claude Design):** `DESIGN-BRIEF.md`'deki görsel kimlik notunu referans alarak arayüz tasarımını oluştur (mevcut iki makalede kurulan kimliği devam ettirmek ya da sıfırdan yeni bir yön belirlemek — ikisi de mümkün, brief'te ikisi de not edildi).
2. **İskelet (Claude Code):** `TECH-STACK.md`'deki adımlarla proje iskeletini kur (Next.js + Fumadocs).
3. **İçerik (Claude Code + Claude):** `CONTENT-GUIDELINES.md` kurallarına göre, `CONTENT-ROADMAP.md`'deki sıradaki konuyu `.mdx` dosyası olarak üret. Var olan iki makale bu şablona uyarlanarak ilk iki içerik olur.
4. **Yayın (Vercel):** Repo'yu Vercel'e bağla, her `git push`'ta otomatik deploy + her PR'da preview link.

## Hızlı Başlangıç (Claude Code için)

```bash
npm create fumadocs-app
# ◇ Project name → proje adını gir
# ◆ Choose a framework → Next.js
# ◆ Choose a content source → Fumadocs MDX

cd <proje-adi>
npm install
npm run dev
```

GitHub reposu açma ve Vercel'e yayınlama dahil **tam adım adım komut listesi** için `SETUP.md` dosyasına bak.

## Vizyon Notu

Bu bir "blog" değil, bir **başvuru kaynağı**dır. Her makale şu üç şeyi aynı anda başarmalı:
1. Bir junior geliştiricinin konuyu **ilk kez** anlaması (5 yaşındaki çocuğa anlatır gibi bölüm),
2. Bir mülakata hazırlanan geliştiricinin **hızlıca tekrar** yapması (mülakat soru-cevap özeti + cheat sheet),
3. Deneyimli bir geliştiricinin **gerçek projede** karşılaştığı sorunları çözmesi (Frontend Developer notları, ileri düzey detaylar).
