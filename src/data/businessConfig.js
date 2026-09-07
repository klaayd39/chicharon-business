export const businessConfig = {
  name: 'Kingdams Foods',
  logo: {
    src: '/images/logo.png',
    alt: 'Kingdams Foods logo',
  },
  promoImage: {
    src: '/images/kingdams-promo.jpg',
    alt: 'Kingdams Foods promotional poster showing easy-to-cook Filipino favorites including lumpia, tapa, tocino, longganisa, BBQ, and chicharon',
  },
  tagline: 'Easy Meals, Pinoy Feels.',
  headline: 'Authentic Filipino Favorites, Made to Satisfy.',
  heroDescription:
    'Crispy chicharon and quality frozen longganisa — proudly made for Malaybalay City and Bukidnon.',
  location: {
    city: 'Malaybalay City',
    province: 'Bukidnon',
    country: 'Philippines',
    full: 'Malaybalay City, Bukidnon, Philippines',
  },
  phone: {
    value: null,
    display: 'Coming Soon',
  },
  facebook: {
    url: null,
    display: 'Coming Soon',
  },
  businessHours: {
    open: '10:00 AM',
    close: '5:00 PM',
    display: '10:00 AM – 5:00 PM',
  },
  deliveryAvailable: true,
  pickupAvailable: true,
  /** Shown when product.price is null — update individual product prices in src/data/products.js */
  priceStatus: 'Price Coming Soon',
  totalStatus: 'Price to be confirmed',
  bulkOrder: {
    /**
     * BULK_ORDER_MIN_QUANTITY — minimum quantity per product for a bulk order.
     * Leave null until the business provides a rule; when set to a number,
     * the form will enforce it. Do not invent a value.
     */
    minQuantity: null,
    /** Prefix used for generated bulk-order reference numbers, e.g. KF-A1B2C3 */
    referencePrefix: 'KF',
    /** Default status a new bulk-order request receives */
    defaultStatus: 'pending',
    /** Supported lifecycle statuses (for future admin dashboard) */
    statuses: [
      'pending',
      'contacted',
      'quoted',
      'confirmed',
      'preparing',
      'completed',
      'cancelled',
    ],
  },
  copyright: '© 2026 Kingdams Foods. All rights reserved.',
  about: {
    title: 'Good Food, Made for Sharing.',
    description:
      'Kingdams Foods is a local food business serving Malaybalay City, Bukidnon, offering chicharon and frozen longganisa for customers looking for convenient and satisfying food products.',
  },
  footerDescription:
    'Premium chicharon and frozen longganisa, proudly made for Malaybalay City and Bukidnon.',
}
