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

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  return (
    <>
      {/* MENU: APPEARS AFTER SCROLLING PAST FIRST SECTION */}
      <Header />

      <main>
        {/* SECTION 1: LEAD SECTION (KAYAL STYLE) */}
        <Hero />

        {/* SECTION 2: VIDEO REELS CAROUSEL (KAYAL STYLE) */}
        <ReelShowcase />

        {/* SECTION 3: PHOTO CAROUSEL (ELEATCEREAL STYLE) */}
        <PhotoCarousel />

        {/* SECTION 4: FIND OUR SCHEDULE (ELEATCEREAL STYLE) */}
        <ScheduleSection onSelectCourse={(title) => setSelectedCourse(title)} />

        {/* SECTION 5: VIDEO TESTIMONIALS (DUPLICATING SECTION 2 STYLE) */}
        <ReviewsSection />

        {/* SECTION 6: HOW TO REACH HERE */}
        <HowToReach />

        {/* SECTION 7: FAQS (ELEATCEREAL ACCORDION STYLE) */}
        <FaqSection />

        {/* SECTION 8: VIRTUAL CAMPUS TOUR 360° */}
        <VirtualTour />

        {/* SECTION 9: GET IN TOUCH (ZOHO EMBED FORM) */}
        <ContactSection prefilledCourseTitle={selectedCourse} />
      </main>

      {/* FLOATING BOTTOM BAR (ELEATCEREAL STYLE) */}
      <FloatingBar />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
