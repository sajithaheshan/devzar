import { siteConfig } from "@/config/site";

/**
 * Deterministically rotates through the sponsor/ad-network links based on a
 * seed (e.g. slug, index, or Date). Used so every "Support Us" / "Visit"
 * button across the site cycles between the 3 configured ad links instead
 * of always hitting the same one.
 */
export function pickAdLink(seed: string | number = Date.now()): string {
  const links: readonly string[] = siteConfig.adLinks;
  if (links.length === 0) return siteConfig.url;
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return links[hash % links.length];
}

export function nextAdLink(currentIndex: number): { link: string; index: number } {
  const links = siteConfig.adLinks;
  const index = (currentIndex + 1) % links.length;
  return { link: links[index], index };
}
