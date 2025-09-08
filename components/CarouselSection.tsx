import React from "react";

export type CarouselImage = { url: string; name: string };

type StrictProps = {
  images: CarouselImage[];
  className?: string;
  height?: number | string;
};

export function CarouselCore({ images, className, height }: StrictProps) {
  const styleVar: React.CSSProperties & { ["--carousel-height"]?: string } = {};
  if (height !== undefined) {
    styleVar["--carousel-height"] =
      typeof height === "number" ? `${height}px` : String(height);
  }

  return (
    <section
      className={["carousel", className].filter(Boolean).join(" ")}
      style={styleVar}
      aria-label="Image carousel"
    >
      <div className="track">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.name}
            className="slide"
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <style jsx>{`
        .carousel { width: 100%; }
        .track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          width: 100%;
          height: var(--carousel-height, 536px);
        }
        .slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          scroll-snap-align: center;
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}

const defaults: CarouselImage[] = [
  { url: "/Images/Slide1.jpg", name: "Slide 1" },
  { url: "/Images/Slide2.jpg", name: "Slide 2" },
  { url: "/Images/Slide3.jpg", name: "Slide 3" },
];

export default function CarouselSection(
  props: Omit<StrictProps, "images"> & { images?: CarouselImage[] }
) {
  return <CarouselCore {...props} images={props.images ?? defaults} />;
}
