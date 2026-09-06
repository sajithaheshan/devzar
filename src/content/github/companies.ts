export interface GithubCompanyRef {
  login: string;
  tags: string[];
  note: string;
}

/**
 * Curated list of real GitHub organization logins for major companies and
 * open-source foundations. Stats are fetched live from the GitHub API.
 */
export const githubCompanies: GithubCompanyRef[] = [
  { login: "google", tags: ["big-tech"], note: "Google's open-source organization account." },
  { login: "microsoft", tags: ["big-tech"], note: "Microsoft's primary open-source org (VS Code, TypeScript)." },
  { login: "facebook", tags: ["big-tech"], note: "Meta's open-source org (React, PyTorch origins)." },
  { login: "vercel", tags: ["hosting", "framework"], note: "Creators of Next.js and the Vercel platform." },
  { login: "netlify", tags: ["hosting", "jamstack"], note: "JAMstack hosting & deployment platform." },
  { login: "vuejs", tags: ["framework"], note: "Official Vue.js organization." },
  { login: "angular", tags: ["framework"], note: "Official Angular framework organization." },
  { login: "sveltejs", tags: ["framework"], note: "Official Svelte/SvelteKit organization." },
  { login: "tailwindlabs", tags: ["css", "framework"], note: "Makers of Tailwind CSS." },
  { login: "nodejs", tags: ["runtime"], note: "Official Node.js runtime organization." },
  { login: "denoland", tags: ["runtime"], note: "Creators of the Deno JavaScript/TypeScript runtime." },
  { login: "rust-lang", tags: ["language"], note: "Official Rust programming language organization." },
  { login: "golang", tags: ["language"], note: "Official Go programming language organization." },
  { login: "python", tags: ["language"], note: "Official Python Software Foundation organization." },
  { login: "docker", tags: ["devops", "containers"], note: "Creators of Docker container tooling." },
  { login: "kubernetes", tags: ["devops", "orchestration"], note: "Cloud-native container orchestration project." },
  { login: "apache", tags: ["foundation"], note: "The Apache Software Foundation." },
  { login: "tensorflow", tags: ["ai", "ml"], note: "Google's open-source machine-learning framework." },
  { login: "pytorch", tags: ["ai", "ml"], note: "Meta's open-source deep-learning framework." },
  { login: "huggingface", tags: ["ai", "ml"], note: "Leading open-source AI/ML model hub." },
  { login: "openai", tags: ["ai"], note: "AI research lab behind GPT and Whisper." },
  { login: "supabase", tags: ["backend", "database"], note: "Open-source Firebase alternative." },
  { login: "prisma", tags: ["database", "orm"], note: "Popular open-source TypeScript ORM." },
  { login: "mozilla", tags: ["browser", "foundation"], note: "Maker of Firefox and open web standards." },
  { login: "netflix", tags: ["streaming", "big-tech"], note: "Netflix open-source engineering organization." },
  { login: "airbnb", tags: ["big-tech"], note: "Airbnb's open-source engineering organization." },
  { login: "uber", tags: ["big-tech"], note: "Uber's open-source engineering organization." },
  { login: "spotify", tags: ["music", "big-tech"], note: "Spotify's open-source engineering organization." },
  { login: "shopify", tags: ["ecommerce"], note: "Shopify's open-source engineering organization." },
  { login: "stripe", tags: ["fintech"], note: "Stripe's open-source payments engineering organization." },
  { login: "elastic", tags: ["search", "database"], note: "Creators of Elasticsearch and the Elastic Stack." },
  { login: "hashicorp", tags: ["devops", "infrastructure"], note: "Creators of Terraform, Vault and Consul." },
  { login: "redis", tags: ["database"], note: "Official Redis in-memory database organization." },
  { login: "mongodb", tags: ["database"], note: "Official MongoDB database organization." },
  { login: "cloudflare", tags: ["cdn", "security"], note: "Global CDN, DNS and security platform." },
  { login: "jetbrains", tags: ["dev-tools"], note: "Makers of IntelliJ IDEA, Kotlin and PyCharm." },
  { login: "canonical", tags: ["linux"], note: "Publisher of Ubuntu Linux." },
  { login: "ethereum", tags: ["blockchain"], note: "Official Ethereum Foundation organization." },
  { login: "bitcoin", tags: ["blockchain"], note: "Official Bitcoin Core organization." },
  { login: "discord", tags: ["communication"], note: "Discord's open-source engineering organization." },
  { login: "ibm", tags: ["big-tech", "enterprise"], note: "IBM's open-source engineering organization." },
  { login: "adobe", tags: ["creative-tools"], note: "Adobe's open-source engineering organization." },
  { login: "salesforce", tags: ["enterprise", "crm"], note: "Salesforce's open-source engineering organization." },
  { login: "twitter", tags: ["social"], note: "X/Twitter's open-source engineering organization." },
  { login: "digitalocean", tags: ["cloud", "hosting"], note: "Cloud infrastructure and hosting provider." },
];
