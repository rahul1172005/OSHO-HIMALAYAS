"use client";

import { useState, useEffect } from "react";
import { Retreat, Accommodation, fetchRetreats, fetchAccommodations, submitEnquiry, EnquiryResponse } from "@/lib/api";

interface EnquirySectionProps {
  prefilledCourseId: string;
}

export default function EnquirySection({ prefilledCourseId }: EnquirySectionProps) {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("");
  const [roomId, setRoomId] = useState("meera");
  const [guests, setGuests] = useState(1);
  const [arrivalDate, setArrivalDate] = useState("");
  const [duration, setDuration] = useState("retreat");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EnquiryResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      const [rets, accs] = await Promise.all([
        fetchRetreats(),
        fetchAccommodations()
      ]);
      setRetreats(rets);
      setAccommodations(accs);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (prefilledCourseId) {
      setCourseId(prefilledCourseId);
    }
  }, [prefilledCourseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please complete all required fields (Name, Email, Phone).");
      return;
    }

    setLoading(true);
    const res = await submitEnquiry({
      full_name: fullName,
      email,
      phone,
      retreat_id: courseId,
      room_id: roomId,
      guests,
      arrival_date: arrivalDate,
      duration,
      notes
    });

    setResponse(res);
    setLoading(false);

    // Reset form
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");

    const banner = document.getElementById("form-success-banner");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="section enquiry-section" id="contact-us">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Connect With Us</div>
          <h2 className="section-title">Contact us</h2>
          <p className="section-desc">
            Submit your retreat inquiry below or get in touch with our team in Dharamshala for personalized itineraries, room availability, and cab assistance.
          </p>
        </div>

        <div className="enquiry-box">
          {response && (
            <div className="form-success-banner" id="form-success-banner">
              <h4 className="form-success-title">Enquiry Received Successfully</h4>
              <p style={{ fontSize: "0.92rem", color: "#404040", marginBottom: "8px" }}>
                Your enquiry reference is <strong>{response.reference_id}</strong>.
              </p>
              <p style={{ fontSize: "0.85rem", color: "#737373" }}>
                {response.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} id="enquiry-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-name">Full Name *</label>
                <input 
                  className="form-input" 
                  id="enquiry-name" 
                  type="text" 
                  placeholder="Your complete name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-email">Email Address *</label>
                <input 
                  className="form-input" 
                  id="enquiry-email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-phone">Phone / WhatsApp *</label>
                <input 
                  className="form-input" 
                  id="enquiry-phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-course">Interested Retreat or Program *</label>
                <select 
                  className="form-select" 
                  id="enquiry-course"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">Select a Retreat or Course</option>
                  {retreats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-room">Preferred Accommodation *</label>
                <select 
                  className="form-select" 
                  id="enquiry-room"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                >
                  {accommodations.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} &mdash; {a.specs} (Rs {a.rate_per_night.toLocaleString("en-IN")}/n)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-guests">Number of Guests</label>
                <select 
                  className="form-select" 
                  id="enquiry-guests"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4+ Persons (Group)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-arrival">Preferred Arrival Date</label>
                <input 
                  className="form-input" 
                  id="enquiry-arrival" 
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-duration">Length of Stay</label>
                <select 
                  className="form-select" 
                  id="enquiry-duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="retreat">Duration of Selected Retreat</option>
                  <option value="3">3 Nights (Short Getaway)</option>
                  <option value="5">5 Nights</option>
                  <option value="7">7 Nights (1 Week)</option>
                  <option value="14">14 Nights (Extended)</option>
                  <option value="21">21 Nights (Mystic Rose / Deep Reset)</option>
                  <option value="30">30 Nights (Sanctuary Sabbatical)</option>
                </select>
              </div>
            </div>

            <div className="form-full form-group">
              <label className="form-label" htmlFor="enquiry-notes">Dietary Needs, Questions or Special Requests</label>
              <textarea 
                className="form-textarea" 
                id="enquiry-notes" 
                rows={4} 
                placeholder="Mention any meditation experience, dietary requirements (vegan, gluten-free), cab pickup requests, or questions."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-lg btn-block" disabled={loading}>
              {loading ? "Submitting Enquiry..." : "Get in touch / Submit Enquiry"}
            </button>
            <div className="enquiry-note">
              No immediate payment required. Our reservations desk will reply with confirmed availability within 4 business hours.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
