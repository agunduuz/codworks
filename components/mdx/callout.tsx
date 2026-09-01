import type { ReactNode } from 'react';
import { Atom, Brain, Briefcase, ToyBrick, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Beş sabit kutucuk tipi — sitenin en tanınır yapısal öğesi.
 * Her tip kendi hue'suna sahip: warning 25° · expert 70° · child 180°
 * · frontend 250° · interview 290°. Renk tek başına anlam taşımaz;
 * ikon ve mono etiket her zaman yanında durur (erişilebilirlik).
 */
export type CalloutType = 'child' | 'frontend' | 'interview' | 'expert' | 'warning';

const variants = {
  child: {
    label: 'Çocuğa Anlatır Gibi',
    icon: ToyBrick,
    tone: 'var(--color-tone-child)',
  },
  frontend: {
    label: 'Frontend Notu',
    icon: Atom,
    tone: 'var(--color-tone-frontend)',
  },
  interview: {
    label: 'Mülakat İpucu',
    icon: Briefcase,
    tone: 'var(--color-tone-interview)',
  },
  expert: {
    label: 'Uzman Seviyesi',
    icon: Brain,
    tone: 'var(--color-tone-expert)',
  },
  warning: {
    label: 'Dikkat',
    icon: TriangleAlert,
    tone: 'var(--color-tone-warning)',
  },
} as const satisfies Record<CalloutType, { label: string; icon: unknown; tone: string }>;

/**
 * Fumadocs'un yerleşik `> [!NOTE]` sözdizimi info/warn/error tipleri gönderir.
 * Beş tipli sistemi tek doğru kaynak tutabilmek için onları da buraya eşliyoruz.
 */
const aliases: Record<string, CalloutType> = {
  info: 'frontend',
  note: 'frontend',
  tip: 'expert',
  idea: 'expert',
  success: 'child',
  warn: 'warning',
  warning: 'warning',
  error: 'warning',
  danger: 'warning',
};

export interface CalloutProps {
  type?: CalloutType | keyof typeof aliases | (string & {});
  /** Varsayılan etiketi ezmek için */
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ type = 'frontend', title, children, className }: CalloutProps) {
  const key = (type in variants ? type : aliases[type]) as CalloutType | undefined;
  const variant = variants[key ?? 'frontend'];
  const Icon = variant.icon;

  return (
    <aside
      style={{ '--tone': variant.tone } as React.CSSProperties}
      className={cn(
        'not-prose group relative my-6 overflow-hidden rounded-xl border border-fd-border',
        'bg-[color-mix(in_oklab,var(--tone)_5%,var(--color-fd-card))]',
        'pl-5 pr-5 py-4 transition-colors duration-200',
        className,
      )}
    >
      {/* Sol omurga — kutunun tipi periferik görüşle bile okunur */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--tone)]"
      />

      <div className="mb-2 flex items-center gap-2">
        <Icon aria-hidden="true" className="size-4 text-[var(--tone)]" strokeWidth={2} />
        <span className="cw-label text-[var(--tone)]">{title ?? variant.label}</span>
      </div>

      <div className="cw-prose text-[0.95rem] leading-[1.75] text-fd-foreground/90 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
