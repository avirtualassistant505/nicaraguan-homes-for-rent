import { PublicPageLayout } from "@/components/site/PublicPageLayout";

const capabilities = [
  {
    title: "Listing media management",
    description:
      "Authorized administrators can organize listing photos, gallery assets, and video files associated with active rental inventory.",
  },
  {
    title: "Draft-based social publishing",
    description:
      "Original property-tour and listing videos can be sent to an authorized TikTok account as drafts for final review and posting inside TikTok.",
  },
  {
    title: "Business-first workflow",
    description:
      "The connected publishing tools are used to support a live rental website, not personal automation or bulk posting.",
  },
];

export default function CreatorToolsPage() {
  return (
    <PublicPageLayout
      eyebrow="Creator Tools"
      title="Media workflows for authorized listing administrators"
      description="Nicaraguan Homes For Rent includes protected back-office tools for managing property media and sending creator-owned listing videos to connected social platforms as drafts."
      ctaHref="/contact"
      ctaLabel="Contact Us"
    >
      <div className="space-y-8">
        <section className="max-w-4xl space-y-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
            Business use case
          </p>
          <h2 className="display-font text-[2.2rem] leading-[0.98] text-[#0c3553]">
            Original property videos are managed inside the website workflow and reviewed before publication
          </h2>
          <p className="text-[1rem] leading-8 text-[#4a6a82]">
            The protected admin area supports business operations for the live rental website. Authorized administrators manage listing information, upload original property-tour videos, and export those videos to connected social accounts as drafts for final review.
          </p>
          <p className="text-[1rem] leading-8 text-[#4a6a82]">
            The initial workflow is draft-first. The final posting decision stays with the authorized account owner inside TikTok.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="rounded-[1.5rem] border border-[#dbe8ef] bg-white p-6 shadow-[0_18px_38px_rgba(8,56,90,0.06)]"
            >
              <h3 className="display-font text-[1.45rem] leading-none text-[#0a3555]">{capability.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#4a6a82]">{capability.description}</p>
            </article>
          ))}
        </section>
      </div>
    </PublicPageLayout>
  );
}
