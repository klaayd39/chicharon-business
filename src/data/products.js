import { businessConfig } from './businessConfig'

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'lumpia', label: 'Lumpia' },
  { id: 'tocino', label: 'Tocino' },
  { id: 'tapa', label: 'Tapa' },
  { id: 'longganisa', label: 'Longganisa' },
  { id: 'bbq', label: 'BBQ' },
  { id: 'chicharon', label: 'Chicharon' },
]

export const products = [
  {
    id: 'lumpia',
    name: 'Lumpia',
    category: 'lumpia',
    categoryLabel: 'Lumpia',
    description: 'Crispy, savory, and perfect for sharing.',
    longDescription:
      'Golden, crispy lumpia made for sharing at home — a Filipino favorite that brings everyone to the table.',
    image: '/images/lumpia.png',
    images: [
      { src: '/images/lumpia.png', alt: 'Golden crispy lumpia with sweet chili dipping sauce' },
    ],
    imageAlt: 'Golden crispy lumpia served with sweet chili dipping sauce',
    imagePosition: 'center 55%',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: true,
  },
  {
    id: 'tocino',
    name: 'Tocino',
    category: 'tocino',
    categoryLabel: 'Tocino',
    description: 'Sweet, savory, and perfect with garlic rice.',
    longDescription:
      'Sweet and savory tocino that pairs perfectly with garlic rice — an easy breakfast classic made convenient.',
    image: '/images/tocino.png',
    images: [
      { src: '/images/tocino.png', alt: 'Sweet cured tocino with a glossy caramelized glaze' },
    ],
    imageAlt: 'Sweet cured tocino with a glossy caramelized glaze',
    imagePosition: 'center 45%',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: false,
  },
  {
    id: 'tapa',
    name: 'Tapa',
    category: 'tapa',
    categoryLabel: 'Tapa',
    description: 'Flavorful Filipino-style cured beef.',
    longDescription:
      'Savory Filipino-style tapa with rich, familiar flavor — easy to prepare for any meal of the day.',
    image: '/images/tapa.jpg',
    images: [
      { src: '/images/tapa.jpg', alt: 'Filipino-style beef tapa with garlic and chili' },
    ],
    imageAlt: 'Filipino-style beef tapa with garlic and chili',
    imagePosition: 'center 40%',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: false,
  },
  {
    id: 'longganisa',
    name: 'Longganisa',
    category: 'longganisa',
    categoryLabel: 'Longganisa',
    description: 'A classic Filipino breakfast favorite.',
    longDescription:
      'Juicy, flavorful longganisa — a classic Filipino breakfast favorite, conveniently packed and easy to prepare.',
    image: '/images/longganisa.png',
    images: [
      { src: '/images/longganisa.png', alt: 'Pan-fried longganisa with a glossy caramelized glaze' },
    ],
    imageAlt: 'Pan-fried Filipino longganisa served with dipping sauce',
    imagePosition: 'center 45%',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: true,
  },
  {
    id: 'bbq',
    name: 'BBQ',
    category: 'bbq',
    categoryLabel: 'BBQ',
    description: 'Smoky, savory, and ready for grilling.',
    longDescription:
      'Smoky, savory Filipino-style BBQ — ready for the grill and perfect for gatherings and family meals.',
    image: '/images/bbq.jpg',
    images: [
      { src: '/images/bbq.jpg', alt: 'Filipino-style BBQ skewers with glaze and lime' },
    ],
    imageAlt: 'Filipino-style BBQ skewers glazed and ready to grill',
    imagePosition: 'center 50%',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: false,
  },
  {
    id: 'chicharon',
    name: 'Chicharon',
    category: 'chicharon',
    categoryLabel: 'Chicharon',
    description: 'Crispy, crunchy, and irresistibly satisfying.',
    longDescription:
      'Our chicharon delivers that satisfying crunch and savory flavor Filipinos love. Packed in 250g sealed bags — perfect for sharing or snacking anytime.',
    image: '/images/chicharon-pack.jpg',
    images: [
      { src: '/images/chicharon-pack.jpg', alt: 'Kingdams Foods chicharon in a 250g sealed pack' },
    ],
    imageAlt: 'Kingdams Foods chicharon — crispy golden pork rinds in 250g pack',
    imageFit: 'contain',
    imagePosition: 'center 92%',
    weight: '250g',
    price: null,
    unit: 'pack',
    availability: 'available',
    featured: true,
  },
]

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
