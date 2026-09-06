"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { ThemeToggle } from "./theme-toggle";
import { SearchOverlay } from "./search-overlay";
import { categories } from "@/content/categories";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/github/creators", label: "GitHub Creators" },
  { href: "/github/companies", label: "Companies" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[var(--border-color)] bg-[var(--bg)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={40} height={40} className="brutal-box-sm h-10 w-10 bg-[var(--color-yellow)] object-contain p-1" priority />
          <span className="text-xl font-black tracking-tight text-[var(--fg)]">
            Dev<span className="text-[var(--color-pink)]">Zar</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-bold uppercase tracking-wide text-[var(--fg)] hover:bg-[var(--color-yellow)] hover:text-[var(--color-ink)]",
                pathname === link.href && "bg-[var(--color-yellow)] text-[var(--color-ink)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Toggle search"
            onClick={() => setSearchOpen((v) => !v)}
            className="brutal-box-sm flex h-10 w-10 items-center justify-center bg-[var(--card-bg)] brutal-hover"
          >
            <Icon name={searchOpen ? "faXmark" : "faMagnifyingGlass"} className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="brutal-box-sm flex h-10 w-10 items-center justify-center bg-[var(--card-bg)] brutal-hover lg:hidden"
          >
            <Icon name={menuOpen ? "faXmark" : "faBars"} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category quick-strip (desktop) */}
      <div className="hidden overflow-x-auto border-t-2 border-[var(--border-color)] bg-[var(--card-bg)] lg:block">
        <div className="mx-auto flex max-w-7xl gap-1 px-6 py-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="flex shrink-0 items-center gap-1.5 border-2 border-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--muted)] hover:border-[var(--border-color)] hover:bg-[var(--color-green)] hover:text-[var(--color-ink)]"
            >
              <Icon name={c.icon} className="h-3 w-3" />
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t-[3px] border-[var(--border-color)] bg-[var(--bg)] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="brutal-box-sm bg-[var(--card-bg)] px-4 py-3 text-sm font-bold uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
