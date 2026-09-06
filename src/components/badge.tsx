import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "badge-gradient inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--fg)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
