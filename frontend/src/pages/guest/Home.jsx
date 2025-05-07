import Faqs from "./components/faqs/Faqs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/Howitworks";
import Swiper from "./components/Swiper";
import WhyChooseUs from "./components/WhyChooseUs";
export default function Home() {
	return (
		<section className="grid grid-cols-12 bg-white  overflow-x-hidden">
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			<div className="col-span-10 col-start-2">
				<HeroSection />
			</div>
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<WhyChooseUs />
			</div>
			<div className="col-span-10 col-start-2">
				<HowItWorks />
			</div>
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Swiper />
			</div>
			<div className="col-span-10 col-start-2">
				<Faqs />
			</div>
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}
