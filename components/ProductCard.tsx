"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Wishlist from "./Wishlist";
import { addProductToCart } from "@/services/productService";

export type ProductCardData = {
  productId: string;
  price: number;
  discountPercentage?: number | null;
  discountedPrice?: number | null;
  rating: number;
  wishlisted: boolean;
  name: string;
  imageUrl: string;
  imageName: string;
  createdAt?: string | Date;
};

export type ProductCardProps = {
  data: ProductCardData;
  className?: string;
  onAddedToCart?: (id: string | number) => void;
};

function isNew(createdAt?: string | Date, days = 7) {
  if (!createdAt) return false;
  const t = typeof createdAt === "string" ? new Date(createdAt).getTime() : createdAt.getTime();
  if (Number.isNaN(t)) return false;
  return (Date.now() - t) / (1000 * 60 * 60 * 24) <= days;
}

export default function ProductCard({
  data,
  className,
  onAddedToCart,
}: ProductCardProps) {
  const [adding, setAdding] = useState(false);

  const { finalPrice, hasDiscount, pct } = useMemo(() => {
    const pct = data.discountPercentage ?? null;
    let fp = data.discountedPrice ?? null;
    if (fp == null && pct != null) fp = +(data.price * (1 - pct / 100)).toFixed(2);
    return {
      finalPrice: fp ?? data.price,
      hasDiscount: fp != null && fp < data.price,
      pct: pct ?? (fp != null ? Math.round((1 - fp / data.price) * 100) : null),
    };
  }, [data.price, data.discountPercentage, data.discountedPrice]);

  // const handleAddToCart = async () => {
  //   if (adding) return;
  //   try {
  //     setAdding(true);
  //     const res = await fetch("/api/v1/productOrder", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ productId: data.productId, quantity: 1 }),
  //     });
  //     if (!res.ok) throw new Error(`add to cart failed: ${res.status}`);
  //     onAddedToCart?.(data.productId);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setAdding(false);
  //   }
  // };

  return (
    <div className={`carousel-item ${className ?? ""}`}>
      <div className="tags">
        {isNew(data.createdAt) && <span className="new">new</span>}
        {hasDiscount && pct != null && <span className="discount">-{pct}%</span>}
      </div>

      <Wishlist isSmall={true} isWishlisted={data.wishlisted} productId={data.productId}/>

      <Link href={`/product/${data.productId}`} aria-label={`Open ${data.name}`}>
        <Image
          src={data.imageUrl}
          alt={data.imageName || data.name}
          width={600}
          height={600}
          className="w-24 h-24"
        />
      </Link>

      {/* <button className="add-button" onClick={handleAddToCart} disabled={adding}>
        {adding ? "Adding..." : "Add to cart"}
      </button> */}

      <div className="details">
        <div className="rating" aria-label={`${data.rating} out of 5`}>
          {"★★★★★".slice(0, Math.round(data.rating))}
          {"☆☆☆☆☆".slice(0, 5 - Math.round(data.rating))}
        </div>
        <h2>{data.name}</h2>
        <p className="price">
          <span>${finalPrice.toFixed(2)}</span>
          {hasDiscount && <span className="original">${data.price.toFixed(2)}</span>}
        </p>
      </div>
    </div>
  );
}
