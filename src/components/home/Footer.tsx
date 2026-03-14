const links = ["Home", "Listings", "About Us", "Contact"];
const socials = ["Facebook", "Instagram", "YouTube"];

export function Footer() {
  return (
    <footer className="mt-20 overflow-hidden rounded-t-[2rem] bg-[linear-gradient(180deg,#0d5b89_0%,#082f4f_100%)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <p className="display-font text-[1.8rem] leading-none text-[#fff3d7]">
            Nicaraguan Homes For Rent
          </p>
          <p className="max-w-sm text-[0.98rem] leading-7 text-[#ccecff]">
            Premium rentals across Nicaragua for long stays, relocation, and
            tropical living.
          </p>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Quick Links
          </h3>
          <div className="mt-5 space-y-3">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-[0.98rem] text-[#e6f6ff] transition hover:text-[#ffd37f]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Contact Info
          </h3>
          <div className="mt-5 space-y-3 text-[0.98rem] text-[#e6f6ff]">
            <p>info@nicaraguanhomesforrent.com</p>
            <p>+505 0000 0000</p>
            <p>WhatsApp inquiries welcome</p>
          </div>
        </div>

        <div>
          <h3 className="text-[0.86rem] font-extrabold uppercase tracking-[0.2em] text-[#9fdcff]">
            Follow Us
          </h3>
          <div className="mt-5 space-y-3">
            {socials.map((social) => (
              <a
                key={social}
                href="#contact"
                className="block text-[0.98rem] text-[#e6f6ff] transition hover:text-[#ffd37f]"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
