'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import CartItem from '@/types/CartItem'

interface ThankYouCardProps {
    products: CartItem[]
    orderCode: string
    date: Date
    total: number
    paymentMethod: string
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({
    products,
    orderCode,
    date,
    total,
    paymentMethod,
}) => {
    const router = useRouter()

    const handleGoToHistory = () => {
        router.push('/account?page=history')
    }

    return (
        <div className="w-[312px] sm:w-[730px] h-auto sm:h-[730px] bg-white shadow-md rounded-lg p-6 sm:p-12 mt-10">
            {/* Título */}
            <h4 className="text-1xl sm:text-2xl font-semibold text-gray-400 mb-2 sm:text-center">
                Thank You! 🎉
            </h4>
            <h2 className="text-5xl font-semibold text-gray-900 mb-6 sm:text-center">
                <span className="block sm:inline">Your order </span>
                <span className="block sm:inline">has been </span>
                <span className="block">received </span>
            </h2>

            {/* Imágenes */}
            <div className="flex space-x-2 mx-auto w-[280px] h-[104px]">
                {products.slice(0, 3).map((product, index) => (
                    <div key={index} className="relative w-[88px] h-[104px]">
                        <img
                            src={product.imageUrl}
                            alt={`Producto ${index + 1}`}
                            className="w-[80px] h-[96px] object-cover rounded-none flex-shrink-0"
                        />
                        {/* Badge en la esquina superior derecha */}
                        <div className="absolute top-1 sm:top-1 right-3 sm:right-3 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold w-3 sm:w-5 sm:h-5 h-3 flex items-center justify-center rounded-full">
                            {product.quantity}
                        </div>
                    </div>
                ))}
            </div>

            {/* Información de pago */}
            <div className="mb-4 text-gray-700 mt-6 w-[280px] h-auto sm:w-[548px] mx-auto">
                <div className="flex flex-col sm:flex-col sm:items-center sm:space-y-0 space-y-2 sm:mx-[100px]">
                    <p className="pb-4 border-b border-gray-200 w-full sm:border-b-0 sm:flex justify-between">
                        <span className="font-medium block sm:inline">Code:</span>{' '}
                        <span className="text-gray-900 font-bold block sm:inline">{orderCode}</span>
                    </p>
                    <p className="pb-4 border-b border-gray-200 w-full sm:border-b-0 sm:flex justify-between">
                        <span className="font-medium block sm:inline">Date:</span>{' '}
                        <span className="text-gray-900 font-bold block sm:inline">{date.toLocaleDateString()}</span>
                    </p>
                    <p className="pb-4 border-b border-gray-200 w-full sm:border-b-0 sm:flex justify-between">
                        <span className="font-medium block sm:inline">Total:</span>{' '}
                        <span className="text-gray-900 font-bold block sm:inline">${total.toFixed(2)}</span>
                    </p>
                    <p className="pb-4 border-b border-gray-200 w-full sm:border-b-0 sm:flex justify-between">
                        <span className="font-medium block sm:inline">Payment Method:</span>{' '}
                        <span className="text-gray-900 font-bold block sm:inline">{paymentMethod}</span>
                    </p>
                </div>
            </div>

            {/* Botón */}
            <button
                onClick={handleGoToHistory}
                className="mt-4 w-[280px] h-[52px] bg-gray-900 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-[80px] transition-colors mx-auto block"
            >
                Purchase history
            </button>
        </div>
    )
}

export default ThankYouCard
