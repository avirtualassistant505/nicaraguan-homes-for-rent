import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/Footer";
import { ListingCard } from "@/components/home/ListingCard";
import { SiteHeader } from "@/components/home/SiteHeader";
import { getAllPublishedListings } from "@/lib/listings";
import { JsonLd, absoluteUrl, itemListJsonLd, pageMetadata, rentalSeoPages } from "@/lib/seo";

type RentalSeoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return rentalSeoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: RentalSeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = rentalSeoPages.find((item) => item.slug === slug);

  if (!page) {
    return pageMetadata({
      title: "Nicaragua rental page not found",
      description: "This Nicaragua rental search page could not be found.",
      path: `/rentals/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/rentals/${page.slug}`,
  });
}

export default async function RentalSeoPage({ params }: RentalSeoPageProps) {
  const { slug } = await params;
  const page = rentalSeoPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const listings = await getAllPublishedListings();
  const matchingListings = listings.filter(page.match);
  const relatedPages = rentalSeoPages.filter((item) => item.slug !== page.slug).slice(0, 8);
  const pricedListings = matchingListings
    .map((listing) => listing.monthly_price_usd)
    .filter((value): value is number => typeof value === "number");
  const rentRange =
    pricedListings.length >= 2
      ? `$${Math.min(...pricedListings).toLocaleString()}-$${Math.max(...pricedListings).toLocaleString()}/mo`
      : null;

  return (
    <>
      <SiteHeader ctaHref="/listings" ctaLabel="Browse Listings" />
      <main className="homepage-shell min-h-screen overflow-x-hidden">
        <section className="relative px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2.4rem] border border-white/60 bg-[linear-gradient(140deg,#0b5b89_0%,#0f699b_45%,#134c6c_100%)] px-6 py-10 text-white shadow-[0_28px_90px_rgba(6,36,59,0.18)] sm:px-8 lg:px-10 lg:py-12">
              <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.22em] text-[#fce9c2] backdrop-blur">
                Nicaragua rental guide
              </span>
              <h1 className="display-font mt-5 max-w-4xl text-[2.8rem] leading-[0.94] sm:text-[4.4rem]">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-[#e7f5ff]">
                {page.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/listings"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_14px_28px_rgba(176,92,0,0.28)] transition hover:-translate-y-0.5"
                >
                  View current listings
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/16"
                >
                  Ask about rentals
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-8">
              <section className="grid gap-5 md:grid-cols-2">
                {page.sections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-[1.5rem] border border-[#dbe8ef] bg-white p-6 shadow-[0_18px_38px_rgba(8,56,90,0.06)]"
                  >
                    <h2 className="display-font text-[1.65rem] leading-none text-[#0a3555]">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[0.98rem] leading-7 text-[#4a6a82]">
                      {section.body}
                    </p>
                  </article>
                ))}
              </section>

              <section className="space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                      Current matching listings
                    </p>
                    <h2 className="display-font mt-3 text-[2.3rem] leading-none text-[#0c3553]">
                      {matchingListings.length > 0
                        ? `${matchingListings.length} rental${matchingListings.length === 1 ? "" : "s"} to compare`
                        : "No matching rentals published yet"}
                    </h2>
                  </div>
                  {rentRange ? (
                    <span className="rounded-full bg-[#def3ff] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0e638f]">
                      Listed range {rentRange}
                    </span>
                  ) : null}
                </div>

                {matchingListings.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {matchingListings.slice(0, 9).map((listing) => (
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
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-[#bad2df] bg-white/75 px-6 py-10 text-sm leading-7 text-[#587286]">
                    No current listings match this page yet. The page will fill automatically as new published rentals are added through the listing automation.
                  </div>
                )}
              </section>

              <section className="rounded-[1.75rem] border border-[#d8e5ee] bg-[#f8fcff] p-6 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                  Frequently asked questions
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {page.faqs.map((faq) => (
                    <article key={faq.question} className="rounded-[1.25rem] bg-white p-5">
                      <h2 className="font-extrabold text-[#0c3553]">{faq.question}</h2>
                      <p className="mt-3 text-[0.96rem] leading-7 text-[#4a6a82]">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[1.5rem] border border-[#d8e5ee] bg-white p-5 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                  Related searches
                </p>
                <div className="mt-4 grid gap-2">
                  {relatedPages.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/rentals/${item.slug}`}
                      className="rounded-[1rem] bg-[#f8fcff] px-4 py-3 text-sm font-bold text-[#174562] transition hover:bg-[#e8f6ff]"
                    >
                      {item.h1}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#d8e5ee] bg-[linear-gradient(180deg,#fffdf8_0%,#f4efe1_100%)] p-5 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                  Before you rent
                </p>
                <p className="mt-4 text-sm leading-7 text-[#4a6a82]">
                  Always verify rent, currency, lease length, availability, furnishings, exact location, utilities, and current property condition directly before committing.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <Footer />
      </main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: page.title,
            description: page.description,
            url: absoluteUrl(`/rentals/${page.slug}`),
          },
          itemListJsonLd(
            matchingListings.map((listing) => ({
              name: listing.title,
              url: absoluteUrl(`/listings/${listing.slug}`),
              image: listing.image_path,
              price: listing.price_label,
            })),
          ),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />
    </>
  );
}
