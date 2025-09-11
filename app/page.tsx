import Image from "next/image";
import Header from "@/components/Header";
import DiscountSection from "@/components/DiscountSection"; // Import for "Discount Section"
import SubcategoriesSection from "@/components/SubcategoriesSection";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitSection from "@/components/BenefitSection";


export default function Home() {
  return (
    <div>
      <Header /> 
      <main>
        <SubcategoriesSection />
        <BenefitSection />
        <DiscountSection />
        <NewsletterSection />
      </main>
    </div>
  );
}