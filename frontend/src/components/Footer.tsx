export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col-brand">
          <div className="footer-brand-logo">
            <span className="brand-osho">OSHO</span>
            <span className="brand-himalayas">Himalayas</span>
          </div>
          <p className="footer-brand-desc">
            An OSHO Meditation Resort in the Himalayas. Step away from city noise and come to this
            valley where you can breathe pure air, swim in fresh spring water, and dive deep into
            meditation.
          </p>
          <div className="footer-contact-details">
            <p><strong>Sanctuary Desk:</strong> info@oshohimalayas.com</p>
            <p><strong>Location:</strong> Dharamshala, Kangra District, Himachal Pradesh, India</p>
          </div>
        </div>

        <div>
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#hero" className="footer-link">Home</a></li>
            <li><a href="#about" className="footer-link">About Sanctuary</a></li>
            <li><a href="#schedule" className="footer-link">Courses &amp; Schedule</a></li>
            <li><a href="#reviews" className="footer-link">Guest Reviews</a></li>
            <li><a href="#faq" className="footer-link">FAQs</a></li>
            <li><a href="#reach" className="footer-link">How to Reach</a></li>
            <li><a href="#virtual-tour" className="footer-link">360° Campus Tour</a></li>
            <li><a href="#contact-us" className="footer-link">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Featured Retreats</h4>
          <ul className="footer-links">
            <li><a href="#schedule" className="footer-link">Shiva Shakti Retreat</a></li>
            <li><a href="#schedule" className="footer-link">Festival of Lights</a></li>
            <li><a href="#schedule" className="footer-link">The Chakra Experience</a></li>
            <li><a href="#schedule" className="footer-link">Vigyan Bhairav Tantra</a></li>
            <li><a href="#schedule" className="footer-link">OSHO Born Again</a></li>
            <li><a href="#schedule" className="footer-link">Path of Love</a></li>
            <li><a href="#schedule" className="footer-link">OSHO Mystic Rose</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Sanctuary Amenities</h4>
          <ul className="footer-links">
            <li><span className="footer-static-item">OSHO Active Meditations (5x Daily)</span></li>
            <li><span className="footer-static-item">Pure Natural Spring Swimming Pool</span></li>
            <li><span className="footer-static-item">Fresh Vegetarian Organic Dining</span></li>
            <li><span className="footer-static-item">Cedar Forest Silence Walks</span></li>
            <li><span className="footer-static-item">Open Mountain Gym &amp; Library</span></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} OSHO Himalayas Meditation Resort. All rights reserved.
        </div>
        <div>Dharamshala, Himachal Pradesh, India &mdash; All-Inclusive Meditative Sanctuary</div>
      </div>
    </footer>
  );
}
