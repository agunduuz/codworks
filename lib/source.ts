import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { getCategory, type CategorySlug } from './categories';

/**
 * Frontmatter şeması — ARCHITECTURE.md'deki sözleşme.
 * `category` kök sayfalarda (ör. /docs indeksi) bulunmaz, o yüzden opsiyonel;
 * eksikse klasör adından türetilir. Diğer alanlar varsayılanlıdır ki
 * eksik bir alan build'i kırmadan tasarımın beklediği veriyi üretsin.
 */
const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      category: z.enum(['javascript', 'react', 'nextjs', 'genel']).optional(),
      level: z.enum(['baslangic', 'orta', 'baslangic-uzman']).default('baslangic-uzman'),
      tags: z.array(z.string()).default([]),
      order: z.number().default(100),
      /** Okuma süresi (dk) — makale başlığındaki meta satırında görünür */
      duration: z.number().optional(),
      /** ISO tarih — "son eklenenler" sıralaması ve makale meta satırı için */
      updated: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type ArticlePage = (typeof source)['$inferPage'];

export const levelLabels: Record<string, string> = {
  baslangic: 'Başlangıç',
  orta: 'Orta',
  'baslangic-uzman': 'Başlangıç → Uzman',
};

/** Kategori: frontmatter'da yoksa klasör adından türet. */
export function resolveCategory(page: ArticlePage): CategorySlug | undefined {
  const fromFrontmatter = page.data.category;
  if (fromFrontmatter) return fromFrontmatter;

  const folder = page.slugs[0];
  return getCategory(folder ?? '')?.slug;
}

/** Kategoriye ait, `order` ile sıralı makaleler. */
export function getArticlesByCategory(slug: CategorySlug): ArticlePage[] {
  return source
    .getPages()
    .filter((page) => resolveCategory(page) === slug)
    .sort((a, b) => a.data.order - b.data.order);
}

/** Ana sayfadaki "Son eklenenler" listesi — updated varsa ona, yoksa order'a göre. */
export function getRecentArticles(limit = 5): ArticlePage[] {
  return source
    .getPages()
    .filter((page) => resolveCategory(page) !== undefined)
    .sort((a, b) => {
      const aDate = a.data.updated ? Date.parse(a.data.updated) : 0;
      const bDate = b.data.updated ? Date.parse(b.data.updated) : 0;
      if (aDate !== bDate) return bDate - aDate;
      return a.data.order - b.data.order;
    })
    .slice(0, limit);
}

export function countArticles(slug: CategorySlug): number {
  return getArticlesByCategory(slug).length;
}

export function getPageImageUrl(page: ArticlePage) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...docsImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: ArticlePage) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...docsContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export async function getLLMText(page: ArticlePage) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
