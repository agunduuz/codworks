# Teknoloji Yığını (Tech Stack)

Bu doküman, her seçimin **neden** yapıldığını da açıklar — sadece liste değil, gerekçe de sunar.

## Özet Tablo

| Katman | Seçim | Neden |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Zaten hâkim olduğun teknoloji; Vercel ile birebir uyumlu; React Server Components ile içerik ağırlıklı sitelerde performans avantajı |
| Dil | **TypeScript** | Frontmatter şemalarını, MDX component prop'larını tip güvenli tutar; Claude Code'un ürettiği kodda hata payını azaltır |
| İçerik Katmanı | **Fumadocs** (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`) | Aşağıda ayrıntılı gerekçe var |
| İçerik Formatı | **MDX** | Markdown'ın içine doğrudan React component'i (Callout, ExampleCard, Quiz vb.) gömülebiliyor — mevcut iki makaledeki custom kutucuk sistemini component olarak yeniden kullanmanı sağlar |
| Stil | **Tailwind CSS v4** | Fumadocs'un resmi Tailwind preset'i var; Claude Design'dan çıkacak tasarım token'larını (renk, tipografi) doğrudan Tailwind config'e aktarabilirsin |
| Sözdizimi Vurgulama | **Shiki** (Fumadocs MDX içine gömülü) | Gerçek bir tokenizer kullanır, elle `<span class="kw">` yazmak zorunda kalmazsın — üretim hızını ciddi artırır |
| Arama | **Fumadocs yerleşik arama** (Orama tabanlı, statik) | Sunucusuz, Vercel'de ekstra servis gerektirmeden çalışır; site büyüdükçe Algolia'ya geçiş de mümkün |
| Paket Yöneticisi | **npm** | Node.js ile birlikte gelir, ekstra kurulum gerektirmez; Fumadocs'un resmi CLI'ı `npm create fumadocs-app` ile sorunsuz çalışır |
| İkonlar | **lucide-react** | Fumadocs ve shadcn ekosistemiyle doğal uyum |
| Barındırma | **Vercel** | İstenen; her PR için otomatik preview deploy, sıfır konfigürasyonla Next.js desteği |
| Analitik | **Vercel Analytics + Speed Insights** | Tek satır kurulum, Core Web Vitals takibi (zaten önem verdiğin bir konu) |

## İçerik Katmanı Neden Fumadocs?

Üç seçenek değerlendirildi:

1. **Sıfırdan özel MDX pipeline** (`@next/mdx` + `rehype-pretty-code` + elle yazılmış sidebar/TOC/arama) — Tam kontrol verir ama sidebar, TOC üretimi, arama, sayfalar arası önceki/sonraki gezinme gibi her şeyi kendin inşa etmen gerekir. "Kullanımı kolay olmalı" hedefiyle çelişir.
2. **Contentlayer** — Bir dönem popülerdi ama bakımı büyük ölçüde durdu; Next.js 15 App Router ile uyum sorunları çıkabiliyor. Önerilmiyor.
3. **Fumadocs** ✅ — Next.js App Router için özel olarak tasarlanmış, aktif geliştiriliyor (Vercel'in kendisi de dahil birçok ekip tarafından kullanılıyor), sidebar/TOC/arama/sayfa geçişleri/kod vurgulama hazır geliyor. Tasarım tamamen Tailwind ile özelleştirilebilir — yani "hazır ama kalıba sıkışmış değil".

Not: Fumadocs bir "dokümantasyon framework'ü" olarak pazarlanıyor ama esnek component sistemi sayesinde bir öğrenme platformu için de doğal bir uyum sağlıyor — senin zaten yazdığın Callout/ExampleCard/CheatSheet yapısı MDX component'i olarak Fumadocs'un içine sorunsuz oturur.

## Neden Şimdilik Veritabanı Yok?

Faz 1'de (MVP) **Prisma + PostgreSQL kullanılmıyor.** İçerik tamamen `.mdx` dosyaları olarak repoda, git ile versiyonlanıyor. Sebepler:

- Claude Code sadece dosya oluşturup düzenliyor — API, migration, seed derdi yok.
- Her içerik değişikliği bir git commit'i = tam geçmiş, kolay geri alma.
- Vercel'de veritabanı bağlantısı, environment variable yönetimi gibi ekstra karmaşıklık olmadan yayına alabilirsin.

**Faz 2 (ileride, opsiyonel):** Kullanıcı hesapları, "okundu" işaretleme, quiz skorları gibi özellikler istersen:
- `Prisma` + `Vercel Postgres` (veya Neon) — zaten bildiğin araçlar, entegrasyonu kolay.
- Kimlik doğrulama için `Auth.js` (NextAuth).
- Bu aşamaya geçene kadar mimaride hiçbir şeyin değişmesi gerekmiyor; Fumadocs içerik katmanı, kullanıcı katmanından bağımsız çalışır.

## Kurulum Adımları (Özet)

```bash
# 1) Proje iskeletini oluştur
npm create fumadocs-app
# Project name: kod-atlasi (örnek)
# Framework: Next.js
# Content source: Fumadocs MDX

cd kod-atlasi
npm install

# 2) Ek paketler
npm install lucide-react
npm install -D @tailwindcss/typography   # uzun makale metinleri için

# 3) Geliştirme sunucusu
npm run dev
# http://localhost:3000/docs
```

`ARCHITECTURE.md` dosyasında bu iskeletin üstüne nasıl klasör yapısı kurulacağı ve frontmatter şeması detaylandırılıyor. GitHub reposu açma ve Vercel'e yayınlama dahil **eksiksiz, tek tek komut listesi** için `SETUP.md` dosyasına bak.
