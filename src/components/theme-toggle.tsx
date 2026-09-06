"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`brutal-box-sm flex h-10 w-10 items-center justify-center bg-[var(--card-bg)] text-[var(--fg)] brutal-hover ${className}`}
    >
      <Icon name={isDark ? "faSun" : "faMoon"} className="h-4 w-4" />
    </button>
  );
}
