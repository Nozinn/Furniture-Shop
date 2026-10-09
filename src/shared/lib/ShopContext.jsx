import { createContext, useContext, useState, useEffect } from 'react'

const ShopContext = createContext(null)

export const formatRupiah = (amount) => {
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('funiro_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('funiro_wishlist')
      return saved ? JSON.parse(saved) : ['leviosa']
    } catch {
      return ['leviosa']
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('funiro_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('funiro_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error(e)
    }
  }, [wishlist])

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
    setTimeout(() => {
      setToast(null)
    }, 2800)
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        showToast(`Increased quantity of "${product.name}" in cart`)
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      showToast(`Added "${product.name}" to your cart!`)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId)
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info')
    }
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleWishlist = (product) => {
    const productId = typeof product === 'string' ? product : product.id
    const productName = typeof product === 'object' ? product.name : 'Product'
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast(`Removed from favorites`, 'info')
        return prev.filter((id) => id !== productId)
      } else {
        showToast(`Added "${productName}" to favorites!`)
        return [...prev, productId]
      }
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const cartTotalRaw = cart.reduce((sum, item) => sum + item.priceRaw * item.quantity, 0)
  const cartTotal = formatRupiah(cartTotalRaw)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
        cartTotalRaw,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        lightboxImage,
        setLightboxImage,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }
  return context
}
