export interface BlogPostDef {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  coverEmoji: string;
  tags: string[];
  seoKeywords: string[];
  publishedAt: string; // ISO date
}

export const blogPosts: BlogPostDef[] = [
  {
    slug: "unstoppable-technologies-you-never-heard-of",
    title: "7 Unstoppable Technologies Quietly Running the Internet",
    excerpt:
      "From BitTorrent's distributed swarms to eBPF running code inside the Linux kernel — these real, open technologies power the modern web while staying almost invisible.",
    coverEmoji: "🛰️",
    tags: ["technology", "open-source", "secrets"],
    seoKeywords: ["unstoppable technology", "hidden internet technology", "open source infrastructure", "devzar"],
    publishedAt: "2024-11-02T00:00:00.000Z",
    content: `
Most developers use the surface layer of the internet every day — REST APIs, browsers, npm packages — without realizing the deeper, almost "unstoppable" technologies quietly holding everything together. Here are seven real, open, and battle-tested systems worth knowing.

## 1. BitTorrent & the DHT
BitTorrent doesn't need central servers because it runs on a **Distributed Hash Table (DHT)** — every participating node stores a slice of the swarm's routing table. Even if every tracker on Earth disappeared, an active swarm using DHT + PEX (peer exchange) keeps functioning. This same DHT concept underpins IPFS today.

## 2. eBPF — Programs Inside the Linux Kernel
eBPF (extended Berkeley Packet Filter) lets you safely run sandboxed programs inside the Linux kernel without changing kernel source or loading modules. Companies like Cloudflare, Netflix and Meta use it for firewalls, observability and load balancing at a scale traditional tools can't touch.

## 3. IPFS — Content-Addressed Storage
InterPlanetary File System addresses data by **content hash**, not location. That means a file is the same file no matter which node serves it — enabling permanent, censorship-resistant publishing.

## 4. WebAssembly (Wasm)
Wasm is a binary instruction format that runs at near-native speed inside any browser, sandboxed and secure by default — a genuine "write once, run securely everywhere" technology now expanding into serverless edge compute.

## 5. The Tor Onion Routing Network
Tor wraps traffic in multiple encrypted layers relayed across volunteer-run nodes worldwide, so no single relay knows both the origin and destination. It's fully open-source and has resisted large-scale shutdown attempts for two decades.

## 6. CRDTs — Conflict-Free Replicated Data Types
CRDTs let multiple users edit the same data offline and merge changes automatically without conflicts — the secret behind real-time collaborative apps like Figma-style multiplayer editing.

## 7. RSS/Atom Feeds
Written off as "dead" for a decade, the open RSS/Atom protocol quietly still powers podcasts, newsletter pipelines and content syndication for millions of sites — no platform can kill an open standard nobody controls.

DevZar catalogs real, working APIs across dozens of niches precisely because we believe **open, permissionless technology is what makes the internet unstoppable.**
    `.trim(),
  },
  {
    slug: "how-public-apis-are-built-and-maintained",
    title: "How the World's Biggest Public API Lists Are Actually Maintained",
    excerpt:
      "A behind-the-scenes look at how open-source communities like public-apis/public-apis curate, verify and keep thousands of free APIs alive.",
    coverEmoji: "🧭",
    tags: ["apis", "open-source"],
    seoKeywords: ["public apis", "api directory", "open source api list", "devzar"],
    publishedAt: "2024-11-10T00:00:00.000Z",
    content: `
Ever wonder how directories like the famous \`public-apis/public-apis\` GitHub repository (100k+ stars) stay accurate with thousands of listed endpoints?

## Community pull requests
Anyone can submit a PR adding a new API. Maintainers run automated GitHub Actions that lint the markdown table format, check for duplicate entries, and validate that HTTPS/CORS metadata fields exist.

## Automated uptime checks
Several forks run scheduled crawlers that periodically request each documented base URL and flag endpoints returning persistent 4xx/5xx errors so the community can prune or fix them.

## Category taxonomy
APIs are tagged into stable categories (Anime, Games & Comics, Weather, Finance, Machine Learning...) which is exactly the taxonomy DevZar mirrors and expands for its own directory — grouping by real developer intent instead of marketing buzzwords.

## Why this matters for DevZar
Our own content pipeline is intentionally structured the same way: every API entry stores its real base URL, docs link, authentication type and CORS support, sourced from open community lists — never fabricated review scores or usage numbers.
    `.trim(),
  },
  {
    slug: "github-api-realtime-data-guide",
    title: "Building Real-Time GitHub Profile Cards Without Faking a Single Number",
    excerpt:
      "How DevZar's GitHub Creators & Companies tabs fetch live follower counts, star totals and repo data straight from api.github.com.",
    coverEmoji: "🐙",
    tags: ["github", "api", "real-time-data"],
    seoKeywords: ["github api", "github rest api", "real time github stats", "devzar github"],
    publishedAt: "2024-11-18T00:00:00.000Z",
    content: `
A lot of "top developer" leaderboard sites quietly hardcode follower counts that go stale within days. DevZar takes a different approach.

## Live fetch, not a snapshot
Every profile card on our GitHub Creators and GitHub Companies tabs calls \`https://api.github.com/users/{login}\` at request time, using Next.js's fetch cache with a **1-hour revalidation window**. That means numbers you see are never more than an hour old.

## Respecting rate limits
Unauthenticated requests to the GitHub REST API are limited to 60 requests/hour per IP. We paginate our directory (12–16 profiles per page) and cache aggressively so a normal visitor never trips a rate limit. If you self-host DevZar, dropping a \`GITHUB_TOKEN\` into your environment raises that ceiling to 5,000 requests/hour automatically.

## No fake ratings, ever
You will not find invented "trust scores" or "popularity ratings" anywhere on this site. If a number is displayed, it came directly from a live API response.
    `.trim(),
  },
  {
    slug: "neubrutalism-design-explained",
    title: "Why We Designed DevZar With Thick Borders Instead Of Soft Shadows",
    excerpt:
      "A quick look at neubrutalist web design — bold borders, hard shadows and loud colors — and why it reads as more 'human' than typical AI-generated UI.",
    coverEmoji: "🎨",
    tags: ["design", "ui"],
    seoKeywords: ["neubrutalism", "web design", "ui design trend", "devzar design"],
    publishedAt: "2024-12-01T00:00:00.000Z",
    content: `
If you've noticed DevZar doesn't look like a typical soft, rounded, gradient-heavy SaaS landing page — that's intentional.

## Hard shadows, not blur
Instead of a blurred \`box-shadow\`, we offset a solid black shadow a few pixels behind every card. It reads as tactile, almost like a printed sticker, rather than a hazy digital glow.

## Thick strokes over subtle borders
A 2–3px solid black border does more to define a shape than any drop shadow ever could. Combined with saturated yellow, green and pink fills, the interface feels closer to print/poster design than to generic dashboard templates.

## Dark mode gets its own rules
Neubrutalism's hard black shadows don't work on a black background, so our dark theme swaps to soft neon blue → purple glows instead — keeping the "premium developer tool" feeling that programmers gravitate toward at night.
    `.trim(),
  },
  {
    slug: "webassembly-wasm-explained",
    title: "WebAssembly in Plain English: The Sandboxed Runtime Eating the Web",
    excerpt:
      "What Wasm actually is, why every major browser shipped it, and where it's headed next — plugins, edge functions and beyond.",
    coverEmoji: "⚙️",
    tags: ["technology", "webassembly"],
    seoKeywords: ["webassembly", "wasm explained", "browser runtime", "devzar tech"],
    publishedAt: "2024-12-10T00:00:00.000Z",
    content: `
WebAssembly (Wasm) is a low-level, binary instruction format designed as a portable compilation target for languages like C, C++, Rust and Go.

## Why it exists
JavaScript is fast, but interpreted languages hit a ceiling for CPU-heavy work like video editing, physics simulation or codecs. Wasm compiles to near-native speed and runs inside the exact same sandbox as JavaScript — no plugins, no native installs.

## Real production usage
Figma's canvas engine, AutoCAD's web version, and Photoshop's browser build all run C++ codebases compiled to Wasm. Cloudflare Workers and Fastly Compute both use Wasm as an alternative, faster cold-start runtime to containers.

## What's next
The WASI (WebAssembly System Interface) standard is extending Wasm outside the browser entirely — letting the same sandboxed binary run on servers, IoT devices and edge networks with a shared, secure interface.
    `.trim(),
  },
  {
    slug: "building-an-api-directory-that-doesnt-lie",
    title: "Building an API Directory That Doesn't Lie To You",
    excerpt:
      "Why DevZar refuses to fabricate ratings, view counts or fake user numbers — and what we show instead.",
    coverEmoji: "🧱",
    tags: ["devzar", "transparency"],
    seoKeywords: ["honest api directory", "no fake ratings", "transparent developer tools", "devzar"],
    publishedAt: "2024-12-20T00:00:00.000Z",
    content: `
Most "API marketplace" sites pad their listings with invented five-star ratings and inflated "10k+ users" badges to look more trustworthy. We think that's backwards.

## What you'll never see on DevZar
- Fake star ratings with no real review source
- Made-up "monthly active users" counts
- Invented uptime percentages we can't verify

## What you WILL see
- The real base URL and official documentation link for every API
- Verified authentication type (No key / API key / OAuth), HTTPS support and CORS status
- A direct link back to the open-source list the entry was sourced from
- For GitHub profiles: live, real-time stats pulled straight from api.github.com

Trust is earned by being verifiable, not by looking polished. That's the whole design philosophy behind DevZar's data layer.
    `.trim(),
  },
];
