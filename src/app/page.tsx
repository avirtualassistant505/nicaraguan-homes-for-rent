import type { ReactNode } from "react";
import Image from "next/image";

const navItems = ["Home", "Listings", "About Us", "Contact"];

const featuredRentals = [
  {
    name: "Beachfront Villa",
    image: "/rental-beachfront.svg",
    location: "San Juan del Sur",
    details: "3 beds · Sunset patio · Steps from the shore",
  },
  {
    name: "Colonial House",
    image: "/rental-colonial.svg",
    location: "Granada",
    details: "4 beds · Courtyard pool · Walkable historic core",
  },
  {
    name: "Mountain Retreat",
    image: "/rental-mountain.svg",
    location: "Matagalpa Highlands",
    details: "2 beds · Cool climate · Private volcano views",
  },
];

const reasonsToRent = [
  {
    title: "Coast-to-city variety",
    copy:
      "Choose between laid-back surf towns, colonial neighborhoods, and lakefront escapes without losing access to essentials.",
  },
  {
    title: "Move-in ready stays",
    copy:
      "Furnished homes, verified amenities, and flexible lease options make longer stays feel simple from day one.",
  },
  {
    title: "Local guidance built in",
    copy:
      "Neighborhood insights, WhatsApp-first scheduling, and bilingual support help renters settle in faster.",
  },
];

const testimonials = [
  {
    quote:
      "We found our dream home thanks to the team at Nicaraguan Homes For Rent.",
    author: "Sarah & John",
  },
  {
    quote: "Excellent service and beautiful properties with clear pricing.",
    author: "Carlos M.",
  },
  {
    quote:
      "The search filters actually matched the neighborhoods we wanted to explore.",
    author: "Anabela R.",
  },
];

const quickLinks = ["Home", "Listings", "About Us", "Contact"];

const socialLinks = [
  { label: "Facebook", symbol: "f" },
  { label: "YouTube", symbol: "▶" },
  { label: "X", symbol: "x" },
  { label: "Instagram", symbol: "◎" },
];

function BrandMark() {
  return (
    <div className="relative inline-flex max-w-full flex-col rounded-[2rem] bg-[linear-gradient(180deg,#1468b0_0%,#0d3c69_72%,#08233d_100%)] px-5 pb-5 pt-4 text-white shadow-[0_18px_36px_rgba(5,28,52,0.38)]">
      <div className="absolute -left-2 top-1 h-16 w-12 rounded-[60%_15%_60%_15%] bg-[linear-gradient(180deg,#4cb65f_0%,#2f7d34_100%)] opacity-95 blur-[0.3px]" />
      <div className="absolute left-4 top-2 h-10 w-8 rounded-[50%_10%_55%_10%] bg-[linear-gradient(180deg,#6fd67b_0%,#2f8a38_100%)]" />
      <div className="absolute left-9 top-0 h-12 w-8 rounded-[55%_10%_65%_10%] bg-[linear-gradient(180deg,#7ee08a_0%,#2f8a38_100%)]" />
      <span className="brand-font relative block pr-4 text-[clamp(2.2rem,4vw,4.2rem)] leading-none text-white [text-shadow:0_3px_10px_rgba(0,0,0,0.28)]">
        Nicaraguan
      </span>
      <span className="relative mt-2 inline-flex self-start rounded-[1rem] bg-[linear-gradient(180deg,#ffb73f_0%,#ec7b11_100%)] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.12em] text-[#fff8e3] shadow-[0_8px_18px_rgba(124,66,0,0.3)] sm:text-base">
        Homes For Rent
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(11,74,114,0)_0%,rgba(11,74,114,0.3)_100%)]" />
      <h2 className="display-font text-center text-[1.9rem] leading-none text-[#08385a] sm:text-[2.2rem]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(11,74,114,0.3)_0%,rgba(11,74,114,0)_100%)]" />
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="relative block min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <select
        defaultValue=""
        className="w-full appearance-none rounded-[1.1rem] border border-white/30 bg-[#fff8eb] px-4 py-4 pr-12 text-base font-semibold text-[#123a5b] shadow-[0_10px_20px_rgba(4,25,40,0.18)] outline-none transition focus:border-[#ef8b1f] focus:ring-4 focus:ring-[#ef8b1f]/20"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#123a5b]">
        <ChevronIcon />
      </span>
    </label>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.16l3.71-2.93a.75.75 0 1 1 .92 1.18l-4.17 3.3a.75.75 0 0 1-.92 0l-4.17-3.3a.75.75 0 0 1-.14-1.2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function QuoteBadge() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0c527c] text-lg font-black text-[#fff2db] shadow-[0_8px_16px_rgba(8,56,90,0.18)]">
      “
    </span>
  );
}

export default function Home() {
  return (
    <main className="site-shell min-h-screen px-4 py-5 text-[#123653] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[2.2rem] border border-white/65 bg-[rgba(255,249,239,0.88)] shadow-[0_32px_90px_rgba(4,28,52,0.28)] backdrop-blur-sm">
        <header id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(4,34,57,0.18)_100%)]" />
          <div className="relative border-b border-[#0f4b73]/15 bg-[linear-gradient(180deg,rgba(255,251,243,0.96)_0%,rgba(248,241,228,0.94)_100%)] px-4 py-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <BrandMark />
              <div className="flex flex-col gap-4 lg:items-end">
                <nav aria-label="Primary navigation">
                  <ul className="flex flex-wrap items-center justify-start gap-3 text-sm font-bold text-[#0e3857] md:gap-5 md:text-base">
                    {navItems.map((item) => (
                      <li key={item}>
                        <a
                          className="rounded-full px-4 py-2 transition hover:bg-white/70 hover:text-[#ef8b1f]"
                          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a
                  className="inline-flex items-center justify-center rounded-[1rem] bg-[linear-gradient(180deg,#ff9a28_0%,#e36f08_100%)] px-6 py-3 text-base font-extrabold text-white shadow-[0_14px_28px_rgba(175,88,0,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(175,88,0,0.32)]"
                  href="#search"
                >
                  Search
                </a>
              </div>
            </div>
          </div>

          <section
            aria-labelledby="hero-heading"
            className="relative border-t border-[#4fa2d6]/30 bg-[#0b4e79] px-4 py-5 sm:px-6 lg:px-10 lg:py-8"
          >
            <div className="relative h-[620px] overflow-hidden rounded-[2rem] border border-white/30 shadow-[0_24px_48px_rgba(4,31,54,0.28)] sm:h-[620px] lg:h-[720px]">
              <Image
                src="/hero-scene.svg"
                alt="Illustrated Nicaraguan coast with a volcano, tropical trees, and rental homes."
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,52,84,0.25)_0%,rgba(7,52,84,0.08)_26%,rgba(7,52,84,0.3)_100%)]" />
              <div className="absolute inset-x-0 top-[8%] px-4 text-center sm:top-[11%] sm:px-8">
                <p className="mx-auto inline-flex rounded-full border border-white/35 bg-[rgba(12,69,102,0.34)] px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[#fff4df] shadow-[0_8px_18px_rgba(0,0,0,0.15)]">
                  Vercel-ready rental showcase
                </p>
                <h1
                  id="hero-heading"
                  className="brand-font mx-auto mt-5 max-w-[15rem] text-[1.95rem] leading-[0.9] text-white [text-shadow:0_4px_18px_rgba(4,28,52,0.45)] sm:max-w-none sm:text-[3.55rem] lg:text-[5.1rem]"
                >
                  <span className="block">Find Your Dream</span>
                  <span className="block">Rental Home</span>
                  <span className="block">in Nicaragua</span>
                </h1>
                <p className="mx-auto mt-4 hidden max-w-3xl px-5 text-sm leading-relaxed text-[#eef8ff] sm:block sm:px-0 sm:text-base md:text-lg">
                  A tropical first impression for long-stay renters, relocation
                  clients, and vacation seekers who want beach, volcano, and
                  city options in one polished search experience.
                </p>
              </div>

              <div
                id="search"
                className="absolute inset-x-4 bottom-4 rounded-[1.6rem] border border-white/20 bg-[linear-gradient(180deg,rgba(7,58,90,0.78)_0%,rgba(7,41,67,0.9)_100%)] p-4 shadow-[0_18px_36px_rgba(4,28,52,0.34)] backdrop-blur-[6px] sm:inset-x-8 sm:bottom-6 sm:p-5 lg:inset-x-14 lg:bottom-8 lg:p-6"
              >
                <form className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
                  <SelectField
                    label="Location"
                    options={[
                      "San Juan del Sur",
                      "Granada",
                      "Managua",
                      "Leon",
                    ]}
                  />
                  <SelectField
                    label="Property Type"
                    options={[
                      "Beachfront Villa",
                      "Colonial House",
                      "Mountain Retreat",
                      "Family Compound",
                    ]}
                  />
                  <SelectField
                    label="Price Range"
                    options={[
                      "$900 - $1,500 / month",
                      "$1,500 - $2,500 / month",
                      "$2,500+ / month",
                    ]}
                  />
                  <button
                    type="button"
                    className="rounded-[1.1rem] bg-[linear-gradient(180deg,#ff9f2c_0%,#eb730b_100%)] px-6 py-4 text-lg font-extrabold text-white shadow-[0_12px_24px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(176,92,0,0.34)]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </section>
        </header>

        <div className="paper-surface px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-12">
          <section
            id="listings"
            className="grid gap-10 lg:grid-cols-[1.5fr_0.95fr]"
          >
            <div className="space-y-10">
              <div className="space-y-5">
                <SectionTitle>Featured Rentals</SectionTitle>
                <div className="grid gap-5 md:grid-cols-3">
                  {featuredRentals.map((rental, index) => (
                    <article
                      key={rental.name}
                      className={`weathered-card overflow-hidden rounded-[1.5rem] border border-[#7ab6d7]/25 bg-white shadow-[0_18px_38px_rgba(8,56,90,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(8,56,90,0.18)] ${
                        index === 1 ? "md:-mt-3" : ""
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={rental.image}
                          alt={rental.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="bg-[linear-gradient(180deg,#145779_0%,#0a2f4d_100%)] px-4 pb-5 pt-4 text-white">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="display-font text-[1.6rem] leading-none">
                              {rental.name}
                            </h3>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8dbff]">
                              {rental.location}
                            </p>
                          </div>
                          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#fff3dd]">
                            View
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-[#e4f4ff]">
                          {rental.details}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div id="about-us" className="space-y-5">
                <SectionTitle>Why Rent in Nicaragua?</SectionTitle>
                <div className="grid gap-4 md:grid-cols-3">
                  {reasonsToRent.map((reason) => (
                    <article
                      key={reason.title}
                      className="weathered-card rounded-[1.5rem] border border-[#7ab6d7]/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(246,237,220,0.96)_100%)] p-5 shadow-[0_18px_36px_rgba(8,56,90,0.1)]"
                    >
                      <div className="inline-flex rounded-full bg-[#0c527c] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#fff3dd]">
                        Why it works
                      </div>
                      <h3 className="display-font mt-4 text-[1.5rem] leading-none text-[#0a3a5b]">
                        {reason.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#30506b]">
                        {reason.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside id="contact" className="space-y-6">
              <SectionTitle>Client Testimonials</SectionTitle>
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.author}
                    className="weathered-card rounded-[1.5rem] border border-[#f2d8a7] bg-[linear-gradient(180deg,rgba(255,248,231,0.96)_0%,rgba(250,239,214,0.94)_100%)] p-5 shadow-[0_18px_36px_rgba(111,76,23,0.12)]"
                  >
                    <div className="flex items-start gap-4">
                      <QuoteBadge />
                      <div>
                        <p className="text-base leading-7 text-[#3f3b35]">
                          {testimonial.quote}
                        </p>
                        <p className="mt-4 text-right text-sm font-bold text-[#7b5a1f]">
                          {testimonial.author}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="overflow-hidden rounded-[1.7rem] border border-white/30 bg-[linear-gradient(180deg,#0f5d8d_0%,#0a3454_100%)] text-white shadow-[0_20px_40px_rgba(4,28,52,0.2)]">
                <div className="relative aspect-[5/3]">
                  <Image
                    src="/hero-scene.svg"
                    alt="Coastal rental scene"
                    fill
                    sizes="(max-width: 1024px) 100vw, 28vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,28,52,0.08)_0%,rgba(4,28,52,0.5)_100%)]" />
                </div>
                <div className="space-y-3 px-5 py-6">
                  <div className="inline-flex rounded-full bg-white/14 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#ffe7b4]">
                    Concierge-ready
                  </div>
                  <h3 className="display-font text-[1.8rem] leading-none">
                    Launch this as a Vercel landing page
                  </h3>
                  <p className="text-sm leading-7 text-[#dbefff]">
                    Fast App Router build, local SVG art assets, responsive
                    sections, and a polished above-the-fold search experience.
                  </p>
                  <a
                    className="inline-flex rounded-[1rem] bg-[linear-gradient(180deg,#ffb03a_0%,#ef7a11_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(175,88,0,0.28)] transition hover:-translate-y-0.5"
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Deploy with Vercel
                  </a>
                </div>
              </div>
            </aside>
          </section>
        </div>

        <footer className="overflow-hidden">
          <div className="wood-strip grid gap-6 px-5 py-5 text-white sm:grid-cols-3 sm:px-8 lg:px-10">
            <div>
              <h2 className="display-font text-[2rem] leading-none text-[#fff1d2]">
                Quick Links
              </h2>
            </div>
            <div>
              <h2 className="display-font text-[2rem] leading-none text-[#fff1d2]">
                Contact Info
              </h2>
            </div>
            <div>
              <h2 className="display-font text-[2rem] leading-none text-[#fff1d2]">
                Follow Us
              </h2>
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,#0b507a_0%,#07263f_100%)] px-5 py-8 text-[#e0f3ff] sm:px-8 lg:px-10">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="space-y-4 text-base">
                {quickLinks.map((link) => (
                  <a
                    key={link}
                    className="block font-semibold transition hover:text-[#ffd27a]"
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link}
                  </a>
                ))}
              </div>

              <div className="space-y-3 text-base leading-7">
                <p className="font-bold text-white">Email</p>
                <p>info@nicaraguanhomesforrent.com</p>
                <p className="font-bold text-white">Phone</p>
                <p>+505 1234 5678</p>
                <p className="font-bold text-white">WhatsApp</p>
                <p>Fast response for walkthrough scheduling and inquiries.</p>
              </div>

              <div className="space-y-4">
                <p className="text-lg font-bold text-white">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 font-semibold transition hover:border-[#ffd27a] hover:text-[#ffd27a]"
                      href="#contact"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffb03a_0%,#ef7a11_100%)] text-sm font-black text-white">
                        {link.symbol}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
