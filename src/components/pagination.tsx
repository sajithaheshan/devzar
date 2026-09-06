import Link from "next/link";
import { Icon } from "./icon";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`brutal-box-sm flex h-9 w-9 items-center justify-center bg-[var(--card-bg)] ${currentPage === 1 ? "pointer-events-none opacity-40" : "brutal-hover"}`}
      >
        <Icon name="faChevronLeft" className="h-3.5 w-3.5" />
      </Link>

      {pages.map((page, idx) => (
        <span key={page} className="flex items-center gap-2">
          {idx > 0 && pages[idx - 1] !== page - 1 && <span className="text-sm text-[var(--muted)]">…</span>}
          <Link
            href={pageHref(page)}
            className={`brutal-box-sm flex h-9 w-9 items-center justify-center text-sm font-bold ${
              page === currentPage ? "bg-[var(--color-yellow)] text-[var(--color-ink)]" : "bg-[var(--card-bg)] brutal-hover"
            }`}
          >
            {page}
          </Link>
        </span>
      ))}

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`brutal-box-sm flex h-9 w-9 items-center justify-center bg-[var(--card-bg)] ${currentPage === totalPages ? "pointer-events-none opacity-40" : "brutal-hover"}`}
      >
        <Icon name="faChevronRight" className="h-3.5 w-3.5" />
      </Link>
    </nav>
  );
}
