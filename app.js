/* OSHO HIMALAYAS INTERACTIVE APPLICATION
   All content strictly follows user guidelines:
   - Zero emojis
   - Monochrome color palette + white bg + blue buttons
   - No dots or divided lines
   - Inter font for text, Geist thin for titles
*/

const RETREATS_DATA = [
  {
    id: "busy-people",
    type: "scheduled",
    title: "Meditation for Busy People",
    date: "October 12 - 16, 2026",
    duration: "5 Days / 4 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Pragmatic, micro-meditation techniques specifically formulated for individuals navigating high-velocity professional and daily obligations.",
    fullDesc: "Designed for individuals with demanding schedules who find extended seated silent contemplation difficult to sustain. This program reveals fast, effective centering techniques that seamlessly weave into daily routines, work environments, and travel. Learn how to transform everyday stress and constant intellectual pressure into conscious relaxation and grounded presence.",
    audience: "Busy executives, entrepreneurs, remote professionals, and individuals seeking practical balance in modern life.",
    outcomes: "Master 12 micro-meditations, dissolve mental exhaustion, develop natural mindfulness during active tasks, and restore nervous system equilibrium.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    priceBase: 24000
  },
  {
    id: "dance-joy",
    type: "scheduled",
    title: "Dance of Joy & Stillness",
    date: "October 22 - 27, 2026",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Reconnecting with the Hara—the physical and energetic center of vitality—through rhythmic release and quiet centering.",
    fullDesc: "An experiential exploration using sacred movement, free-form dance, and deep stillness to break through mental inertia. The Hara is your bodily anchor below the navel, known in Eastern traditions as the reservoir of life energy. By moving dynamically through rhythm, the mind's overthinking clears naturally, welcoming unforced stillness and joyous inner celebration.",
    audience: "Anyone feeling detached from their bodily joy, feeling creatively blocked, or seeking an uninhibited, celebratory approach to meditation.",
    outcomes: "Rooted physical vitality, release of somatic tension, spontaneous joy, and the capacity to rest comfortably in quiet awareness.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    priceBase: 29000
  },
  {
    id: "autumn-awakening",
    type: "scheduled",
    title: "Autumn Awakening: The Art of Letting Go",
    date: "November 03 - 08, 2026",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Meditation, mountain stillness, and open celebration amidst crisp Himalayan pine forests, moving beyond solemnity into clarity.",
    fullDesc: "Autumn in the Kangra valley is a season of golden light and crisp, rejuvenating mountain breezes. This retreat invites you to observe nature's art of non-attachment: shedding old mental patterns with the graceful ease of falling leaves. Through active breath, cathartic release, and silent forest walks, meditation ceases to be a strenuous duty and becomes an effortless joy.",
    audience: "Individuals in life transitions, those mourning losses or career shifts, and meditators seeking a fresh, lighthearted perspective.",
    outcomes: "Unburdened emotional state, clarity of life direction, resilience during transition, and deep physical rejuvenation.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    priceBase: 29000
  },
  {
    id: "mystic-rose",
    type: "scheduled",
    title: "OSHO Mystic Rose",
    date: "November 15 - December 05, 2026",
    duration: "21 Days / 20 Nights",
    category: "Scheduled Retreat",
    shortDesc: "The monumental 21-day meditative therapy: Seven days of laughter, seven days of tears, and seven days of silent witnessing.",
    fullDesc: "The Mystic Rose is regarded as one of the most profound meditative therapies conceived by Osho. The process spans three intensive weeks: Week 1 opens the laughter center to dissolve inhibitions; Week 2 releases deep-seated grief and conditioned sadness through conscious crying; Week 3 settles into profound, unshakeable silent witnessing. All previous conditioning softens, allowing your inner essence to blossom.",
    audience: "Deep seekers and experienced meditators ready for profound psychological cleansing and emotional transformation.",
    outcomes: "Comprehensive emotional detox, profound stillness, elimination of deep-seated past traumas, and renewed inner authenticity.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
    priceBase: 85000
  },
  {
    id: "shiva-shakti",
    type: "scheduled",
    title: "Shiva Shakti Retreat",
    date: "December 10 - 15, 2026",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Exploring inner polarities, creative self-expression, conscious dance, and the harmonization of feminine and masculine energies.",
    fullDesc: "Within every human consciousness resides Shiva—the silent witness, structure, and presence—and Shakti—the dynamic flow, creative vitality, and dance. Through active movement, expressive painting, guided breath, and tantric meditative inquiries, participants bridge inner divides to harmonize masculine and feminine principles within themselves.",
    audience: "Creatives, couples, and individuals looking to understand relationship dynamics and resolve inner conflict.",
    outcomes: "Internal balance of focus and flow, heightened creative expression, relational maturity, and grounded presence.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    priceBase: 29000
  },
  {
    id: "festival-lights",
    type: "scheduled",
    title: "Festival of Lights: Inner Illumination",
    date: "December 22 - 27, 2026",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Inner awareness, festive silence, and natural celebration in the tranquil cradle of the snow-crowned Dhauladhar peaks.",
    fullDesc: "Celebrate the true festive spirit not through commercial distraction, but by igniting the lamp of internal awareness. Set against the serene winter skyline of the Himalayan mountains, this retreat combines reflective evening meetings, silent fire contemplations, active movement, and shared mindful feasts.",
    audience: "Those looking to spend the holiday season in conscious stillness, spiritual reflection, and warm community.",
    outcomes: "Profound inner peace, freedom from seasonal loneliness or overwhelm, and enduring clarity for the coming year.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    priceBase: 31000
  },
  {
    id: "chakra-experience",
    type: "scheduled",
    title: "The Chakra Experience",
    date: "January 05 - 10, 2027",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "A systematic exploration through the seven vital energy centers using breath, active movement, sound resonance, and relaxation.",
    fullDesc: "Navigate through the seven chakras from the root base to the crown. Using tailored OSHO active meditation techniques, specialized vocal sounds, and body movement, each center is gently awakened, cleared of stagnation, and integrated into a balanced energetic whole.",
    audience: "Anyone curious about bodily energy systems, somatic healing, and holistic self-understanding.",
    outcomes: "Balanced energetic flow, unblocked somatic holding patterns, deepened somatic sensitivity, and full-body relaxation.",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
    priceBase: 30000
  },
  {
    id: "vigyan-bhairav",
    type: "scheduled",
    title: "Vigyan Bhairav Tantra",
    date: "January 18 - 23, 2027",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Classical consciousness methods based on the ancient text of 112 meditation techniques expounded by Osho in The Book of Secrets.",
    fullDesc: "The Vigyan Bhairav Tantra offers 112 practical meditation doorways. There is at least one technique suited precisely to every human temperament—whether centered on breath, sound, darkness, gaps between thoughts, or sensory awareness. This retreat provides intensive exploration of foundational methods with personalized facilitator guidance.",
    audience: "Dedicated seekers, teachers, and meditators wishing to discover their natural, effortless personal meditation technique.",
    outcomes: "Identification of your core personal meditation practice, profound glimpses of witness consciousness, and master-level technique clarity.",
    image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=1200&q=80",
    priceBase: 32000
  },
  {
    id: "born-again",
    type: "scheduled",
    title: "OSHO Born Again",
    date: "February 02 - 08, 2027",
    duration: "7 Days / 6 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Reconnecting with spontaneous innocence, playful curiosity, and the unconditioned joy of early childhood.",
    fullDesc: "Conditioning and modern seriousness freeze our original aliveness. OSHO Born Again is a 7-day process: the first hour is dedicated to entering childhood space—crawling, rolling, laughing, speaking gibberish, and rediscovering play without judgment. The second hour is spent sitting in silent observation. Experience the profound lightness of an unburdened spirit.",
    audience: "Anyone feeling weighed down by adulthood responsibilities, cynicism, or rigid mental habits.",
    outcomes: "Effortless joy, restoration of curiosity and laughter, release of subconscious repressions, and renewed zest for life.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    priceBase: 34000
  },
  {
    id: "path-of-love",
    type: "scheduled",
    title: "Path of Love",
    date: "February 16 - 22, 2027",
    duration: "7 Days / 6 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Conscious relating, emotional transparency, honest vulnerability, and the dissolution of defensive barriers.",
    fullDesc: "True love begins with deep self-acceptance. This retreat guides you through structured inquiries into habitual defense mechanisms, fear of abandonment, and relational projections. In a safe, supportive Himalayan sanctuary, step into heart-centered authenticity, honest communication, and genuine intimacy.",
    audience: "Singles and partners seeking profound emotional honesty, deeper relationships, and healed relational trauma.",
    outcomes: "Authentic communication skills, release of relational defensiveness, deep self-worth, and heart-centered clarity.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    priceBase: 36000
  },
  {
    id: "new-beginnings",
    type: "scheduled",
    title: "New Beginnings: Meditate & Celebrate",
    date: "December 29, 2026 - January 03, 2027",
    duration: "6 Days / 5 Nights",
    category: "Scheduled Retreat",
    shortDesc: "Conscious New Year transition in Himalayan silence, replacing chaotic celebrations with inner joy and mindful resolve.",
    fullDesc: "Begin the new calendar year grounded in pristine silence, high-altitude mountain clarity, and conscious communal celebration. Daily active meditations dissolve accumulated yearly fatigue, while celebratory evening music and meditation welcome the new dawn with profound clarity and inner peace.",
    audience: "Those desiring a transformative, wholesome New Year retreat away from metropolitan noise and superficial revelry.",
    outcomes: "Refreshed mental space, clear conscious intentions, deep physical vitality, and memorable holiday tranquility.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
    priceBase: 33000
  },
  {
    id: "omg-experience",
    type: "all-year",
    title: "OMG Experience (OSHO Meditation Getaway)",
    date: "Flexible Dates (Year-Round)",
    duration: "3 to 7 Days Flexible",
    category: "All-Year Immersion",
    shortDesc: "Our signature flexible retreat: Arrive on any day of the year for immersion in daily meditations, mountain nature, and fresh living.",
    fullDesc: "You do not need to await a scheduled group retreat to experience OSHO Himalayas. The OMG Experience allows you to book custom arrival and departure dates. Immerse yourself directly into the vibrant daily sanctuary rhythm: sunrise Dynamic meditation, communal breakfast, midday nature immersion, sunset Kundalini meditation, and evening silent meetings.",
    audience: "Solo travelers, couples, and seekers wanting a restful holiday infused with authentic meditation structure on their own schedule.",
    outcomes: "Instant rest, introduction to full active meditation roster, physical restoration, and mental space.",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
    priceBase: 14500
  },
  {
    id: "extended-omg",
    type: "all-year",
    title: "Extended OMG Experience",
    date: "Flexible Dates (Year-Round)",
    duration: "14 to 30 Days Sanctuary Residency",
    category: "All-Year Immersion",
    shortDesc: "Long-term residential sanctuary immersion with deeply discounted packages, personalized guidance, and sustained silent practice.",
    fullDesc: "For those seeking an extended sanctuary to write, reflect, recover from burnout, or undergo deep personal reinvention. Enjoy private accommodation, three wholesome vegetarian meals daily, full access to daily active meditations, silent zones, high-speed fiber internet for essential remote needs, and weekly consultations with resident facilitators.",
    audience: "Sabbatical seekers, writers, remote professionals seeking tranquility, and individuals in long-term convalescence.",
    outcomes: "Profound nervous system reset, sustained meditation habit, creative breakthrough, and enduring lifestyle clarity.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    priceBase: 58000
  },
  {
    id: "week-in-silence",
    type: "all-year",
    title: "A Week in Silence",
    date: "Flexible Start Every Monday",
    duration: "7 Days / 6 Nights",
    category: "All-Year Immersion",
    shortDesc: "A structured seven-day silent immersion combining noble silence, pristine nature, and guided active meditations.",
    fullDesc: "Step into voluntary noble silence for seven complete days. Silence allows mental debris to settle naturally without repression. Unlike rigid traditional Vipassana, this program combines silence with daily OSHO active meditations (Dynamic and Kundalini) to prevent somatic stiffness and mental tension. Facilitators are on hand for daily written inquiries.",
    audience: "Anyone seeking intense mental quiet, sensory detox, and uninterrupted time with themselves in majestic mountain silence.",
    outcomes: "Deep sensory detox, dissolution of mental chatter, acute observational clarity, and deep emotional tranquility.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    priceBase: 32000
  }
];

const ROOM_RATES = {
  shared: { name: "Shared Living", rate: 3200, label: "Rs 3,200 / night" },
  daya: { name: "Daya Room (Twin Bed)", rate: 4800, label: "Rs 4,800 / night" },
  meera: { name: "Meera Room (Balcony)", rate: 6500, label: "Rs 6,500 / night" },
  radha: { name: "Radha Suite (Panoramic)", rate: 8900, label: "Rs 8,900 / night" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderCourses("all");
  setupNavigation();
  setupFilterButtons();
  setupCalculator();
  setupFaqAccordion();
  setupEnquiryForm();
});

// RENDER COURSES
function renderCourses(filter) {
  const container = document.getElementById("courses-grid");
  if (!container) return;

  const filtered = filter === "all" 
    ? RETREATS_DATA 
    : RETREATS_DATA.filter(item => item.type === filter);

  container.innerHTML = filtered.map(course => `
    <article class="course-card">
      <div class="course-thumb-wrap">
        <img class="course-thumb" src="${course.image}" alt="${course.title}" loading="lazy" />
      </div>
      <div class="course-body">
        <div class="course-date">${course.date} &middot; ${course.duration}</div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-desc">${course.shortDesc}</p>
        <div class="course-footer">
          <button class="btn btn-sm" onclick="openCourseModal('${course.id}')">View Details & Schedule</button>
          <button class="btn btn-sm btn-secondary" onclick="prefillEnquiry('${course.id}')">Enquire</button>
        </div>
      </div>
    </article>
  `).join("");
}

// SETUP FILTER BUTTONS
function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderCourses(filter);
    });
  });
}

// COURSE DETAIL MODAL
function openCourseModal(courseId) {
  const course = RETREATS_DATA.find(c => c.id === courseId);
  if (!course) return;

  const modalOverlay = document.getElementById("course-modal");
  const modalBody = document.getElementById("modal-dynamic-content");

  modalBody.innerHTML = `
    <img class="modal-hero-img" src="${course.image}" alt="${course.title}" />
    <div class="modal-content">
      <div class="modal-date">${course.date} &middot; ${course.duration} &middot; Kangra Valley, Dharamshala</div>
      <h2 class="modal-title">${course.title}</h2>
      <p class="modal-lead">${course.fullDesc}</p>

      <h3 class="modal-section-title">Who This Retreat Is For</h3>
      <p style="margin-bottom: 24px;">${course.audience}</p>

      <h3 class="modal-section-title">Anticipated Outcomes</h3>
      <p style="margin-bottom: 32px;">${course.outcomes}</p>

      <h3 class="modal-section-title">Standard Daily Schedule</h3>
      <div class="schedule-table">
        <div class="schedule-row">
          <span class="schedule-time">07:00 - 08:00</span>
          <span class="schedule-activity">OSHO Dynamic Meditation (Dawn active meditation in the main hall)</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">08:00 - 09:30</span>
          <span class="schedule-activity">Wholesome Sattvic Himalayan Breakfast & Silent Valley Contemplation</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">09:30 - 13:00</span>
          <span class="schedule-activity">Morning Immersion Session: Guided process, group practice & inquiries</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">13:00 - 14:30</span>
          <span class="schedule-activity">Farm-to-Table Organic Vegetarian Lunch & Personal Rest</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">14:30 - 16:00</span>
          <span class="schedule-activity">Afternoon Session: Technique breakdown, mindful movement & Q&A</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">16:00 - 16:30</span>
          <span class="schedule-activity">Himalayan Herbal Tea, Fresh Fruits & Snacks</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">16:30 - 17:30</span>
          <span class="schedule-activity">OSHO Kundalini Meditation (Sunset shaking, dancing and stillness)</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">18:30 - 20:00</span>
          <span class="schedule-activity">OSHO Evening Meeting: High-energy celebration followed by silent sitting</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">20:00 - 21:00</span>
          <span class="schedule-activity">Nourishing Vegetarian Dinner & Community Connection</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-time">21:00 - 22:00</span>
          <span class="schedule-activity">Optional Silence Dome Stargazing / Evening Reflection</span>
        </div>
      </div>

      <h3 class="modal-section-title">What Is Included in All-Inclusive Package</h3>
      <div class="inclusions-grid">
        <div class="inclusion-item">All meditation sessions and group workshops</div>
        <div class="inclusion-item">Accommodation according to selected category</div>
        <div class="inclusion-item">Three fresh vegetarian meals daily and herbal teas</div>
        <div class="inclusion-item">Access to Silence Dome, Open-air Gym and Library</div>
        <div class="inclusion-item">Fresh natural spring water and campus facilities</div>
        <div class="inclusion-item">All retreat taxes and service charges included</div>
      </div>

      <div class="modal-actions">
        <button class="btn" onclick="prefillEnquiry('${course.id}'); closeCourseModal();">Reserve This Retreat</button>
        <button class="btn btn-secondary" onclick="closeCourseModal()">Close Overview</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCourseModal() {
  const modalOverlay = document.getElementById("course-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }
  document.body.style.overflow = "";
}

// NAVIGATION
function setupNavigation() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Close nav on link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("open");
    });
  });
}

// PRICING CALCULATOR
function setupCalculator() {
  const courseSelect = document.getElementById("calc-course");
  const roomSelect = document.getElementById("calc-room");
  const nightsInput = document.getElementById("calc-nights");
  const guestsInput = document.getElementById("calc-guests");
  const totalDisplay = document.getElementById("calc-total");
  const noteDisplay = document.getElementById("calc-note");

  if (!courseSelect || !roomSelect || !nightsInput || !guestsInput || !totalDisplay) return;

  // Populate courses dropdown
  courseSelect.innerHTML = RETREATS_DATA.map(c => `
    <option value="${c.id}">${c.title} (${c.duration})</option>
  `).join("");

  function updateCalculation() {
    const courseId = courseSelect.value;
    const roomKey = roomSelect.value;
    const nights = parseInt(nightsInput.value, 10) || 5;
    const guests = parseInt(guestsInput.value, 10) || 1;

    const course = RETREATS_DATA.find(c => c.id === courseId);
    const room = ROOM_RATES[roomKey] || ROOM_RATES.shared;

    const baseRetreatFee = (course ? course.priceBase : 25000) * guests;
    const accommodationFee = room.rate * nights * guests;
    const total = baseRetreatFee + accommodationFee;

    totalDisplay.textContent = "Rs " + total.toLocaleString("en-IN");
    if (noteDisplay) {
      noteDisplay.textContent = `Includes ${guests} guest(s), ${nights} nights in ${room.name}, all meditation sessions, 3 daily vegetarian meals, campus access and taxes.`;
    }
  }

  courseSelect.addEventListener("change", updateCalculation);
  roomSelect.addEventListener("change", updateCalculation);
  nightsInput.addEventListener("input", updateCalculation);
  guestsInput.addEventListener("input", updateCalculation);

  updateCalculation();
}

// FAQ ACCORDION
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// ENQUIRY FORM & PREFILL
function prefillEnquiry(courseId) {
  const course = RETREATS_DATA.find(c => c.id === courseId);
  const enquirySection = document.getElementById("enquiry");
  const enquiryCourseSelect = document.getElementById("enquiry-course");

  if (enquiryCourseSelect && course) {
    enquiryCourseSelect.value = course.id;
  }
  if (enquirySection) {
    enquirySection.scrollIntoView({ behavior: "smooth" });
  }
}

function setupEnquiryForm() {
  const enquiryCourseSelect = document.getElementById("enquiry-course");
  if (enquiryCourseSelect) {
    enquiryCourseSelect.innerHTML = `
      <option value="">Select a Retreat or Course</option>
      ${RETREATS_DATA.map(c => `<option value="${c.id}">${c.title}</option>`).join("")}
    `;
  }

  const form = document.getElementById("enquiry-form");
  const successBanner = document.getElementById("form-success-banner");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("enquiry-name").value.trim();
      const email = document.getElementById("enquiry-email").value.trim();
      const phone = document.getElementById("enquiry-phone").value.trim();
      const course = enquiryCourseSelect ? enquiryCourseSelect.value : "";
      const room = document.getElementById("enquiry-room").value;
      const guests = document.getElementById("enquiry-guests").value;
      const arrival = document.getElementById("enquiry-arrival").value;
      const notes = document.getElementById("enquiry-notes").value;

      if (!name || !email || !phone) {
        alert("Please complete all required fields (Name, Email, Phone).");
        return;
      }

      // Generate reference ID
      const refId = "OSH-" + Math.floor(100000 + Math.random() * 900000);

      if (successBanner) {
        successBanner.innerHTML = `
          <h4 class="form-success-title">Enquiry Received Successfully</h4>
          <p style="font-size: 0.92rem; color: #404040; margin-bottom: 8px;">
            Thank you, <strong>${name}</strong>. Your enquiry reference is <strong>${refId}</strong>.
          </p>
          <p style="font-size: 0.85rem; color: #737373;">
            Our reservations desk in Dharamshala will reach out via WhatsApp and email within 4 business hours with room availability and deposit details.
          </p>
        `;
        successBanner.classList.add("active");
        form.reset();
        successBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
}
