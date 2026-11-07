"use client";

import { useEffect } from "react";

interface ContactSectionProps {
  prefilledCourseTitle?: string;
  formSource?: string;
}

export default function ContactSection({
  prefilledCourseTitle,
  formSource = "International",
}: ContactSectionProps) {
  const tallyUrl = `https://tally.so/embed/obk9vV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1&form_source=${formSource}`;

  useEffect(() => {
    // Tally embed initialization script
    const loadTally = () => {
      // @ts-expect-error Tally global is provided by embed script
      if (typeof window !== "undefined" && typeof window.Tally !== "undefined") {
        // @ts-expect-error Tally global
        window.Tally.loadEmbeds();
      } else {
        const d = document;
        const w = "https://tally.so/widgets/embed.js";
        if (d.querySelector(`script[src="${w}"]`) === null) {
          const s = d.createElement("script");
          s.src = w;
          s.onload = () => {
            // @ts-expect-error Tally global
            if (typeof window.Tally !== "undefined") {
              // @ts-expect-error Tally global
              window.Tally.loadEmbeds();
            }
          };
          s.onerror = () => {
            d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
              const ifr = e as HTMLIFrameElement;
              if (ifr.dataset.tallySrc) {
                ifr.src = ifr.dataset.tallySrc;
              }
            });
          };
          d.body.appendChild(s);
        }
      }
    };

    loadTally();
  }, [tallyUrl]);

  return (
    <section className="section-contact" id="contact-us">
      <div className="container">
        {/* HEADER */}
        <div className="contact-header text-center">
          <span className="contact-kicker">We’re waiting</span>
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

        {/* TALLY EMBED FORM CONTAINER */}
        <div className="tally-form-wrapper">
          <iframe
            key={tallyUrl}
            data-tally-src={tallyUrl}
            src={tallyUrl}
            loading="lazy"
            width="100%"
            height="632"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Common lead form"
            className="tally-iframe"
          />
        </div>
      </div>
    </section>
  );
}
