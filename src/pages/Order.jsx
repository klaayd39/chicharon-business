import SectionHeader from '../components/ui/SectionHeader'
import PageLayout from '../components/ui/PageLayout'
import OrderForm from '../components/OrderForm'

export default function Order() {
  return (
    <PageLayout>
      <SectionHeader
        eyebrow="Almost There"
        title="Complete Your Order"
        description="Fill in your details below and we'll get back to you to confirm your order."
      />
      <OrderForm />
    </PageLayout>
  )
}
