/**
 * -----------------------------------------------------------------------
 * DEVZAR — SINGLE SOURCE OF TRUTH SITE CONFIG
 * -----------------------------------------------------------------------
 * Every social handle, contact address, ad-network link, and brand string
 * used across the whole app is read from THIS file. Change anything here
 * and it updates the entire site instantly — header, footer, share cards,
 * legal pages, JSON-LD, sitemap, everything.
 * -----------------------------------------------------------------------
 */

export const siteConfig = {
  name: "DevZar",
  legalName: "DevZar Labs",
  tagline: "The world's biggest open directory of developer APIs",
  description:
    "DevZar is a free, open directory of 10,000+ real public APIs across Anime, Gaming, Movies & TV, Technology, Sports and Lifestyle — plus a living GitHub atlas of the creators and companies who built the internet's most unstoppable open-source technology.",
  url: "https://devzar.netlify.app",
  domain: "devzar.netlify.app",
  keywords: [
    "free public APIs",
    "developer API directory",
    "anime API",
    "gaming API",
    "movies API",
    "technology API",
    "sports API",
    "open source APIs",
    "REST API list",
    "no auth API",
    "GitHub top developers",
    "GitHub top companies",
    "hidden tech secrets",
    "unstoppable technology",
    "API documentation directory",
    "devzar",
  ],

  // ---- Brand assets -------------------------------------------------
  logo: "/images/logo.png",
  ogImage: "/images/og-image.jpg",
  favicon: "/images/logo.png",
  themeColorLight: "#FFDE00",
  themeColorDark: "#0A0A0A",

  // ---- Contact / support ---------------------------------------------
  contact: {
    supportEmail: "support@devzar.netlify.app",
    businessEmail: "hello@devzar.netlify.app",
    reportEmail: "abuse@devzar.netlify.app",
  },

  // ---- Social media handles (edit anytime, updates whole site) -------
  social: {
    github: "https://github.com/sajithaheshan",
    twitter: "https://twitter.com/sajithaheshan",
    facebook: "https://facebook.com/sajithaheshan",
    instagram: "https://instagram.com/sajithaheshan",
    youtube: "https://youtube.com/@sajithaheshan",
    discord: "https://discord.gg/sajithaheshan",
    telegram: "https://t.me/sajithaheshan",
    linkedin: "https://linkedin.com/company/sajithaheshan",
    reddit: "https://reddit.com/r/sajithaheshan",
  },

  // ---- Rotating ad / sponsor CTA links (cycled on every render) ------
  adLinks: [
    "https://www.effectivecpmnetwork.com/yk3z2y8hf?key=7775c8b95920e035cc394f158980ac3f",
    "https://www.effectivecpmnetwork.com/c7dj3a8xc2?key=5fb97a1d730fc9169e5d09d744607351",
    "https://www.effectivecpmnetwork.com/c2du2gif?key=cb56468fb73b520a9eb7af0eba7a75c5",
  ],

  // ---- Misc ------------------------------------------------------------
  githubOrg: "sajithaheshan",
  foundedYear: 2026,
  poweredBy: [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Tailwind CSS",
    "Framer Motion",
    "Font Awesome",
    "GitHub REST API",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
