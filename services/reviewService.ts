async function postReview(comment: string, rating: number, productId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/review/${productId}`

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ comment, rating }),
  })
}

async function fetchReviews(productId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/review/${productId}`

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { postReview, fetchReviews }
