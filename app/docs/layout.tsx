import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarBanner } from '@/components/site/sidebar-banner';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{ banner: <SidebarBanner />, collapsible: true }}
    >
      {children}
    </DocsLayout>
  );
}
