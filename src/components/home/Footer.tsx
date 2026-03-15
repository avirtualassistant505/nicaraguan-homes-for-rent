import Link from "next/link";
import { SITE_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const businessLinks = [
  { href: "/creator-tools", label: "Creator Tools" },
  { href: "/contact", label: "Property Inquiries" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="mt-20 overflow-hidden rounded-t-[2rem] bg-[linear-gradient(180deg,#0d5b89_0%,#082f4f_100%)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <p className="display-font text-[1.8rem] leading-none text-[#fff3d7]">
            {SITE_NAME}
          </p>
          <p className="max-w-sm text-[0.98rem] leading-7 text-[#ccecff]">{SITE_TAGLINE}</p>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-white/16"
          >
            Email Us
          </a>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Explore
          </h3>
          <div className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[0.98rem] text-[#e6f6ff] transition hover:text-[#ffd37f]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Business Use
          </h3>
          <div className="mt-5 space-y-3 text-[0.98rem] text-[#e6f6ff]">
            {businessLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block transition hover:text-[#ffd37f]"
              >
                {link.label}
              </Link>
            ))}
            <p>Authorized administrators manage listings, media, and connected publishing workflows behind the scenes.</p>
          </div>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Legal
          </h3>
          <div className="mt-5 space-y-3 text-[0.98rem] text-[#e6f6ff]">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block transition hover:text-[#ffd37f]"
              >
                {link.label}
              </Link>
            ))}
            <a href={`mailto:${SITE_EMAIL}`} className="block transition hover:text-[#ffd37f]">
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-[#ccecff] lg:px-8">
        {SITE_NAME} (c) 2026. Curated rental listings across Nicaragua.
      </div>
    </footer>
  );
}
