create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public)
values ('listing-media', 'listing-media', true)
on conflict (id) do update
set public = excluded.public;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  city text not null,
  region text,
  property_type text not null default 'Home',
  label text not null,
  price_label text not null,
  monthly_price_usd numeric(10, 2),
  summary text not null,
  description text,
  image_path text not null,
  bedrooms integer,
  bathrooms numeric(4, 1),
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists listings_featured_sort_idx
  on public.listings (is_published, is_featured, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists listings_set_updated_at on public.listings;

create trigger listings_set_updated_at
before update on public.listings
for each row
execute function public.set_updated_at();

alter table public.listings enable row level security;

drop policy if exists "Public can view published listings" on public.listings;

create policy "Public can view published listings"
on public.listings
for select
using (is_published = true);

insert into public.listings (
  slug,
  title,
  city,
  region,
  property_type,
  label,
  price_label,
  monthly_price_usd,
  summary,
  description,
  image_path,
  bedrooms,
  bathrooms,
  is_featured,
  is_published,
  sort_order
)
values
  (
    'beachfront-villa-san-juan-del-sur',
    'Beachfront Villa',
    'San Juan del Sur',
    null,
    'Villa',
    'Beachfront',
    'From $1,200/mo',
    1200.00,
    'Ocean views, breezy terraces, and easy access to surf, dining, and walkable beach living.',
    'A polished beachfront rental with open-air living, strong natural light, and easy access to restaurants, surf breaks, and long-term stay comforts.',
    '/rental-beachfront.svg',
    3,
    2.5,
    true,
    true,
    1
  ),
  (
    'colonial-house-granada',
    'Colonial House',
    'Granada',
    null,
    'Colonial House',
    'Historic Charm',
    'From $1,450/mo',
    1450.00,
    'Courtyard living with warm architecture, furnished interiors, and a central location near cafes and plazas.',
    'A character-rich home in Granada with furnished interiors, private outdoor space, and a layout that works well for couples, families, or longer stays.',
    '/rental-colonial.svg',
    3,
    2.0,
    true,
    true,
    2
  ),
  (
    'mountain-retreat-matagalpa-highlands',
    'Mountain Retreat',
    'Matagalpa Highlands',
    null,
    'Retreat',
    'Cool Climate',
    'From $980/mo',
    980.00,
    'Quiet, scenic stays surrounded by greenery, fresh air, and dramatic volcano and mountain views.',
    'A quiet mountain stay designed for slower living, cooler weather, and scenic views, with enough flexibility for work-from-home renters and long stays.',
    '/rental-mountain.svg',
    2,
    1.5,
    true,
    true,
    3
  )
on conflict (slug) do update
set
  title = excluded.title,
  city = excluded.city,
  region = excluded.region,
  property_type = excluded.property_type,
  label = excluded.label,
  price_label = excluded.price_label,
  monthly_price_usd = excluded.monthly_price_usd,
  summary = excluded.summary,
  description = excluded.description,
  image_path = excluded.image_path,
  bedrooms = excluded.bedrooms,
  bathrooms = excluded.bathrooms,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order;
