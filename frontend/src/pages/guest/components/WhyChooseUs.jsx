import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titles from "./Titles";
import { faObjectGroup } from "@fortawesome/free-solid-svg-icons";

export default function WhyChooseUs() {
	return (
		<section className="py-20 relative flex flex-col justify-center items-center gap-10 md:gap-15 w-10/12">
			<Titles
				title="Why Choose Us"
				description="CarVoy: Your top choice for exceptional service, convenience, and reliability"
			/>
			<div className="grid gap-3 grid-cols-1 lg:grid-cols-3 overflow-hidden">
				<div className="flex flex-col gap-3 items-center p-5 text-black hover:text-white bg-white hover:bg-orange-600 transition-all duration-300 group rounded-2xl cursor-pointer">
					<FontAwesomeIcon
						icon={faObjectGroup}
						size="2x"
						className="w-full py-3 bg-orange-600 text-white rounded-xl group-hover:bg-white group-hover:text-orange-600 transition-all duration-300"
					/>
					<h3 className="font-medium text-2xl">Easy & Fast Booking</h3>
					<p className="text-center w-5/6">
						Completely carinate e business testing process whereas fully
						researched customer service. Globally extensive content with
						quality.
					</p>
				</div>
				<div className="flex flex-col gap-3 items-center p-5 text-black hover:text-white bg-white hover:bg-orange-600 transition-all duration-300 group rounded-2xl cursor-pointer">
					<FontAwesomeIcon
						icon={faObjectGroup}
						size="2x"
						className="w-full py-3 bg-orange-600 text-white rounded-xl group-hover:bg-white group-hover:text-orange-600 transition-all duration-300"
					/>
					<h3 className="font-medium text-2xl">Easy & Fast Booking</h3>
					<p className="text-center w-5/6">
						Completely carinate e business testing process whereas fully
						researched customer service. Globally extensive content with
						quality.
					</p>
				</div>
				<div className="flex flex-col gap-3 items-center p-5 text-black hover:text-white bg-white hover:bg-orange-600 transition-all duration-300 group rounded-2xl cursor-pointer">
					<FontAwesomeIcon
						icon={faObjectGroup}
						size="2x"
						className="w-full py-3 bg-orange-600 text-white rounded-xl group-hover:bg-white group-hover:text-orange-600 transition-all duration-300"
					/>
					<h3 className="font-medium text-2xl">Easy & Fast Booking</h3>
					<p className="text-center w-5/6">
						Completely carinate e business testing process whereas fully
						researched customer service. Globally extensive content with
						quality.
					</p>
				</div>
			</div>
		</section>
	);
}
