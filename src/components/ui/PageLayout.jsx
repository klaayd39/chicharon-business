export default function PageLayout({ children, className = '' }) {
  return (
    <div className={`pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 ${className}`}>
      <div className="section-padding container-max">{children}</div>
    </div>
  )
}
