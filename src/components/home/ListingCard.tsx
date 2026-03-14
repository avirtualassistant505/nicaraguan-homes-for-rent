import Link from "next/link";
import Image from "next/image";

type ListingCardProps = {
  slug: string;
  image: string;
  title: string;
  location: string;
  label: string;
  price: string;
  details: string;
};

export function ListingCard({
  slug,
  image,
  title,
  location,
  label,
  price,
  details,
}: ListingCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-white/60 bg-white shadow-[0_20px_42px_rgba(7,41,66,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_54px_rgba(7,41,66,0.18)]">
      <div className="relative aspect-[1.14/1] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[rgba(9,58,89,0.84)] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur">
            {label}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-[0.82rem] font-bold text-[#0d4466] shadow-[0_8px_18px_rgba(7,41,66,0.12)]">
            {price}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <p className="text-[0.76rem] font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
            {location}
          </p>
          <h3 className="display-font text-[1.7rem] leading-none text-[#0c3553]">
            {title}
          </h3>
        </div>
        <p className="text-[0.98rem] leading-7 text-[#4b6b83]">{details}</p>
        <Link
          href={`/listings/${slug}`}
          className="inline-flex rounded-full bg-[#0d5f90] px-5 py-3 text-[0.92rem] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a4f78]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
