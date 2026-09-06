import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { Badge } from "@/components/badge";
import { CategoryCard } from "@/components/category-card";
import { ApiCard } from "@/components/api-card";
import { AdButton } from "@/components/ad-button";
import { Icon } from "@/components/icon";
import { categories } from "@/content/categories";
import { allApis } from "@/content/apis";
import { githubCreators } from "@/content/github/creators";
import { githubCompanies } from "@/content/github/companies";
import { getGithubUsersBulk } from "@/lib/github";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const featuredSlugs = [
  ["anime", "jikan"],
  ["gaming", "pokeapi"],
  ["technology", "github-rest-api"],
  ["ai-ml", "huggingface-inference-api"],
  ["science-space", "spacex-api"],
  ["finance", "coingecko"],
  ["movies-tv", "tmdb"],
  ["sports", "thesportsdb"],
] as const;

export default async function HomePage() {
  const featured = featuredSlugs
    .map(([cat, slug]) => allApis.find((a) => a.categorySlug === cat && a.slug === slug))
    .filter((a): a is (typeof allApis)[number] => Boolean(a));

  const spotlightLogins = [...githubCreators.slice(0, 3).map((c) => c.login), githubCompanies[0]?.login].filter(
    Boolean,
  ) as string[];
  const liveProfiles = await getGithubUsersBulk(spotlightLogins);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <HeroCarousel />

      {/* Stats strip */}
      <section className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Real APIs cataloged", value: `${allApis.length}+`, icon: "faServer" },
          { label: "Developer niches", value: `${categories.length}`, icon: "faLayerGroup" },
          { label: "GitHub profiles tracked", value: `${githubCreators.length + githubCompanies.length}`, icon: "faCodeBranch" },
          { label: "Fabricated stats used", value: "0", icon: "faShieldHalved" },
        ].map((s) => (
          <div key={s.label} className="brutal-box-sm flex flex-col gap-1 bg-[var(--card-bg)] p-4">
            <Icon name={s.icon} className="h-4 w-4 text-[var(--color-pink)]" />
            <span className="text-2xl font-black">{s.value}</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge className="mb-3 w-fit">
              <Icon name="faLayerGroup" className="h-3 w-3" /> Browse by niche
            </Badge>
            <h2 className="text-3xl font-black sm:text-4xl">Every Developer Niche, Organized</h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              Anime, Gaming, Movies & TV, Technology, Sports, Music, Finance, AI, Science, News, Weather and Lifestyle —
              real free APIs curated from open-source lists like public-apis/public-apis.
            </p>
          </div>
          <Link href="/categories" className="btn-glow px-5 py-3 text-sm font-bold uppercase tracking-wide">
            View all categories
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} count={allApis.filter((a) => a.categorySlug === c.slug).length} />
          ))}
        </div>
      </section>

      {/* Featured APIs */}
      <section className="mt-16">
        <Badge className="mb-3 w-fit">
          <Icon name="faStar" className="h-3 w-3" /> Hand-picked
        </Badge>
        <h2 className="text-3xl font-black sm:text-4xl">Featured Real APIs</h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          A snapshot of verified, working endpoints — every card links to a full detail page with docs, auth type and
          a live tester where supported.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((api) => (
            <ApiCard key={`${api.categorySlug}-${api.slug}`} api={api} categorySlug={api.categorySlug} />
          ))}
        </div>
      </section>

      {/* GitHub spotlight */}
      <section className="mt-16">
        <Badge className="mb-3 w-fit">
          <Icon name="faCodeBranch" className="h-3 w-3" /> Live from GitHub
        </Badge>
        <h2 className="text-3xl font-black sm:text-4xl">The Humans & Companies Behind Open Source</h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          Real-time stats pulled straight from the GitHub REST API — no cached fake numbers.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {spotlightLogins.map((login) => {
            const profile = liveProfiles.get(login);
            return (
              <Link
                key={login}
                href={`/github/creators`}
                className="brutal-box brutal-hover flex flex-col items-center gap-3 bg-[var(--card-bg)] p-5 text-center"
              >
                {profile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={login} className="h-16 w-16 border-2 border-[var(--border-color)] object-cover" />
                ) : (
                  <div className="h-16 w-16 border-2 border-[var(--border-color)] bg-[var(--bg)]" />
                )}
                <p className="font-black">{profile?.name ?? login}</p>
                <p className="text-xs text-[var(--muted)]">@{login}</p>
                {profile && (
                  <p className="text-xs font-bold text-[var(--color-pink)]">
                    {profile.followers.toLocaleString()} followers · {profile.public_repos} repos
                  </p>
                )}
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/github/creators" className="brutal-box-sm brutal-hover bg-[var(--card-bg)] px-4 py-2 text-sm font-bold uppercase">
            Browse GitHub Creators
          </Link>
          <Link href="/github/companies" className="brutal-box-sm brutal-hover bg-[var(--card-bg)] px-4 py-2 text-sm font-bold uppercase">
            Browse Companies
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="brutal-box mt-16 flex flex-col items-start gap-4 bg-[var(--color-yellow)] p-8 sm:p-12">
        <Badge>
          <Icon name="faRocket" className="h-3 w-3" /> Keep DevZar free forever
        </Badge>
        <h2 className="max-w-2xl text-3xl font-black text-[var(--color-ink)] sm:text-4xl">
          Support the directory so we can keep adding real APIs every week.
        </h2>
        <AdButton seed="home-cta" label="Support DevZar Now" />
      </section>
    </div>
  );
}
