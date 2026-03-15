import Link from "next/link";

export function WhatsAppButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(180deg,#39d26e_0%,#17a74e_100%)] px-4 py-3 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(15,131,63,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,131,63,0.34)]"
      aria-label="Start a rental inquiry"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 3.2 3.8 7.4v5.7c0 4.4 2.8 8.6 8.2 10.5 5.4-1.9 8.2-6.1 8.2-10.5V7.4L12 3.2Zm0 2.2 5.8 2.9v4.8c0 3.4-2.1 6.7-5.8 8.3-3.7-1.6-5.8-4.9-5.8-8.3V8.3L12 5.4Zm-1 4v3.6H8.2v2H11V19h2v-4h2.8v-2H13V9.4h-2Z" />
      </svg>
      Start Inquiry
    </Link>
  );
}
