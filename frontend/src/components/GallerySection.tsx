"use client";

import { useState } from "react";

interface GalleryItem {
  id: string;
  category: "campus" | "people" | "meditations";
  title: string;
  image: string;
}

const GALLERY_DATA: GalleryItem[] = [
  // OUR CAMPUS
  {
    id: "camp-1",
    category: "campus",
    title: "Sanctuary Valley & Pine Groves",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "camp-2",
    category: "campus",
    title: "The Silence Dome & Reflection Grounds",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "camp-3",
    category: "campus",
    title: "Mountain Mist & Living Quarters",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "camp-4",
    category: "campus",
    title: "Pure Mountain Glacial Stream",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  },

  // OUR PEOPLE
  {
    id: "peop-1",
    category: "people",
    title: "Conscious Community in Shared Dialogue",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "peop-2",
    category: "people",
    title: "Sattvic Dining & Mindful Connection",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "peop-3",
    category: "people",
    title: "Meditators Across 30+ Countries Gathering",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "peop-4",
    category: "people",
    title: "Joyful Connection in Nature",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80"
  },

  // OUR MEDITATIONS
  {
    id: "med-1",
    category: "meditations",
    title: "OSHO Dynamic Dawn Meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "med-2",
    category: "meditations",
    title: "OSHO Kundalini Sunset Shaking & Dance",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "med-3",
    category: "meditations",
    title: "Deep Silent Witnessing in the Main Hall",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "med-4",
    category: "meditations",
    title: "Evening Meeting Celebration & Music",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "campus" | "people" | "meditations">("all");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "all" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Visual Journey</div>
          <h2 className="section-title">Gallery</h2>
          <p className="section-desc">
            Explore glimpses of sanctuary grounds, conscious community, and transformative meditation spaces in the Himalayas.
          </p>
        </div>

        <div className="courses-filter-bar">
          <button 
            className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Photos
          </button>
          <button 
            className={`filter-btn ${activeCategory === "campus" ? "active" : ""}`}
            onClick={() => setActiveCategory("campus")}
          >
            Our Campus
          </button>
          <button 
            className={`filter-btn ${activeCategory === "people" ? "active" : ""}`}
            onClick={() => setActiveCategory("people")}
          >
            Our People
          </button>
          <button 
            className={`filter-btn ${activeCategory === "meditations" ? "active" : ""}`}
            onClick={() => setActiveCategory("meditations")}
          >
            Our Meditations
          </button>
        </div>

        <div className="gallery-grid">
          {filtered.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveImage(item)}
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: "var(--card-bg)",
                boxShadow: "var(--card-shadow)",
                transition: "transform 0.2s ease"
              }}
            >
              <div style={{ height: "230px", overflow: "hidden" }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.35s ease"
                  }}
                />
              </div>
              <div style={{ padding: "16px 20px" }}>
                <h4 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 300 }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {activeImage && (
          <div 
            className="modal-overlay" 
            onClick={() => setActiveImage(null)}
            role="dialog"
            style={{ display: "flex" }}
          >
            <div 
              className="modal-container" 
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "800px", padding: "16px" }}
            >
              <button 
                className="modal-close-btn" 
                onClick={() => setActiveImage(null)}
                aria-label="Close image preview"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img 
                src={activeImage.image} 
                alt={activeImage.title} 
                style={{ width: "100%", maxHeight: "70vh", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
              />
              <div style={{ padding: "18px 8px 6px" }}>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.3rem", fontWeight: 200 }}>
                  {activeImage.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
