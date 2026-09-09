import ProductGrid from '../components/ProductGrid'
import PageHeader from '../components/ui/PageHeader'
import PageLayout from '../components/ui/PageLayout'
import { products } from '../data/products'

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Browse Our Selection"
        description="Explore lumpia, tocino, tapa, longganisa, BBQ, and chicharon — six Filipino favorites from Kingdams Foods."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
      />
      <PageLayout className="section-surface-alt">
        <ProductGrid products={products} />
      </PageLayout>
    </>
  )
}
