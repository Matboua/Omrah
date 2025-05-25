import { Star } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SwiperComponents from "./components/SwiperComponents";

// data test

export default function Services() {
	return (
		<section className="grid grid-cols-12 bg-white  overflow-x-hidden">
			{/* Header */}
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			{/* Cards */}
			<section className="col-span-10 col-start-2 grid grid-cols-1 gap-5 py-20">
				<div className="max-w-7xl mx-auto p-4">
					<h1 className="text-3xl font-bold text-center text-gray-800 mb-16">
						Omrah Packages Services
					</h1>
					<SwiperComponents />
				</div>
			</section>
			{/* Footer */}
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}
