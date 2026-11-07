import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover OSHO Himalayas",
  description: "Connect with OSHO Himalayas on Instagram and discover transformative meditation retreats.",
};

export default function DiscoverPage() {
  return (
    <LandingPage
      formSource="Insta"
      testimonialVariant="domestic"
    />
  );
}
