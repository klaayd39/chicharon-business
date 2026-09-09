import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ProductGallery from '../components/product/ProductGallery'
import Button from '../components/ui/Button'
import AddToOrderButton from '../components/product/AddToOrderButton'
import QuantityControl from '../components/ui/QuantityControl'
import PageLayout from '../components/ui/PageLayout'
import { getProductById, getPriceDisplay } from '../data/products'
import { useCart } from '../context/useCart'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem, openCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <>
        <div className="page-hero-band">
          <div className="section-padding container-max pt-28 pb-10 text-center">
            <h1 className="font-display text-2xl sm:text-3xl text-brown mb-3">Product Not Found</h1>
            <p className="text-warm-gray text-sm sm:text-base mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button to="/products" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Products
            </Button>
          </div>
        </div>
      </>
    )
  }

  const handleAddAndViewCart = () => {
    addItem(product, quantity)
    openCart()
  }

  return (
    <>
      <div className="page-hero-band">
        <div className="relative section-padding container-max pt-28 pb-6 sm:pt-32 sm:pb-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-warm-gray">
              <li><Link to="/" className="hover:text-brown transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-warm-gray-light" aria-hidden="true" /></li>
              <li><Link to="/products" className="hover:text-brown transition-colors">Products</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-warm-gray-light" aria-hidden="true" /></li>
              <li className="text-brown font-medium">{product.name}</li>
            </ol>
          </nav>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 text-sm text-warm-gray hover:text-brown transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Products
          </button>
        </div>
      </div>

      <PageLayout className="section-surface-alt pb-28 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProductGallery product={product} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex flex-col lg:sticky lg:top-28 lg:self-start"
          >
            <p className="badge-pill bg-red/8 text-red mb-3 w-fit">{product.categoryLabel}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-5">
              {product.longDescription}
            </p>

            {product.weight && (
              <p className="text-sm text-brown/80 font-medium mb-4">Pack size: {product.weight}</p>
            )}

            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="price-tag text-base">{getPriceDisplay(product)}</span>
              {product.availability === 'available' && (
                <span className="text-xs font-medium text-green-800 bg-green-50 px-2.5 py-1 rounded-full">
                  Available
                </span>
              )}
            </div>

            <div className="card p-5 mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-charcoal mb-3">Quantity</label>
              <QuantityControl
                value={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(quantity + 1)}
                label={product.name}
              />
            </div>

            <div className="hidden sm:flex flex-col sm:flex-row gap-3">
              <AddToOrderButton product={product} quantity={quantity} size="lg" className="w-full sm:flex-1" />
              <Button onClick={handleAddAndViewCart} variant="secondary" size="lg" className="w-full sm:flex-1">
                Add &amp; View Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </PageLayout>

      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-cream-dark px-4 py-3 safe-bottom shadow-[0_-4px_20px_rgba(61,35,20,0.08)]">
        <div className="flex gap-2.5">
          <AddToOrderButton product={product} quantity={quantity} size="md" className="flex-1" />
          <Button onClick={handleAddAndViewCart} variant="secondary" size="md" className="flex-1">
            View Cart
          </Button>
        </div>
      </div>
    </>
  )
}
