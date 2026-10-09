import { useShop } from '../../../shared/lib/ShopContext'
import { ZoomIn } from 'lucide-react'
import './FurnitureGallery.css'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=85',
    title: 'Aesthetic Plant Shelf Setup',
    className: 'gallery-img-1',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=85',
    title: 'Clean Minimalist Workstation',
    className: 'gallery-img-2',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85',
    title: 'Vintage Mustard Lounge Chair',
    className: 'gallery-img-3',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85',
    title: 'Natural Wood Stools & Ceramic Vase',
    className: 'gallery-img-4',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=85',
    title: 'Modern Dining Space with Chandelier',
    className: 'gallery-img-5',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=700&q=85',
    title: 'Master Bedroom with Tufted Headboard',
    className: 'gallery-img-6',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=85',
    title: 'Minimalist Frame & Ceramic Art',
    className: 'gallery-img-7',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=85',
    title: 'Patterned Backsplash Kitchen Nook',
    className: 'gallery-img-8',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85',
    title: 'Brick Wall Dining Area',
    className: 'gallery-img-9',
  },
]

export default function FurnitureGallery() {
  const { setLightboxImage } = useShop()

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-header">
        <p className="gallery-subtitle">Share your setup with</p>
        <h2 className="gallery-title">#FuniroFurniture</h2>
      </div>

      <div className="gallery-mosaic-container">
        {galleryImages.map((item) => (
          <div
            key={item.id}
            className={`gallery-card ${item.className}`}
            onClick={() => setLightboxImage({ src: item.src, title: item.title })}
            title="Click to view full photo"
          >
            <img src={item.src} alt={item.title} className="gallery-image" loading="lazy" />
            <div className="gallery-hover-overlay">
              <ZoomIn size={24} color="#FFFFFF" />
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
