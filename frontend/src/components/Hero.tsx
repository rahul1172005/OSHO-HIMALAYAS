"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTextReady, setMobileTextReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mobile text appears after 6 seconds delay because video has intro text
    const timer = setTimeout(() => {
      setMobileTextReady(true);
    }, 6000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* BACKGROUND VIDEO (DESKTOP & MOBILE VERSIONS) */}
      <div className="hero-video-container" aria-hidden="true">
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video-element hero-video-desktop"
        >
          <source src="/herobg_main.mp4" type="video/mp4" />
          <source src="/herobg.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video-element hero-video-mobile"
        >
          <source src="/herobg_mobile.mp4" type="video/mp4" />
          <source src="/herobg.mp4" type="video/mp4" />
        </video>

        {/* Soft atmospheric gradient overlay */}
        <div className="hero-video-overlay" />
      </div>

      {/* LEAD SECTION CONTENT */}
      <div className="container hero-content-wrap">
        <div
          className={`hero-content ${
            isMobile ? (mobileTextReady ? "mobile-revealed" : "mobile-delayed") : "desktop-revealed"
          }`}
        >
          {/* Brand Name Styled in Poppins: OSHO (Golden) Himalayas (Blue) */}
          <div className="hero-brand" aria-label="OSHO Himalayas">
            <span className="hero-brand-osho">OSHO</span>
            <span className="hero-brand-himalayas">Himalayas</span>
          </div>

          {/* Headline & Taglines */}
          <h1 className="hero-headline">You deserve a break</h1>

          <p className="hero-subheadline">
            It&apos;s time for meditative holidays in the Himalayas
          </p>

          <p className="hero-location-text">Dharamshala, Himachal</p>

          {/* CTA Button */}
          <div className="hero-actions">
            <a href="#contact-us" className="btn btn-hero-cta">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
