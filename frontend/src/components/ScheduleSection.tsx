"use client";

import { useState } from "react";
import { SCHEDULE_COURSES, ScheduleCourse } from "@/lib/landingData";

interface ScheduleSectionProps {
  onSelectCourse?: (courseTitle: string) => void;
}

export default function ScheduleSection({ onSelectCourse }: ScheduleSectionProps) {
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleDirection = (dir: "normal" | "reverse") => {
    setDirection(dir);
    setIsPaused(false);
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

  const renderCourseCard = (course: ScheduleCourse, key: string) => (
    <div key={key} className="eleat-course-card">
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
          aria-label={`Enquire about ${course.title}`}
        >
          Enquire for this course &rarr;
        </button>
      </div>
    </div>
  );

  return (
    <section className="section-schedule" id="schedule">
      <div className="container schedule-layout">
        {/* LEFT COLUMN: TITLE & NAVIGATION (ELEAT CEREAL DESIGN) */}
        <div className="schedule-info-col">
          <div className="schedule-header-badge">Open all year</div>
          <h2 className="schedule-main-title">Our Schedule</h2>
          <p className="schedule-main-sub">
            All our courses are based on OSHO Active Meditations.
          </p>

          <p className="schedule-package-note">
            Packages starting <strong>Rs 3,200 / € 29 per day</strong> (covers meditations, stay,
            food, swimming pool, gym, &amp; library).
          </p>

          {/* ARROW & PAUSE CONTROLS */}
          <div className="schedule-arrows">
            <button
              type="button"
              onClick={() => handleDirection("reverse")}
              className={`schedule-arrow-btn ${direction === "reverse" && !isPaused ? "active-arrow" : ""}`}
              aria-label="Scroll courses left"
              title="Move left"
            >
              <svg
                width="18"
                height="18"
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
              onClick={togglePause}
              className={`schedule-arrow-btn ${isPaused ? "paused-btn" : ""}`}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleDirection("normal")}
              className={`schedule-arrow-btn ${direction === "normal" && !isPaused ? "active-arrow" : ""}`}
              aria-label="Scroll courses right"
              title="Move right"
            >
              <svg
                width="18"
                height="18"
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

        {/* RIGHT COLUMN: INFINITE MARQUEE LIST COURSE CARDS TRACK */}
        <div className="schedule-cards-wrap">
          <div
            className={`schedule-marquee-row ${isPaused ? "is-paused" : ""} ${
              direction === "reverse" ? "is-reverse" : "is-normal"
            }`}
          >
            <div className="schedule-marquee-group">
              {SCHEDULE_COURSES.map((course) =>
                renderCourseCard(course, `c1-${course.id}`)
              )}
            </div>
            <div className="schedule-marquee-group" aria-hidden="true">
              {SCHEDULE_COURSES.map((course) =>
                renderCourseCard(course, `c2-${course.id}`)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
