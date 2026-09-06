import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { ApiCard } from "@/components/api-card";
import { Pagination } from "@/components/pagination";
import { Icon } from "@/components/icon";
import { getCategory, categories } from "@/content/categories";
import { getApisPage, getCategoryBySlug } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 3600;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} APIs — Free & Real`,
    description: `${category.description} Browse every ${category.name} API with docs, auth type and CORS info.`,
    path: `/categories/${slug}`,
    keywords: category.seoKeywords,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const contentCategory = await getCategoryBySlug(slug);
  const { rows, total, totalPages } = await getApisPage(slug, page);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        <Link href="/categories" className="hover:text-[var(--color-pink)]">
          Categories
        </Link>{" "}
        / {category.name}
      </nav>

      <Badge className="mb-3 w-fit">
        <Icon name={category.icon} className="h-3 w-3" /> {total} APIs
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">{category.name} APIs</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">{contentCategory?.description ?? category.description}</p>

      {rows.length === 0 ? (
        <p className="mt-10 text-[var(--muted)]">No APIs found in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((api) => (
            <ApiCard key={api.slug} categorySlug={slug} api={api} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/categories/${slug}`} />

      <section className="mt-16 grid gap-2 text-xs text-[var(--muted)]">
        <p className="font-bold uppercase tracking-widest text-[var(--fg)]">Related searches</p>
        <p>{category.seoKeywords.join(" • ")}</p>
      </section>
    </div>
  );
}
