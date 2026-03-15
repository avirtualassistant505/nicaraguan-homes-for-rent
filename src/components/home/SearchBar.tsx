type SearchBarProps = {
  className?: string;
};

const searchFields = [
  {
    label: "Location",
    options: ["San Juan del Sur", "Granada", "Managua", "Ometepe"],
  },
  {
    label: "Property Type",
    options: ["Beachfront Villa", "Colonial House", "Mountain Retreat", "City Apartment"],
  },
  {
    label: "Price Range",
    options: ["$900 - $1,500", "$1,500 - $2,500", "$2,500 - $4,000", "$4,000+"],
  },
];

export function SearchBar({ className = "" }: SearchBarProps) {
  return (
    <form
      action="#listings"
      className={`rounded-[1.75rem] border border-white/25 bg-[rgba(9,58,89,0.72)] p-4 shadow-[0_18px_40px_rgba(4,31,54,0.28)] backdrop-blur-xl sm:p-5 ${className}`}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_0.85fr]">
        {searchFields.map((field) => (
          <label key={field.label} className="relative block">
            <span className="sr-only">{field.label}</span>
            <select
              defaultValue=""
              className="h-14 w-full appearance-none rounded-[1rem] border border-white/45 bg-[rgba(255,250,241,0.94)] px-4 pr-12 text-[1rem] font-bold text-[#18435f] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_16px_rgba(10,37,55,0.14)] outline-none transition focus:border-[#ff9c2a] focus:ring-4 focus:ring-[#ff9c2a]/20"
              name={field.label.toLowerCase().replace(/\s+/g, "-")}
            >
              <option value="" disabled>
                {field.label}
              </option>
              {field.options.map((option) => (
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
        ))}

        <button
          type="submit"
          className="h-14 rounded-[1rem] bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 text-[1rem] font-extrabold text-white shadow-[0_14px_28px_rgba(176,92,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(176,92,0,0.34)]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
