import Checkout from '@/components/Checkout'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Suspense } from 'react'

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className='text-center py-10'>Loading...</div>}>
        <Checkout />
      </Suspense>
      <Footer />
    </>
  )
}
