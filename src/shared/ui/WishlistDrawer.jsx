import { useShop } from '../lib/ShopContext'
import { initialProducts, extraProducts } from '../../entities/Product/model/product'
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react'

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart, wishlistCount } = useShop()

  if (!isWishlistOpen) return null

  const allProducts = [...initialProducts, ...extraProducts]
  const favoriteProducts = allProducts.filter((p) => wishlist.includes(p.id))

  return (
    <div className="cart-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-header-title">
            <Heart size={22} color="#E97171" fill="#E97171" />
            <h3>My Favorites</h3>
            <span className="cart-count-pill" style={{ background: '#FDECEC', color: '#E97171' }}>
              {wishlistCount}
            </span>
          </div>
          <button className="cart-close-btn" onClick={() => setIsWishlistOpen(false)} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {favoriteProducts.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">
                <Heart size={48} strokeWidth={1.5} color="#D8D8D8" />
              </div>
              <h4>No favorites yet</h4>
              <p>Click the heart icon on any product to save it to your wishlist.</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {favoriteProducts.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">{item.price}</span>
                    <div className="cart-item-actions" style={{ marginTop: '8px' }}>
                      <button
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '13px' }}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingBag size={14} style={{ marginRight: '6px' }} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="item-remove-btn"
                        title="Remove from favorites"
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
      </div>
    </div>
  )
}
