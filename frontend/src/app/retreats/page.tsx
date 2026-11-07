import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retreats — OSHO Himalayas",
  description: "Join international meditation retreats at OSHO Himalayas, Dharamshala.",
};

export default function RetreatsPage() {
  return (
    <LandingPage
      formSource="International"
      testimonialVariant="international"
    />
  );
}
