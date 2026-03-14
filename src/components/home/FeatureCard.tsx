type FeatureCardProps = {
  icon: "sun" | "water" | "mountain" | "community" | "weather" | "remote";
  title: string;
  description: string;
};

function FeatureIcon({ icon }: { icon: FeatureCardProps["icon"] }) {
  const shared = "h-6 w-6";

  switch (icon) {
    case "sun":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8V5.2M12 18.8V21.2M21.2 12H18.8M5.2 12H2.8M18.4 5.6L16.7 7.3M7.3 16.7L5.6 18.4M18.4 18.4L16.7 16.7M7.3 7.3L5.6 5.6" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 14c1.8 0 1.8-1 3.6-1 1.8 0 1.8 1 3.6 1s1.8-1 3.6-1 1.8 1 3.6 1 1.8-1 3.6-1" />
          <path d="M3 18c1.8 0 1.8-1 3.6-1 1.8 0 1.8 1 3.6 1s1.8-1 3.6-1 1.8 1 3.6 1 1.8-1 3.6-1" />
          <path d="M3 10c1.8 0 1.8-1 3.6-1 1.8 0 1.8 1 3.6 1s1.8-1 3.6-1 1.8 1 3.6 1 1.8-1 3.6-1" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 19L10 8l4 5 2-3 5 9H3Z" />
          <path d="M10 8l1.6 2h1.6L14.7 8" />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="8" cy="9" r="2.6" />
          <circle cx="16.5" cy="8.5" r="2.1" />
          <path d="M3.8 18.5c.5-2.8 2.6-4.5 5.2-4.5s4.7 1.7 5.2 4.5" />
          <path d="M14.2 18c.4-1.9 1.9-3.1 3.8-3.1 1.5 0 2.7.7 3.4 2" />
        </svg>
      );
    case "weather":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M6 16.8a4.7 4.7 0 1 1 .9-9.3A5.8 5.8 0 0 1 18 9.2a3.9 3.9 0 1 1 .2 7.6H6Z" />
        </svg>
      );
    case "remote":
      return (
        <svg viewBox="0 0 24 24" className={shared} fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="5" width="16" height="11" rx="2" />
          <path d="M9 19h6M12 16v3M7.2 9.5a6.8 6.8 0 0 1 9.6 0M9.3 11.6a3.8 3.8 0 0 1 5.4 0" />
        </svg>
      );
  }
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-[1.4rem] border border-white/60 bg-white/90 p-5 shadow-[0_18px_38px_rgba(8,56,90,0.08)] backdrop-blur">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] text-[#0b6899]">
        <FeatureIcon icon={icon} />
      </div>
      <h3 className="mt-5 display-font text-[1.45rem] leading-none text-[#0a3555]">
        {title}
      </h3>
      <p className="mt-3 text-[0.98rem] leading-7 text-[#446783]">{description}</p>
    </article>
  );
}
