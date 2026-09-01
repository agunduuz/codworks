/**
 * Kategori kimliği — tek kaynak.
 * Renk, kod ve sıra buradan gelir; sayfa bileşenleri kendi rengini icat etmez.
 */
export type CategorySlug = 'javascript' | 'react' | 'nextjs' | 'genel';

export interface Category {
  slug: CategorySlug;
  /** Sidebar / kart başlığı */
  title: string;
  /** Mono rozet — indeks hissi verir: JS-01, RX-02 ... */
  code: string;
  /** Kartta ve kategori hero'sunda görünen tek cümle */
  summary: string;
  /** Bu kategorinin kapsadığı konu başlıkları — kartta önizleme olarak */
  topics: string[];
  /** globals.css'teki --color-cat-* token'ı */
  tone: string;
}

export const categories: Category[] = [
  {
    slug: 'javascript',
    title: 'JavaScript',
    code: 'JS',
    summary:
      'Dilin kendisi: scope, closure, prototip zinciri, this bağlanması, event loop ve asenkron akış.',
    topics: [
      'Scope & Closure',
      'this & Object Methods',
      'Function Binding',
      'Event Loop',
      'Promise & async/await',
      'Kopyalama & Array',
      'Prototype',
    ],
    tone: 'var(--color-cat-javascript)',
  },
  {
    slug: 'react',
    title: 'React',
    code: 'RX',
    summary:
      'Render modeli, reconciliation, hook kuralları, state yönetimi ve performans optimizasyonu.',
    topics: ['Render & Commit', 'Hooks', 'Context', 'Memoization', 'Suspense'],
    tone: 'var(--color-cat-react)',
  },
  {
    slug: 'nextjs',
    title: 'Next.js',
    code: 'NX',
    summary:
      'App Router, Server Components, veri getirme stratejileri, caching katmanları ve deploy davranışı.',
    topics: ['App Router', 'RSC', 'Caching', 'Server Actions', 'Rendering'],
    tone: 'var(--color-cat-nextjs)',
  },
  {
    slug: 'genel',
    title: 'Genel',
    code: 'GN',
    summary:
      'TypeScript, tarayıcı içi performans, erişilebilirlik ve mülakatta çıkan dil-üstü konular.',
    topics: ['TypeScript', 'Performans', 'Erişilebilirlik', 'Tarayıcı', 'Araçlar'],
    tone: 'var(--color-cat-genel)',
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<CategorySlug, Category>;

export function getCategory(slug: string): Category | undefined {
  return categoryMap[slug as CategorySlug];
}
