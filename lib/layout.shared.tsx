import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/brand/logo';
import { categories } from './categories';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
      transparentMode: 'top',
    },
    links: [
      {
        type: 'menu',
        text: 'Kategoriler',
        items: categories.map((category) => ({
          text: category.title,
          description: category.summary,
          url: `/kategori/${category.slug}`,
        })),
      },
      {
        text: 'Tüm Makaleler',
        url: '/docs',
        active: 'nested-url',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    searchToggle: {
      sm: { hideIfDisabled: false },
    },
    themeSwitch: { mode: 'light-dark-system' },
  };
}
