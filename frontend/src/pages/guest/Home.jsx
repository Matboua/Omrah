import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/Howitworks";
export default function Home() {
	return (
		<section className="grid grid-cols-12 bg-white">
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			<div className="col-span-10 col-start-2 h-fit">
				<HeroSection />
			</div>
			<div className="col-span-12 col-start-1 flex justify-center bg-orange-100">
				<HowItWorks />
			</div>
		</section>
	);
}
