'use client'

import { useState } from 'react'
import FilterSidebar from './FilterSideBar'
import ProductGrid from './ProductGrid'

export default function ShopGrid({
  categories,
}: {
  categories: Array<Category>
}) {
  const [category, setCategory] = useState<string>('All Rooms')
  const [price, setPrice] = useState<string>('All Price')

  return (
    <div className='mx-4 md:mx-16 lg:mx-32 pt-12 flex flex-col md:flex-row'>
      <FilterSidebar
        categories={categories}
        selectedCategory={category}
        setSelectedCategory={setCategory}
        selectedPrice={price}
        setSelectedPrice={setPrice}
      />
      <ProductGrid category={category} price={price} />
    </div>
  )
}
