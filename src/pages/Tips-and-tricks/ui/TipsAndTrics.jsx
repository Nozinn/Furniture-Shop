import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './TipsAndTricks.css'

const articlesData = [
  {
    id: 1,
    title: 'How to create a living room to love',
    date: '20 jan 2020',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    title: 'Solution for clean look working space',
    date: '10 jan 2020',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85',
    isElevated: true,
  },
  {
    id: 3,
    title: 'Make your cooking activity more fun with good setup',
    date: '20 jan 2020',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 4,
    title: '5 essential elements for cozy bedroom aesthetics',
    date: '15 jan 2020',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=85',
  },
]

export default function TipsAndTricks() {
  const [startIndex, setStartIndex] = useState(0)

  const nextArticles = () => {
    setStartIndex((prev) => (prev + 1) % articlesData.length)
  }

  const prevArticles = () => {
    setStartIndex((prev) => (prev - 1 + articlesData.length) % articlesData.length)
  }

  // Get 3 visible articles in carousel loop
  const visibleArticles = [
    articlesData[startIndex],
    articlesData[(startIndex + 1) % articlesData.length],
    articlesData[(startIndex + 2) % articlesData.length],
  ]

  return (
    <section className="tips-section" id="tips">
      <div className="container">
        <h2 className="section-title">Tips & Tricks</h2>

        <div className="tips-carousel-wrap">
          {/* Left Arrow Button */}
          <button
            className="nav-circle-btn white tips-arrow-btn left-arrow"
            onClick={prevArticles}
            aria-label="Previous articles"
          >
            <ChevronLeft size={22} />
          </button>

          {/* 3 Visible Article Cards */}
          <div className="tips-cards-grid">
            {visibleArticles.map((article, index) => {
              const isCenter = index === 1
              return (
                <article
                  key={article.id}
                  className={`tip-card ${isCenter ? 'is-elevated' : ''}`}
                >
                  <div className="tip-card-img-wrap">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="tip-card-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="tip-card-content">
                    <h3 className="tip-card-title">{article.title}</h3>
                    <span className="tip-card-date">{article.date}</span>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            className="nav-circle-btn white tips-arrow-btn right-arrow"
            onClick={nextArticles}
            aria-label="Next articles"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="tips-pagination-wrap">
          <div className="custom-pagination-dots">
            {articlesData.map((_, idx) => (
              <div
                key={idx}
                className={`dot-item ${idx === startIndex ? 'active' : ''}`}
                onClick={() => setStartIndex(idx)}
                role="button"
                aria-label={`Go to article set ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
