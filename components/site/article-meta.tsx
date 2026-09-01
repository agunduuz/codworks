import Link from 'next/link';
import { Clock, Signal } from 'lucide-react';
import { categoryMap } from '@/lib/categories';
import { levelLabels, resolveCategory, type ArticlePage } from '@/lib/source';

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

/**
 * Makale başlığının altındaki ölçüm şeridi: kategori, seviye, süre, tarih.
 * Okuyucu yazıya girmeden "bu bana göre mi" kararını burada verir.
 */
export function ArticleMeta({ page }: { page: ArticlePage }) {
  const slug = resolveCategory(page);
  const category = slug ? categoryMap[slug] : undefined;
  const { level, duration, updated, tags } = page.data;

  return (
    <div
      style={{ '--tone': category?.tone ?? 'var(--color-brand)' } as React.CSSProperties}
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-fd-muted-foreground"
    >
      {category ? (
        <Link
          href={`/kategori/${category.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-fd-border px-2.5 py-1 transition-colors duration-200 hover:border-[var(--tone)] cursor-pointer"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--tone)]" />
          <span lang="en" className="cw-label text-[var(--tone)]">
            {category.title}
          </span>
        </Link>
      ) : null}

      <span className="inline-flex items-center gap-1.5">
        <Signal aria-hidden="true" className="size-3.5" />
        <span className="cw-label">{levelLabels[level] ?? level}</span>
      </span>

      {duration ? (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums">
          <Clock aria-hidden="true" className="size-3.5" />
          {duration} dk okuma
        </span>
      ) : null}

      {updated ? (
        <time dateTime={updated} className="font-mono text-xs">
          Güncelleme: {dateFormatter.format(new Date(updated))}
        </time>
      ) : null}

      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-fd-border px-1.5 py-0.5 font-mono text-[0.68rem]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
