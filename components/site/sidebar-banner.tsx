import Link from 'next/link';
import { Compass } from 'lucide-react';

/**
 * Sidebar başlığı — okuyucuya nerede olduğunu ve
 * kategori indeksine nasıl döneceğini hatırlatır.
 */
export function SidebarBanner() {
  return (
    <Link
      href="/"
      className="group mb-2 flex items-start gap-3 rounded-xl border border-fd-border bg-fd-card p-3.5 transition-colors duration-200 hover:border-brand cursor-pointer"
    >
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft">
        <Compass aria-hidden="true" className="size-4 text-brand" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block cw-label text-brand">Okuma Sözleşmesi</span>
        <span className="mt-1.5 block text-xs leading-relaxed text-fd-muted-foreground">
          Her makale beş katmanda ilerler: sezgi → frontend → mülakat → uzman → uyarı.
        </span>
      </span>
    </Link>
  );
}
