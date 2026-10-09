import { useState } from 'react'
import { MapPin, Phone, Send, Globe } from 'lucide-react'
import { useShop } from '../../../shared/lib/ShopContext'
import './footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast, setIsCartOpen } = useShop()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'info')
      return
    }
    showToast('Thank you for subscribing to Funiro newsletter!')
    setEmail('')
  }

  return (
    <footer className="funiro-footer">
      <div className="container footer-container">
        {/* Column 1: Brand & Contact Info */}
        <div className="footer-col brand-col">
          <a href="#" className="footer-logo">
            Funiro<span className="logo-dot">.</span>
          </a>
          <p className="footer-desc">
            Worldwide furniture store since 2020. We sell over 1000+ branded products on our website
          </p>

          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>Sawojajar Malang, Indonesia</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <span>+6289 456 3455</span>
            </div>
            <div className="footer-contact-item">
              <Globe size={18} className="contact-icon" />
              <a href="https://www.funiro.com" target="_blank" rel="noopener noreferrer">
                www.funiro.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Menu */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Menu</h4>
          <ul className="footer-links-list">
            <li><a href="#products">Products</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#rooms">Inspirations</a></li>
            <li><a href="#hero">About Us</a></li>
            <li><a href="#hero">Terms & Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Account */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Account</h4>
          <ul className="footer-links-list">
            <li><a href="#hero">My Account</a></li>
            <li><a href="#hero">Checkout</a></li>
            <li>
              <a
                href="#cart"
                onClick={(e) => {
                  e.preventDefault()
                  setIsCartOpen(true)
                }}
              >
                My Cart
              </a>
            </li>
            <li><a href="#products">My catalog</a></li>
          </ul>
        </div>

        {/* Column 4: Stay Connected */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Stay Connected</h4>
          <ul className="footer-links-list">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>

        {/* Column 5: Stay Updated */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-col-title">Stay Updated</h4>
          <form className="footer-subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="subscribe-input"
              required
            />
            <button type="submit" className="subscribe-btn" aria-label="Subscribe to newsletter">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Funiro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
