import Link from "next/link";
import { Icon } from "./icon";
import type { CategoryDef } from "@/content/categories";

const colorClass: Record<CategoryDef["color"], string> = {
  yellow: "bg-[var(--color-yellow)]",
  green: "bg-[var(--color-green)]",
  pink: "bg-[var(--color-pink)]",
  blue: "bg-[var(--color-blue)] text-white",
  purple: "bg-[var(--color-purple)] text-white",
};

export function CategoryCard({ category, count }: { category: CategoryDef; count: number }) {
  return (
    <Link href={`/categories/${category.slug}`} className="brutal-box brutal-hover flex flex-col gap-4 bg-[var(--card-bg)] p-6">
      <div className={`flex h-14 w-14 items-center justify-center border-[3px] border-[var(--border-color)] ${colorClass[category.color]}`}>
        <Icon name={category.icon} className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-xl font-black">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{category.description}</p>
      </div>
      <p className="mt-auto text-xs font-black uppercase tracking-widest text-[var(--fg)]">{count} real APIs listed →</p>
    </Link>
  );
}
