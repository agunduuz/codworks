import type { ReactNode } from 'react';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheatRow {
  /** Sol sütun — sözdizimi / komut / kural adı */
  term: string;
  /** Sağ sütun — tek cümlelik karşılık */
  meaning: ReactNode;
}

export interface CheatSheetProps {
  title?: string;
  rows: CheatRow[];
  className?: string;
}

/**
 * Özet tablosu. Tek "her iki temada da koyu" öğe:
 * makalenin sonunda ekrandan koparılıp bakılan bir tezgah kartı gibi durur.
 */
export function CheatSheet({ title = 'Özet', rows, className }: CheatSheetProps) {
  return (
    <section
      className={cn(
        'not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] text-[#e8e9ec] shadow-[0_18px_40px_-24px_rgb(0_0_0/0.7)]',
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <Terminal aria-hidden="true" className="size-4 text-[#e0a34f]" strokeWidth={2} />
        <h4 className="cw-label text-[#e0a34f]">{title}</h4>
      </header>

      <dl className="divide-y divide-white/[0.07]">
        {rows.map((row) => (
          <div
            key={row.term}
            className="grid gap-1 px-5 py-3 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
          >
            <dt className="font-mono text-[0.8rem] leading-6 text-[#e0a34f]">{row.term}</dt>
            <dd className="text-[0.9rem] leading-6 text-[#c3c7ce]">{row.meaning}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
