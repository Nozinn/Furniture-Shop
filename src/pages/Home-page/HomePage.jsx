import Header from '../../widgets/Header/ui/Header'
import Hero from '../Hero/ui/Hero'
import Benefits from '../Benefits/ui/Benefits'
import ProductsSection from '../Products-section/ui/ProductSection'
import RoomsInspiration from '../Room-inspiration/ui/RoomInspiration'
import TipsAndTricks from '../Tips-and-tricks/ui/TipsAndTrics'
import FurnitureGallery from '../Furniture-gallery/ui/FurnitureGallery'
import Footer from '../../widgets/Footer/ui/footer'

import CartDrawer from '../../shared/ui/CartDrawer'
import WishlistDrawer from '../../shared/ui/WishlistDrawer'
import LightboxModal from '../../shared/ui/LightboxModal'
import Toast from '../../shared/ui/Toast'

export default function HomePage() {
  return (
    <div className="funiro-app-wrapper">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ProductsSection />
        <RoomsInspiration />
        <TipsAndTricks />
        <FurnitureGallery />
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <LightboxModal />
      <Toast />
    </div>
  )
}
