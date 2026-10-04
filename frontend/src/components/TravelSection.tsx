export default function TravelSection() {
  return (
    <section className="section" id="how-to-reach">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Travel Directions</div>
          <h2 className="section-title">How to reach</h2>
          <p className="section-desc">
            Nestled near Dharamshala in the Kangra District of Himachal Pradesh, our retreat is easily accessible by air, road, and high-speed rail.
          </p>
        </div>

        <div className="travel-grid">
          <div className="travel-card">
            <h3 className="travel-mode">By Air</h3>
            <div className="travel-time">45 Minutes from Kangra Airport</div>
            <p className="travel-desc">
              Daily direct flights operate from New Delhi (DEL) to Dharamshala / Kangra Airport (DHM). Our reservation desk coordinates pre-arranged taxi transfers directly to the sanctuary gates.
            </p>
          </div>

          <div className="travel-card">
            <h3 className="travel-mode">By Train</h3>
            <div className="travel-time">Vande Bharat Express Route</div>
            <p className="travel-desc">
              Board the high-speed Vande Bharat Express from New Delhi to Amb Andaura station. From the station, enjoy a scenic 2-hour taxi journey through gentle Himalayan pine slopes.
            </p>
          </div>

          <div className="travel-card">
            <h3 className="travel-mode">By Luxury Bus</h3>
            <div className="travel-time">Overnight Volvo Express</div>
            <p className="travel-desc">
              Comfortable semi-sleeper Volvo buses depart daily from New Delhi (ISBT Kashmere Gate or Majnu-ka-Tilla) directly to Dharamshala. Arrive refreshed in the morning mountain air.
            </p>
          </div>

          <div className="travel-card">
            <h3 className="travel-mode">Sanctuary Cab Desk</h3>
            <div className="travel-time">Direct Door-to-Door Service</div>
            <p className="travel-desc">
              Let us know your travel schedule when reserving. Our dedicated transport team arranges verified local drivers for airport, railway station, or intercity pickups at standard rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
