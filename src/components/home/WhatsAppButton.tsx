export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50500000000"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(180deg,#39d26e_0%,#17a74e_100%)] px-4 py-3 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(15,131,63,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,131,63,0.34)]"
      aria-label="Contact on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M19.1 4.9A9.8 9.8 0 0 0 3.7 16.8L2.5 21.5l4.8-1.2A9.8 9.8 0 1 0 19.1 4.9Zm-7 15.1a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 1 1 12.1 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.7-.6-1.1-1.3-1.3-1.5-.1-.2 0-.3.1-.5l.4-.4c.1-.1.1-.2.2-.3.1-.1.1-.3 0-.4l-.7-1.7c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.3c.1.2 1.5 2.3 3.7 3.2.5.2 1 .4 1.3.5.5.2 1 .2 1.3.1.4-.1 1.4-.6 1.5-1.2.2-.6.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      WhatsApp
    </a>
  );
}
