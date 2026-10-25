"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/landingData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-faq" id="faq">
      <div className="container container-narrow">
        {/* ELEAT-STYLE HEADER */}
        <div className="faq-header text-center">
          <h2 className="faq-title">Got questions?</h2>
          <p className="faq-subtitle">Frequently asked questions</p>
        </div>

        {/* ACCORDION LIST */}
        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-card-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.question}</span>
                  <span className={`faq-chevron ${isOpen ? "rotated" : ""}`} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-wrap">
                    {Array.isArray(item.answer) ? (
                      item.answer.map((para, pIdx) => (
                        <p key={pIdx} className="faq-a-para">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="faq-a-para">{item.answer}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="faq-bottom-cta text-center">
          <p className="faq-cta-prompt">Have another question not answered here?</p>
          <a href="#contact-us" className="btn btn-faq-cta">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
