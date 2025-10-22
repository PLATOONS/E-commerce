'use client'

import { useEffect, useState } from 'react'
import ReviewComponent from './ReviewComponent'
import { fetchReviews } from '@/services/reviewService'

export default function ReviewList({
  productId,
  sort,
  isLoggedIn,
  setTotalCount,
}: {
  productId: string
  sort: string
  isLoggedIn: boolean
  setTotalCount: (totalCount: number) => void
}) {
  const [reviews, setReviews] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetchReviews(productId)
        if (!res.ok) throw new Error('Error fetching reviews')

        const data = await res.json()
        const sorted = [...data].sort((a, b) => {
          if (sort === 'highest') return b.rating - a.rating
          if (sort === 'lowest') return a.rating - b.rating
          return b.reviewId - a.reviewId
        })

        setReviews(sorted)
        setTotalCount(data.length)
      } catch (err: any) {
        setError(err.message)
      }
    }

    loadReviews()
  }, [productId, sort, setTotalCount])

  if (error) return <div>{error}</div>

  return (
    <div>
      {reviews.map((r) => (
        <ReviewComponent
          key={r.reviewId}
          reviewId={r.reviewId}
          username={r.username}
          profilePictureUrl={r.profilePictureUrl}
          rating={r.rating}
          content={r.content}
          productId={productId ?? ''}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  )
}
