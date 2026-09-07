import SectionHeader from '../components/ui/SectionHeader'
import PageLayout from '../components/ui/PageLayout'
import BulkOrderForm from '../components/bulk/BulkOrderForm'

export default function BulkOrder() {
  return (
    <PageLayout>
      <SectionHeader
        eyebrow="For Larger Orders"
        title="Bulk Orders"
        description="Planning a large order? Send us your requirements and we'll get back to you with availability and pricing. Bulk orders are subject to confirmation."
      />
      <BulkOrderForm />
    </PageLayout>
  )
}
