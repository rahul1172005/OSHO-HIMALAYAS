"use client";

import { useState } from "react";
import { GALLERY_PHOTOS_ROW_1, GALLERY_PHOTOS_ROW_2 } from "@/lib/landingData";

export default function PhotoCarousel() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleDirection = (dir: "normal" | "reverse") => {
    setDirection(dir);
    setIsPaused(false);
  };

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
            strokeWidth="2"
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

        {/* PROPERLY DESIGNED & ALIGNED ARROW BUTTONS */}
        <div className="photo-nav-arrows">
          <button
            type="button"
            onClick={() => handleDirection("reverse")}
            className={`carousel-arrow-btn ${direction === "reverse" && !isPaused ? "active-arrow" : ""}`}
            aria-label="Scroll gallery left"
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
            onClick={() => handleDirection("normal")}
            className={`carousel-arrow-btn ${direction === "normal" && !isPaused ? "active-arrow" : ""}`}
            aria-label="Scroll gallery right"
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

      {/* TWO DISTINCT MARQUEE ROWS WITH PURE SANCTUARY PHOTOS */}
      <div className="photo-marquee-wrapper">
        {/* ROW 1: First 12 Unique Photos */}
        <div
          className={`photo-marquee-row photo-marquee-row-1 ${isPaused ? "is-paused" : ""} ${
            direction === "reverse" ? "is-reverse" : "is-normal"
          }`}
        >
          <div className="photo-marquee-group">
            {GALLERY_PHOTOS_ROW_1.map((url, i) =>
              renderPhotoCard(url, `r1-a-${i}`, `Row 1 Photo ${i + 1}`)
            )}
          </div>
          <div className="photo-marquee-group" aria-hidden="true">
            {GALLERY_PHOTOS_ROW_1.map((url, i) =>
              renderPhotoCard(url, `r1-b-${i}`, `Row 1 Photo ${i + 1}`)
            )}
          </div>
        </div>

        {/* ROW 2: 12 Completely Different Unique Photos */}
        <div
          className={`photo-marquee-row photo-marquee-row-2 ${isPaused ? "is-paused" : ""} ${
            direction === "reverse" ? "is-reverse" : "is-normal"
          }`}
        >
          <div className="photo-marquee-group">
            {GALLERY_PHOTOS_ROW_2.map((url, i) =>
              renderPhotoCard(url, `r2-a-${i}`, `Row 2 Photo ${i + 1}`)
            )}
          </div>
          <div className="photo-marquee-group" aria-hidden="true">
            {GALLERY_PHOTOS_ROW_2.map((url, i) =>
              renderPhotoCard(url, `r2-b-${i}`, `Row 2 Photo ${i + 1}`)
            )}
          </div>
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
