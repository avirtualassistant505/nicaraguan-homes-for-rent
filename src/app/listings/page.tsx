import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { ListingCard } from "@/components/home/ListingCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getPublishedListings } from "@/lib/listings";

type ListingsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = searchParams ? await searchParams : {};
  const filters = {
    q: pickParam(params.q),
    location: pickParam(params.location),
    propertyType: pickParam(params.propertyType),
    maxPrice: pickParam(params.maxPrice),
    pets: pickParam(params.pets),
  };

  const { listings, totalPublished, filterOptions, error } = await getPublishedListings(filters);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <main className="homepage-shell min-h-screen overflow-x-hidden">
      <section className="relative px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/60 bg-[linear-gradient(140deg,#0b5b89_0%,#0f699b_45%,#134c6c_100%)] px-6 py-10 text-white shadow-[0_28px_90px_rgba(6,36,59,0.18)] sm:px-8 lg:px-10 lg:py-12">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.22em] text-[#fce9c2] backdrop-blur">
                  Browse Nicaragua rentals
                </span>
                <h1 className="display-font mt-5 text-[2.8rem] leading-[0.94] sm:text-[4rem]">
                  Search beach, city, and mountain listings in one place
                </h1>
                <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#e7f5ff]">
                  Filter by location, property type, budget, and pet-friendliness.
                  This page is powered by the same Supabase inventory the admin edits.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin"
                  className="inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/16"
                >
                  Admin
                </Link>
                <Link
                  href="/"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_14px_28px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5"
                >
                  Homepage
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <SearchBar
                action="/listings"
                locations={filterOptions.locations}
                propertyTypes={filterOptions.propertyTypes}
                defaultValues={filters}
                showKeyword
                submitLabel="Filter listings"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="Available homes"
            title="Live inventory built for renters and easy to manage behind the scenes"
            description={
              error
                ? "The listings feed is temporarily unavailable. The admin and public pages will refresh as soon as Supabase responds again."
                : `${listings.length} listing${listings.length === 1 ? "" : "s"} matched your filters out of ${totalPublished} published homes.`
            }
          />

          <div className="flex flex-wrap items-center gap-3">
            {activeFilterCount > 0 ? (
              <Link
                href="/listings"
                className="inline-flex rounded-full border border-[#bed4e2] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0f699b] transition hover:bg-[#f6fbff]"
              >
                Clear filters
              </Link>
            ) : null}
            {filters.location ? (
              <span className="rounded-full bg-[#def3ff] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0e638f]">
                {filters.location}
              </span>
            ) : null}
            {filters.propertyType ? (
              <span className="rounded-full bg-[#fff0dc] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#b46500]">
                {filters.propertyType}
              </span>
            ) : null}
            {filters.maxPrice ? (
              <span className="rounded-full bg-[#f4efe1] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#6f5b37]">
                Max ${Number(filters.maxPrice).toLocaleString()}
              </span>
            ) : null}
            {filters.pets === "true" ? (
              <span className="rounded-full bg-[#ebf9ef] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#1e7b43]">
                Pet friendly
              </span>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-[1.75rem] border border-[#e8d7b6] bg-[#fff8ec] px-6 py-8 text-sm leading-7 text-[#6f5b37]">
              {error}
            </div>
          ) : listings.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[#bad2df] bg-white/75 px-6 py-10 text-sm leading-7 text-[#587286]">
              No listings matched those filters yet. Try clearing one or two options to broaden the search.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  slug={listing.slug}
                  image={listing.image_path}
                  title={listing.title}
                  location={[listing.city, listing.neighborhood, listing.region].filter(Boolean).join(", ")}
                  label={listing.label}
                  price={listing.price_label}
                  details={listing.summary}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
