import Link from "next/link";
import ProductCard, { ProductCardData } from "./ProductCard";

export type ApiProduct = {
  productId: string;
  reviews: number;
  productName: string;
  price: number;
  discountPercentage?: number | null;
  discountedPrice?: number | null;
  rating?: number | null;
  wishlisted?: boolean | null;
  imageUrl?: string | null;
  createdAt?: string;
  deleteAt?: string | null;
};
export type PageResponse = { content: ApiProduct[] };

async function getProducts(): Promise<ProductCardData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product?page=0&size=10&sort=createdAt,desc`,
    { cache: "no-store" }
  );
  console.log(res)
  if (!res.ok) throw new Error("Failed products");

  const data: PageResponse = await res.json();
  const items = (data.content ?? []).filter((p) => !p.deleteAt);

  const mapped: ProductCardData[] = items.map((p) => {
    const img = p.imageUrl
      ? (p.imageUrl.startsWith("http") ? p.imageUrl : `/Images/${p.imageUrl}`)
      : "/Images/placeholder.png";
    return {
      productId: p.productId,
      reviews: p.reviews,
      name: p.productName,
      price: p.price,
      discountPercentage: p.discountPercentage ?? null,
      discountedPrice: p.discountedPrice ?? null,
      rating: p.rating ?? 0,
      wishlisted: !!p.wishlisted,
      imageUrl: img,
      imageName: p.productName,
      createdAt: p.createdAt,
    };
  });

  mapped.sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  return mapped;
}

export type ProductCarouselProps = {
  title?: string;
  moreHref?: string;
  className?: string;
};

export default async function ProductCarousel({
  title = "New\nArrivals",
  moreHref = "/shop",
  className,
}: ProductCarouselProps) {
  const products = await getProducts();
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
            <ProductCard key={p.productId} data={p} />
          ))}
        </div>
      </div>

      <Link className="more mobile" href={moreHref}>
        More Products →
      </Link>
    </section>
  );
}
