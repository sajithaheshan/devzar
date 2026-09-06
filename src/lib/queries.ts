import { findApiBySlug, getApisForCategory, totalApiCount } from "@/content/apis";
import { blogPosts } from "@/content/blog/posts";
import { categories, getCategory } from "@/content/categories";

const PAGE_SIZE = 12;

export async function getCategoriesWithCounts() {
  return categories.map((category) => ({
    ...category,
    apiCount: getApisForCategory(category.slug).length,
  }));
}

export async function getCategoryBySlug(slug: string) {
  return getCategory(slug);
}

export async function getApisPage(categorySlug: string, page: number) {
  const categoryApis = getApisForCategory(categorySlug);
  const offset = (page - 1) * PAGE_SIZE;

  return {
    rows: categoryApis.slice(offset, offset + PAGE_SIZE),
    total: categoryApis.length,
    totalPages: Math.max(1, Math.ceil(categoryApis.length / PAGE_SIZE)),
  };
}

export async function getApiBySlug(categorySlug: string, slug: string) {
  return findApiBySlug(categorySlug, slug);
}

export async function getRelatedApis(categorySlug: string, excludeSlug: string, limit = 4) {
  return getApisForCategory(categorySlug)
    .filter((api) => api.slug !== excludeSlug)
    .slice(0, limit);
}

export async function getTotalApiCount() {
  return totalApiCount;
}

export async function getAllBlogPosts() {
  return [...blogPosts].sort(
    (first, second) => new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );
}

export async function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export { PAGE_SIZE };
