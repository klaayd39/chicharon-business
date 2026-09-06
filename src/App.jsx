import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Order from './pages/Order'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
