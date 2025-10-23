'use client'

import { useSearchParams } from 'next/navigation'
import Stepper from '@/components/Stepper'
import CheckoutFormComponent from '@/components/CheckoutFormComponent'
import CheckoutFormData from '@/types/CheckoutFormData'
import ThankYouCard from '@/components/ThankYouCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSummary from '@/components/CartSummary'

export default function Checkout() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')

  // Convert query param to number, default to 0 if invalid or missing
  const state = Math.min(Math.max(Number(pageParam) || 0, 0), 2) as 0 | 1 | 2

  const onSubmit = async (formData: CheckoutFormData) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ ...formData, coupon: null }),
    })
  }

  return (
    <div className='flex flex-col'>
      <Header />
      <Stepper state={state} />
      {state === 0 ? (
        <CartSummary subtotal={100} />
      ) : state === 1 ? (
        <CheckoutFormComponent onSubmit={onSubmit} />
      ) : (
        <div className='w-full flex justify-center'>
          <ThankYouCard
            products={[]}
            orderCode={''}
            date={new Date()}
            total={0}
            paymentMethod={''}
          />
        </div>
      )}
      <Footer />
    </div>
  )
}
