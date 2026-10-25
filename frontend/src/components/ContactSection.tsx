"use client";

import { useEffect } from "react";

interface ContactSectionProps {
  prefilledCourseTitle?: string;
}

export default function ContactSection({ prefilledCourseTitle }: ContactSectionProps) {
  useEffect(() => {
    // Zoho iframe referrer tracking script
    try {
      const zfFrame = document.getElementById("ziframe_907254") as HTMLIFrameElement | null;
      if (zfFrame) {
        let ifrmSrc = zfFrame.src;
        if (!/[?&]referrername=/.test(ifrmSrc)) {
          let rfr = window.location.href;
          try {
            rfr =
              window.self !== window.top
                ? window.top?.location.href || ""
                : /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr)
                ? rfr
                : "";
          } catch {
            // cross-origin frame fallback
          }

          if (rfr && rfr !== "") {
            if (rfr.length > 1800) {
              const queryIndex = rfr.indexOf("?");
              if (queryIndex > -1) {
                rfr = rfr.substring(0, queryIndex);
              }
              if (rfr.length > 1800) {
                rfr = rfr.substring(0, 1800);
              }
            }
            ifrmSrc +=
              (ifrmSrc.indexOf("?") > 0 ? "&" : "?") + "referrername=" + encodeURIComponent(rfr);
          }
        }
        if (zfFrame.src !== ifrmSrc) {
          zfFrame.src = ifrmSrc;
        }
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <section className="section-contact" id="contact-us">
      <div className="container">
        {/* HEADER */}
        <div className="contact-header text-center">
          <span className="contact-kicker">Sanctuary Enquiry</span>
          <h2 className="contact-title">Get in touch</h2>
          <p className="contact-subtitle">
            We&apos;d love to hear from you. Reach out with any questions about our meditation
            courses.
          </p>
          <div className="contact-pricing-pill">
            Packages starting <strong>€ 29 / Rs 3,200 per day</strong> (covers meditations, stay,
            food, swimming pool, gym, &amp; library).
          </div>

          {prefilledCourseTitle && (
            <div className="course-selected-notification">
              Inquiring about: <strong>{prefilledCourseTitle}</strong>
            </div>
          )}
        </div>

        {/* ZOHO EMBED FORM CONTAINER */}
        <div className="zoho-form-wrapper">
          <iframe
            id="ziframe_907254"
            aria-label="Google Ads International"
            frameBorder="0"
            className="zoho-iframe"
            src="https://forms.zohopublic.in/infooshohi1/form/GoogleAdsInternational/formperma/AtLQQ-uNG7ZqGiKRZ2Png9kAWut5QNiVu7BHkJNZ80M"
            title="OSHO Himalayas Registration & Enquiry Form"
          />
        </div>

        {/* DIRECT REACH-OUT DESK */}
        <div className="contact-direct-grid">
          <div className="direct-card">
            <span className="direct-card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <h4 className="direct-card-title">Sanctuary Location</h4>
            <p className="direct-card-text">
              OSHO Himalayas, Dharamshala, Himachal Pradesh, India
            </p>
          </div>

          <div className="direct-card">
            <span className="direct-card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <h4 className="direct-card-title">WhatsApp Desk</h4>
            <p className="direct-card-text">
              Instant assistance for bookings, course details &amp; travel desk.
            </p>
            <a
              href="https://wa.me/919418044474?text=Hello%20OSHO%20Himalayas,%20I%20would%20like%20to%20know%20more%20about%20meditation%20retreats"
              target="_blank"
              rel="noopener noreferrer"
              className="direct-link"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          <div className="direct-card">
            <span className="direct-card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <h4 className="direct-card-title">Email Us</h4>
            <p className="direct-card-text">
              Send your inquiries and retreat preferences anytime.
            </p>
            <a href="mailto:info@oshohimalayas.com" className="direct-link">
              info@oshohimalayas.com &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
