import PageHeader from '../components/ui/PageHeader'
import PageLayout from '../components/ui/PageLayout'
import OrderForm from '../components/OrderForm'
import { businessConfig } from '../data/businessConfig'

export default function Order() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Complete Your Order"
        description="Add your details, review your cart, and we'll contact you to confirm availability and pricing."
        compact
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Order' },
        ]}
      />
      <PageLayout className="section-surface-alt" compact>
        <div className="mb-5 lg:mb-6 p-4 rounded-xl bg-white border border-cream-dark/60 flex gap-3 items-start">
          <span className="w-2 h-2 rounded-full bg-red mt-2 shrink-0" aria-hidden="true" />
          <p className="text-sm text-warm-gray leading-relaxed">
            <span className="font-semibold text-brown">What happens next?</span>{' '}
            Submit your order, then our team at {businessConfig.name} will reach out via phone to
            confirm items, pricing, and {businessConfig.deliveryAvailable ? 'delivery or pickup' : 'pickup'} details.
          </p>
        </div>
        <OrderForm />
      </PageLayout>
    </>
  )
}
