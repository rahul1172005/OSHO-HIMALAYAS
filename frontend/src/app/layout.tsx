import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSHO Himalayas — Meditation Resort, Dharamshala",
  description:
    "You deserve a break. It's time for meditative holidays in the Himalayas. Discover active meditations, serene valley living, spring water, and conscious celebration in Dharamshala, Himachal.",
  keywords: [
    "OSHO Himalayas",
    "Meditation Resort Dharamshala",
    "Active Meditations",
    "Himalayan Retreat",
    "Dharamshala Himachal",
    "Meditation Holidays",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
