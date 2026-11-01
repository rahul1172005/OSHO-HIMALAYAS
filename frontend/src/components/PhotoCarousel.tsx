"use client";

import { useState, useRef, useEffect } from "react";
import { GALLERY_PHOTOS_ROW_1, GALLERY_PHOTOS_ROW_2 } from "@/lib/landingData";

export default function PhotoCarousel() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollLeft = () => {
    if (row1Ref.current) {
      row1Ref.current.scrollBy({ left: -320, behavior: "smooth" });
    }
    if (row2Ref.current) {
      row2Ref.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (row1Ref.current) {
      row1Ref.current.scrollBy({ left: 320, behavior: "smooth" });
    }
    if (row2Ref.current) {
      row2Ref.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  const handleWheel = () => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  const handleScrollRow1 = () => {
    const r1 = row1Ref.current;
    if (!r1) return;
    const half1 = r1.scrollWidth / 2;
    if (half1 > 0 && r1.scrollLeft >= half1) {
      r1.scrollLeft -= half1;
    }
  };

  const handleScrollRow2 = () => {
    const r2 = row2Ref.current;
    if (!r2) return;
    const half2 = r2.scrollWidth / 2;
    if (half2 > 0 && r2.scrollLeft >= half2) {
      r2.scrollLeft -= half2;
    }
  };

  // Continuous smooth auto-scroll drift with seamless loop wrap-around
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      const r1 = row1Ref.current;
      const r2 = row2Ref.current;

      if (!isPaused && !isInteracting.current) {
        const speed = 25; // px per second
        const move = (speed * Math.min(dt, 50)) / 1000;

        if (r1) {
          r1.scrollLeft += move;
        }

        if (r2) {
          r2.scrollLeft += move;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [isPaused]);

  const renderPhotoCard = (photoUrl: string, key: string, label: string) => (
    <div
      key={key}
      className="photo-card"
      onClick={() => setSelectedPhoto(photoUrl)}
      role="button"
      tabIndex={0}
      aria-label={`View sanctuary photo ${label}`}
    >
      <img
        src={photoUrl}
        alt={`OSHO Himalayas sanctuary moment ${label}`}
        loading="lazy"
        className="photo-card-img"
      />
      <div className="photo-card-hover-overlay">
        <span className="photo-zoom-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </span>
      </div>
    </div>
  );

  return (
    <section className="section-photo-carousel" id="gallery">
      {/* INSTAGRAM / COMMUNITY HEADER */}
      <div className="container photo-carousel-header">
        <div className="photo-carousel-brand">
          <span className="photo-carousel-tag">Meet, meditate, celebrate</span>
          <h2 className="photo-carousel-title">It’s time for meditative holidays</h2>
          <p className="photo-carousel-sub">
            Step away from the city noise and come to this valley where you can breathe in the pure
            air, swim in the fresh spring water, and dive deep into meditation.
          </p>
        </div>

        {/* FUNCTIONAL ARROW BUTTONS THAT ACTUALLY MOVE THE CARDS */}
        <div className="photo-nav-arrows">
          <button
            type="button"
            onClick={scrollLeft}
            className="carousel-arrow-btn"
            aria-label="Move photos left"
            title="Move left"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={togglePause}
            className={`carousel-arrow-btn ${isPaused ? "paused-btn" : ""}`}
            aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="carousel-arrow-btn"
            aria-label="Move photos right"
            title="Move right"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* TWO SCROLLABLE & SWIPEABLE PHOTO TRACKS WITH SEAMLESS AUTO-SCROLL LOOP */}
      <div className="photo-marquee-wrapper">
        {/* ROW 1 */}
        <div
          className="photo-marquee-row"
          ref={row1Ref}
          onScroll={handleScrollRow1}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onWheel={handleWheel}
          onMouseEnter={() => {
            isInteracting.current = true;
          }}
          onMouseLeave={() => {
            isInteracting.current = false;
          }}
        >
          {GALLERY_PHOTOS_ROW_1.map((url, i) =>
            renderPhotoCard(url, `r1-a-${i}`, `Row 1 Photo ${i + 1}`)
          )}
          {GALLERY_PHOTOS_ROW_1.map((url, i) =>
            renderPhotoCard(url, `r1-b-${i}`, `Row 1 Photo ${i + 1} clone`)
          )}
        </div>

        {/* ROW 2 */}
        <div
          className="photo-marquee-row"
          ref={row2Ref}
          onScroll={handleScrollRow2}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onWheel={handleWheel}
          onMouseEnter={() => {
            isInteracting.current = true;
          }}
          onMouseLeave={() => {
            isInteracting.current = false;
          }}
        >
          {GALLERY_PHOTOS_ROW_2.map((url, i) =>
            renderPhotoCard(url, `r2-a-${i}`, `Row 2 Photo ${i + 1}`)
          )}
          {GALLERY_PHOTOS_ROW_2.map((url, i) =>
            renderPhotoCard(url, `r2-b-${i}`, `Row 2 Photo ${i + 1} clone`)
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP MODAL */}
      {selectedPhoto && (
        <div
          className="photo-lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="photo-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
            >
              &times;
            </button>
            <img
              src={selectedPhoto}
              alt="OSHO Himalayas Sanctuary high-resolution moment"
              className="photo-lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  );
}
