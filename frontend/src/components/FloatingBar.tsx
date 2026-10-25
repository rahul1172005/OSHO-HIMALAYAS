"use client";

import { useEffect, useState } from "react";

export default function FloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after user scrolls past 300px
      const threshold = 350;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`floating-bottom-bar ${visible ? "visible" : "hidden"}`}
      aria-label="Quick Retreat Enquiry"
    >
      <div className="floating-bar-inner">
        <div className="floating-bar-text">
          <span className="floating-bar-heading">Plan your retreat</span>
          <span className="floating-bar-sub">Dharamshala, Himachal</span>
        </div>

        <a href="#contact-us" className="btn btn-floating-cta">
          Get in touch
        </a>
      </div>
    </aside>
  );
}
