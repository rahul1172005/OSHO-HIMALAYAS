"use client";

import { useState, useEffect } from "react";
import { DailyScheduleItem, fetchSchedule } from "@/lib/api";

export default function ScheduleSection() {
  const [schedule, setSchedule] = useState<DailyScheduleItem[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchSchedule();
      setSchedule(data);
    }
    load();
  }, []);

  return (
    <section className="section welcome-section" id="schedule">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Sanctuary Rhythm</div>
          <h2 className="section-title">A Typical Day at OSHO Himalayas</h2>
          <p className="section-desc">
            Life at the retreat follows a mindful, natural cadence designed to harmonize physical vitality, intellectual release, nourishing dining, and silent introspection.
          </p>
        </div>

        <div className="schedule-table" style={{ maxWidth: "860px", margin: "0 auto" }}>
          {schedule.map((item, idx) => (
            <div key={idx} className="schedule-row">
              <span className="schedule-time">{item.time_slot}</span>
              <span className="schedule-activity">{item.activity} &mdash; {item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
