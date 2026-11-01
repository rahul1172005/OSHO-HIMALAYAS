"use client";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* RESPONSIVE HERO IMAGES (DESKTOP & MOBILE VERSIONS) */}
      <div className="hero-image-container" aria-hidden="true">
        {/* Desktop Landscape Photo */}
        <img
          src="/desktop-hero.jpg"
          alt="OSHO Himalayas Meditation Resort Dharamshala"
          className="hero-image-element hero-image-desktop"
        />

        {/* Mobile Vertical Frame Photo */}
        <img
          src="/mobile-hero.jpg"
          alt="OSHO Himalayas Meditators in the Himalayan Valley"
          className="hero-image-element hero-image-mobile"
        />

        {/* Soft atmospheric gradient overlay for clean contrast and legibility */}
        <div className="hero-image-overlay" />
      </div>

      {/* LEAD SECTION CONTENT: ONLY THE TWO SPECIFIED LINES */}
      <div className="container hero-content-wrap">
        <div className="hero-content">
          <h1 className="hero-headline">
            A meditation resort for the modern man &amp; woman like you.
          </h1>
          <p className="hero-location-text">
            Dharamshala, India
          </p>
        </div>
      </div>
    </section>
  );
}
