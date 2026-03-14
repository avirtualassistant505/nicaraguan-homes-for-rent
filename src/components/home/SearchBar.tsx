type SearchBarProps = {
  action?: string;
  className?: string;
  locations?: string[];
  propertyTypes?: string[];
  defaultValues?: {
    q?: string;
    location?: string;
    propertyType?: string;
    maxPrice?: string;
    pets?: string;
  };
  showKeyword?: boolean;
  submitLabel?: string;
};

const defaultLocations = ["San Juan del Sur", "Granada", "Managua", "Ometepe"];
const defaultPropertyTypes = ["Villa", "Colonial House", "Retreat", "Apartment", "Home"];
const priceRanges = [
  { label: "Any budget", value: "" },
  { label: "Up to $1,500", value: "1500" },
  { label: "Up to $2,500", value: "2500" },
  { label: "Up to $4,000", value: "4000" },
  { label: "$4,000+", value: "999999" },
];

export function SearchBar({
  action = "/listings",
  className = "",
  locations = defaultLocations,
  propertyTypes = defaultPropertyTypes,
  defaultValues,
  showKeyword = false,
  submitLabel = "Search",
}: SearchBarProps) {
  return (
    <form
      action={action}
      className={`rounded-[1.75rem] border border-white/25 bg-[rgba(9,58,89,0.72)] p-4 shadow-[0_18px_40px_rgba(4,31,54,0.28)] backdrop-blur-xl sm:p-5 ${className}`}
    >
      <div
        className={`grid gap-3 ${
          showKeyword
            ? "lg:grid-cols-[1.15fr_1fr_1fr_1fr_0.85fr]"
            : "lg:grid-cols-[1fr_1fr_1fr_0.85fr]"
        }`}
      >
        {showKeyword ? (
          <label className="relative block">
            <span className="sr-only">Keyword</span>
            <input
              name="q"
              defaultValue={defaultValues?.q || ""}
              placeholder="Beachfront, Granada, pool..."
              className="h-14 w-full rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 text-[1rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)] outline-none transition focus:border-[#ff9c2a] focus:ring-4 focus:ring-[#ff9c2a]/20"
            />
          </label>
        ) : null}

        <label className="relative block">
          <span className="sr-only">Location</span>
          <select
            defaultValue={defaultValues?.location || ""}
            className="h-14 w-full appearance-none rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 pr-12 text-[1rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)] outline-none transition focus:border-[#ff9c2a] focus:ring-4 focus:ring-[#ff9c2a]/20"
            name="location"
          >
            <option value="">Any location</option>
            {locations.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f4c69]">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.5 7.5L10 12l4.5-4.5" />
            </svg>
          </span>
        </label>

        <label className="relative block">
          <span className="sr-only">Property type</span>
          <select
            defaultValue={defaultValues?.propertyType || ""}
            className="h-14 w-full appearance-none rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 pr-12 text-[1rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)] outline-none transition focus:border-[#ff9c2a] focus:ring-4 focus:ring-[#ff9c2a]/20"
            name="propertyType"
          >
            <option value="">Any property type</option>
            {propertyTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f4c69]">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.5 7.5L10 12l4.5-4.5" />
            </svg>
          </span>
        </label>

        <label className="relative block">
          <span className="sr-only">Max price</span>
          <select
            defaultValue={defaultValues?.maxPrice || ""}
            className="h-14 w-full appearance-none rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 pr-12 text-[1rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)] outline-none transition focus:border-[#ff9c2a] focus:ring-4 focus:ring-[#ff9c2a]/20"
            name="maxPrice"
          >
            {priceRanges.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f4c69]">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.5 7.5L10 12l4.5-4.5" />
            </svg>
          </span>
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
          <label className="flex h-14 items-center gap-3 rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 text-[0.95rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)]">
            <input
              type="checkbox"
              name="pets"
              value="true"
              defaultChecked={defaultValues?.pets === "true"}
            />
            Pet friendly
          </label>

          <button
            type="submit"
            className="h-14 rounded-[1rem] bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 text-[1rem] font-extrabold text-white shadow-[0_14px_28px_rgba(176,92,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(176,92,0,0.34)]"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
