import Link from "next/link";
import { Badge } from "@/components/badge";
import { CategoryCard } from "@/components/category-card";
import { Icon } from "@/components/icon";
import { categories } from "@/content/categories";
import { allApis } from "@/content/apis";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Browse All API Categories",
  description:
    "Explore every DevZar API category — Anime, Gaming, Movies & TV, Technology, Sports, Music, Finance, AI, Science, News, Weather and Lifestyle. All real, verified public APIs.",
  path: "/categories",
  keywords: ["api categories", "api directory", "browse apis"],
});

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faLayerGroup" className="h-3 w-3" /> {categories.length} categories
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">All API Categories</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        {allApis.length}+ real, hand-verified public APIs sourced from open developer communities — organized by the
        niche you actually care about.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} count={allApis.filter((a) => a.categorySlug === c.slug).length} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/" className="brutal-box-sm brutal-hover bg-[var(--card-bg)] px-5 py-3 text-sm font-bold uppercase">
          ← Back home
        </Link>
      </div>
    </div>
  );
}
