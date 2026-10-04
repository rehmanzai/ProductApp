import { Link, Route, Routes } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './components/Navbar/Navbartep.jsx'
import Products from './Pages/Products.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import Cart from './Pages/cart.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-columns">
            <div className="footer-intro">
              <Link to="/" className="footer-brand">Product App</Link>
              <p>Thoughtful finds for everyday living. Well-made pieces, useful details, and little comforts for home.</p>
            </div>
            <div className="footer-group">
              <h2>Explore</h2>
              <Link to="/">Shop the collection</Link>
              <Link to="/cart">Your bag</Link>
            </div>
            <div className="footer-group">
              <h2>Good to know</h2>
              <span>Complimentary delivery</span>
              <span>Easy 30-day returns</span>
              <span>Thoughtfully selected essentials</span>
            </div>
            <div className="footer-note">
              <span className="footer-eyebrow">A considered collection</span>
              <p>Make room for the things you love using every day.</p>
              <Link to="/" className="footer-cta">Discover the edit <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Product App. All rights reserved.</span>
            <span>Made for slower, more considered living.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-label">404 / Not found</p>
      <h1>This page wandered off.</h1>
      <Link className="not-found-link" to="/">
        Back to the collection <ArrowUpRight size={17} />
      </Link>
    </main>
  )
}

export default App
