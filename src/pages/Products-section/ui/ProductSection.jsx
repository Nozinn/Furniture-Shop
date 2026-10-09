import { useState } from 'react'
import ProductCard from '../../../entities/Product/ui/product-card'
import { initialProducts, extraProducts } from '../../../entities/Product/model/product'
import './ProductSection.css'

export default function ProductsSection() {
  const [showAll, setShowAll] = useState(false)

  const displayedProducts = showAll
    ? [...initialProducts, ...extraProducts]
    : initialProducts

  return (
    <section className="products-section" id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="products-more-wrap">
          <button
            className="btn-outline products-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  )
}
