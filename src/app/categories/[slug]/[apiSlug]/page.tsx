import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { ApiTester } from "@/components/api-tester";
import { SocialShare } from "@/components/social-share";
import { AdButton } from "@/components/ad-button";
import { ApiCard } from "@/components/api-card";
import { getCategory } from "@/content/categories";
import { allApis } from "@/content/apis";
import { getApiBySlug, getRelatedApis } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const revalidate = 3600;

export function generateStaticParams() {
  return allApis.map((a) => ({ slug: a.categorySlug, apiSlug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; apiSlug: string }>;
}): Promise<Metadata> {
  const { slug, apiSlug } = await params;
  const api = await getApiBySlug(slug, apiSlug);
  if (!api) return {};
  const category = getCategory(slug);
  return buildMetadata({
    title: `${api.name} API — Free Docs, Auth Type & Live Test`,
    description: `${api.description} Auth: ${api.authType}. HTTPS: ${api.https ? "Yes" : "No"}. CORS: ${api.cors}.`,
    path: `/categories/${slug}/${apiSlug}`,
    keywords: [api.name, `${api.name} api`, `${api.name} documentation`, ...(category?.seoKeywords ?? []), ...api.tags],
  });
}

export default async function ApiDetailPage({
  params,
}: {
  params: Promise<{ slug: string; apiSlug: string }>;
}) {
  const { slug, apiSlug } = await params;
  const category = getCategory(slug);
  const api = await getApiBySlug(slug, apiSlug);
  if (!category || !api) notFound();

  const related = await getRelatedApis(slug, apiSlug);
  const tags = api.tags;
  const pageUrl = `${siteConfig.url}/categories/${slug}/${apiSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${api.name} API`,
    applicationCategory: "DeveloperApplication",
    description: api.description,
    url: api.docsUrl || api.baseUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-4 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        <Link href="/categories" className="hover:text-[var(--color-pink)]">
          Categories
        </Link>{" "}
        /{" "}
        <Link href={`/categories/${slug}`} className="hover:text-[var(--color-pink)]">
          {category.name}
        </Link>{" "}
        / {api.name}
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>
          <Icon name={category.icon} className="h-3 w-3" /> {category.name}
        </Badge>
        <Badge>
          <Icon name="faKey" className="h-3 w-3" /> Auth: {api.authType === "No" ? "None required" : api.authType}
        </Badge>
        <Badge>
          <Icon name={api.https ? "faLock" : "faLockOpen"} className="h-3 w-3" /> {api.https ? "HTTPS" : "HTTP"}
        </Badge>
        <Badge>
          <Icon name="faGlobe" className="h-3 w-3" /> CORS: {api.cors}
        </Badge>
      </div>

      <h1 className="mt-4 text-4xl font-black sm:text-5xl">{api.name} API</h1>
      <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">{api.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={api.docsUrl || api.baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase"
        >
          <Icon name="faArrowUpRightFromSquare" className="h-4 w-4" /> Open official docs
        </a>
        <AdButton seed={apiSlug} label="Support DevZar" />
      </div>

      <section className="brutal-box mt-10 bg-[var(--card-bg)] p-6">
        <h2 className="text-xl font-black">About this API</h2>
        <p className="mt-3 text-[var(--fg)]">{api.longDescription || api.description}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Base URL</dt>
            <dd className="mt-1 break-all font-mono text-sm">{api.baseUrl}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Documentation</dt>
            <dd className="mt-1 break-all text-sm">
              <a href={api.docsUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {api.docsUrl}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Source list</dt>
            <dd className="mt-1 break-all text-sm">
              <a href={api.sourceListUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {api.sourceListUrl || "Community curated"}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Tags</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="border-2 border-[var(--border-color)] px-2 py-0.5 text-[10px] font-bold uppercase">
                  #{tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {api.isTestable && (
        <div className="mt-6">
          <ApiTester baseUrl={api.baseUrl} />
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-black uppercase tracking-wide">Share this API</h2>
        <SocialShare title={`${api.name} API`} description={api.description} url={pageUrl} category={category.name} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-2xl font-black">More {category.name} APIs</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <ApiCard key={r.slug} categorySlug={slug} api={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
