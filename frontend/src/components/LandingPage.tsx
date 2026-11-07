"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReelShowcase from "@/components/ReelShowcase";
import PhotoCarousel from "@/components/PhotoCarousel";
import ScheduleSection from "@/components/ScheduleSection";
import ReviewsSection from "@/components/ReviewsSection";
import HowToReach from "@/components/HowToReach";
import FaqSection from "@/components/FaqSection";
import VirtualTour from "@/components/VirtualTour";
import ContactSection from "@/components/ContactSection";
import FloatingBar from "@/components/FloatingBar";
import Footer from "@/components/Footer";
import {
  TESTIMONIAL_REVIEWS_INTERNATIONAL,
  TESTIMONIAL_REVIEWS_DOMESTIC,
} from "@/lib/landingData";

export interface LandingPageProps {
  formSource?: string;
  testimonialVariant?: "international" | "domestic";
}

export default function LandingPage({
  formSource = "International",
  testimonialVariant = "international",
}: LandingPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const reviews =
    testimonialVariant === "domestic"
      ? TESTIMONIAL_REVIEWS_DOMESTIC
      : TESTIMONIAL_REVIEWS_INTERNATIONAL;

  return (
    <>
      {/* MENU: APPEARS AFTER SCROLLING PAST FIRST SECTION */}
      <Header />

      <main>
        {/* SECTION 1: LEAD SECTION */}
        <Hero />

        {/* SECTION 2: VIDEO REELS CAROUSEL */}
        <ReelShowcase />

        {/* SECTION 3: PHOTO CAROUSEL */}
        <PhotoCarousel />

        {/* SECTION 4: FIND OUR SCHEDULE */}
        <ScheduleSection onSelectCourse={(title) => setSelectedCourse(title)} />

        {/* SECTION 5: VIDEO TESTIMONIALS */}
        <ReviewsSection reviews={reviews} />

        {/* SECTION 6: HOW TO REACH HERE */}
        <HowToReach />

        {/* SECTION 7: FAQS */}
        <FaqSection />

        {/* SECTION 8: VIRTUAL CAMPUS TOUR 360° */}
        <VirtualTour />

        {/* SECTION 9: GET IN TOUCH */}
        <ContactSection
          prefilledCourseTitle={selectedCourse}
          formSource={formSource}
        />
      </main>

      {/* FLOATING BOTTOM BAR */}
      <FloatingBar />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
