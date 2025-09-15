import Image from "next/image";
import Header from "@/components/Header";
import DiscountSection from "@/components/DiscountSection";
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import ProductCarousel from "@/components/ProductCarousel";
import ArticlesSection from "@/components/ArticlesSection"; // Import the ArticlesSection

export default function Home() {
  return (
    <div>
      <Header /> 
      <main>
        <SubcategoriesSection />
        <ProductCarousel />
        <BenefitSection />
        <DiscountSection />
        <ArticlesSection />
        <NewsletterSection />
      </main>
    </div>
  );
}