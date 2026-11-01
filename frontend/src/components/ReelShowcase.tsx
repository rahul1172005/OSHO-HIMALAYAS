"use client";

import { useState, useRef, useEffect } from "react";
import { REEL_ITEMS, ReelItem } from "@/lib/landingData";

export default function ReelShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);

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

  const handleDirection = (dir: "normal" | "reverse") => {
    pauseAllVideos();
    setDirection(dir);
    setIsPaused(false);
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

  // Continuous auto-scroll loop with seamless loop wrap-around
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      const track = trackRef.current;
      if (track && !isPaused && !playingId && !isInteracting.current) {
        // ~30px per second drift
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

  const handleCardClick = (item: ReelItem, keyPrefix: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (item.videoType === "instagram") {
      pauseAllVideos();
      setActiveModalReel(item);
      return;
    }

    const clickedKey = `${keyPrefix}-${item.id}`;

    if (playingId === item.id) {
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
            console.warn("Unmuted playback restricted by browser policy; retrying muted:", err);
            primaryVideo.muted = true;
            setIsMuted(true);
            primaryVideo.play().catch((err2) => {
              console.error("Video play failed:", err2);
            });
          });
        }
      }

      // Sync any duplicate clone in the other track (muted)
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
              {isPlaying ? (isMuted ? "Playing (muted)" : "Playing with sound") : item.buttonLabel}
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

        {/* FULLY SCROLLABLE & SWIPEABLE REELS TRACK WITH SEAMLESS AUTO-SCROLL LOOP */}
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
            {/* Primary Track */}
            {REEL_ITEMS.map((item) => renderCard(item, "r1"))}
            {/* Seamless Clone Track for Continuous Infinity Loop */}
            {REEL_ITEMS.map((item) => renderCard(item, "r2"))}
          </div>

          {/* DIRECTION, MANUAL SCROLL & PAUSE CONTROLS */}
          <div className="reel-nav-controls">
            <button
              type="button"
              className="reel-nav-btn"
              onClick={scrollLeft}
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
              className="reel-nav-btn"
              onClick={scrollRight}
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
