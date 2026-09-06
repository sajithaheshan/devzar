import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact DevZar",
  description: "Get in touch with the DevZar team — support, partnerships, API submissions and press.",
  path: "/contact",
  keywords: ["contact devzar", "devzar support email"],
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Badge className="mb-3 w-fit">
        <Icon name="faEnvelope" className="h-3 w-3" /> We reply within 48h
      </Badge>
      <h1 className="text-4xl font-black sm:text-5xl">Contact Us</h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        Found a broken API link? Want to submit a new one? Have a partnership idea? Reach out below.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          {[
            { icon: "faEnvelope", label: "Support", value: siteConfig.contact.supportEmail },
            { icon: "faEnvelope", label: "Business", value: siteConfig.contact.businessEmail },
            { icon: "faTriangleExclamation", label: "Report abuse / broken API", value: siteConfig.contact.reportEmail },
          ].map((c) => (
            <div key={c.label} className="brutal-box-sm flex items-center gap-3 bg-[var(--card-bg)] p-4">
              <Icon name={c.icon} className="h-4 w-4 text-[var(--color-pink)]" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{c.label}</p>
                <a href={`mailto:${c.value}`} className="text-sm font-semibold underline">
                  {c.value}
                </a>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
