import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/callout';
import { ExampleCard } from '@/components/mdx/example-card';
import { CheatSheet } from '@/components/mdx/cheat-sheet';
import { CodeTab, CodeTabs } from '@/components/mdx/code-tabs';
import { Pipeline } from '@/components/mdx/pipeline';

/**
 * MDX içinde kullanılabilir bileşenler.
 * Callout bilerek fumadocs varsayılanını gölgeliyor: sitedeki beş kutucuk tipi
 * tek bir tasarım sözleşmesinden gelsin diye.
 */
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    ExampleCard,
    CheatSheet,
    CodeTabs,
    CodeTab,
    Pipeline,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
