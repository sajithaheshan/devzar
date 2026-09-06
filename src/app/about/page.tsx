import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { siteConfig } from "@/config/site";
import { allApis } from "@/content/apis";
import { categories } from "@/content/categories";
import { githubCreators } from "@/content/github/creators";
import { githubCompanies } from "@/content/github/companies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About DevZar",
  description: "Learn what DevZar is, why it exists, and why we refuse to publish fake ratings, reviews or user counts.",
  path: "/about",
  keywords: ["about devzar", "api directory mission"],
});

const values = [
  {
    icon: "faShieldHalved",
    title: "Zero fake data",
    body: "No invented star ratings, no fabricated 'monthly users', no fake uptime percentages. If we show a number, it's real and verifiable.",
  },
  {
    icon: "faServer",
    title: "Real, working endpoints",
    body: "Every API entry links to its actual base URL and official documentation, sourced from open community lists like public-apis/public-apis.",
  },
  {
    icon: "faCodeBranch",
    title: "Live GitHub data",
    body: "Our GitHub Creators & Companies tabs call the real GitHub REST API on every request — stats are never more than an hour stale.",
  },
  {
    icon: "faRocket",
    title: "Open-source stack",
    body: `Built with ${siteConfig.poweredBy.join(", ")} and dozens of other open-source tools.`,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faCircleInfo" className="h-3 w-3" /> Est. {siteConfig.foundedYear}
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">About {siteConfig.name}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{siteConfig.description}</p>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Real APIs", value: allApis.length },
          { label: "Categories", value: categories.length },
          { label: "GitHub profiles", value: githubCreators.length + githubCompanies.length },
        ].map((s) => (
          <div key={s.label} className="brutal-box-sm bg-[var(--card-bg)] p-4 text-center">
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="brutal-box bg-[var(--card-bg)] p-6">
            <Icon name={v.icon} className="h-6 w-6 text-[var(--color-pink)]" />
            <h2 className="mt-3 text-lg font-black">{v.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="brutal-box mt-14 bg-[var(--color-green)] p-8 text-[var(--color-ink)]">
        <h2 className="text-2xl font-black">Our mission</h2>
        <p className="mt-3 max-w-2xl">
          The internet runs on open, unstoppable technology that most people never see — DHTs, content-addressed
          storage, sandboxed runtimes, permissionless protocols. DevZar exists to make the developer-facing layer of
          that world (APIs, open-source maintainers, and the companies backing them) just as easy to discover.
        </p>
      </div>
    </div>
  );
}
