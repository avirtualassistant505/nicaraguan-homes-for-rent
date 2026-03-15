import type { ReactNode } from "react";
import { Footer } from "@/components/home/Footer";
import { SiteHeader } from "@/components/home/SiteHeader";

type PublicPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  children: ReactNode;
};

export function PublicPageLayout({
  eyebrow,
  title,
  description,
  ctaHref = "/contact",
  ctaLabel = "Contact Us",
  children,
}: PublicPageLayoutProps) {
  return (
    <>
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />

      <main className="homepage-shell min-h-screen overflow-x-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-6xl space-y-10">
          <section className="overflow-hidden rounded-[2.4rem] border border-white/60 bg-[linear-gradient(140deg,#0b5b89_0%,#0f699b_45%,#134c6c_100%)] px-6 py-10 text-white shadow-[0_28px_90px_rgba(6,36,59,0.18)] sm:px-8 lg:px-10 lg:py-12">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.76rem] font-extrabold uppercase tracking-[0.22em] text-[#fce9c2] backdrop-blur">
              {eyebrow}
            </span>
            <h1 className="display-font mt-5 max-w-4xl text-[2.8rem] leading-[0.94] sm:text-[4rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-[#e7f5ff]">{description}</p>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/90 px-6 py-8 shadow-[0_28px_70px_rgba(7,41,66,0.08)] backdrop-blur sm:px-8 lg:px-10">
            {children}
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
