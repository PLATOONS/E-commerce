import Link from "next/link";
import ProductCard, { ProductCardData } from "./ProductCard";


const defaultProducts: ProductCardData[] = [
      {
    id: 1,
    name: "Loveseat Sofa",
    price: 1200,
    discountPercentage: 10,
    discountedPrice: null,
    rating: 4,
    wishlisted: true,
    imageUrl: "/images/Sofa_carousel.png",
    imageName: "Loveseat Sofa",
    createdAt: "2025-09-05",
  },
    {
    id: 2,
    name: "Sofa 2",
    price: 600,
    discountPercentage: 10,
    discountedPrice: null,
    rating: 4,
    wishlisted: true,
    imageUrl: "/images/Sofa_carousel.png",
    imageName: "Loveseat Sofa",
    createdAt: "2025-09-06",
  },
];

export type ProductCarouselProps = {
  title?: string;
  moreHref?: string;
  products?: ProductCardData[];
  className?: string;
};

export default function ProductCarousel({
  title = "New\nArrivals",
  moreHref = "#",
  products = defaultProducts, // Just waiting for endpoint
  className,
}: ProductCarouselProps) {
  const sortedProducts = [...products].sort((a, b) => {
    const da = new Date(a.createdAt ?? 0).getTime();
    const db = new Date(b.createdAt ?? 0).getTime();
    return db - da;
  });

  return (
    <section className={`carousel ${className ?? ""}`}>
      <div className="section_header">
        <h1 dangerouslySetInnerHTML={{ __html: title.replace("\n", "<br>") }} />
        <Link className="more desktop" href={moreHref}>
          More Products →
        </Link>
      </div>

      <div className="carousel-container">
        <div className="carousel-track">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>

      <Link className="more mobile" href={moreHref}>
        More Products →
      </Link>
    </section>
  );
}
