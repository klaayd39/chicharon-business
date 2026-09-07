import { businessConfig } from './businessConfig'

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'chicharon', label: 'Chicharon' },
  { id: 'longganisa', label: 'Longganisa' },
  { id: 'frozen-goods', label: 'Frozen Goods' },
]

export const products = [
  {
    id: 'chicharon',
    name: 'Chicharon',
    category: 'chicharon',
    categoryLabel: 'Chicharon',
    description:
      'Crispy, savory chicharon in 250g sealed packs — perfect for sharing or enjoying anytime.',
    longDescription:
      'Our chicharon is made to deliver that satisfying crunch and savory flavor Filipinos love. Packed in 250g sealed bags and ready to enjoy — perfect for sharing with family and friends, or as a snack any time of day.',
    image: '/images/chicharon-pack.jpg',
    images: [
      {
        src: '/images/chicharon-pack.jpg',
        alt: 'Kingdams Foods chicharon in a 250g sealed pack',
      },
      {
        src: '/images/chicharon-display.jpg',
        alt: 'Kingdams Foods chicharon packs on display',
      },
    ],
    imageAlt: 'Kingdams Foods chicharon — crispy golden pork rinds in 250g pack',
    imageFit: 'contain',
    weight: '250g',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: true,
  },
  {
    id: 'longganisa',
    name: 'Longganisa',
    category: 'longganisa',
    categoryLabel: 'Longganisa',
    description:
      "Quality frozen longganisa that's easy to prepare and perfect for any meal.",
    longDescription:
      'Our frozen longganisa is conveniently packed and easy to prepare — ideal for breakfast, lunch, or dinner. A quality Filipino favorite, ready whenever you need it.',
    image: '/images/longganisa.svg',
    imageAlt: 'Frozen longganisa packs from Kingdams Foods',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: true,
  },
]

/** Update `price` on each product when pricing is available. null = "Price Coming Soon" */
export function getPriceDisplay(product) {
  if (product.price != null) {
    return typeof product.price === 'number'
      ? `₱${product.price.toLocaleString()}`
      : String(product.price)
  }
  return businessConfig.priceStatus
}

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(categoryId) {
  if (categoryId === 'all') return products
  if (categoryId === 'frozen-goods') {
    return products.filter((p) => p.category === 'frozen-goods' || p.category === 'longganisa')
  }
  return products.filter((p) => p.category === categoryId)
}

export function toCartItem(product, quantity = 1) {
  return {
    id: product.id,
    name: product.name,
    unit: product.unit,
    priceDisplay: getPriceDisplay(product),
    image: product.image,
    imageAlt: product.imageAlt,
    quantity,
  }
}
