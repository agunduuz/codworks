import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { categories, getCategory } from '@/lib/categories';
import { getArticlesByCategory } from '@/lib/source';
import { ArticleRow } from '@/components/site/article-row';

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<'/kategori/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.summary,
  };
}

export default async function CategoryPage(props: PageProps<'/kategori/[slug]'>) {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);
  const others = categories.filter((item) => item.slug !== category.slug);

  return (
    <div style={{ '--tone': category.tone } as React.CSSProperties}>
      {/* Kategori bandı — ana sayfa hero'sunun sakinleştirilmiş, tonlanmış hâli */}
      <header className="relative isolate overflow-hidden border-b border-fd-border">
        <div aria-hidden="true" className="cw-grid pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 55% 42% at 50% -10%, color-mix(in oklab, var(--tone) 18%, transparent), transparent 70%)',
          }}
        />

        <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 cw-label text-fd-muted-foreground transition-colors duration-200 hover:text-brand cursor-pointer"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Ana sayfa
          </Link>

          <div className="cw-rise mt-8 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--tone)_14%,transparent)] font-mono text-sm font-semibold tracking-wider text-[var(--tone)]">
              {category.code}
            </span>
            <span className="cw-label text-fd-muted-foreground">
              {String(articles.length).padStart(2, '0')} makale
            </span>
          </div>

          <h1
            className="cw-rise mt-5 font-display text-[clamp(2.1rem,5.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            style={{ '--d': '70ms' } as React.CSSProperties}
          >
            {category.title}
          </h1>
          <p
            className="cw-rise mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-fd-muted-foreground"
            style={{ '--d': '140ms' } as React.CSSProperties}
          >
            {category.summary}
          </p>

          <ul
            className="cw-rise mt-7 flex flex-wrap gap-1.5"
            style={{ '--d': '210ms' } as React.CSSProperties}
          >
            {category.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-md border border-fd-border bg-fd-card px-2.5 py-1.5 font-mono text-[0.72rem] text-fd-muted-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="cw-label text-fd-muted-foreground">Bu kategorideki makaleler</h2>

        {articles.length > 0 ? (
          <ol className="mt-6 border-t border-fd-border">
            {articles.map((page, index) => (
              <ArticleRow key={page.url} page={page} index={index} showCategory={false} />
            ))}
          </ol>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed border-fd-border px-5 py-10 text-center text-sm text-fd-muted-foreground">
            Bu kategoride henüz makale yok.{' '}
            <code className="font-mono">content/docs/{category.slug}/</code> altına ilk{' '}
            <code className="font-mono">.mdx</code> dosyası eklendiğinde burada görünecek.
          </p>
        )}
      </section>

      <section className="border-t border-fd-border bg-fd-muted/40">
        <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
          <h2 className="cw-label text-fd-muted-foreground">Diğer kategoriler</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/kategori/${item.slug}`}
                style={{ '--tone': item.tone } as React.CSSProperties}
                className="group flex items-center justify-between gap-3 rounded-xl border border-fd-border bg-fd-card px-4 py-3.5 transition-colors duration-200 hover:border-[color-mix(in_oklab,var(--tone)_50%,var(--color-fd-border))] cursor-pointer"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span className="font-mono text-[0.7rem] font-semibold tracking-wider text-[var(--tone)]">
                    {item.code}
                  </span>
                  <span className="font-display text-sm font-semibold tracking-tight">
                    {item.title}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-fd-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--tone)]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
