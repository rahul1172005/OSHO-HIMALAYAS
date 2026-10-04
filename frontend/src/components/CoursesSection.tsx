"use client";

import { useState, useEffect } from "react";
import { Retreat, fetchRetreats } from "@/lib/api";
import CourseModal from "./CourseModal";

interface CoursesSectionProps {
  onSelectCourseForEnquiry: (courseId: string) => void;
}

export default function CoursesSection({ onSelectCourseForEnquiry }: CoursesSectionProps) {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [filter, setFilter] = useState<"all" | "scheduled" | "all-year">("all");
  const [selectedCourse, setSelectedCourse] = useState<Retreat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchRetreats(filter === "all" ? undefined : filter);
      setRetreats(data);
      setLoading(false);
    }
    load();
  }, [filter]);

  const handleReserve = (courseId: string) => {
    setSelectedCourse(null);
    onSelectCourseForEnquiry(courseId);
    const enquirySec = document.getElementById("enquiry");
    if (enquirySec) {
      enquirySec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section courses-section" id="courses">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Retreat Catalogue</div>
          <h2 className="section-title">Transformative Programs in the Himalayas</h2>
          <p className="section-desc">
            Choose between scheduled group retreats led by certified facilitators or flexible all-year individual meditation immersions on your own dates.
          </p>
        </div>

        <div className="courses-filter-bar">
          <button 
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Programs
          </button>
          <button 
            className={`filter-btn ${filter === "scheduled" ? "active" : ""}`}
            onClick={() => setFilter("scheduled")}
          >
            Scheduled Retreats
          </button>
          <button 
            className={`filter-btn ${filter === "all-year" ? "active" : ""}`}
            onClick={() => setFilter("all-year")}
          >
            All-Year Immersions
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            Loading sanctuary programs...
          </div>
        ) : (
          <div className="courses-grid" id="courses-grid">
            {retreats.map((course) => (
              <article key={course.id} className="course-card">
                <div className="course-thumb-wrap">
                  <img className="course-thumb" src={course.image} alt={course.title} loading="lazy" />
                </div>
                <div className="course-body">
                  <div className="course-date">{course.date} &middot; {course.duration}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.short_desc}</p>
                  <div className="course-footer">
                    <button className="btn btn-sm" onClick={() => setSelectedCourse(course)}>
                      View Details &amp; Schedule
                    </button>
                    <button 
                      className="btn btn-sm btn-secondary" 
                      onClick={() => handleReserve(course.id)}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)}
        onReserve={handleReserve}
      />
    </section>
  );
}
