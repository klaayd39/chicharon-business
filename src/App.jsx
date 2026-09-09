import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { SmoothScrollProvider } from './context/SmoothScrollContext'
import { useSmoothScroll } from './context/useSmoothScroll'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import MobileShopBar from './components/MobileShopBar'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Order from './pages/Order'
import BulkOrder from './pages/BulkOrder'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const { scrollTo, scrollToTop, resize } = useSmoothScroll()

  useEffect(() => {
    const timer = setTimeout(() => {
      resize()

      if (hash) {
        scrollTo(`#${hash.slice(1)}`)
        return
      }

      scrollToTop()
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname, hash, resize, scrollTo, scrollToTop])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <CartProvider>
          <ScrollToTop />
          <ScrollProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brown focus:text-cream focus:rounded-lg focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1 pb-[4.25rem] lg:pb-0">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/bulk-order" element={<BulkOrder />} />
                </Routes>
              </PageTransition>
            </main>
            <Footer />
            <CartDrawer />
            <MobileShopBar />
          </div>
        </CartProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
