import ProductGrid from '../components/ProductGrid'
import SectionHeader from '../components/ui/SectionHeader'
import PageLayout from '../components/ui/PageLayout'
import { products } from '../data/products'

export default function Products() {
  return (
    <PageLayout>
      <SectionHeader
        eyebrow="Our Products"
        title="Browse Our Selection"
        description="Explore our chicharon and frozen longganisa — quality Filipino favorites made for you."
      />

      <ProductGrid products={products} />
    </PageLayout>
  )
}
