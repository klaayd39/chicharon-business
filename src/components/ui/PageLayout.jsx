export default function PageLayout({ children, className = '', noPadding = false, compact = false }) {
  return (
    <div className={className}>
      {noPadding ? children : (
        <div
          className={`section-padding container-max ${
            compact ? 'py-6 sm:py-8 lg:py-10' : 'py-10 sm:py-12 lg:py-14'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
