"use client";

import { useState, useEffect } from "react";
import { FAQItem, fetchFaqs } from "@/lib/api";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<string | null>("faq-1");

  useEffect(() => {
    async function load() {
      const data = await fetchFaqs();
      setFaqs(data);
      if (data.length > 0) setOpenId(data[0].id);
    }
    load();
  }, []);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section welcome-section" id="faqs">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Help &amp; Answers</div>
          <h2 className="section-title">FAQs</h2>
          <p className="section-desc">
            Everything you need to know about preparing for your stay, meditation experience, food, and booking policies.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? "active" : ""}`}>
                <button className="faq-question-btn" onClick={() => toggle(faq.id)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
