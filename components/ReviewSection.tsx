"use client";
import React, { useState } from "react";
import ReviewComponent from "@/components/ReviewComponent";

type ReviewItem = {
  reviewId: number;
  username: string;
  profilePictureUrl: string;
  rating: number;
  content: string;
};

type ReviewsSectionProps = {
  reviews?: ReviewItem[];
  productId?: string;
  isLoggedIn?: boolean;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = [],
  productId,
  isLoggedIn = false,
}) => {
  const [sort, setSort] = useState<"newest" | "highest" | "lowest">("newest");

  const totalCount = reviews.length;
  const countLabel = `${totalCount} Review${totalCount === 1 ? "" : "s"}`;

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return b.reviewId - a.reviewId; // pretend id ≈ recency
  });

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      {/* Header: stacked on mobile, row on md+ */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Count (top on mobile) */}
        <h2 className="order-1 text-4xl font-semibold text-black md:order-none">
          {countLabel}
        </h2>

        {/* Sort (below on mobile, right on desktop) */}
        <label className="order-2 inline-flex items-center gap-3 md:order-none">
          <span className="text-sm text-gray-700">Sort</span>
          <select
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            aria-label="Sort reviews"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </label>
      </div>

      {/* List */}
      <div>
        {sorted.map((r) => (
          <ReviewComponent
            key={r.reviewId}
            reviewId={r.reviewId}
            username={r.username}
            profilePictureUrl={r.profilePictureUrl}
            rating={r.rating}
            content={r.content}
            productId={productId ?? ""}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
