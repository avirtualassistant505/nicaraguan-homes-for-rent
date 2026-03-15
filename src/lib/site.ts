export const SITE_NAME = "Nicaraguan Homes For Rent";
export const SITE_EMAIL = "info@nicaraguanhomesforrent.com";
export const SITE_TAGLINE =
  "Curated long-stay homes across Nicaragua for relocation, remote work, and tropical living.";

function getDigits(value: string | null | undefined) {
  return (value || "").replace(/\D/g, "");
}

export function isUsablePhone(value: string | null | undefined) {
  const digits = getDigits(value);

  if (!digits) {
    return false;
  }

  if (digits.length < 7) {
    return false;
  }

  return !/^0+$/.test(digits) && !digits.includes("0000");
}

export function isUsableWhatsAppUrl(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  return isUsablePhone(value);
}

export function formatFileSize(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) {
    return "Unknown size";
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
