import { useShop } from '../lib/ShopContext'
import { X } from 'lucide-react'

export default function LightboxModal() {
  const { lightboxImage, setLightboxImage } = useShop()

  if (!lightboxImage) return null

  return (
    <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={() => setLightboxImage(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <img
          src={lightboxImage.src}
          alt={lightboxImage.alt || 'Gallery image'}
          className="lightbox-img"
        />
        {lightboxImage.title && (
          <div style={{ color: '#fff', textAlign: 'center', marginTop: '12px', fontSize: '15px', fontWeight: 500 }}>
            {lightboxImage.title}
          </div>
        )}
      </div>
    </div>
  )
}
