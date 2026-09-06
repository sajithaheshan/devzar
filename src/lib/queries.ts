import { db } from "@/db";
import { apis, categories, blogPosts } from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";

const PAGE_SIZE = 12;

export async function getCategoriesWithCounts() {
  const rows = await db
    .select({
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
      icon: categories.icon,
      color: categories.color,
      seoKeywords: categories.seoKeywords,
      apiCount: count(apis.id),
    })
    .from(categories)
    .leftJoin(apis, eq(apis.categorySlug, categories.slug))
    .groupBy(categories.id)
    .orderBy(categories.name);
  return rows;
}

export async function getCategoryBySlug(slug: string) {
  const [row] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return row;
}

export async function getApisPage(categorySlug: string, page: number) {
  const offset = (page - 1) * PAGE_SIZE;
  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(apis)
      .where(eq(apis.categorySlug, categorySlug))
      .orderBy(apis.name)
      .limit(PAGE_SIZE)
      .offset(offset),
    db.select({ total: count() }).from(apis).where(eq(apis.categorySlug, categorySlug)),
  ]);
  return { rows, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getApiBySlug(categorySlug: string, slug: string) {
  const [row] = await db
    .select()
    .from(apis)
    .where(and(eq(apis.categorySlug, categorySlug), eq(apis.slug, slug)))
    .limit(1);
  return row;
}

export async function getRelatedApis(categorySlug: string, excludeSlug: string, limit = 4) {
  const rows = await db.select().from(apis).where(eq(apis.categorySlug, categorySlug)).limit(limit + 1);
  return rows.filter((r) => r.slug !== excludeSlug).slice(0, limit);
}

export async function getTotalApiCount() {
  const [{ total }] = await db.select({ total: count() }).from(apis);
  return total;
}

export async function getAllBlogPosts() {
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return row;
}

export { PAGE_SIZE };
