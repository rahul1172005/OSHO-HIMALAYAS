"use client";

import { useState, useRef, useEffect } from "react";
import { REEL_ITEMS, ReelItem } from "@/lib/landingData";

export default function ReelShowcase() {
  const [activeItem, setActiveItem] = useState<ReelItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <section className="section-reel-showcase" id="about">
      <div className="container">
        {/* HEADER TEXT */}
        <div className="reel-header text-center">
          <h2 className="reel-title">An OSHO Meditation Resort in the Himalayas</h2>
          <p className="reel-description">
            Step away from the city noise and come to this valley where you can breathe in the pure
            air, swim in the fresh spring water, and dive deep into meditation.
          </p>
        </div>

        {/* 4-COLUMN CAROUSEL OF PORTRAIT REEL CARDS */}
        <div className="reel-carousel-wrapper">
          <div className="reel-cards-track" ref={scrollRef}>
            {REEL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="reel-card"
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                aria-label={`Watch ${item.title} video`}
              >
                <div
                  className="reel-card-media"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                >
                  <div className="reel-card-overlay" />
                  <div className="reel-card-pill">
                    <span className="reel-play-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </span>
                    <span className="reel-pill-label">{item.buttonLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ARROW NAVIGATION */}
          <div className="reel-nav-controls">
            <button
              className="reel-nav-btn prev"
              onClick={scrollLeft}
              aria-label="Previous videos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="reel-nav-btn next"
              onClick={scrollRight}
              aria-label="Next videos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* POPUP MODAL IN INSTAGRAM REEL DIMENSIONS (9:16) */}
      {activeItem && (
        <div
          className="reel-modal-backdrop"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} video modal`}
        >
          <div className="reel-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="reel-modal-close-btn"
              onClick={() => setActiveItem(null)}
              aria-label="Close video"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="reel-modal-frame">
              {activeItem.videoType === "drive" && (
                <iframe
                  src={activeItem.embedUrl}
                  className="reel-iframe"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={activeItem.title}
                />
              )}

              {activeItem.videoType === "instagram" && (
                <iframe
                  src={activeItem.embedUrl}
                  className="reel-iframe"
                  allowTransparency
                  allow="encrypted-media"
                  title={activeItem.title}
                />
              )}

              <div className="reel-modal-footer">
                <span className="reel-modal-title">{activeItem.title}</span>
                <a
                  href={activeItem.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reel-external-link"
                >
                  Watch source &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
