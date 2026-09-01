# Tasarım Sistemi — Codworks

Bu doküman `DESIGN-BRIEF.md`'in çıktısıdır. Brief'teki **Yol B (yeniden keşif)**
seçildi: kağıt/defter klişesinden çıkıldı, ama mevcut iki makaledeki *pirinç/altın
vurgu* ve *serif başlık* karakteri korunarak devamlılık sağlandı — yani eski
makaleler yeni kimliğe küçük dokunuşlarla taşınabilir, sıfırdan yazılmaları gerekmez.

Uygulama `ARCHITECTURE.md`'deki klasör yapısına ve `TECH-STACK.md`'deki yığına
(Next.js 16 App Router + Fumadocs + Tailwind v4) birebir oturur.

---

## 1. Tez

> **Atölye.** Bu site bir dergi ya da defter değil; bir tezgah.
> Grafit bir gövde, üzerinde pirinç bir sinyal.

Neden bu yön:

- **Konu**, ölçülebilir ve kesin bir şey (dilin davranışı). Görsel dil de ölçüm
  aleti dilinden geliyor: blueprint ızgarası, mono etiketler, numaralı indeks,
  sıfır dolgulu sayılar (`02`, `05`).
- **Sayfanın işi** okumak ve geri dönüp bakmak. Bu yüzden hiçbir bölüm dekoratif
  değil: her görsel öğe ya bir sınır işaretliyor ya bir tür ayırıyor ya bir
  koordinat veriyor.
- **Cesaret tek yerde harcanıyor:** ana sayfa hero'sundaki ızgara + pirinç ufuk.
  Geri kalan her şey bilinçli olarak sakin.

## 2. Renk

Token'lar `app/global.css` içinde üç katmanda tanımlı: ham palet → semantik →
Fumadocs köprüsü (`--color-fd-*`). Fumadocs'un sidebar, arama, TOC bileşenleri
bu köprüden otomatik miras alır; elle stillendirme gerekmez.

### Marka ve yüzeyler

| Token | Açık | Koyu | Kullanım |
|---|---|---|---|
| `--color-brand` | `#946017` | `#e0a34f` | Link, vurgu, CTA, başlık işareti |
| `--color-brand-strong` | `#7d5214` | `#f0c07f` | Satır içi kod, hover |
| `--color-brand-soft` | `#f5ead6` | `#2a2115` | Pirinç zeminli küçük alanlar |
| `--color-fd-background` | `#f4f4f2` | `#0b0d11` | Sayfa zemini |
| `--color-fd-card` | `#fbfbfa` | `#12151a` | Kart / panel |
| `--color-fd-foreground` | `#14171c` | `#e8e9ec` | Gövde metni |
| `--color-fd-muted-foreground` | `#5b6069` | `#9299a5` | İkincil metin |
| `--color-fd-border` | `#dedddb` | `#23272f` | Kılcal sınır |

### Beş kutucuk tonu

Hue çemberinde bilerek ayrık beş nokta (25° · 70° · 180° · 250° · 290°) — iki
kutucuk asla birbirine benzemesin diye.

| Tip | Token | Açık | Koyu |
|---|---|---|---|
| 🧸 Çocuğa Anlatır Gibi | `--color-tone-child` | `#0e766c` | `#4fd6c2` |
| ⚛️ Frontend Notu | `--color-tone-frontend` | `#2358c9` | `#7ea8ff` |
| 💼 Mülakat İpucu | `--color-tone-interview` | `#7038d8` | `#bda6ff` |
| 🧠 Uzman Seviyesi | `--color-tone-expert` | `#946017` | `#e0a34f` |
| ⚠️ Dikkat | `--color-tone-warning` | `#bd3a26` | `#f89882` |

### Kategori tonları

`--color-cat-javascript` (pirinç) · `--color-cat-react` (camgöbeği) ·
`--color-cat-nextjs` (nötr grafit/beyaz) · `--color-cat-genel` (teal).
Tek kaynak: `lib/categories.ts`.

### Kontrast

Tüm metin/zemin çiftleri WCAG AA (4.5:1) üstünde doğrulandı. Açık temadaki
pirinç bu yüzden brief'teki `#a9711f`'ten `#946017`'ye koyulaştırıldı — 11px'lik
mono etiketlerde `#a9711f` 4.17:1'de kalıyordu.

| Çift (açık tema) | Oran |
|---|---|
| Gövde metni / zemin | 16.31:1 |
| İkincil metin / zemin | 5.74:1 |
| Pirinç link / zemin | 4.83:1 |
| Satır içi kod / muted | 5.70:1 |
| CTA metni / pirinç | 5.24:1 |
| En düşük kutucuk etiketi (expert) | 4.81:1 |

## 3. Tipografi

Üç aileli sistem; her ailenin tek bir işi var.

| Rol | Aile | Neden |
|---|---|---|
| Başlık / display | **Bricolage Grotesque** (variable) | Karakterli ama okunur bir grotesk. Fraunces'ın "ders kitabı" çağrışımı yerine modern, çizgisi hafif asimetrik bir ses. `latin-ext` ile ş/ğ/ı/ç/ö/ü tam destekli. |
| Gövde | **Inter** | Uzun Türkçe teknik metinde en yüksek okunabilirlik. |
| Kod / etiket | **JetBrains Mono** | Kod blokları, dosya adları ve `cw-label` etiketleri. |

- Başlıklarda `letter-spacing: -0.022em`, gövdede `line-height: 1.78`.
- Boyutlar `clamp()` ile akışkan — ayrı mobil ölçek tablosu yok.
- `cw-label` yardımcı sınıfı: 11px JetBrains Mono, `0.16em` harf aralığı,
  büyük harf. Sitenin "ölçüm aleti" sesi bu tek sınıftan geliyor.

## 4. Yardımcı sınıflar (imza öğeler)

`app/global.css` içinde `@utility` ile tanımlı:

| Sınıf | İş |
|---|---|
| `cw-grid` | Blueprint ızgarası + radyal maske. Hero ve kategori bandı. |
| `cw-glow` | Pirinç ufuk parıltısı. Sadece ana sayfa hero'sunda. |
| `cw-hairline` | Kenarları sönümlenen pirinç kılcal çizgi — yapısal sınır imzası. |
| `cw-label` | Mono üst etiket. |
| `cw-rise` | Kademeli giriş animasyonu. Gecikme `style={{ '--d': '80ms' }}` ile. |

`prefers-reduced-motion: reduce` altında tüm animasyon ve geçişler kapanır.

## 5. Sayfa mimarisi

### Ana sayfa — `app/(home)/page.tsx`

1. **Hero** (`components/site/hero.tsx`) — ızgara + parıltı, tek cümlelik tez,
   iki CTA, ölçüm şeridi (makale/kategori/katman sayısı).
2. **Okuma Sözleşmesi** (`layer-legend.tsx`) — beş kutucuk tipi lejant olarak.
   Hem kimlik teşhiri hem gerçek bir gezinme yardımı. Altıncı hücre örnek makaleye
   çıkar, böylece ızgara da kapanır.
3. **İndeks** (`category-grid.tsx`) — dört kategori, numaralı, mono kodlu,
   konu çipli, makale sayılı. Pazarlama kartı değil, içindekiler sayfası.
4. **Son Eklenenler** (`recent-articles.tsx`) — kart ızgarası değil **satır listesi**;
   uzun listeler taranarak okunur.
5. **Nereden Başlamalı** (`start-here.tsx`) — koyu panel, üç okuma bağlamı.

### Kategori sayfası — `app/(home)/kategori/[slug]/page.tsx`

Hero'nun tonlanmış, sakinleştirilmiş hâli (kategori rengiyle radyal parıltı) +
makale listesi + diğer kategorilere geçiş şeridi. Statik üretilir.

### Makale sayfası — `app/docs/[[...slug]]/page.tsx`

Fumadocs `DocsPage` üzerine:
- Başlık altına **ölçüm şeridi** (`components/site/article-meta.tsx`):
  kategori rozeti, seviye, okuma süresi, güncelleme tarihi, etiketler.
- Sidebar'a **okuma sözleşmesi kartı** (`components/site/sidebar-banner.tsx`).
- Okuma sütunu `50rem` (≈800px) — brief'teki 760px hedefine yakın, ama kod
  bloklarının sarmalanmadan sığmasına izin verecek kadar geniş.
- `h2`: üstte tam genişlik kılcal çizgi + satır başında 28px pirinç işaret.
  Bölüm sınırı iki kez işaretlenir, uzun makalede kaybolmayı önler.

## 6. MDX bileşenleri

`components/mdx/` altında, `components/mdx.tsx`'te kayıtlı.

| Bileşen | Kullanım |
|---|---|
| `<Callout type="child\|frontend\|interview\|expert\|warning">` | Beş sabit kutucuk. |
| `<ExampleCard title level="baslangic\|orta\|uzman" summary>` | Uçtan uca örnek + seviye rozeti. |
| `<CheatSheet title rows={[{term, meaning}]} />` | Her iki temada koyu özet paneli. |
| `<CodeTabs items={[...]}><CodeTab value="…">` | Çok dosyalı kod. |

Notlar:

- `Callout`, Fumadocs'un varsayılan `Callout`'unu **bilerek gölgeliyor**;
  `> [!NOTE]` sözdiziminden gelen `info/warn/error` tipleri beş tipli sisteme
  eşleniyor, böylece tek bir görsel sözleşme kalıyor.
- **İkonlar emoji değil, lucide SVG.** Brief'teki 🧸⚛️💼🧠⚠️ kimliği *etiket
  metni* olarak korunuyor; ikon SVG'ye çevrildi çünkü emoji işletim sistemine
  göre farklı çiziliyor, renk miras almıyor ve ekran okuyucuda gürültü yaratıyor.
- Renk hiçbir yerde tek başına anlam taşımıyor: her kutucukta ikon + mono etiket,
  seviye rozetinde `●○○` gibi dolgu göstergesi var.

## 7. Erişilebilirlik ve davranış

- Tüm metin çiftleri ≥ 4.5:1 (yukarıdaki tablo).
- Global `:focus-visible` → 2px pirinç dış çizgi, 2px offset.
- Tıklanabilir her öğede `cursor-pointer` ve 200ms geçiş.
- `prefers-reduced-motion` tüm animasyonları kapatır.
- 375 / 768 / 1024 / 1440px'de yatay taşma yok (kod blokları kendi
  `overflow-x` kapsayıcısında kayar).
- Arayüz metinleri Türkçe: `lib/i18n.ts` → `RootProvider i18n`.
  ("Bu sayfada", "Ara", "Sonraki", 404 metinleri…)

## 8. Brief'ten bilinçli sapmalar

| Brief | Uygulama | Gerekçe |
|---|---|---|
| Kağıt zemin `#fbf8f1` | Grafit/nötr yüzeyler, koyu tema birinci sınıf | Kağıt klişesinden kaçınma (Yol B'nin açık isteği); geliştiriciler koyu temada okur |
| Başlık fontu Fraunces | Bricolage Grotesque | Ders kitabı yerine modern/akışkan bir ses; mono ile daha iyi eşleşiyor |
| Altın `#a9711f` | `#946017` (açık) / `#e0a34f` (koyu) | Küçük mono etiketlerde 4.5:1 kontrastı geçmesi için |
| Uzman kutucuğu navy | Pirinç | Beş hue'nun ayrık kalması; navy zaten yüzey rengi |
| Emoji ikonlar | lucide SVG + aynı etiket metni | Tutarlı çizim, renk mirası, erişilebilirlik |
| Kod blokları hep koyu | Temayı takip eder | Okuyucunun tema tercihine saygı; `CheatSheet` tek "hep koyu" öğe olarak imza kalır |
| `tailwind.config.ts` + `styles/globals.css` | Tek dosya: `app/global.css` | Tailwind v4 CSS-first yapılandırma; ayrı JS config dosyası artık gerekmiyor |

## 9. Genişletme

- **Yeni kategori:** `lib/categories.ts`'e bir kayıt + `app/global.css`'e
  `--color-cat-<slug>` (açık ve koyu) + `content/docs/<slug>/meta.json`.
  Kategori sayfası, ana sayfa kartı, footer linki otomatik gelir.
- **Yeni kutucuk tipi:** `components/mdx/callout.tsx` içindeki `variants` +
  yeni bir `--color-tone-*`. Ana sayfadaki lejant `layer-legend.tsx`'ten
  güncellenir.
- **Frontmatter:** `lib/source.ts` — `category`, `level`, `tags`, `order`,
  `duration`, `updated`. `duration` ve `updated` tasarımın meta şeridini besler;
  boş bırakılırsa o parça sessizce gizlenir.
