import { useState } from 'react'
import ProductImage from '../ProductImage'

export default function ProductGallery({ product }) {
  const images = product.images?.length
    ? product.images
    : product.image
      ? [{ src: product.image, alt: product.imageAlt }]
      : []

  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  if (!active) {
    return (
      <ProductImage
        product={product}
        aspect="aspect-[3/4] sm:aspect-square"
        className="rounded-2xl"
      />
    )
  }

  const galleryProduct = {
    ...product,
    image: active.src,
    imageAlt: active.alt,
  }

  return (
    <div className="space-y-3">
      <ProductImage
        product={galleryProduct}
        aspect="aspect-[3/4] sm:aspect-[4/5] lg:aspect-square"
        className="rounded-2xl bg-cream"
        imageFit={product.imageFit}
      />

      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3" role="tablist" aria-label={`${product.name} photos`}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`View photo ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-cream ${
                activeIndex === i
                  ? 'border-brown shadow-md ring-2 ring-brown/10'
                  : 'border-cream-dark hover:border-brown/30 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
