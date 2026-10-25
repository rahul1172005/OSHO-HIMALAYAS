"use client";

import { useState, useRef, useEffect } from "react";
import { TESTIMONIAL_REVIEWS, TestimonialReview } from "@/lib/landingData";

export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState<TestimonialReview | null>(null);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveReview(null);
      }
    };
    if (activeReview) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeReview]);

  return (
    <section className="section-reel-showcase section-reviews-showcase" id="reviews">
      <div className="container">
        {/* HEADER TEXT FROM LP */}
        <div className="reel-header text-center">
          <span className="reviews-kicker">Our reviews</span>
          <h2 className="reel-title">Why Meditators Love Us</h2>
          <div className="reviews-rating-badge">
            <span className="stars" aria-hidden="true" style={{ display: "inline-flex", gap: "2px", color: "var(--color-gold)" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </span>
            <span className="rating-text">4.8 stars out of 1,000+ Google reviews</span>
          </div>
        </div>

        {/* 4-COLUMN CAROUSEL DUPLICATING SECTION 2 */}
        <div className="reel-carousel-wrapper">
          <div className="reel-cards-track" ref={scrollRef}>
            {TESTIMONIAL_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="reel-card testimonial-card"
                onClick={() => setActiveReview(rev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveReview(rev);
                  }
                }}
                aria-label={`Watch testimonial by ${rev.name} from ${rev.location}`}
              >
                <div
                  className="reel-card-media"
                  style={{ backgroundImage: `url(${rev.thumbnail})` }}
                >
                  <div className="reel-card-overlay" />
                  <div className="reel-card-pill">
                    <span className="reel-play-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </span>
                    <span className="reel-pill-label">{rev.name}</span>
                  </div>

                  <div className="testimonial-card-meta">
                    <h3 className="testimonial-author-name">
                      {rev.name} from {rev.location}
                    </h3>
                    <p className="testimonial-author-quote">&ldquo;{rev.quote}&rdquo;</p>
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
              aria-label="Previous testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="reel-nav-btn next"
              onClick={scrollRight}
              aria-label="Next testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* POPUP MODAL IN 9:16 YOUTUBE VERTICAL FORMAT */}
      {activeReview && (
        <div
          className="reel-modal-backdrop"
          onClick={() => setActiveReview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReview.name} video review`}
        >
          <div className="reel-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="reel-modal-close-btn"
              onClick={() => setActiveReview(null)}
              aria-label="Close review video"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="reel-modal-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeReview.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                className="reel-iframe"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={`${activeReview.name} review`}
              />

              <div className="reel-modal-footer">
                <span className="reel-modal-title">
                  {activeReview.name} from {activeReview.location}
                </span>
                <p className="reel-modal-quote">&ldquo;{activeReview.quote}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
