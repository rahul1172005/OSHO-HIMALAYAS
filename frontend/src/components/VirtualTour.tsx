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
            allow="xr-spatial-tracking; fullscreen"
            allowFullScreen
            loading="lazy"
            title="OSHO Himalayas 360 Degree Virtual Tour"
          />
        </div>
      </div>
    </section>
  );
}
