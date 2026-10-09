import { useShop } from '../lib/ShopContext'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import './CartDrawer.css'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useShop()

  if (!isCartOpen) return null

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} color="#E89F71" />
            <h3>Shopping Cart</h3>
            <span className="cart-count-pill">{cartCount}</span>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} strokeWidth={1.5} color="#D8D8D8" />
              </div>
              <h4>Your cart is empty</h4>
              <p>Explore our furniture collections and add your favorite items to cart.</p>
              <button
                className="btn-primary"
                style={{ marginTop: '16px', padding: '10px 28px', fontSize: '14px' }}
                onClick={() => {
                  setIsCartOpen(false)
                  const el = document.getElementById('products')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">{item.price}</span>
                    <div className="cart-item-actions">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="item-remove-btn"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal:</span>
              <span className="cart-subtotal-val">{cartTotal}</span>
            </div>
            <p className="cart-tax-note">Shipping & taxes calculated at checkout</p>
            <div className="cart-footer-buttons">
              <button
                className="btn-primary cart-checkout-btn"
                onClick={() => alert(`Proceeding to checkout. Total: ${cartTotal}`)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
