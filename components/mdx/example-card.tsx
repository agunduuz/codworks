import type { ReactNode } from 'react';
import { FileCode2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Level = 'baslangic' | 'orta' | 'uzman';

const levelLabel: Record<Level, string> = {
  baslangic: 'Başlangıç',
  orta: 'Orta',
  uzman: 'Uzman',
};

/** Seviye rozeti renkle değil, dolulukla da okunur (○ ◐ ●) — renk körlüğü güvenli. */
const levelGlyph: Record<Level, string> = {
  baslangic: '●○○',
  orta: '●●○',
  uzman: '●●●',
};

export interface ExampleCardProps {
  title: string;
  level?: Level;
  /** Kart üstünde görünen kısa bağlam cümlesi */
  summary?: string;
  children: ReactNode;
  className?: string;
}

/** Uçtan uca örnek kutusu — makalede "burada gerçek kod var" sinyali. */
export function ExampleCard({
  title,
  level = 'orta',
  summary,
  children,
  className,
}: ExampleCardProps) {
  return (
    <section
      className={cn(
        'not-prose my-8 overflow-hidden rounded-2xl border border-fd-border bg-fd-card',
        className,
      )}
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-fd-border bg-fd-muted/50 px-5 py-3">
        <FileCode2 aria-hidden="true" className="size-4 text-brand" strokeWidth={2} />
        <h4 className="font-display text-[0.95rem] font-semibold tracking-tight">{title}</h4>
        <span className="ms-auto inline-flex items-center gap-2 rounded-full border border-fd-border px-2.5 py-1">
          <span aria-hidden="true" className="cw-label text-brand">
            {levelGlyph[level]}
          </span>
          <span className="cw-label text-fd-muted-foreground">{levelLabel[level]}</span>
        </span>
      </header>

      {summary ? (
        <p className="border-b border-fd-border px-5 py-3 text-sm text-fd-muted-foreground">
          {summary}
        </p>
      ) : null}

      <div className="cw-prose px-5 py-4 text-[0.95rem] leading-[1.75] [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </section>
  );
}
