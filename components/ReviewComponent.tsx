"use client";
import React, { useMemo, useState } from "react";

type ReviewComponentProps = {
  reviewId: number;
  username: string;
  profilePictureUrl: string;
  rating: number;           // 0..5
  content: string;
  productId: string;
  isLoggedIn?: boolean;

  RatingComponent?: React.ComponentType<{ value: number; "aria-label"?: string }>;
  onLikeSuccess?: () => void;
  onReplyToggle?: (open: boolean) => void;
};

const clamp = (n: number, min = 0, max = 5) => Math.max(min, Math.min(max, n));

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  reviewId,
  username,
  profilePictureUrl,
  rating,
  content,
  productId,
  isLoggedIn = false,
  RatingComponent,
  onLikeSuccess,
  onReplyToggle,
}) => {
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const safeRating = useMemo(() => clamp(rating, 0, 5), [rating]);

  const handleLike = async () => {
    if (liked || liking) return;
    setLiking(true);
    try {
      const res = await fetch(`/api/v1/review/${reviewId}`, { method: "POST" });
      if (!res.ok) throw new Error(String(res.status));
      setLiked(true);
      onLikeSuccess?.();
    } finally {
      setLiking(false);
    }
  };

  const toggleReply = () => {
    const next = !showReply;
    setShowReply(next);
    onReplyToggle?.(next);
  };

  const StarsFallback = () => (
    <div aria-label={`Rating: ${safeRating} of 5`} role="img" className="leading-none">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-xl ${i < safeRating ? "text-black" : "text-gray-300"}`}>★</span>
      ))}
    </div>
  );

  return (
    <article className="py-8">
      <div className="grid grid-cols-[72px,1fr] gap-6">
        {/* Avatar */}
        <img
          src={profilePictureUrl}
          alt={`${username} profile picture`}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full object-cover"
        />

        {/* Main column */}
        <div>
          <h3 className="text-2xl font-semibold text-black">{username}</h3>

          <div className="mt-2">
            {RatingComponent ? (
              <RatingComponent value={safeRating} aria-label={`Rating: ${safeRating} of 5`} />
            ) : (
              <StarsFallback />
            )}
          </div>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-700">
            {content}
          </p>

          {/* Actions (ghost style, like the mock) */}
          <div className="mt-6 flex justify-start gap-6 text-sm font-semibold text-gray-700">
            <button
              onClick={handleLike}
              disabled={liked || liking}
              aria-pressed={liked}
              className="transition hover:text-black disabled:text-gray-400"
              title={liked ? "You liked this review" : "Like this review"}
            >
              {liked ? "Like" : liking ? "Liking…" : "Like"}
            </button>

            {isLoggedIn && (
              <button
                onClick={toggleReply}
                aria-expanded={showReply}
                aria-controls={`reply-${reviewId}`}
                className="transition hover:text-black"
                title="Reply to this review"
              >
                Reply
              </button>
            )}
          </div>

          {showReply && (
            <section
              id={`reply-${reviewId}`}
              className="mt-4 max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <label htmlFor={`reply-text-${reviewId}`} className="block text-sm font-medium">
                Write a reply
              </label>
              <textarea
                id={`reply-text-${reviewId}`}
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Be respectful and helpful…"
                className="mt-2 w-full resize-y rounded-lg border border-gray-300 p-2 text-sm focus:outline-none"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyText("")}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
                >
                  Clear
                </button>
                <button
                  type="button"
                  disabled={!replyText.trim()}
                  onClick={() => {
                    // hook up to your reply endpoint later
                    setReplyText("");
                    setShowReply(false);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-sm text-white ${
                    replyText.trim() ? "bg-black" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Send
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Divider like the mock */}
      <hr className="mt-8 border-t border-gray-200" />
    </article>
  );
};

export default ReviewComponent;
