"use client";
import React, { useEffect, useRef, useState } from "react";

export type CarouselImage = { url: string; name: string };

type Props = { images?: CarouselImage[] };

const defaults: CarouselImage[] = [
  { url: "/Images/Slide12.jpg", name: "Slide 1" },
  { url: "/Images/Slide2.jpg",  name: "Slide 2" },
  { url: "/Images/Slide3.jpg",  name: "Slide 3" },
];

export default function CarouselSection({ images }: Props) {
  const items = images && images.length ? images : defaults;

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length === 0) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        setIndex(Math.max(0, Math.min(items.length - 1, i)));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items.length]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el || items.length === 0) return;
    const w = el.clientWidth || 0;
    const max = items.length;
    const target = ((i % max) + max) % max;
    setIndex(target);
    el.scrollTo({ left: target * w, behavior: "smooth" });
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <section className="first_carousel" aria-label="Image carousel">
      <div className="frame">
        <div className="slider" ref={trackRef}>
          {items.map((img, i) => (
            <img
              key={img.url || i}
              src={img.url}
              alt={img.name}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        <button
          className="carousel-nav carousel-prev"
          aria-label="Previous slide"
          onClick={prev}
          type="button"
        >
          ‹
        </button>
        <button
          className="carousel-nav carousel-next"
          aria-label="Next slide"
          onClick={next}
          type="button"
        >
          ›
        </button>

        <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={index === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel-dot ${index === i ? "active" : ""}`}
              onClick={() => goTo(i)}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="description">
        <h1 id="principal_title">
          <span>Simply Unique</span><span> / </span><br />
          <span>Simply Better.</span>
        </h1>
        <p id="desc">
          <b>3legant</b> is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>
    </section>
  );
}
