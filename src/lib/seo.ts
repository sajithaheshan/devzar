import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = Array.from(new Set([...keywords, ...siteConfig.keywords]));

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@sajithaheshan",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/** Builds a punchy, ready-to-post share caption for social sharing buttons. */
export function buildShareCaption(opts: {
  title: string;
  description: string;
  category?: string;
  url: string;
}): string {
  const tagBits = [
    "#DevZar",
    "#API",
    opts.category ? `#${opts.category.replace(/\s+/g, "")}` : null,
    "#OpenSource",
    "#Developers",
  ].filter(Boolean);
  return `🚀 ${opts.title} — ${opts.description}\n\n🔗 ${opts.url}\n\n${tagBits.join(" ")}`;
}
