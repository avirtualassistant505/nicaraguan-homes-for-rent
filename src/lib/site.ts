export const SITE_NAME = "Nicaraguan Homes For Rent";
export const SITE_EMAIL = "nicahomesforrent@gmail.com";
export const SITE_TAGLINE =
  "Curated long-stay homes across Nicaragua for relocation, remote work, and tropical living.";

export function formatFileSize(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) {
    return "Unknown size";
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
