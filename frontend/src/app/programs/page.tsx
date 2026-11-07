import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs — OSHO Himalayas",
  description: "Transformative meditation retreats and wellness programs at OSHO Himalayas, Dharamshala.",
};

export default function ProgramsPage() {
  return (
    <LandingPage
      formSource="Google PMax"
      testimonialVariant="domestic"
    />
  );
}
