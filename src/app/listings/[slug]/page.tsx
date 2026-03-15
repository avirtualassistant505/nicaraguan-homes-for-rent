import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/Footer";
import { SiteHeader } from "@/components/home/SiteHeader";
import { getPublishedListingBySlug } from "@/lib/listings";
import { isUsablePhone, isUsableWhatsAppUrl } from "@/lib/site";

type ListingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatNumber(value: number | null, suffix: string) {
  if (value == null) {
    return "Contact for details";
  }

  return `${value}${suffix}`;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getPublishedListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const location = [listing.city, listing.neighborhood, listing.region].filter(Boolean).join(", ");
  const gallery = listing.gallery_images.length > 0 ? listing.gallery_images : [listing.image_path];
  const contactHref = listing.contact_email ? `mailto:${listing.contact_email}` : "/contact";
  const hasPhone = isUsablePhone(listing.contact_phone);
  const whatsappHref = isUsableWhatsAppUrl(listing.whatsapp_url) ? listing.whatsapp_url : null;

  return (
    <>
      <SiteHeader ctaHref="/contact" ctaLabel="Contact Us" />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e8f5ff_0%,#fffaf1_52%,#fffdf8_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/listings"
              className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff]"
            >
              Back to listings
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-[#0d5f90] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a4f78]"
            >
              Contact us
            </Link>
          </div>

          <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_28px_70px_rgba(7,41,66,0.12)] backdrop-blur">
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src={listing.image_path}
                alt={listing.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,36,59,0.12)_0%,rgba(6,36,59,0.7)_100%)]" />
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8">
                <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#ffe8bf] backdrop-blur">
                  {listing.label}
                </span>
                <h1 className="display-font mt-4 max-w-4xl text-[2.6rem] leading-[0.94] text-white sm:text-[3.6rem]">
                  {listing.title}
                </h1>
                <p className="mt-3 text-base text-[#e4f5ff]">{location}</p>
              </div>
            </div>

            <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                    Overview
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-8 text-[#4a6a82]">
                    {listing.description || listing.summary}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                    Quick summary
                  </p>
                  <p className="mt-4 text-[1rem] leading-8 text-[#4a6a82]">
                    {listing.summary}
                  </p>
                </div>

                {listing.amenities.length > 0 ? (
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                      Amenities
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {listing.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-[#e8f6ff] px-4 py-2 text-sm font-bold text-[#0e638f]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {gallery.length > 1 ? (
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                      Gallery
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {gallery.slice(0, 6).map((image) => (
                        <div key={image} className="relative aspect-[1.2/0.95] overflow-hidden rounded-[1.25rem]">
                          <Image
                            src={image}
                            alt={listing.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="rounded-[1.75rem] border border-[#d8e5ee] bg-[#f8fcff] p-6 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                  Listing details
                </p>
                <dl className="mt-5 grid gap-4 text-sm text-[#173d58]">
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Property type</dt>
                    <dd className="font-bold">{listing.property_type}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Price</dt>
                    <dd className="font-bold">{listing.price_label}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Furnishing</dt>
                    <dd className="font-bold">{listing.furnishing}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Availability</dt>
                    <dd className="font-bold capitalize">{listing.availability_status}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Bedrooms</dt>
                    <dd className="font-bold">{formatNumber(listing.bedrooms, "")}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Min lease</dt>
                    <dd className="font-bold">{formatNumber(listing.min_lease_months, " months")}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce9f0] pb-3">
                    <dt className="font-semibold text-[#587286]">Size</dt>
                    <dd className="font-bold">{formatNumber(listing.square_meters, " m^2")}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-semibold text-[#587286]">Bathrooms</dt>
                    <dd className="font-bold">{formatNumber(listing.bathrooms, "")}</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-3 rounded-[1.25rem] bg-white p-4">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0f699b]">
                    Contact
                  </p>
                  {listing.contact_name ? (
                    <p className="text-sm font-bold text-[#173d58]">{listing.contact_name}</p>
                  ) : null}
                  {hasPhone ? (
                    <p className="text-sm text-[#587286]">{listing.contact_phone}</p>
                  ) : null}
                  {listing.contact_email ? (
                    <p className="text-sm text-[#587286]">{listing.contact_email}</p>
                  ) : null}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={contactHref}
                      className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white"
                    >
                      Email inquiry
                    </a>
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f]"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
