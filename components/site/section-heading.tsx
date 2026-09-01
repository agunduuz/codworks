import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  /** Mono üst etiket — bölümün "koordinatı" */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 cw-label text-brand">
        <span aria-hidden="true" className="inline-block h-px w-6 bg-brand" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-semibold leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-[0.975rem] leading-relaxed text-fd-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
