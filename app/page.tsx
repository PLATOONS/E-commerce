import Image from "next/image";
import DiscountSection from "@/components/DiscountSection"; // Import for "Discount Section"
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import ProductCarousel from "@/components/ProductCarousel";


export default function Home() {
  return (
    <div>
      <main>

        {/* Here we render the component */}
        <SubcategoriesSection />
        <ProductCarousel /> {/*Need to change this after endpoint and also I need to import Product card I think Jeje*/}
        <BenefitSection />
        <DiscountSection />
        <NewsletterSection />

      </main>
    </div>
  );
}
