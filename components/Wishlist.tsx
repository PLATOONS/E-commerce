'use client'

import { useState } from "react";

export default function Wishlist({isWishlisted = false, isSmall = false, productId}: 
    {isWishlisted: boolean, isSmall: boolean, productId: string}){

    const [wishlisted, setWishlisted] = useState(isWishlisted);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const toggleWishlist = async () => {
    if (wishlistLoading) return;
        try {
        setWishlistLoading(true);
        setWishlisted((w) => !w); // optimistic
        const res = await fetch(`/api/v1/whishlist/product/${productId}`, { method: "POST" });
        if (!res.ok) {
            setWishlisted((w) => !w); // revert
            throw new Error(`wishlist failed: ${res.status}`);
        }
        } catch (e) {
        console.error(e);
        } finally {
        setWishlistLoading(false);
        }
    };
    return <button
        className={`cursor-pointer ${isSmall ? "like-button": 
            "flex gap-4 border-solid border-neutral-seven border-2 py-2.5 rounded-md " + 
            "content-center w-full justify-center"}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={toggleWishlist}
        disabled={wishlistLoading}
      >
        {wishlisted ? "❤️" : "♡"}
        {!isSmall && <p className="text-neutral-seven">Wishlist</p>}
      </button>
}