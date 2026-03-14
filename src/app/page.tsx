import Image from "next/image";

const navItems = ["Home", "Listings", "About Us", "Contact"];

const featuredCards = [
  {
    title: "Beachfront Villa",
    image: "/rental-beachfront.svg",
    location: "San Juan del Sur",
    details: "3 beds · Sunset patio · Steps from the shore",
  },
  {
    title: "Colonial House",
    image: "/rental-colonial.svg",
    location: "Granada",
    details: "4 beds · Courtyard pool · Walkable historic core",
  },
  {
    title: "Mountain Retreat",
    image: "/rental-mountain.svg",
    location: "Matagalpa Highlands",
    details: "2 beds · Cool climate · Private volcano views",
  },
];

const testimonials = [
  {
    quote:
      "We found our dream home thanks to the Nicaraguan Homes For Rent team.",
    author: "Sarah & John",
  },
  {
    quote: "Excellent service and beautiful properties with clear pricing.",
    author: "Carlos M.",
  },
];

const footerLinks = ["Home", "Listings", "About Us", "Contact"];

const socialIcons = [
  { name: "Facebook", tone: "bg-[#3b5998]", label: "f" },
  { name: "YouTube", tone: "bg-[#ff3b30]", label: "▶" },
  { name: "X", tone: "bg-[#4ba0eb]", label: "x" },
  { name: "Instagram", tone: "bg-[#26b7d7]", label: "◎" },
];

function LogoBadge() {
  return (
    <div className="logo-badge relative w-[18rem] max-w-full rounded-[0_0_2.8rem_2.8rem] px-5 pb-4 pt-3 text-white shadow-[0_14px_28px_rgba(4,27,49,0.42)] sm:w-[20rem]">
      <div className="absolute -left-1 top-0 h-16 w-12 rounded-[65%_15%_60%_20%] bg-[linear-gradient(180deg,#67cf70_0%,#2f8638_100%)]" />
      <div className="absolute left-2 top-1 h-12 w-10 rounded-[58%_12%_62%_18%] bg-[linear-gradient(180deg,#88e38a_0%,#389240_100%)]" />
      <div className="absolute left-7 top-0 h-14 w-9 rounded-[55%_12%_65%_15%] bg-[linear-gradient(180deg,#6fdb79_0%,#358e3d_100%)]" />
      <div className="relative rounded-[1.9rem] bg-[linear-gradient(180deg,#1470bb_0%,#0b3a69_78%,#082b4e_100%)] px-4 pb-4 pt-3">
        <div className="brand-font text-[2.45rem] leading-none text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.28)] sm:text-[3rem]">
          Nicaraguan
        </div>
        <div className="mt-2 inline-flex rounded-[0.8rem] bg-[linear-gradient(180deg,#ffb53f_0%,#ec760d_100%)] px-4 py-1.5 text-[1.1rem] font-extrabold leading-none text-[#fff7e1] shadow-[0_8px_16px_rgba(131,67,0,0.28)]">
          Homes For Rent
        </div>
      </div>
    </div>
  );
}

function SearchSelect({
  placeholder,
  options,
}: {
  placeholder: string;
  options: string[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <select
        defaultValue=""
        className="mock-select w-full appearance-none rounded-[0.45rem] border border-[#d8d3c7] bg-[#fff8ec] px-4 py-3 pr-11 text-[1.05rem] font-bold text-[#1c3f5a] outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#29475f]">
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M5.5 7.5L10 12l4.5-4.5" />
        </svg>
      </span>
    </label>
  );
}

function HeadingRule({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-[#d7cdbd]" />
      <h2 className="display-font text-[1.65rem] leading-none text-[#083b62] sm:text-[2rem]">
        {title}
      </h2>
      <div className="h-px flex-1 bg-[#d7cdbd]" />
    </div>
  );
}

function PropertyCard({
  title,
  image,
  location,
  details,
}: {
  title: string;
  image: string;
  location: string;
  details: string;
}) {
  return (
    <article className="overflow-hidden rounded-[0.35rem] border border-[#bdd5e6] bg-white shadow-[0_10px_24px_rgba(9,52,84,0.1)]">
      <div className="relative aspect-[1.18/1]">
        <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover" />
      </div>
      <div className="bg-[linear-gradient(180deg,#0f5e88_0%,#0b3557_100%)] px-4 pb-4 pt-3 text-white">
        <h3 className="display-font text-[1.5rem] leading-none">{title}</h3>
        <p className="mt-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#c5e7ff]">
          {location}
        </p>
        <p className="mt-3 text-[0.78rem] leading-5 text-[#e5f4ff]">{details}</p>
      </div>
    </article>
  );
}

function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <article className="testimonial-paper rounded-[0.45rem] border border-[#ecd9ad] px-5 py-4 shadow-[0_8px_18px_rgba(106,77,26,0.12)]">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#f6f0e1] text-[#3a3a3a]">
          <span className="text-sm font-black">◔</span>
        </div>
        <div className="flex-1">
          <p className="text-[1.02rem] leading-7 text-[#2f2f2b]">{quote}</p>
          <p className="mt-4 text-right text-[0.95rem] font-semibold text-[#614b22]">
            - {author}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="reference-page min-h-screen px-3 py-4 text-[#173c59] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[0.35rem] border border-[#d7d7d7] bg-[#fffaf2] shadow-[0_22px_54px_rgba(21,52,76,0.16)]">
        <section className="relative bg-[linear-gradient(180deg,#3b99df_0%,#74c6f7_70%,#8fd2fb_100%)]">
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="relative h-[7.7rem] px-5 pt-3 sm:h-[8.8rem] sm:px-8 lg:px-12">
            <div className="absolute left-4 top-2 z-20 sm:left-8 lg:left-10">
              <LogoBadge />
            </div>
            <div className="ml-auto flex w-full max-w-[48rem] items-center justify-end pt-2">
              <div className="flex w-full max-w-[46rem] flex-col gap-3 rounded-[0.2rem] bg-[linear-gradient(180deg,#fffdf8_0%,#f7eddc_100%)] px-4 py-4 shadow-[0_10px_26px_rgba(40,52,68,0.2)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <nav aria-label="Primary">
                  <ul className="flex flex-wrap items-center gap-5 text-[1rem] font-bold text-[#143f61] sm:gap-7 lg:gap-10">
                    {navItems.map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a
                  href="#search"
                  className="inline-flex items-center justify-center rounded-[0.2rem] bg-[linear-gradient(180deg,#ff9320_0%,#ea7409_100%)] px-6 py-3 text-[1rem] font-extrabold text-white shadow-[0_8px_18px_rgba(173,89,0,0.28)] sm:px-8"
                >
                  Search
                </a>
              </div>
            </div>
          </div>

          <div className="border-y border-[#3477a5] bg-[#20689c] px-0 sm:px-0">
            <div className="relative h-[24rem] overflow-hidden sm:h-[29rem] lg:h-[31rem]">
              <Image
                src="/hero-scene.svg"
                alt="Illustrated shoreline, volcano, and villas in Nicaragua."
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,83,126,0.08)_0%,rgba(10,51,82,0.12)_100%)]" />
              <div className="absolute inset-x-0 top-[18%] px-5 text-center sm:top-[22%]">
                <h1 className="brand-font mx-auto max-w-[17rem] text-[2.35rem] leading-[0.95] text-white [text-shadow:0_3px_7px_rgba(0,0,0,0.3)] sm:max-w-none sm:text-[3.7rem] lg:text-[4.4rem]">
                  Find Your Dream Rental Home in Nicaragua
                </h1>
              </div>

              <div
                id="search"
                className="absolute inset-x-4 bottom-4 rounded-[0.2rem] bg-[rgba(11,63,101,0.78)] px-4 py-4 shadow-[0_12px_24px_rgba(7,37,60,0.32)] sm:inset-x-10 sm:bottom-6 sm:px-5 lg:inset-x-[7.5rem] lg:bottom-5"
              >
                <form className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
                  <SearchSelect
                    placeholder="Location"
                    options={["San Juan del Sur", "Granada", "Managua", "Leon"]}
                  />
                  <SearchSelect
                    placeholder="Property Type"
                    options={["Beachfront Villa", "Colonial House", "Mountain Retreat"]}
                  />
                  <SearchSelect
                    placeholder="Price Range"
                    options={["$900 - $1,500", "$1,500 - $2,500", "$2,500+"]}
                  />
                  <button
                    type="button"
                    className="rounded-[0.2rem] bg-[linear-gradient(180deg,#ff9320_0%,#ea7409_100%)] px-5 py-3 text-[1.05rem] font-extrabold text-white shadow-[0_8px_18px_rgba(173,89,0,0.28)]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="paper-panel px-5 pb-6 pt-7 sm:px-8 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[1.1fr_1.1fr_1.1fr_1fr]">
            <div className="lg:col-span-2">
              <HeadingRule title="Featured Rentals" />
            </div>
            <div>
              <HeadingRule title="Why Rent in Nicaragua?" />
            </div>
            <div>
              <HeadingRule title="Client Testimonials" />
            </div>

            {featuredCards.map((card) => (
              <div key={card.title}>
                <PropertyCard {...card} />
              </div>
            ))}

            <div className="space-y-4">
              {testimonials.map((item) => (
                <TestimonialCard key={item.author} {...item} />
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#0b4972]">
          <div className="wood-bar grid gap-4 px-5 py-3 text-white sm:grid-cols-3 sm:px-8 lg:px-10">
            <h2 className="display-font text-[1.8rem] leading-none text-[#fff4d8]">
              Quick Links
            </h2>
            <h2 className="display-font text-[1.8rem] leading-none text-[#fff4d8]">
              Contact Info
            </h2>
            <div className="flex items-center justify-between gap-4">
              <h2 className="display-font text-[1.8rem] leading-none text-[#fff4d8]">
                Follow Us
              </h2>
              <div className="flex gap-2">
                {socialIcons.map((icon) => (
                  <span
                    key={icon.name}
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-[0.15rem] text-xs font-black text-white ${icon.tone}`}
                  >
                    {icon.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-blue px-5 py-8 text-white sm:px-8 lg:px-10">
            <div className="grid gap-8 sm:grid-cols-3">
              <div id="home" className="space-y-3 text-[1rem]">
                {footerLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block font-semibold"
                  >
                    {link}
                  </a>
                ))}
              </div>

              <div className="space-y-3 text-[1rem]">
                <p className="font-extrabold">Email:</p>
                <p>info@nicaraguanhomesforrent.com</p>
                <p className="font-extrabold">Phone: 505-1234-5678</p>
              </div>

              <div className="space-y-3 text-[1rem]">
                <p className="font-extrabold">Follow Us</p>
                <p>Facebook</p>
                <p>Watch</p>
                <p>Youtube.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
