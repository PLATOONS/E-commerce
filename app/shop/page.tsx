import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NewsletterSection from '@/components/NewsletterSection'
import ShopGrid from '@/components/ShopGrid'
import shopBanner from '@/public/Images/shop_banner.png'
import { fetchAllCategories } from '@/services/categoryService'

export default async function Shop() {
  const res = await fetchAllCategories()

  if (!res.ok) {
    return (
      <div>
        <Header />
        <div
          className='mx-4 md:mx-16 lg:mx-32 bg-cover bg-center bg-no-repeat h-64 flex flex-col justify-center items-center gap-3'
          style={{ backgroundImage: `url(${shopBanner.src})` }}
        >
          <div>
            <span className='text-[#605F5F]'>Home {'>'} </span>
            <span className='text-[#121212]'>&nbsp;&nbsp;&nbsp; Shop</span>
          </div>
          <h1 className='text-black text-5xl'>Shop Page</h1>
          <p className='text-[#121212]'>
            Let’s design the place you always imagined.
          </p>
        </div>
        <p>Couldn't connect to server</p>
        <NewsletterSection />
        <Footer />
      </div>
    )
  }

  const categories: Array<Category> = await res.json()

  return (
    <div>
      <Header />
      <div
        className='mx-4 md:mx-16 lg:mx-32 bg-cover bg-center bg-no-repeat h-64 flex flex-col justify-center items-center gap-3'
        style={{ backgroundImage: `url(${shopBanner.src})` }}
      >
        <div>
          <span className='text-[#605F5F]'>Home {'>'} </span>
          <span className='text-[#121212]'>&nbsp;&nbsp;&nbsp; Shop</span>
        </div>
        <h1 className='text-black text-5xl'>Shop Page</h1>
        <p className='text-[#121212]'>
          Let’s design the place you always imagined.
        </p>
      </div>
      <ShopGrid categories={categories} />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
