import type { Metadata } from "next";
import { Berkshire_Swash, Bree_Serif, Nunito_Sans } from "next/font/google";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_TITLE, SITE_URL, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const brandFont = Berkshire_Swash({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
});

const displayFont = Bree_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nicaragua Homes For Rent | Long-Term Houses, Villas & Furnished Rentals",
    template: `%s | ${SITE_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Nicaragua Homes For Rent",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Nicaragua homes and rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicaragua Homes For Rent",
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandFont.variable} ${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
