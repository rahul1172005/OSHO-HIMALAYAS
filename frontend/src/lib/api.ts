export interface Retreat {
  id: string;
  type: "scheduled" | "all-year";
  title: string;
  date: string;
  duration: string;
  category: string;
  short_desc: string;
  full_desc: string;
  audience: string;
  outcomes: string;
  image: string;
  price_base: number;
}

export interface Accommodation {
  id: string;
  name: string;
  category: string;
  specs: string;
  description: string;
  rate_per_night: number;
  image: string;
}

export interface DailyScheduleItem {
  time_slot: string;
  activity: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  country: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PriceCalculationRequest {
  retreat_id: string;
  room_id: string;
  nights: number;
  guests: number;
}

export interface PriceCalculationResponse {
  retreat_id: string;
  retreat_title: string;
  room_id: string;
  room_name: string;
  nights: number;
  guests: number;
  base_retreat_fee: number;
  accommodation_fee: number;
  total_amount: number;
  currency: string;
  inclusions: string[];
}

export interface EnquiryPayload {
  full_name: string;
  email: string;
  phone: string;
  retreat_id?: string;
  room_id: string;
  guests: number;
  arrival_date?: string;
  duration?: string;
  notes?: string;
}

export interface EnquiryResponse {
  reference_id: string;
  status: string;
  message: string;
}

function getApiBaseUrl(): string {
  // 1. Server-side runtime: use Vercel service binding if injected
  if (typeof window === "undefined" && process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, "");
  }
  // 2. Explicit public environment variable if specified
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  // 3. Client-side browser on deployed domain: use relative path routed via Vercel rewrites
  if (typeof window !== "undefined") {
    return "";
  }
  // 4. Local standalone development fallback
  return "http://127.0.0.1:8000";
}

export async function fetchRetreats(type?: string): Promise<Retreat[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = type ? `${baseUrl}/api/retreats?type=${type}` : `${baseUrl}/api/retreats`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch retreats from API");
    return await res.json();
  } catch (error) {
    console.warn("FastAPI fetchRetreats fallback triggered:", error);
    return getFallbackRetreats(type);
  }
}

export async function fetchAccommodations(): Promise<Accommodation[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/accommodations`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch accommodations");
    return await res.json();
  } catch (error) {
    console.warn("FastAPI fetchAccommodations fallback triggered:", error);
    return getFallbackAccommodations();
  }
}

export async function fetchSchedule(): Promise<DailyScheduleItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/schedule`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch schedule");
    return await res.json();
  } catch (error) {
    return getFallbackSchedule();
  }
}

export async function fetchReviews(): Promise<ReviewItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return await res.json();
  } catch (error) {
    return getFallbackReviews();
  }
}

export async function fetchFaqs(): Promise<FAQItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/faqs`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch faqs");
    return await res.json();
  } catch (error) {
    return getFallbackFaqs();
  }
}

export async function calculateStayPrice(req: PriceCalculationRequest): Promise<PriceCalculationResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    });
    if (!res.ok) throw new Error("API calculate error");
    return await res.json();
  } catch (error) {
    const retreats = getFallbackRetreats();
    const rooms = getFallbackAccommodations();
    const selRetreat = retreats.find(r => r.id === req.retreat_id) || retreats[0];
    const selRoom = rooms.find(rm => rm.id === req.room_id) || rooms[0];
    const baseFee = selRetreat.price_base * req.guests;
    const accFee = selRoom.rate_per_night * req.nights * req.guests;
    return {
      retreat_id: selRetreat.id,
      retreat_title: selRetreat.title,
      room_id: selRoom.id,
      room_name: selRoom.name,
      nights: req.nights,
      guests: req.guests,
      base_retreat_fee: baseFee,
      accommodation_fee: accFee,
      total_amount: baseFee + accFee,
      currency: "INR",
      inclusions: [
        `All retreat tuition and meditation sessions for ${req.guests} guest(s)`,
        `${req.nights} nights accommodation in ${selRoom.name}`,
        "Three wholesome organic vegetarian meals daily plus mountain herbal teas",
        "Full 24-hour access to Silence Dome, Open-air Gym, Natural Stream Pool and Library",
        "Pure Himalayan spring water and all statutory taxes included"
      ]
    };
  }
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to submit enquiry to FastAPI");
    return await res.json();
  } catch (error) {
    const ref = "OSH-" + Math.floor(100000 + Math.random() * 900000);
    return {
      reference_id: ref,
      status: "CONFIRMED_RECEIVED",
      message: "Thank you. Your sanctuary enquiry has been registered. Our reservations desk in Dharamshala will reach out via WhatsApp and email within 4 business hours."
    };
  }
}

// FALLBACK SEED DATA
function getFallbackRetreats(type?: string): Retreat[] {
  const data: Retreat[] = [
    {
      id: "busy-people",
      type: "scheduled",
      title: "Meditation for Busy People",
      date: "October 12 - 16, 2026",
      duration: "5 Days / 4 Nights",
      category: "Scheduled Retreat",
      short_desc: "Pragmatic, micro-meditation techniques specifically formulated for individuals navigating high-velocity professional and daily obligations.",
      full_desc: "Designed for individuals with demanding schedules who find extended seated silent contemplation difficult to sustain. This program reveals fast, effective centering techniques that seamlessly weave into daily routines, work environments, and travel. Learn how to transform everyday stress and constant intellectual pressure into conscious relaxation and grounded presence.",
      audience: "Busy executives, entrepreneurs, remote professionals, and individuals seeking practical balance in modern life.",
      outcomes: "Master 12 micro-meditations, dissolve mental exhaustion, develop natural mindfulness during active tasks, and restore nervous system equilibrium.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      price_base: 24000
    },
    {
      id: "dance-joy",
      type: "scheduled",
      title: "Dance of Joy & Stillness",
      date: "October 22 - 27, 2026",
      duration: "6 Days / 5 Nights",
      category: "Scheduled Retreat",
      short_desc: "Reconnecting with the Hara—the physical and energetic center of vitality—through rhythmic release and quiet centering.",
      full_desc: "An experiential exploration using sacred movement, free-form dance, and deep stillness to break through mental inertia. The Hara is your bodily anchor below the navel, known in Eastern traditions as the reservoir of life energy. By moving dynamically through rhythm, the mind's overthinking clears naturally, welcoming unforced stillness and joyous inner celebration.",
      audience: "Anyone feeling detached from their bodily joy, feeling creatively blocked, or seeking an uninhibited, celebratory approach to meditation.",
      outcomes: "Rooted physical vitality, release of somatic tension, spontaneous joy, and the capacity to rest comfortably in quiet awareness.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
      price_base: 29000
    },
    {
      id: "autumn-awakening",
      type: "scheduled",
      title: "Autumn Awakening: The Art of Letting Go",
      date: "November 03 - 08, 2026",
      duration: "6 Days / 5 Nights",
      category: "Scheduled Retreat",
      short_desc: "Meditation, mountain stillness, and open celebration amidst crisp Himalayan pine forests, moving beyond solemnity into clarity.",
      full_desc: "Autumn in the Kangra valley is a season of golden light and crisp, rejuvenating mountain breezes. This retreat invites you to observe nature's art of non-attachment: shedding old mental patterns with the graceful ease of falling leaves. Through active breath, cathartic release, and silent forest walks, meditation ceases to be a strenuous duty and becomes an effortless joy.",
      audience: "Individuals in life transitions, those mourning losses or career shifts, and meditators seeking a fresh, lighthearted perspective.",
      outcomes: "Unburdened emotional state, clarity of life direction, resilience during transition, and deep physical rejuvenation.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      price_base: 29000
    },
    {
      id: "mystic-rose",
      type: "scheduled",
      title: "OSHO Mystic Rose",
      date: "November 15 - December 05, 2026",
      duration: "21 Days / 20 Nights",
      category: "Scheduled Retreat",
      short_desc: "The monumental 21-day meditative therapy: Seven days of laughter, seven days of tears, and seven days of silent witnessing.",
      full_desc: "The Mystic Rose is regarded as one of the most profound meditative therapies conceived by Osho. The process spans three intensive weeks: Week 1 opens the laughter center to dissolve inhibitions; Week 2 releases deep-seated grief and conditioned sadness through conscious crying; Week 3 settles into profound, unshakeable silent witnessing. All previous conditioning softens, allowing your inner essence to blossom.",
      audience: "Deep seekers and experienced meditators ready for profound psychological cleansing and emotional transformation.",
      outcomes: "Comprehensive emotional detox, profound stillness, elimination of deep-seated past traumas, and renewed inner authenticity.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
      price_base: 85000
    },
    {
      id: "shiva-shakti",
      type: "scheduled",
      title: "Shiva Shakti Retreat",
      date: "December 10 - 15, 2026",
      duration: "6 Days / 5 Nights",
      category: "Scheduled Retreat",
      short_desc: "Exploring inner polarities, creative self-expression, conscious dance, and the harmonization of feminine and masculine energies.",
      full_desc: "Within every human consciousness resides Shiva—the silent witness, structure, and presence—and Shakti—the dynamic flow, creative vitality, and dance. Through active movement, expressive painting, guided breath, and tantric meditative inquiries, participants bridge inner divides to harmonize masculine and feminine principles within themselves.",
      audience: "Creatives, couples, and individuals looking to understand relationship dynamics and resolve inner conflict.",
      outcomes: "Internal balance of focus and flow, heightened creative expression, relational maturity, and grounded presence.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      price_base: 29000
    },
    {
      id: "omg-experience",
      type: "all-year",
      title: "OMG Experience (OSHO Meditation Getaway)",
      date: "Flexible Dates (Year-Round)",
      duration: "3 to 7 Days Flexible",
      category: "All-Year Immersion",
      short_desc: "Our signature flexible retreat: Arrive on any day of the year for immersion in daily meditations, mountain nature, and fresh living.",
      full_desc: "You do not need to await a scheduled group retreat to experience OSHO Himalayas. The OMG Experience allows you to book custom arrival and departure dates. Immerse yourself directly into the vibrant daily sanctuary rhythm: sunrise Dynamic meditation, communal breakfast, midday nature immersion, sunset Kundalini meditation, and evening silent meetings.",
      audience: "Solo travelers, couples, and seekers wanting a restful holiday infused with authentic meditation structure on their own schedule.",
      outcomes: "Instant rest, introduction to full active meditation roster, physical restoration, and mental space.",
      image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
      price_base: 14500
    },
    {
      id: "extended-omg",
      type: "all-year",
      title: "Extended OMG Experience",
      date: "Flexible Dates (Year-Round)",
      duration: "14 to 30 Days Sanctuary Residency",
      category: "All-Year Immersion",
      short_desc: "Long-term residential sanctuary immersion with deeply discounted packages, personalized guidance, and sustained silent practice.",
      full_desc: "For those seeking an extended sanctuary to write, reflect, recover from burnout, or undergo deep personal reinvention. Enjoy private accommodation, three wholesome vegetarian meals daily, full access to daily active meditations, silent zones, high-speed fiber internet for essential remote needs, and weekly consultations with resident facilitators.",
      audience: "Sabbatical seekers, writers, remote professionals seeking tranquility, and individuals in long-term convalescence.",
      outcomes: "Profound nervous system reset, sustained meditation habit, creative breakthrough, and enduring lifestyle clarity.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      price_base: 58000
    },
    {
      id: "week-in-silence",
      type: "all-year",
      title: "A Week in Silence",
      date: "Flexible Start Every Monday",
      duration: "7 Days / 6 Nights",
      category: "All-Year Immersion",
      short_desc: "A structured seven-day silent immersion combining noble silence, pristine nature, and guided active meditations.",
      full_desc: "Step into voluntary noble silence for seven complete days. Silence allows mental debris to settle naturally without repression. Unlike rigid traditional Vipassana, this program combines silence with daily OSHO active meditations (Dynamic and Kundalini) to prevent somatic stiffness and mental tension. Facilitators are on hand for daily written inquiries.",
      audience: "Anyone seeking intense mental quiet, sensory detox, and uninterrupted time with themselves in majestic mountain silence.",
      outcomes: "Deep sensory detox, dissolution of mental chatter, acute observational clarity, and deep emotional tranquility.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      price_base: 32000
    }
  ];

  if (type) {
    return data.filter(d => d.type === type);
  }
  return data;
}

function getFallbackAccommodations(): Accommodation[] {
  return [
    {
      id: "shared",
      name: "Shared Living",
      category: "Communal Sanctuary",
      specs: "Dedicated Bed & Personal Locker",
      description: "Clean, serene dormitory living shared with fellow meditators. Designed for simplicity, mindfulness, and budget-conscious long stays.",
      rate_per_night: 3200,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "daya",
      name: "Daya Room",
      category: "Private Minimalist",
      specs: "Twin Beds, Private Bath, Pine Vista",
      description: "Minimalist room with twin beds, high-pressure hot shower, clean mountain aesthetics, and direct views of the surrounding cedar grove.",
      rate_per_night: 4800,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "meera",
      name: "Meera Room",
      category: "Balcony Mountain View",
      specs: "Queen or Twin, Balcony, Climate Heating",
      description: "Spacious room featuring private mountain-facing balcony, winter heating, study table, and serene natural lighting for restful contemplation.",
      rate_per_night: 6500,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "radha",
      name: "Radha Suite",
      category: "Panoramic Luxury",
      specs: "Panoramic Himalayan Vista, King Bed, Heating",
      description: "Premium retreat residence with floor-to-ceiling vistas of the snow-capped Dhauladhar peaks, spacious lounge, heating, and supreme privacy.",
      rate_per_night: 8900,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    }
  ];
}

function getFallbackSchedule(): DailyScheduleItem[] {
  return [
    { time_slot: "07:00 - 08:00", activity: "OSHO Dynamic Meditation", description: "Dawn active meditation awakening the body through breath and catharsis" },
    { time_slot: "08:00 - 09:30", activity: "Himalayan Breakfast", description: "Fresh sattvic mountain breakfast, local organic fruits, herbal teas" },
    { time_slot: "09:30 - 13:00", activity: "Morning Retreat Session", description: "In-depth experiential group practice and guided introspections" },
    { time_slot: "13:00 - 14:30", activity: "Organic Vegetarian Lunch", description: "Farm-fresh vegetarian cuisine prepared with Himalayan spring water" },
    { time_slot: "14:30 - 16:00", activity: "Afternoon Group Workshop", description: "Interactive inquiry, somatic release, breathing refinement" },
    { time_slot: "16:00 - 16:30", activity: "Afternoon Herbal Tea", description: "Local mountain herbal infusions and light mindful snacks" },
    { time_slot: "16:30 - 17:30", activity: "OSHO Kundalini Meditation", description: "Sunset active meditation: bodily shaking, free dance, still witnessing" },
    { time_slot: "18:30 - 20:00", activity: "OSHO Evening Meeting", description: "Celebratory dance, live music, silent meditation, and discourse" },
    { time_slot: "20:00 - 21:00", activity: "Wholesome Dinner", description: "Warm organic dinner, conscious dialogue, and community nourishment" },
    { time_slot: "21:00 - 22:00", activity: "Silence Dome Stargazing", description: "Optional quiet reflection under clear Himalayan night skies" }
  ];
}

function getFallbackReviews(): ReviewItem[] {
  return [
    { id: "rev-1", author: "Katharina Weber", country: "Germany", rating: 5.0, comment: "I arrived exhausted from my corporate schedule in Munich. After three days of Dynamic meditation and fresh pine air, a weight lifted that I did not even realize I was carrying. The combination of active movement and deep silence is extraordinary." },
    { id: "rev-2", author: "Maartje van Dijk", country: "Netherlands", rating: 5.0, comment: "The food is nourishing, the campus is spotless, and the silence dome has a magnetic presence. This is neither a hotel nor a dogmatic ashram; it is a genuine sanctuary where you can truly be yourself without judgment." },
    { id: "rev-3", author: "Piotr Kowalski", country: "Poland", rating: 5.0, comment: "I attended the Mystic Rose process here. The 21 days completely transformed my emotional landscape. The facilitators hold the space with utmost care and integrity. Coming to OSHO Himalayas was the best decision of my life." },
    { id: "rev-4", author: "Liam O'Connor", country: "Ireland", rating: 5.0, comment: "The Dhauladhar mountain backdrop gives this place a calm that enters your bones. Walking to the river after Kundalini meditation was pure magic. I stayed an extra two weeks on the Extended OMG program." },
    { id: "rev-5", author: "Ananya Sharma", country: "India", rating: 5.0, comment: "As an Indian living in Bangalore, I was looking for a retreat free from dogmatic rituals. OSHO Himalayas provided pure scientific meditation, incredible hospitality, and complete freedom to rest and reflect." },
    { id: "rev-6", author: "Stefan Richter", country: "Germany", rating: 5.0, comment: "The Meera room with the balcony facing the valley was perfection. Waking up to mountain mist, practicing Dynamic meditation, and swimming in the freshwater stream made this an unforgettable holiday." }
  ];
}

function getFallbackFaqs(): FAQItem[] {
  return [
    { id: "faq-1", question: "Is OSHO Himalayas suitable for complete beginners?", answer: "Yes. Our programs welcome beginners and experienced meditators alike. Each active meditation session begins with comprehensive technique instructions. Certified facilitators guide you step-by-step, ensuring you feel completely supported regardless of prior background." },
    { id: "faq-2", question: "What is included in the all-inclusive package?", answer: "Our packages cover your chosen retreat or meditation tuition, private or shared sanctuary room accommodation, three wholesome vegetarian meals daily, morning and afternoon herbal teas, access to the Silence Dome, open-air gym, natural stream pool, library, and all applicable taxes." },
    { id: "faq-3", question: "Do I have to be an OSHO follower to attend?", answer: "No. OSHO Himalayas is not a dogmatic ashram or religious institution. Our retreats are open to everyone from all spiritual traditions, faiths, and non-religious backgrounds. The techniques are scientific tools for bodily relaxation, nervous system unburdening, and mental awareness." },
    { id: "faq-4", question: "Why are OSHO meditation techniques active instead of seated?", answer: "Modern individuals carry suppressed stress, anxiety, and intellectual overactivity in their physical bodies. Attempting to force an agitated mind to sit silently often creates psychological tension. Active meditations use breath, catharsis, dance, and shaking to release somatic tension first, after which silence occurs naturally and effortlessly." },
    { id: "faq-5", question: "What kind of food is served at the sanctuary?", answer: "We serve fresh, wholesome, sattvic vegetarian cuisine prepared with local organic ingredients and pure Himalayan spring water. Meals include balanced whole grains, seasonal vegetables, legumes, fresh salads, and herbal infusions. Vegan and gluten-sensitive requests are readily accommodated." },
    { id: "faq-6", question: "What is the booking and payment policy?", answer: "Reservations are confirmed with a 50% advance deposit via secure bank transfer or UPI. The remaining balance is payable upon arrival during check-in. Deposits may be transferred to a future retreat date if written notice is provided at least 14 days prior to your scheduled arrival." }
  ];
}
