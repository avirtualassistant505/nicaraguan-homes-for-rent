alter table public.listings
  add column if not exists neighborhood text,
  add column if not exists furnishing text not null default 'Furnished',
  add column if not exists availability_status text not null default 'available',
  add column if not exists min_lease_months integer,
  add column if not exists square_meters integer,
  add column if not exists parking_spaces integer,
  add column if not exists pet_friendly boolean not null default false,
  add column if not exists amenities text[] not null default '{}'::text[],
  add column if not exists gallery_images text[] not null default '{}'::text[],
  add column if not exists contact_name text,
  add column if not exists contact_phone text,
  add column if not exists contact_email text,
  add column if not exists whatsapp_url text;

update public.listings
set gallery_images = array[image_path]
where coalesce(array_length(gallery_images, 1), 0) = 0;

update public.listings
set
  neighborhood = case slug
    when 'beachfront-villa-san-juan-del-sur' then 'Playa Escameca'
    when 'colonial-house-granada' then 'Historic Center'
    when 'mountain-retreat-matagalpa-highlands' then 'Selva Negra area'
    else neighborhood
  end,
  furnishing = 'Furnished',
  availability_status = 'available',
  min_lease_months = case slug
    when 'beachfront-villa-san-juan-del-sur' then 3
    when 'colonial-house-granada' then 6
    when 'mountain-retreat-matagalpa-highlands' then 3
    else min_lease_months
  end,
  square_meters = case slug
    when 'beachfront-villa-san-juan-del-sur' then 220
    when 'colonial-house-granada' then 240
    when 'mountain-retreat-matagalpa-highlands' then 140
    else square_meters
  end,
  parking_spaces = case slug
    when 'beachfront-villa-san-juan-del-sur' then 2
    when 'colonial-house-granada' then 1
    when 'mountain-retreat-matagalpa-highlands' then 1
    else parking_spaces
  end,
  pet_friendly = case slug
    when 'beachfront-villa-san-juan-del-sur' then true
    when 'colonial-house-granada' then false
    when 'mountain-retreat-matagalpa-highlands' then true
    else pet_friendly
  end,
  amenities = case slug
    when 'beachfront-villa-san-juan-del-sur' then array['Ocean view', 'Pool', 'Furnished', 'Air conditioning', 'Wi-Fi', 'Parking']
    when 'colonial-house-granada' then array['Furnished', 'Wi-Fi', 'Laundry', 'Security', 'Parking']
    when 'mountain-retreat-matagalpa-highlands' then array['Furnished', 'Pet friendly', 'Wi-Fi', 'Laundry', 'Backup power']
    else amenities
  end,
  contact_name = coalesce(contact_name, 'Nicaragua Homes for Rent'),
  contact_phone = coalesce(contact_phone, '+505 0000 0000'),
  contact_email = coalesce(contact_email, 'nicahomesforrent@gmail.com'),
  whatsapp_url = coalesce(whatsapp_url, 'https://wa.me/50500000000');
