type TestimonialCardProps = {
  name: string;
  title: string;
  quote: string;
};

export function TestimonialCard({
  name,
  title,
  quote,
}: TestimonialCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_38px_rgba(8,56,90,0.08)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0f6b9f_0%,#0a3f63_100%)] text-[1rem] font-black text-white">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="font-extrabold text-[#0c3553]">{name}</p>
          <p className="text-[0.92rem] text-[#57758b]">{title}</p>
        </div>
      </div>
      <p className="mt-5 text-[1rem] leading-8 text-[#3f627b]">“{quote}”</p>
    </article>
  );
}
