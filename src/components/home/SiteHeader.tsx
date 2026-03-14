import Link from "next/link";
import { BrandLogo } from "@/components/home/BrandLogo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/#about-us", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  ctaHref = "/listings",
  ctaLabel = "Search",
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(255,250,244,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <BrandLogo />

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <nav className="flex flex-wrap items-center gap-5 text-[0.92rem] font-bold text-[#174562] sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[#ef7c11]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={ctaHref}
            className="inline-flex w-full justify-center rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-[0.92rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(176,92,0,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(176,92,0,0.3)] sm:w-auto"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
