'use client'

import React, { useState, useRef, useEffect } from 'react'

interface ProductImageGalleryProps {
    imagesUrl: string[]
    isNew: boolean
    discountPercentage: number
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
    imagesUrl,
    isNew,
    discountPercentage,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const thumbnailsRef = useRef<HTMLDivElement>(null)

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === imagesUrl.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? imagesUrl.length - 1 : prev - 1))
    }

    const goToImage = (index: number) => {
        setCurrentImageIndex(index)
    }
    useEffect(() => {
        const container = thumbnailsRef.current
        if (!container) return
        const selectedThumbnail = container.children[currentImageIndex] as HTMLElement
        if (selectedThumbnail) {
            selectedThumbnail.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            })
        }
    }, [currentImageIndex])

    if (!imagesUrl?.length) {
        return (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-none">
                <p className="text-gray-500">No images available</p>
            </div>
        )
    }

    return (
        <div className="h-[414px] sm:h-[919px] w-[311px] sm:w-[549px] max-w-4xl mx-auto px-2 sm:px-4">
            {/* Main Image Container */}
            <div className="relative">
                <img
                    src={imagesUrl[currentImageIndex]}
                    alt={`Product image ${currentImageIndex + 1}`}
                    className="h-[414px] sm:h-[728px] w-[311px] sm:w-[547px] object-cover rounded-none shadow-md"
                />

                {/* Navigation Arrows */}
                {imagesUrl.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity duration-200 opacity-70 hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity duration-200 opacity-70 hover:opacity-100"
                            aria-label="Next image"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 w-14 sm:w-20">
                    {isNew && (
                        <div className="bg-white text-black text-center px-2 py-1 rounded-none text-xs sm:text-sm font-semibold shadow-md w-full">
                            NEW
                        </div>
                    )}
                    {discountPercentage > 0 && (
                        <div className="bg-green-300 text-white text-center px-2 py-1 rounded-none text-xs sm:text-sm font-semibold shadow-md w-full">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>
            </div>


            {imagesUrl.length > 1 && (
                <div
                    ref={thumbnailsRef}
                    className="hidden sm:flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-none"
                >
                    {imagesUrl.map((url, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-[167px] h-[167px] rounded cursor-pointer transition-all duration-200 ${index === currentImageIndex
                                ? 'ring-2 ring-green-500 ring-offset-2'
                                : 'hover:opacity-80'
                                }`}
                            onClick={() => goToImage(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    goToImage(index)
                                }
                            }}
                        >
                            <img
                                src={url}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover rounded"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductImageGallery
