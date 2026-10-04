# OSHO Himalayas — Next.js & FastAPI Architecture

A meditation and wellness retreat platform for **OSHO Himalayas** (Dharamshala, Himachal Pradesh, India), built with a **Next.js** frontend and a **FastAPI** backend.

---

## Design System Constraints Followed
- **Pure White Background**: `#ffffff`
- **Typography**: Titles in **Thin Geist** (`font-weight: 200, 300`), body and UI in **Inter**
- **Action Buttons**: Solid **Blue** (`#2563eb`) with white text
- **Strict Monochrome Palette**: White background, neutral grayscale text, single blue button accent
- **No Emojis**: Zero emojis across code, templates, and data
- **No Dots / Dot Effects**: No dot grids or decorative dotted patterns
- **No Divided Lines**: Ample whitespace and soft card containers instead of dividing lines or `<hr>`
- **No Tags / Pill Badges**: Clean typographic layout without badges
- **No Multi-Color Icons**: Single-color monochrome strokes only
- **No Dark Mode Toggle**

---

## Architecture

```
SF-02/
├── backend/                       # FastAPI Python REST API
│   ├── main.py                    # API routes, CORS & lifespan
│   ├── models.py                  # Pydantic models & validation
│   ├── data.py                    # Curated retreat, room & review database
│   └── requirements.txt           # fastapi, uvicorn, pydantic
│
└── frontend/                      # Next.js App Router (TypeScript)
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx         # Root layout with fonts & metadata
    │   │   ├── page.tsx           # Assembled single-page application
    │   │   └── globals.css        # Vanilla CSS design system
    │   ├── components/
    │   │   ├── Header.tsx         # Sticky navigation with mobile menu
    │   │   ├── Hero.tsx           # Destination hero with Geist title & blue CTA
    │   │   ├── Welcome.tsx        # Modern life friction vs sanctuary solution
    │   │   ├── Philosophy.tsx     # Active Meditations science & 4 daily practices
    │   │   ├── CoursesSection.tsx # Filterable retreats catalogue
    │   │   ├── CourseModal.tsx    # Detailed schedule & inclusions modal
    │   │   ├── AccommodationSection.tsx # Room tiers & FastAPI price calculator
    │   │   ├── ScheduleSection.tsx# Daily dawn-to-night sanctuary routine
    │   │   ├── ReviewsSection.tsx # 4.8 / 5.0 Google ratings & guest reflections
    │   │   ├── TravelSection.tsx  # Kangra Airport, Vande Bharat train & cab desk
    │   │   ├── FaqSection.tsx     # Interactive FAQ accordion
    │   │   ├── EnquirySection.tsx # Lead capture form submitting to FastAPI
    │   │   └── Footer.tsx         # Sanctuary credentials and policies
    │   └── lib/
    │       └── api.ts             # API client connecting to FastAPI with fallbacks
    └── package.json
```

---

## Running the Application

### 1. FastAPI Backend (Port 8000)
```bash
cd backend
python -m uvicorn main:app --port 8000 --reload
```
- API Docs (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Health Check: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### 2. Next.js Frontend (Port 3005)
```bash
cd frontend
npm run start -- -p 3005
# Or for development:
npm run dev -- -p 3005
```
- Web Application: [http://localhost:3005](http://localhost:3005)
