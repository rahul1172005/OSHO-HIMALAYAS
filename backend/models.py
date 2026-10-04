from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class RetreatBase(BaseModel):
    id: str
    type: str = Field(..., description="'scheduled' or 'all-year'")
    title: str
    date: str
    duration: str
    category: str
    short_desc: str
    full_desc: str
    audience: str
    outcomes: str
    image: str
    price_base: int

class Accommodation(BaseModel):
    id: str
    name: str
    category: str
    specs: str
    description: str
    rate_per_night: int
    image: str

class DailyScheduleItem(BaseModel):
    time_slot: str
    activity: str
    description: str

class ReviewItem(BaseModel):
    id: str
    author: str
    country: str
    rating: float
    comment: str

class FAQItem(BaseModel):
    id: str
    question: str
    answer: str

class PriceCalculationRequest(BaseModel):
    retreat_id: str
    room_id: str
    nights: int = Field(ge=1, le=90)
    guests: int = Field(ge=1, le=10)

class PriceCalculationResponse(BaseModel):
    retreat_id: str
    retreat_title: str
    room_id: str
    room_name: str
    nights: int
    guests: int
    base_retreat_fee: int
    accommodation_fee: int
    total_amount: int
    currency: str = "INR"
    inclusions: List[str]

class EnquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=5, max_length=120)
    phone: str = Field(..., min_length=6, max_length=30)
    retreat_id: Optional[str] = None
    room_id: str
    guests: int = 1
    arrival_date: Optional[str] = None
    duration: Optional[str] = None
    notes: Optional[str] = None

class EnquiryResponse(BaseModel):
    reference_id: str
    status: str
    message: str
    created_at: datetime
    enquiry: EnquiryCreate
