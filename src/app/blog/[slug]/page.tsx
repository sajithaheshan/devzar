import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { SocialShare } from "@/components/social-share";
import { blogPosts } from "@/content/blog/posts";
import { getBlogPostBySlug } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const revalidate = 3600;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: post.seoKeywords.split(",").map((k) => k.trim()),
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faBlog" className="h-3 w-3" /> {format(new Date(post.publishedAt), "MMMM d, yyyy")}
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">{post.title}</h1>
      <p className="mt-3 text-lg text-[var(--muted)]">{post.excerpt}</p>

      <div className="prose-devzar mt-10 max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-12 border-t-2 border-[var(--border-color)] pt-6">
        <h2 className="mb-3 text-sm font-black uppercase tracking-widest">Share this article</h2>
        <SocialShare title={post.title} description={post.excerpt} url={`${siteConfig.url}/blog/${slug}`} />
      </div>
    </article>
  );
}
