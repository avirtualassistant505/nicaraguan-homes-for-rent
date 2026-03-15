import { PublicPageLayout } from "@/components/site/PublicPageLayout";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

const sections = [
  {
    title: "1. Information we collect",
    paragraphs: [
      "We may collect contact information that you submit through forms or inquiries, including name, email address, phone number, WhatsApp number, and property inquiry details.",
      "We may also collect technical information such as IP address, browser type, device information, and usage data, plus account and authentication data for authorized administrators.",
      "If an authorized administrator chooses to connect TikTok, we may process limited TikTok account data and authorization credentials returned by TikTok, including account identifiers, scopes granted, access tokens, refresh tokens, token expiration metadata, video files, captions, and related publishing metadata.",
    ],
  },
  {
    title: "2. How we use information",
    paragraphs: [
      "We use collected information to operate and improve the website, respond to rental inquiries, manage listings and related media, authenticate authorized administrators, connect and maintain authorized social publishing integrations, maintain security and logging, and comply with legal obligations.",
    ],
  },
  {
    title: "3. TikTok integration data",
    paragraphs: [
      "If an authorized administrator connects a TikTok account to our website workflow, we use TikTok authorization data only to authenticate the connected account and perform requested publishing actions.",
      "We store tokens and related credentials only as needed to operate the authorized workflow securely. We do not use TikTok account data for advertising, resale, profiling, or unrelated analytics.",
    ],
  },
  {
    title: "4. Sharing of information",
    paragraphs: [
      "We do not sell personal data. We may share information with service providers and infrastructure vendors that help us host, secure, and operate the website, with connected third-party platforms such as TikTok when required to complete requested actions, and with legal or regulatory authorities when required by law.",
    ],
  },
  {
    title: "5. Data retention",
    paragraphs: [
      "We retain information for as long as reasonably necessary to operate the website, provide services, maintain records, resolve disputes, enforce agreements, and comply with legal requirements.",
      "Authorization credentials and related integration records may be deleted earlier if the connected user revokes access or requests deletion, subject to legitimate security and legal retention needs.",
    ],
  },
  {
    title: "6. Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards to protect information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Your choices",
    paragraphs: [
      "You may contact us to request access, correction, or deletion of certain information, revoke a connected third-party account authorization, or stop using the website at any time.",
    ],
  },
  {
    title: "8. Third-party services",
    paragraphs: [
      "Our website may contain links to third-party services and social platforms. Their privacy practices are governed by their own policies.",
    ],
  },
  {
    title: "9. Children's privacy",
    paragraphs: [
      "Our website is intended for general audiences and is not directed to children under 13.",
    ],
  },
  {
    title: "10. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PublicPageLayout
      eyebrow="Privacy Policy"
      title="How we collect, use, and protect information"
      description="Effective date: March 14, 2026"
      ctaHref="/contact"
      ctaLabel="Contact Us"
    >
      <div className="space-y-8">
        <div className="max-w-4xl space-y-5 text-[1rem] leading-8 text-[#4a6a82]">
          <p>
            {SITE_NAME} operates this website and related business workflows. This Privacy Policy explains what information we collect, how we use it, and what choices users have when interacting with the website and connected social publishing features, including TikTok integrations.
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
          </section>
        ))}

        <section className="rounded-[1.5rem] bg-[#f8fcff] px-5 py-5 text-[1rem] leading-8 text-[#4a6a82]">
          <p className="font-bold text-[#0c3553]">Contact</p>
          <p>
            For privacy questions or data requests, contact <a className="underline decoration-[#9fdcff] underline-offset-4" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </section>
      </div>
    </PublicPageLayout>
  );
}
