/**
 * Filter products by search query (name, description, category).
 * Case-insensitive; matches partial strings.
 */
export function searchProducts(products, query) {
  const trimmed = query.trim()
  if (!trimmed) return products

  const q = trimmed.toLowerCase()

  return products.filter((product) => {
    const searchable = [
      product.name,
      product.description,
      product.longDescription,
      product.categoryLabel,
      product.category,
      product.id,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchable.includes(q)
  })
}
