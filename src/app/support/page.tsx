import Link from "next/link";
import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { AdButton } from "@/components/ad-button";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support DevZar",
  description: "Ways to support the DevZar API directory and get help — sponsor links, GitHub, and support email.",
  path: "/support",
  keywords: ["support devzar", "sponsor devzar"],
});

const options = [
  { icon: "faHeadset", title: "Get Help", body: "Have an issue with a listing or the site itself?", href: "/contact", cta: "Contact support" },
  { icon: "faCircleQuestion", title: "Read the FAQ", body: "Most questions are already answered here.", href: "/faq", cta: "View FAQ" },
  { icon: "faGithub", title: "Star us on GitHub", body: "Follow along with the project's open-source development.", href: siteConfig.social.github, cta: "Open GitHub" },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faHeadset" className="h-3 w-3" /> We're here to help
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">Support Center</h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        Whether you need help, want to report a broken API, or want to keep this directory free forever — start here.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {options.map((o) => (
          <Link key={o.title} href={o.href} className="brutal-box brutal-hover flex flex-col gap-3 bg-[var(--card-bg)] p-5">
            <Icon name={o.icon} className="h-6 w-6 text-[var(--color-pink)]" />
            <h2 className="text-lg font-black">{o.title}</h2>
            <p className="text-sm text-[var(--muted)]">{o.body}</p>
            <span className="mt-auto text-xs font-black uppercase tracking-widest">{o.cta} →</span>
          </Link>
        ))}
      </div>

      <div className="brutal-box mt-14 flex flex-col items-start gap-4 bg-[var(--color-pink)] p-8 text-white">
        <h2 className="text-2xl font-black">Keep DevZar free & ad-light</h2>
        <p className="max-w-xl">Every visit through our sponsor links helps cover hosting and data-verification costs.</p>
        <AdButton seed="support-page" label="Support via sponsor link" />
      </div>
    </div>
  );
}
