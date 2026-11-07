import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditation Courses — OSHO Himalayas",
  description: "Explore upcoming meditation courses and retreats at OSHO Himalayas, Dharamshala.",
};

export default function CoursesPage() {
  return (
    <LandingPage
      formSource="Meta Ads"
      testimonialVariant="domestic"
    />
  );
}
