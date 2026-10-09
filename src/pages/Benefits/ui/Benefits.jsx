import { Trophy, ShieldCheck, Truck, Headphones } from 'lucide-react'
import './Benefits.css'

const benefitsData = [
  {
    id: 1,
    icon: Trophy,
    title: 'High Quality',
    desc: 'crafted from top materials',
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Warranty Protection',
    desc: 'Over 2 years',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Free Shipping',
    desc: 'Order over 150 $',
  },
  {
    id: 4,
    icon: Headphones,
    title: '24 / 7 Support',
    desc: 'Dedicated support',
  },
]

export default function Benefits() {
  return (
    <section className="benefits-section" id="benefits">
      <div className="container benefits-container">
        {benefitsData.map((item) => {
          const IconComponent = item.icon
          return (
            <div key={item.id} className="benefit-item">
              <div className="benefit-icon-wrap">
                <IconComponent size={38} strokeWidth={1.6} />
              </div>
              <div className="benefit-text">
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
