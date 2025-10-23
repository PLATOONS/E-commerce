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

async function addProductToCart(
  productId: string,
  quantity: number,
  color: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orderProduct`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        color,
      }),
    }
  )

  return response
}

async function updateQuantityInCart(productId: string, quantity: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orderProduct/quantity`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }
  )

  return response
}

export { fetchProduct, fetchProductsPage, addProductToCart, updateQuantityInCart }
