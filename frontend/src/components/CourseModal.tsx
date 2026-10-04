"use client";

import { Retreat } from "@/lib/api";

interface CourseModalProps {
  course: Retreat | null;
  onClose: () => void;
  onReserve: (courseId: string) => void;
}

export default function CourseModal({ course, onClose, onReserve }: CourseModalProps) {
  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <img className="modal-hero-img" src={course.image} alt={course.title} />

        <div className="modal-content">
          <div className="modal-date">{course.date} &middot; {course.duration} &middot; Kangra Valley, Dharamshala</div>
          <h2 className="modal-title">{course.title}</h2>
          <p className="modal-lead">{course.full_desc}</p>

          <h3 className="modal-section-title">Who This Retreat Is For</h3>
          <p style={{ marginBottom: "24px" }}>{course.audience}</p>

          <h3 className="modal-section-title">Anticipated Outcomes</h3>
          <p style={{ marginBottom: "32px" }}>{course.outcomes}</p>

          <h3 className="modal-section-title">Standard Daily Schedule</h3>
          <div className="schedule-table">
            <div className="schedule-row">
              <span className="schedule-time">07:00 - 08:00</span>
              <span className="schedule-activity">OSHO Dynamic Meditation (Dawn active meditation in the main hall)</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">08:00 - 09:30</span>
              <span className="schedule-activity">Wholesome Sattvic Himalayan Breakfast &amp; Silent Valley Contemplation</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">09:30 - 13:00</span>
              <span className="schedule-activity">Morning Immersion Session: Guided process, group practice &amp; inquiries</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">13:00 - 14:30</span>
              <span className="schedule-activity">Farm-to-Table Organic Vegetarian Lunch &amp; Personal Rest</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">14:30 - 16:00</span>
              <span className="schedule-activity">Afternoon Session: Technique breakdown, mindful movement &amp; Q&amp;A</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">16:00 - 16:30</span>
              <span className="schedule-activity">Himalayan Herbal Tea, Fresh Fruits &amp; Light Snacks</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">16:30 - 17:30</span>
              <span className="schedule-activity">OSHO Kundalini Meditation (Sunset shaking, dancing and stillness)</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">18:30 - 20:00</span>
              <span className="schedule-activity">OSHO Evening Meeting: High-energy celebration followed by silent sitting</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">20:00 - 21:00</span>
              <span className="schedule-activity">Nourishing Vegetarian Dinner &amp; Community Connection</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">21:00 - 22:00</span>
              <span className="schedule-activity">Optional Silence Dome Stargazing / Evening Reflection</span>
            </div>
          </div>

          <h3 className="modal-section-title">What Is Included in All-Inclusive Package</h3>
          <div className="inclusions-grid">
            <div className="inclusion-item">All meditation sessions and group workshops</div>
            <div className="inclusion-item">Accommodation according to selected category</div>
            <div className="inclusion-item">Three fresh vegetarian meals daily and herbal teas</div>
            <div className="inclusion-item">Access to Silence Dome, Open-air Gym and Library</div>
            <div className="inclusion-item">Fresh natural spring water and campus facilities</div>
            <div className="inclusion-item">All retreat taxes and service charges included</div>
          </div>

          <div className="modal-actions">
            <button className="btn" onClick={() => onReserve(course.id)}>Reserve This Retreat</button>
            <button className="btn btn-secondary" onClick={onClose}>Close Overview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
