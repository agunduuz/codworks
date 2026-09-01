# Mimari ve Klasör Yapısı

## Klasör Yapısı

```
/kod-atlasi
├── app/
│   ├── (home)/
│   │   ├── page.tsx                 # Ana sayfa (hero, kategori kartları, son eklenenler)
│   │   └── layout.tsx
│   ├── docs/
│   │   ├── [[...slug]]/
│   │   │   └── page.tsx             # Fumadocs catch-all route — tüm makaleler buradan render olur
│   │   └── layout.tsx               # Sidebar + TOC içeren doküman layout'u
│   ├── layout.tsx                   # Kök layout — RootProvider, font, globals.css
│   └── layout.config.tsx            # Nav başlığı, logo, üst menü linkleri
│
├── content/
│   └── docs/
│       ├── javascript/
│       │   ├── meta.json            # Sidebar'da "JavaScript" başlığı ve sıralama
│       │   ├── scope-closure.mdx
│       │   ├── object-methods-this.mdx
│       │   └── <sıradaki-konu>.mdx      # örn. senin belirleyeceğin bir sonraki JS konusu
│       ├── react/
│       │   ├── meta.json
│       │   └── ...
│       ├── nextjs/
│       │   ├── meta.json
│       │   └── ...
│       └── genel/
│           ├── meta.json
│           └── ...
│
├── components/
│   └── mdx/
│       ├── callout.tsx              # tip prop'una göre 🧸/⚛️/💼/🧠/⚠️ varyantı seçen tek component
│       ├── example-card.tsx         # Uçtan uca örnek kutusu + seviye rozeti
│       ├── cheat-sheet.tsx          # Koyu temalı özet tablosu
│       └── code-tabs.tsx            # (opsiyonel) birden fazla dosyayı sekmeli göstermek için
│
├── lib/
│   └── source.ts                    # Fumadocs source loader + frontmatter şeması (Zod)
│
├── source.config.ts                 # Fumadocs MDX yapılandırması, frontmatter şema tanımı
├── mdx-components.tsx                # MDX içinde hangi component'in hangi isimle kullanılacağı eşlemesi
├── tailwind.config.ts               # Fumadocs preset + Claude Design'dan gelen custom token'lar
└── styles/
    └── globals.css                   # CSS değişkenleri (renk, font) — Claude Design çıktısı buraya işlenir
```

## Frontmatter Şeması

`source.config.ts` içinde Zod ile tanımlanır, böylece eksik/yanlış frontmatter'lı bir `.mdx` dosyası **build sırasında hata verir** — Claude Code yanlışlıkla eksik bir alan bırakırsa bunu hemen fark edersin.

```ts
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: (base) =>
      base.extend({
        category: z.enum(['javascript', 'react', 'nextjs', 'genel']),
        level: z.enum(['baslangic', 'baslangic-uzman']).default('baslangic-uzman'),
        tags: z.array(z.string()).default([]),
        order: z.number(),
      }),
  },
});

export default defineConfig();
```

## Örnek İçerik Dosyası İskeleti

```mdx
---
title: "Object Methods & this"
description: "Object literal'de method tanımlama ve this'in 4+1 bağlanma kuralı"
category: "javascript"
level: "baslangic-uzman"
tags: ["this", "object", "call", "apply", "bind"]
order: 2
---

import { Callout } from '@/components/mdx/callout';
import { ExampleCard } from '@/components/mdx/example-card';

## Object (Nesne) ve Method (Metot) Nedir?

<Callout type="child">
  Bir oyuncak kutusu düşün...
</Callout>

Teknik olarak bir **object (nesne)**...

​```js
const ayi = {
  ad: "Boncuk",
  homursan() { console.log("Hmmmm!"); }
};
​```
```

Not: Kod bloklarının içindeki manuel `<span class="kw">` etiketleri artık gerekmiyor — Fumadocs, Shiki ile otomatik ve doğru sözdizimi vurgulaması yapıyor. Bu, önceki iki makaleye kıyasla Claude Code'un içerik üretim hızını ciddi şekilde artıracak.

## Routing Planı

| URL | İçerik |
|---|---|
| `/` | Ana sayfa — kategori kartları, öne çıkan konular |
| `/docs/javascript/scope-closure` | Scope & Closure makalesi |
| `/docs/javascript/object-methods-this` | Object Methods & this makalesi |
| `/docs/react/...` | React konuları |
| `/docs/nextjs/...` | Next.js konuları |
| `/docs/genel/...` | TypeScript, performans, erişilebilirlik vb. |

`meta.json` dosyaları her kategori klasöründe sidebar başlığını ve sıralamayı kontrol eder:

```json
{
  "title": "JavaScript",
  "pages": ["scope-closure", "object-methods-this", "prototype-inheritance"]
}
```

## Neden Bu Yapı?

- **Kategori = klasör:** Yeni bir React konusu eklemek, `content/docs/react/` altına bir `.mdx` dosyası ve `meta.json`'a bir satır eklemek kadar basit — Claude Code için tekrarlanabilir, öngörülebilir bir iş.
- **Şema doğrulaması build-time'da:** Yanlış/eksik frontmatter içerikte fark edilmeden yayına gitmez.
- **Component'ler tek yerde:** `components/mdx/` altındaki beş-altı component (Callout, ExampleCard, CheatSheet) tüm site genelinde tutarlılığı garanti eder — her makale kendi stilini icat etmez.
