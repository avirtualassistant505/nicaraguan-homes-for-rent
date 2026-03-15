# TikTok Draft Upload Checklist

## Public site
- Homepage shows no public admin links.
- Listings and listing detail pages show no public admin links.
- Footer contains visible Privacy Policy and Terms of Service links.
- Contact information has no placeholder phone number.
- About, Contact, and Creator Tools pages are publicly reachable.

## Admin
- `/admin/login` requires the shared admin password.
- `/admin` shows the property list on the left and one selected property on the right.
- The TikTok panel appears for a selected listing.
- If TikTok env vars are missing, the panel explains what needs to be configured.

## TikTok draft flow
- TikTok OAuth redirects to `/api/auth/tiktok/callback`.
- A successful callback stores the encrypted access token and refresh token.
- A local video file can be uploaded and stored in `listing-videos`.
- A stored video can be reused for another draft attempt.
- A new draft upload creates a `tiktok_upload_jobs` row.
- Status polling updates the job status and guidance message.
- The admin is instructed to finish the post inside TikTok.
