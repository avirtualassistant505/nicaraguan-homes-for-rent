import type { AdminListing } from "@/lib/listings";
import { defaultAmenities } from "@/lib/listings";

type AdminListingFormProps = {
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (formData: FormData) => Promise<void>;
  listing?: AdminListing;
};

function FieldLabel({
  htmlFor,
  label,
}: {
  htmlFor: string;
  label: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#18435f]">
      {label}
    </label>
  );
}

function TextInput({
  id,
  name,
  defaultValue,
  placeholder,
  required = false,
  type = "text",
  step,
}: {
  id: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
  step?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      step={step}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      required={required}
      className="h-12 w-full rounded-2xl border border-[#cfe0ea] px-4 text-sm text-[#173d58] outline-none transition focus:border-[#ef7c11] focus:ring-4 focus:ring-[#ef7c11]/15"
    />
  );
}

function SelectInput({
  id,
  name,
  defaultValue,
  options,
}: {
  id: string;
  name: string;
  defaultValue?: string | null;
  options: string[];
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue || options[0]}
      className="h-12 w-full rounded-2xl border border-[#cfe0ea] px-4 text-sm text-[#173d58] outline-none transition focus:border-[#ef7c11] focus:ring-4 focus:ring-[#ef7c11]/15"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function TextArea({
  id,
  name,
  defaultValue,
  rows,
  placeholder,
  required = false,
}: {
  id: string;
  name: string;
  defaultValue?: string | null;
  rows: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      id={id}
      name={name}
      defaultValue={defaultValue || ""}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-[1.25rem] border border-[#cfe0ea] px-4 py-3 text-sm leading-6 text-[#173d58] outline-none transition focus:border-[#ef7c11] focus:ring-4 focus:ring-[#ef7c11]/15"
    />
  );
}

export function AdminListingForm({
  action,
  deleteAction,
  listing,
}: AdminListingFormProps) {
  const formId = listing?.id || "new-listing";
  const title = listing ? "Edit listing" : "Add a new listing";
  const galleryImages = listing?.gallery_images.join("\n") || "";
  const amenities = listing?.amenities.join("\n") || defaultAmenities.join("\n");

  return (
    <article className="rounded-[1.75rem] border border-[#d8e5ee] bg-white p-6 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="display-font text-[2rem] leading-none text-[#0c3553]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#597387]">
            {listing
              ? "Update copy, gallery, amenities, and contact details in one place."
              : "Create a listing record that works for the public website, the admin, and future Codex edits."}
          </p>
        </div>
        {listing ? (
          <span className="rounded-full bg-[#e7f6ff] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0e638f]">
            {listing.is_published ? "Published" : "Draft"}
          </span>
        ) : null}
      </div>

      <form action={action} encType="multipart/form-data" className="grid gap-5">
        {listing ? <input type="hidden" name="id" value={listing.id} /> : null}
        <input type="hidden" name="existingImagePath" value={listing?.image_path || ""} />
        <input
          type="hidden"
          name="existingGalleryImages"
          value={listing?.gallery_images.join("\n") || ""}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <FieldLabel htmlFor={`title-${formId}`} label="Title" />
            <TextInput
              id={`title-${formId}`}
              name="title"
              defaultValue={listing?.title}
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor={`slug-${formId}`} label="Slug" />
            <TextInput
              id={`slug-${formId}`}
              name="slug"
              defaultValue={listing?.slug}
              placeholder="auto-generated-if-empty"
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <div>
            <FieldLabel htmlFor={`city-${formId}`} label="City" />
            <TextInput id={`city-${formId}`} name="city" defaultValue={listing?.city} required />
          </div>
          <div>
            <FieldLabel htmlFor={`region-${formId}`} label="Region" />
            <TextInput id={`region-${formId}`} name="region" defaultValue={listing?.region} />
          </div>
          <div>
            <FieldLabel htmlFor={`neighborhood-${formId}`} label="Neighborhood" />
            <TextInput
              id={`neighborhood-${formId}`}
              name="neighborhood"
              defaultValue={listing?.neighborhood}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`propertyType-${formId}`} label="Property type" />
            <TextInput
              id={`propertyType-${formId}`}
              name="propertyType"
              defaultValue={listing?.property_type || "Home"}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <div>
            <FieldLabel htmlFor={`furnishing-${formId}`} label="Furnishing" />
            <SelectInput
              id={`furnishing-${formId}`}
              name="furnishing"
              defaultValue={listing?.furnishing}
              options={["Furnished", "Semi-furnished", "Unfurnished"]}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`availabilityStatus-${formId}`} label="Availability" />
            <SelectInput
              id={`availabilityStatus-${formId}`}
              name="availabilityStatus"
              defaultValue={listing?.availability_status}
              options={["available", "reserved", "rented", "coming-soon"]}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`label-${formId}`} label="Badge label" />
            <TextInput id={`label-${formId}`} name="label" defaultValue={listing?.label || "Featured"} />
          </div>
          <div>
            <FieldLabel htmlFor={`sortOrder-${formId}`} label="Sort order" />
            <TextInput
              id={`sortOrder-${formId}`}
              name="sortOrder"
              type="number"
              defaultValue={listing?.sort_order ?? 0}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <div>
            <FieldLabel htmlFor={`priceLabel-${formId}`} label="Price label" />
            <TextInput
              id={`priceLabel-${formId}`}
              name="priceLabel"
              defaultValue={listing?.price_label}
              placeholder="From $1,200/mo"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`monthlyPriceUsd-${formId}`} label="Monthly price (USD)" />
            <TextInput
              id={`monthlyPriceUsd-${formId}`}
              name="monthlyPriceUsd"
              type="number"
              step="0.01"
              defaultValue={listing?.monthly_price_usd}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`minLeaseMonths-${formId}`} label="Min lease (months)" />
            <TextInput
              id={`minLeaseMonths-${formId}`}
              name="minLeaseMonths"
              type="number"
              defaultValue={listing?.min_lease_months}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`bedrooms-${formId}`} label="Bedrooms" />
            <TextInput
              id={`bedrooms-${formId}`}
              name="bedrooms"
              type="number"
              defaultValue={listing?.bedrooms}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`bathrooms-${formId}`} label="Bathrooms" />
            <TextInput
              id={`bathrooms-${formId}`}
              name="bathrooms"
              type="number"
              step="0.5"
              defaultValue={listing?.bathrooms}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <FieldLabel htmlFor={`squareMeters-${formId}`} label="Size (m²)" />
            <TextInput
              id={`squareMeters-${formId}`}
              name="squareMeters"
              type="number"
              defaultValue={listing?.square_meters}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`parkingSpaces-${formId}`} label="Parking spaces" />
            <TextInput
              id={`parkingSpaces-${formId}`}
              name="parkingSpaces"
              type="number"
              defaultValue={listing?.parking_spaces}
            />
          </div>
          <label className="mt-7 flex items-center gap-3 rounded-2xl border border-[#dbe8ef] bg-[#f8fcff] px-4 py-3 text-sm font-semibold text-[#173d58]">
            <input type="checkbox" name="petFriendly" defaultChecked={listing?.pet_friendly ?? false} />
            Pet friendly
          </label>
        </div>

        <div>
          <FieldLabel htmlFor={`summary-${formId}`} label="Summary" />
          <TextArea
            id={`summary-${formId}`}
            name="summary"
            defaultValue={listing?.summary}
            rows={3}
            required
          />
        </div>

        <div>
          <FieldLabel htmlFor={`description-${formId}`} label="Full description" />
          <TextArea
            id={`description-${formId}`}
            name="description"
            defaultValue={listing?.description}
            rows={5}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <FieldLabel htmlFor={`imagePath-${formId}`} label="Primary image URL or path" />
            <TextInput
              id={`imagePath-${formId}`}
              name="imagePath"
              defaultValue={listing?.image_path || "/hero-scene.svg"}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`imageFile-${formId}`} label="Upload primary image" />
            <input
              id={`imageFile-${formId}`}
              name="imageFile"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="block h-12 w-full rounded-2xl border border-dashed border-[#9fc4d8] bg-[#f8fcff] px-3 py-3 text-sm text-[#173d58]"
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <FieldLabel htmlFor={`galleryImages-${formId}`} label="Gallery image URLs" />
            <TextArea
              id={`galleryImages-${formId}`}
              name="galleryImages"
              defaultValue={galleryImages}
              rows={5}
              placeholder="One URL per line"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`galleryFiles-${formId}`} label="Upload gallery images" />
            <input
              id={`galleryFiles-${formId}`}
              name="galleryFiles"
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="block min-h-24 w-full rounded-2xl border border-dashed border-[#9fc4d8] bg-[#f8fcff] px-3 py-3 text-sm text-[#173d58]"
            />
            <p className="mt-3 text-xs leading-5 text-[#597387]">
              Add one or more files here. They will upload to Supabase Storage and be merged into the gallery list.
            </p>
          </div>
        </div>

        <div>
          <FieldLabel htmlFor={`amenities-${formId}`} label="Amenities" />
          <TextArea
            id={`amenities-${formId}`}
            name="amenities"
            defaultValue={amenities}
            rows={6}
            placeholder="One amenity per line"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <div>
            <FieldLabel htmlFor={`contactName-${formId}`} label="Contact name" />
            <TextInput
              id={`contactName-${formId}`}
              name="contactName"
              defaultValue={listing?.contact_name}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`contactPhone-${formId}`} label="Contact phone" />
            <TextInput
              id={`contactPhone-${formId}`}
              name="contactPhone"
              defaultValue={listing?.contact_phone}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`contactEmail-${formId}`} label="Contact email" />
            <TextInput
              id={`contactEmail-${formId}`}
              name="contactEmail"
              type="email"
              defaultValue={listing?.contact_email}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`whatsappUrl-${formId}`} label="WhatsApp link" />
            <TextInput
              id={`whatsappUrl-${formId}`}
              name="whatsappUrl"
              defaultValue={listing?.whatsapp_url}
            />
          </div>
        </div>

        {listing?.image_path ? (
          <div className="space-y-4 overflow-hidden rounded-[1.5rem] border border-[#dce9f0] bg-[#f8fcff] p-4">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0f699b]">
                Current primary image
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.image_path}
                alt={listing.title}
                className="h-56 w-full rounded-[1rem] object-cover"
              />
            </div>

            {listing.gallery_images.length > 0 ? (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0f699b]">
                  Gallery preview
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {listing.gallery_images.slice(0, 6).map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image}
                      src={image}
                      alt={listing.title}
                      className="h-28 w-full rounded-[1rem] object-cover"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-3">
          <label className="flex items-center gap-3 rounded-2xl border border-[#dbe8ef] bg-[#f8fcff] px-4 py-3 text-sm font-semibold text-[#173d58]">
            <input type="checkbox" name="isFeatured" defaultChecked={listing?.is_featured ?? true} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-[#dbe8ef] bg-[#f8fcff] px-4 py-3 text-sm font-semibold text-[#173d58]">
            <input type="checkbox" name="isPublished" defaultChecked={listing?.is_published ?? false} />
            Published
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_14px_28px_rgba(176,92,0,0.24)] transition hover:-translate-y-0.5"
          >
            {listing ? "Save changes" : "Create listing"}
          </button>
          {listing && deleteAction ? (
            <button
              formAction={deleteAction}
              className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#8f2c21] transition hover:border-[#e2a7a0] hover:bg-[#fff3f1]"
            >
              Delete listing
            </button>
          ) : null}
        </div>
      </form>
    </article>
  );
}
