export default function PageLayout({ children, className = '', noPadding = false }) {
  return (
    <div className={className}>
      {noPadding ? children : (
        <div className="section-padding container-max py-10 sm:py-12 lg:py-14">{children}</div>
      )}
    </div>
  )
}
