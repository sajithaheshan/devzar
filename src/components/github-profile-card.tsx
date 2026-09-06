import Link from "next/link";
import type { GithubUser } from "@/lib/github";
import { Icon } from "./icon";

export function GithubProfileCard({
  login,
  tags,
  note,
  profile,
}: {
  login: string;
  tags: string[];
  note: string;
  profile: GithubUser | null;
}) {
  return (
    <a
      href={profile?.html_url ?? `https://github.com/${login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="brutal-box brutal-hover flex flex-col gap-3 bg-[var(--card-bg)] p-5"
    >
      <div className="flex items-center gap-3">
        {profile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar_url} alt={login} className="h-14 w-14 shrink-0 border-2 border-[var(--border-color)] object-cover" />
        ) : (
          <div className="h-14 w-14 shrink-0 animate-pulse border-2 border-[var(--border-color)] bg-[var(--bg)]" />
        )}
        <div className="min-w-0">
          <p className="truncate font-black">{profile?.name ?? login}</p>
          <p className="truncate text-xs text-[var(--muted)]">@{login}</p>
        </div>
      </div>
      {profile?.bio && <p className="line-clamp-2 text-sm text-[var(--fg)]">{profile.bio}</p>}
      <p className="line-clamp-2 text-xs text-[var(--muted)]">{note}</p>
      {profile && (
        <div className="mt-auto flex flex-wrap gap-3 text-xs font-bold text-[var(--fg)]">
          <span className="flex items-center gap-1">
            <Icon name="faUsers" className="h-3 w-3" /> {profile.followers.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="faCodeBranch" className="h-3 w-3" /> {profile.public_repos.toLocaleString()} repos
          </span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((t) => (
          <span key={t} className="border-2 border-[var(--border-color)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--muted)]">
            #{t}
          </span>
        ))}
      </div>
    </a>
  );
}

export function GithubCardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="underline">
      {children}
    </Link>
  );
}
