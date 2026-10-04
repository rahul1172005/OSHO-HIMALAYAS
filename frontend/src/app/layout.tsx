import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSHO Himalayas — Meditation Resort & Sanctuary, Dharamshala",
  description:
    "Experience meditative holidays in the Himalayas. All-inclusive meditation retreats, OSHO active meditations, mountain sanctuary accommodations, and organic dining near Dharamshala, India.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
