import Image from "next/image";
import { BrandLogo } from "@/components/home/BrandLogo";
import { FeatureCard } from "@/components/home/FeatureCard";
import { Footer } from "@/components/home/Footer";
import { ListingCard } from "@/components/home/ListingCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SectionHeading } from "@/components/home/SectionHeading";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";

const navItems = ["Home", "Listings", "About Us", "Contact"];

const featuredRentals = [
  {
    title: "Beachfront Villa",
    image: "/rental-beachfront.svg",
    location: "San Juan del Sur",
    label: "Beachfront",
    price: "From $1,200/mo",
    details:
      "Ocean views, breezy terraces, and easy access to surf, dining, and walkable beach living.",
  },
  {
    title: "Colonial House",
    image: "/rental-colonial.svg",
    location: "Granada",
    label: "Historic Charm",
    price: "From $1,450/mo",
    details:
      "Courtyard living with warm architecture, furnished interiors, and a central location near cafes and plazas.",
  },
  {
    title: "Mountain Retreat",
    image: "/rental-mountain.svg",
    location: "Matagalpa Highlands",
    label: "Cool Climate",
    price: "From $980/mo",
    details:
      "Quiet, scenic stays surrounded by greenery, fresh air, and dramatic volcano and mountain views.",
  },
];

const reasons = [
  {
    icon: "sun" as const,
    title: "Affordable Living",
    description:
      "Stretch your budget further with long-term rentals that still feel polished, furnished, and well-located.",
  },
  {
    icon: "water" as const,
    title: "Beach & Lake Access",
    description:
      "Live near surf towns, lakeside escapes, and coastal communities without losing comfort or convenience.",
  },
  {
    icon: "mountain" as const,
    title: "Volcano & Mountain Views",
    description:
      "Nicaragua offers unforgettable landscapes that turn everyday living into something memorable.",
  },
  {
    icon: "community" as const,
    title: "Friendly Communities",
    description:
      "From expat pockets to family-focused neighborhoods, there are welcoming options for every lifestyle.",
  },
  {
    icon: "weather" as const,
    title: "Warm Climate",
    description:
      "Expect year-round sunshine, tropical breezes, and outdoor-friendly living across most major regions.",
  },
  {
    icon: "remote" as const,
    title: "Great for Remote Work",
    description:
      "Furnished homes, flexible leases, and lifestyle-driven locations make it easier to settle in and stay longer.",
  },
];

const locations = [
  {
    name: "San Juan del Sur",
    subtitle: "Surf, sunsets, and walkable beach living",
    image: "/rental-beachfront.svg",
  },
  {
    name: "Granada",
    subtitle: "Colonial charm with vibrant city energy",
    image: "/rental-colonial.svg",
  },
  {
    name: "Managua",
    subtitle: "Convenience, business hubs, and city rentals",
    image: "/hero-scene.svg",
  },
  {
    name: "Ometepe",
    subtitle: "Lakefront calm and volcanic scenery",
    image: "/rental-mountain.svg",
  },
];

const lifestyles = [
  "Beachfront",
  "City Living",
  "Mountain Escape",
  "Lakefront",
  "Retirement",
];

const testimonials = [
  {
    name: "Sarah & John",
    title: "Relocating from Canada",
    quote:
      "We found our dream rental in just days. The process felt simple, transparent, and far more curated than typical property sites.",
  },
  {
    name: "Carlos M.",
    title: "Long-stay renter",
    quote:
      "The listings were beautiful, the neighborhoods made sense for our lifestyle, and the support felt personal from the start.",
  },
  {
    name: "Alina R.",
    title: "Remote worker",
    quote:
      "I wanted somewhere tropical but practical. This made it easy to compare coastal homes, city rentals, and quieter retreats.",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(255,250,244,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <BrandLogo />

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <nav className="flex flex-wrap items-center gap-5 text-[0.92rem] font-bold text-[#174562] sm:gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="transition hover:text-[#ef7c11]"
                >
                  {item}
                </a>
              ))}
            </nav>
            <a
              href="#search"
              className="inline-flex w-full justify-center rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-[0.92rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(176,92,0,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(176,92,0,0.3)] sm:w-auto"
            >
              Search
            </a>
          </div>
        </div>
      </header>

      <main id="home" className="homepage-shell overflow-x-hidden">
        <section className="relative px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/50 bg-[#0b5b89] shadow-[0_28px_90px_rgba(6,36,59,0.18)]">
              <Image
                src="/hero-scene.svg"
                alt="Tropical Nicaragua shoreline with a villa, water, palms, and a volcano."
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,49,78,0.72)_0%,rgba(7,49,78,0.45)_34%,rgba(7,49,78,0.18)_72%,rgba(7,49,78,0.05)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%)]" />

              <div className="relative grid min-h-[700px] items-center gap-16 px-6 pb-36 pt-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pt-20">
                <div className="max-w-2xl space-y-8 text-white">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.22em] text-[#fce9c2] backdrop-blur">
                    Premium Nicaragua rentals
                  </span>
                  <div className="space-y-5">
                    <h1 className="display-font max-w-3xl text-[3rem] leading-[0.95] sm:text-[4.2rem] lg:text-[5.25rem]">
                      Find Your Dream Rental Home in Nicaragua
                    </h1>
                    <p className="max-w-xl text-[1.05rem] leading-8 text-[#e9f6ff] sm:text-[1.12rem]">
                      Discover beachfront villas, mountain retreats, city homes,
                      and long-term rentals across Nicaragua.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {["Beachfront", "Long-term stays", "Furnished homes", "Relocation-ready"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.85rem] font-bold text-white/95 backdrop-blur"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="hidden justify-end lg:flex">
                  <div className="w-full max-w-md rounded-[2rem] border border-white/25 bg-[rgba(255,250,243,0.14)] p-5 text-white backdrop-blur-xl shadow-[0_22px_48px_rgba(4,28,52,0.18)]">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
                      <Image
                        src="/rental-beachfront.svg"
                        alt="Featured Nicaragua rental"
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="display-font text-[1.9rem] leading-none">
                          Beachfront Villa
                        </p>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-[#ffe3b1]">
                          Featured
                        </span>
                      </div>
                      <p className="text-[0.94rem] leading-7 text-[#e7f5ff]">
                        Resort-style living with tropical landscaping, ocean
                        breezes, and strong long-stay appeal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-8 lg:inset-x-12 lg:bottom-8">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>

        <section id="listings" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              eyebrow="Featured Rentals"
              title="Curated homes for beach living, city comfort, and slower tropical stays"
              description="A polished first collection designed to feel premium, trustworthy, and easy to extend into a full listings platform."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredRentals.map((listing) => (
                <ListingCard key={listing.title} {...listing} />
              ))}
            </div>
          </div>
        </section>

        <section id="about-us" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-[linear-gradient(180deg,#fffdf8_0%,#f4efe1_100%)] px-6 py-12 shadow-[0_22px_52px_rgba(7,41,66,0.08)] sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Why Rent in Nicaragua?"
                  title="A lifestyle-driven market with beauty, flexibility, and real value"
                  description="Built for renters who care about both quality of life and a smooth move, whether they’re staying for months or starting a new chapter."
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-[#0f5d8d] shadow-[0_22px_52px_rgba(7,41,66,0.12)]">
                  <Image
                    src="/hero-scene.svg"
                    alt="Scenic Nicaragua"
                    width={1600}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {reasons.map((reason) => (
                  <FeatureCard key={reason.title} {...reason} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Featured Locations"
                title="Explore standout places to rent across Nicaragua"
                description="Each region offers a different pace, atmosphere, and rental profile for expats, families, digital nomads, and long-stay travelers."
              />

              <div className="grid gap-5 sm:grid-cols-2">
                {locations.map((location) => (
                  <article
                    key={location.name}
                    className="group overflow-hidden rounded-[1.6rem] border border-white/60 bg-white shadow-[0_18px_38px_rgba(8,56,90,0.08)]"
                  >
                    <div className="relative aspect-[1.2/0.9] overflow-hidden">
                      <Image
                        src={location.image}
                        alt={location.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,48,76,0)_0%,rgba(8,48,76,0.55)_100%)]" />
                      <div className="absolute inset-x-4 bottom-4">
                        <p className="display-font text-[1.6rem] leading-none text-white">
                          {location.name}
                        </p>
                        <p className="mt-2 text-[0.92rem] text-[#e6f6ff]">
                          {location.subtitle}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <SectionHeading
                eyebrow="Browse by Lifestyle"
                title="Start with the way you want to live"
                description="A future-friendly pattern for turning this homepage into a richer discovery experience."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {lifestyles.map((lifestyle, index) => (
                  <article
                    key={lifestyle}
                    className="rounded-[1.5rem] border border-white/60 bg-white/90 p-5 shadow-[0_18px_38px_rgba(8,56,90,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.76rem] font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                          {`0${index + 1}`}
                        </p>
                        <h3 className="display-font mt-3 text-[1.45rem] leading-none text-[#0a3555]">
                          {lifestyle}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#def3ff] px-3 py-1 text-[0.74rem] font-extrabold uppercase tracking-[0.16em] text-[#0e638f]">
                        Explore
                      </span>
                    </div>
                    <p className="mt-4 text-[0.96rem] leading-7 text-[#4a6a82]">
                      Browse homes tailored to this lifestyle, with design and
                      location details that help renters narrow the right fit quickly.
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              eyebrow="Client Testimonials"
              title="Built to inspire trust and make the next step easy"
              description="Use social proof to show that the platform is polished, responsive, and grounded in real renter needs."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pb-10 lg:pt-16">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#0d5f90_0%,#0a3657_52%,#0b2943_100%)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(6,36,59,0.22)] sm:px-8 lg:px-12 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.2em] text-[#ffe7ba]">
                  Ready to Inquire?
                </span>
                <h2 className="display-font text-[2.4rem] leading-[0.96] sm:text-[3.2rem]">
                  Looking for the perfect rental in Nicaragua?
                </h2>
                <p className="max-w-2xl text-[1rem] leading-8 text-[#dcedf8]">
                  Browse listings, compare locations, and start a conversation
                  about the kind of home and lifestyle you want next.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <a
                  href="#featured-rentals"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5"
                >
                  Browse Listings
                </a>
                <a
                  href="#contact"
                  className="inline-flex rounded-full border border-white/25 bg-white/10 px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/16"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <WhatsAppButton />
    </>
  );
}
