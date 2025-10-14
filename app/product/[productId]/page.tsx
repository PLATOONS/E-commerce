import Header from '@/components/Header'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
import ReviewsSection from '@/components/ReviewSection'
import PriceComponent from '@/components/PriceComponent'
import Wishlist from '@/components/Wishlist'
import BuyProduct from '@/components/BuyProduct'

export default function Home() {
  return (
    <div>
      <Header />
      <main
        className='px-6 py-10 space-y-12 mx-4 
      md:flex md:flex-row'
      >
        <div className='w-full sm:w-5xl'>{/* Image gallery goes here */}</div>
        <div className='w-full'>
          <PriceComponent price={20} discounted_amount={10} />
          <BuyProduct productId={'a'} isWishlisted={false} quantityProp={1} />
        </div>
      </main>
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
