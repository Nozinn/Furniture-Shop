import { useState } from 'react'
import { Share2, Heart } from 'lucide-react'
import { useShop } from '../../../shared/lib/ShopContext'
import './product-card.css'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useShop()
  const wishlisted = isWishlisted(product.id)

  const handleShare = (e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Funiro: ${product.subtitle} - ${product.price}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      showToast(`Link to "${product.name}" copied to clipboard!`)
    }
  }

  return (
    <div className="product-card-root">
      {/* Product Image and Badge */}
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {product.badge && (
          <div
            className={`product-badge ${
              product.badge.type === 'discount' ? 'badge-discount' : 'badge-new'
            }`}
          >
            {product.badge.text}
          </div>
        )}
      </div>

      {/* Product Information Footer */}
      <div className="product-card-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-subtitle">{product.subtitle}</p>
        <div className="product-prices-row">
          <span className="product-current-price">{product.price}</span>
          {product.oldPrice && (
            <span className="product-old-price">{product.oldPrice}</span>
          )}
        </div>
      </div>

      {/* Hover Overlay with Add to cart, Share, and Like */}
      <div className="product-hover-overlay">
        <button
          className="product-add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>

        <div className="product-hover-actions">
          <button
            className="hover-action-btn"
            onClick={handleShare}
            title="Share this product"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>

          <button
            className={`hover-action-btn ${wishlisted ? 'is-liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product)
            }}
            title={wishlisted ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={16}
              fill={wishlisted ? '#E97171' : 'none'}
              color={wishlisted ? '#E97171' : '#FFFFFF'}
            />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  )
}
