"use client";

import { useRef } from "react";
import { SCHEDULE_COURSES, ScheduleCourse } from "@/lib/landingData";

interface ScheduleSectionProps {
  onSelectCourse?: (courseTitle: string) => void;
}

export default function ScheduleSection({ onSelectCourse }: ScheduleSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleEnquire = (course: ScheduleCourse) => {
    if (onSelectCourse) {
      onSelectCourse(course.title);
    }
    const contactElem = document.getElementById("contact-us");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-schedule" id="schedule">
      <div className="container schedule-layout">
        {/* LEFT COLUMN: TITLE & NAVIGATION (ELEAT CEREAL DESIGN) */}
        <div className="schedule-info-col">
          <div className="schedule-header-badge">Our Courses</div>
          <h2 className="schedule-main-title">Find our courses</h2>
          <p className="schedule-main-sub">
            All our courses are based on OSHO Active Meditations.
          </p>

          <p className="schedule-package-note">
            Packages starting <strong>Rs 3,200 / € 29 per day</strong> (covers meditations, stay,
            food, swimming pool, gym, &amp; library).
          </p>

          {/* ARROW CONTROLS */}
          <div className="schedule-arrows">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="schedule-arrow-btn"
              aria-label="Scroll courses left"
              title="Previous courses"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="schedule-arrow-btn"
              aria-label="Scroll courses right"
              title="Next courses"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: HORIZONTAL COURSE CARDS TRACK (EXACT ELEAT CARD STYLE) */}
        <div className="schedule-cards-wrap">
          <div className="schedule-cards-track" ref={trackRef}>
            {SCHEDULE_COURSES.map((course) => (
              <div key={course.id} className="eleat-course-card">
                <div className="eleat-card-media-wrap">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="eleat-card-img"
                  />
                </div>

                <div className="eleat-card-body">
                  <h3 className="eleat-card-title">{course.title}</h3>
                  <p className="eleat-card-dates">{course.dates}</p>
                  <p className="eleat-card-tagline">{course.tagline}</p>

                  <button
                    onClick={() => handleEnquire(course)}
                    className="btn btn-sm btn-course-enquire"
                  >
                    Enquire for this retreat &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
