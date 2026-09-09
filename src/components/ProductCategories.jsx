import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './SectionReveal'
import ProductImage from './ProductImage'
import { products } from '../data/products'

export default function ProductCategories() {
  return (
    <section id="shop" className="section-padding section-spacing bg-white scroll-mt-20">
      <div className="container-max">
        <SectionHeader
          eyebrow="Shop"
          title="Something for Every Filipino Craving."
          description="Six signature favorites — tap a product to view details and add to cart."
          align="left"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <SectionReveal key={product.id} delay={i * 0.07} y={32} scale>
              <Link
                to={`/products/${product.id}`}
                className="shop-tile group block h-full"
              >
                <div className="shop-tile-image">
                  <ProductImage
                    product={product}
                    aspect="absolute inset-0"
                    imageFit={product.imageFit}
                    className="!aspect-auto rounded-xl"
                  />
                </div>
                <div className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown group-hover:text-red transition-colors">
                      {product.name}
                    </h3>
                    {product.weight && (
                      <span className="text-xs text-warm-gray shrink-0 mt-1">{product.weight}</span>
                    )}
                  </div>
                  <p className="text-warm-gray text-sm leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brown group-hover:gap-2 transition-all">
                    Shop
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
