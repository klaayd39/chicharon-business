import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import WhyChooseUs from '../components/WhyChooseUs'
import About from '../components/About'
import HowToOrder from '../components/HowToOrder'
import DeliveryPickup from '../components/DeliveryPickup'
import BulkOrderCTA from '../components/BulkOrderCTA'
import OrderCTA from '../components/OrderCTA'
import Contact from '../components/Contact'
import SectionHeader from '../components/ui/SectionHeader'
import SectionReveal from '../components/SectionReveal'
import Button from '../components/ui/Button'
import { getFeaturedProducts } from '../data/products'

export default function Home() {
  const featured = getFeaturedProducts()

  return (
    <>
      <Hero />

      <section className="section-padding section-spacing">
        <div className="container-max">
          <SectionHeader
            eyebrow="Our Menu"
            title="Our Favorites"
            description="Handpicked Filipino favorites — crispy, savory, and ready when you are."
          />

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 max-w-3xl sm:max-w-none mx-auto">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <SectionReveal delay={0.15}>
            <div className="text-center mt-8 sm:mt-10">
              <Button to="/products" variant="secondary" size="lg">
                View All Products
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <WhyChooseUs />
      <About />
      <HowToOrder />
      <DeliveryPickup />
      <BulkOrderCTA />
      <OrderCTA />
      <Contact />
    </>
  )
}
