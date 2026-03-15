update public.listings
set
  contact_name = coalesce(nullif(contact_name, ''), 'Nicaragua Homes for Rent'),
  contact_phone = case
    when contact_phone is null or btrim(contact_phone) = '' or regexp_replace(contact_phone, '\D', '', 'g') like '%0000%'
      then '2049052234'
    else contact_phone
  end,
  contact_email = case
    when contact_email is null or btrim(contact_email) = '' or lower(contact_email) = 'info@nicaraguanhomesforrent.com'
      then 'nicahomesforrent@gmail.com'
    else contact_email
  end,
  whatsapp_url = case
    when whatsapp_url is null
      or btrim(whatsapp_url) = ''
      or whatsapp_url = 'https://wa.me/50500000000'
      then 'https://wa.me/12049052234'
    else whatsapp_url
  end;
