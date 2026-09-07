import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProductImage from '../components/ProductImage'
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
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl sm:text-3xl text-brown mb-3">Product Not Found</h1>
          <p className="text-warm-gray text-sm sm:text-base mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button to="/products" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Products
          </Button>
        </div>
      </PageLayout>
    )
  }

  const handleAddAndViewCart = () => {
    addItem(product, quantity)
    openCart()
  }

  return (
    <PageLayout className="pb-28 sm:pb-24">
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center gap-1.5 text-sm text-warm-gray hover:text-brown transition-colors mb-6 sm:mb-8 -mt-2"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to Products
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProductImage
            product={product}
            aspect="aspect-square sm:aspect-[4/3] lg:aspect-square"
            className="rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex flex-col"
        >
          <p className="text-red text-xs font-semibold tracking-wider uppercase mb-1.5">
            {product.categoryLabel}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-brown mb-3 sm:mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-5">
            {product.longDescription}
          </p>

          <p className="text-base font-medium text-warm-gray italic mb-6 sm:mb-8">
            {getPriceDisplay(product)}
          </p>

          <div className="mb-6 sm:mb-8">
            <label className="block text-sm font-medium text-charcoal mb-2.5">Quantity</label>
            <QuantityControl
              value={quantity}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              onIncrease={() => setQuantity(quantity + 1)}
              label={product.name}
            />
          </div>

          <div className="hidden sm:flex flex-col sm:flex-row gap-3 mt-auto">
            <AddToOrderButton product={product} quantity={quantity} size="lg" className="w-full sm:w-auto" />
            <Button onClick={handleAddAndViewCart} variant="secondary" size="lg" className="w-full sm:w-auto">
              Add &amp; View Cart
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile order bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-cream/95 backdrop-blur-md border-t border-cream-dark px-4 py-3 safe-bottom">
        <div className="flex gap-2.5">
          <AddToOrderButton product={product} quantity={quantity} size="md" className="flex-1" />
          <Button onClick={handleAddAndViewCart} variant="secondary" size="md" className="flex-1">
            View Cart
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
