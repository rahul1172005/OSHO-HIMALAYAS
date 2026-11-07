import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Meditation Programs — OSHO Himalayas",
  description: "Find meditation events, festivals, and deep-dive retreats at OSHO Himalayas, Dharamshala.",
};

export default function EventsPage() {
  return (
    <LandingPage
      formSource="Google Search"
      testimonialVariant="domestic"
    />
  );
}
