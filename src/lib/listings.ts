import { querySupabase } from "@/lib/supabase/server";

export type ListingAmenity =
  | "Air conditioning"
  | "Ocean view"
  | "Pool"
  | "Furnished"
  | "Pet friendly"
  | "Parking"
  | "Wi-Fi"
  | "Laundry"
  | "Backup power"
  | "Security";

export type FeaturedListing = {
  slug: string;
  title: string;
  image: string;
  location: string;
  label: string;
  price: string;
  details: string;
};

export type AdminListing = {
  id: string;
  slug: string;
  title: string;
  city: string;
  region: string | null;
  neighborhood: string | null;
  property_type: string;
  furnishing: string;
  availability_status: string;
  label: string;
  price_label: string;
  monthly_price_usd: number | null;
  min_lease_months: number | null;
  square_meters: number | null;
  parking_spaces: number | null;
  pet_friendly: boolean;
  summary: string;
  description: string | null;
  image_path: string;
  gallery_images: string[];
  amenities: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  whatsapp_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ListingFilters = {
  q?: string;
  location?: string;
  propertyType?: string;
  maxPrice?: string;
  pets?: string;
};

export type ListingFilterOptions = {
  locations: string[];
  propertyTypes: string[];
};

export const defaultAmenities: ListingAmenity[] = [
  "Air conditioning",
  "Ocean view",
  "Pool",
  "Furnished",
  "Pet friendly",
  "Parking",
  "Wi-Fi",
  "Laundry",
  "Backup power",
  "Security",
];

type FeaturedListingRow = Pick<
  AdminListing,
  | "slug"
  | "title"
  | "city"
  | "region"
  | "label"
  | "price_label"
  | "summary"
  | "image_path"
>;

const adminListingSelect =
  "id,slug,title,city,region,neighborhood,property_type,furnishing,availability_status,label,price_label,monthly_price_usd,min_lease_months,square_meters,parking_spaces,pet_friendly,summary,description,image_path,gallery_images,amenities,bedrooms,bathrooms,contact_name,contact_phone,contact_email,whatsapp_url,is_featured,is_published,sort_order,created_at,updated_at";

export const fallbackFeaturedRentals: FeaturedListing[] = [
  {
    slug: "beachfront-villa-san-juan-del-sur",
    title: "Beachfront Villa",
    image: "/rental-beachfront.svg",
    location: "San Juan del Sur",
    label: "Beachfront",
    price: "From $1,200/mo",
    details:
      "Ocean views, breezy terraces, and easy access to surf, dining, and walkable beach living.",
  },
  {
    slug: "colonial-house-granada",
    title: "Colonial House",
    image: "/rental-colonial.svg",
    location: "Granada",
    label: "Historic Charm",
    price: "From $1,450/mo",
    details:
      "Courtyard living with warm architecture, furnished interiors, and a central location near cafes and plazas.",
  },
  {
    slug: "mountain-retreat-matagalpa-highlands",
    title: "Mountain Retreat",
    image: "/rental-mountain.svg",
    location: "Matagalpa Highlands",
    label: "Cool Climate",
    price: "From $980/mo",
    details:
      "Quiet, scenic stays surrounded by greenery, fresh air, and dramatic volcano and mountain views.",
  },
];

function mapFeaturedListingRow(listing: FeaturedListingRow): FeaturedListing {
  return {
    slug: listing.slug,
    title: listing.title,
    image: listing.image_path,
    location: [listing.city, listing.region].filter(Boolean).join(", "),
    label: listing.label,
    price: listing.price_label,
    details: listing.summary,
  };
}

function normalizeArray(value: string[] | null | undefined) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function normalizeListing(listing: AdminListing): AdminListing {
  return {
    ...listing,
    gallery_images: normalizeArray(listing.gallery_images),
    amenities: normalizeArray(listing.amenities),
  };
}

function matchesFilters(listing: AdminListing, filters: ListingFilters) {
  const keyword = (filters.q || "").trim().toLowerCase();
  const location = (filters.location || "").trim().toLowerCase();
  const propertyType = (filters.propertyType || "").trim().toLowerCase();
  const maxPrice = Number(filters.maxPrice || "");
  const requirePets = filters.pets === "true";

  if (keyword) {
    const haystack = [
      listing.title,
      listing.city,
      listing.region,
      listing.neighborhood,
      listing.summary,
      listing.description,
      listing.property_type,
      listing.amenities.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(keyword)) {
      return false;
    }
  }

  if (location) {
    const locationFields = [listing.city, listing.region, listing.neighborhood]
      .filter((value): value is string => Boolean(value))
      .map((value) => value.toLowerCase());

    if (!locationFields.some((value) => value === location)) {
      return false;
    }
  }

  if (propertyType && listing.property_type.toLowerCase() !== propertyType) {
    return false;
  }

  if (Number.isFinite(maxPrice) && listing.monthly_price_usd != null && listing.monthly_price_usd > maxPrice) {
    return false;
  }

  if (requirePets && !listing.pet_friendly) {
    return false;
  }

  return true;
}

function getFilterOptions(listings: AdminListing[]): ListingFilterOptions {
  return {
    locations: [
      ...new Set(listings.map((listing) => listing.city).filter((value): value is string => Boolean(value))),
    ].sort(),
    propertyTypes: [
      ...new Set(listings.map((listing) => listing.property_type).filter((value): value is string => Boolean(value))),
    ].sort(),
  };
}

export async function getFeaturedListings() {
  try {
    const data = await querySupabase<FeaturedListingRow[]>(
      "listings?select=slug,title,city,region,label,price_label,summary,image_path&is_featured=eq.true&is_published=eq.true&order=sort_order.asc&limit=6",
    );

    if (!data || data.length === 0) {
      return {
        listings: fallbackFeaturedRentals,
        source: "fallback" as const,
      };
    }

    return {
      listings: data.map(mapFeaturedListingRow),
      source: "database" as const,
    };
  } catch (error) {
    console.error("Failed to load featured listings from Supabase.", error);

    return {
      listings: fallbackFeaturedRentals,
      source: "fallback" as const,
    };
  }
}

export async function getAdminListings() {
  try {
    const listings = await querySupabase<AdminListing[]>(
      `listings?select=${adminListingSelect}&order=sort_order.asc,updated_at.desc`,
    );

    return {
      listings: listings.map(normalizeListing),
      error: null,
    };
  } catch (error) {
    console.error("Failed to load admin listings from Supabase.", error);

    return {
      listings: [] as AdminListing[],
      error:
        error instanceof Error
          ? error.message
          : "The listings table is not available yet.",
    };
  }
}

export async function getPublishedListings(filters: ListingFilters = {}) {
  try {
    const allListings = await querySupabase<AdminListing[]>(
      `listings?select=${adminListingSelect}&is_published=eq.true&order=is_featured.desc,sort_order.asc,updated_at.desc`,
    );

    const normalized = allListings.map(normalizeListing);
    const filtered = normalized.filter((listing) => matchesFilters(listing, filters));

    return {
      listings: filtered,
      totalPublished: normalized.length,
      filterOptions: getFilterOptions(normalized),
      error: null,
    };
  } catch (error) {
    console.error("Failed to load published listings from Supabase.", error);

    return {
      listings: [] as AdminListing[],
      totalPublished: 0,
      filterOptions: {
        locations: [] as string[],
        propertyTypes: [] as string[],
      },
      error:
        error instanceof Error
          ? error.message
          : "Published listings are currently unavailable.",
    };
  }
}

export async function getPublishedListingBySlug(slug: string) {
  try {
    const listings = await querySupabase<AdminListing[]>(
      `listings?select=${adminListingSelect}&slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&limit=1`,
    );

    return listings[0] ? normalizeListing(listings[0]) : null;
  } catch (error) {
    console.error(`Failed to load published listing "${slug}" from Supabase.`, error);
    return null;
  }
}
