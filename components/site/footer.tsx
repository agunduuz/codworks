import Link from 'next/link';
import { categories } from '@/lib/categories';
import { appName, appTagline, gitConfig } from '@/lib/shared';
import { LogoMark } from '@/components/brand/logo';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-muted/40">
      <div aria-hidden="true" className="cw-hairline" />
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-base font-semibold tracking-tight">{appName}</span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fd-muted-foreground">
            {appTagline}. Kaynak metinler MDX olarak repoda; her düzeltme bir commit.
          </p>
        </div>

        <nav aria-label="Kategoriler">
          <h2 className="cw-label text-fd-muted-foreground">Kategoriler</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="text-sm text-fd-muted-foreground transition-colors duration-200 hover:text-brand cursor-pointer"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site">
          <h2 className="cw-label text-fd-muted-foreground">Site</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href="/docs"
                className="text-sm text-fd-muted-foreground transition-colors duration-200 hover:text-brand cursor-pointer"
              >
                Tüm makaleler
              </Link>
            </li>
            <li>
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-fd-muted-foreground transition-colors duration-200 hover:text-brand cursor-pointer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 pb-10 sm:px-8">
        <p className="cw-label text-fd-muted-foreground/70">
          © {new Date().getFullYear()} {appName}
        </p>
      </div>
    </footer>
  );
}
