"use client";

export interface HeroProps {
  /**
   * Horizontal offset (X-axis) for both screens (e.g. "0px", "10px", "-20px", "2%")
   * Positive moves right, negative moves left.
   */
  x?: string;
  /**
   * Vertical offset (Y-axis) for both screens (e.g. "0px", "15px", "-30px", "3vh")
   * Positive moves down, negative moves up.
   */
  y?: string;
  /**
   * Desktop-specific horizontal offset (X-axis)
   */
  desktopX?: string;
  /**
   * Desktop-specific vertical offset (Y-axis)
   */
  desktopY?: string;
  /**
   * Mobile-specific horizontal offset (X-axis)
   */
  mobileX?: string;
  /**
   * Mobile-specific vertical offset (Y-axis)
   */
  mobileY?: string;
}

export default function Hero({
  x = "0px",
  y = "0px",
  desktopX = "0px",
  desktopY = "-10px",
  mobileX = "0px",
  mobileY = "0px",
}: HeroProps) {
  return (
    <section
      className="hero-section"
      id="hero"
      style={
        {
          "--hero-text-x": x,
          "--hero-text-y": y,
          "--hero-text-x-desktop": desktopX,
          "--hero-text-y-desktop": desktopY,
          "--hero-text-x-mobile": mobileX,
          "--hero-text-y-mobile": mobileY,
        } as React.CSSProperties
      }
    >
      {/* RESPONSIVE HERO IMAGES (NATURAL PHOTO - NO FILTER / NO OVERLAY) */}
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
      </div>

      {/* HERO SECTION WORDING: POSITIONED IN THE UPPER SKY REGION WITH X, Y PARAMETERS */}
      <div className="container hero-content-wrap">
        <div className="hero-content">
          <h1 className="hero-headline">

          </h1>
        </div>
      </div>
    </section>
  );
}
