import Header from "@/components/Header";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewSection";
import PriceComponent from "@/components/PriceComponent";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="px-6 py-10 space-y-12">
        <h1 className="text-3xl font-bold">Product Page</h1>
        <PriceComponent />
        <ReviewsSection/>
        <NewsletterSection />
        <Footer />
      </main>
    </div>
  );
}