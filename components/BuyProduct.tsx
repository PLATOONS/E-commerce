'use client'
import { useState } from 'react'
import Wishlist from './Wishlist'
import Quantity from './Quantity'
import AddToCart from './AddToCart'
import { useRouter } from 'next/navigation'
import ColorPickerSelector from './ColorPickerSelector'
import ColorPicker from '@/types/ColorPicker'
import { validateJWT } from '@/utils/jwtUtils'

export default function BuyProduct({
  productId,
  isWishlisted,
  quantityProp,
  options,
}: {
  productId: string
  isWishlisted: boolean
  quantityProp: number
  options: Array<ColorPicker>
}) {
  const [quantity, setQuantity] = useState<number>(quantityProp)
  const router = useRouter()

  const onClick = () => {
    // Check if the user is logged in, redirect to log in page if not
    const token = window.sessionStorage.getItem('token')

    console.log(token)

    if (!token || !validateJWT(token)) {
      router.replace('/login')
      return
    }

    // TODO: make API call for adding to cart

    router.replace('/checkout?page=0')
  }

  const [selected, setSelected] = useState<string | null>(
    options[0]?.color || null
  )

  return (
    <div className='flex gap-4 flex-col my-3'>
      {selected && (
        <ColorPickerSelector
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      )}
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
