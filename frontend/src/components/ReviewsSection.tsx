"use client";

import { useState, useRef } from "react";
import { TESTIMONIAL_REVIEWS } from "@/lib/landingData";

export default function ReviewsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

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

  const togglePlay = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (playingId === id) {
      const currentVideo = videoRefs.current[id];
      if (currentVideo) {
        currentVideo.pause();
      }
      setPlayingId(null);
    } else {
      // Pause previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }

      // Play selected video
      const targetVideo = videoRefs.current[id];
      if (targetVideo) {
        targetVideo.currentTime = 0;
        targetVideo.play().catch((err) => {
          console.warn("Video playback was interrupted or restricted:", err);
        });
      }
      setPlayingId(id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <section className="section-reel-showcase section-reviews-showcase" id="reviews">
      <div className="container">
        {/* HEADER TEXT */}
        <div className="reel-header text-center">
          <span className="reviews-kicker">Our reviews</span>
          <h2 className="reel-title">Why Meditators Love Us</h2>
          <div className="reviews-rating-badge">
            <span
              className="stars"
              aria-hidden="true"
              style={{ display: "inline-flex", gap: "2px", color: "var(--color-gold)" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </span>
            <span className="rating-text">4.8 stars out of 1,000+ Google reviews</span>
          </div>
        </div>

        {/* 4-COLUMN CAROUSEL OF PORTRAIT REEL CARDS */}
        <div className="reel-carousel-wrapper">
          <div className="reel-cards-track" ref={scrollRef}>
            {TESTIMONIAL_REVIEWS.map((rev) => {
              const isPlaying = playingId === rev.id;

              return (
                <div
                  key={rev.id}
                  className={`reel-card testimonial-reel-card ${isPlaying ? "is-playing" : ""}`}
                  onClick={(e) => togglePlay(rev.id, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      togglePlay(rev.id);
                    }
                  }}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${rev.name} video review`}
                >
                  <div
                    className="reel-card-media"
                    style={{ backgroundImage: `url(${rev.thumbnail})` }}
                  >
                    {/* HTML5 Native Video Player */}
                    <video
                      ref={(el) => {
                        videoRefs.current[rev.id] = el;
                      }}
                      src={rev.videoSrc}
                      className="reel-card-video"
                      playsInline
                      preload="metadata"
                      muted={isMuted}
                      loop
                      onEnded={() => setPlayingId(null)}
                    />

                    {/* Gradient Overlay */}
                    <div className={`reel-card-overlay ${isPlaying ? "playing" : ""}`} />

                    {/* Sound Control for active card */}
                    {isPlaying && (
                      <div className="reel-card-top-controls" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="reel-sound-btn"
                          onClick={toggleMute}
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 5L6 9H2v6h4l5 4V5z" />
                              <line x1="23" y1="9" x2="17" y2="15" />
                              <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 5L6 9H2v6h4l5 4V5z" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Testimonial Quote & Info Overlay */}
                    <div className={`testimonial-card-meta ${isPlaying ? "playing" : ""}`}>
                      <h3 className="testimonial-author-name">
                        {rev.name}
                        <span className="testimonial-author-country"> · {rev.location}</span>
                      </h3>
                      <p className="testimonial-author-quote">&ldquo;{rev.quote}&rdquo;</p>
                    </div>

                    {/* Play / Pause Pill Button */}
                    <button
                      type="button"
                      className={`reel-card-pill ${isPlaying ? "playing" : ""}`}
                      onClick={(e) => togglePlay(rev.id, e)}
                      aria-label={`${isPlaying ? "Pause" : "Play"} review by ${rev.name}`}
                    >
                      <span className="reel-play-icon" aria-hidden="true">
                        {isPlaying ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        )}
                      </span>
                      <span className="reel-pill-label">
                        {isPlaying ? `Pause: ${rev.name}` : rev.name}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ARROW NAVIGATION */}
          <div className="reel-nav-controls">
            <button
              type="button"
              className="reel-nav-btn prev"
              onClick={scrollLeft}
              aria-label="Previous testimonials"
              title="Previous testimonials"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="reel-nav-btn next"
              onClick={scrollRight}
              aria-label="Next testimonials"
              title="Next testimonials"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
