import { useState, useEffect } from 'react'
import { ChevronDown, Heart, ShoppingCart, Menu, X } from 'lucide-react'
import Search from '../../../features/Search/ui/Search'
import { useShop } from '../../../shared/lib/ShopContext'
import './Header.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen } = useShop()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeAll = () => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`funiro-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Left: Brand Logo & Navigation */}
        <div className="header-left">
          <a href="#" className="header-logo" onClick={closeAll}>
            Funiro<span className="logo-dot">.</span>
          </a>

          <nav className="header-nav">
            {/* Products Dropdown */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#products" className="nav-link">
                Products <ChevronDown size={16} className={`chevron-icon ${activeDropdown === 'products' ? 'open' : ''}`} />
              </a>
              {activeDropdown === 'products' && (
                <div className="dropdown-menu">
                  <a href="#products" onClick={closeAll}>Chairs & Armchairs</a>
                  <a href="#products" onClick={closeAll}>Sofas & Lounges</a>
                  <a href="#products" onClick={closeAll}>Beds & Sets</a>
                  <a href="#products" onClick={closeAll}>Lamps & Lighting</a>
                  <a href="#products" onClick={closeAll}>Decor & Accessories</a>
                </div>
              )}
            </div>

            {/* Rooms Dropdown */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setActiveDropdown('rooms')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#rooms" className="nav-link">
                Rooms <ChevronDown size={16} className={`chevron-icon ${activeDropdown === 'rooms' ? 'open' : ''}`} />
              </a>
              {activeDropdown === 'rooms' && (
                <div className="dropdown-menu">
                  <a href="#rooms" onClick={closeAll}>Living Room</a>
                  <a href="#rooms" onClick={closeAll}>Bed Room</a>
                  <a href="#rooms" onClick={closeAll}>Dining Room</a>
                  <a href="#rooms" onClick={closeAll}>Working Space</a>
                </div>
              )}
            </div>

            {/* Inspirations Direct Link */}
            <a href="#rooms" className="nav-link">
              Inspirations
            </a>
          </nav>
        </div>

        {/* Center: Search Field */}
        <div className="header-center">
          <Search />
        </div>

        {/* Right: Actions (Wishlist, Cart, User) */}
        <div className="header-right">
          <button
            className="action-icon-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={22} className={wishlistCount > 0 ? 'heart-has-items' : ''} />
            {wishlistCount > 0 && <span className="action-badge wishlist-badge">{wishlistCount}</span>}
          </button>

          <button
            className="action-icon-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            title="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="action-badge cart-badge">{cartCount}</span>}
          </button>

          <div className="user-avatar-wrap" title="User Profile">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="User profile"
              className="user-avatar"
            />
          </div>

          <button
            className="mobile-burger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-search-area">
            <Search />
          </div>
          <div className="mobile-nav-links">
            <a href="#products" onClick={closeAll}>Products</a>
            <a href="#rooms" onClick={closeAll}>Rooms</a>
            <a href="#rooms" onClick={closeAll}>Inspirations</a>
            <a href="#tips" onClick={closeAll}>Tips & Tricks</a>
            <a href="#gallery" onClick={closeAll}>#FuniroFurniture</a>
          </div>
        </div>
      )}
    </header>
  )
}
