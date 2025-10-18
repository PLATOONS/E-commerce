import React from 'react'

type AddToCartButtonProps = {
  onClick: () => void
}

export default function AddToCart({ onClick }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className='w-full bg-neutral-seven text-white py-3 rounded-md  hover:bg-[#1f2122] transition-colors cursor-pointer'
    >
      Add to Cart
    </button>
  )
}
