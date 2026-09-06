import Link from "next/link";
import { Icon } from "./icon";
import type { ApiEntry } from "@/content/apis/types";

const colorMap: Record<string, string> = {
  anime: "bg-[var(--color-pink)]",
  gaming: "bg-[var(--color-green)]",
  "movies-tv": "bg-[var(--color-yellow)]",
  technology: "bg-[var(--color-blue)]",
  sports: "bg-[var(--color-green)]",
  music: "bg-[var(--color-purple)]",
  finance: "bg-[var(--color-yellow)]",
  "ai-ml": "bg-[var(--color-pink)]",
  "science-space": "bg-[var(--color-blue)]",
  "news-media": "bg-[var(--color-green)]",
  "weather-nature": "bg-[var(--color-purple)]",
  lifestyle: "bg-[var(--color-pink)]",
};

export function ApiCard({ api, categorySlug }: { api: ApiEntry; categorySlug: string }) {
  const chip = colorMap[categorySlug] ?? "bg-[var(--color-yellow)]";
  return (
    <Link
      href={`/categories/${categorySlug}/${api.slug}`}
      className="brutal-box brutal-hover flex flex-col justify-between gap-4 bg-[var(--card-bg)] p-5"
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={`brutal-box-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--color-ink)] ${chip}`}>
            {api.authType === "No" ? "No Auth" : api.authType}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[var(--muted)]">
            <Icon name={api.https ? "faLock" : "faLockOpen"} className="h-3 w-3" />
            {api.https ? "HTTPS" : "HTTP"}
          </span>
        </div>
        <h3 className="text-lg font-black leading-snug text-[var(--fg)]">{api.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">{api.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {api.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="border-2 border-[var(--border-color)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--muted)]">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
