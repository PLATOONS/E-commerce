'use client'
import { SlidersHorizontal } from 'lucide-react'

interface FilterSidebarProps {
  categories: Category[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedPrice: string
  setSelectedPrice: (price: string) => void
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: FilterSidebarProps) {
  const priceRanges = [
    'All Price',
    '$0.00 - 99.99',
    '$100.00 - 199.99',
    '$200.00 - 299.99',
    '$300.00 - 399.99',
    '$400.00+',
  ]

  return (
    <div className='w-64 bg-white'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4'>
        <SlidersHorizontal className='w-5 h-5' />
        <h2 className='font-semibold text-lg'>Filter</h2>
      </div>

      {/* Categories */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold text-gray-600 mb-3'>CATEGORIES</h3>
        <ul className='space-y-2 text-sm'>
          {['All Rooms', ...categories.map((cat) => cat.name)].map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer hover:text-black ${
                selectedCategory === cat
                  ? 'font-semibold text-black underline'
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className='text-sm font-semibold text-gray-600 mb-3'>PRICE</h3>
        <ul className='space-y-2 text-sm'>
          {priceRanges.map((price) => (
            <li key={price} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={selectedPrice === price}
                onChange={() =>
                  setSelectedPrice(
                    price === selectedPrice ? 'All Price' : price
                  )
                }
                className='w-4 h-4 accent-black'
              />
              <span>{price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
