import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export interface HeroProps {
  articleCount: number;
  categoryCount: number;
}

/**
 * İmza öğe. Cesaretin harcandığı tek yer:
 * blueprint ızgarası + pirinç ufuk parıltısı + tek satırlık tez.
 * Geri kalan bölümler bilinçli olarak sakin.
 */
export function Hero({ articleCount, categoryCount }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-fd-border">
      <div aria-hidden="true" className="cw-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="cw-glow pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-5xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <span
          className="cw-rise inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/70 px-3 py-1.5 backdrop-blur"
          style={{ '--d': '0ms' } as React.CSSProperties}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
          {/* lang="en": lang="tr" altında CSS uppercase "JavaScript"i
              "JAVASCRİPT" yapıyor. Türkçe kelimelerde sorunlu harf yok. */}
          <span lang="en" className="cw-label text-fd-muted-foreground">
            Türkçe · JavaScript · React · Next.js
          </span>
        </span>

        <h1
          className="cw-rise mt-7 max-w-4xl font-display text-[clamp(2.1rem,5.1vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-balance"
          style={{ '--d': '80ms' } as React.CSSProperties}
        >
          Bir konuyu{' '}
          <span className="whitespace-nowrap rounded-lg bg-brand-soft px-2 py-0.5 font-mono text-[0.7em] text-brand">
            çocuğa anlatır gibi
          </span>{' '}
          başlatıp{' '}
          <span className="relative whitespace-nowrap">
            uzman seviyesinde
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[0.09em] h-[0.055em] rounded-full bg-brand/70"
            />
          </span>{' '}
          bitiriyoruz.
        </h1>

        <p
          className="cw-rise mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-fd-muted-foreground"
          style={{ '--d': '160ms' } as React.CSSProperties}
        >
          Mülakata hazırlanırken ve günlük işinde referans ararken açacağın tek sekme. Her makale
          aynı beş katmanda ilerler; nereye bakacağını bilirsin.
        </p>

        <div
          className="cw-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ '--d': '240ms' } as React.CSSProperties}
        >
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <BookOpen aria-hidden="true" className="size-4" />
            Okumaya başla
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/kategori/javascript"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-brand hover:text-brand cursor-pointer"
          >
            JavaScript ile başla
          </Link>
        </div>

        {/* Ölçüm şeridi — sitenin "alet" dilini pekiştirir */}
        <dl
          className="cw-rise mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-3"
          style={{ '--d': '320ms' } as React.CSSProperties}
        >
          <Stat label="Makale" value={String(articleCount).padStart(2, '0')} />
          <Stat label="Kategori" value={String(categoryCount).padStart(2, '0')} />
          <Stat label="Katman / Makale" value="05" className="col-span-2 sm:col-span-1" />
        </dl>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`bg-fd-card px-5 py-4 ${className ?? ''}`}>
      <dt className="cw-label text-fd-muted-foreground">{label}</dt>
      <dd className="mt-2 font-display text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
