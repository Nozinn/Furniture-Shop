import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useShop } from '../../../shared/lib/ShopContext'
import './Hero.css'

const heroSlides = [
  {
    id: 1,
    title: 'High-Quality Furniture Just For You',
    subtitle:
      'Our furniture is made from selected and best quality materials that are suitable for your dream home',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
    product: {
      name: 'Bohauss',
      desc: 'Luxury big sofa 2-seat',
      price: 'Rp 17.000.000',
      priceRaw: 17000000,
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=85',
    },
  },
  {
    id: 2,
    title: 'Scandinavian Living Space Concept',
    subtitle:
      'Crafted with natural oak and soothing organic textiles to bring warmth into your daily sanctuary',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    product: {
      name: 'Nordica',
      desc: 'Cozy reading armchair',
      price: 'Rp 8.500.000',
      priceRaw: 8500000,
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=85',
    },
  },
  {
    id: 3,
    title: 'Minimalist Elegance For Modern Homes',
    subtitle:
      'Timeless silhouettes engineered for comfort, durability, and contemporary architectural beauty',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    product: {
      name: 'Estelle',
      desc: 'Minimalist coffee nook',
      price: 'Rp 12.000.000',
      priceRaw: 12000000,
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=85',
    },
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { addToCart } = useShop()

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === current) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 7000)
    return () => clearInterval(timer)
  }, [current, isAnimating])

  const activeSlide = heroSlides[current]
  const prevSlideIndex = (current - 1 + heroSlides.length) % heroSlides.length
  const nextSlideIndex = (current + 1) % heroSlides.length

  const handleBuyHeroProduct = (product) => {
    addToCart({
      id: `hero-${product.name.toLowerCase()}`,
      name: product.name,
      subtitle: product.desc,
      price: product.price,
      priceRaw: product.priceRaw,
      image: product.image,
    })
  }

  return (
    <section className="hero-section" id="hero">
      {/* Top Controls Bar: Centered Dots + Top-Right Round Navigation Arrows */}
      <div className="container hero-controls-container">
        <div className="custom-pagination-dots hero-dots">
          {heroSlides.map((_, idx) => (
            <div
              key={idx}
              className={`dot-item ${idx === current ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              role="button"
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hero-nav-arrows">
          <button
            className="nav-circle-btn light"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="nav-circle-btn solid"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Hero Slider Area with Partial Neighbor Slides */}
      <div className="hero-carousel-viewport">
        {/* Left Neighbor Slide Preview */}
        <div
          className="hero-neighbor-slide left-neighbor"
          style={{ backgroundImage: `url(${heroSlides[prevSlideIndex].image})` }}
          onClick={prevSlide}
        />

        {/* Active Main Slide */}
        <div
          className="hero-active-slide"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
        >
          {/* Left Floating Frosted Card */}
          <div className="hero-content-card">
            <h1 className="hero-title">{activeSlide.title}</h1>
            <p className="hero-desc">{activeSlide.subtitle}</p>
            <a href="#products" className="btn-primary hero-btn">
              Shop Now
            </a>
          </div>

          {/* Right Bottom Product Highlight Card */}
          <div
            className="hero-product-card"
            onClick={() => handleBuyHeroProduct(activeSlide.product)}
            title="Click to add to cart"
          >
            <div className="hero-product-text">
              <h3 className="hero-product-title">{activeSlide.product.name}</h3>
              <p className="hero-product-desc">{activeSlide.product.desc}</p>
              <span className="hero-product-price">{activeSlide.product.price}</span>
            </div>
            <button
              className="hero-product-arrow-btn"
              aria-label="Add to cart"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Neighbor Slide Preview */}
        <div
          className="hero-neighbor-slide right-neighbor"
          style={{ backgroundImage: `url(${heroSlides[nextSlideIndex].image})` }}
          onClick={nextSlide}
        />
      </div>
    </section>
  )
}
