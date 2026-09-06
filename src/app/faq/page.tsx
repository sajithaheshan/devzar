import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about DevZar's API directory, data sourcing, GitHub stats and pricing.",
  path: "/faq",
  keywords: ["devzar faq", "api directory questions"],
});

const faqs = [
  {
    q: "Is DevZar free to use?",
    a: "Yes. Browsing every API listing, category page and GitHub profile on DevZar is 100% free, forever. Some individual third-party APIs listed may require their own free or paid API key — that's set by the API provider, not DevZar.",
  },
  {
    q: "Where does the API data come from?",
    a: "Every entry is manually curated from real, publicly documented APIs and open-source community lists such as public-apis/public-apis on GitHub. We verify the base URL, docs link, authentication type and CORS support for each listing.",
  },
  {
    q: "Do you fabricate ratings, reviews or usage stats?",
    a: "Never. We do not display invented star ratings, fake 'active user' counts or made-up uptime percentages anywhere on the site. The only live numbers you'll see are real GitHub stats fetched directly from api.github.com.",
  },
  {
    q: "How often is the directory updated?",
    a: "New APIs, GitHub profiles and articles are added on a rolling basis as our content pipeline verifies them. The sitemap regenerates automatically whenever new content is added — no manual step required.",
  },
  {
    q: "Can I submit an API to be listed?",
    a: "Yes — use the Contact page and include the API name, base URL and documentation link. We manually verify every submission before publishing.",
  },
  {
    q: "How does the 'Live API Tester' work?",
    a: "For APIs flagged as testable (no-auth, CORS-friendly, safe to call), DevZar makes a real server-side request to the live endpoint and shows you the exact JSON response — no mock data.",
  },
  {
    q: "How do GitHub Creators/Companies stats stay accurate?",
    a: "Every profile card calls the public GitHub REST API at request time with hourly cache revalidation, so numbers are always close to real-time.",
  },
  {
    q: "How do I contact support?",
    a: `Email us any time at ${siteConfig.contact.supportEmail} or use the contact form — we usually reply within 48 hours.`,
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faCircleQuestion" className="h-3 w-3" /> {faqs.length} answers
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">Frequently Asked Questions</h1>

      <div className="mt-10 flex flex-col gap-4">
        {faqs.map((f) => (
          <details key={f.q} className="brutal-box-sm group bg-[var(--card-bg)] p-4 open:pb-5">
            <summary className="cursor-pointer list-none text-sm font-black">
              {f.q}
            </summary>
            <p className="mt-3 text-sm text-[var(--muted)]">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
