import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categories } from "@/content/categories";
import { allApis } from "@/content/apis";
import { blogPosts } from "@/content/blog/posts";

/**
 * Fully auto-generated sitemap. Every category page, every single API detail
 * page and every blog post is derived directly from the content layer, so
 * new entries automatically appear here with zero manual maintenance.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/categories`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/github/creators`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/github/companies`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/support`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/sitemap-page`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteConfig.url}/categories/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const apiRoutes: MetadataRoute.Sitemap = allApis.map((a) => ({
    url: `${siteConfig.url}/categories/${a.categorySlug}/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: new Date(p.publishedAt),
  }));

  return [...staticRoutes, ...categoryRoutes, ...apiRoutes, ...blogRoutes];
}
