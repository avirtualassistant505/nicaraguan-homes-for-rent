import { PublicPageLayout } from "@/components/site/PublicPageLayout";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

const sections = [
  {
    title: "1. Use of the website",
    paragraphs: [
      "You may use the website only in compliance with applicable law and these Terms.",
    ],
    bullets: [
      "Do not use the website for unlawful, fraudulent, or misleading purposes.",
      "Do not interfere with the operation or security of the website.",
      "Do not submit false inquiries or unauthorized content.",
      "Do not upload or distribute content that infringes another person's rights.",
    ],
  },
  {
    title: "2. Property information",
    paragraphs: [
      "Listings, photos, videos, pricing, availability, and descriptions may change over time. We do not guarantee that all listing information is complete, current, or error-free at all times.",
    ],
  },
  {
    title: "3. Inquiries and communications",
    paragraphs: [
      "If you contact us through forms, email, WhatsApp, or other channels, you agree to provide accurate information and to communicate lawfully and respectfully.",
    ],
  },
  {
    title: "4. Administrator tools and connected platforms",
    paragraphs: [
      "Certain features may be available only to authorized administrators.",
    ],
    bullets: [
      "Authorized administrators must have authority to use the connected account.",
      "They must own or have the necessary rights to any video, image, caption, or other content submitted.",
      "They are responsible for reviewing content before publication.",
      "They must comply with the terms, policies, and rules of any connected third-party platform, including TikTok.",
    ],
  },
  {
    title: "5. No guarantee of publishing success",
    paragraphs: [
      "Third-party integrations may be changed, interrupted, limited, or discontinued at any time. We do not guarantee uninterrupted availability of any connected publishing workflow or successful posting to any third-party platform.",
    ],
  },
  {
    title: "6. Intellectual property",
    paragraphs: [
      "The website design, branding, text, images, and other materials on the website are owned by or licensed to Nicaraguan Homes For Rent unless otherwise stated. You may not copy, distribute, or reuse website content except as allowed by law or with permission.",
    ],
  },
  {
    title: "7. User content",
    paragraphs: [
      "If you submit content to us, you represent that you have the necessary rights to do so. You grant us a limited right to use that content as needed to operate the website and requested services.",
    ],
  },
  {
    title: "8. Disclaimer",
    paragraphs: [
      "The website and services are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, to the fullest extent permitted by law.",
    ],
  },
  {
    title: "9. Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Nicaraguan Homes For Rent will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, business, or opportunities arising from use of the website or related services.",
    ],
  },
  {
    title: "10. Changes to the services or terms",
    paragraphs: [
      "We may modify, suspend, or discontinue any part of the website or services at any time. We may also update these Terms, and updated versions will be posted with a revised effective date.",
    ],
  },
  {
    title: "11. Governing law",
    paragraphs: [
      "These Terms will be governed by applicable law in the jurisdiction determined by the website operator, unless otherwise required by law.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <PublicPageLayout
      eyebrow="Terms of Service"
      title="Terms for using the website and related services"
      description="Effective date: March 14, 2026"
      ctaHref="/contact"
      ctaLabel="Contact Us"
    >
      <div className="space-y-8">
        <div className="max-w-4xl space-y-5 text-[1rem] leading-8 text-[#4a6a82]">
          <p>
            Welcome to {SITE_NAME}. These Terms of Service govern your use of the website and related services provided by Nicaraguan Homes For Rent. By accessing or using the website, you agree to these Terms.
          </p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="space-y-3 border-t border-[#e1edf4] pt-6 first:border-t-0 first:pt-0">
            <h2 className="display-font text-[1.8rem] leading-none text-[#0c3553]">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-4xl text-[1rem] leading-8 text-[#4a6a82]">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="space-y-3 text-[1rem] leading-8 text-[#4a6a82]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-[1rem] bg-[#f8fcff] px-4 py-3">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="rounded-[1.5rem] bg-[#f8fcff] px-5 py-5 text-[1rem] leading-8 text-[#4a6a82]">
          <p className="font-bold text-[#0c3553]">Contact</p>
          <p>
            Questions about these Terms may be sent to <a className="underline decoration-[#9fdcff] underline-offset-4" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </section>
      </div>
    </PublicPageLayout>
  );
}
