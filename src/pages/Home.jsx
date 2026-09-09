import Hero from '../components/Hero'
import ProductCategories from '../components/ProductCategories'
import ProductCard from '../components/ProductCard'
import BrandStory from '../components/BrandStory'
import WhyChooseUs from '../components/WhyChooseUs'
import HowToOrder from '../components/HowToOrder'
import BulkOrderCTA from '../components/BulkOrderCTA'
import FinalCTA from '../components/FinalCTA'
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
      <ProductCategories />

      <section className="section-padding section-spacing bg-cream-dark/15">
        <div className="container-max">
          <SectionHeader
            eyebrow="Best Sellers"
            title="Fan Favorites"
            description="Add a few favorites to your cart — then browse the full menu anytime."
            align="left"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <SectionReveal delay={0.1}>
            <div className="mt-10 sm:mt-12">
              <Button to="/products" variant="secondary" size="lg">
                View All Products
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <BrandStory />
      <WhyChooseUs />
      <HowToOrder />
      <BulkOrderCTA />
      <FinalCTA />
      <Contact />
    </>
  )
}
