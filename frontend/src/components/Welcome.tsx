export default function Welcome() {
  return (
    <section className="section welcome-section" id="about">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">About Us</div>
          <h2 className="section-title">OSHO Himalayas Welcomes You</h2>
          <p className="section-desc">
            In the busy rush of everyday life, we get dragged between responsibilities and repetitions. But sometimes, your heart needs more: a feeling of freedom, a spark of silence.
          </p>
        </div>

        <div className="contrast-grid">
          <div className="contrast-card">
            <h3 className="contrast-card-title">Everyday Modern Friction</h3>
            <ul className="contrast-list">
              <li className="contrast-item">
                <span className="contrast-num">01</span>
                <span>Chronic cognitive overload, constant digital alerts, and lack of mental quiet.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">02</span>
                <span>Subconscious emotional tension accumulated without an outlet for catharsis.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">03</span>
                <span>Sitting in traditional meditation feels rigid, strenuous, or frustrating.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">04</span>
                <span>Urban pollution, artificial schedules, and exhaustion from repetitive routines.</span>
              </li>
            </ul>
          </div>

          <div className="contrast-card">
            <h3 className="contrast-card-title">The Sanctuary Experience</h3>
            <ul className="contrast-list">
              <li className="contrast-item">
                <span className="contrast-num">01</span>
                <span>Step away from city noise into a valley where you breathe pure air and swim in fresh spring water.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">02</span>
                <span>OSHO Active Meditations are the best stress-busters you can ever experience.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">03</span>
                <span>Come to this beautiful place to meditate with beautiful people to discover a beautiful you.</span>
              </li>
              <li className="contrast-item">
                <span className="contrast-num">04</span>
                <span>The Himalayas are calling! Just a flight and 45-min cab drive from New Delhi.</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="#contact-us" className="btn btn-lg">Get in touch</a>
        </div>
      </div>
    </section>
  );
}
