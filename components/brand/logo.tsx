import { cn } from '@/lib/cn';

/**
 * Marka işareti — açılı parantez + eğik çizgi ("</"), pirinç renkte;
 * çevresi ölçüm aleti gövdesi gibi köşeleri yumuşatılmış bir çerçeve.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('size-6 shrink-0', className)}
    >
      <rect
        x="1.25"
        y="1.25"
        width="21.5"
        height="21.5"
        rx="6.5"
        className="stroke-fd-border"
        strokeWidth="1.5"
      />
      <path
        d="M9.2 8.4 5.8 12l3.4 3.6"
        stroke="var(--color-brand)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3 7.2 12.4 16.8"
        stroke="var(--color-brand)"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="18.2" cy="16.2" r="1.35" fill="var(--color-brand)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark />
      <span className="font-display text-[15px] font-semibold tracking-tight">
        Cod<span className="text-fd-muted-foreground">works</span>
      </span>
    </span>
  );
}
