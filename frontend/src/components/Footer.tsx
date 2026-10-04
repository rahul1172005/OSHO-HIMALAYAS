export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col-brand">
          <div className="brand-logo" style={{ marginBottom: "14px" }}>
            OSHO HIMALAYAS
            <span>Meditation Resort</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>
            A dedicated sanctuary of active meditation, silence, and unburdening set in the pristine Himalayan valleys near Dharamshala, Himachal Pradesh, India.
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Reservations Desk: reservations@oshohimalayas.com<br />
            Phone: +91 1892 245 800 &middot; Kangra District, HP
          </p>
        </div>

        <div>
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link">About us</a></li>
            <li><a href="#courses" className="footer-link">Courses</a></li>
            <li><a href="#reviews" className="footer-link">Reviews</a></li>
            <li><a href="#faqs" className="footer-link">FAQs</a></li>
            <li><a href="#how-to-reach" className="footer-link">How to reach</a></li>
            <li><a href="#gallery" className="footer-link">Gallery</a></li>
            <li><a href="#contact-us" className="footer-link">Contact us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Sanctuary Living</h4>
          <ul className="footer-links">
            <li><a href="#accommodation" className="footer-link">Shared Living</a></li>
            <li><a href="#accommodation" className="footer-link">Daya &amp; Meera Rooms</a></li>
            <li><a href="#accommodation" className="footer-link">Radha Panoramic Suite</a></li>
            <li><a href="#philosophy" className="footer-link">The Silence Dome</a></li>
            <li><a href="#schedule" className="footer-link">Daily Meditation Timetable</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Retreats &amp; Programs</h4>
          <ul className="footer-links">
            <li><a href="#courses" className="footer-link">Scheduled Retreats</a></li>
            <li><a href="#courses" className="footer-link">OMG Experience (Flexible)</a></li>
            <li><a href="#courses" className="footer-link">A Week in Silence</a></li>
            <li><a href="#courses" className="footer-link">OSHO Mystic Rose 21 Days</a></li>
            <li><a href="#courses" className="footer-link">Meditation for Busy People</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>&copy; {new Date().getFullYear()} OSHO Himalayas Meditation Resort. All rights reserved.</div>
        <div>Dharamshala, Himachal Pradesh, India &mdash; All-Inclusive Himalayan Sanctuary</div>
      </div>
    </footer>
  );
}
