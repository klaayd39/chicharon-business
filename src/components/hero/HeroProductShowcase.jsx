import { products } from '../../data/products'
import HeroProductCard from './HeroProductCard'

const featuredId = 'lumpia'
const lineupIds = ['tocino', 'tapa', 'longganisa', 'bbq', 'chicharon']

export default function HeroProductShowcase() {
  const featured = products.find((p) => p.id === featuredId)
  const lineup = lineupIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <div className="hero-showcase">
      <p className="hero-showcase-eyebrow">Shop 6 favorites</p>

      {featured && (
        <HeroProductCard product={featured} featured />
      )}

      <div className="hero-showcase-grid">
        {lineup.map((product) => (
          <HeroProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
