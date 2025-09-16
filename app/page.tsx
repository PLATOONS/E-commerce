import Image from "next/image";
import Header from "@/components/Header";
import DiscountSection from "@/components/DiscountSection";
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";
import CarouselSection from "@/components/CarouselSection";
import ProductCarousel from "@/components/ProductCarousel";
import ArticlesSection from "@/components/ArticlesSection";

export default function Home() {
  return (
    <div>
      <Header /> 
      <main>
        {/* Here we render the component */}
        <CarouselSection  />
        <SubcategoriesSection />
        <ProductCarousel />
        <BenefitSection />
        <DiscountSection />
        <ArticlesSection />
        <NewsletterSection />
        <Footer />
      </main>
    </div>
  );
}

