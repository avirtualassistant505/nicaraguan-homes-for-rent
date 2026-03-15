import Link from "next/link";
import { PublicPageLayout } from "@/components/site/PublicPageLayout";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

const pillars = [
  {
    title: "Curated inventory",
    description:
      "We focus on long-stay homes that suit relocation, remote work, retirement, and lifestyle-driven moves across Nicaragua.",
  },
  {
    title: "Local context",
    description:
      "Each listing is presented with clear location details, lifestyle cues, and the kind of information renters need before reaching out.",
  },
  {
    title: "Practical communication",
    description:
      "Inquiries, media management, and listing updates are handled through a secure business workflow built for authorized administrators.",
  },
];

export default function AboutPage() {
  return (
    <PublicPageLayout
      eyebrow="About"
      title="A business-focused rental platform for discovering homes across Nicaragua"
      description="Nicaraguan Homes For Rent helps renters compare locations, shortlist homes, and move confidently from browsing to inquiry."
      ctaHref="/listings"
      ctaLabel="Browse Listings"
    >
      <div className="space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              What we do
            </p>
            <h2 className="display-font text-[2.2rem] leading-[0.98] text-[#0c3553]">
              Designed for long-stay renters, relocation searches, and lifestyle-led moves
            </h2>
            <p className="text-[1rem] leading-8 text-[#4a6a82]">
              {SITE_NAME} presents curated rental listings from destinations such as San Juan del Sur, Granada, Managua, Ometepe, and the Matagalpa highlands. The experience is designed to feel polished, trustworthy, and useful for people planning a serious move or extended stay.
            </p>
            <p className="text-[1rem] leading-8 text-[#4a6a82]">
              Behind the scenes, authorized administrators manage listing content, images, and business media workflows so the public site stays consistent and up to date.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-[#f8fcff] p-6 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              Contact
            </p>
            <p className="mt-4 text-[1rem] leading-8 text-[#4a6a82]">
              For rental questions, partnership inquiries, or help finding the right neighborhood, email us directly.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-6 inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[1.5rem] border border-[#dbe8ef] bg-white p-6 shadow-[0_18px_38px_rgba(8,56,90,0.06)]"
            >
              <h3 className="display-font text-[1.45rem] leading-none text-[#0a3555]">{pillar.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#4a6a82]">{pillar.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[1.75rem] border border-[#d8e5ee] bg-[linear-gradient(180deg,#fffdf8_0%,#f4efe1_100%)] px-6 py-8 shadow-[0_18px_40px_rgba(7,41,66,0.06)]">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
            Explore next
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/listings"
              className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f]"
            >
              View published listings
            </Link>
            <Link
              href="/creator-tools"
              className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f]"
            >
              Creator tools
            </Link>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}
