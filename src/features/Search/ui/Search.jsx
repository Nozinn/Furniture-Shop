import { useState, useRef, useEffect } from 'react'
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react'
import { initialProducts, extraProducts } from '../../../entities/Product/model/product'
import { useShop } from '../../../shared/lib/ShopContext'
import './Search.css'

export default function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const { addToCart } = useShop()

  const allProducts = [...initialProducts, ...extraProducts]

  const filtered = query.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectProduct = (product) => {
    setIsOpen(false)
    setQuery('')
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="search-feature-wrapper" ref={wrapperRef}>
      <div className="search-input-box">
        <SearchIcon size={18} className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for minimalist chair"
          className="search-input"
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="search-results-dropdown">
          {filtered.length === 0 ? (
            <div className="search-no-results">
              No furniture found for "{query}"
            </div>
          ) : (
            <div className="search-results-list">
              <div className="search-results-header">
                Found {filtered.length} products
              </div>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => handleSelectProduct(item)}
                >
                  <img src={item.image} alt={item.name} className="search-item-thumb" />
                  <div className="search-item-details">
                    <span className="search-item-name">{item.name}</span>
                    <span className="search-item-sub">{item.subtitle}</span>
                    <span className="search-item-price">{item.price}</span>
                  </div>
                  <ArrowRight size={16} className="search-item-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
