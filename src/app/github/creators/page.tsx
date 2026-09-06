import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { GithubProfileCard } from "@/components/github-profile-card";
import { Pagination } from "@/components/pagination";
import { githubCreators } from "@/content/github/creators";
import { getGithubUsersBulk } from "@/lib/github";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
const PAGE_SIZE = 12;

export const metadata = buildMetadata({
  title: "GitHub Creators — Real Developers Behind Open Source",
  description:
    "A living directory of the humans who built the open-source technology powering the internet — Linus Torvalds, Dan Abramov, Evan You and 50+ more, with live GitHub stats.",
  path: "/github/creators",
  keywords: ["top github developers", "open source creators", "github profiles", "famous developers"],
});

export default async function GithubCreatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(githubCreators.length / PAGE_SIZE));
  const slice = githubCreators.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const profiles = await getGithubUsersBulk(slice.map((c) => c.login));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faCodeBranch" className="h-3 w-3" /> {githubCreators.length} real profiles tracked
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">GitHub Creators</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Every card below fetches live data straight from the public GitHub REST API — followers, repo counts, avatar
        and bio — refreshed hourly. Nothing here is a made-up number.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {slice.map((c) => (
          <GithubProfileCard key={c.login} login={c.login} tags={c.tags} note={c.note} profile={profiles.get(c.login) ?? null} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/github/creators" />
    </div>
  );
}
