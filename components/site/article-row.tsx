import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { categoryMap } from '@/lib/categories';
import { levelLabels, resolveCategory, type ArticlePage } from '@/lib/source';

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export interface ArticleRowProps {
  page: ArticlePage;
  index: number;
  /** Kategori sayfasında rozet gereksiz — zaten bağlam belli */
  showCategory?: boolean;
}

/**
 * Makale satırı. Kart değil satır: uzun listeler taranarak okunur,
 * kart ızgarası tarama hızını düşürür.
 */
export function ArticleRow({ page, index, showCategory = true }: ArticleRowProps) {
  const slug = resolveCategory(page);
  const category = slug ? categoryMap[slug] : undefined;
  const { level, duration, updated } = page.data;

  return (
    <li
      style={
        {
          '--tone': category?.tone ?? 'var(--color-brand)',
          '--d': `${index * 55}ms`,
        } as React.CSSProperties
      }
      className="cw-rise group relative"
    >
      <Link
        href={page.url}
        className="flex flex-col gap-3 border-b border-fd-border py-6 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-6 cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="absolute -left-4 top-6 h-6 w-[2px] origin-top scale-y-0 bg-[var(--tone)] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-y-100"
        />

        <span className="cw-label shrink-0 pt-1 text-fd-muted-foreground/70 tabular-nums sm:w-10">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            {showCategory && category ? (
              <span className="cw-label rounded border border-fd-border px-1.5 py-1 text-[var(--tone)]">
                {category.code}
              </span>
            ) : null}
            <span className="font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-brand">
              {page.data.title}
            </span>
          </span>

          {page.data.description ? (
            <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-fd-muted-foreground">
              {page.data.description}
            </span>
          ) : null}
        </span>

        <span className="flex shrink-0 items-center gap-3 text-fd-muted-foreground">
          <span className="cw-label">{levelLabels[level] ?? level}</span>
          {duration ? (
            <span className="inline-flex items-center gap-1 font-mono text-xs tabular-nums">
              <Clock aria-hidden="true" className="size-3.5" />
              {duration} dk
            </span>
          ) : null}
          {updated ? (
            <time
              dateTime={updated}
              className="hidden font-mono text-xs tabular-nums lg:inline"
            >
              {dateFormatter.format(new Date(updated))}
            </time>
          ) : null}
          <ArrowRight
            aria-hidden="true"
            className="size-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </span>
      </Link>
    </li>
  );
}
