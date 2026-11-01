"use client";

import { useState, useRef, useEffect } from "react";
import { TESTIMONIAL_REVIEWS, TestimonialReview } from "@/lib/landingData";

export default function ReviewsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const videoElements = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const isInteracting = useRef(false);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  const pauseAllVideos = () => {
    Object.values(videoElements.current).forEach((el) => {
      if (el) el.pause();
    });
    setPlayingId(null);
    setActiveKey(null);
  };

  const scrollLeft = () => {
    pauseAllVideos();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    pauseAllVideos();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const togglePause = () => {
    if (playingId) {
      pauseAllVideos();
      setIsPaused(true);
      return;
    }
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
    }, 2000);
  };

  const handleWheel = () => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2000);
  };

  // Continuous auto-scroll loop with seamless wrap-around
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      const track = trackRef.current;
      if (track && !isPaused && !playingId && !isInteracting.current) {
        const pxPerSec = direction === "normal" ? 30 : -30;
        const move = (pxPerSec * dt) / 1000;
        track.scrollLeft += move;

        const half = track.scrollWidth / 2;
        if (half > 0) {
          if (track.scrollLeft >= half) {
            track.scrollLeft -= half;
          } else if (track.scrollLeft <= 0 && direction === "reverse") {
            track.scrollLeft += half;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [isPaused, playingId, direction]);

  const togglePlay = (rev: TestimonialReview, keyPrefix: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const clickedKey = `${keyPrefix}-${rev.id}`;

    if (playingId === rev.id) {
      pauseAllVideos();
    } else {
      pauseAllVideos();

      const primaryVideo =
        videoElements.current[clickedKey] ||
        (e?.currentTarget?.querySelector("video") as HTMLVideoElement | null);

      if (primaryVideo) {
        primaryVideo.currentTime = 0;
        primaryVideo.muted = isMuted;

        const playPromise = primaryVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Unmuted autoplay restricted by browser; retrying muted:", err);
            primaryVideo.muted = true;
            setIsMuted(true);
            primaryVideo.play().catch((err2) => {
              console.error("Testimonial video play failed:", err2);
            });
          });
        }
      }

      // Sync clone instance in second track (muted to prevent echo)
      Object.entries(videoElements.current).forEach(([k, el]) => {
        if (k.endsWith(`-${rev.id}`) && el && el !== primaryVideo) {
          el.currentTime = 0;
          el.muted = true;
          el.play().catch(() => {});
        }
      });

      setPlayingId(rev.id);
      setActiveKey(clickedKey);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (activeKey && videoElements.current[activeKey]) {
      videoElements.current[activeKey]!.muted = nextMuted;
    } else if (playingId) {
      Object.entries(videoElements.current).forEach(([k, el]) => {
        if (k.endsWith(`-${playingId}`) && el) {
          el.muted = nextMuted;
        }
      });
    }
  };

  const renderReviewCard = (rev: TestimonialReview, keyPrefix: string) => {
    const isPlaying = playingId === rev.id;
    const cardKey = `${keyPrefix}-${rev.id}`;

    return (
      <div
        key={cardKey}
        className={`reel-card testimonial-reel-card ${isPlaying ? "is-playing" : ""}`}
        onClick={(e) => togglePlay(rev, keyPrefix, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlay(rev, keyPrefix);
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
              if (el) {
                videoElements.current[cardKey] = el;
              } else {
                delete videoElements.current[cardKey];
              }
            }}
            src={rev.videoSrc}
            className="reel-card-video"
            playsInline
            preload="auto"
            muted={isMuted}
            loop
            onEnded={() => {
              setPlayingId(null);
              setActiveKey(null);
            }}
          />

          {/* Sound Control for active card on top-left */}
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* Play / Action Pill */}
          <div className={`reel-card-pill ${isPlaying ? "playing" : ""}`}>
            <span className="reel-play-icon" aria-hidden="true">
              {isPlaying ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </span>
            <span className="reel-pill-label">
              {isPlaying ? (isMuted ? "Playing (muted)" : "Playing with sound") : `${rev.name} (${rev.location})`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-reel-showcase section-reviews-showcase" id="reviews">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="reel-header text-center">
          <span className="reviews-kicker">Real experiences</span>
          <h2 className="reel-title">Why Meditators Love Us</h2>
          <p className="reel-description">
            Hear directly from guests around the world who arrived seeking a break and left with a
            transformed inner life.
          </p>

          <div className="reviews-rating-badge">
            <span
              className="stars"
              aria-label="Rated 4.8 out of 5 stars based on over 1000 Google reviews"
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

        {/* FULLY SCROLLABLE & SWIPEABLE TESTIMONIALS TRACK WITH SEAMLESS AUTO-SCROLL LOOP */}
        <div className="reel-carousel-wrapper">
          <div
            className="reel-cards-track"
            ref={trackRef}
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
            {TESTIMONIAL_REVIEWS.map((rev) =>
              renderReviewCard(rev, "rev1")
            )}
            {TESTIMONIAL_REVIEWS.map((rev) =>
              renderReviewCard(rev, "rev2")
            )}
          </div>

          {/* DIRECTION, MANUAL SCROLL & PAUSE CONTROLS */}
          <div className="reel-nav-controls">
            <button
              type="button"
              className="reel-nav-btn"
              onClick={scrollLeft}
              aria-label="Scroll testimonials left"
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
              className={`reel-nav-btn ${isPaused ? "paused-btn" : ""}`}
              onClick={togglePause}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="reel-nav-btn"
              onClick={scrollRight}
              aria-label="Scroll testimonials right"
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
      </div>
    </section>
  );
}
