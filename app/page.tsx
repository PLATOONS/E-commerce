import Image from "next/image";
import DiscountSection from "@/components/DiscountSection"; // Import for "Discount Section"
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import ArticlesSection from "@/components/ArticlesSection";

export default function Home() {
  return (
    <div>
      <main>

        {/* Here we render the component */}
        <SubcategoriesSection />
        <BenefitSection />
        <DiscountSection />
        <NewsletterSection />

      </main>
    </div>
  );
}
