import { useShop } from '../lib/ShopContext'
import { CheckCircle2, Info } from 'lucide-react'

export default function Toast() {
  const { toast } = useShop()
  if (!toast) return null

  return (
    <div className="toast-container">
      <div className={`toast-box ${toast.type}`}>
        {toast.type === 'info' ? (
          <Info size={18} color="#2EC1AC" />
        ) : (
          <CheckCircle2 size={18} color="#E89F71" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  )
}
