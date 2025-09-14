import Image from "next/image";
import DiscountSection from "@/components/DiscountSection";
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import ArticlesSection from "@/components/ArticlesSection";

export default function Home() {
  return (
    <div>
      <main>
        <SubcategoriesSection />
        <BenefitSection />
        <DiscountSection />
        <ArticlesSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
