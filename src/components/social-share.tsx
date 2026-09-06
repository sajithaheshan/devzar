"use client";

import { useState } from "react";
import { Icon } from "./icon";
import { buildShareCaption } from "@/lib/seo";

export function SocialShare({
  title,
  description,
  url,
  category,
}: {
  title: string;
  description: string;
  url: string;
  category?: string;
}) {
  const [copied, setCopied] = useState(false);
  const caption = buildShareCaption({ title, description, category, url });

  const shareTargets = [
    {
      name: "X / Twitter",
      icon: "faTwitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`,
    },
    {
      name: "Facebook",
      icon: "faFacebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(caption)}`,
    },
    {
      name: "Reddit",
      icon: "faReddit",
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
      name: "Telegram",
      icon: "faTelegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(caption)}`,
    },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shareTargets.map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${t.name}`}
          className="brutal-box-sm brutal-hover flex h-10 w-10 items-center justify-center bg-[var(--card-bg)]"
        >
          <Icon name={t.icon} className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(`${caption}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
        className="brutal-box-sm brutal-hover flex h-10 items-center gap-2 bg-[var(--color-yellow)] px-3 text-xs font-bold uppercase text-[var(--color-ink)]"
      >
        <Icon name={copied ? "faCheck" : "faCopy"} className="h-3.5 w-3.5" />
        {copied ? "Copied!" : "Copy caption"}
      </button>
    </div>
  );
}
