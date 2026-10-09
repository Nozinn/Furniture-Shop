import { useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useShop } from '../../../shared/lib/ShopContext'
import './RoomInspiration.css'

const roomsData = [
  {
    id: 1,
    num: '01',
    category: 'Bed Room',
    title: 'Inner Peace',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    num: '02',
    category: 'Dining Room',
    title: 'Pure Serenity',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    num: '03',
    category: 'Living Room',
    title: 'Nordic Harmony',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    num: '04',
    category: 'Kitchen Area',
    title: 'Modern Haven',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85',
  },
]

export default function RoomInspiration() {
  const [current, setCurrent] = useState(0)
  const { setLightboxImage } = useShop()

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % roomsData.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + roomsData.length) % roomsData.length)
  }

  const activeRoom = roomsData[current]
  const nextRoom = roomsData[(current + 1) % roomsData.length]
  const nextNextRoom = roomsData[(current + 2) % roomsData.length]

  return (
    <section className="rooms-section" id="rooms">
      <div className="rooms-container">
        {/* Left Column: Text & CTA */}
        <div className="rooms-left-col">
          <h2 className="rooms-title">50+ Beautiful rooms inspiration</h2>
          <p className="rooms-subtitle">
            Our designer already made a lot of beautiful prototype of rooms that inspire you
          </p>
          <a href="#products" className="btn-primary rooms-btn">
            Explore More
          </a>
        </div>

        {/* Right Column: Dynamic Slider */}
        <div className="rooms-right-col">
          <div className="rooms-slider-track">
            {/* Active Highlighted Slide */}
            <div className="rooms-slide active-slide">
              <img
                src={activeRoom.image}
                alt={activeRoom.title}
                className="rooms-slide-img"
              />

              {/* Floating Name Badge */}
              <div className="room-info-badge">
                <div className="room-info-text">
                  <span className="room-category-label">
                    {activeRoom.num} — {activeRoom.category}
                  </span>
                  <h3 className="room-name-heading">{activeRoom.title}</h3>
                </div>
                <button
                  className="room-arrow-square-btn"
                  onClick={() =>
                    setLightboxImage({ src: activeRoom.image, title: activeRoom.title })
                  }
                  title="View full room inspiration"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Next Slide Preview */}
            <div
              className="rooms-slide next-slide"
              onClick={nextSlide}
            >
              <img
                src={nextRoom.image}
                alt={nextRoom.title}
                className="rooms-slide-img"
              />
            </div>

            {/* Third Slide Partial */}
            <div
              className="rooms-slide next-next-slide"
              onClick={() => setCurrent((current + 2) % roomsData.length)}
            >
              <img
                src={nextNextRoom.image}
                alt={nextNextRoom.title}
                className="rooms-slide-img"
              />
            </div>

            {/* Round Next Arrow Floating Button */}
            <button
              className="nav-circle-btn white rooms-floating-arrow"
              onClick={nextSlide}
              aria-label="Next room inspiration"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="custom-pagination-dots rooms-pagination">
            {roomsData.map((_, idx) => (
              <div
                key={idx}
                className={`dot-item ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                role="button"
                aria-label={`Go to room ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
