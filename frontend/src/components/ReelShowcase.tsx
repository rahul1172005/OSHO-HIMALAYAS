"use client";

import { useState, useRef } from "react";
import { REEL_ITEMS, ReelItem } from "@/lib/landingData";

export default function ReelShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);

  // Store video elements by compound key: `${keyPrefix}-${item.id}`
  const videoElements = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleDirection = (dir: "normal" | "reverse") => {
    setDirection(dir);
    setIsPaused(false);
  };

  const handleCardClick = (item: ReelItem, keyPrefix: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // If item is Instagram reel, open modal popup in reel dimensions
    if (item.videoType === "instagram") {
      // Pause all local videos
      Object.values(videoElements.current).forEach((v) => v?.pause());
      setPlayingId(null);
      setActiveKey(null);
      setActiveModalReel(item);
      return;
    }

    const clickedKey = `${keyPrefix}-${item.id}`;

    // If this item is already playing, clicking toggles pause
    if (playingId === item.id) {
      Object.entries(videoElements.current).forEach(([k, el]) => {
        if (k.endsWith(`-${item.id}`) && el) {
          el.pause();
        }
      });
      setPlayingId(null);
      setActiveKey(null);
    } else {
      // Pause any previously playing video across the showcase
      Object.values(videoElements.current).forEach((el) => {
        if (el) {
          el.pause();
        }
      });

      // Get the primary video element for the card that was clicked
      const primaryVideo =
        videoElements.current[clickedKey] ||
        (e?.currentTarget?.querySelector("video") as HTMLVideoElement | null);

      if (primaryVideo) {
        primaryVideo.currentTime = 0;
        primaryVideo.muted = isMuted;

        const playPromise = primaryVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Unmuted playback restricted by browser policy; retrying muted:", err);
            primaryVideo.muted = true;
            setIsMuted(true);
            primaryVideo.play().catch((err2) => {
              console.error("Video play failed:", err2);
            });
          });
        }
      }

      // Sync any duplicate clone in the other marquee track (muted to prevent echo)
      Object.entries(videoElements.current).forEach(([k, el]) => {
        if (k.endsWith(`-${item.id}`) && el && el !== primaryVideo) {
          el.currentTime = 0;
          el.muted = true;
          el.play().catch(() => {});
        }
      });

      setPlayingId(item.id);
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
      // Fallback: apply to the first active instance
      Object.entries(videoElements.current).forEach(([k, el]) => {
        if (k.endsWith(`-${playingId}`) && el) {
          el.muted = nextMuted;
        }
      });
    }
  };

  const renderCard = (item: ReelItem, keyPrefix: string) => {
    const isPlaying = playingId === item.id;
    const isInstagram = item.videoType === "instagram";
    const cardKey = `${keyPrefix}-${item.id}`;

    return (
      <div
        key={cardKey}
        className={`reel-card ${isPlaying ? "is-playing" : ""}`}
        onClick={(e) => handleCardClick(item, keyPrefix, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick(item, keyPrefix);
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
                if (el) {
                  videoElements.current[cardKey] = el;
                } else {
                  delete videoElements.current[cardKey];
                }
              }}
              src={item.videoSrc}
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
          )}

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
              {isPlaying ? "Playing with sound" : item.buttonLabel}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-reel-showcase" id="about">
      <div className="container">
        {/* HEADER TEXT */}
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

        {/* REELS INFINITE MARQUEE TRACK */}
        <div className="reel-marquee-wrapper">
          <div
            className={`reel-marquee-row ${isPaused || playingId !== null ? "is-paused" : ""} ${
              direction === "reverse" ? "is-reverse" : "is-normal"
            }`}
          >
            <div className="reel-marquee-group">
              {REEL_ITEMS.map((item) => renderCard(item, "r1"))}
            </div>
            <div className="reel-marquee-group" aria-hidden="true">
              {REEL_ITEMS.map((item) => renderCard(item, "r2"))}
            </div>
          </div>

          {/* DIRECTION & PAUSE CONTROLS */}
          <div className="reel-nav-controls">
            <button
              type="button"
              className={`reel-nav-btn ${direction === "reverse" && !isPaused ? "active-arrow" : ""}`}
              onClick={() => handleDirection("reverse")}
              aria-label="Scroll videos left"
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
              className={`reel-nav-btn ${direction === "normal" && !isPaused ? "active-arrow" : ""}`}
              onClick={() => handleDirection("normal")}
              aria-label="Scroll videos right"
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
