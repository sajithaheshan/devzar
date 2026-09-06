"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { allApis } from "@/content/apis";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", icon: "faHouse", label: "Home" },
  { href: "/categories", icon: "faLayerGroup", label: "Categories" },
  { href: "/github/creators", icon: "faCodeBranch", label: "GitHub" },
  { href: "/blog", icon: "faBlog", label: "Blog" },
];

export function MobilePillNav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allApis
      .filter((a) => a.name.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)))
      .slice(0, 10);
  }, [query]);

  return (
    <>
      <nav
        className="glass-pill fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-2 lg:hidden"
        aria-label="Mobile navigation"
      >
        {items.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg)] transition-colors",
              pathname === item.href ? "bg-[var(--color-yellow)] text-[var(--color-ink)]" : "hover:bg-black/5 dark:hover:bg-white/10",
            )}
          >
            <Icon name={item.icon} className="h-4.5 w-4.5" />
          </Link>
        ))}

        <button
          type="button"
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          className="mx-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--border-color)] bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-purple)] text-white shadow-[0_0_16px_rgba(139,92,246,0.6)]"
        >
          <Icon name="faMagnifyingGlass" className="h-4.5 w-4.5" />
        </button>

        {items.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg)] transition-colors",
              pathname === item.href ? "bg-[var(--color-yellow)] text-[var(--color-ink)]" : "hover:bg-black/5 dark:hover:bg-white/10",
            )}
          >
            <Icon name={item.icon} className="h-4.5 w-4.5" />
          </Link>
        ))}
      </nav>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="brutal-box max-h-[75vh] overflow-y-auto rounded-t-3xl border-b-0 bg-[var(--bg)] p-4 pb-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="brutal-box-sm flex flex-1 items-center gap-2 bg-[var(--card-bg)] px-3 py-2.5">
                <Icon name="faMagnifyingGlass" className="h-4 w-4 text-[var(--muted)]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search APIs..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close"
                className="brutal-box-sm flex h-10 w-10 items-center justify-center bg-[var(--card-bg)]"
              >
                <Icon name="faXmark" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {results.map((a) => (
                <Link
                  key={`${a.categorySlug}-${a.slug}`}
                  href={`/categories/${a.categorySlug}/${a.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="brutal-box-sm bg-[var(--card-bg)] px-3 py-2"
                >
                  <p className="text-sm font-semibold">{a.name}</p>
                  <p className="line-clamp-1 text-xs text-[var(--muted)]">{a.description}</p>
                </Link>
              ))}
              {query && results.length === 0 && (
                <p className="py-4 text-center text-sm text-[var(--muted)]">No matches found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
