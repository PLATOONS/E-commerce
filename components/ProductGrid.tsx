'use client'
import { fetchProductsPage } from '@/services/productService'
import { useEffect, useState } from 'react'
import ProductCard, { ProductCardData } from './ProductCard'
import placeholder from '@/public/Images/placeholder.png'
import { ApiProduct, PageResponse } from './ProductCarousel'

export default function ProductGrid({
  category,
  price,
}: {
  category: string
  price: string
}) {
  const [sort, setSort] = useState<'newest' | 'highest' | 'lowest'>('newest')
  const [products, setProducts] = useState<Array<ProductCardData>>([])
  const [page, setPage] = useState<number>(0)
  const [last, setLast] = useState<boolean>(false)

  // I'm stupid
  const fetchStuff = (pageZero: boolean) => {
    const realPage = pageZero ? 0 : page

    // Determine the sort query param
    const sortBy =
      sort === 'newest'
        ? 'createdAt,DESC'
        : sort === 'highest'
        ? 'price,DESC'
        : 'price,ASC'

    // Determine the price range
    let min = 0
    let max = 999999
    switch (price) {
      case '$0.00 - 99.99':
        min = 0
        max = 99.99
        break
      case '$100.00 - 199.99':
        min = 100.0
        max = 199.99
        break
      case '$200.00 - 299.99':
        min = 200.0
        max = 299.99
        break
      case '$300.00 - 399.99':
        min = 300.0
        max = 399.99
        break
      case '$400.00+':
        min = 400.0
        max = 999999
        break
    }

    if (category === 'All Rooms') {
      fetchProductsPage(realPage, 9, sortBy, undefined, min, max)
        .then((res) => res.json())
        .then((data) => {
          setLast(data.last)
          setProducts((prev) => [
            ...prev,
            ...data.content.map((d: ApiProduct) => ({
              productId: d.productId,
              name: d.productName,
              price: d.price,
              discountPercentage: d.discountPercentage ?? null,
              discountedPrice: d.discountedPrice ?? null,
              rating: d.rating ?? 0,
              wishlisted: !!d.wishlisted,
              imageUrl: placeholder.src,
              imageName: d.productName,
              createdAt: d.createdAt,
            })),
          ])
        })
    } else {
      fetchProductsPage(realPage, 9, sortBy, category, min, max)
        .then((res) => res.json())
        .then((data) => {
          setLast(data.last)
          setProducts((prev) => [
            ...prev,
            ...data.content.map((d: ApiProduct) => ({
              productId: d.productId,
              name: d.productName,
              price: d.price,
              discountPercentage: d.discountPercentage ?? null,
              discountedPrice: d.discountedPrice ?? null,
              rating: d.rating ?? 0,
              wishlisted: !!d.wishlisted,
              imageUrl: placeholder.src,
              imageName: d.productName,
              createdAt: d.createdAt,
            })),
          ])
        })
    }
  }

  useEffect(() => {
    setProducts([])
    setPage(0)
    fetchStuff(true)
  }, [sort, category, price])

  useEffect(() => {
    if (page !== 0) fetchStuff(false)
  }, [page])

  return (
    // div hellhole :)
    <div className='w-full'>
      <div className='w-full flex items-start justify-between'>
        <h2 className='font-semibold text-lg'>{category}</h2>
        <span className='flex justify-end'>
          <label className='order-2 inline-flex items-center gap-3 md:order-none'>
            <span className='text-sm text-gray-700'>Sort</span>
            <select
              className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm'
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              aria-label='Sort reviews'
            >
              <option value='newest'>Newest</option>
              <option value='highest'>Highest price</option>
              <option value='lowest'>Lowest price</option>
            </select>
          </label>
        </span>
      </div>
      <div className='w-full grid grid-cols-3'>
        {products.map((p) => (
          <ProductCard data={p} key={p.productId} />
        ))}
      </div>
      {!last && (
        <div className='w-full flex align-middle justify-center my-8'>
          <button
            onClick={() => setPage((p) => p + 1)}
            className='cursor-pointer px-5 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors'
          >
            Show more
          </button>
        </div>
      )}
    </div>
  )
}
