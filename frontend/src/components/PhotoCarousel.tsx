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

  const renderSocialCard = () => (
    <div className="photo-social-card">
      <div className="photo-social-inner">
        <div className="social-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
        <p className="social-cta-sub">Follow our journey</p>
        <h3 className="social-handle">@oshohimalayas</h3>
        <a
          href="https://www.instagram.com/oshohimalayas/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-profile-btn"
        >
          View Instagram &rarr;
        </a>
      </div>
    </div>
  );

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

      {/* TWO DISTINCT MARQUEE ROWS WITH DIFFERENT PHOTOS */}
      <div className="photo-marquee-wrapper">
        {/* ROW 1: Social Follow Card + First 12 Unique Photos */}
        <div
          className={`photo-marquee-row photo-marquee-row-1 ${isPaused ? "is-paused" : ""} ${
            direction === "reverse" ? "is-reverse" : "is-normal"
          }`}
        >
          <div className="photo-marquee-group">
            {renderSocialCard()}
            {GALLERY_PHOTOS_ROW_1.map((url, i) =>
              renderPhotoCard(url, `r1-a-${i}`, `Row 1 Photo ${i + 1}`)
            )}
          </div>
          <div className="photo-marquee-group" aria-hidden="true">
            {renderSocialCard()}
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
