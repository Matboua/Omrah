import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
export default function Home() {
	return (
		<section className="grid grid-cols-12 bg-neutral-50 w-screen overflow-x-hidden">
			<Header />
			<HeroSection />
		</section>
	);
}
