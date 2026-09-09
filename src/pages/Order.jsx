import PageHeader from '../components/ui/PageHeader'
import PageLayout from '../components/ui/PageLayout'
import OrderForm from '../components/OrderForm'

export default function Order() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Complete Your Order"
        description="Fill in your details below and we'll get back to you to confirm your order."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Order' },
        ]}
      />
      <PageLayout className="section-surface-alt">
        <OrderForm />
      </PageLayout>
    </>
  )
}
