import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import "./globals.css";

const titleFont = Lora({
  variable: "--font-title",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nicaraguan Homes For Rent",
  description: "Modern rentals in Managua, Granada, Leon, and San Juan del Sur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titleFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
