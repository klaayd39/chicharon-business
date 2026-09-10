export default function OrderStickyActions({ children, hint }) {
  return (
    <>
      <div className="order-sticky-spacer" aria-hidden="true" />
      <div className="order-sticky-actions safe-bottom">
        {hint && (
          <p className="text-xs text-warm-gray text-center mb-2.5 leading-relaxed">{hint}</p>
        )}
        <div className="flex flex-col gap-2.5">{children}</div>
      </div>
    </>
  )
}
