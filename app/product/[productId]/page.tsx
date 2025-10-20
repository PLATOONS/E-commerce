import Header from '@/components/Header'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
import ReviewsSection from '@/components/ReviewSection'
import PriceComponent from '@/components/PriceComponent'
import BuyProduct from '@/components/BuyProduct'
import { fetchProduct } from '@/services/productService'
import product from '@/types/Product'
import placeholder from '@/public/Images/placeholder.png'

export default async function Home({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params

  // Fetch the product data
  const res = await fetchProduct(productId)

  if (!res.ok) {
    return (
      <div>
        <Header />
        <h1 className='text-3xl font-bold'>Product not found</h1>
        <NewsletterSection />
        <Footer />
      </div>
    )
  }

  const data: product = await res.json()

  const options = data.productImages
    .filter(
      // Removes non color images
      (i) => i.color
    )
    .map((o) => {
      return {
        ...o,
        imageUrl: placeholder.src, // Use a placeholder until we have the infraestructure
      }
    })

  return (
    <div>
      <Header />
      <main
        className='px-6 py-10 space-y-12 mx-4 
      md:flex md:flex-row'
      >
        <div className='w-full sm:w-5xl'>{/* Image gallery goes here */}</div>
        <div className='w-full'>
          <PriceComponent
            price={data.price}
            discounted_amount={data.discountAmount}
          />
          <BuyProduct
            productId={data.productId}
            isWishlisted={false}
            quantityProp={1}
            options={options}
          />
        </div>
      </main>
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
