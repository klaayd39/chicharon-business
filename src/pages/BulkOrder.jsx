import PageHeader from '../components/ui/PageHeader'
import PageLayout from '../components/ui/PageLayout'
import BulkOrderForm from '../components/bulk/BulkOrderForm'

export default function BulkOrder() {
  return (
    <>
      <PageHeader
        eyebrow="Bulk Orders"
        title="Request a Bulk Order"
        description="Planning a large order? Send us your requirements and we'll get back to you with availability and pricing."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Bulk Order' },
        ]}
      />
      <PageLayout className="section-surface-alt">
        <BulkOrderForm />
      </PageLayout>
    </>
  )
}
