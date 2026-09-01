import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PipelineStep {
  /** Aşamanın kısa adı — mono, büyük harf */
  label: string;
  /** Tek cümlelik açıklama */
  detail?: ReactNode;
  /** globals.css'teki bir --color-tone-* değeri; verilmezse marka rengi */
  tone?: string;
}

export interface PipelineProps {
  title?: string;
  steps: PipelineStep[];
  /** Son adımdan başa dönen bir tur mu? */
  loop?: boolean;
  className?: string;
}

/**
 * Sıralı aşamaları gösteren şerit. Sıra bilginin kendisi olduğunda
 * (event loop turu, render adımları, Node fazları) düz listeden daha okunur:
 * numara + yön işareti, "önce/sonra" ilişkisini tek bakışta verir.
 *
 * Mobilde dikey, geniş ekranda yatay akar.
 */
export function Pipeline({ title, steps, loop = false, className }: PipelineProps) {
  return (
    <figure
      className={cn(
        'not-prose my-8 overflow-hidden rounded-2xl border border-fd-border bg-fd-card',
        className,
      )}
    >
      {title ? (
        <figcaption className="border-b border-fd-border bg-fd-muted/50 px-5 py-3">
          <span className="cw-label text-fd-muted-foreground">{title}</span>
        </figcaption>
      ) : null}

      <ol className="flex flex-col gap-0 p-4 sm:flex-row sm:items-stretch sm:gap-0">
        {steps.map((step, index) => (
          <li
            key={step.label}
            style={{ '--tone': step.tone ?? 'var(--color-brand)' } as React.CSSProperties}
            className="flex min-w-0 flex-1 items-start gap-3 sm:flex-col sm:gap-0"
          >
            {/* Bağlayıcı: mobilde dikey, geniş ekranda yatay */}
            <div className="flex shrink-0 flex-col items-center self-stretch sm:w-full sm:flex-row">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[color-mix(in_oklab,var(--tone)_14%,transparent)] font-mono text-[0.68rem] font-semibold text-[var(--tone)] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              {index < steps.length - 1 || loop ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'w-px flex-1 sm:h-px sm:w-full sm:flex-1',
                    // Son bağlayıcı başa dönüşü temsil eder; sönümlenerek biter
                    index === steps.length - 1
                      ? 'bg-linear-to-b from-fd-border to-transparent sm:bg-linear-to-r'
                      : 'bg-fd-border',
                  )}
                />
              ) : null}
            </div>

            <div className="min-w-0 pb-5 sm:pb-0 sm:pe-4 sm:pt-3">
              {/* Etiket iki satıra taşsa bile açıklamalar aynı hizada başlasın */}
              <p className="cw-label-raw text-[var(--tone)] sm:min-h-[2.3em]">{step.label}</p>
              {step.detail ? (
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-balance break-words text-fd-muted-foreground">
                  {step.detail}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {loop ? (
        <p className="border-t border-fd-border bg-fd-muted/50 px-5 py-2.5 text-center cw-label-raw text-fd-muted-foreground">
          ↺ BAŞA DÖN
        </p>
      ) : null}
    </figure>
  );
}
