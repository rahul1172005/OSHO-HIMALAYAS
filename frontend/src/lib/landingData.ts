export interface ReelItem {
  id: string;
  title: string;
  buttonLabel: string;
  thumbnail: string;
  videoSrc?: string;
  videoType?: "local" | "instagram" | "drive" | "youtube";
  instagramUrl?: string;
}

export interface ScheduleCourse {
  id: string;
  title: string;
  dates: string;
  tagline: string;
  image: string;
  enquiryUrl?: string;
}

export interface TestimonialReview {
  id: string;
  name: string;
  location: string;
  quote: string;
  youtubeId?: string;
  thumbnail: string;
  videoSrc: string;
}

export interface FaqItem {
  question: string;
  answer: string | string[];
}

// -----------------------------------------------------------------------------
// SECTION 2: REEL SHOWCASE
// Updated order:
// 1. Campus
// 2. Retreat Life (from Google Drive, replaces the previous end-card)
// 3. Meditations, Weather, Living In, Nature, Bonfire, People
// 4. Four new videos: Full moon night, Silence, Sufi whirling, Sound healing
// -----------------------------------------------------------------------------
export const REEL_ITEMS: ReelItem[] = [
  {
    id: "campus",
    title: "Campus",
    buttonLabel: "Campus",
    thumbnail: "/thumbnails/campus.jpg",
    videoSrc: "/campus.mp4",
    videoType: "local",
  },
  {
    id: "retreat-life",
    title: "Retreat life",
    buttonLabel: "Retreat life",
    thumbnail: "/thumbnails/retreat-life.jpg",
    videoSrc: "/retreat-life-new.mp4",
    videoType: "local",
  },
  {
    id: "meditations",
    title: "Meditations",
    buttonLabel: "Meditations",
    thumbnail: "/thumbnails/meditations.jpg",
    videoSrc: "/meditations.MOV",
    videoType: "local",
  },
  {
    id: "weather",
    title: "Weather",
    buttonLabel: "Weather",
    thumbnail: "/thumbnails/weather.jpg",
    videoSrc: "/weather.mp4",
    videoType: "local",
  },
  {
    id: "living-in",
    title: "Living In",
    buttonLabel: "Living In",
    thumbnail: "/thumbnails/living-in.jpg",
    videoSrc: "/living-in.mp4",
    videoType: "local",
  },
  {
    id: "nature",
    title: "Nature",
    buttonLabel: "Nature",
    thumbnail: "/thumbnails/nature.jpg",
    videoSrc: "/nature.mp4",
    videoType: "local",
  },
  {
    id: "bonfire",
    title: "Bonfire",
    buttonLabel: "Bonfire",
    thumbnail: "/thumbnails/bonfire.jpg",
    videoSrc: "/bonfire.mp4",
    videoType: "local",
  },
  {
    id: "people",
    title: "People",
    buttonLabel: "People",
    thumbnail: "/thumbnails/people.jpg",
    videoSrc: "/people.mp4",
    videoType: "local",
  },
  // FOUR NEW VIDEOS (LOCAL MP4 VIDEOS):
  {
    id: "full-moon-night",
    title: "Full moon night",
    buttonLabel: "Full moon night",
    thumbnail: "/thumbnails/full-moon-night.jpg",
    videoSrc: "/full-moon-night.mp4",
    videoType: "local",
  },
  {
    id: "silence",
    title: "Silence",
    buttonLabel: "Silence",
    thumbnail: "/thumbnails/silence.jpg",
    videoSrc: "/silence.mp4",
    videoType: "local",
  },
  {
    id: "sufi-whirling",
    title: "Sufi whirling",
    buttonLabel: "Sufi whirling",
    thumbnail: "/thumbnails/sufi-whirling.jpg",
    videoSrc: "/sufi-whirling.mp4",
    videoType: "local",
  },
  {
    id: "sound-healing",
    title: "Sound healing",
    buttonLabel: "Sound healing",
    thumbnail: "/thumbnails/sound-healing.jpg",
    videoSrc: "/sound-healing.mp4",
    videoType: "local",
  },
];

// -----------------------------------------------------------------------------
// SECTION 3: PHOTO CAROUSEL (ROW 1 & ROW 2 DIFFERENT IMAGES)
// -----------------------------------------------------------------------------
export const GALLERY_PHOTOS_ROW_1: string[] = [
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/1-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/2-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/3-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/4-2.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/5-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/6-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/7-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/8-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/9-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/10-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/11-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/12-1.webp",
];

export const GALLERY_PHOTOS_ROW_2: string[] = [
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/13-2.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/14-2.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/15-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/16-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/17-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/18-1.webp",
  "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/19-1.webp",
  "https://oshohimalayascom.swipepages.media/2025/9/65426ca89707d10018b3de0d/20.jpg",
  "https://oshohimalayascom.swipepages.media/2025/9/65426ca89707d10018b3de0d/19.jpg",
  "https://oshohimalayascom.swipepages.media/2025/9/65426ca89707d10018b3de0d/18.jpg",
  "https://oshohimalayascom.swipepages.media/2025/9/65426ca89707d10018b3de0d/15.jpg",
  "https://oshohimalayascom.swipepages.media/2025/9/65426ca89707d10018b3de0d/8.jpg",
];

export const GALLERY_PHOTOS: string[] = [
  ...GALLERY_PHOTOS_ROW_1,
  ...GALLERY_PHOTOS_ROW_2,
];

// -----------------------------------------------------------------------------
// SECTION 4: COURSES & RETREATS SCHEDULE
// Updated per instructions:
// - Removed the first course (Shiva Shakti) since it is over
// - Added all new courses after March from https://wellness.oshohimalayas.com/lp
// -----------------------------------------------------------------------------
export const SCHEDULE_COURSES: ScheduleCourse[] = [
  {
    id: "festival-of-lights",
    title: "Festival of Lights",
    dates: "Nov 06 – 10",
    tagline: "Explore your inner light in nature.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/festival-of-lights-500.webp",
  },
  {
    id: "chakra-experience-nov",
    title: "The Chakra Experience",
    dates: "Nov 12 - 16",
    tagline: "An in-depth course to explore our seven energy centers through meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/the-chakra-experience-500.webp",
  },
  {
    id: "tantra-alchemy",
    title: "Tantra: The Inner Alchemy",
    dates: "Nov 20 - 25",
    tagline: "Meet yourself and life more fully.",
    image: "https://oshohimalayascom.swipepages.media/2026/9/65426ca89707d10018b3de0d/osho-heart-festival--2--500.webp",
  },
  {
    id: "vigyan-bhairav-dec",
    title: "Vigyan Bhairav Tantra",
    dates: "Dec 03 - 07",
    tagline: "Explore the depths of meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/vigyan-bhairav-tantra-500.webp",
  },
  {
    id: "born-again",
    title: "OSHO Born Again",
    dates: "Dec 13 - 21",
    tagline: "Get back your lost childhood.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/osho-born-again-500.webp",
  },
  {
    id: "path-of-love",
    title: "Path of Love",
    dates: "Dec 24 - 28",
    tagline: "A course in conscious relating & intimacy.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/path-of-love-500.webp",
  },
  {
    id: "new-beginnings",
    title: "New Beginnings Meditate & Celebrate",
    dates: "Dec 29 - Jan 03",
    tagline: "New Year, New You: Find Joy through Meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/new-beginnings_-meditate-and-celebrate-500.webp",
  },
  {
    id: "silent-retreat",
    title: "Meditation Intensive Silent Retreat",
    dates: "Jan 13 - 17",
    tagline: "Dive deep into your inner being.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/29-2-300.webp",
  },
  {
    id: "heart-sutra-jan",
    title: "The Heart Sutra",
    dates: "Jan 22 - 26",
    tagline: "Open Your Heart, Embrace Love: A Journey to Joy.",
    image: "https://oshohimalayascom.swipepages.media/2026/3/65426ca89707d10018b3de0d/osho-heart-festival--23--500.webp",
  },
  {
    id: "bodymind",
    title: "OSHO Talking To Your BodyMind Course & Training",
    dates: "Jan 26 - Feb 03",
    tagline: "Gain harmony in your body-mind.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/5-3-300.webp",
  },
  {
    id: "mystic-rose",
    title: "OSHO Mystic Rose",
    dates: "Feb 03 - 25",
    tagline: "Let the scars of the past be dissolved.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/osho-mystic-rose-500.webp",
  },
  {
    id: "satori",
    title: "Awareness Intensive: Satori",
    dates: "Feb 26 - Mar 05",
    tagline: "A retreat to know who you truly are.",
    image: "https://oshohimalayascom.swipepages.media/2026/10/65426ca89707d10018b3de0d/rama---all-course-posters--7--500.webp",
  },
  {
    id: "active-meditation-training",
    title: "OSHO Active Meditation: In-Depth & Facilitator Training",
    dates: "Mar 06 - 11",
    tagline: "Get the most out of your meditation by knowing the science behind it.",
    image: "https://oshohimalayascom.swipepages.media/2026/10/65426ca89707d10018b3de0d/rama---all-course-posters--1--500.webp",
  },
  // NEW COURSES AFTER MARCH:
  {
    id: "chakra-experience-mar",
    title: "The Chakra Experience",
    dates: "Mar 12 - 16",
    tagline: "An in-depth course to explore our seven energy centers through meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/the-chakra-experience-500.webp",
  },
  {
    id: "colours-of-life",
    title: "Colours Of Life Festival",
    dates: "Mar 19 - 23",
    tagline: "Laugh your way to meditation & self-love.",
    image: "https://oshohimalayascom.swipepages.media/2026/10/65426ca89707d10018b3de0d/osho-heart-festival--9--500.webp",
  },
  {
    id: "in-tune-with-nature",
    title: "In Tune With Nature",
    dates: "Apr 01 - 05",
    tagline: "Relax and refresh in nature.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/transomatic-dialogue-for-self-healing-training-level-1-ufdmlq-500.webp",
  },
  {
    id: "osho-no-mind",
    title: "OSHO No Mind",
    dates: "Apr 10 - 18",
    tagline: "A 7-day course to declutter mind & experience deep silence.",
    image: "https://oshohimalayascom.swipepages.media/2026/3/65426ca89707d10018b3de0d/osho-heart-festival--20--500.webp",
  },
  {
    id: "inner-child-healing",
    title: "Inner Child Healing",
    dates: "Apr 22 - 26",
    tagline: "Understand the process deeper and gain the opportunity to learn self-healing skills.",
    image: "https://oshohimalayascom.swipepages.media/2026/10/65426ca89707d10018b3de0d/whatsapp-image-2026-10-27-at-2-28-42-pm-500.webp",
  },
  {
    id: "heart-sutra-apr",
    title: "Heart Sutra",
    dates: "Apr 29 - May 03",
    tagline: "A 3-day course to discover the mysteries of the heart.",
    image: "https://oshohimalayascom.swipepages.media/2026/3/65426ca89707d10018b3de0d/osho-heart-festival--23--500.webp",
  },
  {
    id: "emotional-wellness",
    title: "Emotional Wellness Retreat",
    dates: "May 06 - 10",
    tagline: "Master your emotions. Turn negative emotions into positive ones and experience peace.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/omg-experience-500.webp",
  },
  {
    id: "chakra-experience-may",
    title: "The Chakra Experience",
    dates: "May 19 - 24",
    tagline: "An in-depth course to explore our seven energy centers through meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/the-chakra-experience-500.webp",
  },
  {
    id: "vigyan-bhairav-may",
    title: "Vigyan Bhairav Tantra",
    dates: "May 27 - 31",
    tagline: "Explore the depths of meditation.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/vigyan-bhairav-tantra-500.webp",
  },
  // ALL-YEAR IMMERSION RETREATS
  {
    id: "omg-experience",
    title: "OMG Experience",
    dates: "Open all year",
    tagline: "An OSHO Meditation Getaway Experience in the Himalayas.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/omg-experience-500.webp",
  },
  {
    id: "extended-omg-experience",
    title: "Extended OMG Experience",
    dates: "Open all year",
    tagline: "Nothing to do but to go in.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/living-in-program.webp",
  },
  {
    id: "week-in-silence",
    title: "A Week In Silence",
    dates: "Open all year",
    tagline: "Experience silence that's alive & juicy.",
    image: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/week-in-silence.webp",
  },
];

// -----------------------------------------------------------------------------
// SECTION 5: VIDEO TESTIMONIALS (INTERNATIONAL & DOMESTIC VARIANTS)
// -----------------------------------------------------------------------------
export const TESTIMONIAL_REVIEWS_INTERNATIONAL: TestimonialReview[] = [
  {
    id: "amura",
    name: "Amura",
    location: "Germany",
    quote: "This is the place to discover freedom and peace.",
    youtubeId: "fn-gh8eBn2g",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/5-500.webp",
    videoSrc: "/amura from Germany.mp4",
  },
  {
    id: "ernst",
    name: "Ernst",
    location: "Netherlands",
    quote: "A lot of nice people to be around here.",
    youtubeId: "4qOl7yRLVFc",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/4-500.webp",
    videoSrc: "/Ernst from Netherlands.mp4",
  },
  {
    id: "greta",
    name: "Greta",
    location: "Poland",
    quote: "I recommend anyone to come here at least once in life.",
    youtubeId: "h8VuSZWMIUw",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/3-500.webp",
    videoSrc: "/Greta from poland.mp4",
  },
  {
    id: "kathleen-peter",
    name: "Kathleen & Peter",
    location: "Ireland",
    quote: "We are already booking to come back in summer.",
    youtubeId: "HmBChf8s6m4",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/2-500.webp",
    videoSrc: "/kathleen & peter from ireland.mp4",
  },
  {
    id: "max",
    name: "Max",
    location: "Germany",
    quote: "I can't wait to come back soon.",
    youtubeId: "prJrDLDS25M",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/6-500.webp",
    videoSrc: "/max from germany.mp4",
  },
  {
    id: "shilpa",
    name: "Shilpa",
    location: "India",
    quote: "This place itself has such a high energy.",
    youtubeId: "ycaGlod1fLI",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/1-500.webp",
    videoSrc: "/Shilpa from india.mp4",
  },
];

export const TESTIMONIAL_REVIEWS_DOMESTIC: TestimonialReview[] = [
  {
    id: "arpita",
    name: "Arpita",
    location: "India",
    quote: "A truly peaceful and transformative experience.",
    youtubeId: "_BJXbVKXD4c",
    thumbnail: "/thumbnails/arpita-india.jpg",
    videoSrc: "/arpita-india.mp4",
  },
  {
    id: "jagvir-kaur",
    name: "Jagvir Kaur",
    location: "India",
    quote: "If you want a break from hectic daily life, visit here.",
    youtubeId: "oke3PiUdkOs",
    thumbnail: "/thumbnails/break-daily-life.jpg",
    videoSrc: "/break-daily-life.mp4",
  },
  {
    id: "amura",
    name: "Amura",
    location: "Germany",
    quote: "This is the place to discover freedom and peace.",
    youtubeId: "fn-gh8eBn2g",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/5-500.webp",
    videoSrc: "/amura from Germany.mp4",
  },
  {
    id: "ernst",
    name: "Ernst",
    location: "Netherlands",
    quote: "A lot of nice people to be around here.",
    youtubeId: "4qOl7yRLVFc",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/4-500.webp",
    videoSrc: "/Ernst from Netherlands.mp4",
  },
  {
    id: "kathleen-peter",
    name: "Kathleen & Peter",
    location: "Ireland",
    quote: "We are already booking to come back in summer.",
    youtubeId: "HmBChf8s6m4",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/2-500.webp",
    videoSrc: "/kathleen & peter from ireland.mp4",
  },
  {
    id: "shilpa",
    name: "Shilpa",
    location: "India",
    quote: "This place itself has such a high energy.",
    youtubeId: "ycaGlod1fLI",
    thumbnail: "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/1-500.webp",
    videoSrc: "/Shilpa from india.mp4",
  },
];

export const TESTIMONIAL_REVIEWS: TestimonialReview[] = TESTIMONIAL_REVIEWS_INTERNATIONAL;

// -----------------------------------------------------------------------------
// SECTION 7: FAQS
// -----------------------------------------------------------------------------
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "I’m a beginner. How will I know which group would be best for me to start with?",
    answer:
      "Our team can help you with that. When filling out the form, help us understand your needs and expectations. We can suggest the best course for you.",
  },
  {
    question: "What about the costs?",
    answer: [
      "We offer all-inclusive packages. They will cover your course fee, stay and food during your course, access to up to five Osho meditations daily, a swimming pool, library, and open gym.",
      "The cost of these all-inclusive packages will vary depending on the type of accommodation you choose.",
    ],
  },
  {
    question: "Is Osho meditations for me?",
    answer:
      "Osho’s techniques are for everyone. In fact, for the modern man nothing works better than the meditations designed scientifically by Osho.",
  },
  {
    question: "Why Osho’s methods are active?",
    answer: [
      "In Osho’s own words:",
      "\"Then catharsis is needed to unburden the heart, to throw off suppressions, to make the heart open. If the heart becomes light and unburdened, then the center of consciousness is pushed still lower; it comes to the navel. The navel is the source of vitality, the seed source from which everything else comes: the body and the mind and everything.\"",
    ],
  },
  {
    question: "Do I have to be an Osho follower?",
    answer: "No, we welcome all people who are interested in meditation.",
  },
  {
    question: "How can I book my stay?",
    answer:
      "You can confirm your stay by paying 50% of the total cost. You may pay the remaining when you check-in.",
  },
  {
    question: "What type of food is offered at Osho Himalayas?",
    answer:
      "We offer healthy, wholesome, fresh-cooked vegetarian food. Occasionally eggs are included. We endeavor to prepare our food with locally grown crops and vegetables to the best possible extent.",
  },
];

// -----------------------------------------------------------------------------
// SECTION 6: HOW TO REACH HERE
// -----------------------------------------------------------------------------
export const HOW_TO_REACH_INFO = {
  title: "How To Reach Here:",
  mapImage:
    "https://oshohimalayascom.swipepages.media/2026/8/65426ca89707d10018b3de0d/chatgpt-image-aug-4--2026--11_04_35-pm-1500.webp",
  bulletPoints: [
    "THE BEST WAY: Daily flights are available from New Delhi to Dharamshala (Kangra/Gaggal/DHM Airport). Our resort is just a 45 cab drive from Dharamshala (DHM) Airport.",
    "Other options: Several inter-state Volvo buses are available to Dharamshala from most northern cities of India, including New Delhi.",
    "Vande Bharat Express train from New Delhi to Amb Andaura takes just 5:15 hours. A cab or a bus ride from Amb Andaura to OSHO Himalayas takes about 2:30 hours.",
    "Let us know a few days in advance. We will help you get in touch with a local cab operator who is regular in this locality.",
    "*This map is only for reference, not for scale.",
  ],
};

// -----------------------------------------------------------------------------
// SECTION 8: VIRTUAL CAMPUS TOUR
// -----------------------------------------------------------------------------
export const VIRTUAL_TOUR_INFO = {
  kicker: "360° Experience",
  title: "Virtual Campus Tour",
  subtitle: "Click & swipe to move around 360 degrees! Use the icons on the sidebar too.",
  matterportUrl: "https://my.matterport.com/show/?m=ZU3PmRumZQr&play=1&brand=0",
};
