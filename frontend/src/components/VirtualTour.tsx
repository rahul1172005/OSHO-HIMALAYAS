"use client";

import { VIRTUAL_TOUR_INFO } from "@/lib/landingData";

export default function VirtualTour() {
  return (
    <section className="section-virtual-tour" id="virtual-tour">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="tour-header text-center">
          <span className="tour-kicker">{VIRTUAL_TOUR_INFO.kicker}</span>
          <h2 className="tour-title">{VIRTUAL_TOUR_INFO.title}</h2>
          <p className="tour-subtitle">{VIRTUAL_TOUR_INFO.subtitle}</p>
        </div>

        {/* 360 MATTERPORT INTERACTIVE TOUR CONTAINER */}
        <div className="tour-frame-wrapper">
          <iframe
            src={VIRTUAL_TOUR_INFO.matterportUrl}
            className="tour-matterport-iframe"
            width="100%"
            height="580"
            allow="xr-spatial-tracking; clipboard-write"
            allowFullScreen
            loading="lazy"
            title="OSHO Himalayas 360 Degree Virtual Tour"
          />
        </div>

        {/* TOUR HIGHLIGHTS */}
        <div className="tour-features-grid">
          <div className="tour-feature-pill">
            <span className="feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M4 18h16M6 18V9M10 18V9M14 18V9M18 18V9M12 2l10 7H2z" />
              </svg>
            </span>
            <span>Meditation Hall</span>
          </div>
          <div className="tour-feature-pill">
            <span className="feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c2-1 4-1 6 0s4 1 6 0 4-1 6 0M2 17c2-1 4-1 6 0s4 1 6 0 4-1 6 0M2 7c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
              </svg>
            </span>
            <span>Natural Spring Pool</span>
          </div>
          <div className="tour-feature-pill">
            <span className="feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 4 14 8 14 5 20 19 20 16 14 20 14 12 2" />
                <line x1="12" y1="20" x2="12" y2="23" />
              </svg>
            </span>
            <span>Cedar Forest Gardens</span>
          </div>
          <div className="tour-feature-pill">
            <span className="feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            </span>
            <span>Dhauladhar Mountain Views</span>
          </div>
        </div>
      </div>
    </section>
  );
}
