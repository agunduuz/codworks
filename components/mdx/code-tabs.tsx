import type { ReactNode } from 'react';
import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from 'fumadocs-ui/components/codeblock';

export interface CodeTabsProps {
  /** Sekme adları — genelde dosya adları: ['app/page.tsx', 'lib/data.ts'] */
  items: string[];
  children: ReactNode;
}

/**
 * Birden fazla dosyayı sekmeli göstermek için ince sarmalayıcı.
 * Fumadocs'un kendi sekme altyapısını kullanır; MDX'te kullanımı:
 *
 * <CodeTabs items={['app/page.tsx', 'lib/data.ts']}>
 *   <CodeTab value="app/page.tsx">```tsx ... ```</CodeTab>
 *   <CodeTab value="lib/data.ts">```ts ... ```</CodeTab>
 * </CodeTabs>
 */
export function CodeTabs({ items, children }: CodeTabsProps) {
  return (
    <CodeBlockTabs defaultValue={items[0]}>
      <CodeBlockTabsList>
        {items.map((item) => (
          <CodeBlockTabsTrigger key={item} value={item}>
            {item}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>
      {children}
    </CodeBlockTabs>
  );
}

export const CodeTab = CodeBlockTab;
