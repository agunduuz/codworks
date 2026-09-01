import Link from 'next/link';
import { ArrowRight, Atom, Brain, Briefcase, ToyBrick, TriangleAlert } from 'lucide-react';
import { SectionHeading } from './section-heading';

const layers = [
  {
    icon: ToyBrick,
    label: 'Çocuğa Anlatır Gibi',
    tone: 'var(--color-tone-child)',
    text: 'Konunun sezgisel karşılığı. Jargon yok, benzetme var.',
  },
  {
    icon: Atom,
    label: 'Frontend Notu',
    tone: 'var(--color-tone-frontend)',
    text: 'Aynı kavramın React/Next.js tarafında nereye denk düştüğü.',
  },
  {
    icon: Briefcase,
    label: 'Mülakat İpucu',
    tone: 'var(--color-tone-interview)',
    text: 'Bu konudan gerçekte sorulan soru ve beklenen cevabın çerçevesi.',
  },
  {
    icon: Brain,
    label: 'Uzman Seviyesi',
    tone: 'var(--color-tone-expert)',
    text: 'Spesifikasyon detayı, motor davranışı, kenar durumlar.',
  },
  {
    icon: TriangleAlert,
    label: 'Dikkat',
    tone: 'var(--color-tone-warning)',
    text: 'Sık yapılan hata ve onu üreten yanlış zihinsel model.',
  },
];

/**
 * Beş kutucuk sistemi hem gezinme lejantı hem görsel kimlik teşhiri.
 * Yapı anlamı taşır: liste, makalede karşılaşacağın sırayla diziliyor.
 */
export function LayerLegend() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Okuma Sözleşmesi"
        title="Her makale aynı beş katmanda ilerler"
        description="Kutucuğun rengini ve ikonunu bir kez öğren; sonrasında hangi paragrafı atlayıp hangisine yavaşlayacağını sayfayı okumadan bilirsin."
      />

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <li
              key={layer.label}
              style={{ '--tone': layer.tone, '--d': `${index * 60}ms` } as React.CSSProperties}
              className="cw-rise group relative overflow-hidden rounded-xl border border-fd-border bg-fd-card p-5 transition-colors duration-200 hover:border-[color-mix(in_oklab,var(--tone)_45%,var(--color-fd-border))]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[var(--tone)] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
              />
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tone)_14%,transparent)]">
                  <Icon aria-hidden="true" className="size-4 text-[var(--tone)]" strokeWidth={2} />
                </span>
                <span className="cw-label text-[var(--tone)]">{layer.label}</span>
                <span className="ms-auto font-mono text-xs text-fd-muted-foreground/70 tabular-nums">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">{layer.text}</p>
            </li>
          );
        })}

        {/* Altıncı hücre: lejantı kapatır ve sistemi iş başında gösterir */}
        <li
          className="cw-rise"
          style={{ '--d': '300ms' } as React.CSSProperties}
        >
          <Link
            href="/docs/javascript/scope-closure"
            className="group flex h-full flex-col justify-between rounded-xl border border-dashed border-fd-border bg-fd-muted/40 p-5 transition-colors duration-200 hover:border-brand cursor-pointer"
          >
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Beşi bir arada nasıl görünüyor? Örnek bir makalede kendin bak.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 cw-label text-brand">
              Scope &amp; Closure
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      </ol>
    </section>
  );
}
