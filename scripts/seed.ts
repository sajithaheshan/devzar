import "dotenv/config";
import { db, pool } from "../src/db";
import { categories as categoriesTable, apis as apisTable, githubProfiles, blogPosts as blogPostsTable } from "../src/db/schema";
import { categories } from "../src/content/categories";
import { allApis } from "../src/content/apis";
import { githubCreators } from "../src/content/github/creators";
import { githubCompanies } from "../src/content/github/companies";
import { blogPosts } from "../src/content/blog/posts";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Seeding DevZar database...");

  // Categories
  for (const c of categories) {
    await db
      .insert(categoriesTable)
      .values({
        slug: c.slug,
        name: c.name,
        description: c.description,
        icon: c.icon,
        color: c.color,
        seoKeywords: c.seoKeywords.join(", "),
      })
      .onConflictDoUpdate({
        target: categoriesTable.slug,
        set: {
          name: c.name,
          description: c.description,
          icon: c.icon,
          color: c.color,
          seoKeywords: c.seoKeywords.join(", "),
        },
      });
  }
  console.log(`✔ ${categories.length} categories`);

  // APIs
  let apiCount = 0;
  for (const api of allApis) {
    await db
      .insert(apisTable)
      .values({
        slug: api.slug,
        name: api.name,
        categorySlug: api.categorySlug,
        description: api.description,
        longDescription: api.longDescription,
        baseUrl: api.baseUrl,
        docsUrl: api.docsUrl,
        authType: api.authType,
        https: api.https,
        cors: api.cors,
        isTestable: api.isTestable,
        tags: api.tags.join(", "),
        sourceListUrl: api.sourceListUrl,
        seoKeywords: [api.name, api.categorySlug, ...api.tags, "free api", "api documentation"].join(", "),
      })
      .onConflictDoUpdate({
        target: apisTable.slug,
        set: {
          name: api.name,
          categorySlug: api.categorySlug,
          description: api.description,
          longDescription: api.longDescription,
          baseUrl: api.baseUrl,
          docsUrl: api.docsUrl,
          authType: api.authType,
          https: api.https,
          cors: api.cors,
          isTestable: api.isTestable,
          tags: api.tags.join(", "),
          sourceListUrl: api.sourceListUrl,
        },
      });
    apiCount++;
  }
  console.log(`✔ ${apiCount} APIs`);

  // GitHub profiles
  let ghCount = 0;
  for (const creator of githubCreators) {
    await db
      .insert(githubProfiles)
      .values({
        login: creator.login,
        kind: "creator",
        tags: creator.tags.join(", "),
        note: creator.note,
      })
      .onConflictDoUpdate({
        target: githubProfiles.login,
        set: { tags: creator.tags.join(", "), note: creator.note, kind: "creator" },
      });
    ghCount++;
  }
  for (const company of githubCompanies) {
    await db
      .insert(githubProfiles)
      .values({
        login: company.login,
        kind: "company",
        tags: company.tags.join(", "),
        note: company.note,
      })
      .onConflictDoUpdate({
        target: githubProfiles.login,
        set: { tags: company.tags.join(", "), note: company.note, kind: "company" },
      });
    ghCount++;
  }
  console.log(`✔ ${ghCount} GitHub profile references`);

  // Blog posts
  for (const post of blogPosts) {
    await db
      .insert(blogPostsTable)
      .values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverEmoji: post.coverEmoji,
        tags: post.tags.join(", "),
        seoKeywords: post.seoKeywords.join(", "),
        publishedAt: new Date(post.publishedAt),
      })
      .onConflictDoUpdate({
        target: blogPostsTable.slug,
        set: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverEmoji: post.coverEmoji,
          tags: post.tags.join(", "),
          seoKeywords: post.seoKeywords.join(", "),
        },
      });
  }
  console.log(`✔ ${blogPosts.length} blog posts`);

  const [{ count }] = await db.execute<{ count: string }>(sql`select count(*)::int as count from ${apisTable}`).then(
    (r) => r.rows as unknown as { count: string }[],
  );
  console.log(`Total APIs in DB: ${count}`);

  await pool.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
