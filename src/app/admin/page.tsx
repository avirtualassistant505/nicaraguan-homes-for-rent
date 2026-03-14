import Link from "next/link";
import type { ReactNode } from "react";
import { AdminListingForm } from "@/components/admin/AdminListingForm";
import {
  createListingAction,
  deleteListingAction,
  logoutAction,
  updateListingAction,
} from "@/app/admin/actions";
import { isAdminConfigured, requireAdminSession } from "@/lib/admin-auth";
import { getAdminListings } from "@/lib/listings";

type AdminDashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function Notice({ tone, children }: { tone: "error" | "info"; children: ReactNode }) {
  const classes =
    tone === "error"
      ? "border-[#e8b3aa] bg-[#fff4f2] text-[#8f2c21]"
      : "border-[#b8dae9] bg-[#edf8ff] text-[#0f699b]";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${classes}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-[#dbe8ef] bg-[#f8fcff] px-5 py-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f699b]">{label}</p>
      <p className="mt-2 text-[1.8rem] font-black leading-none text-[#0c3553]">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const params = searchParams ? await searchParams : {};
  const errorCode = typeof params.error === "string" ? params.error : "";
  const selectedListingId = typeof params.listing === "string" ? params.listing : "";
  const view = typeof params.view === "string" ? params.view : "";
  const showCreatePanel = view === "new";

  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen bg-[#f8fbfd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#d8e5ee] bg-white p-8 shadow-[0_22px_52px_rgba(7,41,66,0.08)]">
          <h1 className="display-font text-[2.6rem] leading-none text-[#0c3553]">
            Admin setup needed
          </h1>
          <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-[#587286]">
            Add <code>ADMIN_ACCESS_PASSWORD</code> and optionally <code>ADMIN_SESSION_SECRET</code> to <code>.env.local</code>, then reload this page.
          </p>
        </div>
      </main>
    );
  }

  await requireAdminSession();
  const { listings, error } = await getAdminListings();
  const selectedListing = showCreatePanel
    ? null
    : listings.find((listing) => listing.id === selectedListingId) || listings[0] || null;
  const publishedCount = listings.filter((listing) => listing.is_published).length;
  const draftCount = listings.filter((listing) => !listing.is_published).length;
  const featuredCount = listings.filter((listing) => listing.is_featured).length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e9f6ff_0%,#f8f3e8_48%,#fffdf8_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-white/70 bg-white/88 px-6 py-7 shadow-[0_28px_70px_rgba(7,41,66,0.1)] backdrop-blur sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#0f699b]">
                Listings Admin
              </p>
              <h1 className="display-font mt-3 text-[3rem] leading-[0.94] text-[#0c3553]">
                Manage properties from a real inventory dashboard
              </h1>
              <p className="mt-4 text-[1rem] leading-7 text-[#587286]">
                Pick a property from the list, edit it in one focused pane, and jump between draft and published homes without scrolling through every form on the page.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff]"
              >
                View site
              </Link>
              <form action={logoutAction}>
                <button className="inline-flex rounded-full bg-[#0d5f90] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a4f78]">
                  Log out
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            <StatCard label="Total listings" value={listings.length} />
            <StatCard label="Published" value={publishedCount} />
            <StatCard label="Drafts" value={draftCount} />
            <StatCard label="Featured" value={featuredCount} />
          </div>
        </header>

        {errorCode ? (
          <Notice tone="error">
            A required field was missing or the last action could not be completed.
          </Notice>
        ) : null}

        {error ? (
          <Notice tone="info">
            The admin is ready, but the live listings feed could not be loaded for this request. Check the Supabase credentials or reload the page after a moment.
          </Notice>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="space-y-5">
            <section className="rounded-[1.75rem] border border-[#d8e5ee] bg-white p-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                    Property list
                  </p>
                  <h2 className="display-font mt-2 text-[1.9rem] leading-none text-[#0c3553]">
                    All properties
                  </h2>
                </div>
                <Link
                  href="/admin?view=new"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_12px_22px_rgba(176,92,0,0.24)] transition hover:-translate-y-0.5"
                >
                  New listing
                </Link>
              </div>

              {listings.length === 0 ? (
                <div className="mt-5 rounded-[1.25rem] border border-dashed border-[#bad2df] bg-[#f8fcff] px-4 py-5 text-sm leading-7 text-[#587286]">
                  No listings yet. Start by creating the first property record.
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {listings.map((listing) => {
                    const isSelected = selectedListing?.id === listing.id && !showCreatePanel;
                    return (
                      <Link
                        key={listing.id}
                        href={`/admin?listing=${encodeURIComponent(listing.id)}`}
                        className={`block rounded-[1.35rem] border px-4 py-4 transition ${
                          isSelected
                            ? "border-[#0f699b] bg-[#eef8ff] shadow-[0_10px_22px_rgba(15,105,155,0.12)]"
                            : "border-[#dbe8ef] bg-[#fbfdff] hover:border-[#bed4e2] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[1rem] font-extrabold leading-6 text-[#0c3553]">{listing.title}</p>
                            <p className="mt-1 text-sm text-[#587286]">
                              {[listing.city, listing.neighborhood, listing.region].filter(Boolean).join(', ')}
                            </p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] ${listing.is_published ? 'bg-[#e8f7ee] text-[#1e7b43]' : 'bg-[#fff1df] text-[#b46500]'}`}>
                            {listing.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#f1f7fb] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#45657b]">
                            {listing.property_type}
                          </span>
                          {listing.is_featured ? (
                            <span className="rounded-full bg-[#def3ff] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#0e638f]">
                              Featured
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                          <span className="font-bold text-[#174562]">{listing.price_label}</span>
                          <span className="text-[#587286]">Open</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </aside>

          <section className="space-y-5">
            {showCreatePanel || !selectedListing ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[#d8e5ee] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                      Create listing
                    </p>
                    <h2 className="display-font mt-2 text-[2.1rem] leading-none text-[#0c3553]">
                      Add a new property
                    </h2>
                  </div>
                  {selectedListing ? (
                    <Link
                      href={`/admin?listing=${encodeURIComponent(selectedListing.id)}`}
                      className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff]"
                    >
                      Back to selected listing
                    </Link>
                  ) : null}
                </div>
                <AdminListingForm action={createListingAction} />
              </>
            ) : (
              <>
                <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
                        Editing property
                      </p>
                      <h2 className="display-font mt-2 text-[2.2rem] leading-none text-[#0c3553]">
                        {selectedListing.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#587286]">
                        {[selectedListing.city, selectedListing.neighborhood, selectedListing.region].filter(Boolean).join(', ')}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/admin?view=new"
                        className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff]"
                      >
                        Add another
                      </Link>
                      <Link
                        href={`/listings/${selectedListing.slug}`}
                        className="inline-flex rounded-full bg-[#0d5f90] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a4f78]"
                      >
                        View live page
                      </Link>
                    </div>
                  </div>
                </div>

                <AdminListingForm
                  action={updateListingAction}
                  deleteAction={deleteListingAction}
                  listing={selectedListing}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
