import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "./icon";
import { categories } from "@/content/categories";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/sitemap-page", label: "Sitemap" },
];

const contentLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  { href: siteConfig.social.github, icon: "faGithub", label: "GitHub" },
  { href: siteConfig.social.twitter, icon: "faTwitter", label: "Twitter" },
  { href: siteConfig.social.discord, icon: "faDiscord", label: "Discord" },
  { href: siteConfig.social.telegram, icon: "faTelegram", label: "Telegram" },
  { href: siteConfig.social.facebook, icon: "faFacebook", label: "Facebook" },
  { href: siteConfig.social.instagram, icon: "faInstagram", label: "Instagram" },
  { href: siteConfig.social.youtube, icon: "faYoutube", label: "YouTube" },
  { href: siteConfig.social.linkedin, icon: "faLinkedin", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-[3px] border-[var(--border-color)] bg-[var(--card-bg)] pb-28 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tight">
              Dev<span className="text-[var(--color-pink)]">Zar</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-[var(--muted)]">{siteConfig.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="brutal-box-sm brutal-hover flex h-9 w-9 items-center justify-center bg-[var(--bg)]"
                >
                  <Icon name={s.icon} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Categories</p>
            <ul className="flex flex-col gap-2">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="text-sm hover:text-[var(--color-pink)]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Company</p>
            <ul className="flex flex-col gap-2">
              {contentLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-[var(--color-pink)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Legal</p>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-[var(--color-pink)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t-2 border-[var(--border-color)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All real data, zero fake stats.
          </p>
          <p>
            Built with {siteConfig.poweredBy.slice(0, 5).join(" · ")} and more.
          </p>
        </div>
      </div>
    </footer>
  );
}
