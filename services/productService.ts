async function fetchProduct(productId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`

  return fetch(url)
}

async function fetchProductsPage(
  page: number,
  size: number,
  sort: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product?${
    category ? `category=${category}&` : ''
  }${minPrice ? `min=${minPrice}&` : ''}${
    maxPrice ? `max=${maxPrice}&` : ''
  }page=${page}&size=${size}&sort=${sort}`

  return fetch(url)
}

export { fetchProduct, fetchProductsPage }
