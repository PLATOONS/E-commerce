import Checkout from '@/components/Checkout'
import { Suspense } from 'react'

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className='text-center py-10'>Loading...</div>}>
      <Checkout />
    </Suspense>
  )
}
