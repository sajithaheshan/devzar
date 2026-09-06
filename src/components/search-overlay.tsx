"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "./icon";
import { allApis } from "@/content/apis";
import { categories } from "@/content/categories";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { apiMatches: [], categoryMatches: [] };
    const apiMatches = allApis
      .filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 8);
    const categoryMatches = categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4);
    return { apiMatches, categoryMatches };
  }, [query]);

  return (
    <div className="absolute left-0 right-0 top-full z-40 border-b-[3px] border-[var(--border-color)] bg-[var(--bg)] bg-dot-grid shadow-[0_8px_0_0_var(--shadow-color)]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="brutal-box flex items-center gap-3 bg-[var(--card-bg)] px-4 py-3">
          <Icon name="faMagnifyingGlass" className="h-4 w-4 shrink-0 text-[var(--muted)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 100s of real APIs — try 'anime', 'weather', 'crypto'..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded-none p-1 text-[var(--muted)] hover:text-[var(--fg)]"
          >
            <Icon name="faXmark" className="h-4 w-4" />
          </button>
        </div>

        {query.trim() && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Categories</p>
              <div className="flex flex-col gap-2">
                {results.categoryMatches?.length ? (
                  results.categoryMatches.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      onClick={onClose}
                      className="brutal-box-sm brutal-hover flex items-center gap-2 bg-[var(--card-bg)] px-3 py-2 text-sm font-semibold"
                    >
                      <Icon name={c.icon} className="h-3.5 w-3.5" />
                      {c.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">No category matches.</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">APIs</p>
              <div className="flex flex-col gap-2">
                {results.apiMatches?.length ? (
                  results.apiMatches.map((a) => (
                    <Link
                      key={`${a.categorySlug}-${a.slug}`}
                      href={`/categories/${a.categorySlug}/${a.slug}`}
                      onClick={onClose}
                      className="brutal-box-sm brutal-hover flex flex-col gap-0.5 bg-[var(--card-bg)] px-3 py-2"
                    >
                      <span className="text-sm font-semibold">{a.name}</span>
                      <span className="line-clamp-1 text-xs text-[var(--muted)]">{a.description}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">No API matches yet — try another keyword.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
