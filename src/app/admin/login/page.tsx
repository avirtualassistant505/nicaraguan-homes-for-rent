import { redirect } from "next/navigation";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { loginAction } from "@/app/admin/actions";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  const params = searchParams ? await searchParams : {};
  const error = typeof params.error === "string" ? params.error : "";
  const adminConfigured = isAdminConfigured();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e9f6ff_0%,#f8f3e8_52%,#fffdf8_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <section className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_28px_70px_rgba(7,41,66,0.12)] backdrop-blur">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#0f699b]">
            Nicaragua Homes Admin
          </p>
          <h1 className="display-font mt-4 text-[3rem] leading-[0.94] text-[#0c3553]">
            Sign in to manage listings
          </h1>
          <p className="mt-4 text-[1rem] leading-7 text-[#577185]">
            Secure access for listing updates, media uploads, and connected publishing
            tools.
          </p>

          {!adminConfigured ? (
            <div className="mt-8 rounded-[1.5rem] border border-[#ffd7b2] bg-[#fff6eb] p-5 text-sm leading-7 text-[#7f4a12]">
              Add these variables to <code>.env.local</code> before using the admin:
              <pre className="mt-3 overflow-x-auto rounded-xl bg-white/80 p-4 text-xs text-[#5e3a15]">
{`ADMIN_ACCESS_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=replace-with-a-random-secret`}
              </pre>
            </div>
          ) : null}

          {error === "invalid-password" ? (
            <div className="mt-6 rounded-2xl border border-[#e8b3aa] bg-[#fff4f2] px-4 py-3 text-sm font-semibold text-[#8f2c21]">
              The password was not correct. Try again.
            </div>
          ) : null}

          <form action={loginAction} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-[#18435f]">
              Admin password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-14 rounded-2xl border border-[#cfe0ea] px-4 text-base text-[#173d58] outline-none transition focus:border-[#ef7c11] focus:ring-4 focus:ring-[#ef7c11]/15"
              />
            </label>

            <button
              type="submit"
              disabled={!adminConfigured}
              className="inline-flex justify-center rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(176,92,0,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Enter admin
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
