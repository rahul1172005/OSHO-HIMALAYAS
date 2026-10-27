"use client";

import { useState, useRef } from "react";
import { REEL_ITEMS } from "@/lib/landingData";

export default function ReelShowcase() {
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
            {REEL_ITEMS.map((item) => {
              const isPlaying = playingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`reel-card ${isPlaying ? "is-playing" : ""}`}
                  onClick={(e) => togglePlay(item.id, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      togglePlay(item.id);
                    }
                  }}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${item.title} video`}
                >
                  <div
                    className="reel-card-media"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  >
                    {/* HTML5 Native Video Player */}
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

                    {/* Play / Pause Pill Button */}
                    <button
                      type="button"
                      className={`reel-card-pill ${isPlaying ? "playing" : ""}`}
                      onClick={(e) => togglePlay(item.id, e)}
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
    </section>
  );
}
