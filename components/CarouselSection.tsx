"use client";
import React, { useEffect, useRef, useState } from "react";

export type CarouselImage = { url: string; name: string };

type StrictProps = {
  images: CarouselImage[];
  className?: string;
  height?: number | string;
  headline?: React.ReactNode;
  subline?: React.ReactNode;
};

export function CarouselCore({
  images,
  className,
  height,
  headline,
  subline,
}: StrictProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const styleVar = height
    ? ({
        ["--carousel-height"]:
          typeof height === "number" ? `${height}px` : String(height),
      } as React.CSSProperties)
    : undefined;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth || 1;
      const next = Math.round(el.scrollLeft / w);
      setIndex(Math.min(Math.max(next, 0), images.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
  };

  const next = () => scrollTo((index + 1) % images.length);
  const prev = () => scrollTo((index - 1 + images.length) % images.length);

  return (
    <section
      className={["carousel", className].filter(Boolean).join(" ")}
      style={styleVar}
      aria-label="Image carousel"
    >
      <div className="frame">
        <div className="track" ref={trackRef}>
          {images.map((img, i) => (
            <img
              key={img.url || i}
              src={img.url}
              alt={img.name}
              className="slide"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        <button className="nav prev" aria-label="Previous slide" onClick={prev} type="button">
          ‹
        </button>
        <button className="nav next" aria-label="Next slide" onClick={next} type="button">
          ›
        </button>

        <div className="dots" role="tablist" aria-label="Carousel pagination">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={index === i}
              aria-label={`Go to slide ${i + 1}`}
              className={["dot", index === i ? "active" : ""].join(" ")}
              onClick={() => scrollTo(i)}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="hero-row">
        <h1 className="hero-title">
          {headline ?? (
            <>
              <span>Simply Unique</span>
              <span className="accent">/</span>
              <br />
              <span>Simply Better.</span>
            </>
          )}
        </h1>

        <p className="hero-sub">
          {subline ?? (
            <>
              <b>3legant</b> is a gift & decorations store based in HCMC, Vietnam.
              Est since 2019.
            </>
          )}
        </p>
      </div>

      <style jsx>{`
  .carousel {
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .frame {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
  }
  .track {
    display: flex;
    width: 100%;
    height: var(--carousel-height, clamp(440px, 58vw, 560px));
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .track::-webkit-scrollbar {
    display: none;
  }
  .slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    scroll-snap-align: center;
    user-select: none;
  }
  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: none;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    font-size: 26px;
    line-height: 1;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    z-index: 2;
  }
  .nav:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  }
  .nav:active {
    transform: translateY(-50%) scale(0.98);
  }
  .prev { left: 24px; }
  .next { right: 24px; }

  .dots {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    align-items: center;
    z-index: 2;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    cursor: pointer;
    transition: transform 0.12s ease, background 0.12s ease, width 0.12s ease;
  }
  .dot:hover { transform: scale(1.1); }
  .dot.active {
    background: #111827;
    width: 24px;
    border-radius: 999px;
  }

  /* COPY under the banner */
  .hero-row {
    display: grid;
    grid-template-columns: 1fr minmax(280px, 420px);
    gap: 24px 40px;
    align-items: start;
    margin-top: 18px;
    margin-bottom: 8px;
  }
  .hero-title {
    margin: 0;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 0.95;
    font-size: clamp(42px, 6.5vw, 72px);
  }
  .hero-title .accent {
    display: inline-block;
    transform: translateY(-0.06em) rotate(10deg);
    padding: 0 6px;
    font-weight: 500;
  }
  .hero-sub {
    margin: 0.4rem 0 0 0;
    font-size: 16px;
    color: #6b7280;
    line-height: 1.6;
  }

  /* MOBILE: match the reference */
  @media (max-width: 640px) {
    .track {
      height: var(--carousel-height, clamp(300px, 62vw, 420px));
    }
    .nav {
      width: 38px;
      height: 38px;
      font-size: 22px;
    }
    .prev { left: 12px; }
    .next { right: 12px; }
    .dots { bottom: 10px; }

    .hero-row {
      grid-template-columns: 1fr;
      gap: 8px;
      margin-top: 20px;
      margin-bottom: 6px;
    }
    .hero-title {
      font-weight: 700;             /* stronger on mobile like the mock */
      letter-spacing: -0.03em;
      line-height: 0.92;
      font-size: clamp(36px, 11vw, 48px);
    }
    .hero-title .accent {
      transform: translateY(-0.12em) rotate(10deg);
      padding: 0 4px;
      font-weight: 600;
    }
    .hero-sub {
      font-size: 14px;
      color: #6b7280;
      margin-top: 10px;
    }
  }
        @media (max-width: 900px) {
          .hero-row {
            grid-template-columns: 1fr;
          }
          .hero-sub {
            margin-top: 6px;
          }
        }

        @media (max-width: 640px) {
          .track {
            height: var(--carousel-height, clamp(320px, 62vw, 420px));
          }
          .nav {
            width: 38px;
            height: 38px;
            font-size: 22px;
          }
          .prev {
            left: 12px;
          }
          .next {
            right: 12px;
          }
          .dots {
            bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
}

const defaults: CarouselImage[] = [
  { url: "/Images/Slide12.jpg", name: "Slide 1" },
  { url: "/Images/Slide2.jpg", name: "Slide 2" },
  { url: "/Images/Slide3.jpg", name: "Slide 3" },
];

export default function CarouselSection(
  props: Omit<StrictProps, "images"> & { images?: CarouselImage[] }
) {
  return <CarouselCore {...props} images={props.images ?? defaults} />;
}
