import { categories } from '@/lib/categories';
import { countArticles, getRecentArticles, source } from '@/lib/source';
import { Hero } from '@/components/site/hero';
import { LayerLegend } from '@/components/site/layer-legend';
import { CategoryGrid } from '@/components/site/category-grid';
import { RecentArticles } from '@/components/site/recent-articles';
import { StartHere } from '@/components/site/start-here';

export default function HomePage() {
  const counts = Object.fromEntries(
    categories.map((category) => [category.slug, countArticles(category.slug)]),
  );

  return (
    <>
      <Hero articleCount={source.getPages().length} categoryCount={categories.length} />
      <LayerLegend />
      <CategoryGrid counts={counts} />
      <RecentArticles pages={getRecentArticles(5)} />
      <StartHere />
    </>
  );
}
