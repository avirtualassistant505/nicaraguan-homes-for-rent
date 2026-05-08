import type { Metadata } from "next";
import type { AdminListing, FeaturedListing } from "@/lib/listings";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const SITE_URL = "https://www.nicaraguahomesforrent.net";
export const SITE_TITLE = "Nicaragua Homes For Rent";
export const DEFAULT_DESCRIPTION =
  "Browse Nicaragua homes for rent by city, rent, property type, and lifestyle. Find furnished houses, villas, and long-term rentals in Managua, Granada, San Juan del Sur, and more.";
export const DEFAULT_OG_IMAGE = "/hero-scene.svg";

export type SeoRentalPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  match: (listing: AdminListing) => boolean;
};

const cityKeywords = {
  managua: ["managua"],
  granada: ["granada"],
  "san-juan-del-sur": ["san juan del sur", "san juan"],
  leon: ["leon", "león"],
  rivas: ["rivas"],
  tola: ["tola"],
  masaya: ["masaya"],
  esteli: ["esteli", "estelí"],
  matagalpa: ["matagalpa"],
};

export const rentalSeoPages: SeoRentalPage[] = [
  {
    slug: "managua",
    title: "Houses For Rent In Managua, Nicaragua",
    h1: "Houses for rent in Managua, Nicaragua",
    description:
      "Browse Managua houses and long-term rentals by monthly rent, neighborhood, furnishing, video tours, and practical renter details.",
    intro:
      "Managua is usually the most practical Nicaragua rental search for renters who want city services, business access, shopping, medical options, and an easier landing spot for everyday life.",
    sections: [
      {
        title: "Who Managua rentals fit",
        body:
          "Managua works best for renters who care about convenience before scenery. It is the natural choice for work trips, relocation scouting, families that need services close by, and renters who want a larger supply of homes across different budgets.",
      },
      {
        title: "What to verify",
        body:
          "Before renting, verify exact neighborhood, road access, parking, security setup, water reliability, internet options, furnishings, and whether the listed monthly rent includes utilities or maintenance.",
      },
    ],
    faqs: [
      {
        question: "Are Managua rentals good for long-term stays?",
        answer:
          "Yes, Managua can be one of the most practical long-term bases in Nicaragua when access to services, shopping, and transport matters.",
      },
      {
        question: "What should I check before contacting a Managua rental?",
        answer:
          "Confirm rent, exact location, lease length, included furnishings, utilities, parking, and current condition before sending deposits or making plans.",
      },
    ],
    match: cityMatcher("managua"),
  },
  {
    slug: "granada",
    title: "Homes For Rent In Granada, Nicaragua",
    h1: "Homes for rent in Granada, Nicaragua",
    description:
      "Find Granada Nicaragua homes for rent, including furnished houses, colonial-style rentals, video tours, and long-stay options.",
    intro:
      "Granada is a strong search target for renters who want a historic city feel, walkable areas, restaurants, and a more established visitor and expat rhythm.",
    sections: [
      {
        title: "Why renters compare Granada",
        body:
          "Granada rentals often appeal to people who want character, city access, and a slower pace than Managua. The best listings make location, condition, ventilation, and outdoor space easy to evaluate.",
      },
      {
        title: "Listing details that matter",
        body:
          "Look closely at bedrooms, bathrooms, airflow, interior light, courtyard or patio space, security, parking, and whether the home is actually furnished for daily living.",
      },
    ],
    faqs: [
      {
        question: "Is Granada a good place to rent in Nicaragua?",
        answer:
          "Granada can be a good fit for renters who want a colonial city base with restaurants, services, and a more walkable lifestyle.",
      },
      {
        question: "Do Granada rental prices vary by location?",
        answer:
          "Yes. Rent can change meaningfully by proximity to central areas, condition, furnishings, outdoor space, and parking.",
      },
    ],
    match: cityMatcher("granada"),
  },
  {
    slug: "san-juan-del-sur",
    title: "San Juan Del Sur Homes For Rent",
    h1: "San Juan del Sur homes for rent",
    description:
      "Search San Juan del Sur homes, villas, and long-term rentals near Nicaragua's Pacific coast with practical renter details.",
    intro:
      "San Juan del Sur is usually searched by renters who want beach access, restaurants, surf-town energy, and a more lifestyle-driven rental base.",
    sections: [
      {
        title: "Beach-town rental tradeoffs",
        body:
          "A great San Juan del Sur rental balances access and livability. Beach proximity is useful, but renters should also check road access, noise, parking, internet, water, and seasonal pricing.",
      },
      {
        title: "How to compare listings",
        body:
          "Compare actual monthly rent, hill or beach location, included furnishings, AC, outdoor areas, views, security, and whether transport is practical without guessing from photos alone.",
      },
    ],
    faqs: [
      {
        question: "Are San Juan del Sur rentals mostly short-term?",
        answer:
          "Some are short-term, but long-stay homes and villas also appear. Always verify lease length and monthly pricing directly.",
      },
      {
        question: "What matters most in a beach rental?",
        answer:
          "Check road access, water reliability, ventilation, internet, parking, security, and what is included in the monthly rent.",
      },
    ],
    match: cityMatcher("san-juan-del-sur"),
  },
  ...(["leon", "rivas", "tola", "masaya", "esteli", "matagalpa"] as const).map((slug) =>
    genericCityPage(slug),
  ),
  {
    slug: "furnished-homes-nicaragua",
    title: "Furnished Homes For Rent In Nicaragua",
    h1: "Furnished homes for rent in Nicaragua",
    description:
      "Browse furnished Nicaragua homes for rent with monthly pricing, galleries, video tours, and practical long-stay renter details.",
    intro:
      "Furnished rentals can make a Nicaragua move much easier, but the word furnished can mean very different things from one listing to the next.",
    sections: [
      {
        title: "How to evaluate furnished rentals",
        body:
          "Look beyond the label and check beds, appliances, seating, kitchen setup, laundry, linens, work surfaces, AC, fans, and whether items shown in photos are included.",
      },
      {
        title: "Best fit",
        body:
          "Furnished homes are especially useful for relocation scouting, remote workers, retirees, and renters planning a multi-month stay before buying or committing long term.",
      },
    ],
    faqs: [
      {
        question: "Does furnished always include appliances?",
        answer:
          "Not always. Ask for an included-items list and confirm what stays in the home before signing or paying.",
      },
      {
        question: "Should I verify furniture condition?",
        answer:
          "Yes. Confirm the current condition of furniture, appliances, mattresses, AC, fans, and kitchen equipment.",
      },
    ],
    match: (listing) => listing.furnishing.toLowerCase().includes("furnished"),
  },
  {
    slug: "pet-friendly",
    title: "Pet Friendly Rentals In Nicaragua",
    h1: "Pet friendly rentals in Nicaragua",
    description:
      "Find pet-friendly Nicaragua rentals and homes where renters can verify pet rules, outdoor space, deposits, and lease requirements.",
    intro:
      "Pet-friendly rental searches need more verification than ordinary listings because rules can depend on pet size, breed, yard space, lease length, and owner approval.",
    sections: [
      {
        title: "Questions to ask",
        body:
          "Ask whether pets are allowed in writing, whether there is a pet deposit, whether yards or patios are enclosed, and whether nearby streets or neighbors make daily walks practical.",
      },
      {
        title: "Photos to review",
        body:
          "Look for outdoor space, floor materials, secure gates, shade, ventilation, and how close the home is to busy roads or shared areas.",
      },
    ],
    faqs: [
      {
        question: "Are pets allowed in most Nicaragua rentals?",
        answer:
          "Rules vary by owner and property. Always confirm pet approval, deposit, size limits, and lease language before committing.",
      },
      {
        question: "What makes a rental better for pets?",
        answer:
          "Secure outdoor space, durable floors, shade, ventilation, and safe street access are practical factors to verify.",
      },
    ],
    match: (listing) => listing.pet_friendly,
  },
  {
    slug: "beach-homes",
    title: "Beach Homes For Rent In Nicaragua",
    h1: "Beach homes for rent in Nicaragua",
    description:
      "Search Nicaragua beach homes for rent near Pacific coast towns with galleries, video tours, rent details, and verification notes.",
    intro:
      "Beach rentals are popular in Nicaragua, but the best choice depends on the balance between water access, road access, budget, internet, and daily services.",
    sections: [
      {
        title: "Beach rental checks",
        body:
          "Confirm whether the home is beachfront, beach-adjacent, or simply in a coastal region. Ask about road condition, water supply, security, internet, and seasonal price changes.",
      },
      {
        title: "Best fit",
        body:
          "Beach homes suit renters who prioritize outdoor life, surf access, views, and slower days, but they may require more planning for errands and transport.",
      },
    ],
    faqs: [
      {
        question: "Are all beach homes walkable to the water?",
        answer:
          "No. Verify actual distance, road condition, hills, gates, and whether access is public or private.",
      },
      {
        question: "Do beach rentals need extra maintenance checks?",
        answer:
          "Yes. Salt air and humidity can affect fixtures, appliances, paint, and AC, so current condition matters.",
      },
    ],
    match: textMatcher(["beach", "ocean", "surf", "coast", "playa", "san juan"]),
  },
  {
    slug: "long-term",
    title: "Long-Term Rentals In Nicaragua",
    h1: "Long-term rentals in Nicaragua",
    description:
      "Browse long-term Nicaragua rentals for relocation, remote work, retirement, and extended stays with monthly rent and listing details.",
    intro:
      "Long-term rentals need practical details: lease length, furnishings, utilities, internet, maintenance, parking, and what the monthly rent really includes.",
    sections: [
      {
        title: "How to compare long-term homes",
        body:
          "Start with total monthly cost, not headline rent alone. Ask about utilities, internet, water, security, maintenance, deposit, renewal terms, and included furniture.",
      },
      {
        title: "Who this search fits",
        body:
          "Long-term rentals are useful for relocation planning, retirement scouting, remote work, families testing a city, and renters who want stability before buying.",
      },
    ],
    faqs: [
      {
        question: "What lease length counts as long term?",
        answer:
          "Many renters treat three months or longer as long-stay, but each listing has its own lease rules and minimum term.",
      },
      {
        question: "Should I visit before renting long term?",
        answer:
          "Whenever possible, yes. Verify condition, neighborhood, noise, water, internet, and actual furnishings before committing.",
      },
    ],
    match: () => true,
  },
  {
    slug: "under-500",
    title: "Nicaragua Rentals Under $500 Per Month",
    h1: "Nicaragua rentals under $500 per month",
    description:
      "Browse Nicaragua homes and rentals under $500 per month with city, property type, photos, and verification notes.",
    intro:
      "Under-$500 rentals can be compelling in Nicaragua, but they need careful review for condition, location, utilities, and what is included.",
    sections: [
      {
        title: "What to expect",
        body:
          "Budget rentals may be simpler, farther from prime areas, less furnished, or require more verification. Photos, video, and a direct checklist help avoid surprises.",
      },
      {
        title: "Verification priorities",
        body:
          "Confirm current condition, exact rent currency, utilities, water, internet, transportation, security, and whether any visible repairs or furnishings are included.",
      },
    ],
    faqs: [
      {
        question: "Can you rent a house in Nicaragua under $500?",
        answer:
          "Sometimes, depending on city, condition, lease length, and amenities. Always verify the exact monthly rent and currency.",
      },
      {
        question: "Are cheaper rentals always worse?",
        answer:
          "No, but they usually require more careful checking around location, maintenance, furnishings, and included services.",
      },
    ],
    match: (listing) => listing.monthly_price_usd != null && listing.monthly_price_usd < 500,
  },
  {
    slug: "500-to-1000",
    title: "Nicaragua Rentals From $500 To $1,000 Per Month",
    h1: "Nicaragua rentals from $500 to $1,000 per month",
    description:
      "Compare Nicaragua rentals from $500 to $1,000 per month by city, property type, furnishings, video tours, and listing details.",
    intro:
      "The $500 to $1,000 range is where many Nicaragua renters start comparing practical homes with better space, location, or furnishings.",
    sections: [
      {
        title: "How to compare this rent range",
        body:
          "Look for the tradeoff behind the price: city access, size, outdoor space, condition, furnishings, AC, parking, and whether internet or utilities are included.",
      },
      {
        title: "Best fit",
        body:
          "This range can fit remote workers, couples, small families, and relocation scouts who want more comfort than the lowest-budget inventory.",
      },
    ],
    faqs: [
      {
        question: "Is $500 to $1,000 a realistic Nicaragua rental budget?",
        answer:
          "It can be, depending on city, amenities, and lease terms. Compare current listings and verify each property directly.",
      },
      {
        question: "What should this budget include?",
        answer:
          "It may include better location, more space, furnishings, parking, or AC, but inclusions vary and should be confirmed.",
      },
    ],
    match: (listing) =>
      listing.monthly_price_usd != null && listing.monthly_price_usd >= 500 && listing.monthly_price_usd <= 1000,
  },
  {
    slug: "expats",
    title: "Nicaragua Rentals For Expats",
    h1: "Nicaragua rentals for expats",
    description:
      "Browse Nicaragua rentals for expats, relocation scouting, remote work, retirement planning, and long-term stays.",
    intro:
      "Expats searching for rentals in Nicaragua usually need more than attractive photos. They need clear city context, monthly costs, services, and a verification process.",
    sections: [
      {
        title: "What expat renters should compare",
        body:
          "Compare cities, monthly rent, lease length, furnishings, internet, medical access, shopping, transport, security, and how easy it is to manage daily life from the property.",
      },
      {
        title: "Use listings as a shortlist",
        body:
          "The best workflow is to shortlist properties, ask clear questions, verify current availability and condition, then inspect or use trusted local help before committing.",
      },
    ],
    faqs: [
      {
        question: "Where do expats rent in Nicaragua?",
        answer:
          "Common searches include Managua, Granada, San Juan del Sur, Leon, Rivas, Tola, Masaya, Esteli, and Matagalpa, depending on lifestyle and services needed.",
      },
      {
        question: "What should expats verify before renting?",
        answer:
          "Verify lease terms, deposit, utilities, internet, exact location, transportation, security, furnishings, and current property condition.",
      },
    ],
    match: () => true,
  },
];

export const cityRentalPages = rentalSeoPages.filter((page) => page.slug in cityKeywords);

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_TITLE,
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function buildListingTitle(listing: AdminListing) {
  const rent = listing.monthly_price_usd
    ? `$${Math.round(listing.monthly_price_usd).toLocaleString()}/mo`
    : listing.price_label;
  const bedrooms = listing.bedrooms ? `${listing.bedrooms} Bedroom ` : "";
  const type = listing.property_type || "Home";
  return `${rent} ${bedrooms}${type} for Rent in ${listing.city}, Nicaragua`;
}

export function buildListingDescription(listing: AdminListing) {
  const rent = listing.monthly_price_usd
    ? `$${Math.round(listing.monthly_price_usd).toLocaleString()} per month`
    : listing.price_label;
  return `See this ${rent} ${listing.property_type.toLowerCase()} rental in ${listing.city}, Nicaragua with property photos, video tour when available, listing details, and contact options.`;
}

export function listingMetadata(listing: AdminListing): Metadata {
  const title = `${buildListingTitle(listing)} | ${SITE_TITLE}`;
  const description = buildListingDescription(listing);
  return pageMetadata({
    title,
    description,
    path: `/listings/${listing.slug}`,
    image: listing.image_path,
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    areaServed: {
      "@type": "Country",
      name: "Nicaragua",
    },
    sameAs: ["https://www.youtube.com/@nicaraguahomesforrent"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_TITLE,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/listings?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function itemListJsonLd(items: Array<{ name: string; url: string; image?: string; price?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      image: item.image ? absoluteUrl(item.image) : undefined,
      offers: item.price
        ? {
            "@type": "Offer",
            price: item.price.replace(/[^0-9.]/g, "") || undefined,
            priceCurrency: "USD",
          }
        : undefined,
    })),
  };
}

export function featuredItemsForJsonLd(listings: FeaturedListing[]) {
  return listings.map((listing) => ({
    name: listing.title,
    url: absoluteUrl(`/listings/${listing.slug}`),
    image: listing.image,
    price: listing.price,
  }));
}

export function listingJsonLd(listing: AdminListing, videoUrls: string[]) {
  const images = [listing.image_path, ...listing.gallery_images].filter(Boolean).map((image) => absoluteUrl(image));
  const payload: Record<string, object | string | number | string[] | undefined> = {
    "@context": "https://schema.org",
    "@type": listing.property_type.toLowerCase().includes("house") ? "House" : "Accommodation",
    name: buildListingTitle(listing),
    description: listing.description || listing.summary,
    url: absoluteUrl(`/listings/${listing.slug}`),
    image: images,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: listing.region || undefined,
      addressCountry: "NI",
    },
    numberOfBedrooms: listing.bedrooms ?? undefined,
    numberOfBathroomsTotal: listing.bathrooms ?? undefined,
    floorSize: listing.square_meters
      ? {
          "@type": "QuantitativeValue",
          value: listing.square_meters,
          unitCode: "MTK",
        }
      : undefined,
    amenityFeature: listing.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: listing.monthly_price_usd ?? undefined,
      priceCurrency: "USD",
      availability: listing.availability_status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: absoluteUrl(`/listings/${listing.slug}`),
    },
  };

  if (videoUrls.length > 0) {
    payload.video = videoUrls.map((url) => ({
      "@type": "VideoObject",
      name: `${listing.title} video tour`,
      description: buildListingDescription(listing),
      contentUrl: url,
      embedUrl: url.includes("youtube.com/watch")
        ? url.replace("watch?v=", "embed/")
        : url,
      uploadDate: listing.updated_at,
    }));
  }

  return payload;
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function cityMatcher(slug: keyof typeof cityKeywords) {
  return textMatcher(cityKeywords[slug]);
}

function textMatcher(keywords: string[]) {
  return (listing: AdminListing) => {
    const haystack = [
      listing.title,
      listing.city,
      listing.region,
      listing.neighborhood,
      listing.property_type,
      listing.label,
      listing.summary,
      listing.description,
      listing.amenities.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword));
  };
}

function genericCityPage(slug: keyof typeof cityKeywords): SeoRentalPage {
  const name = titleCase(slug.replace(/-/g, " "));
  return {
    slug,
    title: `Homes For Rent In ${name}, Nicaragua`,
    h1: `Homes for rent in ${name}, Nicaragua`,
    description: `Browse ${name} Nicaragua homes for rent with monthly pricing, property details, galleries, and practical long-term renter guidance.`,
    intro: `${name} is one of the Nicaragua rental markets worth comparing when you are shortlisting homes by city, rent, access, and lifestyle fit.`,
    sections: [
      {
        title: `How to compare ${name} rentals`,
        body:
          "Start with the monthly rent, then compare property type, furnishing, bedrooms, bathrooms, parking, road access, internet, water reliability, and how the location fits daily errands.",
      },
      {
        title: "Verification checklist",
        body:
          "Confirm availability, exact rent and currency, lease length, deposit, included utilities, current property condition, and whether all visible furnishings and appliances are included.",
      },
    ],
    faqs: [
      {
        question: `Can I find long-term rentals in ${name}?`,
        answer:
          "Inventory changes over time, so use current listings as a shortlist and verify lease terms directly before making plans.",
      },
      {
        question: `What should I ask before renting in ${name}?`,
        answer:
          "Ask about exact location, monthly cost, utilities, furnishings, internet, parking, water, security, and move-in timing.",
      },
    ],
    match: cityMatcher(slug),
  };
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
