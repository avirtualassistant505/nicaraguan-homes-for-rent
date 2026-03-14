import Image from "next/image";

export function BrandLogo() {
  return (
    <a href="#home" className="group inline-flex items-center gap-3">
      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/70 shadow-[0_10px_20px_rgba(13,73,114,0.2)]">
        <Image
          src="/hero-scene.svg"
          alt="Nicaraguan Homes For Rent"
          fill
          sizes="56px"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0">
        <p className="brand-font text-[1.75rem] leading-none text-[#0a3e64]">
          Nicaraguan
        </p>
        <p className="mt-1 inline-flex rounded-full bg-[linear-gradient(180deg,#ffb743_0%,#ee7a10_100%)] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_6px_16px_rgba(174,93,0,0.28)]">
          Homes For Rent
        </p>
      </div>
    </a>
  );
}
