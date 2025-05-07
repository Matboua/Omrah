import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titles from "./Titles";
import {
	faCarOn,
	faMapLocationDot,
	faPenNib,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
	return (
		<section className="py-20 w-full flex flex-col items-center gap-10 md:gap-15">
			{/* Title */}
			<Titles
				title="How It Works"
				description="Experience a smooth and spiritually enriching journey with Omrah Agency, making your pilgrimage easy and stress-free."
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
					<h3 className="font-medium text-xl">1. Choose Your Package</h3>
					<p className="text-center px-5">
						Select from a range of carefully curated Omrah packages tailored to
						your budget and preferences. Whether you seek economy or premium
						services, we’ve got you covered.
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
					<h3 className="font-medium text-xl">2. Prepare for Departure</h3>
					<p className="text-center px-5">
						Once booked, we guide you through the entire preparation process —
						from visa assistance to travel documents and pre-departure tips —
						ensuring everything is in place for your sacred journey.
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
					<h3 className="font-medium text-xl">3. Begin Your Pilgrimage</h3>
					<p className="text-center px-5">
						Travel with peace of mind. Our team is with you every step of the
						way, providing support from departure to your return, so you can
						focus fully on your spiritual experience.
					</p>
				</div>
			</div>
		</section>
	);
}
