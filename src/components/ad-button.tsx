"use client";

import { useMemo } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "./icon";

/**
 * Rotating sponsor CTA — cycles between the configured ad-network links so
 * traffic is spread evenly. Seed by a stable string (e.g. current path) so
 * the link doesn't change between server/client render but still varies
 * across pages.
 */
export function AdButton({
  seed = "default",
  label = "Support DevZar",
  className = "",
}: {
  seed?: string;
  label?: string;
  className?: string;
}) {
  const href = useMemo(() => {
    const links = siteConfig.adLinks;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return links[hash % links.length];
  }, [seed]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`btn-glow inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide ${className}`}
    >
      <Icon name="faBolt" className="h-4 w-4" />
      {label}
    </a>
  );
}
