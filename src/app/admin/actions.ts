"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, requireAdminSession } from "@/lib/admin-auth";
import type { AdminListing } from "@/lib/listings";
import {
  deleteFromStorage,
  deleteSupabase,
  insertSupabase,
  updateSupabase,
  uploadToStorage,
} from "@/lib/supabase/server";

const STORAGE_BUCKET = "listing-media";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: FormDataEntryValue | null) {
  const raw = asString(value);
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function asBoolean(value: FormDataEntryValue | null) {
  return value === "on";
}

function parseTextList(value: string) {
  return [...new Set(value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean))];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getFileExtension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase();

  if (fromName && /^[a-z0-9]+$/.test(fromName)) {
    return fromName;
  }

  switch (file.type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/jpeg":
      return "jpg";
    default:
      return "bin";
  }
}

function getStorageObjectPath(url: string) {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return url.slice(index + marker.length);
}

function uniqueValues(values: (string | null | undefined)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

async function uploadFiles(slug: string, files: File[], folder: "hero" | "gallery") {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (!file.size) {
      continue;
    }

    const objectPath = `listings/${slug}/${folder}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${getFileExtension(file)}`;
    const publicUrl = await uploadToStorage(STORAGE_BUCKET, objectPath, file);
    uploadedUrls.push(publicUrl);
  }

  return uploadedUrls;
}

function buildListingPayload(formData: FormData, imagePath: string, galleryImages: string[]) {
  const title = asString(formData.get("title"));
  const city = asString(formData.get("city"));

  return {
    slug: slugify(asString(formData.get("slug")) || `${title}-${city}`),
    title,
    city,
    region: asString(formData.get("region")) || null,
    neighborhood: asString(formData.get("neighborhood")) || null,
    property_type: asString(formData.get("propertyType")) || "Home",
    furnishing: asString(formData.get("furnishing")) || "Furnished",
    availability_status: asString(formData.get("availabilityStatus")) || "available",
    label: asString(formData.get("label")) || "Featured",
    price_label: asString(formData.get("priceLabel")) || "Contact for pricing",
    monthly_price_usd: asNumber(formData.get("monthlyPriceUsd")),
    min_lease_months: asNumber(formData.get("minLeaseMonths")),
    square_meters: asNumber(formData.get("squareMeters")),
    parking_spaces: asNumber(formData.get("parkingSpaces")),
    pet_friendly: asBoolean(formData.get("petFriendly")),
    summary: asString(formData.get("summary")),
    description: asString(formData.get("description")) || null,
    image_path: imagePath,
    gallery_images: galleryImages,
    amenities: parseTextList(asString(formData.get("amenities"))),
    bedrooms: asNumber(formData.get("bedrooms")),
    bathrooms: asNumber(formData.get("bathrooms")),
    contact_name: asString(formData.get("contactName")) || null,
    contact_phone: asString(formData.get("contactPhone")) || null,
    contact_email: asString(formData.get("contactEmail")) || null,
    whatsapp_url: asString(formData.get("whatsappUrl")) || null,
    is_featured: asBoolean(formData.get("isFeatured")),
    is_published: asBoolean(formData.get("isPublished")),
    sort_order: asNumber(formData.get("sortOrder")) ?? 0,
  };
}

async function prepareListingMedia(formData: FormData) {
  const title = asString(formData.get("title"));
  const city = asString(formData.get("city"));
  const draftSlug = slugify(asString(formData.get("slug")) || `${title}-${city}`);
  const imageFile = formData.get("imageFile");
  const galleryFiles = formData
    .getAll("galleryFiles")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const previousImagePath = asString(formData.get("existingImagePath"));
  const existingGalleryImages = parseTextList(asString(formData.get("existingGalleryImages")));
  const manualGalleryImages = parseTextList(asString(formData.get("galleryImages")));
  let finalImagePath = asString(formData.get("imagePath")) || previousImagePath || "/hero-scene.svg";

  if (imageFile instanceof File && imageFile.size > 0) {
    const [uploadedHero] = await uploadFiles(draftSlug, [imageFile], "hero");

    if (uploadedHero) {
      finalImagePath = uploadedHero;
    }
  }

  const uploadedGalleryImages = await uploadFiles(draftSlug, galleryFiles, "gallery");
  const finalGalleryImages = uniqueValues([
    finalImagePath,
    ...manualGalleryImages,
    ...uploadedGalleryImages,
  ]);

  const previousStoredObjects = uniqueValues([
    getStorageObjectPath(previousImagePath),
    ...existingGalleryImages.map(getStorageObjectPath),
  ]);
  const nextStoredObjects = uniqueValues([
    getStorageObjectPath(finalImagePath),
    ...finalGalleryImages.map(getStorageObjectPath),
  ]);
  const removedStoredObjects = previousStoredObjects.filter(
    (objectPath) => !nextStoredObjects.includes(objectPath),
  );

  return {
    draftSlug,
    finalImagePath,
    finalGalleryImages,
    removedStoredObjects,
  };
}

function refreshListingViews() {
  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/admin");
}

export async function loginAction(formData: FormData) {
  const password = asString(formData.get("password"));
  const success = await createAdminSession(password);

  if (!success) {
    redirect("/admin/login?error=invalid-password");
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createListingAction(formData: FormData) {
  await requireAdminSession();

  const title = asString(formData.get("title"));
  const city = asString(formData.get("city"));

  if (!title || !city) {
    redirect("/admin?error=missing-title-or-city");
  }

  const media = await prepareListingMedia(formData);

  const createdListings = await insertSupabase<AdminListing[]>(
    "listings",
    buildListingPayload(formData, media.finalImagePath, media.finalGalleryImages),
  );

  refreshListingViews();
  const createdListing = createdListings[0];
  redirect(createdListing ? `/admin?listing=${encodeURIComponent(createdListing.id)}` : "/admin");
}

export async function updateListingAction(formData: FormData) {
  await requireAdminSession();

  const id = asString(formData.get("id"));
  const title = asString(formData.get("title"));
  const city = asString(formData.get("city"));

  if (!id || !title || !city) {
    redirect("/admin?error=missing-required-fields");
  }

  const media = await prepareListingMedia(formData);

  await updateSupabase<AdminListing[]>(
    "listings",
    `id=eq.${encodeURIComponent(id)}`,
    buildListingPayload(formData, media.finalImagePath, media.finalGalleryImages),
  );

  if (media.removedStoredObjects.length > 0) {
    await deleteFromStorage(STORAGE_BUCKET, media.removedStoredObjects);
  }

  refreshListingViews();
  redirect(`/admin?listing=${encodeURIComponent(id)}`);
}

export async function deleteListingAction(formData: FormData) {
  await requireAdminSession();

  const id = asString(formData.get("id"));
  const existingImagePath = asString(formData.get("existingImagePath"));
  const existingGalleryImages = parseTextList(asString(formData.get("existingGalleryImages")));

  if (!id) {
    redirect("/admin?error=missing-listing-id");
  }

  const storedObjects = uniqueValues([
    getStorageObjectPath(existingImagePath),
    ...existingGalleryImages.map(getStorageObjectPath),
  ]);

  if (storedObjects.length > 0) {
    await deleteFromStorage(STORAGE_BUCKET, storedObjects);
  }

  await deleteSupabase("listings", `id=eq.${encodeURIComponent(id)}`);

  refreshListingViews();
  redirect("/admin");
}
