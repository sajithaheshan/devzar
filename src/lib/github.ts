/**
 * Real-time GitHub data layer.
 *
 * We never store fake followers/stars/repo counts. Instead we call the
 * real, public GitHub REST API on every request (with Next.js fetch
 * caching + revalidation) so numbers shown on the site are always live
 * and truthful. If a `GITHUB_TOKEN` env var is present we use it to raise
 * the rate limit from 60/hr to 5,000/hr — otherwise we fall back to
 * anonymous requests automatically.
 */

const GITHUB_API = "https://api.github.com";

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "devzar.netlify.app",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  type: string;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
}

async function githubFetch<T>(path: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: githubHeaders(),
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubUser(login: string): Promise<GithubUser | null> {
  return githubFetch<GithubUser>(`/users/${encodeURIComponent(login)}`);
}

export async function getGithubTopRepos(login: string, limit = 6): Promise<GithubRepo[]> {
  const repos = await githubFetch<GithubRepo[]>(
    `/users/${encodeURIComponent(login)}/repos?per_page=100&sort=updated`,
  );
  if (!repos) return [];
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

export async function getGithubUsersBulk(logins: string[]): Promise<Map<string, GithubUser>> {
  const map = new Map<string, GithubUser>();
  const results = await Promise.all(logins.map((login) => getGithubUser(login)));
  results.forEach((user, i) => {
    if (user) map.set(logins[i], user);
  });
  return map;
}
