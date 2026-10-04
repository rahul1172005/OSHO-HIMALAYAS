"use client";

import { useState, useEffect } from "react";
import { 
  Accommodation, Retreat, fetchAccommodations, fetchRetreats, 
  calculateStayPrice, PriceCalculationResponse 
} from "@/lib/api";

export default function AccommodationSection() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  
  const [selectedCourseId, setSelectedCourseId] = useState<string>("busy-people");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("meera");
  const [nights, setNights] = useState<number>(5);
  const [guests, setGuests] = useState<number>(1);
  const [calcResult, setCalcResult] = useState<PriceCalculationResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      const [accs, rets] = await Promise.all([
        fetchAccommodations(),
        fetchRetreats()
      ]);
      setAccommodations(accs);
      setRetreats(rets);
      if (rets.length > 0) setSelectedCourseId(rets[0].id);
      if (accs.length > 0) setSelectedRoomId(accs[2]?.id || accs[0].id);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function calculate() {
      if (!selectedCourseId || !selectedRoomId) return;
      const res = await calculateStayPrice({
        retreat_id: selectedCourseId,
        room_id: selectedRoomId,
        nights: nights || 1,
        guests: guests || 1
      });
      setCalcResult(res);
    }
    calculate();
  }, [selectedCourseId, selectedRoomId, nights, guests]);

  return (
    <section className="section" id="accommodation">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">Living Spaces</div>
          <h2 className="section-title">Sanctuary Accommodations</h2>
          <p className="section-desc">
            All programs are provided as complete all-inclusive retreats. Your stay includes course tuition, accommodation, three nutritious vegetarian meals daily, herbal teas, and full access to sanctuary facilities.
          </p>
        </div>

        <div className="accommodations-grid">
          {accommodations.map((room) => (
            <div key={room.id} className="acc-card">
              <img className="acc-thumb" src={room.image} alt={room.name} loading="lazy" />
              <div className="acc-body">
                <h3 className="acc-name">{room.name}</h3>
                <div className="acc-specs">{room.specs}</div>
                <p className="acc-desc">{room.description}</p>
                <div className="acc-price-box">
                  <div className="acc-price-from">All-Inclusive from</div>
                  <div className="acc-rate">Rs {room.rate_per_night.toLocaleString("en-IN")} / night</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PACKAGE ESTIMATOR CALCULATOR (POWERED BY FASTAPI) */}
        <div className="calc-wrapper">
          <div className="calc-grid">
            <div>
              <div className="section-eyebrow">FastAPI Pricing Engine</div>
              <h3 className="calc-heading" style={{ fontFamily: "var(--font-title)", fontWeight: 200, marginBottom: "18px" }}>
                Calculate Your All-Inclusive Stay
              </h3>
              <p style={{ fontSize: "0.94rem", color: "var(--text-muted)", marginBottom: "28px" }}>
                Estimate total costs including course tuition, room category, all meals, and sanctuary amenities.
              </p>

              <div className="calc-controls">
                <div className="form-group">
                  <label className="form-label" htmlFor="calc-course">Select Program</label>
                  <select 
                    className="form-select" 
                    id="calc-course"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    {retreats.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title} ({r.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="calc-room">Room Category</label>
                  <select 
                    className="form-select" 
                    id="calc-room"
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                  >
                    {accommodations.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} (Rs {a.rate_per_night.toLocaleString("en-IN")}/n)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="calc-nights">Total Nights</label>
                  <input 
                    className="form-input" 
                    id="calc-nights" 
                    type="number" 
                    min={1} 
                    max={60} 
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="calc-guests">Number of Guests</label>
                  <input 
                    className="form-input" 
                    id="calc-guests" 
                    type="number" 
                    min={1} 
                    max={10} 
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>
            </div>

            <div className="calc-summary-card">
              <div className="calc-summary-title">Estimated All-Inclusive Total</div>
              <div className="calc-total-amount">
                {calcResult ? `Rs ${calcResult.total_amount.toLocaleString("en-IN")}` : "Calculating..."}
              </div>
              <div className="calc-note">
                {calcResult && (
                  <>
                    Includes {guests} guest(s), {nights} nights in {calcResult.room_name}, all meditation sessions, 3 daily vegetarian meals, campus access and taxes.
                  </>
                )}
              </div>
              <a href="#enquiry" className="btn btn-block">Confirm This Selection</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
