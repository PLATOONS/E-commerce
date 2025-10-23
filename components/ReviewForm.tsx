'use client'

import { postReview } from '@/services/reviewService'
import { useState } from 'react'

export default function ReviewForm({ productId }: { productId: string }) {
  const [content, setContent] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await postReview(content, rating, productId)

    if (!res.ok) {
      window.alert("Couldn't post review")
      return
    }

    setContent('')
    setRating(0)
  }

  return (
    <div className='flex flex-col items-start gap-2 w-full max-w-xl'>
      {/* Rating stars */}
      {/* Yea this was made by AI, lol */}
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl transition ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-500`}
          >
            ★
          </button>
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className='flex items-center gap-2 w-full border border-gray-200 rounded-full px-4 py-2 shadow-sm'
      >
        <input
          type='text'
          placeholder='Write a review...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='flex-1 bg-transparent outline-none text-sm placeholder-gray-400'
        />
        <button className='bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition'>
          Write Review
        </button>
      </form>
    </div>
  )
}
