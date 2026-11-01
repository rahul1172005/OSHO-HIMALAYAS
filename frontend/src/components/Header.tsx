"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : "transparent-at-top"}`}>
      <div className="container nav-container">
        <a href="#hero" className="brand-logo" aria-label="OSHO Himalayas Home">
          <img
            src="/osho-logo.png"
            alt="OSHO Himalayas Wellness Resort"
            className="site-logo-img"
          />
        </a>

        <nav aria-label="Primary Navigation">
          <ul className={`nav-links ${navOpen ? "open" : ""}`}>
            <li>
              <a href="#schedule" className="nav-link" onClick={() => setNavOpen(false)}>
                Courses
              </a>
            </li>
            <li>
              <a href="#reviews" className="nav-link" onClick={() => setNavOpen(false)}>
                Reviews
              </a>
            </li>
            <li>
              <a href="#faq" className="nav-link" onClick={() => setNavOpen(false)}>
                FAQs
              </a>
            </li>
            <li>
              <a href="#reach" className="nav-link" onClick={() => setNavOpen(false)}>
                How to reach
              </a>
            </li>
            <li>
              <a href="#virtual-tour" className="nav-link" onClick={() => setNavOpen(false)}>
                Campus tour
              </a>
            </li>
            <li>
              <a href="#contact-us" className="nav-link nav-link-contact" onClick={() => setNavOpen(false)}>
                Contact us
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <a href="#contact-us" className="btn btn-sm btn-nav-cta">
            Get in touch
          </a>
          <button
            className="nav-toggle-btn"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={navOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {navOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="21" x2="21" y2="21"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="3" x2="21" y2="3"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
