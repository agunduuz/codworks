import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

const paths = [
  {
    step: '01',
    title: 'Mülakata iki hafta var',
    text: 'Önce JavaScript temelleri, sonra React render modeli. Her makalede önce Mülakat İpucu kutucuklarını tara.',
    href: '/kategori/javascript',
    cta: 'JavaScript rotası',
  },
  {
    step: '02',
    title: 'Günlük işte takıldım',
    text: 'Konuyu aramadan doğrudan kategoriye gir; Dikkat kutucukları en sık yapılan hatayı en üstte gösterir.',
    href: '/docs',
    cta: 'Tüm makaleler',
  },
  {
    step: '03',
    title: 'Derinleşmek istiyorum',
    text: 'Aynı makaleyi ikinci okuyuşunda sadece Uzman Seviyesi kutucuklarını oku; spesifikasyona oradan geçilir.',
    href: '/kategori/nextjs',
    cta: 'Next.js rotası',
  },
];

/**
 * Kapanış. Bir "landing CTA" değil, gerçek bir gezinme yardımı:
 * okuyucu üç bağlamdan birine kendini yerleştirir.
 */
export function StartHere() {
  return (
    <section className="relative isolate overflow-hidden border-t border-fd-border bg-[#0f1218] text-[#e8e9ec]">
      <div aria-hidden="true" className="cw-hairline absolute inset-x-0 top-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #23272f 1px, transparent 1px), linear-gradient(to bottom, #23272f 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 10%, transparent 75%)',
        }}
      />
      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <span className="inline-flex items-center gap-2 cw-label text-[#e0a34f]">
          <Compass aria-hidden="true" className="size-4" />
          Nereden Başlamalı
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.12]">
          Kendini üç durumdan birinde bul, oradan devam et.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {paths.map((path) => (
            <div key={path.step} className="flex flex-col bg-[#0f1218] p-6">
              <span className="cw-label text-[#e0a34f]">{path.step}</span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {path.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#a0a6b0]">{path.text}</p>
              <Link
                href={path.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#e0a34f] transition-colors duration-200 hover:text-[#f0c07f] cursor-pointer"
              >
                {path.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
