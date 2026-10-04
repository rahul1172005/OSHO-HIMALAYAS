"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Philosophy from "@/components/Philosophy";
import CoursesSection from "@/components/CoursesSection";
import AccommodationSection from "@/components/AccommodationSection";
import ScheduleSection from "@/components/ScheduleSection";
import ReviewsSection from "@/components/ReviewsSection";
import TravelSection from "@/components/TravelSection";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<string>("");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Philosophy />
        <CoursesSection onSelectCourseForEnquiry={(id) => setSelectedCourseForEnquiry(id)} />
        <AccommodationSection />
        <ScheduleSection />
        <ReviewsSection />
        <TravelSection />
        <GallerySection />
        <FaqSection />
        <EnquirySection prefilledCourseId={selectedCourseForEnquiry} />
      </main>
      <Footer />
    </>
  );
}
