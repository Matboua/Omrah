import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titles from "./Titles";
import {
	faCarOn,
	faMapLocationDot,
	faPenNib,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
	return (
		<section className="py-20 relative flex flex-col justify-center items-center gap-10 md:gap-20 w-10/12">
			{/* Title */}
			<Titles
				title="How It Works"
				description="Experience hassle-free car rentals with CarVoy, making travel across Morocco easy and convenient"
			/>
			{/* Cards */}
			<div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
				{/* Card One */}
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-blue-600 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faPenNib}
							size="2x"
							className="text-white p-5 bg-blue-600 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">1. Select Departure City</h3>
					<p className="text-center px-5">
						Select your preferred departure city from across Morocco. With our
						Umrah services, begin your spiritual journey from the location most
						convenient for you.
					</p>
				</div>
				{/* Card Two */}
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-orange-400 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faMapLocationDot}
							size="2x"
							className="text-white p-5 bg-orange-400 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">2. We Handle Everything</h3>
					<p className="text-center px-5">
						Our team ensures your visa, flights, and accommodation are arranged
						with care. Start your pilgrimage journey with peace of mind and no
						stress.
					</p>
				</div>
				{/* Card Three */}
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-gray-900 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faCarOn}
							size="2x"
							className="text-white p-5 bg-gray-900 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">3. Choose a Package</h3>
					<p className="text-center px-5">
						Browse our range of carefully curated Umrah packages — from economy
						to premium — designed to meet every budget and preference. Book your
						ideal package.
					</p>
				</div>
			</div>
		</section>
	);
}
