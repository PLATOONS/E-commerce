'use client'

import { useSearchParams } from 'next/navigation'
import Stepper from '@/components/Stepper'
import CheckoutFormComponent from '@/components/CheckoutFormComponent'
import CheckoutFormData from '@/types/CheckoutFormData'
import ThankYouCard from '@/components/ThankYouCard'
import CartSummary from '@/components/CartSummary'
import { useEffect, useState } from 'react'
import { fetchCartProducts } from '@/services/productService'
import CartItemType from '@/types/CartItem'
import CartItem from './CartItem'
import CartItemComponent from './CartItem'

export default function Checkout() {
  const [products, setProducts] = useState<Array<CartItemType>>([])
  // avoid reading `window` during server render
  const [screenWidth, setScreenWidth] = useState(0);

  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')

  // Convert query param to number, default to 0 if invalid or missing
  const state = Math.min(Math.max(Number(pageParam) || 0, 0), 2) as 0 | 1 | 2

  // Load cart products on mount
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetchCartProducts()
        const items = await res.json()
        if (mounted && items) setProducts(items)
          console.log(items);
      } catch (err) {
        // swallow or handle fetch error as needed
        console.error('Failed to load cart products', err)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // set initial width on mount (safe because this effect runs only on the client)
    if (typeof window !== 'undefined') handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // compute subtotal from products (fallback to 0)
  const subtotal = products.reduce((sum, p: any) => {
    const price = typeof p.price === 'number' ? p.price : Number(p.price) || 0
    const qty =
      typeof p.quantity === 'number' ? p.quantity : Number(p.quantity) || 1
    return sum + price * qty
  }, 0)

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
      <Stepper state={state} />
      {state === 0 ? (
        <div className='flex flex-col md:flex-row gap-12 mx-8 justify-center my-8'>
          <div className='space-y-2'>
            {products.map((p, i) => (
              <CartItemComponent
                key={(p as any).id ?? i}
                productId={p.productId}
                productName={p.productName}
                price={p.price}
                quantity={p.quantity}
                color={p.color}
                imageUrl={p.imageUrl}
                isSmall={screenWidth < 768}
              />
            ))}
          </div>

          <CartSummary subtotal={subtotal} />
        </div>
      ) : state === 1 ? (
        <CheckoutFormComponent onSubmit={onSubmit} />
      ) : (
        <div className='w-full flex justify-center'>
          <ThankYouCard
            products={products}
            orderCode={''}
            date={new Date()}
            total={subtotal}
            paymentMethod={''}
          />
        </div>
      )}
    </div>
  )
}
