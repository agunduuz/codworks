import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { SectionHeading } from './section-heading';

export interface CategoryGridProps {
  /** slug → makale sayısı */
  counts: Record<string, number>;
}

/**
 * Kategoriler bir "indeks" olarak sunuluyor: numaralı, mono kodlu, sayılabilir.
 * Pazarlama kartı değil — başvuru kaynağının içindekiler sayfası.
 */
export function CategoryGrid({ counts }: CategoryGridProps) {
  return (
    <section className="border-y border-fd-border bg-fd-muted/40">
      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="İndeks"
          title="Dört kategori, tek okuma dili"
          description="Kategoriler konuya göre değil, zihinsel modele göre ayrılıyor: önce dilin kendisi, sonra kütüphane, sonra çatı."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              style={{ '--tone': category.tone, '--d': `${index * 70}ms` } as React.CSSProperties}
              className="cw-rise group relative flex flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 transition-all duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--tone)_50%,var(--color-fd-border))] hover:shadow-[0_18px_40px_-28px_var(--tone)] cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tone)_13%,transparent)] font-mono text-[0.7rem] font-semibold tracking-wider text-[var(--tone)]">
                    {category.code}
                  </span>
                  <span className="cw-label text-fd-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-fd-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--tone)]"
                />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                {category.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {category.topics.slice(0, 4).map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-fd-border px-2 py-1 font-mono text-[0.68rem] text-fd-muted-foreground"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <span className="mt-auto pt-5 cw-label text-fd-muted-foreground">
                {counts[category.slug] ?? 0} makale
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
