import Header from '../../widgets/Header/ui/header'
import Hero from '../Hero/ui/Hero'
import Benefits from '../Benefits/ui/Benefits'
import ProductsSection from '../Products-section/ui/ProductSection'
import RoomsInspiration from '../Room-inspiration/ui/RoomInspiration'
import TipsAndTricks from '../Tips-and-tricks/ui/TipsAndTrics'
import FurnitureGallery from '../Furniture-gallery/ui/FurnitureGallery'
import Footer from '../../widgets/Footer/ui/footer'


export default function HomePage() {
	return (
		<div>
			<Header />
			<Hero />
			<Benefits />
			<ProductsSection />
			<RoomsInspiration />
			<TipsAndTricks />
			<FurnitureGallery />
			<Footer />
		</div>
	)
}
