import type { Metadata } from "next";
import { Berkshire_Swash, Bree_Serif, Nunito_Sans } from "next/font/google";
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
  title: "Nicaraguan Homes For Rent",
  description:
    "Premium Nicaragua rental marketplace homepage for beachfront villas, city homes, mountain retreats, and long-term stays.",
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
