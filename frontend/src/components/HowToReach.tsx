"use client";

import { HOW_TO_REACH_INFO } from "@/lib/landingData";

export default function HowToReach() {
  return (
    <section className="section-how-to-reach" id="reach">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="reach-header text-center">
          <h2 className="reach-title">{HOW_TO_REACH_INFO.title}</h2>
          <p className="reach-subtitle">
            Dharamshala, Himachal Pradesh, India &mdash; 45 minutes from Kangra / Gaggal Airport
          </p>
        </div>

        {/* MAP CONTAINER */}
        <div className="reach-map-container">
          <img
            src={HOW_TO_REACH_INFO.mapImage}
            alt="How to reach OSHO Himalayas Map: Daily flights from New Delhi to Dharamshala DHM Airport, Volvo buses, and Vande Bharat train"
            loading="lazy"
            className="reach-map-img"
          />
        </div>

        {/* INSTRUCTIONS & TRAVEL BULLETS */}
        <div className="reach-bullets-card">
          <ul className="reach-bullets-list">
            {HOW_TO_REACH_INFO.bulletPoints.map((point, index) => (
              <li key={index} className="reach-bullet-item">
                <span className="bullet-icon-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="bullet-text">{point}</span>
              </li>
            ))}
          </ul>

          <div className="reach-actions text-center">
            <a href="#contact-us" className="btn btn-reach-cta">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
