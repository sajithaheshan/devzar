import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Categories — Anime, Gaming, Movies & TV, Technology, Sports, Lifestyle...
// ---------------------------------------------------------------------------
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 40 }).notNull().default("faCode"),
  color: varchar("color", { length: 20 }).notNull().default("yellow"),
  seoKeywords: text("seo_keywords").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// APIs directory — real, verifiable public APIs sourced from open-source
// lists (no fabricated ratings / view counts / user counts).
// ---------------------------------------------------------------------------
export const apis = pgTable(
  "apis",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    name: varchar("name", { length: 160 }).notNull(),
    categorySlug: varchar("category_slug", { length: 80 }).notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description").notNull().default(""),
    baseUrl: text("base_url").notNull().default(""),
    docsUrl: text("docs_url").notNull().default(""),
    authType: varchar("auth_type", { length: 40 }).notNull().default("No"),
    https: boolean("https").notNull().default(true),
    cors: varchar("cors", { length: 20 }).notNull().default("Unknown"),
    isTestable: boolean("is_testable").notNull().default(false),
    tags: text("tags").notNull().default(""),
    sourceListUrl: text("source_list_url").notNull().default(""),
    seoKeywords: text("seo_keywords").notNull().default(""),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("apis_category_idx").on(table.categorySlug),
  ],
);

// ---------------------------------------------------------------------------
// GitHub directory — we only persist the *reference* (username / org login +
// curator tags). Live stats (followers, repos, avatar, bio) are fetched
// straight from the real GitHub REST API at request time so nothing here is
// ever fake or stale.
// ---------------------------------------------------------------------------
export const githubProfiles = pgTable(
  "github_profiles",
  {
    id: serial("id").primaryKey(),
    login: varchar("login", { length: 80 }).notNull().unique(),
    kind: varchar("kind", { length: 20 }).notNull().default("creator"), // creator | company
    tags: text("tags").notNull().default(""),
    note: text("note").notNull().default(""),
    rank: integer("rank").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("github_profiles_kind_idx").on(table.kind)],
);

// ---------------------------------------------------------------------------
// Blog posts — developer-facing articles (real technology deep-dives).
// ---------------------------------------------------------------------------
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverEmoji: varchar("cover_emoji", { length: 10 }).notNull().default("⚡"),
  tags: text("tags").notNull().default(""),
  seoKeywords: text("seo_keywords").notNull().default(""),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Contact form submissions
// ---------------------------------------------------------------------------
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull().default("General"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

