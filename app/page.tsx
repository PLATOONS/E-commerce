import Image from "next/image";
import DiscountSection from "@/components/DiscountSection"; // Import for "Discount Section"
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import CarouselSection from "@/components/CarouselSection";

export default function Home() {
  return (
    <div>
      <main>

        {/* Here we render the component */}
        <CarouselSection  />
        <SubcategoriesSection />
        <BenefitSection />
        <DiscountSection />
        <NewsletterSection />

      </main>
    </div>
  );
}
