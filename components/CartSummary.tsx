'use client'

import React from "react"
import { useRouter } from "next/navigation" // App Router
import { validateJWT } from "@/utils/jwtUtils"

interface CartSummaryProps {
    subtotal: number
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
    const router = useRouter()
    const [shipping, setShipping] = React.useState<'free' | 'express' | 'pickup'>('free')

    const shippingCost = shipping === 'express'
        ? 15
        : shipping === 'pickup'
            ? subtotal * 0.21 // 21% of subtotal
            : 0

    const total = subtotal + shippingCost

    const handleCheckout = () => {
        if(!validateJWT(sessionStorage.getItem('token'))){
            router.push("/login")
            return
        }

        // Redirect to checkout page with query params
        router.push(`/checkout?page=1&shipping=${shipping}`)
    }

    return (
        <div className="w-[312px] sm:w-[413px] h-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-6">Cart Summary</h2>

            {/* Vertical radio buttons with border and custom circle */}
            <div className="flex flex-col gap-4 mb-6">
                {['free', 'express', 'pickup'].map((type) => {
                    const labelText =
                        type === 'free' ? 'Free Shipping' :
                            type === 'express' ? 'Express Shipping' :
                                'PickUp'

                    const isSelected = shipping === type

                    const priceText =
                        type === 'free' ? '$0.00' :
                            type === 'express' ? '+$15.00' :
                                '+21%'

                    return (
                        <label
                            key={type}
                            className={`flex items-center justify-between gap-3 cursor-pointer border rounded-md px-5 py-3 transition-colors duration-200 ${isSelected ? 'border-gray-900 bg-gray-200' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Hidden radio input */}
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={type}
                                    checked={isSelected}
                                    onChange={() => setShipping(type as 'free' | 'express' | 'pickup')}
                                    className="sr-only"
                                />
                                {/* Custom circle for radio */}
                                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-gray-900' : 'border-gray-400'}`}>
                                    {isSelected && <span className="w-3.5 h-3.5 bg-gray-900 rounded-full" />}
                                </span>
                                <span className="text-sm sm:text-base">{labelText}</span>
                            </div>
                            <span className="text-sm sm:text-base">{priceText}</span>
                        </label>
                    )
                })}
            </div>

            {/* Subtotal, Shipping and Total */}
            <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? '$0.00' : `+$${shippingCost.toFixed(2)}`}</span>
                </div>

                {/* Divider line */}
                <div className="border-t border-gray-300 my-3" />

                <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Checkout button */}
            <button
                className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition text-sm sm:text-base"
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
    )
}

export default CartSummary
