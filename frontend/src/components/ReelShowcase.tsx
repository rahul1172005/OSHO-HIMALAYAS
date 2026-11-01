"use client";

import { useState, useRef, useEffect } from "react";
import { REEL_ITEMS, ReelItem } from "@/lib/landingData";

export default function ReelShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isReady, setIsReady] = useState(false);
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
      if (el) {
        try {
          el.pause();
        } catch (_) { }
      }
    });
    setPlayingId(null);
    setActiveKey(null);
    setIsBuffering(false);
    setIsReady(false);
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
    }, 1500);
  };

  const handleWheel = () => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  // Seamless wrap-around listener for touch, wheel, drag & programmatic scroll
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half > 0) {
      if (track.scrollLeft >= half) {
        track.scrollLeft -= half;
      } else if (track.scrollLeft <= 0 && direction === "reverse") {
        track.scrollLeft += half;
      }
    }
  };

  // Smooth auto-scroll drift when idle
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      const track = trackRef.current;
      // Drift only when unpaused, no video playing, and no manual interaction
      if (track && !isPaused && !playingId && !isInteracting.current) {
        const pxPerSec = direction === "normal" ? 28 : -28;
        const move = (pxPerSec * Math.min(dt, 50)) / 1000;
        track.scrollLeft += move;
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

    // If tapping the already-playing card, toggle pause/play
    if (playingId === item.id && activeKey === clickedKey) {
      const currentVideo = videoElements.current[clickedKey];
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
        pauseAllVideos();
        return;
      }
    }

    // Pause any other active video before playing
    pauseAllVideos();

    const primaryVideo =
      videoElements.current[clickedKey] ||
      (e?.currentTarget?.querySelector("video") as HTMLVideoElement | null);

    if (primaryVideo) {
      setPlayingId(item.id);
      setActiveKey(clickedKey);
      setIsBuffering(true);
      setIsReady(false);

      primaryVideo.currentTime = 0;
      primaryVideo.muted = isMuted;

      const playPromise = primaryVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsBuffering(false);
            setIsReady(true);
          })
          .catch((err) => {
            console.warn("Autoplay with sound restricted, retrying muted:", err);
            primaryVideo.muted = true;
            setIsMuted(true);
            primaryVideo
              .play()
              .then(() => {
                setIsBuffering(false);
                setIsReady(true);
              })
              .catch((err2) => {
                console.error("Video play failed:", err2);
                setIsBuffering(false);
                pauseAllVideos();
              });
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (activeKey && videoElements.current[activeKey]) {
      videoElements.current[activeKey]!.muted = nextMuted;
    }
  };

  const renderCard = (item: ReelItem, keyPrefix: string) => {
    const isPlaying = playingId === item.id;
    const cardKey = `${keyPrefix}-${item.id}`;
    const isActiveCard = activeKey === cardKey;
    const isInstagram = item.videoType === "instagram";
    const showBuffering = isActiveCard && isBuffering;
    const showReady = isActiveCard && isReady;

    return (
      <div
        key={cardKey}
        className={`reel-card ${isPlaying && isActiveCard ? "is-playing" : ""} ${showReady ? "is-ready" : ""} ${showBuffering ? "is-buffering" : ""}`}
        onClick={(e) => handleCardClick(item, keyPrefix, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick(item, keyPrefix);
          }
        }}
        aria-label={`${isPlaying && isActiveCard ? "Pause" : "Play"} ${item.title} video`}
      >
        <div
          className="reel-card-media"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          {/* HTML5 Native Video Player for local files - On demand loading (preload="none") */}
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
              preload="none"
              muted={isMuted}
              loop
              onPlaying={() => {
                if (activeKey === cardKey) {
                  setIsBuffering(false);
                  setIsReady(true);
                }
              }}
              onWaiting={() => {
                if (activeKey === cardKey) {
                  setIsBuffering(true);
                }
              }}
              onCanPlay={() => {
                if (activeKey === cardKey) {
                  setIsBuffering(false);
                }
              }}
              onEnded={() => {
                pauseAllVideos();
              }}
            />
          )}

          {/* Sound Control for active card on top-left */}
          {isPlaying && isActiveCard && isReady && (
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
          <div className={`reel-card-pill ${isPlaying && isActiveCard ? "playing" : ""}`}>
            <span className="reel-play-icon" aria-hidden="true">
              {isPlaying && isActiveCard && isBuffering ? (
                <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
              ) : isPlaying && isActiveCard ? (
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
              {isPlaying && isActiveCard
                ? isBuffering
                  ? "Loading..."
                  : isMuted
                    ? "Playing (muted)"
                    : "Playing with sound"
                : item.buttonLabel}
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
      </div>

      {/* FULLY SCROLLABLE & SWIPEABLE REELS TRACK (FULL BLEED TO EDGES) */}
      <div className="reel-carousel-wrapper">
          <div
            className="reel-cards-track"
            ref={trackRef}
            onScroll={handleScroll}
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
