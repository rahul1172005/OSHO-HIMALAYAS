from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import uuid

from models import (
    RetreatBase, Accommodation, DailyScheduleItem, ReviewItem, FAQItem,
    PriceCalculationRequest, PriceCalculationResponse, EnquiryCreate, EnquiryResponse
)
from data import RETREATS, ACCOMMODATIONS, DAILY_SCHEDULE, REVIEWS, FAQS, ENQUIRIES_DB

app = FastAPI(
    title="OSHO Himalayas API",
    description="Enterprise REST API for OSHO Himalayas Meditation Resort & Sanctuary",
    version="1.0.0"
)

# Enable CORS for Next.js frontend (ports 3000, 3001, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "OSHO Himalayas Sanctuary API",
        "timestamp": datetime.utcnow().isoformat()
    }

# 1. RETREATS ENDPOINTS
@app.get("/api/retreats", response_model=List[RetreatBase])
def get_retreats(type: Optional[str] = Query(None, description="Filter by 'scheduled' or 'all-year'")):
    if type:
        return [r for r in RETREATS if r["type"] == type]
    return RETREATS

@app.get("/api/retreats/{retreat_id}", response_model=RetreatBase)
def get_retreat_by_id(retreat_id: str):
    retreat = next((r for r in RETREATS if r["id"] == retreat_id), None)
    if not retreat:
        raise HTTPException(status_code=404, detail="Retreat not found")
    return retreat

# 2. ACCOMMODATIONS ENDPOINTS
@app.get("/api/accommodations", response_model=List[Accommodation])
def get_accommodations():
    return ACCOMMODATIONS

@app.get("/api/accommodations/{room_id}", response_model=Accommodation)
def get_accommodation_by_id(room_id: str):
    room = next((a for a in ACCOMMODATIONS if a["id"] == room_id), None)
    if not room:
        raise HTTPException(status_code=404, detail="Accommodation tier not found")
    return room

# 3. SCHEDULE & PRACTICE ENDPOINTS
@app.get("/api/schedule", response_model=List[DailyScheduleItem])
def get_daily_schedule():
    return DAILY_SCHEDULE

# 4. REVIEWS & TESTIMONIALS
@app.get("/api/reviews", response_model=List[ReviewItem])
def get_reviews():
    return REVIEWS

# 5. FAQS
@app.get("/api/faqs", response_model=List[FAQItem])
def get_faqs():
    return FAQS

# 6. DYNAMIC PRICING ENGINE
@app.post("/api/calculate", response_model=PriceCalculationResponse)
def calculate_stay_price(req: PriceCalculationRequest):
    retreat = next((r for r in RETREATS if r["id"] == req.retreat_id), None)
    room = next((a for a in ACCOMMODATIONS if a["id"] == req.room_id), None)

    if not retreat:
        raise HTTPException(status_code=404, detail="Invalid retreat ID")
    if not room:
        raise HTTPException(status_code=404, detail="Invalid room ID")

    base_fee = retreat["price_base"] * req.guests
    acc_fee = room["rate_per_night"] * req.nights * req.guests
    total = base_fee + acc_fee

    return PriceCalculationResponse(
        retreat_id=retreat["id"],
        retreat_title=retreat["title"],
        room_id=room["id"],
        room_name=room["name"],
        nights=req.nights,
        guests=req.guests,
        base_retreat_fee=base_fee,
        accommodation_fee=acc_fee,
        total_amount=total,
        currency="INR",
        inclusions=[
            f"All retreat tuition and meditation sessions for {req.guests} guest(s)",
            f"{req.nights} nights accommodation in {room['name']}",
            "Three wholesome organic vegetarian meals daily plus mountain herbal teas",
            "Full 24-hour access to Silence Dome, Open-air Gym, Natural Stream Pool and Library",
            "Pure Himalayan spring water and all statutory taxes included"
        ]
    )

# 7. ENQUIRY / BOOKING RESERVATION
@app.post("/api/enquiries", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
def submit_enquiry(payload: EnquiryCreate):
    ref_id = f"OSH-{uuid.uuid4().hex[:6].upper()}"
    record = {
        "reference_id": ref_id,
        "created_at": datetime.utcnow(),
        "payload": payload.model_dump()
    }
    ENQUIRIES_DB.append(record)

    return EnquiryResponse(
        reference_id=ref_id,
        status="CONFIRMED_RECEIVED",
        message="Thank you. Your sanctuary enquiry has been registered. Our reservations desk in Dharamshala will reach out via WhatsApp and email within 4 business hours.",
        created_at=record["created_at"],
        enquiry=payload
    )

@app.get("/api/enquiries", response_model=List[dict])
def list_enquiries():
    return ENQUIRIES_DB

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
