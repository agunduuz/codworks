# Tasarım Brief'i (Claude Design için)

Bu doküman, Claude Design ile arayüz tasarımı yaparken referans alınacak brief'tir. İki yol var — hangisiyle başlayacağını sen seçersin:

- **A) Devam Yolu:** İki mevcut makalede kurulmuş görsel kimliği (aşağıda dökümante edildi) sitenin tamamına taşımak — tutarlılık, hız.
- **B) Yeniden Keşif Yolu:** Claude Design'a bu brief'i sadece "içerik türü" ve "hedef kitle" bağlamı olarak vermek, görsel kimliği sıfırdan önerttirmek — daha özgün ama mevcut iki makaleyle uyumsuz kalma riski var (o zaman o ikisi de yeni kimliğe göre güncellenmeli).

Hangi yolu seçersen seç, Claude Design'a şu bağlamı mutlaka ver:

## İçerik ve Hedef Kitle

- **Ne:** JavaScript/React/Next.js ve genel web geliştirme üzerine derinlemesine, Türkçe teknik makaleler.
- **Kim için:** Mülakata hazırlanan ve/veya günlük işinde referans arayan yazılım geliştiriciler (junior'dan senior'a).
- **Sayfanın işi:** Uzun, yapılandırılmış teknik metni (kod blokları, tablolar, kutucuklu uyarılar, TOC) okunabilir ve gezilebilir kılmak. Bu bir "landing page" değil, bir **okuma/başvuru arayüzü**.

## Mevcut Görsel Kimlik (Yol A için referans, Yol B için "başlangıç noktası ama zorunlu değil")

**Renk Paleti**
| Token | Hex | Kullanım |
|---|---|---|
| Paper (zemin) | `#fbf8f1` | Ana arka plan — kağıt/defter hissi |
| Paper Dim | `#f3efe4` | İkincil paneller, TOC kutusu |
| Ink (metin) | `#1e2430` | Ana metin rengi |
| Gold (vurgu) | `#a9711f` | Başlıklar, linkler, ana vurgu — Frontend Developer kutucuğu |
| Teal (vurgu 2) | `#2f6b60` | Çocuğa Anlatır Gibi kutucuğu |
| Rose (vurgu 3) | `#9c4a3d` | Mülakat İpucu ve Dikkat/Uyarı kutucukları |
| Navy (koyu blok) | `#1b2436` | Hero alanı, Uzman Seviyesi kutucuğu, cheat sheet |

**Tipografi**
- Başlıklar: `Fraunces` (serif, karakterli) — "ders kitabı" hissi verir.
- Gövde metni: `Inter` (sans-serif) — yüksek okunabilirlik.
- Kod: `JetBrains Mono` — geliştiricilere tanıdık gelen bir monospace.

**Yapısal Kimlik**
- Koyu lacivert (navy) bir "hero" bandı, üstte ince altın (gold) çizgi.
- İçerik tek sütun, ~760px maksimum genişlik — uzun teknik metin için okunabilirlik önceliği.
- Beş sabit kutucuk tipi (🧸 çocuğa anlatır gibi / ⚛️ frontend notu / 💼 mülakat ipucu / 🧠 uzman seviyesi / ⚠️ dikkat) — her biri kendi rengiyle anında tanınıyor.
- Kod blokları koyu tema (`#1a2130`), üstte macOS tarzı üç nokta + dosya adı etiketi.

## Claude Design'a Vereceğin Yönerge (Örnek)

> "JavaScript, React ve Next.js üzerine Türkçe, derinlemesine teknik makaleler yayınlayan bir öğrenme/başvuru platformu tasarlıyorum. Hedef kitle mülakata hazırlanan ve günlük işinde referans arayan yazılım geliştiricileri. İçerik çok uzun ve yapılandırılmış (kod blokları, tablolar, beş farklı tipte uyarı kutucuğu, içindekiler tablosu). Ana sayfa + kategori sayfası (JavaScript/React/Next.js/Genel) + makale sayfası (sidebar + TOC + içerik) tasarımı istiyorum. [Yol A ise: Ekli renk/tipografi tablosunu temel al ve bunun üzerine sidebar, ana sayfa, kategori kartları gibi eksik parçaları tasarla.] [Yol B ise: Bu içerik türü ve hedef kitle için sıfırdan, özgün bir görsel kimlik öner — kağıt/defter kliğesi klişesinden kaçınarak farklı bir yön dene.]"

## Claude Design Çıktısından Sonra

Tasarım onaylandıktan sonra, üretilen renk/tipografi token'larını `ARCHITECTURE.md`'de tanımlanan `tailwind.config.ts` ve `styles/globals.css` dosyalarına aktarman yeterli — Fumadocs'un kendi bileşenleri (sidebar, arama kutusu, TOC) bu Tailwind token'larını otomatik olarak miras alır, ayrıca elle stillendirmen gerekmez.
