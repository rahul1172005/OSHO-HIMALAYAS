"use client";

import { useState, useRef } from "react";
import { REEL_ITEMS, ReelItem } from "@/lib/landingData";

export default function ReelShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
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

  const handleCardClick = (item: ReelItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // If item is Instagram reel, open modal popup in reel dimensions
    if (item.videoType === "instagram") {
      // Pause any playing local video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
        setPlayingId(null);
      }
      setActiveModalReel(item);
      return;
    }

    // Otherwise toggle local video playback
    if (playingId === item.id) {
      const currentVideo = videoRefs.current[item.id];
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
      const targetVideo = videoRefs.current[item.id];
      if (targetVideo) {
        targetVideo.currentTime = 0;
        targetVideo.muted = isMuted;
        targetVideo.play().catch((err) => {
          console.warn("Video playback was interrupted or restricted:", err);
        });
      }
      setPlayingId(item.id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId]!.muted = nextMuted;
    }
  };

  return (
    <section className="section-reel-showcase" id="about">
      <div className="container">
        {/* HEADER TEXT - EXACT AS REQUESTED */}
        <div className="reel-header text-center">
          <h2 className="reel-title">
            Meditation is active and fun in this Himalayan valley
          </h2>
          <p className="reel-description">
            It’s not just sitting with eyes closed. The inner journey can be rich with a range of
            techniques and togetherness. Have a glimpse of what your day might look like at OSHO
            Himalayas.
          </p>
          <p className="reel-audio-note">
            *These videos play with audio, with the option to mute.
          </p>
        </div>

        {/* REELS CAROUSEL TRACK */}
        <div className="reel-carousel-wrapper">
          <div className="reel-cards-track" ref={scrollRef}>
            {REEL_ITEMS.map((item) => {
              const isPlaying = playingId === item.id;
              const isInstagram = item.videoType === "instagram";

              return (
                <div
                  key={item.id}
                  className={`reel-card ${isPlaying ? "is-playing" : ""}`}
                  onClick={(e) => handleCardClick(item, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(item);
                    }
                  }}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${item.title} video`}
                >
                  <div
                    className="reel-card-media"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  >
                    {/* HTML5 Native Video Player for local files */}
                    {!isInstagram && item.videoSrc && (
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={item.videoSrc}
                        className="reel-card-video"
                        playsInline
                        preload="metadata"
                        muted={isMuted}
                        loop
                        onEnded={() => setPlayingId(null)}
                      />
                    )}

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

                    {/* Play / Action Pill Button */}
                    <button
                      type="button"
                      className={`reel-card-pill ${isPlaying ? "playing" : ""}`}
                      onClick={(e) => handleCardClick(item, e)}
                      aria-label={`${isPlaying ? "Pause" : "Play"} ${item.buttonLabel}`}
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
                        {isPlaying ? `Pause: ${item.buttonLabel}` : item.buttonLabel}
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
              aria-label="Previous videos"
              title="Previous videos"
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
              aria-label="Next videos"
              title="Next videos"
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

      {/* POP-UP MODAL FOR INSTAGRAM REELS (IN INSTAGRAM REEL DIMENSIONS) */}
      {activeModalReel && (
        <div
          className="reel-modal-backdrop"
          onClick={() => setActiveModalReel(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalReel.title}
        >
          <div className="reel-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="reel-modal-close-btn"
              onClick={() => setActiveModalReel(null)}
              aria-label="Close video popup"
            >
              &times;
            </button>

            <div className="reel-modal-body">
              <h3 className="reel-modal-title">{activeModalReel.title}</h3>
              {activeModalReel.instagramUrl && (
                <div className="reel-modal-embed-wrap">
                  <iframe
                    src={`${activeModalReel.instagramUrl.replace(/\/$/, "")}/embed/`}
                    className="reel-instagram-iframe"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    allow="encrypted-media"
                    title={activeModalReel.title}
                  />
                  <div className="reel-modal-external-link text-center">
                    <a
                      href={activeModalReel.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-instagram-direct"
                    >
                      Watch on Instagram &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
