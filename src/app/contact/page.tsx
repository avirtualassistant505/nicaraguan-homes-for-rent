import Link from "next/link";
import { PublicPageLayout } from "@/components/site/PublicPageLayout";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_DISPLAY, SITE_WHATSAPP_URL } from "@/lib/site";

const inquiryTips = [
  "Your preferred cities or neighborhoods",
  "Monthly budget and target move-in timing",
  "Lease length, furnishing needs, and pet requirements",
  "Any must-have features such as parking, pool, or work-friendly internet",
];

export default function ContactPage() {
  return (
    <PublicPageLayout
      eyebrow="Contact"
      title="Tell us what kind of rental you are looking for"
      description="The more context you share about budget, timeline, and preferred location, the easier it is to point you toward the right homes."
      ctaHref="/listings"
      ctaLabel="View Listings"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <section className="space-y-6">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              Email
            </p>
            <a href={`mailto:${SITE_EMAIL}`} className="mt-3 inline-block text-[1.2rem] font-bold text-[#0c3553] underline decoration-[#9fdcff] underline-offset-4">
              {SITE_EMAIL}
            </a>
            <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#4a6a82]">
              Use email for rental questions, availability requests, and partnership inquiries. We review submissions manually and reply with the next best step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#d8e5ee] bg-white p-5 shadow-[0_14px_34px_rgba(8,56,90,0.06)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                Phone
              </p>
              <a
                href={`tel:${SITE_PHONE}`}
                className="mt-3 inline-block text-[1.15rem] font-bold text-[#0c3553] underline decoration-[#9fdcff] underline-offset-4"
              >
                {SITE_PHONE_DISPLAY}
              </a>
              <p className="mt-3 text-[0.96rem] leading-7 text-[#4a6a82]">
                Call or text if you already know which property you want to ask about.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#d8e5ee] bg-white p-5 shadow-[0_14px_34px_rgba(8,56,90,0.06)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                WhatsApp
              </p>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-[1.15rem] font-bold text-[#0c3553] underline decoration-[#9fdcff] underline-offset-4"
              >
                Message on WhatsApp
              </a>
              <p className="mt-3 text-[0.96rem] leading-7 text-[#4a6a82]">
                Best for fast rental questions, media requests, and shortlisting homes.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-[#f8fcff] p-6 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              Helpful details to include
            </p>
            <ul className="mt-4 space-y-3 text-[0.98rem] leading-7 text-[#4a6a82]">
              {inquiryTips.map((tip) => (
                <li key={tip} className="rounded-[1rem] bg-white px-4 py-3">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-[#d8e5ee] bg-[linear-gradient(180deg,#fffdf8_0%,#f4efe1_100%)] p-6 shadow-[0_18px_40px_rgba(7,41,66,0.06)]">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
            Prefer to browse first?
          </p>
          <h2 className="display-font mt-4 text-[2rem] leading-[0.98] text-[#0c3553]">
            Start with the published inventory
          </h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#4a6a82]">
            Browse homes by location, budget, and property type, then reach out once you have a shortlist.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/listings"
              className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white"
            >
              Browse listings
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f]"
            >
              About the business
            </Link>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}
