alter table public.listings
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists canonical_slug text,
  add column if not exists city_landing_page text,
  add column if not exists rent_bucket text,
  add column if not exists property_summary_120 text,
  add column if not exists property_description_500 text,
  add column if not exists verification_notes text,
  add column if not exists photo_alt_text text[] not null default '{}'::text[],
  add column if not exists video_title text,
  add column if not exists video_description text,
  add column if not exists source_last_seen_at timestamptz;

create index if not exists listings_city_landing_page_idx
  on public.listings (city_landing_page)
  where is_published = true;

create index if not exists listings_rent_bucket_idx
  on public.listings (rent_bucket)
  where is_published = true;
