"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : "transparent-on-hero"}`}>
        <div className="container nav-container">
          <a href="#hero" className="brand-logo" aria-label="OSHO Himalayas Home">
            OSHO HIMALAYAS
            <span>Meditation Resort</span>
          </a>

          <nav aria-label="Primary Navigation">
            <ul className={`nav-links ${navOpen ? "open" : ""}`}>
              <li><a href="#about" className="nav-link" onClick={() => setNavOpen(false)}>About us</a></li>
              <li><a href="#courses" className="nav-link" onClick={() => setNavOpen(false)}>Courses</a></li>
              <li><a href="#reviews" className="nav-link" onClick={() => setNavOpen(false)}>Reviews</a></li>
              <li><a href="#faqs" className="nav-link" onClick={() => setNavOpen(false)}>FAQs</a></li>
              <li><a href="#how-to-reach" className="nav-link" onClick={() => setNavOpen(false)}>How to reach</a></li>
              <li><a href="#gallery" className="nav-link" onClick={() => setNavOpen(false)}>Gallery</a></li>
              <li><a href="#contact-us" className="nav-link" onClick={() => setNavOpen(false)}>Contact us</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="#contact-us" className="btn btn-sm">Get in touch</a>
            <button 
              className="nav-toggle-btn" 
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
