export default function Home() {
  const highlights = [
    "Verified rentals in Managua and nearby neighborhoods",
    "WhatsApp-first contact flow for faster scheduling",
    "Clear monthly pricing and lease-ready details",
  ];

  return (
    <main className="min-h-screen px-6 py-10 md:px-12 lg:px-20">
      <section className="fade-up mx-auto grid w-full max-w-6xl gap-10 rounded-4xl border border-white/50 bg-white/55 p-8 shadow-xl frosted md:grid-cols-2 md:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-[#14281d] px-4 py-1 text-sm font-semibold tracking-wide text-[#ffd66b]">
            Nicaragua Rental Collection
          </p>
          <h1 className="title-font text-4xl leading-tight text-[#0e2418] md:text-6xl">
            Nicaraguan Homes For Rent
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#244032]">
            A curated experience for families, professionals, and remote teams
            searching for long-term homes in Nicaragua.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              className="rounded-full bg-[#14281d] px-6 py-3 text-sm font-bold text-[#ffd66b] transition hover:-translate-y-0.5 hover:shadow-lg"
              href="https://github.com/avirtualassistant505"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
            <a
              className="rounded-full border border-[#14281d]/40 bg-white/80 px-6 py-3 text-sm font-bold text-[#14281d] transition hover:bg-[#14281d] hover:text-[#ffd66b]"
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
            >
              Deploy with Vercel
            </a>
          </div>
        </div>
        <div className="fade-up-delay rounded-3xl bg-[#14281d] p-6 text-[#f7ffe6] shadow-lg md:p-8">
          <h2 className="title-font text-2xl text-[#ffd66b]">
            Why This Build
          </h2>
          <ul className="mt-5 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[#ffd66b]/25 bg-[#1a3527] p-4 text-sm leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-[#d7e9d7]">
            Ready for GitHub-connected, automatic Vercel deployments.
          </p>
        </div>
      </section>
    </main>
  );
}
