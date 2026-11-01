export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col-brand">
          <div className="footer-brand-logo">
            <img
              src="/osho-logo.png"
              alt="OSHO Himalayas Wellness Resort"
              className="footer-logo-img"
            />
          </div>
          <p className="footer-brand-desc">
            A wellness resort for meditation, celebration, and connecting with friends in the pristine
            Himalayan valley.
          </p>
          <p className="footer-trademark-text">
            OSHO is a registered trademark of OSHO International Foundation.
          </p>
          <p className="footer-disclaimer-text">
            All OSHO quotes, photos and OSHO Meditation descriptions used with permission of OSHO
            International Foundation - all rights reserved.
          </p>
        </div>

        <div className="footer-col-nav">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#schedule" className="footer-link">Courses</a></li>
            <li><a href="#reviews" className="footer-link">Reviews</a></li>
            <li><a href="#faq" className="footer-link">FAQs</a></li>
            <li><a href="#reach" className="footer-link">How to reach</a></li>
            <li><a href="#virtual-tour" className="footer-link">Campus tour</a></li>
            <li><a href="#contact-us" className="footer-link">Contact us</a></li>
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
