import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticlePage } from '@/lib/source';
import { ArticleRow } from './article-row';
import { SectionHeading } from './section-heading';

export function RecentArticles({ pages }: { pages: ArticlePage[] }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Son Eklenenler"
          title="Yeni yazılanlar"
          description="Yayına giren ve önemli güncelleme alan makaleler."
        />
        <Link
          href="/docs"
          className="group mt-1 inline-flex shrink-0 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-brand hover:text-brand cursor-pointer"
        >
          Tümü
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {pages.length > 0 ? (
        <ol className="mt-8 border-t border-fd-border">
          {pages.map((page, index) => (
            <ArticleRow key={page.url} page={page} index={index} />
          ))}
        </ol>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-fd-border px-5 py-8 text-center text-sm text-fd-muted-foreground">
          Henüz makale yok. İlk yazı <code className="font-mono">content/docs/</code> altına
          eklendiğinde burada listelenecek.
        </p>
      )}
    </section>
  );
}
