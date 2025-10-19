async function fetchAllCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`
  return fetch(url)
}

export { fetchAllCategories }
