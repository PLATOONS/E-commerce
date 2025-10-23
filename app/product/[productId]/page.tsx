import Header from '@/components/Header'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
import ReviewsSection from '@/components/ReviewSection'
import PriceComponent from '@/components/PriceComponent'
import BuyProduct from '@/components/BuyProduct'
import ProductImageGallery from '@/components/ProductImageGallery'
import ProductDescription from '@/components/Description'
import ProductMetaData from '@/components/MetaData'
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

  // Procesar imágenes del producto
  const options = data.productImages
    .filter((i) => i.color)
    .map((o) => ({
      ...o,
      imageUrl: placeholder.src, // Placeholder temporal
    }))

  const galleryImages: string[] = data.productImages.map(
    (img) => img.imageUrl || placeholder.src
  )

  return (
    <div>
      <Header />
      <main
        className='px-6 py-10 space-y-12 mx-4 
        md:flex md:flex-row md:space-x-8 md:space-y-0'
      >
        {/* Galería de imágenes */}
        <div className='w-full md:w-1/2'>
          <ProductImageGallery
            imagesUrl={galleryImages}
            isNew={true || false}
            discountPercentage={data.discount || 0}
          />
        </div>

        {/* Información del producto */}
        <div className='w-full md:w-1/2 flex flex-col space-y-6'>
          {/* Nombre + descripción */}
          <ProductDescription name={data.name} description={data.description} />

          {/* Metadata: SKU y categoría */}
          <ProductMetaData SKU={data.productId} category={data.category} />

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
      <ReviewsSection productId={data.productId} />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
