async function fetchProduct(productId: string) {
  const url = `${process.env.API_URL}/product/${productId}`

  return fetch(url)
}

export { fetchProduct }
