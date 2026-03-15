import Image from "next/image";
import { FeatureCard } from "@/components/home/FeatureCard";
import { Footer } from "@/components/home/Footer";
import { ListingCard } from "@/components/home/ListingCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import { getFeaturedListings } from "@/lib/listings";
import { SITE_EMAIL } from "@/lib/site";

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

export default async function Home() {
  const { listings: featuredRentals } = await getFeaturedListings();
  const heroListing = featuredRentals[0];

  return (
    <>
      <SiteHeader ctaHref="/listings" ctaLabel="Browse Listings" />

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
                    <p className="max-w-2xl text-[1.02rem] leading-8 text-[#e7f5ff] sm:text-[1.08rem]">
                      Discover curated homes for relocation, remote work, family stays, and tropical long-term living across Nicaragua's most loved destinations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/listings"
                      className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5"
                    >
                      View Listings
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex rounded-full border border-white/25 bg-white/10 px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/16"
                    >
                      Start Inquiry
                    </a>
                  </div>
                </div>

                {heroListing ? (
                  <div className="relative z-10 justify-self-end lg:w-full lg:max-w-[28rem]">
                    <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-[rgba(7,47,73,0.76)] p-4 backdrop-blur-xl shadow-[0_22px_50px_rgba(4,24,41,0.36)]">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem] border border-white/10">
                        <Image
                          src={heroListing.image}
                          alt={heroListing.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,48,0)_0%,rgba(5,30,48,0.78)_100%)]" />
                      </div>
                      <div className="space-y-4 px-2 pb-2 pt-5 text-white">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffe0a2]">
                              Featured Stay
                            </p>
                            <p className="mt-2 display-font text-[1.8rem] leading-none text-white">
                              {heroListing.title}
                            </p>
                          </div>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-[#ffe3b1]">
                            {heroListing.label}
                          </span>
                        </div>
                        <p className="text-[0.94rem] font-bold text-[#d7eefb]">{heroListing.location}</p>
                        <p className="text-[0.94rem] leading-7 text-[#e7f5ff]">{heroListing.details}</p>
                        <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-[#ffe3b1]">
                          {heroListing.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div id="search" className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-8 lg:inset-x-12 lg:bottom-8">
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
              description="Explore a polished first collection of Nicaragua rentals chosen for location, comfort, and long-stay appeal."
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
                  description="Built for renters who care about both quality of life and a smooth move, whether they are staying for months or starting a new chapter."
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-[#0f5d8d] shadow-[0_22px_52px_rgba(7,41,66,0.12)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_40%)]" />
                  <div className="relative px-6 py-8 text-white sm:px-8">
                    <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-[#ffe8b9]">
                      What renters love
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {reasons.map((reason) => (
                        <FeatureCard key={reason.title} {...reason} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Explore Key Locations"
                  title="Choose the region that fits your pace, work, and lifestyle"
                  description="From beach towns and colonial cities to mountain escapes, Nicaragua offers very different ways to live."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {locations.map((location) => (
                    <article
                      key={location.name}
                      className="group relative overflow-hidden rounded-[1.7rem] border border-white/60 bg-white shadow-[0_18px_42px_rgba(8,56,90,0.1)]"
                    >
                      <div className="relative aspect-[1.08/1] overflow-hidden">
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
            </div>

            <div className="space-y-8">
              <SectionHeading
                eyebrow="Browse by Lifestyle"
                title="Start with the way you want to live"
                description="Whether you want walkable beach access or a quieter remote-work base, these categories help narrow the best fit faster."
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
                      Browse homes tailored to this lifestyle, with design and location details that help renters narrow the right fit quickly.
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
              title="Trusted by renters planning their next chapter"
              description="People use the site to compare neighborhoods, shortlist homes, and move from browsing to a confident inquiry."
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
                  Ready to inquire?
                </span>
                <h2 className="display-font text-[2.4rem] leading-[0.96] sm:text-[3.2rem]">
                  Looking for the right rental in Nicaragua?
                </h2>
                <p className="max-w-2xl text-[1rem] leading-8 text-[#dcedf8]">
                  Browse listings, compare locations, and send us the details that matter most to your move, timeline, and budget.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <a
                  href="/listings"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5"
                >
                  Browse Listings
                </a>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex rounded-full border border-white/25 bg-white/10 px-6 py-4 text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/16"
                >
                  Email Us
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
