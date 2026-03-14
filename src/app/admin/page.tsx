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

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const params = searchParams ? await searchParams : {};
  const errorCode = typeof params.error === "string" ? params.error : "";

  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen bg-[#f8fbfd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#d8e5ee] bg-white p-8 shadow-[0_22px_52px_rgba(7,41,66,0.08)]">
          <h1 className="display-font text-[2.6rem] leading-none text-[#0c3553]">
            Admin setup needed
          </h1>
          <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-[#587286]">
            Add <code>ADMIN_ACCESS_PASSWORD</code> and optionally{" "}
            <code>ADMIN_SESSION_SECRET</code> to{" "}
            <code>.env.local</code>, then reload this page.
          </p>
        </div>
      </main>
    );
  }

  await requireAdminSession();
  const { listings, error } = await getAdminListings();

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
                Manage rentals, uploads, and publish state
              </h1>
              <p className="mt-4 text-[1rem] leading-7 text-[#587286]">
                This dashboard writes directly to Supabase. That means the browser
                admin and Codex can both manage the same listings cleanly.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff]"
              >
                View site
              </a>
              <form action={logoutAction}>
                <button className="inline-flex rounded-full bg-[#0d5f90] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a4f78]">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </header>

        {errorCode ? (
          <Notice tone="error">
            A required field was missing or the last action could not be completed.
          </Notice>
        ) : null}

        {error ? (
          <Notice tone="info">
            The admin is ready, but the live listings feed could not be loaded for this request.
            Check the Supabase credentials or reload the page after a moment.
          </Notice>
        ) : null}

        <div className="grid gap-8">
          <AdminListingForm action={createListingAction} />

          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="display-font text-[2rem] leading-none text-[#0c3553]">
                Existing listings
              </h2>
              <p className="text-sm font-semibold text-[#587286]">
                {listings.length} total
              </p>
            </div>

            {listings.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-[#bad2df] bg-white/75 px-6 py-8 text-sm leading-7 text-[#587286]">
                No listings are available yet. Create the first one above or refresh if
                you just finished a migration or import.
              </div>
            ) : (
              <div className="grid gap-6">
                {listings.map((listing) => (
                  <AdminListingForm
                    key={listing.id}
                    action={updateListingAction}
                    deleteAction={deleteListingAction}
                    listing={listing}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
