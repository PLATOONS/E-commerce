'use client'
import { useState } from 'react'
import Wishlist from './Wishlist'
import Quantity from './Quantity'
import AddToCart from './AddToCart'
import { useRouter } from 'next/navigation'

export default function BuyProduct({
  productId,
  isWishlisted,
  quantityProp,
}: {
  productId: string
  isWishlisted: boolean
  quantityProp: number
}) {
  const [quantity, setQuantity] = useState<number>(quantityProp)
  const router = useRouter()

  const onClick = () => {
    try {
      console.log('Make API call here')

      router.replace('/checkout?page=0')
    } catch {
      console.error("Couldn't add product to cart")
    }
  }

  return (
    <div className='flex gap-4 flex-col my-3'>
      <div className='flex flex-row gap-6'>
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <Wishlist
          isWishlisted={isWishlisted}
          isSmall={false}
          productId={productId}
        />
      </div>
      <AddToCart onClick={onClick} />
    </div>
  )
}
