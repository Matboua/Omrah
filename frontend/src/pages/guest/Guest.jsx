import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
export default function Guest() {
	return (
		<section className="grid grid-cols-12 bg-neutral-50">
			<Header />
			<HeroSection />
		</section>
	);
}
