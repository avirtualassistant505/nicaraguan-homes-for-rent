type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-[#dff4ff] px-4 py-1 text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-[#0f5e88]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="display-font text-[2.25rem] leading-[0.98] text-[#0a3555] sm:text-[2.8rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-[1rem] leading-7 text-[#3a617d] sm:text-[1.05rem]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
