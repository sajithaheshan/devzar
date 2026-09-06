import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { GithubProfileCard } from "@/components/github-profile-card";
import { Pagination } from "@/components/pagination";
import { githubCompanies } from "@/content/github/companies";
import { getGithubUsersBulk } from "@/lib/github";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
const PAGE_SIZE = 12;

export const metadata = buildMetadata({
  title: "Top Company GitHub Accounts — Google, Microsoft, Vercel & More",
  description:
    "Explore the real, official GitHub organizations of the world's leading tech companies and open-source foundations, with live repo and follower stats.",
  path: "/github/companies",
  keywords: ["company github accounts", "tech company open source", "github organizations"],
});

export default async function GithubCompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(githubCompanies.length / PAGE_SIZE));
  const slice = githubCompanies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const profiles = await getGithubUsersBulk(slice.map((c) => c.login));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faBuilding" className="h-3 w-3" /> {githubCompanies.length} real organizations tracked
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">Company GitHub Accounts</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Official GitHub organizations for the companies and foundations building the internet's open-source
        backbone — live repo counts and followers, straight from GitHub.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {slice.map((c) => (
          <GithubProfileCard key={c.login} login={c.login} tags={c.tags} note={c.note} profile={profiles.get(c.login) ?? null} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/github/companies" />
    </div>
  );
}
