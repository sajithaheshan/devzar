import Link from "next/link";
import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { getAllBlogPosts } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { format } from "date-fns";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "DevZar Blog — Real Tech Deep-Dives",
  description:
    "Honest, factual articles on unstoppable open-source technology, how public API directories are maintained, and how DevZar builds without fake data.",
  path: "/blog",
  keywords: ["developer blog", "open source technology blog", "api directory blog"],
});

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faBlog" className="h-3 w-3" /> {posts.length} articles
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">The DevZar Blog</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Real technology deep-dives — no filler, no fabricated case studies.
      </p>

      <div className="mt-10 grid gap-5">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="brutal-box brutal-hover flex gap-4 bg-[var(--card-bg)] p-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[var(--border-color)] bg-[var(--color-yellow)] text-3xl">
              {post.coverEmoji}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                {format(new Date(post.publishedAt), "MMM d, yyyy")}
              </p>
              <h2 className="mt-1 text-xl font-black">{post.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
