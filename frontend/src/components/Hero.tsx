// ---------------------------------------------------------------------------
// BACKGROUND VIDEO CONFIGURATION (Controlled directly within code)
// Adjust fit, scale, x-axis, and y-axis directly here as desired:
// ---------------------------------------------------------------------------
const VIDEO_FIT: "contain" | "cover" | "fill" = "cover"; // "cover" = edge-to-edge bleed without letterbox bars; "contain" = entire video displayed with letterbox
const VIDEO_SCALE = 1.0; // 1.0 = Full 100% video display
const VIDEO_X = 0;       // Horizontal offset in pixels (+ moves right, - moves left)
const VIDEO_Y = 0;       // Vertical offset in pixels (+ moves down, - moves up)

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* ENTIRE BACKGROUND VIDEO (EXTENDS BEHIND NAVBAR, NO FILTERS OR OVERLAYS) */}
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-element"
          aria-hidden="true"
          style={{
            objectFit: VIDEO_FIT,
            transform: `translate(${VIDEO_X}px, ${VIDEO_Y}px) scale(${VIDEO_SCALE})`,
            transformOrigin: "center center"
          }}
        >
          <source src="/herobg_main.mp4" type="video/mp4" />
          <source src="/herobg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* HERO CONTENT */}
      <div className="container hero-content-wrap">
        <div className="hero-content">
          <h1 className="hero-title">Yes, you deserve a break</h1>
          <p className="hero-subtitle">
            It&apos;s time for meditative holidays in the Himalayas. Discover an all-inclusive mountain sanctuary combining active meditations, restful silence, cedar forests, and conscious living.
          </p>

          <div className="hero-ctas">
            <a href="#contact-us" className="btn btn-lg">Get in touch</a>
            <a href="#courses" className="btn btn-lg btn-hero-secondary">Explore Courses</a>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-val">4.8 / 5.0</span>
              <span className="metric-lbl">Based on 1,000+ Google Reviews from meditators worldwide</span>
            </div>
            <div className="metric-item">
              <span className="metric-val">45 Mins</span>
              <span className="metric-lbl">Scenic cab drive from Kangra / Dharamshala Airport</span>
            </div>
            <div className="metric-item">
              <span className="metric-val">365 Days</span>
              <span className="metric-lbl">Continuous daily active meditation programs and flexible stays</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
