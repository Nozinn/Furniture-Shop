import HomePage from '../pages/Home-page/HomePage'
import { ShopProvider } from '../shared/lib/ShopContext'

export default function App() {
  return (
    <ShopProvider>
      <HomePage />
    </ShopProvider>
  )
}
