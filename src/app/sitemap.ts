import type { MetadataRoute } from "next";
import { getPublishedListingSlugs } from "@/lib/listings";
import { SITE_URL, rentalSeoPages } from "@/lib/seo";

const staticRoutes = [
  "",
  "/listings",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const listingSlugs = await getPublishedListingSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/listings" ? ("daily" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/listings" ? 0.9 : 0.6,
    })),
    ...rentalSeoPages.map((page) => ({
      url: `${SITE_URL}/rentals/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page.slug === "managua" || page.slug === "granada" || page.slug === "san-juan-del-sur" ? 0.85 : 0.75,
    })),
    ...listingSlugs.map((listing) => ({
      url: `${SITE_URL}/listings/${listing.slug}`,
      lastModified: new Date(listing.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
