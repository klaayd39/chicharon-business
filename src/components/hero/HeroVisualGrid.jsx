import { Link } from 'react-router-dom'
import { products } from '../../data/products'

const layout = [
  { id: 'lumpia', cell: 'hero-cell-lumpia' },
  { id: 'tocino', cell: 'hero-cell-tocino' },
  { id: 'chicharon', cell: 'hero-cell-chicharon' },
  { id: 'bbq', cell: 'hero-cell-bbq' },
  { id: 'longganisa', cell: 'hero-cell-longganisa' },
  { id: 'tapa', cell: 'hero-cell-tapa hidden sm:block' },
]

export default function HeroVisualGrid() {
  return (
    <div className="hero-bento" aria-label="Kingdams Foods product favorites">
      {layout.map(({ id, cell }) => {
        const product = products.find((p) => p.id === id)
        if (!product) return null
        const isPack = product.imageFit === 'contain'

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={`hero-cell ${cell} group`}
          >
            <img
              src={product.image}
              alt={product.imageAlt}
              className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                isPack ? 'object-contain object-bottom p-3 sm:p-4 bg-cream' : 'object-cover'
              }`}
              style={{ objectPosition: product.imagePosition || 'center' }}
              decoding={id === 'chicharon' ? 'async' : 'lazy'}
              fetchPriority={id === 'chicharon' ? 'high' : undefined}
            />
            <span className="hero-cell-label">{product.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
