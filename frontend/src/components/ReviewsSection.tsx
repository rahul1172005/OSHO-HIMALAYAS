"use client";

import { useState, useEffect } from "react";
import { ReviewItem, fetchReviews } from "@/lib/api";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchReviews();
      setReviews(data);
    }
    load();
  }, []);

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-head center">
          <div className="section-eyebrow">Guest Experiences</div>
          <h2 className="section-title">Why Meditators Love Us</h2>
          <p className="section-desc">
            More than a thousand meditators, seekers, and holiday travelers from across the globe return each year to reconnect with silence in the Himalayas.
          </p>
        </div>

        <div className="rating-header-box">
          <div className="rating-score">4.8</div>
          <div className="rating-details">
            <div className="rating-stars-text">Average Rating on Google Reviews</div>
            <div className="rating-sub">Based on 1,000+ verified guest reviews worldwide</div>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <p className="review-text">&ldquo;{rev.comment}&rdquo;</p>
              <div className="review-author">
                <span className="author-name">{rev.author}</span>
                <span className="author-country">{rev.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
