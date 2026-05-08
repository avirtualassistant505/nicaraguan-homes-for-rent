#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

const LISTING_MEDIA_BUCKET = "listing-media";
const LISTING_VIDEO_BUCKET = "listing-videos";

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const raw = readFileSync(filePath, "utf8");

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    dryRun: false,
    envFile: ".env.local",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      parsed[key] = args[index + 1];
      index += 1;
    }
  }

  if (!parsed.listingOutput) {
    throw new Error("Missing required --listing-output path.");
  }

  return parsed;
}

function readJson(path, fallback = null) {
  if (!existsSync(path)) {
    return fallback;
  }

  const raw = readFileSync(path);
  const encodings = ["utf8", "utf16le"];

  for (const encoding of encodings) {
    try {
      let text = raw.toString(encoding);

      if (text.charCodeAt(0) === 0xfeff) {
        text = text.slice(1);
      }

      text = text.replace(/\u0000/g, "");
      return JSON.parse(text);
    } catch {
      // Try the next common Windows artifact encoding.
    }
  }

  return JSON.parse(raw.toString("utf8").replace(/\u0000/g, ""));
}

function readText(path, fallback = "") {
  if (!existsSync(path)) {
    return fallback;
  }

  return readFileSync(path, "utf8");
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function parseListingText(text) {
  const getLine = (label) => {
    const match = text.match(new RegExp(`^${label}:\\s*(.+)$`, "mi"));
    return match ? match[1].trim() : "";
  };

  const descriptionMatch = text.match(/Description:\s*([\s\S]*?)\n\nListing Details:/i);

  return {
    title: text.split(/\r?\n/).find(Boolean)?.trim() || "Nicaragua rental listing",
    location: getLine("Address"),
    price: getLine("Price"),
    propertyId: getLine("Property ID"),
    sourceUrl: getLine("Source URL"),
    propertyType: getLine("- Property Type").replace(/^-\s*Property Type:\s*/i, "") || "House",
    description: descriptionMatch ? descriptionMatch[1].trim() : "",
  };
}

function contentTypeForPath(path) {
  switch (extname(path).toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

function requireSupabaseEnv() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!projectUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Configure them in the environment or .env.local before publishing to the website.",
    );
  }

  return {
    projectUrl: projectUrl.replace(/\/+$/, ""),
    serviceRoleKey,
  };
}

function supabaseHeaders(serviceRoleKey, extra = {}) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    ...extra,
  };
}

async function uploadFile({ projectUrl, serviceRoleKey }, bucket, objectPath, filePath) {
  const body = readFileSync(filePath);
  const response = await fetch(`${projectUrl}/storage/v1/object/${bucket}/${objectPath}`, {
    method: "POST",
    headers: supabaseHeaders(serviceRoleKey, {
      "Content-Type": contentTypeForPath(filePath),
      "x-upsert": "true",
    }),
    body,
  });

  if (!response.ok) {
    throw new Error(`Supabase storage upload failed for ${objectPath}: ${response.status} ${await response.text()}`);
  }

  return `${projectUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}

async function upsertRows({ projectUrl, serviceRoleKey }, table, rows, onConflict) {
  const response = await fetch(`${projectUrl}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`, {
    method: "POST",
    headers: supabaseHeaders(serviceRoleKey, {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    }),
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    throw new Error(`Supabase upsert failed for ${table}: ${response.status} ${await response.text()}`);
  }

  return await response.json();
}

function pickUploadResult(listingOutput, fileNames) {
  for (const fileName of fileNames) {
    const result = readJson(resolve(listingOutput, fileName));

    if (result?.url && result?.videoId) {
      return result;
    }
  }

  return null;
}

function buildListingPayload({ listingOutput, uploadedPhotos, listingFacts, metadata, directorPlan }) {
  const listingId = listingFacts.propertyId || basename(listingOutput);
  const city = metadata?.location?.city || listingFacts.location.split(",")[0]?.trim() || "Nicaragua";
  const region = metadata?.location?.region || "Nicaragua";
  const monthlyPrice = metadata?.eligibility?.parsed_price_usd || null;
  const conceptTitle = directorPlan?.concept?.selected_title || "";
  const title = listingFacts.title === "Casa en Renta" ? `${listingFacts.title} in ${city}` : listingFacts.title;
  const slug = slugify(`${title}-${city}-${listingId}`);
  const sourceDescription = metadata?.description || listingFacts.description;
  const summaryParts = [
    monthlyPrice ? `$${monthlyPrice}/mo ${metadata?.propertyType || listingFacts.propertyType || "house"} rental in ${city}.` : `${city} rental home.`,
    sourceDescription,
  ].filter(Boolean);

  return {
    slug,
    title,
    city,
    region,
    neighborhood: metadata?.location?.neighborhood || null,
    property_type: metadata?.propertyType || listingFacts.propertyType || "House",
    furnishing: "Contact for details",
    availability_status: "available",
    label: monthlyPrice ? `$${monthlyPrice}/mo` : "New rental",
    price_label: monthlyPrice ? `$${monthlyPrice}/mo` : listingFacts.price || "Contact for pricing",
    monthly_price_usd: monthlyPrice,
    min_lease_months: null,
    square_meters: null,
    parking_spaces: null,
    pet_friendly: false,
    summary: summaryParts.join(" ").slice(0, 280),
    description: [
      conceptTitle ? `Video concept: ${conceptTitle}` : "",
      sourceDescription,
      "Photos are regenerated reference recreations from the source listing images and should be verified in person before renting.",
      listingFacts.sourceUrl ? `Source listing: ${listingFacts.sourceUrl}` : "",
    ].filter(Boolean).join("\n\n"),
    image_path: uploadedPhotos[0],
    gallery_images: uploadedPhotos,
    amenities: [],
    bedrooms: null,
    bathrooms: null,
    contact_name: "Nicaragua Homes for Rent",
    contact_phone: null,
    contact_email: "nicahomesforrent@gmail.com",
    whatsapp_url: null,
    is_featured: true,
    is_published: true,
    sort_order: 0,
  };
}

function getSelectedVisuals(manifest) {
  const entries = Array.isArray(manifest?.entries) ? manifest.entries : [];

  return entries
    .filter((entry) => entry?.selected_long_form || entry?.selected_shorts)
    .map((entry) => entry.final_selected_visual_path || entry.imagegen_output_path)
    .filter(Boolean);
}

function buildVideoRows(listingId, listingOutput) {
  const longForm = pickUploadResult(listingOutput, [
    "youtube-upload-result.json",
    "youtube-upload-result-corrected.json",
    "youtube-upload-result-final.json",
  ]);
  const shorts = pickUploadResult(listingOutput, [
    "youtube-shorts-upload-result.json",
    "youtube-shorts-upload-result-corrected.json",
    "youtube-shorts-upload-result-final.json",
  ]);
  const rows = [];

  if (longForm) {
    rows.push({
      listing_id: listingId,
      file_name: "YouTube walkthrough",
      video_url: longForm.url,
      storage_path: `youtube/${basename(listingOutput)}/long-form-${longForm.videoId}`,
      mime_type: "text/uri-list",
      size_bytes: 0,
      duration_seconds: null,
      status: longForm.privacyStatus ? `youtube-${longForm.privacyStatus}` : "youtube",
    });
  }

  if (shorts) {
    rows.push({
      listing_id: listingId,
      file_name: "YouTube Shorts tour",
      video_url: shorts.url,
      storage_path: `youtube/${basename(listingOutput)}/shorts-${shorts.videoId}`,
      mime_type: "text/uri-list",
      size_bytes: 0,
      duration_seconds: null,
      status: shorts.privacyStatus ? `youtube-${shorts.privacyStatus}` : "youtube",
    });
  }

  return rows;
}

async function main() {
  const args = parseArgs();
  const listingOutput = resolve(args.listingOutput);

  loadDotEnv(resolve(args.envFile));

  const listingFacts = parseListingText(readText(resolve(listingOutput, "source", "listing.txt")));
  const metadata = readJson(resolve(listingOutput, "source", "metadata.json"), {});
  const manifest = readJson(resolve(listingOutput, "source", "visual-manifest.json"), {});
  const directorPlan = readJson(resolve(listingOutput, "director-package", "director-plan.json"), {});
  const selectedVisuals = getSelectedVisuals(manifest);

  if (selectedVisuals.length === 0) {
    throw new Error("No selected regenerated visuals found in source/visual-manifest.json.");
  }

  if (args.dryRun) {
    console.log(JSON.stringify({
      ok: true,
      dryRun: true,
      listingOutput,
      listingId: listingFacts.propertyId || basename(listingOutput),
      selectedVisualCount: selectedVisuals.length,
      youtubeVideos: buildVideoRows("dry-run-listing-id", listingOutput).map((row) => row.video_url),
    }, null, 2));
    return;
  }

  const supabase = requireSupabaseEnv();
  const listingId = listingFacts.propertyId || basename(listingOutput);
  const slugPreview = slugify(`${listingFacts.title}-${metadata?.location?.city || "nicaragua"}-${listingId}`);
  const uploadedPhotos = [];

  for (let index = 0; index < selectedVisuals.length; index += 1) {
    const filePath = selectedVisuals[index];
    const objectPath = `listings/${slugPreview}/automation-${String(index + 1).padStart(2, "0")}-${basename(filePath)}`;
    uploadedPhotos.push(await uploadFile(supabase, LISTING_MEDIA_BUCKET, objectPath, filePath));
  }

  const [listing] = await upsertRows(
    supabase,
    "listings",
    [buildListingPayload({ listingOutput, uploadedPhotos, listingFacts, metadata, directorPlan })],
    "slug",
  );
  const videoRows = buildVideoRows(listing.id, listingOutput);
  const videos = videoRows.length > 0 ? await upsertRows(supabase, "listing_videos", videoRows, "storage_path") : [];
  const listingUrl = `${process.env.APP_BASE_URL || "https://www.nicaraguahomesforrent.net"}/listings/${listing.slug}`;
  const result = {
    ok: true,
    listingId: listing.id,
    listingSlug: listing.slug,
    listingUrl,
    uploadedPhotoCount: uploadedPhotos.length,
    videoCount: videos.length,
    photoBucket: LISTING_MEDIA_BUCKET,
    videoBucket: LISTING_VIDEO_BUCKET,
  };

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
