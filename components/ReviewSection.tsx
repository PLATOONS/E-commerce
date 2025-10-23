"use client";
import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { validateJWT } from "@/utils/jwtUtils";

type ReviewsSectionProps = {
  productId: string;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const [sort, setSort] = useState<"newest" | "highest" | "lowest">("newest");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(validateJWT(token));
    }
  }, []);

  const countLabel = `${totalCount} Review${totalCount === 1 ? "" : "s"}`;

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

      <ReviewForm productId={productId} />
      <ReviewList
        productId={productId}
        sort={sort}
        isLoggedIn={isLoggedIn}
        setTotalCount={setTotalCount}
      />
    </section>
  );
};

export default ReviewsSection;
